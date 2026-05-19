

function notification(type, content) {
  if (type == "success") {
    $(".popup-notification").addClass("success");
    $(".popup-notification__icon").html('<i class="fa-solid fa-circle-check"></i>');
    $(".popup-notification__content").text(content);
    setTimeout(() => {
      $(".popup-notification").removeClass("success");
    }, 5000);
  } else if (type == "error") {
    $(".popup-notification").addClass("error");
    $(".popup-notification__icon").html('<i class="fa-solid fa-circle-exclamation"></i>');
    $(".popup-notification__content").text(content);
    setTimeout(() => {
      $(".popup-notification").removeClass("error");
    }, 5000);
  }
}
if($("#active_2fa").length){
  console.log($("#active_2fa"));
  console.log($("#active_2fa").val());
  if($("#active_2fa").val() == 1){
    notification("success", "Bạn đã xác thực 2FA thành công")
  }
}

// search select

if ($("#trademark").length) {
  $("#trademark").select2();
}
if ($("#size").length) {
  $("#size").select2();
}
// if($("#carcompany").length){
// 	$("#carcompany").select2();
// }
if ($("#thorn_line").length) {
  $("#thorn_line").select2();
}
if ($("#origin").length) {
  $("#origin").select2();
}
if ($("#uses").length) {
  $("#uses").select2();
}
if ($("#cat_idds").length) {
  $("#cat_idds").select2();
}
if ($("#car_company").length) {
  $("#car_company").select2();
}
if ($("#list_size").length) {
  $("#list_size").select2();
}
if ($("#list_camera").length) {
  $("#list_camera").select2();
}
if ($("#list_cambien").length) {
  $("#list_cambien").select2();
}
if ($("#list_fim").length) {
  $("#list_fim").select2();
}
if ($("#list_ppf").length) {
  $("#list_ppf").select2();
}
if ($("#list_carcompany").length) {
  $("#list_carcompany").select2();
}

if ($(".copy-link-image").length) {
  $(".copy-link-image").each(function (inx, copy) {
    $(copy).click(function (e) {
      e.preventDefault();
      $(copy).attr("title", "Copied");
      var text = $(copy).find(".link-image").val()
      var tempInput = document.createElement("input");
      tempInput.value = text;
      document.body.appendChild(tempInput);
      tempInput.select();
      var successful = document.execCommand("copy");
      document.body.removeChild(tempInput);
    });
  });
}

/////////////tabs /////////////
var ShowHideTab = new Class({
  initialize: function (elm, options) {
    var container = $(elm);
    if (!elm) {
      return false;
    }

    var items = container.getElements("ul.tabs li"),
      contents = container.getElements(".tableContent"),
      active = 0;

    for (var i = 0; i < items.length; i++) {
      if (items[i].hasClass("current")) {
        active = i;
        break;
      }
    }

    items.each(function (item, index) {
      item.addEvent("click", function (e) {
        if (e) {
          e.stop();
        }

        if (active != index) {
          items[active].removeClass("current");
          contents[active].addClass("hidden");

          active = index;

          items[active].addClass("current");
          contents[active].removeClass("hidden");
        }
      });
    });
  },
});



/**************/
var SMLayerFix = new Class({
  Implements: [Options, Events],
  options: {
    zIndex: 19999,
    opacity: 0.4,
    paddingTop: 0,
    closeButtonClass: "close",
    timeOut: false,
  },
  initialize: function (selector, elmCoord, options) {
    this.setOptions(options);
    this.setup($(selector), elmCoord);
  },
  setup: function (selector, elmCoord) {
    if (!selector) return;
    var that = this;
    var overlay = $("overlay");
    if (!overlay) {
      overlay = new Element("div", {
        styles: {
          display: "block",
          visibility: "visible",
          position: "absolute",
          top: 0,
          left: 0,
          width: window.getScrollSize().x,
          height: window.getScrollSize().y,
          zIndex: that.options.zIndex,
          backgroundColor: "#000",
          opacity: 0,
        },
      }).inject(document.body);
    }
    overlay.store(
      "fx",
      new Fx.Tween(overlay, {
        property: "opacity",
        duration: Browser.Engine.trident ? 200 : 350,
      })
    );
    selector.inject(overlay, "after");

    var showCoord = elmCoord.getCoordinates();
    var layerSize = selector.getSize();
    var winSize = window.getSize();
    var top = (window.getHeight() - selector.getCoordinates().height) / 2;
    var left = showCoord.left;
    var left = (window.getWidth() - selector.getCoordinates().width) / 2;
    selector.setStyles({
      opacity: 0,
      position: "absolute",
      top: Math.max(0, Math.max(top, window.getScrollTop())),
      left: left,
      zIndex: that.options.zIndex + 1,
    });
    selector.store(
      "fx",
      new Fx.Tween(selector, {
        property: "opacity",
        duration: 350,
      })
    );
    that.fireEvent("show", selector);

    if (Browser.Engine.trident) {
      selector.retrieve("fx").set(1);
    } else {
      selector.retrieve("fx").start(1);
    }
    overlay.retrieve("fx").start(that.options.opacity);

    var closeBtn = selector.getElement("." + that.options.closeButtonClass);
    if (closeBtn) {
      closeBtn.removeEvents("click").addEvent("click", function (e) {
        that.fireEvent("hide", selector);
        if (e) e.stop();

        if (Browser.Engine.trident) {
          selector.retrieve("fx").set(0);
          selector.setStyle("top", -5000);
        } else {
          selector
            .retrieve("fx")
            .start(0)
            .chain(function () {
              selector.setStyle("top", -5000);
            });
        }

        overlay
          .retrieve("fx")
          .start(0)
          .chain(function () {
            overlay.destroy();
          });
      });

      if (that.options.timeOut) {
        setTimeout(function () {
          closeBtn.fireEvent("click");
        }, that.options.timeOut);
      }
    }
  },
});



function initPopupBill() {
  var relativeLink = "";
  var permanentLink = "";
  if ($("valueRelative")) relativeLink = $("valueRelative").value;
  if ($("valuePermanent")) permanentLink = $("valuePermanent").value;
  var listIcons = $$("span.check");
  var popups = $(document.body).getChildren(".popup2");
  var html = "";
  listIcons.each(function (icon, idx) {
    icon.removeEvents("click").addEvent("click", function (e) {
      if (e) {
        e.stop();
      }
      if ($("valueRelative")) $("valueRelative").value = relativeLink + icon.getElement("a").getProperty("rel") + html;
      if ($("valuePermanent"))
        $("valuePermanent").value = permanentLink + icon.getElement("a").getProperty("rel") + html;
      new SMLayerFix(popups[0], this);
    });
  });
}

//////////////////
window.addEvent("domready", function () {
  initPopupBill();
  //new ShowHideTab('tabContent');
});

if ($("#currency_usd").length) {
  $("#price").on("blur", function () {
    let price = parseFloat($(this).val()) || 0;
    let rate = parseFloat($("#exchange_rate").val());
    if ($("#currency_usd").is(":checked")) {
      $(this).val(price * rate);
      $("#currency_usd").attr("checked", false);
    }
  });
}
