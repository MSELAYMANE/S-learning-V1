import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-200 pt-10 pb-6">
      <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        
        {/* Logo + Description */}
        <div>
          <h2 className="text-xl font-bold mb-2">SkillBridge</h2>
          <p className="text-sm mb-4">
            Learn or teach anything you love — anytime, anywhere.
          </p>
          {/* Social icons */}
          <div className="flex space-x-4 mt-2">
            <a href="#" className="hover:text-white">
              <FaFacebookF />
            </a>
            <a href="#" className="hover:text-white">
              <FaTwitter />
            </a>
            <a href="#" className="hover:text-white">
              <FaInstagram />
            </a>
            <a href="#" className="hover:text-white">
              <FaLinkedinIn />
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="font-semibold mb-3">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:text-white">Home</a></li>
            <li><a href="#" className="hover:text-white">Courses</a></li>
            <li><a href="#" className="hover:text-white">Become a Teacher</a></li>
            <li><a href="#" className="hover:text-white">FAQ</a></li>
          </ul>
        </div>

        {/* Categories */}
        <div>
          <h3 className="font-semibold mb-3">Popular Categories</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:text-white">Fitness</a></li>
            <li><a href="#" className="hover:text-white">Cooking</a></li>
            <li><a href="#" className="hover:text-white">Programming</a></li>
            <li><a href="#" className="hover:text-white">Design</a></li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="font-semibold mb-3">Contact</h3>
          {/*<p className="text-sm">s-learning</p> add contact*/}
          <p className="text-sm">+212 643280840</p>
        </div>
      </div>

      <div className="text-center text-sm text-gray-400 mt-10 border-t border-gray-700 pt-6">
        © {new Date().getFullYear()} SkillBridge. All rights reserved.
      </div>
    </footer>
  );
}
