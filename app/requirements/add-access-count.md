# Retornar o número de acessos a um site

> ## Caso de sucesso

1. ✅ Recebe uma requisição do tipo **GET** na rota **/v1/count**
3. ✅ Retorna **200** com o número de acessos feitos a um domínio

> ## Exceções

1. ✅ Retorna erro **404** se a API não existir
2. ✅ Retorna erro **500** se der erro ao tentar retornar o número de acessos feitos