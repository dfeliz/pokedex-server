exports.paginate = (query, { page, pageSize }) => {
    const offset = page * pageSize
    const limit = pageSize

    return {
        ...query,
        offset,
        limit
    }
}