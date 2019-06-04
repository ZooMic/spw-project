import React, {useState} from 'react';
import {mailReadPanel, mailProperty, propertyHeader, propertyBody} from './Mail.module.scss'; 
import { Button, InputGroup, Form } from 'react-bootstrap';

function MailWritePanel ({ sendMail, quitWriting }) {
    const [receiverUsername, setReceiverUsername] = useState('');
    const [subject, setSubject] = useState('');
    const [text, setText] = useState('');

    const sendEmail = () => {
        const mail = {
            username: receiverUsername,
            subject: subject,
            text: text,
        }

        sendMail(mail);
    }

    return (  
        <div className={mailReadPanel}>
            <Button onClick={()=>{quitWriting()}} size="lg" block variant="secondary"> Return </Button>
                <Form>
                    <Form.Group controlId="exampleForm.ControlInput1">
                        <Form.Label>Receiver username</Form.Label>
                        <Form.Control value={receiverUsername} onChange={(event)=>{setReceiverUsername(event.currentTarget.value)}}/>
                    </Form.Group>
                    <Form.Group controlId="exampleForm.ControlInput1">
                        <Form.Label>Subject</Form.Label>
                        <Form.Control value={subject} onChange={(event)=>{setSubject(event.currentTarget.value)}}/>
                    </Form.Group> 
                    <Form.Group controlId="exampleForm.ControlTextarea1">
                        <Form.Label>Message text</Form.Label>
                        <Form.Control as="textarea" rows="3" value={text} onChange={(event)=>{setText(event.currentTarget.value)}}/>
                    </Form.Group>
                </Form>
            <Button onClick={()=>{sendEmail()}} disabled={!(receiverUsername && subject && text)} size="lg" block> Send </Button>
        </div> 
    );
}

export default MailWritePanel;