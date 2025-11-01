import React from 'react';
import exportBrunoCollection from 'utils/collections/export';
import exportPostmanCollection from 'utils/exporters/postman-collection';
import cloneDeep from 'lodash/cloneDeep';
import Modal from 'components/Modal';
import { transformCollectionToSaveToExportAsFile } from 'utils/collections/index';
import exportPostmanEnvironments from 'utils/exporters/postman-environment';

const ExportCollection = ({ onClose, collection }) => {
  const handleExportBrunoCollection = () => {
    const collectionCopy = cloneDeep(collection);
    exportBrunoCollection(transformCollectionToSaveToExportAsFile(collectionCopy));
    onClose();
  };

  const handleExportPostmanCollection = () => {
    const collectionCopy = cloneDeep(collection);
    exportPostmanCollection(collectionCopy);
    onClose();
  };

  const handleExportPostmanCollectionWithEnv = () => {
    const collectionCopy = cloneDeep(collection);
    exportPostmanCollection(collectionCopy);
    exportPostmanEnvironments(collectionCopy.environments || [], { collectionName: collectionCopy.name });
    onClose();
  };

  const handleExportPostmanEnvironmentOnly = () => {
    const collectionCopy = cloneDeep(collection);
    exportPostmanEnvironments(collectionCopy.environments || [], { collectionName: collectionCopy.name });
    onClose();
  };

  return (
    <Modal size="sm" title="Export Collection" hideFooter={true} handleConfirm={onClose} handleCancel={onClose}>
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

export default ExportCollection;
