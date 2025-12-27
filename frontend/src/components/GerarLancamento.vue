<script setup>
import { ref } from 'vue';
import { useNotify } from '@/composables/useNotify';
import { LancamentoService } from '@/service/LacamentoService';

const date = ref('')
const obs = ref('')
const number = ref('')
const tipo = ref('')
const { notify } = useNotify()

const salvarLancamento = async () => {
    const payload = {
        descricao: obs.value,
        datavenc: date.value,
        valor: Number(number.value),
        tipo: tipo.value ? 'R' : 'P'
    }

    try {
        await LancamentoService.criar(payload)
        console.log('Salvo com sucesso')
        notify("Registro Efetuado", "positive", "top", 5000)
    } catch (err) {
        console.log('Houve um erro ao salvar', err)
        notify("Erro ao salvar no banco", "negative", "top", 5000)
    }

}
</script>

<template>
    <h2>
        Registro de Lançamentos
    </h2>
    <div class="container">
        <div class="date">
            <q-input v-model="date" filled type="date" hint="Data de Vencimento da parcela" />
        </div>
        <div class="desc">
            <q-input v-model="obs" filled type="text" hint="Descrição" />
        </div>
        <div class="vlr">
            <q-input v-model="number" filled type="number" hint="Valor da parcela" />
        </div>
        <div class="tipo">
            <q-checkbox name="tipo_conta" v-model="tipo" true-value="R" false-value="P" label="Recebimento?" />
        </div>
        <div class="acoes">
            <q-btn color="blue" label="Salvar" @click="salvarLancamento" />
            <q-btn color="red" label="Cancelar" />
        </div>
    </div>

</template>

<style scoped>

h2 {
    text-align: center;
    font-size: 36px;
    margin-bottom: 20px;
}

.container {
    max-width: 700px;
    margin: 40px auto;
    padding: 24px;
    background: #f2f2f2;
    border-radius: 12px;
    display: grid;
    grid-template-columns: 2fr 1fr;
    gap: 16px;
}

.date,
.desc {
    grid-column: span 2;
}

.acoes {
    grid-column: span 2;
    display: flex;
    justify-content: flex-end;
    gap: 12px;
}

</style>
