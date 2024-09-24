import { generateSidebar } from 'vitepress-sidebar'

const vitepressSidebarOptions = [
  {
    documentRootPath: 'docs',
    scanStartPath: 'exercises',
    resolvePath: '/exercises/',
    useTitleFromFileHeading: true,
    useFolderTitleFromIndexFile: true,
    sortMenusByFrontmatterOrder: true,
  },
  {
    documentRootPath: 'docs',
    scanStartPath: 'extras',
    resolvePath: '/extras/',
    useTitleFromFileHeading: true,
    useFolderTitleFromIndexFile: true,
    sortMenusByFrontmatterOrder: true,
  },
  {
    documentRootPath: 'docs',
    scanStartPath: 'contribute',
    resolvePath: '/contribute/',
    useTitleFromFileHeading: true,
    useFolderTitleFromIndexFile: true,
    sortMenusByFrontmatterOrder: true,
    collapseDepth: 2,
  },
]

export default generateSidebar(vitepressSidebarOptions)
