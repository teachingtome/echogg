import { Server as SocketIOServer } from 'socket.io';

let lobbies = {};

export default function handler(req, res) {
  // Only initialize the Socket.IO server once
  if (res.socket && !res.socket.server.io) {
    const io = new SocketIOServer(res.socket.server, {
      path: '/api/socketio',
    });

    // Handle incoming socket connections
    io.on('connection', (socket) => {
      console.log('New client connected:', socket.id);
z``
      // Listen for join, message, and leave actions
      socket.on('join', (code) => {
        if (!lobbies[code]) lobbies[code] = [];
        lobbies[code].push(socket);
        console.log(`Client ${socket.id} joined lobby ${code}`);
      });

      socket.on('message', (message) => {
        const { code, payload } = message;
        if (lobbies[code]) {
          lobbies[code].forEach((client) => {
            if (client !== socket && client.connected) {
              client.emit('message', payload);
            }
          });
        }
      });

      socket.on('leave', (code) => {
        if (lobbies[code]) {
          lobbies[code] = lobbies[code].filter((client) => client !== socket);
          if (lobbies[code].length === 0) {
            delete lobbies[code];
          }
        }
        console.log(`Client ${socket.id} left lobby ${code}`);
      });

      socket.on('disconnect', () => {
        for (const code in lobbies) {
          lobbies[code] = lobbies[code].filter((client) => client !== socket);
          if (lobbies[code].length === 0) {
            delete lobbies[code];
          }
        }
        console.log(`Client ${socket.id} disconnected`);
      });
    });

    res.socket.server.io = io;
  }
  res.end();
}