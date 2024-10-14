window.addEventListener('resize', function() {
    const newWidth = window.innerWidth;
    deviceTypeDiv.innerText = newWidth < 860 ? "Estás usando la versión móvil." : "Estás usando la versión de escritorio.";
});
