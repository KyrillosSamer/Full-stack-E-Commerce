import photo1 from '../../../images/slider-image-3.jpeg';
import photo2 from '../../../images/slider-image-2.jpeg';
import photo3 from '../../../images/slider-image-1.jpeg';
import banner1 from "../../../images/grocery-banner.png";
import banner2 from "../../../images/grocery-banner-2.jpeg";
import Slider from 'react-slick';

export default function MainSlider() {

  const settings = {
    dots: false,
    infinite: true,
    speed: 5000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 0,
    cssEase: "linear",
  };

  return (
    <>
      <div className='grid grid-cols-[2fr_2fr] w-[80%] mx-auto mb-5 gap-0'>

        <div className='overflow-hidden'>
          <Slider {...settings}>
            <div>
              <img
                src={photo1}
                alt='Main Slide'
                className='w-full h-[160px] sm:h-[280px] object-cover block'
                style={{ display: 'block' }}
              />
            </div>
            <div>
              <img
                src={photo2}
                alt='Slide 2'
                className='w-full h-[160px] sm:h-[280px] object-cover block'
                style={{ display: 'block' }}
              />
            </div>
            <div>
              <img
                src={photo3}
                alt='Slide 3'
                className='w-full h-[160px] sm:h-[280px] object-cover block'
                style={{ display: 'block' }}
              />
            </div>
          </Slider>
        </div>

        <div className='flex flex-col gap-0'>
          <img
            src={banner1}
            alt='Banner 1'
            className='w-full h-[80px] sm:h-[140px] object-cover block'
            style={{ display: 'block' }}
          />
          <img
            src={banner2}
            alt='Banner 2'
            className='w-full h-[80px] sm:h-[140px] object-cover block'
            style={{ display: 'block' }}
          />
        </div>

      </div>
    </>
  )
}
