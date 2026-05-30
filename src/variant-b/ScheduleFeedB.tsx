import { Box, Icon, Text } from "@seed-design/react";
import { BackIcon, ClockIcon, LockIcon, PeopleIcon, ThumbsUpIcon } from "../icons";
import { FixedIcon, fg, fgMuted, fill, layer, stroke } from "../shared";

/* 일정 전체 보기 — 모임 소개 페이지에서 "일정"을 누르면 열립니다. */

export type SchedulePreviewReview = { likes: number; author: string; text: string };
export type ScheduleItem = { month: string; day: string; title: string; locked?: boolean; time: string; people: string };

const REVIEWS: SchedulePreviewReview[] = [
  { likes: 6, author: "오리", text: "사진을 못 찍었네요ㅠㅠ 집 가는 길에 본 고양이..." },
  { likes: 5, author: "쉬리", text: "분명 뜨개 모임 나갔는데~ 전 수다만 ㅋㅋㅋ 지난..." },
  { likes: 7, author: "제라늄", text: "오랜만에 모뜨 넘 즐거웠어요^^" },
  { likes: 4, author: "뜨실이", text: "다음에 또 함께 떠요! 즐거운 시간이었습니다 🧶" },
];

const SCHEDULES: ScheduleItem[] = [
  { month: "5월", day: "23", title: "모임에만 공개된 일정이에요.", locked: true, time: "오후 12:00", people: "5/7명" },
  { month: "5월", day: "13", title: "카페 뜨개 ☕", time: "오전 10:30", people: "6/6명" },
  { month: "5월", day: "9", title: "모임에만 공개된 일정이에요.", locked: true, time: "오후 12:00", people: "4/8명" },
  { month: "5월", day: "2", title: "모임에만 공개된 일정이에요.", locked: true, time: "오후 12:00", people: "3/6명" },
];

/* 일정 후기 카드 (사진 자리는 회색 박스) */
function ReviewCard({ review }: { review: { likes: number; author: string; text: string } }) {
  return (
    <Box style={{ width: 150, flexShrink: 0 }}>
      <Box style={{ position: "relative" }}>
        <Box style={{ width: 150, height: 130, borderRadius: 12, background: fill }} />
        <Box
          style={{
            position: "absolute",
            left: 8,
            bottom: 8,
            display: "flex",
            alignItems: "center",
            gap: 3,
            background: "rgba(0,0,0,0.5)",
            borderRadius: 999,
            padding: "4px 9px",
            color: "var(--seed-color-palette-static-white)",
          }}
        >
          <FixedIcon svg={<ThumbsUpIcon />} size={13} color="var(--seed-color-palette-static-white)" />
          <Text textStyle="t2Bold" style={{ color: "var(--seed-color-palette-static-white)" }}>
            {review.likes}
          </Text>
        </Box>
      </Box>
      {/* 작성자 */}
      <Box style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 8 }}>
        <Box style={{ width: 22, height: 22, borderRadius: "50%", background: fill, flexShrink: 0 }} />
        <Text textStyle="t3Regular" maxLines={1} style={{ color: fgMuted }}>
          {review.author}
        </Text>
      </Box>
      {/* 본문 미리보기 */}
      <Text
        textStyle="t4Regular"
        maxLines={2}
        style={{ color: fg, display: "block", marginTop: 6, lineHeight: 1.4 }}
      >
        {review.text}
      </Text>
    </Box>
  );
}

/* 종료된 일정 행 */
function ScheduleRow({
  item,
}: {
  item: { month: string; day: string; title: string; locked?: boolean; time: string; people: string };
}) {
  return (
    <Box style={{ display: "flex", gap: 14, padding: "14px 20px", alignItems: "flex-start" }}>
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

export default function ScheduleFeed({
  onBack,
  reviews = REVIEWS,
  schedules = SCHEDULES,
}: {
  onBack: () => void;
  reviews?: SchedulePreviewReview[];
  schedules?: ScheduleItem[];
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
          일정
        </Text>
      </Box>

      <Box className="no-scrollbar" style={{ flex: 1, overflowY: "auto", paddingBottom: 24 }}>
        {/* 일정 후기 */}
        <Box style={{ padding: "20px 0 8px" }}>
          <Text textStyle="t6Bold" style={{ color: fg, display: "block", padding: "0 20px 14px" }}>
            일정 후기
          </Text>
          <Box
            className="no-scrollbar"
            style={{ display: "flex", gap: 12, padding: "0 20px", overflowX: "auto" }}
          >
            {reviews.map((r, i) => (
              <ReviewCard key={i} review={r} />
            ))}
          </Box>
        </Box>

        <Box style={{ height: 8, background: fill, marginTop: 16 }} />

        {/* 종료된 일정 */}
        <Box style={{ padding: "20px 0 8px" }}>
          <Text textStyle="t6Bold" style={{ color: fg, display: "block", padding: "0 20px 6px" }}>
            종료된 일정
          </Text>
          {schedules.map((s, i) => (
            <Box key={i}>
              <ScheduleRow item={s} />
              {i < schedules.length - 1 && (
                <Box style={{ height: 1, background: stroke, margin: "0 20px" }} />
              )}
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
}
