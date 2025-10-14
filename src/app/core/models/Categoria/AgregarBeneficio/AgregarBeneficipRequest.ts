export interface AgregarBeneficipRequest {
    idCategoria: number,
    descripcion: string,
    beneficios: Beneficio[]
}

export interface Beneficio {
    nombre: string
}