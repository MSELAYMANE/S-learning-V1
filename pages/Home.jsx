import { useNavigate } from "react-router-dom"; // For React Router v6
import Navbar from "../components/Navbar";
import CardCarousel from "../components/CardCarousel";
import BuildSection from "../components/BuildSection";
import Followsteps from "../components/Followsteps";
import Footer from "../components/Footer";

function Home() {
  const navigate = useNavigate();

  return (
    <>
      <div className="min-h-screen w-full bg-white">
        <Navbar />
        
        {/* Section principale */}
        <section className="relative w-full min-h-[750px] overflow-hidden pt-28 flex items-center justify-center">
          {/* Image de fond */}
          <img
            src="/images/background.png"
            alt="Background"
            className="absolute top-0 right-0 w-[1860px] h-[750px] object-cover z-0"
          />

          {/* Contenu au-dessus */}
          <div className="relative z-10 flex flex-col-reverse md:flex-row items-center justify-between px-6 md:px-16">
            {/* Texte à gauche */}
            <div className="w-full md:w-1/2 text-center md:text-left p-6">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
                Learn & Teach <span className="text-blue-500">Any Skill</span>, Anytime
              </h1>
              <p className="mt-4 text-lg text-gray-700">
                Connect with experienced teachers and passionate students in fields like <strong>design, cooking, fitness, programming</strong>, and more.
                <br />
                <br />
                Start your journey today!
              </p>
              <div className="mt-6 flex justify-center md:justify-start space-x-4">
                <button
                  onClick={() => navigate("/register/student")}
                  className="px-6 py-3 bg-blue-500 text-white rounded-md shadow-md hover:bg-blue-600 transition"
                >
                  Join as a Student
                </button>
                <button
                  onClick={() => navigate("/register/teacher")}
                  className="px-6 py-3 border border-blue-500 text-blue-500 bg-white rounded-md shadow-md hover:bg-blue-500 hover:text-white transition"
                >
                  Become a Teacher
                </button>
              </div>
            </div>

            {/* Illustration à droite */}
            <div className="w-full md:w-1/2 flex justify-center md:justify-end p-6">
              <img
                src="/images/learningimg.png"
                alt="Learning"
                className="w-full max-w-md md:max-w-xl object-contain"
              />
            </div>
          </div>
        </section>

        <section className="min-h-[750px] flex items-center justify-center px-4">
          <Followsteps />
        </section>

        <section className="min-h-[750px] flex items-center justify-center px-4">
          <BuildSection />
        </section>

        <section className="min-h-[750px] flex items-center justify-center px-4">
          
        </section>

        {/* Card Carousel Section */}
        <section className="min-h-[750px] flex items-center justify-center px-4">
          <CardCarousel />
        </section>
        
        <Footer />
      </div>
    </>
  );
}

export default Home;
