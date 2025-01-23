import axios from "axios";


const axiosPOSTInstance = axios.create({
  headers: {
    // 임의로 토큰값 넣어서 개발...
    Authorization: `Bearer 토큰`
    
    // Authorization: `Bearer ${localStorage.getItem('accessToken')}` 로그인 개발 되면 이렇게 수정
  }
})

export default axiosPOSTInstance;