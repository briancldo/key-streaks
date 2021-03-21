export default {
  testEnvironment: 'jest-environment-node',
  transform: {},
  verbose: true,
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
    },
  },
};
