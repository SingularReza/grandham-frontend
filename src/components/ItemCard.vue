<template>
  <div class="item-card" @click="goToMedia">
    <img :src="'http://127.0.0.1:8000/image/'+posterpath"/>
    {{name}}
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
      console.log(this.$route.params.type)
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
  background-color: rgba(82, 74, 74, 0.685);
  margin: 10px;
}

img {
  height:100%;
}
</style>
