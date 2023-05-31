import React, { useState } from 'react';
import Tesseract from 'tesseract.js';

function OCRComponent() {
  const [text, setText] = useState('');

  const handleImageUpload = async (event) => {
    const imageFile = event.target.files[0];
    const { data: { text } } = await Tesseract.recognize(imageFile);
    setText(text);
  };

  return (
    <div>
      <input type="file" accept="image/*" onChange={handleImageUpload} />
      <div>{text}</div>
    </div>
  );
}

export default OCRComponent;
