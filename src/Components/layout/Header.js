import { AppBar, Grid, Toolbar, Typography } from '@mui/material';
import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Header.scss';
import AuthContext from '../../utils/AuthContext';
import { API_BASE_URL, USER } from '../../config/host-config';
import HttpService from '../../utils/httpService';

const Header = () => {
  const profileRequestURL = `${API_BASE_URL}${USER}/load-profile`;
  const logoutRequestURL = `${API_BASE_URL}${USER}/logout`;

  const redirection = useNavigate();

  // 프로필 이미지 url 상태 변수
  const [profileURL, setProfileURL] = useState(null);

  // AuthContext에서 로그인 상태를 가져옵니다
  const { isLoggedIn, userName, onLogout } = useContext(AuthContext);

  // 로그아웃 핸들러
  const logoutHandler = async (e) => {
    const res = fetch(logoutRequestURL, {
      method: 'GET',
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('ACCESS_TOKEN'),
      },
    });

    // AuthContext의 OnLogout 함수를 호출하여 로그인 상태를 업데이트 합니다.
    onLogout();
    redirection('/login');
  };

  // 프로필 이미지 요청
  const fetchProfileImage = async () => {
    const res = await HttpService(
      profileRequestURL,
      {
        method: 'GET',
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('ACCESS_TOKEN'),
        },
      },
      redirection,
      onLogout
    );

    if (res) {
      if (res.status === 200) {
        // 서버에서는 byte[]로 직렬화된 이미지가 응답되므로
        // blob()을 통해 전달 받아야 한다 (json() xxx)
        console.log('Content-Type:', res.headers.get('Content-Type'));
        console.log('kakaoProfile:', res.headers.get('kakaoProfile'));
        if (res.headers.get('kakaoProfile')) {
          // 카카오 프로필 사진
          const profileHttp = await res.text();
          console.log();
          setProfileURL(profileHttp);
        } else {
          const profileBlob = await res.blob();
          // 해당 이미지를 imgUrl로 변경
          const imgUrl = window.URL.createObjectURL(profileBlob);
          setProfileURL(imgUrl);
        }
      } else {
        const err = await res.text();
        console.log(err);
        setProfileURL(null);
      }
    }
  };

  // 로그인의 상태가 변화될 때 화면이 리렌더링이 되고,
  // 그에 맞는 회원의 프로필 이미지 요청이 들어갈 수 있도록 처리
  useEffect(() => {
    if (isLoggedIn) {
      fetchProfileImage();
    }
  }, [isLoggedIn]);

  return (
    <AppBar
      position='fixed'
      style={{
        background: '#38d9a9',
        width: '100%',
      }}
    >
      <Toolbar>
        <Grid
          justify='space-between'
          container
        >
          <Grid
            item
            flex={9}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <Typography variant='h4'>
                <Link to='/'>
                  {isLoggedIn ? `${userName}님` : '오늘'}의 할일
                </Link>

                {isLoggedIn && (
                  <img
                    src={
                      profileURL || require('../../assets/img/anonymous.jpg')
                    }
                    alt='프사'
                    style={{
                      marginLeft: 20,
                      width: 75,
                      height: 75,
                      borderRadius: '50%',
                    }}
                  />
                )}
              </Typography>
            </div>
          </Grid>

          <Grid item>
            <div className='btn-group'>
              {isLoggedIn ? (
                <button
                  className='logout-btn'
                  onClick={logoutHandler}
                >
                  로그아웃
                </button>
              ) : (
                <>
                  <Link to='/login'>로그인</Link>
                  <Link to='/join'>회원가입</Link>
                </>
              )}
            </div>
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
