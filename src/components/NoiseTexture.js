import { useEffect, useRef } from 'react';

const NoiseTexture = () => {
    const ref = useRef(null);

    useEffect(() => {
        const canvas = ref.current;
        if (!canvas) return;

        const draw = () => {
            const w = canvas.width = window.innerWidth;
            const h = canvas.height = window.innerHeight;
            const ctx = canvas.getContext('2d');
            const img = ctx.createImageData(w, h);
            const d = img.data;
            for (let i = 0; i < d.length; i += 4) {
                const v = (Math.random() * 255) | 0;
                d[i] = d[i + 1] = d[i + 2] = v;
                d[i + 3] = 18;
            }
            ctx.putImageData(img, 0, 0);
        };

        draw();
        window.addEventListener('resize', draw);
        return () => window.removeEventListener('resize', draw);
    }, []);

    return (
        <canvas
            ref={ref}
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                pointerEvents: 'none',
                zIndex: 9995,
                mixBlendMode: 'overlay',
            }}
        />
    );
};

export default NoiseTexture;
