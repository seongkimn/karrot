import { useState } from "react";
import { Box, Icon, Switch, Text } from "@seed-design/react";
import {
  BackIcon,
  ChatIcon,
  CheckCircleIcon,
  ChevronRightIcon,
  FireIcon,
  ImageIcon,
  LockIcon,
  MoreIcon,
  ShareIcon,
  ThumbsUpIcon,
} from "../icons";
import { FixedIcon, brand, fg, fgInformative, fgMuted, fill, layer, stroke } from "../shared";

/* 게시글 전체 보기 — 모임 소개 페이지에서 "게시글"을 누르면 열립니다. */

const TABS = ["전체", "가입인사", "일정 후기", "자유 게시판", "완성했어요"];

export type Post = {
  author: string;
  verified?: boolean;
  crown?: boolean;
  time: string;
  board: string;
  lines?: string[];
  truncate?: boolean;
  locked?: boolean;
  photo?: boolean;
  carousel?: { count: number; active: number };
  challenge?: { title: string; sub: string };
  likes: number;
  comments?: number;
  views: number;
};

const POSTS: Post[] = [
  {
    author: "닛콩",
    verified: true,
    time: "1시간 전",
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
    challenge: { title: "5월 매일뜨개 챌린지", sub: "1년 챌린지 · 8명 참여" },
    likes: 2,
    comments: 1,
    views: 11,
  },
  {
    author: "후추",
    time: "3시간 전",
    board: "가입인사",
    lines: [
      "안녕하세요:-)",
      "아기옷도 뜨고 성인옷도 뜨고",
      "주로 대바늘을 뜨고 있습니다🥰",
      "잘부탁드립니다❤️🤍",
    ],
    likes: 5,
    comments: 2,
    views: 19,
  },
  {
    author: "유부장",
    verified: true,
    time: "1일 전",
    board: "완성했어요",
    locked: true,
    likes: 4,
    comments: 1,
    views: 13,
  },
  {
    author: "나로",
    time: "1일 전",
    board: "완성했어요",
    locked: true,
    likes: 6,
    views: 15,
  },
  {
    author: "수호천사",
    verified: true,
    time: "4일 전",
    board: "자유 게시판",
    lines: ["가방하나 완성했습니다~~"],
    carousel: { count: 3, active: 2 },
    likes: 8,
    comments: 2,
    views: 27,
  },
  {
    author: "요미쪼꼬맘",
    verified: true,
    time: "4일 전",
    board: "완성했어요",
    lines: [
      "동영상 보고 따라한 신랑의 가디건.",
      "탑다운방식이라 중간중간 입어보며 작업했고 단추는 세탁후 달기로 했어요.",
      "원작자의 결과물과는 좀 차이가 있지만 이번에는 입을수 있다는거에 만족 ㅋㅋ",
    ],
    photo: true,
    likes: 7,
    comments: 3,
    views: 24,
  },
  {
    author: "오리",
    crown: true,
    time: "4일 전",
    board: "자유 게시판",
    locked: true,
    likes: 5,
    views: 18,
  },
  {
    author: "유유",
    time: "6일 전",
    board: "자유 게시판",
    lines: ["뜨개사계절의 코바늘가방이에요 옛날도안 펼친면을 떠서 반 접어 만드는 스타일인데 얼른 완성하고 싶네요!"],
    likes: 6,
    comments: 1,
    views: 16,
  },
];

const white = "var(--seed-color-palette-static-white)";

function PostCard({ post }: { post: Post }) {
  return (
    <Box style={{ padding: "18px 20px", borderTop: `1px solid ${stroke}` }}>
      {/* 작성자 */}
      <Box style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <Box style={{ width: 38, height: 38, borderRadius: "50%", background: fill, flexShrink: 0 }} />
        <Box style={{ flex: 1, minWidth: 0 }}>
          <Box style={{ display: "flex", alignItems: "center", gap: 4 }}>
            <Text textStyle="t4Bold" style={{ color: fg }}>
              {post.author}
            </Text>
            {post.verified && <FixedIcon svg={<CheckCircleIcon />} size={15} color={fgInformative} />}
            {post.crown && (
              <Text textStyle="t3Regular" style={{ flexShrink: 0 }}>
                👑
              </Text>
            )}
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

      {/* 단일 사진 */}
      {post.photo && (
        <Box style={{ width: "100%", height: 300, borderRadius: 12, background: fill, marginTop: 12 }} />
      )}

      {/* 여러 장(캐러셀) */}
      {post.carousel && (
        <Box style={{ marginTop: 12 }}>
          <Box style={{ position: "relative" }}>
            <Box style={{ width: "100%", height: 300, borderRadius: 12, background: fill }} />
            <Box
              style={{
                position: "absolute",
                top: 10,
                left: "50%",
                transform: "translateX(-50%)",
                display: "flex",
                alignItems: "center",
                gap: 4,
                background: "rgba(0,0,0,0.5)",
                borderRadius: 999,
                padding: "3px 10px",
                color: white,
              }}
            >
              <FixedIcon svg={<ImageIcon />} size={12} color={white} />
              <Text textStyle="t2Bold" style={{ color: white }}>
                {post.carousel.active}/{post.carousel.count}
              </Text>
            </Box>
          </Box>
          <Box style={{ display: "flex", gap: 6, marginTop: 6 }}>
            {Array.from({ length: post.carousel.count }).map((_, k) => (
              <Box
                key={k}
                style={{
                  width: 48,
                  height: 48,
                  borderRadius: 8,
                  background: fill,
                  border:
                    k + 1 === post.carousel!.active
                      ? `2px solid ${brand}`
                      : `1px solid ${stroke}`,
                }}
              />
            ))}
          </Box>
        </Box>
      )}

      {/* 첨부 챌린지 */}
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
          <FixedIcon svg={<ThumbsUpIcon />} size={18} color={fgMuted} />
          <Text textStyle="t3Regular" style={{ color: fgMuted }}>
            {post.likes}
          </Text>
        </Box>
        <Box style={{ display: "flex", alignItems: "center", gap: 5 }}>
          <FixedIcon svg={<ChatIcon />} size={18} color={fgMuted} />
          {post.comments != null && (
            <Text textStyle="t3Regular" style={{ color: fgMuted }}>
              {post.comments}
            </Text>
          )}
        </Box>
        <FixedIcon svg={<ShareIcon />} size={18} color={fgMuted} />
        <Box style={{ flex: 1 }} />
        <Text textStyle="t3Regular" style={{ color: fgMuted }}>
          조회 {post.views}
        </Text>
      </Box>
    </Box>
  );
}

export default function PostFeed({
  onBack,
  posts = POSTS,
  tabs = TABS,
}: {
  onBack: () => void;
  posts?: Post[];
  tabs?: string[];
}) {
  const [tab, setTab] = useState("전체");
  const [popular, setPopular] = useState(false);

  const visible = tab === "전체" ? posts : posts.filter((p) => p.board === tab);

  return (
    <Box
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 46,
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
      {/* 헤더 */}
      <Box
        style={{
          position: "relative",
          display: "flex",
          alignItems: "center",
          padding: "12px 12px",
          flexShrink: 0,
        }}
      >
        <Box
          as="button"
          onClick={onBack}
          style={{
            width: 32,
            height: 32,
            border: "none",
            background: "transparent",
            cursor: "pointer",
            padding: 0,
            color: fg,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Icon svg={<BackIcon />} />
        </Box>
        <Text
          textStyle="t6Bold"
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            textAlign: "center",
            color: fg,
            pointerEvents: "none",
          }}
        >
          게시글
        </Text>
      </Box>

      {/* 탭 */}
      <Box
        className="no-scrollbar"
        style={{ display: "flex", gap: 8, padding: "6px 20px 12px", overflowX: "auto", flexShrink: 0 }}
      >
        {tabs.map((t) => {
          const on = t === tab;
          return (
            <Box
              as="button"
              key={t}
              onClick={() => setTab(t)}
              style={{
                flexShrink: 0,
                border: on ? "none" : `1px solid ${stroke}`,
                background: on ? fg : layer,
                color: on ? "var(--seed-color-fg-neutral-inverted)" : fg,
                borderRadius: 999,
                padding: "9px 16px",
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

      {/* 인기순 토글 */}
      <Box
        style={{
          display: "flex",
          alignItems: "center",
          gap: 8,
          padding: "0 20px 8px",
          flexShrink: 0,
        }}
      >
        <Switch.Root checked={popular} onCheckedChange={setPopular}>
          <Switch.Control>
            <Switch.Thumb />
          </Switch.Control>
          <Switch.HiddenInput />
        </Switch.Root>
        <Text textStyle="t4Regular" style={{ color: fgMuted }}>
          인기순으로 보기
        </Text>
      </Box>

      {/* 목록 */}
      <Box className="no-scrollbar" style={{ flex: 1, overflowY: "auto", paddingBottom: 24 }}>
        {visible.length === 0 ? (
          <Box style={{ padding: "64px 20px", textAlign: "center" }}>
            <Text textStyle="t5Regular" style={{ color: fgMuted }}>
              아직 게시글이 없어요.
            </Text>
          </Box>
        ) : (
          visible.map((p, i) => <PostCard key={i} post={p} />)
        )}
      </Box>
    </Box>
  );
}
