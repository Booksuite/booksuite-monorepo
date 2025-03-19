'use client'

import { useSearchCompanies } from '@booksuite/sdk'
import { Spinner, Table, Td, Th, Tr } from '@chakra-ui/react'
import { useState } from 'react'

import { getErrorMessage } from '@/common/utils'
import { PaginationControls } from '../../../../components/molecules/PaginationControl'

export const CompaniesList: React.FC = () => {
    const [page, setPage] = useState<number>(1)

    const { data, error, isLoading } = useSearchCompanies({
        pagination: { itemsPerPage: 10, page },
    })

    if (!isLoading && (error || !data)) {
        return <div>{getErrorMessage(error, 'Erro ao carregar empresas')}</div>
    }
    if (isLoading) {
        return <Spinner />
    }

    const {
        items: companies,
        prevPage,
        nextPage,
        totalItems,
        totalPages,
    } = data

    return (
        <div>
            <Table>
                <thead>
                    <Tr>
                        <Th>Nome</Th>
                    </Tr>
                </thead>
                <tbody>
                    {companies.map((company) => (
                        <Tr key={company.name}>
                            <Td>{company.name}</Td>
                        </Tr>
                    ))}
                </tbody>
            </Table>

            <PaginationControls
                onPageChange={setPage}
                page={page}
                prevPage={prevPage}
                nextPage={nextPage}
                totalItems={totalItems}
                totalPages={totalPages}
            />
        </div>
    )
}
