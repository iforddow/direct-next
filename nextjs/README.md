# Direct-Next

This project acts as a bridge between Directus and Next.js. It implements useful utilities, renderers, and more. It uses the best parts from both the Directus SDK and Next.js to let developers easily connect a CMS to their site.

## The Basics

This project comes in two separate parts.

1.  **Next.js App**
    The Next.js App comes with a direct-next folder including everything needed for the "bridge". The _src_ folder also comes with a config folder including the _blockRegistry.ts_ file. The app also comes with prebuilt slug folders and pages, so the dynamic page rendering will work out of the box.
2.  **Directus App**
    The Directus App comes with a schema, required extensions, example .env, and a docker-compose.yaml file. Note that the Directus app is not included but the basic configuration will be all there for you.

### What Direct-Next Does Do

- Has a pre-built page and block renderer, so the CMS can create dynamic pages and the blocks in those pages.

- Comes with Directus Live Preview out of the box with very minimal setup.

- Has pre-built scripts to make TypeScript types of your Directus items, one command simply creates types for you to use in your components.

- Has an Image loader to use with the Next.js Image tag.

- Has a function to fetch content from Directus using Next.js caching features.

- Has multiple utility functions to improve DX.
