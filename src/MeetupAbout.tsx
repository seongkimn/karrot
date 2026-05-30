import { useState } from "react";
import { Box, Icon, Text } from "@seed-design/react";
import {
  BackIcon,
  BellIcon,
  CalendarIcon,
  ChatIcon,
  CheckCircleIcon,
  ChevronRightIcon,
  ClockIcon,
  FireIcon,
  HeartIcon,
  LeafIcon,
  LockIcon,
  MoreIcon,
  PeopleIcon,
  PinFilledIcon,
  PinIcon,
  ShareIcon,
  ShieldCheckIcon,
  ThumbsUpIcon,
} from "./icons";
import {
  FixedIcon,
  brand,
  fg,
  fgInformative,
  fgMuted,
  fgSubtle,
  fill,
  layer,
  stroke,
} from "./shared";
import ScheduleReviewFeed from "./ScheduleReviewFeed";
import ScheduleFeed from "./ScheduleFeed";
import ChallengeFeed from "./ChallengeFeed";
import PostFeed from "./PostFeed";

/* 모임 가입 전 공개 소개(랜딩) 페이지 — 피드 카드를 누르면 열립니다. */

export type MeetupAboutTarget = {
  title: string;
  emoji: string;
  hue: number;
};

/* 소개 본문(이모지 + 단락). 스크린샷의 뜨개질 모임 소개를 그대로 옮깁니다. */
const DESCRIPTION: { emoji: string; lines: string[] }[] = [
  { emoji: "🧶", lines: ["대바늘, 코바늘 모두 환영하는 뜨개 모임입니다."] },
  {
    emoji: "🎀",
    lines: [
      "주로 주말/공휴일 강동역 부근에서 모여요.",
      "처음 오시는 분들도 언제나 환영합니다!",
    ],
  },
  {
    emoji: "🔍",
    lines: [
      "휴일이 아니라도 자유롭게",
      "원하는 시간, 장소에서 모임을 여셔도 돼요.",
      "시간 맞는 분들끼리 모여 즐겁게",
      "한 코 한 코 떠보아요 🧶",
    ],
  },
];

/* 게시글·일정·관심 통계 */
const STATS: { label: string; value: string }[] = [
  { label: "게시글", value: "2187" },
  { label: "일정", value: "153" },
  { label: "관심", value: "254" },
];

/* 일정 후기 카드 (이모지 없이 사진 톤만 표현) */
const REVIEWS: { hue: number; likes: number; comments?: number; author: string }[] = [
  { hue: 25, likes: 9, comments: 5, author: "아뜨" },
  { hue: 200, likes: 9, author: "일리" },
  { hue: 230, likes: 9, author: "나로" },
];

/* 모임장 활동 통계 */
const HOST_STATS: { label: string; value: string }[] = [
  { label: "모임 방문", value: "3507" },
  { label: "최근 방문", value: "10시간 전" },
  { label: "일정 참여", value: "99" },
];

/* 멤버 목록 (일부) */
const MEMBERS: { name: string; region: string; desc?: string }[] = [
  { name: "후추", region: "성내제1동", desc: "주로 성인의류 아가 소품 뜹니다 :-)" },
  { name: "호호하하", region: "천호제2동" },
  { name: "곰곰", region: "잠실6동", desc: "반갑습니다 ^^" },
  { name: "써니_", region: "성내제2동" },
  { name: "고은", region: "길동" },
];

/* 일정 목록 (모두 종료 상태) */
const SCHEDULES: { month: string; day: string; title: string; locked?: boolean; time: string; people: string }[] = [
  { month: "5월", day: "23", title: "모임에만 공개된 일정이에요.", locked: true, time: "오후 12:00", people: "7/8명" },
  { month: "5월", day: "13", title: "카페 뜨개 ☕", time: "오전 10:30", people: "4/4명" },
  { month: "5월", day: "9", title: "모임에만 공개된 일정이에요.", locked: true, time: "오후 12:00", people: "6/9명" },
];

/* 챌린지 목록 */
const CHALLENGES: { title: string; status: string; ongoing?: boolean; period: string; people: string }[] = [
  { title: "6월 매일뜨개 챌린지", status: "D-2", ongoing: true, period: "1년 동안 · 매일", people: "5명 참여" },
  { title: "5월 매일뜨개 챌린지", status: "진행 30일차", ongoing: true, period: "1년 동안 · 매일", people: "9명 참여" },
  { title: "4월 매일뜨개 챌린지", status: "종료", period: "1년 동안 · 매일", people: "12명 참여" },
];

/* 게시판 탭 */
const POST_TABS = ["전체", "가입인사", "일정 후기", "자유 게시판", "완성했어요"];

/* 게시글 */
type Post = {
  author: string;
  verified?: boolean;
  time: string;
  board: string;
  lines?: string[];
  truncate?: boolean;
  locked?: boolean;
  photo?: boolean;
  challenge?: { title: string; sub: string };
  likes: number;
  comments: number;
  views: number;
};
const POSTS: Post[] = [
  {
    author: "닛콩",
    verified: true,
    time: "6분 전",
    board: "자유 게시판",
    lines: [
      "요크 줄임 한번 남았을 때",
      "양 쪽 앞판 코수가 다른 것을 확인 했어요",
      "⚡⚡⚡⚡⚡",
      "몸판 코 나눌 때부터 잘못 나눈걸 모르고",
      "앞판 보고 달린 것이죠",
    ],
    truncate: true,
    photo: true,
    challenge: { title: "5월 매일뜨개 챌린지", sub: "1년 챌린지 · 9명 참여" },
    likes: 1,
    comments: 1,
    views: 2,
  },
  {
    author: "후추",
    time: "2시간 전",
    board: "가입인사",
    lines: [
      "안녕하세요:-)",
      "아기옷도 뜨고 성인옷도 뜨고",
      "주로 대바늘을 뜨고 있습니다🥰",
      "잘부탁드립니다❤️🤍",
    ],
    likes: 3,
    comments: 1,
    views: 7,
  },
  {
    author: "유부장",
    verified: true,
    time: "1일 전",
    board: "완성했어요",
    locked: true,
    likes: 7,
    comments: 2,
    views: 16,
  },
];

/* 추천 모임 */
const RECOMMEND_MEETUPS: { title: string; desc: string; region: string; count: string; active?: string }[] = [
  { title: "천호역 20대여자모임", desc: "타지에서 서울 올라온지 1년정도 지났는데 동네친구가 ..", region: "천호제3동", count: "13명" },
  { title: "신생 🔥 좋은 모임 찾다 빡쳐서 💥 만든 모임", desc: "와썹💗 3040 강동 송파 하남 광진 욜로로 맛집🍴", region: "천호동", count: "23명" },
  { title: "💘2030💘 신생방 송파.강동.중랑.건대", desc: "💕 신생방이라 아직 사람은 적지만 즐겁고 재밌게 노..", region: "역삼동", count: "99명" },
  { title: "8090(강동솔로친목)함께해요! 🥰", desc: "신입환영! 8090 강동송파 솔로 친목모임! 안녕하..", region: "천호동", count: "66명" },
  { title: "분위기 좋은 카페에서 취미생활 🧑‍🍳", desc: "분위기 좋은 카페에서 맛있는 음료와 다양한 취미..", region: "자양동", count: "21명" },
  { title: "틈만나면2 강동송파하남 4050모여! 😍", desc: "강동 · 송파 · 하남 40~50대 소규모 신생모임 멤..", region: "천호동", count: "9명", active: "1시간 전 활동" },
];

/* 추천 온라인 카페 */
const ONLINE_CAFES: { title: string; count: string }[] = [
  { title: "취미모임", count: "14명" },
  { title: "🏠 집콕러 생활연구소 🏠", count: "349명" },
  { title: "🐾 모든 귀여움을 공유해요 🐾", count: "208명" },
];

/* 헤더에 떠 있는 원형 반투명 아이콘 버튼 */
function GlassIcon({
  svg,
  onClick,
}: {
  svg: React.ReactNode;
  onClick?: () => void;
}) {
  return (
    <Box
      as="button"
      onClick={onClick}
      style={{
        width: 36,
        height: 36,
        borderRadius: "50%",
        border: "none",
        background: "rgba(0,0,0,0.32)",
        cursor: "pointer",
        padding: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "var(--seed-color-palette-static-white)",
      }}
    >
      <FixedIcon svg={svg} size={20} color="var(--seed-color-palette-static-white)" />
    </Box>
  );
}

/* 고정 헤더에 쓰는 불투명(검정) 아이콘 버튼 */
function SolidIcon({ svg, onClick }: { svg: React.ReactNode; onClick?: () => void }) {
  return (
    <Box
      as="button"
      onClick={onClick}
      style={{
        width: 32,
        height: 32,
        border: "none",
        background: "transparent",
        cursor: "pointer",
        padding: 0,
        flexShrink: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: fg,
      }}
    >
      <FixedIcon svg={svg} size={22} color={fg} />
    </Box>
  );
}

/* 텍스트형(투명 배경) 버튼 공통 스타일 */
const textLinkStyle: React.CSSProperties = {
  border: "none",
  background: "transparent",
  cursor: "pointer",
  padding: 0,
};

/* 사진/아바타 자리를 비운 회색 박스 */
function Photo({
  w,
  h,
  radius = 12,
  circle = false,
  style,
}: {
  w: number | string;
  h: number;
  radius?: number;
  circle?: boolean;
  style?: React.CSSProperties;
}) {
  return (
    <Box
      style={{
        width: w,
        height: h,
        borderRadius: circle ? "50%" : radius,
        background: fill,
        flexShrink: 0,
        ...style,
      }}
    />
  );
}

/* 섹션 제목 + (선택) 더보기 */
function SectionHeader({
  title,
  more = true,
  onMore,
}: {
  title: string;
  more?: boolean;
  onMore?: () => void;
}) {
  return (
    <Box
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 20px 6px",
      }}
    >
      {onMore ? (
        <Box as="button" onClick={onMore} style={textLinkStyle}>
          <Text textStyle="t6Bold" style={{ color: fg }}>
            {title}
          </Text>
        </Box>
      ) : (
        <Text textStyle="t6Bold" style={{ color: fg }}>
          {title}
        </Text>
      )}
      {more && (
        <Box
          as="button"
          onClick={onMore}
          style={{ ...textLinkStyle, display: "flex", alignItems: "center", gap: 2 }}
        >
          <Text textStyle="t4Regular" style={{ color: fgMuted }}>
            더보기
          </Text>
          <FixedIcon svg={<ChevronRightIcon />} size={16} color={fgMuted} />
        </Box>
      )}
    </Box>
  );
}

/* 회색 가로 더보기 버튼 */
function MoreButton({ onClick }: { onClick?: () => void }) {
  return (
    <Box style={{ padding: "8px 20px 0" }}>
      <Box
        as="button"
        onClick={onClick}
        style={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 2,
          border: "none",
          background: fill,
          borderRadius: 10,
          padding: "13px 0",
          cursor: "pointer",
        }}
      >
        <Text textStyle="t5Bold" style={{ color: fg }}>
          더보기
        </Text>
        <FixedIcon svg={<ChevronRightIcon />} size={16} color={fg} />
      </Box>
    </Box>
  );
}

/* 개설일·인증 등 한 줄 정보 행 */
function InfoRow({ svg, children }: { svg: React.ReactNode; children: React.ReactNode }) {
  return (
    <Box style={{ display: "flex", alignItems: "center", gap: 12 }}>
      <FixedIcon svg={svg} size={20} color={fgMuted} />
      <Text textStyle="t5Regular" style={{ color: fg }}>
        {children}
      </Text>
    </Box>
  );
}

export default function MeetupAbout({
  meetup,
  onBack,
}: {
  meetup: MeetupAboutTarget;
  onBack: () => void;
}) {
  // 히어로 사진을 지나 스크롤하면 흰색 고정 헤더로 전환됩니다.
  const [scrolled, setScrolled] = useState(false);
  // 모임 소개 본문 펼침 여부
  const [descOpen, setDescOpen] = useState(false);
  // 게시판 탭
  const [postTab, setPostTab] = useState("전체");
  // 일정 후기 전체보기 열림 여부
  const [reviewsOpen, setReviewsOpen] = useState(false);
  // 가입 안내 다이얼로그 열림 여부
  const [joinNoticeOpen, setJoinNoticeOpen] = useState(false);
  // 일정 전체보기 열림 여부
  const [schedulesOpen, setSchedulesOpen] = useState(false);
  // 챌린지 전체보기 열림 여부
  const [challengesOpen, setChallengesOpen] = useState(false);
  // 게시글 전체보기 열림 여부
  const [postsOpen, setPostsOpen] = useState(false);

  return (
    <Box
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 40,
        width: "100%",
        maxWidth: 420,
        margin: "0 auto",
        height: "100dvh",
        background: layer,
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
      }}
    >
      {/* 스크롤 시 나타나는 흰색 고정 헤더 */}
      <Box
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 6,
          display: "flex",
          alignItems: "center",
          gap: 6,
          padding: "12px 12px",
          background: layer,
          borderBottom: `1px solid ${stroke}`,
          opacity: scrolled ? 1 : 0,
          pointerEvents: scrolled ? "auto" : "none",
          transition: "opacity 0.18s ease",
        }}
      >
        <SolidIcon svg={<BackIcon />} onClick={onBack} />
        <Text
          textStyle="t6Bold"
          maxLines={1}
          style={{ flex: 1, color: fg, textAlign: "center" }}
        >
          {meetup.title}
        </Text>
        <SolidIcon svg={<ShareIcon />} />
        <SolidIcon svg={<MoreIcon />} />
      </Box>

      {/* 스크롤 본문 (헤더가 사진 위에 떠 있으므로 본문이 최상단부터 시작) */}
      <Box
        className="no-scrollbar"
        onScroll={(e: React.UIEvent<HTMLDivElement>) =>
          setScrolled(e.currentTarget.scrollTop > 320)
        }
        style={{ flex: 1, overflowY: "auto" }}
      >
        {/* 히어로 사진 (빈 회색 박스) + 떠 있는 헤더 */}
        <Box style={{ position: "relative" }}>
          <Box style={{ width: "100%", height: 380, background: fill }} />

          {/* 헤더 아이콘들 */}
          <Box
            style={{
              position: "absolute",
              top: 12,
              left: 12,
              right: 12,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <GlassIcon svg={<BackIcon />} onClick={onBack} />
            <Box style={{ display: "flex", gap: 10 }}>
              <GlassIcon svg={<ShareIcon />} />
              <GlassIcon svg={<MoreIcon />} />
            </Box>
          </Box>

          {/* 앨범보기 배지 */}
          <Box
            style={{
              position: "absolute",
              right: 12,
              bottom: 14,
              display: "flex",
              alignItems: "center",
              gap: 5,
              background: "rgba(0,0,0,0.45)",
              borderRadius: 999,
              padding: "6px 12px",
              color: "var(--seed-color-palette-static-white)",
            }}
          >
            <FixedIcon svg={<AlbumGlyph />} size={15} color="var(--seed-color-palette-static-white)" />
            <Text textStyle="t3Bold" style={{ color: "var(--seed-color-palette-static-white)" }}>
              앨범보기
            </Text>
          </Box>

          {/* 캐러셀 점 */}
          <Box
            style={{
              position: "absolute",
              left: 0,
              right: 0,
              bottom: 18,
              display: "flex",
              justifyContent: "center",
              gap: 6,
            }}
          >
            {[0, 1, 2].map((i) => (
              <Box
                key={i}
                style={{
                  width: 6,
                  height: 6,
                  borderRadius: 999,
                  background:
                    i === 0
                      ? "var(--seed-color-palette-static-white)"
                      : "rgba(255,255,255,0.5)",
                }}
              />
            ))}
          </Box>
        </Box>

        {/* 모임 프로필 */}
        <Box style={{ display: "flex", alignItems: "center", gap: 14, padding: "18px 20px 16px" }}>
          <Box style={{ position: "relative", flexShrink: 0 }}>
            <Photo w={52} h={52} radius={14} />
            <Box
              style={{
                position: "absolute",
                right: -3,
                bottom: -3,
                width: 22,
                height: 22,
                borderRadius: "50%",
                background: brand,
                border: `2px solid ${layer}`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <FixedIcon svg={<LeafIcon />} size={12} color="var(--seed-color-palette-static-white)" />
            </Box>
          </Box>
          <Box style={{ flex: 1, minWidth: 0 }}>
            <Text textStyle="t6Bold" maxLines={1} style={{ color: fg, display: "block" }}>
              {meetup.title}
            </Text>
            <Box style={{ display: "flex", alignItems: "center", gap: 5, marginTop: 3 }}>
              <Text textStyle="t4Regular" style={{ color: fgMuted }}>
                천호제3동 · 멤버 115 ·
              </Text>
              <Text textStyle="t4Bold" style={{ color: fgInformative }}>
                3분 전 활동
              </Text>
            </Box>
          </Box>
        </Box>

        <Box style={{ height: 1, background: stroke, margin: "0 20px" }} />

        {/* 이 달의 우수 모임 배너 */}
        <Box style={{ padding: "20px 20px 4px" }}>
          <Box
            style={{
              display: "flex",
              alignItems: "center",
              gap: 14,
              background: "#fde7e1",
              borderRadius: 12,
              padding: "16px 18px",
            }}
          >
            <Box style={{ flex: 1, minWidth: 0 }}>
              <Text textStyle="t5Bold" style={{ color: brand, display: "block" }}>
                이 달의 우수 모임
              </Text>
              <Text textStyle="t4Regular" style={{ color: brand, display: "block", marginTop: 4 }}>
                멤버들의 활동이 많은 모임이에요
              </Text>
            </Box>
            <ExcellentBadge />
          </Box>
        </Box>

        {/* 개설일 / 인증 정보 */}
        <Box style={{ display: "flex", flexDirection: "column", gap: 16, padding: "20px 20px 4px" }}>
          <InfoRow svg={<CalendarIcon />}>2023년 12월 31일 개설</InfoRow>
          <InfoRow svg={<ShieldCheckIcon />}>본인인증 필요, 나이대 공개</InfoRow>
        </Box>

        {/* 멤버 새 메시지 미리보기 */}
        <Box style={{ padding: "16px 20px 4px" }}>
          <Box
            as="button"
            style={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              gap: 12,
              border: `1px solid ${stroke}`,
              borderRadius: 12,
              padding: "14px 16px",
              background: layer,
              cursor: "pointer",
              textAlign: "left",
            }}
          >
            {/* 겹친 아바타 (빈 회색) */}
            <Box style={{ display: "flex", flexShrink: 0 }}>
              {[0, 1, 2].map((i) => (
                <Box
                  key={i}
                  style={{
                    width: 30,
                    height: 30,
                    borderRadius: "50%",
                    background: fill,
                    border: `2px solid ${layer}`,
                    marginLeft: i === 0 ? 0 : -10,
                  }}
                />
              ))}
            </Box>
            <Box style={{ flex: 1, minWidth: 0, display: "flex", alignItems: "center", gap: 6 }}>
              <Text textStyle="t4Regular" style={{ color: fg }}>
                멤버 115명의 새 메시지
              </Text>
              <Text textStyle="t4Bold" style={{ color: fg }}>
                +36
              </Text>
            </Box>
            <Text textStyle="t3Regular" style={{ color: fgMuted, flexShrink: 0 }}>
              1일 전
            </Text>
            <FixedIcon svg={<ChevronRightIcon />} size={18} color={fgMuted} />
          </Box>
        </Box>

        {/* 모임 소개 본문 (접힘 상태에서는 높이를 제한하고 더보기로 펼침) */}
        <Box style={{ padding: "20px 20px 0" }}>
          <Box
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 18,
              maxHeight: descOpen ? "none" : 110,
              overflow: "hidden",
            }}
          >
            {DESCRIPTION.map((para, i) => (
              <Box key={i} style={{ display: "flex", gap: 8 }}>
                <Text textStyle="t5Regular" style={{ flexShrink: 0 }}>
                  {para.emoji}
                </Text>
                <Text textStyle="t5Regular" style={{ color: fg, flex: 1, lineHeight: 1.6 }}>
                  {para.lines.map((line, j) => (
                    <span key={j}>
                      {line}
                      {j < para.lines.length - 1 && <br />}
                    </span>
                  ))}
                </Text>
              </Box>
            ))}
          </Box>
          {/* 더보기 / 접기 */}
          <Box
            as="button"
            onClick={() => setDescOpen((v) => !v)}
            style={{ ...textLinkStyle, marginTop: 8 }}
          >
            <Text textStyle="t5Regular" style={{ color: fgMuted }}>
              {descOpen ? "접기" : "...더보기"}
            </Text>
          </Box>
        </Box>

        {/* 카테고리 칩 */}
        <Box style={{ padding: "18px 20px 0" }}>
          <Box
            style={{
              display: "inline-flex",
              background: fill,
              borderRadius: 8,
              padding: "7px 12px",
            }}
          >
            <Text textStyle="t4Regular" style={{ color: fgMuted }}>
              취미/오락
            </Text>
          </Box>
        </Box>

        {/* 게시글·일정·관심 통계 */}
        <Box style={{ display: "flex", alignItems: "center", gap: 8, padding: "14px 20px 22px" }}>
          {STATS.map((s, i) => (
            <Box key={s.label} style={{ display: "flex", alignItems: "center", gap: 8 }}>
              {i > 0 && (
                <Text textStyle="t3Regular" style={{ color: fgMuted }}>
                  ·
                </Text>
              )}
              <Text textStyle="t4Regular" style={{ color: fgMuted }}>
                {s.label} {s.value}
              </Text>
            </Box>
          ))}
        </Box>

        <Box style={{ height: 8, background: fill }} />

        {/* 자주 모이는 장소 */}
        <Box style={{ padding: "24px 20px 0" }}>
          <Text textStyle="t6Bold" style={{ color: fg, display: "block", marginBottom: 16 }}>
            자주 모이는 장소
          </Text>
          <Box
            style={{
              border: `1px solid ${stroke}`,
              borderRadius: 14,
              overflow: "hidden",
            }}
          >
            <FauxMap />
            <Box style={{ padding: "14px 16px" }}>
              <Text textStyle="t5Bold" style={{ color: fg, display: "block" }}>
                투썸플레이스 강동역점
              </Text>
              <Text textStyle="t4Regular" style={{ color: fgMuted, display: "block", marginTop: 4 }}>
                735m · 강동구 천호동 · 후기 24
              </Text>
            </Box>
          </Box>
        </Box>

        {/* 일정 후기 */}
        <Box style={{ padding: "32px 0 24px" }}>
          <Box
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "0 20px 16px",
            }}
          >
            <Text textStyle="t6Bold" style={{ color: fg }}>
              일정 후기
            </Text>
            <Box
              as="button"
              onClick={() => setReviewsOpen(true)}
              style={{ ...textLinkStyle, display: "flex", alignItems: "center", gap: 2 }}
            >
              <Text textStyle="t4Regular" style={{ color: fgMuted }}>
                더보기
              </Text>
              <FixedIcon svg={<ChevronRightIcon />} size={16} color={fgMuted} />
            </Box>
          </Box>
          <Box
            className="no-scrollbar"
            style={{ display: "flex", gap: 12, padding: "0 20px", overflowX: "auto" }}
          >
            {REVIEWS.map((r, i) => (
              <ReviewCard key={i} review={r} onClick={() => setReviewsOpen(true)} />
            ))}
          </Box>
        </Box>

        <Box style={{ height: 8, background: fill }} />

        {/* 모임장 소개 */}
        <Box style={{ padding: "24px 20px 0" }}>
          <Text textStyle="t6Bold" style={{ color: fg, display: "block", marginBottom: 18 }}>
            모임장 소개
          </Text>

          {/* 모임장 프로필 */}
          <Box
            as="button"
            onClick={() => setJoinNoticeOpen(true)}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              width: "100%",
              border: "none",
              background: "transparent",
              cursor: "pointer",
              padding: 0,
              textAlign: "left",
            }}
          >
            <Photo w={52} h={52} circle />
            <Box style={{ flex: 1, minWidth: 0 }}>
              <Box style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <Text textStyle="t5Bold" style={{ color: fg }}>
                  오리
                </Text>
                <MannerTemp value="43.5" />
              </Box>
              <Box style={{ display: "flex", alignItems: "center", gap: 5, marginTop: 5 }}>
                <Text textStyle="t3Regular" style={{ flexShrink: 0 }}>
                  🔥
                </Text>
                <Text textStyle="t4Regular" style={{ color: fgMuted }}>
                  2년 이상 모임 운영
                </Text>
              </Box>
            </Box>
          </Box>

          {/* 모임장 활동 카드 */}
          <Box
            style={{
              border: `1px solid ${stroke}`,
              borderRadius: 14,
              marginTop: 16,
              overflow: "hidden",
            }}
          >
            <Box style={{ display: "flex", padding: "18px 0" }}>
              {HOST_STATS.map((s, i) => (
                <Box
                  key={s.label}
                  style={{
                    flex: 1,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: 7,
                    borderLeft: i > 0 ? `1px solid ${stroke}` : "none",
                  }}
                >
                  <Text textStyle="t3Regular" style={{ color: fgMuted }}>
                    {s.label}
                  </Text>
                  <Text textStyle="t5Bold" style={{ color: fg }}>
                    {s.value}
                  </Text>
                </Box>
              ))}
            </Box>
            <Box style={{ height: 1, background: stroke }} />
            <Box
              as="button"
              onClick={() => setJoinNoticeOpen(true)}
              style={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                gap: 12,
                padding: 16,
                background: layer,
                border: "none",
                cursor: "pointer",
                textAlign: "left",
              }}
            >
              <Text textStyle="t4Regular" style={{ color: fg, flex: 1, lineHeight: 1.5 }}>
                <Text as="span" textStyle="t4Bold" style={{ color: fg }}>
                  받은 후기 217
                </Text>
                {"  "}59명의 멤버에게 '🧡 또 만나고 싶어요' 평가를 받았어요.
              </Text>
              <FixedIcon svg={<ChevronRightIcon />} size={18} color={fgMuted} />
            </Box>
          </Box>

          {/* 인증 / 지역 */}
          <Box style={{ display: "flex", flexDirection: "column", gap: 14, paddingTop: 20 }}>
            <Box style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <FixedIcon svg={<CheckCircleIcon />} size={20} color="#15b06e" />
              <Text textStyle="t4Regular" style={{ color: fg }}>
                본인인증, 나이대 공개 완료
              </Text>
            </Box>
            <Box style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <FixedIcon svg={<PinIcon />} size={20} color={fgMuted} />
              <Text textStyle="t4Regular" style={{ color: fg }}>
                천호제3동
              </Text>
            </Box>
          </Box>
        </Box>

        {/* 관심 모임 알림 배너 */}
        <Box style={{ padding: "24px 20px 0" }}>
          <Box
            style={{
              display: "flex",
              alignItems: "center",
              gap: 14,
              background: fill,
              borderRadius: 12,
              padding: "16px 18px",
            }}
          >
            <Text textStyle="t4Regular" style={{ color: fg, flex: 1, lineHeight: 1.5 }}>
              <Text as="span" textStyle="t4Bold" style={{ color: fg }}>
                성이님이 관심 있을만한 모임
              </Text>
              이 생기면 알려드릴까요?
            </Text>
            <Box
              as="button"
              style={{
                display: "flex",
                alignItems: "center",
                gap: 5,
                border: `1px solid ${stroke}`,
                background: layer,
                borderRadius: 999,
                padding: "8px 14px",
                cursor: "pointer",
                flexShrink: 0,
              }}
            >
              <FixedIcon svg={<BellIcon />} size={16} color={fg} />
              <Text textStyle="t3Bold" style={{ color: fg }}>
                알림 받기
              </Text>
            </Box>
          </Box>
        </Box>

        {/* 멤버 */}
        <Box style={{ padding: "32px 20px 12px" }}>
          <Text textStyle="t6Bold" style={{ color: fg }}>
            멤버 115
          </Text>
        </Box>
        {MEMBERS.map((m, i) => (
          <Box
            key={i}
            style={{ display: "flex", alignItems: "center", gap: 12, padding: "8px 20px" }}
          >
            <Photo w={44} h={44} circle />
            <Box style={{ flex: 1, minWidth: 0 }}>
              <Box style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <Text textStyle="t4Bold" style={{ color: fg }}>
                  {m.name}
                </Text>
                <Text textStyle="t3Regular" style={{ color: fgMuted }}>
                  {m.region}
                </Text>
              </Box>
              {m.desc && (
                <Text textStyle="t3Regular" style={{ color: fgMuted, display: "block", marginTop: 3 }}>
                  {m.desc}
                </Text>
              )}
            </Box>
          </Box>
        ))}
        <MoreButton onClick={() => setJoinNoticeOpen(true)} />

        <Box style={{ height: 8, background: fill, marginTop: 24 }} />

        {/* 일정 */}
        <Box style={{ padding: "24px 0 20px" }}>
          <SectionHeader title="일정 153" onMore={() => setSchedulesOpen(true)} />
          {SCHEDULES.map((s, i) => (
            <ScheduleRow key={i} item={s} />
          ))}
        </Box>

        <Box style={{ height: 8, background: fill }} />

        {/* 챌린지 */}
        <Box style={{ padding: "24px 0 20px" }}>
          <SectionHeader title="챌린지 32" onMore={() => setChallengesOpen(true)} />
          {CHALLENGES.map((c, i) => (
            <ChallengeRow key={i} item={c} />
          ))}
        </Box>

        <Box style={{ height: 8, background: fill }} />

        {/* 게시글 */}
        <Box style={{ padding: "24px 0 0" }}>
          <Box style={{ padding: "0 20px 14px" }}>
            <Box as="button" onClick={() => setPostsOpen(true)} style={textLinkStyle}>
              <Text textStyle="t6Bold" style={{ color: fg }}>
                게시글 2187
              </Text>
            </Box>
          </Box>
          {/* 게시판 탭 */}
          <Box
            className="no-scrollbar"
            style={{ display: "flex", gap: 8, padding: "0 20px 6px", overflowX: "auto" }}
          >
            {POST_TABS.map((t) => {
              const on = t === postTab;
              return (
                <Box
                  as="button"
                  key={t}
                  onClick={() => setPostTab(t)}
                  style={{
                    flexShrink: 0,
                    border: on ? "none" : `1px solid ${stroke}`,
                    background: on ? fg : layer,
                    color: on ? "var(--seed-color-fg-neutral-inverted)" : fg,
                    borderRadius: 999,
                    padding: "8px 14px",
                    cursor: "pointer",
                  }}
                >
                  <Text textStyle="t4Bold" style={{ color: "inherit", whiteSpace: "nowrap" }}>
                    {t}
                  </Text>
                </Box>
              );
            })}
          </Box>
        </Box>
        {(() => {
          const visible =
            postTab === "전체" ? POSTS : POSTS.filter((p) => p.board === postTab);
          if (visible.length === 0) {
            return (
              <Box style={{ padding: "56px 20px", textAlign: "center" }}>
                <Text textStyle="t5Regular" style={{ color: fgMuted }}>
                  아직 게시글이 없어요.
                </Text>
              </Box>
            );
          }
          return visible.map((p, i) => <PostCard key={i} post={p} />);
        })()}
        <MoreButton onClick={() => setPostsOpen(true)} />

        <Box style={{ height: 8, background: fill, marginTop: 24 }} />

        {/* 이런 모임도 추천해요 */}
        <Box style={{ padding: "24px 0 0" }}>
          <Box style={{ padding: "0 20px 8px" }}>
            <Text textStyle="t6Bold" style={{ color: fg }}>
              이런 모임도 추천해요
            </Text>
          </Box>
          {RECOMMEND_MEETUPS.map((m, i) => (
            <RecommendRow key={i} item={m} />
          ))}
          <MoreButton />
        </Box>

        <Box style={{ height: 8, background: fill, marginTop: 24 }} />

        {/* 이런 온라인 카페도 추천해요 */}
        <Box style={{ padding: "24px 0 0" }}>
          <Box style={{ padding: "0 20px 14px" }}>
            <Text textStyle="t6Bold" style={{ color: fg }}>
              이런 온라인 카페도 추천해요
            </Text>
          </Box>
          <Box
            className="no-scrollbar"
            style={{ display: "flex", gap: 12, padding: "0 20px", overflowX: "auto" }}
          >
            {ONLINE_CAFES.map((c, i) => (
              <CafeCard key={i} item={c} />
            ))}
          </Box>
          <Box style={{ paddingTop: 16 }}>
            <MoreButton />
          </Box>
        </Box>

        <Box style={{ height: 8, background: fill, marginTop: 24 }} />

        {/* 직접 만들기 안내 */}
        <Box
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 6,
            padding: "32px 20px 36px",
          }}
        >
          <Text textStyle="t6Bold" style={{ color: fg }}>
            마음에 드는 모임이 없나요?
          </Text>
          <Text textStyle="t4Regular" style={{ color: fgMuted }}>
            모임을 직접 만들어 보세요.
          </Text>
          <Box
            as="button"
            style={{
              marginTop: 12,
              border: `1px solid ${stroke}`,
              background: layer,
              borderRadius: 10,
              padding: "12px 22px",
              cursor: "pointer",
            }}
          >
            <Text textStyle="t5Bold" style={{ color: fg }}>
              모임 만들기
            </Text>
          </Box>
        </Box>
      </Box>

      {/* 하단 고정 가입 바 */}
      <Box style={{ flexShrink: 0, background: layer }}>
        <Box
          style={{
            textAlign: "center",
            padding: "12px 20px",
            borderTop: `1px solid ${stroke}`,
          }}
        >
          <Text textStyle="t4Regular" style={{ color: fgSubtle }}>
            최근 30일간{" "}
            <Text as="span" textStyle="t4Bold" style={{ color: fg }}>
              8명
            </Text>
            이 가입했어요
          </Text>
        </Box>
        <Box
          style={{
            display: "flex",
            alignItems: "center",
            gap: 14,
            padding: "8px 20px 22px",
          }}
        >
          <Box
            as="button"
            style={{
              width: 40,
              height: 40,
              border: "none",
              background: "transparent",
              cursor: "pointer",
              padding: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
              color: fgMuted,
            }}
          >
            <FixedIcon svg={<HeartIcon />} size={28} color={fgMuted} />
          </Box>
          <Box
            as="button"
            style={{
              flex: 1,
              border: "none",
              background: brand,
              borderRadius: 12,
              padding: "15px 0",
              cursor: "pointer",
              color: "var(--seed-color-palette-static-white)",
            }}
          >
            <Text textStyle="t5Bold" style={{ color: "var(--seed-color-palette-static-white)" }}>
              모임 가입하기
            </Text>
          </Box>
        </Box>
      </Box>

      {/* 일정 전체보기 */}
      {schedulesOpen && <ScheduleFeed onBack={() => setSchedulesOpen(false)} />}

      {/* 챌린지 전체보기 */}
      {challengesOpen && <ChallengeFeed onBack={() => setChallengesOpen(false)} />}

      {/* 게시글 전체보기 */}
      {postsOpen && <PostFeed onBack={() => setPostsOpen(false)} />}

      {/* 일정 후기 전체보기 */}
      {reviewsOpen && <ScheduleReviewFeed onBack={() => setReviewsOpen(false)} />}

      {/* 가입 안내 다이얼로그 */}
      {joinNoticeOpen && <JoinNoticeDialog onClose={() => setJoinNoticeOpen(false)} />}
    </Box>
  );
}

/* 가입 안내 다이얼로그 (가입 전에는 프로필/멤버를 볼 수 없음을 알림) */
function JoinNoticeDialog({ onClose }: { onClose: () => void }) {
  return (
    <Box
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 60,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 40,
        background: "rgba(0,0,0,0.45)",
      }}
    >
      <Box
        onClick={(e: React.MouseEvent) => e.stopPropagation()}
        style={{
          width: "100%",
          maxWidth: 300,
          background: layer,
          borderRadius: 14,
          padding: "24px 20px 16px",
          boxShadow: "0 8px 28px rgba(0,0,0,0.22)",
        }}
      >
        <Text textStyle="t6Bold" style={{ color: fg, display: "block", textAlign: "center" }}>
          모임 가입 안내
        </Text>
        <Text
          textStyle="t4Regular"
          style={{
            color: fgMuted,
            display: "block",
            textAlign: "center",
            marginTop: 10,
            lineHeight: 1.5,
          }}
        >
          모임에 가입해야 프로필을 볼 수 있어요.
        </Text>
        <Box
          as="button"
          onClick={onClose}
          style={{
            marginTop: 22,
            width: "100%",
            border: "none",
            background: fg,
            borderRadius: 10,
            padding: "13px 0",
            cursor: "pointer",
          }}
        >
          <Text textStyle="t5Bold" style={{ color: "var(--seed-color-fg-neutral-inverted)" }}>
            확인
          </Text>
        </Box>
      </Box>
    </Box>
  );
}

/* 매너온도 배지 (숫자 + 작은 게이지) */
function MannerTemp({ value }: { value: string }) {
  const color = "#f5961e";
  return (
    <Box style={{ display: "flex", flexDirection: "column", gap: 3, paddingTop: 1 }}>
      <Text textStyle="t2Bold" style={{ color }}>
        {value}°C
      </Text>
      <Box style={{ width: 38, height: 4, borderRadius: 999, background: "#ffe6c7", overflow: "hidden" }}>
        <Box style={{ width: "64%", height: "100%", background: color }} />
      </Box>
    </Box>
  );
}

/* 일정 후기 카드 (사진 + 좋아요/댓글 + 작성자) */
function ReviewCard({
  review,
  onClick,
}: {
  review: { hue: number; likes: number; comments?: number; author: string };
  onClick?: () => void;
}) {
  return (
    <Box
      as="button"
      onClick={onClick}
      style={{
        width: 132,
        flexShrink: 0,
        border: "none",
        background: "transparent",
        padding: 0,
        cursor: "pointer",
        textAlign: "left",
      }}
    >
      <Box style={{ position: "relative" }}>
        <Photo w={132} h={132} radius={14} />
        {/* 좋아요/댓글 배지 */}
        <Box
          style={{
            position: "absolute",
            left: 8,
            bottom: 8,
            display: "flex",
            alignItems: "center",
            gap: 8,
            background: "rgba(0,0,0,0.5)",
            borderRadius: 999,
            padding: "4px 10px",
            color: "var(--seed-color-palette-static-white)",
          }}
        >
          <Box style={{ display: "flex", alignItems: "center", gap: 3 }}>
            <FixedIcon svg={<ThumbsUpIcon />} size={13} color="var(--seed-color-palette-static-white)" />
            <Text textStyle="t2Bold" style={{ color: "var(--seed-color-palette-static-white)" }}>
              {review.likes}
            </Text>
          </Box>
          {review.comments != null && (
            <Box style={{ display: "flex", alignItems: "center", gap: 3 }}>
              <FixedIcon svg={<ChatIcon />} size={13} color="var(--seed-color-palette-static-white)" />
              <Text textStyle="t2Bold" style={{ color: "var(--seed-color-palette-static-white)" }}>
                {review.comments}
              </Text>
            </Box>
          )}
        </Box>
      </Box>
      {/* 작성자 */}
      <Box style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 8 }}>
        <Box
          style={{
            width: 22,
            height: 22,
            borderRadius: "50%",
            background: fill,
            flexShrink: 0,
          }}
        />
        <Text textStyle="t3Regular" maxLines={1} style={{ color: fgMuted }}>
          {review.author}
        </Text>
      </Box>
    </Box>
  );
}

/* 일정 행 (날짜 칩 + 제목 + 시간/인원 + 상태) */
function ScheduleRow({
  item,
}: {
  item: { month: string; day: string; title: string; locked?: boolean; time: string; people: string };
}) {
  return (
    <Box style={{ display: "flex", gap: 14, padding: "10px 20px", alignItems: "flex-start" }}>
      <Box
        style={{
          width: 46,
          borderRadius: 8,
          background: fill,
          padding: "7px 0",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          flexShrink: 0,
        }}
      >
        <Text textStyle="t1Regular" style={{ color: fgMuted }}>
          {item.month}
        </Text>
        <Text textStyle="t6Bold" style={{ color: fg }}>
          {item.day}
        </Text>
      </Box>
      <Box style={{ flex: 1, minWidth: 0, paddingTop: 2 }}>
        <Box style={{ display: "flex", alignItems: "center", gap: 6 }}>
          {item.locked && <FixedIcon svg={<LockIcon />} size={15} color={fgMuted} />}
          <Text textStyle="t5Regular" maxLines={1} style={{ color: item.locked ? fgMuted : fg }}>
            {item.title}
          </Text>
        </Box>
        <Box style={{ display: "flex", alignItems: "center", gap: 12, marginTop: 8 }}>
          <Box style={{ display: "flex", alignItems: "center", gap: 4 }}>
            <FixedIcon svg={<ClockIcon />} size={15} color={fgMuted} />
            <Text textStyle="t3Regular" style={{ color: fgMuted }}>
              {item.time}
            </Text>
          </Box>
          <Box style={{ display: "flex", alignItems: "center", gap: 4 }}>
            <FixedIcon svg={<PeopleIcon />} size={15} color={fgMuted} />
            <Text textStyle="t3Regular" style={{ color: fgMuted }}>
              {item.people}
            </Text>
          </Box>
        </Box>
        <Box style={{ display: "inline-flex", marginTop: 8, background: fill, borderRadius: 6, padding: "3px 9px" }}>
          <Text textStyle="t2Regular" style={{ color: fgMuted }}>
            종료
          </Text>
        </Box>
      </Box>
    </Box>
  );
}

/* 챌린지 행 */
function ChallengeRow({
  item,
}: {
  item: { title: string; status: string; ongoing?: boolean; period: string; people: string };
}) {
  return (
    <Box style={{ padding: "12px 20px" }}>
      <Text textStyle="t5Bold" style={{ color: fg, display: "block" }}>
        {item.title}
      </Text>
      <Box style={{ display: "flex", alignItems: "center", gap: 5, marginTop: 6 }}>
        <Text textStyle="t4Bold" style={{ color: item.ongoing ? brand : fgMuted }}>
          {item.status}
        </Text>
        <Text textStyle="t4Regular" style={{ color: fgMuted }}>
          · {item.period}
        </Text>
      </Box>
      <Box style={{ display: "flex", alignItems: "center", gap: 4, marginTop: 8 }}>
        <FixedIcon svg={<PeopleIcon />} size={15} color={fgMuted} />
        <Text textStyle="t3Regular" style={{ color: fgMuted }}>
          {item.people}
        </Text>
      </Box>
    </Box>
  );
}

/* 게시글 카드 */
function PostCard({ post }: { post: Post }) {
  return (
    <Box style={{ padding: "16px 20px", borderTop: `1px solid ${stroke}` }}>
      {/* 작성자 */}
      <Box style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <Photo w={36} h={36} circle />
        <Box style={{ flex: 1, minWidth: 0 }}>
          <Box style={{ display: "flex", alignItems: "center", gap: 4 }}>
            <Text textStyle="t4Bold" style={{ color: fg }}>
              {post.author}
            </Text>
            {post.verified && <FixedIcon svg={<CheckCircleIcon />} size={15} color={fgInformative} />}
          </Box>
          <Text textStyle="t2Regular" style={{ color: fgMuted, display: "block", marginTop: 1 }}>
            {post.time} · {post.board}
          </Text>
        </Box>
        <FixedIcon svg={<MoreIcon />} size={18} color={fgMuted} />
      </Box>

      {/* 본문 */}
      {post.locked ? (
        <Box style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 14 }}>
          <FixedIcon svg={<LockIcon />} size={15} color={fgMuted} />
          <Text textStyle="t5Regular" style={{ color: fgMuted }}>
            모임에만 공개된 게시글이에요.
          </Text>
        </Box>
      ) : (
        <Box style={{ marginTop: 12 }}>
          <Text textStyle="t5Regular" style={{ color: fg, lineHeight: 1.6 }}>
            {post.lines?.map((l, j) => (
              <span key={j}>
                {l}
                {j < (post.lines?.length ?? 0) - 1 && <br />}
              </span>
            ))}
          </Text>
          {post.truncate && (
            <Text textStyle="t5Regular" style={{ color: fgMuted, display: "block", marginTop: 2 }}>
              ...더보기
            </Text>
          )}
        </Box>
      )}

      {post.photo && <Photo w="100%" h={230} radius={12} style={{ marginTop: 12 }} />}

      {post.challenge && (
        <Box
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            border: `1px solid ${stroke}`,
            borderRadius: 12,
            padding: "12px 14px",
            marginTop: 12,
          }}
        >
          <Box
            style={{
              width: 34,
              height: 34,
              borderRadius: "50%",
              background: "#fff0e6",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}
          >
            <FixedIcon svg={<FireIcon />} size={18} color={brand} />
          </Box>
          <Box style={{ flex: 1, minWidth: 0 }}>
            <Text textStyle="t4Bold" maxLines={1} style={{ color: fg, display: "block" }}>
              {post.challenge.title}
            </Text>
            <Text textStyle="t3Regular" style={{ color: fgMuted, display: "block", marginTop: 2 }}>
              {post.challenge.sub}
            </Text>
          </Box>
          <FixedIcon svg={<ChevronRightIcon />} size={18} color={fgMuted} />
        </Box>
      )}

      {/* 반응 */}
      <Box style={{ display: "flex", alignItems: "center", gap: 16, marginTop: 14 }}>
        <Box style={{ display: "flex", alignItems: "center", gap: 5 }}>
          <FixedIcon svg={<ThumbsUpIcon />} size={17} color={fgMuted} />
          <Text textStyle="t3Regular" style={{ color: fgMuted }}>
            {post.likes}
          </Text>
        </Box>
        <Box style={{ display: "flex", alignItems: "center", gap: 5 }}>
          <FixedIcon svg={<ChatIcon />} size={17} color={fgMuted} />
          <Text textStyle="t3Regular" style={{ color: fgMuted }}>
            {post.comments}
          </Text>
        </Box>
        <FixedIcon svg={<ShareIcon />} size={17} color={fgMuted} />
        <Box style={{ flex: 1 }} />
        <Text textStyle="t3Regular" style={{ color: fgMuted }}>
          조회 {post.views}
        </Text>
      </Box>
    </Box>
  );
}

/* 추천 모임 행 */
function RecommendRow({
  item,
}: {
  item: { title: string; desc: string; region: string; count: string; active?: string };
}) {
  return (
    <Box style={{ display: "flex", gap: 14, padding: "12px 20px" }}>
      <Photo w={64} h={64} radius={14} />
      <Box
        style={{
          flex: 1,
          minWidth: 0,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          gap: 4,
        }}
      >
        <Text textStyle="t5Bold" maxLines={1} style={{ color: fg }}>
          {item.title}
        </Text>
        <Text textStyle="t4Regular" maxLines={1} style={{ color: fgSubtle }}>
          {item.desc}
        </Text>
        <Box style={{ display: "flex", alignItems: "center", gap: 3, marginTop: 2, minWidth: 0 }}>
          <FixedIcon svg={<PinIcon />} size={14} color={fgMuted} />
          <Text textStyle="t3Regular" style={{ color: fgMuted }}>
            {item.region}
          </Text>
          <Text textStyle="t3Regular" style={{ color: fgMuted }}>
            ·
          </Text>
          <FixedIcon svg={<PeopleIcon />} size={14} color={fgMuted} />
          <Text textStyle="t3Regular" style={{ color: fgMuted }}>
            {item.count}
          </Text>
          {item.active && (
            <>
              <Text textStyle="t3Regular" style={{ color: fgMuted }}>
                ·
              </Text>
              <Text textStyle="t3Regular" style={{ color: fgInformative }}>
                {item.active}
              </Text>
            </>
          )}
        </Box>
      </Box>
    </Box>
  );
}

/* 추천 온라인 카페 카드 */
function CafeCard({ item }: { item: { title: string; count: string } }) {
  return (
    <Box style={{ width: 116, flexShrink: 0 }}>
      <Photo w={116} h={116} radius={14} />
      <Text
        textStyle="t4Regular"
        maxLines={2}
        style={{ color: fg, display: "block", marginTop: 8, lineHeight: 1.35 }}
      >
        {item.title}
      </Text>
      <Box style={{ display: "flex", alignItems: "center", gap: 3, marginTop: 5 }}>
        <FixedIcon svg={<PeopleIcon />} size={13} color={fgMuted} />
        <Text textStyle="t2Regular" style={{ color: fgMuted }}>
          {item.count}
        </Text>
      </Box>
    </Box>
  );
}

/* 자주 모이는 장소 — 오프라인에서도 렌더되는 CSS 가짜 지도 */
function FauxMap() {
  return (
    <Box style={{ position: "relative", height: 150, background: "#e8ede8", overflow: "hidden" }}>
      {/* 도로 */}
      <Box style={{ position: "absolute", left: 0, right: 0, top: 84, height: 14, background: "#cfd6e4", transform: "rotate(-6deg)" }} />
      <Box style={{ position: "absolute", left: 0, right: 0, top: 88, height: 4, background: "#a9b4ca", transform: "rotate(-6deg)" }} />
      <Box style={{ position: "absolute", left: "26%", top: 0, bottom: 0, width: 8, background: "#dfe4dc", transform: "rotate(8deg)" }} />
      <Box style={{ position: "absolute", left: "64%", top: 0, bottom: 0, width: 6, background: "#dfe4dc" }} />
      {/* 블록 */}
      <Box style={{ position: "absolute", left: 18, top: 18, width: 40, height: 26, background: "#dde3da", borderRadius: 3 }} />
      <Box style={{ position: "absolute", right: 28, top: 22, width: 34, height: 22, background: "#dde3da", borderRadius: 3 }} />
      <Box style={{ position: "absolute", right: 40, bottom: 20, width: 30, height: 24, background: "#dde3da", borderRadius: 3 }} />
      {/* 중심 핀 */}
      <Box
        style={{
          position: "absolute",
          left: "50%",
          top: "44%",
          transform: "translate(-50%, -100%)",
          width: 34,
          height: 34,
          color: brand,
        }}
      >
        <Icon svg={<PinFilledIcon />} />
      </Box>
    </Box>
  );
}

/* "이 달의 우수 모임" 육각형 메달 배지 (장식용) */
function ExcellentBadge() {
  return (
    <Box
      style={{
        width: 52,
        height: 52,
        flexShrink: 0,
        clipPath: "polygon(50% 0%, 93% 25%, 93% 75%, 50% 100%, 7% 75%, 7% 25%)",
        background: "linear-gradient(160deg, #ff9d57, #f06a1e)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        boxShadow: "0 2px 6px rgba(240,106,30,0.4)",
      }}
    >
      <FixedIcon svg={<LeafIcon />} size={24} color="var(--seed-color-palette-static-white)" />
    </Box>
  );
}

/* 앨범보기 배지용 작은 사진 글리프 */
function AlbumGlyph() {
  return (
    <svg
      viewBox="0 0 24 24"
      width="100%"
      height="100%"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{ display: "block" }}
    >
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <circle cx="8.5" cy="10" r="1.4" />
      <path d="m4 18 5-5 4 4 3-3 4 4" />
    </svg>
  );
}
