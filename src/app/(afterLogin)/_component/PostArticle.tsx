"use client";

import { useRouter } from "next/navigation";
import style from "./post.module.css";
import React from "react";

interface Props {
  children: React.ReactNode;
  post: {
    postId: number;
    content: string;
    User: {
      id: string;
      nickname: string;
      image: string;
    };
    createdAt: Date;
    Images: any[];
  };
}

export default function PostArticle({ children, post }: Props) {
  const router = useRouter();
  const onClick = () => {
    router.push(`/${post.User.id}/status/${post.postId}`);
  };
  return (
    <article onClickCapture={onClick} className={style.post}>
      {/* 
            Captureing
               - onClickCapture()
               - 상위컴포넌트의 이벤트를 하위 컴포넌트로 동작을 제어할 때
            Bubbbing
              - event.stopPropagation()
              - 하위컴포넌트의 이벤트를 상위 컴포넌트로 동작을 제어할 때 
      */}
      {children}
    </article>
  );
}
