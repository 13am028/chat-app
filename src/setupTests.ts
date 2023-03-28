// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom'

module.exports = {
    collectCoverage: true,
    collectCoverageFrom: [
        'src/**/*.{js,jsx,ts,tsx}',
        '!src/**/*.test.{js,jsx,ts,tsx}',
    ],
    coveragePathIgnorePatterns: ['src/index.tsx', 'src/reportWebVitals.ts'],
    coverageReporters: ['json', 'lcov', 'text', 'clover'],
}
