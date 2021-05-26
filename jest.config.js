module.exports = {
  setupFilesAfterEnv: [
    '<rootDir>/src/setupTests.ts'
  ],
  testEnvironment: 'jsdom', // 可配置： node
  moduleNameMapper: {
    '@/(.*)$': '<rootDir>/src/$1'
  },
  // 转换时需要忽略的文件
  transformIgnorePatterns: [
    '[/\\\\]node_modules[/\\\\].+\\.(js|jsx|mjs)$'
  ],
  transform: {
    // '^.+\\.jsx?$': 'babel-jest',
    '^.+\\.tsx?$': 'ts-jest',
    '.+\\.(css|styl|less|sass|scss|png|jpg|ttf|woff|woff2)$': 'jest-transform-stub'
  }
}
