var lalolib = function () {
  function laloprint(r, e, t) {
    if (void 0 === e) {
      var e = "LALOLibOutput";
    }
    if (void 0 === t) {
      var t = !0;
    }
    return printMat(r, size(r), e, t);
  }

  function printMat(r, e, t, a) {
    if (void 0 === a) {
      var a = !1;
    }
    if (void 0 === t || !0 === t) {
      if ("matrix" == type(r)) {
        var n, o, i = "[", s = e[0], l = e[1];
        for (n = 0; n < s; n++) {
          for (i += "[", o = 0; o < l - 1; o++) {
            i += printNumber(r.val[n * r.n + o]) + ",";
          }
          i += n < s - 1 ? printNumber(r.val[n * r.n + o]) + "]; " : printNumber(r.val[n * r.n + o]) + "]";
        }
        return i += "]";
      }
      if ("vector" == type(r)) {
        for (var l = r.length, i = "", n = 0; n < l; n++) {
          i += "[ " + printNumber(r[n]) + " ]<br>";
        }
        return console.log(i), i;
      }
    }
    else {
      var n, o, c = "";
      if (isScalar(r)) {
        c += r + "<br>";
      }
      else if ("vector" == type(r)) {
        var l = e[0];
        for (n = 0; n < l; n++) {
          c += "[ " + printNumber(r[n]) + " ]<br>";
        }
      }
      else {
        var s = e[0], l = e[1];
        for (n = 0; n < s; n++) {
          for (c += "[ ", o = 0; o < l - 1; o++) {
            c += printNumber(r.val[n * r.n + o]) + ", ";
          }
          c += printNumber(r.val[n * r.n + o]) + " ]<br>";
        }
      }
      a ? document.getElementById(t).innerHTML += c : document.getElementById(t).innerHTML = c;
    }
  }

  function printNumber(r) {
    switch (typeof r) {
      case"undefined":
        return "0";
      case"string":
      case"boolean":
        return r;
      default:
        if (r == 1 / 0) {
          return "Inf";
        }
        if (r == -1 / 0) {
          return "-Inf";
        }
        var e = Math.floor(r);
        return Math.abs(r - e) < 2.23e-16 ? "" + e : r.toFixed(printPrecision);
    }
  }

  function error(r) {
    throw new Error(r);
  }

  function plot(r) {
    for (var e, t, a, n, o = new Array, i = new Array, s = new Array, l = 1 / 0, c = -1 / 0, u = 1 / 0, m = -1 / 0, v = 0, p = 0; v < arguments.length;) {
      if ("vector" == type(arguments[v])) {
        v + 1 < arguments.length && "vector" == type(arguments[v + 1]) ? (e = arguments[v], t = arguments[v + 1], v++) : (t = arguments[v], e = range(t.length));
      }
      else {
        if ("matrix" != type(arguments[v])) {
          return "undefined";
        }
        if (1 == arguments[v].n) {
          t = arguments[v].val, e = range(t.length);
        }
        else if (1 == arguments[v].m) {
          t = arguments[v].val, e = range(t.length);
        }
        else {
          if (2 != arguments[v].n) {
            e = range(arguments[v].n);
            for (var f = 0; f < arguments[v].m; f++) {
              for (t = arguments[v].row(f), o[p] = [new Array(e.length), new Array(e.length)], n = 0; n < e.length; n++) {
                o[p][0][n] = e[n], o[p][1][n] = t[n], e[n] < l && (l = e[n]), e[n] > c && (c = e[n]), t[n] > m && (m = t[n]), t[n] < u && (u = t[n]);
              }
              i[p] = void 0, s[p] = "", p++;
            }
            v++;
            continue;
          }
          e = getCols(arguments[v], [0]), t = getCols(arguments[v], [1]);
        }
      }
      for (a = void 0, v + 1 < arguments.length && "string" == type(arguments[v + 1]) && (a = arguments[v + 1], v++), legend = "", v + 1 < arguments.length && "string" == type(arguments[v + 1]) && (legend = arguments[v + 1], v++), o[p] = [new Array(e.length), new Array(e.length)], n = 0; n < e.length; n++) {
        o[p][0][n] = e[n], o[p][1][n] = t[n], e[n] < l && (l = e[n]), e[n] > c && (c = e[n]), t[n] > m && (m = t[n]), t[n] < u && (u = t[n]);
      }
      i[p] = a, s[p] = legend, p++, v++;
    }
    var h = c - l, x = Math.max(m - u, 1);
    c += .1 * h, l -= .1 * h, m += .1 * x, u -= .1 * x, u > 0 && (u = -.1 * m), m < 0 && (m = -.1 * u);
    var d = {
      data: o,
      minX: l,
      maxX: c,
      minY: u,
      maxY: m,
      styles: i,
      legend: s
    }, g  = "LALOLibPlot" + LALOLibPlotsIndex;
    LALOLibOutput.innerHTML += "<br><div style='position:relative;left:0px;top:0px;text-align:left;'> <div><a onmousemove='mouseposition(event," + LALOLibPlotsIndex + ");' onmousedown='mousestartmove(event," + LALOLibPlotsIndex + ");' onmouseup='mousestopmove(event);' onmouseleave='mousestopmove(event);' ondblclick='zoomoriginal(" + LALOLibPlotsIndex + ");'><canvas id='" + g + "'  width='500' height='500' style='border: 1px solid black;'></canvas></a></div> <label id='lblposition" + LALOLibPlotsIndex + "'></label> <div style='position: absolute;left: 550px;top: -1em;'> <canvas id='legend" + LALOLibPlotsIndex + "' width='50' height='500'></canvas></div> <div id='legendtxt" + LALOLibPlotsIndex + "' style='position: absolute;left: 610px;top: 0;'></div> </div>";
    var b = 20;
    LALOLibPlots[LALOLibPlotsIndex] = new Plot(g), LALOLibPlots[LALOLibPlotsIndex].setScalePlot(d.minX, d.maxX, 200, d.scaleY), d.minY && d.maxY && LALOLibPlots[LALOLibPlotsIndex].view(d.minX, d.maxX, d.minY, d.maxY);
    var v, M, w = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 0];
    for (v = 0; v < d.data.length; v++) {
      var y = !0, V = !0;
      for ("string" == typeof d.styles[v] ? (d.styles[v].indexOf(".") >= 0 && (y = !1, d.styles[v] = d.styles[v].replace(".", "")), d.styles[v].indexOf("_") >= 0 && (V = !1, d.styles[v] = d.styles[v].replace("_", "")), M = parseColor(d.styles[v]), M < 0 ? M = w.splice(0, 1)[0] : w.splice(w.indexOf(M), 1)) : M = M = w.splice(0, 1)[0], void 0 === M && (M = 0), n = 0; n < d.data[v][0].length; n++) {
        V && LALOLibPlots[LALOLibPlotsIndex].addPoint(d.data[v][0][n], d.data[v][1][n], M), y && n < d.data[v][0].length - 1 && LALOLibPlots[LALOLibPlotsIndex].plot_line(d.data[v][0][n], d.data[v][1][n], d.data[v][0][n + 1], d.data[v][1][n + 1], M);
      }
      if ("" != d.legend[v]) {
        var C = document.getElementById("legend" + LALOLibPlotsIndex).getContext("2d");
        setcolor(C, M), C.lineWidth = "3", V && (C.beginPath(), C.arc(25, b, 5, 0, 2 * Math.PI, !0), C.closePath(), C.fill()), y && (C.beginPath(), C.moveTo(0, b), C.lineTo(50, b), C.stroke()), b += 20, document.getElementById("legendtxt" + LALOLibPlotsIndex).innerHTML += d.legend[v] + "<br>";
      }
    }
    for (var L = 0; L <= LALOLibPlotsIndex; L++) {
      LALOLibPlots[L].replot();
    }
    window.addEventListener && document.getElementById(g).addEventListener("DOMMouseScroll", this.mousezoom, !1), document.getElementById(g).onmousewheel = this.mousezoom, LALOLibPlotsIndex++;
  }

  function colorplot(r) {
    var e, t, a, n, o = 1 / 0, i = -1 / 0, s = 1 / 0, l = -1 / 0, c = 1 / 0,
        u                                                           = -1 / 0, m                                               = type(arguments[0]);
    if ("matrix" == m && 3 == arguments[0].n) {
      e = getCols(arguments[0], [0]), t = getCols(arguments[0], [1]), a = getCols(arguments[0], [2]);
    }
    else if ("matrix" == m && 2 == arguments[0].n && "vector" == type(arguments[1])) {
      e = getCols(arguments[0], [0]), t = getCols(arguments[0], [1]), a = arguments[1];
    }
    else {
      if ("vector" != m || "vector" != type(arguments[1]) || "vector" != type(arguments[2])) {
        return "undefined";
      }
      e = arguments[0], t = arguments[1], a = arguments[2];
    }
    var o = min(e), i = max(e), s = min(t), l = max(t), c = min(a), u = max(a),
        v                                                             = i - o, p = Math.max(l - s, 1);
    i += .1 * v, o -= .1 * v, l += .1 * p, s -= .1 * p, s > 0 && (s = -.1 * l), l < 0 && (l = -.1 * s);
    var f = {
      x: e,
      y: t,
      z: a,
      minX: o,
      maxX: i,
      minY: s,
      maxY: l,
      minZ: c,
      maxZ: u
    }, h  = "LALOLibPlot" + LALOLibPlotsIndex, x = 50;
    LALOLibOutput.innerHTML += "<br><div style='position:relative;left:0px;top:0px;text-align:left;'> <div><a onmousemove='mouseposition(event," + LALOLibPlotsIndex + ");' onmousedown='mousestartmove(event," + LALOLibPlotsIndex + ");' onmouseup='mousestopmove(event);' onmouseleave='mousestopmove(event);' ondblclick='zoomoriginal(" + LALOLibPlotsIndex + ");'><canvas id='" + h + "'  width='500' height='500' style='border: 1px solid black;'></canvas></a></div> <label id='lblposition" + LALOLibPlotsIndex + "'></label> <div style='position: absolute;left: 550px;top: -1em;'><label id='legendmaxZ" + LALOLibPlotsIndex + "' style='font-family:verdana;font-size:80%;'></label><br>  <canvas id='legend" + LALOLibPlotsIndex + "' width='" + x + "' height='500'></canvas><br><label id='legendminZ" + LALOLibPlotsIndex + "' style='font-family:verdana;font-size:80%;'></label></div> <div id='legendtxt" + LALOLibPlotsIndex + "' style='position: absolute;left: 610px;top: 0;'></div> </div>", LALOLibPlots[LALOLibPlotsIndex] = new ColorPlot(h), LALOLibPlots[LALOLibPlotsIndex].setScale(f.minX, f.maxX, f.minY, f.maxY, f.minZ, f.maxZ), LALOLibPlots[LALOLibPlotsIndex].view(f.minX, f.maxX, f.minY, f.maxY);
    for (var n = 0; n < f.x.length; n++) {
      LALOLibPlots[LALOLibPlotsIndex].addPoint(f.x[n], f.y[n], f.z[n]);
    }
    LALOLibPlots[LALOLibPlotsIndex].replot();
    var x = 50,
        d = document.getElementById("legend" + LALOLibPlotsIndex).getContext("2d"),
        g = document.getElementById("legend" + LALOLibPlotsIndex);
    if (g) {
      var b = g.height;
    }
    else {
      var b = 500;
    }
    for (var t, n = 0; n < LALOLibPlots[LALOLibPlotsIndex].cmap.length; n++) {
      t = Math.floor(n * b / LALOLibPlots[LALOLibPlotsIndex].cmap.length), d.fillStyle = "rgb(" + LALOLibPlots[LALOLibPlotsIndex].cmap[n][0] + "," + LALOLibPlots[LALOLibPlotsIndex].cmap[n][1] + "," + LALOLibPlots[LALOLibPlotsIndex].cmap[n][2] + ")", d.fillRect(0, b - t, x, b / LALOLibPlots[LALOLibPlotsIndex].cmap.length + 1);
    }
    document.getElementById("legendmaxZ" + LALOLibPlotsIndex).innerHTML = f.maxZ.toPrecision(3), document.getElementById("legendminZ" + LALOLibPlotsIndex).innerHTML = f.minZ.toPrecision(3), window.addEventListener && document.getElementById(h).addEventListener("DOMMouseScroll", this.mousezoom, !1), document.getElementById(h).onmousewheel = this.mousezoom, LALOLibPlotsIndex++;
  }

  function plot3(r) {
    for (var e, t, a, n, o, i, s = new Array, l = new Array, c = new Array, u = 0, m = 0; u < arguments.length;) {
      if ("vector" == type(arguments[u])) {
        if (!(u + 2 < arguments.length && "vector" == type(arguments[u + 1]) && "vector" == type(arguments[u + 2]))) {
          return "undefined";
        }
        e = arguments[u], t = arguments[u + 1], a = arguments[u + 2], u += 2;
      }
      else {
        if ("matrix" != type(arguments[u])) {
          return "undefined";
        }
        for (i = arguments[u].length, e = new Array(i), t = new Array(i), a = new Array(i), o = 0; o < i; o++) {
          e[o] = get(arguments[u], o, 0), t[o] = get(arguments[u], o, 1), a[o] = get(arguments[u], o, 2);
        }
      }
      for (n = void 0, u + 1 < arguments.length && "string" == type(arguments[u + 1]) && (n = arguments[u + 1], u++), legend = "", u + 1 < arguments.length && "string" == type(arguments[u + 1]) && (legend = arguments[u + 1], u++), s[m] = new Array, o = 0; o < e.length; o++) {
        s[m][o] = [e[o], t[o], a[o]];
      }
      l[m] = n, c[m] = legend, m++, u++;
    }
    var v = { data: s, styles: l, legend: c },
        p = "LALOLibPlot" + LALOLibPlotsIndex;
    LALOLibOutput.innerHTML += '<br><div style="position:relative;left:0px;top:0px;text-align:left;"> <div><a onmousedown="LALOLibPlots[' + LALOLibPlotsIndex + '].mousedown(event);" onmouseup="LALOLibPlots[' + LALOLibPlotsIndex + '].mouseup(event);" onmousemove="LALOLibPlots[' + LALOLibPlotsIndex + '].mouserotation(event);"><canvas id="' + p + '" width="500" height="500" style="border: 1px solid black;" title="Hold down the mouse button to change the view and use the mousewheel to zoom in or out." ></canvas></a></div><label id="lblposition' + LALOLibPlotsIndex + '"></label> <div style="position: absolute;left: 550px;top: -1em;"> <canvas id="legend' + LALOLibPlotsIndex + '" width="50" height="500"></canvas></div> <div id="legendtxt' + LALOLibPlotsIndex + '" style="position: absolute;left: 610px;top: 0;"></div> </div>';
    var f = 20;
    LALOLibPlots[LALOLibPlotsIndex] = new Plot3D(p), LALOLibPlots[LALOLibPlotsIndex].cameraDistance = 30, LALOLibPlots[LALOLibPlotsIndex].angleX = Math.PI / 10, LALOLibPlots[LALOLibPlotsIndex].angleZ = Math.PI / 10, LALOLibPlots[LALOLibPlotsIndex].axisNameX1 = "x", LALOLibPlots[LALOLibPlotsIndex].axisNameX2 = "y", LALOLibPlots[LALOLibPlotsIndex].axisNameX3 = "z";
    var u, h, x = [1, 2, 3, 4, 5, 0];
    for (u = 0; u < v.data.length; u++) {
      var d = !1, g = !0;
      for ("string" == typeof v.styles[u] ? (v.styles[u].indexOf(".") >= 0 && (d = !1, v.styles[u] = v.styles[u].replace(".", "")), v.styles[u].indexOf("_") >= 0 && (g = !1, v.styles[u] = v.styles[u].replace("_", "")), h = parseColor(v.styles[u]), h < 0 ? h = x.splice(0, 1)[0] : x.splice(x.indexOf(h), 1)) : h = h = x.splice(0, 1)[0], void 0 === h && (h = 0), o = 0; o < v.data[u].length; o++) {
        g && (LALOLibPlots[LALOLibPlotsIndex].X.push(v.data[u][o]), LALOLibPlots[LALOLibPlotsIndex].Y.push(h)), d && o < v.data[u].length - 1 && LALOLibPlots[LALOLibPlotsIndex].plot_line(v.data[u][o], v.data[u][o + 1], "", h);
      }
      if ("" != v.legend[u]) {
        var b = document.getElementById("legend" + LALOLibPlotsIndex).getContext("2d");
        setcolor(b, h), b.lineWidth = "3", g && (b.beginPath(), b.arc(25, f, 5, 0, 2 * Math.PI, !0), b.closePath(), b.fill()), d && (b.beginPath(), b.moveTo(0, f), b.lineTo(50, f), b.stroke()), f += 20, document.getElementById("legendtxt" + LALOLibPlotsIndex).innerHTML += v.legend[u] + "<br>";
      }
    }
    LALOLibPlots[LALOLibPlotsIndex].computeRanges(), LALOLibPlots[LALOLibPlotsIndex].replot(), LALOLibPlotsIndex++;
  }

  function image(r, e) {
    "vector" == type(r) && (r = mat([r]));
    var t, a, n, o = min(r), i = max(r), s = r.length, l = r.n, c = i - o,
        u                                                         = 0, m                                                  = new Array;
    for (a = 0; a < s; a++) {
      var v = r.row(a);
      for (n = 0; n < l; n++) {
        y = mul((v[n] - o) / c, ones(3)), m[u] = [a / s, n / l, y], u++;
      }
    }
    t                                                    = [s, l, o, i];
    var p, f, a, h                                       = { data: m, style: t, title: e },
        x = "LALOLibPlot" + LALOLibPlotsIndex, d = 50, g = 500,
        b                                                = 500, e = h.title;
    e && (LALOLibOutput.innerHTML += "<h3>" + e + "</h3>  ( " + h.style[0] + " by " + h.style[1] + " matrix )"), h.style[1] > g && (g = h.style[1], plotlegend.style.left = g + 60 + "px"), h.style[0] > b && (b = h.style[0]), p = g / h.style[1], f = b / h.style[0];
    var d = 50;
    LALOLibOutput.innerHTML += '<div style="position:relative;left:0px;top:0px;text-align:left;"> <div><a onmousemove="mouseimageposition(event,' + LALOLibPlotsIndex + ');"><canvas id="' + x + '"  width="' + g + '" height="' + b + '" style="border: 1px solid black;"></canvas></a></div><label id="lblposition' + LALOLibPlotsIndex + '"></label> <div style="position: absolute;left: 550px;top: -1em;">' + h.style[2].toFixed(3) + '<br> <canvas id="legend' + LALOLibPlotsIndex + '" width="' + d + '" height="500"></canvas> <br>' + h.style[3].toFixed(3) + " </div>  </div>";
    var M, w, y;
    LALOLibPlots[LALOLibPlotsIndex] = h, LALOLibPlots[LALOLibPlotsIndex].canvasId = x;
    var V = document.getElementById(x);
    if (V.getContext) {
      var C = V.getContext("2d");
      for (a = 0; a < h.data.length; a++) {
        M = V.width * LALOLibPlots[LALOLibPlotsIndex].data[a][1], w = V.height * LALOLibPlots[LALOLibPlotsIndex].data[a][0], y = LALOLibPlots[LALOLibPlotsIndex].data[a][2], C.fillStyle = "rgb(" + Math.floor(255 * (1 - y[0])) + "," + Math.floor(255 * (1 - y[1])) + "," + Math.floor(255 * (1 - y[2])) + ")", C.fillRect(M, w, p + 1, f + 1);
      }
    }
    var L = document.getElementById("legend" + LALOLibPlotsIndex),
        C = L.getContext("2d");
    for (a = 0; a < 255; a++) {
      w = Math.floor(a * L.height / 255), C.fillStyle = "rgb(" + (255 - a) + "," + (255 - a) + "," + (255 - a) + ")", C.fillRect(0, w, d, L.height / 255 + 1);
    }
    LALOLibPlots[LALOLibPlotsIndex].pixelWidth = p, LALOLibPlots[LALOLibPlotsIndex].pixelHeight = f, LALOLibPlotsIndex++;
  }

  function parseColor(r) {
    if (void 0 === r) {
      return -1;
    }
    var e;
    switch (r) {
      case"k":
      case"black":
        e = 0;
        break;
      case"blue":
      case"b":
        e = 1;
        break;
      case"r":
      case"red":
        e = 2;
        break;
      case"g":
      case"green":
        e = 3;
        break;
      case"m":
      case"magenta":
        e = 4;
        break;
      case"y":
      case"yellow":
        e = 5;
        break;
      default:
        e = -1;
    }
    return e;
  }

  function mousezoom(r, e, t) {
    if (r || (r = window.event), r.preventDefault(), void 0 === t) {
      var t = 0;
    }
    if (void 0 === e) {
      var e = 0;
      r.wheelDelta ? e = r.wheelDelta / 30 : r.detail && (e = -r.detail);
    }
    else {
      0 != r.button && (e *= -1);
    }
    var a                                = document.getElementById(LALOLibPlots[t].canvasId),
        n = a.getBoundingClientRect(), o = r.clientX - n.left,
        i                                = r.clientY - n.top;
    LALOLibPlots[t].zoom(1 + e / 30, 1 + e / 30, o, i);
  }

  function zoomoriginal(r) {
    LALOLibPlots[r].resetzoom();
  }

  function mouseposition(r, e) {
    var t                                = document.getElementById(LALOLibPlots[e].canvasId),
        a = t.getBoundingClientRect(), n = r.clientX - a.left,
        o                                = r.clientY - a.top;
    if (LALOLABPLOTMOVING) {
      var i = n - LALOLABPLOTxprev, s = o - LALOLABPLOTyprev;
      (Math.abs(i) > 1 || Math.abs(s) > 1) && LALOLibPlots[e].translate(i, s), LALOLABPLOTxprev = n, LALOLABPLOTyprev = o;
    }
    else {
      var l                                                = n / LALOLibPlots[e].scaleX + LALOLibPlots[e].minX,
          c                                                = (t.height - o) / LALOLibPlots[e].scaleY + LALOLibPlots[e].minY;
      document.getElementById("lblposition" + e).innerHTML = "x = " + l.toFixed(3) + ", y = " + c.toFixed(3);
    }
  }

  function mousestartmove(r, e) {
    if (0 == r.button) {
      LALOLABPLOTMOVING = !0;
      var t             = document.getElementById(LALOLibPlots[e].canvasId),
          a             = t.getBoundingClientRect();
      LALOLABPLOTxprev = r.clientX - a.left, LALOLABPLOTyprev = r.clientY - a.top;
    }
    else {
      LALOLABPLOTMOVING = !1;
    }
  }

  function mousestopmove(r) {
    LALOLABPLOTMOVING = !1;
  }

  function mouseimageposition(r, e) {
    var t                                = document.getElementById(LALOLibPlots[e].canvasId),
        a = t.getBoundingClientRect(), n = r.clientX - a.left,
        o                                = r.clientY - a.top, i = LALOLibPlots[e].style[1],
        s                                = LALOLibPlots[e].style[2], l  = LALOLibPlots[e].style[3],
        c                                = Math.floor(o / LALOLibPlots[e].pixelHeight),
        u                                = Math.floor(n / LALOLibPlots[e].pixelWidth);
    if (u < i) {
      var m                                                = LALOLibPlots[e].data[c * i + u][2][0] * (l - s) + s;
      document.getElementById("lblposition" + e).innerHTML = "Matrix[ " + c + " ][ " + u + " ] = " + m.toFixed(3);
    }
  }

  function lalo(r) {
    var e = laloparse(r);
    return self.eval(e);
  }

  function laloparse(r) {
    var e, t = r.split("\n"), a = "";
    for (e = 0; e < t.length; e++) {
      t[e].length > 0 && (t[e].indexOf("{") >= 0 || t[e].indexOf("}") >= 0 ? (a += t[e], t[e].indexOf("}") >= 0 && (a += " ;\n")) : a += parseCommand(t[e]) + " ;\n");
    }
    return a;
  }

  function parseSplittedCommand(r) {
    var e, t, a, n,
        o = ["==", "!=", ">=", "<=", ">", "<", "\\", ":", "+", "-", ".*", "*", "./", "^", "'"],
        i = ["isEqual", "isNotEqual", "isGreaterOrEqual", "isLowerOrEqual", "isGreater", "isLower", "solve", "range", "add", "sub", "entrywisemul", "mul", "entrywisediv", "pow", "undefined"],
        s = ["", "", "", "", "", "", "", "range", "", "minus", "", "", "", "", "transpose"];
    for (e = 0; e < o.length; e++) {
      var l = r.split(o[e]);
      if (l.length > 1) {
        if ("" != removeSpaces(l[0])) {
          if ("" != removeSpaces(l[1])) {
            for (a = parseSplittedCommand(l[0]), t = 1; t < l.length; t++) {
              n = l[t], a = i[e] + "(" + a + "," + parseSplittedCommand(n) + ")";
            }
            r = a;
          }
          else {
            r = s[e] + "(" + parseSplittedCommand(l[0]) + ")";
          }
        }
        else {
          for (a = s[e] + "(" + parseSplittedCommand(l[1]) + ")", t = 2; t < l.length; t++) {
            n = l[t], a = i[e] + "(" + a + "," + parseSplittedCommand(n) + ")";
          }
          r = a;
        }
      }
    }
    return r;
  }

  function parseAssignment(r) {
    if (r.indexOf("[") < 0) {
      return r;
    }
    var e                                          = removeSpaces(r).replace("=", "").replace(",", "]["),
        t = e.indexOf("]["), a = e.indexOf("["), n = e.substr(0, a);
    if (t >= 0) {
      for (var o = e.substr(a + 1, t - a - 1), i = t + 1; e.indexOf("]", i + 1) >= 0;) {
        i = e.indexOf("]", i + 1);
      }
      var s = e.substr(t + 2, i - (t + 2)), l = o.split(":");
      2 == l.length ? o = "" == l[0] && "" == l[1] ? "[]" : "range(" + l[0] + "," + l[1] + ")" : 3 == l.length && (o = "range(" + l[0] + "," + l[2] + "," + l[1] + ")");
      var c = s.split(":");
      return 2 == c.length ? s = "" == c[0] && "" == c[1] ? "[]" : "range(" + c[0] + "," + c[1] + ")" : 3 == c.length && (s = "range(" + c[0] + "," + c[2] + "," + c[1] + ")"), "set( " + n + "," + o + "," + s + ", ";
    }
    for (var i = a; e.indexOf("]", i + 1) >= 0;) {
      i = e.indexOf("]", i + 1);
    }
    var o = e.substr(a + 1, i - a - 1), l = o.split(":");
    return 2 == l.length ? o = "" == l[0] && "" == l[1] ? "[]" : "range(" + l[0] + "," + l[1] + ")" : 3 == l.length && (o = "range(" + l[0] + "," + l[2] + "," + l[1] + ")"), "set( " + n + "," + o + ", ";
  }

  function parseBrackets(r) {
    var e                = ["[", "(", ",", ";", ")", "\\", "+", "-", "*", "/", ":", "^", "'", "=", ">", "<", "!"];
    r                    = r.split("][").join(",");
    var t, a, n, o, i, s = r.split("");
    for (t = s.length - 1; t >= 0;) {
      for (; t >= 0 && "[" != s[t];) {
        t--;
      }
      if (t >= 0) {
        for (a = t + 1; a < s.length && "]" != s[a];) {
          a++;
        }
        if (!(a < s.length)) {
          return;
        }
        for (o = 0, n = 0; n < t;) {
          e.indexOf(s[n]) >= 0 && (o = n + 1), n++;
        }
        if (i = s.slice(o, t).join(""), "" == removeSpaces(i)) {
          s[t] = "#", n = t + 1;
          for (var l = !1, c = !1; n < a;) {
            s[n], ";" == s[n] && (l = !0, c ? (s.splice(n, 1, ["@", ","]), c = !1) : s[n] = ","), n++;
          }
          s[a] = l ? "$" : "@";
        }
        else {
          for (s[o] = "get(" + i, n = o + 1; n < t; n++) {
            s[n] = "";
          }
          s[t] = ",", s[a] = ")";
        }
      }
      t--;
    }
    return s.join("").split("#").join("mat([").split("$").join("], true)").split("@").join("])");
  }

  function parseCommand(r) {
    var e = r.indexOf("//");
    e >= 0 && (r = r.substr(0, e));
    var t = r.split("==")[0].split("!=")[0].split(">=")[0].split("<=")[0].indexOf("=");
    if (t > 0) {
      var a = parseAssignment(r.substr(0, t + 1)), n = r.substr(t + 1);
      if (a.indexOf("set(") < 0 && void 0 !== self[removeSpaces(n)] && !isScalar(self[removeSpaces(n)])) {
        var o = a + "matrixCopy(" + n + ")";
        return console.log(o), o;
      }
    }
    else {
      var a = "", n = r;
    }
    var i, s, l, c = parseBrackets(n).split(""), u = ["(", "[", ",", ";"],
        m                                          = [")", "]", ",", ";"], v                = "", p        = new Array(c.length),
        f                                          = new Array(c.length);
    for (l = 0; l < c.length; l++) {
      f[l] = l, p[l] = c[l];
    }
    for (i = c.length - 1; i >= 0;) {
      for (; i >= 0 && u.indexOf(c[i]) < 0;) {
        i--;
      }
      if (i >= 0) {
        for (s = i + 1; s < c.length && m.indexOf(c[s]) < 0;) {
          s++;
        }
        if (!(s < c.length)) {
          return "undefined";
        }
        for (v = parseSplittedCommand(p.slice(f[i] + 1, f[s]).join("")), p.splice(f[i] + 1, f[s] - f[i] - 1, v), "," != c[i] && (c[i] = " "), c[s] = " ", l = i + 1; l < s; l++) {
          f[l] = f[i] + 1;
        }
        var h = f[s] - f[i] - 1;
        for (l = s; l < c.length; l++) {
          f[l] += 1 - h;
        }
      }
      i--;
    }
    var o = a + parseSplittedCommand(p.join(""));
    return "set(" == a.substr(0, 4) && (o += " )"), o = parseRangeRange(o), console.log(o), o;
  }

  function parseRangeRange(r) {
    var e, t, a, n, o, i, s = r.split("range(range(");
    for (e = 0; e < s.length - 1; e++) {
      for (n = s[e + 1].split(","), a = n[2].split(")"), i = a[0], t = 0; a[t].indexOf("(") >= 0;) {
        i = i + ")" + a[t + 1], t++;
      }
      o = n[1].substr(0, n[1].length - 1), n[1] = i, n[2] = o + ")" + a.slice(t + 1).join(")"), s[e + 1] = n.join(",");
    }
    return s.join("range(");
  }

  function removeSpaces(r) {
    return r.split(" ").join("");
  }

  function MLlab(r, e) {
    return new Lalolab(r, !0, e);
  }

  function Lalolab(r, e, t) {
    if (this.id = r, this.callbacks = new Array, void 0 === t) {
      var t = "http://mlweb.loria.fr/";
    }
    else {
      t.length > 0 && "/" != t[t.length - 1] && (t = [t, "/"].join(""));
    }
    void 0 !== e && e ? (this.worker = new Worker(t + "mlworker.js"), this.labtype = "ml") : (this.worker = new Worker(t + "lalolibworker.js"), this.labtype = "lalo"), this.worker.onmessage = this.onresult, this.worker.parent = this;
  }

  function importLaloScript(r) {
    var e = new XMLHttpRequest;
    return e.open("GET", r, !1), e.send(), lalo(e.responseText);
  }

  function getObjectWithoutFunc(r) {
    if ("object" != typeof r) {
      return r;
    }
    var e = {};
    for (var t in r) {
      switch (type(r[t])) {
        case"vector":
          e[t] = { type: "vector", data: [].slice.call(r[t]) };
          break;
        case"matrix":
          e[t] = r[t], e[t].val = [].slice.call(r[t].val);
          break;
        case"spvector":
          e[t] = r[t], e[t].val = [].slice.call(r[t].val), e[t].ind = [].slice.call(r[t].ind);
          break;
        case"spmatrix":
          e[t] = r[t], e[t].val = [].slice.call(r[t].val), e[t].cols = [].slice.call(r[t].cols), e[t].rows = [].slice.call(r[t].rows);
          break;
        case"undefined":
          e[t] = r[t];
          break;
        case"function":
          break;
        case"Array":
          e[t] = getObjectWithoutFunc(r[t]), e[t].type = "Array", e[t].length = r[t].length;
          break;
        default:
          e[t] = getObjectWithoutFunc(r[t]);
      }
    }
    return e;
  }

  function renewObject(obj) {
    var to = type(obj);
    switch (to) {
      case"number":
      case"boolean":
      case"string":
      case"undefined":
        return obj;
      case"vector":
        return new Float64Array(obj.data);
      case"matrix":
        return new Matrix(obj.m, obj.n, obj.val);
      case"spvector":
        return new spVector(obj.length, obj.val, obj.ind);
      case"spmatrix":
        return new spMatrix(obj.m, obj.n, obj.val, obj.cols, obj.rows);
      case"object":
        var newobj = {};
        for (var p in obj) {
          newobj[p] = renewObject(obj[p]);
        }
        return newobj;
      case"Array":
        var newobj = new Array(obj.length);
        for (var p in obj) {
          newobj[p] = renewObject(obj[p]);
        }
        return newobj;
      default:
        var typearray = obj.type.split(":"), Class = eval(typearray[0]);
        if (1 == typearray.length) {
          var newobj = new Class;
        }
        else {
          var newobj = new Class(typearray[1]);
        }
        for (var p in obj) {
          newobj[p] = renewObject(obj[p]);
        }
        return "SVM" != typearray[1] && "SVR" != typearray[1] || (newobj.kernelFunc = kernelFunction(newobj.kernel, newobj.kernelpar, "spmatrix" == type(newobj.SV) ? "spvector" : "vector")), "KernelRidgeRegression" == typearray[1] && (newobj.kernelFunc = kernelFunction(newobj.kernel, newobj.kernelpar, "spmatrix" == type(newobj.X) ? "spvector" : "vector")), newobj;
    }
  }

  function load_data(datastring) {
    var i, cmd = "mat( [ ", row, rows = datastring.split("\n"), ri;
    for (i = 0; i < rows.length - 1; i++) {
      "" != (ri = removeFirstSpaces(rows[i])) && (row = ri.replace(/,/g, " ").replace(/ +/g, ","), cmd += "new Float64Array([" + row + "]) ,");
    }
    return ri = removeFirstSpaces(rows[rows.length - 1]), "" != ri ? (row = ri.replace(/,/g, " ").replace(/ +/g, ","), cmd += "new Float64Array([" + row + "]) ] , true) ") : (cmd = cmd.substr(0, cmd.length - 1), cmd += "] , true) "), eval(cmd);
  }

  function removeFirstSpaces(r) {
    for (var e = 0; e < r.length && " " == r[e];) {
      e++;
    }
    return e < r.length ? r.slice(e) : "";
  }

  function notifyProgress(r) {
    postMessage({ progress: r }), console.log("progress: " + r);
  }

  function isZero(r) {
    return Math.abs(r) < EPS;
  }

  function isInteger(r) {
    return Math.floor(r) == r;
  }

  function tic(r) {
    if ("undefined" == typeof TICTOCstartTime && (TICTOCstartTime = new Array), void 0 === r) {
      var r = 0;
    }
    TICTOCstartTime[r] = new Date;
  }

  function toc(r) {
    if (void 0 === r) {
      var r = 0;
    }
    if ("undefined" != typeof TICTOCstartTime && void 0 !== TICTOCstartTime[r]) {
      var e = TICTOCstartTime[r];
      return (new Date - e) / 1e3;
    }
  }

  function type(r) {
    if (null == r) {
      return "undefined";
    }
    if (r.type) {
      return r.type;
    }
    var e = typeof r;
    return "object" == e ? Array.isArray(r) ? isArrayOfNumbers(r) ? "vector" : "Array" : r.buffer ? "vector" : e : e;
  }

  function isArrayOfNumbers(r) {
    for (var e = 0; e < r.length; e++) {
      if ("number" != typeof r[e]) {
        return !1;
      }
    }
    return !0;
  }

  function isScalar(r) {
    switch (typeof r) {
      case"string":
      case"number":
      case"boolean":
        return !0;
      default:
        return "Complex" == type(r);
    }
  }

  function printVector(r) {
    const e = r.length;
    for (var t = "[ ", a = 0; a < e - 1 && a < 5;) {
      t += (isInteger(r[a]) ? r[a] : r[a].toFixed(3)) + "; ", a++;
    }
    return t += a == e - 1 ? (isInteger(r[a]) ? r[a] : r[a].toFixed(3)) + " ]" : "... ] (length = " + e + ")";
  }

  function Matrix(r, e, t) {
    this.length = r, this.m = r, this.n = e, this.size = [r, e], this.type = "matrix", 2 == arguments.length ? this.val = new Float64Array(r * e) : 3 == arguments.length ? this.val = new Float64Array(t) : 4 == arguments.length && (this.val = t);
  }

  function array2mat(r) {
    return mat(r, !0);
  }

  function array2vec(r) {
    return vectorCopy(r);
  }

  function vec2array(r) {
    return Array.apply([], r);
  }

  function size(r, e) {
    var t;
    switch (type(r)) {
      case"string":
      case"boolean":
      case"number":
      case"Complex":
        t = [1, 1];
        break;
      case"vector":
      case"spvector":
      case"ComplexVector":
        t = [r.length, 1];
        break;
      case"matrix":
      case"spmatrix":
      case"ComplexMatrix":
        t = r.size;
        break;
      case"object":
      default:
        t = [1, 1];
    }
    return void 0 === e ? t : t[e - 1];
  }

  function ones(r, e) {
    if (1 == arguments.length || 1 == e) {
      for (var t = new Float64Array(r), a = 0; a < r; a++) {
        t[a] = 1;
      }
      return t;
    }
    var n   = new Matrix(r, e);
    const o = r * e;
    for (var a = 0; a < o; a++) {
      n.val[a] = 1;
    }
    return n;
  }

  function zeros(r, e) {
    return 1 == arguments.length || 1 == e ? new Float64Array(r) : new Matrix(r, e);
  }

  function eye(r, e) {
    if (void 0 === e) {
      var e = r;
    }
    if (1 == r && 1 == e) {
      return 1;
    }
    var t   = zeros(r, e);
    const a = r < e ? r : e;
    for (var n = 0; n < a; n++) {
      t.val[n * (e + 1)] = 1;
    }
    return t;
  }

  function diag(r) {
    var e, t = type(r);
    if ("vector" == t) {
      var a   = zeros(r.length, r.length), n = 0;
      const o = r.length + 1;
      for (e = 0; e < r.length; e++) {
        a.val[n] = r[e], n += o;
      }
      return a;
    }
    if ("matrix" == t) {
      var i   = Math.min(r.m, r.n), s = new Float64Array(i), n = 0;
      const l = r.n + 1;
      for (e = 0; e < i; e++) {
        s[e] = r.val[n], n += l;
      }
      return s;
    }
    if ("ComplexVector" == t) {
      var a   = new ComplexMatrix(r.length, r.length), n = 0;
      const o = r.length + 1;
      for (e = 0; e < r.length; e++) {
        a.re[n] = r.re[e], a.im[n] = r.im[e], n += o;
      }
      return a;
    }
    if ("ComplexMatrix" == t) {
      var i   = Math.min(r.m, r.n), s = new ComplexVector(i), n = 0;
      const l = r.n + 1;
      for (e = 0; e < i; e++) {
        s.re[e] = r.re[n], s.im[e] = r.im[n], n += l;
      }
      return s;
    }
  }

  function vec(r) {
    return new Float64Array(r.val);
  }

  function matrixCopy(r) {
    switch (type(r)) {
      case"vector":
        return vectorCopy(r);
      case"ComplexVector":
        return new ComplexVector(r);
      case"matrix":
        return new Matrix(r.m, r.n, r.val);
      case"ComplexMatrix":
        return new ComplexMatrix(r);
      case"Array":
        return arrayCopy(r);
      case"spvector":
      case"spmatrix":
        return r.copy();
      default:
        return void error("Error in matrixCopy(A): A is not a matrix nor a vector.");
    }
  }

  function vectorCopy(r) {
    return new Float64Array(r);
  }

  function vectorCopyInto(r, e) {
    e.set(r);
  }

  function arrayCopy(r) {
    for (var e = new Array(r.length), t = 0; t < r.length; t++) {
      isScalar(r[t]) ? e[t] = r[t] : e[t] = matrixCopy(r[t]);
    }
    return e;
  }

  function appendRow(r) {
    var e = zeros(r.m + 1, r.n);
    return e.val.set(r.val), e;
  }

  function reshape(r, e, t) {
    var a = void 0, n = type(r);
    return "vector" == n ? e * t != r.length ? error("Error in reshape(a,m,n): a.length = " + r.length + " != m*n") : a = new Matrix(e, t, r) : "matrix" == n ? e * t != r.m * r.n ? error("Error in reshape(A,m,n): A.m * A.n = " + r.m * r.n + " != m*n") : a = 1 == t ? vectorCopy(r.val) : new Matrix(e, t, r.val) : error("Error in reshape(A): A is neither a vector nor a matrix."), a;
  }

  function get(r, e, t) {
    var a = typeof e, n = typeof t;
    if (1 == arguments.length) {
      return matrixCopy(r);
    }
    var o = type(r);
    if ("vector" == o) {
      return "number" == a ? e >= 0 && e < r.length ? r[e] : void error("Error in a[i] = get(a,i): Index i=" + e + " out of bounds [0," + (r.length - 1) + "]") : getSubVector(r, e);
    }
    if ("matrix" == o) {
      return "number" == a && (e = [e]), "number" == n && (t = [t]), 1 == e.length && 1 == t.length ? r.val[e[0] * r.n + t[0]] : 0 == e.length ? getCols(r, t) : 0 == t.length ? getRows(r, e) : getSubMatrix(r, e, t);
    }
    if ("Array" == o) {
      return "number" == a ? r[e] : getSubArray(r, e);
    }
    if ("spmatrix" == o) {
      if ("number" == a && (e = [e]), "number" == n && (t = [t]), 1 == e.length && 1 == t.length) {
        return r.get(e[0], t[0]);
      }
      if (1 == e.length && r.rowmajor) {
        return r.row(e[0]);
      }
      if (1 == t.length && !r.rowmajor) {
        return r.col(t[0]);
      }
      if (0 == t.length) {
        return spgetRows(r, e);
      }
      if (0 == e.length) {
        return spgetCols(r, t);
      }
    }
    else {
      if ("spvector" == o) {
        return "number" == a ? r.get(e) : getSubspVector(r, e);
      }
      if ("ComplexVector" == o) {
        return "number" == a ? r.get(e) : r.getSubVector(e);
      }
      if ("ComplexMatrix" == o) {
        return "number" == a && (e = [e]), "number" == n && (t = [t]), 1 == e.length && 1 == t.length ? r.get(i, j) : 0 == e.length ? r.getCols(t) : 0 == t.length ? r.getRows(e) : r.getSubMatrix(e, t);
      }
    }
  }

  function getSubMatrix(r, e, t) {
    var a, n, o, i = t.length;
    if (1 == i) {
      for (o = new Float64Array(e.length), a = 0; a < e.length; a++) {
        o[a] = r.val[e[a] * r.n + t[0]];
      }
    }
    else {
      o     = new Matrix(e.length, i);
      var s = 0;
      for (a = 0; a < e.length; a++) {
        var l = e[a] * r.n;
        for (n = 0; n < i; n++) {
          o.val[s + n] = r.val[l + t[n]];
        }
        s += i;
      }
    }
    return o;
  }

  function getRows(r, e) {
    var t = e.length;
    if (t > 1) {
      for (var a = new Matrix(t, r.n), n = 0, o = 0; o < t; o++) {
        for (var i = 0; i < r.n; i++) {
          a.val[n + i] = r.val[e[o] * r.n + i];
        }
        n += r.n;
      }
      return a;
    }
    return vectorCopy(r.val.subarray(e[0] * r.n, e[0] * r.n + r.n));
  }

  function getCols(r, e) {
    var t = r.m, a = e.length;
    if (a > 1) {
      for (var n = new Matrix(t, a), o = 0, i = 0, s = 0; s < t; s++) {
        for (var l = 0; l < a; l++) {
          n.val[o + l] = r.val[i + e[l]];
        }
        o += a, i += r.n;
      }
      return n;
    }
    for (var n = new Float64Array(t), o = 0, s = 0; s < t; s++) {
      n[s] = r.val[o + e[0]], o += r.n;
    }
    return n;
  }

  function getSubVector(r, e) {
    const t = e.length;
    for (var a = new Float64Array(t), n = 0; n < t; n++) {
      a[n] = r[e[n]];
    }
    return a;
  }

  function getSubArray(r, e) {
    const t = e.length;
    for (var a = new Array(t), n = 0; n < t; n++) {
      a[n] = r[e[n]];
    }
    return a;
  }

  function getrowref(r, e) {
    return r.val.subarray(e * r.n, (e + 1) * r.n);
  }

  function set(r, e, t, a) {
    var n = typeof e, o = typeof t;
    if (1 != arguments.length) {
      var i = type(r);
      if ("vector" == i) {
        return a = t, "number" == n ? (r[e] = a, a) : (0 == e.length && (e = range(r.length)), 1 == size(a, 1) ? setVectorScalar(r, e, a) : setVectorVector(r, e, a), a);
      }
      if ("matrix" == i) {
        if ("number" == n && (e = [e]), "number" == o && (t = [t]), 1 == e.length && 1 == t.length) {
          return r.val[e[0] * r.n + t[0]] = a, a;
        }
        if (0 == e.length) {
          return setCols(r, t, a), a;
        }
        if (0 == t.length) {
          return setRows(r, e, a), a;
        }
        var s = size(a), l = type(a);
        return 1 == s[0] && 1 == s[1] ? "number" == l ? setMatrixScalar(r, e, t, a) : "vector" == l ? setMatrixScalar(r, e, t, a[0]) : setMatrixScalar(r, e, t, a.val[0]) : 1 == t.length ? setMatrixColVector(r, e, t[0], a) : 1 == e.length ? "vector" == l ? setMatrixRowVector(r, e[0], t, a) : setMatrixRowVector(r, e[0], t, a.val) : setMatrixMatrix(r, e, t, a), a;
      }
      return "ComplexVector" == i ? (a = t, "number" == n ? (r.set(e, a), a) : (0 == e.length && (e = range(r.length)), 1 == size(a, 1) ? r.setVectorScalar(e, a) : r.setVectorVector(e, a), a)) : void 0;
    }
  }

  function setVectorScalar(r, e, t) {
    var a;
    for (a = 0; a < e.length; a++) {
      r[e[a]] = t;
    }
  }

  function setVectorVector(r, e, t) {
    var a;
    for (a = 0; a < e.length; a++) {
      r[e[a]] = t[a];
    }
  }

  function setMatrixScalar(r, e, t, a) {
    var n, o, i = e.length, s = t.length;
    for (n = 0; n < i; n++) {
      for (o = 0; o < s; o++) {
        r.val[e[n] * r.n + t[o]] = a;
      }
    }
  }

  function setMatrixMatrix(r, e, t, a) {
    var n, o, i = e.length, s = t.length;
    for (n = 0; n < i; n++) {
      for (o = 0; o < s; o++) {
        r.val[e[n] * r.n + t[o]] = a.val[n * a.n + o];
      }
    }
  }

  function setMatrixColVector(r, e, t, a) {
    var n, o = e.length;
    for (n = 0; n < o; n++) {
      r.val[e[n] * r.n + t] = a[n];
    }
  }

  function setMatrixRowVector(r, e, t, a) {
    var n, o = t.length;
    for (n = 0; n < o; n++) {
      r.val[e * r.n + t[n]] = a[n];
    }
  }

  function setRows(r, e, t) {
    var a, n, o, i = e.length;
    switch (type(t)) {
      case"vector":
        for (a = 0; a < i; a++) {
          for (o = e[a] * r.n, n = 0; n < t.length; n++) {
            r.val[o + n] = t[n];
          }
        }
        break;
      case"matrix":
        var s = 0;
        for (a = 0; a < i; a++) {
          for (o = e[a] * r.n, n = 0; n < t.n; n++) {
            r.val[o + n] = t.val[s + n];
          }
          s += t.n;
        }
        break;
      default:
        for (a = 0; a < i; a++) {
          for (o = e[a] * r.n, n = 0; n < r.n; n++) {
            r.val[o + n] = t;
          }
        }
    }
  }

  function setCols(r, e, t) {
    var a, n = r.m, o = e.length, i = 0;
    switch (type(t)) {
      case"vector":
        for (a = 0; a < n; a++) {
          for (j = 0; j < o; j++) {
            r.val[i + e[j]] = t[a];
          }
          i += r.n;
        }
        break;
      case"matrix":
        for (a = 0; a < n; a++) {
          for (j = 0; j < o; j++) {
            r.val[i + e[j]] = t.val[a * t.n + j];
          }
          i += r.n;
        }
        break;
      default:
        for (a = 0; a < n; a++) {
          for (j = 0; j < o; j++) {
            r.val[i + e[j]] = t;
          }
          i += r.n;
        }
    }
  }

  function dense(r) {
    return r;
  }

  function supp(r) {
    const e = type(r);
    if ("vector" == e) {
      var t, a = [];
      for (t = 0; t < r.length; t++) {
        isZero(r[t]) || a.push(t);
      }
      return a;
    }
    return "spvector" == e ? new Float64Array(r.ind) : void 0;
  }

  function range(r, e, t) {
    if (void 0 === r) {
      return [];
    }
    if (void 0 === t) {
      var t = 1;
    }
    if (void 0 === e) {
      var e = r;
      r     = 0;
    }
    if (r == e - t) {
      return r;
    }
    if (r == e) {
      return [];
    }
    if (r > e) {
      t > 0 && (t *= -1);
      for (var a = new Array(Math.floor((r - e) / Math.abs(t))), n = 0, o = r; o > e; o += t) {
        a[n] = o, n++;
      }
    }
    else {
      for (var a = new Array(Math.floor((e - r) / t)), n = 0, o = r; o < e; o += t) {
        a[n] = o, n++;
      }
    }
    return a;
  }

  function swaprows(r, e, t) {
    if (e != t) {
      var a = e * r.n, n = t * r.n, o = vectorCopy(r.val.subarray(a, a + r.n));
      r.val.set(vectorCopy(r.val.subarray(n, n + r.n)), a), r.val.set(o, n);
    }
  }

  function swapcols(r, e, t) {
    if (e != t) {
      var a = getCols(r, [e]);
      setCols(r, [e], getCols(r, [t])), setCols(r, [t], a);
    }
  }

  function randnScalar() {
    var r, e, t, a;
    do {
      r = 2 * Math.random() - 1, e = 2 * Math.random() - 1, t = r * r + e * e;
    } while (t >= 1);
    return t = Math.sqrt(-2 * Math.log(t) / t), a = r * t, e * t, a;
  }

  function randn(r, e) {
    var t;
    if (void 0 === r || 1 == r && void 0 === e || 1 == r && 1 == e) {
      return randnScalar();
    }
    if (void 0 === e || 1 == e) {
      t = new Float64Array(r);
      for (var a = 0; a < r; a++) {
        t[a] = randnScalar();
      }
      return t;
    }
    t = zeros(r, e);
    for (var a = 0; a < r * e; a++) {
      t.val[a] = randnScalar();
    }
    return t;
  }

  function randVector(r) {
    for (var e = new Float64Array(r), t = 0; t < r; t++) {
      e[t] = Math.random();
    }
    return e;
  }

  function randMatrix(r, e) {
    const t = r * e;
    for (var a = new Float64Array(t), n = 0; n < t; n++) {
      a[n] = Math.random();
    }
    return new Matrix(r, e, a, !0);
  }

  function rand(r, e) {
    return void 0 === r || 1 == r && void 0 === e || 1 == r && 1 == e ? Math.random() : void 0 === e || 1 == e ? randVector(r) : randMatrix(r, e);
  }

  function randnsparse(r, e, t) {
    var a;
    a = r > 1 ? r : Math.floor(r * e * t);
    var n, o, i, s, l;
    if (void 0 === e) {
      return randn();
    }
    if (void 0 === t || 1 == t) {
      for (n = randperm(e), l = zeros(e), o = 0; o < a; o++) {
        l[n[o]] = randn();
      }
      return l;
    }
    for (l = zeros(e, t), n = randperm(e * t), s = 0; s < a; s++) {
      o = Math.floor(n[s] / t), i = n[s] - o * t, l.val[o * t + i] = randn();
    }
    return l;
  }

  function randsparse(r, e, t) {
    if (void 0 === t) {
      var t = 1;
    }
    var a;
    a = r > 1 ? r : Math.floor(r * e * t);
    var n, o, i, s, l;
    if (void 0 === e) {
      return randn();
    }
    if (1 == t) {
      for (n = randperm(e), l = zeros(e), o = 0; o < a; o++) {
        l[n[o]] = Math.random();
      }
      return l;
    }
    for (l = zeros(e, t), n = randperm(e * t), s = 0; s < a; s++) {
      o = Math.floor(n[s] / t), i = n[s] - o * t, l.val[o * t + i] = Math.random();
    }
    return l;
  }

  function randperm(r) {
    if ("number" == typeof r) {
      var e = range(r);
    }
    else {
      var e = new Float64Array(r);
    }
    var t, a, n;
    for (t = e.length - 1; t > 1; t--) {
      a = Math.floor(Math.random() * t), n = e[a], e[a] = e[t], e[t] = n;
    }
    return e;
  }

  function apply(f, x) {
    if ("function" == typeof f) {
      switch (type(x)) {
        case"number":
          return f(x);
        case"Complex":
          var ComplexFunctions = ["exp", "abs"],
              fc               = ComplexFunctions.indexOf(f.name);
          return fc >= 0 ? eval(ComplexFunctions[fc] + "Complex(x);") : void error("This function has no Complex counterpart (yet).");
        case"vector":
          return applyVector(f, x);
        case"spvector":
          return applyspVector(f, x);
        case"ComplexVector":
          return "abs" == f.name ? absComplex(x) : applyComplexVector(f, x);
        case"matrix":
          return applyMatrix(f, x);
        case"spmatrix":
          return applyspMatrix(f, x);
        case"ComplexMatrix":
          return "abs" == f.name ? absComplex(x) : applyComplexMatrix(f, x);
        default:
          return "undefined";
      }
    }
  }

  function applyVector(r, e) {
    const t = e.length;
    for (var a = new Float64Array(t), n = 0; n < t; n++) {
      a[n] = r(e[n]);
    }
    return a;
  }

  function applyComplexVector(r, e) {
    const t = e.length;
    for (var a = new ComplexVector(t), n = 0; n < t; n++) {
      a.set(n, r(e.get(n)));
    }
    return a;
  }

  function applyComplexMatrix(r, e) {
    const t = e.m, a = e.n;
    for (var n = new ComplexMatrix(t, a), o = 0; o < t; o++) {
      for (var i = 0; i < a; i++) {
        n.set(o, i, r(e.get(o, i)));
      }
    }
    return n;
  }

  function applyMatrix(r, e) {
    return new Matrix(e.m, e.n, applyVector(r, e.val), !0);
  }

  function mul(r, e) {
    var t = size(r), a = size(e);
    switch (isScalar(r) || 1 != t[0] || 1 != t[1] || (r = get(r, 0, 0)), isScalar(e) || 1 != a[0] || 1 != a[1] || (e = get(e, 0, 0)), type(r)) {
      case"number":
        switch (type(e)) {
          case"number":
            return r * e;
          case"Complex":
            return mulComplexReal(e, r);
          case"vector":
            return mulScalarVector(r, e);
          case"spvector":
            return mulScalarspVector(r, e);
          case"ComplexVector":
            return mulScalarComplexVector(r, e);
          case"matrix":
            return mulScalarMatrix(r, e);
          case"spmatrix":
            return mulScalarspMatrix(r, e);
          case"ComplexMatrix":
            return mulScalarComplexMatrix(r, e);
          default:
            return;
        }
        break;
      case"Complex":
        switch (type(e)) {
          case"number":
            return mulComplexReal(r, e);
          case"Complex":
            return mulComplex(r, e);
          case"vector":
            return mulComplexVector(r, e);
          case"ComplexVector":
            return mulComplexComplexVector(r, e);
          case"spvector":
            return mulComplexspVector(r, e);
          case"matrix":
            return mulComplexMatrix(r, e);
          case"ComplexMatrix":
            return mulComplexComplexMatrix(r, e);
          case"spmatrix":
            return mulComplexspMatrix(r, e);
          default:
            return;
        }
        break;
      case"vector":
        switch (type(e)) {
          case"number":
            return mulScalarVector(e, r);
          case"Complex":
            return mulComplexVector(e, r);
          case"vector":
            return r.length != e.length ? void error("Error in mul(a,b) (dot product): a.length = " + r.length + " != " + e.length + " = b.length.") : dot(r, e);
          case"spvector":
            return r.length != e.length ? void error("Error in mul(a,b) (dot product): a.length = " + r.length + " != " + e.length + " = b.length.") : dotspVectorVector(e, r);
          case"ComplexVector":
            return r.length != e.length ? void error("Error in mul(a,b) (dot product): a.length = " + r.length + " != " + e.length + " = b.length.") : dotComplexVectorVector(e, r);
          case"matrix":
            return 1 == e.m ? outerprodVectors(r, e.val) : void error("Inconsistent dimensions in mul(a,B): size(a) = [" + t[0] + "," + t[1] + "], size(B) = [" + a[0] + "," + a[1] + "]");
          case"spmatrix":
            return 1 == e.m ? outerprodVectors(r, fullMatrix(e).val) : void error("Inconsistent dimensions in mul(a,B): size(a) = [" + t[0] + "," + t[1] + "], size(B) = [" + a[0] + "," + a[1] + "]");
          case"ComplexMatrix":
            return 1 == e.m ? transpose(outerprodComplexVectorVector(new ComplexVector(e.re, e.im, !0), r, e.val)) : void error("Inconsistent dimensions in mul(a,B): size(a) = [" + t[0] + "," + t[1] + "], size(B) = [" + a[0] + "," + a[1] + "]");
          default:
            return;
        }
        break;
      case"spvector":
        switch (type(e)) {
          case"number":
            return mulScalarspVector(e, r);
          case"vector":
            return r.length != e.length ? void error("Error in mul(a,b) (dot product): a.length = " + r.length + " != " + e.length + " = b.length.") : dotspVectorVector(r, e);
          case"spvector":
            return r.length != e.length ? void error("Error in mul(a,b) (dot product): a.length = " + r.length + " != " + e.length + " = b.length.") : spdot(e, r);
          case"matrix":
            return 1 == e.m ? outerprodspVectorVector(r, e.val) : void error("Inconsistent dimensions in mul(a,B): size(a) = [" + t[0] + "," + t[1] + "], size(B) = [" + a[0] + "," + a[1] + "]");
          case"spmatrix":
            return 1 == e.m ? outerprodspVectorVector(r, fullMatrix(e).val) : void error("Inconsistent dimensions in mul(a,B): size(a) = [" + t[0] + "," + t[1] + "], size(B) = [" + a[0] + "," + a[1] + "]");
          default:
            return;
        }
        break;
      case"ComplexVector":
        switch (type(e)) {
          case"number":
            return mulScalarComplexVector(e, r);
          case"Complex":
            return mulComplexComplexVector(e, r);
          case"vector":
            return r.length != e.length ? void error("Error in mul(a,b) (dot product): a.length = " + r.length + " != " + e.length + " = b.length.") : dotComplexVectorVector(r, e);
          case"spvector":
            return r.length != e.length ? void error("Error in mul(a,b) (dot product): a.length = " + r.length + " != " + e.length + " = b.length.") : dotComplexVectorspVector(r, e);
          case"matrix":
            return 1 == e.m ? outerprodComplexVectorVector(r, e.val) : void error("Inconsistent dimensions in mul(a,B): size(a) = [" + t[0] + "," + t[1] + "], size(B) = [" + a[0] + "," + a[1] + "]");
          case"spmatrix":
            return 1 == e.m ? outerprodComplexVectorVector(r, fullMatrix(e).val) : void error("Inconsistent dimensions in mul(a,B): size(a) = [" + t[0] + "," + t[1] + "], size(B) = [" + a[0] + "," + a[1] + "]");
          case"ComplexMatrix":
            return 1 == e.m ? outerprodComplexVectors(r, new ComplexVector(e.re, e.im, !0)) : void error("Inconsistent dimensions in mul(a,B): size(a) = [" + t[0] + "," + t[1] + "], size(B) = [" + a[0] + "," + a[1] + "]");
          default:
            return;
        }
        break;
      case"matrix":
        switch (type(e)) {
          case"number":
            return mulScalarMatrix(e, r);
          case"Complex":
            return mulComplexMatrix(e, r);
          case"vector":
            return 1 == r.m ? r.val.length != e.length ? void error("Error in mul(a',b): a.length = " + r.val.length + " != " + e.length + " =  b.length.") : dot(r.val, e) : r.n != e.length ? void error("Error in mul(A,b): A.n = " + r.n + " != " + e.length + " = b.length.") : mulMatrixVector(r, e);
          case"spvector":
            return 1 == r.m ? r.val.length != e.length ? void error("Error in mul(a',b): a.length = " + r.val.length + " != " + e.length + " =  b.length.") : dotspVectorVector(e, r.val) : r.n != e.length ? void error("Error in mul(A,b): A.n = " + r.n + " != " + e.length + " = b.length.") : mulMatrixspVector(r, e);
          case"ComplexVector":
            return 1 == r.m ? r.val.length != e.length ? void error("Error in mul(a',b): a.length = " + r.val.length + " != " + e.length + " =  b.length.") : dotComplexVectorVector(e, r.val) : r.n != e.length ? void error("Error in mul(A,b): A.n = " + r.n + " != " + e.length + " = b.length.") : mulMatrixComplexVector(r, e);
          case"matrix":
            return r.n != e.m ? void error("Error in mul(A,B): A.n = " + r.n + " != " + e.m + " = B.m.") : mulMatrixMatrix(r, e);
          case"spmatrix":
            return r.n != e.m ? void error("Error in mul(A,B): A.n = " + r.n + " != " + e.m + " = B.m.") : mulMatrixspMatrix(r, e);
          case"ComplexMatrix":
            return r.n != e.m ? void error("Error in mul(A,B): A.n = " + r.n + " != " + e.m + " = B.m.") : transpose(mulComplexMatrixMatrix(transpose(e), transpose(r)));
          default:
            return;
        }
        break;
      case"spmatrix":
        switch (type(e)) {
          case"number":
            return mulScalarspMatrix(e, r);
          case"vector":
            return 1 == r.m ? r.n != e.length ? void error("Error in mul(a',b): a.length = " + r.val.length + " != " + e.length + " =  b.length.") : dot(fullMatrix(r).val, e) : r.n != e.length ? void error("Error in mul(A,b): A.n = " + r.n + " != " + e.length + " = b.length.") : mulspMatrixVector(r, e);
          case"spvector":
            return 1 == r.m ? r.n != e.length ? void error("Error in mul(a',b): a.length = " + r.val.length + " != " + e.length + " =  b.length.") : dotspVectorVector(e, fullMatrix(r).val) : r.n != e.length ? void error("Error in mul(A,b): A.n = " + r.n + " != " + e.length + " = b.length.") : mulspMatrixspVector(r, e);
          case"matrix":
            return r.n != e.m ? void error("Error in mul(A,B): A.n = " + r.n + " != " + e.m + " = B.m.") : mulspMatrixMatrix(r, e);
          case"spmatrix":
            return r.n != e.m ? void error("Error in mul(A,B): A.n = " + r.n + " != " + e.m + " = B.m.") : mulspMatrixspMatrix(r, e);
          default:
            return;
        }
        break;
      case"ComplexMatrix":
        switch (type(e)) {
          case"number":
            return mulScalarComplexMatrix(e, r);
          case"Complex":
            return mulComplexComplexMatrix(e, r);
          case"vector":
            return 1 == r.m ? r.val.length != e.length ? void error("Error in mul(a',b): a.length = " + r.val.length + " != " + e.length + " =  b.length.") : dotComplexVectorVector(new ComplexVector(r.re, r.im, !0), e) : r.n != e.length ? void error("Error in mul(A,b): A.n = " + r.n + " != " + e.length + " = b.length.") : mulComplexMatrixVector(r, e);
          case"spvector":
            return 1 == r.m ? r.val.length != e.length ? void error("Error in mul(a',b): a.length = " + r.val.length + " != " + e.length + " =  b.length.") : dotComplexVectorspVector(new ComplexVector(r.re, r.im, !0), e) : r.n != e.length ? void error("Error in mul(A,b): A.n = " + r.n + " != " + e.length + " = b.length.") : mulComplexMatrixspVector(r, e);
          case"ComplexVector":
            return 1 == r.m ? r.val.length != e.length ? void error("Error in mul(a',b): a.length = " + r.val.length + " != " + e.length + " =  b.length.") : dotComplexVectors(new ComplexVector(r.re, r.im, !0), e) : r.n != e.length ? void error("Error in mul(A,b): A.n = " + r.n + " != " + e.length + " = b.length.") : mulComplexMatrixComplexVector(r, e);
          case"matrix":
            return r.n != e.m ? void error("Error in mul(A,B): A.n = " + r.n + " != " + e.m + " = B.m.") : mulComplexMatrixMatrix(r, e);
          case"spmatrix":
            return r.n != e.m ? void error("Error in mul(A,B): A.n = " + r.n + " != " + e.m + " = B.m.") : mulComplexMatrixspMatrix(r, e);
          case"ComplexMatrix":
            return r.n != e.m ? void error("Error in mul(A,B): A.n = " + r.n + " != " + e.m + " = B.m.") : mulComplexMatrices(r, e);
          default:
            return;
        }
        break;
      default:
        return;
    }
  }

  function mulScalarVector(r, e) {
    var t;
    const a = e.length;
    var n   = new Float64Array(e);
    for (t = 0; t < a; t++) {
      n[t] *= r;
    }
    return n;
  }

  function mulScalarMatrix(r, e) {
    return new Matrix(e.m, e.n, mulScalarVector(r, e.val), !0);
  }

  function dot(r, e) {
    const t  = r.length;
    var a, n = 0;
    for (a = 0; a < t; a++) {
      n += r[a] * e[a];
    }
    return n;
  }

  function mulMatrixVector(r, e) {
    const t = r.length;
    for (var a = new Float64Array(t), n = 0, o = 0; o < t; o++) {
      a[o] = dot(r.val.subarray(n, n + r.n), e), n += r.n;
    }
    return a;
  }

  function mulMatrixTransVector(r, e) {
    const t = r.length, a = r.n;
    for (var n = new Float64Array(a), o = 0, i = 0; i < t; i++) {
      for (var s = e[i], l = 0; l < a; l++) {
        n[l] += r.val[o + l] * s;
      }
      o += r.n;
    }
    return n;
  }

  function mulMatrixMatrix(r, e) {
    const t = r.length, a = e.n, n = e.length;
    for (var o, i = r.val, s = e.val, l = new Float64Array(t * a), c = 0, u = 0, m = 0; m < t; m++) {
      for (var v = 0, p = 0; p < n; p++) {
        o = i[c];
        for (var f = 0; f < a; f++) {
          l[u + f] += o * s[v], v++;
        }
        c++;
      }
      u += a;
    }
    return new Matrix(t, a, l, !0);
  }

  function entrywisemulVector(r, e) {
    var t;
    const a = r.length;
    var n   = new Float64Array(a);
    for (t = 0; t < a; t++) {
      n[t] = r[t] * e[t];
    }
    return n;
  }

  function entrywisemulMatrix(r, e) {
    return new Matrix(r.m, r.n, entrywisemulVector(r.val, e.val), !0);
  }

  function entrywisemul(r, e) {
    var t = size(r), a = size(e);
    switch ("number" != typeof r && 1 == t[0] && 1 == t[1] && (r = get(r, 0, 0)), "number" != typeof e && 1 == a[0] && 1 == a[1] && (e = get(e, 0, 0)), type(r)) {
      case"number":
        switch (type(e)) {
          case"number":
            return r * e;
          case"Complex":
            return mulComplexReal(e, r);
          case"vector":
            return mulScalarVector(r, e);
          case"spvector":
            return mulScalarspVector(r, e);
          case"ComplexVector":
            return mulScalarComplexVector(e, r);
          case"matrix":
            return mulScalarMatrix(r, e);
          case"spmatrix":
            return mulScalarspMatrix(r, e);
          case"ComplexMatrix":
            return mulScalarComplexMatrix(e, r);
          default:
            return;
        }
        break;
      case"vector":
        switch (type(e)) {
          case"number":
            return mulScalarVector(e, r);
          case"Complex":
            return mulComplexVector(e, r);
          case"vector":
            return r.length != e.length ? void error("Error in entrywisemul(a,b): a.length = " + r.length + " != " + e.length + " = b.length.") : entrywisemulVector(r, e);
          case"ComplexVector":
            return r.length != e.length ? void error("Error in entrywisemul(a,b): a.length = " + r.length + " != " + e.length + " = b.length.") : entrywisemulComplexVectorVector(e, r);
          case"spvector":
            return r.length != e.length ? void error("Error in entrywisemul(a,b): a.length = " + r.length + " != " + e.length + " = b.length.") : entrywisemulspVectorVector(e, r);
          case"matrix":
          case"spmatrix":
          case"ComplexMatrix":
            return void error("Error in entrywisemul(a,B): a is a vector and B is a matrix.");
          default:
            return;
        }
        break;
      case"spvector":
        switch (type(e)) {
          case"number":
            return mulScalarspVector(e, r);
          case"vector":
            return r.length != e.length ? void error("Error in entrywisemul(a,b): a.length = " + r.length + " != " + e.length + " = b.length.") : entrywisemulspVectorVector(r, e);
          case"spvector":
            return r.length != e.length ? void error("Error in entrywisemul(a,b): a.length = " + r.length + " != " + e.length + " = b.length.") : entrywisemulspVectors(r, e);
          case"matrix":
          case"spmatrix":
            return void error("Error in entrywisemul(a,B): a is a vector and B is a Matrix.");
          default:
            return;
        }
        break;
      case"matrix":
        switch (type(e)) {
          case"number":
            return mulScalarMatrix(e, r);
          case"Complex":
            return mulComplexMatrix(e, r);
          case"vector":
          case"spvector":
          case"ComplexVector":
            return void error("Error in entrywisemul(A,b): A is a Matrix and b is a vector.");
          case"matrix":
            return r.m != e.m || r.n != e.n ? void error("Error in entrywisemul(A,B): size(A) = [" + r.m + "," + r.n + "] != [" + e.m + "," + e.n + "] = size(B).") : entrywisemulMatrix(r, e);
          case"spmatrix":
            return r.m != e.m || r.n != e.n ? void error("Error in entrywisemul(A,B): size(A) = [" + r.m + "," + r.n + "] != [" + e.m + "," + e.n + "] = size(B).") : entrywisemulspMatrixMatrix(e, r);
          case"ComplexMatrix":
            return r.m != e.m || r.n != e.n ? void error("Error in entrywisemul(A,B): size(A) = [" + r.m + "," + r.n + "] != [" + e.m + "," + e.n + "] = size(B).") : entrywisemulComplexMatrixMatrix(e, r);
          default:
            return;
        }
        break;
      case"spmatrix":
        switch (type(e)) {
          case"number":
            return mulScalarspMatrix(e, r);
          case"vector":
          case"spvector":
            return void error("Error in entrywisemul(A,b): A is a Matrix and b is a vector.");
          case"matrix":
            return r.m != e.m || r.n != e.n ? void error("Error in entrywisemul(A,B): size(A) = [" + r.m + "," + r.n + "] != [" + e.m + "," + e.n + "] = size(B).") : entrywisemulspMatrixMatrix(r, e);
          case"spmatrix":
            return r.m != e.m || r.n != e.n ? void error("Error in entrywisemul(A,B): size(A) = [" + r.m + "," + r.n + "] != [" + e.m + "," + e.n + "] = size(B).") : entrywisemulspMatrices(r, e);
          default:
            return;
        }
        break;
      case"ComplexVector":
        switch (type(e)) {
          case"number":
            return mulScalarComplexVector(e, r);
          case"Complex":
            return mulComplexComplexVector(e, r);
          case"vector":
            return r.length != e.length ? void error("Error in entrywisemul(a,b): a.length = " + r.length + " != " + e.length + " = b.length.") : entrywisemulComplexVectorVector(r, e);
          case"ComplexVector":
            return r.length != e.length ? void error("Error in entrywisemul(a,b): a.length = " + r.length + " != " + e.length + " = b.length.") : entrywisemulComplexVectors(r, e);
          case"spvector":
            return r.length != e.length ? void error("Error in entrywisemul(a,b): a.length = " + r.length + " != " + e.length + " = b.length.") : entrywisemulComplexVectorspVector(r, e);
          case"matrix":
          case"spmatrix":
          case"ComplexMatrix":
            return void error("Error in entrywisemul(a,B): a is a vector and B is a matrix.");
          default:
            return;
        }
        break;
      case"ComplexMatrix":
        switch (type(e)) {
          case"number":
            return mulScalarComplexMatrix(e, r);
          case"Complex":
            return mulComplexComplexMatrix(e, r);
          case"vector":
          case"spvector":
          case"ComplexVector":
            return void error("Error in entrywisemul(A,b): A is a Matrix and b is a vector.");
          case"matrix":
            return r.m != e.m || r.n != e.n ? void error("Error in entrywisemul(A,B): size(A) = [" + r.m + "," + r.n + "] != [" + e.m + "," + e.n + "] = size(B).") : entrywisemulComplexMatrixMatrix(r, e);
          case"spmatrix":
            return r.m != e.m || r.n != e.n ? void error("Error in entrywisemul(A,B): size(A) = [" + r.m + "," + r.n + "] != [" + e.m + "," + e.n + "] = size(B).") : entrywisemulComplexMatrixspMatrix(r, e);
          case"ComplexMatrix":
            return r.m != e.m || r.n != e.n ? void error("Error in entrywisemul(A,B): size(A) = [" + r.m + "," + r.n + "] != [" + e.m + "," + e.n + "] = size(B).") : entrywisemulComplexMatrices(r, e);
          default:
            return;
        }
        break;
      default:
        return;
    }
  }

  function saxpy(r, e, t) {
    const a = t.length;
    for (var n = 0; n < a; n++) {
      t[n] += r * e[n];
    }
  }

  function gaxpy(r, e, t) {
    const a = r.m, n = r.n;
    for (var o = 0, i = 0; i < a; i++) {
      t[i] += dot(r.val.subarray(o, o + n), e), o += n;
    }
  }

  function divVectorScalar(r, e) {
    var t;
    const a = r.length;
    var n   = new Float64Array(r);
    for (t = 0; t < a; t++) {
      n[t] /= e;
    }
    return n;
  }

  function divScalarVector(r, e) {
    var t;
    const a = e.length;
    var n   = new Float64Array(a);
    for (t = 0; t < a; t++) {
      n[t] = r / e[t];
    }
    return n;
  }

  function divVectors(r, e) {
    var t;
    const a = r.length;
    var n   = new Float64Array(r);
    for (t = 0; t < a; t++) {
      n[t] /= e[t];
    }
    return n;
  }

  function divMatrixScalar(r, e) {
    return new Matrix(r.m, r.n, divVectorScalar(r.val, e), !0);
  }

  function divScalarMatrix(r, e) {
    return new Matrix(e.m, e.n, divScalarVector(r, e.val), !0);
  }

  function divMatrices(r, e) {
    return new Matrix(r.m, r.n, divVectors(r.val, e.val), !0);
  }

  function entrywisediv(r, e) {
    var t = type(r), a = type(e);
    switch (t) {
      case"number":
        switch (a) {
          case"number":
            return r / e;
          case"vector":
            return divScalarVector(r, e);
          case"matrix":
            return divScalarMatrix(r, e);
          case"spvector":
            return divScalarspVector(r, e);
          case"spmatrix":
            return divScalarspMatrix(r, e);
          default:
            return void error("Error in entrywisediv(a,b): b must be a number, a vector or a matrix.");
        }
        break;
      case"vector":
        switch (a) {
          case"number":
            return divVectorScalar(r, e);
          case"vector":
            return r.length != e.length ? void error("Error in entrywisediv(a,b): a.length = " + r.length + " != " + e.length + " = b.length.") : divVectors(r, e);
          case"spvector":
            error("Error in entrywisediv(a,b): b is a sparse vector with zeros.");
            break;
          default:
            return void error("Error in entrywisediv(a,B): a is a vector and B is a " + a + ".");
        }
        break;
      case"spvector":
        switch (a) {
          case"number":
            return mulScalarspVector(1 / e, r);
          case"vector":
            return r.length != e.length ? void error("Error in entrywisediv(a,b): a.length = " + r.length + " != " + e.length + " = b.length.") : divVectorspVector(r, e);
          case"spvector":
            return void error("Error in entrywisediv(a,b): b is a sparse vector with zeros.");
          default:
            return void error("Error in entrywisediv(a,B): a is a vector and B is a " + a + ".");
        }
        break;
      case"matrix":
        switch (a) {
          case"number":
            return divMatrixScalar(r, e);
          case"matrix":
            return r.m != e.m || r.n != e.n ? void error("Error in entrywisediv(A,B): size(A) = [" + r.m + "," + r.n + "] != [" + e.m + "," + e.n + "] = size(B).") : divMatrices(r, e);
          case"spmatrix":
            return void error("Error in entrywisediv(A,B): B is a sparse matrix with zeros.");
          default:
            return void error("Error in entrywisediv(A,b): a is a matrix and B is a " + a + ".");
        }
      case"spmatrix":
        switch (a) {
          case"number":
            return mulScalarspMatrix(1 / e, r);
          case"matrix":
            return r.m != e.m || r.n != e.n ? void error("Error in entrywisediv(A,B): size(A) = [" + r.m + "," + r.n + "] != [" + e.m + "," + e.n + "] = size(B).") : divMatrixspMatrix(r, e);
          case"spmatrix":
            return void error("Error in entrywisediv(A,B): B is a sparse matrix with zeros.");
          default:
            return void error("Error in entrywisediv(A,b): a is a matrix and B is a " + a + ".");
        }
        break;
      default:
        return void error("Error in entrywisediv(a,b): a must be a number, a vector or a matrix.");
    }
  }

  function outerprodVectors(r, e, t) {
    var a;
    const n = r.length, o = e.length;
    var i   = new Matrix(n, o);
    if (3 == arguments.length) {
      for (a = 0; a < n; a++) {
        i.val.set(mulScalarVector(t * r[a], e), a * o);
      }
    }
    else {
      for (a = 0; a < n; a++) {
        i.val.set(mulScalarVector(r[a], e), a * o);
      }
    }
    return i;
  }

  function outerprod(r, e, t) {
    return "number" == typeof r ? "number" == typeof e ? 2 == arguments.length ? r * e : r * e * t : 2 == arguments.length ? new Matrix(1, e.length, mulScalarVector(r, e), !0) : new Matrix(1, e.length, mulScalarVector(r * t, e), !0) : 1 == r.length ? "number" == typeof e ? 2 == arguments.length ? r[0] * e : r[0] * e * t : 2 == arguments.length ? new Matrix(1, e.length, mulScalarVector(r[0], e), !0) : new Matrix(1, e.length, mulScalarVector(r[0] * t, e), !0) : "number" == typeof e ? 2 == arguments.length ? mulScalarVector(e, r) : mulScalarVector(t * e, r) : 1 == e.length ? 2 == arguments.length ? mulScalarVector(e[0], r) : mulScalarVector(t * e[0], r) : 2 == arguments.length ? outerprodVectors(r, e) : outerprodVectors(r, e, t);
  }

  function addScalarVector(r, e) {
    const t = e.length;
    for (var a = new Float64Array(e), n = 0; n < t; n++) {
      a[n] += r;
    }
    return a;
  }

  function addScalarMatrix(r, e) {
    return new Matrix(e.m, e.n, addScalarVector(r, e.val), !0);
  }

  function addVectors(r, e) {
    const t = r.length;
    for (var a = new Float64Array(r), n = 0; n < t; n++) {
      a[n] += e[n];
    }
    return a;
  }

  function addMatrices(r, e) {
    return new Matrix(r.m, r.n, addVectors(r.val, e.val), !0);
  }

  function add(r, e) {
    const t = type(r), a = type(e);
    if ("number" == t && "number" == a || "string" == t || "string" == a) {
      return r + e;
    }
    if ("number" == t) {
      switch (a) {
        case"Complex":
          return addComplexReal(e, r);
        case"vector":
          return addScalarVector(r, e);
        case"matrix":
          return addScalarMatrix(r, e);
        case"spvector":
          return addScalarspVector(r, e);
        case"spmatrix":
          return addScalarspMatrix(r, e);
        case"ComplexVector":
          return addScalarComplexVector(r, e);
        case"ComplexMatrix":
          return addScalarComplexMatrix(r, e);
        default:
          return;
      }
    }
    else if ("number" == a) {
      switch (t) {
        case"Complex":
          return addComplexReal(r, e);
        case"vector":
          return addScalarVector(e, r);
        case"matrix":
          return addScalarMatrix(e, r);
        case"spvector":
          return addScalarspVector(e, r);
        case"spmatrix":
          return addScalarspMatrix(e, r);
        case"ComplexVector":
          return addScalarComplexVector(e, r);
        case"ComplexMatrix":
          return addScalarComplexMatrix(e, r);
        default:
          return;
      }
    }
    else if ("vector" == t) {
      switch (a) {
        case"vector":
          return r.length != e.length ? void error("Error in add(a,b): a.length = " + r.length + " != " + e.length + " = b.length.") : addVectors(r, e);
        case"spvector":
          return r.length != e.length ? void error("Error in add(a,b): a.length = " + r.length + " != " + e.length + " = b.length.") : addVectorspVector(r, e);
        case"ComplexVector":
          return r.length != e.length ? void error("Error in add(a,b): a.length = " + r.length + " != " + e.length + " = b.length.") : addComplexVectorVector(e, r);
        case"matrix":
        case"spmatrix":
        default:
          return void error("Error in add(a,B): a is a vector and B is a " + a + ".");
      }
    }
    else if ("matrix" == t) {
      switch (a) {
        case"matrix":
          return r.m != e.m || r.n != e.n ? void error("Error in add(A,B): size(A) = [" + r.m + "," + r.n + "] != [" + e.m + "," + e.n + "] = size(B).") : addMatrices(r, e);
        case"spmatrix":
          return r.m != e.m || r.n != e.n ? void error("Error in add(A,B): size(A) = [" + r.m + "," + r.n + "] != [" + e.m + "," + e.n + "] = size(B).") : addMatrixspMatrix(r, e);
        case"ComplexMatrix":
          return r.m != e.m || r.n != e.n ? void error("Error in add(A,B): size(A) = [" + r.m + "," + r.n + "] != [" + e.m + "," + e.n + "] = size(B).") : addComplexMatrixMatrix(e, r);
        case"vector":
        case"spvector":
        default:
          return void error("Error in add(A,b): a is a matrix and B is a " + a + ".");
      }
    }
    else if ("spvector" == t) {
      switch (a) {
        case"vector":
          return r.length != e.length ? void error("Error in add(a,b): a.length = " + r.length + " != " + e.length + " = b.length.") : addVectorspVector(e, r);
        case"spvector":
          return r.length != e.length ? void error("Error in add(a,b): a.length = " + r.length + " != " + e.length + " = b.length.") : addspVectors(r, e);
        case"matrix":
        case"spmatrix":
        default:
          return void error("Error in add(a,B): a is a sparse vector and B is a " + a + ".");
      }
    }
    else if ("spmatrix" == t) {
      switch (a) {
        case"matrix":
          return r.m != e.m || r.n != e.n ? void error("Error in add(A,B): size(A) = [" + r.m + "," + r.n + "] != [" + e.m + "," + e.n + "] = size(B).") : addMatrixspMatrix(e, r);
        case"spmatrix":
          return r.m != e.m || r.n != e.n ? void error("Error in add(A,B): size(A) = [" + r.m + "," + r.n + "] != [" + e.m + "," + e.n + "] = size(B).") : addspMatrices(r, e);
        case"vector":
        case"spvector":
        default:
          return void error("Error in add(A,b): a is a sparse matrix and B is a " + a + ".");
      }
    }
    else if ("ComplexVector" == t) {
      switch (a) {
        case"vector":
          return r.length != e.length ? void error("Error in add(a,b): a.length = " + r.length + " != " + e.length + " = b.length.") : addComplexVectorVector(r, e);
        case"spvector":
          return r.length != e.length ? void error("Error in add(a,b): a.length = " + r.length + " != " + e.length + " = b.length.") : addComplexVectorspVector(r, e);
        case"ComplexVector":
          return r.length != e.length ? void error("Error in add(a,b): a.length = " + r.length + " != " + e.length + " = b.length.") : addComplexVectors(e, r);
        case"matrix":
        case"spmatrix":
        default:
          return void error("Error in add(a,B): a is a vector and B is a " + a + ".");
      }
    }
    else {
      if ("ComplexMatrix" != t) {
        return;
      }
      switch (a) {
        case"matrix":
          return r.m != e.m || r.n != e.n ? void error("Error in add(A,B): size(A) = [" + r.m + "," + r.n + "] != [" + e.m + "," + e.n + "] = size(B).") : addComplexMatrixMatrix(r, e);
        case"spmatrix":
          return r.m != e.m || r.n != e.n ? void error("Error in add(A,B): size(A) = [" + r.m + "," + r.n + "] != [" + e.m + "," + e.n + "] = size(B).") : addComplexMatrixspMatrix(r, e);
        case"ComplexMatrix":
          return r.m != e.m || r.n != e.n ? void error("Error in add(A,B): size(A) = [" + r.m + "," + r.n + "] != [" + e.m + "," + e.n + "] = size(B).") : addComplexMatrices(r, e);
        case"vector":
        case"spvector":
        default:
          return void error("Error in add(A,b): a is a matrix and B is a " + a + ".");
      }
    }
  }

  function subScalarVector(r, e) {
    const t = e.length;
    for (var a = new Float64Array(t), n = 0; n < t; n++) {
      a[n] = r - e[n];
    }
    return a;
  }

  function subVectorScalar(r, e) {
    const t = r.length;
    for (var a = new Float64Array(r), n = 0; n < t; n++) {
      a[n] -= e;
    }
    return a;
  }

  function subScalarMatrix(r, e) {
    return new Matrix(e.m, e.n, subScalarVector(r, e.val), !0);
  }

  function subMatrixScalar(r, e) {
    return new Matrix(r.m, r.n, subVectorScalar(r.val, e), !0);
  }

  function subVectors(r, e) {
    const t = r.length;
    for (var a = new Float64Array(r), n = 0; n < t; n++) {
      a[n] -= e[n];
    }
    return a;
  }

  function subMatrices(r, e) {
    return new Matrix(r.m, r.n, subVectors(r.val, e.val), !0);
  }

  function sub(r, e) {
    const t = type(r), a = type(e);
    if ("number" == t && "number" == a) {
      return r - e;
    }
    if ("number" == t) {
      switch (a) {
        case"Complex":
          return addComplexReal(minusComplex(e), r);
        case"vector":
          return subScalarVector(r, e);
        case"matrix":
          return subScalarMatrix(r, e);
        case"spvector":
          return subScalarspVector(r, e);
        case"spmatrix":
          return subScalarspMatrix(r, e);
        default:
          return;
      }
    }
    else if ("number" == a) {
      switch (t) {
        case"Complex":
          return addComplexReal(e, -r);
        case"vector":
          return subVectorScalar(r, e);
        case"matrix":
          return subMatrixScalar(r, e);
        case"spvector":
          return addScalarspVector(-e, r);
        case"spmatrix":
          return addScalarspMatrix(-e, r);
        default:
          return;
      }
    }
    else if ("vector" == t) {
      switch (a) {
        case"vector":
          return r.length != e.length ? void error("Error in sub(a,b): a.length = " + r.length + " != " + e.length + " = b.length.") : subVectors(r, e);
        case"spvector":
          return r.length != e.length ? void error("Error in sub(a,b): a.length = " + r.length + " != " + e.length + " = b.length.") : subVectorspVector(r, e);
        case"matrix":
        case"spmatrix":
        default:
          return void error("Error in sub(a,B): a is a vector and B is a " + a + ".");
      }
    }
    else if ("matrix" == t) {
      switch (a) {
        case"matrix":
          return r.m != e.m || r.n != e.n ? void error("Error in sub(A,B): size(A) = [" + r.m + "," + r.n + "] != [" + e.m + "," + e.n + "] = size(B).") : subMatrices(r, e);
        case"spmatrix":
          return r.m != e.m || r.n != e.n ? void error("Error in sub(A,B): size(A) = [" + r.m + "," + r.n + "] != [" + e.m + "," + e.n + "] = size(B).") : subMatrixspMatrix(r, e);
        case"vector":
        case"spvector":
        default:
          return void error("Error in sub(A,b): A is a matrix and b is a " + a + ".");
      }
    }
    else if ("spvector" == t) {
      switch (a) {
        case"vector":
          return r.length != e.length ? void error("Error in sub(a,b): a.length = " + r.length + " != " + e.length + " = b.length.") : subspVectorVector(r, e);
        case"spvector":
          return r.length != e.length ? void error("Error in sub(a,b): a.length = " + r.length + " != " + e.length + " = b.length.") : subspVectors(r, e);
        case"matrix":
        case"spmatrix":
        default:
          return void error("Error in sub(a,B): a is a sparse vector and B is a " + a + ".");
      }
    }
    else {
      if ("spmatrix" != t) {
        return;
      }
      switch (a) {
        case"matrix":
          return r.m != e.m || r.n != e.n ? void error("Error in sub(A,B): size(A) = [" + r.m + "," + r.n + "] != [" + e.m + "," + e.n + "] = size(B).") : subspMatrixMatrix(r, e);
        case"spmatrix":
          return r.m != e.m || r.n != e.n ? void error("Error in sub(A,B): size(A) = [" + r.m + "," + r.n + "] != [" + e.m + "," + e.n + "] = size(B).") : subspMatrices(r, e);
        case"vector":
        case"spvector":
        default:
          return void error("Error in sub(A,b): a is a sparse matrix and B is a " + a + ".");
      }
    }
  }

  function pow(r, e) {
    var t;
    const a = type(r), n = type(e);
    if ("number" == a && "number" == n) {
      return Math.pow(r, e);
    }
    if ("number" == a) {
      if ("vector" == n) {
        var o = zeros(e.length);
        if (!isZero(r)) {
          for (t = 0; t < e.length; t++) {
            o[t] = Math.pow(r, e[t]);
          }
        }
        return o;
      }
      var o = new Matrix(e.m, e.n, pow(r, e.val), !0);
      return o;
    }
    if ("number" == n) {
      if ("vector" == a) {
        var o = zeros(r.length);
        for (t = 0; t < r.length; t++) {
          o[t] = Math.pow(r[t], e);
        }
        return o;
      }
      var o = new Matrix(r.m, r.n, pow(r.val, e), !0);
      return o;
    }
    if ("vector" == a) {
      if ("vector" == n) {
        if (r.length != e.length) {
          return void error("Error in pow(a,b): a.length = " + r.length + " != " + e.length + " = b.length.");
        }
        var o = zeros(r.length);
        for (t = 0; t < r.length; t++) {
          o[t] = Math.pow(r[t], e[t]);
        }
        return o;
      }
      return "undefined";
    }
    if ("vector" == n) {
      return "undefined";
    }
    var o = new Matrix(r.m, r.n, pow(r.val, e.val), !0);
    return o;
  }

  function minus(r) {
    switch (type(r)) {
      case"number":
        return -r;
      case"vector":
        return minusVector(r);
      case"spvector":
        return new spVector(r.length, minusVector(r.val), r.ind);
      case"ComplexVector":
        return minusComplexVector(r);
      case"matrix":
        return new Matrix(r.m, r.n, minusVector(r.val), !0);
      case"spmatrix":
        return new spMatrix(r.m, r.n, minusVector(r.val), r.cols, r.rows);
      case"ComplexMatrix":
        return minusComplexMatrix(r);
      default:
        return;
    }
  }

  function minusVector(r) {
    for (var e = new Float64Array(r.length), t = 0; t < r.length; t++) {
      e[t] = -r[t];
    }
    return e;
  }

  function minusMatrix(r) {
    return new Matrix(r.m, r.n, minusVector(r.val), !0);
  }

  function minVector(r) {
    const e = r.length;
    for (var t = r[0], a = 1; a < e; a++) {
      r[a] < t && (t = r[a]);
    }
    return t;
  }

  function minMatrix(r) {
    return minVector(r.val);
  }

  function minVectorScalar(r, e) {
    for (var t = r.length, a = new Float64Array(r), n = 0; n < t; n++) {
      e < r[n] && (a[n] = e);
    }
    return a;
  }

  function minMatrixScalar(r, e) {
    return new Matrix(r.m, r.n, minVectorScalar(r.val, e), !0);
  }

  function minMatrixRows(r) {
    const e = r.m, t = r.n;
    for (var a, n = new Float64Array(r.val.subarray(0, t)), o = t, i = 1; i < e; i++) {
      for (a = 0; a < t; a++) {
        r.val[o + a] < n[a] && (n[a] = r.val[o + a]);
      }
      o += t;
    }
    return new Matrix(1, t, n, !0);
  }

  function minMatrixCols(r) {
    for (var e = r.m, t = new Float64Array(e), a = 0, n = 0; n < e; n++) {
      t[n] = minVector(r.val.subarray(a, a + r.n)), a += r.n;
    }
    return t;
  }

  function minVectorVector(r, e) {
    const t = r.length;
    for (var a = new Float64Array(r), n = 0; n < t; n++) {
      e[n] < r[n] && (a[n] = e[n]);
    }
    return a;
  }

  function minMatrixMatrix(r, e) {
    return new Matrix(r.m, r.n, minVectorVector(r.val, e.val), !0);
  }

  function min(r, e) {
    var t = type(r);
    if (1 == arguments.length) {
      switch (t) {
        case"vector":
          return minVector(r);
        case"spvector":
          var a = minVector(r.val);
          return a > 0 && r.val.length < r.length ? 0 : a;
        case"matrix":
          return minMatrix(r);
        case"spmatrix":
          var a = minVector(r.val);
          return a > 0 && r.val.length < r.m * r.n ? 0 : a;
        default:
          return r;
      }
    }
    var n = type(e);
    return "spvector" == t && (r = fullVector(r), t = "vector"), "spmatrix" == t && (r = fullMatrix(r), t = "matrix"), "spvector" == n && (e = fullVector(e), n = "vector"), "spmatrix" == n && (e = fullMatrix(e), n = "matrix"), "number" == t && "number" == n ? Math.min(r, e) : "number" == t ? "vector" == n ? minVectorScalar(e, r) : minMatrixScalar(e, r) : "number" == n ? "vector" == t ? minVectorScalar(r, e) : 1 == e ? minMatrixRows(r) : 2 == e ? minMatrixCols(r) : minMatrixScalar(r, e) : "vector" == t ? "vector" == n ? minVectorVector(r, e) : "undefined" : "matrix" == n ? minMatrixMatrix(r, e) : "undefined";
  }

  function maxVector(r) {
    const e = r.length;
    for (var t = r[0], a = 1; a < e; a++) {
      r[a] > t && (t = r[a]);
    }
    return t;
  }

  function maxMatrix(r) {
    return maxVector(r.val);
  }

  function maxVectorScalar(r, e) {
    const t = r.length;
    for (var a = new Float64Array(r), n = 0; n < t; n++) {
      e > r[n] && (a[n] = e);
    }
    return a;
  }

  function maxMatrixScalar(r, e) {
    return maxVectorScalar(r.val, e);
  }

  function maxMatrixRows(r) {
    const e = r.m, t = r.n;
    for (var a, n = new Float64Array(r.val.subarray(0, t)), o = t, i = 1; i < e; i++) {
      for (a = 0; a < t; a++) {
        r.val[o + a] > n[a] && (n[a] = r.val[o + a]);
      }
      o += t;
    }
    return new Matrix(1, t, n, !0);
  }

  function maxMatrixCols(r) {
    const e = r.m;
    for (var t = new Float64Array(e), a = 0, n = 0; n < e; n++) {
      t[n] = maxVector(r.val.subarray(a, a + r.n)), a += r.n;
    }
    return t;
  }

  function maxVectorVector(r, e) {
    for (var t = r.length, a = new Float64Array(r), n = 0; n < t; n++) {
      e[n] > r[n] && (a[n] = e[n]);
    }
    return a;
  }

  function maxMatrixMatrix(r, e) {
    return new Matrix(r.m, r.n, maxVectorVector(r.val, e.val), !0);
  }

  function max(r, e) {
    var t = type(r);
    if (1 == arguments.length) {
      switch (t) {
        case"vector":
          return maxVector(r);
        case"spvector":
          var a = maxVector(r.val);
          return a < 0 && r.val.length < r.length ? 0 : a;
        case"matrix":
          return maxMatrix(r);
        case"spmatrix":
          var a = maxVector(r.val);
          return a < 0 && r.val.length < r.m * r.n ? 0 : a;
        default:
          return r;
      }
    }
    var n = type(e);
    return "spvector" == t && (r = fullVector(r), t = "vector"), "spmatrix" == t && (r = fullMatrix(r), t = "matrix"), "spvector" == n && (e = fullVector(e), n = "vector"), "spmatrix" == n && (e = fullMatrix(e), n = "matrix"), "number" == t && "number" == n ? Math.max(r, e) : "number" == t ? "vector" == n ? maxVectorScalar(e, r) : maxMatrixScalar(e, r) : "number" == n ? "vector" == t ? maxVectorScalar(r, e) : 1 == e ? maxMatrixRows(r) : 2 == e ? maxMatrixCols(r) : maxMatrixScalar(r, e) : "vector" == t ? "vector" == n ? maxVectorVector(r, e) : "undefined" : "matrix" == n ? maxMatrixMatrix(r, e) : "undefined";
  }

  function transposeMatrix(r) {
    var e, t;
    const a = r.m, n = r.n;
    if (a > 1) {
      var o = zeros(n, a), i = 0;
      for (t = 0; t < a; t++) {
        var s = 0;
        for (e = 0; e < n; e++) {
          o.val[s + t] = r.val[i + e], s += a;
        }
        i += n;
      }
      return o;
    }
    return r.val;
  }

  function transposeVector(r) {
    return new Matrix(1, r.length, r);
  }

  function transpose(r) {
    switch (type(r)) {
      case"number":
        return r;
      case"vector":
        var e = new Matrix(1, r.length, r);
        return e;
      case"spvector":
        return transposespVector(r);
      case"ComplexVector":
        var e = new ComplexMatrix(1, r.length, conj(r));
        return e;
      case"matrix":
        return transposeMatrix(r);
      case"spmatrix":
        return transposespMatrix(r);
      case"ComplexMatrix":
        return transposeComplexMatrix(r);
      default:
        return;
    }
  }

  function det(r) {
    const e = r.n;
    if (r.m == e && void 0 !== r.m) {
      if (2 == e) {
        return r.val[0] * r.val[3] - r.val[1] * r.val[2];
      }
      var t, a, n = 0;
      for (t = 0; t < e; t++) {
        var o = 1;
        for (a = 0; a < e; a++) {
          o *= r.val[(t + a) % e * e + a];
        }
        n += o;
      }
      for (t = 0; t < e; t++) {
        var o = 1;
        for (a = 0; a < e; a++) {
          o *= r.val[(t + e - 1 - a) % e * e + a];
        }
        n -= o;
      }
      return n;
    }
  }

  function trace(r) {
    if ("matrix" == type(r)) {
      var e = r.length;
      if (r.m != e) {
        return "undefined";
      }
      for (var t = 0, a = 0; a < e; a++) {
        t += r.val[a * e + a];
      }
      return t;
    }
  }

  function triu(r) {
    var e, t;
    const a = r.n, n = r.m;
    var o   = zeros(n, a), i = n;
    a < n && (i = a);
    var s = 0;
    for (e = 0; e < i; e++) {
      for (t = e; t < a; t++) {
        o.val[s + t] = r.val[s + t];
      }
      s += a;
    }
    return o;
  }

  function tril(r) {
    var e, t;
    const a = r.n, n = r.m;
    var o   = zeros(n, a), i = n;
    a < n && (i = a);
    var s = 0;
    for (e = 0; e < i; e++) {
      for (t = 0; t <= e; t++) {
        o.val[s + t] = r.val[s + t];
      }
      s += a;
    }
    if (n > i) {
      for (e = i; e < n; e++) {
        for (t = 0; t < a; t++) {
          o.val[s + t] = r.val[s + t];
        }
        s += a;
      }
    }
    return o;
  }

  function issymmetric(r) {
    const e = r.m, t = r.n;
    if (e != t) {
      return !1;
    }
    for (var a = 0; a < e; a++) {
      for (var n = 0; n < t; n++) {
        if (r.val[a * t + n] != r.val[n * t + a]) {
          return !1;
        }
      }
    }
    return !0;
  }

  function mat(r, e) {
    var t, a = !1, n = new Array(r.length);
    for (t = 0; t < r.length; t++) {
      n[t] = type(r[t]), "number" == n[t] && (a = !0);
    }
    if (void 0 === e) {
      if ("vector" == type(r)) {
        return new Float64Array(r);
      }
      var e = !0;
      for (t = 0; t < r.length; t++) {
        if ((!Array.isArray(r[t]) || "vector" == n[t]) && (e = !1, "string" == n[t])) {
          return r;
        }
      }
    }
    if (0 == r.length) {
      return [];
    }
    var o, i, s = 0, l = 0;
    if (e) {
      var c = new Array;
      for (t = 0; t < r.length; t++) {
        switch (n[t]) {
          case"matrix":
            c.push(r[t].val), s += r[t].m, l = r[t].n;
            break;
          case"vector":
            if (a) {
              for (var u = 0; u < r[t].length; u++) {
                c.push(r[t][u]);
              }
              l = 1, s += r[t].length;
            }
            else {
              c.push(r[t]), s += 1, l = r[t].length;
            }
            break;
          case"number":
            c.push(r[t]), s += 1, l = 1;
            break;
          case"spvector":
            return spmat(r);
          default:
            return r;
        }
      }
      if (1 == l) {
        var m = new Float64Array(c);
        return m;
      }
      var m = new Matrix(s, l), v = 0;
      for (t = 0; t < c.length; t++) {
        if (c[t].buffer) {
          m.val.set(c[t], v), v += c[t].length;
        }
        else {
          for (i = 0; i < c[t].length; i++) {
            m.val[v + i] = c[t][i];
          }
          v += c[t].length;
        }
      }
      return m;
    }
    for (s = size(r[0], 1), t = 0; t < r.length; t++) {
      if ("matrix" == n[t] ? l += r[t].n : l++, size(r[t], 1) != s) {
        return "undefined";
      }
    }
    var p, c = new Matrix(s, l);
    for (o = 0; o < s; o++) {
      for (p = 0, t = 0; t < r.length; t++) {
        switch (n[t]) {
          case"matrix":
            for (i = 0; i < r[t].n; i++) {
              c.val[o * l + i + p] = r[t].val[o * r[t].n + i];
            }
            p += r[t].n;
            break;
          case"vector":
            c.val[o * l + p] = r[t][o], p++;
            break;
          case"number":
            c.val[o * l + p] = r[t], p++;
        }
      }
    }
    return c;
  }

  function isEqual(r, e) {
    var t, a, n = type(r), o = type(e);
    if ("number" == n && "number" != o) {
      return isEqual(e, r);
    }
    if ("number" != n && "number" == o) {
      switch (n) {
        case"vector":
          for (a = new Float64Array(r.length), t = 0; t < r.length; t++) {
            isZero(r[t] - e) && (a[t] = 1);
          }
          return a;
        case"matrix":
          return a = new Matrix(r.m, r.n, isEqual(r.val, e), !0);
        default:
          return r == e ? 1 : 0;
      }
    }
    else {
      if (n != o) {
        return "undefined";
      }
      switch (n) {
        case"number":
          return isZero(r - e) ? 1 : 0;
        case"vector":
          for (a = new Float64Array(r.length), t = 0; t < r.length; t++) {
            isZero(r[t] - e[t]) && (a[t] = 1);
          }
          return a;
        case"matrix":
          return a = new Matrix(r.m, r.n, isEqual(r.val, e.val), !0);
        default:
          return r == e ? 1 : 0;
      }
    }
  }

  function isNotEqual(r, e) {
    var t, a, n = type(r), o = type(e);
    if ("number" == n && "number" != o) {
      return isNotEqual(e, r);
    }
    if ("number" != n && "number" == o) {
      switch (n) {
        case"vector":
          for (a = new Float64Array(r.length), t = 0; t < r.length; t++) {
            isZero(r[t] - e) || (a[t] = 1);
          }
          return a;
        case"matrix":
          return a = new Matrix(r.m, r.n, isNotEqual(r.val, e), !0);
        default:
          return r != e ? 1 : 0;
      }
    }
    else {
      if (n != o) {
        return "undefined";
      }
      switch (n) {
        case"number":
          return isZero(r - e) ? 0 : 1;
        case"vector":
          for (a = new Float64Array(r.length), t = 0; t < r.length; t++) {
            isZero(get(r, t) - get(e, t)) || (a[t] = 1);
          }
          return a;
        case"matrix":
          return a = new Matrix(r.m, r.n, isNotEqual(r.val, e.val), !0);
        default:
          return r != e ? 1 : 0;
      }
    }
  }

  function isGreater(r, e) {
    var t, a, n = type(r), o = type(e);
    if ("number" == n && "number" != o) {
      return isGreater(e, r);
    }
    if ("number" != n && "number" == o) {
      switch (n) {
        case"vector":
          for (a = new Float64Array(r.length), t = 0; t < r.length; t++) {
            r[t] - e > EPS && (a[t] = 1);
          }
          return a;
        case"matrix":
          return a = new Matrix(r.m, r.n, isGreater(r.val, e), !0);
        default:
          return r > e ? 1 : 0;
      }
    }
    else {
      if (n != o) {
        return "undefined";
      }
      switch (n) {
        case"number":
          return r > e ? 1 : 0;
        case"vector":
          for (a = new Float64Array(r.length), t = 0; t < r.length; t++) {
            r[t] - e[t] > EPS && (a[t] = 1);
          }
          return a;
        case"matrix":
          return a = new Matrix(r.m, r.n, isGreater(r.val, e.val), !0);
        default:
          return r > e ? 1 : 0;
      }
    }
  }

  function isGreaterOrEqual(r, e) {
    var t, a, n = type(r), o = type(e);
    if ("number" == n && "number" != o) {
      return isGreaterOrEqual(e, r);
    }
    if ("number" != n && "number" == o) {
      switch (n) {
        case"vector":
          for (a = new Float64Array(r.length), t = 0; t < r.length; t++) {
            r[t] - e > -EPS && (a[t] = 1);
          }
          return a;
        case"matrix":
          return a = new Matrix(r.m, r.n, isGreaterOrEqual(r.val, e), !0);
        default:
          return r >= e ? 1 : 0;
      }
    }
    else {
      if (n != o) {
        return "undefined";
      }
      switch (n) {
        case"number":
          return r >= e;
        case"vector":
          for (a = new Float64Array(r.length), t = 0; t < r.length; t++) {
            r[t] - e[t] > -EPS && (a[t] = 1);
          }
          return a;
        case"matrix":
          return a = new Matrix(r.m, r.n, isGreaterOrEqual(r.val, e.val), !0);
        default:
          return r >= e ? 1 : 0;
      }
    }
  }

  function isLower(r, e) {
    var t, a, n = type(r), o = type(e);
    if ("number" == n && "number" != o) {
      return isLower(e, r);
    }
    if ("number" != n && "number" == o) {
      switch (n) {
        case"vector":
          for (a = new Float64Array(r.length), t = 0; t < r.length; t++) {
            e - r[t] > EPS && (a[t] = 1);
          }
          return a;
        case"matrix":
          return a = new Matrix(r.m, r.n, isLower(r.val, e), !0);
        default:
          return r < e ? 1 : 0;
      }
    }
    else {
      if (n != o) {
        return "undefined";
      }
      switch (n) {
        case"number":
          return r < e ? 1 : 0;
        case"vector":
          for (a = new Float64Array(r.length), t = 0; t < r.length; t++) {
            e[t] - r[t] > EPS && (a[t] = 1);
          }
          return a;
        case"matrix":
          return a = new Matrix(r.m, r.n, isLower(r.val, e.val), !0);
        default:
          return r < e ? 1 : 0;
      }
    }
  }

  function isLowerOrEqual(r, e) {
    var t, a, n = type(r), o = type(e);
    if ("number" == n && "number" != o) {
      return isLowerOrEqual(e, r);
    }
    if ("number" != n && "number" == o) {
      switch (n) {
        case"vector":
          for (a = new Float64Array(r.length), t = 0; t < r.length; t++) {
            e - r[t] > -EPS && (a[t] = 1);
          }
          return a;
        case"matrix":
          return a = new Matrix(r.m, r.n, isLowerOrEqual(r.val, e), !0);
        default:
          return r <= e ? 1 : 0;
      }
    }
    else {
      if (n != o) {
        return "undefined";
      }
      switch (n) {
        case"number":
          return r <= e ? 1 : 0;
        case"vector":
          for (a = new Float64Array(r.length), t = 0; t < r.length; t++) {
            e[t] - r[t] > -EPS && (a[t] = 1);
          }
          return a;
        case"matrix":
          return a = new Matrix(r.m, r.n, isLowerOrEqual(r.val, e.val), !0);
        default:
          return r <= e ? 1 : 0;
      }
    }
  }

  function find(r) {
    var e, t = r.length, a = new Array;
    for (e = 0; e < t; e++) {
      0 != r[e] && a.push(e);
    }
    return a;
  }

  function findmax(r) {
    var e;
    switch (type(r)) {
      case"number":
        return 0;
      case"vector":
        var t = 0, a = r[0];
        for (e = 1; e < r.length; e++) {
          r[e] > a && (a = r[e], t = e);
        }
        return t;
      case"spvector":
        var a = r.val[0], t = r.ind[0];
        for (e = 1; e < r.val.length; e++) {
          r.val[e] > a && (a = r.val[e], t = r.ind[e]);
        }
        if (a < 0 && r.val.length < r.length) {
          for (t = 0; r.ind.indexOf(t) >= 0 && t < r.length;) {
            t++;
          }
        }
        return t;
      default:
        return "undefined";
    }
  }

  function findmin(r) {
    var e;
    switch (type(r)) {
      case"number":
        return 0;
      case"vector":
        var t = 0, a = r[0];
        for (e = 1; e < r.length; e++) {
          r[e] < a && (a = r[e], t = e);
        }
        return t;
      case"spvector":
        var a = r.val[0], t = r.ind[0];
        for (e = 1; e < r.val.length; e++) {
          r.val[e] < a && (a = r.val[e], t = r.ind[e]);
        }
        if (a > 0 && r.val.length < r.length) {
          for (t = 0; r.ind.indexOf(t) >= 0 && t < r.length;) {
            t++;
          }
        }
        return t;
      default:
        return "undefined";
    }
  }

  function sort(r, e, t) {
    if (void 0 === e) {
      var e = !1;
    }
    if (void 0 === t) {
      var t = !1;
    }
    var a, n, o;
    const i = r.length;
    if (t) {
      var s = range(i);
      for (a = 0; a < i - 1; a++) {
        n = e ? findmax(get(r, range(a, i))) + a : findmin(get(r, range(a, i))) + a, a != n && (o = r[a], r[a] = r[n], r[n] = o, o = s[a], s[a] = s[n], s[n] = o);
      }
      return s;
    }
    var l = vectorCopy(r);
    for (a = 0; a < i - 1; a++) {
      n = e ? findmax(get(l, range(a, i))) + a : findmin(get(l, range(a, i))) + a, a != n && (o = l[a], l[a] = l[n], l[n] = o);
    }
    return l;
  }

  function sumVector(r) {
    var e;
    const t = r.length;
    var a   = r[0];
    for (e = 1; e < t; e++) {
      a += r[e];
    }
    return a;
  }

  function sumMatrix(r) {
    return sumVector(r.val);
  }

  function sumMatrixRows(r) {
    var e, t;
    const a = r.m, n = r.n;
    var o   = new Float64Array(n), i = 0;
    for (e = 0; e < a; e++) {
      for (t = 0; t < n; t++) {
        o[t] += r.val[i + t];
      }
      i += n;
    }
    return new Matrix(1, n, o, !0);
  }

  function sumMatrixCols(r) {
    const e = r.m;
    for (var t = new Float64Array(e), a = 0, n = 0; n < e; n++) {
      for (var o = 0; o < r.n; o++) {
        t[n] += r.val[a + o];
      }
      a += r.n;
    }
    return t;
  }

  function sum(r, e) {
    switch (type(r)) {
      case"vector":
        return 1 == arguments.length || 1 == e ? sumVector(r) : vectorCopy(r);
      case"spvector":
        return 1 == arguments.length || 1 == e ? sumVector(r.val) : r.copy();
      case"matrix":
        return 1 == arguments.length ? sumMatrix(r) : 1 == e ? sumMatrixRows(r) : 2 == e ? sumMatrixCols(r) : void 0;
      case"spmatrix":
        return 1 == arguments.length ? sumVector(r.val) : 1 == e ? sumspMatrixRows(r) : 2 == e ? sumspMatrixCols(r) : void 0;
      default:
        return r;
    }
  }

  function prodVector(r) {
    var e;
    const t = r.length;
    var a   = r[0];
    for (e = 1; e < t; e++) {
      a *= r[e];
    }
    return a;
  }

  function prodMatrix(r) {
    return prodVector(r.val);
  }

  function prodMatrixRows(r) {
    var e, t;
    const a = r.m, n = r.n;
    var o   = new Float64Array(r.row(0)), i = n;
    for (e = 1; e < a; e++) {
      for (t = 0; t < n; t++) {
        o[t] *= r.val[i + t];
      }
      i += r.n;
    }
    return new Matrix(1, n, o, !0);
  }

  function prodMatrixCols(r) {
    const e = r.m;
    for (var t = new Float64Array(e), a = 0, n = 0; n < e; n++) {
      t[n] = r.val[a];
      for (var o = 1; o < r.n; o++) {
        t[n] *= r.val[a + o];
      }
      a += r.n;
    }
    return t;
  }

  function prod(r, e) {
    switch (type(r)) {
      case"vector":
        return 1 == arguments.length || 1 == e ? prodVector(r) : vectorCopy(r);
      case"spvector":
        return 1 == arguments.length || 1 == e ? r.val.length < r.length ? 0 : prodVector(r.val) : r.copy();
      case"matrix":
        return 1 == arguments.length ? prodMatrix(r) : 1 == e ? prodMatrixRows(r) : 2 == e ? prodMatrixCols(r) : void 0;
      case"spmatrix":
        return 1 == arguments.length ? r.val.length < r.m * r.n ? 0 : prodVector(r.val) : 1 == e ? prodspMatrixRows(r) : 2 == e ? prodspMatrixCols(r) : void 0;
      default:
        return r;
    }
  }

  function mean(r, e) {
    switch (type(r)) {
      case"vector":
        return 1 == arguments.length || 1 == e ? sumVector(r) / r.length : vectorCopy(r);
      case"spvector":
        return 1 == arguments.length || 1 == e ? sumVector(r.val) / r.length : r.copy();
      case"matrix":
        return 1 == arguments.length ? sumMatrix(r) / (r.m * r.n) : 1 == e ? mulScalarMatrix(1 / r.m, sumMatrixRows(r)) : 2 == e ? mulScalarVector(1 / r.n, sumMatrixCols(r)) : void 0;
      case"spmatrix":
        return 1 == arguments.length ? sumVector(r.val) / (r.m * r.n) : 1 == e ? mulScalarMatrix(1 / r.m, sumspMatrixRows(r)) : 2 == e ? mulScalarVector(1 / r.n, sumspMatrixCols(r)) : void 0;
      default:
        return r;
    }
  }

  function variance(r, e) {
    if (arguments.length > 1) {
      var t = mean(r, e);
    }
    else {
      var t = mean(r);
    }
    switch (type(r)) {
      case"number":
        return 0;
      case"vector":
        if (1 == arguments.length || 1 == e) {
          var a = dot(r, r) / r.length - t * t;
          return a;
        }
        return zeros(r.length);
      case"spvector":
        if (1 == arguments.length || 1 == e) {
          var a = dot(r.val, r.val) / r.length - t * t;
          return a;
        }
        return zeros(r.length);
      case"matrix":
      case"spmatrix":
        if (void 0 === e) {
          var a = sum(entrywisemul(r, r)) / (r.m * r.n) - t * t;
          return a;
        }
        if (1 == e) {
          var a = sub(entrywisediv(sum(entrywisemul(r, r), 1), r.length), entrywisemul(t, t));
          return a;
        }
        return 2 == e ? a = sub(entrywisediv(sum(entrywisemul(r, r), 2), r.n), entrywisemul(t, t)) : void 0;
      default:
        return;
    }
  }

  function std(r, e) {
    return arguments.length > 1 ? sqrt(variance(r, e)) : sqrt(variance(r));
  }

  function cov(r) {
    switch (type(r)) {
      case"number":
        return 0;
      case"vector":
        var e = mean(r);
        return dot(r, r) / r.length - e * e;
      case"spvector":
        var e = mean(r);
        return dot(r.val, r.val) / r.length - e * e;
      case"matrix":
        var e = mean(r, 1).row(0);
        return divMatrixScalar(xtx(subMatrices(r, outerprod(ones(r.m), e))), r.m);
      case"spmatrix":
        var e = mean(r, 1).row(0);
        return divMatrixScalar(xtx(subspMatrixMatrix(r, outerprod(ones(r.m), e))), r.m);
      default:
        return;
    }
  }

  function xtx(r) {
    const e = r.m, t = r.n;
    for (var a = new Matrix(t, t), n = 0; n < e; n++) {
      for (var o = r.row(n), i = 0; i < t; i++) {
        for (var s = o[i], l = i; l < t; l++) {
          a.val[i * t + l] += s * o[l];
        }
      }
    }
    for (var i = 0; i < t; i++) {
      for (var c = i * t, l = i; l < t; l++) {
        a.val[l * t + i] = a.val[c + l];
      }
    }
    return a;
  }

  function norm(r, e) {
    var t, a;
    switch (type(r)) {
      case"number":
        return Math.abs(r);
      case"vector":
        return 1 == arguments.length || 1 == e ? Math.sqrt(dot(r, r)) : abs(r);
      case"spvector":
        return 1 == arguments.length || 1 == e ? Math.sqrt(dot(r.val, r.val)) : abs(r);
      case"matrix":
        if (1 == arguments.length) {
          return Math.sqrt(dot(r.val, r.val));
        }
        if (1 == e) {
          const n = r.n;
          var o   = zeros(1, n), i = 0;
          for (t = 0; t < r.m; t++) {
            for (a = 0; a < n; a++) {
              o.val[a] += r.val[i + a] * r.val[i + a];
            }
            i += n;
          }
          for (a = 0; a < n; a++) {
            o.val[a] = Math.sqrt(o.val[a]);
          }
          return o;
        }
        if (2 == e) {
          var o = zeros(r.m), i = 0;
          for (t = 0; t < r.m; t++) {
            for (a = 0; a < r.n; a++) {
              o[t] += r.val[i + a] * r.val[i + a];
            }
            i += r.n, o[t] = Math.sqrt(o[t]);
          }
          return o;
        }
        return "undefined";
      case"spmatrix":
        if (1 == arguments.length) {
          return Math.sqrt(dot(r.val, r.val));
        }
        if (1 != e || r.rowmajor) {
          if (2 == e && r.rowmajor) {
            var o = zeros(r.m);
            for (t = 0; t < r.m; t++) {
              for (var s = r.rows[t], l = r.rows[t + 1], c = s; c < l; c++) {
                o[t] += r.val[c] * r.val[c];
              }
              o[t] = Math.sqrt(o[t]);
            }
            return o;
          }
          return "undefined";
        }
        const u = r.n;
        var o   = zeros(1, u);
        for (a = 0; a < u; a++) {
          for (var s = r.cols[a], l = r.cols[a + 1], c = s; c < l; c++) {
            o.val[a] += r.val[c] * r.val[c];
          }
          o.val[a] = Math.sqrt(o.val[a]);
        }
        return o;
      default:
        return "undefined";
    }
  }

  function norm1(r, e) {
    return 1 == arguments.length ? sum(abs(r)) : sum(abs(r), e);
  }

  function norminf(r, e) {
    return 1 == arguments.length ? max(abs(r)) : max(abs(r), e);
  }

  function normp(r, e, t) {
    return 2 == arguments.length ? Math.pow(sum(pow(abs(r), e)), 1 / e) : pow(sum(pow(abs(r), e), t), 1 / e);
  }

  function normnuc(r) {
    switch (type(r)) {
      case"matrix":
        return sumVector(svd(r));
      case"spmatrix":
        return sumVector(svd(fullMatrix(r)));
      case"number":
        return r;
      case"vector":
      case"spvector":
        return 1;
      default:
        return;
    }
  }

  function norm0(r, e, t) {
    var n = EPS;
    3 == arguments.length && (n = t);
    var o, i;
    switch (type(r)) {
      case"number":
        return Math.abs(r) > n;
      case"vector":
        return 1 == arguments.length || 1 == e ? norm0Vector(r, n) : isGreater(abs(a), n);
      case"spvector":
        return 1 == arguments.length || 1 == e ? norm0Vector(r.val, n) : isGreater(abs(a), n);
      case"matrix":
        if (1 == arguments.length) {
          return norm0Vector(r.val, n);
        }
        if (1 == e) {
          var s = zeros(1, r.n);
          for (o = 0; o < r.m; o++) {
            for (i = 0; i < r.n; i++) {
              Math.abs(r[o * r.n + i]) > n && s.val[i]++;
            }
          }
          return s;
        }
        if (2 == e) {
          var s = zeros(r.m);
          for (o = 0; o < r.m; o++) {
            for (i = 0; i < r.n; i++) {
              Math.abs(r[o * r.n + i]) > n && s[o]++;
            }
          }
          return s;
        }
        return;
      case"spmatrix":
        if (1 == arguments.length) {
          return norm0Vector(r.val, n);
        }
        if (1 == e) {
          var s = zeros(1, r.n);
          if (r.rowmajor) {
            for (var l = 0; l < r.val.length; l++) {
              Math.abs(r.val[l]) > n && s.val[r.cols[l]]++;
            }
          }
          else {
            for (var o = 0; o < r.n; o++) {
              s.val[o] = norm0Vector(r.col(o).val, n);
            }
          }
          return s;
        }
        if (2 == e) {
          var s = zeros(r.m);
          if (r.rowmajor) {
            for (var o = 0; o < r.m; o++) {
              s[o] = norm0Vector(r.row(o).val, n);
            }
          }
          else {
            for (var l = 0; l < r.val.length; l++) {
              Math.abs(r.val[l]) > n && s[r.rows[l]]++;
            }
          }
          return s;
        }
        return;
      default:
        return;
    }
  }

  function norm0Vector(r, e) {
    const t = r.length;
    for (var a = 0, n = 0; n < t; n++) {
      Math.abs(r[n]) > e && a++;
    }
    return a;
  }

  function solve(r, e) {
    var t = type(r);
    if ("vector" == t || "spvector" == t || "matrix" == t && 1 == r.m) {
      var a = mul(transpose(r), r);
      return mul(transpose(r), e) / a;
    }
    return "spmatrix" == t ? spcgnr(r, e) : "vector" == type(e) ? r.m == r.n ? solveGaussianElimination(r, e) : solveWithQRcolumnpivoting(r, e) : solveWithQRcolumnpivotingMultipleRHS(r, e);
  }

  function cholsolve(r, e) {
    var t = forwardsubstitution(r, e);
    return backsubstitution(transposeMatrix(r), t);
  }

  function solveWithQRfactorization(r, e) {
    const t        = r.length, a = r.n;
    var n, o, i, s = qr(r), l = s.R, c = s.beta, u = vectorCopy(e);
    for (n = 0; n < a - 1; n++) {
      o = get(l, range(n, t), n), o[0] = 1, i = get(u, range(n, t)), set(u, range(n, t), sub(i, mul(c[n] * mul(o, i), o)));
    }
    return t > a && (n = a - 1, o = get(l, range(n, t), n), o[0] = 1, i = get(u, range(n, t)), set(u, range(n, t), sub(i, mul(c[n] * mul(o, i), o)))), backsubstitution(l, get(u, range(a)));
  }

  function backsubstitution(r, e) {
    const t = e.length;
    var a   = t - 1, n = zeros(t);
    for (isZero(r.val[a * t + a]) || (n[a] = e[a] / r.val[a * t + a]), a = t - 2, isZero(r.val[a * t + a]) || (n[a] = (e[a] - r.val[a * t + t - 1] * n[t - 1]) / r.val[a * t + a]), a = t - 3; a >= 0; a--) {
      isZero(r.val[a * t + a]) || (n[a] = (e[a] - dot(r.row(a).subarray(a + 1, t), n.subarray(a + 1, t))) / r.val[a * t + a]);
    }
    return n;
  }

  function forwardsubstitution(r, e) {
    const t  = e.length;
    var a, n = zeros(t);
    for (isZero(r.val[0]) || (n[0] = e[0] / r.val[0]), isZero(r.val[t + 1]) || (n[1] = (e[1] - r.val[t] * n[0]) / r.val[t + 1]), a = 2; a < t; a++) {
      isZero(r.val[a * t + a]) || (n[a] = (e[a] - dot(r.row(a).subarray(0, a), n.subarray(0, a))) / r.val[a * t + a]);
    }
    return n;
  }

  function solveWithQRcolumnpivoting(r, e) {
    var t, a, n, o, i, s, l;
    if ("matrix" == type(r)) {
      t = r.m, a = r.n;
      var c = qr(r);
      n = c.R, o = c.V, i = c.beta, s = c.rank, l = c.piv;
    }
    else {
      n = r.R, s = r.rank, o = r.V, i = r.beta, l = r.piv, t = n.m, a = n.n;
    }
    var u, m, v = vectorCopy(e);
    for (u = 0; u < s; u++) {
      m = get(v, range(u, t)), set(v, range(u, t), sub(m, mul(i[u] * mul(o[u], m), o[u])));
    }
    var p = zeros(a);
    for (s > 1 ? set(p, range(0, s), backsubstitution(n, get(v, range(s)))) : p[0] = v[0] / n.val[0], u = s - 1; u >= 0; u--) {
      if (l[u] != u) {
        var f = p[u];
        p[u] = p[l[u]], p[l[u]] = f;
      }
    }
    return p;
  }

  function solveWithQRcolumnpivotingMultipleRHS(r, e) {
    var t, a, n, o, i, s, l;
    if ("matrix" == type(r)) {
      t = r.m, a = r.n;
      var c = qr(r);
      n = c.R, o = c.V, i = c.beta, s = c.rank, l = c.piv;
    }
    else {
      n = r.R, s = r.rank, o = r.V, i = r.beta, l = r.piv, t = n.m, a = n.n;
    }
    var u, m, v = matrixCopy(e);
    for (u = 0; u < s; u++) {
      m = get(v, range(u, t), []), set(v, range(u, t), [], sub(m, mul(mul(i[u], o[u]), mul(transpose(o[u]), m))));
    }
    var p = zeros(a, t);
    if (s > 1) {
      for (u = 0; u < t; u++) {
        set(p, range(0, s), u, backsubstitution(n, get(v, range(s), u)));
      }
    }
    else {
      set(p, 0, [], entrywisediv(get(v, 0, []), n.val[0]));
    }
    for (u = s - 1; u >= 0; u--) {
      l[u] != u && swaprows(p, u, l[u]);
    }
    return p;
  }

  function solveGaussianElimination(r, e) {
    var t, a, n, o = matrixCopy(r).toArrayOfFloat64Array(), i = vectorCopy(e);
    const s        = r.m, l = r.n;
    if (s == l) {
      for (n = 0; n < s; n++) {
        var c = n, u = Math.abs(o[c][n]);
        for (t = n + 1; t < s; t++) {
          var m = Math.abs(o[t][n]);
          m > u && (c = t, u = m);
        }
        if (isZero(u)) {
          return console.log("** Warning in solve(A,b), A is square but singular, switching from Gaussian elimination to QR method."), solveWithQRcolumnpivoting(o, i);
        }
        if (c != n) {
          var v = o[n];
          o[n] = o[c], o[c] = v;
          var p = i[n];
          i[n] = i[c], i[c] = p;
        }
        var f = o[n], h = f[n];
        for (i[n] /= h, a = n + 1; a < l; a++) {
          f[a] /= h;
        }
        Math.abs(h) < 1e-8 && console.log("** Warning in solveGaussianElimination: " + h + " " + n + ":" + s);
        var m, x = i[n];
        for (t = 0; t < s; t++) {
          if (t != n) {
            var d = o[t];
            for (m = d[n], a = n + 1; a < l; a++) {
              d[a] -= m * f[a];
            }
            i[t] -= m * x;
          }
        }
      }
      return i;
    }
  }

  function inv(r) {
    if ("number" == typeof r) {
      return 1 / r;
    }
    var e, t, a;
    const n = r.length, o = r.n;
    if (n != o) {
      return "undefined";
    }
    var i = matrixCopy(r), s = eye(o);
    for (a = 0; a < n; a++) {
      var l = a * o, c = a, u = Math.abs(i.val[c * o + a]);
      for (e = a + 1; e < n; e++) {
        Math.abs(i.val[e * o + a]) > u && (c = e, u = Math.abs(i.val[e * o + a]));
      }
      if (Math.abs(u) < 1e-12) {
        return "singular";
      }
      c != a && (swaprows(i, a, c), swaprows(s, a, c));
      var m = i.val[l + a];
      for (t = 0; t < o; t++) {
        i.val[l + t] /= m, s.val[l + t] /= m;
      }
      Math.abs(m) < 1e-8 && console.log("!! Warning in inv(): " + m + " " + a + ":" + n);
      var v;
      for (e = 0; e < n; e++) {
        if (e != a) {
          var p = e * o;
          if (v = i.val[p + a], !isZero(v)) {
            for (t = 0; t < o; t++) {
              i.val[p + t] -= v * i.val[l + t], s.val[p + t] -= v * s.val[l + t];
            }
          }
        }
      }
    }
    return s;
  }

  function chol(r) {
    const e = r.m;
    if (r.n != e) {
      return void error("Cannot compute the cholesky factorization: the matrix is not square.");
    }
    const t     = e * e, a = r.val;
    var n, o, i = new Float64Array(t), s = Math.sqrt(a[0]);
    for (n = 0; n < t; n += e) {
      i[n] = a[n] / s;
    }
    o = 1;
    for (var l = e; o < e && !isNaN(s);) {
      for (n = l; n < t; n += e) {
        for (var c = a[n + o], u = 0; u < o; u++) {
          c -= i[l + u] * i[n + u];
        }
        n == l && (s = Math.sqrt(c)), i[n + o] = c / s;
      }
      o++, l += e;
    }
    return isNaN(s) ? void 0 : new Matrix(e, e, i, !0);
  }

  function ldlsymmetricpivoting(r) {
    var e = matrixCopy(r), t = e.length;
    if (e.m != t) {
      return void error("Error in ldl(): the matrix is not square.");
    }
    var a, n, o, i = zeros(t);
    for (a = 0; a < t - 1; a++) {
      i[a] = findmax(get(diag(e), range(a, t))), swaprows(e, a, i[a]), swapcols(e, a, i[a]), n = e.val[a * t + a], o = getCols(e, [a]).subarray(a + 1, t);
      for (var s = a + 1; s < t; s++) {
        e.val[s * t + a] /= n;
      }
      set(e, range(a + 1, t), range(a + 1, t), sub(get(e, range(a + 1, t), range(a + 1, t)), outerprod(o, o, 1 / n)));
    }
    for (var l = 0; l < t - 1; l++) {
      for (var a = l + 1; a < t; a++) {
        e.val[l * t + a] = 0;
      }
    }
    return { L: e, piv: i };
  }

  function house(r) {
    const e              = r.length;
    var t, a, n, o, i, s = zeros(e), l = r[0], c = dot(r, r);
    if (i = c - l * l, isZero(i)) {
      n = 0, s[0] = 1;
    }
    else {
      for (a = Math.sqrt(c), o = l < EPS ? l - a : -i / (l + a), n = 2 * o * o / (i + o * o), s[0] = 1, t = 1; t < e; t++) {
        s[t] = r[t] / o;
      }
    }
    return { v: s, beta: n };
  }

  function qroriginal(r, e) {
    var t = r.length, a = r.n;
    if (a > t) {
      return "QR factorization unavailable for n > m.";
    }
    var n, o, i, s, l = matrixCopy(r), c = zeros(a), u = new Array;
    for (n = 0; n < a - 1; n++) {
      o = house(get(l, range(n, t), n)), i = get(l, range(n, t), range(n, a)), set(l, range(n, t), range(n, a), subMatrices(i, outerprodVectors(o.v, mulMatrixVector(transposeMatrix(i), o.v), o.beta))), u[n] = o.v, c[n] = o.beta;
    }
    if (t > a && (n = a - 1, i = get(l, range(n, t), n), o = house(i), set(l, range(n, t), a - 1, subVectors(i, mulScalarVector(dot(o.v, i) * o.beta, o.v))), u[n] = vectorCopy(o.v), c[n] = o.beta), e) {
      var m;
      "number" == typeof e ? (m = e, s = eye(t, m)) : (s = eye(t), m = t);
      var v, p = a - 1;
      for (t <= a && (p = a - 2), p >= m && (p = m - 1), n = p; n >= 0; n--) {
        v = get(s, range(n, t), range(n, m)), m > 1 ? n == m - 1 ? set(s, range(n, t), [n], subVectors(v, mulScalarVector(dot(v, u[n]) * c[n], u[n]))) : set(s, range(n, t), range(n, m), sub(v, outerprod(u[n], mul(transpose(v), u[n]), c[n]))) : s = subVectors(v, mulScalarVector(dot(v, u[n]) * c[n], u[n]));
      }
    }
    return { Q: s, R: l, beta: c };
  }

  function qr(r, e) {
    const t                                                       = r.m, a                                              = r.n;
    var n, o, i, s = transpose(r), l = new Array, c = zeros(a), u = zeros(a),
          m                                                       = -1, v                                               = norm(r), p                                  = v;
    var f                                                         = 1e-5 * v;
    f *= f;
    var h                                                         = 0, x                                                  = 0, d = zeros(a);
    for (n = 0; n < a; n++) {
      var g = s.val.subarray(n * s.n, n * s.n + s.n);
      d[n] = dot(g, g), d[n] > h && (h = d[n], x = n);
    }
    for (var b = function (r, e, n) {
      var o, i, l, c = t - r;
      for (o = r; o < a; o++) {
        var u = 0, m = o * t + r, v = s.val.subarray(m, m + c);
        for (l = 0; l < c; l++) {
          u += v[l] * e[l];
        }
        for (u *= n, i = 0; i < c; i++) {
          v[i] -= u * e[i];
        }
      }
    }; h > EPS && m < a - 1 && p > f;) {
      m++, u[m] = x, swaprows(s, m, x), d[x] = d[m], d[m] = h, m < t - 1 ? o = house(s.val.subarray(m * s.n + m, m * s.n + t)) : (o.v = [1], o.beta = 0), m < a - 1 ? b(m, o.v, o.beta) : m < t - 1 && b(m, o.v, o.beta), l[m] = vectorCopy(o.v), c[m] = o.beta, m < a - 1 && (!function (r) {
        var e;
        for (e = r + 1; e < a; e++) {
          var n = s.val[e * t + r];
          d[e] -= n * n;
        }
        for (x = r + 1, h = d[r + 1], e = r + 2; e < a; e++) {
          d[e] > h && (h = d[e], x = e);
        }
      }(m), p = m < t - 1 ? function (r) {
        for (var e, n = 0, o = r + 1, i = o * t; o < a && n <= f;) {
          for (e = r + 1; e < t; e++) {
            var l = s.val[i + e];
            n += l * l;
          }
          o++, i += t;
        }
        return n;
      }(m) : 0);
    }
    if (e) {
      i        = eye(t);
      var M, w = m;
      for (t > m + 1 && (w = m - 1), n = w; n >= 0; n--) {
        if (n == t - 1) {
          i.val[n * t + n] -= c[n] * l[n][0] * l[n][0] * i.val[n * t + n];
        }
        else {
          var y = range(n, t);
          M = get(i, y, y), set(i, y, y, subMatrices(M, outerprodVectors(l[n], mulMatrixVector(transposeMatrix(M), l[n]), c[n])));
        }
      }
    }
    return { Q: i, R: transpose(s), V: l, beta: c, piv: u, rank: m + 1 };
  }

  function qrRnotTransposed(r, e) {
    var t, a, n, o, i, s = r.m, l = r.n, c = matrixCopy(r), u = new Array,
        m                                                     = zeros(l), v = zeros(l), p = -1, f                 = norm(r), h    = f,
        x                                                     = 0, d = 0, g = zeros(l);
    for (a = 0; a < l; a++) {
      var b = getCols(r, [a]);
      g[a] = dot(b, b), g[a] > x && (x = g[a], d = a);
    }
    for (; x > EPS && p < l - 1 && h > 1e-6 * f;) {
      if (p++, v[p] = d, swapcols(c, p, d), g[d] = g[p], g[p] = x, p < s - 1 ? (n = house(get(c, range(p, s), p)), i = get(c, range(p, s), range(p, l))) : (n.v = [1], n.beta = 0, i = c[s - 1][s - 1]), p < l - 1 ? set(c, range(p, s), range(p, l), subMatrices(i, outerprodVectors(n.v, mulMatrixVector(transposeMatrix(i), n.v), n.beta))) : set(c, range(p, s), p, sub(i, mul(n.beta * mul(i, n.v), n.v))), s > p + 1 && (u[p] = vectorCopy(n.v)), m[p] = n.beta, p < l - 1) {
        for (a = p + 1; a < l; a++) {
          g[a] -= c[p][a] * c[p][a];
        }
        for (d = p + 1, x = g[p + 1], a = p + 2; a < l; a++) {
          g[a] > x && (x = g[a], d = a);
        }
        if (p < s - 1) {
          for (h = 0, t = p + 1; t < s; t++) {
            for (a = p + 1; a < l; a++) {
              Rij = c[t][a], h += Rij * Rij;
            }
          }
          h = Math.sqrt(h);
        }
        else {
          h = 0;
        }
      }
    }
    if (e) {
      o        = eye(s);
      var M, w = p;
      for (s > p + 1 && (w = p - 1), a = w; a >= 0; a--) {
        a == s - 1 ? o.val[a * s + a] -= m[a] * u[a][0] * u[a][0] * o.val[a * s + a] : (M = get(o, range(a, s), range(a, s)), set(o, range(a, s), range(a, s), subMatrices(M, outerprodVectors(u[a], mulMatrixVector(transposeMatrix(M), u[a]), m[a]))));
      }
    }
    return { Q: o, R: c, V: u, beta: m, piv: v, rank: p + 1 };
  }

  function solvecg(r, e) {
    return "spmatrix" == r.type ? spsolvecg(r, e) : solvecgdense(r, e);
  }

  function solvecgdense(r, e) {
    const t = r.n, a = r.m;
    var n   = randn(t), o = subVectors(e, mulMatrixVector(r, n)), i = dot(o, o);
    var s   = 1e-8 * norm(e);
    s *= s;
    var l   = vectorCopy(o), c = mulMatrixVector(r, l), u = i / dot(l, c);
    saxpy(u, l, n), saxpy(-u, c, o);
    var m = i;
    i     = dot(o, o);
    for (var v = 1; i > s && v < t;) {
      !function (r, e) {
        for (var t = 0; t < a; t++) {
          l[t] = e[t] + r * l[t];
        }
      }(i / m, o), c = mulMatrixVector(r, l), u = i / dot(l, c), saxpy(u, l, n), saxpy(-u, c, o), m = i, i = dot(o, o), v++;
    }
    return n;
  }

  function cgnr(r, e) {
    return "spmatrix" == r.type ? spcgnr(r, e) : cgnrdense(r, e);
  }

  function cgnrdense(r, e) {
    const t                                         = r.n, a = r.m;
    var n                                           = randn(t), o = transposeMatrix(r),
          i                                         = subVectors(e, mulMatrixVector(r, n));
    var s                                           = 1e-8 * norm(e);
    s *= s;
    var l = mulMatrixVector(o, i), c = dot(l, l), u = vectorCopy(l),
          m                                         = mulMatrixVector(r, u), v = c / dot(m, m);
    saxpy(v, u, n), saxpy(-v, m, i), l = mulMatrixVector(o, i);
    var p = c;
    c     = dot(l, l);
    for (var f = 1; c > s && f < t;) {
      !function (r, e) {
        for (var t = 0; t < a; t++) {
          u[t] = e[t] + r * u[t];
        }
      }(c / p, l), m = mulMatrixVector(r, u), v = c / dot(m, m), saxpy(v, u, n), saxpy(-v, m, i), l = mulMatrixVector(o, i), p = c, c = dot(l, l), f++;
    }
    return n;
  }

  function lanczos(r, e) {
    const t  = EPS * norm(r), a = r.n;
    var n, o = 0, i = vectorCopy(e), s = mulMatrixVector(r, i), l = dot(i, s);
    for (saxpy(-l, i, s), beta = norm(b); beta > t && o < 300;) {
      for (n = 0; n < a; n++) {
        var c = i[n];
        i[n] = s[n] / beta, s[n] = -beta / c;
      }
      var u = mulMatrixVector(r, i);
      for (n = 0; n < a; n++) {
        s[n] += u[n];
      }
      l = dot(i, s), saxpy(-l, i, s), beta = norm(s), o++;
    }
  }

  function tridiagonalize(r, e) {
    var t;
    const a = r.length;
    var n, o;
    if (e) {
      n = r, o = eye(a);
      var i = [], s = [];
    }
    else {
      n = matrixCopy(r);
    }
    var l, c, u, m, v;
    for (t = 0; t < a - 2; t++) {
      Tkp1k = get(n, range(t + 1, a), t), Tkp1kp1 = get(n, range(t + 1, a), range(t + 1, a)), v = house(Tkp1k), l = mulScalarVector(v.beta, mulMatrixVector(Tkp1kp1, v.v)), c = subVectors(l, mulScalarVector(.5 * v.beta * dot(l, v.v), v.v)), m = zeros(a - t - 1), m[0] = norm(Tkp1k), set(n, t, range(t + 1, a), m), set(n, range(t + 1, a), t, m), u = outerprodVectors(v.v, c), set(n, range(t + 1, a), range(t + 1, a), subMatrices(subMatrices(Tkp1kp1, u), transpose(u))), e && (s[t] = v.v, i[t] = v.beta);
    }
    if (e) {
      for (t = a - 3; t >= 0; t--) {
        !function (r, e, t) {
          var n, i, s = zeros(a - r), l = a - r;
          for (n = 0; n < l; n++) {
            var c = (n + r) * a + r;
            for (i = 0; i < l; i++) {
              s[i] += e[n] * o.val[c + i];
            }
          }
          for (n = 0; n < l; n++) {
            var c = (n + r) * a + r, u = t * e[n];
            for (i = 0; i < l; i++) {
              o.val[c + i] -= u * s[i];
            }
          }
        }(t + 1, s[t], i[t]);
      }
      return o;
    }
    return n;
  }

  function givens(r, e, t, a, n) {
    var o, i, s, l;
    return 0 == e ? (o = 1, i = 0) : Math.abs(e) > Math.abs(r) ? (s = -r / e, i = 1 / Math.sqrt(1 + s * s), o = i * s) : (s = -e / r, o = 1 / Math.sqrt(1 + s * s), i = o * s), 5 == arguments.length ? (l = eye(n), l.val[t * n + t] = o, l.val[t * n + a] = i, l.val[a * n + t] = -i, l.val[a * n + a] = o, l) : [o, i];
  }

  function premulGivens(r, e, t, a, n) {
    const o = n.n;
    var i;
    const s = t * o, l = a * o;
    var c, u;
    for (i = 0; i < o; i++) {
      c = n.val[s + i], u = n.val[l + i], n.val[s + i] = r * c - e * u, n.val[l + i] = e * c + r * u;
    }
  }

  function postmulGivens(r, e, t, a, n) {
    const o        = n.length;
    var i, s, l, c = 0;
    for (i = 0; i < o; i++) {
      s = n.val[c + t], l = n.val[c + a], n.val[c + t] = r * s - e * l, n.val[c + a] = e * s + r * l, c += n.n;
    }
  }

  function implicitSymQRWilkinsonShift(r, e) {
    const t = r.length, a = t * (t - 2), n = t * (t - 1),
          o                                = (r.val[a + t - 2] - r.val[n + t - 1]) / 2,
          i                                = r.val[n + t - 2] * r.val[n + t - 2],
          s                                = r.val[n + t - 1] - i / (o + Math.sign(o) * Math.sqrt(o * o + i));
    var l, c                               = r.val[0] - s, u             = r.val[t];
    if (e) {
      var m = new Array(t - 1);
    }
    var v;
    for (v = 0; v < t - 1; v++) {
      if (l = givens(c, u), postmulGivens(l[0], l[1], v, v + 1, r), premulGivens(l[0], l[1], v, v + 1, r), e && (m[v] = [l[0], l[1]]), v < t - 2) {
        var p = t * (v + 1) + v;
        c = r.val[p], u = r.val[p + t];
      }
    }
    return e ? { T: r, cs: m } : r;
  }

  function eig(r, e) {
    var t, a;
    e ? (a = matrixCopy(r), t = tridiagonalize(a, !0)) : a = tridiagonalize(r);
    var n, o;
    const i = r.length;
    var s;
    do {
      for (s = 0; s < i - 1; s++) {
        Math.abs(a.val[s * i + s + 1]) < 1e-12 * (Math.abs(a.val[s * i + s]) + Math.abs(a.val[(s + 1) * i + s + 1])) && (a.val[s * i + s + 1] = 0, a.val[(s + 1) * i + s] = 0);
      }
      if (isZero(a.val[(i - 1) * i + i - 2]) && isZero(a.val[(i - 2) * i + i - 1])) {
        for (n = 1; n < i - 1 && isZero(a.val[(i - n - 1) * i + i - n - 2]) && isZero(a.val[(i - n - 2) * i + i - n - 1]);) {
          n++;
        }
        n >= i - 1 && (n = i);
      }
      else {
        n = 0;
      }
      o = -1;
      var l;
      do {
        for (o++, l = !1, k = o; k < i - n - 1 && 0 == l;) {
          isZero(a.val[(k + 1) * i + k]) && (l = !0), k++;
        }
      } while (l && o + n < i);
      if (n < i) {
        if (e) {
          var c = implicitSymQRWilkinsonShift(get(a, range(o, i - n), range(o, i - n)), !0);
          set(a, range(o, i - n), range(o, i - n), c.T);
          for (var u = 0; u < i - n - o - 1; u++) {
            postmulGivens(c.cs[u][0], c.cs[u][1], o + u, o + u + 1, t);
          }
        }
        else {
          set(a, range(o, i - n), range(o, i - n), implicitSymQRWilkinsonShift(get(a, range(o, i - n), range(o, i - n)), !1));
        }
      }
    } while (n < i);
    return e ? { V: diag(a), U: t } : diag(a);
  }

  function eigs(r, e, t) {
    if (void 0 === e) {
      var e = 1;
    }
    return void 0 === t || 0 == t || "smallest" != t ? 1 == e ? eig_powerIteration(r) : eig_orthogonalIteration(r, e) : 1 == e ? eig_inverseIteration(r, 0) : eig_bisect(r, e);
  }

  function eig_powerIteration(r, e) {
    var t;
    const a = r.length;
    var n;
    n = void 0 === e ? randn(a) : e, n = mulScalarVector(1 / norm(n), n);
    var o = 1;
    for (t = 0; t < 1e3; t++) {
      n = mulMatrixVector(r, n), o = norm(n), n = mulScalarVector(1 / o, n);
    }
    return { v: o, u: n };
  }

  function eig_orthogonalIteration(r, e) {
    if (1 == e) {
      return eig_powerIteration(r);
    }
    var t;
    const a = r.length;
    var n   = randn(a, e), o = norm(n, 1);
    n       = entrywisediv(n, mul(ones(a), o));
    var i;
    var s;
    for (t = 0; t < 1e3 && (i = mulMatrixMatrix(r, n), !(Math.floor(t / 50) == t / 50 && (s = mulMatrixMatrix(transpose(n), i), norm(subMatrices(i, mulMatrixMatrix(n, diag(diag(s))))) < 1e-11))); t++) {
      n = qroriginal(i, e).Q;
    }
    return s = mulMatrixMatrix(transpose(n), mulMatrixMatrix(r, n)), {
      V: diag(s),
      U: n
    };
  }

  function eig_inverseIteration(r, e) {
    var t = 1e-4 * e;
    if (void 0 === a) {
      var a = 100;
    }
    var n;
    const o = r.length;
    for (var i = sub(r, mul(e + t, eye(o))), s = qr(i); s.rank < o;) {
      t *= 10, i = sub(r, mul(e + t, eye(o))), s = qr(i);
    }
    var l       = sub(mul(2, rand(o)), 1);
    l           = mulScalarVector(1 / norm(l), l);
    var c, u, m = norminf(r);
    n           = 0;
    do {
      l = solveWithQRcolumnpivoting(s, l), c = norm(l), l = entrywisediv(l, c), u = mulMatrixVector(i, l), n++;
    } while (n < a && maxVector(absVector(u)) < 1e-10 * m);
    return l;
  }

  function eigenvector(r, e) {
    return eig_inverseIteration(r, e, 2);
  }

  function eig_inverseOrthogonalIteration(r, e) {
    if (1 == e) {
      return eig_inverseIteration(r);
    }
    var t;
    const a = r.length;
    var n   = qr(r), o = randn(a, e), i = norm(o, 1);
    o       = entrywisediv(o, mul(ones(a), i));
    var n, s;
    var l;
    for (t = 0; t < 1e3 && (s = solveWithQRcolumnpivotingMultipleRHS(n, o), !(Math.floor(t / 50) == t / 50 && (l = mulMatrixMatrix(transpose(o), s), norm(subMatrices(s, mulMatrixMatrix(o, l))) < 1e-11))); t++) {
      o = qroriginal(s, e).Q;
    }
    return l = mulMatrixMatrix(transpose(o), mulMatrixMatrix(r, o)), {
      V: diag(l),
      U: o,
      iters: t
    };
  }

  function eig_bisect(r, e) {
    var t, a, n, o = tridiagonalize(r);
    const i        = o.n;
    var s, l       = diag(o), c = zeros(i);
    for (s = 0; s < i - 1; s++) {
      c[s] = o.val[s * i + s + 1];
    }
    for (var u = l[0] - c[0], m = l[0] + c[0], s = 1; s < i; s++) {
      var v = l[s] - c[s] - c[s - 1], p = l[s] + c[s] + c[s - 1];
      v < u && (u = v), p > m && (m = p);
    }
    var f = zeros(e), h = entrywisemul(m, ones(e));
    a     = u;
    for (var x, d = 1; d <= e; d++) {
      for (n = h[d - 1]; Math.abs(n - a) > 1e-10 * (Math.abs(a) + Math.abs(n));) {
        t = (a + n) / 2, x = function (r, e, t, a) {
          var n, o = e[0] - r, i = 0;
          o < EPS && (i = 1);
          var s;
          for (s = 1; s < a; s++) {
            n = e[s] - r - t[s - 1] * t[s - 1] / o, n < EPS && i++, o = Math.abs(n) < EPS ? EPS : n;
          }
          return i;
        }(t, l, c, i), x >= d ? n = t : a = t;
        for (var g = d + 1; g <= e; g++) {
          x >= g && (h[g - 1] = t);
        }
      }
      f[d - 1] = (a + n) / 2;
    }
    var b = eigenvector(r, f[0]), M = mat([b], !1);
    for (d = 1; d < e; d++) {
      var w = 10 * Math.max(EPS, Math.abs(EPS * f[d - 1]));
      f[d] < f[d - 1] + w && (f[d] = f[d - 1] + w), b = eigenvector(r, f[d]), M = mat([M, b], !1), M = qroriginal(M, M.n).Q;
    }
    return { U: M, V: f };
  }

  function bidiagonalize(r, e, t, a) {
    var n;
    const o = r.length, i = r.n;
    var s;
    s       = matrixCopy(r);
    var l;
    if (e) {
      if (t) {
        var c = eye(o, i), u = i;
      }
      else {
        var c = eye(o), u = o;
      }
    }
    if (a) {
      var m = eye(i);
    }
    if (a) {
      var v = function (r, e, t) {
        var a, n, o = i - r - 1;
        for (a = 0; a < i; a++) {
          var s = a * i + r + 1, l = 0;
          for (n = 0; n < o; n++) {
            l += m.val[s + n] * e[n];
          }
          var c = t * l;
          for (n = 0; n < o; n++) {
            m.val[s + n] -= c * e[n];
          }
        }
      };
    }
    if (e) {
      var p = new Array(i), f = new Array(i);
    }
    for (n = 0; n < i; n++) {
      n < o - 1 && (l = house(get(s, range(n, o), n)), function (r, e, t) {
        var a, n, l = zeros(i - r), c = i - r, u = o - r;
        for (a = 0; a < u; a++) {
          var m = (a + r) * i + r;
          for (n = 0; n < c; n++) {
            l[n] += e[a] * s.val[m + n];
          }
        }
        for (a = 0; a < u; a++) {
          var v = t * e[a], m = (a + r) * i + r;
          for (n = 0; n < c; n++) {
            s.val[m + n] -= v * l[n];
          }
        }
      }(n, l.v, l.beta), e && (p[n] = vectorCopy(l.v), f[n] = l.beta)), n < i - 2 && (l = house(s.row(n).subarray(n + 1, i)), function (r, e, t) {
        var a, n, l = i - r - 1;
        for (a = r; a < o; a++) {
          var c = a * i + r + 1, u = 0;
          for (n = 0; n < l; n++) {
            u += s.val[c + n] * e[n];
          }
          var m = t * u;
          for (n = 0; n < l; n++) {
            s.val[c + n] -= m * e[n];
          }
        }
      }(n, l.v, l.beta), a && v(n, l.v, l.beta));
    }
    if (e) {
      var h = Math.min(i - 1, o - 2);
      for (n = h; n >= 0; n--) {
        !function (r, e, t) {
          var a, n, i = zeros(u);
          for (a = r; a < o; a++) {
            var s = a * u, l = a - r;
            for (n = 0; n < u; n++) {
              i[n] += e[l] * c.val[s + n];
            }
          }
          for (a = r; a < o; a++) {
            var m = t * e[a - r], s = a * u;
            for (n = 0; n < u; n++) {
              c.val[s + n] -= m * i[n];
            }
          }
        }(n, p[n], f[n]);
      }
    }
    return e && a ? { U: c, V: m, B: s } : a ? { V: m, B: s } : e ? {
      U: c,
      B: s
    } : s;
  }

  function GolubKahanSVDstep(r, e, t, a, n, o) {
    if ("matrix" != type(r)) {
      return r;
    }
    if (n < 2) {
      return r;
    }
    const i                                          = (e + n - 2) * r.n + t, s               = r.val[i + n - 2],
          l                                          = r.val[i + n - 1];
    var c;
    c                                                = n > 2 ? r.val[(e + n - 3) * r.n + t + n - 2] : 0;
    const u                                          = r.val[(e + n - 1) * r.n + t + n - 1],
          m = (s * s + c * c - u * u - l * l) / 2, v = s * l * s * l,
          p                                          = u * u + l * l - v / (m + Math.sign(m) * Math.sqrt(m * m + v));
    var f, h                                         = -p, x                                 = 0, d                          = e * r.n + t;
    for (f = 0; f < n; f++) {
      h += r.val[d] * r.val[d], x += r.val[d] * r.val[d + 1], d += r.n;
    }
    var g;
    if (o) {
      var b = new Array(n - 1), M = new Array(n - 1);
    }
    for (f = 0; f < n - 1; f++) {
      g = givens(h, x), function (n, o, i, s) {
        var l, c, u, m = e * r.n + t;
        for (l = 0; l < a; l++) {
          c = r.val[m + i], u = r.val[m + s], r.val[m + i] = n * c - o * u, r.val[m + s] = o * c + n * u, m += r.n;
        }
      }(g[0], g[1], f, f + 1), o && (M[f] = [g[0], g[1]]), h = r.val[(e + f) * r.n + t + f], x = r.val[(e + f + 1) * r.n + t + f], g = givens(h, x), function (a, o, i, s) {
        var l;
        const c = (e + i) * r.n + t, u = (e + s) * r.n + t;
        var m, v;
        for (l = 0; l < n; l++) {
          m = r.val[c + l], v = r.val[u + l], r.val[c + l] = a * m - o * v, r.val[u + l] = o * m + a * v;
        }
      }(g[0], g[1], f, f + 1), o && (b[f] = [g[0], g[1]]), f < n - 2 && (h = r.val[(e + f) * r.n + t + f + 1], x = r.val[(e + f) * r.n + t + f + 2]);
    }
    return o ? { csU: b, csV: M } : void 0;
  }

  function svd(r, e) {
    if ("vector" == type(r) || "matrix" == type(r) && 1 == r.n) {
      return {
        U: matrixCopy(r),
        S: ones(1, 1),
        V: ones(1, 1),
        s: [1]
      };
    }
    if (1 == r.m) {
      return {
        U: ones(1, 1),
        S: ones(1, 1),
        V: transpose(r),
        s: [1]
      };
    }
    var t, a = r.length, n = r.n, o = !1;
    if (n > a) {
      o     = !0;
      var i = transposeMatrix(r);
      n = a, a = i.length;
    }
    var s = !1, l = !1, c = !1;
    if (void 0 !== e && !1 !== e) {
      "full" === e ? (s = !0, l = !0, c = !1) : !0 === e || "thin" === e ? (s = !0, l = !0, c = !0) : "string" == typeof e && (e.indexOf("U") >= 0 && (s = !0), e.indexOf("V") >= 0 && (l = !0), e.indexOf("thin") >= 0 && (c = !0));
      var u;
      if (o) {
        var m = s;
        s = l, l = m, u = bidiagonalize(i, s, c, l);
      }
      else {
        u = bidiagonalize(r, s, c, l);
      }
      if (s) {
        var v = transpose(u.U);
      }
      else {
        var v = void 0;
      }
      if (l) {
        var p = u.V, f = transposeMatrix(p);
      }
      else {
        var p = void 0;
      }
      var h = u.B;
    }
    else if (o) {
      var h = bidiagonalize(i, !1, !1, !1);
    }
    else {
      var h = bidiagonalize(matrixCopy(r), !1, !1, !1);
    }
    var x, d, g, b;
    const M = 1e-11;

    // rmm edit
    var num_iterations = 0;

    do {
      // rmm edit
      if (num_iterations++ > 200) {
        throw Error("Infinite loop in lalolib.svd");
      }

      for (t = 0; t < n - 1; t++) {
        Math.abs(h.val[t * h.n + t + 1]) < M * (Math.abs(h.val[t * h.n + t]) + Math.abs(h.val[(t + 1) * h.n + t + 1])) && (h.val[t * h.n + t + 1] = 0);
      }
      if (Math.abs(h.val[(n - 1) * h.n + n - 2]) > M || Math.abs(h.val[(n - 2) * h.n + n - 1]) > M) {
        d = 0;
      }
      else {
        for (d = 1; d < n - 1 && Math.abs(h.val[(n - d - 1) * h.n + n - d - 2]) < M && Math.abs(h.val[(n - d - 2) * h.n + n - d - 1]) < M;) {
          d++;
        }
        d >= n - 1 && (d = n);
      }
      for (g = n - d - 1; g > 0 && !isZero(h.val[(g - 1) * h.n + g]);) {
        g--;
      }
      if (d < n) {
        var w = -1;
        for (b = g; b < n - d - 1; b++) {
          if (Math.abs(h.val[b * h.n + b]) < M) {
            w = b;
            break;
          }
        }
        if (w >= 0) {
          if (w < n - d - 1) {
            for (j = w + 1; j < n; j++) {
              x = givens(-h.val[j * h.n + j], h.val[w * h.n + j]), premulGivens(x[0], x[1], w, j, h), s && premulGivens(x[0], x[1], w, j, v);
            }
          }
          else {
            for (j = w - 1; j >= g; j--) {
              x = givens(h.val[j * h.n * j], h.val[j * h.n + n - d - 1]), postmulGivens(x[0], x[1], j, n - d - 1, h), l && premulGivens(x[0], x[1], j, n - d - 1, f);
            }
          }
        }
        else if (e) {
          for (var y = GolubKahanSVDstep(h, g, g, n - d - g, n - d - g, !0), V = 0; V < n - d - g - 1; V++) {
            s && premulGivens(y.csU[V][0], y.csU[V][1], g + V, g + V + 1, v), l && premulGivens(y.csV[V][0], y.csV[V][1], g + V, g + V + 1, f);
          }
        }
        else {
          GolubKahanSVDstep(h, g, g, n - d - g, n - d - g);
        }
      }
    } while (d < n);
    if (e) {
      l && (p = transposeMatrix(f));
      var C = diag(h);
      zeros(n);
      for (t = 0; t < n; t++) {
        C[t] < 0 && (l && set(p, [], t, minus(get(p, [], t))), C[t] = -C[t]);
      }
      var L = sort(C, !0, !0);
      if (l && (p = get(p, [], L)), s) {
        if (!c) {
          for (t = n; t < a; t++) {
            L.push(t);
          }
        }
        v = get(v, L, []);
      }
      if (c) {
        var A = diag(C);
      }
      else {
        var A = mat([diag(C), zeros(a - n, n)], !0);
      }
      var S = void 0;
      return s && (S = transpose(v)), o ? c ? {
        U: p,
        S: A,
        V: S,
        s: C
      } : { U: p, S: transpose(A), V: S, s: C } : { U: S, S: A, V: p, s: C };
    }
    return sort(abs(diag(h)), !0);
  }

  function rank(r) {
    const e  = svd(r);
    var t, a = 0;
    for (t = 0; t < e.length; t++) {
      e[t] > 1e-10 && a++;
    }
    return a;
  }

  function nullspace(r) {
    const e = svd(r, "V"), t = r.n;
    var a   = 0;
    for (; a < t && e.s[a] > 1e-8;) {
      a++;
    }
    return a < t ? get(e.V, [], range(a, t)) : zeros(t);
  }

  function orth(r) {
    const e = svd(r, "thinU"), t = r.n;
    var a   = 0;
    for (; a < t && e.s[a] > 1e-8;) {
      a++;
    }
    return get(e.U, [], range(0, a));
  }

  function spVector(r, e, t) {
    if (this.length = r, this.size = [r, 1], this.type = "spvector", arguments.length <= 2) {
      if (1 == arguments.length) {
        var a = r;
      }
      else {
        var a = e;
      }
      this.val = new Float64Array(a), this.ind = new Uint32Array(a);
    }
    else {
      var a = e.length;
      this.val = new Float64Array(e), this.ind = new Uint32Array(t);
    }
    this.nnz = a;
  }

  function spMatrix(r, e, t, a, n) {
    if (this.length = r, this.m = r, this.n = e, this.size = [r, e], this.type = "spmatrix", arguments.length <= 3) {
      if (2 == arguments.length) {
        var o = r * e;
      }
      else {
        var o = t;
      }
      this.rowmajor = !0, this.val = new Float64Array(o), this.cols = new Uint32Array(o), this.rows = new Uint32Array(r + 1);
    }
    else {
      var o = t.length;
      n.length == o && a.length == e + 1 && a[a.length - 1] == o ? (this.rowmajor = !1, this.val = new Float64Array(t), this.cols = new Uint32Array(a), this.rows = new Uint32Array(n)) : (this.rowmajor = !0, this.val = new Float64Array(t), this.cols = new Uint32Array(a), this.rows = new Uint32Array(n));
    }
    this.nnz = o;
  }

  function spgetRows(r, e) {
    var t = e.length;
    if (r.rowmajor) {
      if (t > 1) {
        for (var a = sort(e), n = new Array(t), o = 0, i = 0; i < t; i++) {
          n[i] = r.row(a[i]), o += n[i].val.length;
        }
        for (var s = new Float64Array(o), l = new Uint32Array(o), c = new Uint32Array(t + 1), u = 0, i = 0; i < t; i++) {
          c[i] = u, s.set(n[i].val, u), l.set(n[i].ind, u), u += n[i].val.length;
        }
        return c[i] = u, new spMatrix(t, r.n, s, l, c);
      }
      return r.row(e[0]);
    }
    return getRows(fullMatrix(r), e);
  }

  function fullVector(r) {
    var e;
    const t = r.length, a = r.val.length;
    var n   = new Float64Array(t);
    for (e = 0; e < a; e++) {
      n[r.ind[e]] = r.val[e];
    }
    return n;
  }

  function fullMatrix(r) {
    const e = r.n;
    if (r.rowmajor) {
      var t;
      const a = r.m;
      for (var n = new Float64Array(a * e), o = 0, i = 0; i < a; i++) {
        var s = r.rows[i], l = r.rows[i + 1];
        for (t = s; t < l; t++) {
          n[o + r.cols[t]] = r.val[t];
        }
        o += e;
      }
      return new Matrix(a, e, n, !0);
    }
    for (var t, n = new Float64Array(r.m * e), c = 0; c < e; c++) {
      var s = r.cols[c], l = r.cols[c + 1];
      for (t = s; t < l; t++) {
        var i        = r.rows[t];
        n[i * e + c] = r.val[t];
      }
    }
    return new Matrix(r.m, e, n, !0);
  }

  function full(r) {
    switch (type(r)) {
      case"spvector":
        return fullVector(r);
      case"spmatrix":
        return fullMatrix(r);
      default:
        return r;
    }
  }

  function sparseVector(r) {
    var e;
    const t = r.length;
    var a   = new Array, n = new Array;
    for (e = 0; e < t; e++) {
      isZero(r[e]) || (a.push(r[e]), n.push(e));
    }
    return new spVector(t, a, n);
  }

  function sparseMatrix(r) {
    var e, t;
    const a  = r.m, n = r.n;
    var o, i = new Array, s = new Array, l = new Uint32Array(n + 1);
    for (t = 0; t < n; t++) {
      for (o = t, e = 0; e < a; e++) {
        isZero(r.val[o]) || (i.push(r.val[o]), s.push(e), l[t + 1]++), o += n;
      }
    }
    for (t = 1; t < n; t++) {
      l[t + 1] += l[t];
    }
    return new spMatrix(a, n, i, l, s);
  }

  function sparseMatrixRowMajor(r) {
    var e, t;
    const a = r.m, n = r.n;
    var o   = new Array, i = new Array, s = new Uint32Array(a + 1), l = 0;
    for (e = 0; e < a; e++) {
      for (t = 0; t < n; t++) {
        isZero(r.val[l]) || (o.push(r.val[l]), s[e + 1]++, i.push(t)), l++;
      }
    }
    for (e = 1; e < a; e++) {
      s[e + 1] += s[e];
    }
    return new spMatrix(a, n, o, i, s);
  }

  function sparse(r, e) {
    if (void 0 === e) {
      var e = !0;
    }
    switch (type(r)) {
      case"vector":
        return sparseVector(r);
      case"matrix":
        return e ? sparseMatrixRowMajor(r) : sparseMatrix(r);
      case"spvector":
      case"spmatrix":
        return r.copy();
      default:
        return r;
    }
  }

  function speye(r, e) {
    if (void 0 === e) {
      var e = r;
    }
    if (1 == r && 1 == e) {
      return 1;
    }
    var t = r < e ? r : e, a = ones(t), n = range(t + 1);
    return new spMatrix(r, e, a, n.slice(0, t), n);
  }

  function spdiag(r) {
    var e = r.length, t = range(e + 1), a = t.slice(0, e), n = type(r);
    return "vector" == n ? new spMatrix(e, e, r, a, t) : void error("Error in spdiag( x ): x is a " + n + " but should be a vector.");
  }

  function transposespVector(r) {
    return new Matrix(1, r.length, fullVector(r), !0);
  }

  function transposespMatrix(r) {
    return new spMatrix(r.n, r.m, r.val, r.rows, r.cols);
  }

  function spmat(r, e) {
    var t, a = new Array(r.length);
    for (t = 0; t < r.length; t++) {
      a[t] = type(r[t]);
    }
    if (void 0 === e) {
      var e = !0;
    }
    if (0 == r.length) {
      return [];
    }
    var n = 0, o = 0, i = 0;
    if (e) {
      var s = new Array;
      for (t = 0; t < r.length; t++) {
        switch (a[t]) {
          case"vector":
            var l = sparseVector(r[t]);
            s.push(l), n += 1, o = r[t].length, i += l.val.length;
            break;
          case"spvector":
            s.push(r[t]), o = r[t].length, n += 1, i += r[t].val.length;
            break;
          case"spmatrix":
            for (var c = 0; c < r[t].m; c++) {
              s.push(r[t].row(c));
            }
            s.push(r[t]), o = r[t].length, n += 1, i += r[t].val.length;
            break;
          default:
            return;
        }
      }
      var u = new spMatrix(n, o, i), m = 0;
      for (u.rows[0] = 0, t = 0; t < s.length; t++) {
        s[t].val.length > 1 ? (u.val.set(new Float64Array(s[t].val), m), u.cols.set(new Uint32Array(s[t].ind), m), u.rows[t + 1] = u.rows[t] + s[t].val.length, m += s[t].val.length) : 1 == s[t].val.length && (u.val[m] = s[t].val[0], u.cols[m] = s[t].ind[0], u.rows[t + 1] = u.rows[t] + 1, m += 1);
      }
      return u;
    }
    return error("spmat(..., false) for columnwise concatenation of sparse vectors not yet implemented"), s;
  }

  function mulScalarspVector(r, e) {
    const t = e.val.length;
    for (var a = e.copy(), n = 0; n < t; n++) {
      a.val[n] *= r;
    }
    return a;
  }

  function mulScalarspMatrix(r, e) {
    const t = e.nnz;
    for (var a = e.copy(), n = 0; n < t; n++) {
      a.val[n] *= r;
    }
    return a;
  }

  function spdot(r, e) {
    const t = r.val.length, a = e.val.length;
    for (var n = 0, o = 0, i = 0; o < t && i < a;) {
      for (var s = r.ind[o]; e.ind[i] < s && i < a;) {
        i++;
      }
      e.ind[i] == s && (n += r.val[o] * e.val[i]), o++;
    }
    return n;
  }

  function dotspVectorVector(r, e) {
    const t = r.val.length;
    for (var a = 0, n = 0; n < t; n++) {
      a += r.val[n] * e[r.ind[n]];
    }
    return a;
  }

  function mulMatrixspVector(r, e) {
    const t = r.m, a = r.n, n = e.val.length;
    for (var o = zeros(t), i = 0, s = 0; s < a; s++) {
      for (var l = 0; l < n; l++) {
        o[s] += r.val[i + e.ind[l]] * e.val[l];
      }
      i += a;
    }
    return o;
  }

  function mulspMatrixVector(r, e) {
    const t = r.m, a = r.n;
    var n   = zeros(t);
    if (r.rowmajor) {
      for (var o = 0; o < t; o++) {
        for (var i = r.rows[o], s = r.rows[o + 1], l = i; l < s; l++) {
          n[o] += r.val[l] * e[r.cols[l]];
        }
      }
    }
    else {
      for (var c = 0; c < a; c++) {
        for (var i = r.cols[c], s = r.cols[c + 1], u = e[c], l = i; l < s; l++) {
          n[r.rows[l]] += r.val[l] * u;
        }
      }
    }
    return n;
  }

  function mulspMatrixTransVector(r, e) {
    const t = r.m, a = r.n;
    var n   = zeros(a);
    if (r.rowmajor) {
      for (var o = 0; o < t; o++) {
        for (var i = r.rows[o], s = r.rows[o + 1], l = e[o], c = i; c < s; c++) {
          n[r.cols[c]] += r.val[c] * l;
        }
      }
    }
    else {
      for (var o = 0; o < a; o++) {
        for (var i = r.cols[o], s = r.cols[o + 1], c = i; c < s; c++) {
          n[o] += r.val[c] * e[r.rows[c]];
        }
      }
    }
    return n;
  }

  function mulspMatrixspVector(r, e) {
    const t = r.m;
    r.n;
    var a   = zeros(t);
    const n = e.val.length;
    if (r.rowmajor) {
      for (var o = 0; o < t; o++) {
        a[o] = spdot(r.row(o), e);
      }
    }
    else {
      for (var i = 0; i < n; i++) {
        for (var s = e.ind[i], l = e.val[i], c = r.cols[s], u = r.cols[s + 1], m = c; m < u; m++) {
          a[r.rows[m]] += r.val[m] * l;
        }
      }
    }
    return a;
  }

  function mulspMatrixTransspVector(r, e) {
    const t = (r.m, r.n);
    var a   = zeros(t);
    const n = e.val.length;
    if (r.rowmajor) {
      for (var o = 0; o < n; o++) {
        for (var i = e.ind[o], s = e.val[o], l = r.rows[i], c = r.rows[i + 1], u = l; u < c; u++) {
          a[r.cols[u]] += r.val[u] * s;
        }
      }
    }
    else {
      for (var m = 0; m < t; m++) {
        for (var o = 0, l = r.cols[m], c = r.cols[m + 1], v = l; v < c; v++) {
          for (var i = r.rows[v]; e.ind[o] < i && o < n;) {
            o++;
          }
          e.ind[o] == m && (a[m] += r.val[v] * e.val[o]);
        }
      }
    }
    return a;
  }

  function mulspMatrixspMatrix(r, e) {
    const t = r.m, a = r.n, n = e.n;
    var o   = zeros(t, n);
    if (r.rowmajor) {
      if (e.rowmajor) {
        for (var i = 0; i < t; i++) {
          for (var s = r.rows[i], l = r.rows[i + 1], c = s; c < l; c++) {
            for (var u = r.cols[c], m = r.val[c], v = e.rows[u], p = e.rows[u + 1], f = i * n, h = v; h < p; h++) {
              o.val[f + e.cols[h]] += m * e.val[h];
            }
          }
        }
      }
      else {
        for (var x = 0, d = 0; d < t; d++) {
          for (var u = 0; u < n; u++) {
            o.val[x] = spdot(r.row(d), e.col(u)), x++;
          }
        }
      }
    }
    else if (e.rowmajor) {
      for (var g = 0; g < a; g++) {
        for (var s = r.cols[g], l = r.cols[g + 1], b = e.rows[g], M = e.rows[g + 1], c = s; c < l; c++) {
          for (var f = r.rows[c] * n, w = r.val[c], y = b; y < M; y++) {
            o.val[f + e.cols[y]] += w * e.val[y];
          }
        }
      }
    }
    else {
      for (var V = 0; V < n; V++) {
        for (var b = e.cols[V], M = e.cols[V + 1], y = b; y < M; y++) {
          for (var u = e.rows[y], C = e.val[y], v = r.cols[u], p = r.cols[u + 1], h = v; h < p; h++) {
            o.val[r.rows[h] * n + V] += r.val[h] * C;
          }
        }
      }
    }
    return o;
  }

  function mulMatrixspMatrix(r, e) {
    const t = r.m, a = r.n, n = e.n;
    var o   = zeros(t, n);
    if (e.rowmajor) {
      for (var i = 0; i < a; i++) {
        for (var s = e.rows[i], l = e.rows[i + 1], c = 0; c < t; c++) {
          for (var u = c * n, m = r.val[c * a + i], v = s; v < l; v++) {
            o.val[u + e.cols[v]] += m * e.val[v];
          }
        }
      }
    }
    else {
      for (var p = 0; p < n; p++) {
        for (var s = e.cols[p], l = e.cols[p + 1], v = s; v < l; v++) {
          var f = e.rows[v], h = e.val[v];
          for (c = 0; c < t; c++) {
            o.val[c * n + p] += r.val[c * a + f] * h;
          }
        }
      }
    }
    return o;
  }

  function mulspMatrixMatrix(r, e) {
    const t = r.m, a = r.n, n = e.n;
    var o   = zeros(t, n);
    if (r.rowmajor) {
      for (var i = 0; i < t; i++) {
        for (var s = r.rows[i], l = r.rows[i + 1], c = s; c < l; c++) {
          var u = r.val[c], m = r.cols[c] * n, v = i * n;
          for (p = 0; p < n; p++) {
            o.val[v + p] += u * e.val[m + p];
          }
        }
      }
    }
    else {
      for (var p = 0; p < a; p++) {
        for (var f = r.cols[p], h = r.cols[p + 1], x = f; x < h; x++) {
          for (var i = r.rows[x], d = 0; d < n; d++) {
            o.val[i * n + d] += r.val[x] * e.val[p * n + d];
          }
        }
      }
    }
    return o;
  }

  function entrywisemulspVectors(r, e) {
    const t = r.val.length, a = e.val.length;
    for (var n = new Array, o = new Array, i = 0, s = 0; i < t && s < a;) {
      for (var l = r.ind[i]; e.ind[s] < l && s < a;) {
        s++;
      }
      if (e.ind[s] == l) {
        var c = r.val[i] * e.val[s];
        isZero(c) || (n.push(c), o.push(l));
      }
      i++;
    }
    return new spVector(r.length, n, o);
  }

  function entrywisemulspVectorVector(r, e) {
    var t   = r.copy();
    const a = r.val.length;
    for (var n = 0; n < a; n++) {
      t.val[n] *= e[r.ind[n]];
    }
    return t;
  }

  function entrywisemulspMatrices(r, e) {
    if (r.rowmajor) {
      if (e.rowmajor) {
        var t, a, n, o = new Array, i = new Array, s = new Uint32Array(r.m + 1);
        for (n = 0; n < r.m; n++) {
          t = r.rows[n], a = e.rows[n];
          for (var l = r.rows[n + 1], c = e.rows[n + 1]; t < l & a < c;) {
            for (var u = r.cols[t]; e.cols[a] < u && a < c;) {
              a++;
            }
            e.cols[a] == u && (o.push(r.val[t] * e.val[a]), i.push(u), s[n + 1]++), t++;
          }
        }
        for (n = 1; n < r.m; n++) {
          s[n + 1] += s[n];
        }
        return new spMatrix(r.m, r.n, o, i, s);
      }
      return entrywisemulspMatrixMatrix(e, fullMatrix(r));
    }
    if (e.rowmajor) {
      return entrywisemulspMatrixMatrix(r, fullMatrix(e));
    }
    var t, a, u, o = new Array, i = new Uint32Array(r.n + 1), s = new Array;
    for (u = 0; u < r.n; u++) {
      t = r.cols[u], a = e.cols[u];
      for (var l = r.cols[u + 1], c = e.cols[u + 1]; t < l & a < c;) {
        for (var n = r.rows[t]; e.rows[a] < n && a < c;) {
          a++;
        }
        e.rows[a] == n && (o.push(r.val[t] * e.val[a]), s.push(n), i[u + 1]++), t++;
      }
    }
    for (u = 1; u < r.n; u++) {
      i[u + 1] += i[u];
    }
    return new spMatrix(r.m, r.n, o, i, s);
  }

  function entrywisemulspMatrixMatrix(r, e) {
    var t   = r.copy();
    const a = (r.val.length, r.n), n = r.m;
    if (r.rowmajor) {
      for (i = 0; i < n; i++) {
        for (var o = t.rows[i], s = t.rows[i + 1], l = i * a, c = o; c < s; c++) {
          t.val[c] *= e.val[l + t.cols[c]];
        }
      }
    }
    else {
      for (j = 0; j < a; j++) {
        for (var o = t.cols[j], s = t.cols[j + 1], c = o; c < s; c++) {
          t.val[c] *= e.val[t.rows[c] * a + j];
        }
      }
    }
    return t;
  }

  function addScalarspVector(r, e) {
    const t  = e.val.length, a = e.length;
    var n, o = zeros(a);
    for (n = 0; n < a; n++) {
      o[n] = r;
    }
    for (n = 0; n < t; n++) {
      o[e.ind[n]] += e.val[n];
    }
    return o;
  }

  function addVectorspVector(r, e) {
    const t = e.val.length;
    e.length;
    for (var a = new Float64Array(r), n = 0; n < t; n++) {
      a[e.ind[n]] += e.val[n];
    }
    return a;
  }

  function addspVectors(r, e) {
    const t  = r.val.length, a = e.val.length;
    var n, o = zeros(r.length);
    for (n = 0; n < t; n++) {
      o[r.ind[n]] = r.val[n];
    }
    for (n = 0; n < a; n++) {
      o[e.ind[n]] += e.val[n];
    }
    return sparseVector(o);
  }

  function addScalarspMatrix(r, e) {
    const t  = (e.val.length, e.m), a = e.n, n = t * a;
    var o, i = zeros(t, a);
    for (o = 0; o < n; o++) {
      i.val[o] = r;
    }
    if (e.rowmajor) {
      var s = 0;
      for (o = 0; o < t; o++) {
        for (var l = e.rows[o], c = e.rows[o + 1], u = l; u < c; u++) {
          i.val[s + e.cols[u]] += e.val[u];
        }
        s += a;
      }
    }
    else {
      for (o = 0; o < a; o++) {
        for (var l = e.cols[o], c = e.cols[o + 1], u = l; u < c; u++) {
          i.val[e.rows[u] * a + o] += e.val[u];
        }
      }
    }
    return i;
  }

  function addMatrixspMatrix(r, e) {
    const t  = (e.val.length, e.m), a = e.n;
    var n, o = matrixCopy(r);
    if (e.rowmajor) {
      var i = 0;
      for (n = 0; n < t; n++) {
        for (var s = e.rows[n], l = e.rows[n + 1], c = s; c < l; c++) {
          o.val[i + e.cols[c]] += e.val[c];
        }
        i += a;
      }
    }
    else {
      for (n = 0; n < a; n++) {
        for (var s = e.cols[n], l = e.cols[n + 1], c = s; c < l; c++) {
          o.val[e.rows[c] * a + n] += e.val[c];
        }
      }
    }
    return o;
  }

  function addspMatrices(r, e) {
    const t  = (r.val.length, e.val.length, r.m), a = r.n;
    var n, o = fullMatrix(r);
    if (e.rowmajor) {
      var i = 0;
      for (n = 0; n < t; n++) {
        for (var s = e.rows[n], l = e.rows[n + 1], c = s; c < l; c++) {
          o.val[i + e.cols[c]] += e.val[c];
        }
        i += a;
      }
    }
    else {
      for (n = 0; n < a; n++) {
        for (var s = e.cols[n], l = e.cols[n + 1], c = s; c < l; c++) {
          o.val[e.rows[c] * a + n] += e.val[c];
        }
      }
    }
    return sparseMatrixRowMajor(o);
  }

  function spsaxpy(r, e, t) {
    const a = e.val.length;
    for (var n = 0; n < a; n++) {
      t[e.ind[n]] += r * e.val[n];
    }
  }

  function subScalarspVector(r, e) {
    const t  = e.val.length, a = e.length;
    var n, o = zeros(a);
    for (n = 0; n < a; n++) {
      o[n] = r;
    }
    for (n = 0; n < t; n++) {
      o[e.ind[n]] -= e.val[n];
    }
    return o;
  }

  function subVectorspVector(r, e) {
    const t = e.val.length;
    e.length;
    for (var a = new Float64Array(r), n = 0; n < t; n++) {
      a[e.ind[n]] -= e.val[n];
    }
    return a;
  }

  function subspVectorVector(r, e) {
    return subVectors(fullVector(r), e);
  }

  function subspVectors(r, e) {
    const t  = r.val.length, a = e.val.length;
    var n, o = zeros(r.length);
    for (n = 0; n < t; n++) {
      o[r.ind[n]] = r.val[n];
    }
    for (n = 0; n < a; n++) {
      o[e.ind[n]] -= e.val[n];
    }
    return sparseVector(o);
  }

  function subScalarspMatrix(r, e) {
    const t  = (e.val.length, e.m), a = e.n, n = t * a;
    var o, i = zeros(t, a);
    for (o = 0; o < n; o++) {
      i.val[o] = r;
    }
    if (e.rowmajor) {
      var s = 0;
      for (o = 0; o < t; o++) {
        for (var l = e.rows[o], c = e.rows[o + 1], u = l; u < c; u++) {
          i.val[s + e.cols[u]] -= e.val[u];
        }
        s += a;
      }
    }
    else {
      for (o = 0; o < a; o++) {
        for (var l = e.cols[o], c = e.cols[o + 1], u = l; u < c; u++) {
          i.val[e.rows[u] * a + o] -= e.val[u];
        }
      }
    }
    return i;
  }

  function subspMatrixMatrix(r, e) {
    return subMatrices(fullMatrix(r), e);
  }

  function subMatrixspMatrix(r, e) {
    const t  = (e.val.length, e.m), a = e.n;
    var n, o = matrixCopy(r);
    if (e.rowmajor) {
      var i = 0;
      for (n = 0; n < t; n++) {
        for (var s = e.rows[n], l = e.rows[n + 1], c = s; c < l; c++) {
          o.val[i + e.cols[c]] -= e.val[c];
        }
        i += a;
      }
    }
    else {
      for (n = 0; n < a; n++) {
        for (var s = e.cols[n], l = e.cols[n + 1], c = s; c < l; c++) {
          o.val[e.rows[c] * a + n] -= e.val[c];
        }
      }
    }
    return o;
  }

  function subspMatrices(r, e) {
    const t  = (r.val.length, e.val.length, r.m), a = r.n;
    var n, o = fullMatrix(r);
    if (e.rowmajor) {
      var i = 0;
      for (n = 0; n < t; n++) {
        for (var s = e.rows[n], l = e.rows[n + 1], c = s; c < l; c++) {
          o.val[i + e.cols[c]] -= e.val[c];
        }
        i += a;
      }
    }
    else {
      for (n = 0; n < a; n++) {
        for (var s = e.cols[n], l = e.cols[n + 1], c = s; c < l; c++) {
          o.val[e.rows[c] * a + n] -= e.val[c];
        }
      }
    }
    return sparseMatrixRowMajor(o);
  }

  function applyspVector(r, e) {
    const t  = e.val.length, a = e.length;
    var n, o = new Float64Array(a);
    const i  = r(0);
    for (n = 0; n < a; n++) {
      o[n] = i;
    }
    for (n = 0; n < t; n++) {
      o[e.ind[n]] = r(e.val[n]);
    }
    return o;
  }

  function applyspMatrix(r, e) {
    const t  = (e.val.length, e.m), a = e.n, n = t * a, o = r(0);
    var i, s = zeros(t, a);
    if (!isZero(o)) {
      for (i = 0; i < n; i++) {
        s.val[i] = o;
      }
    }
    if (e.rowmajor) {
      var l = 0;
      for (i = 0; i < t; i++) {
        for (var c = e.rows[i], u = e.rows[i + 1], m = c; m < u; m++) {
          s.val[l + e.cols[m]] = r(e.val[m]);
        }
        l += a;
      }
    }
    else {
      for (i = 0; i < a; i++) {
        for (var c = e.cols[i], u = e.cols[i + 1], m = c; m < u; m++) {
          s.val[e.rows[m] * a + i] += r(e.val[m]);
        }
      }
    }
    return s;
  }

  function sumspVector(r) {
    return sumVector(r.val);
  }

  function sumspMatrix(r) {
    return sumVector(r.val);
  }

  function sumspMatrixRows(r) {
    var e = zeros(r.n);
    if (r.rowmajor) {
      for (var t = 0; t < r.val.length; t++) {
        e[r.cols[t]] += r.val[t];
      }
    }
    else {
      for (var a = 0; a < r.n; a++) {
        e[a] = sumspVector(r.col(a));
      }
    }
    return new Matrix(1, r.n, e, !0);
  }

  function sumspMatrixCols(r) {
    var e = zeros(r.m);
    if (r.rowmajor) {
      for (var t = 0; t < r.m; t++) {
        e[t] = sumspVector(r.row(t));
      }
    }
    else {
      for (var a = 0; a < r.val.length; a++) {
        e[r.rows[a]] += r.val[a];
      }
    }
    return e;
  }

  function prodspMatrixRows(r) {
    if (r.rowmajor) {
      for (var e = ones(r.n), t = 0; t < r.m; t++) {
        for (var a = r.rows[t], n = r.rows[t + 1], o = 0; o < r.n; o++) {
          r.cols.subarray(a, n).indexOf(o) < 0 && (e[o] = 0);
        }
        for (var i = a; i < n; i++) {
          e[r.cols[i]] *= r.val[i];
        }
      }
    }
    else {
      for (var e = zeros(r.n), t = 0; t < r.n; t++) {
        var s = r.col(t);
        s.val.length == s.length && (e[t] = prodVector(s.val));
      }
    }
    return new Matrix(1, r.n, e, !0);
  }

  function prodspMatrixCols(r) {
    if (r.rowmajor) {
      for (var e = zeros(r.m), t = 0; t < r.m; t++) {
        var a = r.row(t);
        a.val.length == a.length && (e[t] = prodVector(a.val));
      }
    }
    else {
      for (var e = ones(r.m), n = 0; n < r.n; n++) {
        for (var o = r.cols[n], i = r.cols[n + 1], t = 0; t < r.m; t++) {
          r.rows.subarray(o, i).indexOf(t) < 0 && (e[t] = 0);
        }
        for (var s = o; s < i; s++) {
          e[r.rows[s]] *= r.val[s];
        }
      }
    }
    return e;
  }

  function spsolvecg(r, e) {
    const t                                               = r.n, a = r.m;
    var n                                                 = randn(t), o                                   = subVectors(e, mulspMatrixVector(r, n)),
          i                                               = dot(o, o);
    var s                                                 = 1e-8 * norm(e);
    s *= s;
    var l = vectorCopy(o), c = mulspMatrixVector(r, l), u = i / dot(l, c);
    saxpy(u, l, n), saxpy(-u, c, o);
    var m = i;
    i     = dot(o, o);
    for (var v = 1; i > s && v < t;) {
      !function (r, e) {
        for (var t = 0; t < a; t++) {
          l[t] = e[t] + r * l[t];
        }
      }(i / m, o), c = mulspMatrixVector(r, l), u = i / dot(l, c), saxpy(u, l, n), saxpy(-u, c, o), m = i, i = dot(o, o), v++;
    }
    return n;
  }

  function spcgnr(r, e) {
    const t                                                = r.n, a = r.m;
    var n                                                  = randn(t), o = subVectors(e, mulspMatrixVector(r, n));
    var i                                                  = 1e-8 * norm(e);
    i *= i;
    var s = mulspMatrixTransVector(r, o), l = dot(s, s), c = vectorCopy(s),
          u                                                = mulspMatrixVector(r, c), m                   = l / dot(u, u);
    saxpy(m, c, n), saxpy(-m, u, o), s = mulspMatrixTransVector(r, o);
    var v = l;
    l     = dot(s, s);
    for (var p = 1; l > i && p < t;) {
      !function (r, e) {
        for (var t = 0; t < a; t++) {
          c[t] = e[t] + r * c[t];
        }
      }(l / v, s), u = mulspMatrixVector(r, c), m = l / dot(u, u), saxpy(m, c, n), saxpy(-m, u, o), s = mulspMatrixTransVector(r, o), v = l, l = dot(s, s), p++;
    }
    return n;
  }

  function minimize(r, e, t) {
    var a, n = 1;
    return 3 == arguments.length ? "number" == typeof t ? t > 0 && Math.floor(t) == t ? (n = t, a = sub(mul(20, rand(n)), 10)) : (n = 1, a = t) : (n = t.length, a = t) : (n = 1, a = 20 * Math.random() - 10), 1 == n ? secant(r, e, a) : n > 500 ? steepestdescent(r, e, a) : bfgs(r, e, a);
  }

  function secant(r, e, t) {
    var a = t, n = e(a), o = -.01 * n;
    a += o;
    var i, s;
    do {
      i = n, n = e(a), s = n - i, o *= -n / s, a += o;
    } while (Math.abs(o) > 1e-6);
    return a;
  }

  function steepestdescent(r, e, t) {
    var a, n = t, o = r(n), i = e(n), s = norm(i), l = 0;
    do {
      var c = armijo(r, n, o, i, s);
      a = vectorCopy(n), prevobj = o, n = c.x, o = c.obj, i = e(n), s = norm(i), l++;
    } while (s > 1e-4 && prevobj - o > 1e-8 && norm(subVectors(n, a)) > 1e-6);
    return console.log(" OBJ: " + o + ", norm(grad): " + s, "prevobj - obj", prevobj - o, "iter: ", l), n;
  }

  function bfgs(r, e, t) {
    const a                       = t.length;
    var n, o, i, s, l, c, u, m, v = t, p = r(v), f = eye(a), h = 0;
    do {
      o = e(v), c = norm(o), i = minusVector(mulMatrixVector(f, o));
      var x = armijodir(r, v, p, o, i);
      n = vectorCopy(v), prevobj = p, v = x.x, p = x.obj, s = subVectors(v, n), l = subVectors(e(v), o), u = mulMatrixVector(f, l);
      var d = dot(s, l), g = mulScalarVector(1 / d, s),
          b                = outerprodVectors(g, u);
      m = subMatrices(outerprodVectors(g, s, 1 + dot(l, u) / d), addMatrices(b, transposeMatrix(b))), f = add(f, m), h++;
    } while (c > 1e-4 && prevobj - p > 1e-8 && norm(subVectors(v, n)) > 1e-6);
    return console.log(" OBJ: " + p + ", norm(grad): " + c, "prevobj - obj", prevobj - p, "iters: ", h), v;
  }

  function mincubic(r, e, t, a, n, o, i, s) {
    const l                                                       = t * t, c                                            = n * n;
    var u                                                         = new Matrix(2, 2, [l, t * l, c, n * c]),
          m = new Float64Array([a - r - e * t, o - r - e * n]), v = solve(u, m),
          p                                                       = (-v[0] + Math.sqrt(v[0] * v[0] - 3 * v[1] * e)) / (3 * v[1]);
    return Math.min(s, Math.max(i, p));
  }

  function minquadratic(r, e, t, a, n, o) {
    var i = -e / (2 * a * (t - r - e));
    return Math.min(o, Math.max(n, i));
  }

  function armijo(r, e, t, a, n) {
    const o                                                            = n * n;
    var i                                                              = Math.min(1, 100 / (1 + n)), s = t - 1e-4 * i * o, l = i,
          c = subVectors(e, mulScalarVector(i, a)), u = t, m = r(c), v = 1;
    i                                                                  = minquadratic(t, -o, l, m, .1 * l, .5 * l);
    var u                                                              = m, p = l;
    for (l = i, v++; m > s && v <= 10;) {
      i = mincubic(t, -o, l, m, p, u, .1 * l, .5 * l), p = l, l = i, c = subVectors(e, mulScalarVector(i, a)), u = m, m = r(c), s = t - 1e-4 * i * o, v++;
    }
    return { lambda: i, x: c, obj: m };
  }

  function armijodir(r, e, t, a, n) {
    const o                                                            = dot(a, n);
    var i                                                              = Math.min(1, 100 / (1 + norm(a))), s                        = t + 1e-4 * i * o, l  = i,
          c = addVectors(e, mulScalarVector(i, n)), u = t, m = r(c), v = 1;
    i                                                                  = minquadratic(t, o, l, m, .1 * l, .5 * l);
    var u                                                              = m, p = l;
    for (l = i, v++; m > s && v <= 10;) {
      i = mincubic(t, o, l, m, p, u, .1 * l, .5 * l), p = l, l = i, c = addVectors(e, mulScalarVector(i, n)), u = m, m = r(c), s = t + 1e-4 * i * o, v++;
    }
    return { lambda: i, x: c, obj: m };
  }

  function nchoosek(r, e) {
    if (e > r || e < 0 || r < 0) {
      return 0;
    }
    var t, a = 1;
    for (t = r - e + 1; t <= r; t++) {
      a *= t;
    }
    for (t = 2; t <= e; t++) {
      a /= t;
    }
    return a;
  }

  function mvnrnd(r, e, t) {
    if (arguments.length < 3) {
      var t = 1;
    }
    var a = randn(t, r.length);
    if (issymmetric(e)) {
      var n = chol(e);
    }
    else {
      var n = e;
    }
    return add(mul(ones(t), transpose(r)), mul(a, transpose(n)));
  }

  function Distribution(distrib, arg1, arg2) {
    if (arguments.length < 1) {
      return void error("Error in new Distribution(name): name is undefined.");
    }
    "string" == typeof distrib && (distrib = eval(distrib)), this.type = "Distribution:" + distrib.name, this.distribution = distrib.name, this.construct = distrib.prototype.construct, this.estimate = distrib.prototype.estimate, this.sample = distrib.prototype.sample, this.pdf = distrib.prototype.pdf, distrib.prototype.pmf && (this.pmf = distrib.prototype.pmf), distrib.prototype.logpdf ? this.logpdf = distrib.prototype.logpdf : this.logpdf = function (r) {
      return log(this.pdf(r));
    }, this.construct(arg1, arg2);
  }

  function Uniform(r) {
    return new Distribution(Uniform, r);
  }

  function Gaussian(r) {
    return new Distribution(Gaussian, r);
  }

  function mvGaussian(r) {
    return new Distribution(mvGaussian, r);
  }

  function Bernoulli(r) {
    return new Distribution(Bernoulli, r);
  }

  function Poisson(r) {
    return new Distribution(Poisson, r);
  }

  function Complex(r, e, t) {
    this.type = "Complex", void 0 === r ? (this.re = 0, this.im = 0) : r instanceof Complex ? (this.re = r.re, this.im = r.im) : "number" != typeof r || t ? (this.re = r * Math.cos(e), this.im = r * Math.sin(e)) : (this.re = r, this.im = e);
  }

  function addComplex(r, e) {
    var t = new Complex(r);
    return t.re += e.re, t.im += e.im, t;
  }

  function addComplexReal(r, e) {
    var t = new Complex(r);
    return t.re += e, t;
  }

  function subComplex(r, e) {
    var t = new Complex(r);
    return t.re -= e.re, t.im -= e.im, t;
  }

  function minusComplex(r) {
    return new Complex(-r.re, -r.im);
  }

  function mulComplex(r, e) {
    return new Complex(r.re * e.re - r.im * e.im, r.im * e.re + r.re * e.im);
  }

  function mulComplexReal(r, e) {
    return new Complex(r.re * e, r.im * e);
  }

  function divComplex(r, e) {
    var t = e.re * e.re + e.im * e.im;
    return new Complex((r.re * e.re + r.im * e.im) / t, (r.im * e.re - r.re * e.im) / t);
  }

  function conj(r) {
    if (r instanceof Complex) {
      return new Complex(r.re, -r.im);
    }
    if (r instanceof ComplexVector) {
      for (var e = new ComplexVector(r), t = 0; t < r.length; t++) {
        e.im[t] = -e.im[t];
      }
      return e;
    }
    if (r instanceof ComplexMatrix) {
      for (var e = new ComplexMatrix(r), t = 0; t < r.length; t++) {
        e.im[t] = -e.im[t];
      }
      return e;
    }
    return new Complex(r);
  }

  function modulus(r) {
    return r instanceof Complex ? Math.sqrt(r.re * r.re + r.im * r.im) : r instanceof ComplexVector ? sqrt(addVectors(entrywisemulVector(r.re, r.re), entrywisemulVector(r.im, r.im))) : r instanceof ComplexVector ? new Matrix(r.m, r.n, sqrt(addVectors(entrywisemulVector(r.re, r.re), entrywisemulVector(r.im, r.im)), !0)) : void 0;
  }

  function expComplex(r) {
    return new Complex(Math.exp(r.re), r.im, !0);
  }

  function ComplexVector(r, e, t) {
    this.type = "ComplexVector", 0 == arguments.length || (r instanceof ComplexVector ? (this.length = r.length, this.re = vectorCopy(r.re), this.im = vectorCopy(r.im)) : "number" == typeof r ? (this.length = r, this.re = new Float64Array(r), this.im = new Float64Array(r)) : r instanceof Float64Array && e instanceof Float64Array ? (this.length = r.length, void 0 !== t && t ? (this.re = r, this.im = e) : (this.re = vectorCopy(r), this.im = vectorCopy(e))) : error("Bad arguments to new ComplexVector()"));
  }

  function ComplexMatrix(r, e, t, a) {
    this.type = "ComplexMatrix", 0 == arguments.length || (r instanceof ComplexMatrix ? (this.length = r.length, this.m = r.m, this.n = r.n, this.size = [r.m, r.n], this.re = vectorCopy(r.re), this.im = vectorCopy(r.im)) : "number" == typeof r && "number" == typeof e ? (this.length = r, this.m = r, this.n = e, this.size = [r, e], void 0 === t ? (this.re = new Float64Array(r * e), this.im = new Float64Array(r * e)) : t instanceof ComplexVector ? (this.re = vectorCopy(t.re), this.im = vectorCopy(t.im)) : t instanceof Float64Array && void 0 !== a && a instanceof Float64Array && (this.re = t, this.im = a)) : r instanceof Matrix && e instanceof Matrix ? (this.length = r.length, this.m = r.m, this.n = r.n, this.size = [r.m, r.n], this.re = vectorCopy(r.val), this.im = vectorCopy(e.val)) : error("Bad arguments to new ComplexMatrix()"));
  }

  function real(r) {
    return r instanceof Complex ? r.re : r instanceof ComplexVector ? vectorCopy(r.re) : r instanceof ComplexMatrix ? new Matrix(r.m, r.n, r.re) : copy(r);
  }

  function imag(r) {
    return r instanceof Complex ? r.im : r instanceof ComplexVector ? vectorCopy(r.im) : r instanceof ComplexMatrix ? new Matrix(r.m, r.n, r.im) : 0;
  }

  function transposeComplexMatrix(r) {
    const e = r.m, t = r.n;
    if (e > 1) {
      var a, n, o = new ComplexMatrix(t, e), i = 0;
      for (n = 0; n < e; n++) {
        var s = 0;
        for (a = 0; a < t; a++) {
          o.re[s + n] = r.re[i + a], o.im[s + n] = -r.im[i + a], s += e;
        }
        i += t;
      }
      return o;
    }
    return new ComplexVector(r.re, minusVector(r.im));
  }

  function addComplexVectors(r, e) {
    var t   = new ComplexVector(r);
    const a = r.length;
    for (var n = 0; n < a; n++) {
      t.re[n] += e.re[n], t.im[n] += e.im[n];
    }
    return t;
  }

  function subComplexVectors(r, e) {
    var t   = new ComplexVector(r);
    const a = r.length;
    for (var n = 0; n < a; n++) {
      t.re[n] -= e.re[n], t.im[n] -= e.im[n];
    }
    return t;
  }

  function addComplexMatrices(r, e) {
    var t   = new ComplexMatrix(r);
    const a = r.m * r.n;
    for (var n = 0; n < a; n++) {
      t.re[n] += e.re[n], t.im[n] += e.im[n];
    }
    return t;
  }

  function subComplexMatrices(r, e) {
    var t   = new ComplexMatrix(r);
    const a = r.m * r.n;
    for (var n = 0; n < a; n++) {
      t.re[n] -= e.re[n], t.im[n] -= e.im[n];
    }
    return t;
  }

  function addComplexVectorVector(r, e) {
    var t   = new ComplexVector(r);
    const a = r.length;
    for (var n = 0; n < a; n++) {
      t.re[n] += e[n];
    }
    return t;
  }

  function subComplexVectorVector(r, e) {
    var t   = new ComplexVector(r);
    const a = r.length;
    for (var n = 0; n < a; n++) {
      t.re[n] -= e[n];
    }
    return t;
  }

  function addComplexMatrixMatrix(r, e) {
    var t   = new ComplexMatrix(r);
    const a = r.m * r.n;
    for (var n = 0; n < a; n++) {
      t.re[n] += e.val[n];
    }
    return t;
  }

  function subComplexMatrixMatrix(r, e) {
    var t   = new ComplexMatrix(r);
    const a = r.m * r.n;
    for (var n = 0; n < a; n++) {
      t.re[n] -= e.val[n];
    }
    return t;
  }

  function addScalarComplexVector(r, e) {
    var t   = new ComplexVector(e);
    const a = e.length;
    for (var n = 0; n < a; n++) {
      t.re[n] += r;
    }
    return t;
  }

  function subScalarComplexVector(r, e) {
    var t   = minusComplexVector(e);
    const a = e.length;
    for (var n = 0; n < a; n++) {
      t.re[n] += r;
    }
    return t;
  }

  function addScalarComplexMatrix(r, e) {
    var t   = new ComplexMatrix(e);
    const a = e.m * e.n;
    for (var n = 0; n < a; n++) {
      t.re[n] += r;
    }
    return t;
  }

  function entrywisemulComplexVectors(r, e) {
    const t = r.length;
    for (var a = new ComplexVector(t), n = 0; n < t; n++) {
      a.re[n] = r.re[n] * e.re[n] - r.im[n] * e.im[n], a.im[n] = r.im[n] * e.re[n] + r.re[n] * e.im[n];
    }
    return a;
  }

  function entrywisedivComplexVectors(r, e) {
    const t = r.length;
    for (var a = new ComplexVector(t), n = 0; n < t; n++) {
      var o = e.re[n], i = e.im[n], s = o * o + i * i;
      a.re[n] = (r.re[n] * o + r.im[n] * i) / s, a.im[n] = (r.im[n] * o - r.re[n] * i) / s;
    }
    return a;
  }

  function entrywisemulComplexMatrices(r, e) {
    const t = r.m * r.n;
    for (var a = new ComplexMatrix(r.m, r.n), n = 0; n < t; n++) {
      a.re[n] = r.re[n] * e.re[n] - r.im[n] * e.im[n], a.im[n] = r.im[n] * e.re[n] + r.re[n] * e.im[n];
    }
    return a;
  }

  function entrywisedivComplexMatrices(r, e) {
    const t = r.m * r.n;
    for (var a = new ComplexMatrix(r.m, r.n), n = 0; n < t; n++) {
      var o = e.re[n], i = e.im[n], s = o * o + i * i;
      a.re[n] = (r.re[n] * o + r.im[n] * i) / s, a.im[n] = (r.im[n] * o - r.re[n] * i) / s;
    }
    return a;
  }

  function entrywisemulComplexVectorVector(r, e) {
    const t = r.length;
    for (var a = new ComplexVector(t), n = 0; n < t; n++) {
      a.re[n] = r.re[n] * e[n], a.im[n] = r.im[n] * e[n];
    }
    return a;
  }

  function entrywisemulComplexMatrixMatrix(r, e) {
    const t = r.m * r.n;
    for (var a = new ComplexMatrix(r.m, r.n), n = 0; n < t; n++) {
      a.re[n] = r.re[n] * e.val[n], a.im[n] = r.im[n] * e.val[n];
    }
    return a;
  }

  function minusComplexVector(r) {
    const e = r.length;
    for (var t = new ComplexVector(e), a = 0; a < e; a++) {
      t.re[a] = -r.re[a], t.im[a] = -r.im[a];
    }
    return t;
  }

  function minusComplexMatrix(r) {
    var e   = new ComplexMatrix(r.m, r.n);
    const t = r.m * r.n;
    for (var a = 0; a < t; a++) {
      e.re[a] = -r.re[a], e.im[a] = -r.im[a];
    }
    return e;
  }

  function sumComplexVector(r) {
    var e   = new Complex;
    const t = r.length;
    for (var a = 0; a < t; a++) {
      e.re += r.re[a], e.im += r.im[a];
    }
    return e;
  }

  function sumComplexMatrix(r) {
    var e   = new Complex;
    const t = r.m * r.n;
    for (var a = 0; a < t; a++) {
      e.re += r.re[a], e.im += r.im[a];
    }
    return e;
  }

  function norm1ComplexVector(r) {
    var e   = 0;
    const t = r.length;
    for (var a = 0; a < t; a++) {
      e += Math.sqrt(r.re[a] * r.re[a] + r.im[a] * r.im[a]);
    }
    return e;
  }

  function norm2ComplexVector(r) {
    var e   = 0;
    const t = r.length;
    for (var a = 0; a < t; a++) {
      e += r.re[a] * r.re[a] + r.im[a] * r.im[a];
    }
    return Math.sqrt(e);
  }

  function normFroComplexMatrix(r) {
    var e   = 0;
    const t = r.m * r.n;
    for (var a = 0; a < t; a++) {
      e += r.re[a] * r.re[a] + r.im[a] * r.im[a];
    }
    return Math.sqrt(e);
  }

  function dotComplexVectors(r, e) {
    var t   = new Complex;
    const a = r.length;
    for (var n = 0; n < a; n++) {
      t.re += r.re[n] * e.re[n] + r.im[n] * e.im[n], t.im += r.im[n] * e.re[n] - r.re[n] * e.im[n];
    }
    return t;
  }

  function dotComplexVectorVector(r, e) {
    var t   = new Complex;
    const a = r.length;
    for (var n = 0; n < a; n++) {
      t.re += r.re[n] * e[n], t.im += r.im[n] * e[n];
    }
    return t;
  }

  function mulScalarComplexVector(r, e) {
    return new ComplexVector(mulScalarVector(r, e.re), mulScalarVector(r, e.im), !0);
  }

  function mulComplexComplexVector(r, e) {
    const t = e.length;
    for (var a = new ComplexVector(t), n = r.re, o = r.im, i = 0; i < t; i++) {
      a.re[i] = n * e.re[i] - o * e.im[i], a.im[i] = o * e.re[i] + n * e.im[i];
    }
    return a;
  }

  function mulComplexVector(r, e) {
    const t = e.length;
    for (var a = new ComplexVector(t), n = r.re, o = r.im, i = 0; i < t; i++) {
      a.re[i] = n * e[i], a.im[i] = o * e[i];
    }
    return a;
  }

  function mulScalarComplexMatrix(r, e) {
    var t = mulScalarVector(r, e.re), a = mulScalarVector(r, e.im);
    return new ComplexMatrix(e.m, e.n, t, a);
  }

  function mulComplexComplexMatrix(r, e) {
    const t = e.m * e.n;
    for (var a = new ComplexMatrix(e.m, e.n), n = r.re, o = r.im, i = 0; i < t; i++) {
      a.re[i] = n * e.re[i] - o * e.im[i], a.im[i] = o * e.re[i] + n * e.im[i];
    }
    return a;
  }

  function mulComplexMatrix(r, e) {
    const t = e.m * e.n;
    for (var a = new ComplexMatrix(e.m, e.n), n = r.re, o = r.im, i = 0; i < t; i++) {
      a.re[i] = n * e.val[i], a.im[i] = o * e.val[i];
    }
    return a;
  }

  function mulComplexMatrixVector(r, e) {
    const t = r.m, a = r.n;
    for (var n = new ComplexVector(t), o = 0, i = 0; i < t; i++) {
      for (j = 0; j < a; j++) {
        n.re[i] += r.re[o + j] * e[j], n.im[i] += r.im[o + j] * e[j];
      }
      o += a;
    }
    return n;
  }

  function mulComplexMatrixComplexVector(r, e) {
    const t = r.m, a = r.n;
    for (var n = new ComplexVector(t), o = 0, i = 0; i < t; i++) {
      for (j = 0; j < a; j++) {
        n.re[i] += r.re[o + j] * e.re[j] - r.im[o + j] * e.im[j], n.im[i] += r.im[o + j] * e.re[j] + r.re[o + j] * e.im[j];
      }
      o += a;
    }
    return n;
  }

  function mulComplexMatrices(r, e) {
    const t = r.length, a = e.n, n = e.length;
    for (var o = r.re, i = r.im, s = e.re, l = e.im, c = new Float64Array(t * a), u = new Float64Array(t * a), m = 0, v = 0, p = 0; p < t; p++) {
      for (var f = 0, h = 0; h < n; h++) {
        aikre = o[m], aikim = i[m];
        for (var x = 0; x < a; x++) {
          c[v + x] += aikre * s[f] - aikim * l[f], u[v + x] += aikre * l[f] + aikim * s[f], f++;
        }
        m++;
      }
      v += a;
    }
    return new ComplexMatrix(t, a, c, u);
  }

  function mulComplexMatrixMatrix(r, e) {
    const t = r.m, a = e.n, n = e.m;
    for (var o = r.re, i = r.im, s = e.val, l = new Float64Array(t * a), c = new Float64Array(t * a), u = 0, m = 0, v = 0; v < t; v++) {
      for (var p = 0, f = 0; f < n; f++) {
        aikre = o[u], aikim = i[u];
        for (var h = 0; h < a; h++) {
          l[m + h] += aikre * s[p], c[m + h] += aikim * s[p], p++;
        }
        u++;
      }
      m += a;
    }
    return new ComplexMatrix(t, a, l, c);
  }

  function fft(r) {
    const e = r.length, t = Math.log2(e), a = e / 2;
    if (t % 1 != 0) {
      return void error("fft(x) only implemented for x.length = 2^m. Use dft(x) instead.");
    }
    for (var n = new ComplexVector(r, zeros(e)), o = 0, i = 0; i < e - 1; i++) {
      if (i < o) {
        var s = n.re[i];
        n.re[i] = n.re[o], n.re[o] = s, s = n.im[i], n.im[i] = n.im[o], n.im[o] = s;
      }
      for (var l = a; l <= o;) {
        o -= l, l /= 2;
      }
      o += l;
    }
    for (var c = 1, u = new Complex(-1, 0), m = new Complex, v = 0; v < t; v++) {
      var p = c;
      c *= 2, m.re = 1, m.im = 0;
      for (var o = 0; o < p; o++) {
        for (var i = o; i < e; i += c) {
          var f = i + p, h = m.re * n.re[f] - m.im * n.im[f],
              x            = m.im * n.re[f] + m.re * n.im[f];
          n.re[f] = n.re[i] - h, n.im[f] = n.im[i] - x, n.re[i] += h, n.im[i] += x;
        }
        m = mulComplex(m, u);
      }
      u.im = -Math.sqrt((1 - u.re) / 2), u.re = Math.sqrt((1 + u.re) / 2);
    }
    return n;
  }

  function ifft(r) {
    const e = r.length, t = Math.log2(e), a = e / 2;
    if (t % 1 != 0) {
      return void error("ifft(x) only implemented for x.length = 2^m. Use idft(x) instead.");
    }
    for (var n = new ComplexVector(r, zeros(e)), o = 0, i = 0; i < e - 1; i++) {
      if (i < o) {
        var s = n.re[i];
        n.re[i] = n.re[o], n.re[o] = s, s = n.im[i], n.im[i] = n.im[o], n.im[o] = s;
      }
      for (var l = a; l <= o;) {
        o -= l, l /= 2;
      }
      o += l;
    }
    for (var c = 1, u = new Complex(-1, 0), m = new Complex, v = 0; v < t; v++) {
      var p = c;
      c *= 2, m.re = 1, m.im = 0;
      for (var o = 0; o < p; o++) {
        for (var i = o; i < e; i += c) {
          var f = i + p, h = m.re * n.re[f] - m.im * n.im[f],
              x            = m.im * n.re[f] + m.re * n.im[f];
          n.re[f] = n.re[i] - h, n.im[f] = n.im[i] - x, n.re[i] += h, n.im[i] += x;
        }
        m = mulComplex(m, u);
      }
      u.im = Math.sqrt((1 - u.re) / 2), u.re = Math.sqrt((1 + u.re) / 2);
    }
    for (var d = !1, i = 0; i < e; i++) {
      n.re[i] /= e, n.im[i] /= e, Math.abs(n.im[i]) > 1e-6 && (d = !0);
    }
    return d ? n : n.re;
  }

  function dft(r) {
    if ("number" == typeof r) {
      return new Complex(r, 0);
    }
    const e = r.length;
    if (1 == e) {
      return new Complex(r[0], 0);
    }
    if (Math.log2(e) % 1 == 0) {
      return fft(r);
    }
    for (var t = new ComplexVector(e), a = 0, n = 0; n < e; n++) {
      for (var o = 0, i = 0; i < e; i++) {
        t.re[n] += r[i] * Math.cos(o), t.im[n] += r[i] * Math.sin(o), o += a;
      }
      a -= 2 * Math.PI / e;
    }
    return t;
  }

  function idft(r) {
    if (!(r instanceof ComplexVector)) {
      return r instanceof Complex ? r.re : "number" == typeof r ? r : r instanceof Float64Array ? idft(new ComplexVector(r, zeros(r.length), !0)) : void 0;
    }
    const e = r.length;
    if (1 == e) {
      return r.re[0];
    }
    if (Math.log2(e) % 1 == 0) {
      return ifft(r);
    }
    for (var t = new Float64Array(e), a = 0, n = 0; n < e; n++) {
      for (var o = 0, i = 0, s = 0; s < e; s++) {
        i += r.re[s] * Math.cos(o) - r.im[s] * Math.sin(o), o += a;
      }
      t[n] = i / e, a += 2 * Math.PI / e;
    }
    return t;
  }

  function spectrum(r) {
    return r instanceof Float64Array ? absComplex(dft(r)) : void 0;
  }

  var printPrecision = 3, LALOLibPlotsIndex = 0, LALOLibPlots = new Array,
      LALOLABPLOTMOVING                                       = !1;
  if (void 0 === console) {
    var console = {
      log: function () {
      }
    };
  }
  void 0 === Math.sign && (Math.sign = function (r) {
    return r >= 0 ? 0 == r ? 0 : 1 : -1;
  }), Lalolab.prototype.close = function () {
    this.worker.terminate(), this.worker.parent = null;
  }, Lalolab.prototype.onprogress = function (r) {
  }, Lalolab.prototype.onresult = function (r) {
    if (void 0 !== r.data.progress) {
      this.parent.onprogress(r.data.progress);
    }
    else {
      var e = this.parent.callbacks.splice(0, 1)[0];
      if ("function" == typeof e) {
        var t = r.data.cmd;
        e(r.data.output, t, this.parent.id);
      }
    }
  }, Lalolab.prototype.do = function (r, e) {
    this.callbacks.push(e), this.worker.postMessage({ cmd: r, parse: !0 });
  }, Lalolab.prototype.exec = function (r, e) {
    this.callbacks.push(e), this.worker.postMessage({ cmd: r, parse: !1 });
  }, Lalolab.prototype.parse = function (r, e) {
    this.callbacks.push(e), this.worker.postMessage({ cmd: r, parse: !1 });
  }, Lalolab.prototype.load = function (r, e, t) {
    this.callbacks.push(t), "string" == typeof r ? this.worker.postMessage({
      cmd: e + '= load_data ("' + r + '")',
      parse: !1
    }) : this.worker.postMessage({
      cmd: "load_mat",
      data: r,
      varname: e,
      parse: !1
    });
  }, Lalolab.prototype.import = function (r, e) {
    this.do('importLaloScript("' + r + '")', e);
  }, Lalolab.prototype.importjs = function (r, e) {
    this.exec("importScripts('" + r + "');", e);
  }, Lalolab.prototype.getObject = function (r, e) {
    this.exec("getObjectWithoutFunc(" + r + ")", function (r) {
      e(renewObject(r));
    });
  };
  var LALOLIB_ERROR = "";
  const EPS         = 2.2205e-16;
  Matrix.prototype.get = function (r, e) {
    return this.val[r * this.n + e];
  }, Matrix.prototype.set = function (r, e, t) {
    this.val[r * this.n + e] = t;
  }, Matrix.prototype.row = function (r) {
    return this.val.subarray(r * this.n, (r + 1) * this.n);
  }, Matrix.prototype.toArray = function () {
    for (var r = new Array(this.m), e = 0, t = 0; t < this.m; t++) {
      r[t] = new Array(this.n);
      for (var a = 0; a < this.n; a++) {
        r[t][a] = this.val[e + a];
      }
      e += this.n;
    }
    return r;
  }, Matrix.prototype.toArrayOfFloat64Array = function () {
    for (var r = new Array(this.m), e = 0; e < this.m; e++) {
      r[e] = this.val.subarray(e * this.n, (e + 1) * this.n);
    }
    return r;
  };
  var MathFunctions = Object.getOwnPropertyNames(Math);
  for (var mf in MathFunctions) {
    "function" == eval("typeof(Math." + MathFunctions[mf] + ")") ? 1 == eval("Math." + MathFunctions[mf] + ".length") && (eval(MathFunctions[mf] + " = function (x) { return apply(Math." + MathFunctions[mf] + " , x );};"), eval(MathFunctions[mf] + "Vector = function (x) { return applyVector(Math." + MathFunctions[mf] + " , x );};"), eval(MathFunctions[mf] + "Matrix = function (x) { return applyMatrix(Math." + MathFunctions[mf] + " , x );};")) : "number" == eval("typeof(Math." + MathFunctions[mf] + ")") && eval(MathFunctions[mf] + " = Math." + MathFunctions[mf]);
  }
  argmax = findmax, argmin = findmin, spVector.prototype.get = function (r) {
    var e = this.ind.indexOf(r);
    return e < 0 ? 0 : this.val[e];
  }, spVector.prototype.set = function (r, e) {
    if (r > this.n) {
      return void error("Error in spVector.set(i,value): i > this.length)");
    }
    var t = this.ind.indexOf(r);
    if (t < 0) {
      var a = new Uint32Array(this.nnz + 1), n = new Float64Array(this.nnz + 1);
      for (t = 0; this.ind[t] < r;) {
        a[t] = this.ind[t], n[t] = this.val.ind[t], t++;
      }
      a[t] = r, n[t] = e, a.set(this.ind.subarray(t), t + 1), n.set(this.val.subarray(t), t + 1), this.nnz++;
    }
    else {
      this.val[t] = e;
    }
    return e;
  }, spVector.prototype.copy = function () {
    return new spVector(this.n, this.val, this.ind);
  }, spMatrix.prototype.copy = function () {
    return new spMatrix(this.m, this.n, this.val, this.cols, this.rows);
  }, spMatrix.prototype.toRowmajor = function () {
    return this.rowmajor ? this.copy() : sparseMatrixRowMajor(fullMatrix(this));
  }, spMatrix.prototype.row = function (r) {
    return this.rowmajor ? new spVector(this.n, this.val.subarray(this.rows[r], this.rows[r + 1]), this.cols.subarray(this.rows[r], this.rows[r + 1])) : void error("Cannot extract sparse column from a sparse matrix in row major format.");
  }, spMatrix.prototype.col = function (r) {
    return this.rowmajor ? void error("Cannot extract sparse column from a sparse matrix in row major format.") : new spVector(this.m, this.val.subarray(this.cols[r], this.cols[r + 1]), this.rows.subarray(this.cols[r], this.cols[r + 1]));
  }, spMatrix.prototype.get = function (r, e) {
    if (this.rowmajor) {
      var t = this.cols.subarray(this.rows[r], this.rows[r + 1]),
          a = t.indexOf(e);
      return a < 0 ? 0 : this.val[this.rows[r] + a];
    }
    var n = this.rows.subarray(this.cols[e], this.cols[e + 1]),
        a = n.indexOf(r);
    return a < 0 ? 0 : this.val[this.cols[e] + a];
  }, Distribution.prototype.construct = function (r) {
  }, Distribution.prototype.pdf = function (r) {
  }, Distribution.prototype.sample = function (r) {
  }, Distribution.prototype.estimate = function (r) {
  }, Distribution.prototype.info = function () {
    var r, e = "{<br>", t = new Array;
    for (r in this) {
      switch (type(this[r])) {
        case"string":
        case"boolean":
        case"number":
          e += r + ": " + this[r] + "<br>";
          break;
        case"vector":
          e += r + ": " + printVector(this[r]) + "<br>";
          break;
        case"matrix":
          e += r + ": matrix of size " + this[r].m + "-by-" + this[r].n + "<br>";
          break;
        case"function":
          t.push(r);
          break;
        default:
          e += r + ": " + typeof this[r] + "<br>";
      }
    }
    return e += "<i>Functions: " + t.join(", ") + "</i><br>", e += "}";
  }, Uniform.prototype.construct = function (r, e) {
    if (void 0 === r) {
      this.isDiscrete = !1, this.a = -1, this.b = 1, this.dimension = 1, this.px = .5, this.mean = 0, this.variance = 1 / 3, this.std = Math.sqrt(this.variance);
    }
    else if (void 0 === e) {
      this.isDiscrete = !0, this.values = "number" == typeof r ? range(r) : r, this.dimension = 1, this.mean = (min(this.values) + max(this.values)) / 2, this.variance = (this.values.length * this.values.length - 1) / 12, this.std = Math.sqrt(this.variance);
    }
    else {
      this.isDiscrete = !1, this.a = r, this.b = e, this.dimension = size(r, 1), this.px = 1 / prod(sub(e, r)), this.mean = mul(.5, add(r, e));
      var t = sub(e, r);
      this.variance = entrywisediv(entrywisemul(t, t), 12), this.std = sqrt(this.variance);
    }
  }, Uniform.prototype.pdf = function (r) {
    const e = type(r);
    var t   = void 0;
    if (this.isDiscrete) {
      var a = function (r, e) {
        return e.indexOf(r) < 0 ? 0 : 1 / e.length;
      };
      if ("number" == e) {
        t = a(r, this.values);
      }
      else if ("vector" == e) {
        t = zeros(r.length);
        for (var n = 0; n < r.length; n++) {
          t[n] = a(r[n], this.values);
        }
      }
      else if ("matrix" == e) {
        t = zeros(r.m, r.n);
        for (var n = 0; n < r.m * r.n; n++) {
          t.val[n] = a(r.val[n], this.values);
        }
      }
    }
    else {
      var a = function (r, e, t, a) {
        return r >= e && r <= t ? a : 0;
      };
      if ("number" == e) {
        1 == this.dimension && (t = a(r, this.a, this.b, this.px));
      }
      else if ("vector" == e) {
        if (1 == this.dimension) {
          t = zeros(r.length);
          for (var n = 0; n < r.length; n++) {
            t[n] = a(r[n], this.a, this.b, this.px);
          }
        }
        else if (this.dimension == r.length) {
          t = a(r[0], this.a[0], this.b[0], this.px);
          for (var o = 1; o < r.length && 0 != t;) {
            t *= a(r[o], this.a[o], this.b[o], this.px), o++;
          }
        }
      }
      else if ("matrix" == e) {
        if (1 == this.dimension) {
          t = zeros(r.m, r.n);
          for (var n = 0; n < r.m * r.n; n++) {
            t.val[n] = a(r.val[n], this.a, this.b, this.px);
          }
        }
        else if (this.dimension == r.n) {
          t = zeros(r.m);
          for (var n = 0; n < r.m; n++) {
            t[n] = a(r.val[n * r.n], this.a[0], this.b[0], this.px);
            for (var o = 1; o < r.n && 0 != t[n];) {
              t[n] *= a(r.val[n * r.n + o], this.a[o], this.b[o], this.px), o++;
            }
          }
        }
      }
    }
    return t;
  }, Uniform.prototype.sample = function (r) {
    if (void 0 === r) {
      var r = 1;
    }
    if (this.isDiscrete) {
      for (var e = zeros(r), t = 0; t < r; t++) {
        for (var a = Math.random(), n = 1, o = this.values.length; a > n / o;) {
          n++;
        }
        e[t] = this.values[n - 1];
      }
      return 1 == r ? e[0] : e;
    }
    return 1 == this.dimension ? add(entrywisemul(this.b - this.a, rand(r)), this.a) : add(entrywisemul(outerprod(ones(r), sub(this.b, this.a)), rand(r, this.dimension)), outerprod(ones(r), this.a));
  }, Uniform.prototype.estimate = function (r) {
    const e = type(r);
    if ("matrix" == e) {
      var t = r.val;
    }
    else {
      var t = r;
    }
    for (var a = 0; a < t.length && Math.round(t[a]) == t[a];) {
      a++;
    }
    if (a < t.length ? this.isDiscrete = !1 : this.isDiscrete = !0, this.isDiscrete) {
      for (a = 0; a < t.length; a++) {
        var n = Math.round(t[a]);
        this.values.indexOf(n) < 0 && this.values.push(n);
      }
      this.dimension = 1, this.mean = (min(this.values) + max(this.values)) / 2, this.variance = (this.values.length * this.values.length - 1) / 12, this.std = Math.sqrt(this.variance);
    }
    else {
      "matrix" == e ? (this.a = min(r, 1).val, this.b = max(r).val, this.dimension = this.a.length) : (this.a = minVector(r), this.b = maxVector(r), this.dimension = 1), this.mean = mul(.5, add(this.a, this.b));
      var o = sub(this.b, this.a);
      this.variance = entrywisediv(entrywisemul(o, o), 12), this.std = sqrt(this.variance), this.px = 1 / prod(sub(this.b, this.a));
    }
    return this;
  }, Gaussian.prototype.construct = function (r, e) {
    if (void 0 === r) {
      var t = 1;
    }
    else if ("matrix" == type(r)) {
      var t = r.val;
    }
    else {
      var t = r;
    }
    var a = size(t, 1);
    if (void 0 === e) {
      if (1 == a) {
        var e = 1;
      }
      else {
        var e = ones(a);
      }
    }
    this.mean = t, this.variance = e, this.std = sqrt(this.variance), this.dimension = a;
  }, Gaussian.prototype.pdf = function (r) {
    if (1 == this.dimension) {
      if ("number" == typeof r) {
        var e = r - this.mean;
        return Math.exp(-e * e / (2 * this.variance)) / (this.std * Math.sqrt(2 * Math.PI));
      }
      var e = sub(r, this.mean);
      return entrywisediv(exp(entrywisediv(entrywisemul(e, e), -2 * this.variance)), this.std * Math.sqrt(2 * Math.PI));
    }
    if ("vector" == type(r)) {
      if (r.length != this.dimension) {
        return void error("Error in Gaussian.pdf(x): x.length = " + r.length + " != " + this.dimension + " = Gaussian.dimension.");
      }
      var e = subVectors(r, this.mean),
          t = -.5 * dot(e, divVectors(e, this.variance));
      return Math.exp(t) / (Math.pow(2 * Math.PI, .5 * this.dimension) * Math.sqrt(prodVector(this.variance)));
    }
    if (r.n != this.dimension) {
      return void error("Error in Gaussian.pdf(X): X.n = " + r.n + " != " + this.dimension + " = Gaussian.dimension.");
    }
    for (var a = zeros(r.m), n = Math.pow(2 * Math.PI, .5 * this.dimension) * Math.sqrt(prodVector(this.variance)), o = 0; o < r.m; o++) {
      var e = subVectors(r.row(o), this.mean),
          t = -.5 * dot(e, divVectors(e, this.variance));
      a[o]  = Math.exp(t) / n;
    }
    return a;
  }, Gaussian.prototype.sample = function (r) {
    if (void 0 === r) {
      var r = 1;
    }
    if (1 == r) {
      var e = add(entrywisemul(this.std, randn(this.dimension)), this.mean);
    }
    else {
      var t = ones(r),
          e = add(entrywisemul(outerprod(t, this.std), randn(r, this.dimension)), outerprod(t, this.mean));
    }
    return e;
  }, Gaussian.prototype.estimate = function (r) {
    return "matrix" == type(r) ? (this.mean = mean(r, 1).val, this.variance = variance(r, 1).val, this.std = void 0, this.dimension = r.n) : (this.mean = mean(r), this.variance = variance(r), this.std = Math.sqrt(this.variance), this.dimension = 1), this;
  }, mvGaussian.prototype.construct = function (r, e) {
    if (void 0 === r) {
      var t = 1;
    }
    else if ("matrix" == type(r)) {
      var t = r.val;
    }
    else {
      var t = r;
    }
    var a = size(t, 1);
    if (void 0 === e) {
      if (1 == a) {
        var e = 1;
      }
      else {
        var e = eye(a);
      }
    }
    this.mean = t, this.variance = e, this.dimension = a, this.L = chol(this.variance), void 0 === this.L && error("Error in new Distribution (mvGaussian, mu, Sigma): Sigma is not positive definite"), this.det = det(this.variance);
  }, mvGaussian.prototype.pdf = function (r) {
    if (1 == this.dimension) {
      if ("number" == typeof r) {
        var e = r - this.mean;
        return Math.exp(-e * e / (2 * this.variance)) / Math.sqrt(2 * this.variance * Math.PI);
      }
      var e = sub(r, this.mean);
      return entrywisediv(exp(entrywisediv(entrywisemul(e, e), -2 * this.variance)), Math.sqrt(2 * this.variance * Math.PI));
    }
    if ("vector" == type(r)) {
      if (r.length != this.dimension) {
        return void error("Error in mvGaussian.pdf(x): x.length = " + r.length + " != " + this.dimension + " = mvGaussian.dimension.");
      }
      var e = subVectors(r, this.mean), t = -.5 * dot(e, cholsolve(this.L, e));
      return Math.exp(t) / Math.sqrt(Math.pow(2 * Math.PI, this.dimension) * this.det);
    }
    if (r.n != this.dimension) {
      return void error("Error in Gaussian.pdf(X): X.n = " + r.n + " != " + this.dimension + " = Gaussian.dimension.");
    }
    for (var a = zeros(r.m), n = Math.sqrt(Math.pow(2 * Math.PI, this.dimension) * this.det), o = 0; o < r.m; o++) {
      var e = subVectors(r.row(o), this.mean),
          t = -.5 * dot(e, cholsolve(this.L, e));
      a[o]  = Math.exp(t) / n;
    }
    return a;
  }, mvGaussian.prototype.sample = function (r) {
    if (void 0 === r) {
      var r = 1;
    }
    var e = add(mul(randn(r, this.dimension), transpose(this.L)), outerprod(ones(r), this.mean));
    return 1 == r ? e.val : e;
  }, mvGaussian.prototype.estimate = function (r) {
    if ("matrix" == type(r)) {
      return this.mean = mean(r, 1).val, this.variance = cov(r), this.dimension = r.n, this.L = chol(this.variance), void 0 === this.L && error("Error in mvGaussian.estimate(X): covariance estimate is not positive definite"), this.det = det(this.variance), this;
    }
    error("mvGaussian.estimate( X ) needs a matrix X");
  }, Bernoulli.prototype.construct = function (r) {
    if (void 0 === r) {
      var r = .5;
    }
    var e = size(r, 1);
    this.mean = r, this.variance = entrywisemul(r, sub(1, r)), this.std = sqrt(this.variance), this.dimension = e;
  }, Bernoulli.prototype.pdf = Bernoulli.prototype.pmf = function (r) {
    const e = type(r);
    var t   = function (r, e) {
      return 1 == r ? e : 0 == r ? 1 - e : 0;
    };
    if (1 != this.dimension) {
      switch (e) {
        case"vector":
          for (var a = t(r[0], this.mean[0]), n = 1; n < this.dimension; n++) {
            a *= t(r[n], this.mean[n]);
          }
          break;
        case"spvector":
          for (var a = 1, o = 0; o < r.ind[0]; o++) {
            a *= 1 - this.mean[o];
          }
          for (var n = 0; n < r.val.length - 1; n++) {
            a *= this.mean[r.ind[n]];
            for (var o = r.ind[n] + 1; o < r.ind[n + 1]; o++) {
              a *= 1 - this.mean[o];
            }
          }
          a *= this.mean[r.ind[n]];
          for (var o = r.ind[n] + 1; o < this.dimension; o++) {
            a *= 1 - this.mean[o];
          }
          break;
        case"matrix":
          for (var a = zeros(r.m), i = 0; i < r.m; i++) {
            a[i] = t(r.val[i * r.n], this.mean[0]);
            for (var n = 1; n < r.n; n++) {
              a[i] *= t(r.val[i * r.n + n], this.mean[n]);
            }
          }
          break;
        case"spmatrix":
          for (var a = ones(r.m), i = 0; i < r.m; i++) {
            for (var s = r.row(i), o = 0; o < s.ind[0]; o++) {
              a[i] *= 1 - this.mean[o];
            }
            for (var n = 0; n < s.val.length - 1; n++) {
              a[i] *= this.mean[s.ind[n]];
              for (var o = s.ind[n] + 1; o < s.ind[n + 1]; o++) {
                a[i] *= 1 - this.mean[o];
              }
            }
            a[i] *= this.mean[s.ind[n]];
            for (var o = s.ind[n] + 1; o < this.dimension; o++) {
              a[i] *= 1 - this.mean[o];
            }
          }
          break;
        default:
          var a = void 0;
      }
      return a;
    }
    if ("number" == e) {
      return t(r, this.mean);
    }
    if ("vector" == e) {
      for (var a = zeros(r.length), i = 0; i < r.length; i++) {
        a[i] = t(r[i], this.mean);
      }
      return a;
    }
    if ("matrix" == e) {
      for (var l = zeros(r.m, r.n), c = r.m * r.n, n = 0; n < c; n++) {
        l.val[n] = t(r.val[n], this.mean);
      }
      return l;
    }
  }, Bernoulli.prototype.logpdf = Bernoulli.prototype.logpmf = function (r) {
    const e = type(r);
    var t   = function (r, e) {
      return 1 == r ? Math.log(e) : 0 == r ? Math.log(1 - e) : -1 / 0;
    };
    if (1 != this.dimension) {
      switch (e) {
        case"vector":
          for (var a = 0, n = 0; n < this.dimension; n++) {
            a += t(r[n], this.mean[n]);
          }
          break;
        case"spvector":
          for (var a = 0, o = 0; o < r.ind[0]; o++) {
            a += Math.log(1 - this.mean[o]);
          }
          for (var n = 0; n < r.val.length - 1; n++) {
            a += Math.log(this.mean[r.ind[n]]);
            for (var o = r.ind[n] + 1; o < r.ind[n + 1]; o++) {
              a += Math.log(1 - this.mean[o]);
            }
          }
          a += Math.log(this.mean[r.ind[n]]);
          for (var o = r.ind[n] + 1; o < this.dimension; o++) {
            a += Math.log(1 - this.mean[o]);
          }
          break;
        case"matrix":
          for (var a = zeros(r.m), i = 0; i < r.m; i++) {
            for (var n = 0; n < r.n; n++) {
              a[i] += t(r.val[i * r.n + n], this.mean[n]);
            }
          }
          break;
        case"spmatrix":
          for (var a = zeros(r.m), i = 0; i < r.m; i++) {
            for (var s = r.row(i), o = 0; o < s.ind[0]; o++) {
              a[i] += Math.log(1 - this.mean[o]);
            }
            for (var n = 0; n < s.val.length - 1; n++) {
              a[i] += Math.log(this.mean[s.ind[n]]);
              for (var o = s.ind[n] + 1; o < s.ind[n + 1]; o++) {
                a[i] += Math.log(1 - this.mean[o]);
              }
            }
            a[i] += Math.log(this.mean[s.ind[n]]);
            for (var o = s.ind[n] + 1; o < this.dimension; o++) {
              a[i] += Math.log(1 - this.mean[o]);
            }
          }
          break;
        default:
          var a = void 0;
      }
      return a;
    }
    if ("number" == e) {
      return t(r, this.mean);
    }
    if ("vector" == e) {
      for (var a = zeros(r.length), i = 0; i < r.length; i++) {
        a[i] = t(r[i], this.mean);
      }
      return a;
    }
    if ("matrix" == e) {
      for (var l = zeros(r.m, r.n), c = r.m * r.n, n = 0; n < c; n++) {
        l.val[n] = t(r.val[n], this.mean);
      }
      return l;
    }
  }, Bernoulli.prototype.sample = function (r) {
    return void 0 === r || 1 == r ? isLower(rand(this.dimension), this.mean) : isLower(rand(r, this.dimension), outerprod(ones(r), this.mean));
  }, Bernoulli.prototype.estimate = function (r) {
    switch (type(r)) {
      case"matrix":
      case"spmatrix":
        this.mean = mean(r, 1).val, this.variance = entrywisemul(this.mean, sub(1, this.mean)), this.std = sqrt(this.variance), this.dimension = r.n;
        break;
      case"vector":
      case"spvector":
        this.dimension = 1, this.mean = mean(r), this.variance = this.mean * (1 - this.mean), this.std = Math.sqrt(this.variance);
        break;
      default:
        error("Error in Bernoulli.estimate( X ): X must be a (sp)matrix or (sp)vector.");
    }
    return this;
  }, Poisson.prototype.construct = function (r) {
    if (void 0 === r) {
      var r = 5;
    }
    var e = size(r, 1);
    this.mean = r, this.variance = this.mean, this.std = sqrt(this.variance), this.dimension = e;
  }, Poisson.prototype.pdf = Poisson.prototype.pmf = function (r) {
    const e = type(r);
    var t   = function (r, e) {
      if (r < 0 || Math.round(r) != r) {
        return 0;
      }
      if (0 == r) {
        return 1;
      }
      for (var t = e, a = 2; a <= r; a++) {
        t *= e / a;
      }
      return Math.exp(-e) * t;
    };
    if (1 == this.dimension) {
      if ("number" == e) {
        return t(r, this.mean);
      }
      if ("vector" == e) {
        for (var a = zeros(r.length), n = 0; n < r.length; n++) {
          a[n] = t(r[n], this.mean);
        }
        return a;
      }
      if ("matrix" == e) {
        for (var o = zeros(r.m, r.n), i = r.m * r.n, s = 0; s < i; s++) {
          o.val[s] = t(r.val[s], this.mean);
        }
        return a;
      }
    }
    else {
      if ("vector" == e) {
        for (var a = t(r[0], this.mean[0]), s = 0; s < this.dimension; s++) {
          a *= t(r[s], this.mean[s]);
        }
        return a;
      }
      if ("matrix" == e) {
        for (var a = zeros(r.m), n = 0; n < r.m; n++) {
          a[n] = t(r.val[n * r.n], this.mean[0]);
          for (var s = 0; s < r.n; s++) {
            a[n] *= t(r.val[n * r.n + s], this.mean[s]);
          }
        }
        return a;
      }
    }
  }, Poisson.prototype.sample = function (r) {
    var e = function (r) {
      var e   = Math.random(), t = 0;
      const a = Math.exp(-r);
      for (; e > a;) {
        e *= Math.random(), t++;
      }
      return t;
    };
    if (void 0 === r || 1 == r) {
      if (1 == this.dimension) {
        return e(this.mean);
      }
      var t = zeros(this.dimension);
      for (k = 0; k < this.dimension; k++) {
        t[k] = e(this.mean[k]);
      }
      return t;
    }
    if (1 == this.dimension) {
      for (var a = zeros(r), n = 0; n < r; n++) {
        a[n] = e(this.mean);
      }
      return a;
    }
    for (var a = zeros(r, this.dimension), n = 0; n < r; n++) {
      for (k = 0; k < this.dimension; k++) {
        a[n * this.dimension + k] = e(this.mean[k]);
      }
    }
    return a;
  }, Poisson.prototype.estimate = function (r) {
    return "matrix" == type(r) ? (this.mean = mean(r, 1).val, this.variance = this.mean, this.std = sqrt(this.variance), this.dimension = r.n) : (this.dimension = 1, this.mean = mean(r), this.variance = this.mean, this.std = Math.sqrt(this.variance)), this;
  };
  const Complex_I = new Complex(0, 1);
  Complex.prototype.toString = function () {
    return this.re + (this.im >= 0 ? " + " : " - ") + Math.abs(this.im) + "i";
  }, Complex.prototype.info = function () {
    return this.re + (this.im >= 0 ? " + " : " - ") + Math.abs(this.im) + "i";
  };
  var absComplex = modulus;
  return ComplexVector.prototype.toString = function () {
    return "[" + this.type + " of size " + this.length + "]";
  }, ComplexMatrix.prototype.toString = function () {
    return "[" + this.type + " of size " + this.m + " x " + this.n + "]";
  }, ComplexVector.prototype.get = function (r) {
    return new Complex(this.re[r], this.im[r]);
  }, ComplexMatrix.prototype.get = function (r, e) {
    return new Complex(this.re[r * this.n + e], this.im[r * this.n + e]);
  }, ComplexVector.prototype.set = function (r, e) {
    "number" == typeof e ? (this.re[r] = e, this.im[r] = 0) : (this.re[r] = e.re, this.im[r] = e.im);
  }, ComplexMatrix.prototype.set = function (r, e, t) {
    "number" == typeof t ? (this.re[r * this.n + e] = t, this.im[r * this.n + e] = 0) : (this.re[r * this.n + e] = t.re, this.im[r * this.n + e] = t.im);
  }, ComplexVector.prototype.getSubVector = function (r) {
    const e = r.length;
    for (var t = new ComplexVector(e), a = 0; a < e; a++) {
      t.re[a] = this.re[r[a]], t.im[a] = this.im[r[a]];
    }
    return t;
  }, ComplexVector.prototype.setVectorScalar = function (r, e) {
    var t;
    for (t = 0; t < r.length; t++) {
      A.set(r[t], e);
    }
  }, ComplexVector.prototype.setVectorVector = function (r, e) {
    var t;
    for (t = 0; t < r.length; t++) {
      A.set(r[t], e[t]);
    }
  }, ComplexMatrix.prototype.transpose = function () {
    const r = A.m, e = A.n;
    if (r > 1) {
      var t, a, n = new ComplexMatrix(e, r), o = 0;
      for (a = 0; a < r; a++) {
        var i = 0;
        for (t = 0; t < e; t++) {
          n.re[i + a] = A.re[o + t], n.im[i + a] = A.im[o + t], i += r;
        }
        o += e;
      }
      return n;
    }
    return new ComplexVector(A.re, A.im);
  }, {
    laloprint: laloprint,
    lalo: lalo,
    Lalolab: Lalolab,
    load_data: load_data,
    LALOLIB_ERROR: LALOLIB_ERROR,
    EPS: EPS,
    isZero: isZero,
    tic: tic,
    toc: toc,
    type: type,
    isArrayOfNumbers: isArrayOfNumbers,
    isScalar: isScalar,
    printVector: printVector,
    Matrix: Matrix,
    array2mat: array2mat,
    array2vec: array2vec,
    size: size,
    ones: ones,
    zeros: zeros,
    eye: eye,
    diag: diag,
    vec: vec,
    matrixCopy: matrixCopy,
    vectorCopy: vectorCopy,
    vectorCopyInto: vectorCopyInto,
    arrayCopy: arrayCopy,
    appendRow: appendRow,
    reshape: reshape,
    get: get,
    getSubMatrix: getSubMatrix,
    getRows: getRows,
    getCols: getCols,
    getSubVector: getSubVector,
    getSubArray: getSubArray,
    getrowref: getrowref,
    set: set,
    setVectorScalar: setVectorScalar,
    setVectorVector: setVectorVector,
    setMatrixScalar: setMatrixScalar,
    setMatrixMatrix: setMatrixMatrix,
    setMatrixColVector: setMatrixColVector,
    setMatrixRowVector: setMatrixRowVector,
    setRows: setRows,
    setCols: setCols,
    dense: dense,
    supp: supp,
    range: range,
    swaprows: swaprows,
    swapcols: swapcols,
    randnScalar: randnScalar,
    randn: randn,
    randVector: randVector,
    randMatrix: randMatrix,
    rand: rand,
    randnsparse: randnsparse,
    randsparse: randsparse,
    randperm: randperm,
    apply: apply,
    aaplyVector: applyVector,
    applyMatrix: applyMatrix,
    applyComplexVector: applyComplexVector,
    applyComplexMatrix: applyComplexMatrix,
    mul: mul,
    mulScalarVector: mulScalarVector,
    mulScalarMatrix: mulScalarMatrix,
    dot: dot,
    mulMatrixVector: mulMatrixVector,
    mulMatrixTransVector: mulMatrixTransVector,
    mulMatrixMatrix: mulMatrixMatrix,
    entrywisemulVector: entrywisemulVector,
    entrywisemulMatrix: entrywisemulMatrix,
    entrywisemul: entrywisemul,
    saxpy: saxpy,
    gaxpy: gaxpy,
    divVectorScalar: divVectorScalar,
    divScalarVector: divScalarVector,
    divVectors: divVectors,
    divMatrixScalar: divMatrixScalar,
    divScalarMatrix: divScalarMatrix,
    divMatrices: divMatrices,
    entrywisediv: entrywisediv,
    outerprodVectors: outerprodVectors,
    outerprod: outerprod,
    addScalarVector: addScalarVector,
    addScalarMatrix: addScalarMatrix,
    addVectors: addVectors,
    addMatrices: addMatrices,
    add: add,
    subScalarVector: subScalarVector,
    subVectorScalar: subVectorScalar,
    subScalarMatrix: subScalarMatrix,
    subMatrixScalar: subMatrixScalar,
    subVectors: subVectors,
    subMatrices: subMatrices,
    sub: sub,
    pow: pow,
    minus: minus,
    minusVector: minusVector,
    minusMatrix: minusMatrix,
    minVector: minVector,
    minMatrix: minMatrix,
    minVectorScalar: minVectorScalar,
    minMatrixScalar: minMatrixScalar,
    minMatrixRows: minMatrixRows,
    minMatrixCols: minMatrixCols,
    minVectorVector: minVectorVector,
    minMatrixMatrix: minMatrixMatrix,
    min: min,
    maxVector: maxVector,
    maxMatrix: maxMatrix,
    maxVectorScalar: maxVectorScalar,
    maxMatrixScalar: maxMatrixScalar,
    maxMatrixRows: maxMatrixRows,
    maxMatrixCols: maxMatrixCols,
    maxVectorVector: maxVectorVector,
    maxMatrixMatrix: maxMatrixMatrix,
    max: max,
    transposeMatrix: transposeMatrix,
    transposeVector: transposeVector,
    transpose: transpose,
    det: det,
    trace: trace,
    triiu: triu,
    tril: tril,
    issymmetric: issymmetric,
    mat: mat,
    isEqual: isEqual,
    isNotEqual: isNotEqual,
    isGreater: isGreater,
    isGreaterOrEqual: isGreaterOrEqual,
    isLower: isLower,
    isLowerOrEqual: isLowerOrEqual,
    find: find,
    argmax: argmax,
    findmax: findmax,
    argmin: argmin,
    findmin: findmin,
    sort: sort,
    sumVector: sumVector,
    sumMatrix: sumMatrix,
    sumMatrixRows: sumMatrixRows,
    sumMatrixCols: sumMatrixCols,
    sum: sum,
    prodVector: prodVector,
    prodMatrix: prodMatrix,
    prodMatrixRows: prodMatrixRows,
    prodMatrixCols: prodMatrixCols,
    prod: prod,
    mean: mean,
    variance: variance,
    std: std,
    cov: cov,
    xtx: xtx,
    norm: norm,
    norm1: norm1,
    norminf: norminf,
    normp: normp,
    normnuc: normnuc,
    norm0: norm0,
    norm0Vector: norm0Vector,
    solve: solve,
    cholsolve: cholsolve,
    inv: inv,
    chol: chol,
    ldlsymmetricpivoting: ldlsymmetricpivoting,
    qr: qr,
    solvecg: solvecg,
    cgnr: cgnr,
    eig: eig,
    eigs: eigs,
    svd: svd,
    rank: rank,
    nullspace: nullspace,
    orth: orth,
    nchoosek: nchoosek,
    mvnrnd: mvnrnd,
    Distribution: Distribution,
    Uniform: Uniform,
    Gaussian: Gaussian,
    mvGaussian: mvGaussian,
    Bernoulli: Bernoulli,
    Poisson: Poisson,
    spVector: spVector,
    spMatrix: spMatrix,
    spgetRows: spgetRows,
    fullVector: fullVector,
    fullMatrix: fullMatrix,
    full: full,
    sparseVector: sparseVector,
    sparseMatrix: sparseMatrix,
    sparseMatrixRowMajor: sparseMatrixRowMajor,
    sparse: sparse,
    speye: speye,
    spdiag: spdiag,
    transposespVector: transposespVector,
    transposespMatrix: transposespMatrix,
    spmat: spmat,
    mulScalarspVector: mulScalarspVector,
    mulScalarspMatrix: mulScalarspMatrix,
    spdot: spdot,
    dotspVectorVector: dotspVectorVector,
    mulMatrixspVector: mulMatrixspVector,
    mulspMatrixVector: mulspMatrixVector,
    mulspMatrixTransVector: mulspMatrixTransVector,
    mulspMatrixspVector: mulspMatrixspVector,
    mulspMatrixTransspVector: mulspMatrixTransspVector,
    mulspMatrixspMatrix: mulspMatrixspMatrix,
    mulMatrixspMatrix: mulMatrixspMatrix,
    mulspMatrixMatrix: mulspMatrixMatrix,
    entrywisemulspVectors: entrywisemulspVectors,
    entrywisemulspVectorVector: entrywisemulspVectorVector,
    entrywisemulspMatrices: entrywisemulspMatrices,
    entrywisemulspMatrixMatrix: entrywisemulspMatrixMatrix,
    addScalarspVector: addScalarspVector,
    addVectorspVector: addVectorspVector,
    addspVectors: addspVectors,
    addScalarspMatrix: addScalarspMatrix,
    addMatrixspMatrix: addMatrixspMatrix,
    addspMatrices: addspMatrices,
    spsaxpy: spsaxpy,
    subScalarspVector: subScalarspVector,
    subVectorspVector: subVectorspVector,
    subspVectorVector: subspVectorVector,
    subspVectors: subspVectors,
    subScalarspMatrix: subScalarspMatrix,
    subspMatrixMatrix: subspMatrixMatrix,
    subMatrixspMatrix: subMatrixspMatrix,
    subspMatrices: subspMatrices,
    applyspVector: applyspVector,
    applyspMatrix: applyspMatrix,
    sumspVector: sumspVector,
    sumspMatrix: sumspMatrix,
    sumspMatrixRows: sumspMatrixRows,
    sumspMatrixCols: sumspMatrixCols,
    prodspMatrixRows: prodspMatrixRows,
    prodspMatrixCols: prodspMatrixCols,
    Complex: Complex,
    addComplex: addComplex,
    addComplexReal: addComplexReal,
    subComplex: subComplex,
    minusComplex: minusComplex,
    mulComplex: mulComplex,
    mulComplexReal: mulComplexReal,
    divComplex: divComplex,
    conj: conj,
    modulus: modulus,
    absComplex: absComplex,
    expComplex: expComplex,
    ComplexVector: ComplexVector,
    ComplexMatrix: ComplexMatrix,
    real: real,
    imag: imag,
    transposeComplexMatrix: transposeComplexMatrix,
    addComplexVectors: addComplexVectors,
    subComplexVectors: subComplexVectors,
    addComplexMatrices: addComplexMatrices,
    subComplexMatrices: subComplexMatrices,
    addComplexVectorVector: addComplexVectorVector,
    subComplexVectorVector: subComplexVectorVector,
    addComplexMatrixMatrix: addComplexMatrixMatrix,
    subComplexMatrixMatrix: subComplexMatrixMatrix,
    addScalarComplexVector: addScalarComplexVector,
    subScalarComplexVector: subScalarComplexVector,
    addScalarComplexMatrix: addScalarComplexMatrix,
    entrywisemulComplexVectors: entrywisemulComplexVectors,
    entrywisedivComplexVectors: entrywisedivComplexVectors,
    entrywisemulComplexMatrices: entrywisemulComplexMatrices,
    entrywisedivComplexMatrices: entrywisedivComplexMatrices,
    entrywisemulComplexVectorVector: entrywisemulComplexVectorVector,
    entrywisemulComplexMatrixMatrix: entrywisemulComplexMatrixMatrix,
    minusComplexVector: minusComplexVector,
    minusComplexMatrix: minusComplexMatrix,
    sumComplexVector: sumComplexVector,
    sumComplexMatrix: sumComplexMatrix,
    norm1ComplexVector: norm1ComplexVector,
    norm2ComplexVector: norm2ComplexVector,
    normFroComplexMatrix: normFroComplexMatrix,
    dotComplexVectors: dotComplexVectors,
    dotComplexVectorVector: dotComplexVectorVector,
    mulScalarComplexVector: mulScalarComplexVector,
    mulComplexComplexVector: mulComplexComplexVector,
    mulComplexVector: mulComplexVector,
    mulScalarComplexMatrix: mulScalarComplexMatrix,
    mulComplexComplexMatrix: mulComplexComplexMatrix,
    mulComplexMatrix: mulComplexMatrix,
    mulComplexMatrixVector: mulComplexMatrixVector,
    mulComplexMatrixComplexVector: mulComplexMatrixComplexVector,
    mulComplexMatrices: mulComplexMatrices,
    mulComplexMatrixMatrix: mulComplexMatrixMatrix,
    fft: fft,
    ifft: ifft,
    dft: dft,
    idft: idft,
    spectrum: spectrum,
    minimize: minimize,
    secant: secant,
    steepestdescent: steepestdescent,
    bfgs: bfgs
  };
}();
