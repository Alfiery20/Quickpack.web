export interface ObtenerCategoriaResponse {
    total: number,
    pagina: number,
    categorias: Categoria[]
}

export interface Categoria {
    id: number,
    nombre: string,
    descripcion: string,
    tipoProducto: string,
    estado: string
}