import { useState, useCallback, useMemo } from 'react'

const useInputField = (name, defaultValue, validateFn) => {
  const [value, setInputValue] = useState(defaultValue)
  const [error, setError] = useState(null)

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

  const onChange = useCallback(e => {
    setInputValue(e.target.value)
    setError(null)
  }, [])

  const input = useMemo(() => {
    return { name, error, value, onChange, onBlur }
  }, [name, error, value, onChange, onBlur])
  const data = useMemo(() => {
    return { name, value, validate: validateInput }
  }, [name, value, validateInput])

  return { input, data }
}

export default useInputField
