export interface GuardDecryp {
    id: string,
    tipo_documento: string,
    numero_documento: string,
    nombre: string,
    apellido_paterno: string,
    apellido_materno: string,
    telefono: string,
    id_rol: string,
    rol: string,
    permisos: Permiso[],
    exp: number,
    iss: string
}

export interface Permiso {
    Id: number,
    Nombre: string,
    Ruta: string,
    IdMenuPadre: number,
    Orden: number,
    Icono: string,
    MenuHijo: Permiso[]
}