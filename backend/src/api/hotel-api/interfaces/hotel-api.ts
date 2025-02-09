export interface CreateHotelDto {
  title: string;
  description?: string;
  images?: string[];
}

export interface HotelDtoResponse extends CreateHotelDto {
  id: string;
}