const fs = require('fs/promises');
const path = require('path');

const { downloadFile } = require('../src/utils/download-file');

module.exports.prepareReadme = async ({ source, target, slug, title }) => {
  source = `https://raw.githubusercontent.com/configu/configu/main/${source}`;
  target = path.join(__dirname, target);

  await downloadFile(source, target);

  let content = await fs.readFile(target, { encoding: 'utf8' });

  content = content.replace(/# @configu.*\n\n/, '');
  content = content.replace(/<!--.*\n/, '');

  content = `---
slug: ${slug}
title: ${title}
---

${content}
`;

  await fs.writeFile(target, content, { flag: 'w' });
};
