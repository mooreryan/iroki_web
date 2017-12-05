/*
 * canvg.js - Javascript SVG parser and renderer on Canvas
 * MIT Licensed
 * Gabe Lerner (gabelerner@gmail.com)
 * http://code.google.com/p/canvg/
 *
 * Requires: rgbcolor.js - http://www.phpied.com/rgb-color-parser-in-javascript/
 */
!function(t,e){"use strict"
  "undefined"!=typeof define&&define.amd?define("canvgModule",["rgbcolor","stackblur"],e):"undefined"!=typeof module&&module.exports&&(module.exports=e(require("rgbcolor"),require("stackblur"))),t.canvg=e(t.RGBColor,t.stackBlur)}("undefined"!=typeof window?window:this,function(t,e){function n(t){var e=[0,0,0],i=function(i,n){var s=t.match(i)
  null!=s&&(e[n]+=s.length,t=t.replace(i," "))}
  return t=t.replace(/:not\(([^\)]*)\)/g,"     $1 "),t=t.replace(/{[\s\S]*/gm," "),i(o,1),i(l,0),i(h,1),i(u,2),i(c,1),i(f,1),t=t.replace(/[\*\s\+>~]/g," "),t=t.replace(/[#\.]/g," "),i(p,2),e.join("")}function s(s){var r={opts:s}
  r.FRAMERATE=30,r.MAX_VIRTUAL_PIXELS=3e4,r.log=function(t){},1==r.opts.log&&"undefined"!=typeof console&&(r.log=function(t){console.log(t)}),r.init=function(t){var e=0
    r.UniqueId=function(){return e++,"canvg"+e},r.Definitions={},r.Styles={},r.StylesSpecificity={},r.Animations=[],r.Images=[],r.ctx=t,r.ViewPort=new function(){this.viewPorts=[],this.Clear=function(){this.viewPorts=[]},this.SetCurrent=function(t,e){this.viewPorts.push({width:t,height:e})},this.RemoveCurrent=function(){this.viewPorts.pop()},this.Current=function(){return this.viewPorts[this.viewPorts.length-1]},this.width=function(){return this.Current().width},this.height=function(){return this.Current().height},this.ComputeSize=function(t){return null!=t&&"number"==typeof t?t:"x"==t?this.width():"y"==t?this.height():Math.sqrt(Math.pow(this.width(),2)+Math.pow(this.height(),2))/Math.sqrt(2)}}},r.init(),r.ImagesLoaded=function(){for(var t=0;t<r.Images.length;t++)if(!r.Images[t].loaded)return!1
    return!0},r.trim=function(t){return t.replace(/^\s+|\s+$/g,"")},r.compressSpaces=function(t){return t.replace(/[\s\r\t\n]+/gm," ")},r.ajax=function(t){var e
    return e=window.XMLHttpRequest?new XMLHttpRequest:new ActiveXObject("Microsoft.XMLHTTP"),e?(e.open("GET",t,!1),e.send(null),e.responseText):null},r.parseXml=function(t){if("undefined"!=typeof Windows&&"undefined"!=typeof Windows.Data&&"undefined"!=typeof Windows.Data.Xml){var e=new Windows.Data.Xml.Dom.XmlDocument,i=new Windows.Data.Xml.Dom.XmlLoadSettings
    return i.prohibitDtd=!1,e.loadXml(t,i),e}if(window.DOMParser){var n=new DOMParser
    return n.parseFromString(t,"text/xml")}t=t.replace(/<!DOCTYPE svg[^>]*>/,"")
    var e=new ActiveXObject("Microsoft.XMLDOM")
    return e.async="false",e.loadXML(t),e},r.Property=function(t,e){this.name=t,this.value=e},r.Property.prototype.getValue=function(){return this.value},r.Property.prototype.hasValue=function(){return null!=this.value&&""!==this.value},r.Property.prototype.numValue=function(){if(!this.hasValue())return 0
    var t=parseFloat(this.value)
    return(this.value+"").match(/%$/)&&(t/=100),t},r.Property.prototype.valueOrDefault=function(t){return this.hasValue()?this.value:t},r.Property.prototype.numValueOrDefault=function(t){return this.hasValue()?this.numValue():t},r.Property.prototype.addOpacity=function(e){var i=this.value
    if(null!=e.value&&""!=e.value&&"string"==typeof this.value){var n=new t(this.value)
      n.ok&&(i="rgba("+n.r+", "+n.g+", "+n.b+", "+e.numValue()+")")}return new r.Property(this.name,i)},r.Property.prototype.getDefinition=function(){var t=this.value.match(/#([^\)'"]+)/)
    return t&&(t=t[1]),t||(t=this.value),r.Definitions[t]},r.Property.prototype.isUrlDefinition=function(){return 0==this.value.indexOf("url(")},r.Property.prototype.getFillStyleDefinition=function(t,e){var i=this.getDefinition()
    if(null!=i&&i.createGradient)return i.createGradient(r.ctx,t,e)
    if(null!=i&&i.createPattern){if(i.getHrefAttribute().hasValue()){var n=i.attribute("patternTransform")
      i=i.getHrefAttribute().getDefinition(),n.hasValue()&&(i.attribute("patternTransform",!0).value=n.value)}return i.createPattern(r.ctx,t)}return null},r.Property.prototype.getDPI=function(t){return 96},r.Property.prototype.getEM=function(t){var e=12,i=new r.Property("fontSize",r.Font.Parse(r.ctx.font).fontSize)
    return i.hasValue()&&(e=i.toPixels(t)),e},r.Property.prototype.getUnits=function(){var t=this.value+""
    return t.replace(/[0-9\.\-]/g,"")},r.Property.prototype.toPixels=function(t,e){if(!this.hasValue())return 0
    var i=this.value+""
    if(i.match(/em$/))return this.numValue()*this.getEM(t)
    if(i.match(/ex$/))return this.numValue()*this.getEM(t)/2
    if(i.match(/px$/))return this.numValue()
    if(i.match(/pt$/))return this.numValue()*this.getDPI(t)*(1/72)
    if(i.match(/pc$/))return 15*this.numValue()
    if(i.match(/cm$/))return this.numValue()*this.getDPI(t)/2.54
    if(i.match(/mm$/))return this.numValue()*this.getDPI(t)/25.4
    if(i.match(/in$/))return this.numValue()*this.getDPI(t)
    if(i.match(/%$/))return this.numValue()*r.ViewPort.ComputeSize(t)
    var n=this.numValue()
    return e&&n<1?n*r.ViewPort.ComputeSize(t):n},r.Property.prototype.toMilliseconds=function(){if(!this.hasValue())return 0
    var t=this.value+""
    return t.match(/s$/)?1e3*this.numValue():t.match(/ms$/)?this.numValue():this.numValue()},r.Property.prototype.toRadians=function(){if(!this.hasValue())return 0
    var t=this.value+""
    return t.match(/deg$/)?this.numValue()*(Math.PI/180):t.match(/grad$/)?this.numValue()*(Math.PI/200):t.match(/rad$/)?this.numValue():this.numValue()*(Math.PI/180)}
  var o={baseline:"alphabetic","before-edge":"top","text-before-edge":"top",middle:"middle",central:"middle","after-edge":"bottom","text-after-edge":"bottom",ideographic:"ideographic",alphabetic:"alphabetic",hanging:"hanging",mathematical:"alphabetic"}
  return r.Property.prototype.toTextBaseline=function(){return this.hasValue()?o[this.value]:null},r.Font=new function(){this.Styles="normal|italic|oblique|inherit",this.Variants="normal|small-caps|inherit",this.Weights="normal|bold|bolder|lighter|100|200|300|400|500|600|700|800|900|inherit",this.CreateFont=function(t,e,i,n,s,a){var o=null!=a?this.Parse(a):this.CreateFont("","","","","",r.ctx.font)
    return{fontFamily:s||o.fontFamily,fontSize:n||o.fontSize,fontStyle:t||o.fontStyle,fontWeight:i||o.fontWeight,fontVariant:e||o.fontVariant,toString:function(){return[this.fontStyle,this.fontVariant,this.fontWeight,this.fontSize,this.fontFamily].join(" ")}}}
    var t=this
    this.Parse=function(e){for(var i={},n=r.trim(r.compressSpaces(e||"")).split(" "),s={fontSize:!1,fontStyle:!1,fontWeight:!1,fontVariant:!1},a="",o=0;o<n.length;o++)s.fontStyle||t.Styles.indexOf(n[o])==-1?s.fontVariant||t.Variants.indexOf(n[o])==-1?s.fontWeight||t.Weights.indexOf(n[o])==-1?s.fontSize?"inherit"!=n[o]&&(a+=n[o]):("inherit"!=n[o]&&(i.fontSize=n[o].split("/")[0]),s.fontStyle=s.fontVariant=s.fontWeight=s.fontSize=!0):("inherit"!=n[o]&&(i.fontWeight=n[o]),s.fontStyle=s.fontVariant=s.fontWeight=!0):("inherit"!=n[o]&&(i.fontVariant=n[o]),s.fontStyle=s.fontVariant=!0):("inherit"!=n[o]&&(i.fontStyle=n[o]),s.fontStyle=!0)
      return""!=a&&(i.fontFamily=a),i}},r.ToNumberArray=function(t){for(var e=r.trim(r.compressSpaces((t||"").replace(/,/g," "))).split(" "),i=0;i<e.length;i++)e[i]=parseFloat(e[i])
    return e},r.Point=function(t,e){this.x=t,this.y=e},r.Point.prototype.angleTo=function(t){return Math.atan2(t.y-this.y,t.x-this.x)},r.Point.prototype.applyTransform=function(t){var e=this.x*t[0]+this.y*t[2]+t[4],i=this.x*t[1]+this.y*t[3]+t[5]
    this.x=e,this.y=i},r.CreatePoint=function(t){var e=r.ToNumberArray(t)
    return new r.Point(e[0],e[1])},r.CreatePath=function(t){for(var e=r.ToNumberArray(t),i=[],n=0;n<e.length;n+=2)i.push(new r.Point(e[n],e[n+1]))
    return i},r.BoundingBox=function(t,e,n,s){this.x1=Number.NaN,this.y1=Number.NaN,this.x2=Number.NaN,this.y2=Number.NaN,this.x=function(){return this.x1},this.y=function(){return this.y1},this.width=function(){return this.x2-this.x1},this.height=function(){return this.y2-this.y1},this.addPoint=function(t,e){null!=t&&((isNaN(this.x1)||isNaN(this.x2))&&(this.x1=t,this.x2=t),t<this.x1&&(this.x1=t),t>this.x2&&(this.x2=t)),null!=e&&((isNaN(this.y1)||isNaN(this.y2))&&(this.y1=e,this.y2=e),e<this.y1&&(this.y1=e),e>this.y2&&(this.y2=e))},this.addX=function(t){this.addPoint(t,null)},this.addY=function(t){this.addPoint(null,t)},this.addBoundingBox=function(t){this.addPoint(t.x1,t.y1),this.addPoint(t.x2,t.y2)},this.addQuadraticCurve=function(t,e,i,n,s,a){var r=t+2/3*(i-t),o=e+2/3*(n-e),l=r+1/3*(s-t),h=o+1/3*(a-e)
    this.addBezierCurve(t,e,r,l,o,h,s,a)},this.addBezierCurve=function(t,e,n,s,a,r,o,l){var h=[t,e],u=[n,s],c=[a,r],f=[o,l]
    for(this.addPoint(h[0],h[1]),this.addPoint(f[0],f[1]),i=0;i<=1;i++){var p=function(t){return Math.pow(1-t,3)*h[i]+3*Math.pow(1-t,2)*t*u[i]+3*(1-t)*Math.pow(t,2)*c[i]+Math.pow(t,3)*f[i]},m=6*h[i]-12*u[i]+6*c[i],d=-3*h[i]+9*u[i]-9*c[i]+3*f[i],y=3*u[i]-3*h[i]
      if(0!=d){var v=Math.pow(m,2)-4*y*d
        if(!(v<0)){var g=(-m+Math.sqrt(v))/(2*d)
          0<g&&g<1&&(0==i&&this.addX(p(g)),1==i&&this.addY(p(g)))
          var x=(-m-Math.sqrt(v))/(2*d)
          0<x&&x<1&&(0==i&&this.addX(p(x)),1==i&&this.addY(p(x)))}}else{if(0==m)continue
        var b=-y/m
        0<b&&b<1&&(0==i&&this.addX(p(b)),1==i&&this.addY(p(b)))}}},this.isPointInBox=function(t,e){return this.x1<=t&&t<=this.x2&&this.y1<=e&&e<=this.y2},this.addPoint(t,e),this.addPoint(n,s)},r.Transform=function(t){var e=this
    this.Type={},this.Type.translate=function(t){this.p=r.CreatePoint(t),this.apply=function(t){t.translate(this.p.x||0,this.p.y||0)},this.unapply=function(t){t.translate(-1*this.p.x||0,-1*this.p.y||0)},this.applyToPoint=function(t){t.applyTransform([1,0,0,1,this.p.x||0,this.p.y||0])}},this.Type.rotate=function(t){var e=r.ToNumberArray(t)
      this.angle=new r.Property("angle",e[0]),this.cx=e[1]||0,this.cy=e[2]||0,this.apply=function(t){t.translate(this.cx,this.cy),t.rotate(this.angle.toRadians()),t.translate(-this.cx,-this.cy)},this.unapply=function(t){t.translate(this.cx,this.cy),t.rotate(-1*this.angle.toRadians()),t.translate(-this.cx,-this.cy)},this.applyToPoint=function(t){var e=this.angle.toRadians()
        t.applyTransform([1,0,0,1,this.p.x||0,this.p.y||0]),t.applyTransform([Math.cos(e),Math.sin(e),-Math.sin(e),Math.cos(e),0,0]),t.applyTransform([1,0,0,1,-this.p.x||0,-this.p.y||0])}},this.Type.scale=function(t){this.p=r.CreatePoint(t),this.apply=function(t){t.scale(this.p.x||1,this.p.y||this.p.x||1)},this.unapply=function(t){t.scale(1/this.p.x||1,1/this.p.y||this.p.x||1)},this.applyToPoint=function(t){t.applyTransform([this.p.x||0,0,0,this.p.y||0,0,0])}},this.Type.matrix=function(t){this.m=r.ToNumberArray(t),this.apply=function(t){t.transform(this.m[0],this.m[1],this.m[2],this.m[3],this.m[4],this.m[5])},this.unapply=function(t){var e=this.m[0],i=this.m[2],n=this.m[4],s=this.m[1],a=this.m[3],r=this.m[5],o=0,l=0,h=1,u=1/(e*(a*h-r*l)-i*(s*h-r*o)+n*(s*l-a*o))
      t.transform(u*(a*h-r*l),u*(r*o-s*h),u*(n*l-i*h),u*(e*h-n*o),u*(i*r-n*a),u*(n*s-e*r))},this.applyToPoint=function(t){t.applyTransform(this.m)}},this.Type.SkewBase=function(t){this.base=e.Type.matrix,this.base(t),this.angle=new r.Property("angle",t)},this.Type.SkewBase.prototype=new this.Type.matrix,this.Type.skewX=function(t){this.base=e.Type.SkewBase,this.base(t),this.m=[1,0,Math.tan(this.angle.toRadians()),1,0,0]},this.Type.skewX.prototype=new this.Type.SkewBase,this.Type.skewY=function(t){this.base=e.Type.SkewBase,this.base(t),this.m=[1,Math.tan(this.angle.toRadians()),0,1,0,0]},this.Type.skewY.prototype=new this.Type.SkewBase,this.transforms=[],this.apply=function(t){for(var e=0;e<this.transforms.length;e++)this.transforms[e].apply(t)},this.unapply=function(t){for(var e=this.transforms.length-1;e>=0;e--)this.transforms[e].unapply(t)},this.applyToPoint=function(t){for(var e=0;e<this.transforms.length;e++)this.transforms[e].applyToPoint(t)}
    for(var i=r.trim(r.compressSpaces(t)).replace(/\)([a-zA-Z])/g,") $1").replace(/\)(\s?,\s?)/g,") ").split(/\s(?=[a-z])/),n=0;n<i.length;n++){var s=r.trim(i[n].split("(")[0]),a=i[n].split("(")[1].replace(")",""),o=this.Type[s]
      if("undefined"!=typeof o){var l=new o(a)
        l.type=s,this.transforms.push(l)}}},r.AspectRatio=function(t,e,i,n,s,a,o,l,h,u){e=r.compressSpaces(e),e=e.replace(/^defer\s/,"")
    var c=e.split(" ")[0]||"xMidYMid",f=e.split(" ")[1]||"meet",p=i/n,m=s/a,d=Math.min(p,m),y=Math.max(p,m)
    "meet"==f&&(n*=d,a*=d),"slice"==f&&(n*=y,a*=y),h=new r.Property("refX",h),u=new r.Property("refY",u),h.hasValue()&&u.hasValue()?t.translate(-d*h.toPixels("x"),-d*u.toPixels("y")):(c.match(/^xMid/)&&("meet"==f&&d==m||"slice"==f&&y==m)&&t.translate(i/2-n/2,0),c.match(/YMid$/)&&("meet"==f&&d==p||"slice"==f&&y==p)&&t.translate(0,s/2-a/2),c.match(/^xMax/)&&("meet"==f&&d==m||"slice"==f&&y==m)&&t.translate(i-n,0),c.match(/YMax$/)&&("meet"==f&&d==p||"slice"==f&&y==p)&&t.translate(0,s-a)),"none"==c?t.scale(p,m):"meet"==f?t.scale(d,d):"slice"==f&&t.scale(y,y),t.translate(null==o?0:-o,null==l?0:-l)},r.Element={},r.EmptyProperty=new r.Property("EMPTY",""),r.Element.ElementBase=function(t){this.attributes={},this.styles={},this.stylesSpecificity={},this.children=[],this.attribute=function(t,e){var i=this.attributes[t]
    return null!=i?i:(1==e&&(i=new r.Property(t,""),this.attributes[t]=i),i||r.EmptyProperty)},this.getHrefAttribute=function(){for(var t in this.attributes)if("href"==t||t.match(/:href$/))return this.attributes[t]
    return r.EmptyProperty},this.style=function(t,e,i){var n=this.styles[t]
    if(null!=n)return n
    var s=this.attribute(t)
    if(null!=s&&s.hasValue())return this.styles[t]=s,s
    if(1!=i){var a=this.parent
      if(null!=a){var o=a.style(t)
        if(null!=o&&o.hasValue())return o}}return 1==e&&(n=new r.Property(t,""),this.styles[t]=n),n||r.EmptyProperty},this.render=function(t){if("none"!=this.style("display").value&&"hidden"!=this.style("visibility").value){if(t.save(),this.style("mask").hasValue()){var e=this.style("mask").getDefinition()
    null!=e&&e.apply(t,this)}else if(this.style("filter").hasValue()){var i=this.style("filter").getDefinition()
    null!=i&&i.apply(t,this)}else this.setContext(t),this.renderChildren(t),this.clearContext(t)
    t.restore()}},this.setContext=function(t){},this.clearContext=function(t){},this.renderChildren=function(t){for(var e=0;e<this.children.length;e++)this.children[e].render(t)},this.addChild=function(t,e){var i=t
    e&&(i=r.CreateElement(t)),i.parent=this,"title"!=i.type&&this.children.push(i)},this.addStylesFromStyleDefinition=function(){for(var e in r.Styles)if("@"!=e[0]&&a(t,e)){var i=r.Styles[e],n=r.StylesSpecificity[e]
    if(null!=i)for(var s in i){var o=this.stylesSpecificity[s]
      "undefined"==typeof o&&(o="000"),n>o&&(this.styles[s]=i[s],this.stylesSpecificity[s]=n)}}}
    var e=new RegExp("^[A-Z-]+$"),i=function(t){return e.test(t)?t.toLowerCase():t}
    if(null!=t&&1==t.nodeType){for(var n=0;n<t.attributes.length;n++){var s=t.attributes[n],o=i(s.nodeName)
      this.attributes[o]=new r.Property(o,s.value)}if(this.addStylesFromStyleDefinition(),this.attribute("style").hasValue())for(var l=this.attribute("style").value.split(";"),n=0;n<l.length;n++)if(""!=r.trim(l[n])){var h=l[n].split(":"),u=r.trim(h[0]),c=r.trim(h[1])
      this.styles[u]=new r.Property(u,c)}this.attribute("id").hasValue()&&null==r.Definitions[this.attribute("id").value]&&(r.Definitions[this.attribute("id").value]=this)
      for(var n=0;n<t.childNodes.length;n++){var f=t.childNodes[n]
        if(1==f.nodeType&&this.addChild(f,!0),this.captureTextNodes&&(3==f.nodeType||4==f.nodeType)){var p=f.value||f.text||f.textContent||""
          ""!=r.compressSpaces(p)&&this.addChild(new r.Element.tspan(f),!1)}}}},r.Element.RenderedElementBase=function(t){this.base=r.Element.ElementBase,this.base(t),this.setContext=function(t){if(this.style("fill").isUrlDefinition()){var e=this.style("fill").getFillStyleDefinition(this,this.style("fill-opacity"))
    null!=e&&(t.fillStyle=e)}else if(this.style("fill").hasValue()){var i=this.style("fill")
    "currentColor"==i.value&&(i.value=this.style("color").value),"inherit"!=i.value&&(t.fillStyle="none"==i.value?"rgba(0,0,0,0)":i.value)}if(this.style("fill-opacity").hasValue()){var i=new r.Property("fill",t.fillStyle)
    i=i.addOpacity(this.style("fill-opacity")),t.fillStyle=i.value}if(this.style("stroke").isUrlDefinition()){var e=this.style("stroke").getFillStyleDefinition(this,this.style("stroke-opacity"))
    null!=e&&(t.strokeStyle=e)}else if(this.style("stroke").hasValue()){var n=this.style("stroke")
    "currentColor"==n.value&&(n.value=this.style("color").value),"inherit"!=n.value&&(t.strokeStyle="none"==n.value?"rgba(0,0,0,0)":n.value)}if(this.style("stroke-opacity").hasValue()){var n=new r.Property("stroke",t.strokeStyle)
    n=n.addOpacity(this.style("stroke-opacity")),t.strokeStyle=n.value}if(this.style("stroke-width").hasValue()){var s=this.style("stroke-width").toPixels()
    t.lineWidth=0==s?.001:s}if(this.style("stroke-linecap").hasValue()&&(t.lineCap=this.style("stroke-linecap").value),this.style("stroke-linejoin").hasValue()&&(t.lineJoin=this.style("stroke-linejoin").value),this.style("stroke-miterlimit").hasValue()&&(t.miterLimit=this.style("stroke-miterlimit").value),this.style("stroke-dasharray").hasValue()&&"none"!=this.style("stroke-dasharray").value){var a=r.ToNumberArray(this.style("stroke-dasharray").value)
    "undefined"!=typeof t.setLineDash?t.setLineDash(a):"undefined"!=typeof t.webkitLineDash?t.webkitLineDash=a:"undefined"==typeof t.mozDash||1==a.length&&0==a[0]||(t.mozDash=a)
    var o=this.style("stroke-dashoffset").numValueOrDefault(1)
    "undefined"!=typeof t.lineDashOffset?t.lineDashOffset=o:"undefined"!=typeof t.webkitLineDashOffset?t.webkitLineDashOffset=o:"undefined"!=typeof t.mozDashOffset&&(t.mozDashOffset=o)}if("undefined"!=typeof t.font&&(t.font=r.Font.CreateFont(this.style("font-style").value,this.style("font-variant").value,this.style("font-weight").value,this.style("font-size").hasValue()?this.style("font-size").toPixels()+"px":"",this.style("font-family").value).toString()),this.style("transform",!1,!0).hasValue()){var l=new r.Transform(this.style("transform",!1,!0).value)
    l.apply(t)}if(this.style("clip-path",!1,!0).hasValue()){var h=this.style("clip-path",!1,!0).getDefinition()
    null!=h&&h.apply(t)}this.style("opacity").hasValue()&&(t.globalAlpha=this.style("opacity").numValue())}},r.Element.RenderedElementBase.prototype=new r.Element.ElementBase,r.Element.PathElementBase=function(t){this.base=r.Element.RenderedElementBase,this.base(t),this.path=function(t){return null!=t&&t.beginPath(),new r.BoundingBox},this.renderChildren=function(t){this.path(t),r.Mouse.checkPath(this,t),""!=t.fillStyle&&("inherit"!=this.style("fill-rule").valueOrDefault("inherit")?t.fill(this.style("fill-rule").value):t.fill()),""!=t.strokeStyle&&t.stroke()
    var e=this.getMarkers()
    if(null!=e){if(this.style("marker-start").isUrlDefinition()){var i=this.style("marker-start").getDefinition()
      i.render(t,e[0][0],e[0][1])}if(this.style("marker-mid").isUrlDefinition())for(var i=this.style("marker-mid").getDefinition(),n=1;n<e.length-1;n++)i.render(t,e[n][0],e[n][1])
      if(this.style("marker-end").isUrlDefinition()){var i=this.style("marker-end").getDefinition()
        i.render(t,e[e.length-1][0],e[e.length-1][1])}}},this.getBoundingBox=function(){return this.path()},this.getMarkers=function(){return null}},r.Element.PathElementBase.prototype=new r.Element.RenderedElementBase,r.Element.svg=function(t){this.base=r.Element.RenderedElementBase,this.base(t),this.baseClearContext=this.clearContext,this.clearContext=function(t){this.baseClearContext(t),r.ViewPort.RemoveCurrent()},this.baseSetContext=this.setContext,this.setContext=function(t){t.strokeStyle="rgba(0,0,0,0)",t.lineCap="butt",t.lineJoin="miter",t.miterLimit=4,"undefined"!=typeof t.font&&"undefined"!=typeof window.getComputedStyle&&(t.font=window.getComputedStyle(t.canvas).getPropertyValue("font")),this.baseSetContext(t),this.attribute("x").hasValue()||(this.attribute("x",!0).value=0),this.attribute("y").hasValue()||(this.attribute("y",!0).value=0),t.translate(this.attribute("x").toPixels("x"),this.attribute("y").toPixels("y"))
    var e=r.ViewPort.width(),i=r.ViewPort.height()
    if(this.attribute("width").hasValue()||(this.attribute("width",!0).value="100%"),this.attribute("height").hasValue()||(this.attribute("height",!0).value="100%"),"undefined"==typeof this.root){e=this.attribute("width").toPixels("x"),i=this.attribute("height").toPixels("y")
      var n=0,s=0
      this.attribute("refX").hasValue()&&this.attribute("refY").hasValue()&&(n=-this.attribute("refX").toPixels("x"),s=-this.attribute("refY").toPixels("y")),"visible"!=this.attribute("overflow").valueOrDefault("hidden")&&(t.beginPath(),t.moveTo(n,s),t.lineTo(e,s),t.lineTo(e,i),t.lineTo(n,i),t.closePath(),t.clip())}if(r.ViewPort.SetCurrent(e,i),this.attribute("viewBox").hasValue()){var a=r.ToNumberArray(this.attribute("viewBox").value),o=a[0],l=a[1]
      e=a[2],i=a[3],r.AspectRatio(t,this.attribute("preserveAspectRatio").value,r.ViewPort.width(),e,r.ViewPort.height(),i,o,l,this.attribute("refX").value,this.attribute("refY").value),r.ViewPort.RemoveCurrent(),r.ViewPort.SetCurrent(a[2],a[3])}}},r.Element.svg.prototype=new r.Element.RenderedElementBase,r.Element.rect=function(t){this.base=r.Element.PathElementBase,this.base(t),this.path=function(t){var e=this.attribute("x").toPixels("x"),i=this.attribute("y").toPixels("y"),n=this.attribute("width").toPixels("x"),s=this.attribute("height").toPixels("y"),a=this.attribute("rx").toPixels("x"),o=this.attribute("ry").toPixels("y")
    return this.attribute("rx").hasValue()&&!this.attribute("ry").hasValue()&&(o=a),this.attribute("ry").hasValue()&&!this.attribute("rx").hasValue()&&(a=o),a=Math.min(a,n/2),o=Math.min(o,s/2),null!=t&&(t.beginPath(),t.moveTo(e+a,i),t.lineTo(e+n-a,i),t.quadraticCurveTo(e+n,i,e+n,i+o),t.lineTo(e+n,i+s-o),t.quadraticCurveTo(e+n,i+s,e+n-a,i+s),t.lineTo(e+a,i+s),t.quadraticCurveTo(e,i+s,e,i+s-o),t.lineTo(e,i+o),t.quadraticCurveTo(e,i,e+a,i),t.closePath()),new r.BoundingBox(e,i,e+n,i+s)}},r.Element.rect.prototype=new r.Element.PathElementBase,r.Element.circle=function(t){this.base=r.Element.PathElementBase,this.base(t),this.path=function(t){var e=this.attribute("cx").toPixels("x"),i=this.attribute("cy").toPixels("y"),n=this.attribute("r").toPixels()
    return null!=t&&(t.beginPath(),t.arc(e,i,n,0,2*Math.PI,!0),t.closePath()),new r.BoundingBox(e-n,i-n,e+n,i+n)}},r.Element.circle.prototype=new r.Element.PathElementBase,r.Element.ellipse=function(t){this.base=r.Element.PathElementBase,this.base(t),this.path=function(t){var e=4*((Math.sqrt(2)-1)/3),i=this.attribute("rx").toPixels("x"),n=this.attribute("ry").toPixels("y"),s=this.attribute("cx").toPixels("x"),a=this.attribute("cy").toPixels("y")
    return null!=t&&(t.beginPath(),t.moveTo(s,a-n),t.bezierCurveTo(s+e*i,a-n,s+i,a-e*n,s+i,a),t.bezierCurveTo(s+i,a+e*n,s+e*i,a+n,s,a+n),t.bezierCurveTo(s-e*i,a+n,s-i,a+e*n,s-i,a),t.bezierCurveTo(s-i,a-e*n,s-e*i,a-n,s,a-n),t.closePath()),new r.BoundingBox(s-i,a-n,s+i,a+n)}},r.Element.ellipse.prototype=new r.Element.PathElementBase,r.Element.line=function(t){this.base=r.Element.PathElementBase,this.base(t),this.getPoints=function(){return[new r.Point(this.attribute("x1").toPixels("x"),this.attribute("y1").toPixels("y")),new r.Point(this.attribute("x2").toPixels("x"),this.attribute("y2").toPixels("y"))]},this.path=function(t){var e=this.getPoints()
    return null!=t&&(t.beginPath(),t.moveTo(e[0].x,e[0].y),t.lineTo(e[1].x,e[1].y)),new r.BoundingBox(e[0].x,e[0].y,e[1].x,e[1].y)},this.getMarkers=function(){var t=this.getPoints(),e=t[0].angleTo(t[1])
    return[[t[0],e],[t[1],e]]}},r.Element.line.prototype=new r.Element.PathElementBase,r.Element.polyline=function(t){this.base=r.Element.PathElementBase,this.base(t),this.points=r.CreatePath(this.attribute("points").value),this.path=function(t){var e=new r.BoundingBox(this.points[0].x,this.points[0].y)
    null!=t&&(t.beginPath(),t.moveTo(this.points[0].x,this.points[0].y))
    for(var i=1;i<this.points.length;i++)e.addPoint(this.points[i].x,this.points[i].y),null!=t&&t.lineTo(this.points[i].x,this.points[i].y)
    return e},this.getMarkers=function(){for(var t=[],e=0;e<this.points.length-1;e++)t.push([this.points[e],this.points[e].angleTo(this.points[e+1])])
    return t.length>0&&t.push([this.points[this.points.length-1],t[t.length-1][1]]),t}},r.Element.polyline.prototype=new r.Element.PathElementBase,r.Element.polygon=function(t){this.base=r.Element.polyline,this.base(t),this.basePath=this.path,this.path=function(t){var e=this.basePath(t)
    return null!=t&&(t.lineTo(this.points[0].x,this.points[0].y),t.closePath()),e}},r.Element.polygon.prototype=new r.Element.polyline,r.Element.path=function(t){this.base=r.Element.PathElementBase,this.base(t)
    var e=this.attribute("d").value
    e=e.replace(/,/gm," ")
    for(var i=0;i<2;i++)e=e.replace(/([MmZzLlHhVvCcSsQqTtAa])([^\s])/gm,"$1 $2")
    e=e.replace(/([^\s])([MmZzLlHhVvCcSsQqTtAa])/gm,"$1 $2"),e=e.replace(/([0-9])([+\-])/gm,"$1 $2")
    for(var i=0;i<2;i++)e=e.replace(/(\.[0-9]*)(\.)/gm,"$1 $2")
    e=e.replace(/([Aa](\s+[0-9]+){3})\s+([01])\s*([01])/gm,"$1 $3 $4 "),e=r.compressSpaces(e),e=r.trim(e),this.PathParser=new function(t){this.tokens=t.split(" "),this.reset=function(){this.i=-1,this.command="",this.previousCommand="",this.start=new r.Point(0,0),this.control=new r.Point(0,0),this.current=new r.Point(0,0),this.points=[],this.angles=[]},this.isEnd=function(){return this.i>=this.tokens.length-1},this.isCommandOrEnd=function(){return!!this.isEnd()||null!=this.tokens[this.i+1].match(/^[A-Za-z]$/)},this.isRelativeCommand=function(){switch(this.command){case"m":case"l":case"h":case"v":case"c":case"s":case"q":case"t":case"a":case"z":return!0}return!1},this.getToken=function(){return this.i++,this.tokens[this.i]},this.getScalar=function(){return parseFloat(this.getToken())},this.nextCommand=function(){this.previousCommand=this.command,this.command=this.getToken()},this.getPoint=function(){var t=new r.Point(this.getScalar(),this.getScalar())
      return this.makeAbsolute(t)},this.getAsControlPoint=function(){var t=this.getPoint()
      return this.control=t,t},this.getAsCurrentPoint=function(){var t=this.getPoint()
      return this.current=t,t},this.getReflectedControlPoint=function(){if("c"!=this.previousCommand.toLowerCase()&&"s"!=this.previousCommand.toLowerCase()&&"q"!=this.previousCommand.toLowerCase()&&"t"!=this.previousCommand.toLowerCase())return this.current
      var t=new r.Point(2*this.current.x-this.control.x,2*this.current.y-this.control.y)
      return t},this.makeAbsolute=function(t){return this.isRelativeCommand()&&(t.x+=this.current.x,t.y+=this.current.y),t},this.addMarker=function(t,e,i){null!=i&&this.angles.length>0&&null==this.angles[this.angles.length-1]&&(this.angles[this.angles.length-1]=this.points[this.points.length-1].angleTo(i)),this.addMarkerAngle(t,null==e?null:e.angleTo(t))},this.addMarkerAngle=function(t,e){this.points.push(t),this.angles.push(e)},this.getMarkerPoints=function(){return this.points},this.getMarkerAngles=function(){for(var t=0;t<this.angles.length;t++)if(null==this.angles[t])for(var e=t+1;e<this.angles.length;e++)if(null!=this.angles[e]){this.angles[t]=this.angles[e]
      break}return this.angles}}(e),this.path=function(t){var e=this.PathParser
      e.reset()
      var i=new r.BoundingBox
      for(null!=t&&t.beginPath();!e.isEnd();)switch(e.nextCommand(),e.command){case"M":case"m":var n=e.getAsCurrentPoint()
        for(e.addMarker(n),i.addPoint(n.x,n.y),null!=t&&t.moveTo(n.x,n.y),e.start=e.current;!e.isCommandOrEnd();){var n=e.getAsCurrentPoint()
          e.addMarker(n,e.start),i.addPoint(n.x,n.y),null!=t&&t.lineTo(n.x,n.y)}break
        case"L":case"l":for(;!e.isCommandOrEnd();){var s=e.current,n=e.getAsCurrentPoint()
          e.addMarker(n,s),i.addPoint(n.x,n.y),null!=t&&t.lineTo(n.x,n.y)}break
        case"H":case"h":for(;!e.isCommandOrEnd();){var a=new r.Point((e.isRelativeCommand()?e.current.x:0)+e.getScalar(),e.current.y)
          e.addMarker(a,e.current),e.current=a,i.addPoint(e.current.x,e.current.y),null!=t&&t.lineTo(e.current.x,e.current.y)}break
        case"V":case"v":for(;!e.isCommandOrEnd();){var a=new r.Point(e.current.x,(e.isRelativeCommand()?e.current.y:0)+e.getScalar())
          e.addMarker(a,e.current),e.current=a,i.addPoint(e.current.x,e.current.y),null!=t&&t.lineTo(e.current.x,e.current.y)}break
        case"C":case"c":for(;!e.isCommandOrEnd();){var o=e.current,l=e.getPoint(),h=e.getAsControlPoint(),u=e.getAsCurrentPoint()
          e.addMarker(u,h,l),i.addBezierCurve(o.x,o.y,l.x,l.y,h.x,h.y,u.x,u.y),null!=t&&t.bezierCurveTo(l.x,l.y,h.x,h.y,u.x,u.y)}break
        case"S":case"s":for(;!e.isCommandOrEnd();){var o=e.current,l=e.getReflectedControlPoint(),h=e.getAsControlPoint(),u=e.getAsCurrentPoint()
          e.addMarker(u,h,l),i.addBezierCurve(o.x,o.y,l.x,l.y,h.x,h.y,u.x,u.y),null!=t&&t.bezierCurveTo(l.x,l.y,h.x,h.y,u.x,u.y)}break
        case"Q":case"q":for(;!e.isCommandOrEnd();){var o=e.current,h=e.getAsControlPoint(),u=e.getAsCurrentPoint()
          e.addMarker(u,h,h),i.addQuadraticCurve(o.x,o.y,h.x,h.y,u.x,u.y),null!=t&&t.quadraticCurveTo(h.x,h.y,u.x,u.y)}break
        case"T":case"t":for(;!e.isCommandOrEnd();){var o=e.current,h=e.getReflectedControlPoint()
          e.control=h
          var u=e.getAsCurrentPoint()
          e.addMarker(u,h,h),i.addQuadraticCurve(o.x,o.y,h.x,h.y,u.x,u.y),null!=t&&t.quadraticCurveTo(h.x,h.y,u.x,u.y)}break
        case"A":case"a":for(;!e.isCommandOrEnd();){var o=e.current,c=e.getScalar(),f=e.getScalar(),p=e.getScalar()*(Math.PI/180),m=e.getScalar(),d=e.getScalar(),u=e.getAsCurrentPoint(),y=new r.Point(Math.cos(p)*(o.x-u.x)/2+Math.sin(p)*(o.y-u.y)/2,-Math.sin(p)*(o.x-u.x)/2+Math.cos(p)*(o.y-u.y)/2),v=Math.pow(y.x,2)/Math.pow(c,2)+Math.pow(y.y,2)/Math.pow(f,2)
          v>1&&(c*=Math.sqrt(v),f*=Math.sqrt(v))
          var g=(m==d?-1:1)*Math.sqrt((Math.pow(c,2)*Math.pow(f,2)-Math.pow(c,2)*Math.pow(y.y,2)-Math.pow(f,2)*Math.pow(y.x,2))/(Math.pow(c,2)*Math.pow(y.y,2)+Math.pow(f,2)*Math.pow(y.x,2)))
          isNaN(g)&&(g=0)
          var x=new r.Point(g*c*y.y/f,g*-f*y.x/c),b=new r.Point((o.x+u.x)/2+Math.cos(p)*x.x-Math.sin(p)*x.y,(o.y+u.y)/2+Math.sin(p)*x.x+Math.cos(p)*x.y),E=function(t){return Math.sqrt(Math.pow(t[0],2)+Math.pow(t[1],2))},P=function(t,e){return(t[0]*e[0]+t[1]*e[1])/(E(t)*E(e))},w=function(t,e){return(t[0]*e[1]<t[1]*e[0]?-1:1)*Math.acos(P(t,e))},B=w([1,0],[(y.x-x.x)/c,(y.y-x.y)/f]),C=[(y.x-x.x)/c,(y.y-x.y)/f],T=[(-y.x-x.x)/c,(-y.y-x.y)/f],V=w(C,T)
          P(C,T)<=-1&&(V=Math.PI),P(C,T)>=1&&(V=0)
          var M=1-d?1:-1,S=B+M*(V/2),k=new r.Point(b.x+c*Math.cos(S),b.y+f*Math.sin(S))
          if(e.addMarkerAngle(k,S-M*Math.PI/2),e.addMarkerAngle(u,S-M*Math.PI),i.addPoint(u.x,u.y),null!=t){var P=c>f?c:f,D=c>f?1:c/f,A=c>f?f/c:1
            t.translate(b.x,b.y),t.rotate(p),t.scale(D,A),t.arc(0,0,P,B,B+V,1-d),t.scale(1/D,1/A),t.rotate(-p),t.translate(-b.x,-b.y)}}break
        case"Z":case"z":null!=t&&t.closePath(),e.current=e.start}return i},this.getMarkers=function(){for(var t=this.PathParser.getMarkerPoints(),e=this.PathParser.getMarkerAngles(),i=[],n=0;n<t.length;n++)i.push([t[n],e[n]])
      return i}},r.Element.path.prototype=new r.Element.PathElementBase,r.Element.pattern=function(t){this.base=r.Element.ElementBase,this.base(t),this.createPattern=function(t,e){var i=this.attribute("width").toPixels("x",!0),n=this.attribute("height").toPixels("y",!0),s=new r.Element.svg
    s.attributes.viewBox=new r.Property("viewBox",this.attribute("viewBox").value),s.attributes.width=new r.Property("width",i+"px"),s.attributes.height=new r.Property("height",n+"px"),s.attributes.transform=new r.Property("transform",this.attribute("patternTransform").value),s.children=this.children
    var a=document.createElement("canvas")
    a.width=i,a.height=n
    var o=a.getContext("2d")
    this.attribute("x").hasValue()&&this.attribute("y").hasValue()&&o.translate(this.attribute("x").toPixels("x",!0),this.attribute("y").toPixels("y",!0))
    for(var l=-1;l<=1;l++)for(var h=-1;h<=1;h++)o.save(),s.attributes.x=new r.Property("x",l*a.width),s.attributes.y=new r.Property("y",h*a.height),s.render(o),o.restore()
    var u=t.createPattern(a,"repeat")
    return u}},r.Element.pattern.prototype=new r.Element.ElementBase,r.Element.marker=function(t){this.base=r.Element.ElementBase,this.base(t),this.baseRender=this.render,this.render=function(t,e,i){t.translate(e.x,e.y),"auto"==this.attribute("orient").valueOrDefault("auto")&&t.rotate(i),"strokeWidth"==this.attribute("markerUnits").valueOrDefault("strokeWidth")&&t.scale(t.lineWidth,t.lineWidth),t.save()
    var n=new r.Element.svg
    n.attributes.viewBox=new r.Property("viewBox",this.attribute("viewBox").value),n.attributes.refX=new r.Property("refX",this.attribute("refX").value),n.attributes.refY=new r.Property("refY",this.attribute("refY").value),n.attributes.width=new r.Property("width",this.attribute("markerWidth").value),n.attributes.height=new r.Property("height",this.attribute("markerHeight").value),n.attributes.fill=new r.Property("fill",this.attribute("fill").valueOrDefault("black")),n.attributes.stroke=new r.Property("stroke",this.attribute("stroke").valueOrDefault("none")),n.children=this.children,n.render(t),t.restore(),"strokeWidth"==this.attribute("markerUnits").valueOrDefault("strokeWidth")&&t.scale(1/t.lineWidth,1/t.lineWidth),"auto"==this.attribute("orient").valueOrDefault("auto")&&t.rotate(-i),t.translate(-e.x,-e.y)}},r.Element.marker.prototype=new r.Element.ElementBase,r.Element.defs=function(t){this.base=r.Element.ElementBase,this.base(t),this.render=function(t){}},r.Element.defs.prototype=new r.Element.ElementBase,r.Element.GradientBase=function(t){this.base=r.Element.ElementBase,this.base(t),this.stops=[]
    for(var e=0;e<this.children.length;e++){var i=this.children[e]
      "stop"==i.type&&this.stops.push(i)}this.getGradient=function(){},this.gradientUnits=function(){return this.attribute("gradientUnits").valueOrDefault("objectBoundingBox")},this.attributesToInherit=["gradientUnits"],this.inheritStopContainer=function(t){for(var e=0;e<this.attributesToInherit.length;e++){var i=this.attributesToInherit[e]
      !this.attribute(i).hasValue()&&t.attribute(i).hasValue()&&(this.attribute(i,!0).value=t.attribute(i).value)}},this.createGradient=function(t,e,i){var n=this
      this.getHrefAttribute().hasValue()&&(n=this.getHrefAttribute().getDefinition(),this.inheritStopContainer(n))
      var s=function(t){if(i.hasValue()){var e=new r.Property("color",t)
        return e.addOpacity(i).value}return t},a=this.getGradient(t,e)
      if(null==a)return s(n.stops[n.stops.length-1].color)
      for(var o=0;o<n.stops.length;o++)a.addColorStop(n.stops[o].offset,s(n.stops[o].color))
      if(this.attribute("gradientTransform").hasValue()){var l=r.ViewPort.viewPorts[0],h=new r.Element.rect
        h.attributes.x=new r.Property("x",-r.MAX_VIRTUAL_PIXELS/3),h.attributes.y=new r.Property("y",-r.MAX_VIRTUAL_PIXELS/3),h.attributes.width=new r.Property("width",r.MAX_VIRTUAL_PIXELS),h.attributes.height=new r.Property("height",r.MAX_VIRTUAL_PIXELS)
        var u=new r.Element.g
        u.attributes.transform=new r.Property("transform",this.attribute("gradientTransform").value),u.children=[h]
        var c=new r.Element.svg
        c.attributes.x=new r.Property("x",0),c.attributes.y=new r.Property("y",0),c.attributes.width=new r.Property("width",l.width),c.attributes.height=new r.Property("height",l.height),c.children=[u]
        var f=document.createElement("canvas")
        f.width=l.width,f.height=l.height
        var p=f.getContext("2d")
        return p.fillStyle=a,c.render(p),p.createPattern(f,"no-repeat")}return a}},r.Element.GradientBase.prototype=new r.Element.ElementBase,r.Element.linearGradient=function(t){this.base=r.Element.GradientBase,this.base(t),this.attributesToInherit.push("x1"),this.attributesToInherit.push("y1"),this.attributesToInherit.push("x2"),this.attributesToInherit.push("y2"),this.getGradient=function(t,e){var i="objectBoundingBox"==this.gradientUnits()?e.getBoundingBox():null
    this.attribute("x1").hasValue()||this.attribute("y1").hasValue()||this.attribute("x2").hasValue()||this.attribute("y2").hasValue()||(this.attribute("x1",!0).value=0,this.attribute("y1",!0).value=0,this.attribute("x2",!0).value=1,this.attribute("y2",!0).value=0)
    var n="objectBoundingBox"==this.gradientUnits()?i.x()+i.width()*this.attribute("x1").numValue():this.attribute("x1").toPixels("x"),s="objectBoundingBox"==this.gradientUnits()?i.y()+i.height()*this.attribute("y1").numValue():this.attribute("y1").toPixels("y"),a="objectBoundingBox"==this.gradientUnits()?i.x()+i.width()*this.attribute("x2").numValue():this.attribute("x2").toPixels("x"),r="objectBoundingBox"==this.gradientUnits()?i.y()+i.height()*this.attribute("y2").numValue():this.attribute("y2").toPixels("y")
    return n==a&&s==r?null:t.createLinearGradient(n,s,a,r)}},r.Element.linearGradient.prototype=new r.Element.GradientBase,r.Element.radialGradient=function(t){this.base=r.Element.GradientBase,this.base(t),this.attributesToInherit.push("cx"),this.attributesToInherit.push("cy"),this.attributesToInherit.push("r"),this.attributesToInherit.push("fx"),this.attributesToInherit.push("fy"),this.getGradient=function(t,e){var i=e.getBoundingBox()
    this.attribute("cx").hasValue()||(this.attribute("cx",!0).value="50%"),this.attribute("cy").hasValue()||(this.attribute("cy",!0).value="50%"),this.attribute("r").hasValue()||(this.attribute("r",!0).value="50%")
    var n="objectBoundingBox"==this.gradientUnits()?i.x()+i.width()*this.attribute("cx").numValue():this.attribute("cx").toPixels("x"),s="objectBoundingBox"==this.gradientUnits()?i.y()+i.height()*this.attribute("cy").numValue():this.attribute("cy").toPixels("y"),a=n,r=s
    this.attribute("fx").hasValue()&&(a="objectBoundingBox"==this.gradientUnits()?i.x()+i.width()*this.attribute("fx").numValue():this.attribute("fx").toPixels("x")),this.attribute("fy").hasValue()&&(r="objectBoundingBox"==this.gradientUnits()?i.y()+i.height()*this.attribute("fy").numValue():this.attribute("fy").toPixels("y"))
    var o="objectBoundingBox"==this.gradientUnits()?(i.width()+i.height())/2*this.attribute("r").numValue():this.attribute("r").toPixels()
    return t.createRadialGradient(a,r,0,n,s,o)}},r.Element.radialGradient.prototype=new r.Element.GradientBase,r.Element.stop=function(t){this.base=r.Element.ElementBase,this.base(t),this.offset=this.attribute("offset").numValue(),this.offset<0&&(this.offset=0),this.offset>1&&(this.offset=1)
    var e=this.style("stop-color",!0)
    ""===e.value&&(e.value="#000"),this.style("stop-opacity").hasValue()&&(e=e.addOpacity(this.style("stop-opacity"))),this.color=e.value},r.Element.stop.prototype=new r.Element.ElementBase,r.Element.AnimateBase=function(t){this.base=r.Element.ElementBase,this.base(t),r.Animations.push(this),this.duration=0,this.begin=this.attribute("begin").toMilliseconds(),this.maxDuration=this.begin+this.attribute("dur").toMilliseconds(),this.getProperty=function(){var t=this.attribute("attributeType").value,e=this.attribute("attributeName").value
    return"CSS"==t?this.parent.style(e,!0):this.parent.attribute(e,!0)},this.initialValue=null,this.initialUnits="",this.removed=!1,this.calcValue=function(){return""},this.update=function(t){if(null==this.initialValue&&(this.initialValue=this.getProperty().value,this.initialUnits=this.getProperty().getUnits()),this.duration>this.maxDuration){if("indefinite"==this.attribute("repeatCount").value||"indefinite"==this.attribute("repeatDur").value)this.duration=0
  else if("freeze"!=this.attribute("fill").valueOrDefault("remove")||this.frozen){if("remove"==this.attribute("fill").valueOrDefault("remove")&&!this.removed)return this.removed=!0,this.getProperty().value=this.parent.animationFrozen?this.parent.animationFrozenValue:this.initialValue,!0}else this.frozen=!0,this.parent.animationFrozen=!0,this.parent.animationFrozenValue=this.getProperty().value
    return!1}this.duration=this.duration+t
    var e=!1
    if(this.begin<this.duration){var i=this.calcValue()
      if(this.attribute("type").hasValue()){var n=this.attribute("type").value
        i=n+"("+i+")"}this.getProperty().value=i,e=!0}return e},this.from=this.attribute("from"),this.to=this.attribute("to"),this.values=this.attribute("values"),this.values.hasValue()&&(this.values.value=this.values.value.split(";")),this.progress=function(){var t={progress:(this.duration-this.begin)/(this.maxDuration-this.begin)}
    if(this.values.hasValue()){var e=t.progress*(this.values.value.length-1),i=Math.floor(e),n=Math.ceil(e)
      t.from=new r.Property("from",parseFloat(this.values.value[i])),t.to=new r.Property("to",parseFloat(this.values.value[n])),t.progress=(e-i)/(n-i)}else t.from=this.from,t.to=this.to
    return t}},r.Element.AnimateBase.prototype=new r.Element.ElementBase,r.Element.animate=function(t){this.base=r.Element.AnimateBase,this.base(t),this.calcValue=function(){var t=this.progress(),e=t.from.numValue()+(t.to.numValue()-t.from.numValue())*t.progress
    return e+this.initialUnits}},r.Element.animate.prototype=new r.Element.AnimateBase,r.Element.animateColor=function(e){this.base=r.Element.AnimateBase,this.base(e),this.calcValue=function(){var e=this.progress(),i=new t(e.from.value),n=new t(e.to.value)
    if(i.ok&&n.ok){var s=i.r+(n.r-i.r)*e.progress,a=i.g+(n.g-i.g)*e.progress,r=i.b+(n.b-i.b)*e.progress
      return"rgb("+parseInt(s,10)+","+parseInt(a,10)+","+parseInt(r,10)+")"}return this.attribute("from").value}},r.Element.animateColor.prototype=new r.Element.AnimateBase,r.Element.animateTransform=function(t){this.base=r.Element.AnimateBase,this.base(t),this.calcValue=function(){for(var t=this.progress(),e=r.ToNumberArray(t.from.value),i=r.ToNumberArray(t.to.value),n="",s=0;s<e.length;s++)n+=e[s]+(i[s]-e[s])*t.progress+" "
    return n}},r.Element.animateTransform.prototype=new r.Element.animate,r.Element.font=function(t){this.base=r.Element.ElementBase,this.base(t),this.horizAdvX=this.attribute("horiz-adv-x").numValue(),this.isRTL=!1,this.isArabic=!1,this.fontFace=null,this.missingGlyph=null,this.glyphs=[]
    for(var e=0;e<this.children.length;e++){var i=this.children[e]
      "font-face"==i.type?(this.fontFace=i,i.style("font-family").hasValue()&&(r.Definitions[i.style("font-family").value]=this)):"missing-glyph"==i.type?this.missingGlyph=i:"glyph"==i.type&&(""!=i.arabicForm?(this.isRTL=!0,this.isArabic=!0,"undefined"==typeof this.glyphs[i.unicode]&&(this.glyphs[i.unicode]=[]),this.glyphs[i.unicode][i.arabicForm]=i):this.glyphs[i.unicode]=i)}},r.Element.font.prototype=new r.Element.ElementBase,r.Element.fontface=function(t){this.base=r.Element.ElementBase,this.base(t),this.ascent=this.attribute("ascent").value,this.descent=this.attribute("descent").value,this.unitsPerEm=this.attribute("units-per-em").numValue()},r.Element.fontface.prototype=new r.Element.ElementBase,r.Element.missingglyph=function(t){this.base=r.Element.path,this.base(t),this.horizAdvX=0},r.Element.missingglyph.prototype=new r.Element.path,r.Element.glyph=function(t){this.base=r.Element.path,this.base(t),this.horizAdvX=this.attribute("horiz-adv-x").numValue(),this.unicode=this.attribute("unicode").value,this.arabicForm=this.attribute("arabic-form").value},r.Element.glyph.prototype=new r.Element.path,r.Element.text=function(t){this.captureTextNodes=!0,this.base=r.Element.RenderedElementBase,this.base(t),this.baseSetContext=this.setContext,this.setContext=function(t){this.baseSetContext(t)
    var e=this.style("dominant-baseline").toTextBaseline()
    null==e&&(e=this.style("alignment-baseline").toTextBaseline()),null!=e&&(t.textBaseline=e)},this.getBoundingBox=function(){var t=this.attribute("x").toPixels("x"),e=this.attribute("y").toPixels("y"),i=this.parent.style("font-size").numValueOrDefault(r.Font.Parse(r.ctx.font).fontSize)
    return new r.BoundingBox(t,e-i,t+Math.floor(2*i/3)*this.children[0].getText().length,e)},this.renderChildren=function(t){this.x=this.attribute("x").toPixels("x"),this.y=this.attribute("y").toPixels("y"),this.attribute("dx").hasValue()&&(this.x+=this.attribute("dx").toPixels("x")),this.attribute("dy").hasValue()&&(this.y+=this.attribute("dy").toPixels("y")),this.x+=this.getAnchorDelta(t,this,0)
    for(var e=0;e<this.children.length;e++)this.renderChild(t,this,this,e)},this.getAnchorDelta=function(t,e,i){var n=this.style("text-anchor").valueOrDefault("start")
    if("start"!=n){for(var s=0,a=i;a<e.children.length;a++){var r=e.children[a]
      if(a>i&&r.attribute("x").hasValue())break
      s+=r.measureTextRecursive(t)}return-1*("end"==n?s:s/2)}return 0},this.renderChild=function(t,e,i,n){var s=i.children[n]
    s.attribute("x").hasValue()?(s.x=s.attribute("x").toPixels("x")+e.getAnchorDelta(t,i,n),s.attribute("dx").hasValue()&&(s.x+=s.attribute("dx").toPixels("x"))):(s.attribute("dx").hasValue()&&(e.x+=s.attribute("dx").toPixels("x")),s.x=e.x),e.x=s.x+s.measureText(t),s.attribute("y").hasValue()?(s.y=s.attribute("y").toPixels("y"),s.attribute("dy").hasValue()&&(s.y+=s.attribute("dy").toPixels("y"))):(s.attribute("dy").hasValue()&&(e.y+=s.attribute("dy").toPixels("y")),s.y=e.y),e.y=s.y,s.render(t)
    for(var n=0;n<s.children.length;n++)e.renderChild(t,e,s,n)}},r.Element.text.prototype=new r.Element.RenderedElementBase,r.Element.TextElementBase=function(t){this.base=r.Element.RenderedElementBase,this.base(t),this.getGlyph=function(t,e,i){var n=e[i],s=null
    if(t.isArabic){var a="isolated";(0==i||" "==e[i-1])&&i<e.length-2&&" "!=e[i+1]&&(a="terminal"),i>0&&" "!=e[i-1]&&i<e.length-2&&" "!=e[i+1]&&(a="medial"),i>0&&" "!=e[i-1]&&(i==e.length-1||" "==e[i+1])&&(a="initial"),"undefined"!=typeof t.glyphs[n]&&(s=t.glyphs[n][a],null==s&&"glyph"==t.glyphs[n].type&&(s=t.glyphs[n]))}else s=t.glyphs[n]
    return null==s&&(s=t.missingGlyph),s},this.renderChildren=function(t){var e=this.parent.style("font-family").getDefinition()
    if(null==e)""!=t.fillStyle&&t.fillText(r.compressSpaces(this.getText()),this.x,this.y),""!=t.strokeStyle&&t.strokeText(r.compressSpaces(this.getText()),this.x,this.y)
    else{var i=this.parent.style("font-size").numValueOrDefault(r.Font.Parse(r.ctx.font).fontSize),n=this.parent.style("font-style").valueOrDefault(r.Font.Parse(r.ctx.font).fontStyle),s=this.getText()
      e.isRTL&&(s=s.split("").reverse().join(""))
      for(var a=r.ToNumberArray(this.parent.attribute("dx").value),o=0;o<s.length;o++){var l=this.getGlyph(e,s,o),h=i/e.fontFace.unitsPerEm
        t.translate(this.x,this.y),t.scale(h,-h)
        var u=t.lineWidth
        t.lineWidth=t.lineWidth*e.fontFace.unitsPerEm/i,"italic"==n&&t.transform(1,0,.4,1,0,0),l.render(t),"italic"==n&&t.transform(1,0,-.4,1,0,0),t.lineWidth=u,t.scale(1/h,-1/h),t.translate(-this.x,-this.y),this.x+=i*(l.horizAdvX||e.horizAdvX)/e.fontFace.unitsPerEm,"undefined"==typeof a[o]||isNaN(a[o])||(this.x+=a[o])}}},this.getText=function(){},this.measureTextRecursive=function(t){for(var e=this.measureText(t),i=0;i<this.children.length;i++)e+=this.children[i].measureTextRecursive(t)
    return e},this.measureText=function(t){var e=this.parent.style("font-family").getDefinition()
    if(null!=e){var i=this.parent.style("font-size").numValueOrDefault(r.Font.Parse(r.ctx.font).fontSize),n=0,s=this.getText()
      e.isRTL&&(s=s.split("").reverse().join(""))
      for(var a=r.ToNumberArray(this.parent.attribute("dx").value),o=0;o<s.length;o++){var l=this.getGlyph(e,s,o)
        n+=(l.horizAdvX||e.horizAdvX)*i/e.fontFace.unitsPerEm,"undefined"==typeof a[o]||isNaN(a[o])||(n+=a[o])}return n}var h=r.compressSpaces(this.getText())
    if(!t.measureText)return 10*h.length
    t.save(),this.setContext(t)
    var u=t.measureText(h).width
    return t.restore(),u}},r.Element.TextElementBase.prototype=new r.Element.RenderedElementBase,r.Element.tspan=function(t){this.captureTextNodes=!0,this.base=r.Element.TextElementBase,this.base(t),this.text=r.compressSpaces(t.value||t.text||t.textContent||""),this.getText=function(){return this.children.length>0?"":this.text}},r.Element.tspan.prototype=new r.Element.TextElementBase,r.Element.tref=function(t){this.base=r.Element.TextElementBase,this.base(t),this.getText=function(){var t=this.getHrefAttribute().getDefinition()
    if(null!=t)return t.children[0].getText()}},r.Element.tref.prototype=new r.Element.TextElementBase,r.Element.a=function(t){this.base=r.Element.TextElementBase,this.base(t),this.hasText=t.childNodes.length>0
    for(var e=0;e<t.childNodes.length;e++)3!=t.childNodes[e].nodeType&&(this.hasText=!1)
    this.text=this.hasText?t.childNodes[0].value:"",this.getText=function(){return this.text},this.baseRenderChildren=this.renderChildren,this.renderChildren=function(t){if(this.hasText){this.baseRenderChildren(t)
      var e=new r.Property("fontSize",r.Font.Parse(r.ctx.font).fontSize)
      r.Mouse.checkBoundingBox(this,new r.BoundingBox(this.x,this.y-e.toPixels("y"),this.x+this.measureText(t),this.y))}else if(this.children.length>0){var i=new r.Element.g
      i.children=this.children,i.parent=this,i.render(t)}},this.onclick=function(){window.open(this.getHrefAttribute().value)},this.onmousemove=function(){r.ctx.canvas.style.cursor="pointer"}},r.Element.a.prototype=new r.Element.TextElementBase,r.Element.image=function(t){this.base=r.Element.RenderedElementBase,this.base(t)
    var e=this.getHrefAttribute().value
    if(""!=e){var i=e.match(/\.svg$/)
      if(r.Images.push(this),this.loaded=!1,i)this.img=r.ajax(e),this.loaded=!0
      else{this.img=document.createElement("img"),1==r.opts.useCORS&&(this.img.crossOrigin="Anonymous")
        var n=this
        this.img.onload=function(){n.loaded=!0},this.img.onerror=function(){r.log('ERROR: image "'+e+'" not found'),n.loaded=!0},this.img.src=e}this.renderChildren=function(t){var e=this.attribute("x").toPixels("x"),n=this.attribute("y").toPixels("y"),s=this.attribute("width").toPixels("x"),a=this.attribute("height").toPixels("y")
        0!=s&&0!=a&&(t.save(),i?t.drawSvg(this.img,e,n,s,a):(t.translate(e,n),r.AspectRatio(t,this.attribute("preserveAspectRatio").value,s,this.img.width,a,this.img.height,0,0),t.drawImage(this.img,0,0)),t.restore())},this.getBoundingBox=function(){var t=this.attribute("x").toPixels("x"),e=this.attribute("y").toPixels("y"),i=this.attribute("width").toPixels("x"),n=this.attribute("height").toPixels("y")
        return new r.BoundingBox(t,e,t+i,e+n)}}},r.Element.image.prototype=new r.Element.RenderedElementBase,r.Element.g=function(t){this.base=r.Element.RenderedElementBase,this.base(t),this.getBoundingBox=function(){for(var t=new r.BoundingBox,e=0;e<this.children.length;e++)t.addBoundingBox(this.children[e].getBoundingBox())
    return t}},r.Element.g.prototype=new r.Element.RenderedElementBase,r.Element.symbol=function(t){this.base=r.Element.RenderedElementBase,this.base(t),this.render=function(t){}},r.Element.symbol.prototype=new r.Element.RenderedElementBase,r.Element.style=function(t){this.base=r.Element.ElementBase,this.base(t)
    for(var e="",i=0;i<t.childNodes.length;i++)e+=t.childNodes[i].data
    e=e.replace(/(\/\*([^*]|[\r\n]|(\*+([^*\/]|[\r\n])))*\*+\/)|(^[\s]*\/\/.*)/gm,""),e=r.compressSpaces(e)
    for(var s=e.split("}"),i=0;i<s.length;i++)if(""!=r.trim(s[i]))for(var a=s[i].split("{"),o=a[0].split(","),l=a[1].split(";"),h=0;h<o.length;h++){var u=r.trim(o[h])
      if(""!=u){for(var c=r.Styles[u]||{},f=0;f<l.length;f++){var p=l[f].indexOf(":"),m=l[f].substr(0,p),d=l[f].substr(p+1,l[f].length-p)
        null!=m&&null!=d&&(c[r.trim(m)]=new r.Property(r.trim(m),r.trim(d)))}if(r.Styles[u]=c,r.StylesSpecificity[u]=n(u),"@font-face"==u)for(var y=c["font-family"].value.replace(/"/g,""),v=c.src.value.split(","),g=0;g<v.length;g++)if(v[g].indexOf('format("svg")')>0)for(var x=v[g].indexOf("url"),b=v[g].indexOf(")",x),E=v[g].substr(x+5,b-x-6),P=r.parseXml(r.ajax(E)),w=P.getElementsByTagName("font"),B=0;B<w.length;B++){var C=r.CreateElement(w[B])
        r.Definitions[y]=C}}}},r.Element.style.prototype=new r.Element.ElementBase,r.Element.use=function(t){this.base=r.Element.RenderedElementBase,this.base(t),this.baseSetContext=this.setContext,this.setContext=function(t){this.baseSetContext(t),this.attribute("x").hasValue()&&t.translate(this.attribute("x").toPixels("x"),0),this.attribute("y").hasValue()&&t.translate(0,this.attribute("y").toPixels("y"))}
    var e=this.getHrefAttribute().getDefinition()
    this.path=function(t){null!=e&&e.path(t)},this.getBoundingBox=function(){if(null!=e)return e.getBoundingBox()},this.renderChildren=function(t){if(null!=e){var i=e
      "symbol"==e.type&&(i=new r.Element.svg,i.type="svg",i.attributes.viewBox=new r.Property("viewBox",e.attribute("viewBox").value),i.attributes.preserveAspectRatio=new r.Property("preserveAspectRatio",e.attribute("preserveAspectRatio").value),i.attributes.overflow=new r.Property("overflow",e.attribute("overflow").value),i.children=e.children),"svg"==i.type&&(this.attribute("width").hasValue()&&(i.attributes.width=new r.Property("width",this.attribute("width").value)),this.attribute("height").hasValue()&&(i.attributes.height=new r.Property("height",this.attribute("height").value)))
      var n=i.parent
      i.parent=null,i.render(t),i.parent=n}}},r.Element.use.prototype=new r.Element.RenderedElementBase,r.Element.mask=function(t){this.base=r.Element.ElementBase,this.base(t),this.apply=function(t,e){var i=this.attribute("x").toPixels("x"),n=this.attribute("y").toPixels("y"),s=this.attribute("width").toPixels("x"),a=this.attribute("height").toPixels("y")
    if(0==s&&0==a){for(var o=new r.BoundingBox,l=0;l<this.children.length;l++)o.addBoundingBox(this.children[l].getBoundingBox())
      var i=Math.floor(o.x1),n=Math.floor(o.y1),s=Math.floor(o.width()),a=Math.floor(o.height())}var h=e.attribute("mask").value
    e.attribute("mask").value=""
    var u=document.createElement("canvas")
    u.width=i+s,u.height=n+a
    var c=u.getContext("2d")
    this.renderChildren(c)
    var f=document.createElement("canvas")
    f.width=i+s,f.height=n+a
    var p=f.getContext("2d")
    e.render(p),p.globalCompositeOperation="destination-in",p.fillStyle=c.createPattern(u,"no-repeat"),p.fillRect(0,0,i+s,n+a),t.fillStyle=p.createPattern(f,"no-repeat"),t.fillRect(0,0,i+s,n+a),e.attribute("mask").value=h},this.render=function(t){}},r.Element.mask.prototype=new r.Element.ElementBase,r.Element.clipPath=function(t){this.base=r.Element.ElementBase,this.base(t),this.apply=function(t){var e=CanvasRenderingContext2D.prototype.beginPath
    CanvasRenderingContext2D.prototype.beginPath=function(){}
    var i=CanvasRenderingContext2D.prototype.closePath
    CanvasRenderingContext2D.prototype.closePath=function(){},e.call(t)
    for(var n=0;n<this.children.length;n++){var s=this.children[n]
      if("undefined"!=typeof s.path){var a=null
        s.style("transform",!1,!0).hasValue()&&(a=new r.Transform(s.style("transform",!1,!0).value),a.apply(t)),s.path(t),CanvasRenderingContext2D.prototype.closePath=i,a&&a.unapply(t)}}i.call(t),t.clip(),CanvasRenderingContext2D.prototype.beginPath=e,CanvasRenderingContext2D.prototype.closePath=i},this.render=function(t){}},r.Element.clipPath.prototype=new r.Element.ElementBase,r.Element.filter=function(t){this.base=r.Element.ElementBase,this.base(t),this.apply=function(t,e){var i=e.getBoundingBox(),n=Math.floor(i.x1),s=Math.floor(i.y1),a=Math.floor(i.width()),r=Math.floor(i.height()),o=e.style("filter").value
    e.style("filter").value=""
    for(var l=0,h=0,u=0;u<this.children.length;u++){var c=this.children[u].extraFilterDistance||0
      l=Math.max(l,c),h=Math.max(h,c)}var f=document.createElement("canvas")
    f.width=a+2*l,f.height=r+2*h
    var p=f.getContext("2d")
    p.translate(-n+l,-s+h),e.render(p)
    for(var u=0;u<this.children.length;u++)"function"==typeof this.children[u].apply&&this.children[u].apply(p,0,0,a+2*l,r+2*h)
    t.drawImage(f,0,0,a+2*l,r+2*h,n-l,s-h,a+2*l,r+2*h),e.style("filter",!0).value=o},this.render=function(t){}},r.Element.filter.prototype=new r.Element.ElementBase,r.Element.feMorphology=function(t){this.base=r.Element.ElementBase,this.base(t),this.apply=function(t,e,i,n,s){}},r.Element.feMorphology.prototype=new r.Element.ElementBase,r.Element.feComposite=function(t){this.base=r.Element.ElementBase,this.base(t),this.apply=function(t,e,i,n,s){}},r.Element.feComposite.prototype=new r.Element.ElementBase,r.Element.feColorMatrix=function(t){function e(t,e,i,n,s,a){return t[i*n*4+4*e+a]}function i(t,e,i,n,s,a,r){t[i*n*4+4*e+a]=r}function n(t,e){var i=s[t]
    return i*(i<0?e-255:e)}this.base=r.Element.ElementBase,this.base(t)
    var s=r.ToNumberArray(this.attribute("values").value)
    switch(this.attribute("type").valueOrDefault("matrix")){case"saturate":var a=s[0]
      s=[.213+.787*a,.715-.715*a,.072-.072*a,0,0,.213-.213*a,.715+.285*a,.072-.072*a,0,0,.213-.213*a,.715-.715*a,.072+.928*a,0,0,0,0,0,1,0,0,0,0,0,1]
      break
      case"hueRotate":var o=s[0]*Math.PI/180,l=function(t,e,i){return t+Math.cos(o)*e+Math.sin(o)*i}
        s=[l(.213,.787,-.213),l(.715,-.715,-.715),l(.072,-.072,.928),0,0,l(.213,-.213,.143),l(.715,.285,.14),l(.072,-.072,-.283),0,0,l(.213,-.213,-.787),l(.715,-.715,.715),l(.072,.928,.072),0,0,0,0,0,1,0,0,0,0,0,1]
        break
      case"luminanceToAlpha":s=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,.2125,.7154,.0721,0,0,0,0,0,0,1]}this.apply=function(t,s,a,r,o){for(var l=t.getImageData(0,0,r,o),a=0;a<o;a++)for(var s=0;s<r;s++){var h=e(l.data,s,a,r,o,0),u=e(l.data,s,a,r,o,1),c=e(l.data,s,a,r,o,2),f=e(l.data,s,a,r,o,3)
      i(l.data,s,a,r,o,0,n(0,h)+n(1,u)+n(2,c)+n(3,f)+n(4,1)),i(l.data,s,a,r,o,1,n(5,h)+n(6,u)+n(7,c)+n(8,f)+n(9,1)),i(l.data,s,a,r,o,2,n(10,h)+n(11,u)+n(12,c)+n(13,f)+n(14,1)),i(l.data,s,a,r,o,3,n(15,h)+n(16,u)+n(17,c)+n(18,f)+n(19,1))}t.clearRect(0,0,r,o),t.putImageData(l,0,0)}},r.Element.feColorMatrix.prototype=new r.Element.ElementBase,r.Element.feGaussianBlur=function(t){this.base=r.Element.ElementBase,this.base(t),this.blurRadius=Math.floor(this.attribute("stdDeviation").numValue()),this.extraFilterDistance=this.blurRadius,this.apply=function(t,i,n,s,a){return"undefined"==typeof e.canvasRGBA?void r.log("ERROR: StackBlur.js must be included for blur to work"):(t.canvas.id=r.UniqueId(),t.canvas.style.display="none",document.body.appendChild(t.canvas),e.canvasRGBA(t.canvas.id,i,n,s,a,this.blurRadius),void document.body.removeChild(t.canvas))}},r.Element.feGaussianBlur.prototype=new r.Element.ElementBase,r.Element.title=function(t){},r.Element.title.prototype=new r.Element.ElementBase,r.Element.desc=function(t){},r.Element.desc.prototype=new r.Element.ElementBase,r.Element.MISSING=function(t){r.log("ERROR: Element '"+t.nodeName+"' not yet implemented.")},r.Element.MISSING.prototype=new r.Element.ElementBase,r.CreateElement=function(t){var e=t.nodeName.replace(/^[^:]+:/,"")
    e=e.replace(/\-/g,"")
    var i=null
    return i="undefined"!=typeof r.Element[e]?new r.Element[e](t):new r.Element.MISSING(t),i.type=t.nodeName,i},r.load=function(t,e){r.loadXml(t,r.ajax(e))},r.loadXml=function(t,e){r.loadXmlDoc(t,r.parseXml(e))},r.loadXmlDoc=function(t,e){r.init(t)
    var i=function(e){for(var i=t.canvas;i;)e.x-=i.offsetLeft,e.y-=i.offsetTop,i=i.offsetParent
      return window.scrollX&&(e.x+=window.scrollX),window.scrollY&&(e.y+=window.scrollY),e}
    1!=r.opts.ignoreMouse&&(t.canvas.onclick=function(t){var e=i(new r.Point(null!=t?t.clientX:event.clientX,null!=t?t.clientY:event.clientY))
      r.Mouse.onclick(e.x,e.y)},t.canvas.onmousemove=function(t){var e=i(new r.Point(null!=t?t.clientX:event.clientX,null!=t?t.clientY:event.clientY))
      r.Mouse.onmousemove(e.x,e.y)})
    var n=r.CreateElement(e.documentElement)
    n.root=!0,n.addStylesFromStyleDefinition()
    var s=!0,a=function(){r.ViewPort.Clear(),t.canvas.parentNode&&r.ViewPort.SetCurrent(t.canvas.parentNode.clientWidth,t.canvas.parentNode.clientHeight),1!=r.opts.ignoreDimensions&&(n.style("width").hasValue()&&(t.canvas.width=n.style("width").toPixels("x"),t.canvas.style.width=t.canvas.width+"px"),n.style("height").hasValue()&&(t.canvas.height=n.style("height").toPixels("y"),t.canvas.style.height=t.canvas.height+"px"))
      var i=t.canvas.clientWidth||t.canvas.width,a=t.canvas.clientHeight||t.canvas.height
      if(1==r.opts.ignoreDimensions&&n.style("width").hasValue()&&n.style("height").hasValue()&&(i=n.style("width").toPixels("x"),a=n.style("height").toPixels("y")),r.ViewPort.SetCurrent(i,a),null!=r.opts.offsetX&&(n.attribute("x",!0).value=r.opts.offsetX),null!=r.opts.offsetY&&(n.attribute("y",!0).value=r.opts.offsetY),null!=r.opts.scaleWidth||null!=r.opts.scaleHeight){var o=null,l=null,h=r.ToNumberArray(n.attribute("viewBox").value)
        null!=r.opts.scaleWidth&&(n.attribute("width").hasValue()?o=n.attribute("width").toPixels("x")/r.opts.scaleWidth:isNaN(h[2])||(o=h[2]/r.opts.scaleWidth)),null!=r.opts.scaleHeight&&(n.attribute("height").hasValue()?l=n.attribute("height").toPixels("y")/r.opts.scaleHeight:isNaN(h[3])||(l=h[3]/r.opts.scaleHeight)),null==o&&(o=l),null==l&&(l=o),n.attribute("width",!0).value=r.opts.scaleWidth,n.attribute("height",!0).value=r.opts.scaleHeight,n.style("transform",!0,!0).value+=" scale("+1/o+","+1/l+")"}1!=r.opts.ignoreClear&&t.clearRect(0,0,i,a),n.render(t),s&&(s=!1,"function"==typeof r.opts.renderCallback&&r.opts.renderCallback(e))},o=!0
    r.ImagesLoaded()&&(o=!1,a()),r.intervalID=setInterval(function(){var t=!1
      if(o&&r.ImagesLoaded()&&(o=!1,t=!0),1!=r.opts.ignoreMouse&&(t|=r.Mouse.hasEvents()),1!=r.opts.ignoreAnimation)for(var e=0;e<r.Animations.length;e++)t|=r.Animations[e].update(1e3/r.FRAMERATE)
      "function"==typeof r.opts.forceRedraw&&1==r.opts.forceRedraw()&&(t=!0),t&&(a(),r.Mouse.runEvents())},1e3/r.FRAMERATE)},r.stop=function(){r.intervalID&&clearInterval(r.intervalID)},r.Mouse=new function(){this.events=[],this.hasEvents=function(){return 0!=this.events.length},this.onclick=function(t,e){this.events.push({type:"onclick",x:t,y:e,run:function(t){t.onclick&&t.onclick()}})},this.onmousemove=function(t,e){this.events.push({type:"onmousemove",x:t,y:e,run:function(t){t.onmousemove&&t.onmousemove()}})},this.eventElements=[],this.checkPath=function(t,e){for(var i=0;i<this.events.length;i++){var n=this.events[i]
    e.isPointInPath&&e.isPointInPath(n.x,n.y)&&(this.eventElements[i]=t)}},this.checkBoundingBox=function(t,e){for(var i=0;i<this.events.length;i++){var n=this.events[i]
    e.isPointInBox(n.x,n.y)&&(this.eventElements[i]=t)}},this.runEvents=function(){r.ctx.canvas.style.cursor=""
    for(var t=0;t<this.events.length;t++)for(var e=this.events[t],i=this.eventElements[t];i;)e.run(i),i=i.parent
    this.events=[],this.eventElements=[]}},r}var a,r=function(t,e,i){if(null!=t||null!=e||null!=i){"string"==typeof t&&(t=document.getElementById(t)),null!=t.svg&&t.svg.stop()
  var n=s(i||{})
  1==t.childNodes.length&&"OBJECT"==t.childNodes[0].nodeName||(t.svg=n)
  var a=t.getContext("2d")
  "undefined"!=typeof e.documentElement?n.loadXmlDoc(a,e):"<"==e.substr(0,1)?n.loadXml(a,e):n.load(a,e)}else for(var o=document.querySelectorAll("svg"),l=0;l<o.length;l++){var h=o[l],u=document.createElement("canvas")
  u.width=h.clientWidth,u.height=h.clientHeight,h.parentNode.insertBefore(u,h),h.parentNode.removeChild(h)
  var c=document.createElement("div")
  c.appendChild(h),r(u,c.innerHTML)}}
  "undefined"!=typeof Element.prototype.matches?a=function(t,e){return t.matches(e)}:"undefined"!=typeof Element.prototype.webkitMatchesSelector?a=function(t,e){return t.webkitMatchesSelector(e)}:"undefined"!=typeof Element.prototype.mozMatchesSelector?a=function(t,e){return t.mozMatchesSelector(e)}:"undefined"!=typeof Element.prototype.msMatchesSelector?a=function(t,e){return t.msMatchesSelector(e)}:"undefined"!=typeof Element.prototype.oMatchesSelector?a=function(t,e){return t.oMatchesSelector(e)}:("function"!=typeof jQuery&&"function"!=typeof Zepto||(a=function(t,e){return $(t).is(e)}),"undefined"==typeof a&&(a=Sizzle.matchesSelector))
  var o=/(\[[^\]]+\])/g,l=/(#[^\s\+>~\.\[:]+)/g,h=/(\.[^\s\+>~\.\[:]+)/g,u=/(::[^\s\+>~\.\[:]+|:first-line|:first-letter|:before|:after)/gi,c=/(:[\w-]+\([^\)]*\))/gi,f=/(:[^\s\+>~\.\[:]+)/g,p=/([^\s\+>~\.\[:]+)/g
  return"undefined"!=typeof CanvasRenderingContext2D&&(CanvasRenderingContext2D.prototype.drawSvg=function(t,e,i,n,s,a){var o={ignoreMouse:!0,ignoreAnimation:!0,ignoreDimensions:!0,ignoreClear:!0,offsetX:e,offsetY:i,scaleWidth:n,scaleHeight:s}
    for(var l in a)a.hasOwnProperty(l)&&(o[l]=a[l])
    r(this.canvas,t,o)}),r});