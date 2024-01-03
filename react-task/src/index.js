import React from 'react';
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
    createBrowserRouter,
    createRoutesFromElements,
    Route,
    RouterProvider,
  } from 'react-router-dom';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import store from './store'
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import PrivateRoutes from './components/PrivateRoutes';
import EditTask from './pages/EditTask';
import AddTask from './pages/AddTask';
import TasksList from './pages/TasksList';
import ViewTask from './pages/ViewTask';


const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path='/' element={<App />}>
        {/* <Route index={true} path='/' element={<Home />} /> */}
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='' element={<PrivateRoutes />} >
          <Route index={true} element={<TasksList />} />
          <Route path='add' element={<AddTask />} />
          <Route path='edit/:id' element={<EditTask />} />
          <Route path='view/:id' element={<ViewTask />} />
        </Route>
      </Route>
    )
  );
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  
    <Provider store={store}>
      <RouterProvider router={router} />
  </Provider>
 
);


