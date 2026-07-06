import { useState } from "react";
import { Plus, Phone, Mail } from "lucide-react";

export default function FAQSection() {
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);

  const faqs = [
    {
      question: "What services do you offer?",
      answer:
        "We offer a range of services including CRM consulting, optimization, and custom marketing solutions. Our packages are designed to cater to various business needs, from entry-level support to comprehensive revenue operations leadership. Each service is tailored to help you achieve your growth objectives.",
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
        {/* CTA Card */}
        <div className="mt-[20px] lg:mt-[30px] w-full lg:w-[38%] flex-shrink-0 bg-white rounded-2xl p-6 flex flex-col gap-4 self-start">
          <div className="flex flex-col gap-2">
            <h2 className="font-[Duck-cry] text-[32px] sm:text-[40px] text-black leading-tight">What You're Replacing</h2>
            <p className="font-[poppins] text-gray-500 text-base">Most teams today operate with:</p>
            <ul className="font-[poppins] text-base text-gray-700 space-y-1">
              {["CRM","Lead gen platform","Dialer","Email/SMS tools","Transaction management","Reporting dashboards"].map((item, i) => (
                <li key={i} className="flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-red-100 text-red-500 flex items-center justify-center text-xs font-bold flex-shrink-0">{i + 1}</span>
                  {item}
                </li>
              ))}
            </ul>
            <p className="font-[poppins] text-base font-semibold text-black mt-1 mb-2">NuHelixX RE replaces all of it — with one platform.</p>
          </div>
          <div className="flex flex-col sm:flex-row lg:flex-col gap-3">
            <a
              href="tel:+1234567890"
              className="flex items-center justify-center gap-2 bg-[#84B900] hover:bg-[#6a9600] text-white font-semibold font-[poppins] px-6 py-3 rounded-full transition-colors text-sm"
            >
              <Phone size={16} />
              Schedule a Call
            </a>
            <a
              href="mailto:info@nuhelixxre.com"
              className="flex items-center justify-center gap-2 bg-gray-100 hover:bg-gray-200 text-black font-semibold font-[poppins] px-6 py-3 rounded-full transition-colors text-sm"
              >
              <Mail size={16} />
              Email Us
            </a>
          </div>
        </div>
        <div className="faq-container mt-[20px] lg:mt-[30px] font-[poppins] w-full">
          {faqs.map((faq, index) => (
            <div
              key={index}
              data-testid={`faq-item-${index}`}
              className={`faq-item mb-6 lg:mb-10 bg-white shadow-sm px-4 lg:px-6 transition-all duration-300 hover:bg-[#84B900]/10 rounded-2xl py-4 lg:py-6 ${
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
