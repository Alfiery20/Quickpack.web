export interface ObtenerCategoriaLandingResponse {
    nombre: string,
    descripcion: string,
    multimedia: string,
    producto: ProductoLanding[],
    beneficios: BeneficioCategoriaLanding,
    caracteristicas: CaracteristicasLanding[],
    fichasTecnicas: FichaTenicaLanding[]
}

export interface ProductoLanding {
    idProducto: number,
    nombre: string,
    descripcion: string,
    multimedia: string,
    precio: number
}

export interface BeneficioCategoriaLanding {
    descripcion: string,
    beneficios: BeneficioLanding[]
}

export interface BeneficioLanding {
    id: number,
    nombre: string
}

export interface CaracteristicasLanding {
    id: number,
    nombre: string,
    descripcion: string,
    multimedia: string
}

export interface FichaTenicaLanding {
    idProducto: number,
    nombreProducto: string,
    altoCamara: number,
    anchoCamara: number,
    largoCamara: number,
    altoMaquina: number,
    anchoMaquina: number,
    largoMaquina: number,
    barraSellado: number,
    capacidadBomba: number,
    cicloSuperior: number,
    cicloInferior: number,
    peso: number,
    placaInsercion: number,
    sistemaControl: string,
    deteccionVacioFinal: string,
    deteccionCarne: string,
    softAir: string,
    controlLiquidos: string,
    potencia: number
}