import { Notify } from 'quasar';
import axios from 'axios';
import _ from 'lodash';
import Vue from 'vue';

Vue.prototype.$axios = axios.create({
  baseURL: process.env.API,
  timeout: 30000,
});

const axiosCatchMixin = {
  methods: {
    axiosCatch(err, to) {
      if (to) {
        this.$router.push(to);
      }

      const message =
        _.get(err, 'response.data.error.message') ||
        _.get(err, 'response.data.errors[0].message') ||
        _.get(err, 'message', 'erro');

      Notify.create({
        icon: 'fas fa-exclamation-triangle',
        message: _.capitalize(message),
        color: 'negative',
        timeout: 3000,
      });
    },
    axiosSuccess(message, to) {
      if (to) {
        this.$router.push(to);
      }

      Notify.create({
        icon: 'fas fa-check-circle',
        color: 'positive',
        timeout: 3000,
        message,
      });
    },
  },
};

Vue.mixin(axiosCatchMixin);
