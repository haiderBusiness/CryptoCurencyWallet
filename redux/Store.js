// import { configureStore } from '@reduxjs/toolkit'
// import riderReducer from "./reducers";

// const Store = configureStore({
//     reducer: riderReducer()
// })

// export default Store;

import { configureStore } from '@reduxjs/toolkit'
import reducer from './reducers'

export default configureStore({
  reducer: reducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    immutableCheck: false,
    serializableCheck: false,
  })
})