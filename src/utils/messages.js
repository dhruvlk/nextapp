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
  UNAUTHORIZED: 'Not Authorized',
  BORROW_CREATE_SUCCESS: 'Borrow created successfully!',
  BORROW_UPDATE_SUCCESS: 'Borrow updated successfully!',
  BORROW_DELETE_SUCCESS: 'Borrow deleted successfully!',
  BORROW_NOT_FOUND: 'Borrow not found!',
  REVIEW_CREATE_SUCCESS: 'Review created successfully!',
  REVIEW_NOT_FOUND: 'Review not found!',
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
