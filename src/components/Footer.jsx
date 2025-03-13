import React from 'react';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="bg-gray-800 text-white pt-12 pb-6">
            <div className="w-11/12 md:container xl:w-9/12 mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
                <div>
                    <h3 className="text-xl font-bold mb-4">Test</h3>
                    <p className="text-gray-400">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nulla, impedit.</p>
                </div>
                <div>
                    <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
                    <ul className="space-y-2">
                        <li><Link href="/" className="text-gray-400 hover:text-white">Home</Link></li>
                        <li><a href="#" className="text-gray-400 hover:text-white">Privacy Policy</a></li>
                        <li><a href="#" className="text-gray-400 hover:text-white">About Us</a></li>
                        <li><a href="#" className="text-gray-400 hover:text-white">Contact</a></li>
                    </ul>
                </div>
                <div>
                    <h4 className="text-lg font-semibold mb-4">Contact Us</h4>
                    <p className="text-gray-400">123 Scholar Street</p>
                    <p className="text-gray-400">Eduville, EV 12345</p>
                    <p className="text-gray-400">(123) 456-7890</p>
                </div>
                <div>
                    <h4 className="text-lg font-semibold mb-4">Follow Us</h4>
                    <div className="flex space-x-4">
                        <a href="#" className="text-gray-400 hover:text-white text-2xl"><FaFacebookF /></a>
                        <a href="#" className="text-gray-400 hover:text-white text-2xl"><FaTwitter /></a>
                        <a href="#" className="text-gray-400 hover:text-white text-2xl"><FaInstagram /></a>
                        <a href="#" className="text-gray-400 hover:text-white text-2xl"><FaLinkedinIn /></a>
                    </div>
                </div>
            </div>
            <div className="container mx-auto mt-8 pt-8 border-t border-gray-700 text-center text-gray-400">
                <p>&copy; {new Date().getFullYear()} This Is Demonstration Purpose Only</p>
            </div>
        </footer>
    );
};

export default Footer;