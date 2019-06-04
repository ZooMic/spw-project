const Sequelize = require('sequelize');

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './database.sqlite'
}); 

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

const Message = sequelize.define('Message', {  
  userUid: {
    type: Sequelize.UUID,
    allowNull: false
  },
  senderUid: {
    type: Sequelize.UUID,
    allowNull: false
  },
  username: {
    type: Sequelize.STRING,
    allowNull: false
  },
  senderName: {
    type: Sequelize.STRING,
    allowNull: false
  },
  subject: {
    type: Sequelize.STRING,
    allowNull: true
  },
  text: {
    type: Sequelize.STRING,
    allowNull: true
  }
}); 

Message.sync();  

exports.deleteMessage= async function deleteMessage(messageUid) {
  return await Message.destroy({
    where: {
      id: messageUid
    }
  }).then(() => {
    console.log(`Message with id ${messageUid} deleted`);
  });
} 

exports.addNewMessage = async function addNewMessage(message) {
  return await Message.create(message);
} 
exports.getUserReceivedMessages = async function getUserReceivedMessages(userUid) {
  console.log('Getting user received messages');
  console.log(userUid);
  return await Message.findAll({
    where: {
      userUid: userUid
  }});   
}

exports.getUserSentMessages = async function getUserSentMessages(userUid) {
  console.log('Getting user sent messages');
  console.log(userUid);
  return await Message.findAll({
    where: {
      senderUid: userUid
  }});   
}