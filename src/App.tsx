// App.tsx
import React, { useState } from "react";

import VerticalTree from "./components/D3/VerticalTree";

const App: React.FC = () => {
  const [name, setName] = useState("");
  return (
    <div className="App">
      <div style={{ height: "90vh", background: "red" }}>
        <VerticalTree name={name} />
      </div>
    </div>
  );
};

export default App;
