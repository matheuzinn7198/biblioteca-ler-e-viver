%% =========================
%% DIAGRAMA DE CASOS DE USO
%% =========================
---
title: Sistema de Gerenciamento de Biblioteca - Casos de Uso
---
usecaseDiagram
    actor Bibliotecario as B
    actor Membro as M

    rectangle Sistema {
        usecase "Cadastrar Livro" as UC1
        usecase "Editar Livro" as UC2
        usecase "Excluir Livro" as UC3
        usecase "Listar Livros" as UC4
        usecase "Cadastrar Membro" as UC5
        usecase "Editar Membro" as UC6
        usecase "Excluir Membro" as UC7
        usecase "Registrar Empréstimo" as UC8
        usecase "Registrar Devolução" as UC9
        usecase "Listar Empréstimos Atrasados" as UC10
        usecase "Buscar Livro por Título ou Autor" as UC11
        usecase "Consultar Disponibilidade de Livro" as UC12
    }

    %% Relações
    B --> UC1
    B --> UC2
    B --> UC3
    B --> UC4
    B --> UC5
    B --> UC6
    B --> UC7
    B --> UC8
    B --> UC9
    B --> UC10
    B --> UC11

    M --> UC4
    M --> UC11
    M --> UC12
%% =========================
%% DIAGRAMA DE CLASSES
%% =========================
---
title: Diagrama de Classes - Sistema de Biblioteca
---
classDiagram
    class Livro {
        - String titulo
        - String autor
        - String ISBN
        - String status  // Disponível | Emprestado
        + emprestar()
        + devolver()
    }

    class Membro {
        - int id
        - String nome
        - String email
        - String telefone
        + consultarAcervo()
    }

    class Emprestimo {
        - int id
        - Date dataEmprestimo
        - Date dataPrevistaDevolucao
        - Date? dataDevolucao
        + registrar()
        + devolver()
        + verificarAtraso()
    }

    class Biblioteca {
        + List<Livro> livros
        + List<Membro> membros
        + List<Emprestimo> emprestimos
        + adicionarLivro()
        + removerLivro()
        + buscarLivro()
        + listarAtrasados()
    }

    %% RELACIONAMENTOS
    Biblioteca "1" --> "many" Livro
    Biblioteca "1" --> "many" Membro
    Biblioteca "1" --> "many" Emprestimo
    Emprestimo "1" --> "1" Livro
    Emprestimo "1" --> "1" Membro
%% =========================
%% DIAGRAMA DE FLUXO (PROCESSO)
%% =========================
---
title: Fluxo de Empréstimo e Devolução
---
flowchart TD
    A[Início] --> B{Bibliotecário autenticado?}
    B -- Não --> X[Fim]
    B -- Sim --> C[Seleciona Livro no sistema]
    C --> D{Livro disponível?}
    D -- Não --> E[Informar: Livro já emprestado]
    E --> C
    D -- Sim --> F[Seleciona Membro]
    F --> G[Registra Empréstimo com data prevista de devolução]
    G --> H[Atualiza status do livro para "Emprestado"]
    H --> I[Empréstimo Concluído]
    I --> J{Devolução?}
    J -- Sim --> K[Registrar Devolução]
    K --> L[Atualiza status do livro para "Disponível"]
    L --> M[Verifica se devolução está atrasada]
    M --> N[Listar em "Empréstimos Atrasados" se necessário]
    N --> X[Fim]
    J -- Não --> X[Fim]