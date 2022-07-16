import {createContext} from 'react';
import {io, Socket} from 'socket.io-client';
import {SOCKET_URL} from '~Root/private/api';
import {getToken} from '~Root/services/storage';

let socket: Socket<any> | null = null;
let socketToken = '';
export const getSocket = async (): Promise<any> => {
  const token = await getToken();
  if (!token) return null;
  if (socket && token === socketToken) return socket;
  if (token) {
    socketToken = token;
    socket = io(SOCKET_URL, {
      extraHeaders: {
        token,
      },
    });
  }
  return socket;
};
export const socketDestroy = () => {
  socket = null;
};
export default socket;
export const SocketContext = createContext<any>(null);
