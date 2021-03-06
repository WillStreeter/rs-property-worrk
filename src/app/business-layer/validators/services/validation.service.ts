import { AbstractControl } from '@angular/forms';


export class ValidationService {
    static getValidatorErrorMessage(validatorName: string, validatorValue?: any): any {
        let config: any = {
            'required': 'Required',
            'isAlphanWhtSpc': 'Only Alpha, WhiteSpaces, characters.',
            'isAlphaNumericWhtSpc': 'Only Alpha, Numerical, WhiteSpaces, characters.',
            'isAlphanumeric': 'Only Alpha and Numerical characters.',
            'isAlpha': 'Only Alpha characters.',
            'isNumericalFloat': 'Only Numerical characters and single decimal.',
            'minlength': `Minimum length ${validatorValue.requiredLength}`,
            'maxlength': `Maximum length ${validatorValue.requiredLength}`
        };

        return config[validatorName];
    }

    static numericFloatValidator() {
        // {6,100}           - Assert password is between 6 and 100 characters
        // (?=.*[0-9])       - Assert a string has at least one number
        return (options?: any) => {
            return (c: AbstractControl) => {
                if (c.value === null || c.value.length === 0) {
                    return null;
                }
                const regexStr: string = '^[0-9]+([.][0-9]+)*$';
                const regex: RegExp = new RegExp(regexStr);
                if (regex.test(c.value)) {
                    return null;
                } else {
                    return { 'isNumericalFloat': true };
                }
            };
        };
    }

    static alphaWithSpacesValidator() {
          return (options?: any) => {
           return (c: AbstractControl) => {
                if (c.value === null || c.value.length === 0) {
                    return null;
                }
                const regexStr: string = '^[A-Za-z- ]*[A-Za-z][A-Za-z- ]*$';
                const regex: RegExp = new RegExp(regexStr);
                if (regex.test(c.value)) {
                    return null;
                } else {
                    return { 'isAlphanWhtSpc': true };
                }
            };
          };
    }

    static alphaNumericWithSpacesValidator() {
          return (options?: any) => {
           return (c: AbstractControl) => {
                if (c.value === null || c.value.length === 0) {
                    return null;
                }
                const regexStr: string = '^[A-Za-z0-9- ]*[A-Za-z0-9][A-Za-z0-9- ]*$';
                const regex: RegExp = new RegExp(regexStr);
                if (regex.test(c.value)) {
                    return null;
                } else {
                    return { 'isAlphaNumericWhtSpc': true };
                }
            };
          };
    }
}
