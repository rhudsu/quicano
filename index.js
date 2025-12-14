

const button = document.getElementById('orcamentoBtn');
if(document.title == 'Obrigado, por escolher Quicano'){
    const dados = JSON.parse(localStorage.getItem('cliente'));

    document.getElementById('nomeCliente').innerHTML = `Olá ${dados.nome},`;
    
    document.getElementById('dadosdoCliente').innerHTML = `
        <p><strong>Telefone:</strong> ${dados.telefone}</p>
        <p><strong>Endereço:</strong> Rua ${dados.logradouro}, ${dados.numero}, ${dados.bairro}, ${dados.localidade} - ${dados.uf}</p>   `;
}


button.addEventListener('click', async function() {
    const nome = document.getElementById('nome').value;
    const telefone = document.getElementById('telefone').value;
    const cep = document.getElementById('cep').value;
    const numeroCasa = document.getElementById('numeroCasa').value;

    let erro = false;
    document.getElementById('msgErroCep').innerHTML = "";
    document.getElementById('msgErroNome').innerHTML =  "";
    document.getElementById('msgErroTelefone').innerHTML = "";

    if(cep.length != 8  || isNaN(cep)) {
        document.getElementById('msgErroCep').innerHTML = "Por favor, insira um CEP válido com 8 dígitos numéricos.";
        erro = true;
    }
    if(telefone.length != 11 && telefone.length != 10 ||  isNaN(telefone)) {
        console.log(telefone.length);
        document.getElementById('msgErroTelefone').innerHTML = "Por favor, Insira um telefone valido.";
        erro = true;
    }
    if(nome.length <= 5 || !isNaN(nome)) {
        document.getElementById('msgErroNome').innerHTML = "Por favor, Insira seu Nome completo.";
        erro = true;
    }

    if(erro) {
        return;
    }


    let url = `https://viacep.com.br/ws/${cep}/json/`;
    let response = await fetch(url)
    let data = await response.json();

    if(data.erro) {
        document.getElementById('msgErroCep').innerHTML = "Por favor, insira um CEP válido.";
    }
    else {
        document.getElementById('msgErroCep').innerHTML = "";
        document.getElementById('msgCep').innerHTML = `${data.logradouro}, ${numeroCasa}, ${data.bairro}, ${data.localidade} - ${data.uf}`;
        localStorage.setItem('cliente', JSON.stringify({
            nome: document.getElementById('nome').value,
            telefone: document.getElementById('telefone').value,
            logradouro: data.logradouro,
            numero: numeroCasa,
            bairro: data.bairro,
            localidade: data.localidade,
            uf: data.uf
        }));
        window.location.href = 'sucesso.html';
    }
});