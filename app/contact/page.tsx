import { Metadata } from 'next';
import ContactForm from '@/components/contact/contact-form';

export const metadata: Metadata = {
  title: 'Contact | Portfolio Professionnel',
  description: 'Me contacter pour toute opportunité ou information',
};

export default function ContactPage() {
  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      <div className="flex flex-col gap-6 max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold md:text-4xl">Contact</h1>
        
        <p className="text-muted-foreground">
          N'hésitez pas à me contacter pour toute opportunité, question ou collaboration.
          Je vous répondrai dans les plus brefs délais.
        </p>
        
        <div className="bg-card p-6 rounded-lg shadow-sm">
          <ContactForm />
        </div>
      </div>
    </div>
  );
}