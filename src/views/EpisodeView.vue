<template>
  <v-container fluid>
    <h1
        class="text-center"
    >
      Episode: {{ currentEpisode.title }}
    </h1>
    <v-row>
      <v-col
          v-for="(character, i) in currentEpisode.characters"
          :key="`character-${i}`"
          cols="12"
          sm="4"
      >
        <v-card>
          <router-link :to="{ name: 'character', params: { name: character}}">
            <v-card-title>
              {{  character }}
            </v-card-title>
          </router-link>
          <template v-if="death">
            <v-card-title>
              Death: {{ death.death }}
            </v-card-title>
            <v-card-subtitle>
              Cause death: {{ death.cause }}
            </v-card-subtitle>
            <v-card-text>
              Last words: {{ death.last_words }}
            </v-card-text>
          </template>
          <template v-else>
            <v-card-title>
              Death: unknown
            </v-card-title>
          </template>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapState } from 'vuex';
export default {
  name: "EpisodeView",
  data: () => ({
    currentSeason: null,
  }),
  computed: {
    ...mapState(['episodes', 'deaths', 'quotes']),
    currentEpisode() {
      return this.episodes.find(item => {
        return item.episode_id === Number(this.$route.params.id)
      })
    },
    death() {
      return this.deaths.find(item => {
        return item.episode === this.$route.params.id
      })
    },
  }
}
</script>

<style scoped>

</style>
