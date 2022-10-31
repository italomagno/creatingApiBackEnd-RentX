**Requisitos funcionais** =>
(o que os usuários poderão fazer)


**Requisitos Não Funcionais** =>
(o que a nossa aplicação poderá utilizar)
bando de dados, bibliotecas utilizadas, algo relacionado a email, etc.


**Regras de negócio** =>
(as regras da nossa aplicação)


# Cadastro de carro

**RF**
[x] Deve ser possível cadastrar um novo carro.

**RN**
[x] Não deve ser possível cadastrar um carro com uma placa já cadastrada.
[x] O carro deve ser cadastrado com disponibilidade por padrão, com dispobilidade.
[x] O usuário responsável pelo cadastro dve ser um usuário administrador.

# Listagem de carros

**RF**
[x] Deve ser possível listar todos os carros disponíveis.
[x] Deve ser possível listarr todos os carros disponíveis pelo nome da categoria.
[x] Deve ser possível listarr todos os carros disponíveis pelo nome nome da marca.
[x] Deve ser possível listarr todos os carros disponíveis pelo nome nome do carro.


**RN**
[x] O usuário não precisa estar logado no sistema.


# Cadastro de Especificação no carro

**RF**
[x] Deve ser possível cadastrar uma especificação para um carro.


**RN**
[x] Não deve ser possível cadastrar uma especificação para um carro não cadastrado.
[x] Não deve ser possível cadastrar uma especificação já existente para o mesmo carro.
[x] O usuário responsável pelo cadastro dve ser um usuário administrador.

# Cadastro de imagens do carro


**RF**
[x] Deve ser possível cadastrar a imagem do carro
[x] Deve ser possível listar todos os carros.

**RNF**
[x]Utilizar o multer para o upload dos arquivos


**RN**
[x] O usuário deve poder cadastrar mais de uma imagem para o mesmo carro.
[x] O usuário responsável pelo cadastro dve ser um usuário administrador.

# Aluguel de carro

**RF**
[x] Deve ser possível cadastrar um aluguel

**RN**
[x] O aluguel deve ter duração mínima de 24 horas.
[x] Não deve ser possível cadastrar um novo alugel caso já exista um aberto para o mesmo usuário.
[x] Não deve ser possível cadastrar um novo alugel caso já exista um aberto para o mesmo carro.
[x] O usuário deve estar logado na aplcação
[x] Ao realizar um aluguel,o status do carro deverá ser alterado para indisponível.

# Devolução de um carro

**RF**
[x] Deve er possível realizar a devolução de um carro

**RN**
[] Se um carro for devolvido em um período inferior a 24h, deverá ser cobrado o valor do aluguel completo.
[] Se um carro for devolvido em um período superior ao previsto para entrega, deverá ser cobrado o valor multa proporcional aos dias de atraso.
[] Ao realizar a devolução, o carro deve estar disponível para outro aluguel.
[] Ao realizar a devolução, o usuário deverá ser liberado para outro aluguel.
[] Ao realizar a devolução, deverá ser calculado o total do aluguel.
[] Caso haja multa, deveserá ser adicionado ao total do aluguel.
[x] O usuário deve estar logado na aplcação




