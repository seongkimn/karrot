import { useState } from "react";
import { Box, Chip, Text } from "@seed-design/react";
import { ChevronDownIcon, PersonIcon, PinIcon, PlusIcon } from "./icons";
import {
  FixedIcon,
  fg,
  fgInformative,
  fgMuted,
  fgSubtle,
  fill,
  stroke,
} from "./shared";

/* 모임 탭 피드 */

const recommendCards = [
  "UX를 공부하는 모임",
  "<길동>놀면뭐해 스터디 모임",
  "운동 모임",
  "자기계발 모임",
  "동네친구 모임",
];

const categories = [
  "전체",
  "자기계발",
  "문화/예술",
  "운동",
  "동네친구",
  "아웃도어/여행",
  "가족/육아",
];

type Meetup = {
  title: string;
  desc: string;
  place?: string;
  count?: string;
  status?: string;
};

const meetups: Meetup[] = [
  {
    title: "참여만 해도 100% 선물드려요",
    desc: "#우리모임자랑대회 시작!",
  },
  {
    title: "<길동>놀면뭐해 스터디 모임 📔💻🐈",
    desc: "| 고양이와 함께 아늑한 공간에서 스터디&힐링🧡 #…",
    place: "길동",
    count: "315명",
  },
  {
    title: "천호역 20대여자모임",
    desc: "타지에서 서울 올라온지 1년정도 지났는데 동네친구가…",
    place: "천호제3동",
    count: "14명",
    status: "일정 모집 중",
  },
  {
    title: "심심할 때 한판뜨는 뜨개질 모임🧶",
    desc: "🧶 대바늘, 코바늘 모두 환영하는 뜨개 모임입니다…",
    place: "천호제3동",
    count: "114명",
  },
  {
    title: "20대 동네친구 🌈",
    desc: "✅ 현재 인원 마감 상태입니다! 바로 참여는 어려우…",
    place: "천호동",
    count: "40명",
    status: "일정 모집 중",
  },
  {
    title: "같이 밥 먹어요!",
    desc: "주중에 지친 당신들을 위로할 먹짱 모임 입니다 시간 :…",
    place: "천호동",
    count: "82명",
    status: "일정 모집 중",
  },
];

/* ------------------------------------------------------------------ */
/* 추천 모임 가로 스크롤                                                 */
/* ------------------------------------------------------------------ */

function RecommendCarousel() {
  return (
    <Box
      style={{
        display: "flex",
        gap: 14,
        padding: "0 20px 16px",
        overflowX: "auto",
      }}
    >
      {recommendCards.map((label) => (
        <Box
          key={label}
          style={{
            width: 96,
            flexShrink: 0,
            display: "flex",
            flexDirection: "column",
            gap: 8,
          }}
        >
          {/* 썸네일 + 가입(+) 배지 */}
          <Box style={{ position: "relative", width: 96, height: 96 }}>
            <Box
              style={{
                width: 96,
                height: 96,
                borderRadius: 18,
                background: fill,
              }}
            />
            <Box
              style={{
                position: "absolute",
                right: 4,
                bottom: 4,
                width: 28,
                height: 28,
                borderRadius: 999,
                background: "rgba(0,0,0,0.45)",
                color: "var(--seed-color-palette-static-white)",
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
          <Text
            textStyle="t3Regular"
            maxLines={2}
            style={{ color: fgSubtle, textAlign: "center" }}
          >
            {label}
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
/* 추천 / 인기 서브 칩                                                   */
/* ------------------------------------------------------------------ */

function SubFilters() {
  return (
    <Box style={{ display: "flex", gap: 8, padding: "14px 20px" }}>
      <Chip.Root variant="outlineWeak">
        <Chip.Label>추천</Chip.Label>
        <Chip.SuffixIcon>
          <FixedIcon svg={<ChevronDownIcon />} color={fg} />
        </Chip.SuffixIcon>
      </Chip.Root>
      <Chip.Root variant="outlineWeak">
        <Chip.Label>인기</Chip.Label>
      </Chip.Root>
    </Box>
  );
}

/* ------------------------------------------------------------------ */
/* 모임 카드                                                            */
/* ------------------------------------------------------------------ */

function MeetupCard({ meetup }: { meetup: Meetup }) {
  return (
    <Box style={{ display: "flex", gap: 14, padding: "14px 20px" }}>
      {/* 썸네일 (좌측) */}
      <Box
        style={{
          width: 96,
          height: 96,
          borderRadius: 16,
          background: fill,
          flexShrink: 0,
        }}
      />

      {/* 텍스트 */}
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
          <Box
            style={{
              display: "flex",
              alignItems: "center",
              gap: 4,
              marginTop: 2,
              minWidth: 0,
            }}
          >
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

  return (
    <Box as="main">
      <RecommendCarousel />
      {/* 캐러셀과 카테고리 탭 사이 회색 밴드 */}
      <Box style={{ height: 8, background: fill }} />
      <CategoryTabs active={category} onChange={setCategory} />
      <SubFilters />

      {meetups.map((m, i) => (
        <Box key={i}>
          <MeetupCard meetup={m} />
          {i < meetups.length - 1 && (
            <Box style={{ height: 1, background: stroke, margin: "0 20px" }} />
          )}
        </Box>
      ))}
    </Box>
  );
}
