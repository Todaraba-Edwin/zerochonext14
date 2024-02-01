## Next + React Query로 SNS 서비스 만들기
[강의 깃허브](https://github.com/ZeroCho/next-app-router-z/blob/master/ch1/src/app/(beforeLogin)/login/page.tsx)

### 1. Layout 만들기

#### RootLayout
최상위 레이아웃에 해당되는 것을 만들 수 있고, next13에 도입되었습니다. 
그런데 최상이 레이아웃이 여러개라면? 추후에 설명해드리겠습니다. 

만약 하위의 별개의 레이아웃을 적용하고 싶다면, 해당 폴더에 Layout.tsx 를 만들고, 그 안에 children 으로 page.tsx 가 배치되게 하면 된다. 

```bash
# 예 : RootLayout -> HomeLayout -> page.tsx
```

#### 다이나믹 라우터 [대괄호] 표기
동적 라우팅은 [대괄호]로 표시할 수 있습니다. 

#### (라우팅)과 레이아웃 
(소괄호) 디렉토리는 주소창에 관여를 하지 않는 폴더를 생성할 때 사용한다. 나아가 그룹을 생성할 수 있다. 

```bash
app
ᄂ (example)
    ᄂ folder 
# /(example)/folder 가 아니라, /folder 가 된다. 
```

레이아웃을 중첩할 떼, (소괄호폴더)에는 page.tsx는 없지만, layout.tsx는 만들 수 있다는 점을 기억하자. 폴더 하나당 레이아웃을 만들 수 있다보니, 레이아웃 기준으로 라우팅 폴더를 생성합니다. 이때 Layout는 유지되기에 리렌더링되지 않습니다. 

#### template.tsx
그러나 리렌더링 되는 레이아웃을 만들고 싶다면 `template.tsx` 를 활용할 수도 있다. 주의할 점은 공존하면 안된다. 공식문서 상에는 페이지 사이에서 기록을 할 때, 구글애널릭틱스를 할 때 등, 매번 새롭게 마운트 되게 할 이유가 있을 때 사용할 수 있지만, 클론코딩에서는 사용할 일이 없다. 

#### 페러렐 라우트 & 인터셉팅 라우트  
트위터의 사례에서 볼 수 있는 것은 루트('/')경로의 page.tsx 위에 i/flow/login/page.tsx 를 중첩해서 띄우고 싶은 것이다. 이것을 가능하게 하는 것이 패러렐 라우트이다.  

사용하고자 할 때 주의할 점은 아래와 같다. 

```bash
@modal # 접두어 @로 시작하는 폴더를 만들고 
ᄂ page.tsx # 그 아래 page.tsx 폴더를 만든다.
```

그러면 이제 modal:React.ReactNode 를 통해 패러렐 라우팅을 위한 준비가 절반 된 것이다. 문제는 이를 사용하기 위해서는 해당 @modal 에 layout과 page.tsx 가 함께 위치할 때 사용할 수 있다는 것이다. 

```bash
@modal
layout.tsx
page.tsx # 바로 해당 page.tsx 에서 @modal 의 내용을 가져와서 패러렐 라우팅을 가능하게 한다. 
```

최상단에 있던 page.tsx를 `(beforeLogin)`로 옮기고, 여기에 layout.tsx를 추가해준다. 그리고 @modal에 있는 page.tsx 의 position을 제어해 주면 된다. 

#### 서버컴포넌트와 use client

기본적으로 넥스트는 SSR 방식으로 구현됩니다. 그러나 훅을 사용하기 위해서는 클라이언트 컴포넌트가 되어야 합니다. 이를 위해서는 최상단에 "use client"; 를 붙여주면 됩니다. 그렇다면 왜 기본설정이 서버컴포넌트일까? 이는 데이터와 관련 있는데 관련 내용은 추후에 다루도록 하자. 

정리하면 간단하게 "use client"만으로 서버컴포넌트를 클라이언트 컴포넌트러 전환할 수 있다. 

#### default.tsx


#### 패러럴 라우팅, 인터셉터 라우팅 
