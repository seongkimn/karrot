import { Box, Icon, NotificationBadge, Text } from "@seed-design/react";
import {
  ArrowUpRightIcon,
  BellIcon,
  ChatIcon,
  CommunityIcon,
  HomeIcon,
  MapIcon,
  MenuIcon,
  PersonIcon,
  SearchIcon,
} from "./icons";

/* ------------------------------------------------------------------ */
/* 디자인 토큰 헬퍼                                                      */
/* ------------------------------------------------------------------ */

export const fg = "var(--seed-color-fg-neutral)";
export const fgSubtle = "var(--seed-color-fg-neutral-subtle)";
export const fgMuted = "var(--seed-color-fg-neutral-muted)";
export const fgInformative = "var(--seed-color-fg-informative)";
export const layer = "var(--seed-color-bg-layer-default)";
export const fill = "var(--seed-color-bg-layer-fill)";
export const stroke = "var(--seed-color-stroke-neutral-subtle)";

export const sectionTabs = ["동네생활", "모임", "카페", "아파트"];

/* ------------------------------------------------------------------ */
/* 작은 공용 컴포넌트                                                    */
/* ------------------------------------------------------------------ */

/** 고정 크기 박스 안에서 currentColor로 그려지는 아이콘 */
export function FixedIcon({
  svg,
  size = 16,
  color = fgMuted,
}: {
  svg: React.ReactNode;
  size?: number;
  color?: string;
}) {
  return (
    <Box style={{ width: size, height: size, color, flexShrink: 0 }}>
      <Icon svg={svg} />
    </Box>
  );
}

function HeaderIconButton({
  svg,
  badge,
}: {
  svg: React.ReactNode;
  badge?: boolean;
}) {
  return (
    <Box
      as="button"
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
            width: 8,
            height: 8,
            borderRadius: 999,
            background: "var(--seed-color-bg-brand-solid)",
          }}
        />
      )}
    </Box>
  );
}

export function Header() {
  return (
    <Box
      as="header"
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "16px 20px 12px",
      }}
    >
      <Text as="h1" textStyle="t8Bold" style={{ color: fg }}>
        커뮤니티
      </Text>
      <Box style={{ display: "flex", alignItems: "center", gap: 18 }}>
        <HeaderIconButton svg={<SearchIcon />} />
        <HeaderIconButton svg={<BellIcon />} badge />
        <HeaderIconButton svg={<MenuIcon />} />
      </Box>
    </Box>
  );
}

export function SectionTabs({
  active,
  onChange,
}: {
  active: string;
  onChange: (t: string) => void;
}) {
  return (
    <Box
      style={{
        display: "flex",
        alignItems: "center",
        gap: 18,
        padding: "4px 20px 14px",
      }}
    >
      {sectionTabs.map((tab) => {
        const isActive = tab === active;
        const isApart = tab === "아파트";
        return (
          <Box
            as="button"
            key={tab}
            onClick={() => onChange(tab)}
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
            <Text
              textStyle={isActive ? "t7Bold" : "t7Regular"}
              style={{ color: isActive ? fg : fgMuted }}
            >
              {tab}
            </Text>
            {isApart && <FixedIcon svg={<ArrowUpRightIcon />} size={16} />}
          </Box>
        );
      })}
    </Box>
  );
}

const bottomNav = [
  { label: "홈", icon: <HomeIcon /> },
  { label: "커뮤니티", icon: <CommunityIcon />, active: true },
  { label: "동네지도", icon: <MapIcon /> },
  { label: "채팅", icon: <ChatIcon />, badge: "5" },
  { label: "나의 당근", icon: <PersonIcon /> },
];

export function BottomNav() {
  return (
    <Box
      as="nav"
      style={{
        position: "absolute",
        left: 0,
        right: 0,
        bottom: 0,
        height: 76,
        display: "flex",
        background: layer,
        borderTop: `1px solid ${stroke}`,
        paddingBottom: 8,
      }}
    >
      {bottomNav.map((item) => {
        const color = item.active ? fg : fgMuted;
        return (
          <Box
            as="button"
            key={item.label}
            style={{
              flex: 1,
              border: "none",
              background: "transparent",
              cursor: "pointer",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 4,
              paddingTop: 8,
              color,
            }}
          >
            <Box style={{ position: "relative", width: 26, height: 26 }}>
              <Icon svg={item.icon} />
              {item.badge && (
                <Box style={{ position: "absolute", top: -6, right: -8 }}>
                  <NotificationBadge>{item.badge}</NotificationBadge>
                </Box>
              )}
            </Box>
            <Text
              textStyle="t1Regular"
              style={{ color, fontWeight: item.active ? 700 : 400 }}
            >
              {item.label}
            </Text>
          </Box>
        );
      })}
    </Box>
  );
}
