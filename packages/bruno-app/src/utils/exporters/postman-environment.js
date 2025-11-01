import * as FileSaver from 'file-saver';
import { uuid } from 'utils/common';

// Convert a Bruno environment object to a Postman environment JSON
const toPostmanEnvironment = (env = {}, { nameFallback } = {}) => {
  const values = Array.isArray(env.variables)
    ? env.variables.map((v) => ({
        key: v?.name || '',
        value: v?.secret ? '' : (v?.value ?? ''),
        enabled: v?.enabled !== false
      }))
    : [];

  return {
    id: uuid(),
    name: env?.name || nameFallback || 'Environment',
    values,
    _postman_variable_scope: 'environment',
    _postman_exported_at: new Date().toISOString(),
    _postman_exported_using: 'Bruno Export'
  };
};

export const exportPostmanEnvironments = (environments = [], { collectionName } = {}) => {
  const envs = Array.isArray(environments) ? environments : [];
  if (envs.length === 0) return;

  if (envs.length === 1) {
    const pm = toPostmanEnvironment(envs[0], { nameFallback: collectionName });
    const fileName = `${pm.name || collectionName || 'environment'}.postman_environment.json`;
    const blob = new Blob([JSON.stringify(pm, null, 2)], { type: 'application/json' });
    FileSaver.saveAs(blob, fileName);
    return;
  }

  // Multiple environments: trigger one download per environment
  envs.forEach((env) => {
    const pm = toPostmanEnvironment(env, { nameFallback: collectionName });
    const safeEnvName = pm.name || 'environment';
    const fileName = `${collectionName ? collectionName + ' - ' : ''}${safeEnvName}.postman_environment.json`;
    const blob = new Blob([JSON.stringify(pm, null, 2)], { type: 'application/json' });
    FileSaver.saveAs(blob, fileName);
  });
};

export default exportPostmanEnvironments;
