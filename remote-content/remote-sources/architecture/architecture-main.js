/**
 * Main Architecture README Remote Content
 * 
 * Downloads the README.md file from the main llm-d repository
 * and transforms it into docs/architecture/architecture.mdx
 * 
 * Syncs from the main branch to always show the latest development content.
 */

import { createContentWithSource } from '../utils.js';
import { findRepoConfig, generateRepoUrls } from '../component-configs.js';
import { getRepoTransform } from '../repo-transforms.js';

// Get repository configuration from centralized config
const repoConfig = findRepoConfig('llm-d');
const { repoUrl, sourceBaseUrl, ref } = generateRepoUrls(repoConfig);

// Create a content transform using main branch
const transform = getRepoTransform(repoConfig.org, repoConfig.name);
const contentTransform = (content, sourcePath) => transform(content, { 
  repoUrl, 
  branch: ref,  // Always 'main'
  org: repoConfig.org, 
  name: repoConfig.name, 
  sourcePath 
});

export default [
  'docusaurus-plugin-remote-content',
  {
    // Basic configuration - URLs use main branch
    name: 'architecture-main',
    sourceBaseUrl,
    outDir: 'docs/architecture',
    documents: ['README.md'],
    
    // Plugin behavior
    noRuntimeDownloads: false,
    performCleanup: true,
    
    // Transform the content for this specific document
    modifyContent(filename, content) {
      if (filename === 'README.md') {
        return createContentWithSource({
          title: 'llm-d Architecture',
          description: 'Overview of llm-d distributed inference architecture and components',
          sidebarLabel: 'llm-d Architecture',
          sidebarPosition: 0,
          filename: 'README.md',
          newFilename: 'architecture.mdx',
          repoUrl,
          branch: ref,  // Always 'main' for footer
          content,
          contentTransform
        });
      }
      return undefined;
    },
  },
]; 