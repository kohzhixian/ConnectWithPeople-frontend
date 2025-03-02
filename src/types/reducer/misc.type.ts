export interface MiscInitialStateInterface {
  showSuccessSnackbar: boolean;
  successMessage: string;
  showErrorSnackbar: boolean;
  errorMessage: string;
}

export interface ErrorMessageInterface {
  status: number;
  data: { ErrorMessage: string };
}
