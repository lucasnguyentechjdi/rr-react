export const listenUserJoin = (socket: any, cb: any) => {
  socket.off('userJoin').on('userJoin', function (data: any) {
    cb(data);
  });
  return true;
};

export const listenUserLeft = (socket: any, cb: any) => {
  socket.off('userLeft').on('userLeft', function (data: any) {
    cb(data);
  });
  return true;
};

export const listenTyping = (socket: any, cb: any) => {
  socket.off('typing').on('typing', function (data: any) {
    cb(data);
  });
  return true;
};

export const listenStopTyping = (socket: any, cb: any) => {
  socket.off('stopTyping').on('stopTyping', function (data: any) {
    cb(data);
  });
  return true;
};

export const listenNewMessage = (socket: any, cb: any) => {
  console.log('listenNewMessage');
  socket.off('newMessage').on('newMessage', function (data: any) {
    cb(data);
  });
  return true;
};

export const listenError = (socket: any, cb: any) => {
  socket.off('error').on('error', function (data: any) {
    cb(data);
  });
  return true;
};

export const listenNewEvent = (socket: any, cb: any) => {
  socket.off('newEvent').on('newEvent', function (data: any) {
    cb(data);
  });
  return true;
};
