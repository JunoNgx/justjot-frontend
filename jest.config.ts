import type {Config} from 'jest';

const config: Config = {
  verbose: true,
  preset: 'ts-jest',
  "moduleDirectories": ["<rootDir>/../", "node_modules"],
  'roots': [
    '<rootDir>/src'
  ],
  'transform': {
    '^.+\\.tsx?$': 'ts-jest'
  },
  'moduleNameMapper': {
      '@/(.*)': '<rootDir>/src/$1'
  }
};

export default config;