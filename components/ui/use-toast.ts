// components/ui/use-toast.ts
import { toast } from 'sonner'; // ou autre librairie de toast

export function useToast() {
  return {
    toast: (title: string, description?: string) => {
      toast(title, { description });
    }
  };
}