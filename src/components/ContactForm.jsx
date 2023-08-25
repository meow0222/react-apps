import React, { useState } from 'react';

function ContactForm() {
  // ステートの初期値を空文字列に設定
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  // フォームの送信時に実行される関数
  const handleSubmit = async event => {
    event.preventDefault(); // デフォルトのフォーム送信を防止

    // フォームデータをオブジェクトとして作成
    const formData = {
      name: name,
      email: email,
      message: message,
    };

    try {
      // サーバーに対してPOSTリクエストを送信
      const response = await fetch('http://localhost:5174/submit', {
        method: 'POST', // POSTメソッドを使用
        headers: {
          'Content-Type': 'application/json', // JSON形式でデータを送信
        },
        body: JSON.stringify(formData), // フォームデータをJSON文字列に変換して送信
      });

      // レスポンスが成功した場合
      if (response.ok) {
        console.log('Data sent successfully'); // コンソールに成功メッセージを表示
      } else {
        console.error('Failed to send data'); // コンソールにエラーメッセージを表示
      }
    } catch (error) {
      console.error('Error sending data:', error); // エラーが発生した場合、エラーメッセージを表示
    }
  };

  return (
    // フォームの描画
    <form onSubmit={handleSubmit}>
      {/* 名前入力フォーム */}
      <div>
        <label htmlFor="name" className='block text-gray-700 text-sm font-bold mb-2 my-12'>Name</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={event => setName(event.target.value)} // 入力値の変更時にステートを更新
          className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
        />
      </div>
      {/* メールアドレス入力フォーム */}
      <div>
        <label htmlFor="email" className='block text-gray-700 text-sm font-bold mb-2'>Email</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={event => setEmail(event.target.value)} // 入力値の変更時にステートを更新
          className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
        />
      </div>
      {/* メッセージ入力フォーム */}
      <div>
        <label htmlFor="message" className='block text-gray-700 text-sm font-bold mb-2'>Message</label>
        <textarea
          id="message"
          value={message}
          onChange={event => setMessage(event.target.value)} // 入力値の変更時にステートを更新
          className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
        />
      </div>
      {/* 送信ボタン */}
      <button 
        type="submit"
        className='h-10
        px-5
        text-indigo-100
        bg-indigo-700
        rounded-lg
        transition-colors
        duration-150
        focus:shadow-outline
        hover:bg-indigo-800'
      >Submit</button>
    </form>
  );
}

export default ContactForm;
