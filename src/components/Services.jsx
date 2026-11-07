import React from 'react';
import { Link } from 'react-router-dom';

function Services() {

  const services = [
    {
      title: 'Companion Calls',
      description:
        'Talk to someone anytime you feel lonely, stressed, or simply need a listening ear.',
      icon: '📞',
    },

    {
      title: 'Shout-out Calls',
      description:
        'Send special birthday wishes, appreciation messages, and surprise shout-out calls.',
      icon: '🎉',
    },

    {
      title: 'Schedule Reminders',
      description:
        'Never miss important meetings, events, or daily activities with reminder calls.',
      icon: '⏰',
    },
  ];

  return (
    <section className="min-h-screen bg-slate-100 py-20 px-6">

      {/* Section Heading */}
      <div className="text-center mb-16">

        <h1 className="text-4xl md:text-5xl font-bold text-slate-800">
          What We Offer
        </h1>

        <p className="text-gray-600 mt-4 text-lg">
          Explore PaddyBOT’s key services designed to keep you connected.
        </p>

      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 max-w-7xl mx-auto">

        {services.map((service, index) => (

          <div
            key={index}
            className="bg-white rounded-3xl shadow-lg p-8 flex flex-col items-center text-center hover:-translate-y-3 hover:shadow-2xl transition-all duration-500 group"
          >

            {/* Icon */}
            <div className="text-6xl mb-6 group-hover:scale-125 transition duration-500">

              {service.icon}

            </div>

            {/* Title */}
            <h2 className="text-2xl font-bold text-slate-800 mb-4">

              {service.title}

            </h2>

            {/* Description */}
            <p className="text-gray-600 mb-8 leading-relaxed">

              {service.description}

            </p>

            {/* CTA Button */}
            <Link
              to="/signup"
              className="bg-red-500 text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-800 hover:scale-105 transition-all duration-300"
            >
              Get Started
            </Link>

          </div>

        ))}

      </div>

    </section>
  );
}

export default Services;
