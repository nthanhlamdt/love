export function findDateInArray(dataArray, dateToCheck) {
  // Chuyển đổi dateToCheck thành kiểu Date nếu cần
  const dateToCheckObj = new Date(dateToCheck)

  // Sử dụng find để tìm phần tử đầu tiên có ngày trùng khớp
  return dataArray.find(item => {
    const dateItem = new Date(item.date)
    // Chỉ so sánh năm, tháng và ngày (bỏ qua giờ, phút, giây)
    return dateItem.getMonth() === dateToCheckObj.getMonth() &&
           dateItem.getDate() === dateToCheckObj.getDate()
  })
}