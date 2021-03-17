import { useState, useEffect, useCallback } from 'react'
import {
  passwordValidation,
  usernameValidation,
} from '../../utils/credentialsValidation'
import useInputField from '../../hooks/useInputField'
import { useSelector, useDispatch } from 'react-redux'
import { setLoggedIn, login } from '../../redux/actions'
import useFormSubmit from '../../hooks/useFormSubmit'

const useRegister = () => {
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

  const dispatch = useDispatch()
  const loggedIn = useSelector(state => state.user.loggedIn)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (localStorage.getItem('token')) {
      dispatch(setLoggedIn(true))
    }
  }, [dispatch])

  const submitLogin = useCallback(
    async ({ ...input }) => {
      setLoading(true)
      await dispatch(login({ ...input }))
    },
    [dispatch]
  )
  const { onSubmit: handleSubmit } = useFormSubmit(
    [username, password],
    submitLogin
  )
  return {
    usernameField,
    passwordField,
    loggedIn,
    loading,
    handleSubmit,
  }
}

export default useRegister
