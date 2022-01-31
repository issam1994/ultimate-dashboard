import { useState } from "react";
import StickyScrollbar from "./components/StickyScrollbar";

function App() {
  const [overflowedTarget, setOverflowedTarget] = useState(null);
  const handleContainerRef = (element) => {
    setOverflowedTarget(element);
  };
  return (
    <div className="flex min-h-screen text-gray-700 bg-gray-50">
      {/* sidebar  */}
      <div className="w-full max-w-[250px] bg-blue-600">
        <div className="h-20 bg-white"></div>
      </div>
      {/* header and content */}
      <div className="flex-auto overflow-hidden">
        {/* header  */}
        <div className="h-20 w-full bg-white shadow"></div>
        <div className="h-32 bg-white shadow m-3"></div>
        {/* content  */}
        <main className="px-6 py-24 overflow-hidden mx-auto max-w-7xl bg-white rounded shadow">
          <div
            ref={handleContainerRef}
            className="overflow-auto"
          >
            <table className="">
              <thead>
                {Array(10)
                  .fill("col head")
                  .map((h, i) => (
                    <th key={`${h} ${i + 1}`} className="p-4 min-w-[150px] text-left bg-gray-200 border-r border-white">{`${h} ${i + 1}`}</th>
                  ))}
              </thead>
              {Array(30)
                .fill("col head")
                .map((r, i) => (
                  <tr key={`${r} ${i + 1}`} className="border-b">
                    {Array(10)
                      .fill("col cell")
                      .map((c, j) => (
                        <td key={`${c + i} ${j + 1}`} className="p-4">{`${c} ${j + 1}`}</td>
                      ))}
                  </tr>
                ))}
            </table>
          </div>
          <StickyScrollbar overflowedTarget={overflowedTarget} />
        </main>
      </div>
    </div>
  );
}

export default App;
