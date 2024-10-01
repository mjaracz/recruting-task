import { render } from "@testing-library/react"
import { ListItem } from "./list-item"

describe('<ListItem />', () => {
  test('should correct match the snapshot', () => {
    const { baseElement } = render(<ListItem avatarUrl="123" username="mock user" />)

    expect(baseElement).toMatchSnapshot();
  })
})