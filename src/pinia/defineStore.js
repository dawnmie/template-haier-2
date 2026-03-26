import { defineStore as useStore } from 'pinia'
import pinia from '@/pinia'

// 二次改造 defineStore
export const defineStore = (...args) => {
  const store = useStore(...args)
  return (p = pinia) => store(p)
}
