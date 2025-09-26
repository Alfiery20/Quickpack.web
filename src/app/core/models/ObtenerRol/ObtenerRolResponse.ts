export interface ObtenerRolResponse {
    total: number;
    pagina: number;
    roles: Rol[];
}

export interface Rol {
    id: number;
    nombre: string;
    estado: string;
}