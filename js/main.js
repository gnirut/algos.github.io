document.addEventListener('DOMContentLoaded', () => {
    const menuBtn = document.getElementById('menu-btn');
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('overlay');

    const toggleSidebar = () => {
        sidebar.classList.toggle('-translate-x-full');
        overlay.classList.toggle('hidden');
        const icon = menuBtn.querySelector('i');
        icon.classList.toggle('fa-bars');
        icon.classList.toggle('fa-times');
    };

    if (menuBtn && sidebar && overlay) {
        menuBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            toggleSidebar();
        });
        overlay.addEventListener('click', () => {
            if (!sidebar.classList.contains('-translate-x-full')) {
                toggleSidebar();
            }
        });
    }
});