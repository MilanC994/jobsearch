import React from 'react'
import JobsPagination from '../JobsPagination'
import { mount } from 'enzyme'
import { Provider } from 'react-redux'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import { StaticRouter as Router } from 'react-router-dom'

const mockHistoryPush = jest.fn()

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useHistory: () => ({
    push: mockHistoryPush,
  }),
}))

const createStore = configureMockStore([thunk])

const setUp = initialState => {
  const store = createStore(initialState)

  const wrapper = mount(
    <Provider store={store}>
      <Router>
        <JobsPagination />
      </Router>
    </Provider>
  ).childAt(0)
  return wrapper
}

describe('Header test', () => {
  const initialState = {
    user: {
      user: {},
      loggedIn: false,
    },
    jobs: {
      nextPage: false,
      params: {
        keywords: '',
        location: '',
        page: 1,
      },
      filters: {
        salary: '',
        fullOrPartTime: 'both',
        date: '',
      },
      jobs: [],
      filteredJobs: [],
    },
  }

  test('Renders Correct number of navigation links when page is 1, and there is no next page [1]', () => {
    const wrapper = setUp(initialState)
    expect(wrapper.find('li').children().length).toEqual(1)
  })

  test('Renders Correct number of navigation links when page is 1 and next page exists [1,2,>]', () => {
    const state = {
      ...initialState,
      jobs: {
        ...initialState.jobs,
        nextPage: true,
      },
    }
    const wrapper = setUp(state)
    expect(wrapper.find('li').children().length).toEqual(3)
  })
  test('Renders Correct number of navigation links when page is 2 and next page exists [<,1,2,3,>]', () => {
    const state = {
      ...initialState,
      jobs: {
        ...initialState.jobs,
        params: {
          ...initialState.jobs.params,
          page: 2,
        },
        nextPage: true,
      },
    }
    const wrapper = setUp(state)
    expect(wrapper.find('li').children().length).toEqual(5)
  })
  test('Renders Correct number of navigation links when page is 2 and next page does not exist [<,1,2]', () => {
    const state = {
      ...initialState,
      jobs: {
        ...initialState.jobs,
        params: {
          ...initialState.jobs.params,
          page: 2,
        },
        nextPage: false,
      },
    }
    const wrapper = setUp(state)
    expect(wrapper.find('li').children().length).toEqual(3)
  })
  test('Renders Correct number of navigation links when page is greater than 2 and next page does not exist [<,1,...,4,5]', () => {
    const state = {
      ...initialState,
      jobs: {
        ...initialState.jobs,
        params: {
          ...initialState.jobs.params,
          page: 5,
        },
        nextPage: false,
      },
    }
    const wrapper = setUp(state)
    expect(wrapper.find('li').children().length).toEqual(5)
  })
  test('Renders Correct number of navigation links when page is greater than 2 and next page  exists [<,1,...,4,5,6,>]', () => {
    const state = {
      ...initialState,
      jobs: {
        ...initialState.jobs,
        params: {
          ...initialState.jobs.params,
          page: 5,
        },
        nextPage: true,
      },
    }
    const wrapper = setUp(state)
    expect(wrapper.find('li').children().length).toEqual(7)
  })
})
