import photo1 from '../../../images/slider-image-3.jpeg';
import photo2 from '../../../images/slider-image-2.jpeg';
import photo3 from '../../../images/slider-image-1.jpeg';
import banner1 from "../../../images/grocery-banner.png";
import banner2 from "../../../images/grocery-banner-2.jpeg";
import Slider from 'react-slick';

export default function MainSlider() {

      const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 1000,
  };

  return (<>

      <div className='grid grid-cols-[2fr_2fr] w-[80%] mx-auto  mb-5'>
      <div className='overflow-hidden'>


     <Slider {...settings} className=' '>
       <div ><img src={photo1} alt='Main Slide' className='w-[100%] h-[200px] object-cover ' /></div>
       <div><img src={photo2} alt='Slide 2'     className='w-[100%] h-[200px] object-cover  ' /> </div>
       <div> <img src={photo3} alt='Slide 3'   className='w-[100%] h-[200px] object-cover ' /></div>      
    </Slider>
    </div>

    <div >
    <img src={banner1} className='w-full h-[100px] object-fit'/>
    <img src={banner2} className='w-full h-[100px] object-fit'/>
    </div>
    </div>
    </>
  )
}
