import { reactive } from 'vue'
import { Character } from './models/Character.js'

// NOTE AppState is a reactive object to contain app level data
export const AppState = reactive({
  /**@type {import('@bcwdev/auth0provider-client').Identity} */
  identity: null,
  /** @type {import('./models/Account.js').Account} user info from the database*/
  account: null,

  Characters: [
    new Character({
      name: 'Mr. Glope'

    }),
    new Character({
      name: 'Mr. Crabs'
    }),
    new Character({
      name: 'Sponge Bob'
    })
  ],


})

