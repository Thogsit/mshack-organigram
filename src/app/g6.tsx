"use client";

import React, { useEffect, useRef, useState } from "react";

import {
  Badge,
  BaseBehavior,
  BaseBehaviorOptions,
  ComboData,
  EdgeData,
  ExtensionCategory,
  Graph,
  GraphEvent,
  IViewportEvent,
  Label,
  LabelStyleProps,
  Rect,
  RectStyleProps,
  register,
  RuntimeContext,
} from "@antv/g6";
import { DisplayObject } from "@antv/g-lite";
import { EditNodeForm } from "@/components/changeForm";
import { transformDataset } from "./data/utils";

const DEFAULT_LEVEL = "detailed";

export interface ChartNodeData {
  text: string;
  name: string;
  level: string;
  position: string;
  contact: string;
  status: "online" | "busy" | "offline";
}

const STATUS_COLORS = {
  online: "#17BEBB",
  busy: "#E36397",
  offline: "#B7AD99",
};

/**
 * Draw a chart node with different ui based on the zoom level.
 */

const overviewLabelStyle = {
  fill: "#2078B4",
  fontSize: 20,
  fontWeight: 600,
  textAlign: "center",
  transform: "translate(0,0)",
};

const regularLabelStyle = {
  fill: "#2078B4",
  fontSize: 14,
  fontWeight: 400,
  textAlign: "left",
  transform: "translate(-65, -15)",
};

class ChartNode extends Rect {
  get data(): ChartNodeData {
    return this.context.model.getElementDataById(this.id)
      .data as unknown as ChartNodeData;
  }

  get level() {
    return this.data!.level || DEFAULT_LEVEL;
  }

  getLabelStyle() {
    const labelStyle = {
      text: this.data!.name ?? "",
      ...(this.level === "overview" ? overviewLabelStyle : regularLabelStyle),
    } as LabelStyleProps;
    console.log(this.level);

    return labelStyle;
  }

  getKeyStyle(attributes: Required<RectStyleProps>) {
    return {
      ...super.getKeyStyle(attributes),
      fill:
        this.level === "overview" ? STATUS_COLORS[this.data.status] : "#fff",
    };
  }

  getPositionStyle() {
    if (this.level === "overview") return false;
    return {
      text: this.data.position,
      fontSize: 8,
      fontWeight: 400,
      textTransform: "uppercase",
      fill: "#343f4a",
      textAlign: "left",
      transform: "translate(-65, 0)",
    };
  }

  drawPositionShape(attributes: any, container: any) {
    const positionStyle = this.getPositionStyle();
    this.upsert("position", Label, positionStyle as any, container);
  }

  getStatusStyle() {
    if (this.level === "overview") return false;
    return {
      text: this.data.status,
      fontSize: 8,
      textAlign: "left",
      transform: "translate(40, -16)",
      padding: [0, 4],
      fill: "#fff",
      backgroundFill: STATUS_COLORS[this.data.status],
    };
  }

  drawStatusShape(_: RectStyleProps, container: DisplayObject) {
    const statusStyle = this.getStatusStyle();
    this.upsert("status", Badge, statusStyle as any, container);
  }

  getPhoneStyle() {
    if (this.level === "overview") return false;
    return {
      text: this.data.contact,
      fontSize: 8,
      fontWeight: 300,
      textAlign: "left",
      transform: "translate(-65, 20)",
    };
  }

  drawPhoneShape(_: RectStyleProps, container: DisplayObject) {
    const style = this.getPhoneStyle();
    this.upsert("contact", Label, style as any, container);
  }

  render(attributes = this.parsedAttributes, container = this) {
    super.render(attributes, container);

    this.drawPositionShape(attributes, container);

    this.drawStatusShape(attributes, container);

    this.drawPhoneShape(attributes, container);
  }
}

/**
 * Implement a level of detail rendering, which will show different details based on the zoom level.
 */
class LevelOfDetail extends BaseBehavior {
  prevLevel = DEFAULT_LEVEL;
  levels = {
    ["overview"]: [0, 0.6],
    ["detailed"]: [0.6, Infinity],
  };

  constructor(context: RuntimeContext, options: Partial<BaseBehaviorOptions>) {
    super(context, options);
    this.bindEvents();
  }

  update(options: Partial<BaseBehaviorOptions>) {
    this.unbindEvents();
    super.update(options);
    this.bindEvents();
  }

  updateZoomLevel = async (e: IViewportEvent) => {
    if ("scale" in e.data) {
      const scale = e.data.scale!;
      const level = Object.entries(this.levels).find(
        ([_, [min, max]]) => scale > min && scale <= max
      )?.[0];
      if (level && this.prevLevel !== level) {
        const { graph } = this.context;
        graph.updateNodeData((prev) =>
          prev.map((node) => ({ ...node, data: { ...node.data, level } }))
        );
        await graph.draw();
        this.prevLevel = level;
      }
    }
  };

  bindEvents() {
    const { graph } = this.context;
    graph.on(GraphEvent.AFTER_TRANSFORM, this.updateZoomLevel);
  }

  unbindEvents() {
    const { graph } = this.context;
    graph.off(GraphEvent.AFTER_TRANSFORM, this.updateZoomLevel);
  }

  destroy() {
    this.unbindEvents();
    super.destroy();
  }
}

register(ExtensionCategory.NODE, "chart-node", ChartNode);
register(ExtensionCategory.BEHAVIOR, "level-of-detail", LevelOfDetail);

async function getGraphData(): Promise<any> {
  const r = await fetch("/api/graph");
  return await r.json();
}

export default function Visualisation() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [graph, setGraph] = useState<Graph | null>(null);
  let [graphData, setGraphData] = useState<{
    edges: [];
    combos: [];
    nodes: [];
  } | null>(null);

  const [activeNode, setActiveNode] = React.useState<EventTarget | null>(null);
  const [openDialog, setOpenDialog] = React.useState<boolean>(false);

  useEffect(() => {
    getGraphData().then((data) => {
      setGraphData(data);
    });
  }, []);

  useEffect(() => {
    if (graph == null && graphData != null && containerRef.current != null) {
      setGraph(
        new Graph({
          node: {
            type: "chart-node",
            style: {
              labelPlacement: "center",
              lineWidth: 1,
              ports: [{ placement: "top" }, { placement: "bottom" }],
              radius: 2,
              shadowBlur: 10,
              shadowColor: "#e0e0e0",
              shadowOffsetX: 3,
              size: [150, 60],
              stroke: "#C0C0C0",
            },
          },
          edge: {
            style: {
              labelText: function (this: Graph, d: EdgeData) {
                return d.label as string;
              },
            },
          },
          combo: {
            type: "rect",
            style: {
              labelText: function (this: Graph, d: ComboData) {
                return d.label as string;
              },
              labelCfg: {
                position: "top",
              },
              endArrow: true,
            },
          },

          container: containerRef.current,
          data: transformDataset(graphData),
          width: window.innerWidth,
          height: window.innerHeight,
          layout: {
            //type: "combo-combined",
            //innerLayout: new DagreLayout({}),
            //outerLayout: new DagreLayout({}),
            //kr: 20,
            //type: "d3-force",
            //forceSimulation: true,
            //layout: {
            //type: "dagre",
            type: "antv-dagre",
            //comboPadding: 120,
          },
          autoFit: "view",
          behaviors: [
            "drag-canvas",
            "zoom-canvas",
            "click-select",
            "activate-relations",
            "collapse-expand",
            "level-of-detail",
          ],
        })
      );
    }
  }, [graphData, graph]);

  useEffect(() => {
    if (!graph) return;

    graph.on("node:click", (ev: PointerEvent) => {
      console.log(`Clicked ${ev}`, ev);
      setActiveNode(ev.target);
      setOpenDialog(true);
      const shape = ev.target;
    });

    graph?.render();
  }, [graph]);

  return (
    <div ref={containerRef}>
      <EditNodeForm
        eventTarget={activeNode}
        openDialog={openDialog}
        setOpenDialog={setOpenDialog}
      />
    </div>
  );
}
