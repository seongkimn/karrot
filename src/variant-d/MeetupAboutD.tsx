import { useState } from "react";
import { Box, Icon, Text } from "@seed-design/react";
import {
  BackIcon,
  BellIcon,
  CalendarIcon,
  ChatIcon,
  CheckCircleIcon,
  ChevronRightIcon,
  ClockIcon,
  FireIcon,
  HeartIcon,
  LeafIcon,
  LockIcon,
  MoreIcon,
  PeopleIcon,
  PinFilledIcon,
  PinIcon,
  ShareIcon,
  ShieldCheckIcon,
  ThumbsUpIcon,
} from "../icons";
import {
  FixedIcon,
  brand,
  fg,
  fgInformative,
  fgMuted,
  fgSubtle,
  fill,
  layer,
  stroke,
} from "../shared";
import ScheduleReviewFeed from "./ScheduleReviewFeedD";
import ScheduleFeed from "./ScheduleFeedD";
import ChallengeFeed from "./ChallengeFeedD";
import PostFeed from "./PostFeedD";
import type { ReviewPost } from "./ScheduleReviewFeedD";
import type { SchedulePreviewReview } from "./ScheduleFeedD";

/* 모임 가입 전 공개 소개(랜딩) 페이지 — 피드 카드를 누르면 열립니다. */

export type MeetupAboutTarget = {
  title: string;
  emoji: string;
  hue: number;
  desc?: string;
  category?: string;
  place?: string;
  count?: string;
  status?: string;
  activity?: {
    level: "quiet" | "active" | "very";
    posts7d: number;
    meetups7d: number;
  };
};

/* 소개 본문(이모지 + 단락). 스크린샷의 뜨개질 모임 소개를 그대로 옮깁니다. */
const DESCRIPTION: { emoji: string; lines: string[] }[] = [
  { emoji: "🧶", lines: ["대바늘, 코바늘 모두 환영하는 뜨개 모임입니다."] },
  {
    emoji: "🎀",
    lines: [
      "주로 주말/공휴일 강동역 부근에서 모여요.",
      "처음 오시는 분들도 언제나 환영합니다!",
    ],
  },
  {
    emoji: "🔍",
    lines: [
      "휴일이 아니라도 자유롭게",
      "원하는 시간, 장소에서 모임을 여셔도 돼요.",
      "시간 맞는 분들끼리 모여 즐겁게",
      "한 코 한 코 떠보아요 🧶",
    ],
  },
];

/* 게시글·일정·관심 통계 */
const STATS: { label: string; value: string }[] = [
  { label: "게시글", value: "126" },
  { label: "일정", value: "38" },
  { label: "관심", value: "91" },
];

/* 일정 후기 카드 (이모지 없이 사진 톤만 표현) */
const REVIEWS: { hue: number; likes: number; comments?: number; author: string }[] = [
  { hue: 25, likes: 6, comments: 2, author: "아뜨" },
  { hue: 200, likes: 4, author: "일리" },
  { hue: 230, likes: 7, author: "나로" },
];

/* 모임장 활동 통계 */
const HOST_STATS: { label: string; value: string }[] = [
  { label: "모임 방문", value: "1284" },
  { label: "최근 방문", value: "3시간 전" },
  { label: "일정 참여", value: "42" },
];

/* 멤버 목록 (일부) */
const MEMBERS: { name: string; region: string; desc?: string }[] = [
  { name: "후추", region: "성내제1동", desc: "주로 성인의류 아가 소품 뜹니다 :-)" },
  { name: "호호하하", region: "천호제2동" },
  { name: "곰곰", region: "잠실6동", desc: "반갑습니다 ^^" },
  { name: "써니_", region: "성내제2동" },
  { name: "고은", region: "길동" },
];

/* 일정 목록 (모두 종료 상태) */
const SCHEDULES: { month: string; day: string; title: string; locked?: boolean; time: string; people: string }[] = [
  { month: "5월", day: "23", title: "모임에만 공개된 일정이에요.", locked: true, time: "오후 12:00", people: "5/7명" },
  { month: "5월", day: "13", title: "카페 뜨개 ☕", time: "오전 10:30", people: "6/6명" },
  { month: "5월", day: "9", title: "모임에만 공개된 일정이에요.", locked: true, time: "오후 12:00", people: "4/8명" },
];

/* 챌린지 목록 */
const CHALLENGES: { title: string; status: string; ongoing?: boolean; period: string; people: string }[] = [
  { title: "6월 매일뜨개 챌린지", status: "D-2", ongoing: true, period: "1년 동안 · 매일", people: "6명 참여" },
  { title: "5월 매일뜨개 챌린지", status: "진행 30일차", ongoing: true, period: "1년 동안 · 매일", people: "8명 참여" },
  { title: "4월 매일뜨개 챌린지", status: "종료", period: "1년 동안 · 매일", people: "11명 참여" },
];

/* 게시판 탭 */
const POST_TABS = ["전체", "가입인사", "일정 후기", "자유 게시판", "완성했어요"];

/* 게시글 */
type Post = {
  author: string;
  verified?: boolean;
  time: string;
  board: string;
  lines?: string[];
  truncate?: boolean;
  locked?: boolean;
  photo?: boolean;
  challenge?: { title: string; sub: string };
  likes: number;
  comments: number;
  views: number;
};
const POSTS: Post[] = [
  {
    author: "닛콩",
    verified: true,
    time: "6분 전",
    board: "자유 게시판",
    lines: [
      "요크 줄임 한번 남았을 때",
      "양 쪽 앞판 코수가 다른 것을 확인 했어요",
      "⚡⚡⚡⚡⚡",
      "몸판 코 나눌 때부터 잘못 나눈걸 모르고",
      "앞판 보고 달린 것이죠",
    ],
    truncate: true,
    photo: true,
    challenge: { title: "5월 매일뜨개 챌린지", sub: "1년 챌린지 · 8명 참여" },
    likes: 2,
    comments: 1,
    views: 11,
  },
  {
    author: "후추",
    time: "2시간 전",
    board: "가입인사",
    lines: [
      "안녕하세요:-)",
      "아기옷도 뜨고 성인옷도 뜨고",
      "주로 대바늘을 뜨고 있습니다🥰",
      "잘부탁드립니다❤️🤍",
    ],
    likes: 5,
    comments: 2,
    views: 19,
  },
  {
    author: "유부장",
    verified: true,
    time: "1일 전",
    board: "완성했어요",
    locked: true,
    likes: 4,
    comments: 1,
    views: 13,
  },
];

/* 추천 모임 */
const RECOMMEND_MEETUPS: { title: string; desc: string; region: string; count: string; active?: string }[] = [
  { title: "천호역 20대여자모임", desc: "타지에서 서울 올라온지 1년정도 지났는데 동네친구가 ..", region: "천호제3동", count: "18명" },
  { title: "신생 🔥 좋은 모임 찾다 빡쳐서 💥 만든 모임", desc: "와썹💗 3040 강동 송파 하남 광진 욜로로 맛집🍴", region: "천호동", count: "31명" },
  { title: "💘2030💘 신생방 송파.강동.중랑.건대", desc: "💕 신생방이라 아직 사람은 적지만 즐겁고 재밌게 노..", region: "역삼동", count: "47명" },
  { title: "8090(강동솔로친목)함께해요! 🥰", desc: "신입환영! 8090 강동송파 솔로 친목모임! 안녕하..", region: "천호동", count: "54명" },
  { title: "분위기 좋은 카페에서 취미생활 🧑‍🍳", desc: "분위기 좋은 카페에서 맛있는 음료와 다양한 취미..", region: "자양동", count: "28명" },
  { title: "틈만나면2 강동송파하남 4050모여! 😍", desc: "강동 · 송파 · 하남 40~50대 소규모 신생모임 멤..", region: "천호동", count: "12명", active: "36분 전 활동" },
];

/* 추천 온라인 카페 */
const ONLINE_CAFES: { title: string; count: string }[] = [
  { title: "취미모임", count: "22명" },
  { title: "🏠 집콕러 생활연구소 🏠", count: "186명" },
  { title: "🐾 모든 귀여움을 공유해요 🐾", count: "143명" },
];

type MeetupContent = {
  description: typeof DESCRIPTION;
  categoryLabel: string;
  meetingPlace: { name: string; meta: string };
  reviews: typeof REVIEWS;
  hostName: string;
  hostStats: typeof HOST_STATS;
  hostReview: string;
  members: typeof MEMBERS;
  schedules: typeof SCHEDULES;
  challenges: typeof CHALLENGES;
  postTabs: string[];
  posts: Post[];
  scheduleReviews: ReviewPost[];
  schedulePreviewReviews: SchedulePreviewReview[];
  stats: typeof STATS;
};

function titleIncludes(meetup: MeetupAboutTarget, keyword: string) {
  return meetup.title.includes(keyword);
}

function isEnglishStudy(meetup: MeetupAboutTarget) {
  return ["영어", "회화", "프리토킹"].some((keyword) => titleIncludes(meetup, keyword));
}

function getEnglishStudyContent(meetup: MeetupAboutTarget, base: MeetupContent): MeetupContent {
  const level = meetup.activity?.level ?? "active";
  const quiet = level === "quiet";
  const very = level === "very";
  const place = meetup.place ?? "강동구";
  const title = meetup.title;
  const toneLine = quiet
    ? "천천히 오래 이어가는 분위기라 처음 영어를 다시 시작하는 분들도 부담 없이 참여해요."
    : very
      ? "매일 인증과 번개가 빠르게 올라와서 짧게라도 자주 영어를 쓰고 싶은 분들이 많아요."
      : "정기 일정과 인증 글이 꾸준히 올라와서 공부 리듬을 만들기 좋은 모임이에요.";

  return {
    ...base,
    categoryLabel: "자기계발",
    description: [
      { emoji: meetup.emoji, lines: [`${place} 근처에서 영어 공부를 함께 이어가는 모임입니다.`] },
      { emoji: "💬", lines: [toneLine] },
      { emoji: "📒", lines: [meetup.desc?.replace("…", ".") ?? "표현 정리, 회화 연습, 인증 글을 각자 속도에 맞춰 나눠요."] },
    ],
    meetingPlace: quiet
      ? { name: `${place} 조용한 카페`, meta: `${place} · 소규모 · 조용한 자리 선호` }
      : very
        ? { name: `${place} 스터디 라운지`, meta: `${place} · 예약석 운영 · 주말 프리토킹` }
        : { name: `${place} 영어 스터디 카페`, meta: `${place} · 화이트보드/와이파이 가능` },
    hostName: quiet ? "서윤" : very ? "리나" : "하준",
    hostStats: quiet
      ? [
          { label: "모임 방문", value: "184" },
          { label: "최근 방문", value: "2일 전" },
          { label: "일정 참여", value: "6" },
        ]
      : very
        ? [
            { label: "모임 방문", value: "1320" },
            { label: "최근 방문", value: "40분 전" },
            { label: "일정 참여", value: "46" },
          ]
        : [
            { label: "모임 방문", value: "642" },
            { label: "최근 방문", value: "6시간 전" },
            { label: "일정 참여", value: "18" },
          ],
    hostReview: quiet
      ? "11명의 멤버에게 '🧡 또 만나고 싶어요' 평가를 받았어요."
      : very
        ? "48명의 멤버에게 '🧡 또 만나고 싶어요' 평가를 받았어요."
        : "26명의 멤버에게 '🧡 또 만나고 싶어요' 평가를 받았어요.",
    members: quiet
      ? [
          { name: "유진", region: "천호동", desc: "영어 문장 읽기부터 다시 시작하고 있어요." },
          { name: "태오", region: "길동" },
          { name: "나은", region: "성내동", desc: "주말 오전 일정 선호합니다." },
          { name: "현", region: "오금동" },
          { name: "솔", region: "둔촌동" },
        ]
      : very
        ? [
            { name: "민지", region: "둔촌동", desc: "매일 영어 인증 도전 중이에요." },
            { name: "오웬", region: "천호동", desc: "프리토킹 자주 참여합니다." },
            { name: "하린", region: "성내동" },
            { name: "준", region: "길동", desc: "표현 노트 공유 좋아해요." },
            { name: "세아", region: "암사동" },
          ]
        : [
            { name: "도윤", region: "성내동", desc: "아침 회화 루틴 만들고 있어요." },
            { name: "민서", region: "길동", desc: "영어 면접 준비 중입니다." },
            { name: "라온", region: "천호동" },
            { name: "해나", region: "강동구", desc: "리스닝 인증 같이 해요." },
            { name: "준", region: "둔촌동" },
          ],
    schedules: quiet
      ? [
          { month: "6월", day: "8", title: `${title} 첫 모임`, time: "오후 7:30", people: "2/5명" },
          { month: "6월", day: "22", title: "모임에만 공개된 일정이에요.", locked: true, time: "오후 7:30", people: "1/5명" },
        ]
      : very
        ? [
            { month: "6월", day: "1", title: "주말 영어 프리토킹 90분", time: "오전 10:30", people: "9/10명" },
            { month: "6월", day: "4", title: "평일 밤 표현 인증 번개", time: "오후 9:00", people: "7/8명" },
            { month: "6월", day: "8", title: "모임에만 공개된 일정이에요.", locked: true, time: "오후 2:00", people: "8/10명" },
          ]
        : [
            { month: "6월", day: "3", title: "아침 30분 영어회화", time: "오전 8:00", people: "5/8명" },
            { month: "6월", day: "10", title: "리스닝 표현 정리 모임", time: "오후 7:30", people: "6/9명" },
            { month: "6월", day: "17", title: "모임에만 공개된 일정이에요.", locked: true, time: "오후 7:30", people: "4/8명" },
          ],
    challenges: quiet
      ? [
          { title: "영어 문장 10개 필사 챌린지", status: "진행 3일차", ongoing: true, period: "2주 동안 · 주 3일", people: "5명 참여" },
          { title: "원서 한 챕터 읽기", status: "D-5", ongoing: true, period: "2주 동안 · 자유", people: "4명 참여" },
          { title: "5월 영어 다시 시작 챌린지", status: "종료", period: "1개월 동안 · 주 2일", people: "6명 참여" },
        ]
      : very
        ? [
            { title: "매일 10문장 말하기 인증", status: "진행 12일차", ongoing: true, period: "30일 동안 · 매일", people: "31명 참여" },
            { title: "주말 프리토킹 출석 챌린지", status: "D-2", ongoing: true, period: "4주 동안 · 매주", people: "22명 참여" },
            { title: "5월 표현 노트 공유 챌린지", status: "종료", period: "1개월 동안 · 매일", people: "28명 참여" },
          ]
        : [
            { title: "아침 영어 루틴 만들기", status: "진행 7일차", ongoing: true, period: "4주 동안 · 주 4일", people: "13명 참여" },
            { title: "회화 표현 50개 모으기", status: "D-3", ongoing: true, period: "2주 동안 · 자유", people: "10명 참여" },
            { title: "5월 리스닝 인증 챌린지", status: "종료", period: "1개월 동안 · 주 3일", people: "12명 참여" },
          ],
    postTabs: ["전체", "가입인사", "영어 인증", "표현 공유", "일정 후기"],
    posts: quiet
      ? [
          { author: "유진", verified: true, time: "2일 전", board: "영어 인증", lines: ["오늘 읽은 문장 5개만 조용히 남겨요.", "다음 모임 전까지 한 챕터 더 읽어보겠습니다."], likes: 2, comments: 0, views: 9 },
          { author: "서윤", time: "5일 전", board: "표현 공유", lines: ["이번 주 표현 정리 파일 올려둘게요.", "필요한 분들은 편하게 참고해주세요."], likes: 3, comments: 1, views: 14 },
        ]
      : very
        ? [
            { author: "리나", verified: true, time: "8분 전", board: "일정 후기", lines: ["오늘 프리토킹 10명 꽉 차서 진행했어요.", "나왔던 표현은 댓글에 정리해둘게요!"], photo: true, likes: 14, comments: 6, views: 58 },
            { author: "오웬", time: "31분 전", board: "영어 인증", lines: ["Day 12 말하기 인증 완료했습니다.", "내일은 여행 토픽으로 연습해볼게요."], challenge: { title: "매일 10문장 말하기 인증", sub: "30일 챌린지 · 31명 참여" }, likes: 12, comments: 4, views: 47 },
            { author: "민지", verified: true, time: "1시간 전", board: "표현 공유", lines: ["오늘 나온 표현 7개 정리했어요.", "프리토킹 오시는 분들 미리 보고 오셔도 좋아요."], likes: 16, comments: 5, views: 63 },
          ]
        : [
            { author: "도윤", verified: true, time: "35분 전", board: "영어 인증", lines: ["아침 30분 회화 루틴 인증합니다.", "오늘은 음식 주문 표현 위주로 연습했어요."], challenge: { title: "아침 영어 루틴 만들기", sub: "4주 챌린지 · 13명 참여" }, likes: 7, comments: 2, views: 26 },
            { author: "해나", time: "3시간 전", board: "표현 공유", lines: ["회의에서 쓸 수 있는 표현 몇 개 공유해요.", "다음 모임 때 같이 소리 내서 읽어봐요."], likes: 8, comments: 3, views: 31 },
            { author: "민서", time: "1일 전", board: "가입인사", lines: ["영어 면접 준비하면서 꾸준히 말해보고 싶어서 들어왔어요.", "잘 부탁드립니다."], likes: 5, comments: 1, views: 18 },
          ],
    scheduleReviews: quiet
      ? [
          { author: "태오", badge: "verified", time: "1주 전 · 일정 후기", text: ["사람이 많지 않아서 차분하게 읽고 이야기하기 좋았어요."], photos: 0, likes: 3, views: 11 },
        ]
      : very
        ? [
            { author: "하린", badge: "verified", time: "2일 전 · 일정 후기", text: ["토픽이 빨리빨리 바뀌어서 영어로 말할 기회가 많았어요.", "끝나고 표현 정리까지 공유돼서 좋았습니다."], photos: 2, likes: 15, comments: 4, views: 51 },
            { author: "준", badge: "host", time: "3일 전 · 일정 후기", text: ["처음 온 분들도 바로 참여할 수 있게 짝을 잘 나눴어요."], photos: 1, likes: 11, comments: 2, views: 42 },
          ]
        : [
            { author: "라온", badge: "verified", time: "4일 전 · 일정 후기", text: ["짧은 시간이지만 꾸준히 말할 수 있어서 좋았어요."], photos: 1, likes: 7, comments: 1, views: 24 },
            { author: "준", badge: "host", time: "1주 전 · 일정 후기", text: ["다음 주에는 여행 표현으로 이어가보겠습니다."], photos: 0, likes: 6, views: 19 },
          ],
    schedulePreviewReviews: quiet
      ? [{ likes: 3, author: "태오", text: "사람이 많지 않아서 차분하게 읽고 이야기하기 좋았어요." }]
      : very
        ? [
            { likes: 15, author: "하린", text: "영어로 말할 기회가 많았어요." },
            { likes: 11, author: "준", text: "처음 온 분들도 바로 참여할 수 있게..." },
          ]
        : [
            { likes: 7, author: "라온", text: "짧은 시간이지만 꾸준히 말할 수 있어서 좋았어요." },
            { likes: 6, author: "준", text: "다음 주에는 여행 표현으로 이어가보겠습니다." },
          ],
    stats: quiet
      ? [
          { label: "게시글", value: "9" },
          { label: "일정", value: "3" },
          { label: "관심", value: "18" },
        ]
      : very
        ? [
            { label: "게시글", value: "98" },
            { label: "일정", value: "18" },
            { label: "관심", value: "126" },
          ]
        : [
            { label: "게시글", value: "37" },
            { label: "일정", value: "8" },
            { label: "관심", value: "44" },
          ],
  };
}

function getMeetupContent(meetup: MeetupAboutTarget): MeetupContent {
  const categoryLabel = meetup.category && meetup.category !== "이벤트" ? meetup.category : "취미/오락";

  const base: MeetupContent = {
    description: DESCRIPTION,
    categoryLabel,
    meetingPlace: { name: "투썸플레이스 강동역점", meta: "735m · 강동구 천호동 · 후기 24" },
    reviews: REVIEWS,
    hostName: "오리",
    hostStats: HOST_STATS,
    hostReview: "27명의 멤버에게 '🧡 또 만나고 싶어요' 평가를 받았어요.",
    members: MEMBERS,
    schedules: SCHEDULES,
    challenges: CHALLENGES,
    postTabs: POST_TABS,
    posts: POSTS,
    scheduleReviews: [
      {
        author: "하늘",
        badge: "host",
        time: "3일 전 · 일정 후기",
        text: ["처음 온 분들도 금방 편해질 만큼 분위기가 좋았어요.", "다음 일정도 같이 참여하고 싶습니다."],
        photos: 2,
        likes: 6,
        views: 21,
      },
      {
        author: "도담",
        badge: "verified",
        time: "1주 전 · 일정 후기",
        text: ["가볍게 참여했는데 생각보다 이야기가 잘 통해서 즐거웠어요."],
        photos: 1,
        likes: 5,
        comments: 2,
        views: 16,
      },
    ],
    schedulePreviewReviews: [
      { likes: 6, author: "하늘", text: "처음 온 분들도 금방 편해질 만큼 분위기가 좋았어요." },
      { likes: 5, author: "도담", text: "가볍게 참여했는데 생각보다 이야기가 잘 통해서..." },
    ],
    stats: STATS,
  };

  if (isEnglishStudy(meetup)) {
    return getEnglishStudyContent(meetup, base);
  }

  if (titleIncludes(meetup, "스터디")) {
    return {
      ...base,
      categoryLabel: "자기계발",
      description: [
        { emoji: "📚", lines: ["길동에서 조용히 집중하고 싶은 이웃들이 모이는 스터디 모임입니다."] },
        { emoji: "🐱", lines: ["반려묘가 있는 아늑한 공간에서 각자 할 일을 챙기고, 쉬는 시간에는 가볍게 수다 나눠요."] },
        { emoji: "💻", lines: ["자격증, 포트폴리오, 독서, 코딩 공부까지 주제가 달라도 괜찮아요. 꾸준히 앉아 있는 힘을 같이 만들어가요."] },
      ],
      meetingPlace: { name: "길동 조용한 작업실", meta: "420m · 강동구 길동 · 콘센트/와이파이 가능" },
      hostName: "연우",
      members: [
        { name: "도윤", region: "길동", desc: "퇴근 후 자격증 공부 중이에요." },
        { name: "민서", region: "천호동", desc: "포트폴리오 작업 같이 해요!" },
        { name: "라온", region: "둔촌동" },
        { name: "해나", region: "길동", desc: "집중 타이머 켜두고 공부하는 편이에요." },
        { name: "준", region: "성내동" },
      ],
      schedules: [
        { month: "6월", day: "2", title: "평일 저녁 2시간 집중 스터디", time: "오후 7:30", people: "5/7명" },
        { month: "6월", day: "7", title: "주말 오전 카페 스터디", time: "오전 10:00", people: "6/9명" },
        { month: "6월", day: "11", title: "모임에만 공개된 일정이에요.", locked: true, time: "오후 7:30", people: "3/7명" },
      ],
      challenges: [
        { title: "6월 20시간 집중 챌린지", status: "D-2", ongoing: true, period: "4주 동안 · 주 3일", people: "9명 참여" },
        { title: "매일 30분 기록 챌린지", status: "진행 8일차", ongoing: true, period: "30일 동안 · 매일", people: "14명 참여" },
        { title: "5월 노트 정리 챌린지", status: "종료", period: "4주 동안 · 주 2일", people: "7명 참여" },
      ],
      postTabs: ["전체", "가입인사", "스터디 인증", "질문", "자료 공유"],
      posts: [
        { author: "민서", verified: true, time: "12분 전", board: "스터디 인증", lines: ["오늘은 포트폴리오 첫 화면 와이어프레임까지 끝냈어요.", "다음 모임 전까지 케이스 스터디 정리해오겠습니다!"], photo: true, challenge: { title: "6월 20시간 집중 챌린지", sub: "4주 챌린지 · 9명 참여" }, likes: 5, comments: 2, views: 22 },
        { author: "준", time: "1시간 전", board: "가입인사", lines: ["안녕하세요. 평일 저녁에 영어 시험 공부하려고 들어왔어요.", "서로 조용히 응원하면서 오래 갔으면 좋겠습니다."], likes: 6, comments: 1, views: 17 },
        { author: "연우", verified: true, time: "1일 전", board: "자료 공유", lines: ["이번 주 집중 스터디 체크리스트 올려둘게요.", "필요한 분들은 출력해서 가져오셔도 좋아요."], likes: 7, comments: 2, views: 29 },
      ],
    };
  }

  if (titleIncludes(meetup, "러닝") || titleIncludes(meetup, "등산") || titleIncludes(meetup, "산책")) {
    const isRunning = titleIncludes(meetup, "러닝");
    const isHiking = titleIncludes(meetup, "등산");
    return {
      ...base,
      categoryLabel: meetup.category ?? "아웃도어/여행",
      description: [
        { emoji: isRunning ? "🏃" : isHiking ? "🥾" : "🌳", lines: [`${meetup.place ?? "강동"} 근처에서 부담 없이 몸을 움직이는 모임입니다.`] },
        { emoji: "☀️", lines: [isRunning ? "주말 아침 한강 코스를 천천히 달려요. 초보자는 짧은 거리부터 함께합니다." : isHiking ? "무리한 속도보다 안전한 산행을 우선해요. 하산 후 식사까지 편하게 이어집니다." : "선선한 저녁에 공원을 걷고, 근처 카페에서 가볍게 이야기 나눠요."] },
        { emoji: "🤝", lines: ["처음 오셔도 어색하지 않게 출발 전 코스와 페이스를 맞춰드립니다."] },
      ],
      meetingPlace: { name: isHiking ? "남한산성 북문 입구" : isRunning ? "광나루 한강공원 입구" : "올림픽공원 만남의광장", meta: `${meetup.place ?? "강동구"} · 초보 환영 · 뒤풀이 선택` },
      hostName: isHiking ? "산들" : isRunning ? "하준" : "수아",
      members: [
        { name: "유진", region: "천호동", desc: "천천히 오래 움직이는 걸 좋아해요." },
        { name: "태오", region: "길동" },
        { name: "나은", region: "성내동", desc: "주말 오전 일정 선호합니다." },
        { name: "현", region: "오금동" },
        { name: "솔", region: "둔촌동" },
      ],
      schedules: [
        { month: "6월", day: "1", title: isRunning ? "한강 5km 가볍게 뛰기" : isHiking ? "남한산성 초보 코스" : "올림픽공원 저녁 산책", time: isRunning ? "오전 8:00" : "오전 9:30", people: "7/11명" },
        { month: "6월", day: "8", title: "모임에만 공개된 일정이에요.", locked: true, time: "오전 9:00", people: "5/9명" },
        { month: "6월", day: "15", title: "초보자 환영 페이스 모임", time: "오전 8:30", people: "6/12명" },
      ],
      challenges: [
        { title: isRunning ? "6월 30km 러닝 챌린지" : isHiking ? "월 2회 산행 챌린지" : "매일 7천 보 걷기 챌린지", status: "진행 5일차", ongoing: true, period: "1개월 동안 · 주 3일", people: "13명 참여" },
        { title: "운동 기록 공유 챌린지", status: "D-4", ongoing: true, period: "4주 동안 · 매주", people: "8명 참여" },
        { title: "5월 출석 챌린지", status: "종료", period: "1개월 동안 · 매주", people: "17명 참여" },
      ],
      postTabs: ["전체", "가입인사", "운동 인증", "코스 추천", "일정 후기"],
      posts: [
        { author: "하준", verified: true, time: "20분 전", board: "코스 추천", lines: ["이번 주 코스는 바람이 덜 부는 길로 잡아봤어요.", "처음 오시는 분들은 물만 챙겨오시면 됩니다."], likes: 6, comments: 3, views: 24 },
        { author: "나은", time: "2시간 전", board: "운동 인증", lines: ["오늘 혼자 예습 겸 다녀왔는데 길이 좋아요!", "주말에 같이 가면 더 재밌을 것 같아요."], photo: true, likes: 9, comments: 2, views: 33 },
        { author: "태오", time: "1일 전", board: "가입인사", lines: ["운동 습관 만들고 싶어서 가입했어요.", "느린 페이스도 괜찮다면 함께하고 싶습니다."], likes: 4, comments: 1, views: 14 },
      ],
    };
  }

  if (titleIncludes(meetup, "보드게임")) {
    return {
      ...base,
      categoryLabel: "취미/오락",
      description: [
        { emoji: "🎲", lines: ["퇴근 후 보드게임으로 머리 식히는 강동 동네 모임입니다."] },
        { emoji: "🃏", lines: ["가벼운 파티게임부터 전략게임까지 그날 인원에 맞춰 골라요. 룰을 몰라도 천천히 설명해드립니다."] },
        { emoji: "🍕", lines: ["승패보다 웃고 떠드는 분위기를 좋아해요. 간식은 각자 조금씩 가져와도 좋아요."] },
      ],
      meetingPlace: { name: "천호 보드게임 카페", meta: "310m · 강동구 천호동 · 룰 설명 가능" },
      hostName: "민재",
      members: [
        { name: "지호", region: "천호동", desc: "가벼운 파티게임 좋아해요." },
        { name: "세린", region: "성내동" },
        { name: "로운", region: "길동", desc: "전략게임 입문 중입니다." },
        { name: "다인", region: "암사동" },
        { name: "규", region: "천호동" },
      ],
      schedules: [
        { month: "6월", day: "3", title: "입문자 파티게임 번개", time: "오후 7:30", people: "4/6명" },
        { month: "6월", day: "10", title: "전략게임 2판 도전", time: "오후 7:00", people: "5/7명" },
        { month: "6월", day: "14", title: "모임에만 공개된 일정이에요.", locked: true, time: "오후 3:00", people: "5/8명" },
      ],
      challenges: [
        { title: "6월 신작 게임 3개 해보기", status: "D-3", ongoing: true, period: "1개월 동안 · 주 1일", people: "6명 참여" },
        { title: "룰마스터 돌아가며 하기", status: "진행 2주차", ongoing: true, period: "4주 동안 · 매주", people: "4명 참여" },
        { title: "5월 보드게임 출석왕", status: "종료", period: "1개월 동안 · 매주", people: "9명 참여" },
      ],
      postTabs: ["전체", "가입인사", "게임 후기", "일정 제안", "룰 질문"],
      posts: [
        { author: "민재", verified: true, time: "35분 전", board: "일정 제안", lines: ["다음 모임은 6명 기준으로 파티게임 먼저 하고, 남는 시간에 카탄 한 판 어떨까요?"], likes: 5, comments: 4, views: 21 },
        { author: "세린", time: "3시간 전", board: "게임 후기", lines: ["어제 처음 갔는데 룰 설명을 잘해주셔서 금방 따라갔어요.", "다음엔 제가 간식 챙겨갈게요!"], photo: true, likes: 8, comments: 2, views: 28 },
        { author: "지호", time: "1일 전", board: "가입인사", lines: ["보드게임은 잘 모르지만 사람들과 가볍게 놀고 싶어서 가입했어요."], likes: 3, comments: 1, views: 12 },
      ],
    };
  }

  if (titleIncludes(meetup, "밥") || titleIncludes(meetup, "맛집")) {
    return {
      ...base,
      categoryLabel: "음식/음료",
      description: [
        { emoji: "🍚", lines: ["혼밥보다 같이 먹는 한 끼가 더 좋은 이웃들이 모이는 식사 모임입니다."] },
        { emoji: "🍜", lines: ["천호와 강동 근처 맛집을 하나씩 가보고, 메뉴 추천도 편하게 나눠요."] },
        { emoji: "☕", lines: ["식사 후 시간이 맞으면 카페까지 이어가지만, 부담 없이 밥만 먹고 가도 괜찮아요."] },
      ],
      meetingPlace: { name: "천호 로데오거리 맛집 골목", meta: "520m · 강동구 천호동 · 메뉴 투표로 결정" },
      hostName: "소담",
      members: [
        { name: "하린", region: "천호동", desc: "새 맛집 찾아다니는 걸 좋아해요." },
        { name: "우재", region: "길동" },
        { name: "지안", region: "성내동", desc: "맵찔이지만 도전은 좋아합니다." },
        { name: "윤", region: "암사동" },
        { name: "서우", region: "둔촌동" },
      ],
      schedules: [
        { month: "6월", day: "4", title: "퇴근 후 국밥 번개", time: "오후 7:20", people: "5/8명" },
        { month: "6월", day: "12", title: "천호 신상 파스타집 가보기", time: "오후 7:00", people: "5/7명" },
        { month: "6월", day: "20", title: "모임에만 공개된 일정이에요.", locked: true, time: "오후 6:30", people: "4/8명" },
      ],
      challenges: [
        { title: "6월 동네 맛집 4곳 도장깨기", status: "진행 1주차", ongoing: true, period: "1개월 동안 · 매주", people: "11명 참여" },
        { title: "만원대 든든한 한 끼 찾기", status: "D-5", ongoing: true, period: "2주 동안 · 자유", people: "7명 참여" },
        { title: "5월 카페 디저트 추천", status: "종료", period: "1개월 동안 · 자유", people: "13명 참여" },
      ],
      postTabs: ["전체", "가입인사", "맛집 추천", "일정 후기", "메뉴 투표"],
      posts: [
        { author: "소담", verified: true, time: "18분 전", board: "메뉴 투표", lines: ["이번 주 후보는 국밥, 쌀국수, 파스타예요.", "댓글로 먹고 싶은 메뉴 남겨주세요!"], likes: 7, comments: 6, views: 34 },
        { author: "하린", time: "2시간 전", board: "맛집 추천", lines: ["천호역 근처 새로 생긴 덮밥집 다녀왔는데 양도 많고 괜찮았어요."], photo: true, likes: 9, comments: 3, views: 32 },
        { author: "우재", time: "1일 전", board: "가입인사", lines: ["퇴근 후 밥 친구 찾다가 들어왔어요. 잘 부탁드립니다!"], likes: 4, comments: 1, views: 13 },
      ],
    };
  }

  return {
    ...base,
    description: [
      { emoji: meetup.emoji, lines: [`${meetup.title}은 ${meetup.place ?? "동네"}에서 관심사가 비슷한 이웃들이 편하게 만나는 모임입니다.`] },
      { emoji: "🗓️", lines: ["정기 일정과 가벼운 번개를 함께 운영해요. 처음 오시는 분도 어색하지 않게 안내해드립니다."] },
      { emoji: "💬", lines: [meetup.desc?.replace("…", ".") ?? "모임 안에서 정보와 후기를 나누며 천천히 친해져요."] },
    ],
    meetingPlace: { name: `${meetup.place ?? "강동"} 근처 모임 장소`, meta: `${meetup.place ?? "강동구"} · 일정마다 장소 공지` },
    hostName: "모임장",
    members: [
      { name: "하늘", region: meetup.place ?? "천호동", desc: "처음이라 천천히 참여해보고 싶어요." },
      { name: "도담", region: "길동" },
      { name: "서연", region: "성내동", desc: "동네에서 함께할 모임을 찾고 있어요." },
      { name: "이준", region: "암사동" },
      { name: "나리", region: "둔촌동" },
    ],
    schedules: [
      { month: "6월", day: "5", title: `${categoryLabel} 첫 정기 모임`, time: "오후 7:00", people: "4/7명" },
      { month: "6월", day: "13", title: "새 멤버 환영 번개", time: "오후 2:00", people: "7/10명" },
      { month: "6월", day: "21", title: "모임에만 공개된 일정이에요.", locked: true, time: "오후 4:00", people: "5/9명" },
    ],
    challenges: [
      { title: `6월 ${categoryLabel} 출석 챌린지`, status: "D-2", ongoing: true, period: "1개월 동안 · 매주", people: "7명 참여" },
      { title: "새 멤버와 인사 나누기", status: "진행 중", ongoing: true, period: "2주 동안 · 자유", people: "11명 참여" },
      { title: "5월 활동 기록 챌린지", status: "종료", period: "1개월 동안 · 자유", people: "8명 참여" },
    ],
    postTabs: ["전체", "가입인사", "일정 후기", "자유 게시판", "정보 공유"],
    posts: [
      { author: "하늘", verified: true, time: "24분 전", board: "자유 게시판", lines: ["이번 주 모임 기대돼요.", "처음 오시는 분들 같이 인사하면서 시작해요!"], likes: 5, comments: 2, views: 18 },
      { author: "도담", time: "3시간 전", board: "가입인사", lines: ["동네에서 편하게 만날 수 있는 모임을 찾다가 가입했어요.", "잘 부탁드립니다."], likes: 3, comments: 1, views: 10 },
      { author: "서연", time: "1일 전", board: "일정 후기", lines: ["지난 모임 분위기가 편해서 좋았어요. 다음 일정도 참여하고 싶습니다."], photo: true, likes: 6, comments: 2, views: 23 },
    ],
  };
}

/* 헤더에 떠 있는 원형 반투명 아이콘 버튼 */
function GlassIcon({
  svg,
  onClick,
}: {
  svg: React.ReactNode;
  onClick?: () => void;
}) {
  return (
    <Box
      as="button"
      onClick={onClick}
      style={{
        width: 36,
        height: 36,
        borderRadius: "50%",
        border: "none",
        background: "rgba(0,0,0,0.32)",
        cursor: "pointer",
        padding: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "var(--seed-color-palette-static-white)",
      }}
    >
      <FixedIcon svg={svg} size={20} color="var(--seed-color-palette-static-white)" />
    </Box>
  );
}

/* 고정 헤더에 쓰는 불투명(검정) 아이콘 버튼 */
function SolidIcon({ svg, onClick }: { svg: React.ReactNode; onClick?: () => void }) {
  return (
    <Box
      as="button"
      onClick={onClick}
      style={{
        width: 32,
        height: 32,
        border: "none",
        background: "transparent",
        cursor: "pointer",
        padding: 0,
        flexShrink: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: fg,
      }}
    >
      <FixedIcon svg={svg} size={22} color={fg} />
    </Box>
  );
}

/* 텍스트형(투명 배경) 버튼 공통 스타일 */
const textLinkStyle: React.CSSProperties = {
  border: "none",
  background: "transparent",
  cursor: "pointer",
  padding: 0,
};

/* 사진/아바타 자리를 비운 회색 박스 */
function Photo({
  w,
  h,
  radius = 12,
  circle = false,
  style,
}: {
  w: number | string;
  h: number;
  radius?: number;
  circle?: boolean;
  style?: React.CSSProperties;
}) {
  return (
    <Box
      style={{
        width: w,
        height: h,
        borderRadius: circle ? "50%" : radius,
        background: fill,
        flexShrink: 0,
        ...style,
      }}
    />
  );
}

/* 섹션 제목 + (선택) 더보기 */
function SectionHeader({
  title,
  more = true,
  onMore,
}: {
  title: string;
  more?: boolean;
  onMore?: () => void;
}) {
  return (
    <Box
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 20px 6px",
      }}
    >
      {onMore ? (
        <Box as="button" onClick={onMore} style={textLinkStyle}>
          <Text textStyle="t6Bold" style={{ color: fg }}>
            {title}
          </Text>
        </Box>
      ) : (
        <Text textStyle="t6Bold" style={{ color: fg }}>
          {title}
        </Text>
      )}
      {more && (
        <Box
          as="button"
          onClick={onMore}
          style={{ ...textLinkStyle, display: "flex", alignItems: "center", gap: 2 }}
        >
          <Text textStyle="t4Regular" style={{ color: fgMuted }}>
            더보기
          </Text>
          <FixedIcon svg={<ChevronRightIcon />} size={16} color={fgMuted} />
        </Box>
      )}
    </Box>
  );
}

/* 회색 가로 더보기 버튼 */
function MoreButton({ onClick }: { onClick?: () => void }) {
  return (
    <Box style={{ padding: "8px 20px 0" }}>
      <Box
        as="button"
        onClick={onClick}
        style={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 2,
          border: "none",
          background: fill,
          borderRadius: 10,
          padding: "13px 0",
          cursor: "pointer",
        }}
      >
        <Text textStyle="t5Bold" style={{ color: fg }}>
          더보기
        </Text>
        <FixedIcon svg={<ChevronRightIcon />} size={16} color={fg} />
      </Box>
    </Box>
  );
}

/* 개설일·인증 등 한 줄 정보 행 */
function InfoRow({ svg, children }: { svg: React.ReactNode; children: React.ReactNode }) {
  return (
    <Box style={{ display: "flex", alignItems: "center", gap: 12 }}>
      <FixedIcon svg={svg} size={20} color={fgMuted} />
      <Text textStyle="t5Regular" style={{ color: fg }}>
        {children}
      </Text>
    </Box>
  );
}

export default function MeetupAbout({
  meetup,
  onBack,
}: {
  meetup: MeetupAboutTarget;
  onBack: () => void;
}) {
  const content = getMeetupContent(meetup);
  const memberCount = meetup.count ?? "115명";
  const region = meetup.place ?? "천호제3동";
  const ongoingChallenges = content.challenges.filter(
    (challenge) => challenge.ongoing && !challenge.status.startsWith("D-"),
  );
  const upcomingChallenges = content.challenges.filter(
    (challenge) => challenge.ongoing && challenge.status.startsWith("D-"),
  );
  const endedChallenges = content.challenges.filter((challenge) => !challenge.ongoing);

  // 히어로 사진을 지나 스크롤하면 흰색 고정 헤더로 전환됩니다.
  const [scrolled, setScrolled] = useState(false);
  // 모임 소개 본문 펼침 여부
  const [descOpen, setDescOpen] = useState(false);
  // 게시판 탭
  const [postTab, setPostTab] = useState("전체");
  // 일정 후기 전체보기 열림 여부
  const [reviewsOpen, setReviewsOpen] = useState(false);
  // 가입 안내 다이얼로그 열림 여부
  const [joinNoticeOpen, setJoinNoticeOpen] = useState(false);
  const [hostProfileOpen, setHostProfileOpen] = useState(false);
  const [membersOpen, setMembersOpen] = useState(false);
  // 일정 전체보기 열림 여부
  const [schedulesOpen, setSchedulesOpen] = useState(false);
  // 챌린지 전체보기 열림 여부
  const [challengesOpen, setChallengesOpen] = useState(false);
  // 게시글 전체보기 열림 여부
  const [postsOpen, setPostsOpen] = useState(false);

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
      {/* 스크롤 시 나타나는 흰색 고정 헤더 */}
      <Box
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 6,
          display: "flex",
          alignItems: "center",
          gap: 6,
          padding: "12px 12px",
          background: layer,
          borderBottom: `1px solid ${stroke}`,
          opacity: scrolled ? 1 : 0,
          pointerEvents: scrolled ? "auto" : "none",
          transition: "opacity 0.18s ease",
        }}
      >
        <SolidIcon svg={<BackIcon />} onClick={onBack} />
        <Text
          textStyle="t6Bold"
          maxLines={1}
          style={{ flex: 1, color: fg, textAlign: "center" }}
        >
          {meetup.title}
        </Text>
        <SolidIcon svg={<ShareIcon />} />
        <SolidIcon svg={<MoreIcon />} />
      </Box>

      {/* 스크롤 본문 (헤더가 사진 위에 떠 있으므로 본문이 최상단부터 시작) */}
      <Box
        className="no-scrollbar"
        onScroll={(e: React.UIEvent<HTMLDivElement>) =>
          setScrolled(e.currentTarget.scrollTop > 320)
        }
        style={{ flex: 1, overflowY: "auto" }}
      >
        {/* 히어로 사진 (빈 회색 박스) + 떠 있는 헤더 */}
        <Box style={{ position: "relative" }}>
          <Box style={{ width: "100%", height: 380, background: fill }} />

          {/* 헤더 아이콘들 */}
          <Box
            style={{
              position: "absolute",
              top: 12,
              left: 12,
              right: 12,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <GlassIcon svg={<BackIcon />} onClick={onBack} />
            <Box style={{ display: "flex", gap: 10 }}>
              <GlassIcon svg={<ShareIcon />} />
              <GlassIcon svg={<MoreIcon />} />
            </Box>
          </Box>

          {/* 앨범보기 배지 */}
          <Box
            style={{
              position: "absolute",
              right: 12,
              bottom: 14,
              display: "flex",
              alignItems: "center",
              gap: 5,
              background: "rgba(0,0,0,0.45)",
              borderRadius: 999,
              padding: "6px 12px",
              color: "var(--seed-color-palette-static-white)",
            }}
          >
            <FixedIcon svg={<AlbumGlyph />} size={15} color="var(--seed-color-palette-static-white)" />
            <Text textStyle="t3Bold" style={{ color: "var(--seed-color-palette-static-white)" }}>
              앨범보기
            </Text>
          </Box>

          {/* 캐러셀 점 */}
          <Box
            style={{
              position: "absolute",
              left: 0,
              right: 0,
              bottom: 18,
              display: "flex",
              justifyContent: "center",
              gap: 6,
            }}
          >
            {[0, 1, 2].map((i) => (
              <Box
                key={i}
                style={{
                  width: 6,
                  height: 6,
                  borderRadius: 999,
                  background:
                    i === 0
                      ? "var(--seed-color-palette-static-white)"
                      : "rgba(255,255,255,0.5)",
                }}
              />
            ))}
          </Box>
        </Box>

        {/* 모임 프로필 */}
        <Box style={{ display: "flex", alignItems: "center", gap: 14, padding: "18px 20px 16px" }}>
          <Box style={{ position: "relative", flexShrink: 0 }}>
            <Photo w={52} h={52} radius={14} />
            <Box
              style={{
                position: "absolute",
                right: -3,
                bottom: -3,
                width: 22,
                height: 22,
                borderRadius: "50%",
                background: brand,
                border: `2px solid ${layer}`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <FixedIcon svg={<LeafIcon />} size={12} color="var(--seed-color-palette-static-white)" />
            </Box>
          </Box>
          <Box style={{ flex: 1, minWidth: 0 }}>
            <Text textStyle="t6Bold" maxLines={1} style={{ color: fg, display: "block" }}>
              {meetup.title}
            </Text>
            <Box style={{ display: "flex", alignItems: "center", gap: 5, marginTop: 3 }}>
              <Text textStyle="t4Regular" style={{ color: fgMuted }}>
                {region} · 멤버 {memberCount} ·
              </Text>
              <Text textStyle="t4Bold" style={{ color: fgInformative }}>
                {meetup.status ?? "3분 전 활동"}
              </Text>
            </Box>
          </Box>
        </Box>

        <Box style={{ height: 1, background: stroke, margin: "0 20px" }} />

        {/* 개설일 / 인증 정보 */}
        <Box style={{ display: "flex", flexDirection: "column", gap: 16, padding: "20px 20px 4px" }}>
          <InfoRow svg={<CalendarIcon />}>2023년 12월 31일 개설</InfoRow>
          <InfoRow svg={<ShieldCheckIcon />}>본인인증 필요, 나이대 공개</InfoRow>
        </Box>

        {/* 멤버 새 메시지 미리보기 */}
        <Box style={{ padding: "16px 20px 4px" }}>
          <Box
            as="button"
            style={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              gap: 12,
              border: `1px solid ${stroke}`,
              borderRadius: 12,
              padding: "14px 16px",
              background: layer,
              cursor: "pointer",
              textAlign: "left",
            }}
          >
            {/* 겹친 아바타 (빈 회색) */}
            <Box style={{ display: "flex", flexShrink: 0 }}>
              {[0, 1, 2].map((i) => (
                <Box
                  key={i}
                  style={{
                    width: 30,
                    height: 30,
                    borderRadius: "50%",
                    background: fill,
                    border: `2px solid ${layer}`,
                    marginLeft: i === 0 ? 0 : -10,
                  }}
                />
              ))}
            </Box>
            <Box style={{ flex: 1, minWidth: 0, display: "flex", alignItems: "center", gap: 6 }}>
              <Text textStyle="t4Regular" style={{ color: fg }}>
                멤버 {memberCount}의 새 메시지
              </Text>
              <Text textStyle="t4Bold" style={{ color: fg }}>
                +36
              </Text>
            </Box>
            <Text textStyle="t3Regular" style={{ color: fgMuted, flexShrink: 0 }}>
              1일 전
            </Text>
            <FixedIcon svg={<ChevronRightIcon />} size={18} color={fgMuted} />
          </Box>
        </Box>

        {/* 모임 소개 본문 (접힘 상태에서는 높이를 제한하고 더보기로 펼침) */}
        <Box style={{ padding: "20px 20px 0" }}>
          <Box
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 18,
              maxHeight: descOpen ? "none" : 110,
              overflow: "hidden",
            }}
          >
            {content.description.map((para, i) => (
              <Box key={i} style={{ display: "flex", gap: 8 }}>
                <Text textStyle="t5Regular" style={{ flexShrink: 0 }}>
                  {para.emoji}
                </Text>
                <Text textStyle="t5Regular" style={{ color: fg, flex: 1, lineHeight: 1.6 }}>
                  {para.lines.map((line, j) => (
                    <span key={j}>
                      {line}
                      {j < para.lines.length - 1 && <br />}
                    </span>
                  ))}
                </Text>
              </Box>
            ))}
          </Box>
          {/* 더보기 / 접기 */}
          <Box
            as="button"
            onClick={() => setDescOpen((v) => !v)}
            style={{ ...textLinkStyle, marginTop: 8 }}
          >
            <Text textStyle="t5Regular" style={{ color: fgMuted }}>
              {descOpen ? "접기" : "...더보기"}
            </Text>
          </Box>
        </Box>

        {/* 카테고리 칩 */}
        <Box style={{ padding: "18px 20px 0" }}>
          <Box
            style={{
              display: "inline-flex",
              background: fill,
              borderRadius: 8,
              padding: "7px 12px",
            }}
          >
            <Text textStyle="t4Regular" style={{ color: fgMuted }}>
              {content.categoryLabel}
            </Text>
          </Box>
        </Box>

        {/* 게시글·일정·관심 통계 */}
        <Box style={{ display: "flex", alignItems: "center", gap: 8, padding: "14px 20px 22px" }}>
          {content.stats.map((s, i) => (
            <Box key={s.label} style={{ display: "flex", alignItems: "center", gap: 8 }}>
              {i > 0 && (
                <Text textStyle="t3Regular" style={{ color: fgMuted }}>
                  ·
                </Text>
              )}
              <Text textStyle="t4Regular" style={{ color: fgMuted }}>
                {s.label} {s.value}
              </Text>
            </Box>
          ))}
        </Box>

        <Box style={{ height: 8, background: fill }} />

        {/* 자주 모이는 장소 */}
        <Box style={{ padding: "24px 20px 0" }}>
          <Text textStyle="t6Bold" style={{ color: fg, display: "block", marginBottom: 16 }}>
            자주 모이는 장소
          </Text>
          <Box
            style={{
              border: `1px solid ${stroke}`,
              borderRadius: 14,
              overflow: "hidden",
            }}
          >
            <FauxMap />
            <Box style={{ padding: "14px 16px" }}>
              <Text textStyle="t5Bold" style={{ color: fg, display: "block" }}>
                {content.meetingPlace.name}
              </Text>
              <Text textStyle="t4Regular" style={{ color: fgMuted, display: "block", marginTop: 4 }}>
                {content.meetingPlace.meta}
              </Text>
            </Box>
          </Box>
        </Box>

        {/* 일정 후기 */}
        <Box style={{ padding: "32px 0 24px" }}>
          <Box
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "0 20px 16px",
            }}
          >
            <Text textStyle="t6Bold" style={{ color: fg }}>
              일정 후기
            </Text>
            <Box
              as="button"
              onClick={() => setReviewsOpen(true)}
              style={{ ...textLinkStyle, display: "flex", alignItems: "center", gap: 2 }}
            >
              <Text textStyle="t4Regular" style={{ color: fgMuted }}>
                더보기
              </Text>
              <FixedIcon svg={<ChevronRightIcon />} size={16} color={fgMuted} />
            </Box>
          </Box>
          <Box
            className="no-scrollbar"
            style={{ display: "flex", gap: 12, padding: "0 20px", overflowX: "auto" }}
          >
            {content.reviews.map((r, i) => (
              <ReviewCard key={i} review={r} onClick={() => setReviewsOpen(true)} />
            ))}
          </Box>
        </Box>

        <Box style={{ height: 8, background: fill }} />

        {/* 모임장 소개 */}
        <Box style={{ padding: "24px 20px 0" }}>
          <Text textStyle="t6Bold" style={{ color: fg, display: "block", marginBottom: 18 }}>
            모임장 소개
          </Text>

          <Box
            as="button"
            onClick={() => setHostProfileOpen(true)}
            style={{
              width: "100%",
              border: "none",
              background: "transparent",
              cursor: "pointer",
              padding: 0,
              textAlign: "left",
            }}
          >
            {/* 모임장 프로필 */}
            <Box
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                width: "100%",
              }}
            >
              <Photo w={52} h={52} circle />
              <Box style={{ flex: 1, minWidth: 0 }}>
                <Box style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <Text textStyle="t5Bold" style={{ color: fg }}>
                    {content.hostName}
                  </Text>
                  <MannerTemp value="43.5" />
                </Box>
                <Box style={{ display: "flex", alignItems: "center", gap: 5, marginTop: 5 }}>
                  <Text textStyle="t3Regular" style={{ flexShrink: 0 }}>
                    🔥
                  </Text>
                  <Text textStyle="t4Regular" style={{ color: fgMuted }}>
                    2년 이상 모임 운영
                  </Text>
                </Box>
              </Box>
            </Box>

            {/* 모임장 활동 카드 */}
            <Box
              style={{
                border: `1px solid ${stroke}`,
                borderRadius: 14,
                marginTop: 16,
                overflow: "hidden",
              }}
            >
              <Box style={{ display: "flex", padding: "18px 0" }}>
                {content.hostStats.map((s, i) => (
                  <Box
                    key={s.label}
                    style={{
                      flex: 1,
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      gap: 7,
                      borderLeft: i > 0 ? `1px solid ${stroke}` : "none",
                    }}
                  >
                    <Text textStyle="t3Regular" style={{ color: fgMuted }}>
                      {s.label}
                    </Text>
                    <Text textStyle="t5Bold" style={{ color: fg }}>
                      {s.value}
                    </Text>
                  </Box>
                ))}
              </Box>
              <Box style={{ height: 1, background: stroke }} />
              <Box
                style={{
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  padding: 16,
                  background: layer,
                  border: "none",
                  textAlign: "left",
                }}
              >
                <Text textStyle="t4Regular" style={{ color: fg, flex: 1, lineHeight: 1.5 }}>
                  <Text as="span" textStyle="t4Bold" style={{ color: fg }}>
                    받은 후기 83
                  </Text>
                  {"  "}{content.hostReview}
                </Text>
                <FixedIcon svg={<ChevronRightIcon />} size={18} color={fgMuted} />
              </Box>
            </Box>
          </Box>

          {/* 인증 / 지역 */}
          <Box style={{ display: "flex", flexDirection: "column", gap: 14, paddingTop: 20 }}>
            <Box style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <FixedIcon svg={<CheckCircleIcon />} size={20} color="#15b06e" />
              <Text textStyle="t4Regular" style={{ color: fg }}>
                본인인증, 나이대 공개 완료
              </Text>
            </Box>
            <Box style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <FixedIcon svg={<PinIcon />} size={20} color={fgMuted} />
              <Text textStyle="t4Regular" style={{ color: fg }}>
                {region}
              </Text>
            </Box>
          </Box>
        </Box>

        {/* 관심 모임 알림 배너 */}
        <Box style={{ padding: "24px 20px 0" }}>
          <Box
            style={{
              display: "flex",
              alignItems: "center",
              gap: 14,
              background: fill,
              borderRadius: 12,
              padding: "16px 18px",
            }}
          >
            <Text textStyle="t4Regular" style={{ color: fg, flex: 1, lineHeight: 1.5 }}>
              <Text as="span" textStyle="t4Bold" style={{ color: fg }}>
                성이님이 관심 있을만한 모임
              </Text>
              이 생기면 알려드릴까요?
            </Text>
            <Box
              as="button"
              style={{
                display: "flex",
                alignItems: "center",
                gap: 5,
                border: `1px solid ${stroke}`,
                background: layer,
                borderRadius: 999,
                padding: "8px 14px",
                cursor: "pointer",
                flexShrink: 0,
              }}
            >
              <FixedIcon svg={<BellIcon />} size={16} color={fg} />
              <Text textStyle="t3Bold" style={{ color: fg }}>
                알림 받기
              </Text>
            </Box>
          </Box>
        </Box>

        {/* 멤버 */}
        <Box style={{ padding: "32px 20px 12px" }}>
          <Text textStyle="t6Bold" style={{ color: fg }}>
            멤버 {memberCount}
          </Text>
        </Box>
        {content.members.map((m, i) => (
          <Box
            key={i}
            style={{ display: "flex", alignItems: "center", gap: 12, padding: "8px 20px" }}
          >
            <Photo w={44} h={44} circle />
            <Box style={{ flex: 1, minWidth: 0 }}>
              <Box style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <Text textStyle="t4Bold" style={{ color: fg }}>
                  {m.name}
                </Text>
                <Text textStyle="t3Regular" style={{ color: fgMuted }}>
                  {m.region}
                </Text>
              </Box>
              {m.desc && (
                <Text textStyle="t3Regular" style={{ color: fgMuted, display: "block", marginTop: 3 }}>
                  {m.desc}
                </Text>
              )}
            </Box>
          </Box>
        ))}
        <MoreButton onClick={() => setMembersOpen(true)} />

        <Box style={{ height: 8, background: fill, marginTop: 24 }} />

        {/* 일정 */}
        <Box style={{ padding: "24px 0 20px" }}>
          <SectionHeader title={`일정 ${content.schedules.length}`} onMore={() => setSchedulesOpen(true)} />
          {content.schedules.map((s, i) => (
            <ScheduleRow key={i} item={s} />
          ))}
        </Box>

        <Box style={{ height: 8, background: fill }} />

        {/* 챌린지 */}
        <Box style={{ padding: "24px 0 20px" }}>
          <SectionHeader title={`챌린지 ${content.challenges.length}`} onMore={() => setChallengesOpen(true)} />
          {content.challenges.map((c, i) => (
            <ChallengeRow key={i} item={c} />
          ))}
        </Box>

        <Box style={{ height: 8, background: fill }} />

        {/* 게시글 */}
        <Box style={{ padding: "24px 0 0" }}>
          <Box style={{ padding: "0 20px 14px" }}>
            <Box as="button" onClick={() => setPostsOpen(true)} style={textLinkStyle}>
              <Text textStyle="t6Bold" style={{ color: fg }}>
                게시글 {content.posts.length}
              </Text>
            </Box>
          </Box>
          {/* 게시판 탭 */}
          <Box
            className="no-scrollbar"
            style={{ display: "flex", gap: 8, padding: "0 20px 6px", overflowX: "auto" }}
          >
            {content.postTabs.map((t) => {
              const on = t === postTab;
              return (
                <Box
                  as="button"
                  key={t}
                  onClick={() => setPostTab(t)}
                  style={{
                    flexShrink: 0,
                    border: on ? "none" : `1px solid ${stroke}`,
                    background: on ? fg : layer,
                    color: on ? "var(--seed-color-fg-neutral-inverted)" : fg,
                    borderRadius: 999,
                    padding: "8px 14px",
                    cursor: "pointer",
                  }}
                >
                  <Text textStyle="t4Bold" style={{ color: "inherit", whiteSpace: "nowrap" }}>
                    {t}
                  </Text>
                </Box>
              );
            })}
          </Box>
        </Box>
        {(() => {
          const visible =
            postTab === "전체" ? content.posts : content.posts.filter((p) => p.board === postTab);
          if (visible.length === 0) {
            return (
              <Box style={{ padding: "56px 20px", textAlign: "center" }}>
                <Text textStyle="t5Regular" style={{ color: fgMuted }}>
                  아직 게시글이 없어요.
                </Text>
              </Box>
            );
          }
          return visible.map((p, i) => <PostCard key={i} post={p} />);
        })()}
        <MoreButton onClick={() => setPostsOpen(true)} />

        <Box style={{ height: 8, background: fill, marginTop: 24 }} />

        {/* 이런 모임도 추천해요 */}
        <Box style={{ padding: "24px 0 0" }}>
          <Box style={{ padding: "0 20px 8px" }}>
            <Text textStyle="t6Bold" style={{ color: fg }}>
              이런 모임도 추천해요
            </Text>
          </Box>
          {RECOMMEND_MEETUPS.map((m, i) => (
            <RecommendRow key={i} item={m} />
          ))}
          <MoreButton />
        </Box>

        <Box style={{ height: 8, background: fill, marginTop: 24 }} />

        {/* 이런 온라인 카페도 추천해요 */}
        <Box style={{ padding: "24px 0 0" }}>
          <Box style={{ padding: "0 20px 14px" }}>
            <Text textStyle="t6Bold" style={{ color: fg }}>
              이런 온라인 카페도 추천해요
            </Text>
          </Box>
          <Box
            className="no-scrollbar"
            style={{ display: "flex", gap: 12, padding: "0 20px", overflowX: "auto" }}
          >
            {ONLINE_CAFES.map((c, i) => (
              <CafeCard key={i} item={c} />
            ))}
          </Box>
          <Box style={{ paddingTop: 16 }}>
            <MoreButton />
          </Box>
        </Box>

        <Box style={{ height: 8, background: fill, marginTop: 24 }} />

        {/* 직접 만들기 안내 */}
        <Box
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 6,
            padding: "32px 20px 36px",
          }}
        >
          <Text textStyle="t6Bold" style={{ color: fg }}>
            마음에 드는 모임이 없나요?
          </Text>
          <Text textStyle="t4Regular" style={{ color: fgMuted }}>
            모임을 직접 만들어 보세요.
          </Text>
          <Box
            as="button"
            style={{
              marginTop: 12,
              border: `1px solid ${stroke}`,
              background: layer,
              borderRadius: 10,
              padding: "12px 22px",
              cursor: "pointer",
            }}
          >
            <Text textStyle="t5Bold" style={{ color: fg }}>
              모임 만들기
            </Text>
          </Box>
        </Box>
      </Box>

      {/* 하단 고정 가입 바 */}
      <Box style={{ flexShrink: 0, background: layer }}>
        <Box
          style={{
            textAlign: "center",
            padding: "12px 20px",
            borderTop: `1px solid ${stroke}`,
          }}
        >
          <Text textStyle="t4Regular" style={{ color: fgSubtle }}>
            최근 30일간{" "}
            <Text as="span" textStyle="t4Bold" style={{ color: fg }}>
              8명
            </Text>
            이 가입했어요
          </Text>
        </Box>
        <Box
          style={{
            display: "flex",
            alignItems: "center",
            gap: 14,
            padding: "8px 20px 22px",
          }}
        >
          <Box
            as="button"
            onClick={() => setJoinNoticeOpen(true)}
            aria-label="좋아요"
            style={{
              width: 48,
              height: 48,
              border: `1px solid ${stroke}`,
              borderRadius: 12,
              background: layer,
              cursor: "pointer",
              padding: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
              color: fgMuted,
            }}
          >
            <FixedIcon svg={<HeartIcon />} size={24} color={fgMuted} />
          </Box>
          <Box
            as="button"
            onClick={() => setJoinNoticeOpen(true)}
            style={{
              flex: 1,
              border: "none",
              background: brand,
              borderRadius: 12,
              padding: "15px 0",
              cursor: "pointer",
              color: "var(--seed-color-palette-static-white)",
            }}
          >
            <Text textStyle="t5Bold" style={{ color: "var(--seed-color-palette-static-white)" }}>
              모임 가입하기
            </Text>
          </Box>
        </Box>
      </Box>

      {/* 일정 전체보기 */}
      {schedulesOpen && (
        <ScheduleFeed
          onBack={() => setSchedulesOpen(false)}
          reviews={content.schedulePreviewReviews}
          schedules={content.schedules}
        />
      )}

      {/* 챌린지 전체보기 */}
      {challengesOpen && (
        <ChallengeFeed
          onBack={() => setChallengesOpen(false)}
          ongoing={ongoingChallenges.length > 0 ? ongoingChallenges : content.challenges.slice(0, 1)}
          upcoming={upcomingChallenges}
          ended={endedChallenges}
        />
      )}

      {/* 게시글 전체보기 */}
      {postsOpen && (
        <PostFeed
          onBack={() => setPostsOpen(false)}
          posts={content.posts}
          tabs={content.postTabs}
        />
      )}

      {/* 일정 후기 전체보기 */}
      {reviewsOpen && (
        <ScheduleReviewFeed
          onBack={() => setReviewsOpen(false)}
          posts={content.scheduleReviews}
        />
      )}

      {/* 가입 안내 다이얼로그 */}
      {joinNoticeOpen && <JoinNoticeDialog onClose={() => setJoinNoticeOpen(false)} />}
      {hostProfileOpen && (
        <HostProfilePage
          meetup={meetup}
          content={content}
          memberCount={memberCount}
          region={region}
          onBack={() => setHostProfileOpen(false)}
          onJoin={() => setJoinNoticeOpen(true)}
        />
      )}
      {membersOpen && (
        <MembersPage
          members={content.members}
          memberCount={memberCount}
          onBack={() => setMembersOpen(false)}
        />
      )}
    </Box>
  );
}

/* 가입 안내 다이얼로그 (가입 전에는 프로필/멤버를 볼 수 없음을 알림) */
function JoinNoticeDialog({ onClose }: { onClose: () => void }) {
  return (
    <Box
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 60,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 40,
        background: "rgba(0,0,0,0.45)",
      }}
    >
      <Box
        onClick={(e: React.MouseEvent) => e.stopPropagation()}
        style={{
          width: "100%",
          maxWidth: 300,
          background: layer,
          borderRadius: 14,
          padding: "24px 20px 16px",
          boxShadow: "0 8px 28px rgba(0,0,0,0.22)",
        }}
      >
        <Text textStyle="t6Bold" style={{ color: fg, display: "block", textAlign: "center" }}>
          종료되었습니다.
        </Text>
        <Text
          textStyle="t4Regular"
          style={{
            color: fgMuted,
            display: "block",
            textAlign: "center",
            marginTop: 10,
            lineHeight: 1.5,
          }}
        >
          Maze 종료하기를 눌러 주세요!
        </Text>
        <Box
          as="button"
          onClick={onClose}
          style={{
            marginTop: 22,
            width: "100%",
            border: "none",
            background: fg,
            borderRadius: 10,
            padding: "13px 0",
            cursor: "pointer",
          }}
        >
          <Text textStyle="t5Bold" style={{ color: "var(--seed-color-fg-neutral-inverted)" }}>
            확인
          </Text>
        </Box>
      </Box>
    </Box>
  );
}

function HostProfilePage({
  meetup,
  content,
  memberCount,
  region,
  onBack,
  onJoin,
}: {
  meetup: MeetupAboutTarget;
  content: MeetupContent;
  memberCount: string;
  region: string;
  onBack: () => void;
  onJoin: () => void;
}) {
  const primaryPost = content.posts[0];

  return (
    <Box
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 70,
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
      <Box
        style={{
          flexShrink: 0,
          display: "flex",
          alignItems: "center",
          padding: "14px 14px 12px",
          borderBottom: `1px solid ${stroke}`,
        }}
      >
        <SolidIcon svg={<BackIcon />} onClick={onBack} />
        <Text textStyle="t7Bold" style={{ color: fg, flex: 1, textAlign: "center" }}>
          모임 프로필
        </Text>
        <Box style={{ width: 32 }} />
      </Box>

      <Box
        as="button"
        onClick={onBack}
        style={{
          flexShrink: 0,
          display: "flex",
          alignItems: "center",
          gap: 10,
          width: "100%",
          border: "none",
          background: fill,
          padding: "14px 20px",
          textAlign: "left",
          cursor: "pointer",
        }}
      >
        <Text textStyle="t5Bold" maxLines={1} style={{ color: fg, flex: 1 }}>
          {meetup.title} 멤버예요
        </Text>
        <FixedIcon svg={<ChevronRightIcon />} size={22} color={fg} />
      </Box>

      <Box className="no-scrollbar" style={{ flex: 1, overflowY: "auto", paddingBottom: 104 }}>
        <Box style={{ padding: "28px 20px 26px" }}>
          <Box style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between" }}>
            <Photo w={78} h={78} circle />
            <Box style={{ textAlign: "right", paddingTop: 10 }}>
              <Text textStyle="t7Bold" style={{ color: brand }}>
                47.9°C 🫢
              </Text>
              <Text
                textStyle="t4Regular"
                style={{ color: fgMuted, display: "block", marginTop: 8, textDecoration: "underline" }}
              >
                매너온도
              </Text>
            </Box>
          </Box>

          <Text textStyle="t7Bold" style={{ color: fg, display: "block", marginTop: 28 }}>
            {content.hostName}
          </Text>
          <Text textStyle="t4Regular" style={{ color: fgMuted, display: "block", marginTop: 8 }}>
            👑 모임장
          </Text>
          <Text textStyle="t6Regular" style={{ color: fg, display: "block", marginTop: 26, lineHeight: 1.45 }}>
            안녕하세요! 잘 부탁드립니다😊 😊
          </Text>

          <Box
            style={{
              display: "inline-flex",
              marginTop: 16,
              padding: "8px 12px",
              borderRadius: 10,
              background: fill,
            }}
          >
            <Text textStyle="t4Bold" style={{ color: fgMuted }}>
              모든 시간 선호
            </Text>
          </Box>

          <Box style={{ display: "flex", alignItems: "center", gap: 10, marginTop: 28 }}>
            <FixedIcon svg={<PinIcon />} size={18} color={fgMuted} />
            <Text textStyle="t4Regular" style={{ color: fgMuted }}>
              {region} ·
            </Text>
            <FixedIcon svg={<ShieldCheckIcon />} size={18} color={fgMuted} />
            <Text textStyle="t4Regular" style={{ color: fgMuted }}>
              본인인증 완료
            </Text>
          </Box>
        </Box>

        <Box style={{ height: 8, background: fill }} />

        <Box style={{ padding: "26px 20px 0" }}>
          <Text textStyle="t7Bold" style={{ color: fg }}>
            모임 활동
          </Text>
          <Box
            style={{
              display: "flex",
              marginTop: 22,
              border: `1px solid ${stroke}`,
              borderRadius: 14,
              overflow: "hidden",
              background: layer,
            }}
          >
            <Box style={{ flex: 1, textAlign: "center", padding: "22px 0" }}>
              <Text textStyle="t4Regular" style={{ color: fgMuted, display: "block" }}>
                가입일
              </Text>
              <Text textStyle="t6Bold" style={{ color: fg, display: "block", marginTop: 8 }}>
                26.01.09
              </Text>
            </Box>
            <Box style={{ width: 1, background: stroke }} />
            <Box style={{ flex: 1, textAlign: "center", padding: "22px 0" }}>
              <Text textStyle="t4Regular" style={{ color: fgMuted, display: "block" }}>
                모임 방문
              </Text>
              <Text textStyle="t6Bold" style={{ color: fg, display: "block", marginTop: 8 }}>
                365
              </Text>
            </Box>
          </Box>
        </Box>

        <Box style={{ display: "flex", borderBottom: `1px solid ${stroke}`, marginTop: 28 }}>
          {[
            { label: "게시글", value: "31", active: true },
            { label: "댓글", value: "0", active: false },
            { label: "일정 참여", value: "41", active: false },
          ].map(({ label, value, active }) => (
            <Box key={label} style={{ flex: 1, textAlign: "center", padding: "16px 0 14px", position: "relative" }}>
              <Text textStyle="t5Bold" style={{ color: active ? fg : fgMuted }}>
                {label} {value}
              </Text>
              {active && <Box style={{ position: "absolute", left: 0, right: 0, bottom: 0, height: 3, background: fg }} />}
            </Box>
          ))}
        </Box>

        <Box style={{ padding: "18px 20px 18px", borderBottom: `1px solid ${stroke}` }}>
          <Box style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <Photo w={42} h={42} circle />
            <Box style={{ flex: 1 }}>
              <Text textStyle="t5Bold" style={{ color: fg }}>
                {content.hostName} 👑
              </Text>
              <Text textStyle="t3Regular" style={{ color: fgMuted, display: "block", marginTop: 3 }}>
                4일 전 · 모임일정
              </Text>
            </Box>
            <FixedIcon svg={<MoreIcon />} size={20} color={fgMuted} />
          </Box>
          <Box style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 18 }}>
            <FixedIcon svg={<LockIcon />} size={18} color={fgMuted} />
            <Text textStyle="t5Regular" style={{ color: fgMuted }}>
              모임에만 공개된 게시글이에요.
            </Text>
          </Box>
          <Box style={{ display: "flex", alignItems: "center", gap: 22, marginTop: 18 }}>
            <FixedIcon svg={<ThumbsUpIcon />} size={24} color={fg} />
            <FixedIcon svg={<ChatIcon />} size={24} color={fg} />
            <FixedIcon svg={<ShareIcon />} size={24} color={fg} />
            <Box style={{ flex: 1 }} />
            <Text textStyle="t4Regular" style={{ color: fgMuted }}>
              조회 {primaryPost?.views ?? 24}
            </Text>
          </Box>
        </Box>
      </Box>

      <Box
        style={{
          flexShrink: 0,
          display: "flex",
          alignItems: "center",
          gap: 12,
          padding: "14px 20px 18px",
          borderTop: `1px solid ${stroke}`,
          background: layer,
        }}
      >
        <Box style={{ flex: 1, minWidth: 0 }}>
          <Text textStyle="t5Bold" maxLines={1} style={{ color: fg }}>
            {meetup.title}
          </Text>
          <Text textStyle="t4Regular" style={{ color: fgMuted, display: "block", marginTop: 3 }}>
            {region} · {memberCount} · {content.categoryLabel}
          </Text>
        </Box>
        <Box
          as="button"
          onClick={onBack}
          style={{ border: "none", borderRadius: 10, background: fill, padding: "13px 18px", cursor: "pointer" }}
        >
          <Text textStyle="t5Bold" style={{ color: fg }}>
            모임 둘러보기
          </Text>
        </Box>
        <Box
          as="button"
          onClick={onJoin}
          style={{ border: "none", borderRadius: 10, background: brand, padding: "13px 18px", cursor: "pointer" }}
        >
          <Text textStyle="t5Bold" style={{ color: "var(--seed-color-palette-static-white)" }}>
            가입
          </Text>
        </Box>
      </Box>
    </Box>
  );
}

function MembersPage({
  members,
  memberCount,
  onBack,
}: {
  members: typeof MEMBERS;
  memberCount: string;
  onBack: () => void;
}) {
  return (
    <Box
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 70,
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
      <Box
        style={{
          flexShrink: 0,
          display: "flex",
          alignItems: "center",
          padding: "14px 14px 12px",
          borderBottom: `1px solid ${stroke}`,
        }}
      >
        <SolidIcon svg={<BackIcon />} onClick={onBack} />
        <Text textStyle="t7Bold" style={{ color: fg, flex: 1, textAlign: "center" }}>
          멤버 {memberCount}
        </Text>
        <Box style={{ width: 32 }} />
      </Box>

      <Box className="no-scrollbar" style={{ flex: 1, overflowY: "auto", padding: "14px 0 24px" }}>
        {members.map((m, i) => (
          <Box
            key={`${m.name}-${i}`}
            style={{ display: "flex", alignItems: "center", gap: 12, padding: "12px 20px" }}
          >
            <Photo w={46} h={46} circle />
            <Box style={{ flex: 1, minWidth: 0 }}>
              <Box style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <Text textStyle="t5Bold" style={{ color: fg }}>
                  {m.name}
                </Text>
                <Text textStyle="t3Regular" style={{ color: fgMuted }}>
                  {m.region}
                </Text>
              </Box>
              {m.desc && (
                <Text textStyle="t4Regular" style={{ color: fgMuted, display: "block", marginTop: 4 }}>
                  {m.desc}
                </Text>
              )}
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  );
}

/* 매너온도 배지 (숫자 + 작은 게이지) */
function MannerTemp({ value }: { value: string }) {
  const color = "#f5961e";
  return (
    <Box style={{ display: "flex", flexDirection: "column", gap: 3, paddingTop: 1 }}>
      <Text textStyle="t2Bold" style={{ color }}>
        {value}°C
      </Text>
      <Box style={{ width: 38, height: 4, borderRadius: 999, background: "#ffe6c7", overflow: "hidden" }}>
        <Box style={{ width: "64%", height: "100%", background: color }} />
      </Box>
    </Box>
  );
}

/* 일정 후기 카드 (사진 + 좋아요/댓글 + 작성자) */
function ReviewCard({
  review,
  onClick,
}: {
  review: { hue: number; likes: number; comments?: number; author: string };
  onClick?: () => void;
}) {
  return (
    <Box
      as="button"
      onClick={onClick}
      style={{
        width: 132,
        flexShrink: 0,
        border: "none",
        background: "transparent",
        padding: 0,
        cursor: "pointer",
        textAlign: "left",
      }}
    >
      <Box style={{ position: "relative" }}>
        <Photo w={132} h={132} radius={14} />
        {/* 좋아요/댓글 배지 */}
        <Box
          style={{
            position: "absolute",
            left: 8,
            bottom: 8,
            display: "flex",
            alignItems: "center",
            gap: 8,
            background: "rgba(0,0,0,0.5)",
            borderRadius: 999,
            padding: "4px 10px",
            color: "var(--seed-color-palette-static-white)",
          }}
        >
          <Box style={{ display: "flex", alignItems: "center", gap: 3 }}>
            <FixedIcon svg={<ThumbsUpIcon />} size={13} color="var(--seed-color-palette-static-white)" />
            <Text textStyle="t2Bold" style={{ color: "var(--seed-color-palette-static-white)" }}>
              {review.likes}
            </Text>
          </Box>
          {review.comments != null && (
            <Box style={{ display: "flex", alignItems: "center", gap: 3 }}>
              <FixedIcon svg={<ChatIcon />} size={13} color="var(--seed-color-palette-static-white)" />
              <Text textStyle="t2Bold" style={{ color: "var(--seed-color-palette-static-white)" }}>
                {review.comments}
              </Text>
            </Box>
          )}
        </Box>
      </Box>
      {/* 작성자 */}
      <Box style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 8 }}>
        <Box
          style={{
            width: 22,
            height: 22,
            borderRadius: "50%",
            background: fill,
            flexShrink: 0,
          }}
        />
        <Text textStyle="t3Regular" maxLines={1} style={{ color: fgMuted }}>
          {review.author}
        </Text>
      </Box>
    </Box>
  );
}

/* 일정 행 (날짜 칩 + 제목 + 시간/인원 + 상태) */
function ScheduleRow({
  item,
}: {
  item: { month: string; day: string; title: string; locked?: boolean; time: string; people: string };
}) {
  return (
    <Box style={{ display: "flex", gap: 14, padding: "10px 20px", alignItems: "flex-start" }}>
      <Box
        style={{
          width: 46,
          borderRadius: 8,
          background: fill,
          padding: "7px 0",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          flexShrink: 0,
        }}
      >
        <Text textStyle="t1Regular" style={{ color: fgMuted }}>
          {item.month}
        </Text>
        <Text textStyle="t6Bold" style={{ color: fg }}>
          {item.day}
        </Text>
      </Box>
      <Box style={{ flex: 1, minWidth: 0, paddingTop: 2 }}>
        <Box style={{ display: "flex", alignItems: "center", gap: 6 }}>
          {item.locked && <FixedIcon svg={<LockIcon />} size={15} color={fgMuted} />}
          <Text textStyle="t5Regular" maxLines={1} style={{ color: item.locked ? fgMuted : fg }}>
            {item.title}
          </Text>
        </Box>
        <Box style={{ display: "flex", alignItems: "center", gap: 12, marginTop: 8 }}>
          <Box style={{ display: "flex", alignItems: "center", gap: 4 }}>
            <FixedIcon svg={<ClockIcon />} size={15} color={fgMuted} />
            <Text textStyle="t3Regular" style={{ color: fgMuted }}>
              {item.time}
            </Text>
          </Box>
          <Box style={{ display: "flex", alignItems: "center", gap: 4 }}>
            <FixedIcon svg={<PeopleIcon />} size={15} color={fgMuted} />
            <Text textStyle="t3Regular" style={{ color: fgMuted }}>
              {item.people}
            </Text>
          </Box>
        </Box>
        <Box style={{ display: "inline-flex", marginTop: 8, background: fill, borderRadius: 6, padding: "3px 9px" }}>
          <Text textStyle="t2Regular" style={{ color: fgMuted }}>
            종료
          </Text>
        </Box>
      </Box>
    </Box>
  );
}

/* 챌린지 행 */
function ChallengeRow({
  item,
}: {
  item: { title: string; status: string; ongoing?: boolean; period: string; people: string };
}) {
  return (
    <Box style={{ padding: "12px 20px" }}>
      <Text textStyle="t5Bold" style={{ color: fg, display: "block" }}>
        {item.title}
      </Text>
      <Box style={{ display: "flex", alignItems: "center", gap: 5, marginTop: 6 }}>
        <Text textStyle="t4Bold" style={{ color: item.ongoing ? brand : fgMuted }}>
          {item.status}
        </Text>
        <Text textStyle="t4Regular" style={{ color: fgMuted }}>
          · {item.period}
        </Text>
      </Box>
      <Box style={{ display: "flex", alignItems: "center", gap: 4, marginTop: 8 }}>
        <FixedIcon svg={<PeopleIcon />} size={15} color={fgMuted} />
        <Text textStyle="t3Regular" style={{ color: fgMuted }}>
          {item.people}
        </Text>
      </Box>
    </Box>
  );
}

/* 게시글 카드 */
function PostCard({ post }: { post: Post }) {
  return (
    <Box style={{ padding: "16px 20px", borderTop: `1px solid ${stroke}` }}>
      {/* 작성자 */}
      <Box style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <Photo w={36} h={36} circle />
        <Box style={{ flex: 1, minWidth: 0 }}>
          <Box style={{ display: "flex", alignItems: "center", gap: 4 }}>
            <Text textStyle="t4Bold" style={{ color: fg }}>
              {post.author}
            </Text>
            {post.verified && <FixedIcon svg={<CheckCircleIcon />} size={15} color={fgInformative} />}
          </Box>
          <Text textStyle="t2Regular" style={{ color: fgMuted, display: "block", marginTop: 1 }}>
            {post.time} · {post.board}
          </Text>
        </Box>
        <FixedIcon svg={<MoreIcon />} size={18} color={fgMuted} />
      </Box>

      {/* 본문 */}
      {post.locked ? (
        <Box style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 14 }}>
          <FixedIcon svg={<LockIcon />} size={15} color={fgMuted} />
          <Text textStyle="t5Regular" style={{ color: fgMuted }}>
            모임에만 공개된 게시글이에요.
          </Text>
        </Box>
      ) : (
        <Box style={{ marginTop: 12 }}>
          <Text textStyle="t5Regular" style={{ color: fg, lineHeight: 1.6 }}>
            {post.lines?.map((l, j) => (
              <span key={j}>
                {l}
                {j < (post.lines?.length ?? 0) - 1 && <br />}
              </span>
            ))}
          </Text>
          {post.truncate && (
            <Text textStyle="t5Regular" style={{ color: fgMuted, display: "block", marginTop: 2 }}>
              ...더보기
            </Text>
          )}
        </Box>
      )}

      {post.photo && <Photo w="100%" h={230} radius={12} style={{ marginTop: 12 }} />}

      {post.challenge && (
        <Box
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            border: `1px solid ${stroke}`,
            borderRadius: 12,
            padding: "12px 14px",
            marginTop: 12,
          }}
        >
          <Box
            style={{
              width: 34,
              height: 34,
              borderRadius: "50%",
              background: "#fff0e6",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}
          >
            <FixedIcon svg={<FireIcon />} size={18} color={brand} />
          </Box>
          <Box style={{ flex: 1, minWidth: 0 }}>
            <Text textStyle="t4Bold" maxLines={1} style={{ color: fg, display: "block" }}>
              {post.challenge.title}
            </Text>
            <Text textStyle="t3Regular" style={{ color: fgMuted, display: "block", marginTop: 2 }}>
              {post.challenge.sub}
            </Text>
          </Box>
          <FixedIcon svg={<ChevronRightIcon />} size={18} color={fgMuted} />
        </Box>
      )}

      {/* 반응 */}
      <Box style={{ display: "flex", alignItems: "center", gap: 16, marginTop: 14 }}>
        <Box style={{ display: "flex", alignItems: "center", gap: 5 }}>
          <FixedIcon svg={<ThumbsUpIcon />} size={17} color={fgMuted} />
          <Text textStyle="t3Regular" style={{ color: fgMuted }}>
            {post.likes}
          </Text>
        </Box>
        <Box style={{ display: "flex", alignItems: "center", gap: 5 }}>
          <FixedIcon svg={<ChatIcon />} size={17} color={fgMuted} />
          <Text textStyle="t3Regular" style={{ color: fgMuted }}>
            {post.comments}
          </Text>
        </Box>
        <FixedIcon svg={<ShareIcon />} size={17} color={fgMuted} />
        <Box style={{ flex: 1 }} />
        <Text textStyle="t3Regular" style={{ color: fgMuted }}>
          조회 {post.views}
        </Text>
      </Box>
    </Box>
  );
}

/* 추천 모임 행 */
function RecommendRow({
  item,
}: {
  item: { title: string; desc: string; region: string; count: string; active?: string };
}) {
  return (
    <Box style={{ display: "flex", gap: 14, padding: "12px 20px" }}>
      <Photo w={64} h={64} radius={14} />
      <Box
        style={{
          flex: 1,
          minWidth: 0,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          gap: 4,
        }}
      >
        <Text textStyle="t5Bold" maxLines={1} style={{ color: fg }}>
          {item.title}
        </Text>
        <Text textStyle="t4Regular" maxLines={1} style={{ color: fgSubtle }}>
          {item.desc}
        </Text>
        <Box style={{ display: "flex", alignItems: "center", gap: 3, marginTop: 2, minWidth: 0 }}>
          <FixedIcon svg={<PinIcon />} size={14} color={fgMuted} />
          <Text textStyle="t3Regular" style={{ color: fgMuted }}>
            {item.region}
          </Text>
          <Text textStyle="t3Regular" style={{ color: fgMuted }}>
            ·
          </Text>
          <FixedIcon svg={<PeopleIcon />} size={14} color={fgMuted} />
          <Text textStyle="t3Regular" style={{ color: fgMuted }}>
            {item.count}
          </Text>
          {item.active && (
            <>
              <Text textStyle="t3Regular" style={{ color: fgMuted }}>
                ·
              </Text>
              <Text textStyle="t3Regular" style={{ color: fgInformative }}>
                {item.active}
              </Text>
            </>
          )}
        </Box>
      </Box>
    </Box>
  );
}

/* 추천 온라인 카페 카드 */
function CafeCard({ item }: { item: { title: string; count: string } }) {
  return (
    <Box style={{ width: 116, flexShrink: 0 }}>
      <Photo w={116} h={116} radius={14} />
      <Text
        textStyle="t4Regular"
        maxLines={2}
        style={{ color: fg, display: "block", marginTop: 8, lineHeight: 1.35 }}
      >
        {item.title}
      </Text>
      <Box style={{ display: "flex", alignItems: "center", gap: 3, marginTop: 5 }}>
        <FixedIcon svg={<PeopleIcon />} size={13} color={fgMuted} />
        <Text textStyle="t2Regular" style={{ color: fgMuted }}>
          {item.count}
        </Text>
      </Box>
    </Box>
  );
}

/* 자주 모이는 장소 — 오프라인에서도 렌더되는 CSS 가짜 지도 */
function FauxMap() {
  return (
    <Box style={{ position: "relative", height: 150, background: "#e8ede8", overflow: "hidden" }}>
      {/* 도로 */}
      <Box style={{ position: "absolute", left: 0, right: 0, top: 84, height: 14, background: "#cfd6e4", transform: "rotate(-6deg)" }} />
      <Box style={{ position: "absolute", left: 0, right: 0, top: 88, height: 4, background: "#a9b4ca", transform: "rotate(-6deg)" }} />
      <Box style={{ position: "absolute", left: "26%", top: 0, bottom: 0, width: 8, background: "#dfe4dc", transform: "rotate(8deg)" }} />
      <Box style={{ position: "absolute", left: "64%", top: 0, bottom: 0, width: 6, background: "#dfe4dc" }} />
      {/* 블록 */}
      <Box style={{ position: "absolute", left: 18, top: 18, width: 40, height: 26, background: "#dde3da", borderRadius: 3 }} />
      <Box style={{ position: "absolute", right: 28, top: 22, width: 34, height: 22, background: "#dde3da", borderRadius: 3 }} />
      <Box style={{ position: "absolute", right: 40, bottom: 20, width: 30, height: 24, background: "#dde3da", borderRadius: 3 }} />
      {/* 중심 핀 */}
      <Box
        style={{
          position: "absolute",
          left: "50%",
          top: "44%",
          transform: "translate(-50%, -100%)",
          width: 34,
          height: 34,
          color: brand,
        }}
      >
        <Icon svg={<PinFilledIcon />} />
      </Box>
    </Box>
  );
}

/* 앨범보기 배지용 작은 사진 글리프 */
function AlbumGlyph() {
  return (
    <svg
      viewBox="0 0 24 24"
      width="100%"
      height="100%"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{ display: "block" }}
    >
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <circle cx="8.5" cy="10" r="1.4" />
      <path d="m4 18 5-5 4 4 3-3 4 4" />
    </svg>
  );
}


