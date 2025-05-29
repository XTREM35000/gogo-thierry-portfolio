'use client';

import Link from 'next/link';
import Image from 'next/image';
import Motion from '@/components/ClientMotion';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ExternalLink, Github } from 'lucide-react';

const featuredProjects = [
  {
    title: 'Application de Gestion',
    description: "Une application web pour démarrer vos Stacks clés en main.",
    image: '/images/projets/stack01.png',
    tags: ['React', 'Node.js', 'MongoDB'],
    githubUrl: 'https://github.com/votre-username/project1',
    liveUrl: 'https://project1.com'
  },
  {
    title: 'Plateforme E-learning',
    description: 'Une grille de ressources au choix pour vos projets',
    image: '/images/projets/stack02.png',
    tags: ['Next.js', 'TypeScript', 'PostgreSQL'],
    githubUrl: 'https://github.com/votre-username/project2',
    liveUrl: 'https://project2.com'
  },
  {
    title: 'Application de Gestion',
    description: "Une application web complète pour la gestion d'établissements scolaires.",
    image: '/images/projets/edu01.png',
    tags: ['React', 'Node.js', 'MongoDB'],
    githubUrl: 'https://github.com/votre-username/project1',
    liveUrl: 'https://project1.com'
  },
  {
    title: 'Plateforme E-learning',
    description: 'Une plateforme de Gestion de bus et Cantines Scolaires',
    image: '/images/projets/edu04.png',
    tags: ['Next.js', 'TypeScript', 'PostgreSQL'],
    githubUrl: 'https://github.com/votre-username/project2',
    liveUrl: 'https://project2.com'
  },
  {
    title: 'Application Starter',
    description: 'Une compile de Starter pour vos projets',
    image: '/images/projets/edu05.png',
    tags: ['React Native', 'Firebase', 'Redux'],
    githubUrl: 'https://github.com/votre-username/project3',
    liveUrl: 'https://project3.com'
  },
  {
    title: 'Application de Gestion',
    description: "Une application web complète pour la gestion d'établissements scolaires.",
    image: '/images/projets/edu03.png',
    tags: ['React', 'Node.js', 'MongoDB'],
    githubUrl: 'https://github.com/votre-username/project1',
    liveUrl: 'https://project1.com'
  },
  {
    title: 'Plateforme E-learning',
    description: 'Une plateforme de Gestion simplifiée',
    image: '/images/projets/auto03.png',
    tags: ['Next.js', 'TypeScript', 'PostgreSQL'],
    githubUrl: 'https://github.com/votre-username/project2',
    liveUrl: 'https://project2.com'
  },
  {
    title: 'Application Grid',
    description: 'Une application complète de Gestion Assurance Auto',
    image: '/images/projets/auto01.png',
    tags: ['React Native', 'Firebase', 'Redux'],
    githubUrl: 'https://github.com/votre-username/project3',
    liveUrl: 'https://project3.com'
  }
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

export default function FeaturedProjects() {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <Motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Projets en Vedette
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Découvrez une sélection de mes projets les plus récents et les plus innovants.
          </p>
        </Motion.div>

        <Motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {featuredProjects.map((project, index) => (
            <Motion.div key={index} variants={item}>
              <Card className="group h-full overflow-hidden hover:shadow-lg transition-all duration-300">
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
                  <p className="text-muted-foreground mb-4">{project.description}</p>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.map((tag, tagIndex) => (
                      <Badge key={tagIndex} variant="secondary">
                        {tag}
                      </Badge>
                    ))}
                  </div>

                  <div className="flex gap-3">
                    <Button variant="outline" size="sm" asChild>
                      <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                        <Github className="mr-2 h-4 w-4" />
                        Code
                      </a>
                    </Button>
                    <Button size="sm" asChild>
                      <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="mr-2 h-4 w-4" />
                        Demo
                      </a>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </Motion.div>
          ))}
        </Motion.div>

        <Motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="text-center mt-12"
        >
          <Button size="lg" asChild>
            <Link href="/projects">
              Voir tous les projets
              <ExternalLink className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </Motion.div>
      </div>
    </section>
  );
}
