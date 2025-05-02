import React, { createContext, useContext } from 'react'
import { Gift } from 'lucide-react'
import dynamicIconImports from 'lucide-react/dynamicIconImports'

interface DynamicIconContextValue {
    DynamicLucideIcon: React.FC<{
        iconName: string
        className?: string
        [key: string]: any
    }>
}

const DynamicIconContext = createContext<DynamicIconContextValue | undefined>(
    undefined,
)

export const DynamicIconProvider: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    const DynamicLucideIcon: React.FC<{
        iconName: string
        className?: string
        [key: string]: any
    }> = ({ iconName, ...props }) => {
        const [IconComponent, setIconComponent] = React.useState<any>(null)
        React.useEffect(() => {
            let isMounted = true
            const iconImports = dynamicIconImports as Record<
                string,
                () => Promise<{ default: React.ComponentType<any> }>
            >
            if (iconName && iconImports[iconName]) {
                iconImports[iconName]().then((mod) => {
                    if (isMounted) setIconComponent(() => mod.default)
                })
            } else {
                setIconComponent(null)
            }
            return () => {
                isMounted = false
            }
        }, [iconName])
        if (IconComponent) {
            return <IconComponent {...props} />
        }
        return <Gift {...props} />
    }

    return (
        <DynamicIconContext.Provider value={{ DynamicLucideIcon }}>
            {children}
        </DynamicIconContext.Provider>
    )
}

export function useDynamicLucideIcon() {
    const context = useContext(DynamicIconContext)
    if (!context) {
        throw new Error(
            'useDynamicLucideIcon must be used within a DynamicIconProvider',
        )
    }
    return context.DynamicLucideIcon
}
