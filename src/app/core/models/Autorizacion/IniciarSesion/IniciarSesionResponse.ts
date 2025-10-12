export interface IniciarSesionResponse {
    id: number,
    tipoDocumento: string,
    numeroDocumento: string,
    nombre: string,
    apellidoPaterno: string,
    apellidoMaterno: string,
    telefono: string,
    idRol: number,
    rol: string,
    token: string
}