import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import useRedirectLoggedOutUser from "../../../customHook/useRedirectLoggedOutUser";
import { selectIsLoggedIn } from "../../../redux/features/auth/authSlice";
import { getProduct } from "../../../redux/features/product/productSlice";
import Card from "../../card/Card";
import { SpinnerImg } from "../../loader/Loader";
import "./ProductDetail.scss";
import DOMPurify from "dompurify";

const ProductDetail = () => {
  useRedirectLoggedOutUser("/login");
  const dispatch = useDispatch();

  const { id } = useParams();

  const isLoggedIn = useSelector(selectIsLoggedIn);
  const { product, isLoading, isError, message } = useSelector(
    (state) => state.product
  );

  const stockStatus = (quantity) => {
    if (quantity > 0) {
      return <span className="--color-success">In Stock</span>;
    }
    return <span className="--color-danger">Out Of Stock</span>;
  };

  useEffect(() => {
    if (isLoggedIn === true) {
      dispatch(getProduct(id));
    }

    if (isError) {
      console.log(message);
    }
  }, [isLoggedIn, isError, message, dispatch]);

  return (
    <div className="product-detail">
      <h3 className="--mt">Dispatch Details</h3>
      <Card cardClass="card">
        {isLoading && <SpinnerImg />}
        {product && (
          <div className="detail">
           
            <p>
              <b>&rarr; Dispatch ID : </b> {product.dispatchID}
            </p>
            <p>
              <b>&rarr; Driver Name  : </b> {product.driverName }
            </p>
            <p>
              <b>&rarr; Vehicle Id  : </b> {product.vehicleId }
            </p>
            <p>
              <b>&rarr; Route  : </b> {product.route }
            </p>
            <p>
              <b>&rarr; Date  : </b> {product.date }
            </p>
            <p>
              <b>&rarr; Cost  : </b> {product.cost }
            </p>
            <p>
              <b>&rarr; Status   : </b> {product.status  }
            </p>
            <hr />
           
            <hr />
            
          </div>
        )}
      </Card>
    </div>
  );
};

export default ProductDetail;
