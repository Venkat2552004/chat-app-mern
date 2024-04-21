const chats = [
  {
    isGroupChat: false,
    users: [
      {
        name: "Hemanth",
        email: "hemanth@example.com",
      },
      {
        name: "Mahesh",
        email: "mahesh@example.com",
      },
    ],
    _id: "617a077e18c25468bc7c4dd4",
    chatName: "Hemanth",
  },
  {
    isGroupChat: false,
    users: [
      {
        name: "Santhosh",
        email: "santhosh@example.com",
      },
      {
          name: "Mahesh",
          email: "mahesh@example.com",
      },
    ],
    _id: "617a077e18c25468b27c4dd4",
    chatName: "Santhosh",
  },
  {
    isGroupChat: true,
    users: [
      {
        name: "Santhosh",
        email: "santhosh@example.com",
      },
      {
        name: "Mahesh",
        email: "mahesh@example.com",
      },
      {
        name: "Hemanth",
        email: "hemanth@example.com",
      },
    ],
    _id: "617a518c4081150716472c78",
    chatName: "College",
    groupAdmin: {
      name: "Mahesh",
      email: "mahesh@example.com",
    },
  }
];

// don't use module.exports = chats ---> we need to export an object so use
// module.exports = { chats } or module.exports.chats = chats

module.exports = {chats};