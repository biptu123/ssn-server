import React, { useEffect, useState } from "react";
import Layout from "../components/Layout/Layout";
import { useAuth } from "../context/auth";
import offer1 from "../assets/images/offer1.jpg";
import { Carousel as BootstrapCarousel } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles/homeStyle.css";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import ReactPlayer from "react-player";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const OfferCarousel = () => {
  return (
    <div className="offers-wrapper">
      <div className="offers-title">
        <h1>Your Savings Adventure Starts Here</h1>
        <h2>Explore Exclusive Offers</h2>
      </div>
      <BootstrapCarousel className="offers">
        <BootstrapCarousel.Item className="image-wrapper">
          <img className="offers-image" src={offer1} alt="First slide" />
        </BootstrapCarousel.Item>

        <BootstrapCarousel.Item className="image-wrapper">
          <img className="offers-image" src={offer1} alt="Second slide" />
        </BootstrapCarousel.Item>

        {/* Add more BootstrapCarousel.Items for additional slides */}
      </BootstrapCarousel>
    </div>
  );
};

const Categories = () => {
  const [categories, setCategories] = useState();
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
  useEffect(() => {
    getCategories();
  }, []);
  return (
    <div className="categories-wrapper">
      <div className="categories-title">Categories</div>
      <div className="categories">
        {categories &&
          categories.map((category) => (
            <div className="card" style={{ width: "18rem" }}>
              <div className="overlay"></div>
              <img
                className="card-img-top"
                src={category.image.url}
                alt="Card image cap 5"
              />
              <h5 className="card-title">{category.name}</h5>
            </div>
          ))}
      </div>
    </div>
  );
};

const BestOffers = () => {
  return (
    <div className="bestdeals-wrapper">
      <svg
        className="wave-1"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1440 320"
      >
        <path
          fill="rgba(0, 0, 0, 0.5)"
          fillOpacity="1"
          d="M0,128L80,144C160,160,320,192,480,186.7C640,181,800,139,960,149.3C1120,160,1280,224,1360,256L1440,288L1440,0L1360,0C1280,0,1120,0,960,0C800,0,640,0,480,0C320,0,160,0,80,0L0,0Z"
        ></path>
      </svg>
      <svg
        className="wave-2"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1440 320"
      >
        <path
          fill="rgba(0, 0, 0, 0.6)"
          fillOpacity="1"
          d="M0,160L26.7,144C53.3,128,107,96,160,117.3C213.3,139,267,213,320,240C373.3,267,427,245,480,213.3C533.3,181,587,139,640,128C693.3,117,747,139,800,160C853.3,181,907,203,960,192C1013.3,181,1067,139,1120,138.7C1173.3,139,1227,181,1280,218.7C1333.3,256,1387,288,1413,304L1440,320L1440,0L1413.3,0C1386.7,0,1333,0,1280,0C1226.7,0,1173,0,1120,0C1066.7,0,1013,0,960,0C906.7,0,853,0,800,0C746.7,0,693,0,640,0C586.7,0,533,0,480,0C426.7,0,373,0,320,0C266.7,0,213,0,160,0C106.7,0,53,0,27,0L0,0Z"
        ></path>
      </svg>
      <div className="bestdeals-title">
        <span
          className="bestdeals-title-content"
          style={{ margin: "20px 20px 20px 20px" }}
        >
          BEST DEALS
        </span>
      </div>

      <div className="bestdeals">
        <div className="bestdeal-product">
          <div className="product-discount">
            <span>20% OFF</span>
          </div>

          <img src={offer1} alt="" />
          <p className="product-name">Product Heading</p>
          <span className="price-info" style={{ display: "flex" }}>
            <h5>&#8377;5000</h5>
            <span style={{ textDecoration: "line-through" }}>&#8377;4999</span>
            <p>Save &#8377;2148</p>
          </span>
          <button className="add-product">Add to cart</button>
        </div>
        <div className="bestdeal-product">
          <div className="product-discount">
            <span>20% OFF</span>
          </div>

          <img src={offer1} alt="" />
          <p className="product-name">Product Heading</p>
          <span className="price-info" style={{ display: "flex" }}>
            <h5>&#8377;5000</h5>
            <span style={{ textDecoration: "line-through" }}>&#8377;4999</span>
            <p>Save &#8377;2148</p>
          </span>
          <button className="add-product">Add to cart</button>
        </div>
        <div className="bestdeal-product">
          <div className="product-discount">
            <span>20% OFF</span>
          </div>

          <img src={offer1} alt="" />
          <p className="product-name">Product Heading</p>
          <span className="price-info" style={{ display: "flex" }}>
            <h5>&#8377;5000</h5>
            <span style={{ textDecoration: "line-through" }}>&#8377;4999</span>
            <p>Save &#8377;2148</p>
          </span>
          <button className="add-product">Add to cart</button>
        </div>
        <div className="bestdeal-product">
          <div className="product-discount">
            <span>20% OFF</span>
          </div>

          <img src={offer1} alt="" />
          <p className="product-name">Product Heading</p>
          <span className="price-info" style={{ display: "flex" }}>
            <h5>&#8377;5000</h5>
            <span style={{ textDecoration: "line-through" }}>&#8377;4999</span>
            <p>Save &#8377;2148</p>
          </span>
          <button className="add-product">Add to cart</button>
        </div>
        <div className="bestdeal-product">
          <div className="product-discount">
            <span>20% OFF</span>
          </div>

          <img src={offer1} alt="" />
          <p className="product-name">Product Heading</p>
          <span className="price-info" style={{ display: "flex" }}>
            <h5>&#8377;5000</h5>
            <span style={{ textDecoration: "line-through" }}>&#8377;4999</span>
            <p>Save &#8377;2148</p>
          </span>
          <button className="add-product">Add to cart</button>
        </div>
        <div className="bestdeal-product">
          <div className="product-discount">
            <span>20% OFF</span>
          </div>

          <img src={offer1} alt="" />
          <p className="product-name">Product Heading</p>
          <span className="price-info" style={{ display: "flex" }}>
            <h5>&#8377;5000</h5>
            <span style={{ textDecoration: "line-through" }}>&#8377;4999</span>
            <p>Save &#8377;2148</p>
          </span>
          <button className="add-product">Add to cart</button>
        </div>
      </div>
      <Link to="/products">
        <button className="see-all">
          <p>See All</p>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="4"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M14 5l7 7m0 0l-7 7m7-7H3"
            ></path>
          </svg>
        </button>
      </Link>
    </div>
  );
};

const FeaturedVideos = () => {
  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
      slidesToSlide: 3, // optional, default to 1.
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
      slidesToSlide: 2, // optional, default to 1.
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
      slidesToSlide: 1, // optional, default to 1.
    },
  };
  return (
    <div className="featured-wrapper">
      <div className="featured-title">
        <span
          className="featured-title-content"
          style={{ margin: "20px 20px 20px 20px" }}
        >
          Featured Videos
        </span>
      </div>
      <Carousel className="featured-videos" responsive={responsive}>
        <div className="featured-video">
          <ReactPlayer
            className="react-player"
            url="https://www.youtube.com/watch?v=Oi1W1h6gcuk"
            width="100%"
            height="100%"
            // light={<img className="thumbnail" src={offer1} alt="Thumbnail" />}
            playing={false}
            muted
          />
        </div>
        <div className="featured-video">
          <ReactPlayer
            className="react-player"
            url="https://www.youtube.com/watch?v=_mEwkN-wLr0"
            width="100%"
            height="100%"
            // light={<img className="thumbnail" src={offer1} alt="Thumbnail" />}
            playing={false}
            muted
          />
        </div>
        <div className="featured-video">
          <ReactPlayer
            className="react-player"
            url="https://www.youtube.com/watch?v=coQNG0GF1hI"
            width="100%"
            height="100%"
            // light={<img className="thumbnail" src={offer1} alt="Thumbnail" />}
            playing={false}
            muted
          />
        </div>
        <div className="featured-video">
          <ReactPlayer
            className="react-player"
            url="https://www.youtube.com/watch?v=I5wetB0cjhQ"
            width="100%"
            height="100%"
            // light={<img className="thumbnail" src={offer1} alt="Thumbnail" />}
            playing={false}
            muted
          />
        </div>
      </Carousel>
    </div>
  );
};

const HomeContent = () => {
  return (
    <div className="home-content">
      <OfferCarousel />
      <Categories />
      <BestOffers />
      <FeaturedVideos />
    </div>
  );
};

const Home = () => {
  const [auth] = useAuth();
  return (
    <>
      <Layout title="Home | SSN">
        <section className="hero-section">
          {/* <pre style={{ color: "#FFF" }}>{JSON.stringify(auth, null, 4)}</pre> */}
          <HomeContent />
        </section>
      </Layout>
    </>
  );
};

export default Home;
