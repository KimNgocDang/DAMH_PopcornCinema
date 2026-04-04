import { SeatHold } from "../schemas/seat-hold.schema";
import { Seat } from "../schemas/seat.schema";
import { Showtime } from "../schemas/showtime.schema";

// Giữ ghế trong vòng 5 phút
export const holdSeat = async (showtimeId: string, seatId: string, userId: string) => {
  const seat = await Seat.findById(seatId);
  if (!seat) throw new Error("Seat not found");

  // Kiểm tra suất chiếu
  const showtime = await Showtime.findById(showtimeId);
  if (!showtime) throw new Error("Showtime not found");

  // Tạo thời gian hết hạn giữ ghế (5 phút)
  const expiresAt = new Date(Date.now() + 5 * 60 * 1000);

  // Lưu ghế đã giữ
  const seatHold = new SeatHold({
    showtimeId,
    seatId,
    userId,
    expiresAt,
  });

  await seatHold.save();
  return seatHold;
};

// Xóa seat hold hết hạn
export const releaseExpiredHolds = async () => {
  await SeatHold.deleteMany({ expiresAt: { $lt: new Date() } });
};