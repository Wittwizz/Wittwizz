import * as React from 'react';
import clsx from 'clsx';

type Props = React.HTMLAttributes<HTMLDivElement> & { as?: keyof JSX.IntrinsicElements };
export const Card: React.FC<Props> = ({ as:Comp='div', className, children, ...rest }) => (
  <Comp className={clsx('rounded-2xl border border-gray-100 bg-white/80 backdrop-blur shadow-card transition-transform duration-200 hover:-translate-y-0.5 hover:shadow-lg dark:bg-white/10 dark:border-white/10', className)} {...rest}>
    {children}
  </Comp>
);
