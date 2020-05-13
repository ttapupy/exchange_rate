export const login = (uname = '') => {
  localStorage.setItem('reduxUser', uname)
  return (
    {
      type: 'LOGIN',
      uname
    }
  )
}



export const logout = () => {
  localStorage.removeItem('reduxUser')
  return (
    {
  type: 'LOGOUT',
  uname: null
    }
  )
}

