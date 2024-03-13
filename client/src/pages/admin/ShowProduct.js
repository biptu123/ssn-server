import React, { useEffect, useState } from "react";
import offer1 from "../../assets/images/offer1.jpg";
import AdminLayout from "../../components/AdminLayout";
import "../styles/productsStyle.css";
import styled from "styled-components";
import { toast } from "react-toastify";
import axios from "axios";
import { useAuth } from "../../context/auth";

const Products = styled.div`
  display: flex;
  flex-wrap: wrap;
  overflow-y: auto;
  padding: 20px;
  justify-content: space-around;
`;
const ShowProduct = () => {
  const [products, setProducts] = useState(null);
  const [auth] = useAuth();

  const getProducts = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/product`
      );

      if (response.data.success) {
        setProducts(response.data.products);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message);
    }
  };

  const handleDelete = async (_id) => {
    console.log("Deleting....", _id);
    try {
      const response = await axios.delete(
        `${process.env.REACT_APP_API}/api/v1/product/${_id}`,
        {
          headers: {
            Authorization: `${auth?.token}`,
          },
        }
      );
      if (response.data.success) {
        toast.success(response.data.message);
        getProducts();
      } else {
        toast.error(response.data.message);
      }
    } catch (e) {
      toast.error(e.response?.data?.message);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);
  return (
    <>
      <AdminLayout title="Admin | Show Products">
        <Products>
          {products &&
            products.map((product) => (
              <div className="product" key={product._id}>
                <img
                  className="product-image"
                  src={product.images[0].url}
                  alt=""
                />
                <p className="product-name">{product.name}</p>
                <span className="price-info" style={{ display: "flex" }}>
                  <h5>&#8377;{product.prices[0].price}</h5>
                  <span style={{ textDecoration: "line-through" }}>
                    &#8377;{product.prices[0].originalPrice}
                  </span>
                </span>
                <button
                  className="add-product"
                  onClick={() => handleDelete(product._id)}
                >
                  Delete Product
                </button>
              </div>
            ))}
        </Products>
      </AdminLayout>
    </>
  );
};

export default ShowProduct;
