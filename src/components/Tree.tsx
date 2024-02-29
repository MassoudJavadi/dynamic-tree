import React from "react";
import Connector from "./Connector";

interface Person {
  name: string;
  children?: Person[];
}

interface TreeProps {
  data: Person;
}

const TreeNode: React.FC<{ person: Person; level: number }> = ({ person, level }) => {
  const renderChildren = () => {
    if (!person.children || person.children.length === 0) return null;

    return (
      <div style={{ display: "flex", justifyContent: "center" }}>
        {person.children.map((child) => (
          <div key={child.name} style={{ marginLeft: 20 }}>
            <TreeNode person={child} level={level + 1} />
          </div>
        ))}
      </div>
    );
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
      <div>{person.name}</div>
      {renderChildren()}
    </div>
  );
};

const Tree: React.FC<TreeProps> = ({ data }) => {
  const [connectors, setConnectors] = React.useState<JSX.Element[]>([]);

  React.useEffect(() => {
    const lines: JSX.Element[] = [];

    const calculateConnectors = (node: HTMLElement | null) => {
      if (!node) return;

      const { top, left, height, width } = node.getBoundingClientRect();

      if (node.children.length > 0) {
        const children = Array.from(node.children) as HTMLElement[];
        const child = children[0];
        const childRect = child.getBoundingClientRect();

        const startX = left + width / 2;
        const startY = top + height;

        const endX = childRect.left + childRect.width / 2;
        const endY = childRect.top;

        lines.push(
          <Connector key={`${startX}${startY}${endX}${endY}`} startX={startX} startY={startY} endX={endX} endY={endY} />
        );

        children.forEach((child) => calculateConnectors(child));
      }
    };

    calculateConnectors(document.getElementById("tree"));

    setConnectors(lines);
  }, [data]);

  return (
    <div style={{ position: "relative", textAlign: "center" }}>
      <div id="tree">
        <TreeNode person={data} level={0} />
      </div>
    </div>
  );
};

export default Tree;
