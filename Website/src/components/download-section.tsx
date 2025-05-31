"use client"

import { Download, Github } from "lucide-react"
import { useTheme } from "next-themes"

export default function DownloadSection() {
  const { theme } = useTheme()

  const handleDownload = () => {
    // Direct download URL for the APK file
    const downloadUrl = "https://github.com/SimpleCyber/Movie-App/raw/main/movieApp.apk"
    window.open(downloadUrl, "_blank")
  }

  return (
    <section
      id="download"
      className="py-20"
      style={{
        background:
          theme === "dark"
            ? "linear-gradient(135deg, rgba(172, 127, 254, 0.1), rgba(147, 51, 234, 0.1))"
            : "#f9fafb",
      }}
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="space-y-8">
          <h2
            className="text-3xl sm:text-4xl font-bold font-poppins"
            style={{ color: theme === "dark" ? "#d6c7ff" : "#030014" }}
          >
            Ready to Discover Amazing Movies?
          </h2>
          <p className="text-xl" style={{ color: theme === "dark" ? "#9ca4ab" : "#6b7280" }}>
            Download the app now and start building your perfect watchlist
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <button
              onClick={handleDownload}
              className="flex items-center gap-3 px-8 py-4 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105"
              style={{ backgroundColor: "#ac7ffe", color: "white" }}
            >
              <Download className="w-5 h-5" />
              Download APK
            </button>

            <a
              href="https://github.com/SimpleCyber/Movie-App"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 px-8 py-4 rounded-xl font-semibold transition-all duration-300 border"
              style={{
                backgroundColor: theme === "dark" ? "#030014" : "#ffffff",
                borderColor: theme === "dark" ? "#221f3d" : "#ac7ffe",
                color: theme === "dark" ? "#d6c7ff" : "#ac7ffe",
              }}
            >
              <Github className="w-5 h-5" />
              View Source Code
            </a>
          </div>

          <div
            className="rounded-xl p-6 max-w-2xl mx-auto border"
            style={{
              backgroundColor: theme === "dark" ? "rgba(3, 0, 20, 0.5)" : "rgba(255, 255, 255, 0.9)",
              borderColor: theme === "dark" ? "#221f3d" : "#e5e7eb",
            }}
          >
            <h3 className="text-lg font-semibold mb-3 font-poppins" style={{ color: "#ac7ffe" }}>
              Development Phases
            </h3>
            <div className="grid sm:grid-cols-2 gap-4 text-left">
              <div>
                <h4 className="font-medium mb-2" style={{ color: theme === "dark" ? "#d6c7ff" : "#030014" }}>
                  ✅ Phase 1: Setup & Configuration
                </h4>
                <p className="text-sm" style={{ color: theme === "dark" ? "#9ca4ab" : "#6b7280" }}>
                  Initial setup with Expo and Tailwind integration
                </p>
              </div>
              <div>
                <h4 className="font-medium mb-2" style={{ color: theme === "dark" ? "#d6c7ff" : "#030014" }}>
                  ✅ Phase 2: Navigation Setup
                </h4>
                <p className="text-sm" style={{ color: theme === "dark" ? "#9ca4ab" : "#6b7280" }}>
                  Bottom navigation with Home, Search, Saved, Profile
                </p>
              </div>
              <div>
                <h4 className="font-medium mb-2" style={{ color: theme === "dark" ? "#d6c7ff" : "#030014" }}>
                  ✅ Phase 3: App Customization
                </h4>
                <p className="text-sm" style={{ color: theme === "dark" ? "#9ca4ab" : "#6b7280" }}>
                  Custom app title, icon, and video integration
                </p>
              </div>
              <div>
                <h4 className="font-medium mb-2" style={{ color: theme === "dark" ? "#d6c7ff" : "#030014" }}>
                  ✅ Phase 4: Feature Development
                </h4>
                <p className="text-sm" style={{ color: theme === "dark" ? "#9ca4ab" : "#6b7280" }}>
                  Search, details, save functionality with APIs
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
