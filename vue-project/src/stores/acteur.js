import { defineStore } from 'pinia'

export const acteurStore = defineStore({
  id: 'acteur',
  state: () => ({
    id: '',
    token: '',
    email: ''
  })
})
