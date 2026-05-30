import { useState } from "react";
import CommunityScreen from "./CommunityScreen";
import CreateMeetup, { type MeetupDraft } from "./CreateMeetup";
import MeetupDetail from "./MeetupDetail";

type View = "community" | "create" | "detail";

export default function App() {
  const [view, setView] = useState<View>("community");
  const [created, setCreated] = useState<MeetupDraft | null>(null);

  if (view === "create") {
    return (
      <CreateMeetup
        onClose={() => setView("community")}
        onComplete={(draft) => {
          setCreated(draft);
          setView("detail");
        }}
      />
    );
  }

  if (view === "detail" && created) {
    return <MeetupDetail draft={created} onBack={() => setView("community")} />;
  }

  // 모임 만들기 플로우는 코드로 보존하되(위 분기) 진입 경로를 끊어 비활성화합니다.
  // "모임 만들기" 버튼은 보이지만 onCreateMeetup을 넘기지 않아 눌러도 동작하지 않습니다.
  return <CommunityScreen />;
}
