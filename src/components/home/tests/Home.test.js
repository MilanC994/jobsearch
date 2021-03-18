import React from 'react'
import Home from '../Home'
import { mount } from 'enzyme'
import { Provider } from 'react-redux'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import { mountToJson } from 'enzyme-to-json'
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
        <Home />
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
      params: {
        keywords: '',
        location: '',
      },
    },
  }

  test('Renders correctly', () => {
    const wrapper = setUp(initialState)
    expect(mountToJson(wrapper)).toMatchSnapshot()
  })
  test('Redirects to jobs route on button push', () => {
    const wrapper = setUp(initialState)
    const element = wrapper.find('#find-jobs-button')
    expect(element.exists()).toBeTruthy()
    element.simulate('click')
    expect(mockHistoryPush).toHaveBeenCalledWith('/jobs')
  })
})
