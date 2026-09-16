# 🏥 Clínica Saúde — Sistema de Agendamento Inteligente

Sistema web full stack para automatizar o agendamento de consultas de uma clínica de saúde, eliminando o processo manual hoje feito por WhatsApp ("Tem consulta pra tal dia?", "Qual horário disponível?", "Dá pra marcar comigo?").

---

## 📋 Sobre o projeto

Este projeto foi desenvolvido como teste técnico para a vaga de **Estagiário Full Stack**. A proposta é substituir o atendimento manual por um mini sistema que:

- Mostra horários realmente disponíveis, validando datas contra feriados nacionais e finais de semana
- Permite ao paciente criar um agendamento de forma autônoma
- Oferece uma visão de gestão para a clínica acompanhar os agendamentos recebidos

O sistema tem **duas visões**:

| Visão                | Público                         | Objetivo                                                                                           |
| -------------------- | ------------------------------- | -------------------------------------------------------------------------------------------------- |
| **Área do Paciente** | Quem quer marcar uma consulta   | Escolher data, ver horários livres, preencher dados e confirmar o agendamento                      |
| **Área da Clínica**  | Equipe/administração da clínica | Login, dashboard com métricas, listagem e filtro de agendamentos, gestão de perfil e configurações |

---

## 🖥️ Telas e fluxo

### Área do Paciente (web)

1. **Novo Agendamento** — calendário para escolher a data + grade de horários (08:00–18:00, blocos de 1h)
2. Horários já ocupados aparecem desabilitados; datas de fim de semana/feriado bloqueiam a seleção com aviso explícito ("Sem atendimento aos finais de semana" / "Sem atendimento neste dia — feriado")
3. Ao escolher um horário livre, abre um modal **"Informe seus dados"** (nome completo + telefone)
4. Confirmação exibe resumo completo (nome, data, horário, telefone) com status "Agendamento confirmado ✅"
5. **Meus Agendamentos** — lista os agendamentos já feitos, com estado vazio amigável quando não há nenhum

### Área da Clínica (painel administrativo — mobile-first)

1. **Login** — acesso da equipe da clínica
2. **Painel/Dashboard** — resumo do dia: total de agendamentos, confirmados, pendentes, cancelados, com variação percentual
3. **Agendamentos** — lista completa com busca (nome, telefone ou data), filtro por status (Todos/Confirmados/Pendentes/Cancelados) e por período
4. **Perfil** — dados do profissional, especialidade, horário de atendimento
5. **Configurações** — notificações, integração com calendário externo, tema, horário de atendimento

### Componentes reutilizáveis

- Card de horário com 3 estados: Livre / Ocupado / Selecionado
- Badge de status: Confirmado / Pendente / Cancelado
- Toast de alerta (ex: "Este horário já foi reservado")
- Estado vazio ("Nenhum agendamento encontrado")
- Mensagens de bloqueio para feriado e fim de semana

> 🎨 O design de referência (ambas as visões, desktop e mobile) foi prototipado com apoio do Google Stitch antes da implementação.

---

## 🏗️ Arquitetura

```
Usuário escolhe data
        │
        ▼
  Frontend (React)
        │  GET /available?date=YYYY-MM-DD
        ▼
   Backend (REST API)
        │  consulta cache/API de feriados
        ▼
 Nager.Date API (feriados BR)
        │
        ▼
  Backend valida (fim de semana / feriado / horário ocupado)
        │
        ▼
  Retorna horários disponíveis → Frontend renderiza
        │
        ▼
  Usuário escolhe horário → POST /appointments
        │
        ▼
  Backend salva no banco → retorna confirmação
```

---

## 🛠️ Tecnologias

**Frontend**

- React + Vite + TypeScript
- Tailwind CSS

**Backend**

- Node.js + Express (rotas REST)
- Consumo da API pública de feriados: `https://date.nager.at/api/v3/PublicHolidays/2026/BR`

**Persistência**

- Banco de dados relacional (SQLite/PostgreSQL) com uma tabela `appointments`

---

## 📐 Regras de negócio

- Horário de funcionamento: **08:00 às 18:00**
- Consultas com duração fixa de **1 hora**
- Não é possível agendar em:
  - Finais de semana (sábado e domingo)
  - Feriados nacionais (validados via API do Nager.Date)
  - Horários já ocupados por outro agendamento

---

## 🔌 Endpoints da API

### `GET /available?date=2026-02-10`

Retorna os horários disponíveis para a data informada, já descontando feriados, fins de semana e horários ocupados.

```json
{
  "date": "2026-02-10",
  "available": ["08:00", "09:00", "10:00", "13:00", "14:00"],
  "blocked": false
}
```

Se a data cair em feriado ou fim de semana:

```json
{
  "date": "2026-02-14",
  "available": [],
  "blocked": true,
  "reason": "weekend" // ou "holiday"
}
```

### `POST /appointments`

Cria um novo agendamento.

```json
// Request
{
  "date": "2026-02-10",
  "time": "10:00",
  "name": "João da Silva",
  "phone": "(83) 98765-4321"
}

// Response (201)
{
  "id": "uuid",
  "date": "2026-02-10",
  "time": "10:00",
  "name": "João da Silva",
  "phone": "(83) 98765-4321",
  "status": "confirmado"
}
```

### `GET /appointments`

Lista todos os agendamentos cadastrados.

```json
[
  {
    "id": "uuid",
    "date": "2026-02-10",
    "time": "10:00",
    "name": "João da Silva",
    "phone": "(83) 98765-4321",
    "status": "confirmado"
  }
]
```

---

## 🗄️ Modelo de dados

**Tabela `appointments`**

| Campo        | Tipo      | Descrição                         |
| ------------ | --------- | --------------------------------- |
| `id`         | UUID      | Identificador único               |
| `date`       | DATE      | Data da consulta                  |
| `time`       | TIME      | Horário (08:00–18:00)             |
| `name`       | VARCHAR   | Nome do paciente                  |
| `phone`      | VARCHAR   | Telefone do paciente              |
| `status`     | VARCHAR   | confirmado / pendente / cancelado |
| `created_at` | TIMESTAMP | Data de criação do registro       |

---

## 🚀 Como rodar localmente

### Pré-requisitos

- Node.js 18+
- npm ou yarn

### Backend

```bash
cd backend
npm install
cp .env.example .env
npm run dev
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

O frontend roda por padrão em `http://localhost:5173` e consome a API em `http://localhost:3000`.

---

## 📁 Estrutura de pastas

```
.
├── backend/
│   ├── src/
│   │   ├── routes/          # rotas REST (available, appointments)
│   │   ├── services/        # regras de negócio + integração Nager.Date
│   │   ├── db/               # conexão e schema do banco
│   │   └── server.ts
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── components/      # Calendário, GradeDeHorarios, ModalDados, Badge, Toast
│   │   ├── pages/            # NovoAgendamento, MeusAgendamentos
│   │   ├── services/         # cliente HTTP (fetch/axios)
│   │   └── App.tsx
│   └── package.json
│
└── README.md
```

---

## 🔮 Próximos passos

- Autenticação real para a área da clínica (hoje prototipada apenas no design)
- Painel de métricas (dashboard) conectado a dados reais
- Notificações automáticas de confirmação (e-mail/WhatsApp)
- Testes automatizados (unitários no backend, componentes no frontend)

---

## 👤 Autor

João Emanuel — Desenvolvedor Full Stack
[github.com/joaoemanuels](https://github.com/joaoemanuels) · [linkedin.com/in/joao-emanuels](https://linkedin.com/in/joao-emanuels)
