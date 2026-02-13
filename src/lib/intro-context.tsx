"use client"

import { createContext, useContext } from "react"

const IntroContext = createContext(true)

export const IntroProvider = IntroContext.Provider

export function useIntroComplete() {
  return useContext(IntroContext)
}
