import { Box, Icon, Text } from "@seed-design/react";
import {
  BackIcon,
  ChatIcon,
  CheckCircleIcon,
  MoreIcon,
  ShareIcon,
  ThumbsUpIcon,
} from "../icons";
import { FixedIcon, fg, fgInformative, fgMuted, fill, layer, stroke } from "../shared";

/* 일정 후기 전체 보기 — 모임 소개 페이지에서 "일정 후기"를 누르면 열립니다. */

export type ReviewPost = {
  author: string;
  badge?: "host" | "verified";
  time: string;
  text: string[];
  photos: number;
  likes: number;
  comments?: number;
  views: number;
};

const POSTS: ReviewPost[] = [
  {
    author: "오리",
    badge: "host",
    time: "6일 전 · 일정 후기",
    text: [
      "사진을 못 찍었네요ㅠㅠ 집 가는 길에 본 고양이 사진으로 대신 합니다,,",
      "오랜만에 뜨개 하니깐 넘 재밌었어요! 다음 모임 때 또 만나용~ 👏🏻👏🏻👏🏻",
    ],
    photos: 2,
    likes: 6,
    views: 21,
  },
  {
    author: "쉬리",
    badge: "verified",
    time: "6일 전 · 일정 후기",
    text: [
      "분명 뜨개 모임 나갔는데~ 전 수다만 ㅋㅋㅋ 지난 모임과 이번 모임에서 뜬 거 푸르시오했지만~~ 해피타임^^",
    ],
    photos: 1,
    likes: 5,
    comments: 2,
    views: 16,
  },
  {
    author: "뜨실이",
    time: "1주 전 · 일정 후기",
    text: ["오늘도 즐거운 뜨개 시간이었어요! 다들 고생 많으셨습니다 🧶 다음에 또 봬요~"],
    photos: 1,
    likes: 4,
    comments: 1,
    views: 12,
  },
];

/* 사진 자리를 비운 회색 박스 */
function Photo({ flex, height }: { flex?: boolean; height: number }) {
  return (
    <Box
      style={{
        flex: flex ? 1 : undefined,
        width: flex ? undefined : "100%",
        height,
        borderRadius: 12,
        background: fill,
        minWidth: 0,
      }}
    />
  );
}

function ReactionIcon({ svg, count }: { svg: React.ReactNode; count?: number }) {
  return (
    <Box style={{ display: "flex", alignItems: "center", gap: 5 }}>
      <FixedIcon svg={svg} size={18} color={fgMuted} />
      {count != null && count > 0 && (
        <Text textStyle="t3Regular" style={{ color: fgMuted }}>
          {count}
        </Text>
      )}
    </Box>
  );
}

function ReviewPostCard({ post }: { post: ReviewPost }) {
  return (
    <Box style={{ padding: "16px 20px" }}>
      {/* 작성자 */}
      <Box style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <Box style={{ width: 36, height: 36, borderRadius: "50%", background: fill, flexShrink: 0 }} />
        <Box style={{ flex: 1, minWidth: 0 }}>
          <Box style={{ display: "flex", alignItems: "center", gap: 4 }}>
            <Text textStyle="t4Bold" style={{ color: fg }}>
              {post.author}
            </Text>
            {post.badge === "host" && (
              <Text textStyle="t3Regular" style={{ flexShrink: 0 }}>
                👑
              </Text>
            )}
            {post.badge === "verified" && (
              <FixedIcon svg={<CheckCircleIcon />} size={15} color={fgInformative} />
            )}
          </Box>
          <Text textStyle="t2Regular" style={{ color: fgMuted, display: "block", marginTop: 1 }}>
            {post.time}
          </Text>
        </Box>
        <FixedIcon svg={<MoreIcon />} size={18} color={fgMuted} />
      </Box>

      {/* 본문 */}
      <Box style={{ marginTop: 12 }}>
        <Text textStyle="t5Regular" style={{ color: fg, lineHeight: 1.6 }}>
          {post.text.map((line, j) => (
            <span key={j}>
              {line}
              {j < post.text.length - 1 && (
                <>
                  <br />
                  <br />
                </>
              )}
            </span>
          ))}
        </Text>
      </Box>

      {/* 사진 */}
      {post.photos === 2 ? (
        <Box style={{ display: "flex", gap: 6, marginTop: 14 }}>
          <Photo flex height={170} />
          <Photo flex height={170} />
        </Box>
      ) : (
        <Box style={{ marginTop: 14 }}>
          <Photo height={300} />
        </Box>
      )}

      {/* 반응 */}
      <Box style={{ display: "flex", alignItems: "center", gap: 18, marginTop: 14 }}>
        <ReactionIcon svg={<ThumbsUpIcon />} count={post.likes} />
        <ReactionIcon svg={<ChatIcon />} count={post.comments} />
        <FixedIcon svg={<ShareIcon />} size={18} color={fgMuted} />
        <Box style={{ flex: 1 }} />
        <Text textStyle="t3Regular" style={{ color: fgMuted }}>
          조회 {post.views}
        </Text>
      </Box>
    </Box>
  );
}

export default function ScheduleReviewFeed({
  onBack,
  posts = POSTS,
}: {
  onBack: () => void;
  posts?: ReviewPost[];
}) {
  return (
    <Box
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 45,
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
          borderBottom: `1px solid ${stroke}`,
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
          일정 후기
        </Text>
      </Box>

      {/* 목록 */}
      <Box className="no-scrollbar" style={{ flex: 1, overflowY: "auto", paddingBottom: 24 }}>
        {posts.map((post, i) => (
          <Box key={i}>
            <ReviewPostCard post={post} />
            {i < posts.length - 1 && <Box style={{ height: 8, background: fill }} />}
          </Box>
        ))}
      </Box>
    </Box>
  );
}
