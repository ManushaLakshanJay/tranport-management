import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Loader from "../../components/loader/Loader";
import ProductForm from "../../components/product/productForm/ProductForm";
import {
  getProduct,
  getProducts,
  selectIsLoading,
  selectProduct,
  updateProduct,
} from "../../redux/features/product/productSlice";

const EditProduct = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoading = useSelector(selectIsLoading);

  const productEdit = useSelector(selectProduct);

  const [product, setProduct] = useState(productEdit);
  

  useEffect(() => {
    dispatch(getProduct(id));
  }, [dispatch, id]);

  useEffect(() => {
    setProduct(productEdit);
    
  }, [productEdit]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };


  const saveProduct = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("dispatchID",  product?.dispatchID);
    formData.append("driverName",  product?.driverName);
    formData.append("vehicleId",  product?.vehicleId);
    formData.append("route",  product?.route);
    formData.append("date",  product?.date);
    formData.append("cost",  product?.cost);
    formData.append("status,",  product?.status,);


    await dispatch(updateProduct({ id, formData }));
    await dispatch(getProducts());
    navigate("/dashboard");
  };

  return (
    <div>
      {isLoading && <Loader />}
      <h3 className="--mt">Edit Product</h3>
      <ProductForm
        product={product}
      
        handleInputChange={handleInputChange}
        
        saveProduct={saveProduct}
      />
    </div>
  );
};

export default EditProduct;