export function isValidPhoneNumber(phoneNumber) {
  // Biểu thức chính quy kiểm tra số điện thoại Việt Nam
  const regex = /^(0|\+84)(3[2-9]|5[2689]|7[06-9]|8[1-9]|9[0-9])[0-9]{7}$/

  // Kiểm tra số điện thoại có khớp với regex không
  return regex.test(phoneNumber)
}