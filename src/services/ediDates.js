import Api from "./Api"

export const editarDadosCadastro = (values) => {
    return Api.put  ("/restaurante", values, {
        headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        }
    })
}

export const buscarDadosCadastro = () => {
    return Api.get  ("/restaurante/dados", {
        headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        }
    })
}