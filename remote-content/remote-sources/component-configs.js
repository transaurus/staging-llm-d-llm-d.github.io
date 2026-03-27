/**
 * Shared Component Configurations
 * 
 * Central location for all llm-d component definitions used across
 * the documentation system. This eliminates duplication and ensures
 * consistency across different generators.
 * 
 * Now loads from components-data.yaml for a single source of truth.
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import yaml from 'js-yaml';

// Get the directory of the current module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load components data from YAML file
const yamlPath = path.join(__dirname, 'components-data.yaml');
const yamlContent = fs.readFileSync(yamlPath, 'utf8');
const componentsData = yaml.load(yamlContent);

/**
 * Component configurations loaded from YAML
 */
export const COMPONENT_CONFIGS = componentsData.components;

/**
 * Release information loaded from YAML
 */
export const RELEASE_INFO = componentsData.release;

/**
 * Common repository configurations for remote content sources
 * These are frequently used repos that don't fit the component pattern
 */
export const COMMON_REPO_CONFIGS = {
  'llm-d-main': {
    name: 'llm-d',
    org: 'llm-d',
    branch: 'main', // Community docs always sync from main
    description: 'Main llm-d repository with core architecture and documentation'
  },
  'llm-d-infra': {
    name: 'llm-d-infra', 
    org: 'llm-d-incubation',
    branch: 'main',
    description: 'Examples, Helm charts, and release assets for llm-d infrastructure'
  }
};

/**
 * Find repository configuration by name from either components or common repos
 * @param {string} repoName - Repository name to find
 * @returns {Object|null} Repository configuration object
 */
export function findRepoConfig(repoName) {
  // Check components first
  const componentConfig = COMPONENT_CONFIGS.find(config => config.name === repoName);
  if (componentConfig) return componentConfig;
  
  // Check common repos
  const commonConfig = Object.values(COMMON_REPO_CONFIGS).find(config => config.name === repoName);
  return commonConfig || null;
}

/**
 * Generate repository URLs from configuration
 * Always syncs content from 'main' branch.
 * Note: Version tags in YAML are used to render the Latest Release page, not for content syncing.
 * @param {Object} repoConfig - Repository configuration
 * @returns {Object} Object with repoUrl, sourceBaseUrl, and ref (always 'main')
 */
export function generateRepoUrls(repoConfig) {
  const { org, name } = repoConfig;
  // Always sync content from main branch
  // Version tags in YAML are rendered on the Latest Release page to show release versions
  const ref = 'main';
  return {
    repoUrl: `https://github.com/${org}/${name}`,
    sourceBaseUrl: `https://raw.githubusercontent.com/${org}/${name}/${ref}/`,
    ref // Always 'main' for content syncing
  };
} 