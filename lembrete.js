const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const lembretes = [];

function exibirMenu() {
  console.log("======= SISTEMA DE LEMBRETES =======");

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
        console.log("Saindo do sistema...");
        rl.close();
        break;
      default:
        console.log("Informe uma opção válida!");
        exibirMenu();
    }
  });
}

function adicionarLembrete() {
  rl.question("\nInforme o nome do lembrete: ", (nome) => {
    rl.question("Informe o prazo do lembrete: ", (prazo) => {
      lembretes.push({ nome: nome, prazo: prazo, isConcluido: false });
      console.log("\nLembrete adicionado com sucesso!\n");
      exibirMenu();
    });
  });
}

exibirMenu();
