import { useState, useEffect, useCallback } from 'react'
import {
  requiredField,
  emailValidation,
  passwordValidation,
  usernameValidation,
} from '../../utils/credentialsValidation'
import useInputField from '../../hooks/useInputField'
import { useSelector, useDispatch } from 'react-redux'
import { setLoggedIn, login } from '../../redux/actions'
import useFormSubmit from '../../hooks/useFormSubmit'

const useRegister = () => {
  const { input: firstNameField, data: firstName } = useInputField(
    'firstName',
    '',
    requiredField
  )
  const { input: lastNameField, data: lastName } = useInputField(
    'lastName',
    '',
    requiredField
  )
  const { input: emailField, data: email } = useInputField(
    'email',
    '',
    emailValidation
  )
  const { input: usernameField, data: username } = useInputField(
    'username',
    '',
    usernameValidation
  )
  const { input: passwordField, data: password } = useInputField(
    'password',
    '',
    passwordValidation
  )
  const { input: retypePasswordField, data: retypePassword } = useInputField(
    'retypePassword',
    '',
    passwordValidation
  )

  const dispatch = useDispatch()
  const loggedIn = useSelector(state => state.user.loggedIn)
  const [loading, setLoading] = useState(false)
  const [readTerms, setReadTerms] = useState(false)
  const [error, setError] = useState()
  const handleCheckChange = useCallback(e => {
    setReadTerms(e.target.checked)
  }, [])

  useEffect(() => {
    if (localStorage.getItem('token')) {
      dispatch(setLoggedIn(true))
    }
  }, [dispatch])

  useEffect(() => {
    if (error) {
      setError(false)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [retypePasswordField])

  const submitRegister = useCallback(
    async ({ ...input }) => {
      if (password.value !== retypePassword.value) {
        setError('Passwords must match')
      } else if (!readTerms) {
        setError('You must read terms and condition')
      } else {
        setLoading(true)
        await dispatch(login({ ...input }))
      }
    },
    [dispatch, password, retypePassword, readTerms]
  )
  const { onSubmit: handleSubmit } = useFormSubmit(
    [firstName, lastName, username, email, password, retypePassword],
    submitRegister
  )
  return {
    firstNameField,
    lastNameField,
    emailField,
    usernameField,
    passwordField,
    retypePasswordField,
    readTerms,
    handleCheckChange,
    loggedIn,
    loading,
    error,
    handleSubmit,
  }
}

export default useRegister
