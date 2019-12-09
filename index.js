import MessageService from "./message-service.js";

console.log("Connection established.");

let userId = "wesjones15";
const messageService = new MessageService();



window.addEventListener("load", () => {
    document.getElementById("greeting").innerHTML = `Welcome ${userId}!`;
    messageService.getAllMessages()
        .then(successCallback, errorCallback);
    function successCallback(response) {
        populateMessages(response);
    }
    function errorCallback (response) {
        console.log(response);
    }
});

const sortMessages = messages => {
    return messages.sort((m1, m2) => {
        console.log(m1.timestamp);
        return m2.timestamp - m1.timestamp;
    })
}

const populateMessages = messages => {
    sortMessages(messages).forEach(message => addMessageToThread(message));
};

const createFormListener = () => {
    const form = document.getElementById("new-message-form");
    form.onsubmit = e => {
        e.preventDefault();
        const data = {
            fromid: userId,
            message: form.message.value
        };
        messageService.createNewMessage(data).then(successCallback, errorCallback);
        function successCallback(response) {
            addMessageToThread(response);

        }
        function errorCallback (response) {
            console.log(response);
        }
    }
};

const addMessageToThread = message => {
    const messageListItem = document.createElement("LI");
    const userIdHeading = document.createElement("h3");
    const messageParagraph = document.createElement("p");
    const messageContent = document.createTextNode(message.message);
    const userIdContent = document.createTextNode(message.fromid);
    userIdHeading.appendChild(userIdContent);
    messageParagraph.appendChild(messageContent);
    messageListItem.appendChild(userIdHeading).appendChild(messageParagraph);
    document.getElementById("message-list").appendChild(messageListItem);
}

createFormListener();