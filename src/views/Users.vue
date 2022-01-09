<template>
  <h2>Users</h2>
  <div v-if="accessDeny">Access Deny</div>
  <div v-for="(user, index) in users">{{`${index+1} - ${user.Firstname} ${user.Secondname} - ${user.Role}`}}</div>
</template>

<script>
import { computed } from 'vue'
import { useStore } from 'vuex'

export default {
  setup () {
    const store = useStore()
    return {
      users: computed(()=> {
        return store.getters.users
      }),
      accessDeny: computed(()=>store.getters.updateUsersListAccessDeny)
    }
  },
  async mounted() {
    const store = useStore()
    await store.dispatch('getUsersList')
  }
}
</script>

<style scoped>
div{
  padding: 5px 0;
  border: 1px solid #ccc;
}
</style>