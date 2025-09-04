export const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString(); // 6-digit
};

export const sendOTP = (mobile, otp) => {
  console.log(`📩 Sending OTP ${otp} to mobile: ${mobile}`);
  // Later integrate with SMS API
};
