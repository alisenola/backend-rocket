# Backend for Rocket

## Technologies & Tools

- Fastify
- PostgreSQL
- TypeORM
- TypeScript

## Installation & Usage

1. Clone repo on your local machine:

   `git clone https://github.com/tylarleague/backend-eparent.git`

2. Rename the .env.example file to .env
3. Install npm modules

   `yarn install`

4. Migrate database
   `yarn typeorm migration:run -d src/dataSource`
5. Start server by `yarn start`

ps: create database rocket
