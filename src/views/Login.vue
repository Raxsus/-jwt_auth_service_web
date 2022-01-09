<template>
  <form @submit.prevent="authorize">
    <div>
      <input v-model="email" type="text" placeholder="Email"/>
    </div>
    <div>
      <input v-model="password" type="password" placeholder="Password"/>
    </div>
    <button type="submit">Login</button>
  </form>
</template>

<script>
import { computed } from 'vue'
import { useStore } from 'vuex'
import {useRouter} from 'vue-router'

export default {
  setup () {
    const store = useStore()
    const router = useRouter();
    return {
      email: 'admin@test.com',
      password: 'qwerty',
      evenOrOdd: computed(() => store.getters.evenOrOdd),
      authorize: async function () {
        await store.dispatch('authorize', {email: this.email, password: this.password})
        router.push({name: 'Home'})
      }
    }
  }
}
</script>

<style scoped>
  input {
    padding: 5px;
    margin: 5px 0;
    width: 150px;
  }

  button {
    width: 165px;
    color: #fff;
    background: #2c3e50;
    padding: 5px;
  }
</style>