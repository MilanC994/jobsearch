export const emailValidation = val => {
  return !val
    ? 'Email is required'
    : /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(val)
    ? true
    : 'Email is not valid'
}

export const passwordValidation = val => {
  return !val
    ? 'Password is Required'
    : /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(val)
    ? true
    : 'Password must contain minimum eight characters, at least one letter and one number'
}

export const requiredField = val => {
  return !val
    ? 'Field is required'
    : val.length < 10
    ? true
    : 'Maximum 10 characters allowed'
}

export const usernameValidation = val => {
  return !val
    ? 'Field is required'
    : val.length <= 10
    ? true
    : 'Maximum 10 characters allowed'
}

export const noValidation = () => true

export const passwordMatch = (password, retypePassword) => {
  return password && retypePassword && password === retypePassword
    ? true
    : 'Passwords must match'
}
export const textOnly = val => {
  return !val ? true : /^[a-zA-Z ]*$/.test(val) ? true : 'Only Letters allowed'
}
