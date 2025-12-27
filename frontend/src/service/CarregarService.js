const API_URL = 'http://localhost:3000';
export const ListarLancamentosService = {
    async listar() {
        try {
            //Buscar lançamentos no banco
            const resposta = await fetch(`${API_URL}/lancamentos`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            })
            //Verifica se a resposta foi ok
            if (!resposta.ok) throw new Error('Erro ao buscar lançamentos')
            return await resposta.json();
        }
        //Tratamento de erro
        catch (error) {
            console.error("Erro no serviço:", error)
            throw new Error({ message: 'Erro ao buscar lançamentos' })
        }
    }
}