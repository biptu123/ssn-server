import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Layout from "../components/Layout/Layout";
import { useCart } from "../context/cart";

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  const { addToCart } = useCart();

  const handleQuantityChange = (e) => {
    const priceInfo = product.prices.find(
      (item) => item.quantity === e.target.value
    );

    setProduct({
      ...product,
      quantity: priceInfo.quantity,
      price: priceInfo.price,
      originalPrice: priceInfo.originalPrice,
    });
  };

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API}/api/v1/product/${id}`
        );
        console.log(response.data);
        setProduct({
          ...response.data.product,
          quantity: response.data?.product?.prices[0].quantity,
          price: response.data?.product?.prices[0].price,
          originalPrice: response.data?.product?.prices[0].originalPrice,
        });
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    fetchProduct();
  }, [id]);

  return (
    <Layout title="Product Details | SSN">
      product && (
      <div>
        <section className="py-5">
          <div className="container px-4 px-lg-5 my-5">
            <div className="row gx-4 gx-lg-5 align-items-center">
              <div className="col-md-6">
                <img
                  className="card-img-top mb-5 mb-md-0"
                  src={
                    product?.images
                      ? product.images[0].url
                      : "https://dummyimage.com/600x700/dee2e6/6c757d.jpg"
                  }
                  alt="product image"
                />
              </div>
              <div className="col-md-6">
                <div className="small mb-1">{product?.category?.name}</div>
                <h1 className="display-5 fw-bolder">{product?.name}</h1>
                <div className="fs-5 mb-5">
                  <span className="text-decoration-line-through">
                    &#8377;{product?.originalPrice}
                  </span>
                  <span className="ms-3">&#8377;{product?.price}</span>
                </div>
                <p className="lead">{product?.description}</p>
                <div className="d-flex">
                  <select
                    className="form-control text-center me-3"
                    id="inputQuantity"
                    type="num"
                    value={product?.quantity}
                    onChange={handleQuantityChange}
                    style={{ maxWidth: "5rem" }}
                  >
                    {product?.prices.map((item) => (
                      <option value={item.quantity}>{item.quantity}</option>
                    ))}
                  </select>
                  <button
                    className="btn btn-outline-dark flex-shrink-0"
                    type="button"
                    onClick={() => addToCart(product)}
                  >
                    <i className="bi-cart-fill me-1" />
                    Add to cart
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* Related items section*/}
        {/* <section className="py-5 bg-light">
          <div className="container px-4 px-lg-5 mt-5">
            <h2 className="fw-bolder mb-4">Related products</h2>
            <div className="row gx-4 gx-lg-5 row-cols-2 row-cols-md-3 row-cols-xl-4 justify-content-start">
              <div className="col mb-5" style={{ width: "20rem" }}>
                <div className="card h-100">
                  <img
                    className="card-img-top"
                    src="https://dummyimage.com/450x300/dee2e6/6c757d.jpg"
                    alt="..."
                  />
                  <div className="card-body p-4">
                    <div className="text-center">
                      <h5 className="fw-bolder">Popular Item</h5>
                      $40.00
                    </div>
                  </div>
                  <div className="card-footer p-4 pt-0 border-top-0 bg-transparent">
                    <div className="text-center">
                      <a className="btn btn-outline-dark mt-auto" href="#">
                        Add to cart
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section> */}
      </div>
      )
    </Layout>
  );
};

export default ProductDetails;
