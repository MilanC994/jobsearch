import { useCallback } from 'react'

const useFormSubmit = (fields, handleSubmit) => {
  const validateForm = useCallback(() => {
    return fields.reduce((fields, { validate, value }) => validate(value), {})
  }, [fields])

  const onSubmit = useCallback(() => {
    if (validateForm()) {
      handleSubmit(
        fields.reduce(
          (fields, { name, value }) => ({ ...fields, [name]: value }),
          {}
        )
      )
    }
  }, [handleSubmit, fields, validateForm])

  return { onSubmit }
}
export default useFormSubmit
