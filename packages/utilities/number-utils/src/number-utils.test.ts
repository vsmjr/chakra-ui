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
  // function toNumber
  // converte um valor de qualquer tipo em um número
  // refatoração do teste, dividindo nos casos possiveis (2) e aumentando a cobertura
  it("should transform any valuable value into number", () => {
    expect(toNumber("1")).toBe(1)
    expect(toNumber(2)).toBe(2)
    expect(toNumber("-123")).toBe(-123)
    expect(toNumber("  123  ")).toBe(123)
    expect(toNumber("1.23")).toBe(1.23)
    expect(toNumber("-1.23")).toBe(-1.23)
    expect(toNumber("Oi tudo bem?")).toBe(0)
  })
  // function toNumber
  // refatoração do teste, dividindo nos casos possiveis (2) e aumentando a cobertura
  it("should return 0 when the value is not a number", () => {
    expect(toNumber(undefined)).toBe(0)
    expect(toNumber(null)).toBe(0)
    expect(toNumber("")).toBe(0)
    expect(toNumber("minhastring")).toBe(0)
    expect(toNumber("000string")).toBe(0)
    expect(toNumber({})).toBe(0)
    expect(toNumber([])).toBe(0)
  })

  // function toPrecision
  // converte um valor para uma string com as casas decimais informadas
  // refatoração do teste, dividindo nos casos possíveis (3) e aumentando a cobertura
  it("should convert when the precision is not specified", () => {
    expect(toPrecision(5)).toBe("5")
    expect(toPrecision(5.4321)).toBe("5.4321")
  })
  // function toPrecision
  // converte um valor para uma string com as casas decimais informadas
  // refatoração do teste, dividindo nos casos possíveis (3) e aumentando a cobertura
  it("should convert when the precision is specified", () => {
    expect(toPrecision(500000, 2)).toBe("500000.00")
    expect(toPrecision(5, 10)).toBe("5.0000000000")
  })
  // function toPrecision
  // converte um valor para uma string com as casas decimais informadas
  // refatoração do teste, dividindo nos casos possíveis (3) e aumentando a cobertura
  it("should return 0 when the value is not valid or the precision is equal to 0", () => {
    expect(toPrecision(undefined)).toBe("0")
    expect(toPrecision(null)).toBe("0")
    expect(toPrecision("")).toBe("0")
    expect(toPrecision("abc")).toBe("0")
    expect(toPrecision("123abc")).toBe("123")
    expect(toPrecision({})).toBe("0")
    expect(toPrecision([])).toBe("0")
    expect(toPrecision(5)).toBe("5")
    expect(toPrecision(5.4321)).toBe("5.4321")
  })

  // function countDecimalPlaces
  // conta a quantidade de casas decimais que um número possui
  // refatoração do teste, dividindo nos casos possíveis (2) e aumentando a cobertura
  it("should return 0 if the value is not a valid number", () => {
    expect(countDecimalPlaces(0 / 0)).toBe(0)
    expect(countDecimalPlaces(undefined)).toBe(0)
    expect(countDecimalPlaces(null)).toBe(0)
    expect(countDecimalPlaces(NaN)).toBe(0)
    expect(countDecimalPlaces(Infinity)).toBe(0)
    expect(countDecimalPlaces(-Infinity)).toBe(0)
    expect(countDecimalPlaces("")).toBe(0)
    expect(countDecimalPlaces("abc")).toBe(0)
    expect(countDecimalPlaces("123abc")).toBe(0)
    expect(countDecimalPlaces({})).toBe(0)
    expect(countDecimalPlaces([])).toBe(0)
  })
  // function countDecimalPlaces
  // conta a quantidade de casas decimais que um número possui
  // refatoração do teste, dividindo nos casos possíveis (2) e aumentando a cobertura
  it("should counts the number of decimal places a valid number has", () => {
    expect(countDecimalPlaces(50)).toBe(0)
    expect(countDecimalPlaces(50.0)).toBe(0)
    expect(countDecimalPlaces(50.1234)).toBe(4)
    expect(countDecimalPlaces(0.5)).toBe(1)
    expect(countDecimalPlaces(50.1234)).toBe(4)
  })

  // function valueToPercent
  // retorna quantos % o valor informado representa em um range de valores
  // refatoração do teste, dividindo nos casos possíveis (2) e aumentando a cobertura
  it("should transform value to percentage based on max and min values", () => {
    expect(valueToPercent(0, 0, 10)).toBe(0)
    expect(valueToPercent(3, 0, 10)).toBe(30)
    expect(valueToPercent(10, 0, 10)).toBe(100)
    expect(valueToPercent(0.3, 0, 1)).toBe(30)
    expect(valueToPercent(-5, -10, 0)).toBe(50)
    expect(valueToPercent(5, -10, 10)).toBe(75)
  })
  // function valueToPercent
  // retorna quantos % o valor informado representa em um range de valores
  // refatoração do teste, dividindo nos casos possíveis (2) e aumentando a cobertura
  it("should return NaN when the value is not a number", () => {
    expect(valueToPercent(undefined, 0, 100)).toBe(NaN)
    expect(valueToPercent(null, 0, 100)).toBe(0)
    expect(valueToPercent("abc", 0, 100)).toBe(NaN)
    expect(valueToPercent({}, 0, 100)).toBe(NaN)
    expect(valueToPercent([], 0, 100)).toBe(0)
  })

  // function percentToValue
  // retorna o valor que representa o % indicado dentro de um range de números
  // refatoração do teste, dividindo nos casos possíveis (2) e aumentando a cobertura
  it("should transform percentage to value based on % and ranges", () => {
    expect(percentToValue(0, 0, 100)).toBe(0)
    expect(percentToValue(0.5, 0, 100)).toBe(50)
    expect(percentToValue(1, 0, 100)).toBe(100)
    expect(percentToValue(0.5, 0, 50)).toBe(25)
    expect(percentToValue(0.5, 50, 100)).toBe(75)
    expect(percentToValue(1, -10, 10)).toBe(10)
    expect(percentToValue(0.25, -10, 10)).toBe(-5)
    expect(percentToValue(0.5, 0, 10)).toBe(5)
    expect(percentToValue(0.5, 0, 1)).toBe(0.5)
    expect(percentToValue(0.5, 0, 0.5)).toBe(0.25)
    expect(percentToValue(0.1, 0, 1)).toBe(0.1)
    expect(percentToValue(0.123456, 0, 1)).toBe(0.123456)
    expect(percentToValue(12.3456, 0, 10)).toBe(123.45599999999999)
    expect(percentToValue(24.6912, 0, 0.5)).toBe(12.3456)
    expect(percentToValue(1, 0, 0.123)).toBe(0.123)
  })
  // function percentToValue
  // retorna o valor que representa o % indicado dentro de um range de números
  // refatoração do teste, dividindo nos casos possíveis (2) e aumentando a cobertura
  it("should return NaN when the value is not a number", () => {
    expect(percentToValue(undefined, 0, 100)).toBe(NaN)
    expect(percentToValue(null, 0, 100)).toBe(0)
    expect(percentToValue("abc", 0, 100)).toBe(NaN)
    expect(percentToValue("abc123", 0, 100)).toBe(NaN)
    expect(percentToValue({}, 0, 100)).toBe(NaN)
    expect(percentToValue([], 0, 100)).toBe(0)
  })

  // function roundValueToStep
  // retorna o valor arredondado de acordo com qual número ele está mais proximo
  // entre o mínimo e o máximo informado
  // refatoração do teste, dividindo nos casos possíveis (2) e aumentando a cobertura
  it("should rounds a specific value to the next or previous step", () => {
    expect(roundValueToStep(4, 0, 10)).toBe("0")
    expect(roundValueToStep(4.9999999999999999, 0, 10)).toBe("10")
    expect(roundValueToStep(5, 0, 10)).toBe("10")
    expect(roundValueToStep(6, 0, 10)).toBe("10")
    expect(roundValueToStep(3.6, 0, 10)).toBe("0")
    expect(roundValueToStep(6.6, 0, 10)).toBe("10")
    expect(roundValueToStep(5, 0, 0.1)).toBe("5.0")
    expect(roundValueToStep(3.123456789, 0, 0.1)).toBe("3.1")
    expect(roundValueToStep(2.123456789, 0, 0.1)).toBe("2.1")
    expect(roundValueToStep(-6, 0, -10)).toBe("-10")
    expect(roundValueToStep(-2, 0, -10)).toBe("0")
  })
  // function roundValueToStep
  // retorna o valor arredondado de acordo com qual número ele está mais proximo
  // entre o mínimo e o máximo informado
  // refatoração do teste, dividindo nos casos possíveis (2) e aumentando a cobertura
  it("should return 0 when the value is not a number", () => {
    expect(roundValueToStep(undefined, 0, 1)).toBe("0")
    expect(roundValueToStep(null, 0, 1)).toBe("0")
    expect(roundValueToStep("abc", 0, 1)).toBe("0")
    expect(roundValueToStep({}, 0, 1)).toBe("0")
    expect(roundValueToStep([], 0, 1)).toBe("0")
  })

  // function clampValue
  // retorna o valor arredondado mas dentro dos limites do range informado
  // refatoração do teste, dividindo nos casos possíveis (2) e aumentando a cobertura
  it("should truncate a value to ensure it stays between a range", () => {
    expect(clampValue(4, 0, 10)).toBe(4)
    expect(clampValue(4.9999999999999999, 1, 10)).toBe(5)
    expect(clampValue(4.25, 1, 10)).toBe(4.25)
    expect(clampValue(0, 1, 10)).toBe(1)
    expect(clampValue(11, 1, 10)).toBe(10)
    expect(clampValue(11, 11, 10)).toBeLessThan(11)
    expect(clampValue(-5, 0, 10)).toBe(0)
    expect(clampValue(0, -10, 10)).toBe(0)
    expect(clampValue(null, 1, 10)).toBe(null)
  })
  // function clampValue
  // retorna o valor arredondado mas dentro dos limites do range informado
  // refatoração do teste, dividindo nos casos possíveis (2) e aumentando a cobertura
  it("should return null or undefined when the value is NaN", () => {
    expect(clampValue(null, 1, 10)).toBe(null)
    expect(clampValue(undefined, 0, 10)).toBeUndefined()
  })

  it("should print a warning when the min is higher then max", () => {
    const consoleWarnSpy = jest.spyOn(console, "warn").mockImplementation()
    clampValue(5, 10, 0)
    expect(consoleWarnSpy).toHaveBeenCalledTimes(1)
    expect(consoleWarnSpy).toHaveBeenCalledWith(
      "clamp: max cannot be less than min",
    )
    consoleWarnSpy.mockRestore()
  })
})
