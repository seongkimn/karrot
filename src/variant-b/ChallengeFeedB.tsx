import { Box, Icon, Text } from "@seed-design/react";
import { BackIcon, PeopleIcon, PlusIcon, QuestionCircleIcon } from "../icons";
import { FixedIcon, brand, fg, fgMuted, fill, layer, stroke } from "../shared";

/* 모임 챌린지 전체 보기 — 모임 소개 페이지에서 "챌린지"를 누르면 열립니다. */

export type Challenge = {
  title: string;
  status: string;
  ongoing?: boolean;
  period: string;
  people: string;
  photo?: boolean;
};

const ONGOING: Challenge[] = [
  { title: "5월 매일뜨개 챌린지", status: "진행 30일차", ongoing: true, period: "1년 동안 · 매일", people: "8명 참여" },
];

const UPCOMING: Challenge[] = [
  { title: "6월 매일뜨개 챌린지", status: "D-2", ongoing: true, period: "1년 동안 · 매일", people: "6명 참여" },
];

const ENDED: Challenge[] = [
  { title: "4월 매일뜨개 챌린지", status: "종료", period: "1년 동안 · 매일", people: "11명 참여" },
  { title: "3월 매일뜨개 챌린지", status: "종료", period: "1년 동안 · 매일", people: "7명 참여" },
  { title: "[털실타래]버터케이크카디건 함뜨", status: "종료", period: "1년 동안 · 주 3일", people: "3명 참여", photo: true },
];

function ChallengeRow({ item }: { item: Challenge }) {
  return (
    <Box style={{ display: "flex", gap: 14, padding: "14px 20px", alignItems: "center" }}>
      <Box style={{ flex: 1, minWidth: 0 }}>
        <Text textStyle="t5Bold" maxLines={1} style={{ color: fg, display: "block" }}>
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
      {item.photo && (
        <Box style={{ width: 64, height: 64, borderRadius: 12, background: fill, flexShrink: 0 }} />
      )}
    </Box>
  );
}

function Section({ title, items }: { title: string; items: Challenge[] }) {
  return (
    <Box style={{ padding: "20px 0 8px" }}>
      <Text textStyle="t6Bold" style={{ color: fg, display: "block", padding: "0 20px 4px" }}>
        {title}
      </Text>
      {items.map((c, i) => (
        <ChallengeRow key={i} item={c} />
      ))}
    </Box>
  );
}

export default function ChallengeFeed({
  onBack,
  ongoing = ONGOING,
  upcoming = UPCOMING,
  ended = ENDED,
}: {
  onBack: () => void;
  ongoing?: Challenge[];
  upcoming?: Challenge[];
  ended?: Challenge[];
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
          justifyContent: "space-between",
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
          모임 챌린지
        </Text>
        <Box
          as="button"
          style={{
            width: 32,
            height: 32,
            border: "none",
            background: "transparent",
            cursor: "pointer",
            padding: 0,
            color: fgMuted,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Icon svg={<QuestionCircleIcon />} />
        </Box>
      </Box>

      <Box className="no-scrollbar" style={{ flex: 1, overflowY: "auto", paddingBottom: 24 }}>
        {/* 챌린지 만들기 */}
        <Box style={{ padding: "16px 20px 4px" }}>
          <Box
            as="button"
            style={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 6,
              border: "none",
              background: fill,
              borderRadius: 10,
              padding: "14px 0",
              cursor: "pointer",
              color: fg,
            }}
          >
            <FixedIcon svg={<PlusIcon />} size={18} color={fg} />
            <Text textStyle="t5Bold" style={{ color: fg }}>
              챌린지 만들기
            </Text>
          </Box>
        </Box>

        <Section title="진행 중인 챌린지" items={ongoing} />
        <Section title="진행 예정 챌린지" items={upcoming} />
        <Section title="종료된 챌린지" items={ended} />
      </Box>
    </Box>
  );
}
