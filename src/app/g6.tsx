"use client";

import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import { data } from "./data";

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
  Rect,
  RectStyleProps,
  register,
  RuntimeContext,
} from "@antv/g6";
import { dataBezreg } from "./data/bezreg";
import { DisplayObject } from "@antv/g-lite";

const DEFAULT_LEVEL = "detailed";

export interface ChartNodeData {
  text: string;
  name: string;
  level: string;
  position: string;
  phone: string;
  status: "online" | "busy" | "offline";
}

const COLOR_MAP = {
  error: "#f5222d",
  overload: "#faad14",
  running: "#52c41a",
};

const STATUS_COLORS = {
  online: "#17BEBB",
  busy: "#E36397",
  offline: "#B7AD99",
};

/**
 * Draw a chart node with different ui based on the zoom level.
 */
class ChartNode extends Rect {
  get data(): ChartNodeData {
    return this.context.model.getElementDataById(this.id)
      .data as any as ChartNodeData;
  }

  get level() {
    return this.data!.level || DEFAULT_LEVEL;
  }

  getLabelStyle(): any {
    const text = this.data!.name ?? "";
    const labelStyle =
      this.level === "overview"
        ? {
            fill: "#fff",
            fontSize: 20,
            fontWeight: 600,
            textAlign: "center",
            transform: "translate(0,0)",
          }
        : {
            fill: "#2078B4",
            fontSize: 14,
            fontWeight: 400,
            textAlign: "left",
            transform: "translate(-65, -15)",
          };
    return { text, ...labelStyle };
  }

  getKeyStyle(attributes: any) {
    return {
      ...super.getKeyStyle(attributes),
      fill: this.level === "overview" ? statusColors[this.data.status] : "#fff",
    };
  }

  getPositionStyle(_: RectStyleProps) {
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
    const positionStyle = this.getPositionStyle(attributes);
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
      text: this.data.phone,
      fontSize: 8,
      fontWeight: 300,
      textAlign: "left",
      transform: "translate(-65, 20)",
    };
  }

  drawPhoneShape(_: RectStyleProps, container: DisplayObject) {
    const style = this.getPhoneStyle();
    this.upsert("phone", Label, style as any, container);
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
        ([_, [min, max]]: any) => scale > min && scale <= max,
      )?.[0];
      if (level && this.prevLevel !== level) {
        const { graph } = this.context;
        graph.updateNodeData((prev) =>
          prev.map((node) => ({ ...node, data: { ...node.data, level } })),
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

export default function () {
  const ref = React.useRef(null);
  let graph: Graph | null = null;

  useEffect(() => {
    if (graph == null) {
      const dataSourcses = [data, dataBezreg];
      const dataset = dataSourcses.reduce(
        (prev, curr) => ({
          combos: [...prev.combos, ...curr.combos],
          nodes: [...prev.nodes, ...curr.nodes],
          edges: [...prev.edges, ...curr.edges],
        }),
        { combos: [], nodes: [], edges: [] },
      );

      graph = new Graph({
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
            endArrow: true,
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

        container: ReactDOM.findDOMNode(ref.current) as any,
        data: dataset,
        width: 1500,
        height: 1500,
        layout: {
          //type: "forceAtlas2",
          //kr: 20,
          //preventOverlap: true,
          //nodeSize: 20,
          //type: "d3-force",
          //forceSimulation: true,
          //layout: {
          type: "grid",
          comboPadding: 120,
          preventOverlap: true,
          outerLayout: {
            type: "ForceLayout",
            preventOverlap: true,
            nodeSize: 200,
          },
        },
        autoFit: "view",
        behaviors: [
          "drag-canvas",
          "zoom-canvas",
          "drag-element",
          "click-select",
          "activate-relations",
          "collapse-expand",
          "level-of-detail",
        ],
      });
    }
    graph!.render();
  }, []);

  return <div ref={ref}></div>;
}
