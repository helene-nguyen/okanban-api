# Database

## Syntaxes à respecter

```sql
BEGIN; --Toujours commencer par BEGIN pour démarrer la transaction

 --On supprime d'abord les tables existantes si elles existent
DROP TABLE IF EXISTS "table_1",
"table_2"; --Ne pas oublier de refermer

--~role
CREATE TABLE IF NOT EXISTS "role" (
    "id" INTEGER GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY, --Ecriture moderne
    "name" TEXT NOT NULL DEFAULT 'user',
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ
);

--~user
CREATE TABLE IF NOT EXISTS "user" (
    "id" INTEGER GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
    "username" TEXT NOT NULL UNIQUE,
    "email" TEXT NOT NULL UNIQUE,
    "password" TEXT NOT NULL,
    "role_id" INTEGER NOT NULL REFERENCES "role"("id"),
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ
);

--~category
CREATE TABLE IF NOT EXISTS "category" (
    "id" INTEGER GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
    "name" TEXT NOT NULL,
    "description" TEXT NULL,
    "image" TEXT NULL,
    "user_id" INTEGER NOT NULL REFERENCES "user"("id"),
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    "updated_at" TIMESTAMPTZ
);

--~snippet
CREATE TABLE IF NOT EXISTS "snippet" (
    "id" INTEGER GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
    "title" TEXT NOT NULL,
    "description" TEXT NULL,
    "link" TEXT NULL,
    "date" TEXT NOT NULL,
    "user_id" INTEGER NOT NULL REFERENCES "user"("id"),
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ
);

--~category_has_snippet
CREATE TABLE IF NOT EXISTS "category_has_snippet" (
    "id" INTEGER GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
    "category_id" INTEGER NOT NULL REFERENCES "category"("id"),
    "snippet_id" INTEGER NOT NULL REFERENCES "snippet"("id"),
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ,
    UNIQUE("category_id", "snippet_id")
);

COMMIT; -- Fin de la transaction
```