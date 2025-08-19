import React, { useState } from 'react';

const StrategicChat = () => {
  const [message, setMessage] = useState('');
  const [conversation, setConversation] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const sendMessage = async () => {
    if (!message.trim()) return;

    const userMessage = { type: 'user', content: message };
    setConversation(prev => [...prev, userMessage]);
    setIsLoading(true);

    try {
      const response = await fetch('http://127.0.0.1:8001/api/strategic/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: message,
          context: {
            company_name: "PM33",
            product_type: "Strategic AI Co-Pilot"
          }
        }),
      });

      const data = await response.json();
      
      const aiResponse = {
        type: 'ai',
        content: data.response,
        workflow: data.workflow
      };
      
      setConversation(prev => [...prev, aiResponse]);
    } catch (error) {
      console.error('Error sending message:', error);
      const errorResponse = {
        type: 'error',
        content: 'Sorry, I encountered an error. Please try again.'
      };
      setConversation(prev => [...prev, errorResponse]);
    } finally {
      setIsLoading(false);
      setMessage('');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="strategic-chat">
      <div className="chat-header">
        <h2>🎯 PM33 Strategic AI Co-Pilot</h2>
        <p>Replace Transform PMs into PMOs 
      </div>
      
      <div className="chat-conversation">
        {conversation.length === 0 && (
          <div className="welcome-message">
            <h3>Welcome to your Strategic AI Co-Pilot!</h3>
            <p>Ask me strategic questions like:</p>
            <ul>
              <li>"Our competitor just launched X feature. How should we respond?"</li>
              <li>"Should we pivot our product roadmap based on market changes?"</li>
              <li>"What's the best go-to-market strategy for our new feature?"</li>
            </ul>
          </div>
        )}
        
        {conversation.map((msg, index) => (
          <div key={index} className={`message ${msg.type}`}>
            {msg.type === 'user' && (
              <div className="user-message">
                <strong>You:</strong> {msg.content}
              </div>
            )}
            
            {msg.type === 'ai' && (
              <div className="ai-message">
                <div className="ai-response">
                  <strong>🎯 Strategic AI:</strong> {msg.content}
                </div>
                
                {msg.workflow && (
                  <div className="workflow-card">
                    <h4>📋 Executable Workflow: {msg.workflow.name}</h4>
                    <p><strong>Objective:</strong> {msg.workflow.objective}</p>
                    
                    <div className="tasks-list">
                      <h5>Tasks ({msg.workflow.tasks.length}):</h5>
                      {msg.workflow.tasks.map((task, taskIndex) => (
                        <div key={taskIndex} className={`task priority-${task.priority}`}>
                          <div className="task-header">
                            <span className="task-title">{task.title}</span>
                            <span className={`priority-badge ${task.priority}`}>
                              {task.priority}
                            </span>
                          </div>
                          <div className="task-meta">
                            👤 {task.assignee} • 📅 {new Date(task.due_date).toLocaleDateString()}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
            
            {msg.type === 'error' && (
              <div className="error-message">
                <strong>❌ Error:</strong> {msg.content}
              </div>
            )}
          </div>
        ))}
        
        {isLoading && (
          <div className="loading-message">
            <div className="spinner"></div>
            <span>Strategic AI is analyzing your request...</span>
          </div>
        )}
      </div>
      
      <div className="chat-input">
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Ask your strategic question here... (Press Enter to send)"
          rows="3"
          disabled={isLoading}
        />
        <button onClick={sendMessage} disabled={isLoading || !message.trim()}>
          {isLoading ? 'Analyzing...' : 'Send Strategic Query'}
        </button>
      </div>
    </div>
  );
};

export default StrategicChat;