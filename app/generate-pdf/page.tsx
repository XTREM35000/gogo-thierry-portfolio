import { Metadata } from 'next';
import PdfGenerator from '@/components/pdf/pdf-generator';
import { getProfile, getExperiences, getSkills, getProjects } from '@/lib/supabase/queries';

export const metadata: Metadata = {
  title: 'Générer PDF | Portfolio Professionnel',
  description: 'Générateur de CV et lettre de motivation au format PDF',
};

export default async function GeneratePdfPage() {
  const profile = await getProfile();
  const experiences = await getExperiences();
  const skills = await getSkills();
  const projects = await getProjects();

  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      <div className="flex flex-col gap-6">
        <h1 className="text-3xl font-bold md:text-4xl">Générateur de PDF</h1>
        
        <div className="bg-card p-6 rounded-lg shadow-sm">
          <PdfGenerator 
            profile={profile} 
            experiences={experiences} 
            skills={skills} 
            projects={projects} 
          />
        </div>
      </div>
    </div>
  );
}