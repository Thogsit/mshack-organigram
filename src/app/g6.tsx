"use client";

import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import { data } from "./data";

import {
  Badge,
  BaseBehavior,
  ExtensionCategory,
  Graph,
  GraphEvent,
  Label,
  Rect,
  register,
} from "@antv/g6";

const ICON_MAP = {
  error: "&#10060;",
  overload: "&#9889;",
  running: "&#9989;",
};

const COLOR_MAP = {
  error: "#f5222d",
  overload: "#faad14",
  running: "#52c41a",
};

const statusColors = {
  online: "#17BEBB",
  busy: "#E36397",
  offline: "#B7AD99",
};

const DEFAULT_LEVEL = "detailed";

/**
 * Draw a chart node with different ui based on the zoom level.
 */
class ChartNode extends Rect {
  get data() {
    return this.context.model.getElementDataById(this.id).data;
  }

  get level() {
    return this.data!.level || DEFAULT_LEVEL;
  }

  getLabelStyle() {
    const text = this.data!.name;
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
      // @ts-ignore
      fill: this.level === "overview" ? statusColors[this.data.status] : "#fff",
    };
  }

  // @ts-ignore
  getPositionStyle(attributes) {
    if (this.level === "overview") return false;
    return {
      // @ts-ignore
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
    // @ts-ignore
    this.upsert("position", Label, positionStyle, container);
  }

  // @ts-ignore
  getStatusStyle(attributes: any) {
    if (this.level === "overview") return false;
    return {
      // @ts-ignore
      text: this.data.status,
      fontSize: 8,
      textAlign: "left",
      transform: "translate(40, -16)",
      padding: [0, 4],
      fill: "#fff",
      // @ts-ignore
      backgroundFill: statusColors[this.data.status],
    };
  }

  drawStatusShape(attributes: any, container: any) {
    const statusStyle = this.getStatusStyle(attributes);
    // @ts-ignore
    this.upsert("status", Badge, statusStyle, container);
  }

  getPhoneStyle(attributes: any) {
    if (this.level === "overview") return false;
    return {
      // @ts-ignore
      text: this.data.phone,
      fontSize: 8,
      fontWeight: 300,
      textAlign: "left",
      transform: "translate(-65, 20)",
    };
  }

  drawPhoneShape(attributes: any, container: any) {
    const style = this.getPhoneStyle(attributes);
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

  constructor(context: any, options: any) {
    super(context, options);
    this.bindEvents();
  }

  update(options: any) {
    this.unbindEvents();
    super.update(options);
    this.bindEvents();
  }

  updateZoomLevel = async (e: any) => {
    if ("scale" in e.data) {
      const scale = e.data.scale;
      const level = Object.entries(this.levels).find(
        ([key, [min, max]]: any) => scale > min && scale <= max,
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
        container: ReactDOM.findDOMNode(ref.current) as any,
        data,
        width: 1500,
        height: 1500,
        layout: {
          type: "d3-force",
          preventOverlap: true,
          //kr: 20,
          //center: [250, 250],
          collide: {
            strength: 0.01,
          },
        },
        //autoFit: "view",
        behaviors: [
          "drag-canvas",
          "zoom-canvas",
          "drag-element-force",
          "click-select",
          "activate-relations",
          "level-of-detail",
          {
            type: "collapse-expand-group",
            trigger: "click",
          },
        ],
      });
    }
    graph!.render();
  }, []);

  return <div ref={ref}></div>;
}
