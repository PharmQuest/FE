// 존재하지 않는 페이지 접근 시 home으로 redirection

import { useRouter } from "next/router"
import { useEffect } from "react";

const NonePage = () => {
  const router = useRouter();

  useEffect(() => {
    router.push("/");
  })
}

export default NonePage;