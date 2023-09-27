# Listar dados da conta de um usuário

> ## Caso de sucesso

1. ✅ Recebe uma requisição do tipo **GET** na rota **/v1/info/{email}**
2. ✅ Recebe um **email** via parameters que será usado para buscar as informações do usuário 
3. ✅ Retorna **200** com os dados da conta conta de um usuário

> ## Exceções

1. ✅ Retorna erro **404** se a API não existir
2. ✅ Retorna erro **403** se o email fornecido já estiver em uso por outro usuário
3. ✅ Retorna erro **400** se o campo email for um e-mail inválido
4. ✅ Retorna erro **500** se der erro ao tentar listar os dados de um usuário