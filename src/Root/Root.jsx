import { Outlet } from 'react-router';
import Navbar from './../components/Navbar/Navbar';
import Footer from './../components/Footer/Footer';


const Root = () => {

  
    return (
        <div className='min-h-screen flex flex-col bg-base-100 text-base-content'>
            <Navbar />
            <main className='max-w-7xl mx-auto w-full flex-1 px-4 py-6'>
                <Outlet />
            </main>
            <Footer />
        </div>
    );
};

export default Root;