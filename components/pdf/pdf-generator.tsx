'use client';

import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Form, FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage } from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Profile, Experience, Skill, Project } from '@/lib/types';
import PdfPreview from '@/components/pdf/pdf-preview';
import PdfCoverLetterPreview from '@/components/pdf/pdf-cover-letter-preview';
import { FileDown } from 'lucide-react';

interface PdfGeneratorProps {
  profile: Profile;
  experiences: Experience[];
  skills: Skill[];
  projects: Project[];
}

const formSchema = z.object({
  targetCompany: z.string().min(2, { message: 'Veuillez indiquer le nom de l\'entreprise' }),
  position: z.string().min(2, { message: 'Veuillez indiquer le poste' }),
  coverLetter: z.string().min(50, { message: 'La lettre de motivation doit contenir au moins 50 caractères' }),
});

export default function PdfGenerator({ profile, experiences, skills, projects }: PdfGeneratorProps) {
  const [activeTab, setActiveTab] = useState('cv');
  const [pdfReady, setPdfReady] = useState(false);
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      targetCompany: '',
      position: '',
      coverLetter: '',
    },
  });

  const { watch } = form;
  const formValues = watch();

  const generatePdf = async () => {
    setPdfReady(true);
    // In a real implementation, this would trigger the PDF generation
  };

  return (
    <div className="space-y-6">
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-6">
          <TabsTrigger value="cv">CV</TabsTrigger>
          <TabsTrigger value="cover">Lettre de motivation</TabsTrigger>
        </TabsList>
        
        <TabsContent value="cv" className="space-y-6">
          <Card className="p-6">
            <PdfPreview 
              profile={profile} 
              experiences={experiences} 
              skills={skills} 
            />
          </Card>
          
          <div className="flex justify-end">
            <Button onClick={generatePdf}>
              <FileDown className="mr-2 h-4 w-4" />
              Télécharger le CV
            </Button>
          </div>
        </TabsContent>
        
        <TabsContent value="cover" className="space-y-6">
          <Form {...form}>
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="targetCompany"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Entreprise cible</FormLabel>
                      <FormControl>
                        <Input placeholder="Nom de l'entreprise" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="position"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Poste visé</FormLabel>
                      <FormControl>
                        <Input placeholder="Développeur Full Stack" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              <FormField
                control={form.control}
                name="coverLetter"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Lettre de motivation</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Votre lettre de motivation personnalisée..." 
                        className="min-h-40 resize-none"
                        {...field} 
                      />
                    </FormControl>
                    <FormDescription>
                      Personnalisez votre lettre de motivation pour l'entreprise et le poste visés.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </form>
          </Form>
          
          <Card className="p-6">
            <PdfCoverLetterPreview 
              profile={profile}
              targetCompany={formValues.targetCompany || 'Entreprise'}
              position={formValues.position || 'Poste'}
              coverLetter={formValues.coverLetter || 'Votre lettre de motivation s\'affichera ici.'}
            />
          </Card>
          
          <div className="flex justify-end">
            <Button onClick={generatePdf} disabled={!form.formState.isValid}>
              <FileDown className="mr-2 h-4 w-4" />
              Télécharger la lettre
            </Button>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}