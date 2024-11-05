import Swal, { SweetAlertOptions } from 'sweetalert2';

// Utilitaire pour afficher un message d'erreur
const errorPage = (textError: string): void => {
  Swal.fire({
    icon: 'error',
    title: 'Erreur',
    text: textError,
    timer: 3000,
    showConfirmButton: false,
  });
};

// Utilitaire pour afficher un message de succès
const success = (textSuccess: string): void => {
  Swal.fire({
    icon: 'success',
    title: 'Succès',
    text: textSuccess,
    timer: 3000,
    showConfirmButton: false,
  });
};

// Utilitaire pour afficher un message d'information
const infoMessage = (textInfo: string): void => {
  Swal.fire({
    icon: 'info',
    title: 'Information',
    text: textInfo,
    timer: 3000,
    showConfirmButton: false,
  });
};

// Utilitaire pour afficher un message de confirmation
const confirmMessage = (
  textConfirm: string, 
  confirmCallback: () => void, 
  cancelCallback: () => void
): void => {
  Swal.fire({
    icon: 'question',
    title: 'Confirmation',
    text: textConfirm,
    showCancelButton: true,
    confirmButtonText: 'Oui',
    cancelButtonText: 'Non',
  }).then((result) => {
    if (result.isConfirmed) {
      confirmCallback();
    } else if (result.dismiss === Swal.DismissReason.cancel) {
      cancelCallback();
    }
  });
};

// Utilitaire pour afficher un message d'avertissement
const warningMessage = (textWarning: string): void => {
  Swal.fire({
    icon: 'warning',
    title: 'Avertissement',
    text: textWarning,
    timer: 3000,
    showConfirmButton: false,
  });
};

// Utilitaire pour afficher un message personnalisé
const customMessage = (options: SweetAlertOptions): void => {
  Swal.fire(options);
};

// Export des utilitaires
export const Utils = {
  errorPage,
  success,
  infoMessage,
  confirmMessage,
  warningMessage,
  customMessage,
};
