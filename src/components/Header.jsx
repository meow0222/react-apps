// components/Header.js
import React, { useState } from 'react';

const Header = () => {
  const [responseMessage, setResponseMessage] = useState('');

  const handleServerConnection = async () => {
    try {
      const response = await fetch('/api/data', {
        method: 'GET', // サーバーサイドのエンドポイントにリクエストを送信
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const data = await response.json();
        setResponseMessage(data.message);
      } else {
        console.error('Failed to fetch data');
        setResponseMessage('Failed to fetch data');
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      setResponseMessage('Error fetching data');
    }
  };

  return (
    <header className="bg-gray-200 p-4">
      <div className="container mx-auto">
        <h2 className="text-lg font-semibold">Server Connection</h2>
        <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded" onClick={handleServerConnection}>Connect to Server</button>
        <p>{responseMessage}</p>
      </div>
    </header>
  );
};

export default Header;
