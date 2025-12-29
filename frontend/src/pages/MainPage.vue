<script setup>
import { ref, onMounted} from 'vue';
import { ListarLancamentosService } from '@/service/CarregarService';
import Grafico from '@/components/Grafico.vue';
import GerarLancamento from '@/components/GerarLancamento.vue';

//Armazena os lançamentos carregados da API
const lancamentos = ref([])

//Consulta os lançamentos na API
async function carregarLancamentos() {
    try {
        const dados = await ListarLancamentosService.listar()
        console.log('Dados da api', dados)

        // Verifica se os dados são um array antes de atribuir
        lancamentos.value = Array.isArray(dados) ? dados : []
        console.log('Lançamentos carregados:', lancamentos.value)
    } catch (error) {
        console.error('Erro ao carregar lançamentos:', error)
        lancamentos.value = []
    }
}

//Carrega os lançamentos ao montar o componente
onMounted(  () => {
 carregarLancamentos()
    
})
//Funções de formatação 

function formatarData(data){
    if(!data) return ''
    const d = new Date(data)
    return d.toLocaleDateString('pt-BR')
}

function formatarValor(valor){
    if(valor === null || valor === undefined) return ''
    return Number(valor).toLocaleString('pt-BR',{
        style: 'currency',
        currency: 'BRL'
    })
}

//Define as colunas da tabela
const colunas = [
    { name: 'data', label: 'Data de Vencimento', field: 'datavenc', align: 'left', format: dat => formatarData(dat)},
    { name: 'descricao', label: 'Descrição', field: 'descricao', align: 'left' },
    { name: 'valor', label: 'Valor', field: 'valor', align: 'right', format: val => formatarValor(val)},
    { name: 'tipo', label: 'Tipo', field: 'tipo' },
]

// Controle de exibição do modal
const mostrarModal = ref(false);

// Função para abrir o modal
function abrirModal() {
    mostrarModal.value = true
}

// Função para fechar o modal
function fecharModal() {
    mostrarModal.value = false
}

//Recebe os dados do lançamento salvo, e fecha o modal
function salvarLancamento(dados) {
    console.log('Dados do lançamento:', dados)
    fecharModal()
    carregarLancamentos()
}





</script>

<template>
    <!--Tabela de lançamentos-->

    <div class="container">
        <q-table
        title="Lançamentos Gerados"
        :rows="lancamentos"
        :columns="colunas"
        row-key="id"
        dense
        flat
        bordered
        hide-pagination
        style="max-height: 320px"

    />
    <!--Botão para abrir o modal-->
        <q-btn color="primary" label="Gerar Lançamento" @click="abrirModal" class="btn-modal" />
        <div class="grafico">
            <Grafico />
        </div>
         
    </div>
    
    <!--Modal de registro de lançamento-->
    <q-dialog v-model="mostrarModal" persistent>
        <!--Componente de geração de lançamento-->
        <GerarLancamento :mostrar="mostrarModal" @fechar="fecharModal" @salvar="salvarLancamento" />
    </q-dialog>

     
</template>

<style scoped>
.container {
    margin-top: 150px;
    
    width: 100%;
    display: flex;
    flex-direction: column; /* organiza em coluna */
}

.btn-modal {
    align-self: flex-end; /* botão à direita */
    margin: 15px 20px 20px 0;
}

.grafico {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
} 
</style>