// components/Header.js
import React, { useState } from 'react';

const Header = () => {
  // responseMessage ステート：サーバーからのレスポンスメッセージを保持する
  const [responseMessage, setResponseMessage] = useState('');

  // サーバーとの通信を行う関数
  const handleServerConnection = async () => {
    try {
      // サーバーにリクエストを送信し、レスポンスを待機
      const response = await fetch('/api/data', {
        method: 'GET', // サーバーサイドのエンドポイントに GET リクエストを送信
        headers: {
          'Content-Type': 'application/json',
        },
      });

      // レスポンスが成功した場合
      if (response.ok) {
        // レスポンスデータを JSON としてパースして取得
        const data = await response.json();
        // レスポンスメッセージをステートにセット
        setResponseMessage(data.message);
      } else {
        // レスポンスが失敗した場合
        console.error('Failed to fetch data');
        setResponseMessage('Failed to fetch data');
      }
    } catch (error) {
      // エラーが発生した場合
      console.error('Error fetching data:', error);
      setResponseMessage('Error fetching data');
    }
  };

  return (
    // ヘッダーセクションの表示
    <header className="bg-gray-200 p-4">
      <div className="container mx-auto">
        {/* ヘッダータイトル */}
        <h2 className="text-lg font-semibold">Server Connection</h2>
        {/* サーバーに接続するボタン */}
        <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded" onClick={handleServerConnection}>Connect to Server</button>
        {/* サーバーからのレスポンスメッセージ */}
        <p>{responseMessage}</p>
      </div>
    </header>
  );
};

export default Header;
