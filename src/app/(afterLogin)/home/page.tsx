import React from 'react'
import style from './home.module.css'
import Tab from './_component/Tab'
import PostForm from './_component/PostForm'
import Post from '../_component/Post'
import TabProvider from './_component/TabProvider'

export default function Home() {
  
  return (
    <main className={style.main}>
      <TabProvider>
        <Tab/>
        <PostForm/>
        {Array.from({length:5}, (_,idx) => idx).map((idx)=> <Post key={idx} />)}
      </TabProvider>
    </main>
  )
}

/*
  서버액션이라는 기능이 있기는 하지만, 현재는 완전한 기능이 아니기에 강의에 도입하지 않았으며,
  추후에 안정화되면 그때에 도입할 예정입니다. 그 전까지 Post와 같은 부분은 CC 로 제작될 예정입니다. 
*/