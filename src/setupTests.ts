import '@testing-library/jest-dom'

global.matchMedia = global.matchMedia || {
  addListener: jest.fn(),
  removeListener: jest.fn()
}
