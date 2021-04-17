<template>
  <div class="iteminfo">
    <img :src="'http://127.0.0.1:8000/image/'+info.bannerImage"/>
    <img class="coverimage" :src="'http://127.0.0.1:8000/image/'+info.coverImage.large"/>
    <div class="info-wrapper">
      <h3>{{info.title.romaji}}</h3>
      <div class="desc-wrapper">{{info.description}}</div>
      <div class="tape-wrapper">
        <div>{{info.episodes}}</div>
        <div>{{info.format}}</div>
        <div>{{info.startDate.day+'/'+info.startDate.month+'/'+info.startDate.year}}</div>
        <div>{{info.genres.toString()}}</div>
      </div>
    </div>
    <div class="episodes-list">
        <div v-for="(episode, index) in info.episodelist" :key="index">{{episode.filename}}</div>
      </div>
  </div>
</template>

<script>
// @ is an alias to /src
import api from '@/services/Api'

export default {
  name: 'ItemInfo',
  data () {
    return {
      info: {

      }
    }
  },
  created () {
    var itemData = {
      id: Number(this.$route.params.id),
      type: this.$route.params.type
    }
    api.getItemInfo(itemData).then(res => {
      this.info = res.data
    })
  }
}
</script>

<style scoped>
.info-wrapper {
  padding: 20px 40px 20px 400px;
}

.tape-wrapper {
  display: grid;
  grid-template-columns: auto auto auto auto;
  background-color: red;
}

img {
  max-width:100%;
}

.coverimage {
  position: absolute;
  left: 100px;
  top: 300px;
}

.episodes-list {
  background-color: green;
}
</style>
