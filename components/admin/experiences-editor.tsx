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
import { Experience } from '@/lib/types';
import { Plus, Edit, Trash, Image as ImageIcon } from 'lucide-react';
import { getExperiences, createExperience, updateExperience, deleteExperience } from '@/lib/supabase/mutations';
import Image from 'next/image';

const formSchema = z.object({
  id: z.string().optional(),
  title: z.string().min(2, { message: 'Le titre doit contenir au moins 2 caractères' }),
  company: z.string().min(2, { message: 'Le nom de l\'entreprise doit contenir au moins 2 caractères' }),
  period: z.string().min(2, { message: 'La période doit être spécifiée' }),
  description: z.string().min(10, { message: 'La description doit contenir au moins 10 caractères' }),
  imageUrl: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

export default function ExperiencesEditor() {
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const { toast } = useToast();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      company: '',
      period: '',
      description: '',
      imageUrl: '',
    },
  });

  useEffect(() => {
    loadExperiences();
  }, []);

  async function loadExperiences() {
    try {
      const data = await getExperiences();
      setExperiences(data);
    } catch (error) {
      toast('Erreur', 'Impossible de charger les expériences');
    } finally {
      setIsLoading(false);
    }
  }

  function handleEdit(experience: Experience) {
    form.reset({
      id: experience.id,
      title: experience.title,
      company: experience.company,
      period: experience.period,
      description: experience.description,
      imageUrl: experience.imageUrl,
    });
    setIsEditing(true);
  }

  function handleNewExperience() {
    form.reset({
      id: undefined,
      title: '',
      company: '',
      period: '',
      description: '',
      imageUrl: '',
    });
    setIsEditing(true);
  }

  async function handleDelete(id: string) {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cette expérience ?')) {
      try {
        await deleteExperience(id);
        setExperiences(experiences.filter(exp => exp.id !== id));
        toast('Expérience supprimée', 'L\'expérience a été supprimée avec succès');
      } catch (error) {
        toast('Erreur', 'Impossible de supprimer l\'expérience');
      }
    }
  }

  async function onSubmit(values: FormValues) {
    setIsSaving(true);

    try {
      if (values.id) {
        // Update existing experience
        const updated = await updateExperience(values.id, values);
        setExperiences(experiences.map(exp => (exp.id === values.id ? updated : exp)));
        toast('Expérience mise à jour', 'Les modifications ont été enregistrées avec succès');
      } else {
        // Create new experience
        const created = await createExperience(values);
        setExperiences([...experiences, created]);
        toast('Expérience ajoutée', 'La nouvelle expérience a été ajoutée avec succès');
      }

      setIsEditing(false);
      form.reset();
    } catch (error) {
      toast('Erreur', 'Une erreur est survenue lors de la sauvegarde');
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
        <h2 className="text-xl font-semibold">Expériences Professionnelles</h2>
        <Button onClick={handleNewExperience}>
          <Plus className="mr-2 h-4 w-4" />
          Ajouter une expérience
        </Button>
      </div>

      {isEditing ? (
        <Card>
          <CardHeader>
            <CardTitle>{form.getValues().id ? 'Modifier' : 'Ajouter'} une expérience</CardTitle>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Titre du poste</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="company"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Entreprise</FormLabel>
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
                  name="period"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Période</FormLabel>
                      <FormControl>
                        <Input placeholder="ex: Janvier 2020 - Présent" {...field} />
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
                        <Textarea rows={5} {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="imageUrl"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Image</FormLabel>
                      <FormControl>
                        <div className="flex items-center gap-4">
                          <Input {...field} placeholder="URL de l'image" />
                          {field.value && (
                            <div className="relative w-20 h-20">
                              <Image
                                src={field.value}
                                alt="Preview"
                                fill
                                className="object-cover rounded-md"
                              />
                            </div>
                          )}
                        </div>
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
          {experiences.length === 0 ? (
            <p className="text-center text-muted-foreground py-8">Aucune expérience professionnelle à afficher</p>
          ) : (
            experiences.map((experience) => (
              <Card key={experience.id}>
                <CardContent className="pt-6">
                  <div className="flex justify-between">
                    <div className="flex gap-4">
                      {experience.imageUrl && (
                        <div className="relative w-20 h-20 flex-shrink-0">
                          <Image
                            src={experience.imageUrl}
                            alt={experience.title}
                            fill
                            className="object-cover rounded-md"
                          />
                        </div>
                      )}
                      <div>
                        <h3 className="font-semibold text-lg">{experience.title}</h3>
                        <p className="text-muted-foreground">{experience.company} | {experience.period}</p>
                        <p className="mt-2">{experience.description}</p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="ghost" size="icon" onClick={() => handleEdit(experience)}>
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" onClick={() => handleDelete(experience.id)}>
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
