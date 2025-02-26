import CredentialsProvider from 'next-auth/providers/credentials'

export const authOptions = {
    providers: [
        CredentialsProvider({
            name: 'credentials',
            credentials: {
                email: { label: 'email', type: 'text' },
                password: { label: 'password', type: 'password' },
            },

            async authorize(credentials) {
                const response = await fetch(
                    `${process.env.API_URL}/auth/login`,
                    {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            email: credentials.email,
                            password: credentials.password,
                        }),
                    },
                )

                const result = await response.json()

                if (result?.user) {
                    const user = {
                        ...result.user,
                        token: result.token,
                    }

                    return user
                } else {
                    return null
                }
            },
        }),
    ],
    callbacks: {
        async jwt({ token, account, user }) {
            return { ...token, ...user }
        },
        async session({ session, token }) {
            session.user = token

            return session
        },
    },
}
