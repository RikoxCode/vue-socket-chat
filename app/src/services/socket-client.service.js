import { io } from 'socket.io-client';

class SocketService {
    constructor() {
        if (!SocketService.instance) {
            this.socket = io('http://localhost:4000', {
                transports: ['websocket'],  // Nur WebSockets verwenden
                withCredentials: true,      // Wenn du Cookies oder Auth-Header verwendest
            });
            SocketService.instance = this;  // Singleton sichern
        }
        return SocketService.instance;
    }

    getSocket() {
        return this.socket;
    }
}

const socketService = new SocketService();
export default socketService;
