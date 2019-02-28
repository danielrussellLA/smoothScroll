const smoothScroll = (selector, duration, offsetY) => {
    const element = document.querySelector(selector);
    const startingY = window.pageYOffset;
    const elementY = window.pageYOffset + element.getBoundingClientRect().top - (offsetY || 60);
    const targetY =
        document.body.scrollHeight - elementY < window.innerHeight
            ? document.body.scrollHeight - window.innerHeight
            : elementY;
    const diff = targetY - startingY;
    const easing = t => (t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1);
    let start;

    if (!diff) return;

    window.requestAnimationFrame(function step(timestamp) {
        if (!start) start = timestamp;
        // Elapsed miliseconds since start of scrolling.
        const time = timestamp - start;
        // Get percent of completion in range [0, 1].
        let percent = Math.min(time / duration, 1);
        // Apply the easing.
        // It can cause bad-looking slow frames in browser performance tool, so be careful.
        percent = easing(percent);

        window.scrollTo(0, startingY + diff * percent);

        // Proceed with animation as long as we wanted it to.
        if (time < duration) {
            window.requestAnimationFrame(step);
        }
    });
};
