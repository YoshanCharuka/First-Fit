import React, { useState } from "react";
import "./App.css";

function App() {
  const [memoryBlocks, setMemoryBlocks] = useState([
    { size: 100, isFree: true },
    { size: 50, isFree: true },
    { size: 200, isFree: true },
    { size: 300, isFree: true },
  ]);
  const [requestSize, setRequestSize] = useState("");

  const allocateMemory = () => {
    const size = parseInt(requestSize);
    if (!size || size <= 0) {
      alert("Enter a valid size!");
      return;
    }

    const newMemoryBlocks = [...memoryBlocks];
    for (let i = 0; i < newMemoryBlocks.length; i++) {
      if (newMemoryBlocks[i].isFree && newMemoryBlocks[i].size >= size) {
        const leftover = newMemoryBlocks[i].size - size;
        newMemoryBlocks[i] = { size: size, isFree: false };
        if (leftover > 0) {
          newMemoryBlocks.splice(i + 1, 0, { size: leftover, isFree: true });
        }
        setMemoryBlocks(newMemoryBlocks);
        return;
      }
    }
    alert("Memory allocation failed: No suitable block found!");
  };

  const freeMemory = (index) => {
    const newMemoryBlocks = [...memoryBlocks];
    newMemoryBlocks[index].isFree = true;

    // Merge adjacent free blocks
    for (let i = 0; i < newMemoryBlocks.length - 1; i++) {
      if (newMemoryBlocks[i].isFree && newMemoryBlocks[i + 1].isFree) {
        newMemoryBlocks[i].size += newMemoryBlocks[i + 1].size;
        newMemoryBlocks.splice(i + 1, 1);
        i--; // Re-check the current block after merge
      }
    }

    setMemoryBlocks(newMemoryBlocks);
  };

  return (
    <div className="App">
      <h1>First Fit Memory Allocator</h1>
      <div className="controls">
        <input
          type="number"
          placeholder="Request size"
          value={requestSize}
          onChange={(e) => setRequestSize(e.target.value)}
        />
        <button onClick={allocateMemory}>Allocate</button>
      </div>
      <div className="memory-blocks">
        {memoryBlocks.map((block, index) => (
          <div
            key={index}
            className={`memory-block ${block.isFree ? "free" : "allocated"}`}
            onClick={() => !block.isFree && freeMemory(index)}
          >
            <p>
              {block.isFree ? "Free" : "Allocated"} - {block.size} units
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
