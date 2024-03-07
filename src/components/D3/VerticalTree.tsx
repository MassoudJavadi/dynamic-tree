import React, { useEffect, useState, useRef } from "react";
import { Tree } from "react-d3-tree";
import { Container } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { treeData } from "../../data";
import { assignLevelsToNodes } from "../../helpers/assignLevelsToNode";
import CustomNode from "./CustomNode";
import CustomLink from "./CustomLink";

// Define styles for the tree container
const useStyles = makeStyles({
  treeContainer: {
    height: "100vh",
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
});

const VerticalTree: React.FC = () => {
  const classes = useStyles();
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [translate, setTranslate] = useState({ x: 0, y: 0 });
  const [data, setData] = useState(treeData);

  useEffect(() => {
    const treeDataCopy = JSON.parse(JSON.stringify(treeData));
    assignLevelsToNodes(treeDataCopy);

    // Update the state with the modified tree data
    setData(treeDataCopy);
    const handleResize = () => {
      if (containerRef.current) {
        const { width, height } = containerRef.current.getBoundingClientRect();
        setTranslate({ x: width / 2, y: height / 4 });
      }
    };

    // Calculate translation on mount
    handleResize();

    // Recalculate translation on window resize
    window.addEventListener("resize", handleResize);

    // Cleanup event listener
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <Container ref={containerRef} className={classes.treeContainer}>
      <Tree
        data={data}
        orientation="vertical"
        translate={translate}
        separation={{ siblings: 1, nonSiblings: 1.5 }}
        renderCustomNodeElement={(rd3tProps) => <CustomNode {...rd3tProps} />}
        pathFunc="step"
        transitionDuration={0}
        pathClassFunc={() => "custom-link"}
      />
    </Container>
  );
};

export default VerticalTree;
