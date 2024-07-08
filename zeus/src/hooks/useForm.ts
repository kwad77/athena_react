// zeus\src\hooks\useForm.ts

import { useState, ChangeEvent, FormEvent } from 'react';

interface ValidationRules {
  [key: string]: (value: any) => string | undefined;
}

interface UseFormReturn<T> {
  values: T;
  errors: Partial<Record<keyof T, string>>;
  handleChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  handleSubmit: (onSubmit: (values: T) => void) => (e: FormEvent<HTMLFormElement>) => void;
  isValid: boolean;
}

function useForm<T extends Record<string, any>>(
  initialValues: T,
  validationRules: ValidationRules = {}
): UseFormReturn<T> {
  const [values, setValues] = useState<T>(initialValues);
  const [errors, setErrors] = useState<Partial<Record<keyof T, string>>>({});

  const validate = (name: keyof T, value: any): string | undefined => {
    const validateField = validationRules[name as string];
    return validateField ? validateField(value) : undefined;
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
    
    const error = validate(name as keyof T, value);
    setErrors(prevErrors => ({
      ...prevErrors,
      [name]: error
    }));
  };

  const handleSubmit = (onSubmit: (values: T) => void) => (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    const formErrors: Partial<Record<keyof T, string>> = {};
    let isValid = true;

    Object.keys(values).forEach(key => {
      const error = validate(key as keyof T, values[key]);
      if (error) {
        formErrors[key as keyof T] = error;
        isValid = false;
      }
    });

    setErrors(formErrors);

    if (isValid) {
      onSubmit(values);
    }
  };

  const isValid = Object.keys(errors).length === 0;

  return { values, errors, handleChange, handleSubmit, isValid };
}

export default useForm;