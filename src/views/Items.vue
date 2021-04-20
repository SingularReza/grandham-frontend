<template>
  <div class="items">
    <ItemCard
    v-for="(item, index) in items"
    :key="index"
    :id="item.id"
    :name="item.name"
    :posterpath="item.posterpath"/>
  </div>
</template>

<script>
// @ is an alias to /src
import api from '@/services/Api'
import ItemCard from '@/components/ItemCard.vue'

export default {
  name: 'Items',
  components: {
    ItemCard
  },
  data () {
    return {
      items: []
    }
  },
  mounted () {
    var libraryData = {
      id: Number(this.$route.params.id),
      type: this.$route.params.type,
      range: [Number(this.$route.params.range), 0]
    }
    api.getLibraryItems(libraryData).then(res => {
      this.items = res.data.items
    })
  }
}
</script>

<style scoped>
.items {
  display: grid;
  grid-gap: 30px 40px;
  grid-template-columns: auto auto auto auto auto;
  justify-content: center;
  padding: 40px;
}
</style>
