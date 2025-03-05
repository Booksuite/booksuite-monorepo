import { ChipFilter } from '@/components/organisms/ChipFilter'

export default function Pageee() {
    return (
        <div>
            <h1>Page</h1>
            <ChipFilter
                items={[
                    { key: '1', label: 'One' },
                    { key: '2', label: 'Two' },
                ]}
            />
        </div>
    )
}
