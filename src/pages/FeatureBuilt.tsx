"use client"
import { useState } from "react"
import { ChevronRight } from "lucide-react"

export default function TechnologyInnovation() {
  const [open, setOpen] = useState(false)
  return (
    <section className="w-full py-16 mt-16 px-0">
      <div className="w-full px-0">
        {/* CLICKABLE HEADING */}
        <div className="flex flex-col items-center">
          <button
            onClick={() => setOpen(!open)}
            className="flex w-full items-center justify-center gap-4"
          >
          <h1 
  className="text-center mb-2 text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-[70px]"
  style={{
    fontFamily: 'ITC, sans-serif',
    color: '#212529',
    fontWeight: 'bold',
  }}
>
  FEATURES BUILT FOR <br />
   REAL ESTATE TEAMS
</h1><ChevronRight
  className={`h-8 w-8 sm:h-10 sm:w-10 lg:h-12 lg:w-12 flex-shrink-0 transition-transform duration-300 ${
    open ? "rotate-90" : ""
  }`}
/>
          </button>
          
          {/* SUBTITLE - Only visible when accordion is open */}
          {open && (
            <p 
              className="text-left text-base sm:text-lg lg:text-xl mt-4 md:mt-6 w-full"
              style={{ 
                color: '#212529',
                fontFamily: '"Averta Demo", sans-serif',
                lineHeight: '1.6'
              }}
            >
              NuHelixX RE is designed for teams, brokerages, independent agents, and agent–brokers. Every feature reduces manual work, improves performance, and supports scalable growth.
            </p>
          )}
        </div>

        {/* ACCORDION CONTENT */}
        <div
          className={`grid justify-items-start transition-all duration-500 ease-in-out ${
            open ? "grid-rows-[1fr] opacity-100 mt-14"
                 : "grid-rows-[0fr] opacity-0 mt-0"
          }`}
        >
          <div className="overflow-hidden">
            <div className="space-y-16 text-left">
              <Item
                title="AI-Trained CRM That Adapts to Your Business"
                description="NuHelixX RE adjusts to your workflows, follow-up habits, and market behavior with:"
                points={[
                  "Evolving lead scoring",
                  "Smart follow-up timing",
                  "Contextual task suggestions",
                  "Alerts for stalled deals"
                ]}
                footer="The system improves continuously as your data grows."
              />
              <Item
                title="AI-Powered Coaching and Onboarding"
                description="Training happens within the workflow. Agents get:"
                points={[
                  "Real-time prompts",
                  "Best-practice reminders",
                  "Micro-learning based on actions",
                  "Adoption dashboards for leadership"
                ]}
              />
              <Item
                title="Intelligent Lead Routing"
                description="Routes leads to the agent most likely to convert them based on performance, skill, or geography. Fair, optimized, and automated."
              />
              <Item
                title="Smart Automation That Replaces Assistant-Level Work"
                description="NuHelixX RE eliminates 10–20 hours of admin per week with:"
                points={[
                  "Auto-created tasks & reminders",
                  "AI messages & call summaries",
                  "Marketing copy generation",
                  "Transaction and deadline monitoring",
                  "Automatic pipeline updates"
                ]}
              />
              <Item
                title="For Independent Agents"
                description="Operate like a team with:"
                points={[
                  "Automated communication",
                  "Zero manual data entry for most tasks",
                  "AI-backed nurturing and follow-up",
                  "Full transaction visibility"
                ]}
              />
              <Item
                title="For Agent–Brokers"
                description="Balance production with leadership using:"
                points={[
                  "Routing controls",
                  "Compliance oversight",
                  "Team analytics",
                  "Automated follow-up systems"
                ]}
              />
              <Item
                title="For Teams and Brokerages"
                description="Support complex structures with:"
                points={[
                  "Office & team-level configuration",
                  "White-label branding",
                  "Contact ownership rules",
                  "Centralized reporting and compliance tools"
                ]}
              />
              <Item
                title="Team & Brokerage-Level Analytics"
                description="Track production, bottlenecks, source ROI, revenue forecasts, and activity levels to improve performance and coaching."
              />
              <Item
                title="Compliance & Risk Support"
                description="Document reminders, deadline alerts, configurable rules, and audit-ready logs reduce liability and keep transactions clean."
              />
              <Item
                title="One Platform That Scales With You"
                description="From solo agents to enterprise teams, NuHelixX RE grows with your business and provides assistant-level support through AI—without increasing payroll."
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function Item({ 
  title, 
  description, 
  points, 
  footer 
}: { 
  title: string
  description?: string
  points?: string[]
  footer?: string
}) {
  return (
    <div className="mb-4">
      <h4 
        className="text-4xl font-bold mb-4"
        style={{ 
          color: '#212529',
          fontFamily: 'Barlow, sans-serif'
        }}
      >
        {title}
      </h4>
      {description && (
        <p 
          className="text-xl mb-3"
          style={{ 
            color: '#212529',
            fontFamily: '"Averta Demo", sans-serif',
            lineHeight: '1.6'
          }}
        >
          {description}
        </p>
      )}
      {points && (
        <ul className="mb-3 space-y-1.5" style={{ listStyleType: 'disc', paddingLeft: '1.5rem' }}>
          {points.map((point, index) => (
            <li 
              key={index}
              className="text-xl"
              style={{ 
                color: '#212529',
                fontFamily: '"Averta Demo", sans-serif',
                lineHeight: '1.6',
                display: 'list-item'
              }}
            >
              {point}
            </li>
          ))}
        </ul>
      )}
      {footer && (
        <p 
          className="text-xl mt-2"
          style={{ 
            color: '#212529',
            fontFamily: '"Averta Demo", sans-serif',
            lineHeight: '1.6',
           
          }}
        >
          {footer}
        </p>
      )}
    </div>
  )
}