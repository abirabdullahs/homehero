import React, { Suspense, useContext, useEffect } from "react";
// import { useLoaderData } from 'react-router';
import AOS from 'aos';
import 'aos/dist/aos.css';
import Hero from './../../components/Hero/Hero';
import Provider from "../../context/Provider";
import { Loader1 } from './../../components/Loader/Loader';
import { AuthContext } from "../../context/Context";
import Card from "./Card";


const Home = () => {
    useEffect(() => {
        AOS.init({
            duration: 800,
            once: false,
            easing: 'ease-in-out'
        });
    }, []);

    const {services} = useContext(AuthContext);
    console.log(services);
    return (
        <div>

           <Hero></Hero>

            <h1 className='text-center font-bold text-4xl my-5'>Explore Home Service</h1>

            <Suspense fallback={<Loader1></Loader1>}>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 px-6 mb-5">
                    {
                        services.slice(0,8).map((skill, index) => (
                            <div key={skill._id} data-aos="zoom-in" data-aos-delay={index * 100}>
                                <Card skill={skill} />
                            </div>
                        ))
                    }
                </div>
            </Suspense>


            <section className="my-16" data-aos="fade-up">
                <h2 className="text-3xl font-semibold mb-6 text-center">How It Works</h2>
                <div className="grid md:grid-cols-3 gap-8 text-center">
                    <div data-aos="fade-right" data-aos-delay="100">
                        <h3 className="font-bold">1️⃣ Post Your Skill</h3>
                        <p>Offer something you're good at.</p>
                    </div>
                    <div data-aos="fade-up" data-aos-delay="200">
                        <h3 className="font-bold">2️⃣ Find a Match</h3>
                        <p>Browse listings from your area.</p>
                    </div>
                    <div data-aos="fade-left" data-aos-delay="300">
                        <h3 className="font-bold">3️⃣ Connect & Learn</h3>
                        <p>Trade skills and grow together!</p>
                    </div>
                </div>
            </section>

            <div>
                <section className="bg-purple-50 py-12">
                    <h2 className="text-3xl font-semibold text-center mb-8">What Our Users Say</h2>
                    <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
                        <div className="p-6 bg-white rounded-xl shadow">
                            <p className="italic text-gray-700">“I learned guitar within 2 months! The best local platform for learning.”</p>
                            <h4 className="mt-3 font-semibold text-purple-600">— Alex D.</h4>
                        </div>
                        <div className="p-6 bg-white rounded-xl shadow">
                            <p className="italic text-gray-700">“Easy to find learners and share my yoga skills. Loved it!”</p>
                            <h4 className="mt-3 font-semibold text-purple-600">— Ravi P.</h4>
                        </div>
                        <div className="p-6 bg-white rounded-xl shadow">
                            <p className="italic text-gray-700">“A great initiative for community learning. Highly recommend!”</p>
                            <h4 className="mt-3 font-semibold text-purple-600">— Sara H.</h4>
                        </div>
                    </div>
                </section>

                <section className="bg-gray-50 py-16" data-aos="fade-up">
                    <h2 className="text-3xl font-semibold text-center mb-8">Why Choose home<span className="text-purple-600">Hero</span>?</h2>
                    <div className="grid md:grid-cols-3 gap-8 text-center max-w-5xl mx-auto">
                        <div className="p-6 bg-white shadow rounded-xl" data-aos="fade-right" data-aos-delay="100">
                            <h4 className="font-bold text-purple-600 mb-2">Learn Locally</h4>
                            <p>Find people near you who can teach or learn skills with you.</p>
                        </div>
                        <div className="p-6 bg-white shadow rounded-xl" data-aos="fade-up" data-aos-delay="200">
                            <h4 className="font-bold text-purple-600 mb-2">Exchange Freely</h4>
                            <p>Trade skills instead of money. Share your knowledge with others.</p>
                        </div>
                        <div className="p-6 bg-white shadow rounded-xl" data-aos="fade-left" data-aos-delay="300">
                            <h4 className="font-bold text-purple-600 mb-2">Grow Together</h4>
                            <p>Join a supportive learning community and boost your confidence.</p>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default Home;