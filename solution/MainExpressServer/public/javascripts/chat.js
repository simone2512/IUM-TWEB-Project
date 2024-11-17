let name = null;
let roomNo = null;
let chat = io.connect('/chat');

/**
 * Initializes the chat application.
 * Displays the initial form and hides the chat interface.
 * Also initializes the chat socket event listeners.
 */
function init() {
    document.getElementById('initial_form').style.display = 'block';
    document.getElementById('chat_interface').style.display = 'none';

    initChatSocket();
}

/**
 * Initializes the chat socket event listeners.
 * Sets up event handlers for 'joined' and 'chat' events.
 */
function initChatSocket() {
    chat.on('joined', function (room, userId) {
        if (userId === name) {
            // If the user who joined is the current user, hide the login interface
            hideLoginInterface(room, userId);
        } else if (room === roomNo) {
            // If another user joins the same room, notify in the chat history
            writeOnChatHistory('<b>' + userId + '</b>' + ' joined room ' + room, 'red-text');
        }
    });

    // Called when a message is received
    chat.on('chat', function (room, userId, chatText) {
        let who = userId;
        if (userId === name) who = 'Me';
        writeOnChatHistory('<b>' + who + ':</b> ' + chatText);
        scrollToBottom();
    });
}

/**
 * Sends the chat text entered by the user.
 * Emits a 'chat' event with the room number, user name, and chat text.
 */
function sendChatText() {
    let chatText = document.getElementById('chat_input').value;
    chat.emit('chat', roomNo, name, chatText);
}

/**
 * Connects the user to a chat room.
 * Gets the room number and user name from the input fields.
 * If the user name is not provided, generates a default name.
 * Emits a 'create or join' event with the room number and user name.
 */
function connectToRoom() {
    let roomSelect = document.getElementById('roomSelect');
    roomNo = roomSelect.options[roomSelect.selectedIndex].value;
    name = document.getElementById('name').value;
    if (!name) name = 'Unknown-' + Math.random();
    chat.emit('create or join', roomNo, name);
}

/**
 * Writes a message to the chat history.
 * @param {string} text - The text to be written in the chat history.
 * @param {string} [className] - An optional class name to style the text.
 */
function writeOnChatHistory(text, className = '') {
    let history = document.getElementById('chat_history');
    let paragraph = document.createElement('p');
    paragraph.innerHTML = text;
    if (className) {
        paragraph.classList.add(className);
    }
    history.appendChild(paragraph);
    document.getElementById('chat_input').value = '';
    scrollToBottom();
}

/**
 * Hides the login interface and displays the chat interface.
 * Sets the user information and room number in the interface.
 * @param {string} room - The room number.
 * @param {string} userId - The user ID (name).
 */
function hideLoginInterface(room, userId) {
    document.getElementById('initial_form').style.display = 'none';
    document.getElementById('chat_interface').style.display = 'block';
    document.getElementById('who_you_are').innerHTML = userId;
    document.getElementById('in_room').innerHTML = ' ' + room;
    document.getElementById('titleChat').innerHTML = formatRoomName(room) + " Chat";
}

/**
 * Returns to the room selection interface.
 * Clears the chat history and displays the initial form.
 */
function returnToRoomSelection() {
    let history = document.getElementById('chat_history');
    history.innerHTML = '';

    document.getElementById('initial_form').style.display = 'block';
    document.getElementById('chat_interface').style.display = 'none';
}

/**
 * Scrolls the chat history to the bottom.
 */
function scrollToBottom() {
    let history = document.getElementById('chat_history');
    history.scrollTop = history.scrollHeight;
}

/**
 * Formats the room name to the proper display format.
 * @param {string} room - The original room name.
 * @returns {string} - The formatted room name.
 */
function formatRoomName(room) {
    const roomNames = {
        'seriea': 'Serie A',
        'liga': 'Liga',
        'ligue1': 'Ligue 1',
        'bundesliga': 'Bundesliga',
        'premier': 'Premier'
    };
    return roomNames[room] || room;
}