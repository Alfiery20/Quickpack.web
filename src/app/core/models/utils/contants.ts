export class constants {
    static readonly apiUrl: string = 'https://localhost:7230/api/';
    static readonly tokenName: string = 'token';
    TipoDocumento(id: string) {
        switch (id) {
            case '1':
                return 'DNI';
            case '2':
                return 'Carnet de Extranjeria';
            case '3':
                return 'Pasaporte';
            case '4':
                return 'RUC';
            default:
                return 'Otro';
        }
    }
}

