// // MeetCRMSection.tsx
// // Yeh component HeroSection se PEHLE render karein apni page/layout file mein
// // HeroSection mein koi changes nahi karne

// import { useState } from "react";

// export function MeetCRMSection() {
//   const [isOn, setIsOn] = useState(true);
//   const [query, setQuery] = useState("");

//   return (
//     <div
//       style={{
//         width: "100%",
//         background: "#f5f5f5",
//         display: "flex",
//         flexDirection: "column",
//         alignItems: "center",
//         justifyContent: "center",
//         padding: "32px 24px 28px",

//       }}
//     >
//       {/* Heading + Toggle */}
//       <div
//         style={{
//           display: "flex",
//           alignItems: "center",
//           gap: "14px",
//           marginBottom: "28px",
//         }}
//       >
//         <h2
//           style={{
//             fontFamily: "'Duck-cry', sans-serif",
//             fontWeight: 900,
//             fontSize: "clamp(20px, 4vw, 32px)",
//             letterSpacing: "2px",
//             color: "#1F1F1F",
//             margin: 0,
//           }}
//         >
//           MEET YOUR NEW CRM
//         </h2>

//         {/* Toggle Switch */}
//         <button
//           onClick={() => setIsOn((v) => !v)}
//           aria-label="Toggle CRM"
//           style={{
//             position: "relative",
//             width: "56px",
//             height: "30px",
//             borderRadius: "999px",
//             background: isOn ? "#00e676" : "#d1d5db",
//             border: "none",
//             cursor: "pointer",
//             transition: "background 0.25s",
//             flexShrink: 0,
//             padding: 0,
//           }}
//         >
//           <span
//             style={{
//               position: "absolute",
//               top: "3px",
//               left: isOn ? "29px" : "3px",
//               width: "24px",
//               height: "24px",
//               borderRadius: "50%",
//               background: "#ffffff",
//               boxShadow: "0 1px 4px rgba(0,0,0,0.18)",
//               transition: "left 0.25s",
//               display: "block",
//             }}
//           />
//         </button>
//       </div>

//       {/* Search Bar */}
//       <div
//         style={{
//           width: "100%",
//           maxWidth: "720px",
//           display: "flex",
//           alignItems: "center",
//           border: "2.5px solid #1F1F1F",
//           borderRadius: "999px",
//           padding: "10px 20px",
//           background: "#fff",
//           gap: "12px",
//         }}
//       >
//         {/* Search Icon */}
//         <svg
//           width="26"
//           height="26"
//           viewBox="0 0 24 24"
//           fill="none"
//           stroke="#1F1F1F"
//           strokeWidth="2.2"
//           strokeLinecap="round"
//           strokeLinejoin="round"
//           style={{ flexShrink: 0 }}
//         >
//           <circle cx="11" cy="11" r="8" />
//           <line x1="21" y1="21" x2="16.65" y2="16.65" />
//         </svg>

//         {/* Input */}
//         <input
//           type="text"
//           value={query}
//           onChange={(e) => setQuery(e.target.value)}
//           placeholder=""
//           style={{
//             flex: 1,
//             border: "none",
//             outline: "none",
//             fontSize: "clamp(15px, 2vw, 18px)",
//             fontFamily: "Poppins, sans-serif",
//             color: "#1F1F1F",
//             background: "transparent",
//           }}
//         />

//         {/* Mic Icon */}
//         <svg
//           width="26"
//           height="26"
//           viewBox="0 0 24 24"
//           fill="none"
//           stroke="#1F1F1F"
//           strokeWidth="2.2"
//           strokeLinecap="round"
//           strokeLinejoin="round"
//           style={{ flexShrink: 0, cursor: "pointer" }}
//         >
//           <rect x="9" y="2" width="6" height="11" rx="3" />
//           <path d="M5 10a7 7 0 0 0 14 0" />
//           <line x1="12" y1="19" x2="12" y2="22" />
//           <line x1="9" y1="22" x2="15" y2="22" />
//         </svg>
//       </div>
//     </div>
//   );
// }

// export default MeetCRMSection;