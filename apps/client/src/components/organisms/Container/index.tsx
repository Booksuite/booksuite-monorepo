interface ContainerProps {
    children: React.ReactNode
}

export const Container: React.FC<ContainerProps> = ({ children }) => {
    return (
        <div className="container mx-auto px-4 py-16 flex flex-col gap-20 items-center max-w-7xl">
            {children}
        </div>
    )
}
