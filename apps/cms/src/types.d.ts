/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import '@tanstack/react-table'

declare module '@tanstack/react-table' {
    interface ColumnMeta<_TData extends RowData, _TValue>
        extends Record<string, any> {}
}
