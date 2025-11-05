export interface ObtenerTipoProductoResponse {
    total: number,
    pagina: number,
    tipoProducto: TipoProducto[]
}

export interface TipoProducto {
    id: number,
    nombre: string,
    descripcion: string,
    estado: string
}