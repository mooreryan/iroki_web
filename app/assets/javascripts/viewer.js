// Copyright 2011 Jason Davies https://github.com/jasondavies/newick.js
function parseNewick(a){for(var e=[],r={},s=a.split(/\s*(;|\(|\)|,|:)\s*/),t=0;t<s.length;t++){var n=s[t];switch(n){case"(":var c={};r.branchset=[c],e.push(r),r=c;break;case",":var c={};e[e.length-1].branchset.push(c),r=c;break;case")":r=e.pop();break;case":":break;default:var h=s[t-1];")"==h||"("==h||","==h?r.name=n:":"==h&&(r.length=parseFloat(n))}}return r}

//
// Stuff from the old viewer goes here
//

function clear_elem(id) {
  chart_elem = document.getElementById(id);

  // Clear the elem if it is there
  if (chart_elem) {
    chart_elem.parentNode.removeChild(chart_elem);
  }
}


// load dataset 
function load_dataset(file) {
  clear_elem("svg-tree");
  console.log("about to call lalala()");
  lalala(file);
}

// handle upload button
function upload_button(el, callback) {
  var uploader = document.getElementById(el);
  var reader = new FileReader();

  reader.onload = function(e) {
    var contents = e.target.result;
    callback(contents);
  };

  uploader.addEventListener("change", handleFiles, false);

  function handleFiles() {
    d3.select("#table").text("loading...");
    var file = this.files[0];
    reader.readAsText(file);
  }
}


//
// Stuff from the old viewer stops here
//


var LAYOUT_STATE, LAYOUT_CIRCLE, LAYOUT_STRAIGHT;
var TREE_BRANCH_STYLE, TREE_BRANCH_CLADOGRAM, TREE_BRANCH_NORMAL;
var the_x, the_y;
var SIZE, INNER_SIZE;
var OUTER_WIDTH, OUTER_HEIGHT, HEIGHT_PADDING, WIDTH_PADDING, INNER_WIDTH, INNER_HEIGHT;
var root, svg, chart, data, circles, labels, linkExtension, link;

var SHOW_INNER_LABELS, SHOW_LEAF_LABELS;

var INNER_LABEL_SIZE, LEAF_LABEL_SIZE;
var BRANCH_WIDTH;
var SHOW_INNER_DOTS, SHOW_LEAF_DOTS;

var LABEL_ROTATION;

var INNER_DOT_SIZE, LEAF_DOT_SIZE;

var TREE_ROTATION;

var VIEWER_WIDTH, VIEWER_HEIGHT, VIEWER_SIZE_FIXED;

var align_tip_labels;

// To hold temporary DOM elements
var elem;

// The mega function
function lalala(tree_input)
{

  // Listen for save
  // See https://github.com/vibbits/phyd3/blob/9e5cf7edef72b1e8d4e8355eb5ab4668734816e5/js/phyd3.phylogram.js#L915
  d3.select("#save-svg").on("click", save_svg_data);
  d3.select("#save-png").on("click", save_png_data);

  console.log("first line of lalala()");
  // One listener to rule them all
  d3.select("#tree-form").on("change", function() { console.log("apple pie!"); draw_tree(); });

  draw_tree();

  var circle_cluster, rectangle_cluster;
  function is_leaf(d)
  {
    return d.value == 1;
  }

  function is_inner(d)
  {
    return !is_leaf(d);
  }

  function set_value_of(id, val)
  {
    var elem = document.getElementById(id);
    elem.value = val;
  }

  function draw_tree()
  {
    clear_elem("svg-tree");

    LAYOUT_CIRCLE = "circular-tree";
    LAYOUT_STRAIGHT = "rectangular-tree";
    LAYOUT_STATE = document.getElementById("tree-shape").value;

    // Enable the save button
    document.getElementById("save-svg").removeAttribute("disabled");
    document.getElementById("save-png").removeAttribute("disabled");



    // Dots
    SHOW_INNER_DOTS = document.getElementById("show-inner-dots").checked;
    SHOW_LEAF_DOTS = document.getElementById("show-leaf-dots").checked;
    INNER_DOT_SIZE = parseInt(document.getElementById("inner-dots-size").value);
    LEAF_DOT_SIZE = parseInt(document.getElementById("leaf-dots-size").value);
    if (SHOW_INNER_DOTS) {
      document.getElementById("inner-dots-size").removeAttribute("disabled");
    } else {
      document.getElementById("inner-dots-size").setAttribute("disabled", "");
    }
    if (SHOW_LEAF_DOTS) {
      document.getElementById("leaf-dots-size").removeAttribute("disabled");
    } else {
      document.getElementById("leaf-dots-size").setAttribute("disabled", "");
    }


    BRANCH_WIDTH = parseInt(document.getElementById("branch-width").value);

    INNER_LABEL_SIZE = parseInt(document.getElementById("inner-label-size").value);
    LEAF_LABEL_SIZE = parseInt(document.getElementById("leaf-label-size").value);

    TREE_BRANCH_CLADOGRAM  = "cladogram";
    TREE_BRANCH_NORMAL     = "normalogram";
    TREE_BRANCH_STYLE      = document.getElementById("tree-branch-style").value;
    the_x = "x";
    the_y = TREE_BRANCH_STYLE == TREE_BRANCH_CLADOGRAM ? "y" : "radius";

    // if (LAYOUT_STATE == LAYOUT_STRAIGHT) {
    //   document.getElementById("tree-rotation").removeAttribute("disabled");
    //   TREE_ROTATION = parseFloat(document.getElementById("tree-rotation").value);
    // } else {
    //   document.getElementById("tree-rotation").setAttribute("disabled", "");
    //   TREE_ROTATION = 0;
    // }
    TREE_ROTATION = 0;

    if (LAYOUT_STATE == LAYOUT_STRAIGHT && TREE_ROTATION == 270) { // ie rectangle tree on its side
      LABEL_ROTATION = parseInt(document.getElementById("label-rotation").value) + 90;
    } else {
      LABEL_ROTATION = parseInt(document.getElementById("label-rotation").value);
    }

    SHOW_INNER_LABELS = document.getElementById("show-inner-labels").checked;
    SHOW_LEAF_LABELS = document.getElementById("show-leaf-labels").checked;


    // Show or hide align tip labels
    if (!SHOW_LEAF_LABELS || TREE_BRANCH_STYLE == TREE_BRANCH_CLADOGRAM) {
      document.getElementById("align-tip-labels").setAttribute("disabled", "");
      document.getElementById("align-tip-labels").removeAttribute("checked");
      align_tip_labels = false;
    } else {
      document.getElementById("align-tip-labels").removeAttribute("disabled");
      align_tip_labels = document.getElementById("align-tip-labels").checked;
    }

    // Show/hide labels size
    if (SHOW_LEAF_LABELS) {
      document.getElementById("leaf-label-size").removeAttribute("disabled");
    } else {
      document.getElementById("leaf-label-size").setAttribute("disabled", "");
    }

    // If it's circle the label rotation gets disabled
    if (LAYOUT_STATE == LAYOUT_STRAIGHT && (SHOW_LEAF_LABELS || SHOW_INNER_LABELS)) {
      document.getElementById("label-rotation").removeAttribute("disabled");
    } else {
      document.getElementById("label-rotation").setAttribute("disabled", "");
    }

    if (SHOW_INNER_LABELS) {
      document.getElementById("inner-label-size").removeAttribute("disabled");
    } else {
      document.getElementById("inner-label-size").setAttribute("disabled", "");
    }

    // Set the align tip labels button to false if it is a cladogram
    if (TREE_BRANCH_STYLE == TREE_BRANCH_CLADOGRAM) {
      elem = null;
      elem = document.getElementById("align-tip-labels");
      elem.checked = false;
    }


    // Set the height to match the width
    if (LAYOUT_STATE == LAYOUT_CIRCLE) {
      // Disable the height slider
      elem = null;
      elem = document.getElementById("outer-height");
      elem.disabled = true;

      elem = null;
      elem = document.getElementById("height-padding");
      elem.disabled = true;

      OUTER_WIDTH  = parseInt(document.getElementById("outer-width").value);
      OUTER_HEIGHT = OUTER_WIDTH;

      WIDTH_PADDING = parseFloat(document.getElementById("width-padding").value);
      HEIGHT_PADDING = WIDTH_PADDING;

      set_value_of("outer-height", OUTER_WIDTH);
      set_value_of("height-padding", WIDTH_PADDING);
    } else {
      elem = null;
      elem = document.getElementById("outer-height");
      elem.disabled = false;

      elem = null;
      elem = document.getElementById("height-padding");
      elem.disabled = false;

      OUTER_WIDTH  = parseInt(document.getElementById("outer-width").value);
      OUTER_HEIGHT = parseInt(document.getElementById("outer-height").value);

      WIDTH_PADDING  = parseFloat(document.getElementById("width-padding").value);
      HEIGHT_PADDING = parseFloat(document.getElementById("height-padding").value);
    }

    INNER_WIDTH  = Math.round(OUTER_WIDTH * (1 - WIDTH_PADDING));
    INNER_HEIGHT = Math.round(OUTER_HEIGHT * (1 - HEIGHT_PADDING));


    console.log("first line of draw tree");

    // When setting size for circular layout, use width by convention, but they will be the same.
    circle_cluster = d3.cluster()
      .size([360, INNER_WIDTH])
      .separation(function(a, b) { return 1; });

    rectangle_cluster = d3.cluster()
      .size([INNER_WIDTH * 2, INNER_HEIGHT * 2])
      .separation(function(a, b) { return 1; });

    root = d3.hierarchy(parseNewick(tree_input), function(d) { return d.branchset; })
      .sum(function(d) { return d.branchset ? 0 : 1; })
      .sort(function(a, b) { return (a.value - b.value) || d3.ascending(a.data.length, b.data.length); });

    if (LAYOUT_STATE == LAYOUT_CIRCLE) {
      circle_cluster(root);
      setRadius(root, root.data.length = 0, INNER_WIDTH / maxLength(root));

    } else if (LAYOUT_STATE == LAYOUT_STRAIGHT) {
      rectangle_cluster(root);
      // TODO should this be width or height
      setRadius(root, root.data.length = 0, (INNER_HEIGHT*2) / maxLength(root));
    }

    VIEWER_SIZE_FIXED = document.getElementById("viewer-size-fixed").checked;
    if (VIEWER_SIZE_FIXED) {
      document.getElementById("viewer-height").removeAttribute("disabled");
      document.getElementById("viewer-width").removeAttribute("disabled");

      VIEWER_HEIGHT = parseInt(document.getElementById("viewer-height").value);
      VIEWER_WIDTH = parseInt(document.getElementById("viewer-width").value);
      //
      document.getElementById("tree-div")
        .setAttribute("style", "overflow: scroll; display: block; height: " + VIEWER_HEIGHT + "px; width: " + VIEWER_WIDTH + "px;");

    } else {
      document.getElementById("viewer-height").setAttribute("disabled", "");
      document.getElementById("viewer-width").setAttribute("disabled", "");

      document.getElementById("tree-div").removeAttribute("style");
    }

    svg = d3.select("#tree-div")
      .append("svg")
      .attr("width", OUTER_WIDTH * 2)
      .attr("height", OUTER_HEIGHT * 2)
      .attr("id", "svg-tree")
      // .attr("transform", "rotate(" + TREE_ROTATION + ")")
      .style("background-color", "white"); // TODO make bg color an option

    var chart_width, chart_height;
    var chart_transform_width, chart_transform_height;
    if (LAYOUT_STATE == LAYOUT_CIRCLE) {
      chart_width  = OUTER_WIDTH;
      chart_height = OUTER_HEIGHT;

      chart_transform_width  = OUTER_WIDTH;
      chart_transform_height = OUTER_HEIGHT;
    } else {
      chart_width  = INNER_WIDTH * 2;
      chart_height = INNER_HEIGHT * 2;

      chart_transform_width  = OUTER_WIDTH * WIDTH_PADDING;
      chart_transform_height = OUTER_HEIGHT * HEIGHT_PADDING;
    }
    chart = svg.append("g")
      .attr("width", chart_width)
      .attr("height", chart_height)
      .attr("transform",
        "translate(" + chart_transform_width + ", " + chart_transform_height + ")")
      .attr("id", "apple-chart");

    function pick_transform(d)
    {
      if (LAYOUT_STATE == LAYOUT_CIRCLE && is_leaf(d)) {
        return circle_transform(d, the_x, align_tip_labels ? "y" : the_y);
      } else if (LAYOUT_STATE == LAYOUT_CIRCLE) {
        return circle_transform(d, the_x, the_y);
      } else if (LAYOUT_STATE == LAYOUT_STRAIGHT && is_leaf(d)) {
        return rectangle_transform(d, the_x, align_tip_labels ? "y" : the_y);
      } else if (LAYOUT_STATE == LAYOUT_STRAIGHT) {
        return rectangle_transform(d, the_x, the_y);
      } else {
        // TODO handle radial layout
      }
    }

    if (SHOW_INNER_DOTS) {
      chart.append("g")
        .selectAll("circle")
        .data(root.descendants().filter(function (d) {
          return is_inner(d);
        }))
        .enter().append("circle")
        .attr("class", "inner")
        .attr("r", INNER_DOT_SIZE)
        .attr("transform", function(d) {
          return pick_transform(d);
        })
        .style("fill", function(d) { return d.color; } );
    }

    if (SHOW_LEAF_DOTS) {
      chart.append("g")
        .selectAll("circle")
        .data(root.descendants().filter(is_leaf))
        .enter().append("circle")
        .attr("class", "leaf")
        .attr("r", LEAF_DOT_SIZE)
        .attr("transform", function(d) {
          return pick_transform(d);
        })
        .style("fill", function(d) { return d.color; } );
    }

    if (SHOW_INNER_LABELS) {
      labels = chart.append("g")
        .selectAll("text")
        .data(root.descendants().filter(is_inner))
        .enter().append("text")
        .attr("class", "inner")
        .style("font-size", INNER_LABEL_SIZE)
        .attr("dy", text_y_offset)
        .attr("dx", text_x_offset)
        .attr("text-anchor", function(d) {
          return LAYOUT_STATE == LAYOUT_CIRCLE ? circular_text_anchor(d) : straight_text_anchor(d);
        })
        .attr("transform", function(d) {
          return pick_transform(d);
        })
        .text(function(d) { return d.data.name; })
    }

    if (SHOW_LEAF_LABELS) {
      labels = chart.append("g")
        .selectAll("text")
        .data(root.descendants().filter(is_leaf))
        .enter().append("text")
        .attr("class", "leaf")
        .style("font-size", LEAF_LABEL_SIZE)
        .attr("dy", text_y_offset)
        .attr("dx", text_x_offset)
        .attr("text-anchor", function(d) {
          return LAYOUT_STATE == LAYOUT_CIRCLE ? circular_text_anchor(d) : straight_text_anchor(d);
        })
        .attr("transform", function(d) {
          return pick_transform(d);
        })
        .text(function(d) { return d.data.name; })
    }


    if (align_tip_labels) {
      // Draw the link extensions
      linkExtension = chart.append("g")
        .attr("class", "link-extensions")
        .attr("id", "qwfp")
        .selectAll("path")
        .data(root.links().filter(function (d) {
          return !d.target.children;
        }))
        .enter().append("path")
        .style("fill", "none")
        .style("stroke", "#000")
        .style("stroke-opacity", "0.25")
        .attr("stroke-width", BRANCH_WIDTH)
        .attr("stroke-dasharray", "1, 5")
        .attr("class", "dotted-links")
        .each(function (d) {
          d.target.linkExtensionNode = this;
        })
        .attr("d", function (d) {
          return LAYOUT_STATE == LAYOUT_CIRCLE ? linkCircleExtension(d) : link_rectangle_extension(d, the_x, "y");
        });
    } else {
      d3.selectAll(".link-extensions").remove();
    }

    link = chart.append("g")
      .attr("class", "links")
      .selectAll("path")
      .data(root.links())
      .enter().append("path")
      .style("fill", "none")
      .style("stroke", "#000")
      .attr("stroke-width", BRANCH_WIDTH)
      .each(function(d) { d.target.linkNode = this; })
      .attr("d", function(d) {
        return LAYOUT_STATE == LAYOUT_CIRCLE ? linkCircle(d) : rectangle_link(d, the_x, the_y);
      })
      .attr("stroke", function(d) { return d.target.color; });
  }



  function text_x_offset(d)
  {
    if (LAYOUT_STATE == LAYOUT_CIRCLE) { // circular
      return d[the_x] < 90 || d[the_x] > 270 ? "0.6em" : "-0.6em";
    } else {
      if (LABEL_ROTATION == 90) {
        return "0.6em"; // They're going up and down so move away from branch
      } else if (LABEL_ROTATION == -90) {
        return "-0.6em";
      } else {
        return "0em";
      }
    }
  }

  function text_y_offset(d)
  {
    if (LAYOUT_STATE == LAYOUT_CIRCLE) { // circular
      return "0.2em"  // center the label on the branch;
    } else {
      if (TREE_ROTATION == 0) {
        if (LABEL_ROTATION == 90 || LABEL_ROTATION == -90) {
          return "0.3em"; // They're going up and down so center them
        } else {
          return "1.2em";
        }
      } else {
        if (LABEL_ROTATION == 0 || LABEL_ROTATION == 45) {
          return "1.2em";
        } else if (LABEL_ROTATION == 90) {
          return "0.3em";
        } else if (LABEL_ROTATION == 135 || LABEL_ROTATION == 180) {
          return "-1.2em";
        }
      }
    }
  }

  function circular_text_anchor(d)
  {
    return d[the_x] < 90 || d[the_x] > 270 ? "start" : "end";
  }

  function straight_text_anchor(d) {
    if (TREE_ROTATION == 0) {
      if (LABEL_ROTATION == 0) {
        return "middle";
      } else if (LABEL_ROTATION < 0) {
        return "end";
      } else {
        return "start";
      }
    } else {
      if (LABEL_ROTATION == 0 || LABEL_ROTATION == 180) {
        return "middle";
      } else {
        return "start";
      }
    }
  }


// These functions update the layout
  function circle_transform(d, x, y)
  {
    return "rotate(" + d[x] +
      ") translate(" + d[y] + ", 0)" +
      (d[x] < 90 || d[x] > 270 ? "" : "rotate(180)");
  }

  function rectangle_transform(d, x, y)
  {
    return "rotate(0) translate(" + d[x] + " " + d[y] + ") rotate(" +
      LABEL_ROTATION + ")";
  }

  function straight_link(d) {
    return "M " + (d.source[the_x] - INNER_WIDTH) + " " + d.source[the_y] + " L " + (d.target[the_x] - INNER_HEIGHT) + " " + d.target[the_y];
  }

  function rectangle_link(d, x, y) {
    var start_point, mid_point, end_point;

    start_point = d.source[x] + " " + d.source[y];
    end_point   = d.target[x] + " " + d.target[y];

    // Only side to side is an option
    mid_point = d.target[x] + " " + d.source[y];

    // if (document.getElementById("up-and-down").selected) {
    //   mid_point = (d.target[the_x] - (INNER_WIDTH - INNER_WIDTH)) + " " + d.source[the_y];
    // } else {
    //   mid_point = (d.source[the_x] - (INNER_WIDTH - INNER_WIDTH)) + " " + d.target[the_y];
    // }

    return "M " + start_point + " L " + mid_point + " L " + end_point;
  }

  function link_rectangle_extension(d, x, y)
  {
    var start_point = d.target[x] + " " + d.target["radius"];
    var end_point   = d.target[x] + " " + d.target["y"];

    return "M " + start_point +  " L" + end_point;
  }






  function linkCircle(d) {
    return linkStep(d.source[the_x], d.source[the_y], d.target[the_x], d.target[the_y]);
  }

// TODO need an option for labels lined up on the radius or labels at
// the end of the links.
  function linkCircleExtension(d) {
    // the_y must be radius
    return linkStep(d.target[the_x], d.target[the_y], d.target[the_x], INNER_WIDTH);
  }

// Like d3.svg.diagonal.radial, but with square corners.
  function linkStep(startAngle, startRadius, endAngle, endRadius) {
    var c0 = Math.cos(startAngle = (startAngle ) / 180 * Math.PI),
      s0 = Math.sin(startAngle),
      c1 = Math.cos(endAngle = (endAngle ) / 180 * Math.PI),
      s1 = Math.sin(endAngle);
    return "M" + startRadius * c0 + "," + startRadius * s0
      + (endAngle === startAngle ? "" : "A" + startRadius + "," + startRadius + " 0 0 " + (endAngle > startAngle ? 1 : 0) + " " + startRadius * c1 + "," + startRadius * s1)
      + "L" + endRadius * c1 + "," + endRadius * s1;
  }

// Set the radius of each node by recursively summing and scaling the distance from the root.
  function setRadius(d, y0, k) {
    d.radius = (y0 += d.data.length) * k;
    if (d.children) d.children.forEach(function(d) { setRadius(d, y0, k); });
  }

// Compute the maximum cumulative length of any node in the tree.
  function maxLength(d) {
    return d.data.length + (d.children ? d3.max(d.children, maxLength) : 0);
  }

}



// These are for saving
function svg_elem_to_string(id)
{
  var svg_elem = document.getElementById(id);

  if (svg_elem) {
    return (new XMLSerializer()).serializeToString(svg_elem);
  }
}

// TODO png should keep background color
function save_png_data()
{
  var svg_string = svg_elem_to_string("svg-tree");

  var canvas = document.createElement("canvas");
  canvg(canvas, svg_string);
  canvas.toBlobHD(function(blob) {
    saveAs(blob, "tree.png");
  })
}

function save_svg_data()
{
  saveAs(
    new Blob([svg_elem_to_string("svg-tree")],
    { type : "application/svg+xml" }),
    "tree.svg"
  );
}
