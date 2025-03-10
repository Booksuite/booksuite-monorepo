/**
 * Utility functions for error handling
 */

type ErrorWithMessage = {
    message: string
}

/**
 * Type guard to check if an error object has a message property
 */
function isErrorWithMessage(error: unknown): error is ErrorWithMessage {
    return (
        typeof error === 'object' &&
        error !== null &&
        'message' in error &&
        typeof (error as Record<string, unknown>).message === 'string'
    )
}

/**
 * Convert an unknown error to a string message
 */
function toErrorWithMessage(
    error: unknown,
    fallback?: string,
): ErrorWithMessage {
    if (isErrorWithMessage(error)) {
        return error
    }

    try {
        // Try to convert error to string
        if (error instanceof Error) {
            return { message: error.message }
        }

        // Handle API error responses
        if (typeof error === 'object' && error !== null) {
            // Check for common API error formats
            if ('error' in error && typeof (error as any).error === 'string') {
                return { message: (error as any).error }
            }

            if (
                'detail' in error &&
                typeof (error as any).detail === 'string'
            ) {
                return { message: (error as any).detail }
            }

            // Try to stringify the error object
            return { message: JSON.stringify(error) }
        }

        // For primitive values
        return { message: String(error) }
    } catch {
        // If all else fails
        return { message: fallback || 'Ocorreu um erro inesperado' }
    }
}

/**
 * Get a readable error message from any error type
 *
 * @param error - The error to extract a message from
 * @param fallback - Optional fallback message if no message can be extracted
 * @returns A string error message
 *
 * @example
 * try {
 *   // Some code that might throw
 * } catch (error) {
 *   const message = getErrorMessage(error, 'Failed to load data');
 *   console.error(message);
 * }
 */
export function getErrorMessage(
    error: unknown,
    fallback = 'Something went wrong',
): string {
    if (error === null || error === undefined) {
        return fallback
    }

    const errorWithMessage = toErrorWithMessage(error)
    return errorWithMessage.message || fallback
}
