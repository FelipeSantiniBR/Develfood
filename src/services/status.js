import Api from "./Api";

export const buscaPedido = () => {
    return Api.get("/pedido/restaurante", {
        headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        }
    })
}


export const alteraStatus = (idPedido) => {
    return Api.put("/pedido/status/"+idPedido, null, {
        headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        }
    })
}