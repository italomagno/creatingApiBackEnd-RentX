**Requisitos funcionais** =>
(o que os usuários poderão fazer)


**Requisitos Não Funcionais** =>
(o que a nossa aplicação poderá utilizar)
bando de dados, bibliotecas utilizadas, algo relacionado a email, etc.


**Regras de negócio** =>
(as regras da nossa aplicação)


# Cadastro de carro

**RF**
[] Deve ser possível cadastrar um novo carro.
[] Deve ser possível listar todas as categorias.

**RN**
[] Não deve ser possível cadastrar um carro com uma placa já cadastrada.
[] Não deve ser possível alterar a placa de um carro já cadastrado.
[] O carro deve ser cadastrado com disponibilidade por padrão, com dispobilidade.
[] O usuário responsável pelo cadastro dve ser um usuário administrador.

# Listagem de carros

**RF**
[] Deve ser possível listar todos os carros disponíveis.
[] Deve ser possível listarr todos os carros disponíveis pelo nome da categoria.
[] Deve ser possível listarr todos os carros disponíveis pelo nome nome da marca.
[] Deve ser possível listarr todos os carros disponíveis pelo nome nome do carro.



**RN**
[] O usuário não precisa estar logado no sistema.


# Cadastro de Especificação no carro

**RF**
[x] Deve ser possível cadastrar uma especificação para um carro.
[] Deve ser possível listar todas as especificações.
[] Deve ser possível listar todos os carros.

**RN**
[] Não deve ser possível cadastrar uma especificação para um carro não cadastrado.
[] Não deve ser possível cadastrar uma especificação já existente para o mesmo carro.
[x] O usuário responsável pelo cadastro dve ser um usuário administrador.

# Cadastro de imagens do carro


**RF**
[] Deve ser possível cadastrar a imagem do carro
[] Deve ser possível listar todos os carros.

**RNF**
[x]Utilizar o multer para o upload dos arquivos


**RN**
[] O usuário deve poder cadastrar mais de uma imagem para o mesmo carro.
[x] O usuário responsável pelo cadastro dve ser um usuário administrador.

# Aluguel de carro

**RF**
[] Deve ser possível cadastrar um aluguel

**RN**
[] O aluguel deve ter duração mínima de 24 horas.
[] Não deve ser possível cadastrar um novo alugel caso já exista um aberto para o mesmo usuário.
[] Não deve ser possível cadastrar um novo alugel caso já exista um aberto para o mesmo carro.


