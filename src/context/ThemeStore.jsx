import { create } from 'zustand'

 export const useThemeStore = create((set) => ({
    bgColor: "amber-50",
    changeBgColor: (color) => set({ bgColor: color}),
  }));