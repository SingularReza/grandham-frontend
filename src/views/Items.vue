<template>
  <div class="items">
    <img alt="Vue logo" src="../assets/logo.png">
    <ItemCard/>
  </div>
</template>

<script>
// @ is an alias to /src
import ItemCard from '@/components/ItemCard.vue'

export default {
  name: 'Items',
  components: {
    ItemCard
  }
}
</script>
