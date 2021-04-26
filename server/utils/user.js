const users = [];

const addUser = ({ id }, name, room) => {
  console.log(id, name, room, "here");
  if (!name || !room) return { error: "Username and room are required." };
  const existingUser = users.find(
    (user) => user.room === room && user.name === name
  );
  if (existingUser) {
    return { error: "User already exists" };
  }

  const user = { id, name, room };
  users.push(user);

  return { user };
};

const removeUser = (id) => {
  const index = users.findIndex((user) => user.id === id);

  if (index !== -1) {
    return users.splice(index, 1)[0];
  }
};

const getUser = (id) => {
  return users.find((user) => user.id === id);
};

const getUserArray = (id) => {
  return users.filter((user) => user.id !== id);
};

module.exports = {
  addUser,
  removeUser,
  getUser,
  getUserArray,
};
