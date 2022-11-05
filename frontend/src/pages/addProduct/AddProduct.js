import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Loader from "../../components/loader/Loader";
import ProductForm from "../../components/product/productForm/ProductForm";
import {
  createProduct,
  selectIsLoading,
} from "../../redux/features/product/productSlice";

const initialState = {
dispatchID: "",
driverName: "",
vehicleId: "",
route: "",
date: "",
cost: "",
status: "",
};

const AddProduct = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [product, setProduct] = useState(initialState);
  const isLoading = useSelector(selectIsLoading);

  const { dispatchID ,
            driverName ,
            vehicleId ,
            route ,
            date ,
            cost ,
            status ,} = product;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };



 

  const saveProduct = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("dispatchID", dispatchID);
    formData.append("driverName", driverName);
    formData.append("vehicleId", vehicleId);
    formData.append("route", route);
    formData.append("date", date);
    formData.append("cost", cost);
    formData.append("status", status);
    console.log(...formData);


    await dispatch(createProduct(formData));

    navigate("/dashboard");
  };

  return (
    <div>
      {isLoading && <Loader />}
      <h3 className="--mt">Add Service Dispatch Details</h3>
      <ProductForm
        product={product}
        
        handleInputChange={handleInputChange}
        
        saveProduct={saveProduct}
      />
    </div>
  );
};

export default AddProduct;