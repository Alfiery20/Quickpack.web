export interface ObtenerPermisosRolResponse {
    idMenu: number;
    nombre: string;
    padre: number;
    isPermiso: number;
    menusHijos: ObtenerPermisosRolResponse[];
}