/*
 * Copyright 2010, Google Inc.
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are
 * met:
 *
 *     * Redistributions of source code must retain the above copyright
 * notice, this list of conditions and the following disclaimer.
 *     * Redistributions in binary form must reproduce the above
 * copyright notice, this list of conditions and the following disclaimer
 * in the documentation and/or other materials provided with the
 * distribution.
 *     * Neither the name of Google Inc. nor the names of its
 * contributors may be used to endorse or promote products derived from
 * this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS
 * "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT
 * LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR
 * A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT
 * OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL,
 * SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
 * LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE,
 * DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY
 * THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
 * (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
 * OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */


/**
 * @fileoverview This file contains functions every webgl program will need
 * a version of one way or another.
 *
 * Instead of setting up a context manually it is recommended to
 * use. This will check for success or failure. On failure it
 * will attempt to present an approriate message to the user.
 *
 *       gl = WebGLUtils.setupWebGL(canvas);
 *
 * For animated WebGL apps use of setTimeout or setInterval are
 * discouraged. It is recommended you structure your rendering
 * loop like this.
 *
 *       function render() {
 *         globalThis.requestAnimationFrame(render, canvas);
 *
 *         // do rendering
 *         ...
 *       }
 *       render();
 *
 * This will call your rendering function up to the refresh rate
 * of your display but will stop rendering if your app is not
 * visible.
 */

WebGLUtils = function () {

  /**
   * Creates the HTLM for a failure message
   * @param {string} canvasContainerId id of container of th
   *        canvas.
   * @return {string} The html.
   */
  const makeFailHTML = function (msg) {
    return '' +
      '<div style="margin: auto; width:500px;z-index:10000;margin-top:20em;text-align:center;">' + msg + '</div>';
    // return '' +
    //   '<table style="background-color: #8CE; width: 100%; height: 100%;"><tr>' +
    //   '<td align="center">' +
    //   '<div style="display: table-cell; vertical-align: middle;">' +
    //   '<div style="">' + msg + '</div>' +
    //   '</div>' +
    //   '</td></tr></table>';
  };

  /**
   * Mesasge for getting a webgl browser
   * @type {string}
   */
  const GET_A_WEBGL_BROWSER = '' +
    'This page requires a browser that supports WebGL.<br/>' +
    '<a href="http://get.webgl.org">Click here to upgrade your browser.</a>';

  /**
   * Mesasge for need better hardware
   * @type {string}
   */
  const OTHER_PROBLEM = '' +
    "It doesn't appear your computer can support WebGL.<br/>" +
    '<a href="http://get.webgl.org">Click here for more information.</a>';

  /**
   * Creates a webgl context. If creation fails it will
   * change the contents of the container of the <canvas>
   * tag to an error message with the correct links for WebGL.
   * @param {Element} canvas. The canvas element to create a
   *     context from.
   * @param {WebGLContextCreationAttirbutes} opt_attribs Any
   *     creation attributes you want to pass in.
   * @param {function:(msg)} opt_onError An function to call
   *     if there is an error during creation.
   * @return {WebGLRenderingContext} The created context.
   */
  const setupWebGL = function (canvas, opt_attribs, opt_onError) {
    function handleCreationError(msg) {
      const container = document.getElementsByTagName("body")[0];
      //const container = canvas.parentNode;
      if (container) {
        const str = globalThis.WebGLRenderingContext ?
          OTHER_PROBLEM :
          GET_A_WEBGL_BROWSER;
        if (msg) {
          str += "<br/><br/>Status: " + msg;
        }
        container.innerHTML = makeFailHTML(str);
      }
    };

    opt_onError = opt_onError || handleCreationError;

    if (canvas.addEventListener) {
      canvas.addEventListener("webglcontextcreationerror", function (event) {
        opt_onError(event.statusMessage);
      }, false);
    }
    const context = create3DContext(canvas, opt_attribs);
    if (!context) {
      if (!globalThis.WebGLRenderingContext) {
        opt_onError("");
      } else {
        opt_onError("");
      }
    }

    return context;
  };

  /**
   * Creates a webgl context.
   * @param {HTMLCanvasElement} canvas The canvas tag to get context
   *     from. If one is not passed in one will be created.
   * @return {WebGLRenderingContext | WebGL2RenderingContext} The created context.
   */
  const create3DContext = function (canvas, opt_attribs) {
    const names = ["webgl", "experimental-webgl", "webkit-3d", "moz-webgl"];
    let context = null;
    for (let ii = 0; ii < names.length; ++ii) {
      try {
        context = canvas.getContext(names[ii], opt_attribs);
      } catch (_e) {
        // eslint-disable-next-line no-empty
      }
      if (context) {
        break;
      }
    }
    return context;
  }

  return {
    create3DContext: create3DContext,
    setupWebGL: setupWebGL
  };
}();

/**
 * Provides requestAnimationFrame in a cross browser
 * way.
 */
if (!globalThis.requestAnimationFrame) {
  globalThis.requestAnimationFrame = (function () {
    return globalThis.requestAnimationFrame ||
      globalThis.webkitRequestAnimationFrame ||
      globalThis.mozRequestAnimationFrame ||
      globalThis.oRequestAnimationFrame ||
      globalThis.msRequestAnimationFrame ||
      function (/* function FrameRequestCallback */ callback, /* DOMElement Element */ _element) {
        globalThis.setTimeout(callback, 1000 / 60);
      };
  })();
}

/** * ERRATA: 'cancelRequestAnimationFrame' renamed to 'cancelAnimationFrame' to reflect an update to the W3C Animation-Timing Spec. 
 * 
 * Cancels an animation frame request. 
 * Checks for cross-browser support, falls back to clearTimeout. 
 * @param {number}  Animation frame request. */
if (!globalThis.cancelAnimationFrame) {
  globalThis.cancelAnimationFrame = (globalThis.cancelRequestAnimationFrame ||
    globalThis.webkitCancelAnimationFrame || globalThis.webkitCancelRequestAnimationFrame ||
    globalThis.mozCancelAnimationFrame || globalThis.mozCancelRequestAnimationFrame ||
    globalThis.msCancelAnimationFrame || globalThis.msCancelRequestAnimationFrame ||
    globalThis.oCancelAnimationFrame || globalThis.oCancelRequestAnimationFrame ||
    globalThis.clearTimeout);
}