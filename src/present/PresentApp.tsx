import React, { useEffect, useMemo, useState } from "react";
import { loadBuildConfig } from "../api";
import type { ProjectBuildConfig, ThemeConfig } from "../types";
import { HomePage } from "./HomePage";
import { InputPage } from "./InputPage";
import { ResultsPage } from "./ResultsPage";
import type { VADInputValue } from "../evalContext";
import { detectSelectedVADsFromLayout } from "../vadSelection";

type PresentTab = "home" | "vads" | "results";

const applyTheme = (theme: ThemeConfig | null) => {
  if (!theme) return;
  const body = document.body;
  
  if (theme.mode === "light") {
    body.removeAttribute("data-theme");
    body.style.backgroundColor = "#f5f5f5";
    body.style.color = "#000000";
  } else {
    body.setAttribute("data-theme", "dark");
    body.style.backgroundColor = "#1a1a1a";
    body.style.color = "#ffffff";
  }

  const existingStyle = document.getElementById("theme-style");
  if (existingStyle) {
    existingStyle.remove();
  }
  
  const styleEl = document.createElement("style");
  styleEl.id = "theme-style";
  
  if (theme.mode === "light") {
    styleEl.textContent = `
      .canvas-frame {
        background-color: #ffffff !important;
      }
      .canvas-frame input,
      .canvas-frame textarea,
      .canvas-frame select {
        background-color: #f5f5f5 !important;
        color: #000000 !important;
        border-color: rgba(85, 136, 59, 0.2) !important;
      }
    `;
  } else {
    styleEl.textContent = `
      .canvas-frame {
        background-color: #2a2a2a !important;
      }
      .canvas-frame input,
      .canvas-frame textarea,
      .canvas-frame select {
        background-color: #1a1a1a !important;
        color: #ffffff !important;
        border-color: rgba(85, 136, 59, 0.3) !important;
      }
    `;
  }
  
  document.head.appendChild(styleEl);
};

export const PresentApp: React.FC = () => {
  const [active, setActive] = useState<PresentTab>("home");
  const [config, setConfig] = useState<ProjectBuildConfig | null>(null);
  const [loading, setLoading] = useState(true);
  const [results, setResults] = useState<Record<string, number> | null>(null);
  const [inputValues, setInputValues] = useState<VADInputValue>({});

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const pid = params.get("projectId") ?? "demo-project";
    loadBuildConfig(pid).then((c) => {
      setConfig(c);
      if (c?.theme) {
        applyTheme(c.theme);
      }
      setLoading(false);
    });
  }, []);

  const theme: ThemeConfig | null = config?.theme ?? null;
  const homeLayout = config?.homeLayout ?? null;
  const vadLayout = config?.vadLayout ?? null;
  const resultsLayout = config?.resultsLayout ?? null;

  const selectedVADs = useMemo(() => detectSelectedVADsFromLayout(vadLayout), [vadLayout]);

  const getFieldNumber = (
    fields: { [fieldIndex: number]: { value: string | number; uom: string } },
    index: number
  ): number => {
    const entry = fields[index];
    if (!entry) return 0;
    const raw = entry.value;
    const n = typeof raw === "number" ? raw : parseFloat(String(raw ?? ""));
    return isNaN(n) ? 0 : n;
  };

  const handleCalculate = () => {
    if (!inputValues || Object.keys(inputValues).length === 0) {
      return;
    }

    const res: Record<string, number> = {};

    Object.entries(inputValues).forEach(([vadName, fields]) => {
      const f = fields as { [fieldIndex: number]: { value: string | number; uom: string } };
      let total = 0;

      switch (vadName) {
        case "Reduced Electricity Consumption": {
          const consumptionKwh = getFieldNumber(f, 0);
          const reductionPct = 50;
          const costPerKwh = 0.15;
          total = consumptionKwh * (reductionPct / 100) * costPerKwh;
          break;
        }

        case "Reduced Maintenance Costs": {
          const current = getFieldNumber(f, 0);
          const uahuPlan = 5000;
          total = Math.max(0, current - uahuPlan);
          break;
        }

        case "Increased Ticket Sales": {
          const patrons = getFieldNumber(f, 0);
          const avgProfit = getFieldNumber(f, 1);
          const increasePct = 1;
          total = patrons * (increasePct / 100) * avgProfit;
          break;
        }

        case "Avoided Revenue Loss": {
          const revenuePerShow = getFieldNumber(f, 0);
          const atRiskShows = getFieldNumber(f, 1);
          const avgFailure = 3;
          const uahuFailure = 1;
          const deltaFailure = (avgFailure - uahuFailure) / 100;
          total = revenuePerShow * atRiskShows * deltaFailure;
          break;
        }

        case "Increased Recyclability": {
          const hvacUnits = getFieldNumber(f, 0);
          const avgRate = 40;
          const uahuRate = 60;
          const costSavedPerUnit = 5000;
          const deltaRate = (uahuRate - avgRate) / 100;
          total = hvacUnits * deltaRate * costSavedPerUnit;
          break;
        }

        case "Embodied Carbon Reduction": {
          const hvacUnits = getFieldNumber(f, 0);
          const avgEmissions = 5000;
          const reductionPct = 30;
          const carbonCost = 0.08;
          const emissionsReducedPerUnit = avgEmissions * (reductionPct / 100);
          total = hvacUnits * emissionsReducedPerUnit * carbonCost;
          break;
        }

        default: {
          total = Object.values(f).reduce((acc, field) => {
            const raw = field.value;
            const n =
              typeof raw === "number" ? raw : parseFloat(String(raw ?? ""));
            return acc + (isNaN(n) ? 0 : n);
          }, 0);
          break;
        }
      }

      res[vadName] = total;
    });

    const totalAnnualValue = Object.values(res).reduce((acc, n) => acc + (Number.isFinite(n) ? n : 0), 0);
    const totalInvestments = totalAnnualValue * 0.3;
    const netBenefit = totalAnnualValue - totalInvestments;
    const roi = totalInvestments === 0 ? 0 : netBenefit / totalInvestments;

    setResults({
      ...res,
      "Total Annual Value": totalAnnualValue,
      "Total Investments": totalInvestments,
      "Net Benefit (Year 1)": netBenefit,
      ROI: roi,
    });
    setActive("results");
  };

  if (loading) {
    return (
      <div className="present-shell">
        <div style={{ padding: 24 }}>Loading build config…</div>
      </div>
    );
  }

  if (!config) {
    return (
      <div className="present-shell">
        <div style={{ padding: 24 }}>
          No build configuration found. Publish from the Build app.
        </div>
      </div>
    );
  }

  const bg = theme?.background ?? "#020617";
  const text = theme?.text ?? "#e5e7eb";

  const tab = (id: PresentTab, label: string) => {
    const activeTab = active === id;
    return (
      <button
        key={id}
        className={`nav-tab ${activeTab ? "active" : ""}`}
        onClick={() => setActive(id)}
      >
        {label}
      </button>
    );
  };

  return (
    <div
      className="present-shell"
      style={{
        background: bg,
        color: text,
      }}
    >
      <div
        style={{
          padding: "0.5rem 0.75rem",
          display: "flex",
          alignItems: "center",
          gap: 8,
        }}
      >
        <div className="nav-tabs">
          {tab("home", "Home")}
          {tab("vads", "Inputs")}
          {tab("results", "Results")}
        </div>
      </div>

      {active === "home" && <HomePage layout={homeLayout} />}
      {active === "vads" && (
        <InputPage
          vadNames={selectedVADs}
          onCalculate={handleCalculate}
          onInputsChange={setInputValues}
        />
      )}
      {active === "results" && (
        <ResultsPage
          results={results}
          layout={resultsLayout}
          selectedVADs={selectedVADs}
          inputs={inputValues}
        />
      )}
    </div>
  );
};
