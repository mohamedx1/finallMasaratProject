import { useToast } from "./use-toast";
import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from "./toast";

export function Toaster() {
  const { toasts } = useToast();

  return (
    <ToastProvider>
      {toasts.map(function ({
        id,
        title,
        description,
        icon,
        action,
        ...props
      }: any) {
        return (
          <Toast
            key={id}
            {...props}
            className='bg-slate-50 flex justify-between'
          >
            <div className='grid gap-1 '>
              {title && (
                <ToastTitle className='font-semibold text-lg'>
                  {title}
                </ToastTitle>
              )}
              {description && (
                <ToastDescription className=' text-md'>
                  {description}
                </ToastDescription>
              )}
            </div>
            <div>{icon}</div>
            {action}
            <ToastClose />
          </Toast>
        );
      })}
      <ToastViewport />
    </ToastProvider>
  );
}
