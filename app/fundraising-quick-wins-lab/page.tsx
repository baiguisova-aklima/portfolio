import type { Metadata } from 'next';
import CouponExperience from './CouponExperience';

export const metadata: Metadata = {
  title: 'Лёша, с годовщиной! ❤️',
  description: 'Двенадцать маленьких поводов для наших новых приключений.',
};

export default function FundraisingQuickWinsLabPage() {
  return <CouponExperience />;
}
