<script setup>
    import { ref } from 'vue';

    const dataInicial = ref('')
    const dataFinal = ref('')

    const meses = [
        {
            Label: 'Janeiro', valor: 1
        },
        {
            Label: 'Fevereiro', valor: 2
        },
        {
            Label: 'Março', valor: 3
        },
        {
            Label: 'Abril', valor: 4
        },
        {
            Label: 'Maio', valor: 5
        },
        {
            Label: 'Junho', valor: 6
        },
        {
            Label: 'Julho', valor: 7
        },
        {
            Label: 'Agosto', valor: 8
        },
        {
            Label: 'Setembro', valor: 9
        },
        {
            Label: 'Outubro', valor: 10
        },
        {
            Label: 'Fevereiro', valor: 11
        },
        {
            Label: 'Dezembro', valor: 1
        },
    ]

    function selecionarMes(mes){
        console.log('Teste de mes:', mes)
    }

</script>

<template>
    <div class="container">
         <q-btn-dropdown color="primary" label="Período">
      <q-list>
        <q-item
          v-for="mes in meses"
          :key="mes.valor"
          clickable
          v-close-popup
          @click="selecionarMes(mes)"
        >
          <q-item-section>
            <q-item-label>{{ mes.Label }}</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-btn-dropdown>
        
        <q-input v-model="date" class="data" hint="Data inicial" filled type="date" />
        <q-input v-model="date"class="data" hint="Data final" filled type="date" />

    </div>
</template>

<style scoped>
   .container {
  display: flex;
  align-items: center;
  margin-top: 20px;
}

.data {
  width: 160px;
  margin: 10px;
}

</style>