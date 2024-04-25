export class DocumentValidator {
    static isValidCPF(cpf: string): boolean {
        cpf = cpf.replace(/[^\d]/g, ''); 
        if (cpf.length !== 11) {
            return false;
        }

        if (/^([0-9])\1{10}$/.test(cpf)) {
            return false;
        }

        let sum = 0;
        let remainder: number;
        for (let i = 1; i <= 9; i++) {
            sum += parseInt(cpf[i - 1]) * (11 - i);
        }
        remainder = (sum * 10) % 11;
        
        if ((remainder === 10) || (remainder === 11)) {
            remainder = 0;
        }

        if (remainder !== parseInt(cpf[9])) {
            return false;
        }

        sum = 0;
        for (let i = 1; i <= 10; i++) {
            sum += parseInt(cpf[i - 1]) * (12 - i);
        }
        remainder = (sum * 10) % 11;
        
        if ((remainder === 10) || (remainder === 11)) {
            remainder = 0;
        }

        if (remainder !== parseInt(cpf[10])) {
            return false;
        }

        return true;
    }

    static isValidCNPJ(cnpj: string): boolean {
        cnpj = cnpj.replace(/[^\d]/g, '');
        if (cnpj.length !== 14) {
            return false;
        }

        if (/^(\d)\1{13}$/.test(cnpj)) {
            return false;
        }

        let size = cnpj.length - 2;
        let numbers = cnpj.substring(0, size);
        let digits = cnpj.substring(size);
        let sum = 0;
        let pos = size - 7;

        for (let i = size; i >= 1; i--) {
            sum += parseInt(numbers[size - i]) * pos--;
            if (pos < 2) {
                pos = 9;
            }
        }

        let result = sum % 11 < 2 ? 0 : 11 - (sum % 11);
        if (result !== parseInt(digits[0])) {
            return false;
        }

        size = size + 1;
        numbers = cnpj.substring(0, size);
        sum = 0;
        pos = size - 7;
        
        for (let i = size; i >= 1; i--) {
            sum += parseInt(numbers[size - i]) * pos--;
            if (pos < 2) {
                pos = 9;
            }
        }

        result = sum % 11 < 2 ? 0 : 11 - (sum % 11);
        if (result !== parseInt(digits[1])) {
            return false;
        }

        return true;
    }
}