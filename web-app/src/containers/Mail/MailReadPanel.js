import React from 'react';
import {mailReadPanel, mailProperty, propertyHeader, propertyBody} from './Mail.module.scss'; 

function MailReadPanel ({ mail }) {
    return (  
        <div className={mailReadPanel}>
            <div className={mailProperty}>
              <div className={propertyHeader}> From: </div> <div className={propertyBody}> {mail.senderName} </div>  
            </div>
            <div className={mailProperty}>
              <div className={propertyHeader}> To: </div> <div className={propertyBody}> {mail.username} </div>  
            </div>
            <div className={mailProperty}>
              <div className={propertyHeader}> Subject: </div>  <div className={propertyBody}> {mail.subject} </div>  
            </div>
            <div className={mailProperty} style={{'height': '500px'}}>
              <div className={propertyHeader}> Text: </div>   <div className={propertyBody}> {mail.text}</div>  
            </div> 
        </div> 
    );
}

export default MailReadPanel;