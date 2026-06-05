import { useState } from 'react';
import { Link, router, useForm } from '@inertiajs/react';
import { motion } from 'motion/react';
import {
    Lock,
    Eye,
    EyeOff,
    CheckCircle,
    AlertCircle,
    ArrowLeft,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

const getPasswordStrength = (password: string) => {
    if (!password) return { strength: 0, label: '', color: '' };

    let strength = 0;
    if (password.length >= 8) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[a-z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) strength++;

    if (strength <= 2) return { strength, label: 'Weak', color: 'bg-red-500' };
    if (strength <= 3)
        return { strength, label: 'Medium', color: 'bg-yellow-500' };
    if (strength <= 4) return { strength, label: 'Good', color: 'bg-blue-500' };
    return { strength, label: 'Strong', color: 'bg-green-500' };
};

export default function UpdatePassword() {
    const { data, setData, put, processing, errors, reset } = useForm({
        current_password: '',
        password: '',
        password_confirmation: '',
    });

    const [showCurrent, setShowCurrent] = useState(false);
    const [showNew, setShowNew] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);

    const passwordStrength = getPasswordStrength(data.password);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        put(route('password-update.update'), {
            preserveScroll: true,
            preserveState: true,
            onSuccess: () => {
                reset();
                setShowSuccess(true);
                setTimeout(() => router.visit('/profile'), 2000);
            },
        });
    };

    if (showSuccess) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-background px-4 py-8">
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center"
                >
                    <Card className="mx-auto max-w-md border-2 border-green-500 p-12 shadow-2xl">
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{
                                delay: 0.2,
                                type: 'spring',
                                stiffness: 200,
                            }}
                        >
                            <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-green-100 p-6">
                                <CheckCircle className="h-16 w-16 text-green-600" />
                            </div>
                        </motion.div>
                        <h2 className="mb-4 font-display text-3xl font-bold text-foreground">
                            Password Updated Successfully!
                        </h2>
                        <p className="mb-6 text-lg text-muted-foreground">
                            Your password has been changed successfully. You
                            will be redirected to your profile.
                        </p>
                        <div className="flex items-center justify-center gap-2 text-primary">
                            <div className="h-5 w-5 animate-spin rounded-full border-b-2 border-primary" />
                            <span className="font-medium">
                                Redirecting to your profile...
                            </span>
                        </div>
                    </Card>
                </motion.div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-background px-4 py-8">
            <div className="container mx-auto max-w-2xl">
                <Link href="/settings">
                    <Button variant="ghost" className="mb-6 gap-2">
                        <ArrowLeft className="h-4 w-4" />
                        Back to Profile
                    </Button>
                </Link>

                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-8 text-center"
                >
                    <div className="mb-8 rounded-2xl bg-gradient-to-r from-primary to-secondary p-8 shadow-2xl">
                        <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-xl bg-white/20 backdrop-blur-sm">
                            <Lock className="h-10 w-10 text-white" />
                        </div>
                        <h1 className="mb-2 font-display text-3xl font-black text-white sm:text-4xl">
                            Update Password
                        </h1>
                        <p className="text-lg text-white/90">
                            Keep your account secure by updating your password
                            regularly
                        </p>
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                >
                    <Card className="p-8 shadow-xl">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* Current Password */}
                            <div>
                                <label className="mb-2 block text-sm font-semibold text-foreground">
                                    Current Password
                                </label>
                                <div className="relative">
                                    <Lock className="absolute top-1/2 left-3 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                                    <input
                                        type={showCurrent ? 'text' : 'password'}
                                        value={data.current_password}
                                        onChange={(e) =>
                                            setData(
                                                'current_password',
                                                e.target.value,
                                            )
                                        }
                                        className={`w-full rounded-lg border py-3 pr-12 pl-10 focus:ring-2 focus:outline-none ${
                                            errors.current_password
                                                ? 'border-red-500 focus:ring-red-500'
                                                : 'border-input focus:ring-primary'
                                        }`}
                                        placeholder="Enter your current password"
                                    />
                                    <button
                                        type="button"
                                        onClick={() =>
                                            setShowCurrent(!showCurrent)
                                        }
                                        className="absolute top-1/2 right-3 -translate-y-1/2 text-muted-foreground hover:text-muted-foreground"
                                    >
                                        {showCurrent ? (
                                            <EyeOff className="h-5 w-5" />
                                        ) : (
                                            <Eye className="h-5 w-5" />
                                        )}
                                    </button>
                                </div>
                                {errors.current_password && (
                                    <div className="mt-2 flex items-center gap-1 text-sm text-red-500">
                                        <AlertCircle className="h-4 w-4" />
                                        <span>{errors.current_password}</span>
                                    </div>
                                )}
                            </div>

                            {/* New Password */}
                            <div>
                                <label className="mb-2 block text-sm font-semibold text-foreground">
                                    New Password
                                </label>
                                <div className="relative">
                                    <Lock className="absolute top-1/2 left-3 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                                    <input
                                        type={showNew ? 'text' : 'password'}
                                        value={data.password}
                                        onChange={(e) =>
                                            setData('password', e.target.value)
                                        }
                                        className={`w-full rounded-lg border py-3 pr-12 pl-10 focus:ring-2 focus:outline-none ${
                                            errors.password
                                                ? 'border-red-500 focus:ring-red-500'
                                                : 'border-input focus:ring-primary'
                                        }`}
                                        placeholder="Enter your new password"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowNew(!showNew)}
                                        className="absolute top-1/2 right-3 -translate-y-1/2 text-muted-foreground hover:text-muted-foreground"
                                    >
                                        {showNew ? (
                                            <EyeOff className="h-5 w-5" />
                                        ) : (
                                            <Eye className="h-5 w-5" />
                                        )}
                                    </button>
                                </div>

                                {/* Password Strength Indicator */}
                                {data.password && (
                                    <div className="mt-3">
                                        <div className="mb-2 flex items-center justify-between">
                                            <span className="text-sm font-medium text-foreground">
                                                Password Strength:
                                            </span>
                                            <span
                                                className={`text-sm font-bold ${
                                                    passwordStrength.label ===
                                                    'Weak'
                                                        ? 'text-red-500'
                                                        : passwordStrength.label ===
                                                            'Medium'
                                                          ? 'text-yellow-500'
                                                          : passwordStrength.label ===
                                                              'Good'
                                                            ? 'text-blue-500'
                                                            : 'text-green-500'
                                                }`}
                                            >
                                                {passwordStrength.label}
                                            </span>
                                        </div>
                                        <div className="h-2 w-full rounded-full bg-muted">
                                            <div
                                                className={`h-2 rounded-full transition-all duration-300 ${passwordStrength.color}`}
                                                style={{
                                                    width: `${(passwordStrength.strength / 5) * 100}%`,
                                                }}
                                            />
                                        </div>
                                    </div>
                                )}

                                {errors.password && (
                                    <div className="mt-2 flex items-center gap-1 text-sm text-red-500">
                                        <AlertCircle className="h-4 w-4" />
                                        <span>{errors.password}</span>
                                    </div>
                                )}

                                {/* Password Requirements */}
                                <div className="mt-3 rounded-lg border border-blue-200 bg-blue-50 p-4">
                                    <p className="mb-2 text-sm font-semibold text-foreground">
                                        Password must contain:
                                    </p>
                                    <ul className="space-y-1 text-sm text-muted-foreground">
                                        <li className="flex items-center gap-2">
                                            <div
                                                className={`h-2 w-2 rounded-full ${data.password.length >= 8 ? 'bg-green-500' : 'bg-muted'}`}
                                            />
                                            At least 8 characters
                                        </li>
                                        <li className="flex items-center gap-2">
                                            <div
                                                className={`h-2 w-2 rounded-full ${/[A-Z]/.test(data.password) ? 'bg-green-500' : 'bg-muted'}`}
                                            />
                                            One uppercase letter
                                        </li>
                                        <li className="flex items-center gap-2">
                                            <div
                                                className={`h-2 w-2 rounded-full ${/[a-z]/.test(data.password) ? 'bg-green-500' : 'bg-muted'}`}
                                            />
                                            One lowercase letter
                                        </li>
                                        <li className="flex items-center gap-2">
                                            <div
                                                className={`h-2 w-2 rounded-full ${/[0-9]/.test(data.password) ? 'bg-green-500' : 'bg-muted'}`}
                                            />
                                            One number
                                        </li>
                                        <li className="flex items-center gap-2">
                                            <div
                                                className={`h-2 w-2 rounded-full ${/[!@#$%^&*(),.?":{}|<>]/.test(data.password) ? 'bg-green-500' : 'bg-muted'}`}
                                            />
                                            One special character
                                        </li>
                                    </ul>
                                </div>
                            </div>

                            {/* Confirm New Password */}
                            <div>
                                <label className="mb-2 block text-sm font-semibold text-foreground">
                                    Confirm New Password
                                </label>
                                <div className="relative">
                                    <Lock className="absolute top-1/2 left-3 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                                    <input
                                        type={showConfirm ? 'text' : 'password'}
                                        value={data.password_confirmation}
                                        onChange={(e) =>
                                            setData(
                                                'password_confirmation',
                                                e.target.value,
                                            )
                                        }
                                        className={`w-full rounded-lg border py-3 pr-12 pl-10 focus:ring-2 focus:outline-none ${
                                            errors.password_confirmation
                                                ? 'border-red-500 focus:ring-red-500'
                                                : 'border-input focus:ring-primary'
                                        }`}
                                        placeholder="Confirm your new password"
                                    />
                                    <button
                                        type="button"
                                        onClick={() =>
                                            setShowConfirm(!showConfirm)
                                        }
                                        className="absolute top-1/2 right-3 -translate-y-1/2 text-muted-foreground hover:text-muted-foreground"
                                    >
                                        {showConfirm ? (
                                            <EyeOff className="h-5 w-5" />
                                        ) : (
                                            <Eye className="h-5 w-5" />
                                        )}
                                    </button>
                                </div>
                                {errors.password_confirmation && (
                                    <div className="mt-2 flex items-center gap-1 text-sm text-red-500">
                                        <AlertCircle className="h-4 w-4" />
                                        <span>
                                            {errors.password_confirmation}
                                        </span>
                                    </div>
                                )}
                                {data.password_confirmation &&
                                    data.password ===
                                        data.password_confirmation && (
                                        <div className="mt-2 flex items-center gap-1 text-sm text-green-500">
                                            <CheckCircle className="h-4 w-4" />
                                            <span>Passwords match!</span>
                                        </div>
                                    )}
                            </div>

                            {/* Buttons */}
                            <div className="flex gap-4 pt-4">
                                <Link href="/settings" className="flex-1">
                                    <Button
                                        type="button"
                                        variant="outline"
                                        className="w-full"
                                        size="lg"
                                    >
                                        Cancel
                                    </Button>
                                </Link>
                                <Button
                                    type="submit"
                                    className="flex-1 bg-gradient-to-r from-primary to-secondary text-white shadow-lg hover:from-primary/90 hover:to-secondary/90"
                                    size="lg"
                                    disabled={processing}
                                >
                                    {processing ? (
                                        <div className="flex items-center gap-2">
                                            <div className="h-5 w-5 animate-spin rounded-full border-b-2 border-white" />
                                            <span>Updating...</span>
                                        </div>
                                    ) : (
                                        <div className="flex items-center gap-2">
                                            <Lock className="h-5 w-5" />
                                            <span>Update Password</span>
                                        </div>
                                    )}
                                </Button>
                            </div>
                        </form>
                    </Card>
                </motion.div>

                {/* Security Tips */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="mt-8"
                >
                    <Card className="border-2 border-yellow-200 bg-gradient-to-br from-yellow-50 to-orange-50 p-6">
                        <h3 className="mb-3 flex items-center gap-2 font-semibold text-foreground">
                            <AlertCircle className="h-5 w-5 text-yellow-600" />
                            Security Tips
                        </h3>
                        <ul className="space-y-2 text-sm text-foreground">
                            <li className="flex items-start gap-2">
                                <span className="mt-0.5 text-yellow-600">
                                    •
                                </span>
                                <span>
                                    Never share your password with anyone
                                </span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="mt-0.5 text-yellow-600">
                                    •
                                </span>
                                <span>
                                    Use a unique password that you don't use for
                                    other accounts
                                </span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="mt-0.5 text-yellow-600">
                                    •
                                </span>
                                <span>
                                    Change your password regularly (every 3-6
                                    months)
                                </span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="mt-0.5 text-yellow-600">
                                    •
                                </span>
                                <span>
                                    Avoid using easily guessable information
                                    like birthdays or names
                                </span>
                            </li>
                        </ul>
                    </Card>
                </motion.div>
            </div>
        </div>
    );
}
