import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import './Dashboard.css'; 

export default function Dashboard() {
  const { currentUser } = useSelector((state) => state.user);
  const [photos, setPhotos] = useState([]);
  const [file, setFile] = useState(null);
  const [caption, setCaption] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [buttonColor, setButtonColor] = useState('red');

  useEffect(() => {
    const staticPhotos = [
      {
        _id: 'puppy',
        url: '/uploads/puppy.jpg', 
        caption: 'Puppy',
      },
      {
        _id: 'evening',
        url: '/uploads/evening.jpeg',
        caption: 'Evening',
      },
      {
        _id: 'nature',
        url: '/uploads/nature.jpeg', 
        caption: 'An ecstatic view',
      },
    ];
    setPhotos(staticPhotos);
  }, []);

  const handleUpload = (e) => {
    e.preventDefault();
    if (!file || !caption) return;

    const newPhoto = {
      _id: Date.now(),
      url: URL.createObjectURL(file),
      caption: caption,
    };

    setPhotos((prevPhotos) => [newPhoto, ...prevPhotos]);
    setFile(null);
    setCaption('');
    setButtonColor('red'); 
  };

  const handleInputChange = () => {
    if (file && caption) {
      setButtonColor('green');
    } else {
      setButtonColor('red');
    }
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    handleInputChange();
    if (selectedFile) {
      const reader = new FileReader();
      reader.onload = () => {
        const imgPreview = document.getElementById('imgPreview');
        imgPreview.src = reader.result; 
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  return (
    <div className='dashboard'>
      <div className='upload-section'>
        <h1 className='text-3xl font-semibold text-center my-5'>Welcome to Your Dashboard</h1>
        <form onSubmit={handleUpload} className='flex flex-col gap-3'>
          <input
            type='file'
            accept='image/*'
            className='file-input'
            onChange={handleFileChange} 
          />
          <img
            id='imgPreview'
            alt='Preview'
            className='preview-image'
            style={{ display: file ? 'block' : 'none' }}
          />
          <input
            type='text'
            value={caption}
            onChange={(e) => {
              setCaption(e.target.value);
              handleInputChange(); 
            }}
            placeholder='Enter a caption for your photo'
            className='p-2 border rounded-md'
          />
          <button
            type='submit'
            className={`upload-button ${buttonColor}`}
            disabled={buttonColor === 'red'}
          >
            Upload Photo
          </button>
        </form>
        {errorMessage && <p className='text-red-500'>{errorMessage}</p>}
      </div>
      <div className='mt-5 text-center'>
        <h2 className='text-2xl font-semibold'>Your Photos</h2>
        <div className='grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4 mx-auto'>
          {photos.length > 0 ? (
            photos.map((photo) => (
              <div key={photo._id} className='photo-box'>
                <img
                  src={photo.url}
                  alt='Uploaded'
                  className='uploaded-photo'
                />
                <p className='text-center'>{photo.caption}</p>
              </div>
            ))
          ) : (
            <p>No photos uploaded yet.</p>
          )}
        </div>
      </div>
    </div>
  );
}
