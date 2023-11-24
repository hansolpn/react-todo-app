import React from 'react';
import TodoTemplate from './Components/todo/TodoTemplate';
import './App.css';
import Header from './Components/layout/Header';
import Footer from './Components/layout/Footer';
import { Route, Routes } from 'react-router-dom';
import Login from './Components/user/Login';
import Join from './Components/user/Join';

const App = () => {
  return (
    <>
      <Header />
      <Routes>
        <Route
          path='/'
          element={<TodoTemplate />}
        />
        <Route
          path='/login'
          element={<Login />}
        />
        <Route
          path='/join'
          element={<Join />}
        />
      </Routes>
      <Footer />
    </>
  );
};

export default App;
