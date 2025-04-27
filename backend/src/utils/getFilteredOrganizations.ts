import IFilterInput from "../interfaces/IFilterInput";

function getFilteredOrganizations(filters: IFilterInput[],) {
    if (!filters || filters.length === 0) {
        return '';
    }
    const conditions = [];

    const allowedFilterFields = ['fundingRoundCount', 'totalFundingAmount'];
    for (const filter of filters) {
        const { field, min, max } = filter;

        if (field === allowedFilterFields[1]) {
            if (min !== undefined && max !== undefined) {
                conditions.push(`SUM(fr.amount) BETWEEN ${min} AND ${max}`);
            } else if (min !== undefined) {
                conditions.push(`SUM(fr.amount) >= ${min}`);
            } else if (max !== undefined) {
                conditions.push(`SUM(fr.amount) <= ${max}`);
            }
        }

        if (field === allowedFilterFields[0]) {
            if (min !== undefined && max !== undefined) {
                conditions.push(`COUNT(fr.id) BETWEEN ${min} AND ${max}`);
            } else if (min !== undefined) {
                conditions.push(`COUNT(fr.id) >= ${min}`);
            } else if (max !== undefined) {
                conditions.push(`COUNT(fr.id) <= ${max}`);
            }
        }
    }

    if (conditions?.length === 0) {
        return '';
    }

    return `HAVING ${conditions.join(' AND ')}`;
}

export default getFilteredOrganizations;