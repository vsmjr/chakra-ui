import { percentToValue, toNumber, valueToPercent } from "."

describe("Number utils tests", () => {
  it("should transform percentage to value based on max value", () => {
    const percentage = percentToValue(0.5, 0, 10)
    expect(percentage).toBe(5)
  })

  it("should transform value to percentage based on max value", () => {
    const percentage = valueToPercent(3, 0, 10)
    expect(percentage).toBe(30)
  })

  it("should transform anything to number", () => {
    const number1 = toNumber("1")
    const number2 = toNumber(2)
    const number3 = toNumber("Oi tudo bem?")

    expect(number1).toBe(1)
    expect(number2).toBe(2)
    expect(number3).toBe(0)
  })
})
