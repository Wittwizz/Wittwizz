import * as React from 'react';
import { Slot as RadixSlot } from '@radix-ui/react-slot';

type Props = React.ComponentPropsWithoutRef<typeof RadixSlot> & { className?: string };

export function Slot({ className, ...props }: Props) {
  return <RadixSlot className={className} {...props} />;
}
