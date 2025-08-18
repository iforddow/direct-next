#!/bin/sh
set -e

# 1. Bootstrap Directus (install tables and create admin user)
echo "Bootstrapping Directus..."
npx directus bootstrap

# 2. Apply schema snapshot
if [ -f /directus/schema/schema.yaml ]; then
  echo "Applying Directus schema snapshot..."
  npx directus schema apply /directus/schema/schema.yaml --yes
elif [ -f /directus/schema/schema.json ]; then
  echo "Applying Directus schema snapshot..."
  npx directus schema apply /directus/schema/schema.json --yes
fi

# 3. Add custom constraint to Postgres (with error handling)
echo "Adding custom DB constraints..."
psql "postgresql://$DB_USER:$DB_PASSWORD@$DB_HOST:$DB_PORT/$DB_DATABASE" <<-EOSQL || echo "Constraint may already exist, continuing..."
DO \$\$
BEGIN
    IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'pages') THEN
        IF NOT EXISTS (
            SELECT 1 FROM information_schema.table_constraints 
            WHERE constraint_name = 'parent_page_not_self' 
            AND table_name = 'pages'
        ) THEN
            ALTER TABLE pages ADD CONSTRAINT parent_page_not_self CHECK (id <> parent_page);
        END IF;
    ELSE
        RAISE NOTICE 'Table pages does not exist, skipping constraint';
    END IF;
END \$\$;
EOSQL

# 4. Start Directus
echo "Starting Directus..."
exec npx directus start
