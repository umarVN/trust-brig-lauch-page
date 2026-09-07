import type { ComponentType, SVGProps } from 'react';
import {
  FacebookIcon,
  InstagramIcon,
  LinkedinIcon,
  TwitterIcon,
} from '@/components/icons/social-icons';

/** Origin of the main TrustBrig app, so legal links leave this landing site correctly. */
const APP_URL = process.env.NEXT_PUBLIC_APP_URL ?? '';

const app = (path: string) => `${APP_URL}${path}`;

export interface SiteFooterLinkItem {
  key: string;
  label: string;
  href: string;
}

export interface SiteFooterSection {
  key: string;
  title: string;
  links: SiteFooterLinkItem[];
}

export interface SiteFooterSocialItem {
  key: string;
  label: string;
  href: string;
  icon: ComponentType<SVGProps<SVGSVGElement>>;
}

export const SITE_FOOTER_SECTIONS: SiteFooterSection[] = [
  {
    key: 'explore',
    title: 'Explore',
    links: [
      { key: 'benefits', label: 'Benefits', href: '#benefits' },
      { key: 'features', label: 'Features', href: '#features' },
      { key: 'flow', label: 'How it works', href: '#flow' },
      { key: 'industries', label: 'Industries', href: '#industries' },
      { key: 'network', label: 'Network', href: '#network' },
      { key: 'security', label: 'Security', href: '#security' },
      { key: 'faq', label: 'FAQ', href: '#faq' },
    ],
  },
  // {
  //   key: 'company',
  //   title: 'Company',
  //   links: [
  //     { key: 'about-us', label: 'About Us', href: app('/about') },
  //     { key: 'contact', label: 'Contact', href: app('/contact') },
  //     { key: 'cookie-policy', label: 'Cookies Policy', href: app('/cookie-policy') },
  //     { key: 'privacy-policy', label: 'Privacy Policy', href: app('/privacy') },
  //     { key: 'terms-of-service', label: 'Terms Of Services', href: app('/terms') },
  //   ],
  // },
];

export const SITE_FOOTER_SOCIAL_LINKS: SiteFooterSocialItem[] = [
  { key: 'facebook', label: 'Facebook', href: 'https://facebook.com', icon: FacebookIcon },
  { key: 'twitter', label: 'Twitter', href: 'https://twitter.com', icon: TwitterIcon },
  { key: 'instagram', label: 'Instagram', href: 'https://instagram.com', icon: InstagramIcon },
  { key: 'linkedin', label: 'LinkedIn', href: 'https://linkedin.com', icon: LinkedinIcon },
];
