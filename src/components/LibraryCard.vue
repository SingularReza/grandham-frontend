<template>
  <div class="library-card">
      <div class="library" v-if="showForm==1||id>0">
        {{name}}
        {{type}}
      </div>
      <div class="add-library" v-else-if="showForm==2">
        <button @click="showForm=3">+</button>
      </div>
       <div class="library-form" v-if="showForm==3">
          <input v-model="libraryInfo.name" placeholder="name" />
          <input v-model="libraryInfo.type" placeholder="type" />
          <textarea v-model="libraryInfo.folderids" placeholder="folders"></textarea>
          <button @click="addLibrary(libraryInfo)"></button>
        </div>
  </div>
</template>

<script>
import api from '@/services/Api'

export default {
  name: 'LibraryCard',
  props: {
    name: String,
    type: String,
    id: Number
  },
  data () {
    return {
      libraryInfo: {
        name: 'name',
        type: 'type',
        folderids: []
      },
      showForm: 2
    }
  },
  methods: {
    addLibrary (libraryData) {
      libraryData.folderids = libraryData.folderids.split(',')
      api.createLibrary(libraryData).then(res => {
        this.$emit('addedLibrary', res.data)
      })
      this.showForm = 2
    },
    goToLibrary (libraryData) {
      this.$router.push({
        name: 'Items',
        params: {
          id: libraryData.id,
          type: libraryData.type,
          range: libraryData.range[0]
        }
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.library-card {
  height: 250px;
  width:350px;
  background-color: rgba(82, 74, 74, 0.685);
  margin: 10px;
}
</style>
