<x-emails.auth-layout
    title="Permintaan Verifikasi Akun Baru"
    preheader="Ada pendaftar baru yang membutuhkan persetujuan Anda."
>
    <div style="text-align:center; margin-bottom:8px;">
        <span style="display:inline-block; font-size:34px; line-height:1; padding:16px; background:#e6f4ee; border-radius:50%;">🧑‍💼</span>
    </div>

    <h2 style="margin:18px 0 6px; font-size:22px; font-weight:700; color:#14201b; text-align:center;">Halo, {{ $staff->name ?? 'Admin' }}!</h2>
    <p style="margin:0 0 20px; font-size:15px; line-height:1.7; color:#4b5a52; text-align:center;">
        Ada pendaftar baru yang membutuhkan persetujuan Anda. Tinjau detail di bawah,
        lalu setujui atau tolak permintaan ini.
    </p>

    <!-- Detail pendaftar -->
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0"
           style="background:#f6f8f7; border:1px solid #e2e8e5; border-radius:12px; margin-bottom:20px;">
        <tr>
            <td style="padding:16px 18px;">
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="font-size:14px; color:#14201b;">
                    <tr>
                        <td style="padding:6px 0; color:#6b7a72; width:38%;">Nama</td>
                        <td style="padding:6px 0; font-weight:600;">{{ $pendingUser->name }}</td>
                    </tr>
                    <tr>
                        <td style="padding:6px 0; color:#6b7a72;">Username</td>
                        <td style="padding:6px 0; font-weight:600;">{{ $pendingUser->username ?? '-' }}</td>
                    </tr>
                    <tr>
                        <td style="padding:6px 0; color:#6b7a72;">Email</td>
                        <td style="padding:6px 0; font-weight:600;">{{ $pendingUser->email }}</td>
                    </tr>
                    <tr>
                        <td style="padding:6px 0; color:#6b7a72;">Telepon</td>
                        <td style="padding:6px 0; font-weight:600;">{{ $pendingUser->phone ?? '-' }}</td>
                    </tr>
                    <tr>
                        <td style="padding:6px 0; color:#6b7a72;">Role yang diminta</td>
                        <td style="padding:6px 0; font-weight:600;">{{ ucfirst($roleLabel) }}</td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>

    <!-- CTA -->
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
        <tr>
            <td align="center" style="padding:0 0 16px;">
                <a href="{{ $approveUrl }}"
                   style="display:inline-block; background:linear-gradient(135deg,#1f9d73,#15795a); color:#ffffff; text-decoration:none; font-size:15px; font-weight:600; padding:14px 38px; border-radius:12px; box-shadow:0 8px 20px -8px rgba(31,157,115,0.6);">
                    ✓ Setujui Pendaftaran
                </a>
            </td>
        </tr>
        <tr>
            <td align="center" style="padding:0 0 24px;">
                <a href="{{ $rejectUrl }}"
                   style="display:inline-block; background:#ffffff; color:#9b2c2c; text-decoration:none; font-size:14px; font-weight:600; padding:11px 30px; border:1px solid #f0b4b4; border-radius:12px;">
                    Tolak Pendaftaran
                </a>
            </td>
        </tr>
    </table>

    <div style="background:#f3ead2; border:1px solid #d2a653; border-radius:12px; padding:14px 18px;">
        <p style="margin:0; font-size:13px; line-height:1.6; color:#7a5b1c;">
            ⏳ Kedua tautan ini hanya berlaku selama <strong>7 hari</strong>. Setelah itu, kelola
            persetujuan langsung melalui panel admin.
        </p>
    </div>

    <hr style="border:none; border-top:1px solid #e3e0d4; margin:24px 0 16px;">

    <p style="margin:0; font-size:12px; line-height:1.6; color:#9a988b;">
        Anda menerima email ini karena terdaftar sebagai pengelola Perpustakaan Saint Luke.
    </p>
</x-emails.auth-layout>
