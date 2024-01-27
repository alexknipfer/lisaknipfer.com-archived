import { Home, CalendarDays } from 'lucide-react';

export const routeConfig = {
  home: {
    label: 'Home',
    template: '/',
    icon: Home,
  },
  timeline: {
    label: 'Timeline',
    template: '/timeline',
    icon: CalendarDays,
  },
};

export const menuRoutes = [routeConfig.home, routeConfig.timeline];
