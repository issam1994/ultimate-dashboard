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
      <div className="w-full max-w-[250px] bg-blue-700">
        <div className="h-20 bg-white"></div>
      </div>
      {/* header and content */}
      <div className="flex-auto overflow-hidden">
        {/* header  */}
        <div className="h-20 w-full bg-white shadow"></div>
        <div className="h-32 bg-white shadow m-3"></div>
        {/* content  */}
        <main className="p-6 overflow-hidden mb-[800px]">
          <div
            ref={handleContainerRef}
            className="bg-white rounded overflow-auto"
          >
            <div className="h-[1000px] w-[2000px] bg-gradient-to-r from-blue-700 via-blue-500 to-blue-300"></div>
          </div>
          <StickyScrollbar overflowedTarget={overflowedTarget} />
        </main>
      </div>
    </div>
  );
}

export default App;
