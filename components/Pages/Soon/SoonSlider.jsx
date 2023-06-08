import {Swiper, SwiperSlide} from "swiper/react";
import {Pagination} from "swiper";
import Slide1 from "@/public/img/soon/slide1.png";
import Slide2 from "@/public/img/soon/slide2.png";
import Slide3 from "@/public/img/soon/slide3.png";
import Slide4 from "@/public/img/soon/slide4.png";
import ImageElement from "@/components/Tools/ImageElement";
import AboutData from "@/lib/Data/AboutData";

const SoonSlider = () => {
    const params = {
        modules: [Pagination],
        spaceBetween: 10,
        slidesPerView: 1,
        threshold: 10,
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        }
    }

    return (
        <div className='w-100 position-relative'>
            <Swiper {...params}>
                <SwiperSlide>
                    <ImageElement
                        lazy={false}
                        quality={60}
                        width={1000}
                        objectFit={'contain'}
                        className="img-responsive w-100 h-100 rounded"
                        image={Slide1}
                        title={`${AboutData.title} - اسلاید ۱`}/>
                </SwiperSlide>
                <SwiperSlide>
                    <ImageElement
                        lazy={false}
                        quality={60}
                        width={1000}
                        objectFit={'contain'}
                        className="img-responsive w-100 h-100 rounded"
                        image={Slide2}
                        title={`${AboutData.title} - اسلاید 2`}/>
                </SwiperSlide>
                <SwiperSlide>
                    <ImageElement
                        lazy={false}
                        quality={60}
                        width={1000}
                        objectFit={'contain'}
                        className="img-responsive w-100 h-100 rounded"
                        image={Slide3}
                        title={`${AboutData.title} - اسلاید 3`}/>
                </SwiperSlide>
                <SwiperSlide>
                    <ImageElement
                        lazy={false}
                        quality={60}
                        width={1000}
                        objectFit={'contain'}
                        className="img-responsive w-100 h-100 rounded"
                        image={Slide4}
                        title={`${AboutData.title} - اسلاید 3`}/>
                </SwiperSlide>
            </Swiper>
            <div className={`swiper-pagination swiper-pagination-1`}/>
        </div>

    )
}

export default SoonSlider;