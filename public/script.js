/* linking socket to the frontend/importing IO */
const socket = io()

let username = "";

document.getElementById("join-button").addEventListener(("click"), (event) => {
    /* To prevent refresh/default behaviour */
    event.preventDefault();

    username = document.getElementById("username-input").value;
    if (username.trim() !== "") {
        /* displaying */
        document.querySelector(".form-container").style.display = 'none';
        /* hiding */
        document.querySelector(".chatroom-container").style.display = 'block';
        document.querySelector(".chatroom-header").innerHTML = `Chat Room - ${username}`;
    }
})

/* 
    using set interval 
    to reduce the page of HTTP requests/refreshes;
    
    set interval is cost inefficient;
    set interval is not instant;

    for continuous data transmission, the data size is very important;
    it should be of low size data;

    if there is change in data, the server will capture it;
    if there is change in server, the respective phone client will capture it;

    An I.O is present on the server and a socket is given to every client;

    connection is between sockets and IO;

    socket is unique for every device and it is communicating with the server IO;

    IO is emitting the data in every direction;
    socket is emitting data only to the IO;
*/

document.getElementById("send-button").addEventListener(("click"), (event) => {
    /* precautionary */
    event.preventDefault();

    const data = {
        username: username,
        message: document.getElementById("message-input").value.trim()
    }

    /* emitting data/event 'message' event */
    socket.emit('message', data)

    /* the message we are sending can be added into our conversaiton 
    without waiting for the server to emit it */
    addMessage(data, true)
})

/* receving the message from server */
socket.on('message', (data) => {
    if (data.username !== username) {
        addMessage(data, false)
    }
})

function addMessage(data, check) {
    // check === true ? sent : received
    var msg_div = document.createElement("div")
    msg_div.innerText = `${data.username}: ${data.message}`

    /* attaching an attribute to the html element */
    if (check) {
        msg_div.setAttribute('class', 'message sent')
    } else {
        msg_div.setAttribute('class', 'message received')
    }

    /* appending the message in the container/conversation */
    document.getElementById("message-container").appendChild(msg_div)
    /* clearing the input box after hitting send */
    document.getElementById("message-input").value = ""
}


/* include empty message validation */
/* implement bright/dark mode */
/* logout button */