import Api from './Api'

export const adicionar = (values) => {
    return Api.post("/cardapio/prato", values, {
        headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        }
    })
}

export const buscaPratos = () => {
    const restaurante = JSON.parse(localStorage.getItem('restaurante'))
    return Api.get("/cardapio/"+restaurante.idRestaurante, {
        headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        }
    })
}

export const editarPratos = (values) => {
    return Api.put("/cardapio/editar/"+values.idPrato, values, {
        headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        }
    })
}

export const excluirPratos = (idPrato) => {
    return Api.delete("/cardapio/excluir/"+idPrato, {
        headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        }
    })
}