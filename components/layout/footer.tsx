import Link from 'next/link';
import { Github, Linkedin, Mail } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="w-full border-t bg-card">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-sm text-muted-foreground">
              © {currentYear} Portfolio Professionnel. Tous droits réservés.
            </p>
          </div>
          
          <div className="flex items-center gap-4">
            <Link href="https://github.com" target="_blank" rel="noopener noreferrer">
              <Github className="h-5 w-5 text-muted-foreground hover:text-primary transition-colors" />
              <span className="sr-only">GitHub</span>
            </Link>
            <Link href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
              <Linkedin className="h-5 w-5 text-muted-foreground hover:text-primary transition-colors" />
              <span className="sr-only">LinkedIn</span>
            </Link>
            <Link href="mailto:contact@exemple.com">
              <Mail className="h-5 w-5 text-muted-foreground hover:text-primary transition-colors" />
              <span className="sr-only">Email</span>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}