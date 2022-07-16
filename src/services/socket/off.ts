export const offUserJoin = (socket: any) => {
  socket?.off('userJoin', () => {});
  return true;
};

export const offUserLeft = (socket: any) => {
  socket?.off('userLeft', () => {});
  return true;
};

export const offTyping = (socket: any) => {
  socket?.off('typing', () => {});
  return true;
};

export const offStopTyping = (socket: any) => {
  socket?.off('stopTyping', () => {});
  return true;
};

export const offNewMessage = (socket: any) => {
  socket?.off('newMessage', () => {});
  return true;
};
