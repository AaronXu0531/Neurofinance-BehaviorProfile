// src/App.jsx
import React, { useState } from "react";

import {
  Button,
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
  Switch,
  Label,
} from "./components/ui";

import { GoNoGo } from "./tasks/GoNoGo";
import { Stroop } from "./tasks/Stroop";
import { Framing } from "./tasks/Framing";

import { MID } from "./tasks/MID";
import { BART } from "./tasks/BART";
import { DelayDiscounting } from "./tasks/DelayDiscounting";

import { ProbabilityWeightingTask } from "./tasks/ProbabilityWeighting";
import { CalibrationTask } from "./tasks/ConfidenceCalibration";
import { AnchoringTask } from "./tasks/AnchoringRecall";

import Dashboard from "./dashboard/Dashboard";

export default function App() {
  const [tab, setTab] = useState("cog");
  const [modeDemo, setModeDemo] = useState(true);

  const [results, setResults] = useState({
    go: null,
    stroop: null,
    framing: null,
    mid: null,
    bart: null,
    delay: null,
    probability: null,
    calibration: null,
    anchoring: null,
  });

  // restart keys for forcing remount
  const [goKey, setGoKey] = useState(0);
  const [stroopKey, setStroopKey] = useState(0);
  const [framingKey, setFramingKey] = useState(0);
  const [midKey, setMidKey] = useState(0);
  const [bartKey, setBartKey] = useState(0);
  const [delayKey, setDelayKey] = useState(0);
  const [probKey, setProbKey] = useState(0);
  const [calibKey, setCalibKey] = useState(0);
  const [anchorKey, setAnchorKey] = useState(0);

  const restartGo = () => {
    setGoKey((k) => k + 1);
    setResults((r) => ({ ...r, go: null }));
  };
  const restartStroop = () => {
    setStroopKey((k) => k + 1);
    setResults((r) => ({ ...r, stroop: null }));
  };
  const restartFraming = () => {
    setFramingKey((k) => k + 1);
    setResults((r) => ({ ...r, framing: null }));
  };
  const restartMID = () => {
    setMidKey((k) => k + 1);
    setResults((r) => ({ ...r, mid: null }));
  };
  const restartBART = () => {
    setBartKey((k) => k + 1);
    setResults((r) => ({ ...r, bart: null }));
  };
  const restartDelay = () => {
    setDelayKey((k) => k + 1);
    setResults((r) => ({ ...r, delay: null }));
  };
  const restartProb = () => {
    setProbKey((k) => k + 1);
    setResults((r) => ({ ...r, probability: null }));
  };
  const restartCalib = () => {
    setCalibKey((k) => k + 1);
    setResults((r) => ({ ...r, calibration: null }));
  };
  const restartAnchor = () => {
    setAnchorKey((k) => k + 1);
    setResults((r) => ({ ...r, anchoring: null }));
  };

  return (
    <div className="p-6 max-w-5xl mx-auto space-y-6">
      <header className="space-y-2">
        <h1 className="text-3xl font-bold">
          Investor Cognition & Reward–Risk Profile – Demo
        </h1>
        <p className="text-sm opacity-80">
          Cognitive control (Go/No-Go, Stroop, Framing), Reward sensitivity
          (MID, BART, Delay), and Risk perception & biases (probability
          weighting, calibration, anchoring).
        </p>
        <div className="flex items-center gap-3">
          <Switch checked={modeDemo} onCheckedChange={setModeDemo} id="mode" />
          <Label htmlFor="mode">
            Demo mode ({modeDemo ? "short" : "full"})
          </Label>
        </div>
      </header>

      <Tabs value={tab} onValueChange={setTab}>
        <TabsList>
          <TabsTrigger key="tab-cog" value="cog">
            Cognitive Control
          </TabsTrigger>
          <TabsTrigger key="tab-reward" value="reward">
            Reward Sensitivity
          </TabsTrigger>
          <TabsTrigger key="tab-risk" value="risk">
            Risk Perception & Biases
          </TabsTrigger>
          <TabsTrigger key="tab-dashboard" value="dashboard">
            Dashboard
          </TabsTrigger>
        </TabsList>

        {/* Cognitive control: Go/No-Go, Stroop, Framing */}
        <TabsContent key="content-cog" value="cog">
          <Card>
            <CardHeader>
              <CardTitle>Cognitive Control Tasks</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Go/No-Go */}
              <div style={{ display: "flex", justifyContent: "flex-end" }}>
                <Button variant="secondary" onClick={restartGo}>
                  Restart Go/No-Go
                </Button>
              </div>
              <GoNoGo
                key={goKey}
                modeDemo={modeDemo}
                onFinish={(r) => setResults((prev) => ({ ...prev, go: r }))}
              />

              {/* Stroop */}
              <div
                style={{
                  marginTop: "16px",
                  display: "flex",
                  justifyContent: "flex-end",
                }}
              >
                <Button variant="secondary" onClick={restartStroop}>
                  Restart Stroop
                </Button>
              </div>
              <Stroop
                key={stroopKey}
                modeDemo={modeDemo}
                onFinish={(r) =>
                  setResults((prev) => ({ ...prev, stroop: r }))
                }
              />

              {/* Framing */}
              <div
                style={{
                  marginTop: "16px",
                  display: "flex",
                  justifyContent: "flex-end",
                }}
              >
                <Button variant="secondary" onClick={restartFraming}>
                  Restart Framing
                </Button>
              </div>
              <Framing
                key={framingKey}
                modeDemo={modeDemo}
                onFinish={(r) =>
                  setResults((prev) => ({ ...prev, framing: r }))
                }
              />
            </CardContent>
          </Card>
        </TabsContent>

        {/* Reward sensitivity: MID, BART, Delay Discounting */}
        <TabsContent key="content-reward" value="reward">
          <Card>
            <CardHeader>
              <CardTitle>Reward Sensitivity Tasks</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* MID */}
              <div style={{ display: "flex", justifyContent: "flex-end" }}>
                <Button variant="secondary" onClick={restartMID}>
                  Restart MID
                </Button>
              </div>
              <MID
                key={midKey}
                modeDemo={modeDemo}
                onFinish={(r) => setResults((prev) => ({ ...prev, mid: r }))}
              />

              {/* BART */}
              <div
                style={{
                  marginTop: "16px",
                  display: "flex",
                  justifyContent: "flex-end",
                }}
              >
                <Button variant="secondary" onClick={restartBART}>
                  Restart BART
                </Button>
              </div>
              <BART
                key={bartKey}
                modeDemo={modeDemo}
                onFinish={(r) => setResults((prev) => ({ ...prev, bart: r }))}
              />

              {/* Delay Discounting */}
              <div
                style={{
                  marginTop: "16px",
                  display: "flex",
                  justifyContent: "flex-end",
                }}
              >
                <Button variant="secondary" onClick={restartDelay}>
                  Restart Delay
                </Button>
              </div>
              <DelayDiscounting
                key={delayKey}
                modeDemo={modeDemo}
                onFinish={(r) =>
                  setResults((prev) => ({ ...prev, delay: r }))
                }
              />
            </CardContent>
          </Card>
        </TabsContent>

        {/* Risk perception & biases: Probability weighting, Calibration, Anchoring */}
        <TabsContent key="content-risk" value="risk">
          <Card>
            <CardHeader>
              <CardTitle>Risk Perception & Bias Tasks</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Probability weighting */}
              <div style={{ display: "flex", justifyContent: "flex-end" }}>
                <Button variant="secondary" onClick={restartProb}>
                  Restart Probability
                </Button>
              </div>
              <ProbabilityWeightingTask
                key={probKey}
                onFinish={(r) =>
                  setResults((prev) => ({ ...prev, probability: r }))
                }
              />

              {/* Confidence calibration */}
              <div
                style={{
                  marginTop: "16px",
                  display: "flex",
                  justifyContent: "flex-end",
                }}
              >
                <Button variant="secondary" onClick={restartCalib}>
                  Restart Calibration
                </Button>
              </div>
              <CalibrationTask
                key={calibKey}
                onFinish={(r) =>
                  setResults((prev) => ({ ...prev, calibration: r }))
                }
              />

              {/* Anchoring */}
              <div
                style={{
                  marginTop: "16px",
                  display: "flex",
                  justifyContent: "flex-end",
                }}
              >
                <Button variant="secondary" onClick={restartAnchor}>
                  Restart Anchoring
                </Button>
              </div>
              <AnchoringTask
                key={anchorKey}
                onFinish={(r) =>
                  setResults((prev) => ({ ...prev, anchoring: r }))
                }
              />
            </CardContent>
          </Card>
        </TabsContent>

        {/* Dashboard */}
        <TabsContent key="content-dashboard" value="dashboard">
          <Dashboard results={results} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
// === Demo profiles: canned results for typical/special clients ===

// 1) 危险型：Reward Chaser（高冲动 + 高奖励 + 短视 + 锚定）
const DEMO_RISKY_CHASER = {
  go: {
    rtMean: 420,
    rtStd: 210,
    cv: 0.5,
    inhErrRate: 0.25,       // 冲动错误高
    omissRate: 0.05,
    blockErrs: [0.3, 0.2],
    fatigue: 0.1,
    counts: {
      go: 20,
      red: 8,
      hits: 18,
      omissions: 2,
      commissions: 2,
    },
  },
  stroop: {
    cMean: 650,
    icMean: 740,
    costRT: 90,            // 干扰成本大
    cErr: 0.02,
    icErr: 0.08,
    costErr: 0.06,
  },
  framing: {
    consistency: 0.6,
    propRiskGain: 0.1,
    propRiskLoss: 0.9,
    amplitude: 0.8,        // 强 framing
  },
  mid: {
    rtReward: 260,
    rtNeutral: 420,
    deltaRT: -160,         // 非常强 reward reactivity
    errReward: 0.18,
    errNeutral: 0.1,
    deltaErr: 0.08,
    hitRateReward: 0.82,
  },
  bart: {
    avgPumpsNonBurst: 11,  // 冒险
    burstRate: 0.45,
    slope: 0.0,            // 不怎么学习
    totalEarnings: 22,
  },
  delay: {
    k: 0.045,              // 短视
    choiceNowPct: 0.7,
    consistency: 0.5,
    NowStar: 75,
    A: 100,
    D: 14,
  },
  probability: {
    smallRate: 0.9,        // 小概率很爱 lottery
    mediumRate: 0.6,
    largeRate: 0.6,
    smallAmplification: 0.3,
    largeUnderweight: 0.0,
    n: 7,
  },
  calibration: {
    perItem: [
      { id: 1, label: "S&P 500 total return in 2024 (%)", lower: 5, upper: 15, trueValue: 25, width: 10, hit: false },
      { id: 2, label: "US CPI inflation in 2024 (%)", lower: 2, upper: 3.5, trueValue: 3, width: 1.5, hit: true },
      { id: 3, label: "US 10Y Treasury yield at end of 2024 (%)", lower: 3, upper: 4, trueValue: 4, width: 1, hit: true },
      { id: 4, label: "S&P 500 total return in 2022 (%)", lower: 0, upper: 10, trueValue: -18, width: 10, hit: false },
    ],
    hitRate: 0.5,
    meanWidth: 8,
    overconfidence: 0.4,   // 90% - 50%
  },
  anchoring: {
    round1: { best: 25, worst: -15, avg: 9 },
    round2: { best: 25, worst: -15, avg: 9 }, // 完全不改
    truth: { best: 37, worst: -37, avg: 11 },
    biasRound1: { best: -12, worst: 22, avg: -2 },
    biasRound2: { best: -12, worst: 22, avg: -2 },
    adjustment: { best: 0, worst: 0, avg: 0 },
    rigidity: 0,           // 完全锚定
  },
};

// 2) 稳健型：Calm Long-Term Investor（冲动低 + 奖励一般 + 长期）
const DEMO_STEADY_INVESTOR = {
  go: {
    rtMean: 480,
    rtStd: 120,
    cv: 0.25,
    inhErrRate: 0.05,
    omissRate: 0.02,
    blockErrs: [0.05, 0.04],
    fatigue: -0.01,
    counts: {
      go: 22,
      red: 8,
      hits: 21,
      omissions: 1,
      commissions: 1,
    },
  },
  stroop: {
    cMean: 700,
    icMean: 735,
    costRT: 35,
    cErr: 0.01,
    icErr: 0.03,
    costErr: 0.02,
  },
  framing: {
    consistency: 0.9,
    propRiskGain: 0.45,
    propRiskLoss: 0.5,
    amplitude: 0.05,      // 几乎不被 framing 影响
  },
  mid: {
    rtReward: 380,
    rtNeutral: 390,
    deltaRT: -10,         // 几乎没有奖励加速
    errReward: 0.09,
    errNeutral: 0.09,
    deltaErr: 0,
    hitRateReward: 0.91,
  },
  bart: {
    avgPumpsNonBurst: 7,
    burstRate: 0.25,
    slope: -1.0,          // 学习后更保守
    totalEarnings: 32,
  },
  delay: {
    k: 0.012,
    choiceNowPct: 0.25,   // 偏长期
    consistency: 0.8,
    NowStar: 75,
    A: 100,
    D: 14,
  },
  probability: {
    smallRate: 0.35,
    mediumRate: 0.4,
    largeRate: 0.45,
    smallAmplification: -0.05,
    largeUnderweight: -0.05,
    n: 7,
  },
  calibration: {
    perItem: [
      { id: 1, label: "S&P 500 total return in 2024 (%)", lower: -10, upper: 25, trueValue: 25, width: 35, hit: true },
      { id: 2, label: "US CPI inflation in 2024 (%)", lower: 1, upper: 5, trueValue: 3, width: 4, hit: true },
      { id: 3, label: "US 10Y Treasury yield at end of 2024 (%)", lower: 2, upper: 6, trueValue: 4, width: 4, hit: true },
      { id: 4, label: "S&P 500 total return in 2022 (%)", lower: -30, upper: 5, trueValue: -18, width: 35, hit: true },
    ],
    hitRate: 1.0,
    meanWidth: 19.5,
    overconfidence: -0.1,  // 90% - 100% = -10pp（略保守）
  },
  anchoring: {
    round1: { best: 30, worst: -25, avg: 9 },
    round2: { best: 34, worst: -30, avg: 10 }, // 有调整靠近真值
    truth: { best: 37, worst: -37, avg: 11 },
    biasRound1: { best: -7, worst: 12, avg: -2 },
    biasRound2: { best: -3, worst: 7, avg: -1 },
    adjustment: { best: 4, worst: -5, avg: 1 },
    rigidity: 0.4,
  },
};

// 3) 资深但过度自信：Overconfident Veteran
const DEMO_OVERCONFIDENT_VETERAN = {
  go: {
    rtMean: 460,
    rtStd: 130,
    cv: 0.28,
    inhErrRate: 0.07,
    omissRate: 0.03,
    blockErrs: [0.06, 0.08],
    fatigue: 0.02,
    counts: {
      go: 21,
      red: 8,
      hits: 20,
      omissions: 1,
      commissions: 2,
    },
  },
  stroop: {
    cMean: 690,
    icMean: 730,
    costRT: 40,
    cErr: 0.01,
    icErr: 0.04,
    costErr: 0.03,
  },
  framing: {
    consistency: 0.75,
    propRiskGain: 0.3,
    propRiskLoss: 0.6,
    amplitude: 0.3,       // 中度 framing
  },
  mid: {
    rtReward: 340,
    rtNeutral: 390,
    deltaRT: -50,         // 中等 reward drive
    errReward: 0.08,
    errNeutral: 0.08,
    deltaErr: 0,
    hitRateReward: 0.92,
  },
  bart: {
    avgPumpsNonBurst: 9,
    burstRate: 0.35,
    slope: 0.5,
    totalEarnings: 29,
  },
  delay: {
    k: 0.018,
    choiceNowPct: 0.35,
    consistency: 0.7,
    NowStar: 75,
    A: 100,
    D: 14,
  },
  probability: {
    smallRate: 0.5,
    mediumRate: 0.55,
    largeRate: 0.4,       // 高概率 lottery 反而少 → underweight
    smallAmplification: -0.05,
    largeUnderweight: 0.15,
    n: 7,
  },
  calibration: {
    perItem: [
      { id: 1, label: "S&P 500 total return in 2024 (%)", lower: 10, upper: 20, trueValue: 25, width: 10, hit: false },
      { id: 2, label: "US CPI inflation in 2024 (%)", lower: 2, upper: 4, trueValue: 3, width: 2, hit: true },
      { id: 3, label: "US 10Y Treasury yield at end of 2024 (%)", lower: 3, upper: 4.5, trueValue: 4, width: 1.5, hit: true },
      { id: 4, label: "S&P 500 total return in 2022 (%)", lower: -5, upper: 10, trueValue: -18, width: 15, hit: false },
    ],
    hitRate: 0.5,
    meanWidth: 9.6,
    overconfidence: 0.4,
  },
  anchoring: {
    round1: { best: 40, worst: -20, avg: 12 },
    round2: { best: 40, worst: -20, avg: 12 }, // 坚持己见
    truth: { best: 37, worst: -37, avg: 11 },
    biasRound1: { best: 3, worst: 17, avg: 1 },
    biasRound2: { best: 3, worst: 17, avg: 1 },
    adjustment: { best: 0, worst: 0, avg: 0 },
    rigidity: 0,
  },
};

// 默认选用哪一个 Demo，可以在这里切换
// 比如演示“危险型客户”：
const DEMO_RESULTS = DEMO_RISKY_CHASER;
// 如果想看稳健型，就改成：
// const DEMO_RESULTS = DEMO_STEADY_INVESTOR;
// 或者：
// const DEMO_RESULTS = DEMO_OVERCONFIDENT_VETERAN;


