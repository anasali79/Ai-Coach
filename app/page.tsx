"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { UserForm } from "@/components/user-form"
import { PlanDisplay } from "@/components/plan-display"
import { LoadingScreen } from "@/components/loading-screen"
import type { UserProfile, FitnessPlan } from "@/lib/types"

type AppState = "hero" | "form" | "loading" | "result"

export default function Home() {
  const [appState, setAppState] = useState<AppState>("hero")
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null)
  const [fitnessPlan, setFitnessPlan] = useState<FitnessPlan | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const handleGetStarted = () => {
    setAppState("form")
  }

  const handleFormSubmit = async (profile: UserProfile, isRegenerate = false) => {
    setUserProfile(profile)
    setIsLoading(true)

    if (!isRegenerate) {
      setAppState("loading")
    }

    try {
      const response = await fetch("/api/generate-plan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ profile, isRegenerate }),
      })

      if (!response.ok) {
        throw new Error("Failed to generate plan")
      }

      const plan: FitnessPlan = await response.json()
      setFitnessPlan(plan)
      setAppState("result")
    } catch (error) {
      console.error("Error generating plan:", error)
      alert("Failed to generate plan. Please try again.")
      if (!isRegenerate) {
        setAppState("form")
      }
    } finally {
      setIsLoading(false)
    }
  }

  const handleRegenerate = async () => {
    if (userProfile) {
      await handleFormSubmit(userProfile, true)
    }
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-6 md:py-10">
        {appState === "hero" && <HeroSection onGetStarted={handleGetStarted} />}

        {appState === "form" && (
          <div className="mx-auto max-w-2xl animate-in fade-in slide-in-from-bottom-4 duration-500">
            <UserForm onSubmit={(profile) => handleFormSubmit(profile, false)} isLoading={isLoading} />
          </div>
        )}

        {appState === "loading" && <LoadingScreen />}

        {appState === "result" && fitnessPlan && userProfile && (
          <div className="mx-auto max-w-4xl">
            <PlanDisplay
              plan={fitnessPlan}
              userProfile={userProfile}
              onRegenerate={handleRegenerate}
              isLoading={isLoading}
            />
          </div>
        )}
      </main>

      <footer className="border-t border-border/50 py-6 mt-auto">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm text-muted-foreground">
            Built with <span className="gradient-text font-semibold">AI</span> • Your fitness journey starts here
          </p>
        </div>
      </footer>
    </div>
  )
}
