<x-emails.auth-layout
    title="Password Berhasil Diubah"
    preheader="Password akun Saint Luke E-Library Anda baru saja diperbarui."
>
    <div style="text-align:center; margin-bottom:8px;">
        <span style="display:inline-block; font-size:34px; line-height:1; padding:16px; background:#e6f4ee; border-radius:50%;">✅</span>
    </div>

    <h2 style="margin:18px 0 6px; font-size:22px; font-weight:700; color:#14201b; text-align:center;">Password Berhasil Diubah</h2>
    <p style="margin:0 0 20px; font-size:15px; line-height:1.7; color:#4b5a52; text-align:center;">
        Halo <strong>{{ $user->name }}</strong>, password akun Anda berhasil diperbarui pada
        <strong>{{ $changedAt }}</strong>. Anda kini dapat masuk menggunakan password baru.
    </p>

    <!-- CTA -->
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
        <tr>
            <td align="center" style="padding:8px 0 24px;">
                <a href="{{ $loginUrl }}"
                   style="display:inline-block; background:linear-gradient(135deg,#1f9d73,#15795a); color:#ffffff; text-decoration:none; font-size:15px; font-weight:600; padding:14px 38px; border-radius:12px; box-shadow:0 8px 20px -8px rgba(31,157,115,0.6);">
                    Masuk ke Akun
                </a>
            </td>
        </tr>
    </table>

    <div style="background:#fdecec; border:1px solid #f0b4b4; border-radius:12px; padding:14px 18px;">
        <p style="margin:0; font-size:13px; line-height:1.6; color:#9b2c2c;">
            🔒 <strong>Bukan Anda?</strong> Jika Anda tidak melakukan perubahan ini, segera hubungi pustakawan
            atau atur ulang password Anda kembali untuk mengamankan akun.
        </p>
    </div>
</x-emails.auth-layout>
