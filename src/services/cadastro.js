import Api from './Api'

export const cadastro = (values) => {
    return Api.post("/restaurante/cadastro", values)
    //const urlParams = new URLSearchParams(values).toString()
    //return Api.get("/restaurante/cadastro?" + urlParams)
}
