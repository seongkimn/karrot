import { useRef, useState } from "react";
import {
  ActionButton,
  Box,
  Chip,
  Icon,
  Slider,
  Switch,
  Text,
  TextField,
} from "@seed-design/react";
import {
  AlertCircleIcon,
  CameraIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  CloseIcon,
  PinIcon,
  SearchIcon,
  ShieldCheckIcon,
  SparkleIcon,
} from "./icons";
import {
  FixedIcon,
  fg,
  fgCritical,
  fgInformative,
  fgMuted,
  fgSubtle,
  fill,
  layer,
  stroke,
} from "./shared";

/* ================================================================== */
/* 데이터                                                             */
/* ================================================================== */

export type MeetupDraft = {
  name: string;
  category: string | null;
  region: string | null;
  range: number;
  intro: string;
  photo: string | null;
  age: string;
  requireVerification: boolean;
  shareAgeGender: boolean;
  nickname: string;
  selfIntro: string;
  preferredTimes: string[];
  promo: string;
};

const CATEGORIES = [
  "운동",
  "동네친구",
  "아웃도어/여행",
  "자기계발",
  "가족/육아",
  "반려동물",
  "음식/음료",
  "취미/오락",
  "독서/인문학",
  "문화/예술",
  "음악/악기",
];

const REGIONS = ["길동", "공릉동"];
const AGES = ["누구나", "20대", "30대", "40대", "50대", "60대", "직접 입력"];
const TIMES = ["모든 시간", "평일 오전", "평일 오후", "주말 오전", "주말 오후"];
const WIZARD_TOTAL = 5;

/* ================================================================== */
/* 공용 작은 컴포넌트                                                  */
/* ================================================================== */

/** 선택형 칩: 선택 시 어두운 solid, 미선택 시 흰 배경 + 옅은 테두리 */
function SelectChip({
  label,
  selected,
  onClick,
  prefix,
  suffix,
}: {
  label: string;
  selected?: boolean;
  onClick?: () => void;
  prefix?: React.ReactNode;
  suffix?: React.ReactNode;
}) {
  const checked = selected ? { "data-checked": true } : {};
  return (
    <Chip.Root
      variant={selected ? "solid" : "outlineWeak"}
      onClick={onClick}
      style={{ flexShrink: 0, cursor: "pointer" }}
      {...checked}
    >
      {prefix && (
        <Chip.PrefixIcon {...checked}>
          <FixedIcon
            svg={prefix}
            color={selected ? "var(--seed-color-fg-neutral-inverted)" : fgMuted}
          />
        </Chip.PrefixIcon>
      )}
      <Chip.Label {...checked}>{label}</Chip.Label>
      {suffix && (
        <Chip.SuffixIcon {...checked}>
          <FixedIcon
            svg={suffix}
            color={selected ? "var(--seed-color-fg-neutral-inverted)" : fg}
          />
        </Chip.SuffixIcon>
      )}
    </Chip.Root>
  );
}

/** 섹션 제목 (모임명 / 카테고리 ...) */
function Label({ children }: { children: React.ReactNode }) {
  return (
    <Text as="h2" textStyle="t6Bold" style={{ color: fg, display: "block" }}>
      {children}
    </Text>
  );
}

/** 빨간 검증 메시지 */
function FieldError({ children }: { children: React.ReactNode }) {
  return (
    <Box style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 8 }}>
      <FixedIcon svg={<AlertCircleIcon />} size={18} color={fgCritical} />
      <Text textStyle="t4Regular" style={{ color: fgCritical }}>
        {children}
      </Text>
    </Box>
  );
}

/* ================================================================== */
/* 위저드 셸 (헤더 + 스크롤 본문 + 하단 고정 버튼/진행바)               */
/* ================================================================== */

function WizardShell({
  onClose,
  onSkip,
  progress,
  footer,
  children,
}: {
  onClose: () => void;
  onSkip?: () => void;
  progress?: number; // 채워진 칸 수 (1~5). 없으면 진행바 숨김
  footer: React.ReactNode;
  children: React.ReactNode;
}) {
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
        <Box
          as="button"
          onClick={onClose}
          style={{
            width: 28,
            height: 28,
            border: "none",
            background: "transparent",
            cursor: "pointer",
            padding: 0,
            color: fg,
          }}
        >
          <Icon svg={<CloseIcon />} />
        </Box>
        {onSkip && (
          <Box
            as="button"
            onClick={onSkip}
            style={{
              border: "none",
              background: "transparent",
              cursor: "pointer",
              padding: 0,
            }}
          >
            <Text textStyle="t5Regular" style={{ color: fg }}>
              건너뛰기
            </Text>
          </Box>
        )}
      </Box>

      {/* 본문 */}
      <Box
        className="no-scrollbar"
        style={{ flex: 1, overflowY: "auto", padding: "8px 20px 24px" }}
      >
        {children}
      </Box>

      {/* 하단 고정 */}
      <Box style={{ flexShrink: 0, background: layer }}>
        {progress !== undefined && (
          <Box style={{ display: "flex", gap: 6, padding: "0 4px 12px" }}>
            {Array.from({ length: WIZARD_TOTAL }).map((_, i) => (
              <Box
                key={i}
                style={{
                  flex: 1,
                  height: 3,
                  borderRadius: 999,
                  background: i < progress ? fg : fill,
                }}
              />
            ))}
          </Box>
        )}
        <Box style={{ display: "flex", gap: 8, padding: "0 16px 16px" }}>
          {footer}
        </Box>
      </Box>
    </Box>
  );
}

/** 하단 가득 채우는 1차 버튼 */
function PrimaryButton({
  children,
  onClick,
  disabled,
}: {
  children: React.ReactNode;
  onClick: () => void;
  disabled?: boolean;
}) {
  return (
    <ActionButton
      variant="brandSolid"
      size="large"
      onClick={onClick}
      disabled={disabled}
      style={{ flex: 1 }}
    >
      {children}
    </ActionButton>
  );
}

function PrevButton({ onClick }: { onClick: () => void }) {
  return (
    <ActionButton variant="neutralWeak" size="large" onClick={onClick}>
      이전
    </ActionButton>
  );
}

/* ================================================================== */
/* STEP 0 — 기본 정보                                                  */
/* ================================================================== */

function CategoryPicker({
  value,
  onChange,
}: {
  value: string | null;
  onChange: (c: string) => void;
}) {
  const [expanded, setExpanded] = useState(false);

  // 접힌 상태: 선택값이 기본 2개에 없으면 맨 앞에 노출
  const base = CATEGORIES.slice(0, 2);
  const collapsed =
    value && !base.includes(value) ? [value, base[0]] : base;
  const visible = expanded ? CATEGORIES : collapsed;

  return (
    <Box style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
      {visible.map((c) => (
        <SelectChip
          key={c}
          label={c}
          selected={value === c}
          onClick={() => onChange(c)}
        />
      ))}
      <SelectChip
        label={expanded ? "접기" : "더보기"}
        suffix={expanded ? <ChevronUpIcon /> : <ChevronDownIcon />}
        onClick={() => setExpanded((v) => !v)}
      />
    </Box>
  );
}

/** 활동 범위 가짜 지도 */
function RangeMap({ range }: { range: number }) {
  // range(0~100)에 따라 반경이 커지는 주황 원
  const r = 90 + range * 0.9;
  return (
    <Box
      style={{
        position: "relative",
        height: 230,
        borderRadius: 12,
        overflow: "hidden",
        background: "#eef0ee",
      }}
    >
      {/* 도로/구역 느낌의 옅은 선 */}
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 380 230"
        preserveAspectRatio="xMidYMid slice"
        style={{ position: "absolute", inset: 0 }}
      >
        <rect width="380" height="230" fill="#eef0ee" />
        <path d="M0 60 H380 M0 150 H380 M120 0 V230 M260 0 V230" stroke="#dfe2df" strokeWidth="14" />
        <path d="M40 0 L200 230 M300 0 L380 120" stroke="#d6d9d6" strokeWidth="6" />
        <circle cx="300" cy="120" r="26" fill="#d7e8cf" />
      </svg>
      {/* 활동 범위 원 */}
      <Box
        style={{
          position: "absolute",
          left: "50%",
          top: "50%",
          width: r,
          height: r,
          transform: "translate(-50%, -50%)",
          borderRadius: "50%",
          background: "rgba(255,102,0,0.18)",
          border: "1px solid rgba(255,102,0,0.4)",
        }}
      />
      {/* 동네 라벨 */}
      {[
        { t: "천호1동", l: "16%", top: "26%" },
        { t: "명일2동", l: "62%", top: "18%" },
        { t: "천호3동", l: "10%", top: "58%" },
        { t: "길동", l: "44%", top: "70%" },
        { t: "강동역", l: "16%", top: "82%" },
      ].map((p) => (
        <Text
          key={p.t}
          textStyle="t3Bold"
          style={{
            position: "absolute",
            left: p.l,
            top: p.top,
            color: "#8a8f8a",
            whiteSpace: "nowrap",
          }}
        >
          {p.t}
        </Text>
      ))}
    </Box>
  );
}

function BasicStep({
  draft,
  set,
  onSubmit,
  onClose,
}: {
  draft: MeetupDraft;
  set: <K extends keyof MeetupDraft>(k: K, v: MeetupDraft[K]) => void;
  onSubmit: () => void;
  onClose: () => void;
}) {
  const [showErrors, setShowErrors] = useState(false);

  const nameInvalid = draft.name.trim().length === 0;
  const introInvalid = draft.intro.trim().length < 8;
  const categoryInvalid = !draft.category;
  const regionInvalid = !draft.region;

  const handleSubmit = () => {
    if (nameInvalid || introInvalid || categoryInvalid || regionInvalid) {
      setShowErrors(true);
      return;
    }
    onSubmit();
  };

  return (
    <WizardShell
      onClose={onClose}
      footer={<PrimaryButton onClick={handleSubmit}>모임 만들기</PrimaryButton>}
    >
      <Text as="h1" textStyle="t8Bold" style={{ color: fg, display: "block" }}>
        어떤 모임을 만들까요?
      </Text>

      {/* 모임명 */}
      <Box style={{ marginTop: 28 }}>
        <Label>모임명</Label>
        <Box style={{ marginTop: 10 }}>
          <TextField.Root
            variant="outline"
            size="large"
            value={draft.name}
            onValueChange={(v) => set("name", v.slice(0, 24))}
            style={
              showErrors && nameInvalid
                ? {
                    borderColor: fgCritical,
                    boxShadow: `inset 0 0 0 1px ${fgCritical}`,
                  }
                : undefined
            }
          >
            <TextField.Input placeholder="모임명이 짧을수록 이해하기 쉬워요." />
          </TextField.Root>
        </Box>
        <Box
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginTop: 6,
          }}
        >
          {showErrors && nameInvalid ? (
            <FieldError>모임명을 입력해주세요.</FieldError>
          ) : (
            <span />
          )}
          <Text textStyle="t3Regular" style={{ color: fgMuted }}>
            {draft.name.length}/24
          </Text>
        </Box>
      </Box>

      {/* 카테고리 */}
      <Box style={{ marginTop: 24 }}>
        <Label>카테고리</Label>
        <Box style={{ marginTop: 12 }}>
          <CategoryPicker
            value={draft.category}
            onChange={(c) => set("category", c)}
          />
        </Box>
        {showErrors && categoryInvalid && (
          <FieldError>카테고리를 선택해주세요.</FieldError>
        )}
      </Box>

      {/* 활동 지역 */}
      <Box style={{ marginTop: 24 }}>
        <Label>활동 지역</Label>
        <Box style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: 12 }}>
          <SelectChip label="검색" prefix={<SearchIcon />} />
          {REGIONS.map((r) => (
            <SelectChip
              key={r}
              label={r}
              selected={draft.region === r}
              onClick={() => set("region", r)}
            />
          ))}
        </Box>
        {showErrors && regionInvalid && (
          <FieldError>활동 지역을 선택해주세요.</FieldError>
        )}
      </Box>

      {/* 활동 범위 (지역 선택 시) */}
      {draft.region && (
        <Box style={{ marginTop: 28 }}>
          <Label>활동 범위</Label>
          <Box style={{ marginTop: 14, padding: "0 4px" }}>
            <Slider.Root
              min={0}
              max={100}
              values={[draft.range]}
              onValuesChange={(v) => set("range", v[0])}
            >
              <Slider.Control>
                <Slider.Track>
                  <Slider.Range />
                </Slider.Track>
                <Slider.Thumb thumbIndex={0}>
                  <Slider.HiddenInput thumbIndex={0} />
                </Slider.Thumb>
              </Slider.Control>
            </Slider.Root>
          </Box>
          <Box
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginTop: 8,
            }}
          >
            <Text textStyle="t4Regular" style={{ color: fg }}>
              가까운 동네
            </Text>
            <Text textStyle="t4Regular" style={{ color: fg }}>
              먼 동네
            </Text>
          </Box>
          <Box style={{ marginTop: 16 }}>
            <RangeMap range={draft.range} />
          </Box>
        </Box>
      )}

      {/* 모임 소개 */}
      <Box style={{ marginTop: 28 }}>
        <Label>모임 소개</Label>
        <Box style={{ marginTop: 10 }}>
          <TextField.Root
            variant="outline"
            value={draft.intro}
            onValueChange={(v) => set("intro", v.slice(0, 500))}
            style={
              showErrors && introInvalid
                ? {
                    borderColor: fgCritical,
                    boxShadow: `inset 0 0 0 1px ${fgCritical}`,
                  }
                : undefined
            }
          >
            <TextField.Textarea
              placeholder="활동 중심으로 모임을 소개해주세요. 소개를 잘 작성한 모임은 2배 많은 이웃이 가입해요."
              style={{ minHeight: 150 }}
            />
          </TextField.Root>
        </Box>
        <Box
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginTop: 6,
          }}
        >
          {showErrors && introInvalid ? (
            <FieldError>모임 소개를 8자 이상 입력해주세요.</FieldError>
          ) : (
            <span />
          )}
          <Text
            textStyle="t3Regular"
            style={{ color: showErrors && introInvalid ? fgCritical : fgMuted }}
          >
            {draft.intro.length}/500
          </Text>
        </Box>
      </Box>

      {/* TIP */}
      <Box style={{ marginTop: 24 }}>
        <Box style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <Box
            style={{
              background: "var(--seed-color-bg-informative-subtle)",
              borderRadius: 6,
              padding: "2px 7px",
            }}
          >
            <Text textStyle="t2Bold" style={{ color: fgInformative }}>
              TIP
            </Text>
          </Box>
          <Text textStyle="t4Regular" style={{ color: fgInformative }}>
            이런 내용으로 모임을 소개해보세요.
          </Text>
        </Box>
        <Box
          style={{
            marginTop: 12,
            background: fill,
            borderRadius: 10,
            padding: "16px 18px",
            display: "flex",
            flexDirection: "column",
            gap: 8,
          }}
        >
          {[
            "주로 어떤 활동을 하나요?",
            "언제, 어디에서 활동하나요?",
            "어떤 사람들과 함께하고 싶나요?",
            "모임에서 지켜야 할 규칙이 있나요? (가입 조건, 출석 조건, 강퇴 조건 등)",
          ].map((t) => (
            <Box key={t} style={{ display: "flex", gap: 8 }}>
              <Text textStyle="t4Regular" style={{ color: fg }}>
                ·
              </Text>
              <Text textStyle="t4Regular" style={{ color: fg, flex: 1 }}>
                {t}
              </Text>
            </Box>
          ))}
        </Box>
      </Box>
    </WizardShell>
  );
}

/* ================================================================== */
/* 위저드 STEP 1 — 나이대                                              */
/* ================================================================== */

const CONFETTI = [
  { bg: "#ff6f0f", w: 16, h: 16, r: "50%", left: "24%", top: "62%", rot: 0 },
  { bg: "#fdb913", w: 26, h: 18, r: 4, left: "26%", top: "40%", rot: -18 },
  { bg: "#4d7df0", w: 16, h: 16, r: 3, left: "43%", top: "50%", rot: 20 },
  { bg: "#1bb55c", w: 18, h: 18, r: "50%", left: "82%", top: "33%", rot: 0 },
];

function AgeStep({
  draft,
  set,
  onNext,
  onClose,
}: {
  draft: MeetupDraft;
  set: <K extends keyof MeetupDraft>(k: K, v: MeetupDraft[K]) => void;
  onNext: () => void;
  onClose: () => void;
}) {
  return (
    <WizardShell
      onClose={onClose}
      progress={1}
      footer={<PrimaryButton onClick={onNext}>다음</PrimaryButton>}
    >
      <Text as="h1" textStyle="t8Bold" style={{ color: fg, display: "block", lineHeight: 1.35 }}>
        모임을 만들었어요
        <br />
        선호하는 나이대를 설정해주세요
      </Text>

      <Box style={{ display: "flex", flexWrap: "wrap", gap: 10, marginTop: 28 }}>
        {AGES.map((a) => (
          <SelectChip
            key={a}
            label={a}
            selected={draft.age === a}
            onClick={() => set("age", a)}
          />
        ))}
      </Box>

      {/* 축하 컨페티 */}
      <Box style={{ position: "relative", height: 220 }}>
        {CONFETTI.map((c, i) => (
          <Box
            key={i}
            style={{
              position: "absolute",
              left: c.left,
              top: c.top,
              width: c.w,
              height: c.h,
              background: c.bg,
              borderRadius: c.r,
              transform: `rotate(${c.rot}deg)`,
            }}
          />
        ))}
      </Box>
    </WizardShell>
  );
}

/* ================================================================== */
/* 위저드 STEP 2 — 대표사진                                            */
/* ================================================================== */

function PhotoStep({
  draft,
  set,
  onPrev,
  onNext,
  onClose,
}: {
  draft: MeetupDraft;
  set: <K extends keyof MeetupDraft>(k: K, v: MeetupDraft[K]) => void;
  onPrev: () => void;
  onNext: () => void;
  onClose: () => void;
}) {
  const fileRef = useRef<HTMLInputElement>(null);

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => set("photo", reader.result as string);
    reader.readAsDataURL(file);
    e.target.value = ""; // 같은 파일 재선택 허용
  };

  return (
    <WizardShell
      onClose={onClose}
      progress={4}
      footer={
        <>
          <PrevButton onClick={onPrev} />
          <PrimaryButton onClick={onNext}>다음</PrimaryButton>
        </>
      }
    >
      <Text as="h1" textStyle="t8Bold" style={{ color: fg, display: "block" }}>
        모임 대표사진을 설정해보세요
      </Text>
      <Text textStyle="t5Regular" style={{ color: fgSubtle, display: "block", marginTop: 12 }}>
        대표사진이 없는 모임보다 <b>더 많은 멤버</b>를 모을 수 있어요.
      </Text>

      <input
        ref={fileRef}
        type="file"
        accept="image/*"
        onChange={handleFile}
        style={{ display: "none" }}
      />

      {/* 사진 추가 버튼 */}
      <Box
        as="button"
        onClick={() => fileRef.current?.click()}
        style={{
          marginTop: 24,
          width: 80,
          height: 80,
          borderRadius: 12,
          border: `1px solid ${stroke}`,
          background: layer,
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: fgMuted,
          padding: 0,
          overflow: "hidden",
          position: "relative",
        }}
      >
        {draft.photo ? (
          <>
            <img
              src={draft.photo}
              alt="대표사진"
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
            <Box
              style={{
                position: "absolute",
                right: 4,
                bottom: 4,
                width: 22,
                height: 22,
                borderRadius: "50%",
                background: "rgba(0,0,0,0.55)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <FixedIcon
                svg={<CameraIcon />}
                size={14}
                color="var(--seed-color-palette-static-white)"
              />
            </Box>
          </>
        ) : (
          <FixedIcon svg={<CameraIcon />} size={26} color={fgMuted} />
        )}
      </Box>

      {/* 미리보기 카드 */}
      <Box
        style={{
          marginTop: 28,
          background: fill,
          borderRadius: 14,
          padding: 20,
        }}
      >
        <Box
          style={{
            background: layer,
            borderRadius: 12,
            padding: 16,
            display: "flex",
            gap: 14,
            alignItems: "center",
          }}
        >
          <PreviewThumb src={draft.photo} />
          <Box style={{ flex: 1, minWidth: 0 }}>
            <Text textStyle="t5Bold" maxLines={1} style={{ color: fg }}>
              {draft.name || "모임명"}
            </Text>
            <Text textStyle="t4Regular" maxLines={1} style={{ color: fgSubtle, display: "block" }}>
              {draft.intro || "모임 소개 8자 만들기"}
            </Text>
            <Box style={{ display: "flex", alignItems: "center", gap: 5, marginTop: 6 }}>
              <FixedIcon svg={<PinIcon />} size={14} />
              <Text textStyle="t3Regular" style={{ color: fgMuted }}>
                33명 · {draft.category ?? "문화/예술"}
              </Text>
            </Box>
          </Box>
        </Box>
      </Box>
    </WizardShell>
  );
}

/** 분홍 배경 이미지 placeholder (사진이 있으면 사진 표시) */
function PreviewThumb({ src }: { src?: string | null }) {
  return (
    <Box
      style={{
        width: 64,
        height: 64,
        borderRadius: 14,
        background: src ? fill : "#fde0e0",
        flexShrink: 0,
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {src ? (
        <img
          src={src}
          alt=""
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      ) : (
        <span style={{ fontSize: 26 }}>🖼️</span>
      )}
    </Box>
  );
}

/* ================================================================== */
/* 위저드 STEP 3 — 본인인증                                            */
/* ================================================================== */

function CatAvatar({ size = 96 }: { size?: number }) {
  return (
    <Box
      style={{
        width: size,
        height: size,
        borderRadius: "50%",
        background: "#b9e08f",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: size * 0.5,
      }}
    >
      🐱
    </Box>
  );
}

function ToggleRow({
  title,
  desc,
  checked,
  onChange,
}: {
  title: string;
  desc?: string;
  checked: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <Box
      style={{
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "space-between",
        gap: 16,
        padding: "16px 0",
      }}
    >
      <Box style={{ flex: 1, minWidth: 0 }}>
        <Text textStyle="t5Bold" style={{ color: fg, display: "block" }}>
          {title}
        </Text>
        {desc && (
          <Text textStyle="t3Regular" style={{ color: fgMuted, display: "block", marginTop: 4 }}>
            {desc}
          </Text>
        )}
      </Box>
      <Switch.Root checked={checked} onCheckedChange={onChange}>
        <Switch.Control>
          <Switch.Thumb />
        </Switch.Control>
        <Switch.HiddenInput />
      </Switch.Root>
    </Box>
  );
}

function VerificationStep({
  draft,
  set,
  onPrev,
  onNext,
  onClose,
}: {
  draft: MeetupDraft;
  set: <K extends keyof MeetupDraft>(k: K, v: MeetupDraft[K]) => void;
  onPrev: () => void;
  onNext: () => void;
  onClose: () => void;
}) {
  return (
    <WizardShell
      onClose={onClose}
      progress={3}
      footer={
        <>
          <PrevButton onClick={onPrev} />
          <PrimaryButton onClick={onNext}>다음</PrimaryButton>
        </>
      }
    >
      <Text as="h1" textStyle="t8Bold" style={{ color: fg, display: "block" }}>
        본인인증이 필요한 모임인가요?
      </Text>
      <Text textStyle="t5Regular" style={{ color: fgSubtle, display: "block", marginTop: 12 }}>
        본인인증을 완료한 이웃만 모임에 가입할 수 있어요.
      </Text>

      {/* 예시 배지 */}
      <Box style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 28 }}>
        <Box
          style={{
            background: "var(--seed-color-bg-informative-subtle)",
            borderRadius: 6,
            padding: "2px 7px",
          }}
        >
          <Text textStyle="t2Bold" style={{ color: fgInformative }}>
            예시
          </Text>
        </Box>
        <Text textStyle="t4Regular" style={{ color: fgInformative }}>
          인증을 완료하면 프로필에 표시돼요.
        </Text>
      </Box>

      {/* 프로필 미리보기 */}
      <Box
        style={{
          marginTop: 14,
          background: fill,
          borderRadius: 14,
          padding: "28px 20px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 10,
        }}
      >
        <CatAvatar />
        <Text textStyle="t6Bold" style={{ color: fg }}>
          {draft.nickname || "성이"}
        </Text>
        <Box style={{ display: "flex", alignItems: "center", gap: 5 }}>
          <FixedIcon svg={<ShieldCheckIcon />} size={18} color="#1bb55c" />
          <Text textStyle="t4Regular" style={{ color: fgSubtle }}>
            본인인증 완료
          </Text>
        </Box>
      </Box>

      {/* 토글 */}
      <Box style={{ marginTop: 12 }}>
        <ToggleRow
          title="본인인증 사용"
          checked={draft.requireVerification}
          onChange={(v) => set("requireVerification", v)}
        />
        <ToggleRow
          title="나이대와 성별 정보 받기"
          desc="가입하는 이웃이 모임장님의 정보도 볼 수 있어요."
          checked={draft.shareAgeGender}
          onChange={(v) => set("shareAgeGender", v)}
        />
      </Box>
    </WizardShell>
  );
}

/* ================================================================== */
/* 위저드 STEP 4 — 프로필                                              */
/* ================================================================== */

function ProfileStep({
  draft,
  set,
  onPrev,
  onNext,
  onClose,
}: {
  draft: MeetupDraft;
  set: <K extends keyof MeetupDraft>(k: K, v: MeetupDraft[K]) => void;
  onPrev: () => void;
  onNext: () => void;
  onClose: () => void;
}) {
  return (
    <WizardShell
      onClose={onClose}
      progress={2}
      footer={
        <>
          <PrevButton onClick={onPrev} />
          <PrimaryButton onClick={onNext}>다음</PrimaryButton>
        </>
      }
    >
      <Text textStyle="t4Regular" style={{ color: fgMuted, display: "block" }}>
        {draft.name || "모임명"}
      </Text>
      <Text
        as="h1"
        textStyle="t8Bold"
        style={{ color: fg, display: "block", marginTop: 6, lineHeight: 1.35 }}
      >
        모임에서 사용할
        <br />
        프로필을 입력해주세요
      </Text>

      {/* 아바타 + 카메라 */}
      <Box style={{ display: "flex", justifyContent: "center", marginTop: 24 }}>
        <Box style={{ position: "relative" }}>
          <CatAvatar size={108} />
          <Box
            style={{
              position: "absolute",
              right: 0,
              bottom: 0,
              width: 34,
              height: 34,
              borderRadius: "50%",
              background: "var(--seed-color-bg-layer-basement)",
              border: `2px solid ${layer}`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: fg,
            }}
          >
            <FixedIcon svg={<CameraIcon />} size={18} color={fg} />
          </Box>
        </Box>
      </Box>

      {/* 닉네임 */}
      <Box style={{ marginTop: 28 }}>
        <Label>닉네임</Label>
        <Box style={{ marginTop: 10 }}>
          <TextField.Root
            variant="outline"
            size="large"
            value={draft.nickname}
            onValueChange={(v) => set("nickname", v.slice(0, 20))}
          >
            <TextField.Input />
          </TextField.Root>
        </Box>
        <Text
          textStyle="t3Regular"
          style={{ color: fgMuted, display: "block", textAlign: "right", marginTop: 6 }}
        >
          {draft.nickname.length}/20
        </Text>
      </Box>

      {/* 자기소개 */}
      <Box style={{ marginTop: 16 }}>
        <Label>자기소개(선택)</Label>
        <Box style={{ marginTop: 10 }}>
          <TextField.Root
            variant="outline"
            value={draft.selfIntro}
            onValueChange={(v) => set("selfIntro", v.slice(0, 500))}
          >
            <TextField.Textarea style={{ minHeight: 96 }} />
          </TextField.Root>
        </Box>
        <Text
          textStyle="t3Regular"
          style={{ color: fgMuted, display: "block", textAlign: "right", marginTop: 6 }}
        >
          {draft.selfIntro.length}/500
        </Text>
      </Box>

      {/* 선호 시간대 (복수 선택) */}
      <Box style={{ marginTop: 16 }}>
        <Label>일정 참여 선호 시간대</Label>
        <Box style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: 12 }}>
          {TIMES.map((t) => {
            const selected = draft.preferredTimes.includes(t);
            return (
              <SelectChip
                key={t}
                label={t}
                selected={selected}
                onClick={() =>
                  set(
                    "preferredTimes",
                    selected
                      ? draft.preferredTimes.filter((x) => x !== t)
                      : [...draft.preferredTimes, t],
                  )
                }
              />
            );
          })}
        </Box>
      </Box>
    </WizardShell>
  );
}

/* ================================================================== */
/* 위저드 STEP 5 — 홍보 게시글                                         */
/* ================================================================== */

function PromotionStep({
  draft,
  set,
  onPrev,
  onComplete,
  onClose,
}: {
  draft: MeetupDraft;
  set: <K extends keyof MeetupDraft>(k: K, v: MeetupDraft[K]) => void;
  onPrev: () => void;
  onComplete: () => void;
  onClose: () => void;
}) {
  return (
    <WizardShell
      onClose={onClose}
      onSkip={onComplete}
      progress={5}
      footer={
        <>
          <PrevButton onClick={onPrev} />
          <PrimaryButton onClick={onComplete} disabled={draft.promo.trim().length === 0}>
            완료
          </PrimaryButton>
        </>
      }
    >
      <Text as="h1" textStyle="t8Bold" style={{ color: fg, display: "block" }}>
        모임 홍보 게시글을 작성해보세요
      </Text>
      <Text textStyle="t5Regular" style={{ color: fgSubtle, display: "block", marginTop: 12, lineHeight: 1.5 }}>
        동네생활에 모임을 홍보하면 멤버를 더 빨리 모을 수 있어요.
      </Text>

      {/* AI 추천 배너 */}
      <Box
        style={{
          marginTop: 22,
          background: "var(--seed-color-bg-informative-subtle)",
          borderRadius: 12,
          padding: "16px 18px",
          display: "flex",
          alignItems: "center",
          gap: 12,
        }}
      >
        <FixedIcon svg={<SparkleIcon />} size={22} color={fgInformative} />
        <Box>
          <Text textStyle="t4Regular" style={{ color: fg, display: "block" }}>
            무슨 내용을 써야할지 고민인가요?
          </Text>
          <Text textStyle="t5Bold" style={{ color: fgInformative }}>
            모임 홍보 글 추천 받기
          </Text>
        </Box>
      </Box>

      <Box style={{ marginTop: 18 }}>
        <TextField.Root
          variant="outline"
          value={draft.promo}
          onValueChange={(v) => set("promo", v.slice(0, 500))}
        >
          <TextField.Textarea
            placeholder="모임 규칙이나 활동 방식 등을 소개해보세요."
            style={{ minHeight: 150 }}
          />
        </TextField.Root>
        <Text
          textStyle="t3Regular"
          style={{ color: fgMuted, display: "block", textAlign: "right", marginTop: 6 }}
        >
          {draft.promo.length}/500
        </Text>
      </Box>

      {/* TIP */}
      <Box style={{ marginTop: 20 }}>
        <Box style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <Box
            style={{
              background: "var(--seed-color-bg-informative-subtle)",
              borderRadius: 6,
              padding: "2px 7px",
            }}
          >
            <Text textStyle="t2Bold" style={{ color: fgInformative }}>
              TIP
            </Text>
          </Box>
          <Text textStyle="t4Regular" style={{ color: fgInformative }}>
            이런 내용으로 모임을 소개해보세요.
          </Text>
        </Box>
        <Box
          style={{
            marginTop: 12,
            background: fill,
            borderRadius: 10,
            padding: "16px 18px",
            display: "flex",
            flexDirection: "column",
            gap: 8,
          }}
        >
          {[
            "주로 어떤 활동을 하나요?",
            "언제, 어디에서 활동하나요?",
            "어떤 사람들과 함께하고 싶나요?",
            "모임에서 지켜야 할 규칙이 있나요? (가입 조건, 출석 조건, 강퇴 조건 등)",
          ].map((t) => (
            <Box key={t} style={{ display: "flex", gap: 8 }}>
              <Text textStyle="t4Regular" style={{ color: fg }}>
                ·
              </Text>
              <Text textStyle="t4Regular" style={{ color: fg, flex: 1 }}>
                {t}
              </Text>
            </Box>
          ))}
        </Box>
      </Box>
    </WizardShell>
  );
}

/* ================================================================== */
/* 컨테이너                                                            */
/* ================================================================== */

const initialDraft: MeetupDraft = {
  name: "",
  category: null,
  region: null,
  range: 12,
  intro: "",
  photo: null,
  age: "누구나",
  requireVerification: false,
  shareAgeGender: false,
  nickname: "성이",
  selfIntro: "",
  preferredTimes: [],
  promo: "",
};

export default function CreateMeetup({
  onClose,
  onComplete,
}: {
  onClose: () => void;
  onComplete: (draft: MeetupDraft) => void;
}) {
  const [step, setStep] = useState(0);
  const [draft, setDraft] = useState<MeetupDraft>(initialDraft);

  const set = <K extends keyof MeetupDraft>(k: K, v: MeetupDraft[K]) =>
    setDraft((d) => ({ ...d, [k]: v }));

  const next = () => setStep((s) => s + 1);
  const prev = () => setStep((s) => s - 1);

  switch (step) {
    case 0:
      return (
        <BasicStep draft={draft} set={set} onSubmit={next} onClose={onClose} />
      );
    case 1:
      return (
        <AgeStep draft={draft} set={set} onNext={next} onClose={onClose} />
      );
    case 2:
      return (
        <ProfileStep
          draft={draft}
          set={set}
          onPrev={prev}
          onNext={next}
          onClose={onClose}
        />
      );
    case 3:
      return (
        <VerificationStep
          draft={draft}
          set={set}
          onPrev={prev}
          onNext={next}
          onClose={onClose}
        />
      );
    case 4:
      return (
        <PhotoStep
          draft={draft}
          set={set}
          onPrev={prev}
          onNext={next}
          onClose={onClose}
        />
      );
    default:
      return (
        <PromotionStep
          draft={draft}
          set={set}
          onPrev={prev}
          onComplete={() => onComplete(draft)}
          onClose={onClose}
        />
      );
  }
}
