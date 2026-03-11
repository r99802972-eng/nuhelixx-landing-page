import { useState } from "react";
import { ArrowUpRight, Plus } from "lucide-react";

export default function FAQSection() {
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);

  const faqs = [
    {
      question: "What services do you offer?",
      answer:
        "We offer a range of services including CRM consulting, optimization, and bespoke marketing solutions. Our packages are designed to cater to various business needs, from entry-level support to comprehensive revenue operations leadership. Each service is tailored to help you achieve your growth objectives.",
    },
    {
      question: "How can I get started?",
      answer:
        "Getting started is easy! Simply reach out through our contact form or schedule a call with our team. We'll discuss your needs and recommend the best package for your business.",
    },
    {
      question: "Do you offer support?",
      answer:
        "Yes, we provide ongoing support for all our services. Whether you need help with implementation or ongoing project guidance, our team is here to assist you. Your success is our priority.",
    },
    {
      question: "What is your pricing?",
      answer:
        "Our pricing varies based on the service package you choose. We offer tiered options to fit different budgets and needs. Contact us for a detailed quote tailored to your requirements.",
    },
    {
      question: "Can I customize services?",
      answer:
        "Absolutely! We understand that every business is unique. Our services can be customized to align with your specific goals and challenges, ensuring you get the most value.",
    },
  ];

  const toggleFAQ = (index: number) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  return (
    <section data-testid="faq-section" className="py-4 px-4 sm:px-8">
      <div className="max-w-[full] mx-auto border-t flex flex-col lg:flex-row gap-8 lg:gap-[50px]">
        <div className="flex flex-col justify-around gap-[20px] lg:gap-[30px] mt-[20px] lg:mt-[30px] w-full lg:w-[40%] p-6 lg:p-8 h-auto lg:h-[200px] rounded-2xl bg-white">
          <div className="flex justify-between items-start lg:items-center leading-[30px] lg:leading-[50px]">
            <h2 className="font-[Duck-cry] text-[30px] sm:text-[40px] lg:text-[50px]">STILL HAVE QUESTIONS?</h2>
            <ArrowUpRight size={"20px"} className="lg:w-[26px] lg:h-[26px] flex-shrink-0" />
          </div>
          <p className="font-[poppins] text-gray-500 flex items-center gap-2 text-sm lg:text-base">
            <div className="h-2 bg-gray-500 w-2 flex-shrink-0"/>
            We're here to help you.
          </p>
        </div>
        <div className="faq-container mt-[20px] lg:mt-[30px] font-[poppins] w-full lg:w-auto">
          {faqs.map((faq, index) => (
            <div
              key={index}
              data-testid={`faq-item-${index}`}
              className={`faq-item mb-6 lg:mb-10 bg-white shadow-sm px-4 lg:px-6 transition-all duration-300 hover:bg-[#BCBF4F] rounded-2xl py-4 lg:py-6 ${
                openFAQ === index ? "active" : ""
              }`}
            >
              <button
                data-testid={`faq-question-${index}`}
                className="faq-question flex justify-between items-start lg:items-center w-full text-left cursor-pointer text-lg lg:text-xl font-semibold text-[var(--text-primary)] hover:text-[var(--accent)] transition-colors duration-300 gap-4"
                onClick={() => toggleFAQ(index)}
              >
                <span className="flex-1">{faq.question}</span>
                <Plus
                  size={20}
                  className={`faq-icon transition-transform duration-300 flex-shrink-0 lg:w-6 lg:h-6 ${
                    openFAQ === index ? "rotate-45" : ""
                  }`}
                />
              </button>

              <div
                data-testid={`faq-answer-${index}`}
                className={`faq-answer overflow-hidden transition-all duration-300 text-[var(--text-secondary)] pr-0 lg:pr-8 text-sm lg:text-base ${
                  openFAQ === index ? "max-h-96 pt-4" : "max-h-0"
                }`}
              >
                <p>{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
