export interface ObtenerCategoriaLandingResponse {
    nombre: string,
    descripcion: string,
    multimedia: string,
    producto: ProductoLanding[]
}

export interface ProductoLanding {
    idProducto: number,
    nombre: string,
    descripcion: string,
    multimedia: string
}