import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

export default function CategorySlider() {
  const [categories, setCategories] = useState([]); 

  const getCategories = () => {
    axios
      .get('https://ecommerce.routemisr.com/api/v1/categories')
      .then((res) => {
        setCategories(res.data.data);
      })
      .catch((err) => console.error('Error fetching categories:', err));
  };

  useEffect(() => {
    getCategories();
  }, []);

const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 7,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 1000,
  responsive: [
    {
      breakpoint: 1024, 
      settings: {
        slidesToShow: 5,
      },
    },
    {
      breakpoint: 768, 
      settings: {
        slidesToShow: 4,
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 2,
      },
    },
  ],
};


  return (
    <div className='w-4/5 mx-auto my-8'> 
      <h2 className='text-xl font-semibold mb-4'>Shop Popular Categories</h2>
      <Slider {...settings}> 
        {categories.map((category) => (
          <div key={category._id} className='text-center px-2'>
            <img
              src={category.image}
              alt={category.name}
              className='w-full h-[150px] object-fit '
            />
            <p className='mt-2 text-sm'>{category.name}</p>
          </div>
        ))}
      </Slider>
    </div>
  );
}
