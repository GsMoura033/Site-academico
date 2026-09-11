# Imitação do SIGAx — UFJF (Campus Governador Valadares)

Página estática que reproduz o visual e o fluxo da tela inicial do **SIGAx** (Sistema Integrado de Gestão Acadêmica) da Universidade Federal de Juiz de Fora, no campus de Governador Valadares.

Não é o sistema oficial. Não há login, banco de dados nem integração com a UFJF. Os dados de aluno, curso, IRA e grade são de demonstração, gravados no HTML e no JavaScript.

## O que a página faz

- Cabeçalho com logo da UFJF, nome do sistema e perfil do aluno
- Menu lateral (desktop) e gaveta no celular, com overlay
- Cartão do Restaurante Universitário, com saldo que pode ser ocultado
- Cartão de vida acadêmica (curso, matrícula, situação e IRA ocultável)
- Grade de horários montada no cliente conforme o dia da semana
- Atalhos visuais (cardápio, grade, EAD) só de interface — não abrem sistemas reais

## Como abrir

Não precisa de Node, build nem servidor de aplicação. Os arquivos são HTML, CSS e JavaScript.

```bash
# na pasta do projeto
python3 -m http.server 8080
```

Abra [http://127.0.0.1:8080](http://127.0.0.1:8080).

Também funciona abrindo `index.html` direto no navegador. O servidor local só evita alguma restrição de arquivo local.

## Arquivos

| Arquivo | Função |
| --- | --- |
| `index.html` | Estrutura da página: menu, cartões e conteúdo |
| `styles.css` | Layout, cores e comportamento responsivo |
| `script.js` | Menu, mostrar/ocultar IRA e saldo, grade por dia |
| `ufjf-logo.svg` | Marca da UFJF usada no topo |
| `moodle-ead.png` | Ícone do atalho EAD |

## Aviso

Projeto de estudo de interface. Não é afiliado à UFJF e não deve ser usado como se fosse o portal acadêmico da universidade.
