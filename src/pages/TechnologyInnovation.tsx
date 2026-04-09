"use client"
import { useState } from "react"
import { ChevronRight } from "lucide-react"

export default function TechnologyInnovation() {
  const [open, setOpen] = useState(false)
  return (
    <section className="w-full py-16 mt-36 px-0">
      <div className="w-full px-0">
        {/* CLICKABLE HEADING */}
        <button
          onClick={() => setOpen(!open)}
          className="flex w-full items-center justify-center gap-4"
        >
         <h1 
  className="text-center mb-2 text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-[75px]"
  style={{
    fontFamily: 'ITC, sans-serif',
    color: '#212529',
    fontWeight: 'bold',
  }}
>
  TECHNOLOGY <br />
  INNOVATION
</h1>
         <ChevronRight
  className={`h-8 w-8 sm:h-10 sm:w-10 lg:h-12 lg:w-12 flex-shrink-0 transition-transform duration-300 ${
    open ? "rotate-90" : ""
  }`}
/>
        </button>
        {/* ACCORDION CONTENT */}
        <div
          className={`grid justify-items-start transition-all duration-500 ease-in-out ${
            open ? "grid-rows-[1fr] opacity-100 mt-14"
                 : "grid-rows-[0fr] opacity-0 mt-0"
          }`}
        >
          <div className="overflow-hidden">
            <div className="space-y-12 text-left">
              <Item
                title="WHAT IS AN AI-TRAINED CRM?"
                text="NuHelixX RE uses adaptive intelligence to learn how your team works. It analyzes patterns, automates repetitive tasks, and recommends smart actions—turning your CRM into a system that improves every day."
              />
              <Item
                title="HOW AI IMPROVES LEAD CONVERSION"
                text="AI identifies your highest-value leads, recommends ideal follow-up timing, and predicts which agents are most likely to convert. This gives your team a major advantage with significantly less manual effort."
              />
              <Item
                title="AUTOMATION THAT REDUCES WORKLOAD"
                text="The CRM automatically creates tasks, drafts messages, summarizes calls, and flags missing information. Agents spend less time on admin and more time on income-producing activities."
              />
              <Item
                title="AI-Powered Employee Training"
                text="NuHelixX RE trains your team as they work. Real-time coaching, personalized recommendations, and micro-lessons improve adoption and reduce the training burden for brokers."
              />
             <Item
                title="Smarter Brokerage Oversight"
                text="AI surfaces bottlenecks, forecast trends, and identifies deal risks. Brokers gain clearer insights and make better decisions in less time"
              /> <Item
                title="Why It Matters"
                text="An AI-trained CRM delivers faster growth, higher agent adoption, better client experiences,and a system that becomes more valuable every day it’s used."
              />

            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function Item({ title, text }: { title: string; text: string }) {
  return (
    <div className="mb-4">
      <h4 
        className="text-4xl font-bold mb-2.5"
        style={{ 
          color: '#212529',
          fontFamily: 'Barlow, sans-serif'
        }}
      >
        {title}
      </h4>
      <p 
        className="text-xl mb-4"
        style={{ 
          color: '#212529',
          fontFamily: '"Averta Demo", sans-serif',
          lineHeight: '1.5'
        }}
      >
        {text}
      </p>
    </div>
  )
}