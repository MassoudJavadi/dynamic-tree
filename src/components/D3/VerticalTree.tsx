import React, { useEffect, useState, useRef } from "react";
import { Tree } from "react-d3-tree";
import { Container } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { treeData } from "../../data";

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

  useEffect(() => {
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
        data={treeData}
        orientation="vertical"
        translate={translate}
        separation={{ siblings: 1, nonSiblings: 1.5 }}
        // pathFunc="diagonal"
        transitionDuration={0}
      />
    </Container>
  );
};

export default VerticalTree;
