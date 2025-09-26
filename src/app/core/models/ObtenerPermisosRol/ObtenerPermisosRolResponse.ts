export interface ObtenerPermisosRolResponse {
    idMenu: number;
    nombre: string;
    padre: number;
    isPermiso: boolean;
    menusHijos: ObtenerPermisosRolResponse[];
}