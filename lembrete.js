const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const lembretes = [];

function exibirMenu() {
  console.log("======= SISTEMA DE LEMBRETES =======\n");

  console.log("1 - ADICIONAR LEMBRETE");
  console.log("2 - LISTAR LEMBRETES");
  console.log("3 - EDITAR LEMBRETE");
  console.log("4 - MARCAR LEMBRETE COMO CONCLUÍDO");
  console.log("5 - SAIR");

  rl.question("Selecione a opção desejada: ", (opcao) => {
    opcaoFormatada = parseInt(opcao);

    switch (opcaoFormatada) {
      case 1:
        adicionarLembrete();
        break;
      case 2:
        listarLembretes();
        break;
      case 3:
        editarLembrete();
        break;
      case 4:
        marcarConcluido();
        break;
      case 5:
        console.log("\nSaindo do sistema...\n");
        rl.close();
        break;
      default:
        console.log("\nInforme uma opção válida!\n");
        exibirMenu();
    }
  });
}

function adicionarLembrete() {
  rl.question("\nInforme o nome do lembrete: ", (nome) => {
    rl.question("Informe o prazo do lembrete: ", (prazo) => {
      lembretes.push({ nome: nome, prazo: prazo, isConcluido: "Pendente" });
      console.log("\nLembrete adicionado com sucesso!\n");
      exibirMenu();
    });
  });
}

function listagemLembretes() {
  if (lembretes.length === 0) {
    console.log("\nNão há lembretes para listar.\n");
    return exibirMenu();
  } else
    lembretes.forEach((lembrete, index) => {
      console.log(
        `\nÍndice : ${index + 1}\nNome: ${lembrete.nome}\nPrazo: ${
          lembrete.prazo
        }\nStatus: ${lembrete.isConcluido}\n`
      );
    });
}

function listarLembretes() {
  listagemLembretes();
  exibirMenu();
}

function editarLembrete() {
  listagemLembretes();

  rl.question("Informe o índice do lembrete que deseja editar: ", (indice) => {
    const i = parseInt(indice) - 1;

    if (isNaN(i) || i < 0 || i >= lembretes.length) {
      console.log("Índice inválido.");
      return editarLembrete();
    }

    editarOpcoes(i);

    function editarOpcoes(i) {
      console.log("1 - Editar nome");
      console.log("2 - Editar prazo");

      rl.question("Selecione uma opção: ", (opcao) => {
        opcaoFormatada = parseInt(opcao);

        switch (opcaoFormatada) {
          case 1:
            editarNome(i);
            break;
          case 2:
            editarPrazo(i);
            break;
          default:
            console.log("Informe uma opção válida.");
            editarOpcoes(i);
        }
      });
    }
  });
}

function editarMais(i) {
  rl.question("Deseja alterar mais alguma coisa? (S/N): ", (opcao) => {
    opcaoFormatada = opcao.toLowerCase();

    if (opcaoFormatada === "s") {
      return editarOpcoes(i);
    } else if (opcaoFormatada === "n") {
      console.log("Retornando para o menu principal...");
      return exibirMenu();
    }
  });
}

function editarNome(i) {
  rl.question("\nInforme o novo nome: ", (novoNome) => {
    lembretes[i].nome = novoNome;
    console.log("\nNome alterado com sucesso!\n");
    editarMais(i);
  });
}

function editarPrazo(i) {
  rl.question("\nInforme o novo prazo: ", (novoPrazo) => {
    lembretes[i].prazo = novoPrazo;
    console.log("\nPrazo alterado com sucesso!\n");
    editarMais(i);
  });
}

function marcarConcluido() {
  listagemLembretes();

  rl.question(
    "Informe o índice do lembrete que deseja marcar como concluído: ",
    (indice) => {
      const i = parseInt(indice) - 1;

      if (isNaN(i) || i < 0 || i >= lembretes.length) {
        console.log("Índice inválido.");
        return marcarConcluido();
      }

      lembretes[i].isConcluido = "Concluído";
      console.log("\nLembrete marcado como concluído!\n");
      exibirMenu();
    }
  );
}

exibirMenu();
