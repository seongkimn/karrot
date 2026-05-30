import { useState } from "react";
import { ActionButton, Box, Icon, Text } from "@seed-design/react";
import {
  BackIcon,
  LeafIcon,
  PinIcon,
  QuestionCircleIcon,
  RefreshIcon,
} from "../icons";
import {
  FixedIcon,
  PhotoTile,
  brand,
  fg,
  fgInformative,
  fgMuted,
  fill,
  layer,
  stroke,
} from "../shared";

/* ================================================================== */
/* 랭킹 데이터                                                          */
/* ================================================================== */

export type RankItem = {
  title: string;
  place: string;
  score: number;
  emoji: string;
  hue: number;
};

/**
 * 카테고리별 이번 주 인기 랭킹. 키가 없는 카테고리(동네친구·가족/육아·반려동물·
 * 기타 등)는 아직 랭킹이 없는 상태로 표시됩니다.
 */
export const THIS_WEEK_BY_CATEGORY: Record<string, RankItem[]> = {
  전체: [
    { title: "🌈🏃 런나잇 🌙Running💛", place: "천호동", score: 2986, emoji: "🏃", hue: 30 },
    { title: "💒라라랜드💒로 당신을초대…", place: "송파구 방이동", score: 2841, emoji: "🎬", hue: 280 },
    { title: "올림픽공원 테니스 모임", place: "송파구 오금동", score: 2317, emoji: "🎾", hue: 90 },
    { title: "💘4050별빛연가(YOU & I)", place: "천호동", score: 2194, emoji: "🌌", hue: 250 },
    { title: "🏟 잠실 야구장 직관 모임(잠야…", place: "송파구 송파동", score: 1768, emoji: "⚾", hue: 200 },
    { title: "내향인 등린이 모임", place: "송파구 가락본동", score: 1512, emoji: "🥾", hue: 150 },
    { title: "🎾러브올테니스단 (러올단 S)", place: "송파구 잠실4동", score: 1439, emoji: "🎾", hue: 110 },
    { title: "💝3040🔗인연 Love House", place: "송파구 방이동", score: 1286, emoji: "💞", hue: 330 },
    { title: "강동 보드게임 한판 🎲", place: "천호동", score: 1134, emoji: "🎲", hue: 20 },
    { title: "미사 한강 라이딩 크루 🚴", place: "하남시 미사동", score: 972, emoji: "🚴", hue: 190 },
  ],
  운동: [
    { title: "🌈🏃 런나잇 🌙Running💛", place: "천호동", score: 2986, emoji: "🏃", hue: 30 },
    { title: "올림픽공원 테니스 모임", place: "송파구 오금동", score: 2317, emoji: "🎾", hue: 90 },
    { title: "🎾러브올테니스단 (러올단 S)", place: "송파구 잠실4동", score: 1439, emoji: "🎾", hue: 110 },
    { title: "광나루 피클볼", place: "송파구 풍납2동", score: 1083, emoji: "🏓", hue: 160 },
    { title: "강동 클라이밍 클럽 🧗", place: "성내동", score: 947, emoji: "🧗", hue: 130 },
    { title: "🏟 잠실 야구장 직관 모임", place: "송파구 송파동", score: 812, emoji: "⚾", hue: 200 },
  ],
  자기계발: [
    { title: "미라클모닝 챌린지 ☀️", place: "천호동", score: 1816, emoji: "☀️", hue: 45 },
    { title: "고양이와 함께하는 스터디 모임", place: "길동", score: 1427, emoji: "🐱", hue: 30 },
    { title: "퇴근 후 영어회화 모임", place: "둔촌동", score: 1198, emoji: "🗣️", hue: 210 },
    { title: "미사 캘리그라피 클래스 ✍️", place: "미사동", score: 884, emoji: "✍️", hue: 280 },
    { title: "강동 사이드프로젝트 모임 💻", place: "천호동", score: 651, emoji: "💻", hue: 200 },
  ],
  "문화/예술": [
    { title: "💒라라랜드💒로 당신을초대…", place: "송파구 방이동", score: 2841, emoji: "🎬", hue: 280 },
    { title: "강동 보드게임 한판 🎲", place: "천호동", score: 1134, emoji: "🎲", hue: 20 },
    { title: "우쿨렐레 합주단 🎸", place: "길동", score: 921, emoji: "🎸", hue: 300 },
    { title: "전시 같이 보러가요 🖼", place: "송파구 가락동", score: 744, emoji: "🖼️", hue: 330 },
  ],
  "아웃도어/여행": [
    { title: "남한산성 등산 모임 🥾", place: "길동", score: 1648, emoji: "🥾", hue: 130 },
    { title: "미사 한강 라이딩 크루 🚴", place: "미사동", score: 1226, emoji: "🚴", hue: 190 },
    { title: "주말 캠핑 가실 분 ⛺", place: "상일동", score: 936, emoji: "⛺", hue: 150 },
    { title: "올림픽공원 산책 모임 🌳", place: "오금동", score: 572, emoji: "🌳", hue: 110 },
  ],
};

export const LAST_WEEK: RankItem[] = [
  { title: "💒라라랜드💒로 당신을초대…", place: "송파구 방이동", score: 4216, emoji: "🎬", hue: 280 },
  { title: "🌈🏃 런나잇 🌙Running💛", place: "천호동", score: 3894, emoji: "🏃", hue: 30 },
  { title: "올림픽공원 테니스 모임", place: "송파구 오금동", score: 3027, emoji: "🎾", hue: 90 },
  { title: "💘4050별빛연가(YOU & I)", place: "천호동", score: 2765, emoji: "🌌", hue: 250 },
  { title: "🌙동네낭만온도🌈20,30,4…", place: "상일동", score: 2418, emoji: "🌙", hue: 40 },
  { title: "동파🐋 20대 또래 모임은 처…", place: "송파구 방이동", score: 1964, emoji: "🐋", hue: 210 },
  { title: "하남.미사 3040 /좋은사람들", place: "하남시 망월동", score: 1583, emoji: "🍻", hue: 35 },
  { title: "광나루 피클볼", place: "송파구 풍납2동", score: 1426, emoji: "🏓", hue: 160 },
  { title: "브라우니 러너스", place: "천호동", score: 1291, emoji: "🍫", hue: 25 },
  { title: "강동 클라이밍 클럽 🧗", place: "성내동", score: 1178, emoji: "🧗", hue: 130 },
];

const LAST_WEEK_CATEGORIES = [
  "전체",
  "운동",
  "아웃도어/여행",
  "자기계발",
  "음식/음료",
  "문화/예술",
];

const fmt = (n: number) => n.toLocaleString("en-US") + "점";

/* ================================================================== */
/* 랭킹 행                                                             */
/* ================================================================== */

function RankThumb({ item, rank }: { item: RankItem; rank: number }) {
  return (
    <Box style={{ position: "relative", flexShrink: 0 }}>
      <PhotoTile emoji={item.emoji} hue={item.hue} size={56} radius={14} fontScale={0.5} />
      {/* 레벨(씨앗) 배지 — 3위까지만 */}
      {rank <= 3 && (
        <Box
          style={{
            position: "absolute",
            right: -3,
            bottom: -3,
            width: 20,
            height: 20,
            borderRadius: "50%",
            background: brand,
            border: `2px solid ${layer}`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <FixedIcon
            svg={<LeafIcon />}
            size={11}
            color="var(--seed-color-palette-static-white)"
          />
        </Box>
      )}
    </Box>
  );
}

function RankRow({ rank, item }: { rank: number; item: RankItem }) {
  const top = rank === 1;
  return (
    <Box
      style={{
        display: "flex",
        alignItems: "center",
        gap: 14,
        padding: "12px 20px",
        background: top ? "#fdeadf" : "transparent",
      }}
    >
      <Text
        textStyle="t6Bold"
        style={{ width: 22, textAlign: "center", color: top ? brand : fg }}
      >
        {rank}
      </Text>
      <RankThumb item={item} rank={rank} />
      <Box style={{ flex: 1, minWidth: 0 }}>
        <Text textStyle="t5Bold" maxLines={1} style={{ color: fg }}>
          {item.title}
        </Text>
        <Box style={{ display: "flex", alignItems: "center", gap: 3, marginTop: 3 }}>
          <FixedIcon svg={<PinIcon />} size={14} />
          <Text textStyle="t3Regular" style={{ color: fgMuted }}>
            {item.place}
          </Text>
        </Box>
      </Box>
      <Text textStyle="t5Bold" style={{ color: top ? brand : fgMuted, flexShrink: 0 }}>
        {fmt(item.score)}
      </Text>
    </Box>
  );
}

/* ================================================================== */
/* 인기 모드 인라인 헤더 + 리스트                                        */
/* ================================================================== */

export function WeeklyRanking({
  category,
  onOpenInfo,
  onOpenLastWeek,
}: {
  category: string;
  onOpenInfo: () => void;
  onOpenLastWeek: () => void;
}) {
  const list = THIS_WEEK_BY_CATEGORY[category];

  // 랭킹이 없는 카테고리 (동네친구·가족/육아·반려동물·기타 등)
  if (!list || list.length === 0) {
    return (
      <Box
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 8,
          padding: "90px 32px 40px",
          textAlign: "center",
        }}
      >
        <Text textStyle="t5Bold" style={{ color: fg }}>
          아직 이 카테고리의 인기 랭킹이 없어요
        </Text>
        <Text textStyle="t4Regular" style={{ color: fgMuted, lineHeight: 1.5 }}>
          Lv.4 이상 모임이 모이면
          <br />
          인기 랭킹이 열려요.
        </Text>
      </Box>
    );
  }

  return (
    <Box>
      {/* 헤더 */}
      <Box
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "8px 20px 16px",
        }}
      >
        <Box style={{ minWidth: 0 }}>
          <Text textStyle="t6Bold" style={{ color: fg, display: "block" }}>
            이번 주 모임 Top 50
          </Text>
          <Box style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 4 }}>
            <Text textStyle="t4Regular" style={{ color: fgMuted }}>
              5월 4주차(월-일) 실시간 랭킹
            </Text>
            <Box
              as="button"
              onClick={onOpenLastWeek}
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
              <Text textStyle="t4Bold" style={{ color: fg }}>
                지난 주 랭킹
              </Text>
              <FixedIcon svg={<ChevronRight />} size={16} color={fg} />
            </Box>
          </Box>
        </Box>
        <Box
          as="button"
          onClick={onOpenInfo}
          style={{
            border: "none",
            background: "transparent",
            cursor: "pointer",
            padding: 0,
            width: 26,
            height: 26,
            color: fgMuted,
            flexShrink: 0,
          }}
        >
          <Icon svg={<QuestionCircleIcon />} />
        </Box>
      </Box>

      {list.map((item, i) => (
        <RankRow key={i} rank={i + 1} item={item} />
      ))}
    </Box>
  );
}

// 인라인 chevron (별도 import 회피용 소형 svg)
function ChevronRight() {
  return (
    <svg viewBox="0 0 24 24" width="100%" height="100%" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" style={{ display: "block" }}>
      <path d="m9 6 6 6-6 6" />
    </svg>
  );
}

/* ================================================================== */
/* 랭킹 안내 바텀시트                                                    */
/* ================================================================== */

const INFO_BULLETS: (string | string[])[] = [
  "05월 30일 기준, Lv.4 이상인 우리 동네 모임의 주간 랭킹이에요.",
  "랭킹은 매주 월요일 00시 00분부터 일요일 23시 59분까지의 활동점수로 집계돼요.",
  "랭킹에 활용되는 주간 활동점수는 매주 리셋되고, 글쓰기, 일정 만들기 등을 통해서 모을 수 있어요. 더 알아보기",
  "랭킹에는 내가 가입할 수 있는 모임만 노출돼요.",
  "아래의 경우 랭킹 집계에서 제외되고 포인트 회수 및 레벨이 강등 될 수 있어요.",
  ["무의미하거나 반복적인 글, 댓글을 작성한 경우", "운영 정책을 위반한 글, 댓글을 작성한 모임인 경우"],
  "랭킹 기준 등은 당근의 내부 판단에 따라 변경될 수 있어요.",
];

export function RankingInfoSheet({ onClose }: { onClose: () => void }) {
  return (
    <Box
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 50,
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-end",
        background: "rgba(0,0,0,0.45)",
      }}
      onClick={onClose}
    >
      <Box
        onClick={(e: React.MouseEvent) => e.stopPropagation()}
        style={{
          width: "100%",
          maxWidth: 420,
          margin: "0 auto",
          background: layer,
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          padding: "28px 20px 20px",
          maxHeight: "82dvh",
          overflowY: "auto",
        }}
        className="no-scrollbar"
      >
        <Text as="h2" textStyle="t7Bold" style={{ color: fg, display: "block" }}>
          랭킹 안내
        </Text>

        <Box style={{ display: "flex", flexDirection: "column", gap: 14, marginTop: 20 }}>
          {INFO_BULLETS.map((b, i) =>
            Array.isArray(b) ? (
              <Box key={i} style={{ display: "flex", flexDirection: "column", gap: 10, paddingLeft: 18 }}>
                {b.map((sub, j) => (
                  <Bullet key={j} text={sub} />
                ))}
              </Box>
            ) : (
              <Bullet key={i} text={b} />
            ),
          )}
        </Box>

        <Box style={{ marginTop: 24 }}>
          <ActionButton variant="neutralWeak" size="large" onClick={onClose} style={{ width: "100%" }}>
            닫기
          </ActionButton>
        </Box>
      </Box>
    </Box>
  );
}

function Bullet({ text }: { text: string }) {
  // "더 알아보기" 링크 강조
  const idx = text.indexOf("더 알아보기");
  return (
    <Box style={{ display: "flex", gap: 8 }}>
      <Text textStyle="t4Regular" style={{ color: fg }}>
        ·
      </Text>
      <Text textStyle="t4Regular" style={{ color: fg, flex: 1, lineHeight: 1.5 }}>
        {idx >= 0 ? (
          <>
            {text.slice(0, idx)}
            <span style={{ color: fgInformative, textDecoration: "underline" }}>더 알아보기</span>
          </>
        ) : (
          text
        )}
      </Text>
    </Box>
  );
}

/* ================================================================== */
/* 지난 주 모임 Top 50 (전체 화면)                                       */
/* ================================================================== */

export function LastWeekRankingPage({ onBack }: { onBack: () => void }) {
  const [cat, setCat] = useState("전체");

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
      {/* 헤더 */}
      <Box
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "12px 16px",
          flexShrink: 0,
        }}
      >
        <Box
          as="button"
          onClick={onBack}
          style={{ width: 28, height: 28, border: "none", background: "transparent", cursor: "pointer", padding: 0, color: fg }}
        >
          <Icon svg={<BackIcon />} />
        </Box>
        <Box as="button" style={{ border: "none", background: "transparent", cursor: "pointer", padding: 0 }}>
          <Text textStyle="t5Regular" style={{ color: fg }}>
            안내
          </Text>
        </Box>
      </Box>

      <Box className="no-scrollbar" style={{ flex: 1, overflowY: "auto", paddingBottom: 24 }}>
        {/* 타이틀 */}
        <Box style={{ display: "flex", alignItems: "center", gap: 10, padding: "8px 20px 16px" }}>
          <Text as="h1" textStyle="t8Bold" style={{ color: fg }}>
            지난 주 모임 Top 50
          </Text>
          <Box
            as="button"
            style={{
              width: 30,
              height: 30,
              borderRadius: "50%",
              background: fill,
              border: "none",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: fgMuted,
              padding: 0,
            }}
          >
            <FixedIcon svg={<RefreshIcon />} size={16} color={fgMuted} />
          </Box>
        </Box>

        {/* 카테고리 칩 */}
        <Box
          className="no-scrollbar"
          style={{ display: "flex", gap: 8, padding: "0 20px 14px", overflowX: "auto" }}
        >
          {LAST_WEEK_CATEGORIES.map((c) => {
            const on = c === cat;
            return (
              <Box
                as="button"
                key={c}
                onClick={() => setCat(c)}
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
                  {c}
                </Text>
              </Box>
            );
          })}
        </Box>

        {LAST_WEEK.map((item, i) => (
          <RankRow key={i} rank={i + 1} item={item} />
        ))}
      </Box>
    </Box>
  );
}
