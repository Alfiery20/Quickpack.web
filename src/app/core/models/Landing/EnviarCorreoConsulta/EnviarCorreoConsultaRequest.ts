export interface EnviarCorreoConsultaRequest {
    tipoSolicitud: string,
    nombreCompleto: string,
    correo: string,
    telefono: string,
    empresa: string,
    poblacion: number,
    mensaje: string
}