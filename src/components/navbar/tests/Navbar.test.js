import React from 'react'
import Navbar from '../Navbar'
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
        <Navbar />
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

  test('Renders Register and Login Buttons when user is not logged in', () => {
    const wrapper = setUp(initialState)
    expect(mountToJson(wrapper)).toMatchSnapshot()
    const registerLoginList = wrapper.find('#login-register-form')
    const userNameLogout = wrapper.find('#username-logout-list')
    expect(registerLoginList.exists()).toBeTruthy()
    expect(userNameLogout.exists()).toBeFalsy()
  })
  test('Renders username and logout list  when user is  logged in', () => {
    const state = {
      ...initialState,
      user: {
        ...initialState.user,
        user: {
          ...initialState.user.user,
          username: 'testUser',
        },
      },
    }
    const wrapper = setUp(state)
    expect(mountToJson(wrapper)).toMatchSnapshot()
    const registerLoginList = wrapper.find('#login-register-form')
    const userNameLogout = wrapper.find('#username-logout-list')
    expect(userNameLogout.exists()).toBeTruthy()
    expect(registerLoginList.exists()).toBeFalsy()
  })
  test('Click on logo redirects to home page', () => {
    const state = {
      ...initialState,
      user: {
        ...initialState.user,
        user: {
          ...initialState.user.user,
          username: 'testUser',
        },
      },
    }
    const wrapper = setUp(state)

    const appLogo = wrapper.find('#app-logo-link').at(0)
    expect(appLogo.exists()).toBeTruthy()
    expect(appLogo.prop('to')).toEqual('/')
  })
  test('Click on register redirects to register page', () => {
    const wrapper = setUp(initialState)

    const registerLink = wrapper.find('#register-link').at(0)
    expect(registerLink.exists()).toBeTruthy()
    expect(registerLink.prop('to')).toEqual('/register')
  })
  test('Click on login redirects to login page', () => {
    const wrapper = setUp(initialState)

    const loginLink = wrapper.find('#login-link').at(0)
    expect(loginLink.exists()).toBeTruthy()
    expect(loginLink.prop('to')).toEqual('/login')
  })
})
