// Foundry V14 still invokes legacy V1 sheets from placed Tokens.
// V1 recursively merges render options, but TokenDocument._id is read-only.
// A sheet for a synthetic Actor resolves its Token via actor.token.
export function safeActorSheetRenderOptions(options = {}) {
  if (!options || typeof options !== "object") return {};
  const token=options.token;
  if (!token || typeof token !== "object") return options;
  if (token.documentName !== "Token" && typeof token.toObject !== "function") return options;
  const {token: _tokenDocument, ...safeOptions}=options;
  return safeOptions;
}
