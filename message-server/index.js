const express = require('express');
const cors = require('cors');
const fs = require('fs');

const app = express();
const port = 3006;
const db = require('./db');

var bodyParser = require('body-parser');
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies
app.use(cors());

app.get('/messages/received', async (req, res) => {
    const messages = await db.getUserReceivedMessages(req.body.userUid);
    res.send(messages);
});

app.get('/messages/sent', async (req, res) => {
    const messages = await db.getUserSentMessages(req.body.userUid);
    res.send(messages);
});

app.post('/messages', async (req, res) => {
    const message = await db.addNewMessage(req.body.message);    
    console.log(`Message with uid: ${message.uid} created`);
    return res.send(message);
}); 

app.delete('/messages', async (req, res) => {
    await db.deleteMessage(req.body.messageUid);    
    console.log(`Message with uid: ${message.uid} deleted`);
    return res.send();
}); 

app.listen(port, () => console.log(`Message server listening on port ${port}`));