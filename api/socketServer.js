exports.initSocketServer = (io) => {
    const rooms = {};
    const users = {};

    io.on('connection', (socket) => {
        // Handle room creation
        socket.on('createRoom', ({ room, userName }) => {
            socket.join(room);

            // Send message to the room
            socket.user = { room, userName, id: socket.id };

            if (!rooms[room]) {
                rooms[room] = {
                    roomName: room,
                    users: [],
                    messages: [],
                    creator: socket.user,
                };
            }

            rooms[room].users.push(socket.user);
            users[socket.id] = socket.user;

            // Send roomConfig to the user
            io.to(socket.id).emit('roomConfig', { room: rooms[room], currentUser: socket.user });
            io.to(room).emit('newUser', {
                userName: socket.user.userName,
                message: `${socket.user.userName} has joined the room`,
            });
        });

        // Handle room joining
        socket.on('joinRoom', ({ room, userName }) => {
            // Send message to the room
            socket.user = { room, userName, id: socket.id };
            socket.join(room);

            if (!rooms[room]) {
                rooms[room] = {
                    roomName: room,
                    users: [],
                };
            }

            rooms[room].users.push(socket.user);
            users[socket.id] = socket.user;

            // Send roomConfig to the user
            io.to(room).emit('roomConfig', { room: rooms[room], currentUser: socket.user });

            // Send message to the room
            io.to(room).emit('newUser', {
                userName: socket.user.userName,
                message: `${socket.user.userName} has joined the room`,
            });
        });

        // Handle chat message
        socket.on('newMessage', (message) => {
            if (socket.user && rooms[socket.user.room]) {
                io.to(socket.user.room).emit('chat', {
                    message,
                    room: rooms[socket.user.room],
                    userName: socket.user.userName,
                });
            }
        });

        socket.on('leaveRoom', () => {
            const user = socket.user;
            if (user && rooms[user.room]) {
                const room = rooms[user.room];

                io.to(user.room).emit('userLeft', {
                    message: `${user.userName} has left the room`,
                });

                // Remove user from room
                room.users = room.users.filter((u) => u.id !== socket.id);

                // Remove room if empty
                if (room.users.length === 0) {
                    delete rooms[user.room];
                }

                // Remove user
                delete users[socket.id];

                // Send new room config
                io.to(user.room).emit('roomConfig', { room: rooms[user.room] });
            }
        });

        // Handle disconnection
        socket.on('disconnect', () => {
            const user = socket.user;
            if (user && rooms[user.room]) {
                const room = rooms[user.room];

                io.to(user.room).emit('userLeft', {
                    message: `${user.userName} has left the room`,
                });

                // Remove user from room
                room.users = room.users.filter((u) => u.id !== socket.id);

                // Remove room if empty
                if (room.users.length === 0) {
                    delete rooms[user.room];
                }

                // Remove user
                delete users[socket.id];

                // Send new room config
                io.to(user.room).emit('roomConfig', { room: rooms[user.room] });
            }
        });
    });
};
