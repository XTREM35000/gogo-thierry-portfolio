import { Metadata } from 'next';
import ProjectsGrid from '@/components/projects/projects-grid';
import ProjectsFilter from '@/components/projects/projects-filter';
import { getProjects } from '@/lib/supabase/queries';

export const metadata: Metadata = {
  title: 'Projets | Portfolio Professionnel',
  description: 'Découvrez mes projets de développement et réalisations techniques',
};

export default async function ProjectsPage() {
  const projects = await getProjects();
  
  // Extract unique tags from all projects for filtering
  const allTags = Array.from(
    new Set(
      projects.flatMap(project => project.tags || [])
    )
  );

  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      <div className="flex flex-col gap-6">
        <h1 className="text-3xl font-bold md:text-4xl">Mes Projets</h1>
        
        <div className="flex flex-col gap-6">
          <ProjectsFilter tags={allTags} />
          <ProjectsGrid projects={projects} />
        </div>
      </div>
    </div>
  );
}