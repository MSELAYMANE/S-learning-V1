import { useState } from "react";

const TeacherRegisterForm = () => {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    profilePicture: null,
    domains: [],
    agree: false,
    motivation: "",
    qualification: null,
    portfolio: "",
    specialty: "",
    job: "",
  });

  const domainsOptions = [
    "Practical & Vocational Skills",
    "Academic & Intellectual",
    "Creative & Artistic Domains",
    "Professional & Technical Skills",
    "Recreational & Hobbies",
    "Other",
  ];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleDomainChange = (e) => {
    const domain = e.target.value;
    setForm({
      ...form,
      domains: e.target.checked
        ? [...form.domains, domain]
        : form.domains.filter((d) => d !== domain),
    });
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setForm({
      ...form,
      [name]: files[0],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (form.password !== form.confirmPassword) {
      alert("Passwords don't match!");
      return;
    }

    const formData = new FormData();
    formData.append("role", "teacher");
    formData.append("name", form.name);
    formData.append("email", form.email);
    formData.append("password", form.password);
    formData.append("agree", form.agree);
    formData.append("motivation", form.motivation);
    formData.append("portfolio", form.portfolio);
    formData.append("specialty", form.specialty);
    formData.append("job", form.job);
    
    form.domains.forEach(domain => formData.append("domains[]", domain));
    
    if (form.profilePicture) {
      formData.append("profilePicture", form.profilePicture);
    }
    if (form.qualification) {
      formData.append("qualification", form.qualification);
    }

    try {
      const res = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (res.ok) {
        alert("Teacher registered successfully!");
        // Optionally redirect to login or dashboard
      } else {
        alert(data.error || "Registration failed.");
      }
    } catch (err) {
      console.error("Registration error:", err);
      alert("Server error. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-indigo-100 to-white">
      <div className="w-full max-w-lg p-6 bg-white rounded-lg shadow-lg">
        <div className="flex justify-center mb-6">
          <img
            src="/S-learning-logo.png" // Replace with your logo path
            alt="Logo"
            className="max-w-xs max-h-24 object-contain"
          />
        </div>
        <h2 className="text-2xl font-semibold text-center mb-4">Teacher Registration</h2>
        <form onSubmit={handleSubmit}>
          {/* Step 1: Essential Information */}
          {step === 1 && (
            <div>
              <div className="mb-4">
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div className="mb-4">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="exemple@gmail.com"
                  value={form.email}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div className="mb-4">
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div className="mb-4">
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                  Confirm Password
                </label>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  value={form.confirmPassword}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div className="mb-4">
                <button
                  type="button"
                  onClick={() => setStep(2)} // Move to step 2
                  className="w-full py-2 px-4 bg-indigo-600 text-white rounded-md shadow-md hover:bg-indigo-700 focus:outline-none"
                >
                  Next
                </button>
              </div>
            </div>
          )}

          {/* Step 2: Domains to Teach & Agree */}
          {step === 2 && (
            <div>
              <div className="mb-4">
                <label htmlFor="profilePicture" className="block text-sm font-medium text-gray-700">
                  Profile Picture (Optional)
                </label>
                <input
                  type="file"
                  id="profilePicture"
                  name="profilePicture"
                  onChange={handleFileChange}
                  className="mt-1 block w-full text-sm text-gray-700 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  accept=".jpg,.jpeg,.png"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Domains to Teach</label>
                <div className="space-y-2">
                  {domainsOptions.map((domain) => (
                    <div key={domain} className="flex items-center">
                      <input
                        type="checkbox"
                        id={domain}
                        value={domain}
                        onChange={handleDomainChange}
                        className="mr-2"
                      />
                      <label htmlFor={domain} className="text-sm text-gray-600">
                        {domain}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex items-center mb-4">
                <input
                  type="checkbox"
                  id="agree"
                  name="agree"
                  checked={form.agree}
                  onChange={handleChange}
                  className="mr-2"
                />
                <label htmlFor="agree" className="text-sm text-gray-600">
                  I agree to the <a href="#" className="text-indigo-600">terms and conditions</a>.
                </label>
              </div>

              <div className="flex space-x-4">
                <button
                  type="button"
                  onClick={() => setStep(1)} // Go back to step 1
                  className="w-full py-2 px-4 bg-gray-600 text-white rounded-md shadow-md hover:bg-gray-700 focus:outline-none"
                >
                  Back
                </button>
                <button
                  type="button"
                  onClick={() => setStep(3)} // Move to step 3
                  className="w-full py-2 px-4 bg-indigo-600 text-white rounded-md shadow-md hover:bg-indigo-700 focus:outline-none"
                >
                  Next
                </button>
              </div>
            </div>
          )}

          {/* Step 3: Advanced Information */}
          {step === 3 && (
            <div>
             <div className="mb-4">
                <label htmlFor="motivation" className="block text-sm font-medium text-gray-700">
                  Your Motivation
                </label>
                <textarea
                  id="motivation"
                  name="motivation"
                  value={form.motivation}
                  onChange={handleChange}
                  rows="4"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>


              <div className="mb-4">
                <label htmlFor="qualification" className="block text-sm font-medium text-gray-700">
                  Upload Qualification Documents
                </label>
                <input
                  type="file"
                  id="qualification"
                  name="qualification"
                  onChange={handleFileChange}
                  className="mt-1 block w-full text-sm text-gray-700 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                />
                {/* Display the selected file name */}
                {form.qualification && (
                  <p className="mt-2 text-sm text-gray-600">Selected file: {form.qualification.name}</p>
                )}
              </div>

              <div className="mb-4">
                <label htmlFor="portfolio" className="block text-sm font-medium text-gray-700">
                  Portfolio Link (Optional)
                </label>
                <input
                  type="url"
                  id="portfolio"
                  name="portfolio"
                  value={form.portfolio}
                  onChange={handleChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div className="mb-4">
                <label htmlFor="specialty" className="block text-sm font-medium text-gray-700">
                  specialty
                </label>
                <input
                  type="url"
                  id="specialty"
                  name="specialty"
                  value={form.specialty}
                  onChange={handleChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div className="mb-4">
                <label htmlFor="job" className="block text-sm font-medium text-gray-700">
                  Job Title 
                </label>
                <input
                  type="text"
                  id="job"
                  name="job"
                  value={form.job}
                  onChange={handleChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>


              <div className="flex space-x-4">
                <button
                  type="button"
                  onClick={() => setStep(2)} // Go back to step 2
                  className="w-full py-2 px-4 bg-gray-600 text-white rounded-md shadow-md hover:bg-gray-700 focus:outline-none"
                >
                  Back
                </button>
                <button
                  type="submit"
                  className="w-full py-2 px-4 bg-indigo-600 text-white rounded-md shadow-md hover:bg-indigo-700 focus:outline-none"
                >
                  Submit
                </button>
              </div>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default TeacherRegisterForm;
