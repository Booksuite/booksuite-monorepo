import Logo from '@/src/components/svgs/Logo'

export default function PublicLayout({ children }) {
    return (
        <div className="PublicLayout">
            <div className="container">
                <Logo className="logo" />
                {children}
            </div>
        </div>
    )
}
