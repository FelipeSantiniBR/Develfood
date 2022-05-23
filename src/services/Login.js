import Api from './Api'

export const login = (values) => {
    return Api.post("/login/restaurante", values)
    //const urlParams = new URLSearchParams(values).toString()
    //return Api.get("/signin/restaurante?" + urlParams)
}

export const getData = () => {
    return Api.get("/restaurante/dados", {
        headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        }
    }).then((success) => {
        delete success.data.cardapioRestaurante
        localStorage.setItem('restaurante', JSON.stringify(success.data))
    })
}