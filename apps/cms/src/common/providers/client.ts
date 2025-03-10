import createFetchClient from 'openapi-fetch'
import createClient from 'openapi-react-query'

import { paths } from '../db.schema'

export const fetchClient = createFetchClient<paths>({
    baseUrl: 'https://api.dev.booksuite.io/',
})

export const $api = createClient(fetchClient)
