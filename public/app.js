const ws = new WebSocket('wss://ideal-space-fishstick-q559rg4jjjph946q-3000.app.github.dev/');
const messages = document.getElementById('messages');
const messageInput = document.getElementById('messageInput');
const sendButton = document.getElementById('sendButton');

ws.onopen = () => {
    console.log('Connected to the server');
};

ws.onmessage = (event) => {
    console.log('Received:', event.data);
    const messageDiv = document.createElement('div');
    messageDiv.textContent = event.data;
    messages.appendChild(messageDiv);
};

ws.onerror = (error) => {
    console.error('WebSocket error:', error);
};

ws.onclose = () => {
    console.log('Disconnected from the server');
};

sendButton.onclick = () => {
    const message = messageInput.value;
    console.log(`Sending message: ${message}`);
    ws.send(message);
    messageInput.value = '';
};