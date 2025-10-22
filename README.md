# Sistema de Gestão da Biblioteca Comunitária "Ler é Viver"

## Briefing

### Visão Geral do Projeto
O projeto consiste no desenvolvimento de um **Sistema de Gestão de Biblioteca (SGB)** em formato de aplicação web, com o objetivo de digitalizar o controle de livros, membros e empréstimos, substituindo o uso de fichas de papel por um sistema seguro, eficiente e acessível.

## Escopo

### Objetivos
- Automatizar o registro de empréstimos e devoluções
- Identificar automaticamente livros com devolução atrasada
- Permitir consulta pública ao acervo sem necessidade de login
- Garantir segurança no acesso às funcionalidades administrativas

### Público-Alvo
- **Bibliotecário (Gestor)**: Gerencia livros, membros e empréstimos (CRUD completo)
- **Membros da Comunidade**: Consultam o acervo online para verificar disponibilidade de livros

### Recursos Tecnológicos
- **Frontend**: Next.js 14 (App Router), TypeScript, SCSS
- **Backend**: API Routes do Next.js, JWT, Bcrypt
- **Banco de Dados**: MongoDB Atlas + Mongoose (ODM)
- **Autenticação**: JWT com cookies HTTP-only
- **Ambiente**: Variáveis de ambiente (.env.local)

---

## Diagramas

### Diagrama de Classes

```mermaid
classDiagram
    class Livro {
        +string titulo
        +string autor
        +string isbn
        +string status
        +create()
        +read()
        +update()
        +delete()
    }

    class Membro {
        +string nome
        +string email
        +string telefone
        +create()
        +read()
        +update()
        +delete()
    }

    class Emprestimo {
        +Date dataEmprestimo
        +Date dataDevolucaoPrevista
        +Date dataDevolucaoReal
        +string status
        +create()
        +read()
        +update()
        +delete()
    }

    Livro "1" -- "0..*" Emprestimo : "emprestado em"
    Membro "1" -- "0..*" Emprestimo : "realiza"