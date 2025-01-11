export function CountingLoveDays(dates) {
  const loveDate = new Date(dates) // Chuyển đổi chuỗi ngày thành đối tượng Date
  const currentDate = new Date() // Lấy ngày hiện tại

  // Đặt giờ, phút, giây và mili giây về 0 để chỉ tính chênh lệch ngày
  loveDate.setHours(0, 0, 0, 0)
  currentDate.setHours(0, 0, 0, 0)

  // Tính chênh lệch thời gian (tính bằng mili giây)
  const timeDifference = currentDate - loveDate

  // Chuyển đổi mili giây thành ngày
  const dayDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24))

  return dayDifference
}