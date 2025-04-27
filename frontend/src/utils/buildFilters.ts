import IFilterInput from "../interfaces/IFilterInput";

function buildFilters(input: Record<string, string[]>): IFilterInput[] | undefined {
    if (!input) return undefined;
    const filters: IFilterInput[] = [];

    for (const [field, ranges] of Object.entries(input)) {
        if (ranges === null) continue;
        for (const range of ranges) {
            const [minStr, maxStr] = range.split('-');
            const min = Number(minStr);
            const max = Number(maxStr);
            if (isNaN(min) && isNaN(max)) continue;

            filters.push({
                field,
                min: isNaN(min) ? undefined : min,
                max: isNaN(max) ? undefined : max,
            });
        }
    }

    return filters;
}

export default buildFilters;
