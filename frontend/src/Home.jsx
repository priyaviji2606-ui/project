import React from "react";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  return (
    <div className="bg-gray-50 text-gray-800 pt-24">

      {/* ================= HERO SECTION ================= */}
      <section className="px-10 md:px-20 py-20 flex flex-col md:flex-row items-center justify-between bg-gradient-to-br from-green-50 to-white min-h-[90vh]">

        <div className="max-w-xl">
          <h1 className="text-5xl font-bold leading-tight mb-6">
            Personalized Nutrition <br />
            <span className="text-green-600">Powered by AI</span>
          </h1>

          <p className="text-gray-600 text-lg mb-8">
            NutriSmart helps you track your health, predict nutrient
            deficiencies, and order personalized healthy meals —
            all in one intelligent platform.
          </p>

          <div className="space-x-4">
            <button
              onClick={() => navigate("/login")}
              className="bg-green-600 text-white px-8 py-3 rounded-xl shadow-lg hover:bg-green-700 hover:scale-105 transition duration-300"
            >
              Get Started
            </button>

            <button
              onClick={() => navigate("/menu")}
              className="border border-green-600 text-green-600 px-8 py-3 rounded-xl hover:bg-green-100 transition duration-300"
            >
              Explore Meals
            </button>
          </div>
        </div>

        <img
          src="https://images.unsplash.com/photo-1490645935967-10de6ba17061"
          alt="Healthy Food"
          className="w-96 rounded-3xl shadow-2xl mt-12 md:mt-0 hover:scale-105 transition duration-500"
        />
      </section>

      {/* ================= STATS SECTION ================= */}
      <section className="py-20 px-10 md:px-20 bg-white">
        <div className="grid md:grid-cols-4 gap-10 text-center">

          {[
            { number: "10K+", label: "Active Users" },
            { number: "500+", label: "Healthy Meals" },
            { number: "4.9★", label: "User Rating" },
            { number: "AI Based", label: "Deficiency Prediction" }
          ].map((item, index) => (
            <div
              key={index}
              className="bg-green-50 p-8 rounded-2xl shadow-md hover:shadow-xl hover:-translate-y-2 transition duration-300"
            >
              <h3 className="text-3xl font-bold text-green-600">
                {item.number}
              </h3>
              <p className="text-gray-600 mt-2">{item.label}</p>
            </div>
          ))}

        </div>
      </section>

      {/* ================= FEATURES SECTION ================= */}
      <section className="py-20 px-10 md:px-20 bg-green-50">
        <h2 className="text-4xl font-bold text-center mb-16">
          Why Choose NutriSmart?
        </h2>

        <div className="grid md:grid-cols-3 gap-12">

          <FeatureCard
            title="BMI & Calorie Tracking"
            description="Automatically calculate daily calorie needs and track your health goals effectively."
          />

          <FeatureCard
            title="AI Deficiency Prediction"
            description="Predict risks of Iron, Vitamin D, Calcium and other nutrient deficiencies."
          />

          <FeatureCard
            title="Healthy Meal Ordering"
            description="Order meals tailored specifically to your health condition and preferences."
          />

        </div>
      </section>

      {/* ================= TESTIMONIAL SECTION ================= */}
      <section className="py-20 px-10 md:px-20 bg-white text-center">
        <h2 className="text-4xl font-bold mb-12">
          What Our Users Say
        </h2>

        <div className="grid md:grid-cols-3 gap-10">

          {[
            "NutriSmart helped me maintain my diet plan perfectly!",
            "The AI deficiency feature is very accurate.",
            "Finally a smart way to eat healthy daily."
          ].map((review, index) => (
            <div
              key={index}
              className="bg-gray-50 p-8 rounded-2xl shadow-md hover:shadow-lg transition duration-300"
            >
              <div className="text-yellow-400 text-2xl mb-3">★★★★★</div>
              <p className="text-gray-600">{review}</p>
            </div>
          ))}

        </div>
      </section>

      {/* ================= CTA SECTION ================= */}
      <section className="py-20 px-10 md:px-20 bg-gradient-to-r from-green-600 to-emerald-500 text-white text-center rounded-t-3xl">
        <h2 className="text-4xl font-bold mb-6">
          Ready to Transform Your Health?
        </h2>

        <p className="mb-8 text-lg">
          Start your personalized nutrition journey today.
        </p>

        <button
          onClick={() => navigate("/login")}
          className="bg-white text-green-600 px-10 py-4 rounded-xl font-semibold shadow-lg hover:scale-105 transition duration-300"
        >
          Get Started Now
        </button>
      </section>

    </div>
  );
}

/* ================= FEATURE CARD COMPONENT ================= */
function FeatureCard({ title, description }) {
  return (
    <div className="bg-white p-8 rounded-2xl shadow-md hover:shadow-xl transition duration-300 text-center">
      <h3 className="text-xl font-semibold mb-4 text-green-600">
        {title}
      </h3>
      <p className="text-gray-600">
        {description}
      </p>
    </div>
  );
}

export default Home;