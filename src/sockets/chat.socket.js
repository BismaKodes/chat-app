// this is the chat office, everyting happens here, from sending messages to typing indicators, and more

import Message from "../models/message.model.js";
import { socketAuth } from "../middlewares/socket.middleware.js";
import { addUser, getSocket, removeUser, getUsers } from "../utils/socketManager.js";

export const initChatSocket = (io) => {

  io.use(socketAuth);


  io.on("connection", (socket) => {
    console.log("User connected:", socket.id);

    // ➕ Register user
    socket.on("add-user", async () => {


      addUser(socket.userId, socket.id);
      io.emit("getUsers", getUsers());



      // send unread msgs when user comes online
      const unreadMessages = await Message.find({
        receiver: socket.userId,
        read: false
      })

      socket.emit("unreadMessages", unreadMessages);
    });

    // 💬 Send message
    // socket.on("send-message", async ({ receiverId,  message }) => {
    //   // const senderId = socket.user.id; // from auth middleware
    //   const senderId = socket.user?.id;


    //   const savedMessage = await Message.create({
    //     sender: senderId,
    //     reciever: receiverId,
    //     message,
    //     read: false
    //   });

    //   const receiverSocket = getSocket(receiverId);
    //   if (receiverSocket) {
    //     io.to(receiverSocket).emit("newMessage", savedMessage);
    //   } else {
    //     console.log("User is offline. Message saved as unread.");
    //   }

    //   socket.emit("newMessage", savedMessage);
    // });




//  socket.on("send-message", async (data) => {
//   try {

//     const senderId = socket.userId;
//     const receiverId = data.receiverId;

//     console.log("Sender:", senderId);
//     console.log("Receiver:", receiverId);
//     console.log("Message:", data.message);

//     const newMessage = await Message.create({
//       sender: senderId,
//       receiver: receiverId,
//       message: data.message
//     });

//     const receiver = getUsers(receiverId);

//     if (receiver) {
//       io.to(receiver.socketId).emit("newMessage", newMessage);
//     }

//   } catch (error) {
//     console.log("Send message error:", error);
//   }
// });





socket.on("send-message", async (data) => {
  try {

    const senderId = socket.userId;
    const receiverId = data.receiverId;

    console.log("Sender:", senderId);
    console.log("Receiver:", receiverId);
    console.log("Message:", data.message);

    const newMessage = await Message.create({
      sender: senderId,
      receiver: receiverId,
      message: data.message,
      read: false
    });

    console.log("Saved Message:", newMessage);

    // ✅ Correct function
  const receiverSocket = getSocket(receiverId);
  console.log("Receiver Socket:", receiverSocket);

  // send to sender 
  socket.emit("newMessage", newMessage);

if (receiverSocket) {
  io.to(receiverSocket).emit("newMessage", newMessage);
}

  } catch (error) {

    console.log("Send message error:", error);

  }
});







    // ⌨️ Typing
   socket.on("typing", ({ receiverId }) => {

  console.log("Typing sender:", socket.userId);
  console.log("Typing receiver:", receiverId);

  const receiverSocket = getSocket(receiverId);

  console.log("receiverSocket:", receiverSocket);

  if (receiverSocket) {
    io.to(receiverSocket).emit("typing", socket.userId);
  }
});

    // ✋ Stop typing
    socket.on("stop_typing", ({receiverId }) => {
      const receiverSocket = getSocket(receiverId);
      if (receiverSocket) {
        io.to(receiverSocket).emit("stop_typing", socket.userId);
      }
    });

    // ✅ Mark messages as read
  socket.on("markAsRead", async ({ senderId }) => {

  console.log("markAsRead received");
  console.log("senderId:", senderId);
  console.log("reader:", socket.userId);

  await Message.updateMany(
    {
      sender: senderId,
      receiver: socket.userId,
      read: false
    },
    {
      $set: { read: true }
    }
  );



  // this is to check whether the sender i.e B is online or not, if online then we will emit the event to B that A has read the messages, so B can update the UI accordingly
  const senderSocket = getSocket(senderId);

  console.log("senderSocket:", senderSocket);

  if (senderSocket) {
    console.log("Emitting messagesRead");

    io.to(senderSocket).emit("markAsRead", {
      by: socket.userId
    });
  }
});

    // ❌ Disconnect
    socket.on("disconnect", () => {
      removeUser(socket.id);
      io.emit("getUsers", getUsers());
      console.log("User disconnected:", socket.id);
    });
  });
};