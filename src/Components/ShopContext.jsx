import { createContext, useState } from "react";

export const ShopContext = createContext();

export const ShopProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);

  const addToCart = (product) => {
    // لو المنتج مش موجود في الكارت، ضيفه
    if (!cart.some((item) => item.id === product.id)) {
      setCart((prev) => [...prev, product]);
    }
  };

  const addToWishlist = (product) => {
    setWishlist((prev) => {
      const exists = prev.some((item) => item.id === product.id);
      if (exists) {
        // لو موجود، أشيله
        return prev.filter((item) => item.id !== product.id);
      } else {
        // لو مش موجود، أضيفه
        return [...prev, product];
      }
    });
  };

  return (
    <ShopContext.Provider
      value={{
        cart,
        wishlist,
        addToCart,
        addToWishlist,
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};
