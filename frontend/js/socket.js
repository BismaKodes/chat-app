// ======================================
// CONNECT USER 1
// ======================================

function connectUser1() {

    const token = localStorage.getItem("tokenUser1");

    const userString = localStorage.getItem("user1");

if (!userString || userString === "undefined") {
    console.log("User1 not found in localStorage");
    return;
}

const user = JSON.parse(userString);

    socketUser1 = io(SOCKET_URL, {

        auth: {
            token: token
        }

    });

    socketUser1.on("connect", () => {

        console.log("User 1 Connected");

        socketUser1.emit("add-user");

    });


    // New Message
    socketUser1.on("newMessage", (message) => {
        console.log("User1 received:", message);
        addMessageUser1(message);

    });


    // Typing
    socketUser1.on("typing", () => {

        document.getElementById("typingUser1").innerText =
            "Typing...";

    });


    // Stop Typing
    socketUser1.on("stop_typing", () => {

        document.getElementById("typingUser1").innerText =
            "";

    });


    // Online Users
    socketUser1.on("getUsers", (users) => {

        console.log("Online Users:", users);
        updateOnlineStatus(users);

    });


    // Messages Read
    socketUser1.on("markAsRead", () => {

        console.log("User 2 Read Messages");

    });

}





// ======================================
// CONNECT USER 2
// ======================================

function connectUser2() {

    const token = localStorage.getItem("tokenUser2");

    const user = JSON.parse(localStorage.getItem("user2"));

    socketUser2 = io(SOCKET_URL, {

        auth: {
            token: token
        }

    });

    socketUser2.on("connect", () => {

        console.log("User 2 Connected");

        socketUser2.emit("add-user");

    });


    // New Message
    socketUser2.on("newMessage", (message) => {

        addMessageUser2(message);

    });


    // Typing
    socketUser2.on("typing", () => {

        document.getElementById("typingUser2").innerText =
            "Typing...";

    });


    // Stop Typing
    socketUser2.on("stop_typing", () => {

        document.getElementById("typingUser2").innerText =
            "";

    });


    // Online Users
    socketUser2.on("getUsers", (users) => {

        console.log("Online Users:", users);
        updateOnlineStatus(users);

    });


    // Messages Read
    socketUser2.on("markAsRead", () => {

        console.log("User 1 Read Messages");

    });

}





// ======================================
// AUTO CONNECT
// ======================================

window.addEventListener("load", () => {

    if (localStorage.getItem("tokenUser1")) {

        document
            .getElementById("authScreenUser1")
            .classList.add("hidden");

        document
            .getElementById("chatScreenUser1")
            .classList.remove("hidden");

        connectUser1();

    }

    if (localStorage.getItem("tokenUser2")) {

        document
            .getElementById("authScreenUser2")
            .classList.add("hidden");

        document
            .getElementById("chatScreenUser2")
            .classList.remove("hidden");

        connectUser2();

    }

});