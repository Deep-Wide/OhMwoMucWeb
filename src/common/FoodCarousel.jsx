import {Swiper, SwiperSlide} from "swiper/react";
import {Navigation, Pagination} from "swiper/modules";

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import '/src/style.css'
import {FILE_API_URL} from "../service/FileService.js";

const FoodCarousel = ({images}) => {

    console.log("image:   ", images)
    console.log("key:   ", images.length)

    return (
        <>
            {images.length > 0 &&
                <Swiper
                    slidesPerView={1}
                    spaceBetween={30}
                    loop={images.length > 1}
                    pagination={{
                        clickable: true,
                    }}
                    navigation={true}
                    modules={[Pagination, Navigation]}
                    className="mySwiper"
                    key={images.length}
                    height={"30px"}
                >
                    {
                        images.map((image) => ((
                            <SwiperSlide key={image.fileId}>
                                <div className="duration-700 ease-in-out" data-carousel-item>
                                    <img src={`${FILE_API_URL}/images/${image?.uniqueFileName}`} alt={image?.fileName}
                                         className="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
                                    />
                                </div>
                            </SwiperSlide>
                        )))
                    }
                </Swiper>
            }
        </>
    )

}

export default FoodCarousel;
