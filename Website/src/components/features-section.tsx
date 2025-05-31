"use client"

import { Search, Heart, Play, User, Database, Smartphone } from "lucide-react"
import { useTheme } from "next-themes"

const features = [
  {
    icon: Search,
    title: "Smart Search",
    description: "Search movies via TMDB API with intelligent recommendations based on your preferences.",
  },
  {
    icon: Heart,
    title: "Save & Watchlist",
    description: "Save your favorite movies and create custom watchlists with Appwrite database integration.",
  },
  {
    icon: Play,
    title: "Movie Details & Trailers",
    description: "Get detailed movie information including posters, trailers, and comprehensive descriptions.",
  },
  {
    icon: User,
    title: "Profile Management",
    description: "Login/logout functionality with personalized notes and custom movie lists.",
  },
  {
    icon: Database,
    title: "Cloud Storage",
    description: "Your saved movies are stored securely in the cloud using Appwrite database.",
  },
  {
    icon: Smartphone,
    title: "Native Experience",
    description: "Built with React Native and Expo for smooth, native mobile performance.",
  },
]

export default function FeaturesSection() {
  const { theme } = useTheme()

  return (
    <section id="features" className="py-20" style={{ backgroundColor: theme === "dark" ? "#151312" : "#f9fafb" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2
            className="text-3xl sm:text-4xl font-bold mb-4 font-poppins"
            style={{ color: theme === "dark" ? "#d6c7ff" : "#030014" }}
          >
            Powerful Features for Movie Lovers
          </h2>
          <p className="text-xl max-w-3xl mx-auto" style={{ color: theme === "dark" ? "#9ca4ab" : "#6b7280" }}>
            Built with cutting-edge technologies including React Native, Expo, NativeWind, Appwrite, and TMDB API for
            the ultimate movie discovery experience.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="rounded-xl p-6 transition-all duration-300 group hover:scale-105 border"
              style={{
                backgroundColor: theme === "dark" ? "rgba(34, 31, 61, 0.3)" : "rgba(255, 255, 255, 0.8)",
                borderColor: theme === "dark" ? "#221f3d" : "#e5e7eb",
              }}
            >
              <div
                className="w-12 h-12 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform"
                style={{ backgroundColor: "rgba(172, 127, 254, 0.1)" }}
              >
                <feature.icon className="w-6 h-6" style={{ color: "#ac7ffe" }} />
              </div>
              <h3
                className="text-xl font-semibold mb-3 font-poppins"
                style={{ color: theme === "dark" ? "#d6c7ff" : "#030014" }}
              >
                {feature.title}
              </h3>
              <p className="leading-relaxed" style={{ color: theme === "dark" ? "#9ca4ab" : "#6b7280" }}>
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
