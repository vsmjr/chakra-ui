import {
  clampValue,
  countDecimalPlaces,
  percentToValue,
  roundValueToStep,
  toNumber,
  toPrecision,
  valueToPercent,
} from "."

describe("Number utils tests", () => {
  it("should transform anything to number", () => {
    const number1 = toNumber("1")
    const number2 = toNumber(2)
    const number3 = toNumber("Oi tudo bem?")

    expect(number1).toBe(1)
    expect(number2).toBe(2)
    expect(number3).toBe(0)
  })

  it("should transform value to a specific precision", () => {
    const precision1 = toPrecision(500000, 2)
    const precision2 = toPrecision(5, 10)
    const precision3 = toPrecision(5)
    expect(precision1).toBe("500000.00")
    expect(precision2).toBe("5.0000000000")
    expect(precision3).toBe("5")
  })

  it("should counts the number of decimal places a number has", () => {
    const counter1 = countDecimalPlaces(50.0)
    const counter2 = countDecimalPlaces(50.1234)
    const counter3 = countDecimalPlaces(0 / 0)
    expect(counter1).toBe(0)
    expect(counter2).toBe(4)
    expect(counter3).toBe(0)
  })

  it("should transform value to percentage based on max value", () => {
    const percentage = valueToPercent(3, 0, 10)
    expect(percentage).toBe(30)
  })

  it("should transform percentage to value based on max value", () => {
    const percentage1 = percentToValue(0.5, 0, 10)
    const percentage2 = percentToValue(0 / 0, 0, 10)
    expect(percentage1).toBe(5)
    expect(percentage2).toBeNaN()
  })

  it("should rounds a specific value to the next or previous step", () => {
    const rounded1 = roundValueToStep(4, 0, 10)
    const rounded2 = roundValueToStep(4.9999999999999999, 0, 10)
    const rounded3 = roundValueToStep(5, 0, 10)
    const rounded4 = roundValueToStep(6, 0, 10)
    expect(rounded1).toBe("0")
    expect(rounded2).toBe("10")
    expect(rounded3).toBe("10")
    expect(rounded4).toBe("10")
  })

  it("should truncate a value to ensure it stays between a range", () => {
    const truncate1 = clampValue(4, 0, 10)
    const truncate2 = clampValue(4.9999999999999999, 1, 10)
    const truncate3 = clampValue(4.25, 1, 10)
    const truncate4 = clampValue(0, 1, 10)
    const truncate5 = clampValue(11, 1, 10)
    const truncate6 = clampValue(11, 11, 10)
    const truncate7 = clampValue(null, 1, 10)
    expect(truncate1).toBe(4)
    expect(truncate2).toBe(5)
    expect(truncate3).toBe(4.25)
    expect(truncate4).toBe(1)
    expect(truncate5).toBe(10)
    expect(truncate5).toBeLessThan(11)
    expect(truncate6).toBeLessThan(11)
    expect(truncate7).toBe(null)
  })
})
