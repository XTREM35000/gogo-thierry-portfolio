'use client';

import Link from 'next/link';
import Motion from '@/components/ClientMotion';
import { Button } from '@/components/ui/button';
import { ArrowRight, Mail, MessageSquare } from 'lucide-react';
import Image from 'next/image'; // N'oubliez pas d'importer le composant Image

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
                {/* Arrière-plans avec rotation */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-primary/10 rounded-2xl transform rotate-3" />
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-primary/20 rounded-2xl transform -rotate-3" />

                {/* Conteneur principal pour les captures d'écran */}
                <div className="absolute inset-0 rounded-2xl overflow-hidden">
                  {/* Capture d'écran 1 (centrale) */}
                  <div className="absolute inset-0 flex items-center justify-center p-4">
                  <Motion.div
  initial={{ y: 20, opacity: 0 }}
  animate={{ y: 0, opacity: 1 }}
  transition={{ delay: 0.4 }}
  className="absolute bottom-4 right-4 w-3/4 h-3/4 z-20 transform rotate-1"
>

                    <Image
                      src="/images/projets/edu01.png" // Remplacez par votre chemin d'image
                      alt="Projet 1"
                      width={500}
                      height={300}
                      className="rounded-lg object-cover h-full w-full shadow-lg border border-primary/20"
                    />
                      </Motion.div>
                  </div>

                  {/* Capture d'écran 2 (décalée) */}
                  <div className="absolute top-4 left-4 w-3/4 h-3/4 z-10 transform -rotate-2">
                  <Motion.div
  initial={{ y: 20, opacity: 0 }}
  animate={{ y: 0, opacity: 1 }}
  transition={{ delay: 0.4 }}
  className="absolute bottom-4 right-4 w-3/4 h-3/4 z-20 transform rotate-1"
>
    <Image
                      src="/images/projets/edu04.png" // Remplacez par votre chemin d'image
                      alt="Projet 2"
                      width={400}
                      height={250}
                      className="rounded-lg object-cover h-full w-full shadow-xl border-2 border-primary/30"
                    />
                      </Motion.div>
                  </div>

                  {/* Capture d'écran 3 (décalée) */}
                  <div className="absolute bottom-4 right-4 w-3/4 h-3/4 z-20 transform rotate-1">
                  <Motion.div
  initial={{ y: 20, opacity: 0 }}
  animate={{ y: 0, opacity: 1 }}
  transition={{ delay: 0.4 }}
  className="absolute bottom-4 right-4 w-3/4 h-3/4 z-20 transform rotate-1"
>
                    <Image
                      src="/images/projets/edu05.png" // Remplacez par votre chemin d'image
                      alt="Projet 3"
                      width={400}
                      height={250}
                      className="rounded-lg object-cover h-full w-full shadow-2xl border-2 border-primary/40"
                    />
                    </Motion.div>
                  </div>
                </div>
              </Motion.div>
            </div>
          </div>
        </Motion.div>
      </div>
    </section>
  );
}
