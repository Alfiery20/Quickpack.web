export class constants {
    static readonly apiUrl: string = 'https://localhost:7230/api/';
    static readonly tokenName: string = 'token';

    static readonly API_KEY: string = 'AIzaSyAvp_gET5hvyKuwK13NgpXDTkeeAETEy20';
    static readonly IdChanel: string = 'UC52_1xLXxA-6wXL4cdByUcQ';
    static readonly MaxResult: number = 8;

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

    encryptToBase64(file: File): Promise<string> {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();

            reader.onload = () => {
                const base64 = reader.result as string;
                resolve(base64);
            };

            reader.onerror = (error) => reject(error);

            reader.readAsDataURL(file);
        });
    }

    decryptBase64(base64String: string): Blob {
        const base64Data = base64String.split(',')[1];
        const contentTypeMatch = base64String.match(/data:(.*?);base64,/);
        const contentType = contentTypeMatch ? contentTypeMatch[1] : 'application/octet-stream';

        const byteCharacters = atob(base64Data);
        const byteNumbers = new Array(byteCharacters.length);

        for (let i = 0; i < byteCharacters.length; i++) {
            byteNumbers[i] = byteCharacters.charCodeAt(i);
        }

        const byteArray = new Uint8Array(byteNumbers);
        return new Blob([byteArray], { type: contentType });
    }


}

