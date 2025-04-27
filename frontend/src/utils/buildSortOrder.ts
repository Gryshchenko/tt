import ISortItem from '../interfaces/ISortItem';
import ISortItemServer from '../interfaces/ISortItemServer';


function buildSortOrder(sorter: ISortItem | ISortItem[]): ISortItemServer[] {
  if (Array.isArray(sorter)) {
    return sorter.map((s) => ({
      field: s.field,
      order: s.order === 'ascend' ? 'asc' : 'desc',
    }));
  } else if (sorter && sorter.field) {
    return [{
      field: sorter.field,
      order: sorter.order === 'ascend' ? 'asc' : 'desc',
    }];
  }
  return [];
}

export default buildSortOrder;