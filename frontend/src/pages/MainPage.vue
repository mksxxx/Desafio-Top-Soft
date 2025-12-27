<script setup>
import { ref, onMounted } from 'vue';
import { ListarLancamentosService } from '@/service/CarregarService';
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
onMounted(() => {
    carregarLancamentos()
})

//Define as colunas da tabela
const colunas = [
    { name: 'data', label: 'Data', field: 'datavenc', align: 'left' },
    { name: 'descricao', label: 'Descrição', field: 'descricao', align: 'left' },
    { name: 'valor', label: 'Valor', field: 'valor', align: 'right' },
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
}



</script>

<template>

    <!--Tabela de lançamentos-->
    <q-table
        title="Lançamentos Recentes"
        :rows="lancamentos"
        :columns="colunas"
        row-key="id"
        flat
        bordered
    />
    <!--Botão para abrir o modal-->
    <q-btn color="primary" label="Primary" @click="abrirModal" />

    <!--Modal de registro de lançamento-->
    <q-dialog v-model="mostrarModal" persistent>
        <!--Componente de geração de lançamento-->
        <GerarLancamento :mostrar="mostrarModal" @fechar="fecharModal" @salvar="salvarLancamento" />
    </q-dialog>
</template>

<style scoped></style>