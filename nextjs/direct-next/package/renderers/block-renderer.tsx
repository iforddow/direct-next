import { blockRegistry } from "../../block-registry";

/* 
A component to register and render different block types
note that blocks must be added to the blockRegistry before
using.

@author IFD
@since 2025-08-13
*/
export function BlockRenderer({ block }: { block: any }) {
    if (!block || !block.collection) return null;

    const BlockComponent = blockRegistry[block.collection];

    if (!BlockComponent) {
        console.warn(`No component found for block type: ${block.collection}`);
        return null;
    }

    return <BlockComponent block={block.item} />;
}
