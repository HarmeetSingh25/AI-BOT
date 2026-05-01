import React from 'react'
import { RouterProvider } from "react-router-dom";
import { router } from './app.routes.jsx'
import { Provider } from 'react-redux'
import store from './app.store.js'

const App = () => {
  return (
    <Provider store={store}>
      <RouterProvider router={router}/>
    </Provider>

  )
}

export default App