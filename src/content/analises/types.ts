export type Severity = 'normal' | 'mild' | 'moderate' | 'severe' | 'critical';

export interface InterpretResult {
  level: Severity;
  verdict: string;
  detail?: string;
  think?: string;
  doNow?: string;
  danger?: string;
}

export interface ParamExtra {
  id: string;
  label: string;
  type: 'select' | 'number';
  options?: [string, string][];
  step?: string;
  default?: number;
}

export interface ClinicalContext {
  age: number | null;
  sex: string;
  context: string;
  extras: Record<string, string>;
}

export interface LabParam {
  id: string;
  name: string;
  keywords: string;
  unit: string;
  ref: (ctx: ClinicalContext) => string;
  extras?: ParamExtra[];
  interpret: (value: number, ctx: ClinicalContext) => InterpretResult;
}
