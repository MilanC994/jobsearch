import { useEffect, useMemo, useCallback } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setLoggedIn, logout } from '../../redux/actions'
import useInputField from '../../hooks/useInputField'
import { noValidation } from '../../utils/credentialsValidation'
import { setParams } from '../../redux/actions'

const useNavbar = () => {
  const params = useSelector(state => state.jobs.params)
  const user = useSelector(state => state.user.user)
  // const { input: keywordsField } = useReduxInput(
  //   'keywords',
  //   'jobs.params.keywords',
  //   setParams,
  //   noValidation
  // )
  // const { input: locationField } = useReduxInput(
  //   'location',
  //   'jobs.params.location',
  //   setParams,
  //   noValidation
  // )
  // since we're using a button, and not triggering requests on text change,
  // we can use local state to keep track of keywords and location fields
  // and on button push we can update the redux store
  const { input: keywordsField } = useInputField(
    'keywords',
    params.keywords,
    noValidation
  )
  const { input: locationField } = useInputField(
    'location',
    params.location,
    noValidation
  )
  const dispatch = useDispatch()
  const username = useMemo(() => {
    return user && user.username ? user.username : null
  }, [user])

  useEffect(() => {
    if (localStorage.getItem('token')) {
      dispatch(setLoggedIn(true))
    }
  }, [dispatch])

  const onLogout = useCallback(() => {
    dispatch(logout())
  }, [dispatch])

  const setParameters = useCallback(() => {
    dispatch(
      setParams({
        keywords: keywordsField.value,
        location: locationField.value,
        page: 1,
      })
    )
  }, [dispatch, keywordsField.value, locationField.value])
  return { username, onLogout, keywordsField, locationField, setParameters }
}

export default useNavbar
