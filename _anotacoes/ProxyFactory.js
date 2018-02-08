class ProxyFactory {

	static create(objeto, props, acao) {

		return new Proxy(objeto, {

			get(target, prop, receiver){

				if ( props.includes(prop) && ProxyFactory._isFunction(target[prop]) ) {

					return function(){
						Reflect.apply(target[prop], target, arguments);
						return acao(target);
					}

				}

				return Reflect.get(target, prop, receiver);

			},

			set(target, prop, value, receiver){

				if ( prop.includes(prop) ) {
					target[prop] = value;
				}
				return Reflect.set(target, prop, value, receiver);

			}

		});

	}

	static _isFunction(func){
		return typeof(func) == typeof(Function)
	}

}


class Bind {

	constructor(model, view, ...props){

		let proxy = ProxyFactory.create(model, props, model => view.update(model));
		view.update(model);

		return proxy;

	}

}	


this._mensagem = new Bind(new Mensagem(), new MensagemView($('#mensagem')), 'texto');
this._listaNegociacoes = new Bind(new ListaNegociacoes(), new ListaNegociacoesView($('#negociacoes')), 'adiciona', 'esvazia');