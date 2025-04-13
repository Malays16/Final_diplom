import { STATIC_IMG } from '@/services/apiConfig';
import React from 'react';
import './HotelImages.scss';

interface HotelImagesProps {
  type: 'hotels' | 'rooms';
  images: string[];
  handleImageUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleImageRemove: (image: string) => void;
}

const HotelImages: React.FC<HotelImagesProps> = ({ type, images, handleImageUpload, handleImageRemove }) => {

  const imgDir = type === 'hotels' ? 'hotels' : 'hotel-rooms';

  return (
    <div className="hotel-images">
      {images.length > 0 && (
        <div className="form-input">
          <div className="images-list">
            {images.map((image, index) => (
              <div className="image" key={index}>
                <div className="remove" onClick={() => handleImageRemove(image)}></div>
                <img src={`${STATIC_IMG}/${imgDir}/${image}`} alt={`Image ${index}`} />
              </div>
            ))}
          </div>
        </div>
      )}
      <div className="form-input">
        <label htmlFor="images-input" className="upload-label"></label>
        <input type="file" id="images-input" multiple onChange={handleImageUpload} />
      </div>
    </div>
  )
};

export default HotelImages;