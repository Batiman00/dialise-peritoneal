import { LucideIcon } from 'lucide-react';
import { ReactNode } from 'react';

export interface SidebarItems {
  links: Array<{
    label: string;
    href: string;
    icon?: LucideIcon;
  }>;
  extras?: ReactNode;
}

export interface DPFormsFields {
  type: string;
  name: string;
  label: string;
  options?: Array<{
    value: string;
    label: string;
  }>;
  placeholder?: string;
  inputType?: string;
}

export interface Prescription {
  id: string;
  createdAt: string;
  updatedAt: string;
  TotalVolumeLower: number;
  TotalVolumeUpper: number;
  CycleCountLower: number;
  CycleCountUpper: number;
  TherapyDurationLower: number;
  TherapyDurationUpper: number;
  SolutionCalciumLower: number;
  SolutionCalciumUpper: number;
  SolutionPotassiumLower: number;
  SolutionPotassiumUpper: number;
  SolutionGlucoseLower: number;
  SolutionGlucoseUpper: number;
  SolutionInsulinLower: number;
  SolutionInsulinUpper: number;
  ModelVersion: string;
  PacientId: string;
  userId: string;
}

declare module "next-auth" {
  interface Session {
    user: {
      id: string; // Add id property
      email: string;
      name?: string | null;
      image?: string | null;
    };
  }
}