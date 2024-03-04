import React from "react";

interface CustomNodeProps {
  nodeDatum: {
    name: string;
    level?: number; // Now we assume level is a property thanks to our preprocessing
  };
}

const CustomNode: React.FC<CustomNodeProps> = ({ nodeDatum }) => {
  // Dummy implementation of determineIconPath
  const determineIconPath = (level?: number): string => {
    // Default icon path
    let iconPath = "/icons/seller.svg";
    // Based on level, determine which icon to use
    if (level === 1) iconPath = "/icons/arshad.svg";
    else if (level === 2) iconPath = "/icons/amoozesh.svg";
    else if (level === 3) iconPath = "/icons/foroosh.svg";
    // Add as many levels as you need

    return iconPath;
  };

  const iconPath = determineIconPath(nodeDatum.level);

  return (
    <g>
      {/* Render the icon as an image or SVG */}
      <image href={iconPath} x="-18" y="-18" height="36px" width="36px" />
      {/* Render the node's name below the icon */}
      <text fill="black" strokeWidth="0.5" x="0" y="40" textAnchor="middle" alignmentBaseline="auto">
        {nodeDatum.name}
      </text>
    </g>
  );
};

export default CustomNode;
