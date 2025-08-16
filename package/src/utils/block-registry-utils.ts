// Block registry utilities
// This helps connect the package components with the user's block registry

let externalBlockRegistry: Record<string, React.ComponentType<any>> = {};

export function setBlockRegistry(
  registry: Record<string, React.ComponentType<any>>,
) {
  externalBlockRegistry = registry;
}

export function getBlockRegistry() {
  return externalBlockRegistry;
}

export function getBlockComponent(blockType: string) {
  return externalBlockRegistry[blockType];
}
