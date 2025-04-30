'use client';

import { useChat } from 'ai/react';
import { useRef, useEffect } from 'react';
import { Table } from './TableComponent';

const ChatBox = () => {

  const { messages, input, handleInputChange, handleSubmit } = useChat({
    maxSteps: 50,
  });

  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="flex flex-col ml-8 h-full border border-gray-300 bg-white">
      <div className="flex-1 overflow-y-auto p-4 bg-white text-gray-800">
        {messages.map((message, index) => {
          const toolRecords = message.toolInvocations?.[0]?.result ?? null;

          return (
            <div key={index} className="mb-4 p-3 bg-gray-100 rounded-lg">
              <div className="text-xs text-gray-500 mb-1">
                {message.role.toUpperCase()} ~
              </div>

              {/* If tool results exist, render a table */}
              {toolRecords ? (
                <>
                <Table data={toolRecords} />
                {/* <pre>{JSON.stringify(toolRecords, null, 2)}</pre> */}
                </>
              ) : (
                <div className="whitespace-pre-wrap">{message.content}</div>
              )}
            </div>
          );
        })}
        <div ref={messagesEndRef} />
      </div>

      <form onSubmit={handleSubmit} className="flex p-4 border-t border-gray-300">
        <input
          type="text"
          value={input}
          onChange={handleInputChange}
          className="flex-1 p-2 border border-gray-300 bg-white rounded mr-2"
          placeholder="Ask me something..."
        />
        <div className="p-2">
          [ <button type="submit" className="bg-transparent rounded hover:underline">
            Submit
          </button> ]
        </div>
      </form>
    </div>
  );
};

export default ChatBox;