export const createQueryString = (name: string, value: string) => {
    const searchParams = new URLSearchParams(window.location.search)
    const params = new URLSearchParams(searchParams.toString())
    params.set(name, value)

    return params.toString()
}
