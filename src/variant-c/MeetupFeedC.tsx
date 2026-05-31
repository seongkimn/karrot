import { useState } from "react";
import { Box, Text } from "@seed-design/react";
import { ChevronDownIcon, ChevronUpIcon, PersonIcon, PinIcon, PlusIcon } from "../icons";
import {
  FixedIcon,
  PhotoTile,
  fg,
  fgInformative,
  fgMuted,
  fgSubtle,
  fill,
  hScrollOnWheel,
  layer,
  stroke,
} from "../shared";
import {
  LastWeekRankingPage,
  RankingInfoSheet,
  WeeklyRanking,
} from "./MeetupRankingC";
import MeetupAbout from "./MeetupAboutC";

/* 모임 탭 피드 */

type Recommend = { label: string; emoji: string; hue: number };

const recommendCards: Recommend[] = [
  { label: "UX를 공부하는 모임", emoji: "💡", hue: 340 },
  { label: "고양이와 함께하는 스터디 모임", emoji: "🐱", hue: 30 },
  { label: "자기계발 모임", emoji: "🎨", hue: 320 },
  { label: "음악/악기 모임", emoji: "🎸", hue: 280 },
  { label: "아웃도어/여행 모임", emoji: "🥾", hue: 130 },
];

const categories = [
  "전체",
  "문화/예술",
  "자기계발",
  "운동",
  "동네친구",
  "아웃도어/여행",
  "가족/육아",
  "반려동물",
  "음식/음료",
  "취미/오락",
  "독서/인문학",
  "음악/악기",
  "기타",
];

export type MeetupActivity = {
  level: "quiet" | "active" | "very";
  posts7d: number;
  meetups7d: number;
};

type Meetup = {
  title: string;
  desc: string;
  emoji: string;
  hue: number;
  category: string; // 카테고리 탭 필터용 ("이벤트"는 전체에서만 노출)
  place?: string;
  count?: string;
  status?: string;
  activity: MeetupActivity;
};

const meetups: Meetup[] = [
  {
    title: "퇴근 후 조용한 영어 문장 필사",
    desc: "각자 영어 문장을 읽고 필사해요. 말하기 부담 없이 시작합니다.",
    emoji: "✍️",
    hue: 30,
    category: "자기계발",
    place: "길동",
    count: "18명",
    status: "3개월 전 활동",
    activity: { level: "quiet", posts7d: 0, meetups7d: 0 },
  },
  {
    title: "천호 영어 원서 한 챕터 읽기",
    desc: "짧은 원서 챕터를 읽고 모르는 표현만 가볍게 나눠요.",
    emoji: "📚",
    hue: 210,
    category: "자기계발",
    place: "천호동",
    count: "23명",
    status: "4개월 전 활동",
    activity: { level: "quiet", posts7d: 0, meetups7d: 0 },
  },
  {
    title: "아침 30분 영어회화 루틴",
    desc: "출근 전 짧게 말하기 연습하고 표현을 서로 피드백해요.",
    emoji: "☀️",
    hue: 45,
    category: "자기계발",
    place: "성내동",
    count: "46명",
    status: "일정 모집 중",
    activity: { level: "active", posts7d: 8, meetups7d: 2 },
  },
  {
    title: "강동 영어 스터디 클럽",
    desc: "회화, 리스닝, 단어 인증을 요일별로 나눠 꾸준히 해요.",
    emoji: "💬",
    hue: 185,
    category: "자기계발",
    place: "강동구",
    count: "58명",
    status: "일정 모집 중",
    activity: { level: "active", posts7d: 11, meetups7d: 3 },
  },
  {
    title: "매일 영어 인증 챌린지",
    desc: "하루 10문장 말하기와 단어 인증이 활발한 영어 공부방이에요.",
    emoji: "🔥",
    hue: 15,
    category: "자기계발",
    place: "둔촌동",
    count: "94명",
    status: "3분 전 활동",
    activity: { level: "very", posts7d: 27, meetups7d: 5 },
  },
  {
    title: "주말 영어 프리토킹 모임",
    desc: "토픽을 정해 돌아가며 말하고 끝나면 표현 노트를 공유해요.",
    emoji: "🗣️",
    hue: 330,
    category: "자기계발",
    place: "천호동",
    count: "112명",
    status: "방금 전 활동",
    activity: { level: "very", posts7d: 34, meetups7d: 4 },
  },
];

/* ------------------------------------------------------------------ */
/* 추천 모임 가로 스크롤                                                 */
/* ------------------------------------------------------------------ */

function RecommendCarousel() {
  return (
    <Box
      className="no-scrollbar"
      onWheel={hScrollOnWheel}
      style={{ display: "flex", gap: 14, padding: "0 20px 16px", overflowX: "auto" }}
    >
      {recommendCards.map((card) => (
        <Box
          key={card.label}
          style={{ width: 96, flexShrink: 0, display: "flex", flexDirection: "column", gap: 8 }}
        >
          <Box style={{ position: "relative", width: 96, height: 96 }}>
            <PhotoTile emoji={card.emoji} hue={card.hue} size={96} radius={18} />
            <Box
              style={{
                position: "absolute",
                right: 4,
                bottom: 4,
                width: 28,
                height: 28,
                borderRadius: 999,
                background: "rgba(0,0,0,0.45)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <FixedIcon
                svg={<PlusIcon />}
                size={16}
                color="var(--seed-color-palette-static-white)"
              />
            </Box>
          </Box>
          <Text textStyle="t3Regular" maxLines={2} style={{ color: fgSubtle, textAlign: "center" }}>
            {card.label}
          </Text>
        </Box>
      ))}
    </Box>
  );
}

/* ------------------------------------------------------------------ */
/* 카테고리 탭 (밑줄 표시)                                               */
/* ------------------------------------------------------------------ */

function CategoryTabs({
  active,
  onChange,
}: {
  active: string;
  onChange: (c: string) => void;
}) {
  return (
    <Box
      className="no-scrollbar"
      onWheel={hScrollOnWheel}
      style={{
        display: "flex",
        gap: 22,
        padding: "0 20px",
        overflowX: "auto",
        borderBottom: `1px solid ${stroke}`,
      }}
    >
      {categories.map((cat) => {
        const isActive = cat === active;
        return (
          <Box
            as="button"
            key={cat}
            onClick={() => onChange(cat)}
            style={{
              border: "none",
              background: "transparent",
              cursor: "pointer",
              padding: "10px 0",
              flexShrink: 0,
              borderBottom: `3px solid ${isActive ? fg : "transparent"}`,
              marginBottom: -1,
            }}
          >
            <Text
              textStyle={isActive ? "t5Bold" : "t5Regular"}
              style={{ color: isActive ? fg : fgMuted, whiteSpace: "nowrap" }}
            >
              {cat}
            </Text>
          </Box>
        );
      })}
    </Box>
  );
}

/* ------------------------------------------------------------------ */
/* 추천 / 인기 서브 칩 (+ 정렬 드롭다운)                                  */
/* ------------------------------------------------------------------ */

const SORTS = ["추천순", "최신순"];

function PillChip({
  label,
  strong,
  suffix,
  onClick,
}: {
  label: string;
  strong?: boolean;
  suffix?: React.ReactNode;
  onClick?: () => void;
}) {
  return (
    <Box
      as="button"
      onClick={onClick}
      style={{
        display: "flex",
        alignItems: "center",
        gap: 4,
        border: `1px solid ${strong ? fg : stroke}`,
        background: layer,
        borderRadius: 999,
        padding: "8px 14px",
        cursor: "pointer",
      }}
    >
      <Text textStyle="t4Regular" style={{ color: fg }}>
        {label}
      </Text>
      {suffix}
    </Box>
  );
}

function SubFilters({
  popular,
  onSetPopular,
  sort,
  onSort,
}: {
  popular: boolean;
  onSetPopular: (v: boolean) => void;
  sort: string;
  onSort: (s: string) => void;
}) {
  const [open, setOpen] = useState(false);

  // 추천 칩: 인기 모드면 추천 페이지로 복귀, 추천 모드면 정렬 드롭다운 토글
  const onRecommendClick = () => {
    if (popular) {
      onSetPopular(false);
      setOpen(false);
    } else {
      setOpen((v) => !v);
    }
  };

  const onPopularClick = () => {
    if (!popular) {
      onSetPopular(true);
      setOpen(false);
    }
  };

  return (
    <Box style={{ position: "relative", padding: "14px 20px", display: "flex", gap: 8 }}>
      <PillChip
        label="추천"
        suffix={
          <FixedIcon
            svg={open && !popular ? <ChevronUpIcon /> : <ChevronDownIcon />}
            size={16}
            color={fg}
          />
        }
        onClick={onRecommendClick}
      />
      <PillChip label="인기" strong={popular} onClick={onPopularClick} />

      {/* 정렬 드롭다운 (추천 모드에서만) */}
      {open && !popular && (
        <>
          <Box
            style={{ position: "fixed", inset: 0, zIndex: 10 }}
            onClick={() => setOpen(false)}
          />
          <Box
            style={{
              position: "absolute",
              top: 54,
              left: 20,
              zIndex: 11,
              width: 150,
              background: layer,
              borderRadius: 12,
              boxShadow: "0 6px 20px rgba(0,0,0,0.16)",
              border: `1px solid ${stroke}`,
              overflow: "hidden",
            }}
          >
            {SORTS.map((s) => (
              <Box
                as="button"
                key={s}
                onClick={() => {
                  onSort(s);
                  setOpen(false);
                }}
                style={{
                  width: "100%",
                  textAlign: "left",
                  border: "none",
                  background: s === sort ? fill : "transparent",
                  cursor: "pointer",
                  padding: "14px 16px",
                }}
              >
                <Text textStyle="t5Regular" style={{ color: fg }}>
                  {s}
                </Text>
              </Box>
            ))}
          </Box>
        </>
      )}
    </Box>
  );
}

/* ------------------------------------------------------------------ */
/* 모임 카드                                                            */
/* ------------------------------------------------------------------ */

function MeetupCard({ meetup, onClick }: { meetup: Meetup; onClick?: () => void }) {
  return (
    <Box
      as="button"
      onClick={onClick}
      style={{
        display: "flex",
        gap: 14,
        padding: "14px 20px",
        width: "100%",
        border: "none",
        background: "transparent",
        cursor: onClick ? "pointer" : "default",
        textAlign: "left",
      }}
    >
      <PhotoTile emoji={meetup.emoji} hue={meetup.hue} size={96} radius={16} />

      <Box
        style={{
          flex: 1,
          minWidth: 0,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          gap: 5,
        }}
      >
        <Text textStyle="t5Bold" maxLines={1} style={{ color: fg }}>
          {meetup.title}
        </Text>
        <Text textStyle="t4Regular" maxLines={1} style={{ color: fgSubtle }}>
          {meetup.desc}
        </Text>

        {(meetup.place || meetup.count || meetup.status) && (
          <Box style={{ display: "flex", alignItems: "center", gap: 4, marginTop: 2, minWidth: 0 }}>
            {meetup.place && (
              <>
                <FixedIcon svg={<PinIcon />} size={15} />
                <Text textStyle="t3Regular" style={{ color: fgMuted }}>
                  {meetup.place}
                </Text>
              </>
            )}
            {meetup.count && (
              <>
                <Text textStyle="t3Regular" style={{ color: fgMuted }}>
                  ·
                </Text>
                <FixedIcon svg={<PersonIcon />} size={15} />
                <Text textStyle="t3Regular" style={{ color: fgMuted }}>
                  {meetup.count}
                </Text>
              </>
            )}
            {meetup.status && (
              <>
                <Text textStyle="t3Regular" style={{ color: fgMuted }}>
                  ·
                </Text>
                <Text textStyle="t3Regular" style={{ color: fgInformative }}>
                  {meetup.status}
                </Text>
              </>
            )}
          </Box>
        )}
      </Box>
    </Box>
  );
}

/* ------------------------------------------------------------------ */
/* 피드                                                                */
/* ------------------------------------------------------------------ */

export default function MeetupFeed() {
  const [category, setCategory] = useState("전체");
  const [popular, setPopular] = useState(false);
  const [sort, setSort] = useState("추천순");
  const [infoOpen, setInfoOpen] = useState(false);
  const [lastWeekOpen, setLastWeekOpen] = useState(false);
  const [about, setAbout] = useState<Meetup | null>(null);

  return (
    <Box as="main">
      <RecommendCarousel />
      {/* 캐러셀과 카테고리 탭 사이 회색 밴드 */}
      <Box style={{ height: 8, background: fill }} />
      <CategoryTabs active={category} onChange={setCategory} />
      <SubFilters
        popular={popular}
        onSetPopular={setPopular}
        sort={sort}
        onSort={setSort}
      />

      {popular ? (
        <WeeklyRanking
          category={category}
          onOpenInfo={() => setInfoOpen(true)}
          onOpenLastWeek={() => setLastWeekOpen(true)}
        />
      ) : (
        (() => {
          const visible = meetups.filter(
            (m) => category === "전체" || m.category === category,
          );
          if (visible.length === 0) {
            return (
              <Box style={{ padding: "80px 20px", textAlign: "center" }}>
                <Text textStyle="t5Regular" style={{ color: fgMuted }}>
                  아직 이 카테고리의 모임이 없어요.
                </Text>
              </Box>
            );
          }
          return visible.map((m, i) => (
            <Box key={m.title}>
              <MeetupCard
                meetup={m}
                onClick={m.category === "이벤트" ? undefined : () => setAbout(m)}
              />
              {i < visible.length - 1 && (
                <Box style={{ height: 1, background: stroke, margin: "0 20px" }} />
              )}
            </Box>
          ));
        })()
      )}

      {infoOpen && <RankingInfoSheet onClose={() => setInfoOpen(false)} />}
      {lastWeekOpen && <LastWeekRankingPage onBack={() => setLastWeekOpen(false)} />}
      {about && (
        <MeetupAbout
          meetup={{
            title: about.title,
            desc: about.desc,
            emoji: about.emoji,
            hue: about.hue,
            category: about.category,
            place: about.place,
            count: about.count,
            status: about.status,
            activity: about.activity,
          }}
          onBack={() => setAbout(null)}
        />
      )}
    </Box>
  );
}

