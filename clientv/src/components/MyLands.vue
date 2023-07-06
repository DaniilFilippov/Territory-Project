<template>
  <div>
    <h1>Земельные участки</h1>
    <input v-model="name" type="name" name="name" placeholder="name"/>
    <br>
    <br>
    <button @click="mounted">Показать земельные участки</button>
    <br>
    <div v-for="terr in info" :key ="terr.rn">
        <ul>
          <li>Идентификатор: {{terr.ID}} </li>
          <li>Наименование: {{terr.NAME}} </li>
          <li>Примечание:  {{terr.NOTE}} </li>     
        </ul> 
       <div id="svgMap">
       
       </div>
       {{strToSvg(terr.SVGMAP)}}
    </div>
  </div>
</template>

<script defer >
import AuthenticationService from '@/services/AuthenticationService'
import axios from 'axios'
export default {
  name: 'MyLands',
  data () {
    return {
      name: '',
      info: null,
      json: '',
      svg: null,
      arrTer: null ,
      parser: new DOMParser()
    }
  },
  methods: {

    findLands() {
      AuthenticationService.lands().then(response => (this.info = response.data.lands)); 
      this.info = JSON.parse(this.info);
      console.log(this.info);
    },
    mounted() {
    axios
      .post('http://localhost:8081/territories')
      .then(response => (this.info = response.data.lands));
      this.arrTer = JSON.parse(JSON.stringify(this.info));
      console.log(this.arrTer);
    },
    strToSvg(str) {
      const parser = new DOMParser();
      let doc = parser.parseFromString(str,'image/svg+xml');
      console.log(doc);
      const elem = document.getElementById("svgMap");
      elem.style.background = 'red';
    }
  }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  li {
    list-style: none;
  }
</style>
