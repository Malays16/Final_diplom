import { addHotel, getHotel, updateHotel, uploadFile } from '@/services/hotels/hotelService';
import React, { useEffect, useState } from 'react';
import HotelImages from '@components/Hotels/HotelImages';
import { useNavigate, useParams } from 'react-router-dom';

const HotelEdit: React.FC = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [pageTitle, setPageTitle] = useState('');
  const [images, setImages] = useState<string[]>([]);
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    const fetchHotel = async (hotelId: string) => {
      try {
        const hotel = await getHotel(hotelId);
        setTitle(hotel.title);
        setDescription(hotel.description);
        setImages(hotel.images || []);
      } catch (error) {
        console.error(error);
      }
    };

    if (id) {
      fetchHotel(id);
      setPageTitle('Редактирование отеля');
    } else {
      setPageTitle('Добавление отеля');
      setTitle('');
      setDescription('');
      setImages([]);
    }
  }, [id]);

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) return;
    const file: File = event.target.files[0];
    const newImage = await uploadFile(file, 'hotels');
    setImages(images => [...images, ...newImage.flat()]);
  };

  const handleImageRemove = (image: string) => {
    if (confirm('Вы уверены, что хотите удалить изображение?')) {
      setImages(images => images.filter(item => item !== image));
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const hotelData = { title, description, images };
    try {
      if (id) {
        await updateHotel(id, hotelData);
      } else {
        await addHotel(hotelData);
      }
      navigate('/hotels');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="page">
      <form className="edit-form" onSubmit={handleSubmit}>
        <h2 className="page-title">{pageTitle}</h2>
        <HotelImages type="hotels" images={images} handleImageUpload={handleImageUpload} handleImageRemove={handleImageRemove} />
        <div className="form-input">
          <label htmlFor="hotel-title">Название отеля</label>
          <input
            type="text"
            id="hotel-title"
            value={title}
            onChange={e => setTitle(e.target.value)}
          />
        </div>
        <div className="form-input">
          <label htmlFor="hotel-description">Описание отеля</label>
          <textarea
            name="hotel-description"
            id="hotel-description"
            value={description}
            onChange={e => setDescription(e.target.value)}></textarea>
        </div>
        <div className="ctrl-btns">
          <button type="submit" className="btn btn-success" disabled={title === ''}>
            Сохранить
          </button>
          <button type="button" className="btn btn-cancel" onClick={() => navigate('/hotels')}>
            Отменить
          </button>
          {id && (
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => navigate(`/hotels/${id}/add-room`)}>
              Добавить номер
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default HotelEdit;