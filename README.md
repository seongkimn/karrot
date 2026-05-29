# karrot — Seed Design 데모

당근(Karrot)의 오픈소스 디자인 시스템 [**Seed Design**](https://seed-design.io/)을
React + Vite 환경에 가져온 데모 프로젝트입니다.

## 사용한 패키지

| 패키지 | 역할 |
| --- | --- |
| [`@seed-design/css`](https://www.npmjs.com/package/@seed-design/css) | 디자인 토큰 + 컴포넌트 스타일 + 테마 (CSS) |
| [`@seed-design/react`](https://www.npmjs.com/package/@seed-design/react) | React 컴포넌트 (`ActionButton`, `Badge`, `TextField`, `Switch`, `Callout` 등) |

## 시작하기

```bash
npm install
npm run dev      # 개발 서버
npm run build    # 타입 체크 + 프로덕션 빌드
npm run preview  # 빌드 결과 미리보기
```

## Seed Design 적용 방법

이 프로젝트에 디자인 시스템을 가져오기 위해 세 곳을 설정했습니다.

### 1. 전역 CSS 불러오기 — `src/main.tsx`

디자인 토큰과 컴포넌트 스타일, 테마가 모두 포함된 번들을 한 번 import 합니다.

```ts
import "@seed-design/css/all.css";
```

> 컴포넌트 스타일 없이 토큰/테마만 필요하면 `@seed-design/css/base.css` 를 사용할 수 있습니다.

### 2. 테마(색상 모드) 지정 — `index.html`

Seed의 CSS는 `<html>` 의 `data-seed*` 속성을 기준으로 토큰 값을 결정합니다.

```html
<html lang="ko" data-seed data-seed-color-mode="light-only" data-seed-platform="ios">
```

- `data-seed-color-mode`: `system` | `light-only` | `dark-only`
- `data-seed-platform`: `ios` | `android`

런타임에 동적으로 모드를 바꾸려면 `@seed-design/css/theming` 의 `generateThemingScript()`
를 활용해 `document.documentElement.dataset` 값을 갱신하면 됩니다.

### 3. 컴포넌트 사용 — `src/App.tsx`

```tsx
import { ActionButton, Badge, TextField, Switch, Callout, Text, Box } from "@seed-design/react";

<ActionButton variant="brandSolid">브랜드 버튼</ActionButton>
<Badge tone="brand" variant="weak">당근</Badge>
```

`Switch` / `TextField` / `Callout` 처럼 합성형(compositional) API를 가진 컴포넌트는
네임스페이스(`Switch.Root`, `Switch.Control` …) 형태로 조합해 사용합니다.

## 참고

- 공식 문서: https://seed-design.io/
- GitHub: https://github.com/daangn/seed-design
