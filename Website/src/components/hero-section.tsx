"use client"

import { useState, useEffect } from "react"
import { Star, Download, Check } from "lucide-react"
import { useTheme } from "next-themes"
import RotatingPhone from "./rotating-phone"

const features = [
  "Browse trending movies",
  "Search, view details, and save to watchlist",
  "Watch trailer here, before watching movies",
  "Profile with login/logout",

]

export default function HeroSection() {
  const { theme } = useTheme()
  const [visibleFeatures, setVisibleFeatures] = useState<number[]>([])

  useEffect(() => {
    features.forEach((_, index) => {
      setTimeout(() => {
        setVisibleFeatures((prev) => [...prev, index])
      }, index * 500)
    })
  }, [])

  const handleDownload = () => {
    // Direct download URL for the APK file
    const downloadUrl = "https://github.com/SimpleCyber/Movie-App/raw/main/movieApp.apk"
    window.open(downloadUrl, "_blank")
  }

  return (
    <section className="min-h-screen pt-16" style={{ backgroundColor: theme === "dark" ? "#030014" : "#ffffff" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <div className="space-y-6">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight font-poppins">
                <span style={{ color: theme === "dark" ? "#d6c7ff" : "#030014" }}>Discover Movies with </span>
                <span className="gradient-text">Smart Recommendations</span>
              </h1>

              {/* Animated Features List */}
              <div className="space-y-4">
                <h3
                  className="text-xl font-semibold font-poppins"
                  style={{ color: theme === "dark" ? "#ac7ffe" : "#7c3aed" }}
                >
                  Features:
                </h3>
                <div className="space-y-3">
                  {features.map((feature, index) => (
                    <div
                      key={index}
                      className={`flex items-center gap-3 transition-all duration-500 ${
                        visibleFeatures.includes(index) ? "opacity-100 translate-x-0" : "opacity-0 translate-x-4"
                      }`}
                    >
                      <div
                        className="w-6 h-6 rounded-full flex items-center justify-center"
                        style={{ backgroundColor: "#ac7ffe" }}
                      >
                        <Check className="w-4 h-4 text-white" />
                      </div>
                      <span className="text-lg" style={{ color: theme === "dark" ? "#a8b5db" : "#4b5563" }}>
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Download Button */}
            <button
              onClick={handleDownload}
              className="flex items-center gap-3 px-8 py-4 text-lg font-semibold rounded-xl transition-all duration-300 transform hover:scale-105 group"
              style={{ backgroundColor: "#ac7ffe", color: "white" }}
            >
              <Download className="w-5 h-5 group-hover:animate-bounce" />
              Download APK
            </button>

            {/* Rating */}
            <div
              className="flex items-center gap-3 p-4 rounded-xl w-fit border"
              style={{
                backgroundColor: theme === "dark" ? "rgba(34, 31, 61, 0.5)" : "rgba(248, 250, 252, 0.8)",
                borderColor: theme === "dark" ? "#221f3d" : "#e5e7eb",
              }}
            >
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <span
                className="text-lg font-semibold font-poppins"
                style={{ color: theme === "dark" ? "#d6c7ff" : "#030014" }}
              >
                4.9 out of 5
              </span>
            </div>
          </div>

          {/* Right Content - Phone Mockup */}
          <div className="flex justify-center lg:justify-end">
            <RotatingPhone />
          </div>
        </div>
      </div>
    </section>
  )
}
