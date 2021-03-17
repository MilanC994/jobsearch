import { useState, useCallback, useMemo } from 'react'
import _ from 'lodash'
import { useDispatch, useSelector } from 'react-redux'

function useReduxInput(name, path, onChangeFn, validateFn) {
  const [error, setError] = useState(null)
  const dispatch = useDispatch()
  const value = useSelector(state => {
    return _.get(state, path)
  })
  const onChange = useCallback(
    e => {
      dispatch(onChangeFn({ [e.target.name]: e.target.value }))
    },
    [dispatch, onChangeFn]
  )
  const validateInput = useCallback(
    value => {
      const validationRes = validateFn(value)
      if (validationRes !== true) {
        setError(validationRes)
        return false
      }
      return true
    },
    [validateFn]
  )
  const onBlur = useCallback(
    e => {
      validateInput(e.target.value)
    },
    [validateInput]
  )
  const input = useMemo(() => {
    return { name, error, value, onChange, onBlur }
  }, [name, error, value, onChange, onBlur])
  const data = useMemo(() => {
    return { name, value, validate: validateInput }
  }, [name, value, validateInput])

  return { input, data }
}

export default useReduxInput
