/* eslint-disable security/detect-object-injection */
const messages = {
  USER_NOT_FOUND: 'User not found!',
  INVALID_TOKEN: 'Invalid token!',
  NOT_LOGGEDIN: 'Please login!',
  INVALID_CREDENTIALS: 'Email or Password provided is incorrect!',
  INVALID_INPUT: 'Invalid input!',
  SESSION_EXPIRED: 'Your Session has expired. Please login again!',
  TOKEN_EXPIRED: 'Your Token has expired. Please login again!',
  USER_CREATE_SUCCESS: 'User created successfully!!',
  USER_DELETE_SUCCESS: 'User deleted successfully!!',
  USER_UPDATE_SUCCESS: 'Profile updated successfully!',
  USER_EMAIL_EXISTS: 'E-mail address already exists!',
  SUCCESS:'Successfully!',
  EMAIL_NOT_VERIFIED: 'Email is not verified!',
  USER_PASSWORD_UPDATED: 'Password updated successfully!',
  USER_VERIFY_SUCCESS: 'User verified successfully!',
  BOOK_CREATE_SUCCESS: 'Book created successfully!',
  BOOK_UPDATE_SUCCESS: 'Book updated successfully!',
  BOOK_DELETE_SUCCESS: 'Book deleted successfully!',
  BOOK_NOT_FOUND: 'Book not found!',
  BOOK_ISSUED: 'Book currently issued by user cannot delete!',
  UNAUTHORIZED: 'Not Authorized',
  BOOK_OUT_OF_STOCK: 'Book is out of stock, you can not borrowed!',
  BOOK_NOT_BORROWED: 'Book is not borrowed!',
  BORROWED_BOOK_EXISTS: 'You have already borrowed this book!',
  BORROW_CREATE_SUCCESS: 'Borrow created successfully!',
  BORROW_UPDATE_SUCCESS: 'Borrow updated successfully!',
  BORROW_BOOK_RETURN_SUCCESS: 'Borrow book return successfully!',
  BORROW_NOT_FOUND: 'Borrow not found!',
  FINE_NOT_PAID: 'Fine not paid!',
  NO_FINE: 'No penalty!',
  FINE_PAID: 'Fine is paid!',
  FINE_PAID_SUCCESS: 'Fine paid successfully!',
  REVIEW_CREATE_SUCCESS: 'Review created successfully!',
  REVIEW_NOT_FOUND: 'Review not found!',
  REVIEW_DELETED_SUCCESS: 'Review deleted successfully!',
  INVALID_DATA: 'Please provide data!',
  LOGIN_SUCCESSFULLY: 'Logged-in successfully!',
  REFRESH_TOKEN: 'Token refreshed successfully!'
};
const getMessage = key => {
  if (messages[key]) {
    return messages[key];
  }
  return 'Message Key not Found!!';
};

module.exports = { getMessage };
