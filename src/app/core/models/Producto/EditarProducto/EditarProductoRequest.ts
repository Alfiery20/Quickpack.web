export interface EditarProductoRequest {
    id: number,
    nombre: string,
    descripcion: string,
    idCategoria: number,
    precio: number,
    multimedia: string,
}