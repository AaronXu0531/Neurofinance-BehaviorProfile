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


// src/ManualResultsForm.jsx
import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent, Button } from "./components/ui";

/**
 * 简单的 JSON 输入窗口：
 * - 把完整的 results JSON 粘进来
 * - 点击按钮后调用 onLoad(parsedResults)
 */
export function ManualResultsForm({ onLoad }) {
  const [text, setText] = useState("");
  const [error, setError] = useState("");

  const handleLoad = () => {
    try {
      const parsed = JSON.parse(text);

      // 简单检查一下必要字段是否存在，防止 Dashboard 崩
      const requiredKeys = [
        "go",
        "stroop",
        "framing",
        "mid",
        "bart",
        "delay",
        "probability",
        "calibration",
        "anchoring",
      ];

      for (const key of requiredKeys) {
        if (!(key in parsed)) {
          throw new Error(`Missing field: "${key}"`);
        }
      }

      onLoad(parsed);
      setError("");
    } catch (e) {
      setError(e.message || "Invalid JSON");
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Manual Results Input</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <p className="text-sm text-muted-foreground">
          Paste a full <code>results</code> JSON object here (same structure as the Download JSON).
        </p>

        <textarea
          className="w-full h-64 rounded-md border px-3 py-2 text-sm font-mono"
          placeholder='例如：{ "go": { ... }, "stroop": { ... }, ... }'
          value={text}
          onChange={(e) => setText(e.target.value)}
        />

        {error && (
          <p className="text-sm text-red-600">
            Error: {error}
          </p>
        )}

        <div className="flex justify-end">
          <Button onClick={handleLoad}>
            Load into dashboard
          </Button>
        </div>

        <details className="text-xs mt-2">
          <summary className="cursor-pointer text-muted-foreground">
            JSON 模板示例（基于当前 demo）
          </summary>
          <pre className="mt-2 max-h-64 overflow-auto whitespace-pre-wrap">
{`{
  "go": {
    "rtMean": 437.0555555820465,
    "rtStd": 152.04968571041752,
    "cv": 0.34789555645374676,
    "inhErrRate": 0,
    "omissRate": 0,
    "blockErrs": [0, 0],
    "fatigue": 0,
    "counts": {
      "go": 9,
      "red": 4,
      "hits": 9,
      "omissions": 0,
      "commissions": 0
    }
  },
  "stroop": {
    "cMean": 680.9923077546633,
    "icMean": 727.5,
    "costRT": 46.50769224533667,
    "cErr": 0,
    "icErr": 0,
    "costErr": 0
  },
  "framing": {
    "consistency": 1,
    "propRiskGain": 0,
    "propRiskLoss": 1,
    "amplitude": 1
  },
  "mid": {
    "rtReward": 283.97999997138976,
    "rtNeutral": 465.5333333545261,
    "deltaRT": -181.55333338313636,
    "errReward": 0.16666666666666663,
    "errNeutral": 0.09999999999999998,
    "deltaErr": 0.06666666666666665,
    "hitRateReward": 0.8333333333333334
  },
  "bart": {
    "avgPumpsNonBurst": 10,
    "burstRate": 0.4,
    "slope": 2.5,
    "totalEarnings": 30
  },
  "delay": {
    "k": 0.023809523809523805,
    "choiceNowPct": 0.16666666666666666,
    "consistency": 0.6,
    "NowStar": 75,
    "A": 100,
    "D": 14
  },
  "probability": {
    "smallRate": 1,
    "mediumRate": 1,
    "largeRate": 1,
    "smallAmplification": 0,
    "largeUnderweight": 0,
    "n": 7
  },
  "calibration": {
    "perItem": [
      { "id": 1, "label": "S&P 500 total return in 2024 (%)", "lower": -10, "upper": 30, "trueValue": 25, "width": 40, "hit": true },
      { "id": 2, "label": "US CPI inflation in 2024 (%)", "lower": 2, "upper": 5, "trueValue": 3, "width": 3, "hit": true },
      { "id": 3, "label": "US 10Y Treasury yield at end of 2024 (%)", "lower": 3, "upper": 5, "trueValue": 4, "width": 2, "hit": true },
      { "id": 4, "label": "S&P 500 total return in 2022 (%)", "lower": 5, "upper": 20, "trueValue": -18, "width": 15, "hit": false }
    ],
    "hitRate": 0.75,
    "meanWidth": 15,
    "overconfidence": 0.15
  },
  "anchoring": {
    "round1": { "best": 20, "worst": -10, "avg": 8 },
    "round2": { "best": 20, "worst": -10, "avg": 8 },
    "truth": { "best": 37, "worst": -37, "avg": 11 },
    "biasRound1": { "best": -17, "worst": 27, "avg": -3 },
    "biasRound2": { "best": -17, "worst": 27, "avg": -3 },
    "adjustment": { "best": 0, "worst": 0, "avg": 0 },
    "rigidity": 0
  }
}`}
          </pre>
        </details>
      </CardContent>
    </Card>
  );
}



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
