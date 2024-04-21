import React from 'react';
import {createBrowserRouter, RouterProvider} from 'react-router-dom';
import Home from './pages/Home'
import Chats from './pages/Chats'



const App = () => {
  const router = new createBrowserRouter([
    {
      path : "/",
      element : <Home />
    },
    {
      path : "/chats",
      element : <Chats />
    }
  ]);

  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  )
}

export default App

