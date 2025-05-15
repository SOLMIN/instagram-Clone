import React, { useState } from 'react';
import './Messages.css';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';

interface Message {
  sender: string;
  content: string;
  timestamp: string;
}

const Messages: React.FC = () => {
  const users = useSelector((state: RootState) => state.users.users); // Fetch users from Redux
  const [selectedUser, setSelectedUser] = useState<string | null>(null);
  const [chatMessages, setChatMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');

  const handleUserClick = (userId: string) => {
    const user = users.find((user) => user.id === userId); // Find the selected user
    setSelectedUser(userId);

    // Load chat messages for the selected user
    setChatMessages([
      { sender: 'You', content: 'Hello!', timestamp: '10:00 AM' },
      { sender: user?.name || 'Other', content: 'Hi there!', timestamp: '10:01 AM' }, // Use the user's name
    ]);
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      const newMessage = {
        sender: 'You',
        content: input,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setChatMessages([...chatMessages, newMessage]);
      setInput('');
    }
  };

  const handleBack = () => {
    setSelectedUser(null);
    setChatMessages([]);
  };

  return (
    <div className="chat">
      {!selectedUser ? (
        <>
          <h1 className="title">Messages</h1>
          <div className="contacts">
            {users.map((user) => (
              <div
                key={user.id}
                className="contactCard cursor-p"
                onClick={() => handleUserClick(user.id)}
              >
                <div className="letter-dp" style={{ backgroundColor: getRandomColor() }}>
                  {user.name.charAt(0).toUpperCase()}
                </div>
                <div>
                  <h2 className="name">{user.name}</h2>
                  <p className="last-msg">Tap to start a conversation</p>
                </div>
              </div>
            ))}
          </div>
        </>
      ) : (
        <div className="chat-box">
          <div className="chat-header">
            <button className="back-btn" onClick={handleBack}>
              Back
            </button>
            <h2 className="chat-title">
              {users.find((user) => user.id === selectedUser)?.name}
            </h2>
          </div>
          <div
            className="chat-messages"
            style={{
              '--chat-background-image': `url(${process.env.PUBLIC_URL}/wallpaper-2.b83720a5.jpg)`,
            } as React.CSSProperties}
          >
            {chatMessages.map((msg, index) => (
              <div
                key={index}
                className={`msg ${msg.sender === 'You' ? 'msg-right' : 'msg-left'}`}
              >
                <span className="sender-name">{msg.sender}</span>
                {msg.content}
                <span className="sent-at">{msg.timestamp}</span>
              </div>
            ))}
          </div>
          <form className="send-form" onSubmit={handleSendMessage}>
            <input
              className="input-box send"
              placeholder="Type a message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            <button type="submit" className="send-btn cursor-p">
              Send
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

// Utility function to generate random colors for avatars
const getRandomColor = () => {
  const colors = [
    '#FF5733', '#33FF57', '#3357FF', '#FF33A1', '#A133FF', '#33FFF5', '#F5FF33',
  ];
  return colors[Math.floor(Math.random() * colors.length)];
};

export default Messages;