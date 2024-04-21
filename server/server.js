const express = require('express')
const { chats } = require('./data/data')
require('dotenv').config()
const app = express()

app.get('/api', (req, res) => {
    res.send("API is working fine");
});

app.get('/api/chats', (req, res) => {
    res.send(chats);
});

app.get('/api/chats/:id', (req, res) => {
    let chat = chats.find((chat) => req.params.id === chat._id);
    res.send(chat);
});


const PORT = process.env.SERVER_PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});


