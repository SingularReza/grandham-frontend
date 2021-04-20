<template>
  <div class="iteminfo">
    <img :src="'http://localhost:8000/image/'+getInfo.bannerImage"/>
    <div class="info-wrapper">
      <img class="coverimage" :src="'http://localhost:8000/image/'+getInfo.coverImage.large"/>
      <div class="desc-wrapper">
        <h3>{{getInfo.title.romaji}}</h3>
        {{getInfo.description}}
      </div>
    </div>
    <div class="bottom-wrapper">
      <div class="tape-wrapper">
          <div>Episodes<br/>{{getInfo.episodes}}</div>
          <div>Format<br/>{{getInfo.format}}</div>
          <div>Start Date<br/>{{getInfo.startDate.day+'/'+getInfo.startDate.month+'/'+getInfo.startDate.year}}</div>
          <div>End Date<br/>{{getInfo.endDate.day+'/'+getInfo.endDate.month+'/'+getInfo.endDate.year}}</div>
          <div>Genres<br/>{{getInfo.genres.toString()}}</div>
          <div>English Title<br/>{{getInfo.title.english}}</div>
        </div>
      <div class="episodes-list">
          <div class="episode"
            v-for="(episode, index) in getInfo.episodelist"
            :key="index"
            @click="streamEpisode(episode.fileid)">{{episode.filename}}</div>
        </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import api from '@/services/Api'
import streamHandler from '@/services/StreamHandler'

export default {
  name: 'ItemInfo',
  data () {
    return {
      info: { id: 3167, title: { romaji: 'Eve no Jikan', english: 'Time of Eve' }, coverImage: { large: 'bx3167-IBEzQTk9wvbr.jpg' }, bannerImage: '3167-e2qIc6utiYEC.jpg', description: "The future, probably Japan. Robots have long been put into practical use, and androids have just come into use.<br><br>\nInfluenced by the Robot Ethics Committee, it's become common sense for people to treat androids like household appliances. Their appearance - indistinguishable from humans except for the ring over each android's head - has led some people to empathize unnecessarily with androids. Known as \"android-holics\", such people have become a social problem.<br><br>\nRikuo, a high school student, has been taught from childhood that androids are not to be viewed as humans, and has always used them as convenient tools. One day Rikuo discovers some strange data in the behavior records of his family's household android, Sammy.<br><br>\nRikuo and his friend Masaki trace Sammy's movements, only to discover a mysterious caf&eacute; that features a house rule that \"humans and robots are to be treated the same\"...<br><br>\n(Source: Official Website - English)", format: 'ONA', episodes: 6, duration: 17, genres: ['Sci-Fi', 'Slice of Life', ''], startDate: { year: 2008, month: 8, day: 1 }, endDate: { year: 2009, month: 9, day: 18 }, folderid: '1WAiNtLNeAPiLNPO7syBFz-HQiSi16sPA', episodelist: [{ fileid: '194IiLxwNnsnt0oahkwpP1OWhTkcZAM5W', filename: '[Yabai]_EVE_no_Jikan_-_01_[DVD][397A3F67].mkv', fileduration: 905863, filesize: 109764081, fileheight: 480, filewidth: 720 }, { fileid: '1i3zr4q2VHXJTjgaNOLpzaw6Qlj_m0XyZ', filename: '[Yabai]_EVE_no_Jikan_-_02_[DVD][07153138].mkv', fileduration: 945278, filesize: 98931524, fileheight: 480, filewidth: 720 }, { fileid: '1o4z2ZAT3RgIC6NHLTgsg-MrbxnFY_qrv', filename: '[Yabai]_EVE_no_Jikan_-_03v2_[DVD][C6033409].mkv', fileduration: 972846, filesize: 119035634, fileheight: 480, filewidth: 720 }, { fileid: '1hyyW4jvFo4Ay66ZJoWp02weVeGlOgzXY', filename: '[Yabai]_EVE_no_Jikan_-_04_[DVD][E14F07FF].mkv', fileduration: 1002960, filesize: 271100659, fileheight: 480, filewidth: 720 }, { fileid: '1wvV-Zj0EV8Bj3NtIvBq09vgCNnhS4bs7', filename: '[Yabai]_EVE_no_Jikan_-_05_[DVD][46F1FA3F].mkv', fileduration: 1056054, filesize: 188810455, fileheight: 480, filewidth: 720 }, { fileid: '19fC6xvN2MZ_ubDIuyH-vbsKhZGZVY3C9', filename: '[Yabai]_EVE_no_Jikan_-_06_[DVD][770460BD].mkv', fileduration: 1666204, filesize: 268848697, fileheight: 480, filewidth: 720 }] }
    }
  },
  computed: {
    getInfo () {
      // if (typeof this.info.coverImage === 'undefined') return
      return this.info
    }
  },
  methods: {
    async downloadEpisode (fileID, fileName) {
      var res = await api.getAccessToken()
      console.log(res.data)
      streamHandler.downloadFile(fileID, fileName, res.data)
    },
    async streamEpisode (fileID) {
      var token = await api.getAccessToken()
      streamHandler.streamFile(token.data, fileID)
        .then(res => {
          window.open(res.data.webViewLink)
        })
    }
  },
  created () {
    console.log('here')
    var itemData = {
      id: Number(this.$route.params.id),
      type: this.$route.params.type
    }
    api.getItemInfo(itemData).then(res => {
      this.info = res.data
      this.info.episodelist.sort((a, b) => (a.filename > b.filename) ? 1 : ((b.filename > a.filename) ? -1 : 0))
    })
  }
}
</script>

<style scoped>
.item-info {
  position: relative;
}

.info-wrapper {
  padding: 30px 70px 0px 30px;
  min-height: 100px;
  background-color:  rgb(82, 74, 74);
  position: relative;
  bottom: 5px;
  display: grid;
  grid-template-columns: 30% auto;
  grid-template-rows: auto 0px;
}

.tape-wrapper {
  background-color: rgba(82, 74, 74);
  border: 1px solid black;
  border-radius: 4px;
  max-height: 100%;
  padding: 40px;
}

.tape-wrapper div {
  color: aliceblue;
  padding-bottom: 50px;
  text-align: left;
  line-height: 25px;
  overflow-wrap: break-word;
}

.desc-wrapper {
  color:aliceblue;
  text-align: left;
}

img {
  max-width:100%;
}

.coverimage {
  display: block;
  position: relative;
  bottom: 100px;
  left: 100px;
  z-index: 100;
}

.episode {
  background-color: rgb(82, 74, 74);
  height: 50px;
  width: 50%;
  color:aliceblue;
  border: 1px solid black;
  border-radius: 4px;
  margin: 0 auto;
  margin-top: 20px;
  text-align:center;
  line-height: 50px;
  cursor: pointer;
  overflow: hidden;
  text-overflow: ellipsis;
}

.bottom-wrapper {
  display: grid;
  grid-template-columns: 20% auto;
  padding: 40px 0px 40px 40px;
}
</style>
