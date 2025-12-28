<script setup>
import { ref } from 'vue';
// Importa o composable de notificação
import { useNotify } from '@/composables/useNotify';
// Importa o serviço de lançamento
import { LancamentoService } from '@/service/LacamentoService';

const { notify } = useNotify()
//Emits
const emit = defineEmits(['fechar', 'salvar'])

const date = ref('')
const obs = ref('')
const number = ref('')
const tipo = ref('')



const salvarLancamento = async () => {
    //Função para salvar o lançamento 
    const payload = {
        descricao: obs.value,
        datavenc: date.value,
        valor: Number(number.value),
        tipo: tipo.value ? 'R' : 'P'
    }
    emit('salvar', {
        descricao: obs.value,
        datavenc: date.value,
        valor: Number(number.value),
        tipo: tipo.value ? 'R' : 'P'
    })

    try {
        //Caso tudo ocorra bem, salva o lançamento e gera o notificação positiva
        await LancamentoService.criar(payload)
        console.log('Salvo com sucesso')
        notify("Registro Efetuado", "positive", "top", 5000)
    } catch (err) {
        //Caso ocorra algum erro, gera a notificação negativa
        console.log('Houve um erro ao salvar', err)
        notify("Erro ao salvar no banco", "negative", "top", 5000)
    }

}

function fecharModal() {
    emit('fechar')
}

</script>

<template>
    <!--Corpo do modal-->
    <q-card style="min-width: 700px; overflow: hidden;"> 
        <!--Cabeçalho do modal-->   
        <q-card-section> 
            <h2>
                Registro de Lançamentos 
            </h2>
        </q-card-section>
        <!-- Começo dos Inputs do modal-->
        <q-card-section>
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
                    <q-btn color="red" label="Cancelar" @click="fecharModal" />
                </div>
            </div>
            
        </q-card-section>
        <!-- Começo dos Inputs do modal-->
    </q-card>
    <!--Fim do corpo do modal-->
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
