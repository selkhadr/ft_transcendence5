const chatMessages = document.querySelector('.chat-messages');
const chatInputForm = document.querySelector('.chat-input-form');
const chatInput = document.querySelector('.chat-input');
const contactList = document.querySelector('.contact-list');

let currentContact = null;
let authenticated_user;

let contacts = [];
let room_name;
let chatSocket;
let socketReady = false;

const createMessageElement = (message) => {
    const messageElement = document.createElement('div');
    messageElement.classList.add('message', message.sender === authenticated_user.username ? 'sent' : 'received');
    messageElement.innerHTML = `
        <div class="message-sender">${message.sender}</div>
        <div class="message-text">${message.content}</div>
        <div class="message-timestamp">${message.timestamp}</div>
    `;
    return messageElement;
};

// Function to save chat history in localStorage
const saveChatHistory = (room_name, message) => {
    let chatHistory = JSON.parse(localStorage.getItem(room_name)) || [];
    chatHistory.push(message);
    localStorage.setItem(room_name, JSON.stringify(chatHistory));
};

// Function to load chat history from localStorage
const loadChatHistory = (room_name) => {
    const chatHistory = JSON.parse(localStorage.getItem(room_name)) || [];
    chatMessages.innerHTML = ''; // Clear current messages
    chatHistory.forEach(message => {
        const messageElement = createMessageElement(message);
        chatMessages.appendChild(messageElement);
    });
};

function create_web_socket(contact) {
      if (chatSocket) {
        chatSocket.onmessage = null; // Ensure no duplicate message handler
        chatSocket.close();
        chatSocket = null;
    }
    let contact_id = contact.id.toString();
    let authenticated_user_id = authenticated_user.id.toString();
    let sorted_ids = [contact_id, authenticated_user_id].sort();
    room_name = sorted_ids.join('');

    // Load chat history when contact is selected
    loadChatHistory(room_name);

    chatSocket = new WebSocket(
        'ws://'
        + '127.0.0.1:8005/ws/chat/'
        + room_name
        + '/'
    );
    chatSocket.onopen = function (event) {
        console.log('WebSocket connection established');
        socketReady = true;
    };

    chatSocket.onmessage = function (e) {
        const data = JSON.parse(e.data);
        const message = data.message;
        const messageElement = createMessageElement(message);
        if (chatMessages) {
            chatMessages.appendChild(messageElement);
            saveChatHistory(room_name, message); // Save received message to chat history
        } else {
            console.error("Chat message container not found.");
        }
    };

    chatSocket.onclose = function (e) {
        console.error('Chat socket closed unexpectedly');
    };
}

const selectContact = (contact) => {
    if (!contact) return;
    chatMessages.innerHTML = '';

    create_web_socket(contact);
    chatInputForm.reset();


    chatInput.placeholder = `Type here to ${contact.username}...`;
};

const sendMessage = (e) => {
  e.preventDefault();

  if (socketReady && chatSocket.readyState === WebSocket.OPEN) {
      const timestamp = new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
      const message = {
          sender: authenticated_user.username,
          content: chatInput.value,
          timestamp,
      };

      // Send the message through the WebSocket
      chatSocket.send(JSON.stringify({ 'message': message }));

      // Clear the input field after sending
      chatInputForm.reset();

      // Save to chat history locally, if needed
      saveChatHistory(room_name, message);

      // Remove this line to avoid appending locally:
      // chatMessages.appendChild(messageElement);
  } else {
      console.error("WebSocket is not open. Unable to send message.");
  }
};


const createContactElement = (contact) => {
    const contactElement = document.createElement('div');
    contactElement.classList.add('contact');
    contactElement.innerHTML = `<i class="fas fa-user"></i> ${contact.username}`;
    contactElement.addEventListener('click', () => selectContact(contact));
    return contactElement;
};

function fetchwhoAmI() {
    return fetch('http://127.0.0.1:8001/api/user/', {
        method: 'GET',
        credentials: 'include',
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            authenticated_user = data;
            return data;
        })
        .catch(error => {
            console.error('Authentication error:', error);
            throw error;
        });
}

function fetchAllUsers() {
    if (!authenticated_user || !authenticated_user.id) {
        console.error('No authenticated user found');
        return Promise.reject(new Error('No authenticated user found'));
    }

    return fetch('http://127.0.0.1:8004/api/users/')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            contacts = data;
            contactList.innerHTML = '';

            contacts.forEach(contact => {
                if (contact.username !== authenticated_user.username) {
                    const contactElement = createContactElement(contact);
                    contactElement.setAttribute('data-id', contact.id);
                    contactList.appendChild(contactElement);
                }
            });

            if (contacts.length > 0) {
                selectContact(contacts[0]);
            }
        })
        .catch(error => {
            console.error('Error fetching users:', error);
            throw error;
        });
}

window.onload = async () => {
    try {
        await fetchwhoAmI();
        await fetchAllUsers();
    } catch (error) {
        console.error('Error during initialization:', error);
    }
};

chatInputForm.addEventListener('submit', sendMessage);
