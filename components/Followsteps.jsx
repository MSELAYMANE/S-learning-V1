import { FaUserPlus, FaUserCheck, FaBookOpen, FaChalkboardTeacher } from "react-icons/fa";

const steps = [
  {
    icon: <FaUserPlus className="text-white text-2xl" />,
    title: "Create an Account",
    description: "Sign up for free and join a community of passionate learners and teachers.",
  },
  {
    icon: <FaUserCheck className="text-white text-2xl" />,
    title: "Choose a Role",
    description: "Become a student or a teacher depending on your goals.",
  },
  {
    icon: <FaBookOpen className="text-white text-2xl" />,
    title: "Find or Publish a Course",
    description: "Explore a wide range of topics or create your own course.",
  },
  {
    icon: <FaChalkboardTeacher className="text-white text-2xl" />,
    title: "Learn or Teach at Your Own Pace",
    description: "Flexible, simple, and adapted to your schedule.",
  },
];

function Followsteps() {
  return (
    <section >
      <div className="max-w-6xl mx-auto px-4 text-center">
        <h2 className="text-4xl font-bold mb-12 text-gray-800">How It Works</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div
              key={index}
              className="bg-white shadow-xl rounded-2xl p-6 flex flex-col items-center transition hover:scale-105 duration-300"
            >
              <div className="bg-indigo-600 rounded-full p-4 mb-4">
                {step.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-800">{step.title}</h3>
              <p className="text-gray-600">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Followsteps;
