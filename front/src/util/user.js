
export const getUserId = () => {
  return (JSON.parse(localStorage.getItem('userInfo')))?.id
}

export const getUser = () => {
  return JSON.parse(localStorage.getItem('userInfo'))
}
