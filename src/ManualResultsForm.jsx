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
