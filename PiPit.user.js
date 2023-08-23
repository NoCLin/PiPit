// ==UserScript==
// @name         PiP it
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Implement PiP for an SPA
// @author       NoCLin
// @match        *://*/*
// @updateURL    https://github.com/NoCLin/PiPit/raw/master/PiPit.user.js
// @downloadURL  https://github.com/NoCLin/PiPit/raw/master/PiPit.user.js
// @require      https://greasemonkey.github.io/gm4-polyfill/gm4-polyfill.js
// @grant        GM_registerMenuCommand
// ==/UserScript==

(function () {
    'use strict';

    async function togglePictureInPicture() {

        if (!('documentPictureInPicture' in window)) {
            alert("Not supported")
            return
        }

        if (documentPictureInPicture.window) {
            documentPictureInPicture.window.close();
            return;
        }

        try {
            const pipWindow = await documentPictureInPicture.requestWindow({
                width: 640,
                height: 640,
            });

            pipWindow.document.body.style.padding = "0px"
            pipWindow.document.body.style.margin = "0px"

            const iframe = document.createElement("iframe")
            iframe.src = document.location
            iframe.seamless = true
            iframe.width = "100%"
            iframe.height = "100%"
            iframe.style.border = "none"

            const targetParent = pipWindow.document.body
            targetParent.append(iframe)

            pipWindow.addEventListener("pagehide", (event) => {
                // alert("closed")
            });


        } catch (e) {
            console.error(e)
            alert(`error: ${e}`)
            return;
        }

    }

    GM.registerMenuCommand('PiP it', togglePictureInPicture);
})();
