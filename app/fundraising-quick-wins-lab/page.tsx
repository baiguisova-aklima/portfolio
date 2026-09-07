import type { Metadata } from 'next';
import CouponExperience from './CouponExperience';

export const metadata: Metadata = {
  title: 'ALEKSEI: LEVEL 38',
  description: 'A tiny pixel adventure based on a true story. Mostly.',
};

export default function FundraisingQuickWinsLabPage() {
  return <CouponExperience />;
}
