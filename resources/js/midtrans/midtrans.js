document.addEventListener('livewire:initialized', () => {
    Livewire.on('midtrans-pay', (data) => {
        console.log('DATA:', data);

        const snapToken = data.snapToken;

        if (!snapToken) {
            alert('Snap token tidak ditemukan!');
            return;
        }

        snap.pay(snapToken, {
            onSuccess: function () {
                alert('Pembayaran Berhasil');
                window.location.reload();
            },
            onPending: function () {
                alert('Menunggu pembayaran');
            },
            onError: function () {
                alert('Pembayaran gagal');
            },
            onClose: function () {
                alert('Dibatalkan');
            },
        });
    });
});
