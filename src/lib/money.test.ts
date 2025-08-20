import { describe, it, expect } from 'vitest'
import { monthlyPayment, monthlyInterest, gasImpact } from './money'

describe('money utils', () => {
  it('monthlyInterest basic', () => {
    expect(monthlyInterest(20000, 5.5)).toBeCloseTo(91.666, 2) // ~$91.67/mo
  })
  
  it('gasImpact', () => {
    expect(gasImpact(60, 0.10)).toBe(6)
  })
  
  it('monthlyPayment zero rate', () => {
    expect(monthlyPayment(12000, 0, 1)).toBeCloseTo(1000, 2)
  })
  
  it('monthlyPayment standard case', () => {
    expect(monthlyPayment(400000, 6.5, 30)).toBeCloseTo(2528.27, 2)
  })
  
  it('monthlyPayment edge cases', () => {
    expect(monthlyPayment(0, 5, 30)).toBe(0)
    expect(monthlyPayment(100000, 5, 0)).toBe(0)
  })
}) 