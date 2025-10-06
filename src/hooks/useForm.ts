import { useState, useEffect } from 'react';

export interface FormField {
  name: string;
  value: string;
  error?: string;
  touched?: boolean;
}

export interface FormState {
  [key: string]: FormField;
}

export interface UseFormOptions {
  initialValues: { [key: string]: string };
  validate?: (values: { [key: string]: string }) => { [key: string]: string };
  onSubmit: (values: { [key: string]: string }) => Promise<void> | void;
}

export const useForm = ({ initialValues, validate, onSubmit }: UseFormOptions) => {
  const [state, setState] = useState<FormState>(() => {
    const initialState: FormState = {};
    Object.keys(initialValues).forEach(key => {
      initialState[key] = {
        name: key,
        value: initialValues[key],
        touched: false,
      };
    });
    return initialState;
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const setValue = (name: string, value: string) => {
    setState(prev => ({
      ...prev,
      [name]: {
        ...prev[name],
        value,
        touched: true,
      },
    }));
  };

  const setTouched = (name: string) => {
    setState(prev => ({
      ...prev,
      [name]: {
        ...prev[name],
        touched: true,
      },
    }));
  };

  const reset = () => {
    setState(prev => {
      const newState: FormState = {};
      Object.keys(prev).forEach(key => {
        newState[key] = {
          ...prev[key],
          value: initialValues[key] || '',
          error: undefined,
          touched: false,
        };
      });
      return newState;
    });
    setSubmitError(null);
  };

  // Validate fields
  useEffect(() => {
    if (!validate) return;

    const values: { [key: string]: string } = {};
    Object.keys(state).forEach(key => {
      values[key] = state[key].value;
    });

    const errors = validate(values);

    setState(prev => {
      const newState = { ...prev };
      Object.keys(newState).forEach(key => {
        newState[key] = {
          ...newState[key],
          error: errors[key],
        };
      });
      return newState;
    });
  }, [state, validate]);

  const handleSubmit = async (e?: React.FormEvent) => {
    e?.preventDefault();
    setIsSubmitting(true);
    setSubmitError(null);

    // Mark all fields as touched
    setState(prev => {
      const newState = { ...prev };
      Object.keys(newState).forEach(key => {
        newState[key] = { ...newState[key], touched: true };
      });
      return newState;
    });

    // Check for errors
    const hasErrors = Object.values(state).some(field => field.error);
    if (hasErrors) {
      setIsSubmitting(false);
      return;
    }

    try {
      const values: { [key: string]: string } = {};
      Object.keys(state).forEach(key => {
        values[key] = state[key].value;
      });

      await onSubmit(values);
    } catch (error) {
      setSubmitError(error instanceof Error ? error.message : 'Une erreur est survenue');
    } finally {
      setIsSubmitting(false);
    }
  };

  const getFieldProps = (name: string) => ({
    value: state[name]?.value || '',
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => 
      setValue(name, e.target.value),
    onBlur: () => setTouched(name),
    error: state[name]?.touched ? state[name]?.error : undefined,
  });

  const isValid = Object.values(state).every(field => !field.error);
  const isDirty = Object.values(state).some(field => field.touched);

  return {
    state,
    setValue,
    setTouched,
    reset,
    handleSubmit,
    getFieldProps,
    isSubmitting,
    submitError,
    isValid,
    isDirty,
  };
};

// Validation helpers
export const validators = {
  required: (value: string) => (!value ? 'Ce champ est requis' : ''),
  email: (value: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return !emailRegex.test(value) ? 'Adresse email invalide' : '';
  },
  minLength: (min: number) => (value: string) => 
    value.length < min ? `Minimum ${min} caractères requis` : '',
  maxLength: (max: number) => (value: string) => 
    value.length > max ? `Maximum ${max} caractères autorisés` : '',
  password: (value: string) => {
    if (value.length < 8) return 'Le mot de passe doit contenir au moins 8 caractères';
    if (!/(?=.*[a-z])/.test(value)) return 'Le mot de passe doit contenir au moins une minuscule';
    if (!/(?=.*[A-Z])/.test(value)) return 'Le mot de passe doit contenir au moins une majuscule';
    if (!/(?=.*\d)/.test(value)) return 'Le mot de passe doit contenir au moins un chiffre';
    return '';
  },
  confirmPassword: (originalPassword: string) => (value: string) =>
    value !== originalPassword ? 'Les mots de passe ne correspondent pas' : '',
};

export const combineValidators = (...validators: Array<(value: string) => string>) => 
  (value: string) => {
    for (const validator of validators) {
      const error = validator(value);
      if (error) return error;
    }
    return '';
  };
