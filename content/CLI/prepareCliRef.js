const fs = require('fs/promises');
const path = require('path');

const { downloadFile } = require('../../src/utils/download-file');

const source = 'https://oss.configu.com/cli/manifest.md';
const target = path.join(__dirname, './cli-commands.mdx');

module.exports.prepareCliRef = async () => {
  await downloadFile(source, target);

  let content = await fs.readFile(target, { encoding: 'utf8' });

  content = content.replace('<!-- commands -->\n', '');
  content = content.replace('<!-- commandsstop -->\n', '');

  content = content.replace(/## `(.*)`/g, '## $1');

  content = content.replace(/\nUSAGE/g, 'bash\nUSAGE');
  content = content.replace(/\n_.*_\n/g, '');

  content = `---
slug: cli-commands
title: CLI Command Reference
---

This section contains reference documentation for working with the Configu CLI. For a step-by-step introduction, you can get started with [this guide](/get-started).

${content}
`;

  await fs.writeFile(target, content, { flag: 'w' });
};
