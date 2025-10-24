export interface ObtenerProductoResponse {
    total: number,
    pagina: number,
    productos: Producto[]
}

export interface Producto {
    id: number,
    nombre: string,
    descripcion: string,
    precio: number,
    estado: string,
    categoria: string,
    usuarioCrea: string,
    fechaCrea: string,
    usuarioModifica: string,
    fechaModifica: string
}