import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { FaStar } from 'react-icons/fa';
import { Circles } from 'react-loader-spinner';

export default function ProductDetails() {
  let { id } = useParams();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [relatedProducts, setRelatedProducts] = useState([]);

  function getSpecificProduct(id) {
    axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
      .then((res) => {
        setProduct(res.data.data);
        setLoading(false);
      })
      .catch((err) => {
        setError(true);
        setLoading(false);
      });
  }

  async function getRelatedProducts(categoryName) {
    try {
      let res = await axios.get("https://ecommerce.routemisr.com/api/v1/products");
      const related = res.data.data.filter((product) => product.category.name === categoryName);
      setRelatedProducts(related);
    } catch (error) {
      console.error("Error fetching related products:", error);
    }
  }

  useEffect(() => {
    if (id) getSpecificProduct(id);
  }, [id]);

  useEffect(() => {
    if (product?.category?.name) getRelatedProducts(product.category.name);
  }, [product]);

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
        <div className="text-red-500 text-3xl text-center font-bold">Error fetching product</div>
      </div>
    );
  }

  return (
    <div className="grid items-center justify-center grid-cols-[minmax(0,1fr)_minmax(0,2fr)] w-full">
      <div>
        {product.imageCover && <img className="w-full" src={product.imageCover} alt={product.title} />}
      </div>

      <div>
        <h1 className="text-3xl font-bold mb-8">{product.title}</h1>
        <h1 className="text-start font-bold mb-6 text-gray-500">Description: {product.description}</h1>
        <p className="font-bold flex">Category: {product.category?.name}</p>
        <p className="font-bold flex">Price: {product.price} EGP</p>
        <span className="space-x-1 flex">
          <FaStar className="text-yellow-500" />
          <span>{product.ratingsAverage}</span>
        </span>
        <button className="bg-gradient-to-r w-full from-green-400 via-green-500 to-green-600 text-white p-1 rounded-lg mb-2 cursor-pointer hover:text-gray-900 transition-all duration-500">
          Add to Cart
        </button>
      </div>

      {relatedProducts.length > 0 && (
        <div className="mt-8 w-full">
          <h2 className="text-2xl font-bold mb-6 ">Related Products</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2 p-4 w-screen">
          {relatedProducts.map((product) => (
              <div key={product.id} className="group overflow-hidden flex flex-col items-center border border-gray-800 p-0 shadow-2xl hover:scale-105 transition-transform duration-200 w-[80%]">
                <Link to={`/ProductDetails/${product.id}`} className="w-full h-full flex flex-col items-center justify-between">
                  <div className="relative ">
                    {product.priceAfterDiscount && (
                      <span className="absolute top-0 left-0 bg-red-500 text-white p-1 text-xs font-bold rounded-br-md">SALE</span>
                    )}
                    <img className="w-full h-auto" src={product.imageCover} alt={product.title} />
                  </div>
                  <h2 className="text-center text-emerald-500 text-2xl font-bold mt-3">{product.category.name}</h2>
                  <div className="flex justify-between items-center w-full mt-2 p-2">
                    {product.priceAfterDiscount ? (
                      <div className="flex items-center space-x-2">
                        <span className="line-through text-red-600">{product.price} EGP</span>
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
                <button className="bg-gradient-to-r w-full from-green-400 via-green-500 to-green-600 text-white p-1 rounded-lg mb-2 cursor-pointer hover:text-gray-900 transition-all duration-500">
                  Add to Cart
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}