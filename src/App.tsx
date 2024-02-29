// App.tsx
import React from "react";
import Tree from "./components/Tree";

interface Person {
  name: string;
  children?: Person[];
}

const App: React.FC = () => {
  // Sample data with a root node and its children
  const data: Person = {
    name: "Root",
    children: [
      {
        name: "Node 1",
        children: [{ name: "Node 1.1" }, { name: "Node 1.2" }],
      },
      {
        name: "Node 2",
        children: [{ name: "Node 2.1" }, { name: "Node 2.2" }],
      },
    ],
  };

  return (
    <div className="App">
      <Tree data={data} />
    </div>
  );
};

export default App;
