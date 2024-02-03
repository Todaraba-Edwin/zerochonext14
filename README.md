## Next + React Query로 SNS 서비스 만들기
[강의 깃허브](https://github.com/ZeroCho/next-app-router-z/blob/master/ch1/src/app/(beforeLogin)/login/page.tsx)
[nextjs 공식문서](https://nextjs.org/docs)


### 0. Next와 Next의 Special Files
Next.js는 SPA(싱글페이지) 웹 애플리케이션을 만들기 위한 프레임워크이다. SPA는 단일페이지에서 웹 애플리케이션이 구동하게 한다. 이는 단일한 HTML를 내려받고 그 안에서 동작하기에 페이지 전환시 새로운 HTML을 받아올 필요가 생략되며, 
이 과정에서 사용자가 경험했던 약간의 깜박거림 없이 소통한다는 것이다. 

SPA을 위해 가장 널리 도입되고 있는 기술은 React이다. 그러나 리액트는 모든파일이 CSR 방식이기에 SEO에 있어서 불리하다는 점과
모든 프로그램의 JS파일을 하나의 파일로 번들링해야 한다는 점에서 초기 렌더링 속더의 저하를 발생시킨다. 
물론 React에서도 이를 위해서 컴포넌트 단위로 번들링을 제어할 수 있다. React.lazy()가 여기에 해당된다. 
반면에 Next.js는 라우팅에 따라서 이러한 번들과정을 개발자가 구현하지 않아도 소분되도록 제어하고 있다는 점과 페이지 간 전환에 필요한 자원들이 효율적으로 관리하고 있다는 점에서 React 생태계를 확장하고 개선하였다. 서버 사이드 렌더링(SSR)과 정적 사이트 생성(SSG)을 지원하여 이러한 SEO 문제를 극복하고 있다. 

```bash
# _app.js/.jsx/.tsx      : Custom App
# _document.js/.jsx/.tsx : Custom Document
# _error.js/.jsx/.tsx    : Custom Error Page
# 404.js/.jsx/.tsx       : 404 Error Page
# 500.js/.jsx/.tsx       : 500 Error Page
```

#### 서버 컴포넌트와 클라이언트 컴포넌트
웹 애플리케이션을 렌더링 할 수 있는 환경에는 두 가지가 존재한다. 하나는 'Server'이고 다른 하나는 'Client' 환경이다. 

- 클라이언트 : 애플리케이션 코드에 대한 요청을 서버로 보내는 사용자 장치의 브라우저를 참조하여 동작하고, 서버의 응답을 사용자 인터페이스에 전달한다. 
- 서버 : 애플리케이션 코드를 저장하고, 클라이언트로부터 요청을 받고, 적절한 응답을 다시 보내는 데이터 센터의 컴퓨터에 해당된다. 

이러한 `요청-응답` 라이프 사이클을 기반으로 웹 애플리케이션은 동작한다. 
- 사용자의 행동     : 링크를 클릭하거나, 양식을 제출하거나, url을 주소표시줄에 직접 입력하는 행위 등
- HTTP Request  
- 서버            : 클라이언트의 요청에 대해서 서버는 적절한 자원으로 응답한다. 
- HTTP Response 
- 클라이언트        : 서버로부터 받아온 자원을 분석하고
- 사용자 작업       : 사용자 인터페이스가 렌더링 되면, 전체 프로세스가 다시 시작된다. 

이러한 동작에는 분명한 경계가 존재하는데 `네트워크 경계`가 그것이다. 클라이언트와 서버, 또는 서버와 데이터 저장소의 경계가 그것이다.

#### Server Component
기본적으로 Next.js는 React Server Components로 구동되며, 이를 통해 서버에 렌더링되고 선택적으로 캐시될 수 있는 UI를 작성할 수 있다고 한다. Next에서는 스트리밍과 부분 렝더링을 위해 세그먼트별로 세분하여, 세 가지 다른 서버 렌더링 전략을 채택할 수 있다. 

- 첫째, 정적 렌더링(Static Rendering)
- 둘째, 동적 렌더링(Dynamic Rendering)
- 셋째, 스트리밍(Streaming) : 서버에서 UI를 점진적으로 렌더링 하게 할 수 있다. 컴포넌트가 분활되어 있을 때, 해당 작업이 완료되면 클라이언트로 스트리밍 되며, 이를 통해 사용자는 전체 콘텐츠 렌더링이 완료되기 전에 페이지의 일부를 즉시 볼 수 있다. 

1. 서버 렌더링의 이점
- 데이터 가져오기 : 렌더링에 걸리는 시간과 클라이언트가 해야 할 요청 수를 줄임으로 성능을 향상시킬 수 있다. 이는 데이터 가져오기에서 데이터 소스에 더 가까운 서버로 요청시기를 이동시키기 때문이다. 
- 보안 : 클라이언트에 노출될 위험 없이 토큰 및 API 키와 같은 민감한 데이터와 로직을 서버에 유지할 수 있다. 
- 캐싱 : 서버에서 렌더링하면 후속 요청과 사용자 간의 결과를 캐시하고 재사용한다. 
- 번들 크기 : 클라이언트가 Server Component용 자바스크립트를 다운로드, 구문 분석 및 실행할 필요가 없기 때문에 느린 인터넷이나 덜 강력한 장치를 가진 사용자에게 유리하게 동작사킬 수 있으며, FCP(첫번재 컨텐츠 페인트)와 초기 페이지 로드에서 사용자가 즉시 페이지를 볼 수 있도록 HTML을 생성하여 내려준다는 점이며, 이는 SEO에 유리하다는 말이 된다. 


#### Client Component
선택적으로 필요에 따라 컴포넌트를 CSR 방식을 채택하게 할 수 있다. 

### 1. Next App Router
기획에 따라 SPA는 여러개의 페이지로 구성될 수 있고, 이를 제어하는 기술이 Routing이다. Next13 이전에는 page Router이 소개되었지만, Next13 이후 App Router를 도입하여 다채로운 라우팅 기술을 구현하게 제공하고 있다. 

공식문서 상의 `App Router`는 React의 최신 기능을 사용하여 애플리케이션을 구축하기 위한 새로운 패러다임으로 제시된다. 현재 기준으로 공식문서는 새로운 프로그램을 제작한다면 앱 라우터를 사용하는 것을 권장한다. 뿐만 아니라, 같은 응용 프로그램에서는 두 라우터 모두 사용하는 것도 가능하다. 

Next의 컴포넌트들은 기본적으로 `SSR(서버사이드 렌더링)`이라는 점을 기억해야 한다. 그 결과 layout.tsx 컴포넌트는 다시 렌더링되지 않는다. 그 결과 의도적으로 원시 요청 객체에 접근할 수 없지만, 서버 전용 기능( Server Actions or Route Handlers)을 통해서 쿠키를 설정할 수 있다. 이를 통해 페이지 사이를 탐색할 때 캐싱을 통해 재사용함으로 불필욯나 계산을 개선한다. 이러한 디자인은 다른 페이지에 걸쳐 레이아웃에 대해 일관되고 예측 가능한 동작을 시행하여 개발과 디버징을 단순화 한다. 

```typescript
'use server'
 
import { cookies } from 'next/headers'
 
export async function exampleAction() {
  // Get cookie
  const value = cookies().get('name')?.value
 
  // Set cookie
  cookies().set('name', 'Delba')
 
  // Delete cookie
  cookies().delete('name')
}
```



### 2. App Router의 특수한 파일들
![](https://nextjs.org/_next/image?url=%2Fdocs%2Flight%2Ffile-conventions-component-hierarchy.png&w=3840&q=75&dpl=dpl_8JSreCCcxctwsnJ6FNFujsNZdfsZ)

```bash
# layout.js/.jsx/.tsx	     : Layout
# page.js/.jsx/.tsx	         : Page
# ==================================================================
# loading.js/.jsx/.tsx	     : Loading UI, (React suspense boundary)
# not-found.js/.jsx.tsx	     : Not found UI, (React error boundary)
# error.js/.jsx/.tsx	     : Error UI, (React error boundary)
# global-error.js/.jsx/.tsx	 : Global error UI
# route.js/.ts     	         : API endpoint
# template.js/.jsx/.tsx	     : Re-rendered layout
# default.js/.jsx/.tsx	     : Parallel route fallback page
```


#### Route Groups and Private Folders
```bash
# (folder)	: Group routes without affecting routing
# _folder	: Opt folder and all child segments out of routing
```

위의 두 개의 폴더는 Next에서 제공하는 특수한 폴더들이다. (Groupping)은 app 폴더 안에서 url에 노출되지 않지만, 공동의 layout을 가진 페이지들을 그룹화 할 때 사용된다. 

제로초의 - z.com 시리즈에서는 아래와 같은 폴더 구조를 설정한다. 루트경로는('/') app 폴더 안에 page가 없다면 (Groupping) 안에 있는 폴더를 찾아간다. 그러나 이때 주의해야 할 점은 (beforeLogin)과 (aftereLogin) 가운데 하나에 만 page.tsx 가 있어야 한다는 것이다. 

```bash
📂 app
    ┣ 🥑 layout.tsx
    ┣ 📂 (beforeLogin)
    ┃     ┣ 🥑 layout.tsx
    ┃     ┣ 🥑 page.tsx
    ┃     ┣ 📂 _component
    ┃     ┣ 📂 page1
    ┃     ┃    ┗ 🥑 page.tsx
    ┃     ┗ 📂 page2
    ┃          ┗ 🥑 page.tsx    
    ┗ 📂 (aftereLogin)/🥑 page.tsx
```

다음으로 _component는 라우팅의 대상에서 제외될 뿐 아니라, 폴더 자체를 은닉시킬 때 사용되는 폴더이다. 예를 들어 공통적으로 사용하는 컴포넌트를 은닉시킨 시키고 사용할 수 있다. 

#### Layout 컴포넌트 
Next.js 13의 앱 라우터는 페이지, 공유 레이아웃 및 템플릿을 쉽게 만들 수 있는 `새로운 파일 규칙을 도입`시켰다. Next.js에서는 여러 페이지 간에 공유되는 UI를 위해서 별도의 layout 컴포넌트를 제공한다. layout은 컴포넌트가 초기 렌더링 될 때의 상태를 유지하며, 다시 렌더링 하지 않는 상태에서 구동한다. 

```bash
📂 app
    ┣ 🥑 layout.tsx
    ┣ 🥑 page.tsx
    ┣ 📂 page1/🥑 page.tsx
    ┗ 📂 page2/🥑 page.tsx
```

위의 사례를 든다면, 현재 프로젝트에는 3개의 경로가 있다. 루트경로('/'), page1('/page1'), page2('/page2')가 그것이다. 최상위에 있는 layout.tsx는 모든 경로에서 참조하는 공동의 레이아웃 컴포넌트가 된다. 물론 레이아웃을 중첩으로 가지는 것도 가능하다. 

![](https://nextjs.org/_next/image?url=%2Fdocs%2Flight%2Fnested-layout.png&w=3840&q=75&dpl=dpl_8JSreCCcxctwsnJ6FNFujsNZdfsZ)


### 3. Router
#### 동적라우트
```bash
# [folder]	    : Dynamic route segment
# [...folder]   : Catch-all route segment // 모든 경로에서 참조한다고 하는데 확실하게 이해는 못하는 상황
# [[...folder]] : Optional catch-all route segment
```

#### Parallel and Intercepted Routes
```bash
# @folder	      : Named slot
# (.)folder	      : Intercept same level
# (..)folder      : Intercept one level above
# (..)(..)folder  : Intercept two levels above
# (...)folder	  : Intercept from root
```

@ 또한 url에 등장되지 않지만, 중첩라우트를 형성하고자 할 때 사용할 수 있다. 사용례로 모달 컴포넌트를 활용하고자 할 때 사용할 수 있으며, 이때의 장점은 useState를 가지고 모달을 제어하는 것이 아니라 url 경로를 가지고 제어를 한다는 점이다. Named slot 이라는 것처럼 여러 겅우의 슬롯을 형성하여, 사용할 수 있다. 어떤 url과 중첩으로 사용할지는 (소괄호)의 도트로 제어한다. 


---
---
---
---

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



### 2. 페러렐 라우트 & 인터셉팅 라우트  
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
