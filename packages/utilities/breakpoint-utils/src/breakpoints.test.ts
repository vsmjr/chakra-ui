import { getLastItem, px, analyzeCSSValue } from "./breakpoint"

describe("breakpoints utils test", () => {
  it("should get last item of any list", () => {
    const lastItem1 = getLastItem([1, "2", null])
    const lastItem2 = getLastItem(null)
    const lastItem3 = getLastItem([])

    expect(lastItem1).toBe(null)
    expect(lastItem2).toBe(undefined)
    expect(lastItem3).toBe(undefined)
  })

  it("should transform any number or string in a css format unit", () => {
    const valueInPx1 = px(30)
    const valueInPx2 = px("30 em")
    const valueInPx3 = px("30")
    const valueInPx4 = px(null)

    expect(valueInPx1).toBe("30px")
    expect(valueInPx2).toBe("30 em")
    expect(valueInPx3).toBe("30px")
    expect(valueInPx4).toBe(null)
  })

  it("should return an object with css analisys", () => {
    const analysis1 = analyzeCSSValue(30)
    const analysis2 = analyzeCSSValue("30px")
    const analysis3 = analyzeCSSValue("30")

    expect(analysis1).toMatchObject({ unitless: true, value: 30, unit: "" })
    expect(analysis2).toMatchObject({ unitless: false, value: 30, unit: "px" })
    expect(analysis3).toMatchObject({ unitless: true, value: 30, unit: "" })
  })
})
