import { PropsWithChildren } from 'react';

export function ScrollView({ children }: PropsWithChildren) {
  return (
    <div className="h-full min-h-dvh max-h-dvh overflow-y-auto">{children}</div>
  );
}
