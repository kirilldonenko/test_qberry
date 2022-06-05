import Vue from "vue";
import Vuex from "vuex";
import axios from 'axios';

Vue.use(Vuex);

const store = new Vuex.Store({
    state() {
        return {
            characters: [],
            seasons: [],
            episodesBySeasons: {},
            episodes: [],
            quotes: [],
            deaths: [],
        }
    },
    mutations: {
        setEpisodes (state, payload) {
            state.episodes = payload
        },
        setCharacters (state, payload) {
            state.characters = payload
        },
        setSeasons (state, payload) {
            state.seasons = payload
        },
        setEpisodesBySeasons (state, payload) {
            state.episodesBySeasons = payload
        },
        setDeaths (state, payload) {
            state.deaths = payload
        },
        setQuotes (state, payload) {
            state.quotes = payload
        }
    },
    actions: {
        async fetchEpisodes ({commit}) {
            await axios.get('https://www.breakingbadapi.com/api/episodes').then((response) => {
                commit('setEpisodes', response.data)
            }).catch(error => console.log(error))
        },
        async fetchCharacters ({commit}) {
            await axios.get('https://www.breakingbadapi.com/api/characters').then((response) => {
                commit('setCharacters', response.data)
            }).catch(error => console.log(error))
        },
        async fetchDeaths ({commit}) {
            await axios.get('https://www.breakingbadapi.com/api/deaths').then((response) => {
                commit('setDeaths', response.data)
            }).catch(error => console.log(error))
        },
        async fetchQuotes ({commit}) {
            await axios.get('https://www.breakingbadapi.com/api/quotes').then((response) => {
                commit('setQuotes', response.data)
            }).catch(error => console.log(error))
        },
        setSeasons({commit, state}) {
            let seasons = [...new Set(state.episodes.map(el => Number(el.season)))]
            commit('setSeasons', seasons)
        },
        setEpisodesBySeasons({commit, state}) {
            let filteredEpisodes = {}
            for (let i = 0; i < state.seasons.length; i++) {
                filteredEpisodes[state.seasons[i]] = state.episodes.filter(item => Number(item.season) === state.seasons[i])
            }
            commit('setEpisodesBySeasons', filteredEpisodes)
        }
    }



});
export default store
