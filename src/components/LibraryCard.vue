<template>
  <div class="library-card">
      <div class="library" v-if="showForm==1||id>0" @click="goToLibrary">
        <h3>{{name}}</h3>
        <h6>{{type}}</h6>
      </div>
      <div class="add-library" v-else-if="showForm==2">
        <img src="../assets/plus-icon.png" @click="showForm=3"/>
      </div>
       <div class="library-form" v-if="showForm==3" @click="showForm=2">
          <input v-model="libraryInfo.name" placeholder="name" />
          <input v-model="libraryInfo.type" placeholder="type" />
          <textarea v-model="libraryInfo.folderids" placeholder="folders"></textarea>
          <button @click="addLibrary(libraryInfo)">Create</button>
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
        name: '',
        type: '',
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
    goToLibrary () {
      console.log('clicked')
      this.$router.push({
        name: 'Items',
        params: {
          id: this.id,
          type: this.type,
          range: 30
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
  margin: 10px;
  background-image: url('../assets/animelibrary.jpg');
  background-size: cover;
  border: .5px solid black;
  border-radius: 10px;
  overflow: hidden;
  cursor: pointer;
}

.library {
  background-color: rgb(82, 74, 74);
  color: whitesmoke;
  height: 70px;
  position: relative;
  top: 180px;
}

.library-form {
  background-color: rgb(82, 74, 74);
  height: 250px;
  padding: 20px;
  text-align:center;
}

h3, h6 {
  margin: 0px;
  text-align: left;
  padding-left: 15px;
  padding-bottom: 3px;
}

h3 {
  padding-top: 15px;
}

.add-library {
  height: 250px;
  width: 350px;
  background-color: rgb(82, 74, 74);
}

img {
  display: block;
  margin-left: auto;
  margin-right: auto;
  width: 20%;
  position: relative;
  top: 35%;
}

input, textarea {
  display: inline-block;
  border: none;
  border-radius: 4px;
  height: 30px;
  width: 70%;
  padding: 5px;
  background-color:rgba(44, 40, 40, 0.5);
  color:aliceblue;
  margin: 5px;
}

textarea {
  height: 50px;
}

button {
  border: none;
  border-radius: 4px;
  background-color:rgba(44, 40, 40, 1);
  width: 50%;
  height: 30px;
  margin-top: 5px;
  color:aliceblue;
  cursor: pointer;
}
</style>
