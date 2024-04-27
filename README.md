# Projeto: Consumindo uma API pública

![Substitua a imagem ao lado por um screenshot do seu projeto](https://github.com/elc1090/project2-2024a-jhuan-e-flavio/blob/main/marselo.png)

Acesso: https://lambda-quiz.vercel.app/


### Desenvolvedores
Flávio Borin Júnior, Ciêncida da Computação

Jhuan Luis Almeida Assumpção, Ciência da Computação


### Nosso produto

A aplicação desenvolvida é um site de quiz onde os usuários podem personalizar o nome do seu personagem e acumular pontos conforme jogam, com os pontos sendo mantidos localmente.

As perguntas são obtidas através da API dedicada às perguntas de diversos temas, a [Trivia API](https://opentdb.com/api_config.php), disponibilizada pela Open Trivia Database. Os usuários podem escolher o tema das perguntas que desejam responder e serão redirecionados para uma tela com 10 perguntas sobre o assunto selecionado. Ao final, eles podem submeter suas respostas e conferir quais questões acertaram. Para cada pergunta respondida corretamente, um ponto é somado para o usuário.

O aplicativo é responsivo.

#### API escolhida

A API utilizada foi a ![Open Trivia Database](https://opentdb.com/api_config.php)

### Desenvolvimento
Para o trabalho, foram utilizados diversos componentes React:

-Home

A página inicial do aplicativo, onde o usuário pode consultar seus pontos e mudar seu nickname.

- Categories

O seletor de categorias das perguntas. Este componente captura a categoria selecionada e chama a função que realiza a requisição à API. Após isso, as questões retornadas são repassadas para o QuestionManager.

- QuestionManager

Componente pai do QuizNavigation. Aqui são tratadas as somas de pontuação após o envio e a transição para a tela final, depois que todas as questões são respondidas.

- QuizNavigation

Componente que mantém o menu de navegação entre as questões. Aqui é mantida uma lista de questões seguidas de seus botões de navegação. É possível pular entre as questões por botões numéricos ou clicar em "Next" e "Previous". Também aqui, fica a lista de todas as alternativas que o usuário marcou, para ser comparada em seguida com as respostas corretas.

- Question

Uma única questão. Aqui são mantidas as alternativas e a última alternativa selecionada pelo usuário. Cada mudança de alternativa gera um callback que define a nova seleção na lista de alternativas em QuizNavigation.

- QuizResult

Tela final de pontuação. Aqui o usuário pode conferir quais questões errou, acertou ou se deixou de fazer alguma. Ao final, o usuário pode escolher voltar para a home ou para a tela de seleção de categorias.

- Script QuestionSource

Script em TypeScript que realiza a requisição para a API. A função getQuestionsData(category) recebe a categoria a ser buscada. Após a requisição, o retorno é tratado para um formato utilizável, e a posição da alternativa correta é sorteada aleatoriamente.

#### Tecnologias
- JavaScript
- TypeScript
- React
- NodeJS
- Vite
- CSS
- Bootstrap
- Htmx

#### Ambiente de desenvolvimento

- VsCode
- Prettier

#### Referências e créditos

- ![W3Schools](https://www.w3schools.com/)
- ![Documentação do React Boostrap](https://react-bootstrap.netlify.app/)
- ![Documentação do React](https://react.dev/learn)
- ![Bootstrap Docs](https://getbootstrap.com/docs/5.3/getting-started/introduction/)
- ![Tutorial do YouTube muito bão](https://www.youtube.com/watch?v=SqcY0GlETPk&pp=ygUOcmVhY3QgdHV0b3JpYWw%3D)
- O Gregori, que me ajudou a testar
- O Gilson, que me ajudou a usar Routes

---
Projeto entregue para a disciplina de [Desenvolvimento de Software para a Web](http://github.com/andreainfufsm/elc1090-2024a) em 2024a
