# JavaScript-Completo

instalar firacode
descargar los ttf rel repo e instalarlos en windows
https://github.com/tonsky/FiraCode?tab=readme-ov-file

*En editor font famili del editor colocar
Fira Code,Consolas, 'Courier New', monospace
* luego ir a editor font ligatures -> edit in setting.json

en mi caso se encuentra de esta manera 
#########################################################
{
    "editor.mouseWheelZoom": true,
    "editor.fontLigatures": true,
    "security.workspace.trust.untrustedFiles": "newWindow",
    "workbench.editor.splitInGroupLayout": "vertical",
    "[html]": {
        "editor.defaultFormatter": "esbenp.prettier-vscode"
    },
    "[javascript]": {
        "editor.defaultFormatter": "esbenp.prettier-vscode"
    },
    "[css]": {
        "editor.defaultFormatter": "esbenp.prettier-vscode"
    },
    "editor.stickyScroll.enabled": false,
    "workbench.colorTheme": "2077",
    "git.followTagsWhenSync": true,
    "explorer.confirmDragAndDrop": false,
    "[typescript]": {
        "editor.defaultFormatter": "esbenp.prettier-vscode"
    },
    "explorer.confirmDelete": false,
    "[jsonc]": {
        "editor.defaultFormatter": "esbenp.prettier-vscode"
    },
    "editor.fontFamily": "Fira Code,Consolas, 'Courier New', monospace",
    "editor.fontVariations": false
}
#########################################################

* Ejecutar live server del complemento "Live Server v5.7.9" de Ritwick Dey

ctrl + P -> Live server: open with live server
ctrl + P -> vs browser: start browser

una vez que el live server dispare el navegador, copiar el link del chrome y pegarlo en el navegador de VS