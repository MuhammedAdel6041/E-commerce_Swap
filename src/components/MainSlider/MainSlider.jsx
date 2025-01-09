import hero from '../../assets/images/Hero.png'
import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import 'swiper/css';
import { Autoplay } from 'swiper/modules';
export default function MainSlider() {
  return (
    <>
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
        }}

        navigation={true}
        modules={[Autoplay]}
        className="mySwiper"
      >
        <SwiperSlide><img src={hero} alt="" /></SwiperSlide>
        <SwiperSlide><img src={hero} alt="" /></SwiperSlide>
        <SwiperSlide><img src={hero} alt="" /></SwiperSlide>
        <SwiperSlide><img src={hero} alt="" /></SwiperSlide>
        <SwiperSlide><img src={hero} alt="" /></SwiperSlide>
      </Swiper>
    </>
  );
}

 