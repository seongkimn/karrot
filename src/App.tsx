import { useState } from "react";
import {
  ActionButton,
  Badge,
  Box,
  Callout,
  Switch,
  Text,
  TextField,
} from "@seed-design/react";
import "./App.css";

/**
 * 당근(Karrot) Seed Design 시스템 데모.
 *
 * - 디자인 토큰 + 컴포넌트 스타일은 `@seed-design/css/all.css` (main.tsx)에서 불러옵니다.
 * - 테마(색상 모드)는 index.html 의 `<html data-seed data-seed-color-mode="...">` 로 지정합니다.
 */

function Section({
  title,
  description,
  children,
}: {
  title: string;
  description?: string;
  children: React.ReactNode;
}) {
  return (
    <Box
      as="section"
      style={{
        background: "var(--seed-color-bg-layer-default)",
        borderRadius: 16,
        padding: 24,
        display: "flex",
        flexDirection: "column",
        gap: 16,
      }}
    >
      <Box>
        <Text as="h2" textStyle="t6Bold">
          {title}
        </Text>
        {description ? (
          <Text
            as="p"
            textStyle="t4Regular"
            color="fg.neutral-subtle"
            style={{ marginTop: 4, display: "block" }}
          >
            {description}
          </Text>
        ) : null}
      </Box>
      {children}
    </Box>
  );
}

export default function App() {
  const [pushEnabled, setPushEnabled] = useState(true);
  const [nickname, setNickname] = useState("");

  return (
    <Box
      style={{
        maxWidth: 720,
        margin: "0 auto",
        padding: "32px 20px 80px",
        display: "flex",
        flexDirection: "column",
        gap: 24,
      }}
    >
      {/* Header */}
      <Box style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        <Box style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <Text as="h1" textStyle="t8Bold">
            Seed Design
          </Text>
          <Badge tone="brand" variant="weak">
            당근
          </Badge>
        </Box>
        <Text as="p" textStyle="t4Regular" color="fg.neutral-subtle">
          당근에서 만든 오픈소스 디자인 시스템을 React + Vite 환경에 가져왔습니다.
        </Text>
      </Box>

      {/* Buttons */}
      <Section
        title="Action Button"
        description="variant / size 등 다양한 액션 버튼 스타일"
      >
        <Box style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
          <ActionButton variant="brandSolid">브랜드</ActionButton>
          <ActionButton variant="neutralSolid">뉴트럴</ActionButton>
          <ActionButton variant="neutralWeak">약하게</ActionButton>
          <ActionButton variant="criticalSolid">삭제</ActionButton>
          <ActionButton variant="brandOutline">아웃라인</ActionButton>
          <ActionButton variant="ghost">고스트</ActionButton>
        </Box>
        <Box
          style={{
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            gap: 8,
          }}
        >
          <ActionButton size="large">large</ActionButton>
          <ActionButton size="medium">medium</ActionButton>
          <ActionButton size="small">small</ActionButton>
          <ActionButton size="xsmall">xsmall</ActionButton>
        </Box>
      </Section>

      {/* Badges */}
      <Section title="Badge" description="tone 별 뱃지">
        <Box style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
          <Badge tone="neutral">중립</Badge>
          <Badge tone="brand">브랜드</Badge>
          <Badge tone="informative">정보</Badge>
          <Badge tone="positive">긍정</Badge>
          <Badge tone="warning">주의</Badge>
          <Badge tone="critical">경고</Badge>
        </Box>
      </Section>

      {/* TextField */}
      <Section title="Text Field" description="입력 필드 컴포넌트">
        <Box style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          <Text textStyle="t4Medium" style={{ display: "block" }}>
            닉네임
          </Text>
          <TextField.Root
            value={nickname}
            onValueChange={(value) => setNickname(value)}
          >
            <TextField.Input placeholder="예) 당근당근" />
          </TextField.Root>
          <Text textStyle="t3Regular" color="fg.neutral-subtle">
            이웃에게 보여질 닉네임을 입력하세요.
          </Text>
        </Box>
      </Section>

      {/* Switch */}
      <Section title="Switch" description="토글 스위치">
        <Switch.Root
          checked={pushEnabled}
          onCheckedChange={(checked) => setPushEnabled(checked)}
          style={{ display: "flex", alignItems: "center", gap: 12 }}
        >
          <Switch.Label>
            <Text textStyle="t4Medium">푸시 알림 받기</Text>
          </Switch.Label>
          <Switch.HiddenInput />
          <Switch.Control>
            <Switch.Thumb />
          </Switch.Control>
        </Switch.Root>
        <Text textStyle="t3Regular" color="fg.neutral-subtle">
          현재 상태: {pushEnabled ? "켜짐" : "꺼짐"}
        </Text>
      </Section>

      {/* Callout */}
      <Section title="Callout" description="안내/주의 메시지">
        <Callout.Root tone="informative">
          <Callout.Content>
            <Callout.Title>안전 거래 안내</Callout.Title>
            <Callout.Description>
              가급적 직거래로 진행하고, 송금 전에는 판매자를 한 번 더 확인하세요.
            </Callout.Description>
          </Callout.Content>
        </Callout.Root>
      </Section>
    </Box>
  );
}
