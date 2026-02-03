// src/builder/craft/craftNodes.tsx
import React from "react";
import { useNode } from "@craftjs/core";
import { ResultsContext } from "../../resultsContext";

type BaseProps = {
  children?: React.ReactNode;
};

// Container (canvas root)
export const Container: React.FC<
  BaseProps & { padding?: number; align?: "left" | "center" | "right"; backgroundColor?: string; borderRadius?: number; minHeight?: number }
> = ({ children, padding = 24, align = "left", backgroundColor, borderRadius = 20, minHeight = 400 }) => {
  const { connectors } = useNode();
  
  return (
    <div
      ref={(ref) => {
        if (ref) connectors.connect(ref);
      }}
      style={{
        padding,
        borderRadius,
        border: "1px solid rgba(85,136,59,0.3)",
        background: backgroundColor ?? "transparent",
        boxShadow: "0 16px 45px rgba(0,0,0,0.1)",
        textAlign: (align as "left" | "center" | "right" | "justify" | "initial"),
        minHeight,
        cursor: "pointer",
      }}
    >
      {children}
    </div>
  );
};
// eslint-disable-next-line @typescript-eslint/no-explicit-any
(Container as any).craft = {
  displayName: "Container",
  props: { padding: 24, align: "left", borderRadius: 20, minHeight: 400 },
};

// Title
export const TitleBlock: React.FC<{ text?: string; align?: string; fontSize?: number; color?: string; backgroundColor?: string }> = ({
  text = "Enter title",
  align = "left",
  fontSize = 32,
  color = "#000000",
  backgroundColor,
}) => {
  const { connectors } = useNode();
  const textAlign: "left" | "center" | "right" =
    align === "center" || align === "right" ? (align as "center" | "right") : "left";

  return (
    <h1
      ref={(ref) => {
        if (ref) connectors.connect(ref);
      }}
      style={{
        margin: 0,
        marginBottom: 12,
        fontSize,
        letterSpacing: "0.06em",
        textTransform: "uppercase",
        color,
        backgroundColor,
        textAlign,
        cursor: "pointer",
      }}
    >
      {text}
    </h1>
  );
};
// eslint-disable-next-line @typescript-eslint/no-explicit-any
(TitleBlock as any).craft = {
  displayName: "Title",
  props: { text: "Enter title", align: "left", fontSize: 32, color: "#000000" },
  related: {},
};

// Subtitle
export const SubtitleBlock: React.FC<{ text?: string; fontSize?: number; color?: string; backgroundColor?: string }> = ({
  text = "Enter subtitle",
  fontSize = 14,
  color = "#000000",
  backgroundColor,
}) => {
  const { connectors } = useNode();
  
  return (
    <p
      ref={(ref) => {
        if (ref) connectors.connect(ref);
      }}
      style={{
        margin: 0,
        marginBottom: 18,
        fontSize,
        color,
        backgroundColor,
        cursor: "pointer",
      }}
    >
      {text}
    </p>
  );
};
// eslint-disable-next-line @typescript-eslint/no-explicit-any
(SubtitleBlock as any).craft = {
  displayName: "Subtitle",
  props: { text: "Enter subtitle", fontSize: 14, color: "#000000" },
};

// Button
export const ButtonBlock: React.FC<{ label?: string; fontSize?: number; color?: string; backgroundColor?: string; padding?: number; borderRadius?: number }> = ({
  label = "Enter button label",
  fontSize = 14,
  color = "#ffffff",
  backgroundColor = "#55883B",
  padding = 10,
  borderRadius = 8,
}) => {
  const { connectors } = useNode();
  
  return (
    <button 
      ref={(ref) => {
        if (ref) connectors.connect(ref);
      }}
      style={{
        padding,
        borderRadius,
        border: "none",
        backgroundColor,
        color,
        fontSize,
        fontWeight: 600,
        cursor: "pointer",
        transition: "all 0.2s ease",
      }}
      onClick={(e) => e.stopPropagation()}
      onMouseDown={(e) => e.stopPropagation()}
    >
      {label}
    </button>
  );
};
// eslint-disable-next-line @typescript-eslint/no-explicit-any
(ButtonBlock as any).craft = {
  displayName: "Button",
  props: { label: "Enter button label", fontSize: 14, color: "#ffffff", backgroundColor: "#55883B", padding: 10 },
};

// Logo
export const LogoBlock: React.FC<{ text?: string; fontSize?: number; color?: string; backgroundColor?: string }> = ({ 
  text = "Enter logo text",
  fontSize = 13,
  color = "#000000",
  backgroundColor,
}) => {
  const { connectors } = useNode();
  
  return (
    <div
      ref={(ref) => {
        if (ref) connectors.connect(ref);
      }}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 8,
        padding: "6px 10px",
        borderRadius: 999,
        border: "1px solid rgba(85,136,59,0.7)",
        background: backgroundColor || "radial-gradient(circle at top left, rgba(85,136,59,0.1), rgba(85,136,59,0.05))",
        fontSize,
        color,
        letterSpacing: "0.12em",
        textTransform: "uppercase",
        cursor: "pointer",
      }}
    >
      <div
        style={{
          width: 18,
          height: 18,
          borderRadius: 999,
          background:
            "radial-gradient(circle at top left, #55883B, #3d6029 65%)",
          boxShadow: "0 8px 18px rgba(85,136,59,0.6)",
        }}
      />
      <span>{text}</span>
    </div>
  );
};
// eslint-disable-next-line @typescript-eslint/no-explicit-any
(LogoBlock as any).craft = {
  displayName: "Logo",
  props: { text: "Enter logo text", fontSize: 13, color: "#000000" },
};

// Image
export const ImageBlock: React.FC<{ src?: string; alt?: string }> = ({
  src = "https://via.placeholder.com/400x200/1e3a8a/e5e7eb?text=Image",
  alt = "Placeholder",
}) => {
  const { connectors } = useNode();
  
  return (
    <img
      ref={(ref) => {
        if (ref) connectors.connect(ref);
      }}
      src={src}
      alt={alt}
      style={{
        maxWidth: "100%",
        borderRadius: 12,
        border: "1px solid rgba(148,163,184,0.5)",
        cursor: "pointer",
      }}
    />
  );
};
// eslint-disable-next-line @typescript-eslint/no-explicit-any
(ImageBlock as any).craft = {
  displayName: "Image",
  props: {
    src: "https://via.placeholder.com/400x200/1e3a8a/e5e7eb?text=Image",
    alt: "Placeholder",
  },
};

// Grid
export const GridBlock: React.FC<BaseProps & { columns?: number }> = ({
  children,
  columns = 2,
}) => {
  const { connectors } = useNode();
  
  return (
    <div
      ref={(ref) => {
        if (ref) connectors.connect(ref);
      }}
      style={{
        display: "grid",
        gridTemplateColumns: `repeat(${columns}, 1fr)`,
        gap: 12,
        padding: 12,
        borderRadius: 12,
        border: "1px dashed rgba(148,163,184,0.5)",
        minHeight: 100,
        cursor: "pointer",
      }}
    >
      {children}
    </div>
  );
};
// eslint-disable-next-line @typescript-eslint/no-explicit-any
(GridBlock as any).craft = {
  displayName: "Grid",
  props: { columns: 2 },
};

// Flex
export const FlexBlock: React.FC<
  BaseProps & { direction?: "row" | "column"; gap?: number }
> = ({ children, direction = "row", gap = 12 }) => {
  const { connectors } = useNode();
  
  return (
    <div
      ref={(ref) => {
        if (ref) connectors.connect(ref);
      }}
      style={{
        display: "flex",
        flexDirection: direction,
        gap,
        padding: 12,
        borderRadius: 12,
        border: "1px dashed rgba(148,163,184,0.5)",
        minHeight: 100,
        cursor: "pointer",
      }}
    >
      {children}
    </div>
  );
};
// eslint-disable-next-line @typescript-eslint/no-explicit-any
(FlexBlock as any).craft = {
  displayName: "Flex",
  props: { direction: "row", gap: 12 },
};

// VAD Block
export const VADBlock: React.FC<{ title?: string; vadId?: string; backgroundColor?: string; color?: string }> = ({
  title = "Enter VAD name",
  vadId = "",
  backgroundColor,
  color,
}) => {
  const { connectors } = useNode();
  
  return (
    <div
      ref={(ref) => {
        if (ref) connectors.connect(ref);
      }}
      className="glass-card"
      style={{
        marginBottom: 8,
        display: "flex",
        flexDirection: "column",
        gap: 4,
        padding: "10px 12px",
        background: backgroundColor || "rgba(85, 136, 59, 0.2)",
        border: `1px solid ${color || "#55883B"}`,
        borderRadius: "8px",
        cursor: "pointer",
      }}
    >
      <div style={{ fontSize: 12, fontWeight: 600, color: color || "#55883B", wordBreak: "break-word" }}>{title}</div>
      <div style={{ fontSize: 10, color: color || "#55883B", opacity: 0.7 }}>
        {vadId ? `VAD ID: ${vadId}` : "Drag into input screen to collect user inputs."}
      </div>
    </div>
  );
};
// eslint-disable-next-line @typescript-eslint/no-explicit-any
(VADBlock as any).craft = {
  displayName: "VADBlock",
  props: { title: "Enter VAD name", vadId: "", backgroundColor: "rgba(85, 136, 59, 0.2)", color: "#55883B" },
};

// Result Card
export const ResultCard: React.FC<{ label?: string; value?: string; resultKey?: string }> = ({
  label = "Enter metric label",
  value = "Enter value",
  resultKey,
}) => {
  const { connectors } = useNode();
  const results = React.useContext(ResultsContext);

  // Prefer an explicit resultKey if provided, otherwise fall back to the label.
  const key = (resultKey || label || "").trim();

  let displayValue: string = value;

  if (results && key) {
    const numericResults = results;
    if (Object.prototype.hasOwnProperty.call(numericResults, key)) {
      const numeric = numericResults[key];
      displayValue = numeric.toLocaleString(undefined, {
        maximumFractionDigits: 2,
      });
    }
  }
  
  return (
    <div
      ref={(ref) => {
        if (ref) connectors.connect(ref);
      }}
      className="glass-card"
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 6,
        cursor: "pointer",
      }}
    >
      <div style={{ fontSize: 12, color: "#9ca3af" }}>{label}</div>
      <div style={{ fontSize: 24, fontWeight: 600 }}>{displayValue}</div>
    </div>
  );
};
// eslint-disable-next-line @typescript-eslint/no-explicit-any
(ResultCard as any).craft = {
  displayName: "ResultCard",
  props: { label: "Enter metric label", value: "Enter value" },
};

// Slider Card - for interactive value adjustments on results page
export const SliderCard: React.FC<{
  label?: string;
  min?: number;
  max?: number;
  value?: number;
  unit?: string;
}> = ({
  label = "Enter slider label",
  min = 0,
  max = 100,
  value = 50,
  unit = "",
}) => {
  const [sliderValue, setSliderValue] = React.useState(value);
  const { connectors } = useNode();

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseFloat(e.target.value);
    setSliderValue(newValue);
  };

  const percentage = ((sliderValue - (min ?? 0)) / ((max ?? 100) - (min ?? 0))) * 100;

  return (
    <div
      ref={(ref) => {
        if (ref) connectors.connect(ref);
      }}
      className="glass-card"
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 12,
        padding: "14px 12px",
        background: "rgba(34, 197, 94, 0.1)",
        border: "1px solid rgba(34, 197, 94, 0.3)",
        borderRadius: "8px",
        cursor: "pointer",
        userSelect: "none",
      }}
      onClick={(e) => e.stopPropagation()}
    >
      <div style={{ fontSize: 12, fontWeight: 500, color: "#9ca3af" }}>{label}</div>
      <div
        style={{
          position: "relative",
          width: "100%",
        }}
      >
        <input
          type="range"
          min={min}
          max={max}
          value={sliderValue}
          onChange={handleSliderChange}
          onClick={(e) => e.stopPropagation()}
          style={{
            width: "100%",
            height: 6,
            borderRadius: 3,
            background: `linear-gradient(to right, #22c55e 0%, #22c55e ${percentage}%, rgba(148, 163, 184, 0.3) ${percentage}%, rgba(148, 163, 184, 0.3) 100%)`,
            outline: "none",
            cursor: "pointer",
          }}
        />
      </div>
      <div
        style={{
          fontSize: 18,
          fontWeight: 600,
          color: "#22c55e",
          textAlign: "center",
          textShadow: "0 0 8px rgba(34, 197, 94, 0.5)",
        }}
      >
        {sliderValue}
        {unit && ` ${unit}`}
      </div>
    </div>
  );
};
// eslint-disable-next-line @typescript-eslint/no-explicit-any
(SliderCard as any).craft = {
  displayName: "SliderCard",
  props: { label: "Adjust Value", min: 0, max: 100, value: 50, unit: "" },
};
