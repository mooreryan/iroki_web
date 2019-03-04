//= require spec_helper
//= require spec_helper_functions

viewer_spec_helpers = {};

viewer_spec_helpers.user_selects_a_new_layout = function (tree_layout_id) {
  var selector = $("#" + global.html.id.tree_layout);
  selector.val(tree_layout_id);
  global.html.val.tree_layout = selector.val();
};

describe("viewer functions", function () {
  afterEach("Remove all fixtures", function () {
    // MagicLamp.polish();
  });

  describe("dealing with the options panel", function () {
    beforeEach("load the fixture", function () {
      MagicLamp.wish("upload_panel", "options_panel", "save_panel");
      viewer.fn.reset_all_to_defaults();
      update_form_constants();
    });

    afterEach("reset everything to default", function () {
      // viewer.fn.reset_all_to_defaults();
      // update_form_constants();
    });

    context("setting the default options", function () {
      describe("reset_all_to_defaults()", function () {
        beforeEach(function () {
          viewer.fn.reset_all_to_defaults();
        });

        describe("setting global vars", function () {
          it("resets EXTRA_NAMES_WARNINGS", function () {
            // Make sure it's something other than false before running.
            EXTRA_NAME_WARNINGS = true;
            viewer.fn.reset_all_to_defaults();
            expect(EXTRA_NAME_WARNINGS).to.be.false;
          });

          it("resets tree_input", function () {
            tree_input = "arostienarston";
            viewer.fn.reset_all_to_defaults();
            expect(tree_input).to.be.null;
          });

          it("resets mapping_input", function () {
            mapping_input = "astoien";
            viewer.fn.reset_all_to_defaults();
            expect(mapping_input).to.be.null;
          });
        });

        describe("tree format options", function () {
          it("sets default layout shape", function () {
            expect(
              $("#" + global.html.id.tree_layout).val()
            ).to.equal(global.html.id.tree_layout_radial);

            expect(
              $("#" + global.html.id.tree_layout_radial).prop("selected")
            ).to.be.true;
          });

          it("sets default branch style", function () {
            expect(
              $("#" + global.html.id.tree_branch_style).val()
            ).to.equal(global.html.id.tree_branch_style_normal);

            expect(
              $("#" + global.html.id.tree_branch_style_normal).prop("selected")
            ).to.be.true;
          });

          it("sets default sorting", function () {
            expect(
              $("#" + global.html.id.tree_sorting).val()
            ).to.equal(global.html.id.tree_sorting_forward);

            expect(
              $("#" + global.html.id.tree_sorting_forward).prop("selected")
            ).to.be.true;
          });

          it("sets default tree rotation", function () {
            expect(
              parseInt($("#" + global.html.id.tree_rotation).val())
            ).to.equal(viewer.defaults.tree_rotation);
          });

          it("sets default tree root option", function () {
            expect(
              $("#" + global.html.id.biologically_rooted).prop("checked")
            ).to.be.true;
          });
        });

        describe("tree size options", function () {
          it("sets default tree width", function () {
            expect(
              parseInt($("#" + global.html.id.tree_width).val())
            ).to.equal(viewer.defaults.radial.width);
          });

          it("sets default tree height", function () {
            expect(
              parseInt($("#" + global.html.id.tree_height).val())
            ).to.equal(viewer.defaults.radial.height);
          });

          it("sets default tree padding", function () {
            expect(
              parseFloat($("#" + global.html.id.tree_padding).val())
            ).to.equal(viewer.defaults.tree_padding);
          });
        });

        describe("scale bar options", function () {

          it("checks show scale bar", function () {
            expect(
              $("#" + global.html.id.scale_bar_show).prop("checked")
            ).to.be.true;
          });

          it("sets default scale bar offset", function () {
            expect(
              parseFloat($("#" + global.html.id.scale_bar_offset_weight).val())
            ).to.equal(viewer.defaults.scale_bar_offset_weight);
          });

          it("checks autosize scale bar", function () {
            expect(
              $("#" + global.html.id.scale_bar_autosize).prop("checked")
            ).to.equal(viewer.defaults.scale_bar_autosize_is_checked);
          });

          it("sets the default scale bar length", function () {
            expect(
              parseFloat($("#" + global.html.id.scale_bar_length).val())
            ).to.equal(viewer.defaults.scale_bar_length);

            expect(
              $("#" + global.html.id.scale_bar_length).prop("disabled")
            ).to.equal(viewer.defaults.scale_bar_length_is_disabled);
          });
        });

        describe("label options", function () {
          describe("inner label options", function () {
            it("unchecks show leaf labels", function () {
              expect(
                $("#" + global.html.id.inner_labels_show).prop("checked")
              ).to.be.false;
            });

            it("sets inner label default size", function () {
              expect(
                parseInt($("#" + global.html.id.inner_labels_size).val())
              ).to.equal(viewer.defaults.inner_labels_size);
            });

            it("sets inner label default color", function () {
              expect(
                $("#" + global.html.id.inner_labels_color).val()
              ).to.equal(viewer.defaults.inner_labels_color);
            });

            it("sets the inner label default font", function () {
              expect(
                $("#" + global.html.id.inner_labels_font).val()
              ).to.equal(viewer.defaults.inner_labels_font);

              expect(
                $("#" + global.html.id.inner_labels_font_helvetica).prop("selected")
              ).to.be.true;
            });
          });

          describe("leaf label options", function () {
            it("sets show leaf labels to default", function () {
              expect(
                $("#" + global.html.id.leaf_labels_show).prop("checked")
              ).to.equal(viewer.defaults.leaf_labels_show);
            });

            it("sets default leaf label size", function () {
              expect(
                parseInt($("#" + global.html.id.leaf_labels_size).val())
              ).to.equal(viewer.defaults.leaf_labels_size);
            });

            it("sets default leaf label padding", function () {
              expect(
                parseFloat($("#" + global.html.id.leaf_labels_padding).val())
              ).to.equal(viewer.defaults.leaf_labels_padding);
            });

            it("sets the default for aligning tip labels", function () {
              "align-tip-labels";
              expect(
                $("#" + global.html.id.leaf_labels_align).prop("checked")
              ).to.equal(viewer.defaults.leaf_labels_align);
            });

            it("sets the default leaf label color", function () {
              expect(
                $("#" + global.html.id.leaf_labels_color).val()
              ).to.equal(viewer.defaults.leaf_labels_color);
            });

            it("sets the default leaf label font", function () {
              expect(
                $("#" + global.html.id.leaf_labels_font).val()
              ).to.equal(viewer.defaults.leaf_labels_font);

              expect(
                $("#" + global.html.id.leaf_labels_font_helvetica).prop("selected")
              ).to.be.true;
            });
          });
        });

        describe("dot options", function () {
          describe("inner dot options", function () {
            it("sets show inner dots default", function () {
              expect(
                $("#" + global.html.id.inner_dots_show).val()
              ).to.equal(viewer.defaults.inner_dots_show);

              expect(
                $("#" + viewer.defaults.inner_dots_show).prop("selected")
              ).to.be.true;
            });

            it("sets open dot cutoff default", function () {
              expect(
                parseFloat($("#" + global.html.id.inner_dots_cutoff_unfilled).val())
              ).to.equal(viewer.defaults.inner_dots_cutoff_unfilled);
            });

            it("sets filled dot cutoff default", function () {
              expect(
                parseFloat($("#" + global.html.id.inner_dots_cutoff_filled).val())
              ).to.equal(viewer.defaults.inner_dots_cutoff_filled);
            });

            it("sets inner dot color default", function () {
              expect(
                $("#" + global.html.id.inner_dots_color).val()
              ).to.equal(viewer.defaults.inner_dots_color);
            });

            it("sets inner dot size default", function () {
              expect(
                parseFloat($("#" + global.html.id.inner_dots_size).val())
              ).to.equal(viewer.defaults.inner_dots_size);
            });
          });

          describe("leaf dot options", function () {
            it("sets show leaf dots default", function () {
              expect(
                $("#" + global.html.id.leaf_dots_show).prop("checked")
              ).to.eq(viewer.defaults.leaf_dots_show);
            });

            it("sets align leaf dots default", function () {
              expect(
                $("#" + global.html.id.leaf_dots_align).prop("checked")
              ).to.eq(viewer.defaults.leaf_dots_align);
            });

            it("sets leaf dot color default", function () {
              expect(
                $("#" + global.html.id.leaf_dots_color).val()
              ).to.equal(viewer.defaults.leaf_dots_color);
            });

            it("sets leaf dot size default", function () {
              expect(
                parseFloat($("#" + global.html.id.leaf_dots_size).val())
              ).to.equal(viewer.defaults.leaf_dots_size);
            });
          });
        });

        describe("bar options", function () {
          it("sets show bars default", function () {
            expect(
              $("#" + global.html.id.bars_show).prop("checked")
            ).to.eq(viewer.defaults.bars_show);
          });

          it("sets show bar axis default", function () {
            expect(
              $("#" + global.html.id.bars_axis_show).prop("checked")
            ).to.eq(viewer.defaults.bars_axis_show);
          });

          it("sets align bars default", function () {
            expect(
              $("#" + global.html.id.bars_align).prop("checked")
            ).to.eq(viewer.defaults.bars_align);
          });

          it("sets default bar and axis color", function () {
            expect(
              $("#" + global.html.id.bars_color).val()
            ).to.equal(viewer.defaults.bars_color);
          });

          it("sets default bar padding", function () {
            expect(
              parseFloat($("#" + global.html.id.bars_padding).val())
            ).to.eq(viewer.defaults.bars_padding);
          });

          it("sets default bar height", function () {
            expect(
              parseFloat($("#" + global.html.id.bars_height).val())
            ).to.eq(viewer.defaults.bars_height);
          });

          it("sets default bar width", function () {
            expect(
              parseFloat($("#" + global.html.id.bars_width).val())
            ).to.eq(viewer.defaults.bars_width);
          });
        });

        describe("arc options", function () {
          it("sets show arcs default", function () {
            expect(
              $("#" + global.html.id.arcs_show).prop("checked")
            ).to.eq(viewer.defaults.arcs_show);
          });

          it("sets default arc padding", function () {
            expect(
              parseFloat($("#" + global.html.id.arcs_padding).val())
            ).to.eq(viewer.defaults.arcs_padding);
          });

          it("sets default arc height", function () {
            expect(
              parseFloat($("#" + global.html.id.arcs_height).val())
            ).to.eq(viewer.defaults.arcs_height);
          });

          it("sets default arc cap radius", function () {
            expect(
              parseFloat($("#" + global.html.id.arcs_cap_radius).val())
            ).to.eq(viewer.defaults.arcs_cap_radius);
          });
        });

        describe("branch options", function () {
          it("sets default branch color", function () {
            expect(
              $("#" + global.html.id.branches_color).val()
            ).to.equal(viewer.defaults.branches_color);
          });

          it("sets default branch width", function () {
            expect(
              parseFloat($("#" + global.html.id.branches_width).val())
            ).to.equal(viewer.defaults.branches_width);
          });
        });

        describe("viewer options", function () {
          it("sets the default for viewer fixed size", function () {
            expect(
              $("#" + global.html.id.viewer_size_fixed).prop("checked")
            ).to.equal(viewer.defaults.viewer_size_fixed);
          });
        });
      });
    });

    context("setting the form globals", function () {
      describe("update_form_constants()", function () {
        context("updating arc global options", function () {
          it("sets the arcs_show val", function () {
            expect(
              global.html.val.arcs_show
            ).to.equal(viewer.defaults.arcs_show);
          });

          it("sets the arcs_padding val", function () {
            expect(
              global.html.val.arcs_padding
            ).to.equal(viewer.defaults.arcs_padding);
          });

          it("sets the arcs_height val", function () {
            expect(
              global.html.val.arcs_height
            ).to.equal(viewer.defaults.arcs_height);
          });

          it("sets the arcs_cap_radius val", function () {
            expect(
              global.html.val.arcs_cap_radius
            ).to.equal(viewer.defaults.arcs_cap_radius);
          });
        });

        context("updating layout global options", function () {
          it("sets the tree_layout val", function () {
            expect(
              global.html.val.tree_layout
            ).to.equal(viewer.defaults.tree_layout);
          });

          it("sets the tree_layout_rectangular val to default", function () {
            expect(
              global.html.val.tree_layout_rectangular
            ).to.be.false;
          });

          it("sets the tree_layout_radial val to default", function () {
            expect(
              global.html.val.tree_layout_radial
            ).to.be.true;
          });

          it("sets the tree_layout_circular val to default", function () {
            expect(
              global.html.val.tree_layout_circular
            ).to.be.false;
          });

        });
      });
    });

    context("warning user about arc options", function () {
      describe("warn_about_arcs()", function () {
        beforeEach("set up the spy", function () {
          // Spy on the alert function
          sinon.spy(window, "alert");
        });

        afterEach("tear down the spy", function () {
          window.alert.restore();
        });

        context("when in rectangular mode", function () {
          beforeEach("user selects rectangular layout", function () {
            var tree_layout = $("#" + global.html.id.tree_layout);
            var arcs_show   = $("#" + global.html.id.arcs_show);

            tree_layout.val(global.html.id.tree_layout_rectangular);
            global.html.val.tree_layout = tree_layout.val();

            arcs_show.prop("checked", true);
            global.html.val.arcs_show = arcs_show.prop("checked");

            viewer.fn.warn_about_arcs();
          });

          it("makes sure the show arc option is not checked", function () {
            expect(
              $("#" + global.html.id.arcs_show).prop("checked")
            ).to.be.false;
          });

          it("alerts the user what happened", function () {
            expect(
              window.alert.calledWith(global.warnings.arcs_not_available)
            ).to.be.true;
          });
        });

        context("when in radial mode", function () {
          beforeEach("user selects radial layout", function () {
            var tree_layout = $("#" + global.html.id.tree_layout);
            var arcs_show   = $("#" + global.html.id.arcs_show);

            tree_layout.val(global.html.id.tree_layout_radial);
            global.html.val.tree_layout = tree_layout.val();

            arcs_show.prop("checked", true);
            global.html.val.arcs_show = arcs_show.prop("checked");

            viewer.fn.warn_about_arcs();
          });

          it("makes sure the show arc option is not checked", function () {
            expect(
              $("#" + global.html.id.arcs_show).prop("checked")
            ).to.be.false;
          });

          it("alerts the user what happened", function () {
            expect(
              window.alert.calledWith(global.warnings.arcs_not_available)
            ).to.be.true;
          });

          it("resets the global val variable", function () {
            expect(
              global.html.val.arcs_show
            ).to.be.false;
          });
        });
      });
    });

    context("warning user about bar options", function () {
      context("warning user about showing bar axes", function () {
        describe("warn_about_bars_axis_show()", function () {
          beforeEach("set up the spy", function () {
            // Spy on the alert function
            sinon.spy(window, "alert");
          });

          afterEach("tear down the spy", function () {
            window.alert.restore();
          });

          context("when in rectangular mode", function () {
            beforeEach("user makes selections", function () {
              viewer_spec_helpers.user_selects_a_new_layout(global.html.id.tree_layout_rectangular);

              var selector = $("#" + global.html.id.bars_axis_show);

              selector.prop("checked", true);
              global.html.val.bars_axis_show = selector.prop("checked");

              viewer.fn.warn_about_bars_axis_show();
            });

            it("unchecks the show bars axis option", function () {
              expect(
                $("#" + global.html.id.bars_axis_show).prop("checked")
              ).to.be.false;
            });

            it("alerts the user to what happened", function () {
              expect(
                window.alert.calledWith(global.warnings.bars_axis_not_available)
              );
            });

            it("resets the global val variable", function () {
              expect(
                global.html.val.bars_axis_show
              ).to.be.false;
            });
          });


          context("when in radial mode", function () {
            beforeEach("user makes selections", function () {
              viewer_spec_helpers.user_selects_a_new_layout(global.html.id.tree_layout_radial);

              var selector = $("#" + global.html.id.bars_axis_show);

              selector.prop("checked", true);
              global.html.val.bars_axis_show = selector.prop("checked");

              viewer.fn.warn_about_bars_axis_show();
            });

            it("unchecks the show bars axis option", function () {
              expect(
                $("#" + global.html.id.bars_axis_show).prop("checked")
              ).to.be.false;
            });

            it("alerts the user to what happened", function () {
              expect(
                window.alert.calledWith(global.warnings.bars_axis_not_available)
              );
            });

            it("resets the global val variable", function () {
              expect(
                global.html.val.bars_axis_show
              ).to.be.false;
            });
          });
        });
      });
    });
  });
});