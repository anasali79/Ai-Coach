"use client"

import { useEffect, useState } from "react"
import { DumbbellIcon, SparklesIcon, SaladIcon } from "@/components/icons"

const loadingMessages = [
  "Analyzing your fitness profile...",
  "Crafting personalized workouts...",
  "Balancing your nutrition plan...",
  "Adding motivational insights...",
  "Finalizing your AI-powered plan...",
]

export function LoadingScreen() {
  const [messageIndex, setMessageIndex] = useState(0)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const messageInterval = setInterval(() => {
      setMessageIndex((prev) => (prev + 1) % loadingMessages.length)
    }, 2500)

    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 95) return prev
        return prev + Math.random() * 15
      })
    }, 500)

    return () => {
      clearInterval(messageInterval)
      clearInterval(progressInterval)
    }
  }, [])

  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-4">
      <div className="relative">
        {/* Outer glow ring */}
        <div className="absolute inset-0 rounded-full bg-primary/20 blur-2xl animate-pulse scale-150" />

        {/* Spinning ring */}
        <div className="relative h-28 w-28">
          <svg className="h-28 w-28 animate-spin" style={{ animationDuration: "3s" }} viewBox="0 0 100 100">
            <circle
              cx="50"
              cy="50"
              r="45"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="text-secondary"
            />
            <circle
              cx="50"
              cy="50"
              r="45"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="round"
              strokeDasharray="70 200"
              className="text-primary"
            />
          </svg>

          {/* Center icon */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-primary to-primary/80 shadow-xl shadow-primary/30">
              <SparklesIcon className="h-8 w-8 text-primary-foreground animate-pulse" />
            </div>
          </div>
        </div>
      </div>

      <div className="mt-10 flex items-center gap-8">
        <div className="animate-float">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
            <DumbbellIcon className="h-6 w-6 text-primary" />
          </div>
        </div>
        <div className="animate-float-delay-1">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent/10">
            <SparklesIcon className="h-6 w-6 text-accent" />
          </div>
        </div>
        <div className="animate-float-delay-2">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
            <SaladIcon className="h-6 w-6 text-primary" />
          </div>
        </div>
      </div>

      <div className="mt-10 text-center">
        <h3 className="text-2xl font-bold">Creating Your Plan</h3>
        <p className="mt-3 text-muted-foreground h-6 transition-all duration-300">{loadingMessages[messageIndex]}</p>
      </div>

      <div className="mt-8 w-72">
        <div className="flex items-center justify-between text-sm mb-2">
          <span className="text-muted-foreground">Progress</span>
          <span className="font-medium text-primary">{Math.min(Math.round(progress), 95)}%</span>
        </div>
        <div className="h-2 w-full overflow-hidden rounded-full bg-secondary">
          <div
            className="h-full rounded-full bg-gradient-to-r from-primary to-accent transition-all duration-500 ease-out"
            style={{ width: `${Math.min(progress, 95)}%` }}
          />
        </div>
      </div>

      <div className="mt-10 max-w-sm text-center">
        <p className="text-sm text-muted-foreground">
          <span className="font-medium text-foreground">Pro tip:</span> Consistency is key. Even 15 minutes of daily
          exercise can make a significant difference.
        </p>
      </div>
    </div>
  )
}
