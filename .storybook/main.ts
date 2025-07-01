import type { StorybookConfig } from '@storybook/react-webpack5'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const config: StorybookConfig = {
  framework: '@storybook/react-webpack5',
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  typescript: {
    reactDocgen: 'react-docgen'
  },
  addons: [
    { name: 'storybook-design-token', options: { preserveCSSVars: true } },
    '@storybook/addon-viewport',
    '@storybook/addon-controls',
    // TODO check do wee need outlining
    // '@storybook/addon-outline',
    '@storybook/addon-links'
  ],
  webpackFinal: async (config, { configType }) => {
    // @ts-ignore
    config.module.rules.push(
      {
        test: /\.scss$/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
        include: path.resolve(__dirname, '../')
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
        include: path.resolve(__dirname, '../'),
        exclude: /node_modules/
      }
    )
    // @ts-ignore
    config.resolve.extensions.push('.js', '.jsx', '.ts', '.tsx', '.css', '.scss')
    return config
  }
}

export default config
