# Incrementar o contador relacionado ao número de acessos a um site

> ## Caso de sucesso

1. ✅ Recebe uma requisição do tipo **GET** na rota **/v1/increase**
3. ✅ Retorna **200** com a mensagem que o número de acessos ao um domínio foi incrementado em 1

> ## Exceções

1. ✅ Retorna erro **404** se a API não existir
2. ✅ Retorna erro **500** se der erro ao tentar incrementar o número de acessos de um site