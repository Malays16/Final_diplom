import { API_URL, STATIC_IMG } from '@/services/apiConfig';
import { addRoom, getHotelRoom, updateRoom } from '@/services/hotels/roomService';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const HotelRoomEdit: React.FC = () => {
  const [pageTitle, setPageTitle] = useState<string>('');
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [images, setImages] = useState<string[]>([]);
  const navigate = useNavigate();
  const { hotelId, roomId } = useParams<{ hotelId: string; roomId: string }>();

  useEffect(() => {
    const fetchRoom = async (roomId: string) => {
      try {
        const room = await getHotelRoom(roomId);
        setTitle(room.title);
        setDescription(room.description);
        setImages(room.images || []);
      } catch (error) {
        console.error(error);
      }
    };

    if (roomId) {
      fetchRoom(roomId);
      setPageTitle('Редактирование номера');
    } else {
      setPageTitle('Добавление номера');
      setTitle('');
      setDescription('');
      setImages([]);
    }
  }, [roomId]);

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) return;
    const files: FileList = event.target.files;
    const uplodadedImages = await Promise.all(
      Array.from(files).map(async file => {
        const formData = new FormData();
        formData.append('files', file);
        const response = await axios.post(`${API_URL}/admin/hotel-rooms/upload`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
        return response.data.images;
      })
    );
    setImages(images => [...images, ...uplodadedImages.flat()]);
  };

  const handleImageRemove = (image: string) => {
    if (confirm('Вы уверены, что хотите удалить изображение?')) {
      setImages(images => images.filter(item => item !== image));
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!hotelId) return;
    const roomData = { title, description, images, hotel: hotelId };
    try {
      if (roomId) {
        await updateRoom(roomId, roomData);
      } else {
        await addRoom(roomData);
      }
      navigate(`/hotels/${hotelId}`);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="page">
      <form className="edit-form" onSubmit={handleSubmit}>
        <h2 className="page-title">{pageTitle}</h2>
        <div className="room-images">
          {images.length > 0 && (
            <div className="form-input">
              <div className="images-list">
                {images.map((image, index) => (
                  <div className="image" key={index}>
                    <div className="remove" onClick={() => handleImageRemove(image)}></div>
                    <img src={`${STATIC_IMG}/hotel-rooms/${image}`} alt={`Image ${index}`} />
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

        <div className="form-input">
          <label htmlFor="room-title">Название номера</label>
          <input
            type="text"
            id="room-title"
            value={title}
            onChange={e => setTitle(e.target.value)}
          />
        </div>
        <div className="form-input">
          <label htmlFor="room-description">Описание номера</label>
          <textarea
            name="room-description"
            id="room-description"
            value={description}
            onChange={e => setDescription(e.target.value)}></textarea>
        </div>
        <div className="ctrl-btns">
          <button type="submit" className="btn btn-success" disabled={title === ''}>
            Сохранить
          </button>
          <button type="button" className="btn btn-cancel" onClick={() => navigate(-1)}>
            Отменить
          </button>
        </div>
      </form>
    </div>
  );
};

export default HotelRoomEdit;