import MeetupAbout from "./MeetupAbout";

const catStudyMeetup = {
  title: "고양이와 함께하는 스터디 모임",
  desc: "| 고양이와 함께 아늑한 공간에서 스터디&힐링🧡 #…",
  emoji: "🐱",
  hue: 30,
  category: "자기계발",
  place: "길동",
  count: "147명",
  status: "일정 모집 중",
};

export default function App() {
  return <MeetupAbout meetup={catStudyMeetup} onBack={() => undefined} />;
}
