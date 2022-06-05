<template>
  <v-container fluid>
    <h1
        class="text-center"
    >
      Seasons
    </h1>
    <v-tabs
        v-model="tab"
        background-color="transparent"
        class="mb-10"
        grow
    >
      <v-tab
          v-for="(season, i) in seasons"
          :key="`season-${i}`"
      >
        {{ season }}
      </v-tab>
    </v-tabs>

    <v-tabs-items
        v-model="tab"
    >
      <v-tab-item
          v-for="(episode, i) in episodesBySeasons"
          :key="`episode-${i}`"
      >
        <v-row>
          <v-col
              v-for="(card, i) in episode"
              :key="`card-${i}`"
              cols="12"
              sm="4"
          >
            <EpisodeCard :episode="card"/>
          </v-col>
        </v-row>
      </v-tab-item>
    </v-tabs-items>
  </v-container>
</template>

<script>
  import Vue from 'vue'
  import axios from 'axios'
  import VueAxios from 'vue-axios'
  import EpisodeCard from '@/components/EpisodeCard';
  import {mapActions, mapState} from 'vuex'
  Vue.use(VueAxios, axios)
  export default {
    name: 'HomeView',
    components: { EpisodeCard },
    data: () => ({
      characters: null,
      tab: null,
      quotes: null,
      deaths: null,
    }),
    async mounted () {
      await this.fetchEpisodes()
      await this.fetchCharacters()
      await this.fetchDeaths()
      await this.fetchQuotes()
      this.setSeasons()
      this.setEpisodesBySeasons()
    },
    computed: {
      ...mapState(['episodes', 'seasons', 'episodesBySeasons'])
    },
    methods: {
      ...mapActions(['fetchEpisodes', 'fetchCharacters', 'fetchDeaths', 'fetchQuotes', 'setSeasons', 'setEpisodesBySeasons'])
    }
  }
</script>
