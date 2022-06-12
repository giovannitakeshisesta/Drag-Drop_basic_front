import React from "react";
import Singlecolumn from "../components/SingleColumn";

export default function DNDpage() {
  return (
    <div>
        <h1>Single Column</h1>
        
        <div className="d-flex">
        
          <Singlecolumn />

          <div className="description">
            <h3>How is done:</h3>
            <p>When the page is mounted: </p>
            <p>- Get request to get the array of only Ids.</p>
            <p>- Populate the array with the names.</p>
            <p>- Render each element using the DragDropContext.</p>
            <br />
            <p>Every time an item is moved:</p>
            <p>- store in a variable the previous state of the array (useRef)</p>
            <p>- render the new sequence</p>
            <p>- update the array in the API</p>
            <p> - if the update doesnt resolve well, restore the previous state of the array </p>
          </div>
        </div>
    </div>
  );
}
