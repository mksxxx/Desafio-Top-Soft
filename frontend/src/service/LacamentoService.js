const API_URL = 'http://localhost:3000';
export const LancamentoService = {
    async criar(dados) {
        try {
            const resposta = await fetch(`${API_URL}/cadastro`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(dados)
            }); if (!resposta.ok) throw new Error('Erro ao salvar no servidor');

            return await resposta.json();
        } catch (error) {
            console.error("Erro no serviço:", error);
            throw error;
            }
  }
};