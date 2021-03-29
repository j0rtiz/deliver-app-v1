<template>
  <div>
    <q-table
      table-header-class="text-grey"
      :pagination.sync="pagination"
      :loading="loading"
      :columns="colunas"
      :data="dados"
      :filter="filtro"
      color="primary"
      row-key="id"
      bordered
      dense
      flat
    >
      <template v-slot:top-left>
        <div class="text-h6 text-primary q-pa-md" v-text="titulo" />
      </template>

      <template v-slot:top-right>
        <q-input
          v-model="filtro"
          class="q-py-md q-px-xs"
          placeholder="Buscar"
          color="primary"
          debounce="300"
          outlined
          dense
        >
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>
      </template>
    </q-table>
  </div>
</template>

<script>
export default {
  name: 'Tabela',
  props: {
    colunas: {
      type: Array,
      required: true,
    },
    dados: {
      type: Array,
      required: true,
    },
    titulo: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      pagination: {
        sortBy: 'id',
        descending: false,
        rowsPerPage: 15,
        page: 1,
      },
      loading: false,
      filtro: '',
    };
  },
};
</script>
