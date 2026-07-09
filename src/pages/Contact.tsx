import { useState, useRef } from "react";
import ReCAPTCHA from "react-google-recaptcha";
// import { Bracket } from "./HeroSection";
import contact_house_hero from "../assets/contact_house_hero.png";

export default function Contact() {
  const recaptchaRef = useRef<ReCAPTCHA>(null);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    companyName: "",
    websiteUrl: "",
    teamSize: "",
    jobTitle: "",
    additionalNotes: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (recaptchaRef.current) {
      const token = await recaptchaRef.current.executeAsync();
      
      if (!token) {
        alert('reCAPTCHA verification failed. Please try again.');
        return;
      }
      
      console.log('Form submitted with reCAPTCHA token', token);
      console.log('Form data:', formData);
      
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        companyName: "",
        websiteUrl: "",
        teamSize: "",
        jobTitle: "",
        additionalNotes: "",
      });
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <>
      {/* Contact Form Section */}
      <section
        id="contact"
        className="font-serif py-10 lg:py-20 bg-gradient-to-b from-card to-background"
      >
        <div className="mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Contact Image */}
            <div className="rounded-2xl lg:rounded-3xl overflow-hidden order-2 lg:order-1">
              <img 
                src={contact_house_hero} 
                alt="Contact Us" 
                className="w-full h-[300px] lg:h-full object-cover"
              />
            </div>

            {/* Contact Form */}
            <div className="bg-card rounded-2xl lg:rounded-3xl flex flex-col gap-[30px] lg:gap-[60px] p-6 lg:p-8 order-1 lg:order-2">
              <div>
                <p className="h1-style font-[Duck-cry] text-[28px] sm:text-[36px] lg:text-[44px] leading-tight text-[#1F1F1F]">
                  Stop stitching together tools.
                </p>
                <h2 className="font-[poppins] text-[16px] sm:text-[18px] lg:text-[20px] font-light text-gray-500 mt-2">
                  Start running your business on one{" "}
                  <span className="font-semibold text-[#84B900]">platform.</span>
                </h2>
              </div>
              <form
                onSubmit={handleSubmit}
                className="space-y-4 lg:space-y-6 px-0 lg:px-[30px]"
                data-testid="contact-form"
              >
                <div className="grid font-[poppins] grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      First Name *
                    </label>
                    <input 
                      type="text" 
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      required 
                      className="w-full px-4 py-3 bg-background outline-none rounded-full border border-input text-foreground" 
                      placeholder="John"
                      data-testid="input-first-name"
                    />
                  </div>
                  <div >
                    <label className="block font-[poppins] text-sm font-medium text-foreground mb-2">
                      Last Name *
                    </label>
                    <input 
                      type="text" 
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      required 
                      className="w-full px-4 py-3 bg-background outline-none  border rounded-full border-input text-foreground" 
                      placeholder="Doe"
                      data-testid="input-last-name"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-[poppins] text-sm font-medium text-foreground mb-2">
                    Email *
                  </label>
                  <input 
                    type="email" 
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required 
                    className="w-full px-4 py-3 font-[poppins]  border border-input rounded-full text-foreground outline-none  " 
                    placeholder="john@example.com"
                    data-testid="input-email"
                  />
                </div>

                <div>
                  <label className="block font-[poppins] text-sm font-medium text-foreground mb-2">
                    Phone Number *
                  </label>
                  <div className="flex items-center gap-2">
                    <span className="px-3 py-3 bg-background border border-input rounded-full text-foreground text-sm font-medium">+1</span>
                    <input 
                      type="tel" 
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required 
                      className="flex-1 font-[poppins] px-4 py-3 outline-none border border-input rounded-full text-foreground hover:border-[#84B900]/40 transition-colors" 
                      placeholder="(555) 123-4567"
                      data-testid="input-phone"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-[poppins] text-sm font-medium text-foreground mb-2">
                    Company Name *
                  </label>
                  <input 
                    type="text" 
                    name="companyName"
                    value={formData.companyName}
                    onChange={handleChange}
                    required 
                    className="w-full font-[poppins] px-4 py-3 outline-none   border border-input rounded-full text-foreground " 
                    placeholder="Acme Inc."
                    data-testid="input-company-name"
                  />
                </div>

                <div>
                  <label className="block font-[poppins] text-sm font-medium text-foreground mb-2">
                    Website URL *
                  </label>
                  <input 
                    type="text" 
                    name="websiteUrl"
                    value={formData.websiteUrl}
                    onChange={handleChange}
                    required 
                    className="w-full font-[poppins] px-4 py-3  border border-input rounded-full text-foreground outline-none  " 
                    placeholder="https://example.com"
                    data-testid="input-website-url"
                  />
                </div>

                <div className="grid font-[poppins] grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block font-[poppins] text-sm font-medium text-foreground mb-2">
                      Team Size *
                    </label>
                    <input
                      type="text"
                      name="teamSize"
                      value={formData.teamSize}
                      onChange={handleChange}
                      required
                      className="w-full font-[poppins] px-4 py-3 outline-none border border-input rounded-full text-foreground"
                      placeholder="e.g. 10-50"
                    />
                  </div>
                  <div>
                    <label className="block font-[poppins] text-sm font-medium text-foreground mb-2">
                      Job Title *
                    </label>
                    <input
                      type="text"
                      name="jobTitle"
                      value={formData.jobTitle}
                      onChange={handleChange}
                      required
                      className="w-full font-[poppins] px-4 py-3 outline-none border border-input rounded-full text-foreground"
                      placeholder="e.g. CEO"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-[poppins] text-sm font-medium text-foreground mb-2">
                    Additional Notes
                  </label>
                  <textarea 
                    name="additionalNotes"
                    value={formData.additionalNotes}
                    onChange={handleChange}
                    rows={4} 
                    className="w-full font-[poppins] px-4 py-3 border border-input rounded-lg text-foreground outline-none  " 
                    placeholder="Tell us about your project..."
                    data-testid="textarea-additional-notes"
                  ></textarea>
                </div>

                {/* reCAPTCHA */}
                <div className="flex justify-center">
                  <ReCAPTCHA
                    ref={recaptchaRef}
                    size="invisible"
                    sitekey="YOUR_RECAPTCHA_SITE_KEY_HERE"
                  />
                </div>

             <div className="w-full flex justify-center items-center">
                 <button 
                  type="submit" 
                  className=" bg-white font-[poppins] px-8 py-4 bg-gradient-to-r from-primary to-secondary text-primary-foreground font-semibold rounded-lg hover:opacity-90 transition-opacity"
                  data-testid="button-submit-form"
                >
                  Submit
                </button>
             </div>
              </form>
            </div>
          </div>
          {/* <div className="mt-[50px] lg:mt-[100px] grid grid-cols-1 lg:grid-cols-2 items-center gap-8 lg:gap-0"> */}
            {/* Left: big title with left bracket */}
            {/* <div className="flex gap-4 lg:gap-6">
             
              <div className="text-[60px] sm:text-[80px] lg:text-[120px] leading-[50px] sm:leading-[70px] lg:leading-[100px] tracking-[0px]">
                <h2 className="font-[Duck-cry]">
                  SUBSCRIBE <br />
                  TO UPDATES
                </h2> */}
        {/* </div>
            </div> */}

            {/* Right: copy + email input */}
            {/* <div className="flex flex-col lg:flex-row">
              <div className="w-full font-[poppins]">
                <h2 className="text-lg sm:text-xl lg:text-2xl font-semibold mb-2">
              Stay informed about our latest offerings and insights.
                </h2>
                <p className="text-sm text-muted mb-4 lg:mb-6">We respect your privacy and protect your information.</p>

                <div className="relative">
                  <div className="flex  sm:flex-row bg-white border border-gray-200 rounded-full shadow-sm overflow-hidden">
              <input 
                type="email" 
                      placeholder="Your email here"
                      className="flex-1 px-4 sm:px-6 py-3 sm:py-4 text-gray-600 placeholder-gray-400 bg-transparent outline-none"
                    />
                    <button className="px-4 sm:px-6 py-2 sm:py-3 rounded-full bg-[#111111] text-white font-medium text-sm sm:text-base">
                      Join us
              </button>
                  </div>
                </div>
              </div>

            </div> */}
          {/* </div> */}
        </div>
      </section>
    </>
  );
}
