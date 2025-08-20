declare const io: any;

const API_URL = 'http://localhost:3000';
let token = '';
let userId: number;
let socket: any;
let currentRoomId = '';
let currentEventId = 0;

const loginDiv = document.getElementById('login')!;
const eventsDiv = document.getElementById('events')!;
const chatDiv = document.getElementById('chat')!;
const eventsList = document.getElementById('eventsList')!;
const chatTitle = document.getElementById('chatTitle')!;
const messagesUl = document.getElementById('messages') as HTMLUListElement;
const messageInput = document.getElementById('messageInput') as HTMLInputElement;

(document.getElementById('loginBtn') as HTMLButtonElement).addEventListener('click', async () => {
  const username = (document.getElementById('username') as HTMLInputElement).value;
  const password = (document.getElementById('password') as HTMLInputElement).value;
  const res = await fetch(`${API_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password }),
  });
  const data = await res.json();
  token = data.access_token;
  const payload = JSON.parse(atob(token.split('.')[1]));
  userId = payload.sub;
  await loadEvents();
  loginDiv.style.display = 'none';
  eventsDiv.style.display = 'block';
});

async function loadEvents() {
  const res = await fetch(`${API_URL}/events/user/${userId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  const events = await res.json();
  eventsList.innerHTML = '';
  events.forEach((evt: any) => {
    const li = document.createElement('li');
    li.textContent = evt.title;
    li.addEventListener('click', () => joinEvent(evt));
    eventsList.appendChild(li);
  });
}

async function joinEvent(evt: any) {
  eventsDiv.style.display = 'none';
  chatDiv.style.display = 'block';
  chatTitle.textContent = evt.title;
  currentRoomId = evt.roomId;
  currentEventId = evt.id;
  socket = io(API_URL, { auth: { token } });
  socket.emit('join', currentRoomId);
  socket.on('message', (msg: any) => {
    const li = document.createElement('li');
    li.textContent = `${msg.user.username}: ${msg.message}`;
    messagesUl.appendChild(li);
  });
  const res = await fetch(`${API_URL}/events/${currentEventId}/messages`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  const msgs = await res.json();
  messagesUl.innerHTML = '';
  msgs.forEach((m: any) => {
    const li = document.createElement('li');
    li.textContent = `${m.userEvent.user.username}: ${m.message}`;
    messagesUl.appendChild(li);
  });
}

(document.getElementById('sendBtn') as HTMLButtonElement).addEventListener('click', () => {
  const msg = messageInput.value;
  socket.emit('message', { roomId: currentRoomId, message: msg });
  messageInput.value = '';
});

(document.getElementById('backBtn') as HTMLButtonElement).addEventListener('click', () => {
  socket.disconnect();
  chatDiv.style.display = 'none';
  eventsDiv.style.display = 'block';
  messagesUl.innerHTML = '';
});
