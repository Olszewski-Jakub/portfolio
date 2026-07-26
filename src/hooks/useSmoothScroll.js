import { useEffect } from 'react';
import Lenis from 'lenis';

function isAdminHost() {
    if (typeof window === 'undefined') return false;
    const host = window.location.hostname || '';
    const adminPrefix = (process.env.REACT_APP_ADMIN_SUBDOMAIN || 'admin') + '.';
    return host.toLowerCase().startsWith(adminPrefix.toLowerCase());
}

export default function useSmoothScroll() {
    useEffect(() => {
        // Lenis captures wheel globally and breaks modal/dialog scrolling.
        if (isAdminHost()) return undefined;

        const lenis = new Lenis({
            duration: 1.2,
            easing: t => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            smoothWheel: true,
            syncTouch: false,
        });

        let rafId;
        const raf = time => {
            lenis.raf(time);
            rafId = requestAnimationFrame(raf);
        };
        rafId = requestAnimationFrame(raf);

        return () => {
            cancelAnimationFrame(rafId);
            lenis.destroy();
        };
    }, []);
}
