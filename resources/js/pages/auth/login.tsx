import type { AuthFormData } from '@/components/login-form';
import { LoginForm } from '@/components/login-form';
// import { Alert, AlertDescription } from '@/components/ui/alert';
import { useForm } from '@inertiajs/react';
import type { ChangeEvent, FormEventHandler } from 'react';

type InputName = keyof AuthFormData;
export default function Login({
    status,
    canResetPassword,
}: {
    status?: string;
    canResetPassword: boolean;
}) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false as boolean,
    });

    const onHandleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const name = e.target.name as InputName;
        setData(name, e.target.value);
    };

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route('login.store'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        // <GuestLayout>
        //     <Head title="Log in" />

        //     {status && (
        //         <div className="mb-4 text-sm font-medium text-green-600">
        //             {status}
        //         </div>
        //     )}

        //     <form onSubmit={submit}>
        //         <div>
        //             <InputLabel htmlFor="email" value="Email" />

        //             <TextInput
        //                 id="email"
        //                 type="email"
        //                 name="email"
        //                 value={data.email}
        //                 className="mt-1 block w-full"
        //                 autoComplete="username"
        //                 isFocused={true}
        //                 onChange={(e) => setData('email', e.target.value)}
        //             />

        //             <InputError message={errors.email} className="mt-2" />
        //         </div>

        //         <div className="mt-4">
        //             <InputLabel htmlFor="password" value="Password" />

        //             <TextInput
        //                 id="password"
        //                 type="password"
        //                 name="password"
        //                 value={data.password}
        //                 className="mt-1 block w-full"
        //                 autoComplete="current-password"
        //                 onChange={(e) => setData('password', e.target.value)}
        //             />

        //             <InputError message={errors.password} className="mt-2" />
        //         </div>

        //         <div className="mt-4 block">
        //             <label className="flex items-center">
        //                 <Checkbox
        //                     name="remember"
        //                     checked={data.remember}
        //                     onChange={(e) =>
        //                         setData(
        //                             'remember',
        //                             (e.target.checked || false) as false,
        //                         )
        //                     }
        //                 />
        //                 <span className="ms-2 text-sm text-muted-foreground">
        //                     Remember me
        //                 </span>
        //             </label>
        //         </div>

        //         <div className="mt-4 flex items-center justify-end">
        //             {canResetPassword && (
        //                 <Link
        //                     href={route('password.request')}
        //                     className="rounded-md text-sm text-muted-foreground underline hover:text-foreground focus:outline-none focus:ring-2 focus:ring-cobalt focus:ring-offset-2"
        //                 >
        //                     Forgot your password?
        //                 </Link>
        //             )}

        //             <PrimaryButton className="ms-4" disabled={processing}>
        //                 Log in
        //             </PrimaryButton>
        //         </div>
        //     </form>
        // </GuestLayout>

        <div className="flex min-h-svh flex-col items-center justify-center bg-muted p-6 md:p-10">
            <div className="w-full max-w-sm md:max-w-4xl">
                <LoginForm
                    status={status}
                    canResetPassword={canResetPassword}
                    data={data}
                    processing={processing}
                    error={errors}
                    onHandleChange={onHandleChange}
                    setData={setData}
                    onSubmit={submit}
                />
            </div>
        </div>
    );
}
