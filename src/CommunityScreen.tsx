import { useState } from "react";
import { Box, FloatingActionButton } from "@seed-design/react";
import { PlusIcon } from "./icons";
import { BottomNav, Header, SectionTabs, layer } from "./shared";
import CommunityFeed from "./CommunityFeed";
import MeetupFeed from "./MeetupFeed";

function Fab({ label }: { label: string }) {
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
      <FloatingActionButton.Root>
        <FloatingActionButton.Icon svg={<PlusIcon />} />
        <FloatingActionButton.Label>{label}</FloatingActionButton.Label>
      </FloatingActionButton.Root>
    </Box>
  );
}

export default function CommunityScreen() {
  const [activeTab, setActiveTab] = useState("모임");
  const isMeetup = activeTab === "모임";

  return (
    <Box
      style={{
        width: "100%",
        maxWidth: 420,
        minHeight: "100dvh",
        margin: "0 auto",
        background: layer,
        position: "relative",
        display: "flex",
        flexDirection: "column",
        boxShadow: "0 0 0 1px var(--seed-color-stroke-neutral-subtle)",
      }}
    >
      <Header />
      <SectionTabs active={activeTab} onChange={setActiveTab} />

      <Box style={{ flex: 1, paddingBottom: 96 }}>
        {isMeetup ? <MeetupFeed /> : <CommunityFeed />}
      </Box>

      <Fab label={isMeetup ? "모임 만들기" : "글쓰기"} />
      <BottomNav />
    </Box>
  );
}
