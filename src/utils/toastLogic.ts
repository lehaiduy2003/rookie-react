import { Action, toast } from "sonner";

export const errorToast = (message: string, description?: string, action?: Action) => {
  toast.error(message, {
    description: description,
    style: {
      backgroundColor: "#f8d7da",
      color: "#721c24",
    },
    action: action,
  });
};

export const successToast = (message: string, description?: string, action?: Action) => {
  toast.success(message, {
    description: description,
    style: {
      backgroundColor: "#d4edda",
      color: "#155724",
    },
    action: action,
  });
};

export const infoToast = (message: string, description?: string, action?: Action) => {
  toast.info(message, {
    description: description,
    style: {
      backgroundColor: "#cce5ff",
      color: "#004085",
    },
    action: action,
  });
};

export const warningToast = (message: string, description?: string, action?: Action) => {
  toast.warning(message, {
    description: description,
    style: {
      backgroundColor: "#FFCE55",
      color: "black",
    },
    action: action,
  });
};
