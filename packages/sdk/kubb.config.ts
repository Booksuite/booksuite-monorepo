import { defineConfig } from '@kubb/core'
import { pluginClient } from '@kubb/plugin-client'
import { pluginOas } from '@kubb/plugin-oas'
import { pluginReactQuery } from '@kubb/plugin-react-query'
import { pluginTs } from '@kubb/plugin-ts'

const GENERATE_FROM = 'http://localhost:3000/api-yaml'

export default defineConfig(async () => {
    const response = await fetch(GENERATE_FROM)
    if (!response.ok) {
        throw new Error('Failed to fetch API YAML')
    }
    const yaml = await response.text()

    return {
        root: '.',
        input: {
            data: yaml,
        },
        output: {
            path: './src/gen',
        },
        plugins: [
            pluginOas({
                group: { type: 'tag', name: ({ group }) => `${group}Schema` },
            }),
            pluginTs({
                enumType: 'asPascalConst',
                transformers: {
                    name(name) {
                        if (name.endsWith('Enum'))
                            return name.replace('Enum', '')

                        if (name.includes('DTO')) {
                            if (name.includes('Response')) {
                                return name
                                    .replace('DTO', '')
                                    .replace('Response', '')
                            }
                            return name.replace('DTO', 'Input')
                        }

                        return name
                    },
                },
                group: {
                    type: 'tag',
                    name({ group }) {
                        return `${group}Controller`
                    },
                },
            }),
            pluginClient({
                output: {
                    path: './client',
                    barrelType: 'named',
                    banner: '/* eslint-disable no-alert, no-console */',
                },
                group: {
                    type: 'tag',
                    name: ({ group }) => `${group}Service`,
                },
                importPath: '../../../axios-client',
                parser: 'client',
                exclude: [
                    {
                        type: 'tag',
                        pattern: 'store',
                    },
                ],
                pathParamsType: 'object',
                dataReturnType: 'data',
            }),
            pluginReactQuery({
                output: {
                    path: './hooks',
                },
                group: {
                    type: 'tag',
                    name: ({ group }) => `${group}Hooks`,
                },
                client: {
                    importPath: '../../../axios-client',
                    dataReturnType: 'data',
                },
                query: {
                    methods: ['get'],
                    forceInclude: (operation) =>
                        operation.path.includes('/search'),
                    importPath: '@tanstack/react-query',
                },
                mutation: {
                    methods: ['post', 'put', 'delete', 'patch'],
                    importPath: '@tanstack/react-query',
                },
                pathParamsType: 'object',
                suspense: false,
            }),
        ],
    }
})
