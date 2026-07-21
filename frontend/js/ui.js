// =======================================
// SET RECEIVER IDS
// =======================================

function setupReceivers() {

    const user1 = JSON.parse(localStorage.getItem("user1"));
    const user2 = JSON.parse(localStorage.getItem("user2"));

    if (user1 && user2) {

        currentReceiverUser1 = user2._id;
        currentReceiverUser2 = user1._id;

    }

}



// =======================================
// SHOW USER NAMES
// =======================================

function loadUserNames() {

    const user1 = JSON.parse(localStorage.getItem("user1"));
    const user2 = JSON.parse(localStorage.getItem("user2"));

    if (user1) {

        document.getElementById("userNameDisplay1").innerText =
            user1.username;

    }

    if (user2) {

        document.getElementById("userNameDisplay2").innerText =
            user2.username;

    }

}



// =======================================
// UPDATE ONLINE STATUS
// =======================================

function updateOnlineStatus(users) {

    const user1Data = localStorage.getItem("user1");
    const user2Data = localStorage.getItem("user2");

    const user1 =
        user1Data && user1Data !== "undefined"
            ? JSON.parse(user1Data)
            : null;

    const user2 =
        user2Data && user2Data !== "undefined"
            ? JSON.parse(user2Data)
            : null;


    if (user1) {

        // const online = users.find(user => user.userId === user1._id);
        const online = users.includes(user1._id);

        document.getElementById("statusUser1").innerText =
            online ? "🟢 Online" : "⚪ Offline";

    }


    if (user2) {

        // const online = users.find(user => user.userId === user2._id);
        const online = users.includes(user2._id);

        document.getElementById("statusUser2").innerText =
            online ? "🟢 Online" : "⚪ Offline";

    }

}


// =======================================
// CLEAR TYPING
// =======================================

function clearTyping() {

    document.getElementById("typingUser1").innerText = "";
    document.getElementById("typingUser2").innerText = "";

}



// =======================================
// INITIALIZE UI
// =======================================

window.addEventListener("load", () => {

    loadUserNames();

    setupReceivers();

});