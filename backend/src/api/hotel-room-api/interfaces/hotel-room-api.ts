export interface SearchHotelRoomInterface {
  id: string;
  description: string;
  images: string[];
  hotel: {
    id: string;
    title: string;
    description?: string;
  };
}