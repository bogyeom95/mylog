# 그냥 저냥 기록소

[홈페이지 바로가기](https://just-archive.vercel.app/)

MDX 기반으로 개발, 일상 등 기록하고 싶은 글을 작성하고 개시하기 위해 만든 프로젝트입니다.
Markdown과 JSX의 장점을 결합하여 자유롭게 기록을 남기고 아카이브할 수 있습니다.

## 주요 기술

- `next.js`
- `contentlayer`
- `tailwind CSS + daisyui`
- `date-fns`
- `rehype + shiki`

## 프로젝트 구조

```
├── app                        # 메인 페이지
│   └── posts
│       └── [...slug]          # 동적 라우팅을 통해 각 게시물 페이지를 렌더링
├── components                 # 컴포넌트 목록
├── docs                       # 실제 개시될 MDX 문서들
└── public
```
