import React, { useContext, useEffect } from 'react';
import { API_BASE_URL, USER } from '../../config/host-config';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../../utils/AuthContext';

const KakaoLoginHandler = () => {
  const REQUEST_URL = API_BASE_URL + USER;
  const redirection = useNavigate();
  const { onLogin } = useContext(AuthContext);

  console.log(
    '사용자가 동의화면을 통해 필수 정보 동의 후 kakao 서버에서 redirect를 진행함!'
  );

  // URL에 쿼리스트링으로 전달된 인가 코드를 얻어오는 방법.
  const code = new URL(window.location.href).searchParams.get('code');

  useEffect(() => {
    // 컴포넌트가 렌더링 될 때 인가 코드를 백엔드로 전송하는 fetch 요청
    const kakaoLogin = async () => {
      const res = await fetch(`${REQUEST_URL}/kakaoLogin?code=${code}`);
      const { token, userName, role } = await res.json(); // 서버에서 온 json 읽기

      // Context Api
      onLogin(token, userName, role);

      // 홈으로 리다이렉트
      redirection('/');
    };

    kakaoLogin();
  }, []);

  return (
    <>
      <div></div>
    </>
  );
};

export default KakaoLoginHandler;
