export interface SignInFormData {
  email: string;
  password: string;
}

export interface SignUpFormData {
  email: string;
  password: string;
  confirmPassword: string;
  fullName?: string;
}

export interface AuthFormProps {
  onSubmit: (data: SignInFormData | SignUpFormData) => Promise<void>;
  loading?: boolean;
  error?: string | null;
}
