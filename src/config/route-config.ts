import { Home, CalendarDays } from 'lucide-react';

export const RouteConfig = {
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

export const SidebarRoutes = [RouteConfig.home, RouteConfig.timeline];
