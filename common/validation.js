const validateId = (id) => {
  return id == parseInt(id, 10) && id > 0
}

const validateUserHandle = (user_handle) => {
  return user_handle.length >= 3 && user_handle.length <= 25
}

const validateEmail = (email) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

const validatePassword = (password) => {
  return /^[^\s].{8,20}$/.test(password)
}

const validateHighScore = (high_score) => {
  return high_score * 2 === parseInt(high_score * 2, 10)
}

module.exports = {
  validateId,
  validateUserHandle,
  validateEmail,
  validatePassword,
  validateHighScore,
}
