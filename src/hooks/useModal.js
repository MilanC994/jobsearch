import { useState } from 'react'

function useModal() {
  const [open, setOpen] = useState(false)
  function toggleModal() {
    setOpen(!open)
  }
  return { open, toggleModal }
}

export default useModal
