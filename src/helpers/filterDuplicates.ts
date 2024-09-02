export const filterDuplicates = <T extends { id: number }>(existingItems: T[], newItems: T[]): T[] => {
    const existingIds = new Set(existingItems.map(item => item.id));
    const filteredItems = newItems.filter(item => !existingIds.has(item.id));
    return [...existingItems, ...filteredItems];
};