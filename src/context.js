export function getFilename(context) {
  return context.filename ?? context.getFilename();
}

export function getSourceCode(context) {
  return context.sourceCode ?? context.getSourceCode();
}

export function getScope(context, node) {
  return getSourceCode(context).getScope?.(node) ?? context.getScope();
}

export function getAncestors(context, node) {
  return getSourceCode(context).getAncestors?.(node) ?? context.getAncestors();
}

export function getDeclaredVariables(context, node) {
  return getSourceCode(context).getDeclaredVariables?.(node) ?? context.getDeclaredVariables(node);
}
