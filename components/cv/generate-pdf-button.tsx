'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { FileDown } from 'lucide-react';

export default function GeneratePdfButton() {
  return (
    <Button asChild>
      <Link href="/generate-pdf">
        <FileDown className="mr-2 h-4 w-4" />
        Générer en PDF
      </Link>
    </Button>
  );
}