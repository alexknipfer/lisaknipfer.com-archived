import { PropsWithChildren } from 'react';

export function PageWrapper({ children }: PropsWithChildren) {
  return <div className="w-full px-8 pt-8">{children}</div>;
}
