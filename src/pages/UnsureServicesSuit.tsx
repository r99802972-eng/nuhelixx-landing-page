interface Product {
  name: string;
  headerColor: string;
  columnBgColor: string;
  platforms: string[];
  features: {
    [key: string]: boolean | string | null;
  };
  licensing: string;
  pricing: string;
  discounts: string;
  dotColor?: string;
  para: string;
  para_2: string;
  para_3: string;
  para_4: string;
}

import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

const products: Product[] = [
  {
    name: "NuHelixX RE",
    headerColor: "#5A9D3D",
    columnBgColor: "#F0F5E8",
    platforms: ["Windows", "Mac"],
    features: {
      "Capture Images": true,
      "Edit Images": true,
      "Record Video": true,
      "Video Trimming": true,
      "Edit Video": false,
      "Media Hosting": false,
      Quizzing: false,
      "Import Media with TechSmith Fuse": true,
    },
    para:"AI-first, built into the DNA—auto-tagging, follow-ups, property matching, client insights.",
    para_2:"Enter once; flows across CRM, MLS, contracts, and dashboards.",
    para_3:"Buyer & Seller Portals: alerts, favorites, property views, secure messaging, real-time updates.",
    para_4:"Enter once; flows across CRM, MLS, contracts, and dashboards.",
    licensing: "per user",
    pricing: "$49.95",
    discounts: "commercial, education, government, multi-user",
    dotColor: "#0D5A7A",
  },
  {
    name: "BoldTrail (formerly kvCORE)",
    headerColor: "#006CFF",
    columnBgColor: "#eef4ff",
    platforms: ["Windows", "Mac"],
    features: {
      "Capture Images": false,
      "Edit Images": false,
      "Record Video": true,
      "Video Trimming": true,
      "Edit Video": true,
      "Media Hosting": false,
      Quizzing: true,
      "Import Media with TechSmith Fuse": true,
    },
    licensing: "per user",
    pricing: "$199",
    discounts: "commercial, education, government, multi-user",
    dotColor: "#5A9D3D",
    para:"AI add-ons; limited native integration.",
    para_2:"AI add-ons; limited native integration.",
    para_3:"Buyer alerts; limited seller tools.",
    para_4:"AI add-ons; limited native integration."
  },
  {
    name: "BoomTown",
    headerColor: "#006CFF",
    columnBgColor: "#eef4ff",
    platforms: ["Windows"],
    features: {
      "Capture Images": false,
      "Edit Images": false,
      "Record Video": true,
      "Video Trimming": true,
      "Edit Video": true,
      "Media Hosting": false,
      Quizzing: false,
      "Import Media with TechSmith Fuse": false,
    },
    licensing: "per user",
    pricing: "$1,995",
    discounts: "commercial, education, government",
    para:"Some automation; not AI-first.",
    para_2:"Agent-siloed; manual syncs common.",
    para_3:"Basic portals; limited seller transparency.",
    para_4:"Some automation; not AI-first.",
    dotColor: "#2B7A8F",
  },
  {
    name: "Real Geeks",
    headerColor: "#006CFF",
    columnBgColor: "#eef4ff",
    platforms: ["Windows", "Mac"],
    features: {
      "Capture Images": false,
      "Edit Images": false,
      "Record Video": true,
      "Video Trimming": true,
      "Edit Video": false,
      "Media Hosting": true,
      Quizzing: true,
      "Import Media with TechSmith Fuse": true,
    },
    licensing: "per user, based on minimum FTE",
    pricing: "contact us for a custom quote",
    discounts: "commercial, education",
    dotColor: "#C41E3A",
    para:"Minimal automation; no AI-first design.",
    para_2:"Agent-siloed; manual syncs common.",
    para_3:"Mostly IDX; limited client features.",
    para_4:"Minimal automation; no AI-.",
  },
];


export default function UnsureServicesSuit() {
  const downloadPDF = async () => {
    try {
      const element = document.getElementById('comparison-table');
      if (!element) {
        console.error('Table element not found');
        return;
      }

      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        allowTaint: true,
      });

      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');

      const imgWidth = 210;
      const pageHeight = 295;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;

      let position = 0;

      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      pdf.save('NuHelixX_RE_Comparison.pdf');
    } catch (error) {
      console.error('Error generating PDF:', error);
    }
  };

  return (
    <div className="overflow-x-auto rounded-lg">
      <div className="text-center font-[Duck-cry] mt-[20px] relative">
        <h1 className="text-[3rem] tracking-[0.02em] mb-3">
          Head to Head Comparison 
        </h1>
        <p className="text-[3rem] tracking-[0.02em]">
          NuHelixX RE vs. Current Market (Post-kvCORE Rebrand)cd
        </p>
   <button
  onClick={downloadPDF}
  className="mx-auto lg:absolute lg:top-24 lg:right-14 bg-[#84B900] hover:bg-[#407700] text-black px-4 sm:px-6 md:px-6 py-2 sm:py-2.5 md:py-2.5 rounded-xl sm:rounded-2xl flex items-center gap-2 transition-colors shadow-lg text-sm sm:text-base md:text-lg lg:text-xl font-semibold mt-6 mb-12 lg:mt-0 lg:mb-0"
  style={{ fontFamily: 'Barlow, sans-serif' }}
>
  <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
  </svg>
  <span className="whitespace-nowrap">Download PDF</span>
</button>
      </div>
      <table id="comparison-table" className="w-full border-collapse mt-[50px] font-[poppins]">
        <thead>
          <tr>
            <th className="w-1/5 border border-gray-200 p-4 text-left font-semibold text-sm">Feature / Capability</th>
            {products.map((product) => (
              <th
                key={product.name}
                className="w-1/5 bg-transparent border border-gray-200 p-4 text-center font-bold text-white text-sm"
                style={{ backgroundColor: product.headerColor }}
              >
                {product.name}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {/* Static rows to match the screenshot content */}
          {(
            [
              {
                key: "Platform Type",
                values: [
                  "Single unified system (built as one)",
                  "Ecosystem platform (merged products)",
                  "Lead-gen + CRM platform",
                  "Website + CRM combo",
                ],
              },
              {
                key: "Architecture Reality",
                values: [
                  "Single database (true unified)",
                  "Integrated stack (kvCORE core + add-ons)",
                  "Integrated system",
                  "Connected tools",
                ],
              },
              {
                key: "AI Positioning",
                values: [
                  "Core system (AI-native)",
                  "AI-powered CRM + automation layers",
                  "Predictive analytics",
                  "Limited AI",
                ],
              },
              {
                key: "Lead Generation",
                values: [
                  "Built-in + AI optimized",
                  "Built-in lead engine + marketplace",
                  "Paid lead gen + services",
                  "Built-in websites + capture",
                ],
              },
              {
                key: "Automation Type",
                values: [
                  "Adaptive AI automation",
                  "Behavioral + rule-based smart campaigns",
                  "Structured automation",
                  "Basic / trigger-based",
                ],
              },
              {
                key: "Workflow (Lead → Close)",
                values: [
                  "Fully unified",
                  "Expanding toward unified workflows",
                  "Strong but segmented",
                  "Agent-managed",
                ],
              },
              {
                key: "Calling / Communication",
                values: [
                  "Native + AI parsing capable",
                  "Multi-channel marketing tools",
                  "Built-in + integrations",
                  "External tools",
                ],
              },
              {
                key: "Pricing Model",
                values: [
                  "Flat, all-inclusive",
                  "Quote-based / bundled ecosystem",
                  "High-cost + ad spend",
                  "Tiered",
                ],
              },
              {
                key: "Typical Cost",
                values: [
                  "~$399–$499/user",
                  "~$499+/month starting",
                  "$1k–$1.5k+/mo + ads",
                  "~$250–$400/mo",
                ],
              },
              {
                key: "Ease of Use",
                values: [
                  "Single interface",
                  "Improved UI but layered system",
                  "Complex",
                  "Simple",
                ],
              },
              {
                key: "Scalability",
                values: [
                  "Built for teams + enterprise",
                  "Strong brokerage ecosystem",
                  "Enterprise-focused",
                  "Agent → small teams",
                ],
              },
              {
                key: "Customization / Branding",
                values: [
                  "Full control",
                  "Configurable within ecosystem",
                  "Limited",
                  "Moderate",
                ],
              },
              {
                key: "Dependency on Add-ons",
                values: [
                  "None",
                  "Moderate–high (ecosystem model)",
                  "Moderate",
                  "Moderate",
                ],
              },
              {
                key: "Core Weakness",
                values: [
                  "New entrant",
                  "Still a bundled stack, not truly unified",
                  "Expensive",
                  "Limited depth",
                ],
              },
            ]
          ).map((row) => (
            <tr key={row.key}>
              <td className="bg-transparent border border-gray-200 p-4 font-semibold text-sm text-gray-900">
                {row.key}
              </td>
              {row.values.map((v, i) => (
                <td key={`${row.key}-${i}`} className="border border-gray-200 p-4 text-center" style={{ backgroundColor: products[i]?.columnBgColor }}>
                  <div className="text-sm">{v}</div>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
