;(function(window) {

  var svgSprite = '<svg>' +
    '' +
    '<symbol id="icon-xin" viewBox="0 0 1024 1024">' +
    '' +
    '<path d="M511.142981 930.646845c-5.895267 0-11.791557-1.819438-16.872273-5.457292C193.223235 708.812481 64.775794 534.361287 64.775794 341.844645c0-148.077523 96.898911-259.747859 225.347374-259.747859 113.896026 0 184.266747 56.258305 221.019813 108.596324 36.68962-52.369741 107.123786-108.596324 221.018789-108.596324 128.447441 0 225.347374 111.670336 225.347374 259.747859 0 192.483896-128.446417 366.967836-429.495938 583.344908C522.933515 928.827407 517.038248 930.646845 511.142981 930.646845zM290.123168 139.922796c-95.520517 0-167.521365 86.802972-167.521365 201.922872 0 168.30624 116.466572 325.728596 388.541177 524.20088 272.071535-198.472284 388.540154-355.926362 388.540154-524.20088 0-115.119901-72.063269-201.922872-167.521365-201.922872-152.281265 0-191.856609 117.253494-193.424314 122.239042-3.889587 11.948123-15.051811 20.10285-27.595498 20.10285l-0.125867 0c-12.606109-0.063445-23.707958-8.217149-27.471678-20.258393C481.976708 257.17629 442.40341 139.922796 290.123168 139.922796z"  ></path>' +
    '' +
    '</symbol>' +
    '' +
    '<symbol id="icon-next" viewBox="0 0 1024 1024">' +
    '' +
    '<path d="M256.370948 0.314155 256.370948 74.853825 693.517123 512 256.370948 949.146175 256.370948 1023.684822 768.056793 512Z"  ></path>' +
    '' +
    '</symbol>' +
    '' +
    '<symbol id="icon-prev" viewBox="0 0 1024 1024">' +
    '' +
    '<path d="M713.099 930.958c-4.29 0-8.579-1.642-11.847-4.91l-402.198-402.198c-6.553-6.553-6.553-17.145 0-23.698l402.198-402.198c6.553-6.553 17.145-6.553 23.698 0s6.553 17.145 0 23.698l-390.351 390.351 390.351 390.351c6.553 6.553 6.553 17.145 0 23.698-3.269 3.269-7.558 4.91-11.847 4.91z"  ></path>' +
    '' +
    '</symbol>' +
    '' +
    '<symbol id="icon-fanhuidingbu" viewBox="0 0 1114 1024">' +
    '' +
    '<path d="M1024 0 89.043478 0C39.869217 0 0 39.869217 0 89.043478l0 845.913043c0 49.174261 39.869217 89.043478 89.043478 89.043478l934.956522 0c49.174261 0 89.043478-39.869217 89.043478-89.043478L1113.043478 89.043478C1113.043478 39.869217 1073.174261 0 1024 0zM849.541565 670.98713c-8.748522 8.748522-22.750609 8.726261-31.410087 0.089043L566.205217 419.127652 314.278957 671.076174c-8.570435 8.570435-22.706087 8.614957-31.410087-0.089043-8.748522-8.748522-8.726261-22.750609-0.089043-31.410087l267.753739-267.753739c4.274087-4.274087 9.928348-6.41113 15.60487-6.433391 5.765565-0.044522 11.419826 2.114783 15.716174 6.433391l267.753739 267.753739C858.178783 648.147478 858.223304 662.305391 849.541565 670.98713z"  ></path>' +
    '' +
    '</symbol>' +
    '' +
    '</svg>'
  var script = function() {
    var scripts = document.getElementsByTagName('script')
    return scripts[scripts.length - 1]
  }()
  var shouldInjectCss = script.getAttribute("data-injectcss")

  /**
   * document ready
   */
  var ready = function(fn) {
    if (document.addEventListener) {
      if (~["complete", "loaded", "interactive"].indexOf(document.readyState)) {
        setTimeout(fn, 0)
      } else {
        var loadFn = function() {
          document.removeEventListener("DOMContentLoaded", loadFn, false)
          fn()
        }
        document.addEventListener("DOMContentLoaded", loadFn, false)
      }
    } else if (document.attachEvent) {
      IEContentLoaded(window, fn)
    }

    function IEContentLoaded(w, fn) {
      var d = w.document,
        done = false,
        // only fire once
        init = function() {
          if (!done) {
            done = true
            fn()
          }
        }
        // polling for no errors
      var polling = function() {
        try {
          // throws errors until after ondocumentready
          d.documentElement.doScroll('left')
        } catch (e) {
          setTimeout(polling, 50)
          return
        }
        // no errors, fire

        init()
      };

      polling()
        // trying to always fire before onload
      d.onreadystatechange = function() {
        if (d.readyState == 'complete') {
          d.onreadystatechange = null
          init()
        }
      }
    }
  }

  /**
   * Insert el before target
   *
   * @param {Element} el
   * @param {Element} target
   */

  var before = function(el, target) {
    target.parentNode.insertBefore(el, target)
  }

  /**
   * Prepend el to target
   *
   * @param {Element} el
   * @param {Element} target
   */

  var prepend = function(el, target) {
    if (target.firstChild) {
      before(el, target.firstChild)
    } else {
      target.appendChild(el)
    }
  }

  function appendSvg() {
    var div, svg

    div = document.createElement('div')
    div.innerHTML = svgSprite
    svgSprite = null
    svg = div.getElementsByTagName('svg')[0]
    if (svg) {
      svg.setAttribute('aria-hidden', 'true')
      svg.style.position = 'absolute'
      svg.style.width = 0
      svg.style.height = 0
      svg.style.overflow = 'hidden'
      prepend(svg, document.body)
    }
  }

  if (shouldInjectCss && !window.__iconfont__svg__cssinject__) {
    window.__iconfont__svg__cssinject__ = true
    try {
      document.write("<style>.svgfont {display: inline-block;width: 1em;height: 1em;fill: currentColor;vertical-align: -0.1em;font-size:16px;}</style>");
    } catch (e) {
      console && console.log(e)
    }
  }

  ready(appendSvg)


})(window)