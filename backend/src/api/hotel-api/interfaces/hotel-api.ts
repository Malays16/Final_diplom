export interface CreateHotelDto {
  title: string;
  description?: string;
}

export interface HotelDtoResponse extends CreateHotelDto {
  id: string;
}