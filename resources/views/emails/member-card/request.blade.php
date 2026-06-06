<x-emails.auth-layout
    title="Permintaan Kartu Anggota"
    preheader="Seorang anggota meminta dibuatkan kartu tanda anggota."
>
    <div style="text-align:center; margin-bottom:8px;">
        <span style="display:inline-block; font-size:34px; line-height:1; padding:16px; background:#e6f4ee; border-radius:50%;">🪪</span>
    </div>

    <h2 style="margin:18px 0 6px; font-size:22px; font-weight:700; color:#14201b; text-align:center;">Permintaan Kartu Anggota Baru</h2>
    <p style="margin:0 0 20px; font-size:15px; line-height:1.7; color:#4b5a52; text-align:center;">
        Halo <strong>{{ $staff->name }}</strong>, anggota berikut meminta dibuatkan
        <strong>kartu tanda anggota</strong> pada <strong>{{ $requestedAt }}</strong>.
    </p>

    <!-- Detail anggota -->
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0"
           style="background:#f6f8f7; border:1px solid #e2e8e5; border-radius:12px; margin-bottom:20px;">
        <tr>
            <td style="padding:16px 18px;">
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="font-size:14px; color:#14201b;">
                    <tr>
                        <td style="padding:6px 0; color:#6b7a72; width:40%;">Nama</td>
                        <td style="padding:6px 0; font-weight:600;">{{ $requester->name }}</td>
                    </tr>
                    <tr>
                        <td style="padding:6px 0; color:#6b7a72;">No. Anggota / Username</td>
                        <td style="padding:6px 0; font-weight:600;">{{ $requester->username ?? '-' }}</td>
                    </tr>
                    <tr>
                        <td style="padding:6px 0; color:#6b7a72;">Email</td>
                        <td style="padding:6px 0; font-weight:600;">{{ $requester->email }}</td>
                    </tr>
                    <tr>
                        <td style="padding:6px 0; color:#6b7a72;">No. HP</td>
                        <td style="padding:6px 0; font-weight:600;">{{ $requester->phone ?? '-' }}</td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>

    <!-- CTA -->
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
        <tr>
            <td align="center" style="padding:0 0 24px;">
                <a href="{{ $panelUrl }}"
                   style="display:inline-block; background:linear-gradient(135deg,#1f9d73,#15795a); color:#ffffff; text-decoration:none; font-size:15px; font-weight:600; padding:14px 38px; border-radius:12px; box-shadow:0 8px 20px -8px rgba(31,157,115,0.6);">
                    Buka Panel Anggota
                </a>
            </td>
        </tr>
    </table>

    <div style="background:#fef6e7; border:1px solid #f0d9a8; border-radius:12px; padding:14px 18px;">
        <p style="margin:0; font-size:13px; line-height:1.6; color:#8a6d1f;">
            🪪 Buka <strong>panel admin → Anggota</strong>, cari anggota di atas, lalu gunakan aksi
            <strong>Buat Kartu</strong> untuk menerbitkan kartu tanda anggotanya.
        </p>
    </div>
</x-emails.auth-layout>
