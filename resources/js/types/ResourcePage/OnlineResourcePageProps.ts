export type OnlineResourceItem = {
    id: number;
    title: string;
    type: string;
    icon: string;
    format: string | null;
    tag: string | null;
    description: string | null;
    url: string;
    color: string;
};

export type OnlineResourcePageProps = {
    resources: OnlineResourceItem[];
    filters: {
        search: string;
        type: string;
    };
    typeOptions: string[];
};
