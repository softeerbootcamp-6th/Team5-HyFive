export interface UserFormData {
  bookName: string;
  bookTel: string;
  hospitalDate: string;
  hospitalTime: string;
  startAddr: string;
  endAddr: string;
  walker: boolean;
}

export type PopupType = "calendar" | "timePicker" | null;

export interface FormFieldProps {
  label: string;
  placeholder: string;
  required?: boolean;
  icon?: React.ReactNode;
  errorMessage?: string;
}
