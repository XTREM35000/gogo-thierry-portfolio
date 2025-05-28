'use client';

import { useState, useEffect } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/components/ui/use-toast';
import { Skill } from '@/lib/types';
import { Plus, Edit, Trash, X } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { getSkills, createSkill, updateSkill, deleteSkill } from '@/lib/supabase/mutations';

const formSchema = z.object({
  id: z.string().optional(),
  category: z.string().min(2, { message: 'La catégorie doit contenir au moins 2 caractères' }),
  items: z.array(z.string()).min(1, { message: 'Ajoutez au moins une compétence' }),
});

type FormValues = z.infer<typeof formSchema>;

export default function SkillsEditor() {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentItem, setCurrentItem] = useState('');
  const { toast } = useToast();
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      category: '',
      items: [],
    },
  });

  const { watch, setValue } = form;
  const items = watch('items');

  useEffect(() => {
    loadSkills();
  }, []);

  async function loadSkills() {
    try {
      const data = await getSkills();
      setSkills(data);
    } catch (error) {
      toast({
        title: 'Erreur',
        description: 'Impossible de charger les compétences',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  }

  function handleEdit(skill: Skill) {
    form.reset({
      id: skill.id,
      category: skill.category,
      items: skill.items,
    });
    setIsEditing(true);
  }

  function handleNewSkill() {
    form.reset({
      id: undefined,
      category: '',
      items: [],
    });
    setIsEditing(true);
  }

  async function handleDelete(id: string) {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cette catégorie de compétences ?')) {
      try {
        await deleteSkill(id);
        setSkills(skills.filter(skill => skill.id !== id));
        toast({
          title: 'Compétence supprimée',
          description: 'La catégorie de compétences a été supprimée avec succès',
        });
      } catch (error) {
        toast({
          title: 'Erreur',
          description: 'Impossible de supprimer la catégorie',
          variant: 'destructive',
        });
      }
    }
  }

  function addItem() {
    if (currentItem && !items.includes(currentItem)) {
      setValue('items', [...items, currentItem]);
      setCurrentItem('');
    }
  }

  function removeItem(item: string) {
    setValue('items', items.filter(i => i !== item));
  }

  function handleItemKeyDown(e: React.KeyboardEvent) {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      addItem();
    }
  }

  async function onSubmit(values: FormValues) {
    setIsSaving(true);
    
    try {
      if (values.id) {
        // Update existing skill
        const updated = await updateSkill(values.id, values);
        setSkills(skills.map(s => (s.id === values.id ? updated : s)));
        toast({
          title: 'Compétences mises à jour',
          description: 'Les modifications ont été enregistrées avec succès',
        });
      } else {
        // Create new skill
        const created = await createSkill(values);
        setSkills([...skills, created]);
        toast({
          title: 'Compétences ajoutées',
          description: 'La nouvelle catégorie a été ajoutée avec succès',
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
        <h2 className="text-xl font-semibold">Compétences</h2>
        <Button onClick={handleNewSkill}>
          <Plus className="mr-2 h-4 w-4" />
          Ajouter une catégorie
        </Button>
      </div>
      
      {isEditing ? (
        <Card>
          <CardHeader>
            <CardTitle>{form.getValues().id ? 'Modifier' : 'Ajouter'} une catégorie</CardTitle>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nom de la catégorie</FormLabel>
                      <FormControl>
                        <Input placeholder="ex: Langages de programmation" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="items"
                  render={() => (
                    <FormItem>
                      <FormLabel>Compétences</FormLabel>
                      <div className="flex gap-2">
                        <Input
                          value={currentItem}
                          onChange={(e) => setCurrentItem(e.target.value)}
                          onKeyDown={handleItemKeyDown}
                          placeholder="Ajouter une compétence (ex: JavaScript, HTML)"
                        />
                        <Button type="button" onClick={addItem}>
                          Ajouter
                        </Button>
                      </div>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {items.map((item) => (
                          <Badge key={item} className="flex items-center gap-1">
                            {item}
                            <button type="button" onClick={() => removeItem(item)} className="focus:outline-none">
                              <X className="h-3 w-3" />
                            </button>
                          </Badge>
                        ))}
                      </div>
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
          {skills.length === 0 ? (
            <p className="text-center text-muted-foreground py-8">Aucune catégorie de compétences à afficher</p>
          ) : (
            skills.map((skill) => (
              <Card key={skill.id}>
                <CardContent className="pt-6">
                  <div className="flex justify-between">
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg">{skill.category}</h3>
                      <div className="flex flex-wrap gap-1.5 mt-2">
                        {skill.items.map((item, index) => (
                          <Badge key={index} variant="secondary">
                            {item}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div className="flex gap-2 shrink-0">
                      <Button variant="ghost" size="icon" onClick={() => handleEdit(skill)}>
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" onClick={() => handleDelete(skill.id)}>
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