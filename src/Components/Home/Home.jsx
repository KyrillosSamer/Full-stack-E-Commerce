import React from 'react'
import CategorySlider from '../../Components/Home/CategorySlider/CategorySlider.jsx';
import Products from '../Products/Products'
import MainSlider from './MainSlider/MainSlider.jsx';




export default function Home() {
  return (
    <div>
      <MainSlider />
      <CategorySlider />
      <Products />
    </div>
  );
}

