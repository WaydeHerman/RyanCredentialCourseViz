var $ = jQuery;

var width = 800,
  height = 650,
  directory = [],
  mode = "",
  audienceData,
  topicData,
  level = 0,
  zoom,
  currentData,
  breadCrumbs,
  yellow = "#F0D143",
  red = "#D72C44",
  green = "#52B8A0",
  blue = "#439ad0";

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const urlType = urlParams.get("a");
const urlCatA = urlParams.get("b");
const urlCatB = urlParams.get("c");
const urlCatC = urlParams.get("d");

$(".start-over-btn").click(function () {
  $(".bitem-1").click();
});

// d3.csv("/wp-content/themes/digital-promise-new/js/micro-credentials/visualization.csv").then(function (data) {
d3.csv("data.csv").then(function (data) {
  breadCrumbs = [];

  console.log("data", data);

  new_data = [];
  data.forEach(function (v) {
    var audiences = v["Audience"].split(",");
    audiences.forEach(function (w) {
      v_copy = JSON.parse(JSON.stringify(v));
      v_copy["Audience_alt"] = w.replace(/"/g, "").trim();
      new_data.push(v_copy);
    });
  });

  data = new_data;
  new_data = [];
  data.forEach(function (v) {
    var topics = v["Topics"].split(",");
    topics.forEach(function (w) {
      v_copy = JSON.parse(JSON.stringify(v));
      v_copy["Topics_alt"] = w.replace(/"/g, "").trim();
      new_data.push(v_copy);
    });
  });

  data = new_data;
  new_data = [];
  data.forEach(function (v) {
    var stackNames = v["Micro-credential Stack Name"].split(",");
    stackNames.forEach(function (w) {
      v_copy = JSON.parse(JSON.stringify(v));
      v_copy["Micro-credential Stack Name_alt"] = w.replace(/"/g, "").trim();
      new_data.push(v_copy);
    });
  });

  data = new_data;
  new_data = [];
  data.forEach(function (v) {
    var educationStandards = v["Education Standard"].split(",");
    educationStandards.forEach(function (w) {
      v_copy = JSON.parse(JSON.stringify(v));
      v_copy["Education Standard_alt"] = w.replace(/"/g, "").trim();
      new_data.push(v_copy);
    });
  });

  data = new_data;
  new_data = [];
  data.forEach(function (v) {
    var typesOfEvidence = v["Types of Evidence"].split(",");
    typesOfEvidence.forEach(function (w) {
      v_copy = JSON.parse(JSON.stringify(v));
      v_copy["Types of Evidence_alt"] = w.replace(/"/g, "").trim();
      new_data.push(v_copy);
    });
  });

  data = new_data;

  audienceData = d3
    .nest()
    .key(function (d) {
      return d["Audience_alt"];
    })
    .sortKeys(d3.ascending)
    .key(function (d) {
      return d["Topics_alt"];
    })
    .entries(data);

  topicData = d3
    .nest()
    .key(function (d) {
      return d["Topics_alt"];
    })
    .sortKeys(d3.ascending)
    .key(function (d) {
      return d["Audience_alt"];
    })
    .entries(data);

  stackNameData = d3
    .nest()
    .key(function (d) {
      return d["Micro-credential Stack Name_alt"].replace(/&comma;/g, ",");
    })
    .sortKeys(d3.ascending)
    .key(function (d) {
      return d["Audience_alt"];
    })
    .key(function (d) {
      return d["Topics_alt"];
    })
    .entries(data);

  educationStandardData = d3
    .nest()
    .key(function (d) {
      return d["Education Standard_alt"];
    })
    .sortKeys(d3.ascending)
    .key(function (d) {
      return d["Audience_alt"];
    })
    .key(function (d) {
      return d["Topics_alt"];
    })
    .entries(data);

  typesOfEvidenceData = d3
    .nest()
    .key(function (d) {
      return d["Types of Evidence_alt"];
    })
    .sortKeys(d3.ascending)
    .key(function (d) {
      return d["Audience_alt"];
    })
    .key(function (d) {
      return d["Topics_alt"];
    })
    .entries(data);

  var audienceList = [];
  audienceData.forEach(function (w) {
    if (w.key !== "") {
      audienceList.push(w.key);
    }
    w.values.forEach(function (v) {
      var tmp_list = [];
      v.values.forEach(function (u, i) {
        if (tmp_list.indexOf(u["Micro-credential Name"]) < 0) {
          tmp_list.push(u["Micro-credential Name"]);
        } else {
          delete v.values[i];
        }
      });
    });
  });

  var topicList = [];
  topicData.forEach(function (w) {
    if (w.key !== "") {
      topicList.push(w.key);
    }
    w.values.forEach(function (v) {
      var tmp_list = [];
      v.values.forEach(function (u, i) {
        if (tmp_list.indexOf(u["Micro-credential Name"]) < 0) {
          tmp_list.push(u["Micro-credential Name"]);
        } else {
          delete v.values[i];
        }
      });
    });
  });

  var stackNameList = [];
  stackNameData.forEach(function (w) {
    if (w.key !== "") {
      stackNameList.push(w.key);
    }
    w.values.forEach(function (v) {
      v.values.forEach(function (u) {
        var tmp_list = [];
        u.values.forEach(function (o, i) {
          if (tmp_list.indexOf(o["Micro-credential Name"]) < 0) {
            tmp_list.push(o["Micro-credential Name"]);
          } else {
            delete u.values[i];
          }
        });
      });
    });
  });

  var educationStandardList = [];
  educationStandardData.forEach(function (w) {
    if (w.key !== "") {
      educationStandardList.push(w.key);
    }
    w.values.forEach(function (v) {
      v.values.forEach(function (u) {
        var tmp_list = [];
        u.values.forEach(function (o, i) {
          if (tmp_list.indexOf(o["Micro-credential Name"]) < 0) {
            tmp_list.push(o["Micro-credential Name"]);
          } else {
            delete u.values[i];
          }
        });
      });
    });
  });

  var typesOfEvidenceList = [];
  typesOfEvidenceData.forEach(function (w) {
    if (w.key !== "") {
      typesOfEvidenceList.push(w.key);
    }
    w.values.forEach(function (v) {
      v.values.forEach(function (u) {
        var tmp_list = [];
        u.values.forEach(function (o, i) {
          if (tmp_list.indexOf(o["Micro-credential Name"]) < 0) {
            tmp_list.push(o["Micro-credential Name"]);
          } else {
            delete u.values[i];
          }
        });
      });
    });
  });

  if (urlType !== null) {
    if (urlType === "Audience") {
      audienceData.forEach(function (v) {
        if (urlCatA === v.key) {
          mode = urlType;
          directory = [];
          directory.push(v.key);
          level += 1;
          items = audienceData
            .map(function (o) {
              return o.key;
            })
            .filter(function (o) {
              return o !== "";
            })
            .sort(d3.ascending);
          breadCrumbs = [
            { name: v.key, type: "Audience", data: v, list: items },
          ];
          if (urlCatB === null) {
            var data_copy = JSON.parse(JSON.stringify(v.values));
            data_copy.push(v);
            updateUrlParams();
            generateGraph(data_copy, v.key);
          } else {
            v.values.forEach(function (u) {
              if (urlCatB === u.key) {
                var data_copy = JSON.parse(JSON.stringify(u.values));
                data_copy.push(u);
                directory.push(u.key);
                level += 1;
                items = v.values
                  .map(function (o) {
                    return o.key;
                  })
                  .filter(function (o) {
                    return o !== "";
                  })
                  .sort(d3.ascending);
                breadCrumbs.push({
                  name: u.key,
                  type: "Topics",
                  data: u,
                  list: items,
                });
                updateUrlParams();
                generateGraph(
                  data_copy.filter(function (d) {
                    return d != null;
                  }),
                  u.key
                );
              }
            });
          }
        }
      });
    }
    if (urlType === "Topics") {
      topicData.forEach(function (v) {
        if (urlCatA === v.key) {
          mode = urlType;
          directory = [];
          directory.push(v.key);
          level += 1;
          items = topicData
            .map(function (o) {
              return o.key;
            })
            .filter(function (o) {
              return o !== "";
            })
            .sort(d3.ascending);
          breadCrumbs = [{ name: v.key, type: "Topics", data: v, list: items }];
          if (urlCatB === null) {
            var data_copy = JSON.parse(JSON.stringify(v.values));
            data_copy.push(v);
            updateUrlParams();
            generateGraph(data_copy, v.key);
          } else {
            v.values.forEach(function (u) {
              if (urlCatB === u.key) {
                var data_copy = JSON.parse(JSON.stringify(u.values));
                data_copy.push(u);
                directory.push(u.key);
                level += 1;
                items = v.values
                  .map(function (o) {
                    return o.key;
                  })
                  .filter(function (o) {
                    return o !== "";
                  })
                  .sort(d3.ascending);
                breadCrumbs.push({
                  name: u.key,
                  type: "Audience",
                  data: u,
                  list: items,
                });
                updateUrlParams();
                generateGraph(
                  data_copy.filter(function (d) {
                    return d != null;
                  }),
                  u.key
                );
              }
            });
          }
        }
      });
    }
    if (urlType === "Stack Name") {
      stackNameData.forEach(function (v) {
        if (urlCatA === v.key) {
          mode = urlType;
          directory = [];
          directory.push(v.key);
          level += 1;
          items = stackNameData
            .map(function (o) {
              return o.key;
            })
            .filter(function (o) {
              return o !== "";
            })
            .sort(d3.ascending);
          breadCrumbs = [
            { name: v.key, type: "Stack Name", data: v, list: items },
          ];
          if (urlCatB === null) {
            var data_copy = JSON.parse(JSON.stringify(v.values));
            data_copy.push(v);
            updateUrlParams();
            generateGraph(data_copy, v.key);
          } else {
            v.values.forEach(function (u) {
              if (urlCatB === u.key) {
                directory.push(u.key);
                level += 1;
                items = v.values
                  .map(function (o) {
                    return o.key;
                  })
                  .filter(function (o) {
                    return o !== "";
                  })
                  .sort(d3.ascending);
                breadCrumbs.push({
                  name: u.key,
                  type: "Audience",
                  data: u,
                  list: items,
                });
                if (urlCatC === null) {
                  var data_copy = JSON.parse(JSON.stringify(u.values));
                  data_copy.push(u);
                  updateUrlParams();
                  generateGraph(
                    data_copy.filter(function (d) {
                      return d != null;
                    }),
                    u.key
                  );
                } else {
                  u.values.forEach(function (w) {
                    if (urlCatC === w.key) {
                      var data_copy = JSON.parse(JSON.stringify(w.values));
                      data_copy.push(w);
                      directory.push(w.key);
                      level += 1;
                      items = u.values
                        .map(function (o) {
                          return o.key;
                        })
                        .filter(function (o) {
                          return o !== "";
                        })
                        .sort(d3.ascending);
                      breadCrumbs.push({
                        name: w.key,
                        type: "Topics",
                        data: w,
                        list: items,
                      });
                      updateUrlParams();
                      generateGraph(
                        data_copy.filter(function (d) {
                          return d != null;
                        }),
                        w.key
                      );
                    }
                  });
                }
              }
            });
          }
        }
      });
    }
    if (urlType === "Education Standard") {
      educationStandardData.forEach(function (v) {
        if (urlCatA === v.key) {
          mode = urlType;
          directory = [];
          directory.push(v.key);
          level += 1;
          items = educationStandardData
            .map(function (o) {
              return o.key;
            })
            .filter(function (o) {
              return o !== "";
            })
            .sort(d3.ascending);
          breadCrumbs = [
            { name: v.key, type: "Education Standard", data: v, list: items },
          ];
          if (urlCatB === null) {
            var data_copy = JSON.parse(JSON.stringify(v.values));
            data_copy.push(v);
            updateUrlParams();
            generateGraph(data_copy, v.key);
          } else {
            v.values.forEach(function (u) {
              if (urlCatB === u.key) {
                directory.push(u.key);
                level += 1;
                items = v.values
                  .map(function (o) {
                    return o.key;
                  })
                  .filter(function (o) {
                    return o !== "";
                  })
                  .sort(d3.ascending);
                breadCrumbs.push({
                  name: u.key,
                  type: "Audience",
                  data: u,
                  list: items,
                });
                if (urlCatC === null) {
                  var data_copy = JSON.parse(JSON.stringify(u.values));
                  data_copy.push(u);
                  updateUrlParams();
                  generateGraph(
                    data_copy.filter(function (d) {
                      return d != null;
                    }),
                    u.key
                  );
                } else {
                  u.values.forEach(function (w) {
                    if (urlCatC === w.key) {
                      var data_copy = JSON.parse(JSON.stringify(w.values));
                      data_copy.push(w);
                      directory.push(w.key);
                      level += 1;
                      items = u.values
                        .map(function (o) {
                          return o.key;
                        })
                        .filter(function (o) {
                          return o !== "";
                        })
                        .sort(d3.ascending);
                      breadCrumbs.push({
                        name: w.key,
                        type: "Topics",
                        data: w,
                        list: items,
                      });
                      updateUrlParams();
                      generateGraph(
                        data_copy.filter(function (d) {
                          return d != null;
                        }),
                        w.key
                      );
                    }
                  });
                }
              }
            });
          }
        }
      });
    }
    if (urlType === "Types of Evidence") {
      typesOfEvidenceData.forEach(function (v) {
        if (urlCatA === v.key) {
          mode = urlType;
          directory = [];
          directory.push(v.key);
          level += 1;
          items = typesOfEvidenceData
            .map(function (o) {
              return o.key;
            })
            .filter(function (o) {
              return o !== "";
            })
            .sort(d3.ascending);
          breadCrumbs = [
            { name: v.key, type: "Types of Evidence", data: v, list: items },
          ];
          if (urlCatB === null) {
            var data_copy = JSON.parse(JSON.stringify(v.values));
            data_copy.push(v);
            updateUrlParams();
            generateGraph(data_copy, v.key);
          } else {
            v.values.forEach(function (u) {
              if (urlCatB === u.key) {
                directory.push(u.key);
                level += 1;
                items = v.values
                  .map(function (o) {
                    return o.key;
                  })
                  .filter(function (o) {
                    return o !== "";
                  })
                  .sort(d3.ascending);
                breadCrumbs.push({
                  name: u.key,
                  type: "Audience",
                  data: u,
                  list: items,
                });
                if (urlCatC === null) {
                  var data_copy = JSON.parse(JSON.stringify(u.values));
                  data_copy.push(u);
                  updateUrlParams();
                  generateGraph(
                    data_copy.filter(function (d) {
                      return d != null;
                    }),
                    u.key
                  );
                } else {
                  u.values.forEach(function (w) {
                    if (urlCatC === w.key) {
                      var data_copy = JSON.parse(JSON.stringify(w.values));
                      data_copy.push(w);
                      directory.push(w.key);
                      level += 1;
                      items = u.values
                        .map(function (o) {
                          return o.key;
                        })
                        .filter(function (o) {
                          return o !== "";
                        })
                        .sort(d3.ascending);
                      breadCrumbs.push({
                        name: w.key,
                        type: "Topics",
                        data: w,
                        list: items,
                      });
                      updateUrlParams();
                      generateGraph(
                        data_copy.filter(function (d) {
                          return d != null;
                        }),
                        w.key
                      );
                    }
                  });
                }
              }
            });
          }
        }
      });
    }
  } else {
    d3.select(".start-screen").style("display", "block");
  }

  audienceList.unshift("Select Audience");
  d3.select("#audience-selector")
    .selectAll("option")
    .data(audienceList)
    .enter()
    .append("option")
    .html(function (d, index) {
      if (index == 0) {
        return "<option value=''>" + d + "</option>";
      } else {
        return "<option value='" + d + "'>" + d + "</option>";
      }
    });

  d3.select("#audience-selector").on("change", function () {
    d = this.value;
    if (d == "") return;
    audienceData.forEach(function (v) {
      if (v.key === d) {
        mode = "Audience";
        var data_copy = JSON.parse(JSON.stringify(v.values));
        data_copy.push(v);
        directory = [];
        directory.push(v.key);
        level += 1;
        items = audienceData
          .map(function (o) {
            return o.key;
          })
          .filter(function (o) {
            return o !== "";
          })
          .sort(d3.ascending);
        breadCrumbs = [{ name: v.key, type: "Audience", data: v, list: items }];
        updateUrlParams();
        generateGraph(data_copy, v.key);
      }
    });
  });

  topicList.unshift("Select Topic");
  d3.select("#topic-selector")
    .selectAll("option")
    .data(topicList)
    .enter()
    .append("option")
    .html(function (d, index) {
      if (index == 0) {
        return "<option value=''>" + d + "</option>";
      } else {
        return "<option value='" + d + "'>" + d + "</option>";
      }
    });

  d3.select("#topic-selector").on("change", function () {
    d = this.value;
    if (d == "") return;
    topicData.forEach(function (v) {
      if (v.key === d) {
        mode = "Topics";
        var data_copy = JSON.parse(JSON.stringify(v.values));
        data_copy.push(v);
        directory = [];
        directory.push(v.key);
        level += 1;
        items = topicData
          .map(function (o) {
            return o.key;
          })
          .filter(function (o) {
            return o !== "";
          })
          .sort(d3.ascending);
        breadCrumbs = [{ name: v.key, type: "Topics", data: v, list: items }];
        updateUrlParams();
        generateGraph(data_copy, v.key);
      }
    });
  });

  stackNameList.unshift("Select Stack Name");
  d3.select("#stack-name-selector")
    .selectAll("option")
    .data(stackNameList)
    .enter()
    .append("option")
    .html(function (d, index) {
      if (index == 0) {
        return "<option value=''>" + d + "</option>";
      } else {
        return "<option value='" + d + "'>" + d + "</option>";
      }
    });

  d3.select("#stack-name-selector").on("change", function () {
    d = this.value;
    if (d == "") return;
    stackNameData.forEach(function (v) {
      if (v.key === d) {
        console.log("here");
        mode = "Stack Name";
        var data_copy = JSON.parse(JSON.stringify(v.values));
        data_copy.push(v);
        directory = [];
        directory.push(v.key);
        level += 1;
        items = stackNameData
          .map(function (o) {
            return o.key;
          })
          .filter(function (o) {
            return o !== "";
          })
          .sort(d3.ascending);
        breadCrumbs = [
          { name: v.key, type: "Stack Name", data: v, list: items },
        ];
        updateUrlParams();
        generateGraph(data_copy, v.key);
      }
    });
  });

  educationStandardList.unshift("Select Education Standard");
  d3.select("#education-standard-selector")
    .selectAll("option")
    .data(educationStandardList)
    .enter()
    .append("option")
    .html(function (d, index) {
      if (index == 0) {
        return "<option value=''>" + d + "</option>";
      } else {
        return "<option value='" + d + "'>" + d + "</option>";
      }
    });

  d3.select("#education-standard-selector").on("change", function () {
    d = this.value;
    if (d == "") return;
    educationStandardData.forEach(function (v) {
      if (v.key === d) {
        mode = "Education Standard";
        var data_copy = JSON.parse(JSON.stringify(v.values));
        data_copy.push(v);
        directory = [];
        directory.push(v.key);
        level += 1;
        items = educationStandardData
          .map(function (o) {
            return o.key;
          })
          .filter(function (o) {
            return o !== "";
          })
          .sort(d3.ascending);
        breadCrumbs = [
          { name: v.key, type: "Education Standard", data: v, list: items },
        ];
        updateUrlParams();
        generateGraph(data_copy, v.key);
      }
    });
  });

  typesOfEvidenceList.unshift("Select Types of Evidence");
  d3.select("#type-evidence-selector")
    .selectAll("option")
    .data(typesOfEvidenceList)
    .enter()
    .append("option")
    .html(function (d, index) {
      if (index == 0) {
        return "<option value=''>" + d + "</option>";
      } else {
        return "<option value='" + d + "'>" + d + "</option>";
      }
    });

  d3.select("#type-evidence-selector").on("change", function () {
    d = this.value;
    if (d == "") return;
    typesOfEvidenceData.forEach(function (v) {
      if (v.key === d) {
        mode = "Types of Evidence";
        var data_copy = JSON.parse(JSON.stringify(v.values));
        data_copy.push(v);
        directory = [];
        directory.push(v.key);
        level += 1;
        items = typesOfEvidenceData
          .map(function (o) {
            return o.key;
          })
          .filter(function (o) {
            return o !== "";
          })
          .sort(d3.ascending);
        breadCrumbs = [
          { name: v.key, type: "Types of Evidence", data: v, list: items },
        ];
        updateUrlParams();
        generateGraph(data_copy, v.key);
      }
    });
  });
});

d3.select(".tooltip-close-btn").on("click", function () {
  d3.select(".tooltip").style("display", "none");
});

d3.select(".copy-url-btn").on("click", function () {
  var queryStringCurrent = window.location;
  copyToClipboard(queryStringCurrent);
  $(".copied-message").fadeIn();
  setTimeout(function () {
    $(".copied-message").fadeOut();
  }, 3500);
});

function setZoom(bmargin) {
  /* Function to zoom out to see entire graph.
          Used when graph is initialized and when zoom is reset.
          */

  zoomState = 0; // Set zoom state to 0 to enable mouseover and mouseout functions
  // determine Min/Max of x, y node values:
  var maxX = d3.max(nodes, function (d) {
    return d.x;
  });

  var maxY = d3.max(nodes, function (d) {
    return d.y;
  });

  var minX = d3.min(nodes, function (d) {
    return d.x;
  });

  var minY = d3.min(nodes, function (d) {
    return d.y;
  });

  // determine the translation and zoom based on the min/max x and y values:
  var vx = 0;
  var vy = 0;
  var bx = minX;
  var by = minY;
  var bw = Math.abs(minX - maxX);
  var bh = Math.abs(minY - maxY);
  var kX = width / (bw + bmargin);
  var kY = height / (bh + bmargin);
  k = d3.max([kX, kY]);
  tx = -bx * k + vx + width / 2 - (bw * k) / 2;
  ty = -by * k + vy + height / 2 - (bh * k) / 2;

  var transform = d3.zoomIdentity.translate(tx, ty).scale(k);

  // Apply the zoom and trigger a zoom event:
  d3.select("#svg").call(zoom.transform, transform);

  zoom.scaleExtent([k, 10]).extent([
    [minX, minY],
    [maxX, maxY],
  ]);

  // applying the zoom transformation to the container.

  svg.attr("transform", "translate(" + tx + ", " + ty + ") scale(" + k + ")");
}

const urlParamKeys = ["&b=", "&c=", "&d="];

function updateUrlParams() {
  if (breadCrumbs.length >= 1) {
    var urlParams = "?";
    urlParams += "a=" + breadCrumbs[0].type;
    breadCrumbs.forEach(function (v, i) {
      urlParams += urlParamKeys[i] + v.name.replace(/&/g, "%26");
    });
    window.history.replaceState(null, null, urlParams);
  } else {
    window.history.replaceState(null, null, "?");
  }
}

function copyToClipboard(text) {
  var dummy = document.createElement("textarea");
  // to avoid breaking orgain page when copying more words
  // cant copy when adding below this code
  // dummy.style.display = 'none'
  document.body.appendChild(dummy);
  //Be careful if you use texarea. setAttribute('value', value), which works with "input" does not work with "textarea". – Eduard
  dummy.value = text;
  dummy.select();
  document.execCommand("copy");
  document.body.removeChild(dummy);
}

function generateGraph(data, root_key) {
  d3.select(".tooltip").style("display", "none");
  d3.select(".start-screen").style("display", "none");
  d3.select("#viz").selectAll("*").remove();
  d3.select("#viz").style("display", "block");

  data = data.filter(function (d) {
    return d.key != "";
  });

  currentData = data;

  updateBreadcrumbs();

  relationships = [];
  listOfRelationships = [];
  if (
    data.length > 2 &&
    ((mode !== "Topics" && mode !== "Audience" && breadCrumbs.length < 3) ||
      ((mode === "Topics" || mode === "Audience") && breadCrumbs.length < 2))
  ) {
    data.forEach(function (v, i) {
      if (v.key !== root_key) {
        v.values.forEach(function (w) {
          if (w !== null) {
            data.forEach(function (u, j) {
              if (u.key !== v.key && i > j) {
                u.values.forEach(function (o) {
                  if (o !== null) {
                    if (
                      (mode !== "Topics" &&
                        mode !== "Audience" &&
                        breadCrumbs.length === 2) ||
                      ((mode === "Topics" || mode === "Audience") &&
                        breadCrumbs.length === 1)
                    ) {
                      if (o["MC ID #"] === w["MC ID #"]) {
                        var ref = "" + v.key + u.key;
                        if (listOfRelationships.indexOf(ref) < 0) {
                          listOfRelationships.push(ref);
                          relationships.push({
                            source: v,
                            target: u,
                            id: relationships.length,
                            ref: ref,
                            value: 1,
                          });
                        } else {
                          relationships.forEach(function (k) {
                            if (k.ref === ref) {
                              k.value += 1;
                            }
                          });
                        }
                      }
                    } else {
                      if (o.key === w.key) {
                        var ref = "" + v.key + u.key;
                        if (listOfRelationships.indexOf(ref) < 0) {
                          listOfRelationships.push(ref);
                          relationships.push({
                            source: v,
                            target: u,
                            id: relationships.length,
                            ref: ref,
                            value: 1,
                          });
                        } else {
                          relationships.forEach(function (k) {
                            if (k.ref === ref) {
                              k.value += 1;
                            }
                          });
                        }
                      }
                    }
                  }
                });
              }
            });
          }
        });
      }
    });
  } else {
    data.forEach(function (v, i) {
      data.forEach(function (w, j) {
        if (i > j) {
          relationships.push({
            source: v,
            target: w,
            id: relationships.length,
            ref: "",
            value: 1,
          });
        }
      });
    });
  }

  if (relationships.length > 1) {
    relationships = getTopXpercent(relationships, "value", 0.05);
  }

  /* data.forEach(function(v) {
    relationships.push({
      source: data[data.length - 1],
      target: v,
      id: "",
      ref: "root",
      value: 0
    });
  }); */

  var root_init = d3
    .stratify()
    .id(function (d) {
      return d.key;
    })
    .parentId(function (d) {
      if (d.key != root_key) {
        return root_key;
      } else {
        return "";
      }
    })(data);

  var root = d3.hierarchy(root_init);

  var transform = d3.zoomIdentity;
  let node, link;

  zoom = d3.zoom().scaleExtent([1, 10]).on("zoom", zoomed);

  function responsivefy(svg) {
    // get container + svg aspect ratio
    var container = d3.select(svg.node().parentNode),
      width = parseInt(svg.style("width")),
      height = parseInt(svg.style("height")),
      aspect = width / height;

    // add viewBox and preserveAspectRatio properties,
    // and call resize so that svg resizes on inital page load
    svg
      .attr("viewBox", "0 0 " + width + " " + height)
      .attr("perserveAspectRatio", "xMinYMid")
      .call(resize);

    // to register multiple listeners for same event type,
    // you need to add namespace, i.e., 'click.foo'
    // necessary if you call invoke this function for multiple svgs
    // api docs: https://github.com/mbostock/d3/wiki/Selections#on
    d3.select(window).on("resize." + container.attr("id"), resize);

    // get width of container and resize svg to fit it
    function resize() {
      targetWidth = parseInt(container.style("width"));
      svg.attr("width", targetWidth);
      svg.attr("height", Math.round(targetWidth / aspect));
    }
  }

  svg = d3
    .select("#viz")
    .append("svg")
    .attr("id", "svg")
    .attr("width", width)
    .attr("height", height)
    .call(responsivefy)
    .call(zoom)
    .append("g")
    .attr("transform", "translate(0,0)")
    .attr("class", "main-group");

  var rect = svg
    .append("rect")
    .attr("width", width)
    .attr("height", height)
    .style("fill", "none")
    .style("pointer-events", "all");

  simulation = d3
    .forceSimulation()
    .force("collision", d3.forceCollide(50))
    .force(
      "link",
      d3.forceLink().id(function (d) {
        return d.data.id;
      })
    )
    .force("charge", d3.forceManyBody())
    .force("center", d3.forceCenter(width / 2, height / 2))
    .on("tick", ticked);

  //simulation.iterations(100);

  d3.select(".bitem-0").on("click", function () {
    level = 0;
    breadCrumbs = [];
    mode = "";
    directory = [];

    updateBreadcrumbs();
    updateUrlParams();
    d3.select(".start-screen").style("display", "block");
    d3.select(".tooltip").style("display", "none");
    d3.select("#viz").selectAll("*").remove();
    d3.select("#viz").style("display", "none");
  });

  d3.select(".fa-home")
    .style("cursor", "pointer")
    .on("click", function () {
      level = 0;
      breadCrumbs = [];
      mode = "";
      directory = [];

      updateBreadcrumbs();
      updateUrlParams();
      d3.select(".start-screen").style("display", "block");
      d3.select(".tooltip").style("display", "none");
      d3.select("#viz").selectAll("*").remove();
      d3.select("#viz").style("display", "none");
    });

  d3.select(".bitem-1").on("click", function () {
    level = 0;
    breadCrumbs = [];
    mode = "";
    directory = [];

    updateBreadcrumbs();
    updateUrlParams();
    d3.select(".start-screen").style("display", "block");
    d3.select(".tooltip").style("display", "none");
    d3.select("#viz").selectAll("*").remove();
    d3.select("#viz").style("display", "none");
  });

  d3.select(".bitem-2").on("click", function () {
    level = 1;
    breadCrumbs = breadCrumbs.slice(0, 1);
    directory = directory.slice(0, 1);
    if (mode === "Audience") {
      audienceData.forEach(function (v) {
        if (v.key === breadCrumbs[0].name) {
          var data_copy = JSON.parse(JSON.stringify(v.values));
          data_copy.push(v);
          updateUrlParams();
          generateGraph(data_copy, v.key);
        }
      });
    }
    if (mode === "Topics") {
      topicData.forEach(function (v) {
        if (v.key === breadCrumbs[0].name) {
          var data_copy = JSON.parse(JSON.stringify(v.values));
          data_copy.push(v);
          updateUrlParams();
          generateGraph(data_copy, v.key);
        }
      });
    }
    if (mode === "Stack Name") {
      stackNameData.forEach(function (v) {
        if (v.key === breadCrumbs[0].name) {
          var data_copy = JSON.parse(JSON.stringify(v.values));
          data_copy.push(v);
          updateUrlParams();
          generateGraph(data_copy, v.key);
        }
      });
    }
    if (mode === "Education Standard") {
      educationStandardData.forEach(function (v) {
        if (v.key === breadCrumbs[0].name) {
          var data_copy = JSON.parse(JSON.stringify(v.values));
          data_copy.push(v);
          updateUrlParams();
          generateGraph(data_copy, v.key);
        }
      });
    }
    if (mode === "Types of Evidence") {
      typesOfEvidenceData.forEach(function (v) {
        if (v.key === breadCrumbs[0].name) {
          var data_copy = JSON.parse(JSON.stringify(v.values));
          data_copy.push(v);
          updateUrlParams();
          generateGraph(data_copy, v.key);
        }
      });
    }
  });

  d3.select(".bitem-3").on("click", function () {
    level = 2;
    breadCrumbs = breadCrumbs.slice(0, 2);
    directory = directory.slice(0, 2);
    if (mode === "Audience") {
      //
    }
    if (mode === "Topics") {
      //
    }
    if (mode === "Stack Name") {
      stackNameData.forEach(function (v) {
        if (v.key === breadCrumbs[0].name) {
          v.values.forEach(function (u) {
            if (u.key === breadCrumbs[1].name) {
              var data_copy = JSON.parse(JSON.stringify(u.values));
              data_copy.push(u);
              updateUrlParams();
              generateGraph(data_copy, u.key);
            }
          });
        }
      });
    }
    if (mode === "Education Standard") {
      educationStandardData.forEach(function (v) {
        if (v.key === breadCrumbs[0].name) {
          v.values.forEach(function (u) {
            if (u.key === breadCrumbs[1].name) {
              var data_copy = JSON.parse(JSON.stringify(u.values));
              data_copy.push(u);
              updateUrlParams();
              generateGraph(data_copy, u.key);
            }
          });
        }
      });
    }
    if (mode === "Types of Evidence") {
      typesOfEvidenceData.forEach(function (v) {
        if (v.key === breadCrumbs[0].name) {
          v.values.forEach(function (u) {
            if (u.key === breadCrumbs[1].name) {
              var data_copy = JSON.parse(JSON.stringify(u.values));
              data_copy.push(u);
              updateUrlParams();
              generateGraph(data_copy, u.key);
            }
          });
        }
      });
    }
  });

  function update() {
    nodes = flatten(root);

    links = relationships;

    nodes.forEach(function (v) {
      if (v.parent === null) {
        rootNode = v;
      }
    });

    relationships.forEach(function (v) {
      nodes.forEach(function (w) {
        if (w.data.id === v.source.key) {
          v.source = w;
        }
        if (w.data.id === v.target.key) {
          v.target = w;
        }
      });
    });

    rootLink = svg.selectAll(".root-link").data(nodes);

    rootLink.exit().remove();

    link = svg.selectAll(".link").data(links, function (d) {
      return d.target.id;
    });

    link.exit().remove();

    const rootLinkEnter = rootLink
      .enter()
      .append("line")
      .attr("class", "root-link")
      .style("stroke", function (d) {
        if (d.value > 0) {
          return "white";
        } else {
          return "#000";
        }
      })
      .style("opacity", function (d) {
        return 0.2;
      })
      .style("stroke-width", function (d) {
        if (d.value > 0) {
          return d.value / 2;
        } else {
          return 1;
        }
      });

    rootLink = rootLinkEnter.merge(rootLink);

    const linkEnter = link
      .enter()
      .append("line")
      .attr("class", "link")
      .style("stroke", function (d) {
        if (d.value > 0) {
          return "#000";
        } else {
          return "#000";
        }
      })
      .style("opacity", function (d) {
        return 0.2;
      })
      .style("stroke-width", function (d) {
        if (d.value > 0) {
          if (d.value / 2 > 8) {
            return 8;
          } else {
            return d.value / 2;
          }
        } else {
          return 2;
        }
      });

    link = linkEnter.merge(link);

    node = svg.selectAll(".node").data(nodes, function (d) {
      return d.id;
    });

    node.exit().remove();

    const nodeEnter = node
      .enter()
      .append("g")
      .attr("class", "node")
      .style("fill", function (d) {
        if (d.data.id === root_key) {
          if (mode === "Topics" || mode === "Audience") {
            if (breadCrumbs.length == 1) {
              return red;
            } else {
              if (breadCrumbs.length == 2) {
                return yellow;
              }
            }
          } else {
            if (breadCrumbs.length == 1) {
              return red;
            } else {
              if (breadCrumbs.length == 2) {
                return yellow;
              } else {
                return green;
              }
            }
          }
        } else {
          if (mode === "Topics" || mode === "Audience") {
            if (breadCrumbs.length == 1) {
              return yellow;
            } else {
              if (breadCrumbs.length == 2) {
                return blue;
              }
            }
          } else {
            if (breadCrumbs.length == 1) {
              return yellow;
            } else {
              if (breadCrumbs.length == 2) {
                return green;
              } else {
                return blue;
              }
            }
          }
        }
      })
      .on("mouseover", function (d) {
        //
      })
      .on("click", function (d) {
        if (d.data.id !== root_key) {
          if (
            breadCrumbs.length === 2 &&
            (mode === "Topics" || mode === "Audience")
          ) {
            showTooltip(d.data.data);
          }
          if (
            breadCrumbs.length === 3 &&
            (mode === "Stack Name" ||
              mode === "Education Standard" ||
              mode === "Types of Evidence")
          ) {
            showTooltip(d.data.data);
          }
        }
        if (d.data.parent !== null) {
          if (mode === "Audience") {
            if (breadCrumbs.length < 2) {
              directory.push(d.data.id);
              audienceData.forEach(function (v) {
                if (v.key === breadCrumbs[0].name) {
                  v.values.forEach(function (w) {
                    if (w) {
                      if (w.key === d.data.id) {
                        var data_copy = JSON.parse(JSON.stringify(w.values));
                        data_copy.push(w);
                        level += 1;
                        items = v.values
                          .map(function (o) {
                            return o.key;
                          })
                          .filter(function (o) {
                            return o !== "";
                          })
                          .sort(d3.ascending);
                        breadCrumbs.push({
                          name: w.key,
                          type: "Topics",
                          data: w,
                          list: items,
                        });
                        updateUrlParams();
                        generateGraph(
                          data_copy.filter(function (d) {
                            return d != null;
                          }),
                          w.key
                        );
                      }
                    }
                  });
                }
              });
            }
          }
          if (mode === "Topics") {
            if (breadCrumbs.length < 2) {
              directory.push(d.data.id);
              topicData.forEach(function (v) {
                if (v.key === breadCrumbs[0].name) {
                  v.values.forEach(function (w) {
                    if (w) {
                      if (w.key === d.data.id) {
                        var data_copy = JSON.parse(JSON.stringify(w.values));
                        data_copy.push(w);
                        level += 1;
                        items = v.values
                          .map(function (o) {
                            return o.key;
                          })
                          .filter(function (o) {
                            return o !== "";
                          })
                          .sort(d3.ascending);
                        breadCrumbs.push({
                          name: w.key,
                          type: "Audience",
                          data: w,
                          list: items,
                        });
                        updateUrlParams();
                        generateGraph(
                          data_copy.filter(function (d) {
                            return d != null;
                          }),
                          w.key
                        );
                      }
                    }
                  });
                }
              });
            }
          }
          if (mode === "Stack Name") {
            if (breadCrumbs.length < 3) {
              directory.push(d.data.id);
              stackNameData.forEach(function (v) {
                if (v.key === breadCrumbs[0].name && v.key === root_key) {
                  v.values.forEach(function (w) {
                    if (w) {
                      if (w.key === d.data.id) {
                        var data_copy = JSON.parse(JSON.stringify(w.values));
                        data_copy.push(w);
                        level += 1;
                        items = v.values
                          .map(function (o) {
                            return o.key;
                          })
                          .filter(function (o) {
                            return o !== "";
                          })
                          .sort(d3.ascending);
                        breadCrumbs.push({
                          name: w.key,
                          type: "Audience",
                          data: w,
                          list: items,
                        });
                        updateUrlParams();
                        generateGraph(
                          data_copy.filter(function (d) {
                            return d != null;
                          }),
                          w.key
                        );
                      }
                    }
                  });
                }
                if (v.key === breadCrumbs[0].name) {
                  v.values.forEach(function (w) {
                    if (w.key === breadCrumbs[1].name && w.key === root_key) {
                      w.values.forEach(function (u) {
                        if (u.key === d.data.id) {
                          var data_copy = JSON.parse(JSON.stringify(u.values));
                          data_copy.push(u);
                          level += 1;
                          items = w.values
                            .map(function (o) {
                              return o.key;
                            })
                            .filter(function (o) {
                              return o !== "";
                            })
                            .sort(d3.ascending);
                          breadCrumbs.push({
                            name: u.key,
                            type: "Topics",
                            data: u,
                            list: items,
                          });
                          updateUrlParams();
                          generateGraph(
                            data_copy.filter(function (d) {
                              return d != null;
                            }),
                            u.key
                          );
                        }
                      });
                    }
                  });
                }
              });
            }
          }
          if (mode === "Education Standard") {
            if (breadCrumbs.length < 3) {
              directory.push(d.data.id);
              educationStandardData.forEach(function (v) {
                if (v.key === breadCrumbs[0].name && v.key === root_key) {
                  v.values.forEach(function (w) {
                    if (w) {
                      if (w.key === d.data.id) {
                        var data_copy = JSON.parse(JSON.stringify(w.values));
                        data_copy.push(w);
                        level += 1;
                        items = v.values
                          .map(function (o) {
                            return o.key;
                          })
                          .filter(function (o) {
                            return o !== "";
                          })
                          .sort(d3.ascending);
                        breadCrumbs.push({
                          name: w.key,
                          type: "Audience",
                          data: w,
                          list: items,
                        });
                        updateUrlParams();
                        generateGraph(
                          data_copy.filter(function (d) {
                            return d != null;
                          }),
                          w.key
                        );
                      }
                    }
                  });
                }
                if (v.key === breadCrumbs[0].name) {
                  v.values.forEach(function (w) {
                    if (w.key === breadCrumbs[1].name && w.key === root_key) {
                      w.values.forEach(function (u) {
                        if (u.key === d.data.id) {
                          var data_copy = JSON.parse(JSON.stringify(u.values));
                          data_copy.push(u);
                          level += 1;
                          items = w.values
                            .map(function (o) {
                              return o.key;
                            })
                            .filter(function (o) {
                              return o !== "";
                            })
                            .sort(d3.ascending);
                          breadCrumbs.push({
                            name: u.key,
                            type: "Topics",
                            data: u,
                            list: items,
                          });
                          updateUrlParams();
                          generateGraph(
                            data_copy.filter(function (d) {
                              return d != null;
                            }),
                            u.key
                          );
                        }
                      });
                    }
                  });
                }
              });
            }
          }
          if (mode === "Types of Evidence") {
            if (breadCrumbs.length < 3) {
              directory.push(d.data.id);
              typesOfEvidenceData.forEach(function (v) {
                if (v.key === breadCrumbs[0].name && v.key === root_key) {
                  v.values.forEach(function (w) {
                    if (w) {
                      if (w.key === d.data.id) {
                        var data_copy = JSON.parse(JSON.stringify(w.values));
                        data_copy.push(w);
                        level += 1;
                        items = v.values
                          .map(function (o) {
                            return o.key;
                          })
                          .filter(function (o) {
                            return o !== "";
                          })
                          .sort(d3.ascending);
                        breadCrumbs.push({
                          name: w.key,
                          type: "Audience",
                          data: w,
                          list: items,
                        });
                        updateUrlParams();
                        generateGraph(
                          data_copy.filter(function (d) {
                            return d != null;
                          }),
                          w.key
                        );
                      }
                    }
                  });
                }
                if (v.key === breadCrumbs[0].name) {
                  v.values.forEach(function (w) {
                    if (w.key === breadCrumbs[1].name && w.key === root_key) {
                      w.values.forEach(function (u) {
                        if (u.key === d.data.id) {
                          var data_copy = JSON.parse(JSON.stringify(u.values));
                          data_copy.push(u);
                          level += 1;
                          items = w.values
                            .map(function (o) {
                              return o.key;
                            })
                            .filter(function (o) {
                              return o !== "";
                            })
                            .sort(d3.ascending);
                          breadCrumbs.push({
                            name: u.key,
                            type: "Topics",
                            data: u,
                            list: items,
                          });
                          updateUrlParams();
                          generateGraph(
                            data_copy.filter(function (d) {
                              return d != null;
                            }),
                            u.key
                          );
                        }
                      });
                    }
                  });
                }
              });
            }
          }
        }
      });
    /*.call(
        d3
          .drag()
          .on("start", dragstarted)
          .on("drag", dragged)
          .on("end", dragended)
      ); */
    //.on("mouseover", nodeMouseOver);

    nodeLabels = node
      .enter()
      .append("text")
      .attr("class", function (d) {
        if (d.data.id === root_key) {
          return "node-label-key";
        } else {
          return "node-label";
        }
      })
      .text(function (d) {
        if (d.data.id) {
          var text = d.data.id;
        }
        if (d.data.data["Micro-credential Name"]) {
          var text = d.data.data["Micro-credential Name"];
        }

        a = text.substr(0, 30).lastIndexOf(" ");
        y = text.substr(a + 1);
        b = text.substr(0, a);
        c = y.substr(0, 30).lastIndexOf(" ");
        z = y.substr(c + 1);
        y_alt = y.substr(0, c);

        if (text.length <= 30) {
          return text;
        } else {
          if (y.length <= 30) {
            return y;
          } else {
            return z;
          }
        }
      });

    nodeLabels0 = node
      .enter()
      .append("text")
      .attr("class", function (d) {
        if (d.data.id === root_key) {
          return "node-label-key";
        } else {
          return "node-label";
        }
      })
      .text(function (d) {
        if (d.data.id) {
          var text = d.data.id;
        }
        if (d.data.data["Micro-credential Name"]) {
          var text = d.data.data["Micro-credential Name"];
        }

        a = text.substr(0, 30).lastIndexOf(" ");
        y = text.substr(a + 1);
        b = text.substr(0, a);
        c = y.substr(0, 30).lastIndexOf(" ");
        z = y.substr(c + 1);
        y_alt = y.substr(0, c);

        if (text.length <= 30) {
          return "";
        } else {
          if (y.length <= 30) {
            return b;
          } else {
            return y_alt;
          }
        }
      });

    nodeLabels1 = node
      .enter()
      .append("text")
      .attr("class", function (d) {
        if (d.data.id === root_key) {
          return "node-label-key";
        } else {
          return "node-label";
        }
      })
      .text(function (d) {
        if (d.data.id) {
          var text = d.data.id;
        }
        if (d.data.data["Micro-credential Name"]) {
          var text = d.data.data["Micro-credential Name"];
        }

        a = text.substr(0, 30).lastIndexOf(" ");
        y = text.substr(a + 1);
        b = text.substr(0, a);
        c = y.substr(0, 30).lastIndexOf(" ");
        z = y.substr(c + 1);
        y_alt = y.substr(0, c);

        if (text.length <= 30) {
          return "";
        } else {
          if (y.length <= 30) {
            return "";
          } else {
            return b;
          }
        }
      });

    nodeEnter.append("circle").attr("r", function (d) {
      if (d.data.id === root_key) {
        return 14;
      } else {
        return 10;
      }
    });

    // distance based on number of nodes?
    distanceScale = d3.scaleSqrt().domain([0, 80]).range([200, 60]);

    node = nodeEnter.merge(node);
    simulation.nodes(nodes);
    simulation.force(
      "link",
      d3
        .forceLink()
        .id(function (d) {
          return d.data.id;
        })
        .distance(function (d) {
          return distanceScale(nodes.length);
        })
    );
    simulation.force("link").links(links);
    if (data.length < 10) {
      setZoom(600);
    } else {
      setZoom(300);
      //simulation.force("x", d3.forceX().strength(0.01));
    }
    simulation.alphaDecay(0.2);
    // setTimeout(function() {
    //   simulation.stop();
    // }, 2500);
  }

  function ticked() {
    link
      .attr("x1", function (d) {
        return d.source.x;
      })
      .attr("y1", function (d) {
        return d.source.y;
      })
      .attr("x2", function (d) {
        return d.target.x;
      })
      .attr("y2", function (d) {
        return d.target.y;
      });

    rootLink
      .attr("x1", function (d) {
        return d.x;
      })
      .attr("y1", function (d) {
        return d.y;
      })
      .attr("x2", function (d) {
        return rootNode.x;
      })
      .attr("y2", function (d) {
        return rootNode.y;
      });

    node
      .attr("transform", function (d) {
        return `translate(${d.x}, ${d.y})`;
      })
      .on("mouseover", function (d) {
        if (
          d.data.id !== root_key &&
          (((mode === "Topics" || mode === "Audience") &&
            breadCrumbs.length !== 2) ||
            (mode !== "Topics" &&
              mode !== "Audience" &&
              breadCrumbs.length !== 3))
        ) {
          toShow = [];
          link.style("opacity", function (v) {
            var show = false;
            if (d.data.id === v.source.data.id) {
              toShow.push(v.target.data.id);
              show = true;
            }
            if (d.data.id === v.target.data.id) {
              toShow.push(v.source.data.id);
              show = true;
            }
            if (show === true) {
              return 0.2;
            } else {
              return 0.1;
            }
          });
          toShow.push(root_key);
          toShow.push(d.data.id);
          rootLink.style("opacity", function (v) {
            if (v.data.id === d.data.id) {
              return 0.2;
            } else {
              return 0.1;
            }
          });
          node.attr("opacity", function (v) {
            if (toShow.indexOf(v.data.id) >= 0) {
              return 1;
            } else {
              return 0.3;
            }
          });
          nodeLabels1.attr("opacity", function (v) {
            if (d.data.id === v.data.id) {
              d3.select(this).moveToFront();
            }
            if (toShow.indexOf(v.data.id) >= 0) {
              return 1;
            } else {
              return 0.3;
            }
          });
          nodeLabels0.attr("opacity", function (v) {
            if (d.data.id === v.data.id) {
              d3.select(this).moveToFront();
            }
            if (toShow.indexOf(v.data.id) >= 0) {
              return 1;
            } else {
              return 0.3;
            }
          });
          nodeLabels.attr("opacity", function (v) {
            if (d.data.id === v.data.id) {
              d3.select(this).moveToFront();
            }
            if (toShow.indexOf(v.data.id) >= 0) {
              return 1;
            } else {
              return 0.3;
            }
          });
        } else {
          node.attr("opacity", function (v) {
            if (
              d.data.data["Micro-credential Name"] ===
                v.data.data["Micro-credential Name"] ||
              (d.data.key && d.data.key === v.data.key)
            ) {
              d3.select(this).moveToFront();
              return 1;
            } else {
              return 0.3;
            }
          });
          nodeLabels1.attr("opacity", function (v) {
            if (
              d.data.data["Micro-credential Name"] ===
                v.data.data["Micro-credential Name"] ||
              (d.data.key && d.data.key === v.data.key)
            ) {
              d3.select(this).moveToFront();
              return 1;
            } else {
              return 0.3;
            }
          });
          nodeLabels0.attr("opacity", function (v) {
            if (
              d.data.data["Micro-credential Name"] ===
                v.data.data["Micro-credential Name"] ||
              (d.data.key && d.data.key === v.data.key)
            ) {
              d3.select(this).moveToFront();
              return 1;
            } else {
              return 0.3;
            }
          });
          nodeLabels.attr("opacity", function (v) {
            if (
              d.data.data["Micro-credential Name"] ===
                v.data.data["Micro-credential Name"] ||
              (d.data.key && d.data.key === v.data.key)
            ) {
              d3.select(this).moveToFront();
              return 1;
            } else {
              return 0.3;
            }
          });
        }
      })
      .on("mouseout", function () {
        node.attr("opacity", 1);
        nodeLabels0.attr("opacity", 1);
        nodeLabels1.attr("opacity", 1);
        nodeLabels.attr("opacity", 1);
        rootLink.style("opacity", 0.2);
        link.style("opacity", 0.2);
      });

    nodeLabels1
      .attr("x", function (d) {
        return d.x;
      })
      .attr("y", function (d) {
        return d.y - 50;
      });

    nodeLabels0
      .attr("x", function (d) {
        return d.x;
      })
      .attr("y", function (d) {
        return d.y - 35;
      });

    nodeLabels
      .attr("x", function (d) {
        return d.x;
      })
      .attr("y", function (d) {
        return d.y - 20;
      });
    if (data.length < 10) {
      setZoom(600);
    } else {
      setZoom(300);
    }
  }

  function showTooltip(d) {
    d3.select(".tooltip").style("display", "block");
    d3.select(".tooltip-name")
      .text(d["Micro-credential Name"])
      .on("click", function () {
        window.open(d["Direct Link to MC on the platform"], "_blank");
      });
    d3.select(".visit-btn").on("click", function () {
      window.open(d["Direct Link to MC on the platform"], "_blank");
    });
    if (d["Badge Image Link (Badgr)"]) {
      //const badgeUrlRegex = /\((.*?)\)/;
      //imgURL = badgeUrlRegex.exec(d["Badge Image"])[1];
      imgURL = d["Badge Image Link (Badgr)"];
      d3.select(".tooltip-badge-img").attr("src", imgURL);
    }

    var audiences = d["Audience"].split(",");
    var educationStandards = d["Education Standard"].split(",");
    var topics = d["Topics"].split(",");
    var stackName = d["Micro-credential Stack Name"];
    var typesOfEvidence = d["Types of Evidence"].split(",");

    var audienceHTML = "<span>Audience: </span>";
    var educationStandardsHTML = "<span>Education Standards: </span>";
    var topicsHTML = "<span>Topics: </span>";
    var typesOfEvidenceHTML = "<span>Types of Evidence: </span>";
    var stackNameHTML =
      "<span>Topics: </span><span class='tooltip-link stack-name-link-0'>" +
      stackName +
      "</span>";
    audiences.forEach(function (v, i) {
      if (i > 0) {
        audienceHTML +=
          "<span class='tooltip-link audience-link-" + i + "'>" + v + "</span>";
      } else {
        audienceHTML +=
          "<span class='tooltip-link audience-link-" + i + "'>" + v + "</span>";
      }
    });

    educationStandards.forEach(function (v, i) {
      if (i > 0) {
        educationStandardsHTML +=
          "<span class='tooltip-link education-standards-link-" +
          i +
          "'>" +
          v +
          "</span>";
      } else {
        educationStandardsHTML +=
          "<span class='tooltip-link education-standards-link-" +
          i +
          "'>" +
          v +
          "</span>";
      }
    });

    typesOfEvidence.forEach(function (v, i) {
      if (i > 0) {
        typesOfEvidenceHTML +=
          "<span class='tooltip-link types-of-evidence-link-" +
          i +
          "'>" +
          v +
          "</span>";
      } else {
        typesOfEvidenceHTML +=
          "<span class='tooltip-link types-of-evidence-link-" +
          i +
          "'>" +
          v +
          "</span>";
      }
    });
    topics.forEach(function (v, i) {
      if (i > 0) {
        topicsHTML +=
          "<span class='tooltip-link topics-link-" + i + "'>" + v + "</span>";
      } else {
        topicsHTML +=
          "<span class='tooltip-link topics-link-" + i + "'>" + v + "</span>";
      }
    });

    d3.select(".tooltip-issuing-organization").html(
      "Issuing Organization: " + d["Issuing Organization"]
    );
    d3.select(".tooltip-topic").html(topicsHTML);
    d3.select(".tooltip-audience").html(audienceHTML);
    d3.select(".tooltip-education-standard").html(educationStandardsHTML);
    d3.select(".tooltip-stack-name").html(stackNameHTML);
    d3.select(".tooltip-type-of-evidence").html(typesOfEvidenceHTML);
    d3.select(".tooltip-description").text(
      d["Competency Statement (Description)"]
    );
    audiences.forEach(function (v, i) {
      d3.select(".audience-link-" + i).on("click", function () {
        audienceData.forEach(function (w) {
          if (w.key === v) {
            mode = "Audience";
            var data_copy = JSON.parse(JSON.stringify(w.values));
            data_copy.push(w);
            directory = [];
            directory.push(w.key);
            level = 1;
            items = audienceData
              .map(function (o) {
                return o.key;
              })
              .filter(function (o) {
                return o !== "";
              })
              .sort(d3.ascending);
            breadCrumbs = [
              { name: w.key, type: "Audience", data: w, list: items },
            ];
            updateUrlParams();
            generateGraph(data_copy, w.key);
          }
        });
      });
    });
    educationStandards.forEach(function (v, i) {
      d3.select(".education-standards-link-" + i).on("click", function () {
        educationStandardData.forEach(function (w) {
          if (w.key === v) {
            mode = "Education Standard";
            var data_copy = JSON.parse(JSON.stringify(w.values));
            data_copy.push(w);
            directory = [];
            directory.push(w.key);
            level = 1;
            items = educationStandardData
              .map(function (o) {
                return o.key;
              })
              .filter(function (o) {
                return o !== "";
              })
              .sort(d3.ascending);
            breadCrumbs = [
              { name: w.key, type: "Education Standard", data: w, list: items },
            ];
            updateUrlParams();
            generateGraph(data_copy, w.key);
          }
        });
      });
    });
    typesOfEvidence.forEach(function (v, i) {
      d3.select(".types-of-evidence-link-" + i).on("click", function () {
        typesOfEvidenceData.forEach(function (w) {
          if (w.key === v) {
            mode = "Types of Evidence";
            var data_copy = JSON.parse(JSON.stringify(w.values));
            data_copy.push(w);
            directory = [];
            directory.push(w.key);
            level = 1;
            items = typesOfEvidenceData
              .map(function (o) {
                return o.key;
              })
              .filter(function (o) {
                return o !== "";
              })
              .sort(d3.ascending);
            breadCrumbs = [
              { name: w.key, type: "Types of Evidence", data: w, list: items },
            ];
            updateUrlParams();
            generateGraph(data_copy, w.key);
          }
        });
      });
    });
    topics.forEach(function (v, i) {
      d3.select(".topics-link-" + i).on("click", function () {
        topicData.forEach(function (w) {
          if (w.key === v) {
            mode = "Topics";
            var data_copy = JSON.parse(JSON.stringify(w.values));
            data_copy.push(w);
            directory = [];
            directory.push(w.key);
            level = 1;
            items = topicData
              .map(function (o) {
                return o.key;
              })
              .filter(function (o) {
                return o !== "";
              })
              .sort(d3.ascending);
            breadCrumbs = [
              { name: w.key, type: "Topics", data: w, list: items },
            ];
            updateUrlParams();
            generateGraph(data_copy, w.key);
          }
        });
      });
    });
    d3.select(".stack-name-link-0").on("click", function () {
      stackNameData.forEach(function (w) {
        if (w.key === v) {
          mode = "Stack Name";
          var data_copy = JSON.parse(JSON.stringify(w.values));
          data_copy.push(w);
          directory = [];
          directory.push(w.key);
          level = 1;
          items = stackNameData
            .map(function (o) {
              return o.key;
            })
            .filter(function (o) {
              return o !== "";
            })
            .sort(d3.ascending);
          breadCrumbs = [
            {
              name: w.key,
              type: "Micro-credential Stack Name",
              data: w,
              list: items,
            },
          ];
          updateUrlParams();
          generateGraph(data_copy, w.key);
        }
      });
    });
  }

  function updateBreadcrumbs() {
    d3.select("#bitem-selector-1").html("");
    d3.select("#bitem-selector-2").html("");
    d3.select("#bitem-selector-3").html("");
    d3.select("#bitem-selector-4").html("");
    if (level === 0) {
      d3.select(".breadcrumbs-container").style("display", "none");
      $("#audience-selector")[0].selectedIndex = 0;
      $("#topic-selector")[0].selectedIndex = 0;
      $("#stack-name-selector")[0].selectedIndex = 0;
      $("#education-standard-selector")[0].selectedIndex = 0;
      $("#type-evidence-selector")[0].selectedIndex = 0;
      // $("#topic-selector").val("");
      // $("#stack-name-selector").val("");
      // $("#education-standard-selector").val("");
    } else {
      d3.select(".breadcrumbs-container").style("display", "block");
      if (mode === "Topics" || mode === "Audience") {
        d3.select(".bitem-3").style("display", "none");
        d3.select("#bitem-selector-3").style("display", "none");
        d3.select(".bitem-icon-3").style("display", "none");
        d3.select(".bbox-3").style("display", "none");
      } else {
        d3.select(".bitem-3").style("display", "inline-block");
        d3.select(".bitem-icon-3").style("display", "inline-block");
        d3.select(".bbox-3").style("display", "");
        d3.select("#bitem-selector-3").style("display", "inline-block");
      }
      if (level === 1) {
        var currentList = currentData
          .map(function (w) {
            return w.key;
          })
          .filter(function (o) {
            return o !== root_key;
          })
          .sort(d3.ascending);

        if (mode === "Audience") {
          var bitem1 = "<span>Audience: </span>";
          d3.select("#bitem-selector-1")
            .selectAll("option")
            .data(breadCrumbs[0].list)
            .enter()
            .append("option")
            .html(function (d) {
              return "<option value='" + d + "'>" + d + "</option>";
            });

          $("#bitem-selector-1").val(breadCrumbs[0].name);

          d3.select("#bitem-selector-1").on("change", function () {
            d = this.value;
            if (d == "") return;
            audienceData.forEach(function (v) {
              if (v.key === d) {
                var data_copy = JSON.parse(JSON.stringify(v.values));
                data_copy.push(v);
                directory = [];
                directory.push(v.key);
                level = 1;
                items = audienceData
                  .map(function (o) {
                    return o.key;
                  })
                  .filter(function (o) {
                    return o !== "";
                  })
                  .sort(d3.ascending);
                breadCrumbs = [
                  { name: v.key, type: "Audience", data: v, list: items },
                ];

                generateGraph(data_copy, v.key);
                updateUrlParams();
              }
            });
          });
          var bitem2 = "<span class='select'>Select Topic</span>";
          d3.select("#bitem-selector-2")
            .selectAll("option")
            .data(currentList)
            .enter()
            .append("option")
            .html(function (d) {
              return "<option value='" + d + "'>" + d + "</option>";
            });
          $("#bitem-selector-2").val("");

          d3.select("#bitem-selector-2").on("change", function () {
            d = this.value;
            if (d == "") return;
            audienceData.forEach(function (v) {
              if (v.key === breadCrumbs[0].name) {
                directory = [];
                directory.push(v.key);
                level = 1;
                items = audienceData
                  .map(function (o) {
                    return o.key;
                  })
                  .filter(function (o) {
                    return o !== "";
                  })
                  .sort(d3.ascending);

                breadCrumbs = [
                  { name: v.key, type: "Audience", data: v, list: items },
                ];
                v.values.forEach(function (w) {
                  if (w.key === d) {
                    var data_copy = JSON.parse(JSON.stringify(w.values));
                    data_copy.push(w);
                    level += 1;
                    items = v.values
                      .map(function (o) {
                        return o.key;
                      })
                      .filter(function (o) {
                        return o !== "";
                      })
                      .sort(d3.ascending);
                    breadCrumbs.push({
                      name: w.key,
                      type: "Topics",
                      data: w,
                      list: items,
                    });

                    generateGraph(
                      data_copy.filter(function (d) {
                        return d != null;
                      }),
                      w.key
                    );
                    updateUrlParams();
                    updateBreadcrumbs();
                  }
                });
              }
            });
          });

          var bitem4 = "<span class='select'>Select Micro-credential</span>";
          d3.select("#bitem-selector-4").style("display", "none");
        }
        if (mode === "Stack Name") {
          var bitem1 = "<span>Stack Name: </span>";
          d3.select("#bitem-selector-1")
            .selectAll("option")
            .data(breadCrumbs[0].list)
            .enter()
            .append("option")
            .html(function (d) {
              return "<option value='" + d + "'>" + d + "</option>";
            });

          $("#bitem-selector-1").val(breadCrumbs[0].name);
          d3.select("#bitem-selector-1").on("change", function () {
            d = this.value;
            if (d == "") return;
            stackNameData.forEach(function (v) {
              if (v.key === d) {
                var data_copy = JSON.parse(JSON.stringify(v.values));
                data_copy.push(v);
                directory = [];
                directory.push(v.key);
                level = 1;
                items = stackNameData
                  .map(function (o) {
                    return o.key;
                  })
                  .filter(function (o) {
                    return o !== "";
                  })
                  .sort(d3.ascending);
                breadCrumbs = [
                  { name: v.key, type: "Stack Name", data: v, list: items },
                ];
                updateUrlParams();
                generateGraph(data_copy, v.key);
              }
            });
          });

          var bitem2 = "<span class='select'>Select Audience</span>";
          d3.select("#bitem-selector-2")
            .selectAll("option")
            .data(currentList)
            .enter()
            .append("option")
            .html(function (d) {
              return "<option value='" + d + "'>" + d + "</option>";
            });
          $("#bitem-selector-2").val("");

          d3.select("#bitem-selector-2").on("change", function () {
            d = this.value;
            if (d == "") return;
            stackNameData.forEach(function (v) {
              if (v.key === breadCrumbs[0].name) {
                directory = [];
                directory.push(v.key);
                level = 1;
                items = stackNameData
                  .map(function (o) {
                    return o.key;
                  })
                  .filter(function (o) {
                    return o !== "";
                  })
                  .sort(d3.ascending);
                breadCrumbs = [
                  { name: v.key, type: "Stack Name", data: v, list: items },
                ];
                v.values.forEach(function (w) {
                  if (w.key === d) {
                    var data_copy = JSON.parse(JSON.stringify(w.values));
                    data_copy.push(w);
                    level += 1;
                    items = v.values
                      .map(function (o) {
                        return o.key;
                      })
                      .filter(function (o) {
                        return o !== "";
                      })
                      .sort(d3.ascending);
                    breadCrumbs.push({
                      name: w.key,
                      type: "Audience",
                      data: w,
                      list: items,
                    });

                    generateGraph(
                      data_copy.filter(function (d) {
                        return d != null;
                      }),
                      w.key
                    );
                    updateUrlParams();
                  }
                });
              }
            });
          });

          var bitem3 = "<span class='select'>Select Topic</span>";
          var bitem4 = "<span class='select'>Select Micro-credential</span>";
          d3.select("#bitem-selector-3").style("display", "none");
          d3.select("#bitem-selector-4").style("display", "none");
        }
        if (mode === "Types of Evidence") {
          var bitem1 = "<span>Types of Evidence: </span>";
          d3.select("#bitem-selector-1")
            .selectAll("option")
            .data(breadCrumbs[0].list)
            .enter()
            .append("option")
            .html(function (d) {
              return "<option value='" + d + "'>" + d + "</option>";
            });
          $("#bitem-selector-1").val(breadCrumbs[0].name);

          d3.select("#bitem-selector-1").on("change", function () {
            d = this.value;
            if (d == "") return;
            typesOfEvidenceData.forEach(function (v) {
              if (v.key === d) {
                var data_copy = JSON.parse(JSON.stringify(v.values));
                data_copy.push(v);
                directory = [];
                directory.push(v.key);
                level = 1;
                items = typesOfEvidenceData
                  .map(function (o) {
                    return o.key;
                  })
                  .filter(function (o) {
                    return o !== "";
                  })
                  .sort(d3.ascending);
                breadCrumbs = [
                  {
                    name: v.key,
                    type: "Types of Evidence",
                    data: v,
                    list: items,
                  },
                ];

                generateGraph(data_copy, v.key);
                updateUrlParams();
              }
            });
          });
          var bitem2 = "<span class='select'>Select Audience</span>";
          d3.select("#bitem-selector-2")
            .selectAll("option")
            .data(currentList)
            .enter()
            .append("option")
            .html(function (d) {
              return "<option value='" + d + "'>" + d + "</option>";
            });
          $("#bitem-selector-2").val("");

          d3.select("#bitem-selector-2").on("change", function () {
            d = this.value;
            if (d == "") return;
            typesOfEvidenceData.forEach(function (v) {
              if (v.key === breadCrumbs[0].name) {
                directory = [];
                directory.push(v.key);
                level = 1;
                items = typesOfEvidenceData
                  .map(function (o) {
                    return o.key;
                  })
                  .filter(function (o) {
                    return o !== "";
                  })
                  .sort(d3.ascending);
                breadCrumbs = [
                  {
                    name: v.key,
                    type: "Types of Evidence",
                    data: v,
                    list: items,
                  },
                ];
                v.values.forEach(function (w) {
                  if (w.key === d) {
                    var data_copy = JSON.parse(JSON.stringify(w.values));
                    data_copy.push(w);
                    level += 1;
                    items = v.values
                      .map(function (o) {
                        return o.key;
                      })
                      .filter(function (o) {
                        return o !== "";
                      });
                    breadCrumbs.push({
                      name: w.key,
                      type: "Audience",
                      data: w,
                      list: items,
                    });
                    updateUrlParams();
                    generateGraph(
                      data_copy.filter(function (d) {
                        return d != null;
                      }),
                      w.key
                    );
                  }
                });
              }
            });
          });
          var bitem3 = "<span class='select'>Select Topic</span>";
          var bitem4 = "<span class='select'>Select Micro-credential</span>";
          d3.select("#bitem-selector-3").style("display", "none");
          d3.select("#bitem-selector-4").style("display", "none");
        }
        if (mode === "Education Standard") {
          var bitem1 = "<span>Education Standard: </span>";
          d3.select("#bitem-selector-1")
            .selectAll("option")
            .data(breadCrumbs[0].list)
            .enter()
            .append("option")
            .html(function (d) {
              return "<option value='" + d + "'>" + d + "</option>";
            });
          $("#bitem-selector-1").val(breadCrumbs[0].name);

          d3.select("#bitem-selector-1").on("change", function () {
            d = this.value;
            if (d == "") return;
            educationStandardData.forEach(function (v) {
              if (v.key === d) {
                var data_copy = JSON.parse(JSON.stringify(v.values));
                data_copy.push(v);
                directory = [];
                directory.push(v.key);
                level = 1;
                items = educationStandardData
                  .map(function (o) {
                    return o.key;
                  })
                  .filter(function (o) {
                    return o !== "";
                  })
                  .sort(d3.ascending);
                breadCrumbs = [
                  {
                    name: v.key,
                    type: "Education Standard",
                    data: v,
                    list: items,
                  },
                ];

                generateGraph(data_copy, v.key);
                updateUrlParams();
              }
            });
          });
          var bitem2 = "<span class='select'>Select Audience</span>";
          d3.select("#bitem-selector-2")
            .selectAll("option")
            .data(currentList)
            .enter()
            .append("option")
            .html(function (d) {
              return "<option value='" + d + "'>" + d + "</option>";
            });
          $("#bitem-selector-2").val("");

          d3.select("#bitem-selector-2").on("change", function () {
            d = this.value;
            if (d == "") return;
            educationStandardData.forEach(function (v) {
              if (v.key === breadCrumbs[0].name) {
                directory = [];
                directory.push(v.key);
                level = 1;
                items = educationStandardData
                  .map(function (o) {
                    return o.key;
                  })
                  .filter(function (o) {
                    return o !== "";
                  })
                  .sort(d3.ascending);
                breadCrumbs = [
                  {
                    name: v.key,
                    type: "Education Standard",
                    data: v,
                    list: items,
                  },
                ];
                v.values.forEach(function (w) {
                  if (w.key === d) {
                    var data_copy = JSON.parse(JSON.stringify(w.values));
                    data_copy.push(w);
                    level += 1;
                    items = v.values
                      .map(function (o) {
                        return o.key;
                      })
                      .filter(function (o) {
                        return o !== "";
                      });
                    breadCrumbs.push({
                      name: w.key,
                      type: "Audience",
                      data: w,
                      list: items,
                    });
                    updateUrlParams();
                    generateGraph(
                      data_copy.filter(function (d) {
                        return d != null;
                      }),
                      w.key
                    );
                  }
                });
              }
            });
          });
          var bitem3 = "<span class='select'>Select Topic</span>";
          var bitem4 = "<span class='select'>Select Micro-credential</span>";
          d3.select("#bitem-selector-3").style("display", "none");
          d3.select("#bitem-selector-4").style("display", "none");
        }

        if (mode === "Topics") {
          var bitem1 = "<span>Topic: </span>";
          d3.select("#bitem-selector-1")
            .selectAll("option")
            .data(breadCrumbs[0].list)
            .enter()
            .append("option")
            .html(function (d) {
              return "<option value='" + d + "'>" + d + "</option>";
            });
          $("#bitem-selector-1").val(breadCrumbs[0].name);

          d3.select("#bitem-selector-1").on("change", function () {
            d = this.value;
            if (d == "") return;
            topicData.forEach(function (v) {
              if (v.key === d) {
                var data_copy = JSON.parse(JSON.stringify(v.values));
                data_copy.push(v);
                directory = [];
                directory.push(v.key);
                level = 1;
                items = topicData
                  .map(function (o) {
                    return o.key;
                  })
                  .filter(function (o) {
                    return o !== "";
                  })
                  .sort(d3.ascending);
                breadCrumbs = [
                  { name: v.key, type: "Topics", data: v, list: items },
                ];
                updateUrlParams();
                generateGraph(data_copy, v.key);
              }
            });
          });
          var bitem2 = "<span class='select'>Select Audience</span>";
          d3.select("#bitem-selector-2")
            .selectAll("option")
            .data(currentList)
            .enter()
            .append("option")
            .html(function (d) {
              return "<option value='" + d + "'>" + d + "</option>";
            });
          $("#bitem-selector-2").val("");

          d3.select("#bitem-selector-2").on("change", function () {
            d = this.value;
            if (d == "") return;
            topicData.forEach(function (v) {
              if (v.key === breadCrumbs[0].name) {
                directory = [];
                directory.push(v.key);
                level = 1;
                items = topicData
                  .map(function (o) {
                    return o.key;
                  })
                  .filter(function (o) {
                    return o !== "";
                  })
                  .sort(d3.ascending);
                breadCrumbs = [
                  { name: v.key, type: "Topics", data: v, list: items },
                ];
                v.values.forEach(function (w) {
                  if (w.key === d) {
                    var data_copy = JSON.parse(JSON.stringify(w.values));
                    data_copy.push(w);
                    level += 1;
                    items = v.values
                      .map(function (o) {
                        return o.key;
                      })
                      .filter(function (o) {
                        return o !== "";
                      })
                      .sort(d3.ascending);
                    breadCrumbs.push({
                      name: w.key,
                      type: "Audience",
                      data: w,
                      list: items,
                    });
                    updateUrlParams();
                    generateGraph(
                      data_copy.filter(function (d) {
                        return d != null;
                      }),
                      w.key
                    );
                  }
                });
              }
            });
          });
          var bitem4 = "<span class='select'>Select Micro-credential</span>";
          d3.select("#bitem-selector-4").style("display", "none");
        }
        d3.select(".bitem-1").attr("class", "bitem bitem-1").html(bitem1);
        d3.select(".bitem-2")
          .attr("class", "bitem bitem-2 bitem-active")
          .html(bitem2);
        d3.select(".bitem-3")
          .attr("class", "bitem bitem-3 bitem-inactive")
          .html(bitem3);
        d3.select(".bitem-4").attr("class", "bitem bitem-4 bitem-inactive");
        d3.select(".bbox-3").attr("class", "bbox bbox-3 bbox-inactive");
        d3.select(".bbox-4").attr("class", "bbox bbox-4 bbox-inactive");
      }
      if (level === 2) {
        d3.select(".bitem-3").attr("class", "bitem bitem-3 bitem-active");
        d3.select(".bitem-4").attr("class", "bitem bitem-4 bitem-inactive");
        d3.select(".bbox-4").attr("class", "bbox bbox-4 bbox-inactive");
        if (mode === "Audience") {
          var currentList = currentData
            .map(function (w) {
              return w["Micro-credential Name"];
            })
            .filter(function (o) {
              return o != null;
            })
            .sort(d3.ascending);

          var bitem1 = "<span>Audience: </span>";
          d3.select("#bitem-selector-1")
            .selectAll("option")
            .data(breadCrumbs[0].list)
            .enter()
            .append("option")
            .html(function (d) {
              return "<option value='" + d + "'>" + d + "</option>";
            });
          $("#bitem-selector-1").val(breadCrumbs[0].name);

          d3.select("#bitem-selector-1").on("change", function () {
            d = this.value;
            if (d == "") return;
            audienceData.forEach(function (v) {
              if (v.key === d) {
                var data_copy = JSON.parse(JSON.stringify(v.values));
                data_copy.push(v);
                directory = [];
                directory.push(v.key);
                level = 1;
                items = audienceData
                  .map(function (o) {
                    return o.key;
                  })
                  .filter(function (o) {
                    return o !== "";
                  })
                  .sort(d3.ascending);
                breadCrumbs = [
                  { name: v.key, type: "Audience", data: v, list: items },
                ];
                generateGraph(data_copy, v.key);
                updateUrlParams();
              }
            });
          });
          var bitem2 = "<span>Topic: </span>";
          d3.select("#bitem-selector-2")
            .selectAll("option")
            .data(breadCrumbs[1].list)
            .enter()
            .append("option")
            .html(function (d) {
              return "<option value='" + d + "'>" + d + "</option>";
            });
          $("#bitem-selector-2").val(breadCrumbs[1].name);

          d3.select("#bitem-selector-2").on("change", function () {
            d = this.value;
            if (d == "") return;
            audienceData.forEach(function (v) {
              if (v.key === breadCrumbs[0].name) {
                directory = [];
                directory.push(v.key);
                level = 1;
                items = audienceData
                  .map(function (o) {
                    return o.key;
                  })
                  .filter(function (o) {
                    return o !== "";
                  })
                  .sort(d3.ascending);
                breadCrumbs = [
                  { name: v.key, type: "Audience", data: v, list: items },
                ];
                v.values.forEach(function (w) {
                  if (w.key === d) {
                    var data_copy = JSON.parse(JSON.stringify(w.values));
                    data_copy.push(w);
                    level += 1;
                    items = v.values
                      .map(function (o) {
                        return o.key;
                      })
                      .filter(function (o) {
                        return o !== "";
                      })
                      .sort(d3.ascending);
                    breadCrumbs.push({
                      name: w.key,
                      type: "Topics",
                      data: w,
                      list: items,
                    });

                    generateGraph(
                      data_copy.filter(function (d) {
                        return d != null;
                      }),
                      w.key
                    );
                  }
                });
              }
            });
          });

          var bitem4 = "<span class='select'>Select Micro-credential</span>";
          d3.select("#bitem-selector-4")
            .selectAll("option")
            .data(currentList)
            .enter()
            .append("option")
            .html(function (d) {
              return "<option value='" + d + "'>" + d + "</option>";
            });
          $("#bitem-selector-4").val("");
          d3.select("#bitem-selector-4").on("change", function () {
            d = this.value;
            if (d == "") return;
            audienceData.forEach(function (v) {
              if (v.key === breadCrumbs[0].name) {
                v.values.forEach(function (w) {
                  if (w.key === breadCrumbs[1].name) {
                    w.values.forEach(function (u) {
                      if (u["Micro-credential Name"] === d) {
                        showTooltip(u);
                      }
                    });
                  }
                });
              }
            });
          });
          d3.select(".bitem-4").attr("class", "bitem bitem-4").html(bitem4);
          d3.select(".bbox-4").attr("class", "bbox bbox-4");
          d3.select("#bitem-selector-4").style("display", "");
        }
        if (mode === "Topics") {
          var currentList = currentData
            .map(function (w) {
              return w["Micro-credential Name"];
            })
            .filter(function (o) {
              return o != null;
            })
            .sort(d3.ascending);

          var bitem1 = "<span>Topic: </span>";
          d3.select("#bitem-selector-1")
            .selectAll("option")
            .data(breadCrumbs[0].list)
            .enter()
            .append("option")
            .html(function (d) {
              return "<option value='" + d + "'>" + d + "</option>";
            });
          $("#bitem-selector-1").val(breadCrumbs[0].name);
          d3.select("#bitem-selector-1").on("change", function () {
            d = this.value;
            if (d == "") return;
            topicData.forEach(function (v) {
              if (v.key === d) {
                var data_copy = JSON.parse(JSON.stringify(v.values));
                data_copy.push(v);
                directory = [];
                directory.push(v.key);
                level = 1;
                items = topicData
                  .map(function (o) {
                    return o.key;
                  })
                  .filter(function (o) {
                    return o !== "";
                  })
                  .sort(d3.ascending);
                breadCrumbs = [
                  { name: v.key, type: "Topics", data: v, list: items },
                ];
                generateGraph(data_copy, v.key);
                updateUrlParams();
              }
            });
          });

          var bitem2 = "<span>Audience: </span>";
          d3.select("#bitem-selector-2")
            .selectAll("option")
            .data(breadCrumbs[1].list)
            .enter()
            .append("option")
            .html(function (d) {
              return "<option value='" + d + "'>" + d + "</option>";
            });
          $("#bitem-selector-2").val(breadCrumbs[1].name);
          d3.select("#bitem-selector-2").on("change", function () {
            d = this.value;
            if (d == "") return;
            topicData.forEach(function (v) {
              if (v.key === breadCrumbs[0].name) {
                directory = [];
                directory.push(v.key);
                level = 1;
                items = topicData
                  .map(function (o) {
                    return o.key;
                  })
                  .filter(function (o) {
                    return o !== "";
                  })
                  .sort(d3.ascending);
                breadCrumbs = [
                  { name: v.key, type: "Topics", data: v, list: items },
                ];
                v.values.forEach(function (w) {
                  if (w.key === d) {
                    var data_copy = JSON.parse(JSON.stringify(w.values));
                    data_copy.push(w);
                    level += 1;
                    items = v.values
                      .map(function (o) {
                        return o.key;
                      })
                      .filter(function (o) {
                        return o !== "";
                      })
                      .sort(d3.ascending);
                    breadCrumbs.push({
                      name: w.key,
                      type: "Audience",
                      data: w,
                      list: items,
                    });

                    generateGraph(
                      data_copy.filter(function (d) {
                        return d != null;
                      }),
                      w.key
                    );
                    updateUrlParams();
                  }
                });
              }
            });
          });
          var bitem4 = "<span class='select'>Select Micro-credential</span>";
          d3.select("#bitem-selector-4")
            .selectAll("option")
            .data(currentList)
            .enter()
            .append("option")
            .html(function (d) {
              return "<option value='" + d + "'>" + d + "</option>";
            });
          $("#bitem-selector-4").val("");
          d3.select("#bitem-selector-4").on("change", function () {
            d = this.value;
            if (d == "") return;
            topicData.forEach(function (v) {
              if (v.key === breadCrumbs[0].name) {
                v.values.forEach(function (w) {
                  if (w.key === breadCrumbs[1].name) {
                    w.values.forEach(function (u) {
                      if (u["Micro-credential Name"] === d) {
                        showTooltip(u);
                      }
                    });
                  }
                });
              }
            });
          });
          d3.select(".bitem-4").attr("class", "bitem bitem-4").html(bitem4);
          d3.select(".bbox-4").attr("class", "bbox bbox-4");
          d3.select("#bitem-selector-4").style("display", "");
        }
        if (mode === "Stack Name") {
          var currentList = currentData
            .map(function (w) {
              return w.key;
            })
            .filter(function (o) {
              return o !== root_key;
            })
            .sort(d3.ascending);
          var bitem1 = "<span>Stack Name: </span>";
          d3.select("#bitem-selector-1")
            .selectAll("option")
            .data(breadCrumbs[0].list)
            .enter()
            .append("option")
            .html(function (d) {
              return "<option value='" + d + "'>" + d + "</option>";
            });
          $("#bitem-selector-1").val(breadCrumbs[0].name);
          d3.select("#bitem-selector-1").on("change", function () {
            d = this.value;
            if (d == "") return;
            stackNameData.forEach(function (v) {
              if (v.key === d) {
                var data_copy = JSON.parse(JSON.stringify(v.values));
                data_copy.push(v);
                directory = [];
                directory.push(v.key);
                level = 1;
                items = stackNameData
                  .map(function (o) {
                    return o.key;
                  })
                  .filter(function (o) {
                    return o !== "";
                  })
                  .sort(d3.ascending);
                breadCrumbs = [
                  { name: v.key, type: "Stack Name", data: v, list: items },
                ];
                updateUrlParams();
                generateGraph(data_copy, v.key);
              }
            });
          });

          var bitem2 = "<span>Audience: </span>";
          d3.select("#bitem-selector-2")
            .selectAll("option")
            .data(breadCrumbs[1].list)
            .enter()
            .append("option")
            .html(function (d) {
              return "<option value='" + d + "'>" + d + "</option>";
            });
          $("#bitem-selector-2").val(breadCrumbs[1].name);
          d3.select("#bitem-selector-2").on("change", function () {
            d = this.value;
            if (d == "") return;
            stackNameData.forEach(function (v) {
              if (v.key === breadCrumbs[0].name) {
                directory = [];
                directory.push(v.key);
                level = 1;
                items = stackNameData
                  .map(function (o) {
                    return o.key;
                  })
                  .filter(function (o) {
                    return o !== "";
                  })
                  .sort(d3.ascending);
                breadCrumbs = [
                  { name: v.key, type: "Stack Name", data: v, list: items },
                ];
                v.values.forEach(function (w) {
                  if (w.key === d) {
                    var data_copy = JSON.parse(JSON.stringify(w.values));
                    data_copy.push(w);
                    level += 1;
                    items = v.values
                      .map(function (o) {
                        return o.key;
                      })
                      .filter(function (o) {
                        return o !== "";
                      })
                      .sort(d3.ascending);
                    breadCrumbs.push({
                      name: w.key,
                      type: "Audience",
                      data: w,
                      list: items,
                    });

                    generateGraph(
                      data_copy.filter(function (d) {
                        return d != null;
                      }),
                      w.key
                    );
                    updateUrlParams();
                  }
                });
              }
            });
          });

          var bitem3 = "<span class='select'>Select Topic</span>";
          d3.select("#bitem-selector-3")
            .selectAll("option")
            .data(currentList)
            .enter()
            .append("option")
            .html(function (d) {
              return "<option value='" + d + "'>" + d + "</option>";
            });
          $("#bitem-selector-3").val("");
          d3.select("#bitem-selector-3").on("change", function () {
            d = this.value;
            if (d == "") return;
            var oldBreadCrumbs = JSON.parse(JSON.stringify(breadCrumbs));
            stackNameData.forEach(function (v) {
              if (v.key === oldBreadCrumbs[0].name) {
                directory = [];
                directory.push(v.key);
                level = 1;
                items = stackNameData
                  .map(function (o) {
                    return o.key;
                  })
                  .filter(function (o) {
                    return o !== "";
                  })
                  .sort(d3.ascending);
                breadCrumbs = [
                  { name: v.key, type: "Stack Name", data: v, list: items },
                ];
                v.values.forEach(function (w) {
                  if (w.key === oldBreadCrumbs[1].name) {
                    level += 1;
                    items = v.values
                      .map(function (o) {
                        return o.key;
                      })
                      .filter(function (o) {
                        return o !== "";
                      })
                      .sort(d3.ascending);
                    breadCrumbs.push({
                      name: w.key,
                      type: "Audience",
                      data: w,
                      list: items,
                    });
                    w.values.forEach(function (u) {
                      if (u.key === d) {
                        var data_copy = JSON.parse(JSON.stringify(u.values));
                        data_copy.push(u);
                        level += 1;
                        items = w.values
                          .map(function (o) {
                            return o.key;
                          })
                          .filter(function (o) {
                            return o !== "";
                          })
                          .sort(d3.ascending);
                        breadCrumbs.push({
                          name: u.key,
                          type: "Topics",
                          data: u,
                          list: items,
                        });
                        generateGraph(
                          data_copy.filter(function (d) {
                            return d != null;
                          }),
                          u.key
                        );
                        updateUrlParams();
                      }
                    });
                  }
                });
              }
            });
          });
          var bitem4 = "<span class='select'>Select Micro-credential</span>";
          d3.select("#bitem-selector-3").style("display", "");
          d3.select("#bitem-selector-4").style("display", "none");
        }
        if (mode === "Education Standard") {
          var currentList = currentData
            .map(function (w) {
              return w.key;
            })
            .filter(function (o) {
              return o !== root_key;
            })
            .sort(d3.ascending);

          var bitem1 = "<span>Education Standard: </span>";
          d3.select("#bitem-selector-1")
            .selectAll("option")
            .data(breadCrumbs[0].list)
            .enter()
            .append("option")
            .html(function (d) {
              return "<option value='" + d + "'>" + d + "</option>";
            });
          $("#bitem-selector-1").val(breadCrumbs[0].name);
          d3.select("#bitem-selector-1").on("change", function () {
            d = this.value;
            if (d == "") return;
            educationStandardData.forEach(function (v) {
              if (v.key === d) {
                var data_copy = JSON.parse(JSON.stringify(v.values));
                data_copy.push(v);
                directory = [];
                directory.push(v.key);
                level = 1;
                items = educationStandardData
                  .map(function (o) {
                    return o.key;
                  })
                  .filter(function (o) {
                    return o !== "";
                  })
                  .sort(d3.ascending);
                breadCrumbs = [
                  {
                    name: v.key,
                    type: "Education Standard",
                    data: v,
                    list: items,
                  },
                ];
                updateUrlParams();
                generateGraph(data_copy, v.key);
              }
            });
          });

          var bitem2 = "<span>Audience: </span>";
          d3.select("#bitem-selector-2")
            .selectAll("option")
            .data(breadCrumbs[1].list)
            .enter()
            .append("option")
            .html(function (d) {
              return "<option value='" + d + "'>" + d + "</option>";
            });
          $("#bitem-selector-2").val(breadCrumbs[1].name);
          d3.select("#bitem-selector-2").on("change", function () {
            d = this.value;
            if (d == "") return;
            educationStandardData.forEach(function (v) {
              if (v.key === breadCrumbs[0].name) {
                directory = [];
                directory.push(v.key);
                level = 1;
                items = educationStandardData
                  .map(function (o) {
                    return o.key;
                  })
                  .filter(function (o) {
                    return o !== "";
                  })
                  .sort(d3.ascending);
                breadCrumbs = [
                  {
                    name: v.key,
                    type: "Education Standard",
                    data: v,
                    list: items,
                  },
                ];
                v.values.forEach(function (w) {
                  if (w.key === d) {
                    var data_copy = JSON.parse(JSON.stringify(w.values));
                    data_copy.push(w);
                    level += 1;
                    items = v.values
                      .map(function (o) {
                        return o.key;
                      })
                      .filter(function (o) {
                        return o !== "";
                      })
                      .sort(d3.ascending);
                    breadCrumbs.push({
                      name: w.key,
                      type: "Audience",
                      data: w,
                      list: items,
                    });

                    generateGraph(
                      data_copy.filter(function (d) {
                        return d != null;
                      }),
                      w.key
                    );
                    updateUrlParams();
                  }
                });
              }
            });
          });

          var bitem3 = "<span class='select'>Select Topic</span>";
          d3.select("#bitem-selector-3")
            .selectAll("option")
            .data(currentList)
            .enter()
            .append("option")
            .html(function (d) {
              return "<option value='" + d + "'>" + d + "</option>";
            });
          $("#bitem-selector-3").val("");
          d3.select("#bitem-selector-3").on("change", function () {
            d = this.value;
            if (d == "") return;
            var oldBreadCrumbs = JSON.parse(JSON.stringify(breadCrumbs));
            educationStandardData.forEach(function (v) {
              if (v.key === oldBreadCrumbs[0].name) {
                directory = [];
                directory.push(v.key);
                level = 1;
                items = educationStandardData
                  .map(function (o) {
                    return o.key;
                  })
                  .filter(function (o) {
                    return o !== "";
                  })
                  .sort(d3.ascending);
                breadCrumbs = [
                  {
                    name: v.key,
                    type: "Education Standard",
                    data: v,
                    list: items,
                  },
                ];

                v.values.forEach(function (w) {
                  if (w.key === oldBreadCrumbs[1].name) {
                    level += 1;
                    items = v.values
                      .map(function (o) {
                        return o.key;
                      })
                      .filter(function (o) {
                        return o !== "";
                      })
                      .sort(d3.ascending);
                    breadCrumbs.push({
                      name: w.key,
                      type: "Audience",
                      data: w,
                      list: items,
                    });
                    w.values.forEach(function (u) {
                      if (u.key === d) {
                        var data_copy = JSON.parse(JSON.stringify(u.values));
                        data_copy.push(u);
                        level += 1;
                        items = w.values
                          .map(function (o) {
                            return o.key;
                          })
                          .filter(function (o) {
                            return o !== "";
                          })
                          .sort(d3.ascending);
                        breadCrumbs.push({
                          name: u.key,
                          type: "Topics",
                          data: u,
                          list: items,
                        });
                        generateGraph(
                          data_copy.filter(function (d) {
                            return d != null;
                          }),
                          u.key
                        );
                        updateUrlParams();
                      }
                    });
                  }
                });
              }
            });
          });

          var bitem4 = "<span class='select'>Select Micro-credential</span>";
          d3.select("#bitem-selector-3").style("display", "");
          d3.select("#bitem-selector-4").style("display", "none");
        }
        if (mode === "Types of Evidence") {
          var currentList = currentData
            .map(function (w) {
              return w.key;
            })
            .filter(function (o) {
              return o !== root_key;
            })
            .sort(d3.ascending);

          var bitem1 = "<span>Types of Evidence: </span>";
          d3.select("#bitem-selector-1")
            .selectAll("option")
            .data(breadCrumbs[0].list)
            .enter()
            .append("option")
            .html(function (d) {
              return "<option value='" + d + "'>" + d + "</option>";
            });
          $("#bitem-selector-1").val(breadCrumbs[0].name);
          d3.select("#bitem-selector-1").on("change", function () {
            d = this.value;
            if (d == "") return;
            typesOfEvidenceData.forEach(function (v) {
              if (v.key === d) {
                var data_copy = JSON.parse(JSON.stringify(v.values));
                data_copy.push(v);
                directory = [];
                directory.push(v.key);
                level = 1;
                items = typesOfEvidenceData
                  .map(function (o) {
                    return o.key;
                  })
                  .filter(function (o) {
                    return o !== "";
                  })
                  .sort(d3.ascending);
                breadCrumbs = [
                  {
                    name: v.key,
                    type: "Types of Evidence",
                    data: v,
                    list: items,
                  },
                ];
                updateUrlParams();
                generateGraph(data_copy, v.key);
              }
            });
          });

          var bitem2 = "<span>Audience: </span>";
          d3.select("#bitem-selector-2")
            .selectAll("option")
            .data(breadCrumbs[1].list)
            .enter()
            .append("option")
            .html(function (d) {
              return "<option value='" + d + "'>" + d + "</option>";
            });
          $("#bitem-selector-2").val(breadCrumbs[1].name);
          d3.select("#bitem-selector-2").on("change", function () {
            d = this.value;
            if (d == "") return;
            typesOfEvidenceData.forEach(function (v) {
              if (v.key === breadCrumbs[0].name) {
                directory = [];
                directory.push(v.key);
                level = 1;
                items = typesOfEvidenceData
                  .map(function (o) {
                    return o.key;
                  })
                  .filter(function (o) {
                    return o !== "";
                  })
                  .sort(d3.ascending);
                breadCrumbs = [
                  {
                    name: v.key,
                    type: "Types of Evidence",
                    data: v,
                    list: items,
                  },
                ];
                v.values.forEach(function (w) {
                  if (w.key === d) {
                    var data_copy = JSON.parse(JSON.stringify(w.values));
                    data_copy.push(w);
                    level += 1;
                    items = v.values
                      .map(function (o) {
                        return o.key;
                      })
                      .filter(function (o) {
                        return o !== "";
                      })
                      .sort(d3.ascending);
                    breadCrumbs.push({
                      name: w.key,
                      type: "Audience",
                      data: w,
                      list: items,
                    });

                    generateGraph(
                      data_copy.filter(function (d) {
                        return d != null;
                      }),
                      w.key
                    );
                    updateUrlParams();
                  }
                });
              }
            });
          });

          var bitem3 = "<span class='select'>Select Topic</span>";
          d3.select("#bitem-selector-3")
            .selectAll("option")
            .data(currentList)
            .enter()
            .append("option")
            .html(function (d) {
              return "<option value='" + d + "'>" + d + "</option>";
            });
          $("#bitem-selector-3").val("");
          d3.select("#bitem-selector-3").on("change", function () {
            d = this.value;
            if (d == "") return;
            var oldBreadCrumbs = JSON.parse(JSON.stringify(breadCrumbs));
            typesOfEvidenceData.forEach(function (v) {
              if (v.key === oldBreadCrumbs[0].name) {
                directory = [];
                directory.push(v.key);
                level = 1;
                items = typesOfEvidenceData
                  .map(function (o) {
                    return o.key;
                  })
                  .filter(function (o) {
                    return o !== "";
                  })
                  .sort(d3.ascending);
                breadCrumbs = [
                  {
                    name: v.key,
                    type: "Types of Evidence",
                    data: v,
                    list: items,
                  },
                ];

                v.values.forEach(function (w) {
                  if (w.key === oldBreadCrumbs[1].name) {
                    level += 1;
                    items = v.values
                      .map(function (o) {
                        return o.key;
                      })
                      .filter(function (o) {
                        return o !== "";
                      })
                      .sort(d3.ascending);
                    breadCrumbs.push({
                      name: w.key,
                      type: "Audience",
                      data: w,
                      list: items,
                    });
                    w.values.forEach(function (u) {
                      if (u.key === d) {
                        var data_copy = JSON.parse(JSON.stringify(u.values));
                        data_copy.push(u);
                        level += 1;
                        items = w.values
                          .map(function (o) {
                            return o.key;
                          })
                          .filter(function (o) {
                            return o !== "";
                          })
                          .sort(d3.ascending);
                        breadCrumbs.push({
                          name: u.key,
                          type: "Topics",
                          data: u,
                          list: items,
                        });
                        generateGraph(
                          data_copy.filter(function (d) {
                            return d != null;
                          }),
                          u.key
                        );
                        updateUrlParams();
                      }
                    });
                  }
                });
              }
            });
          });

          var bitem4 = "<span class='select'>Select Micro-credential</span>";
          d3.select("#bitem-selector-3").style("display", "");
          d3.select("#bitem-selector-4").style("display", "none");
        }

        d3.select(".bitem-1").attr("class", "bitem bitem-1").html(bitem1);
        d3.select(".bitem-2").attr("class", "bitem bitem-2").html(bitem2);
        d3.select(".bbox-3").attr("class", "bbox bbox-3");
      }
      if (level === 3) {
        if (mode === "Stack Name") {
          var currentList = currentData
            .map(function (w) {
              return w["Micro-credential Name"];
            })
            .filter(function (o) {
              return o != null;
            })
            .sort(d3.ascending);
          var bitem1 = "<span>Stack Name: </span>";
          d3.select("#bitem-selector-1")
            .selectAll("option")
            .data(breadCrumbs[0].list)
            .enter()
            .append("option")
            .html(function (d) {
              return "<option value='" + d + "'>" + d + "</option>";
            });
          $("#bitem-selector-1").val(breadCrumbs[0].name);
          d3.select("#bitem-selector-1").on("change", function () {
            d = this.value;
            if (d == "") return;
            stackNameData.forEach(function (v) {
              if (v.key === d) {
                var data_copy = JSON.parse(JSON.stringify(v.values));
                data_copy.push(v);
                directory = [];
                directory.push(v.key);
                level = 1;
                items = stackNameData
                  .map(function (o) {
                    return o.key;
                  })
                  .filter(function (o) {
                    return o !== "";
                  })
                  .sort(d3.ascending);
                breadCrumbs = [
                  { name: v.key, type: "Stack Name", data: v, list: items },
                ];
                updateUrlParams();
                generateGraph(data_copy, v.key);
              }
            });
          });

          var bitem2 = "<span>Audience: </span>";
          d3.select("#bitem-selector-2")
            .selectAll("option")
            .data(breadCrumbs[1].list)
            .enter()
            .append("option")
            .html(function (d) {
              return "<option value='" + d + "'>" + d + "</option>";
            });
          $("#bitem-selector-2").val(breadCrumbs[1].name);
          d3.select("#bitem-selector-2").on("change", function () {
            d = this.value;
            if (d == "") return;
            stackNameData.forEach(function (v) {
              if (v.key === breadCrumbs[0].name) {
                directory = [];
                directory.push(v.key);
                level = 1;
                items = stackNameData
                  .map(function (o) {
                    return o.key;
                  })
                  .filter(function (o) {
                    return o !== "";
                  })
                  .sort(d3.ascending);
                breadCrumbs = [
                  { name: v.key, type: "Stack Name", data: v, list: items },
                ];
                v.values.forEach(function (w) {
                  if (w.key === d) {
                    var data_copy = JSON.parse(JSON.stringify(w.values));
                    data_copy.push(w);
                    level += 1;
                    items = v.values
                      .map(function (o) {
                        return o.key;
                      })
                      .filter(function (o) {
                        return o !== "";
                      })
                      .sort(d3.ascending);
                    breadCrumbs.push({
                      name: w.key,
                      type: "Audience",
                      data: w,
                      list: items,
                    });

                    generateGraph(
                      data_copy.filter(function (d) {
                        return d != null;
                      }),
                      w.key
                    );
                    updateUrlParams();
                    updateBreadcrumbs();
                  }
                });
              }
            });
          });

          var bitem3 = "<span>Topic: </span>";
          d3.select("#bitem-selector-3")
            .selectAll("option")
            .data(breadCrumbs[2].list)
            .enter()
            .append("option")
            .html(function (d) {
              return "<option value='" + d + "'>" + d + "</option>";
            });
          $("#bitem-selector-3").val(breadCrumbs[2].name);
          d3.select("#bitem-selector-3").on("change", function () {
            d = this.value;
            if (d == "") return;
            var oldBreadCrumbs = JSON.parse(JSON.stringify(breadCrumbs));
            stackNameData.forEach(function (v) {
              if (v.key === oldBreadCrumbs[0].name) {
                directory = [];
                directory.push(v.key);
                level = 1;
                items = stackNameData
                  .map(function (o) {
                    return o.key;
                  })
                  .filter(function (o) {
                    return o !== "";
                  })
                  .sort(d3.ascending);
                breadCrumbs = [
                  { name: v.key, type: "Stack Name", data: v, list: items },
                ];
                v.values.forEach(function (w) {
                  if (w.key === oldBreadCrumbs[1].name) {
                    level += 1;
                    items = v.values
                      .map(function (o) {
                        return o.key;
                      })
                      .filter(function (o) {
                        return o !== "";
                      })
                      .sort(d3.ascending);
                    breadCrumbs.push({
                      name: w.key,
                      type: "Audience",
                      data: w,
                      list: items,
                    });
                    w.values.forEach(function (u) {
                      if (u.key === d) {
                        var data_copy = JSON.parse(JSON.stringify(u.values));
                        data_copy.push(u);
                        level += 1;
                        items = w.values
                          .map(function (o) {
                            return o.key;
                          })
                          .filter(function (o) {
                            return o !== "";
                          })
                          .sort(d3.ascending);
                        breadCrumbs.push({
                          name: u.key,
                          type: "Topics",
                          data: u,
                          list: items,
                        });
                        generateGraph(
                          data_copy.filter(function (d) {
                            return d != null;
                          }),
                          u.key
                        );
                        updateUrlParams();
                      }
                    });
                  }
                });
              }
            });
          });

          var bitem4 = "<span class='select'>Select Micro-credential</span>";
          d3.select("#bitem-selector-4")
            .selectAll("option")
            .data(currentList)
            .enter()
            .append("option")
            .html(function (d) {
              return "<option value='" + d + "'>" + d + "</option>";
            });
          $("#bitem-selector-4").val("");
          d3.select("#bitem-selector-4").on("change", function () {
            d = this.value;
            if (d == "") return;
            stackNameData.forEach(function (v) {
              if (v.key === breadCrumbs[0].name) {
                v.values.forEach(function (w) {
                  if (w.key === breadCrumbs[1].name) {
                    w.values.forEach(function (u) {
                      if (u.key === breadCrumbs[2].name) {
                        u.values.forEach(function (o) {
                          if (o["Micro-credential Name"] === d) {
                            showTooltip(o);
                          }
                        });
                      }
                    });
                  }
                });
              }
            });
          });

          d3.select("#bitem-selector-4").style("display", "");
        }
        if (mode === "Education Standard") {
          var currentList = currentData
            .map(function (w) {
              return w["Micro-credential Name"];
            })
            .filter(function (o) {
              return o != null;
            })
            .sort(d3.ascending);
          var bitem1 = "<span>Education Standard: </span>";
          d3.select("#bitem-selector-1")
            .selectAll("option")
            .data(breadCrumbs[0].list)
            .enter()
            .append("option")
            .html(function (d) {
              return "<option value='" + d + "'>" + d + "</option>";
            });
          $("#bitem-selector-1").val(breadCrumbs[0].name);
          d3.select("#bitem-selector-1").on("change", function () {
            d = this.value;
            if (d == "") return;
            educationStandardData.forEach(function (v) {
              if (v.key === d) {
                var data_copy = JSON.parse(JSON.stringify(v.values));
                data_copy.push(v);
                directory = [];
                directory.push(v.key);
                level = 1;
                items = educationStandardData
                  .map(function (o) {
                    return o.key;
                  })
                  .filter(function (o) {
                    return o !== "";
                  })
                  .sort(d3.ascending);
                breadCrumbs = [
                  {
                    name: v.key,
                    type: "Education Standard",
                    data: v,
                    list: items,
                  },
                ];
                updateUrlParams();
                generateGraph(data_copy, v.key);
              }
            });
          });

          var bitem2 = "<span>Audience: </span>";
          d3.select("#bitem-selector-2")
            .selectAll("option")
            .data(breadCrumbs[1].list)
            .enter()
            .append("option")
            .html(function (d) {
              return "<option value='" + d + "'>" + d + "</option>";
            });
          $("#bitem-selector-2").val(breadCrumbs[1].name);
          d3.select("#bitem-selector-2").on("change", function () {
            d = this.value;
            if (d == "") return;
            educationStandardData.forEach(function (v) {
              if (v.key === breadCrumbs[0].name) {
                directory = [];
                directory.push(v.key);
                level = 1;
                items = educationStandardData
                  .map(function (o) {
                    return o.key;
                  })
                  .filter(function (o) {
                    return o !== "";
                  })
                  .sort(d3.ascending);
                breadCrumbs = [
                  {
                    name: v.key,
                    type: "Education Standard",
                    data: v,
                    list: items,
                  },
                ];
                v.values.forEach(function (w) {
                  if (w.key === d) {
                    var data_copy = JSON.parse(JSON.stringify(w.values));
                    data_copy.push(w);
                    level += 1;
                    items = v.values
                      .map(function (o) {
                        return o.key;
                      })
                      .filter(function (o) {
                        return o !== "";
                      })
                      .sort(d3.ascending);
                    breadCrumbs.push({
                      name: w.key,
                      type: "Audience",
                      data: w,
                      list: items,
                    });

                    generateGraph(
                      data_copy.filter(function (d) {
                        return d != null;
                      }),
                      w.key
                    );
                    updateUrlParams();
                  }
                });
              }
            });
          });

          var bitem3 = "<span>Topic: </span>";
          d3.select("#bitem-selector-3")
            .selectAll("option")
            .data(breadCrumbs[2].list)
            .enter()
            .append("option")
            .html(function (d) {
              return "<option value='" + d + "'>" + d + "</option>";
            });
          $("#bitem-selector-3").val(breadCrumbs[2].name);

          d3.select("#bitem-selector-3").on("change", function () {
            d = this.value;
            if (d == "") return;
            var oldBreadCrumbs = JSON.parse(JSON.stringify(breadCrumbs));
            educationStandardData.forEach(function (v) {
              if (v.key === oldBreadCrumbs[0].name) {
                directory = [];
                directory.push(v.key);
                level = 1;
                items = educationStandardData
                  .map(function (o) {
                    return o.key;
                  })
                  .filter(function (o) {
                    return o !== "";
                  })
                  .sort(d3.ascending);
                breadCrumbs = [
                  {
                    name: v.key,
                    type: "Education Standard",
                    data: v,
                    list: items,
                  },
                ];
                v.values.forEach(function (w) {
                  if (w.key === oldBreadCrumbs[1].name) {
                    level += 1;
                    items = v.values
                      .map(function (o) {
                        return o.key;
                      })
                      .filter(function (o) {
                        return o !== "";
                      })
                      .sort(d3.ascending);
                    breadCrumbs.push({
                      name: w.key,
                      type: "Audience",
                      data: w,
                      list: items,
                    });
                    w.values.forEach(function (u) {
                      if (u.key === d) {
                        var data_copy = JSON.parse(JSON.stringify(u.values));
                        data_copy.push(u);
                        level += 1;
                        items = w.values
                          .map(function (o) {
                            return o.key;
                          })
                          .filter(function (o) {
                            return o !== "";
                          })
                          .sort(d3.ascending);

                        breadCrumbs.push({
                          name: u.key,
                          type: "Topics",
                          data: u,
                          list: items,
                        });
                        generateGraph(
                          data_copy.filter(function (d) {
                            return d != null;
                          }),
                          u.key
                        );
                        updateUrlParams();
                      }
                    });
                  }
                });
              }
            });
          });

          var bitem4 = "<span class='select'>Select Micro-credential</span>";
          d3.select("#bitem-selector-4")
            .selectAll("option")
            .data(currentList)
            .enter()
            .append("option")
            .html(function (d) {
              return "<option value='" + d + "'>" + d + "</option>";
            });
          $("#bitem-selector-4").val("");
          d3.select("#bitem-selector-4").on("change", function () {
            d = this.value;
            if (d == "") return;
            educationStandardData.forEach(function (v) {
              if (v.key === breadCrumbs[0].name) {
                v.values.forEach(function (w) {
                  if (w.key === breadCrumbs[1].name) {
                    w.values.forEach(function (u) {
                      if (u.key === breadCrumbs[2].name) {
                        u.values.forEach(function (o) {
                          if (o["Micro-credential Name"] === d) {
                            showTooltip(o);
                          }
                        });
                      }
                    });
                  }
                });
              }
            });
          });
          d3.select("#bitem-selector-4").style("display", "");
        }
        if (mode === "Types of Evidence") {
          var currentList = currentData
            .map(function (w) {
              return w["Micro-credential Name"];
            })
            .filter(function (o) {
              return o != null;
            })
            .sort(d3.ascending);
          var bitem1 = "<span>Types of Evidence: </span>";
          d3.select("#bitem-selector-1")
            .selectAll("option")
            .data(breadCrumbs[0].list)
            .enter()
            .append("option")
            .html(function (d) {
              return "<option value='" + d + "'>" + d + "</option>";
            });
          $("#bitem-selector-1").val(breadCrumbs[0].name);
          d3.select("#bitem-selector-1").on("change", function () {
            d = this.value;
            if (d == "") return;
            typesOfEvidenceData.forEach(function (v) {
              if (v.key === d) {
                var data_copy = JSON.parse(JSON.stringify(v.values));
                data_copy.push(v);
                directory = [];
                directory.push(v.key);
                level = 1;
                items = typesOfEvidenceData
                  .map(function (o) {
                    return o.key;
                  })
                  .filter(function (o) {
                    return o !== "";
                  })
                  .sort(d3.ascending);
                breadCrumbs = [
                  {
                    name: v.key,
                    type: "Types of Evidence",
                    data: v,
                    list: items,
                  },
                ];
                updateUrlParams();
                generateGraph(data_copy, v.key);
              }
            });
          });

          var bitem2 = "<span>Audience: </span>";
          d3.select("#bitem-selector-2")
            .selectAll("option")
            .data(breadCrumbs[1].list)
            .enter()
            .append("option")
            .html(function (d) {
              return "<option value='" + d + "'>" + d + "</option>";
            });
          $("#bitem-selector-2").val(breadCrumbs[1].name);
          d3.select("#bitem-selector-2").on("change", function () {
            d = this.value;
            if (d == "") return;
            typesOfEvidenceData.forEach(function (v) {
              if (v.key === breadCrumbs[0].name) {
                directory = [];
                directory.push(v.key);
                level = 1;
                items = typesOfEvidenceData
                  .map(function (o) {
                    return o.key;
                  })
                  .filter(function (o) {
                    return o !== "";
                  })
                  .sort(d3.ascending);
                breadCrumbs = [
                  {
                    name: v.key,
                    type: "Types of Evidence",
                    data: v,
                    list: items,
                  },
                ];
                v.values.forEach(function (w) {
                  if (w.key === d) {
                    var data_copy = JSON.parse(JSON.stringify(w.values));
                    data_copy.push(w);
                    level += 1;
                    items = v.values
                      .map(function (o) {
                        return o.key;
                      })
                      .filter(function (o) {
                        return o !== "";
                      })
                      .sort(d3.ascending);
                    breadCrumbs.push({
                      name: w.key,
                      type: "Audience",
                      data: w,
                      list: items,
                    });

                    generateGraph(
                      data_copy.filter(function (d) {
                        return d != null;
                      }),
                      w.key
                    );
                    updateUrlParams();
                  }
                });
              }
            });
          });

          var bitem3 = "<span>Topic: </span>";
          d3.select("#bitem-selector-3")
            .selectAll("option")
            .data(breadCrumbs[2].list)
            .enter()
            .append("option")
            .html(function (d) {
              return "<option value='" + d + "'>" + d + "</option>";
            });
          $("#bitem-selector-3").val(breadCrumbs[2].name);

          d3.select("#bitem-selector-3").on("change", function () {
            d = this.value;
            if (d == "") return;
            var oldBreadCrumbs = JSON.parse(JSON.stringify(breadCrumbs));
            typesOfEvidenceData.forEach(function (v) {
              if (v.key === oldBreadCrumbs[0].name) {
                directory = [];
                directory.push(v.key);
                level = 1;
                items = typesOfEvidenceData
                  .map(function (o) {
                    return o.key;
                  })
                  .filter(function (o) {
                    return o !== "";
                  })
                  .sort(d3.ascending);
                breadCrumbs = [
                  {
                    name: v.key,
                    type: "Types of Evidence",
                    data: v,
                    list: items,
                  },
                ];
                v.values.forEach(function (w) {
                  if (w.key === oldBreadCrumbs[1].name) {
                    level += 1;
                    items = v.values
                      .map(function (o) {
                        return o.key;
                      })
                      .filter(function (o) {
                        return o !== "";
                      })
                      .sort(d3.ascending);
                    breadCrumbs.push({
                      name: w.key,
                      type: "Audience",
                      data: w,
                      list: items,
                    });
                    w.values.forEach(function (u) {
                      if (u.key === d) {
                        var data_copy = JSON.parse(JSON.stringify(u.values));
                        data_copy.push(u);
                        level += 1;
                        items = w.values
                          .map(function (o) {
                            return o.key;
                          })
                          .filter(function (o) {
                            return o !== "";
                          })
                          .sort(d3.ascending);

                        breadCrumbs.push({
                          name: u.key,
                          type: "Topics",
                          data: u,
                          list: items,
                        });
                        generateGraph(
                          data_copy.filter(function (d) {
                            return d != null;
                          }),
                          u.key
                        );
                        updateUrlParams();
                      }
                    });
                  }
                });
              }
            });
          });

          var bitem4 = "<span class='select'>Select Micro-credential</span>";
          d3.select("#bitem-selector-4")
            .selectAll("option")
            .data(currentList)
            .enter()
            .append("option")
            .html(function (d) {
              return "<option value='" + d + "'>" + d + "</option>";
            });
          $("#bitem-selector-4").val("");
          d3.select("#bitem-selector-4").on("change", function () {
            d = this.value;
            if (d == "") return;
            typesOfEvidenceData.forEach(function (v) {
              if (v.key === breadCrumbs[0].name) {
                v.values.forEach(function (w) {
                  if (w.key === breadCrumbs[1].name) {
                    w.values.forEach(function (u) {
                      if (u.key === breadCrumbs[2].name) {
                        u.values.forEach(function (o) {
                          if (o["Micro-credential Name"] === d) {
                            showTooltip(o);
                          }
                        });
                      }
                    });
                  }
                });
              }
            });
          });
          d3.select("#bitem-selector-4").style("display", "");
        }

        d3.select(".bitem-1").attr("class", "bitem bitem-1").html(bitem1);
        d3.select(".bitem-2").attr("class", "bitem bitem-2").html(bitem2);
        d3.select(".bitem-3").attr("class", "bitem bitem-3").html(bitem3);
        d3.select(".bitem-4")
          .attr("class", "bitem bitem-4 bitem-active")
          .html(bitem4);
        d3.select(".bbox-3").attr("class", "bbox bbox-3");
        d3.select(".bbox-4").attr("class", "bbox bbox-4");
      }
    }
  }

  function zoomed() {
    const currentTransform = d3.event.transform;
    d3.select(".main-group").attr("transform", currentTransform);
  }

  function dragstarted(d) {
    if (!d3.event.active) simulation.alphaTarget(0.3).restart();
    d.fx = d.x;
    d.fy = d.y;
  }

  function dragged(d) {
    d.fx = d3.event.x;
    d.fy = d3.event.y;
  }

  function dragended(d) {
    if (!d3.event.active) simulation.alphaTarget(0);
    d.fx = null;
    d.fy = null;
  }

  function getTopXpercent(array, param, x) {
    var arrayCopy = array.sort(function (a, b) {
      return d3.descending(a[param], b[param]);
    });

    var threshold = arrayCopy[Math.round(x * arrayCopy.length)][param];

    arrayCopy = arrayCopy.filter(function (d) {
      return d[param] >= threshold;
    });

    return arrayCopy;
  }

  d3.selection.prototype.moveToFront = function () {
    return this.each(function () {
      this.parentNode.appendChild(this);
    });
  };

  function flatten(root) {
    const nodes = [];
    function recurse(node) {
      if (node.children) node.children.forEach(recurse);
      nodes.push(node);
    }
    recurse(root);
    return nodes;
  }
  update();
}
