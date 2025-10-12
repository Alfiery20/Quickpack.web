export interface ObtenerEmpleadoResponse {
    total: number;
    pagina: number;
    empleados: Empleado[];
}

export interface Empleado {
    id: number;
    tipoDocumento: string;
    nroDocumento: string;
    nombre: string;
    apellidoPaterno: string;
    apellidoMaterno: string;
    telefono: string;
    correo: string;
    rol: string;
    estado: string;
}