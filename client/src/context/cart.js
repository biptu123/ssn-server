import { useState, useEffect, useContext, createContext } from "react";
import { toast } from "react-toastify";

const CartContext = createContext();

const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem(`cart`));
    if (data) {
      setCart(data);
    }
  }, []);

  const addMore = (product) => {
    const existingProductIndex = cart.findIndex(
      (cartProduct) =>
        product._id === cartProduct._id &&
        product.quantity === cartProduct.quantity
    );
    let updatedCart = [];
    if (existingProductIndex !== -1) {
      updatedCart = [...cart];
      updatedCart[existingProductIndex].noOfItems += 1;
    } else {
      updatedCart = [...cart, { ...product, noOfItems: 1 }];
    }
    setCart(updatedCart);
    localStorage.setItem(`cart`, JSON.stringify(updatedCart));
  };

  const removeMore = (product) => {
    const existingProductIndex = cart.findIndex(
      (cartProduct) =>
        product._id === cartProduct._id &&
        product.quantity === cartProduct.quantity
    );
    let updatedCart = [];
    if (existingProductIndex !== -1) {
      updatedCart = [...cart];
      if (updatedCart[existingProductIndex].noOfItems > 1) {
        updatedCart[existingProductIndex].noOfItems -= 1;
      } else if (updatedCart[existingProductIndex].noOfItems === 1) {
        updatedCart = cart.filter(
          (item) =>
            !(item._id === product._id && item.quantity === product.quantity)
        );
      }
    } else {
      updatedCart = [...cart, { ...product, noOfItems: 1 }];
    }
    setCart(updatedCart);
    localStorage.setItem(`cart`, JSON.stringify(updatedCart));
  };

  const addToCart = (product) => {
    const existingProductIndex = cart.findIndex(
      (cartProduct) =>
        product._id === cartProduct._id &&
        product.quantity === cartProduct.quantity
    );
    let updatedCart = [];
    if (existingProductIndex !== -1) {
      updatedCart = [...cart];
      updatedCart[existingProductIndex].noOfItems += 1;
    } else {
      updatedCart = [...cart, { ...product, noOfItems: 1 }];
    }
    setCart(updatedCart);
    localStorage.setItem(`cart`, JSON.stringify(updatedCart));
    toast.success("Item added to your cart ");
  };

  const removeFromCart = (product) => {
    const updatedCart = cart.filter((item) => item._id !== product._id);
    setCart(updatedCart);
    localStorage.setItem(`cart`, JSON.stringify(updatedCart));
    toast.error("Item removed from your cart");
  };

  const emptyCart = () => {
    const updatedCart = [];
    setCart(updatedCart);
    localStorage.setItem(`cart`, JSON.stringify(updatedCart));
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        addMore,
        removeMore,
        emptyCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

// custom hook
const useCart = () => useContext(CartContext);

export { CartProvider, useCart };
