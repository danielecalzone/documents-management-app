interface NotificationData {
  title?: string;
  body?: string;
  timestamp?: string;
}

const SOCKET_URL = 'ws://localhost:8080/notifications';
let socket: WebSocket;

function isOnline() {
  return navigator.onLine;
}

export function connectWebSocket(
  onNotification: (data: NotificationData) => void
) {
  if (!isOnline()) {
    console.warn('Cannot connect to WebSocket: Offline');
    return;
  }
  socket = new WebSocket(SOCKET_URL);

  socket.onmessage = (event) => {
    const data: NotificationData = JSON.parse(event.data);
    onNotification(data);
  };

  socket.onerror = (error) => {
    console.error('WebSocket Error:', error);
  };

  socket.onclose = () => {
    console.log('WebSocket connection closed');
  };
}

export function disconnectWebSocket() {
  if (socket) {
    socket.close();
  }
}
