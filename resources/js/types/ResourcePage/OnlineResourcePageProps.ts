export type OnlineResourceItem = {
    id: number;
    title: string;
    slug: string;
    type: string;
    icon: string;
    format: string | null;
    tag: string | null;
    description: string | null;
    url: string;
    palette: number;
};

export type OnlineResourcePageProps = {
    resources: OnlineResourceItem[];
    filters: {
        search: string;
        type: string;
    };
    typeOptions: string[];
};
