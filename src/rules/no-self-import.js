/**
 * @fileOverview Forbids a module from importing itself
 * @author Gio d'Amelio
 */

import { getPhysicalFilename } from 'eslint-module-utils/contextCompat';
import resolve from 'eslint-module-utils/resolve';
import moduleVisitor from 'eslint-module-utils/moduleVisitor';

import docsUrl from '../docsUrl';

function isImportingSelf(context, node, requireName) {
  const filePath = getPhysicalFilename(context);

  // If the input is from stdin, this test can't fail
  if (filePath !== '<text>' && filePath === resolve(requireName, context)) {
    context.report({
      node,
      message: 'Module imports itself.',
    });
  }
}

module.exports = {
  meta: {
    type: 'problem',
    docs: {
      category: 'Static analysis',
      description: 'Forbid a module from importing itself.',
      recommended: true,
      url: docsUrl('no-self-import'),
    },

    schema: [],
  },
  create(context) {
    return moduleVisitor((source, node) => {
      isImportingSelf(context, node, source.value);
    }, { commonjs: true });
  },
};
