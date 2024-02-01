// import { redirect } from 'next/navigation'
// export default function page() {
//   redirect('/i/flow/login')
// }


/*
  위의 redirect는 서버에서 동작하는 SSR, 
  그렇기 때문에 클라이언트 렌더링의 인터셉터 라우팅이 원활하게 동작하지 못한다.

  이를 해결하기 위해서는 이를 클라이언트 렌더링으로 변환해줘야 하는데,
  이를 가능하게 하는 것이 <Link /> 이다. 
*/

"use client";

import {useRouter} from "next/navigation";
import Main from "../_component/Main";

// 배경은 login 이 될 것이기에, page와 같이 만들어줄 필요가 있습니다. 
// export default function Login() {
//   const {replace} = useRouter();
//   replace('/i/flow/login');
//   return null;
// }

export default function Login() {
  const {replace} = useRouter();
  replace('/i/flow/login');
  return <Main />;
}

/*
  push : history 가 쌓이지만 
  replace : history 가 쌓이지 않습니다. 
*/