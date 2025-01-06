import { Injectable } from '@nestjs/common';
import { ID, IReservation, ReservationDto, ReservationSearchOptions } from './interfaces/reservation';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Reservation, ReservationDocument } from './schemas/reservation.schema';

@Injectable()
export class ReservationService implements IReservation {
  constructor(@InjectModel(Reservation.name) private reservationModel: Model<ReservationDocument>) {}

  async addReservation(data: ReservationDto): Promise<ReservationDocument> {
    const busyReservations = await this.reservationModel.find({
      roomId: data.roomId,
      $or: [
        { dateStart: { $lt: data.dateEnd, $gte: data.dateStart } },
        { dateEnd: { $gt: data.dateStart ,$lte: data.dateEnd } },
        { dateStart: { $lte: data.dateStart }, dateEnd: { $gte: data.dateEnd } }
      ]
    });

    if (busyReservations.length) {
      throw new Error('Room is not available for the selected dates');
    }

    const newReservation = new this.reservationModel(data);
    return newReservation.save();
  }

  async removeReservation(id: ID): Promise<void> {
    await this.reservationModel.findByIdAndDelete(id).exec();
  }

  async getReservations(filter: ReservationSearchOptions): Promise<ReservationDocument[]> {
    return this.reservationModel.find({
      ...(filter.userId && { userId: filter.userId }),
      ...(filter.dateStart && { dateStart: { $gte: filter.dateStart } }),
      ...(filter.dateEnd && { dateEnd: { $lte: filter.dateEnd } })
    }).exec();
  }
}