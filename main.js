const form = document.getElementById('form-atividade');
const imgAprovado = '<img src="./images/aprovado.png" alt="Emoji celebrando" />';
const imgReprovado = '<img src="./images/reprovado.png" alt="Emoji decepcionado" />';
const atividades = [];
const notas = [];
const spanAprovado = '<span class="resultado aprovado">Aprovado</span>';
const spanReprovado = '<span class="resultado reprovado">Reprovado</span>';

let notaMinima;

while (true) {
    let entrada = prompt('Digite a nota mínima (de 0 a 10):');

    if (entrada === null) {
        alert('Você precisa definir uma nota mínima para continuar!');
        continue; 
    }

    notaMinima = parseFloat(entrada.replace(',', '.'));

    if (!isNaN(notaMinima) && notaMinima >= 0 && notaMinima <= 10) {
        break; 
    }

    alert("Por favor, digite apenas números válidos entre 0 e 10.");
}

let linhas = '';

form.addEventListener('submit', function(e){
    e.preventDefault();

    adicionaLinha();
    atualizaTabela();
    atualizaMediaFinal();
});

function adicionaLinha(){  
    const inputNomeAtividade = document.getElementById('nome-atividade');
    const inputNotaAtividade = document.getElementById('nota-atividade');



    if(atividades.includes(inputNomeAtividade.value)){
        alert(`A atividade ${inputNomeAtividade.value} já foi inserida`)
    }else{
    atividades.push(inputNomeAtividade.value);
    notas.push(parseFloat(inputNotaAtividade.value));

    let linha = '<tr>';
    linha += `<td> ${inputNomeAtividade.value}</td>`;
    linha += `<td> ${inputNotaAtividade.value}</td>`;
    linha += `<td> ${inputNotaAtividade.value >= notaMinima ? imgAprovado : imgReprovado}</td>`;
    linha += `</tr>`;

    linhas += linha;
    }
    inputNomeAtividade.value = '';
    inputNotaAtividade.value ='';
}

function atualizaTabela(){
    const corpoTabela = document.querySelector('tbody');
    corpoTabela.innerHTML = linhas;
}

function atualizaMediaFinal (){
    const  mediaFinal = calculaMediaFinal();

    document.getElementById('media-final-valor').innerHTML = mediaFinal.toFixed(2);
    document.getElementById('media-final-resultado').innerHTML = mediaFinal >= notaMinima ? spanAprovado : spanReprovado;
}

function calculaMediaFinal(){
    let somaDasNotas = 0;
    for (let i = 0; i < notas.length; i++){
    somaDasNotas += notas[i];
    }

    return somaDasNotas / notas.length;  
}