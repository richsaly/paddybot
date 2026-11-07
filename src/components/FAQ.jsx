
import React, { useState } from "react";
import { Link } from "react-router-dom";

function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      question: "What is PaddyBot?",
      answer:
        "PaddyBot is a communication platform that provides personalized voice services, including companion calls, shout-out calls, and reminder calls to help people stay connected, celebrated, and organized.",
    },
    {
      question: "How do I book a call?",
      answer:
        "Simply create an account, choose the service you need, select a suitable date and time, choose a plan, and complete your booking.",
    },
    {
      question: "What is a Companion Call?",
      answer:
        "A Companion Call is a friendly conversation designed to provide companionship, motivation, casual chats, or a listening ear whenever you need one.",
    },
    {
      question: "What is a Shout-Out Call?",
      answer:
        "A Shout-Out Call allows you to send personalized birthday wishes, congratulations, anniversary greetings, and other special messages through a scheduled call.",
    },
    {
      question: "What is a Reminder Call?",
      answer:
        "A Reminder Call helps you stay on top of your schedule by reminding you about meetings, appointments, tasks, events, and other important activities.",
    },
    {
      question: "Can I schedule a call in advance?",
      answer:
        "Yes. You can book and schedule calls for a future date and time that works best for you.",
    },
    {
      question: "Are PaddyBot calls confidential?",
      answer:
        "Yes. We respect your privacy and handle all conversations with professionalism and discretion.",
    },
    {
      question: "Must I need a subscription to use PaddyBot?",
      answer: 
        "No. You can book individual services as needed. Subscription plans may also be available for users who require regular services.",
    },
    {
      question: "Can I cancel or reschedule a booking?",
      answer:
        "Yes. Depending on the booking terms, you can cancel or reschedule your call before the scheduled time.",
    },
    {
      question: "Does PaddyBot provide therapy or medical counseling?",
      answer:
        "No. PaddyBot offers friendly conversations, reminder services, and personalized shout-outs. We do not provide professional therapy, medical advice, or mental health counseling.",
    },
    {
      question: "How can I contact support?",
      answer:
        'You can reach our support team anytime through the "Live Chat with Selina" WhatsApp button available on the website.',
    },
  ];

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="bg-slate-100 py-20 px-6 md:px-16">
      <div className="max-w-4xl mx-auto">

        {/* Heading */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-800">
            Frequently Asked Questions
          </h2>

          <p className="text-gray-600 mt-4 text-lg">
            Everything you need to know about PaddyBot.
          </p>
        </div>

        {/* FAQ Accordion */}
        <div className="space-y-4">

          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-md overflow-hidden"
            >

              <button
                onClick={() => toggleFAQ(index)}
                className="w-full flex justify-between items-center p-6 text-left hover:bg-slate-50 transition duration-300"
              >
                <span className="font-semibold text-slate-800 text-base md:text-lg">
                  {faq.question}
                </span>

                <span className="text-2xl font-bold text-red-500">
                  {openIndex === index ? "−" : "+"}
                </span>
              </button>

              <div
                className={`overflow-hidden transition-all duration-300 ${
                  openIndex === index
                    ? "max-h-96 opacity-100"
                    : "max-h-0 opacity-0"
                }`}
              >
                <p className="px-6 pb-6 text-gray-600 leading-7">
                  {faq.answer}
                </p>
              </div>

            </div>
          ))}

        </div>

      </div>

    </section>
  );
}

export default FAQ;
