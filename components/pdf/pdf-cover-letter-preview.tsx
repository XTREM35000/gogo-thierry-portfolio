'use client';

import { Profile } from '@/lib/types';

interface PdfCoverLetterPreviewProps {
  profile: Profile;
  targetCompany: string;
  position: string;
  coverLetter: string;
}

export default function PdfCoverLetterPreview({ 
  profile, 
  targetCompany, 
  position, 
  coverLetter 
}: PdfCoverLetterPreviewProps) {
  // Format the current date
  const now = new Date();
  const formattedDate = now.toLocaleDateString('fr-FR', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });

  return (
    <div className="bg-white text-black border rounded-md p-8 max-w-[210mm] mx-auto shadow-sm">
      <div className="flex flex-col gap-6">
        {/* Sender Information */}
        <div className="flex flex-col mb-8">
          <p className="font-bold">{profile.name}</p>
          {profile.email && <p>{profile.email}</p>}
          {profile.phone && <p>{profile.phone}</p>}
        </div>
        
        {/* Date */}
        <div className="text-right">
          <p>{formattedDate}</p>
        </div>
        
        {/* Recipient */}
        <div className="mb-6">
          <p className="font-bold">À l'attention du Responsable des Ressources Humaines</p>
          <p>{targetCompany}</p>
        </div>
        
        {/* Subject */}
        <div className="mb-6">
          <p className="font-bold">Objet : Candidature au poste de {position}</p>
        </div>
        
        {/* Greeting */}
        <p>Madame, Monsieur,</p>
        
        {/* Body of the cover letter */}
        <div className="space-y-4 leading-relaxed">
          {coverLetter.split('\n').map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>
        
        {/* Closing */}
        <div className="mt-6">
          <p>Je vous prie d'agréer, Madame, Monsieur, l'expression de mes salutations distinguées.</p>
        </div>
        
        {/* Signature */}
        <div className="mt-4">
          <p className="font-bold">{profile.name}</p>
        </div>
      </div>
    </div>
  );
}