import { Skill } from '@/lib/types';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

interface SkillsListProps {
  skills: Skill[];
}

export default function SkillsList({ skills }: SkillsListProps) {
  return (
    <div className="space-y-6">
      {skills.map((skill, index) => (
        <div key={skill.id}>
          <h3 className="text-lg font-semibold mb-3">{skill.category}</h3>
          
          <div className="flex flex-wrap gap-1.5">
            {skill.items.map((item, i) => (
              <Badge key={i} variant="secondary">
                {item}
              </Badge>
            ))}
          </div>
          
          {index < skills.length - 1 && (
            <Separator className="my-4" />
          )}
        </div>
      ))}
    </div>
  );
}