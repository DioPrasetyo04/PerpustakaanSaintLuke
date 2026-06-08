// ─── Flag SVGs ───────────────────────────────────────────────────────────────
// Komponen bendera dipisah agar bisa direferensikan dari data (languageItems).
// Tambah bahasa baru cukup buat komponen bendera di sini lalu daftarkan di data.

export const FlagID = ({ className }: { className?: string }) => (
    <svg
        viewBox="0 0 64 64"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
        width="25"
        height="25"
    >
        <rect width="64" height="32" fill="#E70011" />
        <rect y="32" width="64" height="32" fill="#FFFFFF" />
    </svg>
);

export const FlagEN = ({ className }: { className?: string }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 60 30"
        className={className}
        width="25"
        height="25"
    >
        <rect width="60" height="30" fill="#012169" />
        <polygon points="0,0 6,0 60,24 60,30 54,30 0,6" fill="#FFFFFF" />
        <polygon points="60,0 54,0 0,24 0,30 6,30 60,6" fill="#FFFFFF" />
        <polygon points="0,0 4,0 60,26 60,30 56,30 0,4" fill="#C8102E" />
        <polygon points="60,0 56,0 0,26 0,30 4,30 60,4" fill="#C8102E" />
        <rect x="24" width="12" height="30" fill="#FFFFFF" />
        <rect y="9" width="60" height="12" fill="#FFFFFF" />
        <rect x="26" width="8" height="30" fill="#C8102E" />
        <rect y="11" width="60" height="8" fill="#C8102E" />
    </svg>
);
