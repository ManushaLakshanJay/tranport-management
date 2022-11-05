import React from "react";
import "react-quill/dist/quill.snow.css";
import Card from "../../card/Card";

import "./ProductForm.scss";

const ProductForm = ({
    product,
    handleInputChange,
    saveProduct,
  }) => {
    return (
      <div className="add-product">
        <Card cardClass={"card"}>
          <form onSubmit={saveProduct}>
           
          <label>Dispatch ID:</label>
          <input
            type="text"
            placeholder="Enter Dispatch ID"
            name="dispatchID"
            
            onChange={handleInputChange}
          />

          <label>Driver Name:</label>
          <input
            type="text"
            placeholder="Enter Driver Name"
            name="driverName"
            
            onChange={handleInputChange}
          />

          <label>Vehicle ID:</label>
          <input
            type="text"
            placeholder="Enter Vehicle ID"
            name="vehicleId"
           
            onChange={handleInputChange}
          />

          <label>Route:</label>
          <input
            type="text"
            placeholder="Enter Route"
            name="route"
            
            onChange={handleInputChange}
          />
          <label>Date :</label>
          <input
            type="text"
            placeholder="Enter Date"
            name="date"
            
            onChange={handleInputChange}
          />
          <label>Cost:</label>
          <input
            type="text"
            placeholder="Enter Cost"
            name="cost"
           
            onChange={handleInputChange}
          />
          <label>Status :</label>
          <input
            type="text"
            placeholder="Enter Status"
            name="status"
           
            onChange={handleInputChange}
          />
    
          <div className="--my">
            <button type="submit" className="--btn --btn-primary">
              Save Service Dispatch Details
            </button>
            </div>
          </form>
        </Card>
      </div>
    );
  };
  

  export default ProductForm;