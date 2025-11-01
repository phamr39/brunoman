import React from 'react';
import Modal from 'components/Modal';
import cloneDeep from 'lodash/cloneDeep';
import exportFolderAsPostmanCollection from 'utils/exporters/postman-folder';
import exportPostmanEnvironments from 'utils/exporters/postman-environment';
import exportBrunoCollection from 'utils/collections/export';
import { transformCollectionToSaveToExportAsFile } from 'utils/collections/index';

const ExportFolder = ({ onClose, folder, parentCollection }) => {
  const handleExportPostmanCollection = () => {
    const folderCopy = cloneDeep(folder);
    const collectionCopy = cloneDeep(parentCollection);
    exportFolderAsPostmanCollection(folderCopy, collectionCopy);
    onClose();
  };

  const handleExportBrunoCollection = () => {
    // Build a minimal Bruno collection from the folder
    const folderCopy = cloneDeep(folder);
    const collectionCopy = cloneDeep(parentCollection);
    const brunoCollection = {
      name: folderCopy?.name || 'folder',
      items: Array.isArray(folderCopy?.items) ? folderCopy.items : [],
      environments: Array.isArray(collectionCopy?.environments) ? collectionCopy.environments : []
    };
    exportBrunoCollection(transformCollectionToSaveToExportAsFile(brunoCollection));
    onClose();
  };

  const handleExportPostmanCollectionWithEnv = () => {
    const folderCopy = cloneDeep(folder);
    const collectionCopy = cloneDeep(parentCollection);
    exportFolderAsPostmanCollection(folderCopy, collectionCopy);
    exportPostmanEnvironments(collectionCopy?.environments || [], { collectionName: collectionCopy?.name });
    onClose();
  };

  const handleExportPostmanEnvironmentOnly = () => {
    const collectionCopy = cloneDeep(parentCollection);
    exportPostmanEnvironments(collectionCopy?.environments || [], { collectionName: collectionCopy?.name });
    onClose();
  };

  return (
    <Modal size="sm" title="Export Folder" hideFooter={true} handleConfirm={onClose} handleCancel={onClose}>
      <div>
        <div className="text-link hover:underline cursor-pointer" onClick={handleExportBrunoCollection}>
          Bruno Collection
        </div>
        <div className="text-link hover:underline cursor-pointer mt-2" onClick={handleExportPostmanCollection}>
          Postman Collection
        </div>
        <div className="text-link hover:underline cursor-pointer mt-2" onClick={handleExportPostmanCollectionWithEnv}>
          Postman Collection + Environment(s)
        </div>
        <div className="text-link hover:underline cursor-pointer mt-2" onClick={handleExportPostmanEnvironmentOnly}>
          Postman Environment(s) Only
        </div>
      </div>
    </Modal>
  );
};

export default ExportFolder;
