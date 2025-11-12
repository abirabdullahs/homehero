import React, { useContext, useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { AuthContext } from '../context/Context';

const AllServices = () => {
    useEffect(() => {
        AOS.init({
            duration: 800,
            once: false,
            easing: 'ease-in-out'
        });
    }, []);

    const { services } = useContext(AuthContext);
    console.log(services);
    return (
        <div>

            <Hero></Hero>

            <h1 className='text-center font-bold text-4xl my-5'>Explore Home Service</h1>

            <Suspense fallback={<Loader1></Loader1>}>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 px-6 mb-5">
                    {
                        services.map((skill, index) => (
                            <div key={skill._id} data-aos="zoom-in" data-aos-delay={index * 100}>
                                <Card skill={skill} />
                            </div>
                        ))
                    }
                </div>
            </Suspense>
        </div>
    );
};

export default AllServices;