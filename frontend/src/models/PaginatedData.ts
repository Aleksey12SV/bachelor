export type PaginatedData<T,> = {
    content: T[],
    pageable: {
        pageNumber: number,
        pageSize: number,
        offset: number
    },
    totalElements: number,
    totalPages: number,
    last: boolean,
    size: number,
    numberOfElements: number,
    first: boolean,
    empty: boolean
}