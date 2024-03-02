"use client";

import style from "./post.module.css";
import Link from "next/link";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime"; // 플러그인을 넣어야 합니다.
import "dayjs/locale/ko";
import Image from "next/image";
import ActionButtons from "@/app/(afterLogin)/_component/ActionButtons";
import PostArticle from "./PostArticle";
import { faker } from "@faker-js/faker";

dayjs.locale("ko");
dayjs.extend(relativeTime);

export default function Post() {
  const target = {
    postId: 1,
    User: {
      id: "edwin",
      nickname: "Elon Musk",
      image: "/yRsRRjGO.jpg",
    },
    content: "클론코딩 라이브로 하니 너무 힘들어요 ㅠㅠ",
    createdAt: new Date("2024-2-16 23:00:00"),
    Images: [] as any[],
  };

  if (Math.random() > 0.5) {
    // 반반의 확률을 의미하는 Math.random() > 0.5 사용해서 새로고침마다 동적으로 이미지를 넣어보자.
    target.Images.push({ imageId: 1, link: faker.image.urlLoremFlickr() });
  }
  return (
    <PostArticle post={target}>
      {/* 
          SC : 부모만 클라이언트 컴포넌트
          CC : 자식은 서버 컴포넌트로 제작할 경우, children(Props)으로 내려주는 방식으로 처리가능
          * 이때, import 방식으로 접근하면 안된다.
      */}
      <div className={style.postWrapper}>
        <div className={style.postUserSection}>
          <Link href={`/${target.User.id}`} className={style.postUserImage}>
            <Image
              src={target.User.image}
              alt={target.User.nickname}
              width={40}
              height={40}
            />
            <div className={style.postShade} />
          </Link>
        </div>
        <div className={style.postBody}>
          <div className={style.postMeta}>
            <Link href={`/${target.User.id}`}>
              <span className={style.postUserName}>{target.User.nickname}</span>
              &nbsp;
              <span className={style.postUserId}>@{target.User.id}</span>
              &nbsp; · &nbsp;
            </Link>
            {/* fromNow(true)  : ~ ago 를 제거하고, default 는 false 이기에 ~전이 표기된다. */}
            <span className={style.postDate}>
              {dayjs(target.createdAt).fromNow()}
            </span>
          </div>
          <div>{target.content}</div>
          <div className={style.postImageSection}>
            {target.Images && Boolean(target.Images.length) && (
              <Link
                className={style.postImageSection}
                href={`/${target.User.id}/status/${target.postId}/photh/${target.Images[0].imageId}`}
              >
                <img src={target.Images[0]?.link} alt="" />
              </Link>
            )}
          </div>
          <ActionButtons />
        </div>
      </div>
    </PostArticle>
  );
}
