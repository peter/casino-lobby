<template>
  <div class="ui container home">
    <h1 class="ui center aligned header">Casino Lobby</h1>

    <form class="ui form filter">
        <div class="field">
          <label for="gameProvider">Game Provider</label>
          <select name="gameProvider" v-model="filter.gameProvider">
            <option :value="gameProvider" v-for="gameProvider in GAME_PROVIDERS" v-bind:key="gameProvider">{{gameProvider}}</option>
          </select>
        </div>

        <div class="field">
          <label for="gameCollectionId">Game Collections</label>
          <select name="gameCollectionIds" v-model="filter.gameCollectionIds" multiple="">
            <option :value="gameCollectionId" v-for="gameCollectionId in GAME_COLLECITON_IDS" v-bind:key="gameCollectionId">{{gameCollectionId}}</option>
          </select>
        </div>

        <div class="field" v-if="hasFilter() && games.length > 0">
          <a href="#" @click="clearFilter()">Clear filter</a>
        </div>
    </form>

    <div class="ui container">
      <div v-if="$store.state.loading" class="loader">
        <img src="/ajax-loader.gif">
      </div>
      <div class="ui relaxed divided items" v-if="games.length > 0">
        <div class="item" v-for="game in games" v-bind:key="game.id">
          <div class="ui small image">
            <img :src="game.thumbnailUrl">
          </div>

          <div class="content">
            <a class="header">{{game.name}}</a>
            <div class="meta">
              <div class="game-provider">
                {{game.gameProvider}}
              </div>
              <ul class="collection-ids">
                <li v-for="collectionId in game.gameCollectionIds" v-bind:key="collectionId">
                  {{collectionId}}
                </li>
              </ul>
            </div>
            <div class="description">
              {{game.description}}
            </div>
          </div>
        </div>
      </div>
      <div v-else-if="!$store.state.loading">
        <p v-if="hasFilter()">
          No games match your filter. <a href="#" @click="clearFilter()">Clear filter</a>
        </p>
        <p v-else>
          No games
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import Games from '@/services/games'
import {isMissing, compact} from '@/util'

const LIMIT = 50

const GAME_PROVIDERS = [
  null,
  'BALLY',
  'BETSOFT',
  'COZY',
  'EVOLUTION',
  'IGT',
  'KAMBI',
  'MERKUR',
  'MICRO',
  'NETENT',
  'NETENTLIVECASINO',
  'NOLIMITCITY',
  'ODOBO',
  'OGS',
  'PLAYNGO',
  'PLAYTECH',
  'QUICKSPIN',
  'REDTIGER',
  'SCIENTIFIC',
  'YGGDRASIL'
]

const GAME_COLLECITON_IDS = [
  'All-Games-A-Z',
  'Freespins in Spring',
  'all-tables-live',
  'allgames',
  'apple-drop',
  'baccarat-live',
  'best-jackpots',
  'blackjack-live',
  'bygones-bigones',
  'cascading-wilds-1',
  'cascading-wilds-2',
  'cash-year',
  'cash-year-ca',
  'cash-year-dk',
  'casino-reactivation',
  'christmas-01',
  'christmas-02',
  'christmas-03',
  'christmas-04',
  'christmas-05',
  'christmas-07',
  'christmas-08',
  'christmas-09',
  'christmas-10',
  'christmas-11',
  'christmas-12',
  'christmas-13',
  'christmas-14',
  'christmas-15',
  'christmas-16',
  'christmas-17',
  'christmas-18',
  'christmas-19',
  'christmas-20',
  'christmas-21',
  'christmas-22',
  'christmas-23',
  'christmas-24',
  'christmas-25',
  'christmas-26',
  'christmas-calendar',
  'christmas-hero',
  'club-royale-christmas-blackjack',
  'club-royale-christmas-live',
  'club-royale-happy-hours',
  'club-royale-live',
  'club-royale-macau',
  'cr-blackjack',
  'cup-1',
  'cup-2',
  'cup-3',
  'dach-ygg-11',
  'egypt-vs-vikings',
  'extreme-golden-aces',
  'fairytale-party',
  'fly-high-1',
  'fly-high-2',
  'free-spin-generator',
  'gadget-drop',
  'global-music-festival',
  'gold-card',
  'golden',
  'green-room',
  'guardians-of-asgard',
  'halloween-live-boost',
  'happy-hour',
  'happy-hours',
  'high-frequency-1',
  'high-frequency-2',
  'hot-jackpots',
  'jackpot',
  'lightning-campaign',
  'live',
  'live-beyond-live-freespins',
  'live-extreme-match',
  'live-jackpot',
  'lucky-21',
  'lucky-symbols',
  'mrg',
  'mrgreen',
  'my-free-spin-adventure',
  'netent-money-maker-promo',
  'new-year-new-york',
  'newgames',
  'party-prize-draw',
  'poker-live',
  'primate-playtime',
  'pyramid-promotion',
  'reward-fs',
  'roulette-live',
  'santa-workshop',
  'senior-journey',
  'slots',
  'sundance-kid',
  'super-roulette',
  'super-roulette-clash',
  'table-games',
  'test-category',
  'test-pilot',
  'the-party-collection',
  'top-rated',
  'top-rated-live',
  'viking-collection',
  'vip-collection',
  'welcome-offer',
  'welcome-offer-2',
  'win-car-yggdrasil',
  'world-jackpot',
  'world-of-wonder',
  'yggdrasil-christmas',
  'yggdrasil-christmas-01',
  'yggdrasil-christmas-02',
  'yggdrasil-christmas-03',
  'yggdrasil-christmas-04',
  'yggdrasil-christmas-05',
  'yggdrasil-christmas-06',
  'yggdrasil-christmas-07',
  'yggdrasil-christmas-08'
]

function emptyFilter () {
  return {
    gameProvider: null,
    gameCollectionIds: []
  }
}

export default {
  data () {
    return {
      games: [],
      GAME_PROVIDERS,
      GAME_COLLECITON_IDS,
      filter: emptyFilter()
    }
  },
  created () {
    this.getData()
  },
  watch: {
    '$route': 'getData',
    filter: {
      handler: 'getData',
      deep: true
    }
  },
  methods: {
    getData () {
      this.games = []
      const params = Object.assign(this.filterParams(), {limit: LIMIT})
      Games.list({params}).then(({games}) => {
        this.games = games
      })
    },
    filterParams () {
      return Object.entries(this.filter).reduce((acc, [key, value]) => {
        const filterKey = `filter.${key}`
        if (Array.isArray(value)) {
          if (value.length > 0) acc[filterKey] = value.join(',')
        } else if (value !== null) {
          acc[filterKey] = value
        }
        return acc
      }, {})
    },
    hasFilter () {
      return !isMissing(compact(this.filter))
    },
    clearFilter () {
      for (const [key, value] of Object.entries(emptyFilter())) {
        this.filter[key] = value
      }
    }
  }
}
</script>

<style>
  .filter {
    margin-bottom: 20px;
  }
  .game-provider {
    margin-bottom: 5px;
  }
  ul.collection-ids {
    display: flex;
    list-style: none;
    padding-left: 0;
  }
</style>
