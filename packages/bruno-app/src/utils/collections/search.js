import { flattenItems, isItemARequest } from './index';
import filter from 'lodash/filter';
import find from 'lodash/find';

export const doesRequestMatchSearchText = (request, searchText = '') => {
  const query = (searchText || '').toLowerCase();
  const name = request?.name?.toLowerCase() || '';
  const url = request?.request?.url?.toLowerCase() || '';
  return name.includes(query) || url.includes(query);
};

export const doesFolderHaveItemsMatchSearchText = (item, searchText = '') => {
  let flattenedItems = flattenItems(item.items);
  let requestItems = filter(flattenedItems, (item) => isItemARequest(item));

  return find(requestItems, (request) => doesRequestMatchSearchText(request, searchText));
};

export const doesCollectionHaveItemsMatchingSearchText = (collection, searchText = '') => {
  let flattenedItems = flattenItems(collection.items);
  let requestItems = filter(flattenedItems, (item) => isItemARequest(item));

  return find(requestItems, (request) => doesRequestMatchSearchText(request, searchText));
};
