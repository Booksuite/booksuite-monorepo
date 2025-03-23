import { MediaUrlInfo } from '../../types'

const VALID_MIME_TYPES = [
    'image/jpeg',
    'image/png',
    'image/gif',
    'image/svg+xml',
    'image/webp',
    'video/mp4',
    'video/webm',
    'video/ogg',
    'video/quicktime',
    'video/x-msvideo',
    'video/x-flv',
    'video/x-matroska',
]

function isYoutubeUrl(url: string): boolean {
    return /^(https?:\/\/)?(www\.)?(youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]{11})$/.test(
        url,
    )
}

function isVimeoUrl(url: string): boolean {
    return /^(https?:\/\/)?(www\.)?(vimeo\.com\/)[0-9]+$/.test(url)
}

function getYoutubeVideoId(url: string): string {
    const match = url.match(
        /^(https?:\/\/)?(www\.)?(youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]{11})$/,
    )
    return match && match[4] ? match[4] : 'unknown'
}

function getVimeoVideoId(url: string): string {
    const match = url.match(/[0-9]+$/)
    return match && match[0] ? match[0] : 'unknown'
}

function getFileNameFromUrl(url: string): string {
    const urlParts = url.split('/')
    const lastPartIndex = urlParts.length > 0 ? urlParts.length - 1 : 0
    const lastPart =
        lastPartIndex >= 0 && lastPartIndex < urlParts.length
            ? urlParts[lastPartIndex]
            : ''

    const fileNameParts = lastPart ? lastPart.split('?') : ['']

    return fileNameParts.length > 0 && fileNameParts[0]
        ? fileNameParts[0]
        : 'media file'
}

export async function validateUrlContent(url: string): Promise<MediaUrlInfo> {
    try {
        new URL(url)

        if (isYoutubeUrl(url)) {
            const videoId = getYoutubeVideoId(url)
            return {
                url: url,
                mimetype: 'video/youtube',
                name: `YouTube Video (${videoId})`,
            }
        }

        if (isVimeoUrl(url)) {
            const videoId = getVimeoVideoId(url)
            return {
                url: url,
                mimetype: 'video/vimeo',
                name: `Vimeo Video (${videoId})`,
            }
        }

        const response = await fetch(url)

        if (!response.ok) {
            throw new Error('Não foi possível acessar a URL')
        }

        const contentType = response.headers.get('content-type') || ''
        const contentDisposition = response.headers.get('content-disposition')

        let fileName = 'media file'

        if (contentDisposition) {
            const fileNameMatch = contentDisposition.match(/filename="(.+?)"/)
            if (
                fileNameMatch &&
                Array.isArray(fileNameMatch) &&
                fileNameMatch.length > 1 &&
                fileNameMatch[1]
            ) {
                fileName = fileNameMatch[1]
            }
        } else {
            fileName = getFileNameFromUrl(url)
        }

        if (!VALID_MIME_TYPES.includes(contentType)) {
            throw new Error(`Tipo de mídia não suportado: ${contentType}`)
        }

        return {
            url: url,
            mimetype: contentType,
            name: fileName,
        }
    } catch (error) {
        if (error instanceof Error) {
            throw error
        } else {
            throw new Error('Erro ao verificar URL')
        }
    }
}
