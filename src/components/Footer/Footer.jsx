import React from 'react';

const Footer = () => {
    return (
        <div>
            <footer className="footer sm:footer-horizontal bg-base-200 text-base-content p-10 mt-12 border-t border-base-300">
                <nav>
                    <h6 className="footer-title text-base-content">Services</h6>
                    <a className="link link-hover text-base-content hover:text-primary">Branding</a>
                    <a className="link link-hover text-base-content hover:text-primary">Design</a>
                    <a className="link link-hover text-base-content hover:text-primary">Marketing</a>
                    <a className="link link-hover text-base-content hover:text-primary">Advertisement</a>
                </nav>
                <nav>
                    <h6 className="footer-title text-base-content">Company</h6>
                    <a className="link link-hover text-base-content hover:text-primary">About us</a>
                    <a className="link link-hover text-base-content hover:text-primary">Contact</a>
                    <a className="link link-hover text-base-content hover:text-primary">Jobs</a>
                    <a className="link link-hover text-base-content hover:text-primary">Press kit</a>
                </nav>
                <nav>
                    <h6 className="footer-title text-base-content">Legal</h6>
                    <a className="link link-hover text-base-content hover:text-primary">Terms of use</a>
                    <a className="link link-hover text-base-content hover:text-primary">Privacy policy</a>
                    <a className="link link-hover text-base-content hover:text-primary">Cookie policy</a>
                </nav>
            </footer>

            <div className="w-full bg-base-200 border-t border-base-300 py-4">
                <div className="max-w-full sm:max-w-7xl mx-auto text-center text-sm text-base-content/70">
                    Developed by <a href="https://abirabdullah.me" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Abir Abdullah</a>
                </div>
            </div>
        </div>
    );
};

export default Footer;