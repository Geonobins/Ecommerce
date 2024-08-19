
export const validateInput = (...inputs: string[]): boolean => {
    return inputs.every((input) => input.trim().length > 0);
  };
  