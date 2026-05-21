<div x-show="show" x-cloak style="margin-top: 8px;">

    {{-- Bar row: label | progress bar | level --}}
    <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 8px;">
        <span style="font-size: 0.8rem; color: #6b7280; white-space: nowrap;">Kekuatan Password:</span>

        <div style="flex: 1; height: 8px; background-color: #e5e7eb; border-radius: 9999px; overflow: hidden;">
            <div :style="'height:100%; border-radius:9999px; transition: width 0.5s ease, background-color 0.5s ease; width:' + percent + '%; background-color:' + barColor"></div>
        </div>

        <span style="font-size: 0.85rem; font-weight: 700; white-space: nowrap; min-width: 80px; text-align: right;"
              :style="'color:' + textColor"
              x-text="label"></span>
    </div>

    {{-- Requirements checklist --}}
    <div style="background: #f9fafb; border: 1px solid #f3f4f6; border-radius: 12px; padding: 12px 16px;">
        <p style="font-size: 0.7rem; font-weight: 600; color: #9ca3af; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 8px;">
            Password harus mengandung:
        </p>
        <template x-for="req in reqs" :key="req.text">
            <div style="display: flex; align-items: center; gap: 8px; padding: 2px 0; font-size: 0.85rem;"
                 :style="'color:' + (req.ok ? '#16a34a' : '#6b7280')">
                <span style="font-size: 0.7rem; line-height: 1;" x-text="req.ok ? '●' : '○'"></span>
                <span x-text="req.text"></span>
            </div>
        </template>
    </div>

</div>
