export const toPageCount = (totalCount: number, size: number) => Math.max(1, Math.ceil(totalCount / size));

export const takePage = <T>(items: T[], page: number, size: number) => items.slice((page - 1) * size, page * size);
