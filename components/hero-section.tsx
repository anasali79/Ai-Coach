"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { DumbbellIcon, SparklesIcon, SaladIcon, ZapIcon, ChevronRightIcon, RefreshIcon } from "@/components/icons"
import { cn } from "@/lib/utils"

interface HeroSectionProps {
  onGetStarted: () => void
}

export function HeroSection({ onGetStarted }: HeroSectionProps) {
  const [motivationQuote, setMotivationQuote] = useState<string>("")
  const [isLoadingQuote, setIsLoadingQuote] = useState(true)

  const fetchMotivationQuote = async () => {
    setIsLoadingQuote(true)
    try {
      const response = await fetch("/api/generate-motivation")
      const data = await response.json()
      if (data.quotes && data.quotes.length > 0) {
        const randomQuote = data.quotes[Math.floor(Math.random() * data.quotes.length)]
        setMotivationQuote(randomQuote)
      }
    } catch (error) {
      console.error("Failed to fetch motivation:", error)
      setMotivationQuote("Your transformation starts with a single step. Make it today.")
    } finally {
      setIsLoadingQuote(false)
    }
  }

  useEffect(() => {
    fetchMotivationQuote()
  }, [])

  return (
    <div className="relative overflow-hidden py-12 md:py-20 lg:py-28">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {/* Gradient orbs */}
        <div className="absolute -right-32 -top-32 h-96 w-96 rounded-full bg-gradient-to-br from-primary/20 to-transparent blur-3xl animate-float" />
        <div className="absolute -bottom-32 -left-32 h-96 w-96 rounded-full bg-gradient-to-tr from-accent/15 to-transparent blur-3xl animate-float-delay-1" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[500px] w-[500px] rounded-full bg-gradient-to-r from-primary/5 via-transparent to-accent/5 blur-3xl" />

        {/* Grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,oklch(0.5_0_0/0.03)_1px,transparent_1px),linear-gradient(to_bottom,oklch(0.5_0_0/0.03)_1px,transparent_1px)] bg-[size:4rem_4rem]" />
      </div>

      <div className="relative">
        <div className="flex justify-center mb-8">
          <div className="inline-flex items-center gap-2 rounded-full glass px-5 py-2.5 text-sm animate-scale-in">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
            </span>
            <span className="font-medium text-foreground/80">AI-Powered Fitness Coach</span>
            <ChevronRightIcon className="h-4 w-4 text-muted-foreground" />
          </div>
        </div>

        <h1 className="mx-auto max-w-4xl text-center text-4xl font-bold tracking-tight text-balance sm:text-5xl md:text-6xl lg:text-7xl">
          Transform Your Body
          <br />
          <span className="gradient-text animate-gradient">with AI Intelligence</span>
        </h1>

        <p className="mx-auto mt-6 max-w-2xl text-center text-base text-muted-foreground text-pretty sm:text-lg md:text-xl leading-relaxed">
          Get custom workout routines and nutrition plans tailored to your unique goals, body type, and lifestyle. Real
          results, powered by advanced AI.
        </p>

        <div className="mx-auto mt-8 max-w-2xl">
          <div className="glass-card rounded-2xl p-6 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-accent/5" />
            <div className="relative flex items-start gap-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-primary/20 to-primary/5">
                <SparklesIcon className="h-5 w-5 text-primary" />
              </div>
              <div className="flex-1">
                {isLoadingQuote ? (
                  <div className="space-y-2">
                    <div className="h-4 w-3/4 bg-secondary/50 rounded animate-pulse" />
                    <div className="h-4 w-1/2 bg-secondary/50 rounded animate-pulse" />
                  </div>
                ) : (
                  <p className="text-foreground/90 italic leading-relaxed">"{motivationQuote}"</p>
                )}
                <p className="mt-2 text-xs text-muted-foreground">AI Generated Motivation</p>
              </div>
              <button
                onClick={fetchMotivationQuote}
                disabled={isLoadingQuote}
                className="flex h-8 w-8 items-center justify-center rounded-lg hover:bg-secondary/50 transition-colors disabled:opacity-50"
              >
                <RefreshIcon className={cn("h-4 w-4 text-muted-foreground", isLoadingQuote && "animate-spin")} />
              </button>
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button
            onClick={onGetStarted}
            size="lg"
            className="h-14 gap-3 rounded-full px-8 text-base font-semibold shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 transition-all duration-300 hover:scale-[1.02]"
          >
            <ZapIcon className="h-5 w-5" />
            Start Your Journey
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="h-14 gap-2 rounded-full px-8 text-base font-medium bg-transparent hover:bg-secondary/50"
          >
            <SparklesIcon className="h-5 w-5" />
            How it Works
          </Button>
        </div>

        <div className="mt-16 flex flex-wrap items-center justify-center gap-8 md:gap-16">
          {[
            { value: "10K+", label: "Active Users" },
            { value: "50K+", label: "Plans Generated" },
            { value: "98%", label: "Satisfaction" },
          ].map((stat, i) => (
            <div key={i} className="text-center">
              <div className="text-3xl font-bold gradient-text">{stat.value}</div>
              <div className="text-sm text-muted-foreground mt-1">{stat.label}</div>
            </div>
          ))}
        </div>

        <div className="mx-auto mt-20 grid max-w-4xl gap-4 sm:grid-cols-3 px-4">
          {[
            {
              icon: DumbbellIcon,
              title: "Smart Workouts",
              description: "AI-generated exercise routines adapted to your level",
              delay: "0ms",
            },
            {
              icon: SaladIcon,
              title: "Nutrition Plans",
              description: "Personalized meals based on your dietary preferences",
              delay: "100ms",
            },
            {
              icon: SparklesIcon,
              title: "Daily Insights",
              description: "AI-powered tips and motivation to keep you on track",
              delay: "200ms",
            },
          ].map((feature, index) => (
            <div
              key={index}
              className={cn(
                "group relative rounded-2xl glass-card p-6 transition-all duration-300 hover-lift cursor-pointer",
                "animate-scale-in",
              )}
              style={{ animationDelay: feature.delay }}
            >
              {/* Hover glow effect */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              <div className="relative">
                <div className="mb-4 inline-flex rounded-xl bg-gradient-to-br from-primary/20 to-primary/5 p-3.5 transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-primary/20">
                  <feature.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
