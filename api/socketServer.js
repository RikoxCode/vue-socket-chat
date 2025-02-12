exports.initSocketServer = (io) => {
    io.on('connection', (socket) => {

        // Handle room creation
        socket.on('createRoom', ({ room, userName }) => {
            socket.join(room);

            console.log('room created', room);
            console.log('user joined', userName);

            // Send message to the room
            socket.user = { room, userName, id: socket.id };
            io.to(room).emit('chat', {
                room: socket.user.room,
                user: socket.user.userName,
                message: `${socket.user.userName} has joined the room`
            });
        });

        // Handle room joining
        socket.on('joinRoom', ({room, userName}) => {
            // Send message to the room
            socket.user = { room, userName, id: socket.id };
            io.to(room).emit('chat', {
                room: socket.user.room,
                user: socket.user.userName,
                message: `${socket.user.userName} has joined the room`
            });
        });

        // Handle chat message
        socket.on('newMessage', (message) => {
            io.to(socket.user.room).emit('chat', {message, room: socket.user.room, userName: socket.user.userName});
        });

        // Handle disconnection
        socket.on('disconnect', (room) => {
            io.to(room).emit('userLeft', {
                message: 'User has left the room'
            });
            console.log('user disconnected');
        });

    })
}