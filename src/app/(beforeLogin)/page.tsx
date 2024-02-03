// import styles from '../page.module.css'
// /*
//   tailwind : 호불호가 너무 심하고, 가독성이 없다. 
//   styled Component : Server Component 에서 문제가 있음
//   sass
//   css module : css가 중요한 것이 아니라, next가 중요하기에 간단히 가자 
//   vanilla extract : windows에서 문제 발생, 최근 핫한 라이브러리 
// */
// import Image from 'next/image'
// import Link from 'next/link'
// import React from 'react'
// import zLoge from '/public/zlogo.png'

// export default function HomeIndex() {
//   return (
//     <>
//     <div className={styles.left}>
//       <Image src={zLoge} alt="logo" />
//     </div>
//     <div className={styles.right}>
//       <h1>지금 일어나고 있는 일</h1>
//       <h2>지금 가입하세요.</h2>
//       <Link href="/i/flow/signup" className={styles.signup}>계정 만들기</Link>
//       <h3>이미 트위터에 가입하셨나요?</h3>
//       <Link href="/login" className={styles.login}>로그인</Link>
//     </div>
//   </>
//   )
// }

import React from 'react'
import Main from './_component/Main'

export default function page() {
  return (
    <>
    <p style={{position:'absolute', top:'30px'}}>page Router</p>
    <Main />
  </>
  )  
}
