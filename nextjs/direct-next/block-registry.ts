// Registry of all block components
export const blockRegistry: Record<
  string,
  React.ComponentType<{ block: any }>
> = {
  //Example
  //
  // import { HeroBlockComponent } from "@/components/blocks/hero-block"; (Top of file)
  //
  // hero_block: HeroBlockComponent (Inside these parentheses)
};
