export function createQueryString(params: [string, string][]): string
export function createQueryString(name: string, value: string): string
export function createQueryString(
    nameOrParams: string | [string, string][],
    value?: string | never,
): string {
    const paramsArray = Array.isArray(nameOrParams)
        ? nameOrParams
        : [[nameOrParams, value || ''] as const]

    const params = new URLSearchParams(window.location.search)

    paramsArray.forEach(([name, value]) => {
        params.set(name, value || '')
    })

    return params.toString()
}
