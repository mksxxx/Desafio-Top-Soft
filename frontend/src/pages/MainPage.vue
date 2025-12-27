<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { ListarLancamentosService } from '@/service/CarregarService';
import GerarLancamento from '@/components/GerarLancamento.vue';
import { format } from 'quasar';

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
onMounted(() => {
    intervalId = setInterval(carregarLancamentos, 1000) // Atualiza a cada 10 segundos
    carregarLancamentos()
})
let intervalId 

onUnmounted(()=> {
    clearInterval(intervalId)
})
onUnmounted(() => {
    
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
    <div class="tabela-container">
        <q-table
        title="Lançamentos Recentes"
        :rows="lancamentos"
        :columns="colunas"
        row-key="id"
        dense
        flat
        bordered
        hide-pagination
        style="max-height: 320px"

    />
    </div>
    <!--Botão para abrir o modal-->
        <q-btn color="primary" label="Gerar Lançamento" @click="abrirModal" class="btn-modal" />
    
    <!--Modal de registro de lançamento-->
    <q-dialog v-model="mostrarModal" persistent>
        <!--Componente de geração de lançamento-->
        <GerarLancamento :mostrar="mostrarModal" @fechar="fecharModal" @salvar="salvarLancamento" />
    </q-dialog>
</template>

<style scoped>
    /* estilização para a tabela */
.tabela-container {
  position: fixed;   
  bottom: 90px;      
  right: 20px;       
  width: 650px;      
  background-color: white;
  padding: 10px;
  box-shadow: 0px 0px 10px rgba(0,0,0,0.2);
  border-radius: 8px;
}

/* estilização para o botão */
.btn-modal {
 position: fixed;
  bottom: 20px;     
  right: 20px;      
  width: 200px;     
  height: 45px;
  font-weight: bold;
}
</style>