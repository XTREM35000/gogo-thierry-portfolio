'use client';

import Motion from '@/components/ClientMotion';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Code2,
  Database,
  Globe,
  Layers,
  Smartphone,
  Wrench
} from 'lucide-react';

const skills = [
  {
    category: 'Frontend',
    icon: <Code2 className="h-6 w-6" />,
    skills: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'HTML/CSS']
  },
  {
    category: 'Backend',
    icon: <Database className="h-6 w-6" />,
    skills: ['Node.js', 'Express', 'PostgreSQL', 'MongoDB', 'REST API']
  },
  {
    category: 'Mobile',
    icon: <Smartphone className="h-6 w-6" />,
    skills: ['React Native', 'Expo', 'Mobile UI/UX', 'PWA']
  },
  {
    category: 'DevOps',
    icon: <Wrench className="h-6 w-6" />,
    skills: ['Docker', 'Git', 'CI/CD', 'AWS', 'Vercel']
  },
  {
    category: 'Architecture',
    icon: <Layers className="h-6 w-6" />,
    skills: ['Microservices', 'MVC', 'Clean Architecture', 'SOLID']
  },
  {
    category: 'Web',
    icon: <Globe className="h-6 w-6" />,
    skills: ['SEO', 'Performance', 'Accessibility', 'Security']
  }
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

export default function SkillsShowcase() {
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
            Mes Compétences
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Un aperçu des technologies et méthodologies que j'utilise pour créer des applications modernes et performantes.
          </p>
        </Motion.div>

        <Motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {skills.map((skillGroup, index) => (
            <Motion.div key={index} variants={item}>
              <Card className="h-full hover:shadow-lg transition-shadow duration-200">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-primary/10 rounded-lg text-primary">
                      {skillGroup.icon}
                    </div>
                    <h3 className="text-xl font-semibold">{skillGroup.category}</h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {skillGroup.skills.map((skill, skillIndex) => (
                      <Badge
                        key={skillIndex}
                        variant="secondary"
                        className="text-sm"
                      >
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </Motion.div>
          ))}
        </Motion.div>
      </div>
    </section>
  );
}
