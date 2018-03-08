//= require spec_helper_functions

/*
describe("fn", function () {
  describe("fn.parsed_biom", function () {
    describe("fn.parsed_biom.abundance_across", function () {
      it("calculates relative abundance across all samples", function () {
        var expected = {
          abundance: { apple: 5, pie: 5 },
          min_val: 5,
          max_val: 5
        };

        var actual = fn.parsed_biom.abundance_across(spec_helper.PARSED_BIOM, g_ID_AVG_METHOD_ALL_SAMPLES_MEAN);

        spec_helper.expect_stringify_equal(actual, expected);
      });

      it("calculates relative abundance across non-zero samples", function () {
        var expected = {
          abundance: { apple: 10, pie: 10 },
          min_val: 10,
          max_val: 10
        };

        var actual = fn.parsed_biom.abundance_across(spec_helper.PARSED_BIOM, g_ID_AVG_METHOD_NONZERO_SAMPLES_MEAN);

        spec_helper.expect_stringify_equal(actual, expected);
      });

      it("handles leaves with all zero counts");
    });

    describe("fn.parsed_biom.leaf_sample_points", function () {
      it("gives points for each leaf for each sample", function () {
        var pt       = fn.pt.new(1, 0);
        var expected = {
          geode: {
            sample_1: pt
          },
          clock: {
            sample_1: pt
          },
          tire: {
            sample_1: pt
          },
          banana: {
            sample_1: pt
          },
          eggplant: {
            sample_1: pt
          }
        };

        var parsed_biom = biom.parse_biom_file_str(spec_helper.single_sample.BIOM_STR);
        var actual      = fn.parsed_biom.leaf_sample_points(parsed_biom);

        spec_helper.expect_stringify_equal(actual, expected);
      });

      it("doesn't change parsed_biom", function () {
        spec_helper.it_doesnt_change_parsed_biom(fn.parsed_biom.leaf_sample_points, spec_helper.single_sample.BIOM_STR);
      });
    });

    describe("fn.parsed_biom.non_zero_count_samples", function () {
      it("returns 'none' if the leaf has zero counts across", function () {

        var biom_str    = "name\ts1\ts2\napple\t0\t0";
        var parsed_biom = Papa.parse(biom_str, spec_helper.PAPA_CONFIG);
        var expected    = { apple: "none" };
        var actual      = fn.parsed_biom.non_zero_count_samples(parsed_biom);

        spec_helper.expect_stringify_equal(actual, expected);
      });

      it("returns 'many' if the leaf has 2 or more non zero counts", function () {
        var biom_str    = "name\ts1\ts2\napple\t1\t2";
        var parsed_biom = Papa.parse(biom_str, spec_helper.PAPA_CONFIG);
        var expected    = { apple: "many" };
        var actual      = fn.parsed_biom.non_zero_count_samples(parsed_biom);

        spec_helper.expect_stringify_equal(actual, expected);

      });
      it("returns the name of the sample if there is one non zero count sample", function () {
        var biom_str    = "name\ts1\ts2\napple\t1\t0";
        var parsed_biom = Papa.parse(biom_str, spec_helper.PAPA_CONFIG);
        var expected    = { apple: "s1" };
        var actual      = fn.parsed_biom.non_zero_count_samples(parsed_biom);

        spec_helper.expect_stringify_equal(actual, expected);
      });
    });

    describe("fn.parsed_biom.num_real_samples", function () {
      it("counts the actual samples", function () {
        var biom        = "name\ts1\ts2\tiroki_fake_1\tiroki_fake_2\napple\t10\t20\t0\t0\npie\t20\t10\t0\t0";
        var parsed_biom = Papa.parse(biom, spec_helper.PAPA_CONFIG);

        var expected = 2;
        var actual   = fn.parsed_biom.num_real_samples(parsed_biom);

        expect(actual).to.equal(expected);
      });
    });

    describe("fn.parsed_biom.sample_angles", function () {
      it("returns the fields and angles", function () {
        var angle_offset = 0;
        var fields       = ["s1", "s2"];
        var angles       = [0, 180];
        var expected     = [fields, angles];
        var actual       = fn.parsed_biom.sample_angles(spec_helper.PARSED_BIOM, angle_offset);

        spec_helper.expect_stringify_equal(actual, expected);
      });

      it("handles a single sample biom file");
      it("hangles a two sample biom file");
      it("can take an angle offset");
    });

    describe("fn.parsed_biom.sample_color_legend", function () {
      it("handles an angle offset");
      it("gives the sample to starting color string", function () {
        var angle_offset = 0;
        // Made with the inspect_file.rb program from helper.BIOM_STR
        var expected     = "name\tappoximate starting color\ns1\t#ed5e93\ns2\t#00a98f\n";
        var actual       = fn.parsed_biom.sample_color_legend(spec_helper.PARSED_BIOM, angle_offset);

        expect(actual).to.equal(expected);
      });

      context("with single sample biom", function () {
        it("gives sample starting color string", function () {
          var angle_offset = 0;
          var parsed_biom  = Papa.parse(spec_helper.SINGLE_SAMPLE_BIOM_STR, spec_helper.PAPA_CONFIG);
          var actual       = fn.parsed_biom.sample_color_legend(parsed_biom, angle_offset);

          expect(spec_helper.SINGLE_SAMPLE_APPROX_START_COLORS).to.equal(actual);
        });
      });
    });

    describe("fn.parsed_biom.sample_color_legend_html", function () {
      it("handles an angle offset");
      it("gives the sample to starting color html output", function () {
        // Made with the inspect_file.rb program from helper.BIOM_STR
        var expected = "<!DOCTYPE html><head><style>table, th, td {border: 1px solid #2d2d2d; border-collapse: collapse} th, td {padding: 5px} th {text-align: left; border-bottom: 4px solid #2d2d2d} .thick-right-border {border-right: 3px solid #2d2d2d}.thick-left-border {border-left: 3px solid #2d2d2d}</style><title>Sample legend</title></head><body><table><tr><th class='thick-right-border'>name</th><th>appoximate starting color</th></tr><tr><td class='thick-right-border'>s1</td><td style='background-color: #ed5e93;'>#ed5e93</td></tr><tr><td class='thick-right-border'>s2</td><td style='background-color: #00a98f;'>#00a98f</td></tr></table></body></html>";

        var angle_offset = 0;

        var actual = fn.parsed_biom.sample_color_legend_html(spec_helper.PARSED_BIOM, angle_offset);

        expect(actual).to.equal(expected);
      });
    });

    describe("fn.parsed_biom.sample_fields", function () {
      it("returns only the sample fields", function () {
        var biom        = "name\ts1\ts2\tiroki_fake_1\tiroki_fake_2\napple\t10\t20\t0\t0\npie\t20\t10\t0\t0";
        var parsed_biom = Papa.parse(biom, spec_helper.PAPA_CONFIG);

        var expected = ["s1", "s2"];
        var actual   = fn.parsed_biom.sample_fields(parsed_biom);

        spec_helper.expect_stringify_equal(actual, expected);
      });
    });
  });
});
*/

describe("fn", function () {
  describe("fn.parsed_biom", function () {
    describe("fn.parsed_biom.parse_biom_file_str", function () {
      it("returns parsed_biom from a biom file string", function () {
        var expected = '{"data":[{"name":"geode","sample_1":5},{"name":"clock","sample_1":1},{"name":"tire","sample_1":2},{"name":"banana","sample_1":9},{"name":"eggplant","sample_1":10}],"errors":[],"meta":{"delimiter":"\\t","linebreak":"\\n","aborted":false,"truncated":false,"cursor":57,"fields":["name","sample_1"]}}';

        var actual = JSON.stringify(fn.parsed_biom.parse_biom_file_str(spec_helper.single_sample.BIOM_STR));

        expect(actual).to.equal(expected);
      });

      it("throws if 'name' is not the first column header", function () {
        var str = "apple\tpie\ngood\t1\n";

        expect(function () {
          fn.parsed_biom.parse_biom_file_str(str);
        }).to.throw();
      });

      it("throws if there are no samples");
      it("handles negative counts");
    });

    describe("fn.parsed_biom.num_samples", function () {
      it("gives the number of samples", function () {
        var expected = spec_helper.test_case.NUM_SAMPLES;
        var actual   = fn.parsed_biom.num_samples(spec_helper.test_case.PARSED_BIOM);

        expect(actual).to.equal(expected);
      });
    });

    describe("fn.parsed_biom.sample_names", function () {
      it("returns the names of the samples", function () {
        var expected = spec_helper.test_case.SAMPLE_NAMES;
        var actual   = fn.parsed_biom.sample_names(spec_helper.test_case.PARSED_BIOM);

        spec_helper.expect_stringify_equal(actual, expected);
      });
    });

    describe("fn.parsed_biom.counts_for_each_leaf", function () {
      context("raw counts", function () {
        it("returns the counts for each leaf", function () {
          var expected = spec_helper.test_case.COUNTS;
          var actual   = fn.parsed_biom.counts_for_each_leaf(spec_helper.test_case.PARSED_BIOM);

          spec_helper.expect_stringify_equal(actual, expected);
        });
      });
    });


    describe("fn.parsed_biom.non_zero_samples_for_each_leaf", function () {
      it("returns non zero samples for each leaf", function () {
        var expected = spec_helper.test_case.NON_ZERO_SAMPLES_FOR_EACH_LEAF;
        var actual   = fn.parsed_biom.non_zero_samples_for_each_leaf(spec_helper.test_case.PARSED_BIOM);

        spec_helper.expect_stringify_equal(actual, expected);
      });
    });

    describe("fn.parsed_biom.abundance_across_samples_for_each_leaf", function () {
      context("keep zero counts", function () {
        it("returns mean abundance across all samples", function () {
          var expected = spec_helper.test_case.ABUNDANCE_ACROSS_ALL_SAMPLES;
          var actual   = fn.parsed_biom.abundance_across_samples_for_each_leaf(spec_helper.test_case.PARSED_BIOM, true);

          spec_helper.expect_stringify_equal(actual, expected);
        });
      });

      context("do not keep zero counts", function () {
        it("returns mean abundance across non zero samples", function () {
          var expected = spec_helper.test_case.ABUNDANCE_ACROSS_NONZERO_SAMPLES;
          var actual   = fn.parsed_biom.abundance_across_samples_for_each_leaf(spec_helper.test_case.PARSED_BIOM, false);

          spec_helper.expect_stringify_equal(actual, expected);
        });
      });
    });

    describe("fn.parsed_biom.evenness_across_samples_for_each_leaf", function () {
      context("keep zero counts", function () {
        it("returns evenness across all samples", function () {
          var expected = spec_helper.test_case.EVENNESS_ACROSS_ALL_SAMPLES;
          var actual   = fn.parsed_biom.evenness_across_samples_for_each_leaf(spec_helper.test_case.COUNTS, true);

          spec_helper.expect_stringify_equal(actual, expected);
        });
      });

      context("do not keep zero counts", function () {
        it("returns evenness across non zero samples", function () {
          var expected = spec_helper.test_case.EVENNESS_ACROSS_NONZERO_SAMPLES;
          var actual   = fn.parsed_biom.evenness_across_samples_for_each_leaf(spec_helper.test_case.COUNTS, false);

          spec_helper.expect_stringify_equal(actual, expected);
        });
      });
    });

    describe("fn.parsed_biom.zero_replacement_val", function () {
      context("with large minimum non-zero count", function () {
        it("it gives the normal global zero replacement val", function () {
          var counts = {
            apple: [0, 1, 2],
            pie: [1, 1, 1]
          };

          var expected = global.ZERO_REPLACEMENT_VAL;

          var actual = fn.parsed_biom.zero_replacement_val(counts);

          expect(actual).to.equal(expected);
        });
      });

      context("with tiny minimum non-zero count", function () {
        it("gives an even smaller val for zero replacement", function () {
          var counts = {
            apple: [0, global.ZERO_REPLACEMENT_VAL / 2, 2],
            pie: [1, 1, 1]
          };

          var expected = global.ZERO_REPLACEMENT_VAL / 4;

          var actual = fn.parsed_biom.zero_replacement_val(counts);

          expect(actual).to.equal(expected);
        });
      });
    });

    describe("fn.parsed_biom.replace_zeros", function () {
      context("with values > global.ZERO_REPLACEMENT_VAL", function () {
        it("returns an array with the zeros replaced", function () {
          var counts   = { apple: [0, 1, 2], pie: [0, 1, 2] };
          var expected = {
            apple: [global.ZERO_REPLACEMENT_VAL, 1, 2],
            pie: [global.ZERO_REPLACEMENT_VAL, 1, 2]
          };
          var actual   = fn.parsed_biom.replace_zeros(counts);

          spec_helper.expect_stringify_equal(actual, expected);
        });
      });

      context("with values <= global.ZERO_REPLACEMENT_VAL", function () {
        it("returns an array with the zeros replaced", function () {
          var tiny_val = global.ZERO_REPLACEMENT_VAL / 2;
          var counts   = { apple: [0, tiny_val, 2], pie: [0, tiny_val, 2] };
          var expected = {
            apple: [tiny_val / 2, tiny_val, 2],
            pie: [tiny_val / 2, tiny_val, 2]
          };
          var actual   = fn.parsed_biom.replace_zeros(counts);

          spec_helper.expect_stringify_equal(actual, expected);
        });
      });
    });


    describe("fn.parsed_biom.points", function () {
      it("gives the points for each leaf for each sample", function () {
        var expected = spec_helper.test_case.POINTS;
        var actual   = fn.parsed_biom.points(spec_helper.test_case.COUNTS, spec_helper.test_case.NUM_SAMPLES);

        spec_helper.expect_stringify_equal(actual, expected);
      });
    });


    describe("fn.parsed_biom.origin_triangles_for_each_leaf", function () {
      it("gives origin triangles for each leaf", function () {
        var expected = spec_helper.test_case.ORIGIN_TRIANGLES;
        var actual   = fn.parsed_biom.origin_triangles_for_each_leaf(spec_helper.test_case.POINTS);

        spec_helper.expect_stringify_equal(actual, expected);
      });
    });

    describe("fn.parsed_biom.centroids_of_origin_triangles", function () {
      it("gives the centroid for each origin triangle", function () {
        var x1 = Math.cos(0);
        var x2 = Math.cos(2 * Math.PI / 3);
        var x3 = Math.cos(4 * Math.PI / 3);

        var y1 = Math.sin(0);
        var y2 = Math.sin(2 * Math.PI / 3);
        var y3 = Math.sin(4 * Math.PI / 3);

        var p1 = fn.pt.new(x1, y1);
        var p2 = fn.pt.new(x2, y2);
        var p3 = fn.pt.new(x3, y3);

        var origin_triangles = [[p1, p2], [p2, p3], [p3, p1]];

        var expected = [
          fn.pt.new((x1 + x2) / 3, (y1 + y2) / 3),
          fn.pt.new((x2 + x3) / 3, (y2 + y3) / 3),
          fn.pt.new((x3 + x1) / 3, (y3 + y1) / 3)
        ];

        var actual = fn.parsed_biom.centroids_of_origin_triangles(origin_triangles);

        spec_helper.expect_stringify_equal(actual, expected);
      });
    });

    describe("fn.parsed_biom.all_centroids", function () {
      it("returns centroids for each triangle for each leaf", function () {
        var expected = spec_helper.test_case.ALL_CENTROIDS;
        var actual   = fn.parsed_biom.all_centroids(spec_helper.test_case.ORIGIN_TRIANGLES);

        spec_helper.expect_stringify_equal(actual, expected);
      });
    });

    describe("fn.parsed_biom.areas_of_origin_triangles", function () {
      it("gives area of each origin triangle", function () {
        var x1 = Math.cos(0);
        var x2 = Math.cos(2 * Math.PI / 3);
        var x3 = Math.cos(4 * Math.PI / 3);

        var y1 = Math.sin(0);
        var y2 = Math.sin(2 * Math.PI / 3);
        var y3 = Math.sin(4 * Math.PI / 3);

        var p1 = fn.pt.new(x1, y1);
        var p2 = fn.pt.new(x2, y2);
        var p3 = fn.pt.new(x3, y3);

        var origin_triangles = [[p1, p2], [p2, p3], [p3, p1]];

        var expected = [
          Math.abs(0.5 * (x1 * y2 - x2 * y1)),
          Math.abs(0.5 * (x2 * y3 - x3 * y2)),
          Math.abs(0.5 * (x3 * y1 - x1 * y3))
        ];

        var actual = fn.parsed_biom.areas_of_origin_triangles(origin_triangles);

        spec_helper.expect_stringify_equal(actual, expected);
      });
    });

    describe("fn.parsed_biom.all_areas", function () {
      it("returns areas for each triangle for each leaf", function () {
        var expected = spec_helper.test_case.ALL_AREAS;
        var actual   = fn.parsed_biom.all_areas(spec_helper.test_case.ORIGIN_TRIANGLES);

        spec_helper.expect_stringify_equal(actual, expected);
      });
    });

    describe("fn.parsed_biom.centriods_of_whole_shape", function () {
      it("gives the centroid for the entire shape for each leaf", function () {
        var all_areas     = spec_helper.test_case.ALL_AREAS;
        var all_centroids = spec_helper.test_case.ALL_CENTROIDS;

        var expected = spec_helper.test_case.CENTROIDS_OF_WHOLE_SHAPE;

        var actual = fn.parsed_biom.centroids_of_whole_shape(all_areas, all_centroids);

        spec_helper.expect_stringify_equal(actual, expected);
      });
    });

    describe("fn.parsed_biom.angles_from_origin_to_centroid", function () {
      it("gives the angle to the centroid", function () {
        var expected = spec_helper.test_case.ANGLES_FROM_ORIGIN_TO_CENTROIDS;
        var actual   = fn.parsed_biom.angles_from_origin_to_centroid(spec_helper.test_case.CENTROIDS_OF_WHOLE_SHAPE);

        fn.obj.each(actual, function (leaf, actual_centroid) {
          var expected_centroid = expected[leaf];

          expect(actual_centroid).to.be.closeTo(expected_centroid, spec_helper.TOLERANCE);
        });
      });
    });

    describe("fn.parsed_biom.approx_starting_colors", function () {
      it("gives the approx starting color for each sample", function () {
        var expected = spec_helper.test_case.APPROX_STARTING_COLORS;
        var actual   = fn.parsed_biom.approx_starting_colors(spec_helper.test_case.SAMPLE_NAMES, spec_helper.test_case.SAMPLE_ANGLES);

        spec_helper.expect_stringify_equal(actual, expected);

      });
    });

    describe("fn.parsed_biom.sample_color_legend_tsv", function () {
      it("returns a sample legend tsv string", function () {
        var expected = spec_helper.test_case.SAMPLE_COLOR_LEGEND_TSV;
        var actual   = fn.parsed_biom.sample_color_legend_tsv(spec_helper.test_case.APPROX_STARTING_COLORS);

        spec_helper.expect_stringify_equal(actual, expected);
      });
    });

    describe("fn.parsed_biom.sample_color_legend_html", function () {
      it("returns a sample legend html string", function () {
        var expected = spec_helper.test_case.SAMPLE_COLOR_LEGEND_HTML;
        var actual   = fn.parsed_biom.sample_color_legend_html(spec_helper.test_case.SAMPLE_COLOR_LEGEND_TSV);

        spec_helper.expect_stringify_equal(actual, expected);
      });
    });

    describe("fn.parsed_biom.leaf_names", function () {
      it("returns names of all leaves in the biom file", function () {
        var expected = spec_helper.test_case.LEAF_NAMES;
        var actual   = fn.parsed_biom.leaf_names(spec_helper.test_case.PARSED_BIOM);

        spec_helper.expect_stringify_equal(actual, expected);
      });
    });

    describe("fn.parsed_biom.angles_from_single_sample_biom", function () {
      it("throws if there is more than one sample angle", function () {
        var leaf_names    = ["apple", "pie"];
        var sample_angles = [0, 180];

        var func = function () {
          fn.parsed_biom.angles_from_single_sample_biom(leaf_names, sample_angles);
        };

        expect(func).to.throw();
      });

      it("returns sample angle for each leaf", function () {
        var leaf_names    = ["apple", "pie"];
        var sample_angles = [0];
        var expected      = { "apple": 0, "pie": 0 };

        var actual = fn.parsed_biom.angles_from_single_sample_biom(leaf_names, sample_angles);

        spec_helper.expect_stringify_equal(actual, expected);
      });
    });

    describe("fn.parsed_biom.angles_from_two_sample_biom", function () {
      it("throws if there are not two sample angles", function () {
        var sample_angles        = [0];
        var counts_for_each_leaf = { apple: [10, 20], pie: [20, 10] };

        var func = function () {
          fn.parsed_biom.angles_from_two_sample_biom(sample_angles, counts_for_each_leaf);
        };

        expect(func).to.throw();
      });

      it("throws if there are not two sample counts", function () {
        var sample_angles        = [0, 180];
        var counts_for_each_leaf = { apple: [10], pie: [20, 10, 30] };

        var func = function () {
          fn.parsed_biom.angles_from_two_sample_biom(sample_angles, counts_for_each_leaf);
        };

        expect(func).to.throw();
      });

      it("gives sample angles for each leaf", function () {
        var sample_angles        = [0, 180];
        var counts_for_each_leaf = {
          "apple": [10, 20],
          "pie": [20, 10],
          "lala": [0, 0]
        };

        var expected = { "apple": 180, "pie": 0, "lala": 0 };

        var actual = fn.parsed_biom.angles_from_two_sample_biom(sample_angles, counts_for_each_leaf);

        spec_helper.expect_stringify_equal(actual, expected);
      });
    });

    describe("fn.parsed_biom.sample_angles", function () {
      it("it gives the samples angles", function () {
        var expected = spec_helper.test_case.SAMPLE_ANGLES;
        var actual   = fn.parsed_biom.sample_angles(spec_helper.test_case.NUM_SAMPLES);

        spec_helper.expect_stringify_equal(actual, expected);
      });

      it("throws if there are zero samples", function () {
        var func = function () {
          fn.parsed_biom.sample_angles(0);
        };

        expect(func).to.throw();
      });

      it("hangles an angle offset", function () {
        var angle_offset = 100;

        var expected = spec_helper.test_case.SAMPLE_ANGLES.map(function (angle) {
          return (angle + angle_offset) % 360;
        });

        var actual = fn.parsed_biom.sample_angles(spec_helper.test_case.NUM_SAMPLES, angle_offset);

        spec_helper.expect_stringify_equal(actual, expected);
      });
    });

    describe("fn.parsed_biom.new", function () {
      var expected = spec_helper.test_case.FULLY_PARSED_BIOM;
      var actual   = fn.parsed_biom.new(spec_helper.test_case.PARAMS_FOR_NEW);

      it("sets abundance_across_samples_for_each_leaf", function () {
        spec_helper.expect_stringify_equal(actual.abundance_across_samples_for_each_leaf, expected.abundance_across_samples_for_each_leaf);
      });

      it("sets all_areas", function () {
        spec_helper.expect_stringify_equal(actual.all_areas, expected.all_areas);
      });

      it("sets all_centroids", function () {
        spec_helper.expect_stringify_equal(actual.all_centroids, expected.all_centroids);
      });

      it("sets angles_from_origin_to_centroid", function () {
        fn.obj.each(actual.angles_from_origin_to_centroid, function (leaf, angle) {
          expect(angle).to.be.closeTo(expected.angles_from_origin_to_centroid[leaf], spec_helper.TOLERANCE);
        });
      });

      it("sets approx_starting_colors", function () {
        spec_helper.expect_stringify_equal(actual.approx_starting_colors, expected.approx_starting_colors);
      });

      it("sets centroids_of_whole_shape", function () {
        spec_helper.expect_stringify_equal(actual.centroids_of_whole_shape, expected.centroids_of_whole_shape);
      });

      // it("sets color_details", function () {
      //   spec_helper.expect_stringify_equal(actual.color_details, expected.color_details);
      // });
      //
      // it("sets color_hex_codes", function () {
      //   spec_helper.expect_stringify_equal(actual.color_hex_codes, expected.color_hex_codes);
      // });

      it("sets counts_for_each_leaf", function () {
        spec_helper.expect_stringify_equal(actual.counts_for_each_leaf, expected.counts_for_each_leaf);
      });

      it("sets evenness_across_samples_for_each_leaf", function () {
        spec_helper.expect_stringify_equal(actual.evenness_across_samples_for_each_leaf, expected.evenness_across_samples_for_each_leaf);
      });

      it("sets leaf_names", function () {
        spec_helper.expect_stringify_equal(actual.leaf_names, expected.leaf_names);
      });

      it("sets non_zero_samples_for_each_leaf", function () {
        spec_helper.expect_stringify_equal(actual.non_zero_samples_for_each_leaf, expected.non_zero_samples_for_each_leaf);
      });

      it("sets num_leaves", function () {
        spec_helper.expect_stringify_equal(actual.num_leaves, expected.num_leaves);
      });

      it("sets num_samples", function () {
        spec_helper.expect_stringify_equal(actual.num_samples, expected.num_samples);
      });

      it("sets origin_triangles_for_each_leaf", function () {
        spec_helper.expect_stringify_equal(actual.origin_triangles_for_each_leaf, expected.origin_triangles_for_each_leaf);
      });

      it("sets params", function () {
        spec_helper.expect_stringify_equal(actual.params, expected.params);
      });

      it("sets parsed_biom", function () {
        spec_helper.expect_stringify_equal(actual.parsed_biom, expected.parsed_biom);
      });

      it("sets points", function () {
        spec_helper.expect_stringify_equal(actual.points, expected.points);
      });

      it("sets sample_angles", function () {
        spec_helper.expect_stringify_equal(actual.sample_angles, expected.sample_angles);
      });

      it("sets sample_color_legend_html", function () {
        spec_helper.expect_stringify_equal(actual.sample_color_legend_html, expected.sample_color_legend_html);
      });

      it("sets sample_color_legend_tsv", function () {
        spec_helper.expect_stringify_equal(actual.sample_color_legend_tsv, expected.sample_color_legend_tsv);
      });

      it("sets sample_names", function () {
        spec_helper.expect_stringify_equal(actual.sample_names, expected.sample_names);
      });

      it("sets zero_replacement_val", function () {
        spec_helper.expect_stringify_equal(actual.zero_replacement_val, expected.zero_replacement_val);
      });
    });
  });
});