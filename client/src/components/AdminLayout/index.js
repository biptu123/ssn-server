import React from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";
import MainContent from "./MainContent";
import Footer from "./Footer";
import { Helmet } from "react-helmet";
import { ToastContainer } from "react-toastify";

const AdminLayout = (props) => {
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
      <main
        style={{
          display: "flex",
          overflowY: "hidden",
          backgroundColor: "#e9ecef",
          margin: "0",
          padding: "0",
          height: "87vh",
        }}
      >
        <ToastContainer />
        <Sidebar />
        <MainContent>{props.children}</MainContent>
      </main>
    </>
  );
};

AdminLayout.defaultProps = {
  title: "SSN",
  description: "",
  keywords: "",
  author: "Biptu Das",
};

export default AdminLayout;
