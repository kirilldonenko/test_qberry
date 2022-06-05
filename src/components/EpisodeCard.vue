<template>
  <v-card>
    <router-link :to="{ name: 'episode', params: { id: episode.episode_id, title: episode.title }}">
      <v-card-title>
        {{  episode.title }}
      </v-card-title>
    </router-link>
    <v-card-subtitle>
      Release date: {{ episode.air_date }}
    </v-card-subtitle>
    <v-card-text>
      <v-list>
        <v-subheader>
          Characters:
        </v-subheader>
        <v-list-item
            v-for="(character, i) in episode.characters"
            :key="`character-${i}`"
        >
          <v-list-item-content
            class="ml-5"
          >
            <v-list-item-title v-text="character"></v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: "EpisodeCard",
  props: ['episode']
}
</script>

<style scoped>

</style>
