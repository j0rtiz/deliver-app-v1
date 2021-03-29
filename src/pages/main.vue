<template>
  <q-page class="flex flex-center">
    {{ contas }}
  </q-page>
</template>

<script>
export default {
  name: 'Main',
  data() {
    return {
      contas: [],
    };
  },
  mounted() {
    this.buscarContas();
  },
  methods: {
    async buscarContas() {
      this.$q.loading.show();

      try {
        const axiosConfig = { method: 'GET', url: '/Contas' };

        this.contas = await this.$axios(axiosConfig).then(res => res.data);
      } catch (err) {
        this.axiosCatch(err);
      } finally {
        this.$q.loading.hide();
      }
    },
  },
};
</script>
