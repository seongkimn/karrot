/**
 * 화면에 필요한 인라인 SVG 아이콘 모음.
 * Seed Design의 `Icon` 컴포넌트는 `svg` prop으로 React 노드를 받고, 내부적으로
 * Radix `Slot`을 통해 className/style/ref 를 자식 엘리먼트로 전달합니다.
 * 따라서 아이콘들은 `forwardRef`로 만들어 ref/스타일을 그대로 svg로 흘려보냅니다.
 * 모든 아이콘은 `currentColor`를 사용하므로 부모의 `color`로 색을 제어합니다.
 */
import { forwardRef, type SVGProps, type ReactNode } from "react";

function makeIcon(displayName: string, paths: ReactNode, filled = false) {
  const Comp = forwardRef<SVGSVGElement, SVGProps<SVGSVGElement>>(
    (props, ref) => (
      <svg
        ref={ref}
        width="100%"
        height="100%"
        viewBox="0 0 24 24"
        fill={filled ? "currentColor" : "none"}
        stroke={filled ? "none" : "currentColor"}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
        {...props}
      >
        {paths}
      </svg>
    ),
  );
  Comp.displayName = displayName;
  return Comp;
}

export const SearchIcon = makeIcon(
  "SearchIcon",
  <>
    <circle cx="11" cy="11" r="7" />
    <path d="m20 20-3.5-3.5" />
  </>,
);

export const BellIcon = makeIcon(
  "BellIcon",
  <>
    <path d="M6 9a6 6 0 0 1 12 0c0 5 2 6 2 6H4s2-1 2-6" />
    <path d="M10 19a2 2 0 0 0 4 0" />
  </>,
);

export const MenuIcon = makeIcon(
  "MenuIcon",
  <path d="M4 7h16M4 12h16M4 17h16" />,
);

export const ChevronDownIcon = makeIcon(
  "ChevronDownIcon",
  <path d="m6 9 6 6 6-6" />,
);

export const ArrowUpRightIcon = makeIcon(
  "ArrowUpRightIcon",
  <path d="M7 17 17 7M8 7h9v9" />,
);

export const CalendarIcon = makeIcon(
  "CalendarIcon",
  <>
    <rect x="3" y="5" width="18" height="16" rx="2" />
    <path d="M3 9h18M8 3v4M16 3v4" />
  </>,
);

export const PinIcon = makeIcon(
  "PinIcon",
  <>
    <path d="M12 21s7-6.3 7-11a7 7 0 1 0-14 0c0 4.7 7 11 7 11Z" />
    <circle cx="12" cy="10" r="2.5" />
  </>,
);

export const ThumbsUpIcon = makeIcon(
  "ThumbsUpIcon",
  <path d="M7 10v10H4V10h3Zm0 0 4.5-7c1.2 0 2 .9 2 2v3h4.6c1.2 0 2.1 1.1 1.8 2.3l-1.6 7c-.2 1-1 1.4-2 1.4H7" />,
);

export const ChatIcon = makeIcon(
  "ChatIcon",
  <path d="M4 5h16v11H9l-4 3v-3H4V5Z" />,
);

export const PeopleIcon = makeIcon(
  "PeopleIcon",
  <>
    <circle cx="9" cy="8" r="3" />
    <path d="M3.5 19a5.5 5.5 0 0 1 11 0" />
    <path d="M16 6.5a3 3 0 0 1 0 5.5M17.5 19a5.5 5.5 0 0 0-3-4.9" />
  </>,
);

export const MoreIcon = makeIcon(
  "MoreIcon",
  <>
    <circle cx="12" cy="5" r="1.4" />
    <circle cx="12" cy="12" r="1.4" />
    <circle cx="12" cy="19" r="1.4" />
  </>,
  true,
);

export const PlusIcon = makeIcon("PlusIcon", <path d="M12 5v14M5 12h14" />);

export const FireIcon = makeIcon(
  "FireIcon",
  <path d="M13 2c.5 3-1.5 4.5-3 6.5C8.4 10.6 7 12.4 7 15a5 5 0 0 0 10 0c0-2-1-3.7-2-5 .2 1.2-.3 2.3-1.2 2.8C14.4 9.6 14.5 5.6 13 2Z" />,
  true,
);

export const VoteIcon = makeIcon(
  "VoteIcon",
  <>
    <rect x="4" y="3" width="16" height="18" rx="2" />
    <path d="m8.5 11 2 2 4-4.5" />
  </>,
);

export const HomeIcon = makeIcon(
  "HomeIcon",
  <>
    <path d="M4 11 12 4l8 7" />
    <path d="M6 10v10h12V10" />
  </>,
);

export const CommunityIcon = makeIcon(
  "CommunityIcon",
  <>
    <circle cx="7" cy="9" r="2.4" />
    <circle cx="17" cy="9" r="2.4" />
    <path d="M2.5 18a4.5 4.5 0 0 1 9 0v.5h-9V18ZM12.5 18a4.5 4.5 0 0 1 9 0v.5h-9V18Z" />
  </>,
  true,
);

export const MapIcon = makeIcon(
  "MapIcon",
  <>
    <path d="M12 21s7-6.3 7-11a7 7 0 1 0-14 0c0 4.7 7 11 7 11Z" />
    <circle cx="12" cy="10" r="2.5" />
  </>,
);

export const PersonIcon = makeIcon(
  "PersonIcon",
  <>
    <circle cx="12" cy="8" r="3.2" />
    <path d="M5 20a7 7 0 0 1 14 0" />
  </>,
);
