import { Badge, Box, Chip, Icon, Text } from "@seed-design/react";
import {
  CalendarIcon,
  ChatIcon,
  ChevronDownIcon,
  FireIcon,
  MoreIcon,
  PeopleIcon,
  PinIcon,
  ThumbsUpIcon,
  VoteIcon,
} from "../icons";
import { FixedIcon, fg, fgMuted, fgSubtle, fill, hScrollOnWheel, stroke } from "../shared";

/* 동네생활(추천) 피드 */

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
  thumb?: boolean;
  stats: { type: "members" | "reactions"; values: string[] };
};

const posts: Post[] = [
  {
    category: "모임 일정",
    group: { emoji: "🌻", name: "2030하남강동송…" },
    title: "미사 맥주벙",
    schedule: "5월 29일 금요일, 오후 8:00",
    meta: "미사1동 · 2시간 전 · 조회 47",
    stats: { type: "members", values: ["5/6명"] },
  },
  {
    category: "생활/편의",
    title: "이런 구청장 후보가 당선될지?",
    body: "강동역도 요즘 선거유세로 난리가 아니다. 그래도 다행인 건 주…",
    meta: "천호제3동 · 6시간 전 · 조회 268",
    stats: { type: "reactions", values: ["9", "4"] },
  },
  {
    category: "분실/실종",
    title: "신한카드 발견*천호공원",
    place: { name: "천호공원 관리사무소", desc: "공원에서 오전에 …" },
    thumb: true,
    meta: "천호동 · 11시간 전 · 조회 83",
    stats: { type: "reactions", values: ["3"] },
  },
  {
    category: "모임 일정",
    group: { name: "[어썸골프] 강동하…" },
    title: "심심하면 오세요",
    schedule: "5월 29일 금요일, 오후 7:30",
    thumb: true,
    meta: "강일동 · 4시간 전 · 조회 96",
    stats: { type: "reactions", values: ["1"] },
  },
];

function Filters() {
  return (
    <Box
      className="no-scrollbar"
      onWheel={hScrollOnWheel}
      style={{
        display: "flex",
        gap: 8,
        padding: "0 20px 14px",
        overflowX: "auto",
      }}
    >
      {filters.map((f) => {
        if (f.active) {
          // Seed Chip의 solid variant는 `data-checked`에서 어두운 배경 +
          // 반전(밝은) 텍스트로 자동 전환됩니다. 정적 화면이라 슬롯에 직접 부여.
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
                  <FixedIcon
                    svg={f.suffix}
                    color="var(--seed-color-fg-neutral-inverted)"
                  />
                </Chip.SuffixIcon>
              )}
            </Chip.Root>
          );
        }
        return (
          <Chip.Root key={f.label} variant="solid" style={{ flexShrink: 0 }}>
            {f.prefix && (
              <Chip.PrefixIcon>
                <FixedIcon svg={f.prefix} color={f.prefixColor} />
              </Chip.PrefixIcon>
            )}
            <Chip.Label>{f.label}</Chip.Label>
          </Chip.Root>
        );
      })}
    </Box>
  );
}

function Stats({ stats }: { stats: Post["stats"] }) {
  if (stats.values.length === 0) return null;

  if (stats.type === "members") {
    return (
      <Box style={{ display: "flex", alignItems: "center", gap: 4 }}>
        <FixedIcon svg={<PeopleIcon />} />
        <Text textStyle="t3Regular" style={{ color: fgMuted }}>
          {stats.values[0]}
        </Text>
      </Box>
    );
  }

  return (
    <Box style={{ display: "flex", alignItems: "center", gap: 12 }}>
      <Box style={{ display: "flex", alignItems: "center", gap: 4 }}>
        <FixedIcon svg={<ThumbsUpIcon />} />
        <Text textStyle="t3Regular" style={{ color: fgMuted }}>
          {stats.values[0]}
        </Text>
      </Box>
      {stats.values[1] && (
        <Box style={{ display: "flex", alignItems: "center", gap: 4 }}>
          <FixedIcon svg={<ChatIcon />} />
          <Text textStyle="t3Regular" style={{ color: fgMuted }}>
            {stats.values[1]}
          </Text>
        </Box>
      )}
    </Box>
  );
}

function PostCard({ post }: { post: Post }) {
  return (
    <Box style={{ display: "flex", gap: 12, padding: "18px 20px" }}>
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
              {post.group.emoji && (
                <Text textStyle="t3Regular">{post.group.emoji}</Text>
              )}
              <Text textStyle="t3Regular" maxLines={1} style={{ color: fgSubtle }}>
                {post.group.name}
              </Text>
            </Box>
          )}
        </Box>

        <Text textStyle="t5Bold" maxLines={1} style={{ color: fg }}>
          {post.title}
        </Text>

        {post.schedule && (
          <Box style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <FixedIcon svg={<CalendarIcon />} />
            <Text textStyle="t4Regular" style={{ color: fgSubtle }}>
              {post.schedule}
            </Text>
          </Box>
        )}

        {post.body && (
          <Text textStyle="t5Regular" maxLines={1} style={{ color: fgSubtle }}>
            {post.body}
          </Text>
        )}

        {post.place && (
          <Box style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <FixedIcon svg={<PinIcon />} />
            <Text textStyle="t4Regular" maxLines={1} style={{ color: fgSubtle }}>
              {post.place.name}
              <span style={{ color: fgMuted }}> ｜ {post.place.desc}</span>
            </Text>
          </Box>
        )}

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
      <Box
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-end",
          gap: 8,
        }}
      >
        <Box
          as="button"
          style={{
            border: "none",
            background: "transparent",
            cursor: "pointer",
            color: fgMuted,
            width: 20,
            height: 20,
            padding: 0,
          }}
        >
          <Icon svg={<MoreIcon />} />
        </Box>
        {post.thumb && (
          <Box
            style={{
              width: 96,
              height: 96,
              borderRadius: 8,
              background: fill,
            }}
          />
        )}
      </Box>
    </Box>
  );
}

export default function CommunityFeed() {
  return (
    <>
      <Filters />
      <Box as="main">
        {posts.map((post, i) => (
          <Box key={i}>
            <PostCard post={post} />
            {i < posts.length - 1 && (
              <Box style={{ height: 1, background: stroke, margin: "0 20px" }} />
            )}
          </Box>
        ))}
      </Box>
    </>
  );
}

