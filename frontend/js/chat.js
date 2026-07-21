// =========================================
// SEND MESSAGE USER 1
// =========================================

document.getElementById("sendBtnUser1").addEventListener("click", sendMessageUser1);

function sendMessageUser1() {

    const input = document.getElementById("messageUser1");

    const message = input.value.trim();

    if (!message) return;

    socketUser1.emit("send-message", {

        receiverId: currentReceiverUser1,

        message

    });

    input.value = "";

}



// =========================================
// SEND MESSAGE USER 2
// =========================================

document.getElementById("sendBtnUser2").addEventListener("click", sendMessageUser2);

function sendMessageUser2() {

    const input = document.getElementById("messageUser2");

    const message = input.value.trim();

    if (!message) return;

    socketUser2.emit("send-message", {

        receiverId: currentReceiverUser2,

        message

    });

    input.value = "";

}



// =========================================
// RENDER MESSAGE USER 1
// =========================================

function addMessageUser1(messageData) {

    const messages = document.getElementById("messagesUser1");

    const div = document.createElement("div");

    div.className =
        messageData.sender === JSON.parse(localStorage.getItem("user1"))._id
            ? "message mine"
            : "message other";

    div.innerText = messageData.message;

    messages.appendChild(div);

    messages.scrollTop = messages.scrollHeight;

}



// =========================================
// RENDER MESSAGE USER 2
// =========================================

function addMessageUser2(messageData) {

    const messages = document.getElementById("messagesUser2");

    const div = document.createElement("div");

    div.className =
        messageData.sender === JSON.parse(localStorage.getItem("user2"))._id
            ? "message mine"
            : "message other";

    div.innerText = messageData.message;

    messages.appendChild(div);

    messages.scrollTop = messages.scrollHeight;

}



// =========================================
// TYPING USER 1
// =========================================

document.getElementById("messageUser1").addEventListener("input", () => {
    if (!socketUser1) return;
    socketUser1.emit("typing", {

        receiverId: currentReceiverUser1

    });

});



// =========================================
// STOP TYPING USER 1
// =========================================

document.getElementById("messageUser1").addEventListener("blur", () => {

    socketUser1.emit("stop_typing", {

        receiverId: currentReceiverUser1

    });

});



// =========================================
// TYPING USER 2
// =========================================

document.getElementById("messageUser2").addEventListener("input", () => {

    socketUser2.emit("typing", {

        receiverId: currentReceiverUser2

    });

});



// =========================================
// STOP TYPING USER 2
// =========================================

document.getElementById("messageUser2").addEventListener("blur", () => {

    socketUser2.emit("stop_typing", {

        receiverId: currentReceiverUser2

    });

});