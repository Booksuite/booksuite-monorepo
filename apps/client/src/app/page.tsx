import { InputSelect } from '@/components/atoms/InputSelect'

const HomePage = () => {
    const options = [
        { label: 'Opção 1', value: '1' },
        { label: 'Opção 2', value: '2' },
        { label: 'Opção 3', value: '3' },
    ]

    return (
        <div className="p-4 max-w-md">
            <h1 className="mb-4 text-xl font-bold">Client</h1>
            <InputSelect label="Selecione uma opção" options={options} />
        </div>
    )
}

export default HomePage
