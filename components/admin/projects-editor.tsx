'use client';

import { useState, useEffect } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/components/ui/use-toast';
import { Project } from '@/lib/types';
import { Plus, Edit, Trash, X } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { getProjects, createProject, updateProject, deleteProject } from '@/lib/supabase/mutations';

const formSchema = z.object({
  id: z.string().optional(),
  title: z.string().min(2, { message: 'Le titre doit contenir au moins 2 caractères' }),
  description: z.string().min(10, { message: 'La description doit contenir au moins 10 caractères' }),
  tags: z.array(z.string()).min(1, { message: 'Ajoutez au moins un tag' }),
  screenshot_url: z.string().url({ message: 'URL de capture d\'écran invalide' }).optional().or(z.literal('')),
  github_url: z.string().url({ message: 'URL GitHub invalide' }).optional().or(z.literal('')),
  live_url: z.string().url({ message: 'URL du site live invalide' }).optional().or(z.literal('')),
});

type FormValues = z.infer<typeof formSchema>;

export default function ProjectsEditor() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentTag, setCurrentTag] = useState('');
  const { toast } = useToast();
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      description: '',
      tags: [],
      screenshot_url: '',
      github_url: '',
      live_url: '',
    },
  });

  const { watch, setValue } = form;
  const tags = watch('tags');

  useEffect(() => {
    loadProjects();
  }, []);

  async function loadProjects() {
    try {
      const data = await getProjects();
      setProjects(data);
    } catch (error) {
      toast({
        title: 'Erreur',
        description: 'Impossible de charger les projets',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  }

  function handleEdit(project: Project) {
    form.reset({
      id: project.id,
      title: project.title,
      description: project.description,
      tags: project.tags || [],
      screenshot_url: project.screenshot_url || '',
      github_url: project.github_url || '',
      live_url: project.live_url || '',
    });
    setIsEditing(true);
  }

  function handleNewProject() {
    form.reset({
      id: undefined,
      title: '',
      description: '',
      tags: [],
      screenshot_url: '',
      github_url: '',
      live_url: '',
    });
    setIsEditing(true);
  }

  async function handleDelete(id: string) {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer ce projet ?')) {
      try {
        await deleteProject(id);
        setProjects(projects.filter(project => project.id !== id));
        toast({
          title: 'Projet supprimé',
          description: 'Le projet a été supprimé avec succès',
        });
      } catch (error) {
        toast({
          title: 'Erreur',
          description: 'Impossible de supprimer le projet',
          variant: 'destructive',
        });
      }
    }
  }

  function addTag() {
    if (currentTag && !tags.includes(currentTag)) {
      setValue('tags', [...tags, currentTag]);
      setCurrentTag('');
    }
  }

  function removeTag(tag: string) {
    setValue('tags', tags.filter(t => t !== tag));
  }

  function handleTagKeyDown(e: React.KeyboardEvent) {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      addTag();
    }
  }

  async function onSubmit(values: FormValues) {
    setIsSaving(true);
    
    try {
      // Clean up empty string URLs
      const cleanedValues = {
        ...values,
        screenshot_url: values.screenshot_url || undefined,
        github_url: values.github_url || undefined,
        live_url: values.live_url || undefined,
      };
      
      if (values.id) {
        // Update existing project
        const updated = await updateProject(values.id, cleanedValues);
        setProjects(projects.map(p => (p.id === values.id ? updated : p)));
        toast({
          title: 'Projet mis à jour',
          description: 'Les modifications ont été enregistrées avec succès',
        });
      } else {
        // Create new project
        const created = await createProject(cleanedValues);
        setProjects([...projects, created]);
        toast({
          title: 'Projet ajouté',
          description: 'Le nouveau projet a été ajouté avec succès',
        });
      }
      
      setIsEditing(false);
      form.reset();
    } catch (error) {
      toast({
        title: 'Erreur',
        description: 'Une erreur est survenue lors de la sauvegarde',
        variant: 'destructive',
      });
    } finally {
      setIsSaving(false);
    }
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center p-8">
        <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Projets</h2>
        <Button onClick={handleNewProject}>
          <Plus className="mr-2 h-4 w-4" />
          Ajouter un projet
        </Button>
      </div>
      
      {isEditing ? (
        <Card>
          <CardHeader>
            <CardTitle>{form.getValues().id ? 'Modifier' : 'Ajouter'} un projet</CardTitle>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Titre du projet</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea rows={3} {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="tags"
                  render={() => (
                    <FormItem>
                      <FormLabel>Technologies</FormLabel>
                      <div className="flex gap-2">
                        <Input
                          value={currentTag}
                          onChange={(e) => setCurrentTag(e.target.value)}
                          onKeyDown={handleTagKeyDown}
                          placeholder="Ajouter un tag (ex: React, TypeScript)"
                        />
                        <Button type="button" onClick={addTag}>
                          Ajouter
                        </Button>
                      </div>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {tags.map((tag) => (
                          <Badge key={tag} className="flex items-center gap-1">
                            {tag}
                            <button type="button" onClick={() => removeTag(tag)} className="focus:outline-none">
                              <X className="h-3 w-3" />
                            </button>
                          </Badge>
                        ))}
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="screenshot_url"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>URL de la capture d'écran</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="github_url"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>URL GitHub</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <FormField
                  control={form.control}
                  name="live_url"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>URL du site live</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <div className="flex justify-end gap-2">
                  <Button type="button" variant="outline" onClick={() => setIsEditing(false)}>
                    Annuler
                  </Button>
                  <Button type="submit" disabled={isSaving}>
                    {isSaving ? 'Enregistrement...' : 'Enregistrer'}
                  </Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {projects.length === 0 ? (
            <p className="text-center text-muted-foreground py-8">Aucun projet à afficher</p>
          ) : (
            projects.map((project) => (
              <Card key={project.id}>
                <CardContent className="pt-6">
                  <div className="flex justify-between">
                    <div>
                      <h3 className="font-semibold text-lg">{project.title}</h3>
                      <p className="mt-1">{project.description}</p>
                      <div className="flex flex-wrap gap-1.5 mt-2">
                        {project.tags && project.tags.map((tag, index) => (
                          <Badge key={index} variant="outline">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="ghost" size="icon" onClick={() => handleEdit(project)}>
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" onClick={() => handleDelete(project.id)}>
                        <Trash className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      )}
    </div>
  );
}