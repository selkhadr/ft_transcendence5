export function load_chat()
{
class chat extends HTMLElement {
    constructor(){
        super();
    this.innerHTML = `
    <style>
        @import './styles/chat/chat.css';
    </style>
    <div class="app-container">
    <div class="contact-list"></div>
    <div class="chat-container">
        <div class="chat-messages"></div>
        <form class="chat-input-form">
            
            <input type="text" class="chat-input" rsouequired placeholder="Type here, sara..">
            <button type="submit" class="button send-button">Send</button>
        </form>
    </div>
</div>
    `;
    }
    connectedCallback() {
        console.log("connected in chat js");
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
            console.log("GG");
            const messageElement = document.createElement('div');
            messageElement.classList.add('message', message.sender === authenticated_user.name ? 'sent' : 'received');
            messageElement.innerHTML = `
                <div class="message-sender">${message.sender}</div>
                <div class="message-text">${message.content}</div>
                <div class="message-timestamp">${message.timestamp}</div>
            `;
            return messageElement;
        };



        function create_web_socket(contact){
          let contact_id = contact.id.toString();
          let authenticated_user_id = authenticated_user.id.toString();
          let sorted_ids = [contact_id, authenticated_user_id].sort();
          room_name = sorted_ids.join('');
        
          chatSocket = new WebSocket(
              'ws://'
              + '127.0.0.1:8005/ws/chat/'
              + room_name
              + '/'
          );
          chatSocket.onopen = function(event) {
          console.log('WebSocket connection established');
          socketReady = true;
        };

          chatSocket.onmessage = function(e) {
            const data = JSON.parse(e.data);
            console.log(data);
            const message = data.message;
            console.log(message);
            const messageElement = createMessageElement(message);
            if (chatMessages)
            {
              chatMessages.appendChild(messageElement);
            }
            else
            {
                console.error("Chat message container not found.");
            }
          };
          chatSocket.onclose = function(e) {
              console.error('Chat socket closed unexpectedly');
              setTimeout(() => create_web_socket(currentContact), 1000);
          };
        }



        const displayChatHistory = (messages) => {
          chatMessages.innerHTML = '';
          messages.forEach((message) => {
              const messageElement = createMessageElement({
                  sender: message.sender,
                  content: message.content,
                  timestamp: new Date(message.timestamp).toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })
              });
              chatMessages.appendChild(messageElement);
          });
        };



        const selectContact = (contact) => {
          if (!contact) return;
          chatMessages.innerHTML = '';
        
          create_web_socket(contact);
          chatInputForm.reset();
        
          if (currentContact) {
              const prevContactElement = document.querySelector(`.contact[data-id="${currentContact.id}"]`);
              if (prevContactElement) prevContactElement.classList.remove('active');
          }
      
          currentContact = contact;
          const currentContactElement = document.querySelector(`.contact[data-id="${contact.id}"]`);
          if (`currentContactElement`) currentContactElement.classList.add('active');
      
          chatInput.placeholder = `Type here to ${contact.username}...`;
          fetch(`http://127.0.0.1:8005/chat/chat-history/${room_name}/`)
              .then(response => {
                  if (!response.ok) {
                      throw new Error('Network response was not ok');
                  }
                  return response.json();
              })
              .then(data => {
                console.log("chat-history");
                console.log(data.messages);
                  displayChatHistory(data.messages);
              })
              .catch(error => {
                  console.error('There was a problem fetching the chat history:', error);
              });
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
              chatSocket.send(JSON.stringify({ 'message': message }));
              chatInputForm.reset();
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

        // Modified fetchwhoAmI function to return a Promise
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
              // console.log('Authenticated user:', authenticated_user);
              return data; // Return the data so we know when it's complete
            })
            .catch(error => {
              console.error('Authentication error:', error);
              throw error; // Re-throw the error to be caught by the caller
            });
        }

        // Modified fetchAllUsers function to properly check authenticated_user
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
              contactList.innerHTML = ''; // Clear existing contacts first
            
              contacts.forEach(contact => {
                console.log(authenticated_user.username);
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

        // Modified window.onload handler with proper error handling
        window.onload = async () => {
          try {
            await fetchwhoAmI();
            await fetchAllUsers();
          } catch (error) {
            console.error('Error during initialization:', error);
          }
        };





        chatInputForm.addEventListener('submit', sendMessage);



            }
        }
        customElements.define('chat-elements', chat);
}

