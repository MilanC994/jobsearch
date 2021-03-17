import { createStore, applyMiddleware, combineReducers } from 'redux'
import thunk from 'redux-thunk'
import userReducer from './reducers/userReducer'
import jobsReducer from './reducers/jobsReducer'

const rootReducer = combineReducers({
  user: userReducer,
  jobs: jobsReducer,
})

const store = createStore(rootReducer, applyMiddleware(thunk))

export default store
