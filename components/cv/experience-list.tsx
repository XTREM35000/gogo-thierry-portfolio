import { Calendar } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { Experience } from '@/lib/types';

interface ExperienceListProps {
  experiences: Experience[];
}

export default function ExperienceList({ experiences }: ExperienceListProps) {
  return (
    <div className="space-y-6">
      {experiences.map((experience, index) => (
        <div key={experience.id}>
          <div className="flex flex-col gap-2">
            <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-1">
              <h3 className="text-lg font-semibold">{experience.title}</h3>
              <div className="flex items-center text-sm text-muted-foreground">
                <Calendar className="h-4 w-4 mr-1" />
                <span>{experience.period}</span>
              </div>
            </div>
            
            <p className="text-primary font-medium">{experience.company}</p>
            
            <div className="mt-2 text-muted-foreground">
              {experience.description}
            </div>
          </div>
          
          {index < experiences.length - 1 && (
            <Separator className="my-4" />
          )}
        </div>
      ))}
    </div>
  );
}