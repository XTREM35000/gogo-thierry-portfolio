'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import Motion from '@/components/ClientMotion';
import { ArrowRight, Github, Linkedin } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative py-20 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 -z-10">
        <Image
          src="/images/bg/bg01.png"
          alt="Background pattern"
          fill
          className="object-cover opacity-10"
          priority
        />
      </div>

      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Text Content */}
          <Motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
              Développeur Full Stack
              <span className="text-primary block mt-2">Créatif & Passionné</span>
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground">
              Je transforme vos idées en applications web modernes et performantes.
              Spécialisé en React, Next.js et Node.js.
            </p>

            <div className="flex flex-wrap gap-4">
              <Button size="lg" asChild>
                <Link href="/projects">
                  Voir mes projets
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>

              <Button size="lg" variant="outline" asChild>
                <Link href="/contact">
                  Me contacter
                </Link>
              </Button>
            </div>

            <div className="flex gap-4 pt-4">
              <Button variant="ghost" size="icon" asChild>
                <a href="https://github.com/votre-username" target="_blank" rel="noopener noreferrer">
                  <Github className="h-5 w-5" />
                  <span className="sr-only">GitHub</span>
                </a>
              </Button>

              <Button variant="ghost" size="icon" asChild>
                <a href="https://linkedin.com/in/votre-username" target="_blank" rel="noopener noreferrer">
                  <Linkedin className="h-5 w-5" />
                  <span className="sr-only">LinkedIn</span>
                </a>
              </Button>
            </div>
          </Motion.div>

          {/* Right Column - Image */}
          <Motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="relative"
          >
            <div className="relative w-full aspect-square max-w-lg mx-auto">
              <Image
                src="/images/profile/profile.jpg"
                alt="Profile picture"
                fill
                className="object-cover rounded-2xl shadow-2xl"
                priority
              />
              <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-primary/20" />
            </div>
          </Motion.div>
        </div>
      </div>
    </section>
  );
}
