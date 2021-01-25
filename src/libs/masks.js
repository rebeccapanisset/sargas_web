const useMask = () => {
  function cepMask() {
    return [/[0-9]/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/];
  }

  function cpfCnpjMask(value) {
    const regex = /\D/g;
    const rawValue = value.replace(regex, '');
    if (rawValue.length > 11) {
      return [
        /\d/,
        /\d/,
        '.',
        /\d/,
        /\d/,
        /\d/,
        '.',
        /\d/,
        /\d/,
        /\d/,
        '/',
        /\d/,
        /\d/,
        /\d/,
        /\d/,
        '-',
        /\d/,
        /\d/,
      ];
    }
    return [
      /\d/,
      /\d/,
      /\d/,
      '.',
      /\d/,
      /\d/,
      /\d/,
      '.',
      /\d/,
      /\d/,
      /\d/,
      '-',
      /\d/,
      /\d/,
    ];
  }

  function dateMask() {
    return [
      /[0-9]/,
      /[0-9]/,
      '/',
      /[0-9]/,
      /[0-9]/,
      '/',
      /\d/,
      /[0-9]/,
      /[0-9]/,
      /[0-9]/,
    ];
  }

  function phoneMask(value) {
    const numbers = value.match(/\d/g);
    let numberLength = 0;
    if (numbers) {
      numberLength = numbers.join('').length;
    }

    if (numberLength > 10) {
      return [
        '(',
        /[1-9]/,
        /[1-9]/,
        ')',
        ' ',
        /\d/,
        /\d/,
        /\d/,
        /\d/,
        /\d/,
        '-',
        /\d/,
        /\d/,
        /\d/,
        /\d/,
      ];
    }
    return [
      '(',
      /[1-9]/,
      /[1-9]/,
      ')',
      ' ',
      /\d/,
      /\d/,
      /\d/,
      /\d/,
      '-',
      /\d/,
      /\d/,
      /\d/,
      /\d/,
    ];
  }

  return { cepMask, cpfCnpjMask, dateMask, phoneMask };
};

export { useMask };
