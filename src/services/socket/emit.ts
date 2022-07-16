export const emitJoinRoom = (socket: any, chatCode: string) => {
  socket?.emit('joinRoom', {chatCode});
};

export const emitJoinChat = (socket: any) => {
  socket?.emit('chatInit');
};

export const emitLeftRoom = (socket: any, chatCode: string) => {
  socket?.emit('leftRoom', {chatCode});
};

export const emitTyping = (socket: any, chatCode: string) => {
  socket?.emit('typing', {chatCode});
};

export const emitStopTyping = (socket: any, chatCode: string) => {
  socket?.emit('stopTyping', {chatCode});
};
