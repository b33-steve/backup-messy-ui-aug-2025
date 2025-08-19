'use client';

import React, { useState } from 'react';

interface ChatMessage {
  type: 'user' | 'ai' | 'error';
  content: string;
  workflow?: {
    id: string;
    name: string;
    objective: string;
    tasks: Array<{
      title: string;
      assignee: string;
      priority: string;
      due_date: string;
    }>;
  };
}

const StrategicChat: React.FC = () => {
  const [message, setMessage] = useState('');
  const [conversation, setConversation] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const sendMessage = async () => {
    if (!message.trim()) return;

    const userMessage: ChatMessage = { type: 'user', content: message };
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
      
      const aiResponse: ChatMessage = {
        type: 'ai',
        content: data.response,
        workflow: data.workflow
      };
      
      setConversation(prev => [...prev, aiResponse]);
    } catch (error) {
      console.error('Error sending message:', error);
      const errorResponse: ChatMessage = {
        type: 'error',
        content: 'Sorry, I encountered an error. Please try again.'
      };
      setConversation(prev => [...prev, errorResponse]);
    } finally {
      setIsLoading(false);
      setMessage('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Chat Header */}
      <div className="text-center mb-8 p-6 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl">
        <h2 className="text-2xl font-bold mb-2">🎯 PM33 Strategic AI Co-Pilot</h2>
        <p className="opacity-90">Transform PMs into PMOs through agentic AI teams</p>
      </div>
      
      {/* Conversation Area */}
      <div className="min-h-96 max-h-96 overflow-y-auto mb-6 p-6 bg-gray-50 rounded-xl border">
        {conversation.length === 0 && (
          <div className="text-center text-gray-600 py-10">
            <h3 className="text-lg font-semibold mb-4 text-gray-700">Welcome to your Strategic AI Co-Pilot!</h3>
            <p className="mb-4">Ask me strategic questions like:</p>
            <ul className="text-left max-w-md mx-auto space-y-2">
              <li className="italic">• "Our competitor just launched X feature. How should we respond?"</li>
              <li className="italic">• "Should we pivot our product roadmap based on market changes?"</li>
              <li className="italic">• "What's the best go-to-market strategy for our new feature?"</li>
            </ul>
          </div>
        )}
        
        {conversation.map((msg, index) => (
          <div key={index} className="mb-6">
            {msg.type === 'user' && (
              <div className="flex justify-end">
                <div className="bg-blue-600 text-white p-3 rounded-2xl rounded-tr-sm max-w-xs">
                  <strong>You:</strong> {msg.content}
                </div>
              </div>
            )}
            
            {msg.type === 'ai' && (
              <div className="max-w-4xl">
                <div className="bg-gray-200 p-3 rounded-2xl rounded-tl-sm mb-4 border-l-4 border-blue-600">
                  <strong>🎯 Strategic AI:</strong> {msg.content}
                </div>
                
                {msg.workflow && (
                  <div className="bg-white border-2 border-blue-600 rounded-xl p-5 shadow-sm">
                    <h4 className="text-blue-600 font-bold text-lg mb-2">📋 Executable Workflow: {msg.workflow.name}</h4>
                    <p className="text-gray-700 mb-4 leading-relaxed"><strong>Objective:</strong> {msg.workflow.objective}</p>
                    
                    <div>
                      <h5 className="font-semibold mb-3 text-gray-700">Tasks ({msg.workflow.tasks.length}):</h5>
                      {msg.workflow.tasks.map((task, taskIndex) => (
                        <div key={taskIndex} className={`p-3 rounded-lg mb-2 border-l-4 ${
                          task.priority === 'critical' ? 'border-red-500 bg-red-50' :
                          task.priority === 'high' ? 'border-orange-500 bg-orange-50' :
                          'border-yellow-500 bg-yellow-50'
                        }`}>
                          <div className="flex justify-between items-start mb-2">
                            <span className="font-semibold text-gray-700">{task.title}</span>
                            <span className={`text-xs px-2 py-1 rounded-full font-semibold uppercase ${
                              task.priority === 'critical' ? 'bg-red-500 text-white' :
                              task.priority === 'high' ? 'bg-orange-500 text-white' :
                              'bg-yellow-500 text-black'
                            }`}>
                              {task.priority}
                            </span>
                          </div>
                          <div className="text-sm text-gray-600">
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
              <div className="bg-red-100 border border-red-400 text-red-700 p-3 rounded-lg">
                <strong>❌ Error:</strong> {msg.content}
              </div>
            )}
          </div>
        ))}
        
        {isLoading && (
          <div className="flex items-center gap-3 text-gray-600 p-3">
            <div className="w-5 h-5 border-2 border-gray-300 border-t-blue-600 rounded-full animate-spin"></div>
            <span>Strategic AI is analyzing your request...</span>
          </div>
        )}
      </div>
      
      {/* Input Area */}
      <div className="bg-white p-6 rounded-xl border-2 border-gray-200 shadow-sm">
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Ask your strategic question here... (Press Enter to send)"
          rows={3}
          disabled={isLoading}
          className="w-full border border-gray-300 rounded-lg p-3 text-sm resize-none focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100 mb-3"
        />
        <button
          onClick={sendMessage}
          disabled={isLoading || !message.trim()}
          className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-6 rounded-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed hover:opacity-90 transition-opacity"
        >
          {isLoading ? 'Analyzing...' : 'Send Strategic Query'}
        </button>
      </div>
    </div>
  );
};

export default StrategicChat;