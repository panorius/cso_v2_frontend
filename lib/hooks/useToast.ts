import { toast } from "sonner";

export interface ToastOptions {
    title?: string;
    description: string;
    duration?: number;
}

export const useToast = () => {
    const showSuccess = (options: ToastOptions | string) => {
        const message =
            typeof options === "string" ? options : options.description;
        const title = typeof options === "object" ? options.title : undefined;
        const duration = typeof options === "object" ? options.duration : 5000;

        if (title) {
            toast.success(title, {
                description: message,
                duration,
            });
        } else {
            toast.success(message, { duration });
        }
    };

    const showError = (options: ToastOptions | string) => {
        const message =
            typeof options === "string" ? options : options.description;
        const title = typeof options === "object" ? options.title : undefined;
        const duration = typeof options === "object" ? options.duration : 5000;

        if (title) {
            toast.error(title, {
                description: message,
                duration,
            });
        } else {
            toast.error(message, { duration });
        }
    };

    const showWarning = (options: ToastOptions | string) => {
        const message =
            typeof options === "string" ? options : options.description;
        const title = typeof options === "object" ? options.title : undefined;
        const duration = typeof options === "object" ? options.duration : 5000;

        if (title) {
            toast.warning(title, {
                description: message,
                duration,
            });
        } else {
            toast.warning(message, { duration });
        }
    };

    const showInfo = (options: ToastOptions | string) => {
        const message =
            typeof options === "string" ? options : options.description;
        const title = typeof options === "object" ? options.title : undefined;
        const duration = typeof options === "object" ? options.duration : 5000;

        if (title) {
            toast.info(title, {
                description: message,
                duration,
            });
        } else {
            toast.info(message, { duration });
        }
    };

    return {
        success: showSuccess,
        error: showError,
        warning: showWarning,
        info: showInfo,
    };
};
