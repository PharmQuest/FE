import axios from "axios";

const token = process.env.NEXT_PUBLIC_ACCESS_TOKEN;

const axiosPOSTInstance = axios.create({
  baseURL: "http://localhost:8080",
  headers: {
    // 임의로 토큰값 넣어서 개발...
    Authorization: `Bearer ${token}`
    
    // Authorization: `Bearer ${localStorage.getItem('accessToken')}` 로그인 개발 되면 이렇게 수정
  }
})

export default axiosPOSTInstance;