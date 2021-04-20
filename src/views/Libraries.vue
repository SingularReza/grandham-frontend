<template>
  <div class="libraries">
    <LibraryCard
    v-for="(lib, index) in libraries"
    :key="index"
    :id="lib.id"
    :name="lib.name"
    :type="lib.type"/>
    <LibraryCard  @addedLibrary="updateLibraries"/>
  </div>
</template>

<script>
// @ is an alias to /src
import api from '@/services/Api'
import LibraryCard from '@/components/LibraryCard.vue'

export default {
  name: 'Libraries',
  components: {
    LibraryCard
  },
  data () {
    return {
      libraries: []
    }
  },
  methods: {
    updateLibraries (libraryData) {
      this.libraries.push(libraryData)
    }
  },
  created () {
    api.getLibraryList({ range: [10, 0] })
      .then(res => {
        this.libraries = res.data
      })
  }
}
</script>

<style scoped>
.libraries {
  display: grid;
  grid-gap: 30px 40px;
  grid-template-columns: auto auto auto;
  justify-content: center;
  padding: 40px;
}
</style>
