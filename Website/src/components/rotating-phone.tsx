"use client"

import { useState, useEffect } from "react"
import Image from "next/image"

const screenshots = [
  { src: "/images/home.jpg", alt: "Home Screen", title: "Home" },
  { src: "/images/detail.jpg", alt: "Movie Details", title: "Details" },
  { src: "/images/search.jpg", alt: "Search Movies", title: "Search" },
  { src: "/images/profile.jpg", alt: "User Profile", title: "Profile" },
  { src: "/images/saved.jpg", alt: "Saved Movies", title: "Saved" },
]

export default function RotatingPhone() {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % screenshots.length)
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="relative">
      {/* Phone Frame */}
      <div
        className="relative w-[300px] h-[600px] rounded-[3rem] p-3 shadow-2xl"
        style={{ background: "linear-gradient(145deg, #374151, #1f2937)" }}
      >
        <div className="w-full h-full bg-black rounded-[2.5rem] overflow-hidden relative border-2 border-gray-700">
          {/* Status Bar */}
          <div
            className="absolute top-0 left-0 right-0 h-10 z-10 flex items-center justify-between px-6 text-white text-sm"
            style={{ background: "linear-gradient(90deg, #1f2937, #000000)" }}
          >
            <span className="font-medium">9:41</span>
            <div className="flex items-center gap-2">
              <div className="flex gap-1">
                <div className="w-1 h-1 bg-white rounded-full"></div>
                <div className="w-1 h-1 bg-white rounded-full"></div>
                <div className="w-1 h-1 bg-white/50 rounded-full"></div>
              </div>
              <div className="w-6 h-3 border border-white rounded-sm relative">
                <div className="w-4 h-2 bg-green-500 rounded-sm absolute top-0.5 left-0.5"></div>
              </div>
            </div>
          </div>

          {/* Screen Content */}
          <div className="pt-10 h-full relative overflow-hidden">
            <Image
              src={screenshots[currentIndex].src || "/placeholder.svg"}
              alt={screenshots[currentIndex].alt}
              fill
              className="object-cover transition-all duration-600"
              style={{
                filter: "brightness(0.9)",
                objectPosition: "center top",
              }}
            />
          </div>

          {/* Home indicator */}
          <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-white/30 rounded-full"></div>
        </div>
      </div>

      {/* Indicators */}
      <div className="flex justify-center mt-6 gap-2">
        {screenshots.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className="w-3 h-3 rounded-full transition-all duration-300"
            style={{
              backgroundColor: index === currentIndex ? "#ac7ffe" : "rgba(156, 164, 171, 0.5)",
              transform: index === currentIndex ? "scale(1.25)" : "scale(1)",
            }}
          />
        ))}
      </div>

      {/* Current Screen Label */}
      <div className="text-center mt-4">
        <span className="font-medium font-poppins" style={{ color: "#ac7ffe" }}>
          {screenshots[currentIndex].title}
        </span>
      </div>
    </div>
  )
}
