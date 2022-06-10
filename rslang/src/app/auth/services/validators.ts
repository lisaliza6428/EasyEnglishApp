import { FormControl } from '@angular/forms';

export function validateUpperCase(c: FormControl) {
  const reg = /[A-Z]/;

  return reg.test(c.value)
    ? null
    : {
        validateUpperCase: {
          valid: false,
        },
      };
}

export function validateLowerCase(c: FormControl) {
  const reg = /[a-z]/;

  return reg.test(c.value)
    ? null
    : {
        validateLowerCase: {
          valid: false,
        },
      };
}

export function validateNumbers(c: FormControl) {
  const reg = /[0-9]/;

  return reg.test(c.value)
    ? null
    : {
        validateNumbers: {
          valid: false,
        },
      };
}

export function validateSpecial(c: FormControl) {
  const reg = /(?=.*?[#?!@$%^&*-])/;

  return reg.test(c.value)
    ? null
    : {
        validateSpecial: {
          valid: false,
        },
      };
}
