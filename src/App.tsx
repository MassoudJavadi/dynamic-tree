// App.tsx
import React from "react";
import Tree from "react-d3-tree";
import { treeData } from "./data";
import { makeStyles } from "@mui/styles";
import { Container } from "@mui/material";

// Define styles for the tree container
const useStyles = makeStyles({
  treeContainer: {
    height: "100vh",
    width: "100%",
  },
});

const App: React.FC = () => {
  const classes = useStyles();
  return (
    <div className="App">
      <Tree
        data={treeData}
        orientation="vertical"
        separation={{ siblings: 1, nonSiblings: 2 }}
        transitionDuration={0}
        // nodeSvgShape={{ shape: "circle", shapeProps: { r: 10 } }}
      />
    </div>
  );
};

export default App;
