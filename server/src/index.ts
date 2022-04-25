import 'reflect-metadata'
import 'dotenv-safe/config'
import express from 'express'
import path from 'path'
import cors from 'cors'
import { ApolloServer } from 'apollo-server-express'
import { buildSchema } from 'type-graphql'
import { createConnection } from 'typeorm'

import { __prod__ } from './config'
import { UserAccount } from './entities/index'
import { SectionResolver, UserResolver } from './resolvers/index'
import { Section } from './entities/Section'
import { TimeSlot } from './entities/TimeSlot'
import { Accessory } from './entities/Accessory'

const main = async () => {
  console.log(process.env.DATABASE_URL)
  const conn = await createConnection({
    type: 'postgres',
    url: process.env.DATABASE_URL,
    logging: true,
    //  do not want synchronize true in production, possiblility of losing data
    synchronize: false,
    entities: [UserAccount, Section, TimeSlot, Accessory],
    migrations: [path.join(__dirname, './migrations/*')],
    //  need this to use postgres heroku plugin
    // ssl: {
    //   rejectUnauthorized: false,
    // },
    ssl: false
  })
  // await conn.runMigrations()

  // const sectionRepository = conn.getRepository(Section)
  // const sections = await sectionRepository.findOne({
  //   where: {crn: 100000},
  //   relations: ['accessories']
  // });
  // console.log(sections);
  // console.log(sections?.accessories);

  const app = express()

  app.set('trust proxy', 1)
  app.use(
    cors({
      origin: process.env.CORS_ORIGIN,
      credentials: true,
    })
  )

  const apolloServer = new ApolloServer({
    debug: true,
    schema: await buildSchema({
      resolvers: [UserResolver, SectionResolver],
      validate: false,
    }),
    context: ({ req, res }) => ({
      req,
      res,
    }),
  })

  apolloServer.applyMiddleware({
    app,
    cors: false,
    path: '/',
  })

  app.listen(parseInt(process.env.PORT!), () => {
    console.log(`server started on localhost:${process.env.PORT!}`)
  })
}

main().catch((err) => {
  console.error(err)
})
