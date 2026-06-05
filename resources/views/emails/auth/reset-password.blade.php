<x-emails.auth-layout
    title="Atur Ulang Password"
    preheader="Kami menerima permintaan untuk mengatur ulang password akun Anda."
>
    <div style="text-align:center; margin-bottom:8px;">
        <span style="display:inline-block; font-size:34px; line-height:1; padding:16px; background:#e6f4ee; border-radius:50%;">🔐</span>
    </div>

    <h2 style="margin:18px 0 6px; font-size:22px; font-weight:700; color:#14201b; text-align:center;">Atur Ulang Password</h2>
    <p style="margin:0 0 20px; font-size:15px; line-height:1.7; color:#4b5a52; text-align:center;">
        Halo <strong>{{ $user->name }}</strong>, kami menerima permintaan untuk mengatur ulang password akun Anda.
        Tekan tombol di bawah untuk membuat password baru.
    </p>

    <!-- CTA -->
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
        <tr>
            <td align="center" style="padding:8px 0 24px;">
                <a href="{{ $url }}"
                   style="display:inline-block; background:linear-gradient(135deg,#1f9d73,#15795a); color:#ffffff; text-decoration:none; font-size:15px; font-weight:600; padding:14px 38px; border-radius:12px; box-shadow:0 8px 20px -8px rgba(31,157,115,0.6);">
                    Atur Ulang Password
                </a>
            </td>
        </tr>
    </table>

    <div style="background:#f3ead2; border:1px solid #d2a653; border-radius:12px; padding:14px 18px; margin-bottom:20px;">
        <p style="margin:0; font-size:13px; line-height:1.6; color:#7a5b1c;">
            ⏳ Tautan reset ini berlaku selama <strong>{{ $count ?? 60 }} menit</strong>. Demi keamanan, jangan bagikan tautan ini kepada siapa pun.
        </p>
    </div>

    <p style="margin:0 0 6px; font-size:13px; color:#6b6a60;">
        Jika tombol tidak berfungsi, salin dan tempel tautan berikut ke peramban Anda:
    </p>
    <p style="margin:0; font-size:12px; line-height:1.6; word-break:break-all; color:#1f9d73;">
        <a href="{{ $url }}" style="color:#1f9d73;">{{ $url }}</a>
    </p>

    <hr style="border:none; border-top:1px solid #e3e0d4; margin:24px 0 16px;">

    <p style="margin:0; font-size:12px; line-height:1.6; color:#9a988b;">
        Jika Anda tidak meminta pengaturan ulang password, abaikan email ini — password Anda tidak akan berubah.
    </p>
</x-emails.auth-layout>
