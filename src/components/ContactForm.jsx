import React, { useState } from 'react';

function ContactForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async event => {
    event.preventDefault();

    const formData = {
      name: name,
      email: email,
      message: message,
    };

    try {
      const response = await fetch('http://localhost:8080/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        console.log('Data sent successfully');
      } else {
        console.error('Failed to send data');
      }
    } catch (error) {
      console.error('Error sending data:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="name" className='block text-gray-700 text-sm font-bold mb-2'>Name</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={event => setName(event.target.value)}
          className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
        />
      </div>
      <div>
        <label htmlFor="email" className='block text-gray-700 text-sm font-bold mb-2'>Email</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={event => setEmail(event.target.value)}
          className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
        />
      </div>
      <div>
        <label htmlFor="message" className='block text-gray-700 text-sm font-bold mb-2'>Message</label>
        <textarea
          id="message"
          value={message}
          onChange={event => setMessage(event.target.value)}
          className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
        />
      </div>
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
