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
    try { 
        const messages = await db.getUserReceivedMessages(req.query.userId);
        res.send(messages);
    } catch (error) {
        console.log(error);
        res.statusCode = 400;
        res.send(error);
    }
});

app.get('/messages/sent', async (req, res) => { 
    try { 
        const messages = await db.getUserSentMessages(req.query.userId);
        res.send(messages);
    } catch (error) {
        console.log(error);
        res.statusCode = 400;
        res.send(error);
    } 
});

app.post('/messages', async (req, res) => { 
    try { 
        const message = await db.addNewMessage(req.body);    
        console.log(`Message with uid: ${message.uid} created`);
        return res.send(message);
    } catch (error) {
        console.log(error);
        res.statusCode = 400;
        res.send(error);
    }  
}); 

app.delete('/messages', async (req, res) => {
    console.log(req);
    try { 
        await db.deleteMessage(req.body.id);    
    console.log(`Message with uid: ${req.body.id} deleted`);
    return res.send();
    } catch (error) {
        console.log(error);
        res.statusCode = 400;
        res.send(error);
    }  
}); 

app.listen(port, () => console.log(`Message server listening on port ${port}`));