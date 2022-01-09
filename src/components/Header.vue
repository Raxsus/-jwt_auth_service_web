<template>
  <div class="header">
    <router-link to="/">Home</router-link>
    <router-link to="/details">Details</router-link>
    <router-link to="/users">Users</router-link>
    <span v-if="isAuthorize">{{userName}} - </span>
    <span v-if="isAuthorize" @click="logout">Logout</span>
    <span v-if="!isAuthorize" @click="login">Login</span>
  </div>
</template>

<script>
import {computed} from "vue";
import {useStore} from "vuex";
import {useRouter} from "vue-router";

export default {
  name: 'Header',
  setup() {
    const store = useStore()
    const router = useRouter();

    return {
      userName: computed(() => store.getters.userName),
      isAuthorize: computed(() => store.getters.isAuthorize),
      logout: function() {
        store.dispatch('logout');
        router.push({name: 'Login'});
      },
      login: function () {
        router.push({name: 'Login'})
      }
    }
  }
}
</script>

<style scoped>
.header {
  padding: 20px;
  margin-bottom: 10px;
  background: #2c3e50;
  text-align: end;
  color: #fff;
  height: 20px;
}
a {
  color: #fff;
  text-decoration: none;
  float: left;
  margin: 0 5px;
}

span {
  cursor: pointer;
}
</style>