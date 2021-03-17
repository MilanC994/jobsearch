import { useEffect, useCallback } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setPage, setNextPage } from '../../redux/actions'

function useJobsPagination() {
  const dispatch = useDispatch()
  const params = useSelector(state => state.jobs.params)
  const filters = useSelector(state => state.jobs.filters)
  const hasNextPage = useSelector(state => state.jobs.nextPage)

  const checkNextPage = useCallback(async () => {
    await dispatch(setNextPage({ params, filters }))
  }, [params, dispatch, filters])

  const changePage = useCallback(
    page => {
      dispatch(setPage(page))
    },
    [dispatch]
  )
  useEffect(() => {
    const fetchNextPage = async () => {
      await checkNextPage()
    }
    fetchNextPage()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params, filters])
  return { page: params.page, changePage, hasNextPage }
}

export default useJobsPagination
