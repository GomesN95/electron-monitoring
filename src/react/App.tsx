import { useEffect, useMemo, useState } from "react";

import { useStatistics } from "./useStatistic";
import { Chart } from "./Chart";

import "./App.css";

function App() {
  const [count, setCount] = useState(0);
  const maxDataPoints = 12;
  const uStatistics = useStatistics(maxDataPoints);
  const [activeView, setActiveView] = useState<View>("CPU");

  const cpuUsages = useMemo(
    () => uStatistics.map((stat) => stat.cpuUsage),
    [uStatistics]
  );
  const ramUsages = useMemo(
    () => uStatistics.map((stat) => stat.ramUsage),
    [uStatistics]
  );
  const storageUsages = useMemo(
    () => uStatistics.map((stat) => stat.storageUsage),
    [uStatistics]
  );
  const activeUsages = useMemo(() => {
    switch (activeView) {
      case "CPU":
        return cpuUsages;
      case "RAM":
        return ramUsages;
      case "STORAGE":
        return storageUsages;
    }
  }, [activeView, cpuUsages, ramUsages, storageUsages]);

  useEffect(() => {
    window.electron.subscribeChangeView((view) => setActiveView(view));
  }, []);

  return (
    <div className="App">
      <header>
        <button id="close" onClick={() => window.electron.sendFrameAction('CLOSE')}/>
        <button id="minimize" onClick={() => window.electron.sendFrameAction('MINIMIZE')}/>
        <button id="maximize" onClick={() => window.electron.sendFrameAction('MAXIMIZE')}/>
      </header>
      <div style={{ height: 120 }}>
        <Chart data={activeUsages} maxDataPoints={maxDataPoints} />
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </div>
  );
}

export default App;
