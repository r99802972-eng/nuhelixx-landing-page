const Footer = () => {
  return (
    <section className="font-[poppins] flex justify-center flex-col items-center w-full min-h-[10vh] bg-[#1C211C]">
      <div className="max-w-7xl mx-auto w-full py-4 px-4">
        <div className="w-full h-full">
         <p className="text-center text-white">
          ©2026 NuHelixX RE, LLC
         </p>
        </div>
      </div>

      {/* Microformats h-product — machine-readable, visually hidden */}
      <div className="h-product sr-only">
        <h2 className="p-name">NuHelixX RE</h2>
        <p className="p-category">AI Real Estate CRM</p>
        <p className="p-category">Brokerage Software</p>
        <p className="p-category">Real Estate Automation Platform</p>
        <p className="e-description">
          NuHelixX RE is an AI-powered real estate CRM and brokerage software platform built on
          one intelligent database. It helps brokerages automate workflows, manage transactions,
          organize client data, and grow more efficiently.
        </p>
        <a className="u-url" href="https://nuhelixxre.com/">https://nuhelixxre.com/</a>
        <div className="p-brand h-card">
          <span className="p-name">NuHelixX RE</span>
          <a className="u-url" href="https://nuhelixxre.com/">Website</a>
        </div>
        <div className="p-price">
          <span className="p-value">399</span>
          <span className="p-currency">USD</span>
          <span className="p-unit">per user per month</span>
        </div>
      </div>
    </section>
  );
};

export default Footer;
