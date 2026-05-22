import {
    VisitFormCard,
    type UserTypeOption,
} from '@/components/component/visit/VisitFormCard';
import { Head } from '@inertiajs/react';

interface VisitCreatePageProps {
    userTypes: UserTypeOption[];
}

export default function VisitCreate({ userTypes }: VisitCreatePageProps) {
    return (
        <>
            <Head title="Pencatatan Kunjungan" />
            <div className="flex min-h-[70vh] w-full items-center justify-center px-4 py-10">
                <div className="w-full max-w-4xl">
                    <VisitFormCard userTypes={userTypes} />
                </div>
            </div>
        </>
    );
}
