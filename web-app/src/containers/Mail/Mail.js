import React from 'react'; 
import { Button, ListGroup, ListGroupItem, InputGroup, FormControl } from 'react-bootstrap'; 
import { mail, leftPanel, rightPanel, buttons, received, sent, header } from './Mail.module.scss'; 
import { connect } from 'react-redux';
import { fetchReceivedMailsAction, fetchSentMailsAction, deleteMailAction, sendMailAction } from './../../actions/mailActions'; 
import { fetchUsersAction } from './../../actions/usersActions';
import MailReadPanel from './MailReadPanel';
import MailWritePanel from './MailWritePanel'; 

class Chat extends React.Component {
    constructor(props) {
      super(props);

      this.props.fetchUsers();

      let username = 'Anonim';
      if (localStorage.getItem('username')) {
        username = localStorage.getItem('username');
      } else if (sessionStorage.getItem('username')) {
        username = sessionStorage.getItem('username');
      }

      let userId = null;
      if (localStorage.getItem('userId')) {
        userId = localStorage.getItem('userId');
      } else if (sessionStorage.getItem('userId')) {
        userId = sessionStorage.getItem('userId');
      }

      console.log('Fetching received');
      this.props.fetchReceived(userId);
      this.props.fetchSent(userId); 
      
      this.state = { 
        selectedMessageType: 'received',
        selectedMessageIndex: 0,
        username: username, 
        userId: userId,
        writeMode: false
      };
    }

    componentDidMount = () => {   
      window.addEventListener('keypress', this.onKeyPressed, true);
    }  

    componentWillUnmount = () => {
      window.removeEventListener('keypress', this.onKeyPressed, true);
    }

    onKeyPressed = (event) => {
      if (event.keyCode === 13) { 
      }
    }

    parseMailsToListGroupItems = (mails, type) => {  
      if (!mails) {
        return <ListGroupItem >
          Getting mails...
        </ListGroupItem>
      }

      return mails.map((mail, index) => {
        return <ListGroupItem 
                  action 
                  active={this.state.selectedMessageType === type && this.state.selectedMessageIndex === index}
                  key={index} 
                  onClick={() => this.setState({selectedMessageIndex: index, selectedMessageType: type })}> 
                  {mail.senderName} {mail.subject} 
                </ListGroupItem>
      });
    } 

    renderRightPanel = () => {
      let email = null;  
      if (this.props.mailsReceived && this.props.mailsSent) {
          email = this.state.selectedMessageType === 'received'? this.props.mailsReceived[this.state.selectedMessageIndex] : 
          this.props.mailsSent[this.state.selectedMessageIndex];
      }

      if (email == null) {
        return null;
      }

      console.log(email);
      return this.state.writeMode ? <MailWritePanel sendMail={(mail)=>this.sendMail(mail)} quitWriting={()=>this.toggleWriteMode()}/> : <MailReadPanel mail={email}/>; 
    }

    toggleWriteMode = () => {
      this.setState({writeMode: !this.state.writeMode});
    }

    deleteSelectedMail = () => {
      var mail = null;
 
      if (this.selectedMessageType == 'received') {
        mail = this.props.mailsReceived[this.state.selectedMessageIndex];
      } else {
        mail = this.props.mailsSent[this.state.selectedMessageIndex];
      }

      console.log(mail);
      console.log(mail.id);

      this.props.deleteMail(mail.id);
    }

    sendMail = (mail) => {
      mail.senderUid = this.state.userId;
      mail.senderName = this.state.username;
      let user = this.props.users.find((user) => {return user.userName === mail.username});

      console.log(mail);
      console.log(this.props.users);
      mail.userUid = user.id;
      this.props.sendMail(mail);
    }
  
    render() { 

      return ( 
      <div className={mail}>
        <div className={leftPanel}> 
            <div className={buttons}> 
                <Button onClick={() => this.toggleWriteMode()}  size="lg" block> Write </Button>
                <Button onClick={() => this.deleteSelectedMail()}variant="danger" size="sm" block> Delete </Button>
            </div>
            <div className={header}>Received messages</div>
            <div className={received}>   
              <ListGroup> 
                {this.parseMailsToListGroupItems(this.props.mailsReceived, 'received')}
              </ListGroup>  
            </div>
            <div className={header}> Sent messages </div> 
            <div className={sent}>  
              <ListGroup> 
                {this.parseMailsToListGroupItems(this.props.mailsSent, 'sent')}
              </ListGroup>
            </div>
        </div> 
        <div className={rightPanel}> 
          {this.renderRightPanel()}
        </div> 
      </div>
    )}
  } 

const mapStateToProps = (state) => ({
    mailsReceived: state.mails.mailsReceived,
    receivedPending: state.mails.receivedPending,  
    receivedError: state.mails.receivedError,
    mailsSent: state.mails.mailsSent,
    sentPending: state.mails.sentPending,
    sentError: state.mails.sentError,
    deletePending: state.mails.deletePending,
    deleteError: state.mails.deleteError,
    sendPending: state.mails.sendPending,
    sendError: state.mails.sendError,
    users: state.users.users,
});

const mapDispatchToProps = (dispatch) => ({
    fetchReceived: (userId) => dispatch(fetchReceivedMailsAction(userId)),
    fetchSent: (userId) => dispatch(fetchSentMailsAction(userId)),
    deleteMail: (mailId) => dispatch(deleteMailAction(mailId)),
    sendMail: (mail) => dispatch(sendMailAction(mail)), 
    fetchUsers: () => dispatch(fetchUsersAction()),
});
 
export default connect(mapStateToProps, mapDispatchToProps)(Chat);