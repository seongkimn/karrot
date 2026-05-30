import { useState } from "react";
import { Box, Icon, Switch, Text } from "@seed-design/react";
import {
  BackIcon,
  BookIcon,
  CalendarIcon,
  ChatIcon,
  ChevronRightIcon,
  FireIcon,
  MenuIcon,
  PencilIcon,
  PeopleIcon,
  SearchIcon,
} from "./icons";
import { FixedIcon, brand, fg, fgMuted, fgSubtle, fill, layer, stroke } from "./shared";
import type { MeetupDraft } from "./CreateMeetup";

function HeaderIcon({
  svg,
  onClick,
  badge,
}: {
  svg: React.ReactNode;
  onClick?: () => void;
  badge?: boolean;
}) {
  return (
    <Box
      as="button"
      onClick={onClick}
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
            width: 7,
            height: 7,
            borderRadius: 999,
            background: brand,
          }}
        />
      )}
    </Box>
  );
}

const quickActions = [
  { label: "일정", icon: <CalendarIcon /> },
  { label: "챌린지", icon: <FireIcon /> },
  { label: "채팅", icon: <ChatIcon />, badge: true },
  { label: "멤버", icon: <PeopleIcon /> },
];

export default function MeetupDetail({
  draft,
  onBack,
}: {
  draft: MeetupDraft;
  onBack: () => void;
}) {
  const [tab, setTab] = useState("전체");
  const [popular, setPopular] = useState(false);

  return (
    <Box
      style={{
        width: "100%",
        maxWidth: 420,
        height: "100dvh",
        margin: "0 auto",
        background: layer,
        position: "relative",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
        boxShadow: "0 0 0 1px var(--seed-color-stroke-neutral-subtle)",
      }}
    >
      {/* 헤더 */}
      <Box
        as="header"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "12px 16px",
          flexShrink: 0,
        }}
      >
        <HeaderIcon svg={<BackIcon />} onClick={onBack} />
        <Box style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <HeaderIcon svg={<ChatIcon />} badge />
          <HeaderIcon svg={<SearchIcon />} />
          <HeaderIcon svg={<MenuIcon />} />
        </Box>
      </Box>

      {/* 스크롤 본문 */}
      <Box className="no-scrollbar" style={{ flex: 1, overflowY: "auto" }}>
        {/* 모임 정보 */}
        <Box style={{ display: "flex", alignItems: "center", gap: 12, padding: "8px 20px 16px" }}>
          <Box
            style={{
              width: 56,
              height: 56,
              borderRadius: 14,
              background: draft.photo ? fill : "#fde0e0",
              flexShrink: 0,
              overflow: "hidden",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 24,
            }}
          >
            {draft.photo ? (
              <img
                src={draft.photo}
                alt=""
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            ) : (
              "🖼️"
            )}
          </Box>
          <Box style={{ flex: 1, minWidth: 0 }}>
            <Box style={{ display: "flex", alignItems: "center", gap: 4 }}>
              <Text textStyle="t6Bold" maxLines={1} style={{ color: fg }}>
                {draft.name || "모임명"}
              </Text>
              <FixedIcon svg={<ChevronRightIcon />} size={18} color={fg} />
            </Box>
            <Text textStyle="t4Regular" style={{ color: fgMuted, display: "block", marginTop: 2 }}>
              {draft.region ?? "길동"} · 멤버 1
            </Text>
          </Box>
        </Box>

        {/* 퀵 액션 */}
        <Box style={{ display: "flex", padding: "4px 12px 20px" }}>
          {quickActions.map((a) => (
            <Box
              as="button"
              key={a.label}
              style={{
                flex: 1,
                border: "none",
                background: "transparent",
                cursor: "pointer",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 7,
                color: fg,
              }}
            >
              <Box style={{ position: "relative", width: 26, height: 26 }}>
                <Icon svg={a.icon} />
                {a.badge && (
                  <Box
                    style={{
                      position: "absolute",
                      top: -1,
                      right: -1,
                      width: 7,
                      height: 7,
                      borderRadius: 999,
                      background: brand,
                    }}
                  />
                )}
              </Box>
              <Text textStyle="t3Regular" style={{ color: fg }}>
                {a.label}
              </Text>
            </Box>
          ))}
        </Box>

        {/* 가이드북 배너 */}
        <Box style={{ padding: "0 20px" }}>
          <Box
            style={{
              display: "flex",
              alignItems: "center",
              gap: 14,
              border: `1px solid ${stroke}`,
              borderRadius: 12,
              padding: "16px 18px",
            }}
          >
            <Box
              style={{
                width: 40,
                height: 40,
                borderRadius: "50%",
                background: "var(--seed-color-bg-informative-subtle)",
                flexShrink: 0,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "var(--seed-color-fg-informative)",
              }}
            >
              <FixedIcon svg={<BookIcon />} size={20} color="var(--seed-color-fg-informative)" />
            </Box>
            <Box style={{ flex: 1, minWidth: 0 }}>
              <Text textStyle="t4Regular" style={{ color: fgMuted, display: "block" }}>
                멤버 모으는 꿀팁이 궁금하다면,
              </Text>
              <Text textStyle="t5Bold" style={{ color: fg }}>
                모임 운영 가이드북 살펴보기
              </Text>
            </Box>
            <FixedIcon svg={<ChevronRightIcon />} size={20} color={fgMuted} />
          </Box>
        </Box>

        {/* 캐러셀 점 */}
        <Box style={{ display: "flex", justifyContent: "center", gap: 6, padding: "16px 0 20px" }}>
          {[0, 1, 2].map((i) => (
            <Box
              key={i}
              style={{
                width: 7,
                height: 7,
                borderRadius: 999,
                background: i === 0 ? brand : "var(--seed-color-bg-layer-fill)",
              }}
            />
          ))}
        </Box>

        {/* 게시판 탭 */}
        <Box style={{ display: "flex", alignItems: "center", gap: 8, padding: "0 20px" }}>
          {["전체", "자유 게시판"].map((t) => {
            const active = t === tab;
            return (
              <Box
                as="button"
                key={t}
                onClick={() => setTab(t)}
                style={{
                  border: active ? "none" : `1px solid ${stroke}`,
                  background: active ? fg : layer,
                  color: active ? "var(--seed-color-fg-neutral-inverted)" : fg,
                  borderRadius: 999,
                  padding: "8px 16px",
                  cursor: "pointer",
                }}
              >
                <Text textStyle="t4Bold" style={{ color: "inherit" }}>
                  {t}
                </Text>
              </Box>
            );
          })}
          <Box
            as="button"
            style={{
              border: "none",
              background: fill,
              borderRadius: 999,
              padding: "8px 14px",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: 4,
              color: fg,
            }}
          >
            <Text textStyle="t4Regular" style={{ color: fg }}>
              + 추가
            </Text>
          </Box>
        </Box>

        {/* 인기순 토글 */}
        <Box style={{ display: "flex", alignItems: "center", gap: 8, padding: "16px 20px 0" }}>
          <Switch.Root checked={popular} onCheckedChange={setPopular}>
            <Switch.Control>
              <Switch.Thumb />
            </Switch.Control>
            <Switch.HiddenInput />
          </Switch.Root>
          <Text textStyle="t4Regular" style={{ color: fgSubtle }}>
            인기순으로 보기
          </Text>
        </Box>

        {/* 빈 상태 */}
        <Box
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 6,
            padding: "120px 20px 40px",
          }}
        >
          <Text textStyle="t5Regular" style={{ color: fgMuted }}>
            아직 게시글이 없어요.
          </Text>
          <Text textStyle="t5Regular" style={{ color: fgMuted }}>
            가장 먼저 게시글을 남겨보세요.
          </Text>
        </Box>
      </Box>

      {/* 글쓰기 FAB + 말풍선 */}
      <Box style={{ position: "absolute", right: 16, bottom: 24 }}>
        <Box
          style={{
            position: "absolute",
            right: 0,
            bottom: 64,
            background: fg,
            borderRadius: 10,
            padding: "10px 14px",
            width: 210,
            boxShadow: "0 4px 12px rgba(0,0,0,0.18)",
          }}
        >
          <Text
            textStyle="t4Bold"
            style={{ color: "var(--seed-color-fg-neutral-inverted)", display: "block", lineHeight: 1.35 }}
          >
            게시글을 작성하고
            <br />
            모임을 홍보해보세요!
          </Text>
          {/* 꼬리 */}
          <Box
            style={{
              position: "absolute",
              right: 28,
              bottom: -6,
              width: 12,
              height: 12,
              background: fg,
              transform: "rotate(45deg)",
            }}
          />
        </Box>
        <Box
          as="button"
          style={{
            display: "flex",
            alignItems: "center",
            gap: 6,
            background: brand,
            color: "var(--seed-color-palette-static-white)",
            border: "none",
            borderRadius: 999,
            padding: "14px 20px",
            cursor: "pointer",
            boxShadow: "0 4px 12px rgba(0,0,0,0.18)",
          }}
        >
          <FixedIcon svg={<PencilIcon />} size={18} color="var(--seed-color-palette-static-white)" />
          <Text textStyle="t5Bold" style={{ color: "var(--seed-color-palette-static-white)" }}>
            글쓰기
          </Text>
        </Box>
      </Box>
    </Box>
  );
}
