export interface ObtenerBeneficioResponse {
    descripcion: string,
    beneficios: ObtenerBeneficio[]
}

export interface ObtenerBeneficio {
    idBeneficio: number,
    nombre: string
}