import React, { useState, useEffect } from 'react';
import * as signalR from '@aspnet/signalr';
import { Button, ListGroup, ListGroupItem, InputGroup, FormControl } from 'react-bootstrap'

class Chat extends React.Component {
    constructor(props) {
      super(props);
      
      this.state = {
        username: '',
        message: '',
        messages: [],
        hubConnection: null,
      };
    }

    componentDidMount = () => {
        window.addEventListener('keypress', this.onKeyPressed, true);

        const username = this.props.username ? this.props.username : 'Anonim';
      
        const hubConnection = new signalR.HubConnectionBuilder()
        .withUrl("http://localhost:5000/chat")
        .configureLogging(signalR.LogLevel.None)
        .build();
      
        this.setState({ hubConnection, username }, () => {
          this.state.hubConnection
            .start()
            .then(() => console.log('Connection started!'))
            .catch(err => console.log(err));

            this.state.hubConnection.on('sendToAll', (nick, receivedMessage) => {
                const text = `${nick}: ${receivedMessage}`;
                const messages = this.state.messages.concat([text]);
                this.setState({ messages });
        });
        });
    }

    componentWillUnmount = () => {
        window.removeEventListener('keypress', this.onKeyPressed, true);
    }

    onKeyPressed = (event) => {
        if (event.keyCode === 13) {
            this.sendMessage();
        }
    }

    sendMessage = () => {
        this.state.hubConnection
          .invoke('sendToAll', this.state.username, this.state.message)
          .catch(err => console.error(err));
      
          this.setState({message: ''});      
      };
  
    render() {
      return ( 
      <div> 

        <InputGroup>
            <FormControl
            type="text"
            value={this.state.message}
            onChange={e => this.setState({ message: e.target.value })}
            />   
            <InputGroup.Append>
                <Button onClick={this.sendMessage} variant="primary" type="button" size="sm">Send</Button>
            </InputGroup.Append>
        </InputGroup> 
  
        <ListGroup>
          {this.state.messages.map((message, index) => (
            <ListGroupItem key={index}> {message} </ListGroupItem>
          ))}
        </ListGroup>
    </div>)
    }
  }

export default Chat;