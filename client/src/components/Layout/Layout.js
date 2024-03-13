import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import { Helmet } from "react-helmet";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Layout = (props) => {
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <meta name="description" content={props.description} />
        <meta name="keywords" content={props.keywords} />
        <meta name="author" content={props.author} />
        <title>{props.title}</title>
      </Helmet>
      <Header />
      <main>
        <ToastContainer />
        {props.children}
      </main>
      <Footer />
    </>
  );
};

Layout.defaultProps = {
  title: "SSN",
  description: "",
  keywords: "",
  author: "Biptu Das",
};

export default Layout;
