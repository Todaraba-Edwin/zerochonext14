import React from 'react'
import styles from '@/app/(beforeLogin)/_component/main.module.css'

type Props = {
  children:React.ReactNode
  modal:React.ReactNode
} 

export default function Layout({children, modal}:Props) {
  return (
    <div className={styles.container}>
      {children}
      {modal}
      {/* 
        페러럴 라우트가 늘어날 수록, 모달을 이렇게 제어해주면 된다.
        그러나 매번 이렇게 무한정 늘어아게 할 수 없기에 스스로 제어할 필요는 있습니다. 
       */}
      </div>
  )
}
