const User = require("../models/user");
const users = [];

const getUsers = async () => {
  const user = await User.find();
  return user || [];
};

const addUser = async ({ id, name, email }) => {
  if (!name || !email) return { error: "Username and email are required." };
  const users2 = await getUsers();

  if (users2.length > 0) {
    const existingUser = users2.find((user) => user.email === email);
    if (existingUser) {
      return { error: "User already exists" };
    }
  }

  const newUser = new User({ id, name, email });
  console.log(newUser);
  try {
    await newUser.save();
  } catch (e) {
    console.log(e);
  }

  return { newUser };
};

const removeUser = (id) => {
  const index = users.findIndex((user) => user.id === id);

  if (index !== -1) {
    return users.splice(index, 1)[0];
  }
};

const getUser = async (id) => {
  const user = await User.findOne({ name:id });
  return user;
};

const getUserArray = (id) => {
  return users.filter((user) => user.id !== id);
};

const saveRoom = (name)=>{

}

const getRoom = (name)=>{

}

module.exports = {
  addUser,
  removeUser,
  getUser,
  getUserArray,
  saveRoom,
  getRoom
};
