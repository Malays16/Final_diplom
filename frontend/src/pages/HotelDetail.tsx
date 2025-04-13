import React, { useEffect, useState } from 'react';
import HotelDetailInfo from '@components/Hotels/HotelDetailInfo';
import { useParams } from 'react-router-dom';
import { getHotel } from '@/services/hotels/hotelService';
import HotelRoomsList from '@components/Hotels/HotelRoomsList';
import { Hotel, HotelId } from '@/types/hotel';
import { AuthUser } from '@/types/user';

interface HotelDetailProps {
  user: AuthUser;
}

const HotelDetail: React.FC<HotelDetailProps> = ({ user }) => {
  const [hotel, setHotel] = useState<Hotel>({} as Hotel);
  const [loading, setLoading] = useState<boolean>(true);
  const { id } = useParams<{ id: HotelId }>();

  useEffect(() => {
    if (id) loadHotelDetail(id);
  }, [id]);

  if (!id) {
    return <div className="error-page">Error: Hotel not found</div>;
  }

  const loadHotelDetail = async (hotelId: HotelId) => {
    const data = await getHotel(hotelId);
    setHotel(data);
    setLoading(false);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="page">
      <HotelDetailInfo hotel={hotel} user={user} />
      <HotelRoomsList hotelId={id || ''} user={user} />
    </div>
  );
};

export default HotelDetail;