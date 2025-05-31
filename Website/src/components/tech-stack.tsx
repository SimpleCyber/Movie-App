"use client"

import { useTheme } from "next-themes"

const technologies = [
  { name: "React Native", color: "#61dafb" },
  { name: "Expo", color: "#000020" },
  { name: "NativeWind", color: "#06b6d4" },
  { name: "Appwrite", color: "#f02e65" },
  { name: "TMDB API", color: "#01b4e4" },
  { name: "TypeScript", color: "#3178c6" },
]

export default function TechStack() {
  const { theme } = useTheme()

  return (
    <section id="tech" className="py-16" style={{ backgroundColor: theme === "dark" ? "#030014" : "#ffffff" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2
            className="text-2xl sm:text-3xl font-bold mb-4 font-poppins"
            style={{ color: theme === "dark" ? "#d6c7ff" : "#030014" }}
          >
            Built with Modern Technologies
          </h2>
          <p style={{ color: theme === "dark" ? "#9ca4ab" : "#6b7280" }}>
            Leveraging the latest tools and frameworks for optimal performance
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-4">
          {technologies.map((tech, index) => (
            <div
              key={index}
              className="flex items-center gap-3 rounded-full px-6 py-3 transition-all duration-300 hover:scale-105 border"
              style={{
                backgroundColor: theme === "dark" ? "rgba(34, 31, 61, 0.3)" : "rgba(248, 250, 252, 0.8)",
                borderColor: theme === "dark" ? "#221f3d" : "#e5e7eb",
              }}
            >
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: tech.color }}></div>
              <span className="font-medium" style={{ color: theme === "dark" ? "#d6c7ff" : "#030014" }}>
                {tech.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
