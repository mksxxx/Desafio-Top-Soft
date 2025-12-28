const API_URL = 'http://localhost:3000';

export const SaldoPagService = {
    async obterSaldoPagamentos() {
        try { 
            const resposta = await fetch(`${API_URL}/saldoPagementos`, {
                method: 'GET',
                headers: {  
                    'Content-Type': 'application/json',
                }
            });
            if (!resposta.ok) throw new Error('Erro ao buscar saldo de pagamentos');
            return await resposta.json();
        }
        catch (error) {
            console.error("Erro no serviço:", error);
            throw new Error({ message: 'Erro ao buscar saldo de pagamentos' });
        }
    }
}