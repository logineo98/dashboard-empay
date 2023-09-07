import { applyMiddleware, combineReducers, legacy_createStore as createStore } from 'redux'

// dev extension
import { composeWithDevTools } from '@redux-devtools/extension'
import thunk from 'redux-thunk'

// importation des reducers
import adminReducer from './reducers/admin.reducer'

// regrouper tous les reducers
const rootReducer = combineReducers({
    admin: adminReducer,
})

export type ROOT_REDUCER_TYPE = ReturnType<typeof rootReducer>

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)))

export default store