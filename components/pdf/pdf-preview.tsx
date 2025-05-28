'use client';

import { useState } from 'react';
import { Profile, Experience, Skill } from '@/lib/types';
import { Badge } from '@/components/ui/badge';
import { Mail, Phone, Github } from 'lucide-react';

interface PdfPreviewProps {
  profile: Profile;
  experiences: Experience[];
  skills: Skill[];
}

export default function PdfPreview({ profile, experiences, skills }: PdfPreviewProps) {
  // In a real implementation, this would use a PDF rendering library like react-pdf
  // For now, we'll just show a preview that looks like a PDF

  return (
    <div className="bg-white text-black border rounded-md p-8 max-w-[210mm] mx-auto shadow-sm">
      <div className="flex flex-col gap-6">
        {/* Header Section */}
        <header className="border-b pb-4">
          <h1 className="text-2xl font-bold">{profile.name}</h1>
          <p className="text-xl">{profile.title}</p>
          
          <div className="flex flex-wrap gap-4 mt-2 text-sm">
            {profile.email && (
              <div className="flex items-center gap-1">
                <Mail className="h-4 w-4" />
                <span>{profile.email}</span>
              </div>
            )}
            
            {profile.phone && (
              <div className="flex items-center gap-1">
                <Phone className="h-4 w-4" />
                <span>{profile.phone}</span>
              </div>
            )}
            
            {profile.github && (
              <div className="flex items-center gap-1">
                <Github className="h-4 w-4" />
                <span>{profile.github}</span>
              </div>
            )}
          </div>
        </header>
        
        {/* Main Content */}
        <div className="grid grid-cols-3 gap-6">
          {/* Left Column - Skills */}
          <div className="space-y-4">
            <h2 className="text-lg font-semibold border-b pb-1">Compétences</h2>
            
            <div className="space-y-4">
              {skills.map((skill) => (
                <div key={skill.id}>
                  <h3 className="font-medium">{skill.category}</h3>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {skill.items.map((item, i) => (
                      <Badge key={i} variant="outline" className="bg-gray-100">
                        {item}
                      </Badge>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Right Column - Experiences */}
          <div className="col-span-2">
            <h2 className="text-lg font-semibold border-b pb-1 mb-4">Expériences Professionnelles</h2>
            
            <div className="space-y-4">
              {experiences.map((experience) => (
                <div key={experience.id}>
                  <div className="flex justify-between items-start">
                    <h3 className="font-medium">{experience.title}</h3>
                    <span className="text-sm">{experience.period}</span>
                  </div>
                  <p className="text-gray-600">{experience.company}</p>
                  <p className="text-sm mt-1">{experience.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}