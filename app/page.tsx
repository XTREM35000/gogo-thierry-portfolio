import { Metadata } from 'next';
import Hero from '@/components/home/hero';
import FeaturedProjects from '@/components/home/featured-projects';
import SkillsShowcase from '@/components/home/skills-showcase';
import CallToAction from '@/components/home/call-to-action';
import { motion } from 'framer-motion';

export const metadata: Metadata = {
  title: 'Accueil | Portfolio Professionnel',
  description: 'Portfolio professionnel et générateur de CV dynamique',
};

export default async function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-background/80">
      <div className="container px-4 py-8 mx-auto space-y-24 md:py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Hero />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <SkillsShowcase />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <FeaturedProjects />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <CallToAction />
        </motion.div>
      </div>
    </div>
  );
}
