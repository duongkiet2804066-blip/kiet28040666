import React, { useState } from 'react';

export const MessagesPage: React.FC = () => {
  const [messages] = useState([
    { id: 'm-1', sender: 'Bruce Wayne', email: 'bruce@wayne.com', subject: 'Custom Sofa Dimensions', body: 'Hi, can I get the Buddy Sofa with leather lining and extra padding?', time: '10 mins ago' },
    { id: 'm-2', sender: 'Tony Stark', subject: 'Express Delivery Request', body: 'I need the lounge accent items dispatched tonight. Budget is unlimited, let me know the surcharge.', time: '1 hour ago' }
  ]);

  const handleReply = (sender: string) => {
    alert(`Reply template dialog launched for: ${sender}`);
  };

  return (
    <div className="text-start">
      <div className="mb-3">
        <h4 className="fw-bold theme-color m-0">Customer Support Mailbox</h4>
        <p className="text-muted fs-8 m-0">Review help requests, answer inquiries, and reply to buyers.</p>
      </div>

      <ul className="list-group p-0 border rounded bg-white list-group-flush">
        {messages.map((msg) => (
          <li key={msg.id} className="list-group-item p-3">
            <div className="d-flex justify-content-between text-muted fs-8 mb-1">
              <strong>{msg.sender} ({msg.email})</strong>
              <span>{msg.time}</span>
            </div>
            <h6 className="fw-bold theme-color fs-7 m-0 mb-1">{msg.subject}</h6>
            <p className="text-muted fs-7 mb-3">{msg.body}</p>
            <button onClick={() => handleReply(msg.sender)} className="btn btn-sm btn-dark px-3 py-1 rounded-pill">
              Reply Inquiry
            </button>
          </li>
        ))}
        {messages.length === 0 && (
          <li className="list-group-item py-4 text-center text-muted">No messages in inbox.</li>
        )}
      </ul>
    </div>
  );
};
export default MessagesPage;
