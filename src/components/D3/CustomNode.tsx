import React, { useEffect, useRef } from "react";

interface CustomNodeProps {
  nodeDatum: {
    name: string;
    level?: number;
  };
  scrollToNode: (nodeElement: HTMLElement | SVGElement | null) => void;
  containerRef: React.RefObject<HTMLDivElement>;
  name: string;
}

const CustomNode: React.FC<CustomNodeProps> = ({ nodeDatum, scrollToNode, containerRef, name }) => {
  const nodeRef = useRef<SVGGElement>(null);

  const determineIconPath = (level?: number): string => {
    let iconPath = "/icons/seller.svg";
    if (level === 1) iconPath = "/icons/arshad.svg";
    else if (level === 2) iconPath = "/icons/amoozesh.svg";
    else if (level === 3) iconPath = "/icons/foroosh.svg";
    return iconPath;
  };

  const iconPath = determineIconPath(nodeDatum.level);

  useEffect(() => {
    if (!name) return;
    if (nodeRef.current && containerRef.current && nodeDatum.name.includes(name)) {
      scrollToNode(nodeRef.current);
    }
  }, [name, nodeDatum.name, scrollToNode, containerRef]);

  return (
    <g ref={nodeRef}>
      <rect x="-28" y="-28" width="40" height="80" fill="white" stroke="none" />
      <image href={iconPath} x="-18" y="-18" height="36px" width="36px" />
      <text fill="black" strokeWidth="0.5" x="0" y="40" textAnchor="middle" alignmentBaseline="auto">
        {nodeDatum.name}
      </text>
    </g>
  );
};

export default CustomNode;
