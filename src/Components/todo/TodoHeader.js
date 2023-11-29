import React from 'react';
import './scss/TodoHeader.scss';
import { getLoginUserInfo } from '../../utils/AuthContext';

const TodoHeader = ({ count, promote }) => {
  const today = new Date();

  const dateString = today.toLocaleDateString('ko-kr', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
  const dayName = today.toLocaleDateString('ko-kr', { weekday: 'long' });

  const upgrade = () => {
    if (window.confirm('프리미엄으로 업그레이드 하시갰습니까?')) {
      promote();
    }
  };
  // 등급에 따른 조건별 렌더링
  const gradeView = () => {
    const { role } = getLoginUserInfo();
    console.log('TodoHeader -> role: ' + role);

    if (role === 'COMMON') {
      return (
        <span
          className='promote badge bg-warning'
          onClick={upgrade}
        >
          일반 회원
        </span>
      );
    } else if (role === 'PREMIUM') {
      return <span className='promote badge bg-danger'>프리미엄</span>;
    } else if (role === 'ADMIN') {
      return <span className='promote badge bg-info'>관리자</span>;
    }
  };

  return (
    <header>
      <h1>{dateString}</h1>
      <div className='day'>{dayName}</div>
      <div className='tasks-left'>할 일 {count()}개 남음</div>
      {gradeView()}
    </header>
  );
};

export default TodoHeader;
