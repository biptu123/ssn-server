import React, { useEffect, useState } from "react";
import AdminLayout from "../../components/AdminLayout";
import styled from "styled-components";
import axios from "axios";
import { toast } from "react-toastify";
import { useAuth } from "../../context/auth";
import Loader from "../../components/Loader";

const ProductInfoWrapper = styled.div`
  background-color: #c0c0c0;
  margin: 20px;
  border-radius: 10px;
  display: flex;
  justify-content: space-around;
  padding-top: 30px;
  gap: 20px;
  align-items: center;
  flex-wrap: wrap;
`;
const ProductInfo = styled.div`
  width: ${(props) => (props.width ? props.width : "45%")};
  height: 50px;
  display: flex;
  justify-content: space-between;
  border-radius: 5px;
  background-color: white;
`;

const ProductLabel = styled.label`
  width: ${(props) => (props.width ? props.width : "30%")};
  height: 100%;
  display: flex;
  align-items: center;
  font-family: "Courier New", Courier, monospace;
  text-align: center;
  padding-left: 10px;
  font-weight: bold;
`;

const ProductInput = styled.input`
  width: 70%;
  border-radius: 5px;
  border: 0.5px solid black;
`;
const ProductSelect = styled.select`
  width: 70%;
  border-radius: 5px;
  border: 0.5px solid black;
`;

const ProductDescription = styled.textarea`
  width: 70%;
  border-radius: 5px;
  border: 0.5px solid black;
`;

const ProductDescriptionWrapper = styled.div`
  margin: 30px;
  width: 100%;
  height: 80px;
  display: flex;
  justify-content: space-between;
  border-radius: 5px;
  background-color: white;
`;

const ProductImageWrapper = styled.div`
  background-color: #c0c0c0;
  min-height: 70vh;
  margin: 20px;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  flex-wrap: wrap;
`;

const ImageLabel = styled.label`
  margin: 20px;
  width: 15%;
  aspect-ratio: 1;
  border-radius: 50%;
  border: 5px solid #131315;
  /* box-shadow: inset -10px 10px 30px #131315; */
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  font-weight: 500;
  cursor: pointer;

  &:hover {
  }
`;

const ProductImageInput = styled.input`
  display: none;
`;

const ProductImage = styled.img`
  width: 200px;
`;

const ProductImagePreview = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  margin-top: 20px;
  margin-bottom: 20px;
  gap: 20px;
`;

const ActionButtonWrapper = styled.div`
  width: ${(props) => (props.width ? props.width : null)};
  background-color: #c0c0c0;
  margin: 20px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: space-around;
  padding: 20px;
  flex-wrap: wrap;
`;

const ActionButton = styled.button`
  background-color: ${(prop) => prop.color};
  padding: 10px 20px;
  border-radius: 10px;
  font-weight: 700;
  border: none;
  cursor: pointer;
  box-shadow: -15px -10px 5px #6e6e6e;
  transition: 0.3s ease-in-out;
  &:hover {
    box-shadow: -10px -5px 5px #6e6e6e;
  }
`;

const PricesWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  padding-left: 30px;
  gap: 20px;
`;

const PriceWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: start;
  gap: 20px;
`;

const AddProduct = () => {
  const [categories, setCategories] = useState(null);
  const [imagePreviews, setImagePreviews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [product, setProduct] = useState({
    name: null,
    category: null,
    description: null,
    prices: [
      {
        quantity: null,
        originalPrice: null,
        price: null,
      },
    ],
    images: [],
  });

  const [auth] = useAuth();
  const handleImageChange = (e) => {
    const selectedImages = Array.from(e.target.files);
    setProduct((prevState) => ({
      ...prevState,
      images: selectedImages,
    }));

    Promise.all(
      selectedImages.map((image) => {
        return new Promise((resolve) => {
          const reader = new FileReader();
          reader.readAsDataURL(image);
          reader.onloadend = () => {
            resolve(reader.result);
          };
        });
      })
    ).then((previews) => {
      setImagePreviews(previews);
    });
  };

  const handleChange = (e) => {
    setProduct((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };
  const getCategories = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/category`
      );

      if (response.data.success) {
        setCategories(response.data.categories);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message);
    }
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const data = {
        ...product,
        images: imagePreviews,
      };

      const response = await axios.post(
        `${process.env.REACT_APP_API}/api/v1/product`,
        data,
        {
          headers: {
            Authorization: `${auth?.token}`,
          },
        }
      );

      setTimeout(() => {
        setLoading(false);
        setProduct({
          name: "",
          category: null,
          description: "",
          prices: [
            {
              quantity: "",
              price: "",
              originalPrice: "",
            },
          ],
          images: [],
        });
        setImagePreviews([]);
      }, 200);

      if (response.data.success) {
        toast.success(response.data.message);
        setTimeout(() => {
          setLoading(false);
          setProduct({
            name: "",
            category: null,
            description: "",
            prices: [
              {
                quantity: "",
                price: "",
                originalPrice: "",
              },
            ],
            images: [],
          });
          setImagePreviews([]);
        }, 200);
        getCategories();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      setTimeout(() => {
        setLoading(false);
        setProduct({
          name: "",
          category: null,
          description: "",
          prices: [
            {
              quantity: "",
              price: "",
              originalPrice: "",
            },
          ],
          images: [],
        });
        setImagePreviews([]);
      }, 200);
      toast.error(error.response?.data?.message);
    }
  };

  const handlePriceChange = (e, index) => {
    const { id, value } = e.target;
    setProduct((prevState) => ({
      ...prevState,
      prices: prevState.prices.map((price, i) =>
        i === index ? { ...price, [id]: value } : price
      ),
    }));
  };

  const addPrice = () => {
    setProduct((prevState) => ({
      ...prevState,
      prices: [
        ...prevState.prices,
        {
          quantity: "",
          originalPrice: "",
          price: "",
        },
      ],
    }));
  };
  const deletePrice = (index) => {
    setProduct((prevState) => ({
      ...prevState,
      prices: prevState.prices.filter((_, i) => i !== index),
    }));
  };

  useEffect(() => {
    getCategories();
  }, []);
  return (
    <>
      <Loader loading={loading} />
      <AdminLayout title="Admin | Add Product">
        <h2 className="text-end me-4 my-2">Add a new product</h2>
        <ProductInfoWrapper>
          <ProductInfo>
            <ProductLabel>Product Name</ProductLabel>
            <ProductInput
              id="name"
              value={product.name}
              onChange={handleChange}
            />
          </ProductInfo>

          <ProductInfo>
            <ProductLabel>Category</ProductLabel>
            <ProductSelect
              id="category"
              value={product.category}
              onChange={handleChange}
            >
              <option disabled selected={product.category === null}>
                Select Category
              </option>
              {categories &&
                categories.map((category) => (
                  <option value={category._id}>{category.name}</option>
                ))}
            </ProductSelect>
          </ProductInfo>
          <PricesWrapper>
            {product.prices &&
              product.prices.map((item, index) => (
                <PriceWrapper key={`priceinfo${index}`}>
                  <ProductInfo width={"25%"}>
                    <ProductLabel width={"50%"}>Quantity</ProductLabel>
                    <ProductInput
                      id="quantity"
                      value={item.quantity}
                      onChange={(e) => handlePriceChange(e, index)}
                    />
                  </ProductInfo>
                  <ProductInfo width={"25%"}>
                    <ProductLabel width={"50%"}>Original price</ProductLabel>
                    <ProductInput
                      id="originalPrice"
                      value={item.originalPrice}
                      onChange={(e) => handlePriceChange(e, index)}
                    />
                  </ProductInfo>
                  <ProductInfo width={"25%"}>
                    <ProductLabel width={"50%"}>Price</ProductLabel>
                    <ProductInput
                      id="price"
                      value={item.price}
                      onChange={(e) => handlePriceChange(e, index)}
                    />
                  </ProductInfo>

                  <ActionButton
                    color="#954136"
                    onClick={() => deletePrice(index)}
                  >
                    Delete
                  </ActionButton>
                </PriceWrapper>
              ))}
          </PricesWrapper>
          <ActionButton color="#369561" onClick={addPrice}>
            Add
          </ActionButton>

          <ProductDescriptionWrapper>
            <ProductLabel>Description</ProductLabel>
            <ProductDescription
              id="description"
              value={product.description}
              onChange={handleChange}
            />
          </ProductDescriptionWrapper>
        </ProductInfoWrapper>
        <ProductImageWrapper>
          <ImageLabel htmlFor="image">upload images here</ImageLabel>
          <ProductImageInput
            id="image"
            type="file"
            accept="image/*"
            multiple
            onChange={handleImageChange}
          />
          <ProductImagePreview>
            {imagePreviews.map((preview, index) => (
              <ProductImage
                key={`preview${index}`}
                src={preview}
                alt="Preview"
                width="100"
              />
            ))}
          </ProductImagePreview>
        </ProductImageWrapper>

        <ActionButtonWrapper>
          <ActionButton color="#954136">Cancel</ActionButton>
          <ActionButton color="#369561" onClick={handleSubmit}>
            Submit
          </ActionButton>
        </ActionButtonWrapper>
      </AdminLayout>
    </>
  );
};

export default AddProduct;
