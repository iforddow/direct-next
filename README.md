Note: This is a generated README. I will be making a real one soon, but for now this is AI's sloppy description of what I asked it for.

# Direct-Next

Direct-Next is a powerful integration solution that enables seamless connection between Next.js websites and Directus CMS. This project provides everything you need to quickly build content-driven websites with visual editing capabilities.

## What's Included

Direct-Next comes in two main components:

### 1. Next.js Frontend

- **Pre-built Components**: Ready-to-use components optimized for Directus integration
- **Visual Editing Provider**: Built-in support for Directus visual editing features
- **Page Renderers**: Pre-configured page rendering system
- **Block Renderers**: Modular block-based content rendering
- **Directus SDK Integration**: Seamless API communication with your Directus instance

### 2. Directus CMS Backend

- **Default Schema**: Pre-configured content collections and fields
- **Docker Compose Setup**: One-command deployment with Docker
- **Production-Ready Configuration**: Optimized settings for development and production
- **Public API Collections**: Default collections configured for frontend consumption

## Quick Start

### Step 1: Clone the Repository

```bash
git clone [your-repo-url]
cd direct-next
```

### Step 2: Set Up the CMS First

1. Navigate to the CMS directory
2. Run the Docker Compose setup:
   ```bash
   cd cms
   docker-compose up -d
   ```
3. Access your Directus admin panel (typically at `http://localhost:8055`)
4. Complete the initial Directus setup

### Step 3: Configure Public Collections

**Important**: Before running the Next.js frontend, ensure the two default collections are set to public access:

1. Go to your Directus admin panel
2. Navigate to Settings → Access Control → Public Role
3. Set the following collections to have public read access:
   - [Collection Name 1]
   - [Collection Name 2]

### Step 4: Run the Next.js Frontend

```bash
cd ../frontend
npm install
npm run dev
```

Your Direct-Next application should now be running with full CMS integration!

## Features

### 🎨 Visual Editing

- Live preview of content changes
- In-context editing directly from your website
- Real-time updates without page refresh

### 🧱 Block-Based Content

- Modular content blocks for flexible page building
- Pre-built renderers for common content types
- Easy to extend with custom blocks

### ⚡ Performance Optimized

- Static generation support
- Incremental static regeneration
- Optimized API queries

### 🐳 Docker Ready

- Complete Docker setup included
- Development and production configurations
- Easy deployment and scaling

## Project Structure

```
direct-next/
├── frontend/              # Next.js application
│   ├── components/        # Pre-built components
│   ├── providers/         # Visual editing provider
│   ├── renderers/         # Page and block renderers
│   └── lib/              # Directus SDK integration
├── cms/                  # Directus CMS
│   ├── docker-compose.yml
│   ├── schema/           # Default collections and fields
│   └── config/           # CMS configuration
└── README.md
```

## Configuration

### Environment Variables

Create a `.env.local` file in the frontend directory:

```env
NEXT_PUBLIC_DIRECTUS_URL=http://localhost:8055
DIRECTUS_TOKEN=your_directus_token
```

### Directus Configuration

The CMS comes with pre-configured:

- Content collections
- Field schemas
- User roles and permissions
- API endpoints

## Development Workflow

1. **Content First**: Create and structure your content in Directus
2. **Visual Editing**: Use the visual editing features to see changes live
3. **Component Development**: Extend or customize the pre-built components
4. **Deployment**: Use the included Docker setup for production deployment

## Extending Direct-Next

### Adding Custom Blocks

1. Create a new component in `frontend/components/blocks/`
2. Add the renderer to the block registry
3. Configure the block schema in Directus

### Custom Page Types

1. Define new page collections in Directus
2. Create corresponding page renderers
3. Update the routing configuration

## Support

- Check the documentation in each directory for detailed setup instructions
- Review the example components for implementation patterns
- Refer to the Directus and Next.js documentation for advanced configurations

## Requirements

- Node.js 18+
- Docker and Docker Compose
- Modern web browser with JavaScript enabled

## License

MIT

---

**Ready to build amazing content-driven websites?** Start with setting up the CMS, configure your collections, and watch your Next.js site come to life with seamless content management!
