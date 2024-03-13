import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const SidebarWrapper = styled.div`
  width: 20%;
  height: 100%;
`;

const SidebarButtonsWrapper = styled.div``;

const ButtonWrapper = styled.div`
  margin: 30px 0;
`;

const Dropdown = styled.div`
  margin-left: 20px;
  display: flex;
  flex-direction: column;
  max-height: ${(props) => (props.open ? "500px" : "0")};
  opacity: ${(props) => (props.open ? "1" : "0")};
  overflow: hidden;
  transition: max-height ${(props) => (props.open ? "1s" : "0.5s")} ease-in-out,
    opacity ${(props) => (props.open ? "1s" : "0.5s")} ease-in-out;
`;

const DropdownItem = styled.div`
  border-left: 2px solid #b6b6b6;
  padding: 5px 10px;
  font-weight: bold;
  cursor: pointer;
  position: relative;

  &:after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    right: ${(props) => (props.active ? "0" : "95%")};
    height: 2px;
    background-color: #b6b6b6;
    transition: right 0.3s ease-in-out;
  }

  &:hover:after {
    right: 0;
  }
`;

const SidebarButton = styled.div`
  border-bottom: 2px solid #b6b6b6;
  padding: 10px 10px;
  font-weight: bold;
  cursor: pointer;
  background-color: ${(props) => (props.active ? "#b6b6b6" : "none")};

  &:hover {
    background-color: #b6b6b6;
  }
`;

const Sidebar = () => {
  const [activeButton, setActiveButton] = useState();
  const [activeDropdown, setActiveDropdown] = useState();

  const [dropdownStates, setDropdownStates] = useState({});

  const toggleDropdown = (dropdownKey) => {
    setDropdownStates((prevStates) => ({
      ...prevStates,
      [dropdownKey]: !prevStates[dropdownKey],
    }));
  };

  const handleButtonClick = (buttonKey) => {
    setActiveButton(buttonKey);
    navigate(`/admin/${buttonKey}`);
  };

  const navigate = useNavigate();

  return (
    <>
      <SidebarWrapper>
        <ButtonWrapper>
          <SidebarButtonsWrapper>
            <SidebarButton
              onClick={() => {
                setActiveDropdown("dashboard");
                navigate("/admin");
              }}
              active={activeDropdown === "dashboard"}
            >
              Dashboard
            </SidebarButton>
          </SidebarButtonsWrapper>
          <SidebarButtonsWrapper>
            <SidebarButton
              onClick={() => {
                toggleDropdown("products");
                setActiveDropdown("products");
              }}
              active={activeDropdown === "products"}
            >
              Products
            </SidebarButton>
            <Dropdown open={dropdownStates.products}>
              <DropdownItem
                active={activeButton === "add-product"}
                onClick={() => handleButtonClick("add-product")}
              >
                Add new Product
              </DropdownItem>
              <DropdownItem
                active={activeButton === "show-products"}
                onClick={() => handleButtonClick("show-products")}
              >
                Show all Products
              </DropdownItem>
              <DropdownItem
                active={activeButton === "preview"}
                onClick={() => handleButtonClick("preview")}
              >
                Preview
              </DropdownItem>
            </Dropdown>
          </SidebarButtonsWrapper>
          <SidebarButtonsWrapper>
            <SidebarButton
              onClick={() => {
                setActiveDropdown("categories");
                navigate("/admin/categories");
              }}
              active={activeDropdown === "categories"}
            >
              Categories
            </SidebarButton>
          </SidebarButtonsWrapper>
          <SidebarButtonsWrapper>
            <SidebarButton
              onClick={() => {
                setActiveDropdown("best-deals");
                navigate("/admin/bestdeals");
              }}
              active={activeDropdown === "best-deals"}
            >
              Best deals
            </SidebarButton>
          </SidebarButtonsWrapper>
        </ButtonWrapper>
      </SidebarWrapper>
    </>
  );
};

export default Sidebar;
