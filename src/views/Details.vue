<template>
  <div>User Details</div>
  <div>Name - {{userName}}</div>
  <div>Email - {{userEmail}}</div>
  <div>Role - {{userRole}}</div>
</template>

<script>
import {computed} from "vue";
import {useStore} from "vuex";

export default {
  name: "Details",
  setup() {
    const store = useStore();

    return {
      userName: computed(() => store.getters.userName),
      userRole: computed(() => store.getters.userRole),
      userEmail: computed(() => store.getters.userEmail)
    }
  }
}
</script>

<style scoped>
  div{
    margin: 5px 0;
  }
</style>