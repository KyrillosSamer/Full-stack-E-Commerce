import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { FaStar } from 'react-icons/fa';
import { Circles } from 'react-loader-spinner';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast'; 



export default function ProductDetails() {
  const { id } = useParams();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const navigate = useNavigate();
const token = localStorage.getItem("userToken");
const [loadingProductId, setLoadingProductId] = useState(null);


  useEffect(() => {
    if (id) getSpecificProduct(id);
  }, [id]);

  useEffect(() => {
    if (product?.category?.name) getRelatedProducts(product.category.name);
  }, [product]);

  function getSpecificProduct(id) {
    axios
      .get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
      .then((res) => {
        setProduct(res.data.data);
        setLoading(false);
      })
      .catch(() => {
        setError(true);
        setLoading(false);
      });
  }

  

  async function getRelatedProducts(categoryName) {
    try {
      const res = await axios.get("https://ecommerce.routemisr.com/api/v1/products");
      const related = res.data.data.filter(
        (product) => product.category.name === categoryName
      );
      setRelatedProducts(related);
    } catch (error) {
      console.error("Error fetching related products:", error);
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Circles height="80" width="80" color="#4fa94d" ariaLabel="circles-loading" visible={true} />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-red-500 text-3xl text-center font-bold">
          Error fetching product
        </div>
      </div>
    );
  }

  //add to cart 
  async function addToCart(productId) {
  if (!token) {
    toast.error("Please login first.");
    navigate("/Login");
    return;
  }

  try {
    setLoadingProductId(productId);
    const res = await axios.post(
      "https://ecommerce.routemisr.com/api/v1/cart",
      { productId },
      {
        headers: {
          token: token,
        },
      }
    );
    toast.success("Product added to cart!");
    console.log("Cart Response:", res.data);
  } catch (err) {
    const errorMessage = err?.response?.data?.message || "Something went wrong.";
    toast.error(`Failed: ${errorMessage}`);
  } finally {
    setLoadingProductId(null);
  }
}


  return (
    <div className="grid items-center justify-center grid-cols-[minmax(0,1fr)_minmax(0,2fr)] w-full">
      {/* Product Image */}
      <div>
        {product.imageCover && (
          <img className="w-full" src={product.imageCover} alt={product.title} />
        )}
      </div>

      {/* Product Info */}
      <div className="m-auto w-[70%] sm:text-lg">
        <h1 className="text-3xl font-bold mb-8">{product.title}</h1>
        <h2 className="text-start font-bold mb-6 text-gray-500">
          Description: {product.description}
        </h2>
        <p className="font-bold">Category: {product.category?.name}</p>
        <p className="font-bold">Price: {product.price} EGP</p>
        <span className="flex items-center space-x-1 my-2">
          <FaStar className="text-yellow-500" />
          <span>{product.ratingsAverage}</span>
        </span>
<button
  onClick={() => addToCart(product.id)}
  disabled={loadingProductId === product.id}
  className={`bg-gradient-to-r w-full from-green-400 via-green-500 to-green-600 text-white p-1 rounded-lg mb-2 cursor-pointer 
    transition-all duration-500 ${loadingProductId === product.id ? 'opacity-50' : ''}`}
>
  {loadingProductId === product.id ? 'Adding...' : 'Add to Cart'}
</button>

      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div className="w-full col-span-2  px-6">
          <h2 className="text-left text-4xl font-bold mb-8 text-emerald-700">Related Products</h2>
          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {relatedProducts.map((product) => (
              <div
                key={product.id}
            className="group relative overflow-hidden flex flex-col items-center border border-gray-100 p-2 sm:p-3 shadow-md 
hover:shadow-xl rounded-xl bg-white transition-transform transform hover:-translate-y-1 text-sm sm:text-base w-[80%] mx-auto sm:w-full"


              >
                <Link
                  to={`/ProductDetails/${product.id}`}
                  className="w-full h-full flex flex-col items-center justify-between"
                >
                  <div className="relative w-full">
                    {product.priceAfterDiscount && (
                      <span className="absolute top-0 left-0 bg-red-500 text-white p-1 text-xs font-bold rounded-br-md">
                        SALE
                      </span>
                    )}
                    <img
  className="object-contain h-[120px] sm:h-[160px]  w-full transition-transform duration-300 group-hover:scale-105"
  src={product.imageCover}
  alt={product.title}
/>

                  </div>
                 <h2 className="text-center text-emerald-500 text-base sm:text-xl font-bold mt-2">
  {product.category.name}
</h2>

                  <div className="flex justify-between items-center w-full mt-2 p-2">
                    {product.priceAfterDiscount ? (
                      <div className="flex items-center space-x-2">
                        <span className="line-through text-red-600">
                          {product.price} EGP
                        </span>
                        <span>{product.priceAfterDiscount} EGP</span>
                      </div>
                    ) : (
                      <span>{product.price} EGP</span>
                    )}
                    <span className="flex items-center space-x-1">
                      <FaStar className="text-yellow-500" />
                      <span>{product.ratingsAverage}</span>
                    </span>
                  </div>
                </Link>
                <button
  onClick={() => addToCart(product.id)}
  disabled={loadingProductId === product.id}
  className={`mt-4 w-full border py-2 px-3 rounded-lg font-semibold transition-all duration-300 
    ${loadingProductId === product.id 
      ? 'bg-gray-300 text-gray-600 cursor-not-allowed' 
      : 'bg-white text-green-600 border-green-600 hover:bg-green-600 hover:text-white'}`}
>
  {loadingProductId === product.id ? 'Adding...' : 'Add to Cart'}
</button>

              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
