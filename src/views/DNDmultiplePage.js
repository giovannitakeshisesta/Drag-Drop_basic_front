import React from "react";
import MultipleColumns from "../components/MultipleColumns";

const DNDmultiplePage = () => {
  return (
    <div>
      <h1 className="mb-3">Multiple Columns</h1>
      <MultipleColumns />

      <div className="mt-4">
        <p>Is the same concept of the Single column but with more features:</p>
        <p>- the created elements will be stored by default in the first column </p>
        <p>- in the first column the drop is disabled</p>
        <p>- droppable and draggable colors change when moving elements </p>
      </div>
    </div>
  );
};

export default DNDmultiplePage;
