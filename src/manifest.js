module.exports = {
  name: 'Vue Chrome Extension',
  version: '1.0.0',
  description: 'Vue.js Chrome Extension Template',
  author: '',
  manifest_version: 2,
  icons: {
    '16': 'icons/upload-16.png',
    '48': 'icons/upload-48.png',
    '128': 'icons/upload-128.png'
  },
  permissions: [
    '*://*/',
    'storage',
    "cookies",
    'contextMenus',
    'clipboardWrite',
    'clipboardRead',
  ],
  browser_action: {
    default_icon: {
      '16': 'icons/upload-16.png',
      '48': 'icons/upload-48.png',
      '128': 'icons/upload-128.png'
    },
    default_title: "pic-host \r图床助手",
    default_popup: "pages/popup.html"
  },
  background: {
    persistent: false,
    scripts: ['js/background.js']
  },
  // devtools_page: 'pages/devtools.html',
  options_page: 'pages/options.html',
  content_scripts: [
    {
      js: ['js/inject.js'],
      run_at: 'document_end',
      matches: ['<all_urls>'],
      all_frames: false
    }
  ],
  content_security_policy: "script-src 'self' 'unsafe-eval'; object-src 'self'",
  web_accessible_resources: ['js/content.js']
}
