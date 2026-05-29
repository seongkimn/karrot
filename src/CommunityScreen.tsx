import { useState } from "react";
import {
  Badge,
  Box,
  Chip,
  Icon,
  NotificationBadge,
  Text,
} from "@seed-design/react";
import {
  ArrowUpRightIcon,
  BellIcon,
  CalendarIcon,
  ChatIcon,
  ChevronDownIcon,
  CommunityIcon,
  FireIcon,
  HomeIcon,
  MapIcon,
  MenuIcon,
  MoreIcon,
  PeopleIcon,
  PersonIcon,
  PinIcon,
  PlusIcon,
  SearchIcon,
  ThumbsUpIcon,
  VoteIcon,
} from "./icons";

/* ------------------------------------------------------------------ */
/* 데이터                                                              */
/* ------------------------------------------------------------------ */

const sectionTabs = ["동네생활", "모임", "카페", "아파트"];

const filters = [
  { label: "추천", suffix: <ChevronDownIcon />, active: true },
  { label: "인기", prefix: <FireIcon />, prefixColor: "#ff5b39" },
  { label: "투표", prefix: <VoteIcon />, prefixColor: "#4d7df0" },
  { label: "생활정보" },
  { label: "맛집/음식" },
];

type Post = {
  category: string;
  group?: { emoji?: string; name: string };
  title: string;
  body?: string;
  schedule?: string;
  place?: { name: string; desc: string };
  meta: string;
  thumb?: { emoji: string; bg: string };
  stats: { type: "members" | "reactions"; values: string[] };
};

const posts: Post[] = [
  {
    category: "모임 일정",
    group: { emoji: "🌻", name: "2030하남강동송…" },
    title: "미사 맥주벙",
    schedule: "5월 29일 금요일, 오후 8:00",
    meta: "미사1동 · 3시간 전 · 조회 32",
    stats: { type: "members", values: ["4/4명"] },
  },
  {
    category: "생활/편의",
    title: "이런 구청장 후보가 당선될지?",
    body: "강동역도 요즘 선거유세로 난리가 아니다. 그래도 다행인 건 주…",
    meta: "천호제3동 · 8시간 전 · 조회 401",
    stats: { type: "reactions", values: ["6", "7"] },
  },
  {
    category: "분실/실종",
    title: "신한카드 발견*천호공원",
    place: { name: "천호공원 관리사무소", desc: "공원에서 오전에 …" },
    thumb: { emoji: "💳", bg: "#8ec5e8" },
    meta: "천호동 · 8시간 전 · 조회 121",
    stats: { type: "reactions", values: ["2"] },
  },
  {
    category: "모임 일정",
    group: { name: "[어썸골프] 강동하…" },
    title: "심심하면 오세요",
    schedule: "5월 29일 금요일, 오후 7:30",
    thumb: { emoji: "⛳", bg: "#2f6b4f" },
    meta: "",
    stats: { type: "reactions", values: [] },
  },
];

const bottomNav = [
  { label: "홈", icon: <HomeIcon /> },
  { label: "커뮤니티", icon: <CommunityIcon />, active: true },
  { label: "동네지도", icon: <MapIcon /> },
  { label: "채팅", icon: <ChatIcon />, badge: "5" },
  { label: "나의 당근", icon: <PersonIcon /> },
];

/* ------------------------------------------------------------------ */
/* 토큰 헬퍼                                                            */
/* ------------------------------------------------------------------ */

const fg = "var(--seed-color-fg-neutral)";
const fgSubtle = "var(--seed-color-fg-neutral-subtle)";
const fgMuted = "var(--seed-color-fg-neutral-muted)";
const layer = "var(--seed-color-bg-layer-default)";
const stroke = "var(--seed-color-stroke-neutral-subtle)";

/* ------------------------------------------------------------------ */
/* 화면                                                                */
/* ------------------------------------------------------------------ */

export default function CommunityScreen() {
  const [activeTab, setActiveTab] = useState("동네생활");

  return (
    <Box
      style={{
        width: "100%",
        maxWidth: 420,
        minHeight: "100dvh",
        margin: "0 auto",
        background: layer,
        position: "relative",
        display: "flex",
        flexDirection: "column",
        boxShadow: "0 0 0 1px var(--seed-color-stroke-neutral-subtle)",
      }}
    >
      <StatusBar />
      <Header />
      <SectionTabs active={activeTab} onChange={setActiveTab} />
      <Filters />

      {/* 피드 */}
      <Box as="main" style={{ flex: 1, paddingBottom: 96 }}>
        {posts.map((post, i) => (
          <Box key={i}>
            <PostCard post={post} />
            {i < posts.length - 1 && (
              <Box
                style={{ height: 1, background: stroke, margin: "0 20px" }}
              />
            )}
          </Box>
        ))}
      </Box>

      <Fab />
      <BottomNav />
    </Box>
  );
}

/* ------------------------------------------------------------------ */
/* 상단 상태바                                                          */
/* ------------------------------------------------------------------ */

function StatusBar() {
  return (
    <Box
      style={{
        height: 44,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 24px",
      }}
    >
      <Text textStyle="t5Bold" style={{ color: fg }}>
        4:33
      </Text>
      <Text textStyle="t3Regular" style={{ color: fg, letterSpacing: 1 }}>
        🔕 📶 60
      </Text>
    </Box>
  );
}

/* ------------------------------------------------------------------ */
/* 헤더                                                                */
/* ------------------------------------------------------------------ */

function IconButton({
  svg,
  badge,
}: {
  svg: React.ReactNode;
  badge?: boolean;
}) {
  return (
    <Box
      as="button"
      style={{
        position: "relative",
        width: 28,
        height: 28,
        border: "none",
        background: "transparent",
        cursor: "pointer",
        padding: 0,
        color: fg,
      }}
    >
      <Icon svg={svg} />
      {badge && (
        <Box
          style={{
            position: "absolute",
            top: 0,
            right: 1,
            width: 8,
            height: 8,
            borderRadius: 999,
            background: "var(--seed-color-bg-brand-solid)",
          }}
        />
      )}
    </Box>
  );
}

function Header() {
  return (
    <Box
      as="header"
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "8px 20px 12px",
      }}
    >
      <Text as="h1" textStyle="t8Bold" style={{ color: fg }}>
        커뮤니티
      </Text>
      <Box style={{ display: "flex", alignItems: "center", gap: 18 }}>
        <IconButton svg={<SearchIcon />} />
        <IconButton svg={<BellIcon />} badge />
        <IconButton svg={<MenuIcon />} />
      </Box>
    </Box>
  );
}

/* ------------------------------------------------------------------ */
/* 섹션 탭                                                              */
/* ------------------------------------------------------------------ */

function SectionTabs({
  active,
  onChange,
}: {
  active: string;
  onChange: (t: string) => void;
}) {
  return (
    <Box
      style={{
        display: "flex",
        alignItems: "center",
        gap: 18,
        padding: "4px 20px 14px",
      }}
    >
      {sectionTabs.map((tab) => {
        const isActive = tab === active;
        const isApart = tab === "아파트";
        return (
          <Box
            as="button"
            key={tab}
            onClick={() => onChange(tab)}
            style={{
              border: "none",
              background: "transparent",
              cursor: "pointer",
              padding: 0,
              display: "flex",
              alignItems: "center",
              gap: 2,
            }}
          >
            <Text
              textStyle={isActive ? "t7Bold" : "t7Regular"}
              style={{ color: isActive ? fg : fgMuted }}
            >
              {tab}
            </Text>
            {isApart && (
              <Box style={{ width: 16, height: 16, color: fgMuted }}>
                <Icon svg={<ArrowUpRightIcon />} />
              </Box>
            )}
          </Box>
        );
      })}
    </Box>
  );
}

/* ------------------------------------------------------------------ */
/* 필터 칩                                                              */
/* ------------------------------------------------------------------ */

function Filters() {
  return (
    <Box
      style={{
        display: "flex",
        gap: 8,
        padding: "0 20px 14px",
        overflowX: "auto",
      }}
    >
      {filters.map((f) => {
        if (f.active) {
          // Seed Chip의 solid variant는 `data-checked` 상태에서 어두운 배경 +
          // 반전(밝은) 텍스트로 자동 전환됩니다. 정적 화면이라 슬롯에 직접 부여합니다.
          return (
            <Chip.Root
              key={f.label}
              variant="solid"
              data-checked
              style={{ flexShrink: 0 }}
            >
              <Chip.Label data-checked>{f.label}</Chip.Label>
              {f.suffix && (
                <Chip.SuffixIcon data-checked>
                  <Box
                    style={{
                      width: 16,
                      height: 16,
                      color: "var(--seed-color-fg-neutral-inverted)",
                    }}
                  >
                    <Icon svg={f.suffix} />
                  </Box>
                </Chip.SuffixIcon>
              )}
            </Chip.Root>
          );
        }
        return (
          <Chip.Root
            key={f.label}
            variant="solid"
            style={{ flexShrink: 0 }}
          >
            {f.prefix && (
              <Chip.PrefixIcon>
                <Box style={{ width: 16, height: 16, color: f.prefixColor }}>
                  <Icon svg={f.prefix} />
                </Box>
              </Chip.PrefixIcon>
            )}
            <Chip.Label>{f.label}</Chip.Label>
          </Chip.Root>
        );
      })}
    </Box>
  );
}

/* ------------------------------------------------------------------ */
/* 피드 카드                                                            */
/* ------------------------------------------------------------------ */

function MetaIcon({ svg }: { svg: React.ReactNode }) {
  return (
    <Box style={{ width: 16, height: 16, color: fgMuted, flexShrink: 0 }}>
      <Icon svg={svg} />
    </Box>
  );
}

function PostCard({ post }: { post: Post }) {
  return (
    <Box style={{ display: "flex", gap: 12, padding: "18px 20px" }}>
      {/* 본문 */}
      <Box
        style={{
          flex: 1,
          minWidth: 0,
          display: "flex",
          flexDirection: "column",
          gap: 6,
        }}
      >
        {/* 카테고리 + 그룹 */}
        <Box style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <Badge tone="neutral" variant="weak">
            {post.category}
          </Badge>
          {post.group && (
            <Box
              style={{
                display: "flex",
                alignItems: "center",
                gap: 4,
                minWidth: 0,
              }}
            >
              {post.group.emoji && <Text textStyle="t3Regular">{post.group.emoji}</Text>}
              <Text
                textStyle="t3Regular"
                maxLines={1}
                style={{ color: fgSubtle }}
              >
                {post.group.name}
              </Text>
            </Box>
          )}
        </Box>

        {/* 제목 */}
        <Text textStyle="t6Bold" maxLines={1} style={{ color: fg }}>
          {post.title}
        </Text>

        {/* 일정 */}
        {post.schedule && (
          <Box style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <MetaIcon svg={<CalendarIcon />} />
            <Text textStyle="t4Regular" style={{ color: fgSubtle }}>
              {post.schedule}
            </Text>
          </Box>
        )}

        {/* 본문 미리보기 */}
        {post.body && (
          <Text textStyle="t4Regular" maxLines={1} style={{ color: fgSubtle }}>
            {post.body}
          </Text>
        )}

        {/* 장소 */}
        {post.place && (
          <Box style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <MetaIcon svg={<PinIcon />} />
            <Text textStyle="t4Regular" maxLines={1} style={{ color: fgSubtle }}>
              {post.place.name}
              <span style={{ color: fgMuted }}> ｜ {post.place.desc}</span>
            </Text>
          </Box>
        )}

        {/* 하단 메타 + 통계 */}
        <Box
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginTop: 4,
            gap: 8,
          }}
        >
          <Text textStyle="t2Regular" maxLines={1} style={{ color: fgMuted }}>
            {post.meta}
          </Text>
          <Stats stats={post.stats} />
        </Box>
      </Box>

      {/* 썸네일 / 더보기 */}
      <Box style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 8 }}>
        <Box as="button" style={{ border: "none", background: "transparent", cursor: "pointer", color: fgMuted, width: 20, height: 20, padding: 0 }}>
          <Icon svg={<MoreIcon />} />
        </Box>
        {post.thumb && (
          <Box
            style={{
              width: 96,
              height: 96,
              borderRadius: 8,
              background: post.thumb.bg,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 40,
            }}
          >
            {post.thumb.emoji}
          </Box>
        )}
      </Box>
    </Box>
  );
}

function Stats({ stats }: { stats: Post["stats"] }) {
  if (stats.values.length === 0) return null;

  if (stats.type === "members") {
    return (
      <Box style={{ display: "flex", alignItems: "center", gap: 4 }}>
        <MetaIcon svg={<PeopleIcon />} />
        <Text textStyle="t3Regular" style={{ color: fgMuted }}>
          {stats.values[0]}
        </Text>
      </Box>
    );
  }

  // reactions: [likes, comments?]
  return (
    <Box style={{ display: "flex", alignItems: "center", gap: 12 }}>
      <Box style={{ display: "flex", alignItems: "center", gap: 4 }}>
        <MetaIcon svg={<ThumbsUpIcon />} />
        <Text textStyle="t3Regular" style={{ color: fgMuted }}>
          {stats.values[0]}
        </Text>
      </Box>
      {stats.values[1] && (
        <Box style={{ display: "flex", alignItems: "center", gap: 4 }}>
          <MetaIcon svg={<ChatIcon />} />
          <Text textStyle="t3Regular" style={{ color: fgMuted }}>
            {stats.values[1]}
          </Text>
        </Box>
      )}
    </Box>
  );
}

/* ------------------------------------------------------------------ */
/* 글쓰기 FAB                                                           */
/* ------------------------------------------------------------------ */

function Fab() {
  return (
    <Box
      as="button"
      style={{
        position: "absolute",
        right: 16,
        bottom: 84,
        display: "flex",
        alignItems: "center",
        gap: 4,
        padding: "12px 18px 12px 14px",
        borderRadius: 999,
        border: "none",
        cursor: "pointer",
        background: "var(--seed-color-bg-brand-solid)",
        color: "var(--seed-color-palette-static-white)",
        boxShadow: "0 4px 12px rgba(0,0,0,0.18)",
      }}
    >
      <Box style={{ width: 22, height: 22 }}>
        <Icon svg={<PlusIcon />} />
      </Box>
      <Text textStyle="t5Bold" style={{ color: "var(--seed-color-palette-static-white)" }}>
        글쓰기
      </Text>
    </Box>
  );
}

/* ------------------------------------------------------------------ */
/* 하단 탭바                                                            */
/* ------------------------------------------------------------------ */

function BottomNav() {
  return (
    <Box
      as="nav"
      style={{
        position: "absolute",
        left: 0,
        right: 0,
        bottom: 0,
        height: 76,
        display: "flex",
        background: layer,
        borderTop: `1px solid ${stroke}`,
        paddingBottom: 8,
      }}
    >
      {bottomNav.map((item) => {
        const color = item.active ? fg : fgMuted;
        return (
          <Box
            as="button"
            key={item.label}
            style={{
              flex: 1,
              border: "none",
              background: "transparent",
              cursor: "pointer",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 4,
              paddingTop: 8,
              color,
            }}
          >
            <Box style={{ position: "relative", width: 26, height: 26 }}>
              <Icon svg={item.icon} />
              {item.badge && (
                <Box style={{ position: "absolute", top: -6, right: -8 }}>
                  <NotificationBadge>{item.badge}</NotificationBadge>
                </Box>
              )}
            </Box>
            <Text
              textStyle="t1Regular"
              style={{ color, fontWeight: item.active ? 700 : 400 }}
            >
              {item.label}
            </Text>
          </Box>
        );
      })}
    </Box>
  );
}
