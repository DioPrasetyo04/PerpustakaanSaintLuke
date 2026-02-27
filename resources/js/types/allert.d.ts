export type AllertProps = {
    status: 'Success' | 'Error' | 'Failed' | 'Info';
    message?: string;
    title?: string;
    className?: string;
    children?: React.ReactNode;
    variant?: 'success' | 'error' | 'info' | 'failed';
    size?: 'default' | 'sm' | 'lg';
    button?: boolean;
    modificationButton?: string;
    childrenButton?: React.ReactNode;
    onClose?: () => void;
};
