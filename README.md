# 📚 Sistema de Gerenciamento de Biblioteca  
### Cliente Fictício: *Biblioteca Comunitária "Ler é Viver"*

---

## 📖 Visão Geral do Projeto
O **Sistema de Gerenciamento de Biblioteca (SGB)** tem como objetivo modernizar a administração do acervo da *Biblioteca Comunitária "Ler é Viver"*, substituindo o uso de fichas de papel por um sistema digital eficiente, seguro e acessível.

Com esta aplicação web, o bibliotecário poderá gerenciar livros, membros e empréstimos de forma automatizada, enquanto os membros da comunidade poderão consultar a disponibilidade dos livros online.

---

## 🎯 Objetivos do Sistema
- Automatizar o registro de **empréstimos e devoluções**.  
- Identificar **livros com devolução atrasada** automaticamente.  
- Permitir **consulta pública** ao acervo, sem necessidade de login.  
- Manter o controle completo de **livros e membros** (CRUD).  
- Exibir **lista de empréstimos atrasados**.  
- *(Diferencial Bônus)*: Implementar **busca de livros por título ou autor**.

---

## 👥 Público-Alvo
- **Bibliotecário (Gestor):**  
  Responsável por cadastrar e gerenciar livros, membros, empréstimos e devoluções.

- **Membro:**  
  Pode consultar o acervo online e verificar se um livro está disponível (sem login).

---

## 🧩 Requisitos Essenciais (MVP)
- **CRUD para Livros:** título, autor, ISBN, status (*Disponível / Emprestado*).  
- **CRUD para Membros:** cadastro, edição, exclusão e listagem.  
- **Registro de Empréstimos:** associar um livro a um membro, com data de empréstimo e devolução prevista.  
- **Registro de Devoluções:** o status do livro retorna para “Disponível”.  
- **Listagem de Empréstimos Atrasados.**  
- **(Bônus)**: Busca de livros por título ou autor.

---

## ⚙️ Tecnologias Utilizadas
- **Frontend:** Next.js 14 (App Router), TypeScript, SCSS  
- **Backend:** API Routes do Next.js, JWT, Bcrypt  
- **Banco de Dados:** MongoDB Atlas + Mongoose (ODM)  
- **Autenticação:** JWT com cookies HTTP-only  
- **Ambiente:** Variáveis de ambiente (.env.local)

---

## 📋 Escopo Detalhado (com Análise de Risco)

### 🔍 **1. Escopo do Sistema**
O sistema abrangerá as seguintes **funcionalidades principais**:

| **Módulo** | **Descrição** |
|-------------|----------------|
| **Gestão de Livros** | Cadastrar, editar, excluir e listar livros do acervo. Permitir busca por título ou autor. |
| **Gestão de Membros** | Cadastro e manutenção de dados dos usuários que realizam empréstimos. |
| **Controle de Empréstimos** | Registro completo de empréstimos, com data prevista e status. |
| **Controle de Devoluções** | Atualiza o status do livro para “Disponível” e verifica se houve atraso. |
| **Listagem de Atrasos** | Exibe uma lista com todos os empréstimos vencidos. |
| **Consulta Pública** | Permite que qualquer visitante consulte o acervo sem login. |

---

### 🚫 **2. Itens Fora do Escopo**
O sistema **não** incluirá neste momento:
- Integração com sistemas de pagamento.  
- Módulo de reservas online.  
- Controle de múltiplos exemplares do mesmo livro.  
- Notificações automáticas por e-mail.  
- Dashboard de estatísticas avançadas.  

Essas funções poderão ser implementadas em futuras versões.

---

### ⚠️ **3. Análise de Riscos**

| **Tipo de Risco** | **Descrição** | **Probabilidade** | **Impacto** | **Plano de Mitigação** |
|--------------------|---------------|-------------------|--------------|-------------------------|
| **Técnico** | Falhas na conexão com o banco de dados (MongoDB Atlas) | Média | Alta | Implementar reconexão automática e tratamento de exceções. |
| **Técnico** | Perda de dados em caso de erro na API | Baixa | Alta | Usar backups regulares e validações no backend. |
| **Segurança** | Vazamento de dados de usuários | Média | Alta | Utilizar criptografia (bcrypt) e JWT seguro (cookies HTTP-only). |
| **Operacional** | Erros de uso por parte do bibliotecário | Alta | Média | Criar interface intuitiva e mensagens de erro claras. |
| **Prazos** | Atraso na entrega do sistema | Média | Média | Dividir o desenvolvimento em sprints semanais com metas curtas. |
| **Escopo** | Solicitação de novas funcionalidades fora do planejado | Alta | Média | Controlar mudanças com documentação e aprovação prévia. |

---

### 🧭 **4. Cronograma (Etapas Principais)**

| **Etapa** | **Duração Estimada** | **Descrição** |
|------------|---------------------|----------------|
| Planejamento e levantamento de requisitos | 1 semana | Entrevistas e análise das necessidades da biblioteca. |
| Modelagem do sistema (UML + Banco) | 1 semana | Criação de diagramas e estrutura inicial de dados. |
| Desenvolvimento do backend (API) | 2 semanas | Implementação das rotas, autenticação e banco. |
| Desenvolvimento do frontend | 2 semanas | Interface visual, formulários e validações. |
| Testes e ajustes finais | 1 semana | Testes funcionais, correção de erros e validação do MVP. |

---

### ✅ **5. Critérios de Sucesso**
O projeto será considerado **bem-sucedido** quando:
- O bibliotecário conseguir registrar e consultar empréstimos sem erros.  
- O status dos livros for atualizado corretamente entre “Disponível” e “Emprestado”.  
- A listagem de atrasados funcionar automaticamente.  
- O sistema for acessível e funcional em qualquer navegador moderno.

---

## 📊 Diagramas UML

---

### 🧱 Diagrama de Classes

```mermaid
classDiagram
    class Livro {
        +string titulo
        +string autor
        +string isbn
        +string status  // "Disponível" | "Emprestado"
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
        +Date? dataDevolucaoReal
        +string status  // "Em andamento" | "Concluído" | "Atrasado"
        +registrar()
        +devolver()
        +verificarAtraso()
    }

    class Biblioteca {
        +List<Livro> livros
        +List<Membro> membros
        +List<Emprestimo> emprestimos
        +adicionarLivro()
        +removerLivro()
        +buscarLivro()
        +listarAtrasados()
    }

    %% RELACIONAMENTOS
    Livro "1" -- "0..*" Emprestimo : "emprestado em"
    Membro "1" -- "0..*" Emprestimo : "realiza"
    Biblioteca "1" -- "0..*" Livro : "possui"
    Biblioteca "1" -- "0..*" Membro : "registra"
    Biblioteca "1" -- "0..*" Emprestimo : "controla"
```

---

### Diagrama de Casos de Uso

```mermaid
flowchart LR
    %% Atores
    B([Bibliotecário])
    M([Membro])

    subgraph Sistema ["Sistema"]
        direction TB
        UC1["Cadastrar Livro"]
        UC2["Editar Livro"]
        UC3["Excluir Livro"]
        UC4["Listar / Consultar Livros"]
        UC5["Cadastrar Membro"]
        UC6["Editar Membro"]
        UC7["Excluir Membro"]
        UC8["Registrar Empréstimo"]
        UC9["Registrar Devolução"]
        UC10["Listar Empréstimos Atrasados"]
        UC11["Buscar Livro (Título/Autor)"]
        UC12["Consultar Disponibilidade"]
    end

    %% Conexões ator -> casos
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
```

---

### Diagrama de Fluxo – Empréstimo e Devolução

```mermaid
flowchart TD
    Start([Início]) --> Escolha{Bibliotecário inicia empréstimo?}
    Escolha -- Sim --> SelecionaLivro[Seleciona Livro]
    SelecionaLivro --> Disponivel{Livro disponível?}
    Disponivel -- Não --> MsgLivroEmprestado[Exibir: Livro emprestado] --> SelecionaLivro
    Disponivel -- Sim --> SelecionaMembro[Seleciona Membro]
    SelecionaMembro --> RegistrarEmprestimo[Registrar empréstimo]
    RegistrarEmprestimo --> AtualizaStatus[Atualiza status para Emprestado]
    AtualizaStatus --> SalvaDB[Salvar no banco de dados]
    SalvaDB --> EmprestimoConcluido[Empréstimo concluído]

    EmprestimoConcluido --> VerificaDevolucao{Devolução registrada?}
    VerificaDevolucao -- Não --> Fim([Fim])
    VerificaDevolucao -- Sim --> RegistrarDevolucao[Registrar data de devolução]
    RegistrarDevolucao --> AtualizaStatusDisp[Atualiza status para Disponível]
    AtualizaStatusDisp --> VerificaAtraso[Verifica atraso]
    VerificaAtraso --> Atrasado{Atrasado?}
    Atrasado -- Sim --> MarcaAtrasado[Marcar como Atrasado] --> Finaliza
    Atrasado -- Não --> Finaliza[Finalizar registro]
    Finaliza --> Fim
```