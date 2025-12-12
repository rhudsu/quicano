// Get the button element
const button = document.getElementById('orcamentoBtn');
if(document.title == 'Obrigado, por escolher Quicano'){
    const dados = JSON.parse(localStorage.getItem('cliente'));
    document.getElementById('msgSucesso').innerHTML = `Olá ${dados.nome}, foi aberto um solitação e entraremos em contato em breve com voce no telefone ${dados.telefone}. Seu endereço cadastrado é: ${dados.logradouro}, ${dados.numero}, ${dados.bairro}, ${dados.localidade} - ${dados.uf}. Obrigado por escolher a QuiCano!`;
}




button.addEventListener('click', async function() {
    const cep = document.getElementById('cep').value;
    const numeroCasa = document.getElementById('numeroCasa').value;

    if(cep.length !== 8 || isNaN(cep)) {
        document.getElementById('msgErroCep').innerHTML = "Por favor, insira um CEP válido com 8 dígitos numéricos.";
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