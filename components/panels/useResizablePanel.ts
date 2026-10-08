"use client";

import { useCallback, useEffect, useRef, useState } from "react";

export interface ResizableOptions {
  min: number;
  max: number;
  axis: "x" | "y";
  invert?: boolean;
}

/**
 * Drag-to-resize for a single panel edge. Returns the current size and a
 * mousedown handler to attach to the drag handle. Real pointer tracking via
 * window listeners (not a fake/animated resize) so panels behave like an
 * actual docking layout (Blender/Unreal-style).
 */
export function useResizablePanel(initial: number, options: ResizableOptions): [number, (e: any) => void] {
  const { min, max, axis, invert = false } = options;
  const [size, setSize] = useState(initial);
  const dragging = useRef(false);
  const start = useRef({ pos: 0, size: 0 });

  const onMouseDown = useCallback(
    (e: any) => {
      dragging.current = true;
      start.current = { pos: axis === "x" ? e.clientX : e.clientY, size };
      document.body.style.cursor = axis === "x" ? "col-resize" : "row-resize";
      document.body.style.userSelect = "none";
    },
    [axis, size]
  );

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      if (!dragging.current) return;
      const pos = axis === "x" ? e.clientX : e.clientY;
      let delta = pos - start.current.pos;
      if (invert) delta = -delta;
      const next = Math.min(max, Math.max(min, start.current.size + delta));
      setSize(next);
    };
    const onUp = () => {
      dragging.current = false;
      document.body.style.cursor = "";
      document.body.style.userSelect = "";
    };
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
    };
  }, [axis, invert, min, max]);

  return [size, onMouseDown];
}
