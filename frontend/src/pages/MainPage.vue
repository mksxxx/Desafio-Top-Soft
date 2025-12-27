<script setup>
import { ref } from 'vue';
import GerarLancamento from '@/components/GerarLancamento.vue';

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
    <!--Botão para abrir o modal-->
    <q-btn color="primary" label="Primary" @click="abrirModal" />

    <!--Modal de registro de lançamento-->
    <q-dialog v-model="mostrarModal" persistent>
        <!--Componente de geração de lançamento-->
        <GerarLancamento :mostrar="mostrarModal" @fechar="fecharModal" @salvar="salvarLancamento" />
    </q-dialog>
</template>

<style scoped>
    
</style>