"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import type { UserProfile } from "@/lib/types"
import {
  UserIcon,
  ScaleIcon,
  TargetIcon,
  ActivityIcon,
  HomeIcon,
  BuildingIcon,
  TreesIcon,
  LeafIcon,
  BeefIcon,
  FlameIcon,
  ChevronRightIcon,
  ChevronLeftIcon,
  HeartPulseIcon,
  ZapIcon,
  CheckIcon,
} from "@/components/icons"
import { cn } from "@/lib/utils"

interface UserFormProps {
  onSubmit: (profile: UserProfile) => void
  isLoading: boolean
}

const steps = [
  { id: 1, title: "Basic Info", icon: UserIcon },
  { id: 2, title: "Body Stats", icon: ScaleIcon },
  { id: 3, title: "Goals", icon: TargetIcon },
  { id: 4, title: "Preferences", icon: ActivityIcon },
]

export function UserForm({ onSubmit, isLoading }: UserFormProps) {
  const [currentStep, setCurrentStep] = useState(1)
  const [profile, setProfile] = useState<Partial<UserProfile>>({
    gender: "male",
    fitnessGoal: "weight-loss",
    fitnessLevel: "beginner",
    workoutLocation: "gym",
    dietaryPreference: "non-veg",
    stressLevel: "medium",
  })

  const handleNext = () => {
    if (currentStep < 4) setCurrentStep(currentStep + 1)
  }

  const handleBack = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1)
  }

  const handleSubmit = () => {
    if (profile.name && profile.age && profile.height && profile.weight) {
      onSubmit(profile as UserProfile)
    }
  }

  const updateProfile = (updates: Partial<UserProfile>) => {
    setProfile((prev) => ({ ...prev, ...updates }))
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-center">
        <div className="flex items-center gap-1 sm:gap-2 p-1.5 rounded-2xl glass">
          {steps.map((step, index) => {
            const Icon = step.icon
            const isActive = currentStep === step.id
            const isComplete = currentStep > step.id
            return (
              <div key={step.id} className="flex items-center">
                <button
                  onClick={() => setCurrentStep(step.id)}
                  className={cn(
                    "relative flex items-center gap-2 rounded-xl px-3 sm:px-4 py-2.5 text-sm font-medium transition-all duration-300",
                    isActive
                      ? "bg-primary text-primary-foreground shadow-lg shadow-primary/25"
                      : isComplete
                        ? "bg-primary/15 text-primary"
                        : "text-muted-foreground hover:text-foreground hover:bg-secondary/50",
                  )}
                >
                  {isComplete ? (
                    <div className="flex h-4 w-4 items-center justify-center rounded-full bg-primary">
                      <CheckIcon className="h-2.5 w-2.5 text-primary-foreground" />
                    </div>
                  ) : (
                    <Icon className="h-4 w-4" />
                  )}
                  <span className="hidden sm:inline">{step.title}</span>
                </button>
                {index < steps.length - 1 && (
                  <div
                    className={cn(
                      "mx-1 sm:mx-2 h-0.5 w-4 sm:w-8 rounded-full transition-all duration-500",
                      isComplete ? "bg-primary" : "bg-border",
                    )}
                  />
                )}
              </div>
            )
          })}
        </div>
      </div>

      <Card className="glass-card border-0 shadow-xl shadow-black/5 dark:shadow-black/20 overflow-hidden">
        <CardContent className="p-6 md:p-8 lg:p-10">
          {/* Step 1: Basic Info */}
          {currentStep === 1 && (
            <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-300">
              <div className="space-y-2 text-center">
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 mb-4">
                  <UserIcon className="h-7 w-7 text-primary" />
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold">Let's get to know you</h2>
                <p className="text-muted-foreground">Tell us about yourself to personalize your plan</p>
              </div>
              <div className="grid gap-6 max-w-md mx-auto">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-sm font-medium">
                    Your Name
                  </Label>
                  <Input
                    id="name"
                    placeholder="Enter your name"
                    value={profile.name || ""}
                    onChange={(e) => updateProfile({ name: e.target.value })}
                    className="h-12 rounded-xl bg-secondary/50 border-0 focus-visible:ring-2 focus-visible:ring-primary/50"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="age" className="text-sm font-medium">
                      Age
                    </Label>
                    <Input
                      id="age"
                      type="number"
                      placeholder="25"
                      value={profile.age || ""}
                      onChange={(e) => updateProfile({ age: Number.parseInt(e.target.value) })}
                      className="h-12 rounded-xl bg-secondary/50 border-0 focus-visible:ring-2 focus-visible:ring-primary/50"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm font-medium">Gender</Label>
                    <div className="grid grid-cols-3 gap-2">
                      {(["male", "female", "other"] as const).map((gender) => (
                        <button
                          key={gender}
                          onClick={() => updateProfile({ gender })}
                          className={cn(
                            "rounded-xl px-3 py-3 text-sm font-medium capitalize transition-all duration-200",
                            profile.gender === gender
                              ? "bg-primary text-primary-foreground shadow-md shadow-primary/25"
                              : "bg-secondary/50 hover:bg-secondary text-foreground",
                          )}
                        >
                          {gender}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Body Stats */}
          {currentStep === 2 && (
            <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-300">
              <div className="space-y-2 text-center">
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 mb-4">
                  <ScaleIcon className="h-7 w-7 text-primary" />
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold">Your Body Stats</h2>
                <p className="text-muted-foreground">Help us calculate your ideal plan</p>
              </div>
              <div className="grid gap-6 max-w-md mx-auto">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="height" className="text-sm font-medium">
                      Height (cm)
                    </Label>
                    <Input
                      id="height"
                      type="number"
                      placeholder="175"
                      value={profile.height || ""}
                      onChange={(e) => updateProfile({ height: Number.parseInt(e.target.value) })}
                      className="h-12 rounded-xl bg-secondary/50 border-0 focus-visible:ring-2 focus-visible:ring-primary/50"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="weight" className="text-sm font-medium">
                      Weight (kg)
                    </Label>
                    <Input
                      id="weight"
                      type="number"
                      placeholder="70"
                      value={profile.weight || ""}
                      onChange={(e) => updateProfile({ weight: Number.parseInt(e.target.value) })}
                      className="h-12 rounded-xl bg-secondary/50 border-0 focus-visible:ring-2 focus-visible:ring-primary/50"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="sleep" className="text-sm font-medium">
                    Sleep Hours (per night)
                  </Label>
                  <Input
                    id="sleep"
                    type="number"
                    placeholder="7"
                    value={profile.sleepHours || ""}
                    onChange={(e) => updateProfile({ sleepHours: Number.parseInt(e.target.value) })}
                    className="h-12 rounded-xl bg-secondary/50 border-0 focus-visible:ring-2 focus-visible:ring-primary/50"
                  />
                </div>
                <div className="space-y-3">
                  <Label className="text-sm font-medium">Stress Level</Label>
                  <div className="grid grid-cols-3 gap-3">
                    {(["low", "medium", "high"] as const).map((level) => (
                      <button
                        key={level}
                        onClick={() => updateProfile({ stressLevel: level })}
                        className={cn(
                          "rounded-xl px-4 py-4 text-sm font-medium capitalize transition-all duration-200",
                          profile.stressLevel === level
                            ? "bg-primary text-primary-foreground shadow-md shadow-primary/25"
                            : "bg-secondary/50 hover:bg-secondary text-foreground",
                        )}
                      >
                        {level}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Goals */}
          {currentStep === 3 && (
            <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-300">
              <div className="space-y-2 text-center">
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 mb-4">
                  <TargetIcon className="h-7 w-7 text-primary" />
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold">Your Fitness Goals</h2>
                <p className="text-muted-foreground">What do you want to achieve?</p>
              </div>
              <div className="grid gap-6 max-w-lg mx-auto">
                <div className="space-y-3">
                  <Label className="text-sm font-medium">Fitness Goal</Label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {[
                      { id: "weight-loss", label: "Weight Loss", icon: FlameIcon },
                      { id: "muscle-gain", label: "Muscle Gain", icon: DumbbellIcon },
                      { id: "maintenance", label: "Maintenance", icon: ScaleIcon },
                      { id: "endurance", label: "Endurance", icon: HeartPulseIcon },
                      { id: "flexibility", label: "Flexibility", icon: ActivityIcon },
                    ].map(({ id, label, icon: Icon }) => (
                      <button
                        key={id}
                        onClick={() => updateProfile({ fitnessGoal: id as UserProfile["fitnessGoal"] })}
                        className={cn(
                          "flex flex-col items-center gap-3 rounded-2xl p-4 transition-all duration-200 hover-lift",
                          profile.fitnessGoal === id
                            ? "bg-primary text-primary-foreground shadow-lg shadow-primary/25"
                            : "bg-secondary/50 hover:bg-secondary text-foreground",
                        )}
                      >
                        <Icon className="h-6 w-6" />
                        <span className="text-sm font-medium">{label}</span>
                      </button>
                    ))}
                  </div>
                </div>
                <div className="space-y-3">
                  <Label className="text-sm font-medium">Fitness Level</Label>
                  <div className="grid grid-cols-3 gap-3">
                    {(["beginner", "intermediate", "advanced"] as const).map((level) => (
                      <button
                        key={level}
                        onClick={() => updateProfile({ fitnessLevel: level })}
                        className={cn(
                          "flex flex-col items-center gap-2 rounded-2xl p-4 transition-all duration-200 hover-lift",
                          profile.fitnessLevel === level
                            ? "bg-primary text-primary-foreground shadow-lg shadow-primary/25"
                            : "bg-secondary/50 hover:bg-secondary text-foreground",
                        )}
                      >
                        <ZapIcon className="h-5 w-5" />
                        <span className="text-sm font-medium capitalize">{level}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 4: Preferences */}
          {currentStep === 4 && (
            <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-300">
              <div className="space-y-2 text-center">
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 mb-4">
                  <ActivityIcon className="h-7 w-7 text-primary" />
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold">Your Preferences</h2>
                <p className="text-muted-foreground">Customize your workout and diet</p>
              </div>
              <div className="grid gap-6 max-w-lg mx-auto">
                <div className="space-y-3">
                  <Label className="text-sm font-medium">Workout Location</Label>
                  <div className="grid grid-cols-3 gap-3">
                    {[
                      { id: "home", label: "Home", icon: HomeIcon },
                      { id: "gym", label: "Gym", icon: BuildingIcon },
                      { id: "outdoor", label: "Outdoor", icon: TreesIcon },
                    ].map(({ id, label, icon: Icon }) => (
                      <button
                        key={id}
                        onClick={() => updateProfile({ workoutLocation: id as UserProfile["workoutLocation"] })}
                        className={cn(
                          "flex flex-col items-center gap-3 rounded-2xl p-4 transition-all duration-200 hover-lift",
                          profile.workoutLocation === id
                            ? "bg-primary text-primary-foreground shadow-lg shadow-primary/25"
                            : "bg-secondary/50 hover:bg-secondary text-foreground",
                        )}
                      >
                        <Icon className="h-6 w-6" />
                        <span className="text-sm font-medium">{label}</span>
                      </button>
                    ))}
                  </div>
                </div>
                <div className="space-y-3">
                  <Label className="text-sm font-medium">Dietary Preference</Label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {[
                      { id: "veg", label: "Vegetarian", icon: LeafIcon },
                      { id: "non-veg", label: "Non-Veg", icon: BeefIcon },
                      { id: "vegan", label: "Vegan", icon: LeafIcon },
                      { id: "keto", label: "Keto", icon: FlameIcon },
                    ].map(({ id, label, icon: Icon }) => (
                      <button
                        key={id}
                        onClick={() => updateProfile({ dietaryPreference: id as UserProfile["dietaryPreference"] })}
                        className={cn(
                          "flex flex-col items-center gap-2 rounded-2xl p-4 transition-all duration-200 hover-lift",
                          profile.dietaryPreference === id
                            ? "bg-primary text-primary-foreground shadow-lg shadow-primary/25"
                            : "bg-secondary/50 hover:bg-secondary text-foreground",
                        )}
                      >
                        <Icon className="h-5 w-5" />
                        <span className="text-xs font-medium">{label}</span>
                      </button>
                    ))}
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="medical" className="text-sm font-medium">
                    Medical History (Optional)
                  </Label>
                  <Textarea
                    id="medical"
                    placeholder="Any injuries, conditions, or allergies we should know about..."
                    value={profile.medicalHistory || ""}
                    onChange={(e) => updateProfile({ medicalHistory: e.target.value })}
                    className="min-h-[100px] resize-none rounded-xl bg-secondary/50 border-0 focus-visible:ring-2 focus-visible:ring-primary/50"
                  />
                </div>
              </div>
            </div>
          )}

          <div className="mt-10 flex items-center justify-between max-w-lg mx-auto">
            <Button
              variant="ghost"
              onClick={handleBack}
              disabled={currentStep === 1}
              className="gap-2 rounded-xl text-muted-foreground hover:text-foreground"
            >
              <ChevronLeftIcon className="h-4 w-4" />
              Back
            </Button>
            {currentStep < 4 ? (
              <Button
                onClick={handleNext}
                className="gap-2 rounded-xl px-6 shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 transition-all"
              >
                Next
                <ChevronRightIcon className="h-4 w-4" />
              </Button>
            ) : (
              <Button
                onClick={handleSubmit}
                disabled={isLoading || !profile.name || !profile.age || !profile.height || !profile.weight}
                className="gap-2 rounded-xl px-8 shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 transition-all"
              >
                {isLoading ? (
                  <>
                    <LoaderIcon className="h-4 w-4 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <SparklesIcon className="h-4 w-4" />
                    Generate Plan
                  </>
                )}
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

function DumbbellIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M14.4 14.4 9.6 9.6" />
      <path d="M18.657 21.485a2 2 0 1 1-2.829-2.828l-1.767 1.768a2 2 0 1 1-2.829-2.829l6.364-6.364a2 2 0 1 1 2.829 2.829l-1.768 1.767a2 2 0 1 1 2.828 2.829z" />
      <path d="m21.5 21.5-1.4-1.4" />
      <path d="M3.9 3.9 2.5 2.5" />
      <path d="M6.404 12.768a2 2 0 1 1-2.829-2.829l1.768-1.767a2 2 0 1 1-2.828-2.829l2.828-2.828a2 2 0 1 1 2.829 2.828l1.767-1.768a2 2 0 1 1 2.829 2.829z" />
    </svg>
  )
}

function SparklesIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z" />
      <path d="M20 3v4" />
      <path d="M22 5h-4" />
      <path d="M4 17v2" />
      <path d="M5 18H3" />
    </svg>
  )
}

function LoaderIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 2v4" />
      <path d="m16.2 7.8 2.9-2.9" />
      <path d="M18 12h4" />
      <path d="m16.2 16.2 2.9 2.9" />
      <path d="M12 18v4" />
      <path d="m4.9 19.1 2.9-2.9" />
      <path d="M2 12h4" />
      <path d="m4.9 4.9 2.9 2.9" />
    </svg>
  )
}
