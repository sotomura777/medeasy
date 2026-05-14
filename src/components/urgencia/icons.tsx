interface IconProps {
  size?: number;
  className?: string;
  style?: React.CSSProperties;
}

function IconBase({ size = 22, children, className, style }: IconProps & { children: React.ReactNode }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"
      className={className} style={style} aria-hidden="true">
      {children}
    </svg>
  );
}

export function IconCardio(p: IconProps) {
  return (
    <IconBase {...p}>
      <path d="M3 13.5h3.2l1.6-3.4 2.4 6.8 2-9 1.8 5.6h6.5" />
      <path d="M12 4.7c1.6-2 4.2-2.2 5.8-.6 1.7 1.7 1.7 4.5 0 6.2L12 16 6.2 10.3c-1.7-1.7-1.7-4.5 0-6.2 1.6-1.6 4.2-1.4 5.8.6Z" opacity=".25" />
    </IconBase>
  );
}

export function IconPneumo(p: IconProps) {
  return (
    <IconBase {...p}>
      <path d="M12 4v13" />
      <path d="M9.5 6c-.5 2.5-2 3.5-4 5-1.6 1.2-2 3.5-1.3 5.5.5 1.6 1.6 2.5 3 2.5 1.3 0 2.3-1.1 2.3-2.4V8" />
      <path d="M14.5 6c.5 2.5 2 3.5 4 5 1.6 1.2 2 3.5 1.3 5.5-.5 1.6-1.6 2.5-3 2.5-1.3 0-2.3-1.1-2.3-2.4V8" />
    </IconBase>
  );
}

export function IconNeuro(p: IconProps) {
  return (
    <IconBase {...p}>
      <path d="M9 4.5C7 4.5 5.5 6 5.5 8c0 .6.1 1.1.4 1.6C4.7 10.4 4 11.6 4 13c0 1.5.9 2.8 2.2 3.4 0 1.7 1.3 3.1 3 3.1 1 0 1.8-.4 2.3-1.1V4.5C11 4 10.1 4.5 9 4.5Z" />
      <path d="M15 4.5c2 0 3.5 1.5 3.5 3.5 0 .6-.1 1.1-.4 1.6 1.2.8 1.9 2 1.9 3.4 0 1.5-.9 2.8-2.2 3.4 0 1.7-1.3 3.1-3 3.1-1 0-1.8-.4-2.3-1.1V4.5c.5-.5 1.4 0 2.5 0Z" />
      <path d="M11.5 9h1" opacity=".5" />
      <path d="M11.5 13h1" opacity=".5" />
    </IconBase>
  );
}

export function IconGI(p: IconProps) {
  return (
    <IconBase {...p}>
      <path d="M9 4v2.5c-2.5.6-4 2.7-4 5.2 0 3.5 2.7 6.3 6 6.3h1c2.2 0 4-1.8 4-4 0-1.6-1-3-2.5-3.6" />
      <path d="M13.5 10.4c.7-.4 1.5-.6 2.5-.4 1.6.3 2.5 1.6 2.5 3" />
      <path d="M9 4h2.5" />
    </IconBase>
  );
}

export function IconEndo(p: IconProps) {
  return (
    <IconBase {...p}>
      <path d="M12 3.5c2.5 3 5 5.6 5 8.7 0 2.8-2.2 5-5 5s-5-2.2-5-5c0-3.1 2.5-5.7 5-8.7Z" />
      <path d="M9.5 12.5c0 1.5 1 2.5 2.5 2.5" opacity=".5" />
      <circle cx="18" cy="6" r="2" />
    </IconBase>
  );
}

export function IconInfecto(p: IconProps) {
  return (
    <IconBase {...p}>
      <circle cx="12" cy="12" r="5" />
      <path d="M12 4v2" /><path d="M12 18v2" />
      <path d="M4 12h2" /><path d="M18 12h2" />
      <path d="m6.3 6.3 1.4 1.4" /><path d="m16.3 16.3 1.4 1.4" />
      <path d="m6.3 17.7 1.4-1.4" /><path d="m16.3 7.7 1.4-1.4" />
      <circle cx="10.5" cy="10.5" r=".8" fill="currentColor" />
      <circle cx="13.5" cy="13" r=".8" fill="currentColor" />
    </IconBase>
  );
}

export function IconAlergo(p: IconProps) {
  return (
    <IconBase {...p}>
      <path d="M12 3 5 5.5v5c0 4 2.8 7.5 7 9 4.2-1.5 7-5 7-9v-5L12 3Z" />
      <path d="m9 12 2.2 2.2L15.5 10" />
    </IconBase>
  );
}

export function IconDerma(p: IconProps) {
  return (
    <IconBase {...p}>
      <path d="M3 8c2-1.5 4-1.5 6 0s4 1.5 6 0 4-1.5 6 0" />
      <path d="M3 13c2-1.5 4-1.5 6 0s4 1.5 6 0 4-1.5 6 0" />
      <path d="M3 18c2-1.5 4-1.5 6 0s4 1.5 6 0 4-1.5 6 0" />
    </IconBase>
  );
}

export function IconSearch(p: IconProps) {
  return (
    <IconBase {...p}>
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-3.5-3.5" />
    </IconBase>
  );
}

export function IconClose(p: IconProps) {
  return (
    <IconBase {...p}>
      <path d="M6 6 18 18" /><path d="M18 6 6 18" />
    </IconBase>
  );
}

export function IconBookmark({ filled = false, ...p }: IconProps & { filled?: boolean }) {
  return (
    <IconBase {...p}>
      <path d="M7 4h10v17l-5-3.2L7 21V4Z" fill={filled ? 'currentColor' : 'none'} />
    </IconBase>
  );
}

export function IconArrowLeft(p: IconProps) {
  return (
    <IconBase {...p}><path d="M15 6l-6 6 6 6" /></IconBase>
  );
}

export function IconChevronRight(p: IconProps) {
  return (
    <IconBase {...p}><path d="m9 6 6 6-6 6" /></IconBase>
  );
}

export function IconAlert(p: IconProps) {
  return (
    <IconBase {...p}>
      <path d="M12 3 2.5 19.5h19L12 3Z" />
      <path d="M12 10v4.5" />
      <circle cx="12" cy="17.2" r=".9" fill="currentColor" />
    </IconBase>
  );
}

export function IconClock(p: IconProps) {
  return (
    <IconBase {...p}>
      <circle cx="12" cy="12" r="8" />
      <path d="M12 8v4.5l3 1.5" />
    </IconBase>
  );
}

export function IconCheck(p: IconProps) {
  return (
    <IconBase {...p}><path d="m5 12 4.5 4.5L19 7" /></IconBase>
  );
}

export function IconOffline(p: IconProps) {
  return (
    <IconBase {...p}>
      <circle cx="12" cy="12" r="3" fill="currentColor" stroke="none" />
      <path d="M7.5 7.5a6.4 6.4 0 0 1 9 0" />
      <path d="M4.5 4.5a10.6 10.6 0 0 1 15 0" />
    </IconBase>
  );
}

export function IconSun(p: IconProps) {
  return (
    <IconBase {...p}>
      <circle cx="12" cy="12" r="4" />
      <path d="M12 3v2" /><path d="M12 19v2" />
      <path d="M3 12h2" /><path d="M19 12h2" />
      <path d="m5.6 5.6 1.4 1.4" /><path d="m17 17 1.4 1.4" />
      <path d="m5.6 18.4 1.4-1.4" /><path d="m17 7 1.4-1.4" />
    </IconBase>
  );
}

export function IconMoon(p: IconProps) {
  return (
    <IconBase {...p}><path d="M20 13.5A8 8 0 0 1 10.5 4a8 8 0 1 0 9.5 9.5Z" /></IconBase>
  );
}

export type SpecialityId = 'cardio' | 'pneumo' | 'neuro' | 'gi' | 'endo' | 'infecto' | 'alergo' | 'derma';

export const SpecialityIcon: Record<SpecialityId, (p: IconProps) => React.ReactElement> = {
  cardio: IconCardio,
  pneumo: IconPneumo,
  neuro: IconNeuro,
  gi: IconGI,
  endo: IconEndo,
  infecto: IconInfecto,
  alergo: IconAlergo,
  derma: IconDerma,
};

export interface Speciality {
  id: SpecialityId;
  label: string;
  short: string;
  color: string;
}

export const SPECIALITIES: Speciality[] = [
  { id: 'cardio',  label: 'Cardiologia',   short: 'Cardio',  color: '#C8401A' },
  { id: 'pneumo',  label: 'Pneumologia',   short: 'Pneumo',  color: '#1A4FA0' },
  { id: 'neuro',   label: 'Neurologia',    short: 'Neuro',   color: '#3B1A6B' },
  { id: 'gi',      label: 'Gastro',        short: 'GI',      color: '#7A4E00' },
  { id: 'endo',    label: 'Endócrino',     short: 'Endo',    color: '#0E6B5A' },
  { id: 'infecto', label: 'Infectologia',  short: 'Infecto', color: '#8C1A1A' },
  { id: 'alergo',  label: 'Alergo/Imuno',  short: 'Alergo',  color: '#5C3D8C' },
  { id: 'derma',   label: 'Derma / ME',    short: 'Derma',   color: '#B85C00' },
];

export const SPEC_BY_ID = Object.fromEntries(SPECIALITIES.map(s => [s.id, s])) as Record<SpecialityId, Speciality>;
