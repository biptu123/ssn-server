import React, { useEffect, useState } from "react";
import Layout from "../components/Layout/Layout";
import offer1 from "../assets/images/offer1.jpg";

import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Link, useNavigate } from "react-router-dom";
import { CiShop } from "react-icons/ci";
import { FaJar } from "react-icons/fa6";
import { GiMasonJar, GiMedicinePills, GiMedicines } from "react-icons/gi";
import {
  IoIosArrowDropleftCircle,
  IoIosArrowDroprightCircle,
} from "react-icons/io";
import { CgGym } from "react-icons/cg";
import "./styles/productsStyle.css";
import axios from "axios";
import { toast } from "react-toastify";
import { useCart } from "../context/cart";

const Products = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [products, setProducts] = useState(null);

  const { addToCart } = useCart();

  const navigate = useNavigate();

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };
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
  useEffect(() => {
    getProducts();
  }, []);

  return (
    <>
      <Layout title="Products | SSN">
        <section className="products-section gradient-loop">
          <Sidebar
            style={{
              height: "100vh",
              position: "fixed",
              zIndex: 2,
              backgroundColor: "white",
            }}
            collapsed={!isSidebarOpen}
          >
            <Menu>
              <div
                style={{
                  textAlign: "end",
                  display: "flex",
                  justifyContent: "flex-end",
                }}
              >
                <MenuItem onClick={toggleSidebar}>
                  {isSidebarOpen ? (
                    <IoIosArrowDropleftCircle />
                  ) : (
                    <IoIosArrowDroprightCircle />
                  )}
                </MenuItem>
              </div>

              <MenuItem icon={<CiShop />}>All</MenuItem>
              <MenuItem icon={<FaJar />}>Protein</MenuItem>
              <MenuItem icon={<GiMedicines />}>Vitamins</MenuItem>
              <MenuItem icon={<GiMedicinePills />}>Gainers</MenuItem>
              <MenuItem icon={<GiMasonJar />}>Creatine</MenuItem>
              <MenuItem icon={<CgGym />}>Pre/post workout</MenuItem>
            </Menu>
          </Sidebar>
          <section className="products-container">
            <div className="products-title">
              <span
                className="products-title-content"
                style={{ margin: "20px 20px 20px 20px" }}
              >
                PRODUCTS
              </span>
            </div>
            <div className="products">
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
                      onClick={() =>
                        addToCart({
                          ...product,
                          price: product.prices[0].price,
                          originalPrice: product.prices[0].originalPrice,
                          quantity: product.prices[0].quantity,
                        })
                      }
                    >
                      Add to cart
                    </button>
                    <button
                      className="show-more"
                      onClick={() => navigate(`/product/${product._id}`)}
                    >
                      show more
                    </button>
                  </div>
                ))}
            </div>
          </section>
        </section>
      </Layout>
    </>
  );
};

export default Products;
