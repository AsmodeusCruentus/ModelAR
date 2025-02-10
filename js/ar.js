document.addEventListener("DOMContentLoaded", function () {
    const arButtons = document.querySelectorAll(".ar-button");

    arButtons.forEach(button => {
        button.addEventListener("click", function () {
            const modelUrl = this.getAttribute("data-model");

            // Use Google's Scene Viewer for AR
            const sceneViewerUrl = `intent://arvr.google.com/scene-viewer/1.0?file=${location.origin}/${modelUrl}&mode=ar_only#Intent;scheme=https;package=com.google.ar.core;action=android.intent.action.VIEW;end;`;

            // Open Scene Viewer in Android
            window.location.href = sceneViewerUrl;
        });
    });
});
