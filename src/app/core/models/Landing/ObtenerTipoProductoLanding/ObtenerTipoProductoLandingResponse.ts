export interface ObtenerTipoProductoLandingResponse {
    nombre: string,
    descripcion: string,
    multimedia: string,
    categorias: CategoriaLanding[]
}

export interface CategoriaLanding {
    idCategoria: number,
    nombre: string,
    descripcion: string,
    multimedia: string
}