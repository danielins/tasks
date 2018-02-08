class NegociacaoService {

	obterNegociacoesSemana(){

		return new Promise((resolve, reject) => {

			let xhr = new XMLHttpRequest();

			xhr.open('GET', 'negociacoes/semana');

			xhr.onreadystatechange = () => {

				if ( xhr.readyState == 4 ) {

					if ( xhr.status == 200 ) {

						resolve( JSON.parse(xhr.responseText) );

					} else {

						reject('Não foi possível obter as negociações da semana');

					}

				}

			};

			xhr.send();

		});

	}

}


let service = new NegociacaoService();

let promise = service.obterNegociacoesSemana();

promise
	.then(negociacoes => {
		negociacoes.forEach(negociacao => this._listaNegociacoes.adiciona(negociacao))
		this._mensagem.texto = 'Negociações da semana obtida com sucesso';
	})
	.catch(erro => this._mensagem.texto = erro);


Promise.all([
	service.obterNegociacoesSemana(),
	service.obterNegociacoesSemana(),
	service.obterNegociacoesSemana()
]).then(negociacoes => {
	negociacoes.reduce((flat, array) => flat.concat(array), [])
	.forEach(negociacao => this._listaNegociacoes.adiciona(negociacao));
		this._mensagem.texto = 'Negociações importados com sucesso';
}).catch(error => this._mensagem.texto = error);