import React, { useEffect, useContext } from "react";
import axios from "axios";
import '../CSS/Products.css';
import { ShopContext } from "../Components/ShopContext";

import { FaHeart, FaRegHeart, FaShoppingCart } from "react-icons/fa";
import { IoEyeOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom"; 
import { FaStar, FaRegStar, FaStarHalfAlt } from "react-icons/fa";

import img1 from "../assets/product (1).svg";
import img2 from "../assets/product (2).svg";
import img3 from "../assets/product (3).svg";
import img4 from "../assets/product (4).svg";
import img5 from "../assets/product (5).svg";
import img6 from "../assets/product (6).svg";
import img7 from "../assets/prod (1).svg";
import img8 from "../assets/prod (2).svg";
import img9 from "../assets/prod (3).svg";
import img10 from "../assets/prod (4).svg";

import img11 from "../assets/Best (1).svg";
import img12 from "../assets/Best (2).svg";
import img13 from "../assets/Best (3).svg";
import img14 from "../assets/Best (4).svg";


const fallbackProducts = [
  { id: 9, name: "Breed Dry Dog Food", price: 100, rating: 3, reviews: 35, image: img1 },
  { id: 10, name: "CANON EOS DSLR Camera", price: 360, rating: 4, reviews: 95, image: img2 },
  { id: 11, name: "ASUS FHD Gaming Laptop", price: 700, rating: 5, reviews: 325, image: img3 },
  { id: 12, name: "Curology Product Set", price: 500, rating: 4, reviews: 145, image: img4 },
  { id: 13, name: "Kids Electric Car", price: 960, rating: 5, reviews: 65, image: img5 },
  { id: 14, name: "Jr. Zoom Soccer Cleats", price: 1160, rating: 4, reviews: 35, image: img6 },
  { id: 1, title: "HAVIT HV-G92 Gamepad", price: 120, oldPrice: 160, discount: 40, rating: 4.5, image: img7 },
  { id: 2, title: "AK-900 Wired Keyboard", price: 960, oldPrice: 1160, discount: 35, rating: 3.5, image: img8 },
  { id: 3, title: "IPS LCD Gaming Monitor", price: 370, oldPrice: 400, discount: 30, rating: 5, image: img9 },
  { id: 4, title: "Comfort Chair", price: 375, oldPrice: 400, discount: 25, rating: 4, image: img10 },
  { id: 5, name: "The north coat", price: 260, oldPrice: 360, image: img14, reviews: 65 },
  { id: 6, name: "Gucci duffle bag", price: 960, oldPrice: 1160, image: img13, reviews: 65 },
  { id: 7, name: "RGB liquid CPU Cooler", price: 160, oldPrice: 170, image: img12, reviews: 65 },
  { id: 8, name: "Small BookSelf", price: 360, oldPrice: 360, image: img11, reviews: 65 },
  
];

const Products = () => {
  const [products, setProducts] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  const { wishlist, addToWishlist, cart, addToCart } = useContext(ShopContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/products");
        setProducts(response.data.length ? response.data : fallbackProducts);
      } catch (error) {
        console.error("Error fetching products, using fallback:", error);
        setProducts(fallbackProducts);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  if (loading) return <p>Loading products...</p>;

  const renderStars = (rating) => {
    const stars = [];
    const full = Math.floor(rating);
    const half = rating % 1 !== 0;

    for (let i = 0; i < full; i++)
      stars.push(<FaStar key={i} className="text-warning" />);
    if (half)
      stars.push(<FaStarHalfAlt key="half" className="text-warning" />);

    const empty = 5 - stars.length;
    for (let i = 0; i < empty; i++)
      stars.push(<FaRegStar key={`e-${i}`} className="text-warning" />);

    return stars;
  };

  return (<>
    <div className="text-center my-5">
  <h1 className="fw-bold text-danger">Our Products</h1>
   </div>
    <div className="products-container m-5">

      {products.map((product) => {
        // هنا استخدمنا some بدل includes
        const isLiked = wishlist.some((item) => item.id === product.id);

        return (
          <div key={product.id} className="product-card">
            <div className="image-container bg-light">
              <img src={product.image} alt={product.name} />
              <div className="position-absolute top-0 end-0 p-2 d-flex flex-column gap-2 icons-wrapper">
                {/* Heart */}
                <button
                  className="bg-white border-0 rounded-circle p-2 shadow-sm icon-btn"
                  onClick={() => addToWishlist(product)}
                >
                  {isLiked ? (
                    <FaHeart size={20} className="text-danger" />
                  ) : (
                    <FaRegHeart size={20} />
                  )}
                </button>
                {/* Eye */}
                <button
                  className="bg-white border-0 rounded-circle p-2 shadow-sm icon-btn"
                  onClick={() => navigate(`/product-details/${product.id}`)}
                >
                  <IoEyeOutline size={20} />
                </button>
              </div>
            </div>
            <h3>{product.name}</h3>
            <p>${product.price}</p>
            <div className="stars">{renderStars(product.rating)}</div>
            <div className="cart-button">
              <button
                className="btn btn-dark w-100 mt-3 add-cart-btn"
                onClick={() => addToCart(product)}
              >
                <FaShoppingCart className="me-2" /> Add to Cart
              </button>
            </div>
          </div>
        );
      })}
    </div>
    </>
  );
};

export default Products;
