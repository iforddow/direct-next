import { HeroBlockComponent } from "@/components/blocks/hero-block";

// Registry of all block components
export const blockRegistry: Record<
  string,
  React.ComponentType<{ block: any }>
> = {
  hero_block: HeroBlockComponent,
};
