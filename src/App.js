import React from 'react';
import TodoTemplate from './Components/todo/TodoTemplate';
import './App.css';
import Header from './Components/layout/Header';
import Footer from './Components/layout/Footer';
import { Route, Routes } from 'react-router-dom';
import Login from './Components/user/Login';
import Join from './Components/user/Join';
import { AuthContextProvider } from './utils/AuthContext';
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
  return (
    // 데이터를 전달하고자 하는 자식 컴포넌트들을 Provider로 감쌈니다.
    <AuthContextProvider>
      <div className='wrapper'>
        <Header />
        <div className='content-wrapper'>
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
        </div>
        <Footer />
      </div>
    </AuthContextProvider>
  );
};

export default App;
