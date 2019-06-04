import React from 'react';
import * as signalR from '@aspnet/signalr';
import { Button, ListGroup, ListGroupItem, InputGroup, FormControl } from 'react-bootstrap'; 
import { chat, chatUsers, chatMessages } from './Chat.module.scss';
import faker from 'Faker';
import { connect } from 'react-redux';
import { fetchUsersAction } from './../../actions/usersActions';

class Chat extends React.Component {
    constructor(props) {
      super(props);

      const hubConnection = new signalR.HubConnectionBuilder()
        .withUrl("http://localhost:5000/chat")
        .configureLogging(signalR.LogLevel.None)
        .build();

      hubConnection
          .start()
          .then(() => console.log('Connection started!'))
          .catch(err => console.log(err));

      hubConnection.on('sendToAll', (nick, receivedMessage) => {
        const text = `${nick}: ${receivedMessage}`;
        const messages = this.state.messages.concat([text]);
        this.setState({ messages });
      }); 
     

      let username = 'Anonim';
      if (localStorage.getItem('username')) {
        username = localStorage.getItem('username');
      } else if (sessionStorage.getItem('username')) {
        username = sessionStorage.getItem('username');
      }

      console.log('Fetching users');
      this.props.fetchUsers();
      
      this.state = {
        contacts: [],
        selectedContactIndex: -1,
        username: username,
        message: '',
        messages: [],
        hubConnection: hubConnection,
      };
    }

    componentDidMount = () => {   
        window.addEventListener('keypress', this.onKeyPressed, true);
    } 

    parseContactsToListGroupItems = () => {
      console.log(this.props.users);
      if (!this.props.users) {
        return <ListGroupItem >
          Getting users ...
        </ListGroupItem>
      }

      return this.props.users.filter((user) => { return user.userName !== this.state.username; }).map((contact, index) => {
        return <ListGroupItem 
                  action 
                  active={this.state.selectedContactIndex === index}
                  key={index} 
                  onClick={() => this.setState({selectedContactIndex: index, messages: []})}> 
                  {contact.userName} 
                </ListGroupItem>
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
      <div className={chat}>
        <div className={chatUsers}> 
          <ListGroup> 
              {this.parseContactsToListGroupItems()}
          </ListGroup>
        </div>
        <div className={chatMessages}>
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
        </div>
      </div>
    )}
  }


const mapStateToProps = (state) => ({
    users: state.users.users,
    isPending: state.users.pending,
    error: state.users.error,
});

const mapDispatchToProps = (dispatch) => ({
    fetchUsers: () => dispatch(fetchUsersAction()),
});
 
export default connect(mapStateToProps, mapDispatchToProps)(Chat);