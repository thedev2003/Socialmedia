import React, { useEffect, useState } from 'react';
import './Home.css';
function Footer() {
  return (
    <footer className='bg-gray-200 text-gray-700 py-4'>
      <div className='container mx-auto px-4'>
        {/* Footer content for future*/}
        <nav>
          <ul className='flex space-x-4'>
            <li><a href='#' className='hover:underline'>Privacy Policy</a></li>
            <li><a href='#' className='hover:underline'>Terms of Use</a></li>
            <li><a href='#' className='hover:underline'>FAQ</a></li>
            <li><a href='#' className='hover:underline'>Sitemap</a></li>
          </ul>
        </nav>
        <p>&copy; 2023 ONLINE Platform. All rights reserved.</p>
      </div>
    </footer>
  );
}

function Home() {
  const [greetingText, setGreetingText] = useState('');
  const [charIndex, setCharIndex] = useState(0);

  useEffect(() => {
    const greetingText = "Welcome to our GalleryConnect!";
    const typingInterval = setInterval(() => {
      if (charIndex < greetingText.length) {
        setGreetingText((prevText) => prevText + greetingText.charAt(charIndex));
        setCharIndex((prevIndex) => prevIndex + 1);
      } else {
        clearInterval(typingInterval);
      }
    }, 100);

    return () => clearInterval(typingInterval);
  }, [charIndex]);
  return (
    <div className='px-4 py-12 max-w-2xl mx-auto'>
      <h1 className='title' id="greeting">
        {greetingText}
      </h1>
      <p className='mb-4 text-slate-700'>
      This is a full-stack web application built using the MERN stack (MongoDB, Express, React, Node.js). The app is designed to let users upload, view, and share their photos seamlessly, making it a vibrant platform for creativity and connection.
      </p>
      <ul className='mb-4 text-slate-700 list-disc list-inside'><strong>Key Features:</strong>
        <li>User Authentication: Users can easily sign up, log in, and log out using Google Authentication, ensuring a smooth and secure experience.</li>
        <li>Photo Uploading: Users can upload photos directly from their laptops, accompanied by captions to share their moments with the community.</li>
        <li>Personal Photo Gallery: Each user can view their uploaded photos in a personalized dashboard, ensuring that everyone sees only their own images.</li>
      </ul>
      <p className='mb-4 text-slate-700'>
      The front end of the application is developed with React, utilizing React Router for efficient client-side navigation. The back end is powered by Node.js and Express, while MongoDB will be integrated in future updates for persistent data storage.
      </p>
      <p className='mb-4 text-slate-700'>
      Currently, the app serves as a <strong>demo</strong> to showcase its core functionalities, with plans for future enhancements, including the implementation of a database for storing images permanently.
      </p>
      <p className='mb-4 text-slate-700'>
      This application serves as a foundational template for building full-stack web applications with photo-sharing capabilities using the MERN stack. Feel free to explore and use it as inspiration for your own projects!
      </p>
    </div>
  );
}

export default function App() {
  return (
    <div className="flex flex-col h-screen">
      <main className="flex-grow">
        <Home />
      </main>
      <Footer />
    </div>
  );
}
