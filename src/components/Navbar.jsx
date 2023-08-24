import React from 'react';

const Navbar = () => {
  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <a href="/" className="text-white font-bold text-xl">My App</a>
        <ul className="flex space-x-4">
          <li><a href="/" className="text-white">Home</a></li>
          <li><a href="/calendar" className="text-white">Calendar</a></li>
          <li><a href="/contact" className="text-white">Contact</a></li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
