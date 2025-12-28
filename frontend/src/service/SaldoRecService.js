const API_URL = 'http://localhost:3000';

export const SaldoRecService = {
    async obterSaldoRecebimentos() {
        try { 
            const resposta = await fetch(`${API_URL}/saldoRecebimentos`, {
                method: 'GET',
                headers: {  
                    'Content-Type': 'application/json',
                }
            });
            if (!resposta.ok) throw new Error('Erro ao buscar saldo de Recebimentos');
            return await resposta.json();
        }
        catch (error) {
            console.error("Erro no serviço:", error);
            throw new Error({ message: 'Erro ao buscar saldo de Recebimentos' });
        }
    }
}