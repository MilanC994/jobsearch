import {
  LOGIN,
  LOGOUT,
  SET_LOGGED_IN,
  SET_PARAMS,
  FETCH_JOBS,
  SET_FILTERS,
  SET_PAGE,
  SET_LOADING,
  SET_ERROR,
  SET_NEXT_PAGE,
  FILTER_RESULTS,
} from './constants'
import axios from 'axios'

const CancelToken = axios.CancelToken
let fetchJobsCancel, jobsNextPageCancel

//append random salaries to job objects, for salary filter to work
const salaries = [10, 20, 30, 80, 160, 200, 500, 700]

const filterResults = (filters, data, calledFrom) => {
  return !data || data.length === 0
    ? []
    : data
        .filter(
          salaryfiltered =>
            salaryfiltered.salary >= filters.salary.from &&
            salaryfiltered.salary <= filters.salary.to
        )
        .filter(workTimeFiltered => {
          if (filters.fullOrPartTime === 'both') return true
          else if (
            filters.fullOrPartTime === 'fulltime' &&
            workTimeFiltered.type === 'Full Time'
          )
            return true
          else if (
            filters.fullOrPartTime === 'parttime' &&
            workTimeFiltered.type === 'Part Time'
          )
            return true
          return false
        })
        .filter(
          dateFiltered =>
            Date.parse(dateFiltered.created_at) >= Date.parse(filters.date)
        )
}

export const login = ({ username, email, password }) => {
  return async dispatch => {
    try {
      localStorage.setItem('token', `${username}`)
      setTimeout(
        () =>
          dispatch({
            type: LOGIN,
            payload: { username, email, password },
          }),
        2000
      )
    } catch (error) {
      console.log(error)
      alert('Error Happened While Login ')
    }
  }
}
export const setParams = params => {
  console.log('setting params to: ', params)
  return {
    type: SET_PARAMS,
    payload: { ...params },
  }
}
export const setFilters = filters => {
  return {
    type: SET_FILTERS,
    payload: { ...filters },
  }
}

export const fetchJobs = ({ params, filters }) => {
  //request can cancel itself when multiple requests are sent
  fetchJobsCancel && fetchJobsCancel()
  return async dispatch => {
    const url =
      process.env.REACT_APP_CORS_PROXY + process.env.REACT_APP_BASE_URL
    try {
      const response = await axios.get(url, {
        params: { ...params, markdown: true },
        cancelToken: new CancelToken(function executor(c) {
          // An executor function receives a cancel function as a parameter
          fetchJobsCancel = c
        }),
      })
      //assign random salarf for filter
      const data = response.data.map(obj => ({
        ...obj,
        salary: salaries[Math.floor(Math.random() * salaries.length)],
      }))

      console.log(data, 'fetched data with params:', params)
      dispatch({
        type: FETCH_JOBS,
        payload: data,
      })
    } catch (error) {
      console.log(error)
      if (axios.isCancel(error)) {
        console.log(error.message, 'CANCEL ERROR MESSAGE')
      } else {
        dispatch({
          type: SET_ERROR,
          payload: error.message,
        })
      }
    }
  }
}

export const logout = () => {
  return async dispatch => {
    try {
      localStorage.removeItem('token')
      setTimeout(
        () =>
          dispatch({
            type: LOGOUT,
          }),
        2000
      )
    } catch (error) {
      console.log(error)
      alert('Error Happened While Login ')
    }
  }
}

export const setLoggedIn = loggedIn => {
  const username = localStorage.getItem('token')

  return {
    type: SET_LOGGED_IN,
    payload: { loggedIn, username },
  }
}
export const filterData = (filters, data) => {
  const filtered = filterResults(filters, data, 'filter data')
  return {
    type: FILTER_RESULTS,
    payload: filtered,
  }
}
export const setPage = page => {
  return {
    type: SET_PAGE,
    payload: page,
  }
}
export const setLoading = loading => {
  return {
    type: SET_LOADING,
    payload: loading,
  }
}
export const setError = error => {
  return {
    type: SET_ERROR,
    payload: error,
  }
}
export const setNextPage = ({ params, filters }) => {
  jobsNextPageCancel && jobsNextPageCancel()
  const requestParams = { ...params, page: params.page + 1 }

  return async dispatch => {
    const url =
      process.env.REACT_APP_CORS_PROXY + process.env.REACT_APP_BASE_URL
    try {
      const response = await axios.get(url, {
        params: { ...requestParams, markdown: true },
        cancelToken: new CancelToken(function executor(c) {
          // An executor function receives a cancel function as a parameter
          jobsNextPageCancel = c
        }),
      })
      const data = response.data.map(obj => ({
        ...obj,
        salary: salaries[Math.floor(Math.random() * salaries.length)],
      }))
      const filteredData = filterResults(filters, data, 'nextPage')
      console.log('Filters >>>>>>>>')
      dispatch({
        type: SET_NEXT_PAGE,
        payload: filteredData.length !== 0,
      })
    } catch (error) {
      console.log(error)
      if (axios.isCancel(error)) {
        console.log(error.message, 'CANCEL ERROR MESSAGE')
      } else {
        dispatch({
          type: SET_ERROR,
          payload: error.message,
        })
      }
    }
  }
}
