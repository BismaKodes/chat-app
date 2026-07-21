// online users book

const users = {}

export const addUser = (userId, socketId) => {
  users[userId] = socketId
}

export const getSocket = (userId) => {
  return users[userId]
}

export const removeUser = (socketId) => {
  for(let userId in users){
     if(users[userId] === socketId){
        delete users[userId]
     }
  }
}

export const getUsers = () => {
  return Object.keys(users);
};

// Object.keys() means: Give me all friend names in the notebook.