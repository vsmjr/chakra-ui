import { Input, InputGroup, InputRightElement } from "../src"
import { Button } from "../../button/src"
import * as React from "react"
import { render, screen, fireEvent } from "@chakra-ui/test-utils"

const ComponentWrapper = () => {
  const [show, setShow] = React.useState(false)

  const handleClick = () => {
    setShow(!show)
  }

  return (
    <div>
      <label htmlFor="input">Simple Text Input</label>
      <Input data-testid="simple-text-input" />
      <label htmlFor="input">Password Input</label>
      <InputGroup size="md">
        <Input
          paddingEnd="4.5rem"
          data-testid="password-input"
          type={show ? "text" : "password"}
          placeholder="Enter password"
        />
        <InputRightElement width="4.5rem">
          <Button data-testid="button-hide" onClick={handleClick}>
            {show ? "Hide" : "Show"}
          </Button>
        </InputRightElement>
      </InputGroup>
    </div>
  )
}

test("Component renders initial state correctly", () => {
  render(<ComponentWrapper />)

  expect(screen.getByTestId("simple-text-input")).toBeInTheDocument()
  expect(screen.getByTestId("password-input")).toBeInTheDocument()

  expect(screen.getByTestId("button-hide")).toBeInTheDocument()
})

test("Testing if input render correctly and change his value", () => {
  render(<ComponentWrapper />)

  const input = screen.getByTestId("simple-text-input") as HTMLInputElement

  expect(input.value).toBe("")

  fireEvent.input(input, { target: { value: "Antonio Hamilton" } })

  expect(input.value).toBe("Antonio Hamilton")
})

test("Toggle password visibility with Show/Hide button", () => {
  render(<ComponentWrapper />)

  const passwordInput = screen.getByTestId("password-input")
  const showHideButton = screen.getByTestId("button-hide")

  expect(passwordInput).toHaveAttribute("type", "password")

  fireEvent.click(showHideButton)

  expect(passwordInput).toHaveAttribute("type", "text")

  expect(showHideButton).toHaveTextContent("Hide")

  fireEvent.click(showHideButton)

  expect(passwordInput).toHaveAttribute("type", "password")

  expect(showHideButton).toHaveTextContent("Show")
})

test("Toggle password visibility with Show/Hide button and check content after Hide", () => {
  render(<ComponentWrapper />)

  const passwordInput = screen.getByTestId("password-input")
  const showHideButton = screen.getByTestId("button-hide")

  fireEvent.click(showHideButton)

  const newPassword = "mySuperSecretPassword"
  fireEvent.input(passwordInput, { target: { value: newPassword } })

  expect(passwordInput).toHaveValue(newPassword)

  fireEvent.click(showHideButton)

  expect(passwordInput).toHaveAttribute("type", "password")

  expect(screen.queryByText(newPassword)).toBeNull()
})
