import { useCallback, useEffect, useMemo } from 'react';
import { useDropzone } from 'react-dropzone';
import imageCompression from 'browser-image-compression';
import { X } from 'lucide-react';

interface Props {
    value: File | null;
    onChange: (file: File | null) => void;
    disabled?: boolean;
}

export default function AvatarUpload({ value, onChange, disabled }: Props) {
    const preview = useMemo(() => {
        if (!value) return null;
        return URL.createObjectURL(value);
    }, [value]);

    useEffect(() => {
        return () => {
            if (preview) URL.revokeObjectURL(preview);
        };
    }, [preview]);

    const onDrop = useCallback(
        async (acceptedFiles: File[]) => {
            const file = acceptedFiles[0];
            if (!file) return;

            try {
                const compressedFile = await imageCompression(file, {
                    maxSizeMB: 2, // maksimal 2MB
                    maxWidthOrHeight: 2048, // resize max
                    useWebWorker: true,
                });

                onChange(compressedFile);
            } catch (error) {
                console.error('Compression error:', error);
            }
        },
        [onChange],
    );

    const handleRemove = (e: React.MouseEvent) => {
        e.stopPropagation();
        onChange(null);
    };

    const { getRootProps, getInputProps } = useDropzone({
        multiple: false,
        accept: {
            'image/*': ['.jpg', '.jpeg', '.png', '.webp'],
        },
        maxSize: 2 * 1024 * 1024,
        disabled,
        onDrop,
    });

    return (
        <div className="space-y-2">
            <div
                {...getRootProps()}
                className="relative flex cursor-pointer items-center justify-center rounded-lg border border-dashed p-6 hover:bg-muted"
            >
                <input {...getInputProps()} />

                {preview ? (
                    <div className="group relative">
                        <img
                            src={preview}
                            className="h-24 w-24 rounded-full object-cover"
                        />

                        <div className="absolute inset-0 flex items-center justify-center rounded-full bg-black/40 opacity-0 transition group-hover:opacity-100">
                            <span className="text-xs text-white">Change</span>
                        </div>

                        <button
                            type="button"
                            onClick={handleRemove}
                            className="absolute -top-2 -right-2 rounded-full bg-red-500 p-1 text-white shadow"
                        >
                            <X size={14} />
                        </button>
                    </div>
                ) : (
                    <p className="text-sm text-muted-foreground">
                        Upload avatar
                    </p>
                )}
            </div>
        </div>
    );
}
