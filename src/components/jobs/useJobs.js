import { useCallback, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import {
  fetchJobs,
  setLoading,
  setFilters,
  filterData,
} from '../../redux/actions'
import filters from '../../utils/filters'
const FULLTIME = 'fulltime'
const PARTTIME = 'parttime'
const BOTH = 'both'

function useJobs() {
  const dispatch = useDispatch()
  const jobs = useSelector(state => state.jobs.jobs)
  const filteredJobs = useSelector(state => state.jobs.filteredJobs)
  const loading = useSelector(state => state.jobs.loading)
  const params = useSelector(state => state.jobs.params)

  const reduxFilters = useSelector(state => state.jobs.filters)

  const onJobTypeFilterChange = useCallback(
    e => {
      if (reduxFilters.fullOrPartTime === FULLTIME) {
        if (e.target.value === FULLTIME) {
          dispatch(
            setFilters({
              fullOrPartTime: '',
            })
          )
        } else {
          dispatch(
            setFilters({
              fullOrPartTime: BOTH,
            })
          )
        }
      } else if (reduxFilters.fullOrPartTime === PARTTIME) {
        if (e.target.value === FULLTIME) {
          dispatch(
            setFilters({
              fullOrPartTime: BOTH,
            })
          )
        } else {
          dispatch(
            setFilters({
              fullOrPartTime: '',
            })
          )
        }
      } else if (reduxFilters.fullOrPartTime === BOTH) {
        if (e.target.value === FULLTIME) {
          dispatch(
            setFilters({
              fullOrPartTime: PARTTIME,
            })
          )
        } else {
          dispatch(
            setFilters({
              fullOrPartTime: FULLTIME,
            })
          )
        }
      } else {
        if (e.target.value === FULLTIME) {
          dispatch(
            setFilters({
              fullOrPartTime: FULLTIME,
            })
          )
        } else {
          dispatch(
            setFilters({
              fullOrPartTime: PARTTIME,
            })
          )
        }
      }
    },
    [dispatch, reduxFilters.fullOrPartTime]
  )

  const onFiltersChangeChange = useCallback(
    e => {
      if (e.target.name === 'salary') {
        if (e.target.id === 'other') {
          // toggleSalaryModal()
        } else {
          const chosenFilter = filters.salary.find(s => s.id === e.target.id)

          dispatch(
            setFilters({
              salary: { from: chosenFilter.from, to: chosenFilter.to },
            })
          )
        }
      } else {
        dispatch(setFilters({ [e.target.name]: e.target.value }))
      }
    },
    [dispatch]
  )

  useEffect(() => {
    dispatch(filterData(reduxFilters, jobs))
  }, [reduxFilters, dispatch, jobs])

  const getJobs = useCallback(() => {
    dispatch(setLoading(true))
    dispatch(
      fetchJobs({
        params,
        filters: reduxFilters,
      })
    )
  }, [dispatch, params, reduxFilters])
  useEffect(() => {
    const fetchJobs = async () => {
      await getJobs()
    }
    fetchJobs()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params])
  return {
    filteredJobs,
    reduxFilters,
    loading,
    onFiltersChangeChange,
    onJobTypeFilterChange,
  }
}

export default useJobs
