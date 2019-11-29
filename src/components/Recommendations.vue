<template>
  <div class="container">
    <nav class="navbar fixed-top navbar-expand-lg navbar-light bg-light navbar-expand">
      <div class="container">
        <a class="navbar-brand" href="#">anime recommendation</a>
        <button class="navbar-toggler" type="button" data-toggle="collapse"
                aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
      </div>
    </nav>
    <div class="row">
      <div class="col-12">
        <form class="mb-4" @submit.prevent="getAnimes()">
          <div class="form-group">
            <label for="title">Title:</label>
            <vue-simple-suggest
              v-model="name"
              display-attribute="name"
              value-attribute="name"
              :min-length=3
              :debounce=100
              :list="getNames"
              :styles="formStyle">
            </vue-simple-suggest>
          </div>
          <button type="submit" class="btn btn-outline-secondary btn-sm">Submit</button>
        </form>

        <table class="table table-hover table-sm">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">Genre</th>
              <th scope="col">Type</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(anime, index) in animes" :key="index">
              <th scope="row">{{ index }}</th>
              <td>{{ anime.name }}</td>
              <td>{{ anime.genre }}</td>
              <td>{{ anime.type }}({{ anime.episodes }})</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import VueSimpleSuggest from 'vue-simple-suggest';
import 'vue-simple-suggest/dist/styles.css';

export default {
  components: {
    VueSimpleSuggest,
  },
  data() {
    return {
      name: '',
      animes: [],
      suggestions: [],
      formStyle: {
        defaultInput: 'form-control form-control-sm',
        suggestions: '',
      },
    };
  },
  methods: {
    getAnimes() {
      const path = `http://localhost:5000/recommendations?name=${this.name}`;
      axios.get(path)
        .then((res) => {
          this.animes = res.data;
        })
        .catch((error) => {
          // eslint-disable-next-line
          console.error(error);
        });
    },
    getNames() {
      const path = `http://localhost:5000/search?name=${this.name}`;
      return fetch(path, { method: 'GET' })
        .then(response => response.json());
    },
  },
};
</script>
