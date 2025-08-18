FROM directus/directus:11.10.2

# Install PostgreSQL client as root
USER root
RUN apk add --no-cache postgresql-client

# Copy the startup script and make it executable
COPY start-directus.sh /directus/start-directus.sh
RUN chmod +x /directus/start-directus.sh

# Switch back to node user (the default user in Directus image)
USER node
