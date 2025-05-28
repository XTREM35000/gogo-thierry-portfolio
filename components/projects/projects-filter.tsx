'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Search, X } from 'lucide-react';

interface ProjectsFilterProps {
  tags: string[];
}

export default function ProjectsFilter({ tags }: ProjectsFilterProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [activeTag, setActiveTag] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const tag = searchParams.get('tag');
    setActiveTag(tag);
  }, [searchParams]);

  const handleTagClick = (tag: string) => {
    if (activeTag === tag) {
      // If clicking the active tag, remove the filter
      router.push('/projects');
      setActiveTag(null);
    } else {
      // Apply the filter
      router.push(`/projects?tag=${encodeURIComponent(tag)}`);
      setActiveTag(tag);
    }
  };

  const clearAllFilters = () => {
    router.push('/projects');
    setActiveTag(null);
    setSearchTerm('');
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-grow">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Rechercher un projet..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-8"
          />
        </div>
        
        {(activeTag || searchTerm) && (
          <Button variant="ghost" onClick={clearAllFilters} className="gap-1.5">
            <X className="h-4 w-4" />
            Effacer les filtres
          </Button>
        )}
      </div>
      
      <div className="flex flex-wrap gap-2">
        {tags.map((tag) => (
          <Badge
            key={tag}
            variant={activeTag === tag ? "default" : "outline"}
            className="cursor-pointer"
            onClick={() => handleTagClick(tag)}
          >
            {tag}
          </Badge>
        ))}
      </div>
    </div>
  );
}