# CUScheduling2: COMP4995 Honours Thesis Project

This project was forked from a basic Server-CLient Template.

## Uses the following technologies:

- React
- Next.js
- ChakraUI
- TypeGraphQL
- URQL
- ApolloServer(express)
- TypeORM
- PostgresSQL
- Node.js
- TypeScript
  <br>

## Running Locally:

### <b>Client:</b>

```
npm install
npm run dev
```

### <b>Server:</b> (You must have a postgreSQL database running and update the DATABASE_URL in server/.env if you wish to add database functionality)

```
npm install
npm run build
npm run dev2
```

<br>

## Folder Structure

```bash
├── client
│   └── src
│       ├── components
│       │   ├── elements
│       │   └── modules
│       ├── config
│       ├── generated
│       ├── graphql
│       │   ├── fragments
│       │   ├── mutations
│       │   └── queries
│       ├── hooks
│       ├── pages
│       │   └── api
│       ├── providers
│       ├── public
│       │   ├── fonts
│       │   └── images
│       ├── styles
│       └── util
└── server
    ├── dist
    │   ├── entities
    │   ├── middleware
    │   ├── resolvers
    │   └── utils
    └── src
        ├── entities
        ├── middleware
        ├── migrations
        ├── resolvers
        └── utils
```
