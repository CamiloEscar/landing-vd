import { TypeIcon as type, LucideIcon } from 'lucide-react'

export interface Solution {
  id: string;
  title: string;
  steps: string[];
}

export interface Problem {
  id: string
  label: string
  description: string
  solutions: Solution[]
}

export interface ComplaintType {
  id: string
  name: string
  icon: LucideIcon
  problems: Problem[]
}

