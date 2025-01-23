import axios from "axios";

const axiosPOSTInstance = axios.create({
  headers: {
    // 임의로 토큰값 넣어서 개발...
    Authorization: `Bearer ${process.env.NEXT_PUBLIC_ACCESS_TOKEN}`
    
    // Authorization: `Bearer ${localStorage.getItem('accessToken')}` 로그인 개발 되면 이렇게 수정
  }
})

export default axiosPOSTInstance;