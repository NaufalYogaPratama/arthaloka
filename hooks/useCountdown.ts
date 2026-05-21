'use client'

import { useState, useEffect, useRef, useCallback } from 'react'

interface UseCountdownReturn {
  secondsLeft: number
  isRunning: boolean
  isDone: boolean
  startCountdown: () => void
  resetCountdown: () => void
}

export function useCountdown(durationSeconds: number = 10): UseCountdownReturn {
  const [secondsLeft, setSecondsLeft] = useState(durationSeconds)
  const [isRunning, setIsRunning]     = useState(false)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  const clearTimer = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
      intervalRef.current = null
    }
  }, [])

  const startCountdown = useCallback(() => {
    clearTimer()
    setSecondsLeft(durationSeconds)
    setIsRunning(true)

    intervalRef.current = setInterval(() => {
      setSecondsLeft(prev => {
        if (prev <= 1) {
          clearTimer()
          setIsRunning(false)
          return 0
        }
        return prev - 1
      })
    }, 1000)
  }, [durationSeconds, clearTimer])

  const resetCountdown = useCallback(() => {
    clearTimer()
    setSecondsLeft(durationSeconds)
    setIsRunning(false)
  }, [durationSeconds, clearTimer])

  useEffect(() => {
    return () => clearTimer()  // cleanup on unmount
  }, [clearTimer])

  return {
    secondsLeft,
    isRunning,
    isDone: !isRunning && secondsLeft === 0,
    startCountdown,
    resetCountdown,
  }
}
