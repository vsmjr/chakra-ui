import React from "react"
import axios from "axios"
import { Input } from "../src"
import { Button } from "../../button/src"
import { fireEvent, render, screen, waitFor } from "@chakra-ui/test-utils"
jest.mock("axios")

const ComponentWrapper = () => {
  const [query, setQuery] = React.useState("")
  const [data, setData] = React.useState([])

  const getData = async () => {
    const response = await axios.get(
      `https://api.jikan.moe/v4/top/anime?q=${query}&limit=1&genres_exclude=9,49,12`,
    )
    setData(response.data)
  }

  return (
    <div>
      <label htmlFor="input">Simple Text Input</label>
      <Input
        data-testid="simple-text-input"
        onChange={(e) => setQuery(e.target.value)}
      />
      <Button data-testid="button-fetch" onClick={getData}>
        fetch data
      </Button>
      {data.map((item, index) => (
        <div key={index}>
          <h1>{item.title}</h1>
          <h3>{item.synopsis}</h3>
          <p>score: {item.score}</p>
          <p>rank: {item.rank}</p>
          <p>popularity: {item.popularity}</p>
          <p>year: {item.year}</p>
        </div>
      ))}
    </div>
  )
}

test("Component renders initial state correctly", async () => {
  render(<ComponentWrapper />)

  const mockData = [
    {
      title: "Naruto",
      synopsis: "Moments prior to Naruto Uzumaki's birth...",
      score: 7.99,
      rank: 615,
      popularity: 8,
      year: 2002,
    },
  ]

  const axiosGetSpy = jest.spyOn(axios, "get")
  axiosGetSpy.mockResolvedValue({ data: mockData })

  const input = screen.getByTestId("simple-text-input")
  const button = screen.getByTestId("button-fetch")

  expect(input).toBeInTheDocument()

  fireEvent.change(input, { target: { value: "Naruto" } })

  fireEvent.click(button)

  await waitFor(() => {
    expect(screen.getByText("Naruto")).toBeInTheDocument()
    expect(
      screen.getByText("Moments prior to Naruto Uzumaki's birth..."),
    ).toBeInTheDocument()
  })

  expect(axiosGetSpy).toHaveBeenCalledWith(
    "https://api.jikan.moe/v4/top/anime?q=Naruto&limit=1&genres_exclude=9,49,12",
  )

  axiosGetSpy.mockRestore()
})
