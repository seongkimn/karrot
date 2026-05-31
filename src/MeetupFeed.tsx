import { useState } from "react";
import { Box, Text } from "@seed-design/react";
import { ChevronDownIcon, ChevronUpIcon, PersonIcon, PinIcon, PlusIcon } from "./icons";
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
} from "./shared";
import {
  LastWeekRankingPage,
  RankingInfoSheet,
  WeeklyRanking,
} from "./MeetupRanking";
import MeetupAbout from "./MeetupAbout";

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

type Meetup = {
  title: string;
  desc: string;
  emoji: string;
  hue: number;
  category: string; // 카테고리 탭 필터용 ("이벤트"는 전체에서만 노출)
  place?: string;
  count?: string;
  status?: string;
};

const meetups: Meetup[] = [
  {
    title: "참여만 해도 100% 선물드려요",
    desc: "#우리모임자랑대회 시작!",
    emoji: "🎁",
    hue: 340,
    category: "이벤트",
  },
  {
    title: "고양이와 함께하는 스터디 모임",
    desc: "| 고양이와 함께 아늑한 공간에서 스터디&힐링🧡 #…",
    emoji: "🐱",
    hue: 30,
    category: "자기계발",
    place: "길동",
    count: "147명",
  },
  {
    title: "천호역 20대여자모임",
    desc: "타지에서 서울 올라온지 1년정도 지났는데 동네친구가…",
    emoji: "👭",
    hue: 300,
    category: "동네친구",
    place: "천호제3동",
    count: "26명",
    status: "일정 모집 중",
  },
  {
    title: "심심할 때 한판뜨는 뜨개질 모임🧶",
    desc: "🧶 대바늘, 코바늘 모두 환영하는 뜨개 모임입니다…",
    emoji: "🧶",
    hue: 20,
    category: "문화/예술",
    place: "천호제3동",
    count: "68명",
  },
  {
    title: "20대 동네친구 🌈",
    desc: "✅ 현재 인원 마감 상태입니다! 바로 참여는 어려우…",
    emoji: "🌈",
    hue: 190,
    category: "동네친구",
    place: "천호동",
    count: "33명",
    status: "일정 모집 중",
  },
  {
    title: "같이 밥 먹어요!",
    desc: "주중에 지친 당신들을 위로할 먹짱 모임 입니다 시간 :…",
    emoji: "🍚",
    hue: 40,
    category: "동네친구",
    place: "천호동",
    count: "57명",
    status: "일정 모집 중",
  },
  {
    title: "강동 주말 러닝크루 🏃",
    desc: "주말 아침 한강 따라 가볍게 달려요! 초보 환영🔥",
    emoji: "🏃",
    hue: 30,
    category: "운동",
    place: "천호동",
    count: "74명",
    status: "일정 모집 중",
  },
  {
    title: "남한산성 등산 모임 🥾",
    desc: "매주 토요일 아침 함께 산을 오릅니다. 하산 후 막걸리…",
    emoji: "🥾",
    hue: 130,
    category: "아웃도어/여행",
    place: "길동",
    count: "91명",
  },
  {
    title: "미사 캘리그라피 클래스 ✍️",
    desc: "손글씨로 마음을 적어요. 도구는 모두 준비해드려요!",
    emoji: "✍️",
    hue: 280,
    category: "자기계발",
    place: "미사동",
    count: "38명",
    status: "일정 모집 중",
  },
  {
    title: "강동 보드게임 한판 🎲",
    desc: "퇴근 후 보드게임으로 스트레스 풀어요. 룰 몰라도 OK!",
    emoji: "🎲",
    hue: 20,
    category: "문화/예술",
    place: "천호동",
    count: "44명",
  },
  {
    title: "우리 아이 함께 키워요 👶",
    desc: "비슷한 또래 아이 키우는 부모님들 정보 나눠요.",
    emoji: "👶",
    hue: 50,
    category: "가족/육아",
    place: "둔촌동",
    count: "62명",
    status: "일정 모집 중",
  },
  {
    title: "올림픽공원 산책 모임 🌳",
    desc: "선선한 저녁, 공원 한 바퀴 같이 걸어요.",
    emoji: "🌳",
    hue: 110,
    category: "아웃도어/여행",
    place: "오금동",
    count: "29명",
  },
  {
    title: "강아지 산책 메이트 🐕",
    desc: "퇴근 후 동네 한 바퀴! 우리 강아지 친구 만들어요.",
    emoji: "🐕",
    hue: 35,
    category: "반려동물",
    place: "천호동",
    count: "52명",
    status: "일정 모집 중",
  },
  {
    title: "강동 맛집 탐방대 🍜",
    desc: "주 1회 새로운 맛집 도장깨기! 혼밥 탈출하세요.",
    emoji: "🍜",
    hue: 25,
    category: "음식/음료",
    place: "둔촌동",
    count: "86명",
    status: "일정 모집 중",
  },
  {
    title: "주말 영화 같이 봐요 🎬",
    desc: "개봉작 같이 보고 카페에서 수다 떨어요.",
    emoji: "🎬",
    hue: 250,
    category: "취미/오락",
    place: "길동",
    count: "61명",
  },
  {
    title: "퇴근길 독서모임 📚",
    desc: "한 달에 한 권, 부담 없이 함께 읽고 나눠요.",
    emoji: "📚",
    hue: 30,
    category: "독서/인문학",
    place: "천호동",
    count: "47명",
  },
  {
    title: "우쿨렐레 합주단 🎸",
    desc: "악보 못 봐도 OK! 함께 연주하며 배워요.",
    emoji: "🎸",
    hue: 300,
    category: "음악/악기",
    place: "길동",
    count: "58명",
    status: "일정 모집 중",
  },
  {
    title: "강동구 자취생 모임 🏠",
    desc: "2030 자취생 모여서 정보도 나누고 같이 놀아요.",
    emoji: "🏠",
    hue: 200,
    category: "기타",
    place: "천호동",
    count: "132명",
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
          }}
          onBack={() => setAbout(null)}
        />
      )}
    </Box>
  );
}
