export default function LabelBadge({ children, ...props }) {
    return (
        <span style={{ color: 'var(--clr-tertiary-500)' }} {...props}>
            {children}
        </span>
    )
}
