export interface ObtenerMenuResponse {
    id: number,
    nombre: string,
    ruta: string,
    idMenuPadre: number,
    orden: number,
    icono: string,
    isOpen: false,
    menuHijo: ObtenerMenuResponse[]
}
