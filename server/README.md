##Server

#### Knex

make migration:
```
knex migrate:make [migration_name] -x ts --knexfile src/db/knexfile.ts
```
run migrations
```
// local
knex migrate:latest --knexfile src/db/knexfile.ts
// Heroku
heroku run server/node_modules/knex/bin/cli.js migrate:latest --knexfile server/src/db/knexfile.ts
```
create seed:
```
knex seed:make [seed_name] -x ts --knexfile src/db/knexfile.ts
```
run seed:
```
knex seed:run --specific=seed-filename.ts --knexfile src/db/knexfile.ts
```
run seeds:
```
// local
knex seed:run --knexfile src/db/knexfile.ts
// Heroku
heroku run server/node_modules/knex/bin/cli.js seed:run --knexfile server/src/db/knexfile.ts
```

#### Useful Links
- Knex.js: https://gist.github.com/NigelEarle/70db130cc040cc2868555b29a0278261


