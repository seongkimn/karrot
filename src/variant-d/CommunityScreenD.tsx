import { useState } from "react";
import { Box, FloatingActionButton } from "@seed-design/react";
import { PlusIcon } from "../icons";
import { BottomNav, Header, SectionTabs, layer } from "../shared";
import CommunityFeed from "./CommunityFeedD";
import MeetupFeed from "./MeetupFeedD";

function Fab({ label, onClick }: { label: string; onClick?: () => void }) {
  return (
    <Box
      style={{
        position: "absolute",
        right: 16,
        bottom: 84,
        boxShadow: "0 4px 12px rgba(0,0,0,0.18)",
        borderRadius: 999,
      }}
    >
      <FloatingActionButton.Root onClick={onClick}>
        <FloatingActionButton.Icon svg={<PlusIcon />} />
        <FloatingActionButton.Label>{label}</FloatingActionButton.Label>
      </FloatingActionButton.Root>
    </Box>
  );
}

export default function CommunityScreen({
  onCreateMeetup,
}: {
  onCreateMeetup?: () => void;
}) {
  const [activeTab, setActiveTab] = useState("모임");
  const isMeetup = activeTab === "모임";

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
      <Header />
      <SectionTabs active={activeTab} onChange={setActiveTab} />

      {/* 헤더/탭/하단 네비는 고정, 이 영역만 스크롤됩니다(스크롤바 숨김). */}
      <Box
        className="no-scrollbar"
        style={{ flex: 1, overflowY: "auto", paddingBottom: 16 }}
      >
        {isMeetup ? <MeetupFeed /> : <CommunityFeed />}
      </Box>

      <Fab
        label={isMeetup ? "모임 만들기" : "글쓰기"}
        onClick={isMeetup ? onCreateMeetup : undefined}
      />
      <BottomNav />
    </Box>
  );
}

