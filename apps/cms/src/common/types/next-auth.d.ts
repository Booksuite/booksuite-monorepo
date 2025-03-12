declare module 'next-auth' {
    interface Session {
        user: {
            deletedAt: string
            updatedAt: string
            createdAt: string
            roleId: number
            phone: string
            surName: string
            name: string
            email: string
            id: number
            token: string
        }
    }
}
