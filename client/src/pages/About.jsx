import React from 'react';

export default function About() {
  return (
    <div className='px-4 py-12 max-w-2xl mx-auto'>
      <h1 className='text-3xl font-bold  mb-4 text-slate-800'>About</h1>
      <p className='mb-4 text-slate-700'>
  Welcome to our social media app designed for sharing and storing photos! This application has been built using the MERN stack, which consists of:
</p>
<ul className='mb-4 text-slate-700 list-disc list-inside'>
  <li><strong>MongoDB:</strong> A NoSQL database used for storing and managing data.</li>
  <li><strong>Express.js:</strong> A web application framework for Node.js that simplifies building APIs and server-side applications.</li>
  <li><strong>React:</strong> A powerful front-end library for building user interfaces, allowing for dynamic and responsive web applications.</li>
  <li><strong>Node.js:</strong> A JavaScript runtime that enables server-side scripting, allowing the development of scalable network applications.</li>
</ul>
      <p className='mb-4 text-slate-700'>
      <strong>Currently, this app is not connected to any database.</strong> As a result, images uploaded will not be stored persistently, and upon refreshing or navigating away from the page, all uploaded images will be lost. However, this limitation demonstrates the app's potential capabilities and the user interface without the back-end storage.


      </p>
      <p className='mb-4 text-slate-700'>
      User authentication is facilitated through <strong>Google Authentication</strong>, allowing users to sign in seamlessly with their Google accounts.
      </p>
      <p className='mb-4 text-slate-700'>
      Future plans include integrating a database to enable the permanent storage of images, enhancing the app's functionality. This version serves primarily as a demo to showcase the core features and design, with the intent to build upon it in subsequent iterations.
      </p>
      <p className='mb-4 text-slate-700'>
Thank you for exploring our app!
      </p>
    </div>
  );
}
