<template>
  <q-page class="row justify-center q-pa-md">
    <tabela class="col" :colunas="colunas" :dados="contas" titulo="Contas" />

    <q-page-sticky position="bottom-right" :offset="offset">
      <q-fab v-touch-pan.prevent.mouse="move" :disable="disable" direction="up" color="primary" icon="add">
        <q-fab-action
          label-class="bg-grey-3 text-grey-8 text-caption"
          label-position="left"
          label="Conta"
          color="primary"
          icon="fas fa-dollar-sign"
          external-label
          :disable="disable"
          @click="add"
        />
      </q-fab>
    </q-page-sticky>
  </q-page>
</template>

<script>
import { formatToDate, formatToBRL } from 'brazilian-values';
import Tabela from 'src/components/tabela';
import Form from 'src/components/form';

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
          format: (val) => this.formatDate(val),
        },
        {
          name: 'dataPagamento',
          field: 'dataPagamento',
          label: 'Data de Pagamento',
          align: 'left',
          sortable: true,
          format: (val) => this.formatDate(val),
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
      offset: [30, 30],
      disable: false,
    };
  },
  mounted() {
    this.getBills();
  },
  methods: {
    async getBills() {
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
    formatDate(valor) {
      try {
        const objData = new Date(valor);
        objData.setHours(objData.getHours() + 3);
        return formatToDate(objData);
      } catch {
        return valor;
      }
    },
    move(ev) {
      this.disable = ev.isFirst !== true && ev.isFinal !== true;
      this.offset = [this.offset[0] - ev.delta.x, this.offset[1] - ev.delta.y];
    },
    add() {
      this.$q
        .dialog({
          component: Form,
          parent: this,
        })
        .onOk(() => {
          this.getBills();
        });
    },
  },
};
</script>
