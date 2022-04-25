const dev = process.env.NODE_ENV !== 'production'

export const URL = dev
  ? 'http://localhost:3000/'
  : 'https://fullstack-wern-boilerplate.vercel.app/api'

export const serverURL = dev
  ? 'http://localhost:4000/graphql'
  : 'https://wern-fullstack-template.herokuapp.com/'
