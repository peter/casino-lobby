<template>
  <div class="home">
    <h1 class="ui center aligned header">Casino Lobby</h1>

    <div class="ui container">
      <div class="ui relaxed divided items">
        <div class="item" v-for="game in games" v-bind:key="game.id">
          <div class="ui small image">
            <img :src="game.thumbnailUrl">
          </div>

          <div class="content">
            <a class="header">{{game.name}}</a>
            <div class="meta">
              <a>{{game.gameProvider}}</a>
            </div>
            <div class="description">
              {{game.description}}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Games from '@/services/games'

const LIMIT = 100

export default {
  data () {
    return {
      games: []
    }
  },
  created () {
    this.getData()
  },
  watch: {
    '$route': 'getData'
  },
  methods: {
    getData () {
      Games.list().then(({games}) => {
        this.games = games.slice(0, LIMIT)
      })
    }
  }
}
</script>
