"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"

const teamMembers = [
  {
    "name": "Jacob",
    "role": "Lead Data Engineer & AI Specialist",
    "image": "/placeholder.svg?height=200&width=200",
    "bio": "Jacob is a data engineer with 2 years of experience in building scalable data solutions and 4 years of Python expertise. He has worked with global companies such as Denso, Ford, Tesco, and Aldi, helping them reduce CO2 emissions in their supply chains during his tenure at Manufacture2030. Currently, he works at SmartCurrencyExchange, specializing in data solutions for property and currency services. As an AI Champion, Jacob stays at the forefront of AI trends and tools, ensuring innovative solutions for his clients."
  }
]

const TeamCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0)

  const nextMember = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % teamMembers.length)
  }

  const prevMember = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + teamMembers.length) % teamMembers.length)
  }

  const currentMember = teamMembers[currentIndex]

  return (
    <section id="team" className="py-16 bg-slate-100">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12">Meet Our Team</h2>
        <div className="flex items-center justify-center">
          <button
            onClick={prevMember}
            className="p-2 bg-slate-300 rounded-full mr-4 hover:bg-slate-400 transition duration-300"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <div className="w-full max-w-2xl bg-white p-8 rounded-lg shadow-md flex flex-col md:flex-row items-center">
            {/* <img
              src={currentMember.image || "/placeholder.svg"}
              alt={currentMember.name}
              className="w-40 h-40 rounded-full mb-4 md:mb-0 md:mr-8"
            /> */}
            <div>
              <h3 className="text-2xl font-semibold mb-2">{currentMember.name}</h3>
              <p className="text-slate-600 mb-4">{currentMember.role}</p>
              <p>{currentMember.bio}</p>
            </div>
          </div>
          <button
            onClick={nextMember}
            className="p-2 bg-slate-300 rounded-full ml-4 hover:bg-slate-400 transition duration-300"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
      </div>
    </section>
  )
}

export default TeamCarousel

