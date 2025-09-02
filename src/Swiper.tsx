import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/swiper-bundle.css' // Importa los estilos de Swiper

const ImageSlider = () => {
  const slides = [
    { id: 1, image: 'https://via.placeholder.com/300x200?text=Slide+1' },
    { id: 2, image: 'https://via.placeholder.com/300x200?text=Slide+2' },
    { id: 3, image: 'https://via.placeholder.com/300x200?text=Slide+3' },
  ]

  return (
    <Swiper
      spaceBetween={50}
      slidesPerView={1}
      navigation
      pagination={{ clickable: true }}
    >
      {slides.map((slide) => (
        <SwiperSlide key={slide.id}>
          <img src={slide.image} alt={`Slide ${slide.id}`} />
        </SwiperSlide>
      ))}
    </Swiper>
  )
}

export default ImageSlider
