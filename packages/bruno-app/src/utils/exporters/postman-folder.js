import * as FileSaver from 'file-saver';
import { brunoToPostman } from '@usebruno/converters';
import cloneDeep from 'lodash/cloneDeep';

// Export a single folder as a Postman collection.
// Includes environments from the parent collection if present.
export const exportFolderAsPostmanCollection = (folder, parentCollection) => {
  if (!folder || !parentCollection) return;

  const folderCopy = cloneDeep(folder);
  const parentCopy = cloneDeep(parentCollection);

  // Build a minimal Bruno collection structure using the folder contents
  const collectionForExport = {
    name: folderCopy.name || 'folder',
    items: Array.isArray(folderCopy.items) ? folderCopy.items : [],
    environments: Array.isArray(parentCopy.environments) ? parentCopy.environments : []
  };

  const postman = brunoToPostman(collectionForExport);

  const fileName = `${folderCopy.name || 'folder'}.json`;
  const fileBlob = new Blob([JSON.stringify(postman, null, 2)], { type: 'application/json' });
  FileSaver.saveAs(fileBlob, fileName);
};

export default exportFolderAsPostmanCollection;
