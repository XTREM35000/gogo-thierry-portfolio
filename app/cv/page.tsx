import { Metadata } from 'next';
import ProfileHeader from '@/components/cv/profile-header';
import ExperienceList from '@/components/cv/experience-list';
import SkillsList from '@/components/cv/skills-list';
import GeneratePdfButton from '@/components/cv/generate-pdf-button';
import { getProfile, getExperiences, getSkills } from '@/lib/supabase/queries';

export const metadata: Metadata = {
  title: 'CV | Portfolio Professionnel',
  description: 'Mon CV professionnel, expériences et compétences',
};

export default async function CvPage() {
  const profile = await getProfile();
  const experiences = await getExperiences();
  const skills = await getSkills();

  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      <div className="flex flex-col gap-6">
        <div className="flex justify-between items-start">
          <h1 className="text-3xl font-bold md:text-4xl">Curriculum Vitae</h1>
          <GeneratePdfButton />
        </div>
        
        <div className="bg-card p-6 rounded-lg shadow-sm">
          <ProfileHeader profile={profile} />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            <div className="bg-card p-6 rounded-lg shadow-sm">
              <h2 className="text-2xl font-semibold mb-4">Expériences Professionnelles</h2>
              <ExperienceList experiences={experiences} />
            </div>
          </div>
          
          <div>
            <div className="bg-card p-6 rounded-lg shadow-sm">
              <h2 className="text-2xl font-semibold mb-4">Compétences</h2>
              <SkillsList skills={skills} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}