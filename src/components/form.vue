<template>
  <q-dialog ref="dialog" @hide="$emit('hide')">
    <q-card class="q-dialog-plugin">
      <q-card-section>
        <div class="text-h5 text-weight-bolder text-grey-9 q-pb-sm" v-text="'Conta'" />
      </q-card-section>

      <q-card-section>
        <q-form class="row q-gutter-y-sm">
          <q-input
            v-model="form.nome"
            class="col-12"
            label="Nome"
            color="primary"
            bottom-slots
            outlined
            dense
            :error="$v.form.nome.$error"
          >
            <template v-slot:error> Campo obrigatório </template>
          </q-input>

          <q-input
            v-model="form.valorOriginal"
            type="number"
            class="col-12"
            label="Valor Original"
            color="primary"
            bottom-slots
            outlined
            dense
            :error="$v.form.valorOriginal.$error"
          >
            <template v-slot:error> Campo obrigatório </template>
          </q-input>

          <q-input
            ref="inputDataVencimento"
            v-model="form.dataVencimento"
            class="col-12"
            label="Data de Vencimento"
            color="primary"
            bottom-slots
            outlined
            dense
            :error="$v.form.dataVencimento.$error"
            @focus="$refs.popupDataVencimento.show()"
          >
            <template v-slot:append>
              <q-icon class="cursor-pointer" name="event">
                <q-popup-proxy
                  ref="popupDataVencimento"
                  transition-show="scale"
                  transition-hide="scale"
                  @hide="$refs.inputDataVencimento.blur()"
                >
                  <q-date v-model="form.dataVencimento" landscape minimal @input="$refs.popupDataVencimento.hide()" />
                </q-popup-proxy>
              </q-icon>
            </template>

            <template v-slot:error> Campo obrigatório </template>
          </q-input>

          <q-input
            ref="inputDataPagamento"
            v-model="form.dataPagamento"
            class="col-12"
            label="Data de Pagamento"
            color="primary"
            bottom-slots
            outlined
            dense
            :error="$v.form.dataPagamento.$error"
            @focus="$refs.popupDataPagamento.show()"
          >
            <template v-slot:append>
              <q-icon class="cursor-pointer" name="event">
                <q-popup-proxy
                  ref="popupDataPagamento"
                  transition-show="scale"
                  transition-hide="scale"
                  @hide="$refs.inputDataPagamento.blur()"
                >
                  <q-date v-model="form.dataPagamento" landscape minimal @input="$refs.popupDataPagamento.hide()" />
                </q-popup-proxy>
              </q-icon>
            </template>

            <template v-slot:error> Campo obrigatório </template>
          </q-input>
        </q-form>
      </q-card-section>

      <q-card-actions align="right">
        <q-btn class="q-mr-sm q-mb-sm" color="primary" label="OK" @click="save" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
import { required } from 'vuelidate/lib/validators';

export default {
  name: 'Form',
  data() {
    return {
      form: {
        nome: '',
        valorOriginal: '',
        dataVencimento: '',
        dataPagamento: '',
      },
    };
  },
  validations: {
    form: {
      nome: {
        required,
      },
      valorOriginal: {
        required,
      },
      dataVencimento: {
        required,
      },
      dataPagamento: {
        required,
      },
    },
  },
  methods: {
    show() {
      this.$refs.dialog.show();
    },
    hide() {
      this.$refs.dialog.hide();
    },
    async save() {
      this.$v.form.$touch();

      if (this.$v.form.$error) {
        return undefined;
      }

      this.$q.loading.show();

      try {
        const axiosConfig = {
          method: 'POST',
          url: '/Contas',
          data: this.form,
        };

        await this.$axios(axiosConfig);

        this.axiosSuccess('Salvo com sucesso');
      } catch (err) {
        this.axiosCatch(err);
      } finally {
        this.$q.loading.hide();
        this.$emit('ok');
        this.hide();
      }
    },
  },
};
</script>
