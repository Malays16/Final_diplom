import React, { useEffect, useState } from 'react';
import HotelDetailInfo from '@components/HotelDetailInfo';
import { useParams } from 'react-router-dom';
import { getHotel } from '@/services/hotels/hotelService';
import HotelRoomsList from '@components/HotelRoomsList';
import { Hotel, HotelId } from '@/types/hotel';

const HotelDetail: React.FC = () => {
  const [hotel, setHotel] = useState<Hotel>({} as Hotel);
  const [loading, setLoading] = useState<boolean>(true);
  const { id } = useParams<{ id: HotelId }>();

  useEffect(() => {
    if (id) loadHotelDetail(id);
  }, [id]);

  if (!id) {
    return <div className="error-page">Error: Hotel not found</div>;
  }

  const loadHotelDetail = async (hotelId: string) => {
    const data = await getHotel(hotelId);
    setHotel(data);
    setLoading(false);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="page">
      <HotelDetailInfo hotel={hotel} />
      <HotelRoomsList hotelId={id || ''} />
    </div>
  );
};

export default HotelDetail;