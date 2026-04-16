document.addEventListener('livewire:initialized', () => {
    Livewire.on('midtrans-pay', (data) => {
        console.log('MIDTRANS JS LOADED');
        console.log('SNAP TOKEN:', data.snapToken); // DEBUG

        snap.pay(data.snapToken, {
            onSuccess: function () {
                alert('Pembayaran berhasil');
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
