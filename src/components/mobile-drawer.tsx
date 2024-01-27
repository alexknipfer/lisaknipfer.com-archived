import { AlignLeft } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Drawer, DrawerContent, DrawerTrigger } from '@/components/ui/drawer';
import { MenuContent } from '@/components/menu-content';
import { MenuItem } from '@/types/sanity';

interface Props {
  menuItems: Array<MenuItem>;
}

export function MobileDrawer({ menuItems }: Props) {
  return (
    <Drawer shouldScaleBackground>
      <DrawerTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="duration-400 group transition-colors hover:bg-zinc-950"
        >
          <AlignLeft size={20} className="group-hover:stroke-white" />
        </Button>
      </DrawerTrigger>
      <DrawerContent className="h-[50%] p-2 md:p-4">
        <MenuContent menuItems={menuItems} showHotkeys={false} />
      </DrawerContent>
    </Drawer>
  );
}
