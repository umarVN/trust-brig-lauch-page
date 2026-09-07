import { Benefits } from '@/components/landing/benefits';
import { FaqAccordion } from '@/components/landing/faq-accordion';
import { FeatureRows } from '@/components/landing/feature-rows';
import { GlobalNetwork } from '@/components/landing/global-network';
import { Hero } from '@/components/landing/hero';
import { HowEscrowWorks } from '@/components/landing/how-escrow-works';
import { IndustrySolutions } from '@/components/landing/industry-solutions';
import { SecurityInfrastructure } from '@/components/landing/security-infrastructure';
import { SiteFooter } from '@/components/landing/site-footer';
import { SiteHeader } from '@/components/landing/site-header';
import { BackToTop } from '@/components/shared/back-to-top';
import { ScrollProgress } from '@/components/shared/scroll-progress';
import { SmoothScroll } from '@/components/shared/smooth-scroll';

export default function LandingPage() {
  return (
    <div className="tb relative flex min-h-screen flex-col overflow-x-clip">
      <SmoothScroll />
      <ScrollProgress />
      <SiteHeader />

      {/*
       * Rebuilt to the reference's rhythm: statement, how it works, why it
       * matters, what it does, where it runs, proof, questions, ask. The old
       * abstract set pieces (node mesh, orbital state ring, pinned scrub) are
       * gone — they were the parts reading as machine-made.
       */}
      <main className="flex-1">
        <Hero />
        <HowEscrowWorks />
        <Benefits />
        <FeatureRows />
        <IndustrySolutions />
        <GlobalNetwork />
        <SecurityInfrastructure />
        <FaqAccordion />
      </main>

      <SiteFooter />
      <BackToTop />
    </div>
  );
}
