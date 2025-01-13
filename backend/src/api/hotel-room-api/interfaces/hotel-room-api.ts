import { HotelDtoResponse } from "src/api/hotel-api/interfaces/hotel-api";

export interface SearchHotelRoomInterface {
  id: string;
  description: string;
  images: string[];
  hotel: HotelDtoResponse;
  // hotel: {
  //   id: string;
  //   title: string;
  //   description?: string;
  // };
}

export interface HotelRoomResponse extends SearchHotelRoomInterface {
  isEnabled: boolean;
}

export interface CreateRoomHotelDto {
  description: string;
  hotelId: string;
  images: string[];
}

export interface UpdateHotelRoomDto extends CreateRoomHotelDto {
  isEnabled: boolean;
}
