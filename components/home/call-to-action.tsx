'use client';

import Link from 'next/link';
import Motion from '@/components/ClientMotion';
import { Button } from '@/components/ui/button';
import { ArrowRight, Mail, MessageSquare } from 'lucide-react';

export default function CallToAction() {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <Motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-primary/10 via-primary/5 to-primary/10 p-8 md:p-12"
        >
          {/* Background Pattern */}
          <div className="absolute inset-0 -z-10">
            <div className="absolute inset-0 bg-grid-white/10 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))]" />
          </div>

          <div className="relative">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div className="space-y-6">
                <h2 className="text-3xl md:text-4xl font-bold">
                  Prêt à démarrer votre projet ?
                </h2>
                <p className="text-lg text-muted-foreground">
                  Transformons vos idées en réalité. Contactez-moi pour discuter de votre projet et voir comment je peux vous aider à le concrétiser.
                </p>

                <div className="flex flex-wrap gap-4">
                  <Button size="lg" asChild>
                    <Link href="/contact">
                      <Mail className="mr-2 h-5 w-5" />
                      Me contacter
                    </Link>
                  </Button>

                  <Button size="lg" variant="outline" asChild>
                    <Link href="/projects">
                      <MessageSquare className="mr-2 h-5 w-5" />
                      Voir mes projets
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Link>
                  </Button>
                </div>
              </div>

              <Motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="relative h-[300px] hidden md:block"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-primary/10 rounded-2xl transform rotate-3" />
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-primary/20 rounded-2xl transform -rotate-3" />
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-primary/10 rounded-2xl" />
              </Motion.div>
            </div>
          </div>
        </Motion.div>
      </div>
    </section>
  );
}
