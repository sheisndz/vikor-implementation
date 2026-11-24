import { Code2, Palette, Gamepad2, Briefcase, Users } from 'lucide-react';

export const PRESETS = [
  {
    id: 'kuesioner',
    name: 'Kuesioner 37 Mhs',
    icon: Users,
    desc: 'Rata-rata preferensi responden survei mahasiswa',
    weights: { C1: 4, C2: 5, C3: 5, C4: 5, C5: 4, C6: 4, C7: 4, C8: 5 },
    pastelBg: '#FA80B1',
    activeText: '#FFFFFF'
  },
  {
    id: 'coding',
    name: 'IT / Coding',
    icon: Code2,
    desc: 'Fokus RAM besar, prosesor kencang, dan SSD cepat',
    weights: { C1: 4, C2: 5, C3: 5, C4: 5, C5: 3, C6: 3, C7: 4, C8: 5 },
    pastelBg: '#FEC5E7',
    activeText: '#3A2334'
  },
  {
    id: 'creative',
    name: 'Desain Grafis',
    icon: Palette,
    desc: 'Fokus GPU dedicated, RAM lega, dan akurasi layar',
    weights: { C1: 3, C2: 5, C3: 5, C4: 4, C5: 5, C6: 3, C7: 4, C8: 4 },
    pastelBg: '#FDE2E4',
    activeText: '#3A2334'
  },
  {
    id: 'gaming',
    name: 'Gaming & 3D',
    icon: Gamepad2,
    desc: 'Performa GPU maksimal dan prosesor seri HX/HS',
    weights: { C1: 3, C2: 5, C3: 5, C4: 4, C5: 5, C6: 1, C7: 2, C8: 5 },
    pastelBg: '#FFF1E6',
    activeText: '#3A2334'
  },
  {
    id: 'office',
    name: 'Office & Harian',
    icon: Briefcase,
    desc: 'Prioritas harga terjangkau, ringan, dan baterai awet',
    weights: { C1: 5, C2: 3, C3: 3, C4: 3, C5: 1, C6: 5, C7: 5, C8: 4 },
    pastelBg: '#E4BDFE',
    activeText: '#3A2334'
  }
];
