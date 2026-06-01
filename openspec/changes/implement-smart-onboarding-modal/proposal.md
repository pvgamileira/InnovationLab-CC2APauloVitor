# Proposta: Implementar Modal de Onboarding Inteligente no Dashboard

## Problema
Atualmente, o mentor de IA carece de contexto específico sobre a formação educacional do usuário, como seu curso, turno de estudo ou se estuda e trabalha simultaneamente. Isso limita a capacidade da IA de fornecer insights profundamente personalizados.

## Solução Proposta
Implementar um modal de onboarding de "Perfil Progressivo" (Progressive Profiling) que aparece exatamente uma vez quando um usuário faz login no dashboard pela primeira vez. O modal coletará:
- Nome
- Instituição
- Curso
- Turno (Manhã, Tarde, Noite, Integral)
- Ocupação (Só Estudo, Trabalho e Estudo, Estágio, Outro)

Esses dados serão salvos na tabela `user_profiles` e, posteriormente, utilizados para fornecer contexto para os recursos do Gemini AI. O modal utilizará uma interface elegante de glassmorphism para manter a sensação premium do aplicativo.

## Benefícios
- Melhora drasticamente a personalização da IA.
- Aprimora a experiência do usuário com uma primeira impressão calorosa.
- Segue práticas modernas de progressive profiling sem sobrecarregar o usuário durante o cadastro inicial.
