<template>
  <q-page class="row justify-center q-pa-md">
    <tabela class="col" :colunas="colunas" :dados="contas" titulo="Contas" />
  </q-page>
</template>

<script>
import { formatToDate, formatToBRL } from 'brazilian-values';
import Tabela from 'src/components/tabela';

export default {
  name: 'Main',
  components: { Tabela },
  data() {
    return {
      contas: [],
      colunas: [
        { name: 'id', field: 'id', label: '#', align: 'left', sortable: true },
        { name: 'nome', field: 'nome', label: 'Nome', align: 'left', sortable: true },
        {
          name: 'dataVencimento',
          field: 'dataVencimento',
          label: 'Data de Vencimento',
          align: 'left',
          sortable: true,
          format: (val) => this.formatarData(val),
        },
        {
          name: 'dataPagamento',
          field: 'dataPagamento',
          label: 'Data de Pagamento',
          align: 'left',
          sortable: true,
          format: (val) => this.formatarData(val),
        },
        {
          name: 'valorOriginal',
          field: 'valorOriginal',
          label: 'Valor Original',
          align: 'left',
          sortable: true,
          format: (val) => formatToBRL(val),
        },
        {
          name: 'valorCorrigido',
          field: 'valorCorrigido',
          label: 'Valor Corrigido',
          align: 'left',
          sortable: true,
          format: (val) => formatToBRL(val),
        },
        { name: 'diasAtraso', field: 'diasAtraso', label: 'Dias em Atraso', align: 'left', sortable: true },
      ],
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

        this.contas = await this.$axios(axiosConfig).then((res) => res.data);
      } catch (err) {
        this.axiosCatch(err);
      } finally {
        this.$q.loading.hide();
      }
    },
    formatarData(valor) {
      try {
        const objData = new Date(valor);
        objData.setHours(objData.getHours() + 3);
        return formatToDate(objData);
      } catch {
        return valor;
      }
    },
  },
};
</script>
