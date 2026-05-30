/**
 * 화면에 필요한 인라인 SVG 아이콘 모음.
 * Seed Design의 `Icon` 컴포넌트는 `svg` prop으로 React 노드를 받고, 내부적으로
 * Radix `Slot`을 통해 className/style/ref 를 자식 엘리먼트로 전달합니다.
 * 따라서 아이콘들은 `forwardRef`로 만들어 ref/스타일을 그대로 svg로 흘려보냅니다.
 * 모든 아이콘은 `currentColor`를 사용하므로 부모의 `color`로 색을 제어합니다.
 */
import { forwardRef, type CSSProperties, type SVGProps, type ReactNode } from "react";

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
        // 인라인 SVG는 baseline 기준이라 텍스트와 어긋나 보입니다. block으로 고정.
        style={{ display: "block", ...(props.style as CSSProperties) }}
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

export const CloseIcon = makeIcon("CloseIcon", <path d="M6 6l12 12M18 6 6 18" />);

export const BackIcon = makeIcon("BackIcon", <path d="m15 5-7 7 7 7" />);

export const ChevronRightIcon = makeIcon(
  "ChevronRightIcon",
  <path d="m9 6 6 6-6 6" />,
);

export const ChevronUpIcon = makeIcon("ChevronUpIcon", <path d="m6 15 6-6 6 6" />);

export const CameraIcon = makeIcon(
  "CameraIcon",
  <>
    <path d="M4 8h3l1.5-2h7L17 8h3a1 1 0 0 1 1 1v9a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1Z" />
    <circle cx="12" cy="13" r="3.2" />
  </>,
);

export const ShieldCheckIcon = makeIcon(
  "ShieldCheckIcon",
  <path d="M12 3 5 6v5c0 4.3 3 7.6 7 9 4-1.4 7-4.7 7-9V6l-7-3Zm-1.2 11.4L8 11.6l1.4-1.4 1.4 1.4 3.4-3.4L15.6 9l-4.8 5.4Z" />,
  true,
);

export const SparkleIcon = makeIcon(
  "SparkleIcon",
  <path d="M12 3c.6 3.6 1.8 4.8 5.4 5.4-3.6.6-4.8 1.8-5.4 5.4-.6-3.6-1.8-4.8-5.4-5.4C10.2 7.8 11.4 6.6 12 3ZM18.5 14c.3 1.8.9 2.4 2.7 2.7-1.8.3-2.4.9-2.7 2.7-.3-1.8-.9-2.4-2.7-2.7 1.8-.3 2.4-.9 2.7-2.7Z" />,
  true,
);

export const BookIcon = makeIcon(
  "BookIcon",
  <>
    <path d="M5 4h9a3 3 0 0 1 3 3v13H8a3 3 0 0 1-3-3V4Z" />
    <path d="M5 4a3 3 0 0 0 3 3h9" />
  </>,
);

export const AlertCircleIcon = makeIcon(
  "AlertCircleIcon",
  <>
    <circle cx="12" cy="12" r="9" fill="currentColor" stroke="none" />
    <path d="M12 7v6" stroke="#fff" />
    <circle cx="12" cy="16.5" r="1.1" fill="#fff" stroke="none" />
  </>,
);

export const PencilIcon = makeIcon(
  "PencilIcon",
  <path d="M4 20h4L19 9l-4-4L4 16v4ZM14 6l4 4" />,
);

export const ImageIcon = makeIcon(
  "ImageIcon",
  <>
    <rect x="3" y="5" width="18" height="14" rx="2" />
    <circle cx="8.5" cy="10" r="1.6" />
    <path d="m4 18 5-5 4 4 3-3 4 4" />
  </>,
);

export const DumbbellIcon = makeIcon(
  "DumbbellIcon",
  <path d="M3 9v6M6 7v10M18 7v10M21 9v6M6 12h12" />,
);

export const FlagIcon = makeIcon(
  "FlagIcon",
  <>
    <path d="M6 21V4" />
    <path d="M6 5h11l-2 3 2 3H6" />
  </>,
);

export const QuestionCircleIcon = makeIcon(
  "QuestionCircleIcon",
  <>
    <circle cx="12" cy="12" r="9" />
    <path d="M9.4 9.2a2.6 2.6 0 0 1 5 .9c0 1.7-2.4 2-2.4 3.4" />
    <circle cx="12" cy="17" r="1" fill="currentColor" stroke="none" />
  </>,
);

export const RefreshIcon = makeIcon(
  "RefreshIcon",
  <>
    <path d="M19 12a7 7 0 1 1-2.1-5" />
    <path d="M17 3v4h-4" />
  </>,
);

export const LeafIcon = makeIcon(
  "LeafIcon",
  <path d="M5 19c0-7 5-12 14-13-1 9-6 14-13 14 0-3 2-6 6-8" />,
  true,
);

export const LockIcon = makeIcon(
  "LockIcon",
  <>
    <rect x="5" y="10.5" width="14" height="9.5" rx="2" />
    <path d="M8 10.5V8a4 4 0 0 1 8 0v2.5" />
  </>,
);

export const ClockIcon = makeIcon(
  "ClockIcon",
  <>
    <circle cx="12" cy="12" r="8.5" />
    <path d="M12 7.5V12l3 2" />
  </>,
);

export const CheckCircleIcon = makeIcon(
  "CheckCircleIcon",
  <>
    <circle cx="12" cy="12" r="9" fill="currentColor" stroke="none" />
    <path d="m8 12 2.4 2.4L16 9" stroke="#fff" strokeWidth={2.2} />
  </>,
);

export const PinFilledIcon = makeIcon(
  "PinFilledIcon",
  <>
    <path d="M12 22s7-6.3 7-12a7 7 0 1 0-14 0c0 5.7 7 12 7 12Z" fill="currentColor" stroke="none" />
    <circle cx="12" cy="10" r="2.6" fill="#fff" stroke="none" />
  </>,
);

export const ShareIcon = makeIcon(
  "ShareIcon",
  <>
    <path d="M12 3v12" />
    <path d="m8 7 4-4 4 4" />
    <path d="M6 11H5v9a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-9h-1" />
  </>,
);

export const HeartIcon = makeIcon(
  "HeartIcon",
  <path d="M12 20s-7-4.6-9.2-9C1.4 8.1 2.6 5 5.6 5 7.5 5 8.8 6 12 9.2 15.2 6 16.5 5 18.4 5c3 0 4.2 3.1 2.8 6-2.2 4.4-9.2 9-9.2 9Z" />,
);
