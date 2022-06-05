<template>
  <v-container fluid>
    <h1 class="text-center mb-5">
      Character
    </h1>
    <v-card>
      <v-row>
        <v-col>
          <v-img
              width="20%"
              height="auto"
              class="ma-5"
              :src="character.img"
          ></v-img>
          <v-card-title>
            Nickname: {{ character.nickname }}
          </v-card-title>
          <v-card-subtitle>
            Name: {{ character.name }}
          </v-card-subtitle>
          <v-card-text>
            Appearance in seasons: {{ character.appearance.toString() }}
          </v-card-text>
          <v-card-text>
            Status: {{ character.status }}
          </v-card-text>
          <v-list>
            <v-card-title>
              Responsible Deaths:
            </v-card-title>
            <v-list-item
                v-for="(item, i) in responsibleDeaths"
                :key="`item-${i}`"
            >
              <v-list-item-content
                  class="ml-5"
                  v-text="item.death"
              >
              </v-list-item-content>
            </v-list-item>
          </v-list>
          <v-list>
            <v-card-title>
              Character Quotes:
            </v-card-title>
            <v-list-item
                v-for="(item, i) in characterQuotes"
                :key="`item-${i}`"
            >
              <v-list-item-content
                  class="ml-5"
                  v-text="item.quote"
              >
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-col>
      </v-row>
      <v-timeline>
        <v-timeline-item
            v-for="(item, i) in timelineItems"
            :key="i"
            color="blue"
            :icon="item.icon"
            fill-dot
        >
          <v-card>
            <v-card-text>
              {{ item.title }}
            </v-card-text>
            <v-card-title class="text-h6">
              {{ item.text }}
            </v-card-title>
          </v-card>
        </v-timeline-item>
      </v-timeline>
    </v-card>
  </v-container>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: "CharacterView",
  data: () => ({
    character: null,
  }),
  created () {
    this.character = this.characters.find(item => {
      return (this.$route.params.name === item.name ||
          this.$route.params.name === item.nickname)
    })
  },
  computed: {
    ...mapState(['characters', 'episodes', 'deaths', 'quotes']),
    responsibleDeaths () {
      let d = this.deaths.filter(item => {
        let str = item.responsible
        return str.includes(this.$route.params.name)
      })
      if (d.length === 0) {
        d = [{ death: 'unknown' }]
      }
      return d
    },
    characterQuotes () {
      let q = this.quotes.filter(item => {
        let str = item.author
        return str.includes(this.$route.params.name)
      })
      if (q.length === 0) {
        q = [{ quote: 'unknown' }]
      }
      return q
    },
    timelineItems () {
      let listItems = []
      let listEpisodes = this.episodes.filter(item => {
        return item.characters.indexOf(this.character.name) > -1
      })
      listEpisodes = listEpisodes.map(item => {
        return {
          icon: 'mdi-movie-open-settings-outline',
          title: 'Episode',
          text: item.title
        }
      })
      let listDeaths = this.responsibleDeaths.map(item => {
        return {
          icon: 'mdi-coffin',
          title: 'Death',
          text: item.death
        }
      })
      listItems = [{
        icon: 'mdi-cake',
        title: 'Birthday',
        text: this.character.birthday
      }, ...listEpisodes, ...listDeaths, {
        icon: 'mdi-account',
        title: 'Status',
        text: this.character.status
      }]
      return listItems
    }
  }
}
</script>

<style scoped>

</style>
