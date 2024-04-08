

# Welcome to turborepo-shadcn-sleeping-nest App

## Steps to run the app

This monorepo use [pnpm](https://pnpm.io/) as a package managers, Install dependencies:

   ```sh
   pnpm install
   cd apps/api
   ```

go the api folder app:

   ```sh
   cd apps/api
   ```

This api app is using Prisma integrated with PostgreSQL. 
Create a .env file with the following environment variables:

DATABASE_URL=<put your url string>
DATABASE_URL_UNPOOLED=<put your url string UNPOOLED>


If you want a different setup, make sure to add the required environment variables and update datasource db { ... } in apps/api/prisma/schema.prisma accordingly.

Once done, make sure you are in the apps/api directory, then seed the Database:

   ```sh
   pnpm db:seed
   ```


Run the development server:

   ```sh
   pnpm dev
   ```


Open the client app: http://localhost:3002

Swagger API should be available at: http://localhost:3000/docs

You can learn more about the monorepo starter [here:](https://github.com/dan5py/turborepo-shadcn-ui)
