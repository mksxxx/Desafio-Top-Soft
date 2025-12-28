<script setup>
import { ref, onMounted } from 'vue';
import { SaldoPagService } from '@/service/SaldoPagService';
import { SaldoRecService } from '@/service/SaldoRecService';
import {Pie} from 'vue-chartjs';
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement, CategoryScale } from 'chart.js';
ChartJS.register(Title, Tooltip, Legend, ArcElement, CategoryScale);

const chartData = ref({
    labels: ['Pagamentos', 'Recebimentos'], 
    datasets: [{
        backgroundColor:['#f87979', '#7CFC00'],
        hoverBackgroundColor: ['#FF6347', '#32CD32'],  
        borderWidth: 1,
        data: [0, 0]
    }]
})

const chartOptions = ref({
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
        legend: {
            position: 'bottom',
        },
        tooltip: {
            callbacks: {
                label: function(context) {
                    let val = context.parsed || 0;
                    return context.label + ': ' + new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(val);
                }
            }
        }
    }
})

async function carregarDadosDoGrafico() {
    try {
        // Disparamos as duas buscas ao mesmo tempo para ganhar velocidade
        const [resPag, resRec] = await Promise.all([
            SaldoPagService.obterSaldoPagamentos(),
            SaldoRecService.obterSaldoRecebimentos()
        ]);

        // IMPORTANTE: Convertendo Strings da API ("960.01") para Números reais.
        // O || 0 garante que se a API vier vazia, o gráfico não quebre.
        const valorPag = Number(resPag.saldo) || 0;
        const valorRec = Number(resRec.saldo) || 0;

        // Atualizamos o chartData.value com um NOVO objeto. 
        // Isso força o Vue a detectar a mudança e redesenhar a pizza.
        chartData.value = {
            labels: ['Pagamentos', 'Recebimentos'],
            datasets: [{
                backgroundColor: ['#f87979', '#7CFC00'],
                data: [valorPag, valorRec]
            }]
        };
    } catch (error) {
        console.error('Erro ao carregar dados do gráfico:', error);
    }
}

/**
 * SEÇÃO 6: CICLO DE VIDA
 * O comando onMounted garante que a função de carregar os dados
 * só seja executada DEPOIS que a página HTML estiver pronta.
 */
onMounted(() => {
    carregarDadosDoGrafico();
});
</script>
<template>
<div class="painel-grafico">
    <div class="card-estilizado">
      <div class="grafico-container">
        <Pie 
          v-if="(chartData.datasets[0].data[0] + chartData.datasets[0].data[1]) > 0"
          :data="chartData" 
          :options="chartOptions" 
          :key="JSON.stringify(chartData.datasets[0].data)"
        />
        
        <div v-else class="aviso-vazio">
          <p>Nenhum saldo registrado para exibição.</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>