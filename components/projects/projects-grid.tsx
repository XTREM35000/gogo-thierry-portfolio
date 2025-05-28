'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Project } from '@/lib/types';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { ExternalLink, Github } from 'lucide-react';

interface ProjectsGridProps {
  projects: Project[];
}

export default function ProjectsGrid({ projects }: ProjectsGridProps) {
  const [filteredProjects, setFilteredProjects] = useState<Project[]>(projects);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [activeFilter, setActiveFilter] = useState<string | null>(null);

  // Listen for filter changes from the URL
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const tagFilter = urlParams.get('tag');
    
    if (tagFilter) {
      setActiveFilter(tagFilter);
      setFilteredProjects(
        projects.filter(project => project.tags && project.tags.includes(tagFilter))
      );
    } else {
      setActiveFilter(null);
      setFilteredProjects(projects);
    }
  }, [projects]);

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProjects.map((project) => (
          <Card 
            key={project.id} 
            id={`${project.id}`}
            className="overflow-hidden flex flex-col h-full cursor-pointer transition-all hover:shadow-md"
            onClick={() => setSelectedProject(project)}
          >
            {project.screenshot_url && (
              <div className="relative w-full h-48 overflow-hidden">
                <Image 
                  src={project.screenshot_url}
                  alt={project.title}
                  fill
                  className="object-cover transition-transform hover:scale-105"
                />
              </div>
            )}
            
            <CardHeader className="pb-2">
              <CardTitle>{project.title}</CardTitle>
              <CardDescription className="line-clamp-2">{project.description}</CardDescription>
            </CardHeader>
            
            <CardContent className="flex-grow">
              <div className="flex flex-wrap gap-1.5 mt-2">
                {project.tags && project.tags.map((tag, index) => (
                  <Badge key={index} variant="outline">
                    {tag}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Dialog open={!!selectedProject} onOpenChange={(open) => !open && setSelectedProject(null)}>
        {selectedProject && (
          <DialogContent className="max-w-3xl">
            <DialogHeader>
              <DialogTitle>{selectedProject.title}</DialogTitle>
              <DialogDescription>{selectedProject.description}</DialogDescription>
            </DialogHeader>
            
            {selectedProject.screenshot_url && (
              <div className="relative w-full h-64 md:h-80 overflow-hidden rounded-md">
                <Image 
                  src={selectedProject.screenshot_url}
                  alt={selectedProject.title}
                  fill
                  className="object-cover"
                />
              </div>
            )}
            
            <div className="flex flex-wrap gap-2 mt-2">
              {selectedProject.tags && selectedProject.tags.map((tag, index) => (
                <Badge key={index} variant="secondary">
                  {tag}
                </Badge>
              ))}
            </div>
            
            <div className="flex flex-wrap gap-3 justify-end">
              {selectedProject.github_url && (
                <Button variant="outline" asChild>
                  <a href={selectedProject.github_url} target="_blank" rel="noopener noreferrer">
                    <Github className="mr-2 h-4 w-4" />
                    GitHub
                  </a>
                </Button>
              )}
              
              {selectedProject.live_url && (
                <Button asChild>
                  <a href={selectedProject.live_url} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="mr-2 h-4 w-4" />
                    Site Live
                  </a>
                </Button>
              )}
            </div>
          </DialogContent>
        )}
      </Dialog>
    </>
  );
}