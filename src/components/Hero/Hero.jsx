import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { Autoplay } from 'swiper/modules';
import Banner from './Banner';
import { useNavigate } from 'react-router-dom';

const Hero = () => {
    const navigate = useNavigate();
    return (
        <div className="mt-1 mb-10">
            <Swiper
                modules={[Autoplay]}
                autoplay={{ delay: 2500, disableOnInteraction: false }}
                loop
            >
                {/* Slide 1 */}
                <SwiperSlide>
                    <Banner
                        imageUrl="https://new.boredteachers.com/wp-content/uploads/2025/04/Music-facts-cover-scaled.jpg"
                        linkUrl="/courses/graphic-design"
                        title="Music Class"
                        paragraph="Learn Music principles, create social media hype"
                        buttonText="Explore"
                        onButtonClick={() => navigate("/service/691300f2fbd3a1072b325475")}
                    />
                </SwiperSlide>

                {/* Slide 2 */}
                <SwiperSlide>
                    <Banner
                        imageUrl="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQw8nTOHWS5luE9e3BkFr0N9Kj0ivVd7fTTnw&s"
                        linkUrl="/courses/graphic-design"
                        title="Interior Design"
                        paragraph="Learn HTML, CSS, and JavaScript fundamentals to build responsive and interactive websites."
                        buttonText="Explore"
                        onButtonClick={() => navigate("/service/691300f2fbd3a1072b325472")}
                    />
                </SwiperSlide>

                {/* slide - 03 */}

                <SwiperSlide>
                    <Banner
                        imageUrl="https://ecdn.dhakatribune.net/contents/cache/images/640x359x1/uploads/media/2024/04/01/Carwash-cabf439dbe62543aa286043e68c491d8.jpg?jadewits_media_id=17950"
                        linkUrl="/courses/graphic-design"
                        title="Car Wash"
                        paragraph="Interactive English conversation sessions for non-native speakers. Focus on fluency and pronunciation."
                        buttonText="Explore"
                        onButtonClick={() => navigate("/service/691300f2fbd3a1072b32546d")}
                    />
                </SwiperSlide>
            </Swiper>
        </div>
    );
};

export default Hero;
