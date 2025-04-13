export const calcPaginationData = ({page, perPage, totalItemsCount}) => {
    const totalPages = Math.ceil(totalItemsCount / perPage);
    const hasPreviousPage = page > 1;
    const hasNextPage = page < totalPages;
    
    return {
        totalPages,
        hasPreviousPage,
        hasNextPage,
    }
}