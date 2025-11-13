import React, { Suspense, useContext, useEffect } from "react";
// import { useLoaderData } from 'react-router';
import AOS from 'aos';
import 'aos/dist/aos.css';
import Hero from './../../components/Hero/Hero';
import Provider from "../../context/Provider";
import { Loader1 } from './../../components/Loader/Loader';
import { AuthContext } from "../../context/Context";
import Card from "./Card";
import { useNavigate } from "react-router-dom";


const Home = () => {
    useEffect(() => {
        AOS.init({
            duration: 800,
            once: false,
            easing: 'ease-in-out'
        });
    }, []);

    const { services } = useContext(AuthContext);
    console.log(services);



    const Navigate = useNavigate();
    return (
        <div>

            <Hero></Hero>

            <h1 className='text-center font-bold text-4xl my-5 text-gray-800 dark:text-white'>Explore Home Service</h1>

            <Suspense fallback={<Loader1></Loader1>}>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 px-6 mb-5">
                    {
                        services.slice(0, 6).map((skill, index) => (
                            <div key={skill._id} data-aos="zoom-in" data-aos-delay={index * 100}>
                                <Card skill={skill} />
                            </div>
                        ))
                    }
                </div>
            </Suspense>


            <div className="flex items-center justify-center">
                <button className="btn-neutral btn text-center" onClick={() => { Navigate("/services") }}>Show More</button>
            </div>


            <section className="my-16" data-aos="fade-up">
                <h2 className="text-3xl font-bold mb-10 text-center text-gray-800 dark:text-base-content">
                    How Our Service Works
                </h2>
                <div className="grid md:grid-cols-3 gap-10 text-center max-w-6xl mx-auto">
                    <div
                        className="p-6 bg-white dark:bg-base-200 rounded-xl shadow hover:shadow-lg transition duration-300"
                        data-aos="fade-right"
                        data-aos-delay="100"
                    >
                        <h3 className="text-xl font-semibold text-purple-600 dark:text-purple-400 mb-2">1️⃣ Request a Service</h3>
                        <p className="text-gray-600 dark:text-gray-300">
                            Tell us what home service you need—plumbing, cleaning, electrical work, or more.
                        </p>
                    </div>
                    <div
                        className="p-6 bg-white dark:bg-base-200 rounded-xl shadow hover:shadow-lg transition duration-300"
                        data-aos="fade-up"
                        data-aos-delay="200"
                    >
                        <h3 className="text-xl font-semibold text-purple-600 dark:text-purple-400 mb-2">2️⃣ Get Matched</h3>
                        <p className="text-gray-600 dark:text-gray-300">
                            We connect you with verified local professionals ready to help.
                        </p>
                    </div>
                    <div
                        className="p-6 bg-white dark:bg-base-200 rounded-xl shadow hover:shadow-lg transition duration-300"
                        data-aos="fade-left"
                        data-aos-delay="300"
                    >
                        <h3 className="text-xl font-semibold text-purple-600 dark:text-purple-400 mb-2">3️⃣ Service & Satisfaction</h3>
                        <p className="text-gray-600 dark:text-gray-300">
                            Professionals come to your home and provide high-quality service. Satisfaction guaranteed.
                        </p>
                    </div>
                </div>
            </section>

            <section className="bg-purple-50 dark:bg-base-300 py-16">
                <h2 className="text-3xl font-bold text-center mb-12 text-gray-800 dark:text-base-content">
                    What Our Customers Say
                </h2>
                <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                    <div className="p-6 bg-white dark:bg-base-200 rounded-xl shadow">
                        <p className="italic text-gray-700 dark:text-gray-300">
                            "The electrician arrived on time and fixed everything quickly. Highly recommend!"
                        </p>
                        <h4 className="mt-4 font-semibold text-purple-600 dark:text-purple-400">— John K.</h4>
                    </div>
                    <div className="p-6 bg-white dark:bg-base-200 rounded-xl shadow">
                        <p className="italic text-gray-700 dark:text-gray-300">
                            "Our house was sparkling clean in no time. Professional and reliable cleaning service."
                        </p>
                        <h4 className="mt-4 font-semibold text-purple-600 dark:text-purple-400">— Priya S.</h4>
                    </div>
                    <div className="p-6 bg-white dark:bg-base-200 rounded-xl shadow">
                        <p className="italic text-gray-700 dark:text-gray-300">
                            "Plumbing issue solved instantly. Affordable, fast, and friendly service."
                        </p>
                        <h4 className="mt-4 font-semibold text-purple-600 dark:text-purple-400">— Ahmed R.</h4>
                    </div>
                </div>
            </section>

            <section className="bg-gray-50 dark:bg-base-300 py-16" data-aos="fade-up">
                <h2 className="text-3xl font-bold text-center mb-12 text-gray-800 dark:text-base-content">
                    Why Choose <span className="text-purple-600 dark:text-purple-400">HomeHero</span>?
                </h2>
                <div className="grid md:grid-cols-3 gap-10 max-w-6xl mx-auto text-center">
                    <div
                        className="p-6 bg-white dark:bg-base-200 rounded-xl shadow hover:shadow-lg transition duration-300"
                        data-aos="fade-right"
                        data-aos-delay="100"
                    >
                        <h4 className="text-xl font-semibold text-purple-600 dark:text-purple-400 mb-2">Trusted Professionals</h4>
                        <p className="text-gray-700 dark:text-gray-300">
                            Verified and experienced service providers ensure quality work every time.
                        </p>
                    </div>
                    <div
                        className="p-6 bg-white dark:bg-base-200 rounded-xl shadow hover:shadow-lg transition duration-300"
                        data-aos="fade-up"
                        data-aos-delay="200"
                    >
                        <h4 className="text-xl font-semibold text-purple-600 dark:text-purple-400 mb-2">Affordable & Transparent</h4>
                        <p className="text-gray-700 dark:text-gray-300">
                            Clear pricing, no hidden charges, and cost-effective solutions for your home.
                        </p>
                    </div>
                    <div
                        className="p-6 bg-white dark:bg-base-200 rounded-xl shadow hover:shadow-lg transition duration-300"
                        data-aos="fade-left"
                        data-aos-delay="300"
                    >
                        <h4 className="text-xl font-semibold text-purple-600 dark:text-purple-400 mb-2">Hassle-Free Experience</h4>
                        <p className="text-gray-700 dark:text-gray-300">
                            Book, schedule, and pay easily—all in one platform, making your life simpler.
                        </p>
                    </div>
                </div>
            </section>

        </div>
    );
};

export default Home;