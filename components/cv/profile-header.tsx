import Image from 'next/image';
import { Mail, Phone, Github } from 'lucide-react';
import { Profile } from '@/lib/types';

interface ProfileHeaderProps {
  profile: Profile;
}

export default function ProfileHeader({ profile }: ProfileHeaderProps) {
  return (
    <div className="flex flex-col md:flex-row gap-6 items-center md:items-start">
      {profile.photo_url && (
        <div className="relative w-32 h-32 rounded-full overflow-hidden border-2 border-primary/20 flex-shrink-0">
          <Image
            src={profile.photo_url}
            alt={profile.name}
            fill
            className="object-cover"
          />
        </div>
      )}
      
      <div className="flex flex-col gap-2 text-center md:text-left">
        <h1 className="text-2xl font-bold">{profile.name}</h1>
        <p className="text-xl text-muted-foreground">{profile.title}</p>
        
        <div className="flex flex-col md:flex-row gap-3 mt-2 items-center md:items-start">
          {profile.email && (
            <div className="flex items-center gap-1">
              <Mail className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm">{profile.email}</span>
            </div>
          )}
          
          {profile.phone && (
            <div className="flex items-center gap-1">
              <Phone className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm">{profile.phone}</span>
            </div>
          )}
          
          {profile.github && (
            <div className="flex items-center gap-1">
              <Github className="h-4 w-4 text-muted-foreground" />
              <a 
                href={`https://github.com/${profile.github}`} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-sm hover:text-primary transition-colors"
              >
                {profile.github}
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}