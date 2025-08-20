export function monthlyPayment(principal: number, annualRatePct: number, years: number) {
  const r = (annualRatePct/100)/12, n = years*12
  if (!n || principal <= 0) return 0
  if (r === 0) return principal / n
  const f = Math.pow(1+r, n)
  return (principal * r * f) / (f - 1)
}

export function monthlyInterest(balance: number, annualRatePct: number) {
  return (balance * (annualRatePct/100)) / 12
}

export function gasImpact(gallonsPerMonth: number, deltaPerGallon: number) {
  return gallonsPerMonth * deltaPerGallon
} 