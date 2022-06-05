<template>
  <v-app>
    <v-app-bar
        dense
    >
      <router-link to="/">
        Home
      </router-link>
    </v-app-bar>
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>

export default {
  name: 'App',

  data: () => ({
    //
  }),
};
</script>
