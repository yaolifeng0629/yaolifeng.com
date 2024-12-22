import { cn } from '@/utils/utils';

interface WrapperProps extends React.HTMLAttributes<HTMLDivElement>, React.PropsWithChildren {}

export const Wrapper = ({ className, children, ...props }: WrapperProps) => {
    return (
        <div {...props} className={cn('container mx-auto px-4 md:px-6', className)}>
            {children}
        </div>
    );
};
