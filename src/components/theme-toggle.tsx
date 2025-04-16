"use client"

import { useState, useEffect, useRef } from "react"
import { flushSync } from "react-dom"
import { Moon, Sun } from "lucide-react"
import { Switch } from "@/components/ui/switch"
import { cn } from "@/lib/utils"

export function ThemeToggle() {
  const [isDarkMode, setIsDarkMode] = useState(false)
  const thumbRef = useRef<HTMLDivElement | null>(null)

  const toggleDarkMode = async (checked: boolean) => {
    if (
      !thumbRef.current ||
      !document.startViewTransition ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      setIsDarkMode(checked)
      return
    }

    await document.startViewTransition(() => {
      flushSync(() => {
        setIsDarkMode(checked)
      })
    }).ready

    const { top, left, width, height } = thumbRef.current.getBoundingClientRect()
    const x = left + width / 2
    const y = top + height / 2
    const right = window.innerWidth - left
    const bottom = window.innerHeight - top
    const maxRadius = Math.hypot(Math.max(left, right), Math.max(top, bottom))

    document.documentElement.animate(
      {
        clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${maxRadius}px at ${x}px ${y}px)`],
      },
      {
        duration: 500,
        easing: "ease-in-out",
        pseudoElement: "::view-transition-new(root)",
      },
    )
  }

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }
  }, [isDarkMode])

  return (
    <div className="fixed top-4 right-4 z-50">
      <div className="relative">
        <Switch
          checked={isDarkMode}
          onCheckedChange={toggleDarkMode}
          className="h-7 w-12 [&>span]:bg-transparent"
        />
        <div
          ref={thumbRef}
          className={cn(
            "absolute top-[2px] left-[2px] flex h-6 w-6 items-center justify-center rounded-full bg-white transition-transform duration-200 pointer-events-none",
            isDarkMode && "translate-x-5 bg-gray-800",
          )}
        >
          {isDarkMode ? <Moon className="h-3 w-3 text-yellow-300" /> : <Sun className="h-3 w-3 text-yellow-500" />}
        </div>
      </div>
    </div>
  )
}