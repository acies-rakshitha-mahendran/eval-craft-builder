// src/builder/craft/CraftEditorShell.tsx
import React from "react";
import { Editor, Frame, Element, useEditor } from "@craftjs/core";
import { Container, TitleBlock, SubtitleBlock, ButtonBlock, LogoBlock, ImageBlock, GridBlock, FlexBlock, VADBlock, ResultCard, SliderCard } from "./craftNodes";
import { craftResolver } from "./craftResolver";

type CraftEditorShellProps = {
  initialData?: string | null;
  onChange?: (data: string) => void;
  mode: "home" | "vads" | "results";
  zoom?: number;
  viewportWidth?: string;
};

const VADS_LIST = [
  "Reduced Electricity Consumption",
  "Reduced Maintenance Cost",
  "Increased Ticket Sales",
  "Avoided Revenue Loss",
  "Increase in Recyclability",
  "Lower Material Input Emissions",
];

// Draggable component inside editor context
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const DraggableItem: React.FC<{ component: React.ComponentType<any>; label: string; icon: string; props?: any }> = ({ component, label, icon, props = {} }) => {
  const { connectors } = useEditor();

  return (
    <div
      ref={(ref) => {
        if (ref) {
          // Create a new node in the editor when dragged into the canvas
          // We pass initial props directly into the component so it appears immediately
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          connectors?.create(ref as any, React.createElement(component as any, props));
        }
      }}
      className="palette-item"
    >
      <span>{label}</span>
      <span>{icon}</span>
    </div>
  );
};

const RenderPalette: React.FC<{ mode: "home" | "vads" | "results" }> = ({ mode }) => {
  if (mode === "home") {
    return (
      <>
        <div style={{ fontSize: 12, fontWeight: 600, marginBottom: "0.5rem", opacity: 0.8 }}>Components</div>
        <DraggableItem component={LogoBlock} label="Logo" icon="●" />
        <DraggableItem component={TitleBlock} label="Title" icon="H1" />
        <DraggableItem component={SubtitleBlock} label="Subtitle" icon="⋯" />
        <DraggableItem component={ButtonBlock} label="Button" icon="↳" />
        <DraggableItem component={ImageBlock} label="Image" icon="🖼" />
        <DraggableItem component={GridBlock} label="Grid" icon="⊞" />
        <DraggableItem component={FlexBlock} label="Flex" icon="↔" />
        <DraggableItem component={Container} label="Container" icon="◻" />
      </>
    );
  } else if (mode === "vads") {
    return (
      <>
        <div style={{ fontSize: 12, fontWeight: 600, marginBottom: "0.5rem", opacity: 0.8 }}>VADs</div>
        {VADS_LIST.map((vad) => (
          <DraggableItem
            key={vad}
            component={VADBlock}
            label={vad}
            icon="+"
            props={{ title: vad }}
          />
        ))}
        <div style={{ fontSize: 12, fontWeight: 600, marginTop: "1rem", marginBottom: "0.5rem", opacity: 0.8 }}>Layout</div>
        <DraggableItem component={TitleBlock} label="Title" icon="H1" />
        <DraggableItem component={SubtitleBlock} label="Subtitle" icon="⋯" />
        <DraggableItem component={GridBlock} label="Grid" icon="⊞" />
        <DraggableItem component={FlexBlock} label="Flex" icon="↔" />
        <DraggableItem component={Container} label="Container" icon="◻" />
      </>
    );
  } else {
    return (
      <>
        <div style={{ fontSize: 12, fontWeight: 600, marginBottom: "0.5rem", opacity: 0.8 }}>Components</div>
        <DraggableItem component={ResultCard} label="Result Card" icon="∑" />
        <DraggableItem component={SliderCard} label="Slider" icon="🎚" />
        <DraggableItem component={TitleBlock} label="Title" icon="H1" />
        <DraggableItem component={SubtitleBlock} label="Summary" icon="📊" />
        <DraggableItem component={GridBlock} label="Grid" icon="⊞" />
        <DraggableItem component={FlexBlock} label="Flex" icon="↔" />
        <DraggableItem component={Container} label="Container" icon="◻" />
      </>
    );
  }
};

const RenderVadPanel: React.FC = () => {
  return (
    <div>
      <div style={{ marginBottom: "1rem" }}>
        <label style={{ display: "block", fontSize: 12, marginBottom: "0.35rem", opacity: 0.8 }}>VAD Name</label>
        <input type="text" placeholder="Enter VAD name" />
      </div>
      <div style={{ marginBottom: "1rem" }}>
        <label style={{ display: "block", fontSize: 12, marginBottom: "0.35rem", opacity: 0.8 }}>Category</label>
        <input type="text" placeholder="Enter category" />
      </div>
      <div style={{ marginBottom: "1rem" }}>
        <label style={{ display: "block", fontSize: 12, marginBottom: "0.35rem", opacity: 0.8 }}>Dimension</label>
        <input type="text" placeholder="Enter dimension" />
      </div>
      <div style={{ marginBottom: "1rem" }}>
        <label style={{ display: "block", fontSize: 12, marginBottom: "0.35rem", opacity: 0.8 }}>Variables</label>
        <input type="text" placeholder="Enter variables" />
      </div>
      <div>
        <label style={{ display: "block", fontSize: 12, marginBottom: "0.35rem", opacity: 0.8 }}>Expression</label>
        <textarea placeholder="Enter expression" style={{ minHeight: "80px", fontFamily: "monospace" }} />
      </div>
    </div>
  );
};

// Inspector panel for editing selected component properties
const InspectorPanel: React.FC = () => {
  const { selected } = useEditor((state) => ({
    selected: state.events.selected,
  }));

  if (!selected || selected.size === 0) {
    return (
      <div style={{ fontSize: 11, color: "#666", padding: "0.5rem" }}>
        Select a component to edit properties
      </div>
    );
  }

  return <PropertyEditorWrapper nodeId={Array.from(selected)[0]} />;
};

// Wrapper that has access to Editor context
const PropertyEditorWrapper: React.FC<{ nodeId: string }> = ({ nodeId }) => {
  const { actions } = useEditor();

  const handlePropChange = (propName: string, value: unknown) => {
    try {
      actions.setProp(nodeId, (props: Record<string, unknown>) => {
        props[propName] = value;
      });
    } catch (e) {
      console.error("Error updating prop:", e);
    }
  };

  return (
    <div style={{ fontSize: 11, padding: "0.5rem" }}>
      <div style={{ marginBottom: "1rem", paddingBottom: "0.5rem", borderBottom: "1px solid rgba(85, 136, 59, 0.2)" }}>
        <span style={{ opacity: 0.8, fontWeight: 600 }}>
          Component Properties
        </span>
      </div>

      <div style={{ marginBottom: "0.75rem" }}>
        <label style={{ display: "block", fontSize: 11, marginBottom: "0.25rem", opacity: 0.7 }}>Text</label>
        <input
          type="text"
          placeholder="Enter text"
          onChange={(e) => handlePropChange("text", e.target.value)}
        />
      </div>

      <div style={{ marginBottom: "0.75rem" }}>
        <label style={{ display: "block", fontSize: 11, marginBottom: "0.25rem", opacity: 0.7 }}>Font Size (px)</label>
        <input
          type="number"
          placeholder="16"
          defaultValue="16"
          onChange={(e) => handlePropChange("fontSize", parseInt(e.target.value) || 16)}
        />
      </div>

      <div style={{ marginBottom: "0.75rem" }}>
        <label style={{ display: "block", fontSize: 11, marginBottom: "0.25rem", opacity: 0.7 }}>Text Color</label>
        <input
          type="color"
          defaultValue="#000000"
          onChange={(e) => handlePropChange("color", e.target.value)}
          style={{ height: "32px", cursor: "pointer" }}
        />
      </div>

      <div style={{ marginBottom: "0.75rem" }}>
        <label style={{ display: "block", fontSize: 11, marginBottom: "0.25rem", opacity: 0.7 }}>Background Color</label>
        <input
          type="color"
          defaultValue="#ffffff"
          onChange={(e) => handlePropChange("backgroundColor", e.target.value)}
          style={{ height: "32px", cursor: "pointer" }}
        />
      </div>

      <div style={{ marginBottom: "0.75rem" }}>
        <label style={{ display: "block", fontSize: 11, marginBottom: "0.25rem", opacity: 0.7 }}>Border Radius (px)</label>
        <input
          type="number"
          placeholder="0"
          defaultValue="0"
          onChange={(e) => handlePropChange("borderRadius", parseInt(e.target.value) || 0)}
        />
      </div>

      <div style={{ marginBottom: "0.75rem" }}>
        <label style={{ display: "block", fontSize: 11, marginBottom: "0.25rem", opacity: 0.7 }}>Min Height (px)</label>
        <input
          type="number"
          placeholder="100"
          defaultValue="100"
          onChange={(e) => handlePropChange("minHeight", parseInt(e.target.value) || 100)}
        />
      </div>
    </div>
  );
};

export const CraftEditorShell: React.FC<CraftEditorShellProps> = ({
  initialData,
  onChange,
  mode,
  zoom = 100,
  viewportWidth = "100%",
}) => {
  return (
    <div className="editor-shell">
      <Editor
        resolver={craftResolver}
        onNodesChange={(query) => {
          const json = query.serialize();
          onChange?.(json);
        }}
      >
        <div className="editor-panel">
          <h4 style={{ margin: 0, fontSize: 13, opacity: 0.75 }}>
            {mode === "home" && "Components"}
            {mode === "vads" && "VAD List & Layout"}
            {mode === "results" && "Components"}
          </h4>
          <div
            style={{
              fontSize: 11,
              color: "#9ca3af",
              marginBottom: 8,
            }}
          >
            Drag from here into the central canvas.
          </div>
          <div className="palette-list" style={{ maxHeight: "calc(100vh - 300px)", overflowY: "auto" }}>
            <RenderPalette mode={mode} />
          </div>
        </div>

        <div className="editor-canvas">
          <div className="editor-canvas-inner">
            <div
              className="canvas-frame"
              style={{
                transform: `scale(${zoom / 100})`,
                transformOrigin: "top center",
                width: viewportWidth,
              }}
            >
              <Frame data={initialData ?? undefined}>
                {mode === "results" ? (
                  <Element is={Container} canvas padding={24} align="left">
                    <TitleBlock text="Value Estimation" />
                    <div style={{ marginBottom: 16 }}>
                      <GridBlock columns={4}>
                        <ResultCard label="Total Annual Value" value="Enter value" />
                        <ResultCard label="Total Investments" value="Enter value" />
                        <ResultCard label="Net Benefit (Year 1)" value="Enter value" />
                        <ResultCard label="ROI" value="Enter value" />
                      </GridBlock>
                    </div>
                    <GridBlock columns={2}>
                      <Container padding={16}>
                        <TitleBlock text="Reduced Electricity Consumption" fontSize={18} />
                        <SubtitleBlock text="Enter details here" />
                      </Container>
                      <Container padding={16}>
                        <TitleBlock text="Reduced Maintenance Cost" fontSize={18} />
                        <SubtitleBlock text="Enter details here" />
                      </Container>
                      <Container padding={16}>
                        <TitleBlock text="Increased Ticket Sales" fontSize={18} />
                        <SubtitleBlock text="Enter details here" />
                      </Container>
                      <Container padding={16}>
                        <TitleBlock text="Increased Recyclability" fontSize={18} />
                        <SubtitleBlock text="Enter details here" />
                      </Container>
                    </GridBlock>
                    <div style={{ marginTop: 24 }}>
                      <SliderCard label="Scenario sensitivity" min={0} max={200} value={100} unit="%" />
                    </div>
                  </Element>
                ) : (
                  <Element is={Container} canvas padding={24} align="left" />
                )}
              </Frame>
            </div>
          </div>
        </div>

        <div className="editor-panel">
          <h4 style={{ margin: 0, fontSize: 13, opacity: 0.75 }}>
            {mode === "vads" ? "VAD Properties" : "Inspector"}
          </h4>
          <div
            style={{
              fontSize: 11,
              color: "#9ca3af",
              maxHeight: "calc(100vh - 300px)",
              overflowY: "auto",
            }}
          >
            {mode === "vads" ? <RenderVadPanel /> : <InspectorPanel />}
          </div>
        </div>
      </Editor>
    </div>
  );
};
