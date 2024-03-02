"use client";
import { TabContext, TabEnum } from './TabProvider';
import style from './tab.module.css';
import {useContext, useState} from "react";

export default function Tab() {
  console.log('Tab 컴포넌트 렌더링');
  
  const {tab, setTab} = useContext(TabContext)
  const onClickRec = () => setTab(TabEnum.REC);
  const onClickFol = () =>  setTab(TabEnum.FOL);  

  return (
    <div className={style.homeFixed}>
      <div className={style.homeText}>홈</div>
      <div className={style.homeTab}>
        <div onClick={onClickRec}>
          추천
          <div className={style.tabIndicator} hidden={tab === TabEnum.FOL}></div>
        </div>
        <div onClick={onClickFol}>
          팔로우 중
          <div className={style.tabIndicator} hidden={tab === TabEnum.REC}></div>
        </div>
      </div>
    </div>
  )
}