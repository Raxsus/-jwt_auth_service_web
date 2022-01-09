<template>
  <div v-if="!isAuthorize">You are not authorized</div>
  <div v-else>{{userName}} - {{userRole}}</div>
</template>

<script>
import {computed} from "vue";
import {useStore} from "vuex";

export default {
  name: "Home",
  setup() {
    const store = useStore();

    return {
      isAuthorize: computed(() => store.getters.isAuthorize),
      userName: computed(() => store.getters.userName),
      userRole: computed(() => store.getters.userRole)
    }
  }
}
</script>

<style scoped>

</style>