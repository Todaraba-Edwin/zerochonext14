import { LayoutProps } from '@/type/layout'
import React from 'react'
import style from '@/app/(afterLogin)/layout.module.css'
import Link from 'next/link'
import Image from 'next/image'
import ZLogo from '../../../public/zlogo.png'
import NavMenu from './_component/NavMenu'
import LogoutButton from './_component/LogoutButton'
import TrentSection from './_component/TrendSection'
import FollowRecommend from './_component/FollowRecommend'
import RightSearchZone from './_component/RightSearchZone'

export enum UnviableSegments {
  EXPLORE = "explore",
  SEARCH = 'search'
}

export default function AfterLoginLayout({children, modal}:LayoutProps) {

  return (
    <div className={style.container}>
      <header className={style.leftSectionWrapper}>
        <section className={style.leftSection}>
          <div className={style.leftSectionFixed}>
            <Link className={style.logo} href='/home'>
              <div className={style.logoPill}>
                <Image src={ZLogo} alt='z.x=com로고' width={40} height={40}/>
              </div>
            </Link>
            <nav>
              <ul>
                <NavMenu /> {/* ActiveLink 하려고 하는데, 이는 Client Components의 영역입니다. */}
              </ul>
              <Link href="/compose/tweet" className={style.postButton}>
                게시하기
              </Link>
            </nav>
            <LogoutButton />
          </div>
        </section>
      </header>
      <div className={style.rightSectionWrapper}>
        <div className={style.rightSectionInner}>
          <main className={style.main} >{children}</main>
          <section className={style.rightSection}>
            <RightSearchZone/>
            <TrentSection />
           <div className={style.followRecommend}>
              <h3>팔로우 추천</h3>
              <FollowRecommend />
              <FollowRecommend />
              <FollowRecommend />
           </div>
          </section>
        </div>
      </div>
      {/* 패러렐 라우트의 대상이 들어갈 자리를 기록해 줍니다. */}
      {modal}
    </div>
  )
}
