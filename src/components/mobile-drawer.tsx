import { AlignLeft } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Drawer, DrawerContent, DrawerTrigger } from '@/components/ui/drawer';
import { MenuContent } from '@/components/menu-content';
import { sanity } from '@/lib/sanity.client';

export async function MobileDrawer() {
  const settings = await sanity.getSettings();

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
      <DrawerContent className="h-[70%]">
        <div className="overflow-y-auto p-2 md:p-4">
          <MenuContent showHotkeys={false} settings={settings} />
        </div>
      </DrawerContent>
    </Drawer>
  );
}
