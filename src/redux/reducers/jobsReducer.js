import {
  FETCH_JOBS,
  SET_PARAMS,
  SET_FILTERS,
  SET_PAGE,
  SET_LOADING,
  SET_ERROR,
  SET_NEXT_PAGE,
  FILTER_RESULTS,
} from '../constants'
import filters from '../../utils/filters'

const initialState = {
  loading: false,
  error: false,
  nextPage: true,
  params: {
    keywords: '',
    location: '',
    page: 1,
  },
  filters: {
    salary: (({ to, from }) => ({ to, from }))(
      filters.salary.find(s => s.id === 'any')
    ),
    fullOrPartTime: 'both',
    date: filters.date.find(d => d.id === 'alltime').value,
  },
  jobs: [],
  filteredJobs: [],
}

const jobsReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_JOBS: {
      return {
        ...state,
        loading: false,
        jobs: action.payload,
      }
    }
    case SET_LOADING: {
      return {
        ...state,
        loading: action.payload,
      }
    }
    case SET_ERROR: {
      return {
        ...state,
        error: action.payload,
        loading: false,
      }
    }
    case SET_PARAMS: {
      return {
        ...state,
        params: {
          ...state.params,
          ...action.payload,
        },
      }
    }
    case SET_FILTERS: {
      return {
        ...state,
        filters: {
          ...state.filters,
          ...action.payload,
        },
      }
    }
    case SET_PAGE: {
      return {
        ...state,
        params: {
          ...state.params,
          page: action.payload,
        },
      }
    }
    case SET_NEXT_PAGE: {
      return {
        ...state,
        nextPage: action.payload,
      }
    }
    case FILTER_RESULTS: {
      return {
        ...state,
        filteredJobs: action.payload,
      }
    }
    default: {
      return state
    }
  }
}

export default jobsReducer
