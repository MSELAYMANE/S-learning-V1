import React, { useRef, useState, useEffect } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";

const cards = [
  {
    image: "/images/imv/1.png",
    category: " Practical & Vocational Skills",
    categoryColor: "bg-green-100 text-green-700",
    title: " focus on hands-on expertise like cooking, fitness training, or mechanical work that directly apply to everyday tasks and careers.",
  },
  {
    image: "/images/imv/2.png",
    category: "Academic & Intellectual",
    categoryColor: "bg-yellow-100 text-yellow-700",
    title: "areas cover deep knowledge and critical thinking in fields like science, mathematics, languages, and philosophy.",
  },
  {
    image: "/images/imv/3.png",
    category: "Creative & Artistic Domains",
    categoryColor: "bg-blue-100 text-blue-700",
    title: "encourage expression through music, art, design, and performance, allowing individuals to unleash their imagination.",
  },
  {
    image: "/images/imv/4.png",
    category: "Professional & Technical Skills",
    categoryColor: "bg-pink-100 text-pink-700",
    title: "prepare individuals for careers in fields such as programming, business management, marketing, and law, focusing on specialized expertise.",
  },
  {
    image: "/images/imv/5.png",
    category: "Recreational & Hobbies",
    categoryColor: "bg-pink-100 text-pink-700",
    title: "provide enjoyment and skill-building in activities like sports, games, travel, and DIY projects, enriching leisure time.",
  },
];

export default function CardCarousel() {
  const scrollRef = useRef(null);
  const [current, setCurrent] = useState(0);
  
  // Function to move to the next or previous card with cyclic behavior
  const scroll = (dir) => {
    if (!scrollRef.current) return;
    const cardWidth = scrollRef.current.offsetWidth;
    
    // Update the current index cyclically using modulus
    let newIndex = (current + dir + cards.length) % cards.length;

    setCurrent(newIndex);
    scrollRef.current.scrollTo({
      left: newIndex * (cardWidth * 0.5 + 16), // 16 is gap
      behavior: "smooth",
    });
  };

  // Auto-scroll effect
  useEffect(() => {
    const interval = setInterval(() => {
      scroll(1); // Move to the next card every 3 seconds
    }, 3000); // Change the interval as needed

    return () => clearInterval(interval); // Cleanup the interval on component unmount
  }, [current]);

  return (
    
      <div className="max-w-6xl mx-auto">
        <div className="relative">
          {/* Left arrow */}
          <button
            onClick={() => scroll(-1)}
            className="absolute left-0 top-1/2 -translate-y-1/2 bg-white rounded-full p-2 shadow hover:bg-gray-100 z-10"
          >
            <ArrowLeft className="w-5 h-5 text-blue-500" />
          </button>

          {/* Cards container */}
          <div
            ref={scrollRef}
            className="flex overflow-x-hidden gap-4 scroll-smooth snap-x"
          >
            {cards.map((card, idx) => (
              <div
                key={idx}
                className="min-w-[50%] md:min-w-[33%] lg:min-w-[25%] snap-start bg-white rounded-2xl shadow p-4"
              >
                <img
                  src={card.image}
                  alt={card.title}
                  className="w-full h-40 object-cover rounded-xl"
                />
                <span
                  className={`inline-block mt-4 px-3 py-1 text-sm font-semibold rounded-full ${card.categoryColor}`}
                >
                  {card.category}
                </span>
                <h3 className="mt-2 font-semibold text-md leading-snug">
                  {card.title}
                </h3>
                <button className="mt-4 text-blue-500 hover:text-blue-600">
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            ))}
          </div>

          {/* Right arrow */}
          <button
            onClick={() => scroll(1)}
            className="absolute right-0 top-1/2 -translate-y-1/2 bg-white rounded-full p-2 shadow hover:bg-gray-100 z-10"
          >
            <ArrowRight className="w-5 h-5 text-blue-500" />
          </button>
        </div>

        {/* Dots */}
        <div className="flex justify-center gap-2 mt-6">
          {cards.map((_, idx) => (
            <span
              key={idx}
              className={`w-2 h-2 rounded-full ${
                current === idx ? "bg-blue-500" : "bg-blue-200"
              }`}
            ></span>
          ))}
        </div>
      </div>
    
  );
}
