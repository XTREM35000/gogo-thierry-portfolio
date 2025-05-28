'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ProfileEditor from '@/components/admin/profile-editor';
import ExperiencesEditor from '@/components/admin/experiences-editor';
import ProjectsEditor from '@/components/admin/projects-editor';
import SkillsEditor from '@/components/admin/skills-editor';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { useAuth } from '@/lib/auth/auth-provider';

export default function AdminPage() {
  const { user, signOut } = useAuth();
  const router = useRouter();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check authentication status
    if (!user && !isLoading) {
      toast({
        title: "Accès restreint",
        description: "Vous devez être connecté pour accéder à cette page.",
        variant: "destructive",
      });
      router.push('/login');
    } else {
      setIsLoading(false);
    }
  }, [user, isLoading, router, toast]);

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8 md:py-12 flex justify-center">
        <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      <div className="flex flex-col gap-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold md:text-4xl">Administration</h1>
          <Button variant="outline" onClick={() => signOut()}>Déconnexion</Button>
        </div>
        
        <Tabs defaultValue="profile" className="w-full">
          <TabsList className="grid grid-cols-4 mb-6">
            <TabsTrigger value="profile">Profil</TabsTrigger>
            <TabsTrigger value="experiences">Expériences</TabsTrigger>
            <TabsTrigger value="projects">Projets</TabsTrigger>
            <TabsTrigger value="skills">Compétences</TabsTrigger>
          </TabsList>
          
          <TabsContent value="profile" className="bg-card p-6 rounded-lg shadow-sm">
            <ProfileEditor />
          </TabsContent>
          
          <TabsContent value="experiences" className="bg-card p-6 rounded-lg shadow-sm">
            <ExperiencesEditor />
          </TabsContent>
          
          <TabsContent value="projects" className="bg-card p-6 rounded-lg shadow-sm">
            <ProjectsEditor />
          </TabsContent>
          
          <TabsContent value="skills" className="bg-card p-6 rounded-lg shadow-sm">
            <SkillsEditor />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}