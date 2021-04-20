<template>
  <div class="item-card" @click="goToMedia">
    <img :src="'http://127.0.0.1:8000/image/'+posterpath"/>
    <div class="media-info">
      <div class="name-wrapper">{{name}}</div>
    </div>
  </div>
</template>

<script>
// import api from '@/services/Api'

export default {
  name: 'ItemCard',
  props: {
    id: Number,
    name: String,
    posterpath: String
  },
  data () {
    return {

    }
  },
  methods: {
    goToMedia () {
      console.log('first id', this.id)
      this.$router.push({
        name: 'ItemInfo',
        params: {
          id: this.id,
          type: this.$route.params.type
        }
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.item-card {
  width: 175px;
  height: 250px;
  margin: 10px;
  border: .5px solid black;
  border-radius: 10px;
  overflow: hidden;
  cursor: pointer;
}

img {
  width:100%;
}

.media-info {
  background-color:  rgba(82, 74, 74, 0.95);
  position: relative;
  height: 60px;
  bottom: 80px;
  width: 156px;
  padding: 10px;
  font-size: small;
  color: whitesmoke;
  overflow: hidden;
  text-overflow: ellipsis;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
