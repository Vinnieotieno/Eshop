import Link from "next/link";
import Container from "../Container";
import FooterList from "./FooterList";
import { MdFacebook } from 'react-icons/md';
import { AiFillInstagram, AiFillTwitterCircle, AiFillYoutube } from "react-icons/ai";

const Footer = () => {
    return (
        <footer className="bg-green-700 text-slate-200 text-sm mt-16">
            <Container>
                <div className="flex flex-col md:flex-row justify-between pt-16 pb-8">
                    <FooterList>
                        <h3 className="text-base font-bold mb-2">Shop Categories</h3>
                        <Link href="#">Phones</Link>
                        <Link href="#">Laptops</Link>
                        <Link href="#">Watches</Link>
                        <Link href="#">TVs</Link>
                        <Link href="#">Accessories</Link>
                    </FooterList>
                    <FooterList>
                        <h3 className="text-base font-bold mb-2">Customer Services</h3>
                        <Link href="#">Phones</Link>
                        <Link href="#">Laptops</Link>
                        <Link href="#">Watches</Link>
                        <Link href="#">TVs</Link>
                        <Link href="#">Accessories</Link>
                    </FooterList>
                    <div className="w-full md:w-1/3 mb-6 md:mb-0">
                        <h3 className="text-base font-bold mb-2">About Us</h3>
                        <p className="mb-2">
                            Vincent Store is your one-stop-shop for e-commerce and order fulfillment. We boast reliability, speed, convenience due to our tech-driven, all-inclusive services.
                            A solution for online vendors to Sell More! Do you have an online shop or are you selling online? Is storage and delivery getting too hectic?
                        </p>
                    </div>
                    <FooterList>
                        <h3 className="text-base font-bold mb-2">Follow Us</h3>
                        <div className="flex gap-2">
                            <Link href="#">
                                <MdFacebook size={24} />
                            </Link>
                            <Link href="#">
                                <AiFillTwitterCircle size={24} />
                            </Link>
                            <Link href="#">
                                <AiFillInstagram size={24} />
                            </Link>
                            <Link href="#">
                                <AiFillYoutube size={24} />
                            </Link>
                        </div>
                    </FooterList>
                </div>
            </Container>

            {/* Centered Copyright Line */}
            <div className="text-center py-4">
                &copy; {new Date().getFullYear()} E~Vincent. All rights reserved.
            </div>
        </footer>
    );
};

export default Footer;
