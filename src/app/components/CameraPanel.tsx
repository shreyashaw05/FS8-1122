"use client";
import React, { useState, useRef, useCallback } from "react";

// Dummy incident data
const cameraEvents = [
  {
    camera: "Camera 1",
    events: [
      { startHour: 1, duration: 2, label: "Unauthorized Event" },
      { startHour: 3.5, duration: 4, label: "Gun Threat" },
      { startHour: 14, duration: 1, label: "Face Recognized" },
    ],
  },
  {
    camera: "Camera 2",
    events: [
      { startHour: 2, duration: 1, label: "Gun Threat" },
      { startHour: 10, duration: 2, label: "Unauthorized Event" },
    ],
  },
  {
    camera: "Camera 3",
    events: [
      { startHour: 3, duration: 1, label: "Face Recognized" },
      { startHour: 7, duration: 1.5, label: "Gun Threat" },
    ],
  },
];

const totalHours = 24;
const hourWidth = 50;
const trackWidth = totalHours * hourWidth;

export default function CameraRack() {
  const [scrubberX, setScrubberX] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const dragStartRef = useRef({ x: 0, initialScrubberX: 0 });

  const handleMouseDown = useCallback((e:any) => {
    setIsDragging(true);
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    dragStartRef.current = {
      x: e.clientX,
      initialScrubberX: scrubberX
    };
    e.preventDefault();
  }, [scrubberX]);

  const handleMouseMove = useCallback((e:any) => {
    if (!isDragging) return;
    
    const deltaX = e.clientX - dragStartRef.current.x;
    const newX = dragStartRef.current.initialScrubberX + deltaX;
    const clampedX = Math.max(0, Math.min(newX, trackWidth));
    
    setScrubberX(clampedX);
  }, [isDragging]);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  React.useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isDragging, handleMouseMove, handleMouseUp]);

  const currentHour = (scrubberX / hourWidth).toFixed(1);

  return (
    <div className="overflow-x-auto border rounded relative" ref={containerRef}>
      {/* Timeline Header */}
      <div className="flex border-b h-[40px] items-end z-10">
        <div className="w-[100px] px-2 text-sm font-medium border-r">Camera</div>
        <svg width={trackWidth} height={30}>
          {Array.from({ length: totalHours }).map((_, i) => (
            <g key={i}>
              <text x={i * hourWidth + 2} y={15} fontSize={10} fill="#aaa">
                {i.toString().padStart(2, "0")}:00
              </text>
              <line
                x1={i * hourWidth}
                y1={20}
                x2={i * hourWidth}
                y2={30}
                stroke="#ccc"
                strokeWidth={1}
              />
            </g>
          ))}
        </svg>
      </div>

      {/* Camera Rows */}
      {cameraEvents.map((camera, idx) => (
        <div key={idx} className="flex items-center border-b h-[40px] relative">
          <div className="w-[100px] px-2 text-sm border-r">{camera.camera}</div>
          <div className="relative" style={{ width: trackWidth }}>
            {camera.events.map((event, i) => (
              <div
                key={i}
                className="absolute h-4 top-[-2px] rounded-sm text-[10px] text-white px-1 flex items-center justify-center"
                style={{
                  left: event.startHour * hourWidth,
                  // width: event.duration * hourWidth,
                  backgroundColor:
                    event.label === "Unauthorized Event"
                      ? "#ef4444"
                      : event.label === "Gun Threat"
                      ? "#f59e0b"
                      : "#3b82f6",
                }}
              >
                {event.label}
              </div>
            ))}
          </div>
        </div>
      ))}

      <div
        className="absolute top-0 bottom-0 w-[2px] bg-sky-500 z-10 pointer-events-none"
        style={{ left: `${scrubberX + 100}px` }}
      />

      <div
        className={`absolute top-0 bottom-0 w-3 bg-sky-600 z-20 rounded transition-opacity ${
          isDragging ? 'cursor-grabbing' : 'cursor-grab hover:bg-sky-700'
        }`}
        style={{ left: `${scrubberX + 100 - 6}px` }}
        onMouseDown={handleMouseDown}
      />
    </div>
  );
}