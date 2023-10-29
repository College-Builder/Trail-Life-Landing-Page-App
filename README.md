<div align="center">
  <a href="https://collegebuilder.easyvirtual.net/trail-life/home-page">
    <img src='https://college-builder.s3.amazonaws.com/trail-life/landing-page/assets/images/brand/icon.png' height='140'>
  </a>
</div>

<h1 align="center">
  Trail Life Landing Page App
</h1>

<p align="center">
A empresa de transporte fictícia "Trail Life" foi desenvolvida como parte do projeto integrador do terceiro semestre na Universidade de Sorocaba pelo grupo de alunos que estão aqui neste repositório. Este repositório abriga o código da aplicação backend, que inclui o site da Trail Life e uma API para envio de emails aos clientes.
</p>

<p align="center">
  <img src="https://img.shields.io/badge/version-1.0.0-blue" alt="version">
</p>

## Projeto 

<img src="https://github.com/College-Builder/College-Builder/blob/main/global-assets/Trail-Life-Landing-Page-App/screenshot.png"/>

O projeto Trail Life Transportadora foi desenvolvido com fins acadêmicos, com o objetivo de aplicar os conhecimentos adquiridos em HTML, CSS, JavaScript, AWS e API Gateway. O projeto consiste em uma landing page para uma transportadora fictícia, chamada Trail Life.

Esta landing page oferece uma funcionalidade que permite aos visitantes enviar e-mails para entrar em contato com a empresa, proporcionando uma forma eficaz de comunicação com a Trail Life Transportadora.

A landing page é composta por quatro seções principais:

- Demanda: Esta seção apresenta a empresa Trail Life e suas qualidades de transporte de cargas.
- Serviços: Esta seção fornece mais informações sobre os serviços oferecidos pela Trail Life.
- Funcionalidades: Esta seção destaca as funcionalidades que a empresa oferece para motoristas e clientes.
- Contato: Esta seção fornece feature de contato com a Trail Life por email.

## Ferramentas 

O projeto foi desenvolvido usando as seguintes ferramentas e tecnologias:

- HTML (Hypertext Markup Language): Continua sendo a linguagem de marcação fundamental para estruturar o conteúdo da página web.
- CSS (Cascading Style Sheets): Mantém seu papel essencial na definição da aparência e estilo da página web.
- JavaScript: Ainda é utilizado para adicionar interatividade e funcionalidades dinâmicas à página web.
- TypeScript: Foi integrado ao projeto para trazer tipagem estática ao JavaScript, o que proporciona um código mais robusto e com menos erros potenciais durante o desenvolvimento.
- Node.js: Agora faz parte da arquitetura, permitindo a execução de código JavaScript no lado do servidor, proporcionando escalabilidade e eficiência no processamento de requisições.

## Arquitetura Cloud

O diagrama da arquitetura do servidor cloud foi aprimorado para oferecer uma landing page completa, aproveitando os seguintes serviços da AWS:

- AWS (Amazon Web Services): Continua sendo a plataforma de computação em nuvem principal, fornecendo escalabilidade e confiabilidade.
- Route 53: Permanece encarregado do gerenciamento de domínios e DNS, garantindo uma navegação eficiente e segura.
- API Gateway: Através deste serviço, são criadas e gerenciadas as interfaces de programação de aplicativos, permitindo uma comunicação eficaz entre diferentes componentes da arquitetura.
- Lambda Function: Continua a ser utilizado para executar funções na nuvem de forma eficiente e escalável.
- SES (Simple Email Service): Permanece como a solução para o envio de e-mails, garantindo a confiabilidade na comunicação com os usuários.

<img src="https://github.com/College-Builder/College-Builder/blob/main/global-assets/Trail-Life-Landing-Page-App/diagram.png"/>

## Setup

### Para configurar o projeto, basta seguir os passos abaixo:

1. Faça um clone do repositório usando o comando `git clone`.
2. Configure o arquivo `.env` com as variáveis de ambiente necessárias.
3. Execute o comando `npm install` para instalar as dependências.
4. Inicie o projeto com o comando `npm start`.

Lembrando que o projeto utiliza TypeScript e Node.js, portanto, é essencial ter essas linguagens instaladas em seu ambiente de desenvolvimento. Dessa forma, você estará pronto para começar a trabalhar no projeto de forma eficiente e segura.

### Arquivo .env

```env
AWS_SES_REGION="us-east-1"

AWS_SES_SOURCE_EMAIL="ses-emai@xxx.com (ex. no-reply@xxx.com)"

AWS_SES_CLIENT_EMAIL_TEMPLATE="ses-template-name (modelo de e-mail a ser enviado ao cliente)"

AWS_SES_UAA_EMAIL="example-1@xxx.com, example-2@xxx.com"

AWS_SES_UAA_EMAIL_TEMPLATE=ses-template-name (modelo de e-mail a ser enviado ao suporte ao cliente)"
```

## License

This script is licensed under the GNU General Public License, Version 3, 29 June 2007.

Feel free to use, modify, and distribute this script as per the terms of the license.

[![License: GPL v3](https://img.shields.io/badge/License-GPL%20v3-blue.svg)](https://opensource.org/licenses/GPL-3.0)
