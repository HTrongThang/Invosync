function addonerowsOutput() {
  counter += 1;
  var packingdv = $("#packing");
  var clonedv = packingdv.clone();

  clonedv.attr("id", "packing_" + counter);
  clonedv.find("input").val(""); // XĂ³a táº¥t cáº£ giĂ¡ trá»‹ input cĂ¹ng lĂºc

  // Reset toĂ n bá»™ checkbox vĂ  giĂ¡ trá»‹ hidden status vá» 1
  clonedv.find("input[type='checkbox']").prop("checked", false).removeAttr("checked");
  clonedv.find(".chietkhau2, .khuyenmai2, .ghichupro2, .featuredProductStatus").val(1);

  // Dá»n dáº¹p Datepicker (Chá»‰ lĂ m 1 láº§n á»Ÿ Ä‘Ă¢y)
  clonedv.find(".hasDatepicker").removeClass("hasDatepicker").removeAttr("id");

  // Default disable cho hiá»ƒn thá»‹ sá»‘ lÆ°á»£ng
  clonedv.find(".input-quantity-display, .input-detail-display").prop("disabled", true);
  clonedv.show();
  clonedv.appendTo("#dshanghoa");
  clonedv.find("td.stt").text(counter);

  // --- ÄOáº N 2: Cáº¬P NHáº¬T INDEX (DĂ™NG LOGIC CHáº Y NGON Cá»¦A Báº N) ---
  let ck = document.getElementsByClassName("chietkhau");
  let km = document.getElementsByClassName("khuyenmai");
  let gc = document.getElementsByClassName("ghichupro");
  let fp = document.getElementsByClassName("featuredProduct");

  for (let i = 0; i < ck.length; i++) {
    // Cáº­p nháº­t onclick
    $(ck[i]).attr("onclick", "checkchietkhau(this, " + i + ")");
    $(km[i]).attr("onclick", "checkkhuyenmai(this, " + i + ")");
    $(gc[i]).attr("onclick", "checkghichupro(this, " + i + ")");
    $(fp[i]).attr("onclick", "handleProductSelection(this, " + i + ")");

    // Dá»n sáº¡ch class input cÅ© Ä‘á»ƒ trĂ¡nh lá»—i khĂ´ng tĂ­ch Ä‘Æ°á»£c checkbox
    let items = [ck[i], km[i], gc[i], fp[i]];
    $(items).each(function () {
      $(this).removeClass(function (index, className) {
        return (className.match(/(^|\s)input\S+/g) || []).join(' ');
      }).addClass("input" + i);
    });
  }

  // --- ÄOáº N 3: Xá»¬ LĂ DATEPICKER DUY NHáº¤T ---
  let hsdInput = clonedv.find(".expiry, .hsd");
  if (hsdInput.length > 0) {
    hsdInput.addClass("hsd_row_" + counter);
    hsdInput.datepicker({
      beforeShow: typeof customRange === 'function' ? customRange : null,
      dateFormat: "dd/mm/yy", // Thá»‘ng nháº¥t 1 Ä‘á»‹nh dáº¡ng duy nháº¥t
      changeMonth: true,
      changeYear: true
    });
  }

  // --- ÄOáº N 4: Xá»¬ LĂ FOCUS ---
  let focussl1 = clonedv.find(".masku");
  focussl1.on("focus", function () {
    if (typeof $(this).putCursorAtEnd === 'function') {
      $(this).putCursorAtEnd();
    }
  });
}
function adddbrowsOutput() {
  var addmorerow = parseInt($("#addmorenumber").val());
  var i;
  if (addmorerow > 0) {
    for (i = 0; i < addmorerow; i++) {
      addonerowsOutput();
    }
  } else {
    addonerowsOutput();
  }
}
function uncheckRadio(radio) {
  if (radio.checked) {
    radio.checked = false;
  }
}

function clearBuyerInfo() {
  $('#info_timnhanh').val('');
  $('#id_customer').val('');
  $('#masothue').val('');
  $('#madonvi').val('');
  $('#tennguoimua').val('');
  $('#tendonvi').val('');
  $('#diachi').val('');
  $('#email').val('');
}
function deleterowsOutput(el, type = "") {
  var tenform = $("#tenform").val();
  var el = $(el);
  var sum = 0;
  $("#dshanghoa tr").each(function () {
    sum += 1;
  });
  if (sum <= 1 && type != "auto") {
    showGlobalDialog("Không thể xóa", "error");
  }
  if (sum > 1) {
    $(el).parents("tr").remove();
    counter -= 1;
  }

  refreshstt();
  calcuTotalAmountOutPut();

  calcuTotalVat();
  calcuTotalPayment();
  writeMoney3();

  calcuTotalAmountVatOutPut();
  writeMoneyVAT();
}
function duplicaterowOutput(el) {
  var tenform = $("#tenform").val();
  counter += 1;
  var el = $(el);
  var idWare = $(el).parents("tr").find(".makho").val();
  var idGroup = $(el).parents("tr").find(".nhh").val();
  var idProType = $(el).parents("tr").find(".lhh").val();
  console.log(idWare, idGroup, idProType);
  var packingtr = $(el).parents("tr");
  var clonetr = packingtr.clone();
  clonetr.insertAfter(packingtr);
  clonetr.attr("id", "packing_" + counter);

  clonetr.find("input.chietkhau").each(function () {
    if ($(this).prop("checked") == true) {
      clonetr.find("input.chietkhau2").val(2);
    } else {
      clonetr.find("input.chietkhau2").val(1);
    }
  });
  clonetr.find("input.khuyenmai").each(function () {
    if ($(this).prop("checked") == true) {
      clonetr.find("input.khuyenmai2").val(2);
    } else {
      clonetr.find("input.khuyenmai2").val(1);
    }
  });
  let chiecKhauClass = document.getElementsByClassName("chietkhau");
  let khuyenMaiClass = document.getElementsByClassName("khuyenmai");
  let ghiChuProClass = document.getElementsByClassName("ghichupro");
  let featuredProductClass = document.getElementsByClassName("featuredProduct");
  for (let i = 1; i < chiecKhauClass.length; i++) {
    $(chiecKhauClass[i]).attr("onclick", "checkchietkhau(this, " + i + ")");
    $(chiecKhauClass[i]).removeClass("input" + (i - 1));
    $(chiecKhauClass[i]).addClass("input" + i);
    $(khuyenMaiClass[i]).attr("onclick", "checkkhuyenmai(this, " + i + ")");
    $(khuyenMaiClass[i]).removeClass("input" + (i - 1));
    $(khuyenMaiClass[i]).addClass("input" + i);
    $(ghiChuProClass[i]).attr("onclick", "checkghichupro(this, " + i + ")");
    $(ghiChuProClass[i]).removeClass("input" + (i - 1));
    $(ghiChuProClass[i]).addClass("input" + i);
    $(featuredProductClass[i]).attr(
      "onclick",
      "handleProductSelection(this, " + i + ")"
    );
    $(featuredProductClass[i]).removeClass("input" + (i - 1));
    $(featuredProductClass[i]).addClass("input" + i);
  }
  clonetr.find(".makho").val(idWare);

  //clonedv.find('input.hsd1').datepicker("destroy");
  clonetr.find("input.hsd1").removeClass("hasDatepicker").removeAttr("id");
  clonetr.find("input.hsd").removeClass("hsd1");
  clonetr.find("input.hsd").addClass("hsd" + counter);

  clonetr.find(".nhh").val(idGroup);
  clonetr.find(".lhh").val(idProType);

  var focussl1 = clonetr.find(".masku");

  focussl1
    .putCursorAtEnd() // should be chainable
    .on("focus", function () {
      // could be on any event
      focussl1.putCursorAtEnd();
    });

  $(".hsd" + counter).datepicker({
    dateFormat: "dd-mm-yy",
    changeMonth: true,
    changeYear: true,
  });
  refreshstt();

  calcuTotalAmountOutPut();

  calcuTotalVat();
  calcuTotalPayment();
  writeMoney3();
  calcuTotalAmountVatOutPut();
  writeMoneyVAT();

  // add invoice new
  clickChangeServiceCharge();
}
function checkchietkhau(ob, key) {
  let inputElement = document.getElementsByClassName("input" + key);
  for (let i = 0; i < inputElement.length; i++) {
    if (i != 0) inputElement[i].checked = false;
  }
  var tenform = $("#tenform").val();
  if ($(ob).parents("tr").find("input.chietkhau").prop("checked") == true) {
    $(ob).parents("tr").find(".chietkhau2").val(2);
  } else {
    $(ob).parents("tr").find(".chietkhau2").val(1);
  }
  calcuTotalAmountOutPut();
  calcuTotalVat();
  calcuTotalPayment();
  // writeMoney();
  writeMoney3();
  calcuTotalAmountVatOutPut();
  writeMoneyVAT();
}
function checkkhuyenmai(ob, key) {
  let inputElement = document.getElementsByClassName("input" + key);
  for (let i = 0; i < inputElement.length; i++) {
    if (i != 1) inputElement[i].checked = false;
  }
  var tenform = $("#tenform").val();
  console.log(tenform);
  if ($(ob).parents("tr").find("input.khuyenmai").prop("checked") == true) {
    $(ob).parents("tr").find(".khuyenmai2").val(2);
  } else {
    $(ob).parents("tr").find(".khuyenmai2").val(1);
  }
}
function checkghichupro(ob, key) {
  let inputElement = document.getElementsByClassName("input" + key);
  for (let i = 0; i < inputElement.length; i++) {
    if (i != 2) inputElement[i].checked = false;
  }
  var tenform = $("#tenform").val();
  if ($(ob).parents("tr").find("input.ghichupro").prop("checked") == true) {
    $(ob).parents("tr").find(".ghichupro2").val(2);
  } else {
    $(ob).parents("tr").find(".ghichupro2").val(1);
  }

  calcuTotalAmountOutPut();
  calcuTotalVat();
  calcuTotalPayment(); //tienbangchu dang doc sai
  // writeMoney();
  writeMoney3();
  calcuTotalAmountVatOutPut();
  writeMoneyVAT();
}
function handleProductSelection(checkboxElement, rowKey) {
  const parentRow = $(checkboxElement).closest("tr");
  const isProductSelected = $(checkboxElement).is(":checked");

  parentRow.find(".featuredProductStatus").val(isProductSelected ? 2 : 1);

  const toggleInputState = (inputElement, enable) => {
    if (inputElement.length) {
      inputElement.prop("disabled", !enable);

      if (!enable) {
        inputElement.val("");
        const validationMessageContainer = inputElement.siblings(".validation-message");
        if (validationMessageContainer.length) {
          validationMessageContainer.addClass("d-none");
        }
        inputElement.removeClass("validation-error");
      }
    }
  };

  const frameNumberInput = parentRow.find(".input-quantity-display[name='inventory_soKhung[]']");
  const engineNumberInput = parentRow.find(".input-detail-display[name='display_engine_number[]']");
  const shippingLiscenPlate = parentRow.find(".input-detail-display[name='display_shippingLicensePlate[]']");
  const senderName = parentRow.find(".input-detail-display[name='display_senderName[]']");
  const senderAddress = parentRow.find(".input-detail-display[name='display_senderAddress[]']");
  const senderTaxCode = parentRow.find(".input-detail-display[name='display_senderTaxCode[]']");
  const senderIdentifier = parentRow.find(".input-detail-display[name='display_senderIdentifier[]']");

  toggleInputState(frameNumberInput, isProductSelected);
  toggleInputState(engineNumberInput, isProductSelected);
  toggleInputState(shippingLiscenPlate, isProductSelected);
  toggleInputState(senderName, isProductSelected);
  toggleInputState(senderAddress, isProductSelected);
  toggleInputState(senderTaxCode, isProductSelected);
  toggleInputState(senderIdentifier, isProductSelected);
}
var searchTimeout;
function searchInfoProductInvoice(ob, lengthValue = 50) {
  var value = $(ob).val();
  var row = $('#inv_search_line').val(); //get so dong nhap vao
  var op = "invoice_searchpro";
  var box = $(ob).parents('tr').find(".prosku-searching-box");

  clearTimeout(searchTimeout);

  if (value.length >= 2 && value.length <= lengthValue) {
    searchTimeout = setTimeout(function () {
      $.ajax({
        type: "POST",
        url: "/ajax.php",
        dataType: "json",
        data: {
          op: op,
          value: value,
          row: row
        },
        success: function (res) {
          box.empty();
          if (res && res.success && res.data && res.data.length > 0) {
            var wrapper = $('<div style="position: absolute; z-index: 9999; min-width: 380px; width: max-content; margin-top: 4px; background: #ffffff; border-radius: 8px; border: 1px solid #e2e8f0; box-shadow: 0 20px 25px -5px rgba(0,0,0,0.1), 0 8px 10px -6px rgba(0,0,0,0.1); overflow: hidden;"></div>');

            // Header bar
            var header = '<div style="padding: 8px 14px; background: linear-gradient(135deg, #f0fdf4 0%, #ecfdf5 100%); border-bottom: 1px solid #d1fae5; display: flex; align-items: center; justify-content: space-between;">' +
              '<span style="color: #166534; font-size: 11px; font-weight: 600; letter-spacing: 0.5px; text-transform: uppercase;"><i class="ri-search-line" style="margin-right: 5px;"></i>Kết quả tìm kiếm</span>' +
              '<span style="background: #dcfce7; color: #166534; font-size: 10px; font-weight: 700; padding: 2px 8px; border-radius: 10px;">' + res.data.length + ' sản phẩm</span>' +
              '</div>';
            wrapper.append(header);

            var ul = $('<ul style="list-style:none; padding: 0; margin: 0; max-height: 280px; overflow-y: auto;"></ul>');

            res.data.forEach(function (item) {
              var skuHtml = item.sku ? '<span style="background: #f0fdf4; color: #166534; border: 1px solid #bbf7d0; padding: 1px 6px; border-radius: 3px; font-size: 10px; font-weight: 600; white-space: nowrap; margin-left: auto;">SKU: ' + item.sku + '</span>' : '';
              var seriesHtml = item.series ? '<span style="color: #94a3b8; font-size: 11px; margin-top: 2px;"><i class="ri-hashtag" style="font-size: 10px;"></i> ' + item.series + '</span>' : '';

              var li = $('<li data-id="' + item.id + '" style="padding: 9px 14px; border-bottom: 1px solid #f1f5f9; cursor: pointer; transition: all 0.15s ease; background: #ffffff; border-left: 3px solid transparent;"></li>');

              var html = '<div style="display: flex; align-items: center; gap: 10px;">' +
                '<div style="width: 30px; height: 30px; border-radius: 6px; background: #f1f5f9; display: flex; align-items: center; justify-content: center; flex-shrink: 0;"><i class="ri-box-3-line" style="color: #64748b; font-size: 14px;"></i></div>' +
                '<div style="flex: 1; min-width: 0; display: flex; flex-direction: column;">' +
                '<div style="display: flex; align-items: center; gap: 6px;">' +
                '<span style="color: #1e293b; font-size: 13px; font-weight: 500; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; max-width: 220px;">' + item.name + '</span>' +
                skuHtml +
                '</div>' +
                seriesHtml +
                '</div>' +
                '</div>';

              li.html(html);

              li.on('mouseenter', function () {
                $(this).css({ 'background': '#f8fafc', 'border-left-color': 'var(--primary-color)' });
              });
              li.on('mouseleave', function () {
                $(this).css({ 'background': '#ffffff', 'border-left-color': 'transparent' });
              });
              li.on('click', function () { clickSearchProInvoice(this); });

              ul.append(li);
            });

            wrapper.append(ul);
            box.append(wrapper);
            box.show();
          } else {
            box.html('<div style="position: absolute; z-index: 9999; min-width: 380px; width: max-content; margin-top: 4px; background: #ffffff; border-radius: 8px; border: 1px solid #e2e8f0; box-shadow: 0 20px 25px -5px rgba(0,0,0,0.1), 0 8px 10px -6px rgba(0,0,0,0.1); overflow: hidden;">' +
              '<div style="padding: 8px 14px; background: linear-gradient(135deg, #f0fdf4 0%, #ecfdf5 100%); border-bottom: 1px solid #d1fae5;"><span style="color: #166534; font-size: 11px; font-weight: 600; letter-spacing: 0.5px; text-transform: uppercase;"><i class="ri-search-line" style="margin-right: 5px;"></i>Kết quả tìm kiếm</span></div>' +
              '<div style="padding: 30px 16px; text-align: center;"><i class="ri-inbox-line" style="font-size: 36px; color: #cbd5e1; display: block; margin-bottom: 8px;"></i><span style="color: #94a3b8; font-size: 12px;">Không tìm thấy sản phẩm nào</span></div>' +
              '</div>');
            box.show();
          }
        },
        error: function () {
          box.hide();
        }
      });
    }, 500);
  } else {
    box.hide();
    box.empty();
  }
  checkLengthInput(ob, lengthValue);
}

function searchStaffOutput() {
  var op = "inventory_searchstaff_output";
  var value = $("#sales_person").val();
  var box = $("#staff-searching-box");

  if (value.length >= 2) {
    $.ajax({
      type: "POST",
      url: "/ajax.php",
      dataType: "json",
      data: {
        op: op,
        value: value,
      },
      success: function (res) {
        box.empty();
        if (res && res.success && res.data && res.data.length > 0) {
          var ul = $('<ul style="list-style:none; padding: 0; margin: 0; background-color: #ffffff;"></ul>');
          res.data.forEach(function (item) {
            var initials = item.fullname ? item.fullname.charAt(0).toUpperCase() : 'N';
            var avatar = '<div style="width: 36px; height: 36px; border-radius: 50%; background: linear-gradient(135deg, #e0f2fe 0%, #bae6fd 100%); color: #0369a1; display: flex; align-items: center; justify-content: center; font-weight: 700; font-size: 15px; margin-right: 12px; flex-shrink: 0; box-shadow: 0 2px 4px rgba(0,0,0,0.05);">' + initials + '</div>';

            var details = '<div style="flex: 1; min-width: 0;">' +
              '<div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 4px;">' +
              '<strong style="color: #1e293b; font-size: 14px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; font-weight: 600;">' + item.fullname + '</strong>' +
              (item.tel ? '<span style="background: #f1f5f9; color: #475569; padding: 2px 8px; border-radius: 12px; font-size: 11px; font-weight: 500; display: flex; align-items: center; gap: 4px;"><i class="ri-phone-fill" style="color: #94a3b8;"></i> ' + item.tel + '</span>' : '') +
              '</div>' +
              '<div style="color: #64748b; font-size: 12px; display: flex; align-items: center; gap: 6px;">' +
              '<i class="ri-user-star-line" style="font-size: 14px; color: #94a3b8;"></i> ' + (item.username ? item.username : '<span style="color: #cbd5e1; font-style: italic;">Chưa có TĐN</span>') +
              '</div>' +
              '</div>';

            var li = $('<li style="padding: 10px 14px; border-bottom: 1px solid #f1f5f9; cursor: pointer; display: flex; align-items: center; transition: all 0.2s ease; background-color: #ffffff;"></li>');

            li.html(avatar + details);

            li.on('mouseover', function () { $(this).css('background-color', '#f8fafc'); });
            li.on('mouseout', function () { $(this).css('background-color', '#ffffff'); });

            li.on('click', function () {
              $("#hidden_sales_person").val(item.id || '');
              $("#sales_person").val(item.fullname || '');
              box.hide();
            });
            ul.append(li);
          });
          box.append(ul);
          box.show();
        } else {
          box.html('<div style="padding: 15px; text-align: center; color: #64748b;"><i class="ri-file-search-line" style="font-size: 24px; display: block; margin-bottom: 5px; color: #cbd5e1;"></i> Không tìm thấy nhân viên nào</div>');
          box.show();
        }
      },
      error: function () {
        box.hide();
      }
    });
  } else {
    box.hide();
  }
}

function searchInfoCusOutput() {
  var op = "inventory_searchcus_output";
  var value = $("#info_timnhanh").val();
  var box = $("#cus-searching-box");

  if (value.length >= 3) {
    $.ajax({
      type: "POST",
      url: "/ajax.php",
      dataType: "json",
      data: {
        op: op,
        value: value,
      },
      success: function (res) {
        box.empty();
        if (res && res.success && res.data && res.data.length > 0) {
          var ul = $('<ul style="list-style:none; padding: 0; margin: 0; background-color: #ffffff;"></ul>');
          res.data.forEach(function (item) {
            var displayTitle = item.tendonvi || item.tennguoimua;
            var mstBadge = item.masothue ? ('<span style="background: #f0fdf4; color: #166534; border: 1px solid #bbf7d0; padding: 2px 6px; border-radius: 4px; font-size: 11px; font-weight: 600; margin-left: 8px;"><i class="ri-article-line"></i> MST: ' + item.masothue + '</span>') : '';
            var buyerIcon = item.tennguoimua ? ('<span style="color: #64748b; font-size: 13px; display: flex; align-items: center; gap: 4px; margin-top: 4px;"><i class="ri-user-line" style="font-size: 14px;"></i> Người mua: ' + item.tennguoimua + '</span>') : '';

            var li = $('<li style="padding: 12px 16px; border-bottom: 1px solid #f8fafc; cursor: pointer; transition: all 0.2s ease; background-color: #ffffff;"></li>');

            li.html('<div style="display: flex; flex-direction: column;">' +
              '<strong style="color: #0f172a; font-size: 14px; display: flex; align-items: center; flex-wrap: wrap;">' +
              '<i class="ri-building-4-line" style="color: var(--primary-color); margin-right: 6px; font-size: 15px;"></i> ' + displayTitle + mstBadge +
              '</strong>' +
              buyerIcon +
              '</div>');

            li.on('mouseover', function () { $(this).css('background-color', '#f8fafc'); });
            li.on('mouseout', function () { $(this).css('background-color', '#ffffff'); });

            li.on('click', function () {
              $("#id_customer").val(item.id || '');
              $("#masothue").val(item.masothue || '').attr("value", item.masothue || '');
              $("#madonvi").val(item.madonvi || '');
              $("#tennguoimua").val(item.tennguoimua || '');
              $("#tendonvi").val(item.tendonvi || '');
              $("#diachi").val(item.diachi || '');
              $("#email").val(item.email || '');
              $("#info_timnhanh").val(item.tendonvi ? item.tendonvi : item.tennguoimua);
              box.hide();
            });
            ul.append(li);
          });
          box.append(ul);
          box.show();
        } else {
          box.html('<div style="padding: 16px; color: #64748b; text-align: center; font-size: 13px; background-color: #ffffff;"><i class="ri-file-search-line" style="font-size: 24px; color: #cbd5e1; display: block; margin-bottom: 8px;"></i>' + (res.message || 'Không tìm thấy khách hàng nào.') + '</div>');
          box.show();
        }
      },
      error: function () {
        box.html('<div style="padding: 16px; color: #ef4444; text-align: center; font-size: 13px; background-color: #ffffff;"><i class="ri-error-warning-line" style="font-size: 24px; display: block; margin-bottom: 8px;"></i>Lỗi kết nối hoặc lỗi server.</div>');
        box.show();
      }
    });
  } else {
    box.hide();
  }
}

function selectQuickCustomer(el) {
  var data = $(el).data('info');
  if (data) {
    if (typeof data === 'string') data = JSON.parse(data);
    $("#id_customer").val(data.id || '');
    $("#masothue").val(data.masothue || '');
    $("#masothue").attr("value", data.masothue || '');
    $("#madonvi").val(data.madonvi || '');
    $("#tennguoimua").val(data.tennguoimua || '');
    $("#tendonvi").val(data.tendonvi || '');
    $("#diachi").val(data.diachi || '');
    $("#email").val(data.email || '');
    $("#info_timnhanh").val(data.tendonvi ? data.tendonvi : data.tennguoimua);
    $("#cus-searching-box").hide();
  }
}

$(document).mouseup(function (e) {
  var container = $("#group-buyer-search");
  if (container.length && !container.is(e.target) && container.has(e.target).length === 0) {
    $("#cus-searching-box").hide();
  }
});

function clickSearchProInvoice(nv) {
  var idPro = $(nv).data("id");
  $(".prosku-searching-box").hide();

  var op = "invoice_getinfopro";
  $.ajax({
    type: "POST",
    url: "/ajax.php",
    dataType: "json",
    data: {
      op: op,
      idPro: idPro
    },
    success: function (data) {
      if (data["success"] == 1) {
        $(nv).parents("tr").find(".masku").val(data["proSkuCode"]);
        $(nv).parents("tr").find(".masku").attr("value", data["proSkuCode"]);

        $(nv).parents("tr").find(".mahang").val(data["proCode"]);
        $(nv).parents("tr").find(".mahang").attr("value", data["proCode"]);

        $(nv).parents("tr").find(".id_sp").val(data["id_pro"]);
        $(nv).parents("tr").find(".id_sp").attr("value", data["id_pro"]);

        $(nv).parents("tr").find(".tenhang").val(data["proName"]);
        $(nv).parents("tr").find(".tenhang").attr("value", data["proName"]);

        $(nv).parents("tr").find(".donvt1").val(data["nameUnit"]);
        $(nv).parents("tr").find(".donvt1").attr("value", data["nameUnit"]);
        if (data["unitId"]) {
          $(nv).parents("tr").find(".hidden_donvt_id").val(data["unitId"]);
        }

        $(nv).parents("tr").find(".soluong").val(1);
        $(nv).parents("tr").find(".hidden_soluong").attr("value", 1);

        // Gán giá vào ô đơn giá rồi gọi hàm tính toán có sẵn
        $(nv).parents("tr").find(".dongia").val(data["proPrice"]);
        clickChangePriceOutPut($(nv).parents("tr").find(".dongia")[0]);

        // Gán thêm các thông tin phụ nếu có
        if (data["proIdWarehouse"]) {
          $(nv).parents("tr").find(".makho").val(data["proIdWarehouse"]);
        }
        if (data["proIdParcel"]) {
          $(nv).parents("tr").find(".solo").val(data["proIdParcel"]);
        }
        if (data["proDateExpiry"]) {
          $(nv).parents("tr").find(".hsd").val(data["proDateExpiry"]);
        }
        if (data["proNote"]) {
          $(nv).parents("tr").find(".ghichu").val(data["proNote"]);
        }
      }
    }
  });
}

function callTaxCodeAPI() {
  debugger;
  const taxCodeInput = document.getElementById("masothue");
  const isCheckTax = taxCodeInput ? taxCodeInput.value.trim() : '';
  if (!isCheckTax) {
    showGlobalDialog("Vui lòng nhập MST để tra cứu", "info");
    if (taxCodeInput) {
      taxCodeInput.focus();
    }
    return;
  }
  $.ajax({
    type: "POST",
    url: "/ajax.php",
    dataType: "json",
    data: {
      op: 'getinfotax',
      taxCode: isCheckTax,
    },
    success: function (response) {
      console.log(response);
      if (response.success == true) {
        const dataCompany = response.data;
        $('input#tendonvi').val(dataCompany['ten_cong_ty']);
        $('input#tendonvi').attr('value', dataCompany['ten_cong_ty']);
        $('input#diachi').val(dataCompany['dia_chi']);
        $('input#diachi').attr('value', dataCompany['dia_chi']);
        $('input#masothue1').val(dataCompany['mst']);
        $('input#masothue1').attr('value', dataCompany['mst']);
      } else {
        let errorMessage = response.message || "\u0110\u00e3 x\u1ea3y ra l\u1ed7i khi tra c\u1ee9u";
        showGlobalDialog(errorMessage, "error");
      }
    },
    error: function (jQxhr, textStatus, errorThrown) {
      console.error("L\u1ed7i khi g\u1ecdi API tra c\u1ee9u MST: ", textStatus, errorThrown);
      showGlobalDialog("Đã xảy ra lỗi khi tra cứu mã số thuế. Vui lòng thử lại sau.", "error");
    }

  });

}
function validateInputData(inputElement) {
  debugger;
  if ($(inputElement).prop('disabled')) {
    const $validationMessageContainer = $(inputElement).siblings(".validation-message");
    $(inputElement).removeClass("validation-error");
    if ($validationMessageContainer.length) {
      $validationMessageContainer.addClass("d-none");
      $validationMessageContainer.find(".error-tooltip-icon").attr("title", "");
      $validationMessageContainer.find(".message-text").text("");
    }
    return true;
  }

  const $input = $(inputElement);
  const inputValue = $input.val().trim();
  const inputName = $input.attr('name');

  const $validationMessageContainer = $input.siblings(".validation-message");
  const $messageTextElement = $validationMessageContainer.find(".message-text");
  const $errorTooltipIcon = $validationMessageContainer.find(".error-tooltip-icon");

  $input.removeClass("validation-error");
  $validationMessageContainer.addClass("d-none");
  $messageTextElement.text("");
  $errorTooltipIcon.attr("title", "").hide();

  let isValid = true;
  let errorMessage = "";

  switch (inputName) {
    case 'inventory_soKhung[]':
      const minFrameLen = 6;
      const maxFrameLen = 50;
      const alphanumericRegex = /^[a-zA-Z0-9*]+$/;

      if (inputValue.length === 0) {
        errorMessage = "S\u1ed1 khung kh\u00f4ng \u0111\u01b0\u1ee3c \u0111\u1ec3 tr\u1ed1ng.";
        isValid = false;
      } else if (inputValue.length < minFrameLen || inputValue.length > maxFrameLen) {
        errorMessage = `S\u1ed1 khung ph\u1ea3i c\u00f3 t\u1eeb ${minFrameLen} \u0111\u1ebfn ${maxFrameLen} k\u00fd t\u1ef1.`;
        isValid = false;
      } else if (!alphanumericRegex.test(inputValue)) {
        errorMessage = "S\u1ed1 khung ch\u1ec9 \u0111\u01b0\u1ee3c ch\u1ee9a ch\u1eef c\u00e1i v\u00e0 s\u1ed1.";
        isValid = false;
      }
      break;

    case 'display_engine_number[]':
      const minEngineLen = 4;
      const maxEngineLen = 50;

      if (inputValue.length === 0) {
        errorMessage = "S\u1ed1 m\u00e1y kh\u00f4ng \u0111\u01b0\u1ee3c \u0111\u1ec3 tr\u1ed1ng.";
        isValid = false;
      } else if (inputValue.length < minEngineLen || inputValue.length > maxEngineLen) {
        errorMessage = `S\u1ed1 m\u00e1y ph\u1ea3i c\u00f3 t\u1eeb ${minEngineLen} \u0111\u1ebfn ${maxEngineLen} k\u00fd t\u1ef1.`;
        isValid = false;
      }
      break;

    case 'display_shippingLicensePlate[]':

      if (inputValue.length === 0) {
        errorMessage = "Bi\u1ec3n ki\u1ec3m so\u00e1t kh\u00f4ng \u0111\u01b0\u1ee3c \u0111\u1ec3 tr\u1ed1ng.";
        isValid = false;
      } else if (inputValue.length < 5 || inputValue.length > 50) {
        errorMessage = `Bi\u1ec3n ki\u1ec3m so\u00e1t ph\u1ea3i c\u00f3 t\u1eeb 5 \u0111\u1ebfn 15 k\u00fd t\u1ef1.`;
        isValid = false;
      }
      break;

    case 'display_senderName[]':
      if (inputValue.length === 0) {
        errorMessage = "T\u00ean ng\u01b0\u1eddi g\u1eedi kh\u00f4ng \u0111\u01b0\u1ee3c \u0111\u1ec3 tr\u1ed1ng.";
        isValid = false;
      } else if (inputValue.length > 100) {
        errorMessage = "T\u00ean ng\u01b0\u1eddi g\u1eedi kh\u00f4ng qu\u00e1 100 k\u00fd t\u1ef1.";
        isValid = false;
      }
      break;

    case 'display_senderAddress[]':
      if (inputValue.length === 0) {
        errorMessage = "\u0110\u1ecba ch\u1ec9 ng\u01b0\u1eddi g\u1eedi kh\u00f4ng \u0111\u01b0\u1ee3c \u0111\u1ec3 tr\u1ed1ng.";
        isValid = false;
      } else if (inputValue.length > 200) {
        errorMessage = "\u0110\u1ecba ch\u1ec9 ng\u01b0\u1eddi g\u1eedi kh\u00f4ng qu\u00e1 200 k\u00fd t\u1ef1.";
        isValid = false;
      }
      break;

    case 'display_senderTaxCode[]':
      if (inputValue.length === 0) {
        errorMessage = "M\u00e3 s\u1ed1 thu\u1ebf ng\u01b0\u1eddi g\u1eedi kh\u00f4ng \u0111\u01b0\u1ee3c \u0111\u1ec3 tr\u1ed1ng.";
        isValid = false;
      } else if (inputValue.length != 12 && inputValue.length != 10 && inputValue.length != 14) {
        errorMessage = "M\u00e3 s\u1ed1 thu\u1ebf ng\u01b0\u1eddi g\u1eedi kh\u00f4ng h\u1ee3p l\u1ec7.";
        isValid = false;
      }
      break;

    case 'display_senderIdentifier[]':
      if (inputValue.length === 0) {
        errorMessage = "Mã định danh không được để trống.";
        isValid = false;
      }
      break;

    default:
      break;
  }

  // --- Ăp dá»¥ng tráº¡ng thĂ¡i lá»—i náº¿u khĂ´ng há»£p lá»‡ ---
  if (!isValid) {
    $input.addClass("validation-error");
    $errorTooltipIcon.attr("title", errorMessage).show(); // Hiá»ƒn thá»‹ icon vĂ  Ä‘áº·t title
    $validationMessageContainer.removeClass("d-none"); // Hiá»ƒn thá»‹ thĂ´ng bĂ¡o vÄƒn báº£n dÆ°á»›i
    $messageTextElement.text(errorMessage);
  }

  return isValid;
};

function checkLengthTypeInput(ob, lengthValue) {
  var value = $(ob).val();
  var ob1 = $(ob).parents()[0];
  var buttonSubmit = document.getElementById("buttonSubmit");

  if (value.length > lengthValue) {
    var textValue = "ThĂ´ng tin quĂ¡ dĂ i(>" + lengthValue + ")";
    $(ob1).find('.popuptext').addClass("show");
    $(ob1).find('.popuptext').text(textValue);
    buttonSubmit.disabled = true;
    return false;
  } else {
    $(ob1).find('.popuptext').removeClass("show");
    $(ob1).find('.popuptext').text("");
    buttonSubmit.disabled = false;

    return true;
  }
}
function clickChangeQuantityOutPut(ob) {
  var tenform = $("#tenform").val();
  var quantity = $(ob).parents("tr").find(".soluong").val();
  var ob1 = $(ob).parents()[0];
  results = checkNumber(quantity);
  var ab = $(".glyphicon-user").parents()[0];
  var abHTML = $(ab).html();
  var loai_dieuchinhValue = $("#loai_dieuchinh").val();

  //Cho phĂ©p nháº­p sá»‘ Ă¢m Ä‘Æ¡n giĂ¡, sá»‘ lÆ°á»£ng, thĂ nh tiá»n Ä‘á»‘i vá»›i hĂ³a Ä‘Æ¡n Ä‘iá»u chá»‰nh, thĂªm má»›i hĂ³a Ä‘Æ¡n
  if (
    loai_dieuchinhValue ||
    window.location.href.includes("op=newinvoice&act=new&mod=add") == true ||
    window.location.href.includes("op=newinvoice&act=new&mod=edit")
  ) {
    results[1] = "positive";
  }

  if (results[0] == false || results[1] == "negative") {
    $(ob1).find(".error_message").removeClass("d-none");
    $(ob1).find(".error_text").text("S\u1ed1 kh\u00f4ng h\u1ee3p l\u1ec7!");
  } else {
    $(ob1).find(".error_message").addClass("d-none");
    $(ob1).find(".error_text").text("");
    var arrayQuantity = formatSoLuong(quantity);
    var quantityShow = arrayQuantity[0] === 0 ? "" : arrayQuantity[0];
    var quantityHidden = arrayQuantity[1] === 0 ? "" : arrayQuantity[1];
    var priceHidden = $(ob).parents("tr").find(".hidden_dongia").val();
    var amounttimesprice = quantityHidden * Number(priceHidden);
    var arrayamounttimesprice = formatThanhTien(amounttimesprice, 2);
    $(ob)
      .parents("tr")
      .find(".dongianhansoluong")
      .attr("value", arrayamounttimesprice[0]);
    $(ob)
      .parents("tr")
      .find(".dongianhansoluong")
      .val(arrayamounttimesprice[0]);
    $(ob)
      .parents("tr")
      .find(".hidden_dongianhansoluong")
      .attr("value", arrayamounttimesprice[1]);
    $(ob)
      .parents("tr")
      .find(".hidden_dongianhansoluong")
      .val(arrayamounttimesprice[1]);
    $(ob).parents("tr").find(".soluong").val(quantityShow);
    $(ob).parents("tr").find(".soluong").attr("value", quantityShow);
    $(ob).parents("tr").find(".hidden_soluong").attr("value", quantityHidden);
    $(ob).parents("tr").find(".hidden_soluong").val(quantityHidden);
    // console.log(quantityShow, quantityHidden);
    calcuPriceVat(ob);
    calcuThueGTGT(ob);
    calcuIntoMoney(ob);

    calcuTotalAmountOutPut();

    calcuTotalVat();
    calcuTotalPayment();
    writeMoney3();

    calcuIntoMoneyGTGT(ob);
    calcuTotalAmountVatOutPut();
    writeMoneyVAT();

    // add invoice new
    clickChangeServiceCharge();
  }
}
function clickChangePriceOutPut(ob) {
  var tenform = $("#tenform").val();
  console.log(tenform);
  var price = $(ob).parents("tr").find(".dongia").val();
  var ob1 = $(ob).parents()[0];
  results = checkNumber(price);

  var ab = $(".glyphicon-user").parents()[0];
  var abHTML = $(ab).html();

  var loai_dieuchinhValue = $("#loai_dieuchinh").val();
  if (
    loai_dieuchinhValue ||
    window.location.href.includes("op=newinvoice&act=new&mod=add") == true ||
    window.location.href.includes("op=newinvoice&act=new&mod=edit") == true
  ) {
    results[1] = "positive";
  }

  if (results[0] == false || results[1] == "negative") {
    $(ob1).find(".error_message").removeClass("d-none");
    $(ob1).find(".error_text").text("S\u1ed1 kh\u00f4ng h\u1ee3p l\u1ec7!");
  } else {
    $(ob1).find(".error_message").addClass("d-none");
    $(ob1).find(".error_text").text("");

    var arrayPrice = formatDonGia(price);
    var priceShow = arrayPrice[0] === 0 ? "" : arrayPrice[0];
    var priceHidden = arrayPrice[1] === 0 ? "" : arrayPrice[1];
    $(ob).parents("tr").find(".dongia").val(priceShow);
    $(ob).parents("tr").find(".dongia").attr("value", priceShow);
    $(ob).parents("tr").find(".hidden_dongia").val(priceHidden);
    $(ob).parents("tr").find(".hidden_dongia").attr("value", priceHidden);
    var soluong = $(ob).parents("tr").find(".hidden_soluong").val();
    if (!soluong) {
      var soluong = 1;
    }
    var amounttimesprice = soluong * Number(priceHidden);
    var arrayamounttimesprice = formatThanhTien(amounttimesprice, 2);
    console.log("dongianhanthanhtien", arrayamounttimesprice);
    $(ob)
      .parents("tr")
      .find(".dongianhansoluong")
      .attr("value", arrayamounttimesprice[0]);
    $(ob)
      .parents("tr")
      .find(".dongianhansoluong")
      .val(arrayamounttimesprice[0]);
    $(ob)
      .parents("tr")
      .find(".hidden_dongianhansoluong")
      .attr("value", arrayamounttimesprice[1]);
    $(ob)
      .parents("tr")
      .find(".hidden_dongianhansoluong")
      .val(arrayamounttimesprice[1]);
    calcuPriceVat(ob);
    calcuThueGTGT(ob);
    calcuIntoMoney(ob);

    calcuTotalAmountOutPut();

    calcuTotalVat();
    calcuTotalPayment();
    writeMoney3();
    calcuIntoMoneyGTGT(ob);
    calcuTotalAmountVatOutPut();
    writeMoneyVAT();

    // add invoice new
    clickChangeServiceCharge();
  }
}
function clickChangeTotalMoneyNoVat(ob) {
  debugger;
  var totalMoneyNoVat = $(ob).val().replaceAll(".", "").replaceAll(",", "");
  console.log("test 1", totalMoneyNoVat);
  let totalMoneyNoVatFormat = formatDonGia(totalMoneyNoVat, 0);
  console.log("format", totalMoneyNoVatFormat);
  $(ob).val(totalMoneyNoVatFormat[0]);
  let vat = $(ob).parents("tr").find(".show_GTGT").val();
  let thanhTienNoVatFormat = 0;
  let thueGTGTFormat = 0;
  if (
    !vat ||
    vat == "" ||
    vat == "Null" ||
    vat == "KTT" ||
    vat == "KKKNT" ||
    vat == "KCT" ||
    vat == "KhĂ´ng kĂª khai, tĂ­nh ná»™p thuáº¿ GTGT" ||
    vat == "KhĂ´ng thay Ä‘á»•i thuáº¿ xuáº¥t" ||
    vat == "KhĂ´ng chá»‹u thuáº¿"
  ) {
    thanhTienNoVatFormat = formatDonGia(Number(totalMoneyNoVat), 2);
    thueGTGTFormat = formatDonGia(0, 2);
  } else {
    thanhTienNoVatFormat = formatDonGia(
      Number(totalMoneyNoVat) + Number((totalMoneyNoVat * vat) / 100),
      2
    );
    thueGTGTFormat = formatDonGia(Number((totalMoneyNoVat * vat) / 100), 2);
  }
  $(ob).parents("tr").find(".thueGTGT").val(thueGTGTFormat[0]);
  $(ob).parents("tr").find(".hidden_thueGTGT").val(thueGTGTFormat[1]);
  $(ob).parents("tr").find(".thanhtienGTGT").val(thanhTienNoVatFormat[0]);
  $(ob).parents("tr").find(".hidden_thanhtien").val(totalMoneyNoVatFormat[0]);
  $(ob)
    .parents("tr")
    .find(".hidden_thanhtienGTGT")
    .val(thanhTienNoVatFormat[1]);
  $(ob).parents("tr").find(".hidden_thanhtien").val(totalMoneyNoVatFormat[1]);
  $(ob).parents("tr").find(".thanhtien").val(totalMoneyNoVatFormat[0]);
  $(ob)
    .parents("tr")
    .find(".thanhtien")
    .attr("value", totalMoneyNoVatFormat[0]);
  $(ob).parents("tr").find(".hidden_dongianhansoluong").val(totalMoneyNoVat);
  calcuTotalAmountVatOutPut();
  writeMoneyVAT();
  calcuTotalAmountOutPut();
}
function clickChangePriceVat(ob) {

  var tenform = $("#tenform").val();
  var priceVat = $(ob).parents("tr").find(".dongiavat").val();

  var ob1 = $(ob).parents()[0];
  results = checkNumber(priceVat);
  if (results[0] == false || results[1] == "negative") {
    $(ob1).find(".error_message").removeClass("d-none");
    $(ob1).find(".error_text").text("S\u1ed1 kh\u00f4ng h\u1ee3p l\u1ec7!");
  } else {
    $(ob1).find(".error_message").addClass("d-none");
    $(ob1).find(".error_text").text("");

    var arrayPriceVat = formatDonGia(priceVat);
    var priceVatShow = arrayPriceVat[0];
    var priceVatHidden = arrayPriceVat[1];

    $(ob).parents("tr").find(".dongiavat").val(priceVatShow);
    $(ob).parents("tr").find(".hidden_dongiavat").attr("value", priceVatHidden);
    calcuPrice(ob);
    calcuIntoMoney(ob);
    calcuTotalAmountOutPut();
    clickChangePriceOutPut(ob);
    writeMoney3();
    calcuTotalAmountVatOutPut();
    writeMoneyVAT();
  }
}
function clickChangeGTGTOutPut(ob) {
  debugger;
  let soluong = $(ob).parents("tr").find(".soluong").val();
  let dongia = $(ob).parents("tr").find(".dongia").val();
  if (soluong == "" && dongia == "") {
    clickChangeTotalMoneyNoVat(
      $(ob).parents("tr").find(".hidden_dongianhansoluong")
    );
  } else {
    var GTGT = $(ob).val();
    // console.log(ob);
    $(ob).parents("tr").find(".GTGT").val(GTGT);
    $(ob).parents("tr").find(".hidden_GTGT").attr("value", GTGT);
    calcuPriceVat(ob);
    calcuThueGTGT(ob);
    calcuIntoMoneyGTGT(ob);
    calcuTotalPayment();
    calcuTotalAmountOutPut();
    calcuTotalAmountVatOutPut();
    writeMoneyVAT();

  }
}
function clickChangeGTGTOutPutEditPriceGTGT(ob) {
  var currency = $("#hidden_currency").val()
    ? $("#hidden_currency").val()
    : "VND";
  var GTGT = $(ob).val();
  var priceHidden = $(ob).parents("tr").find(".hidden_dongia").val();
  var soluong = $(ob).parents("tr").find(".hidden_soluong").val();
  var vat = $("#phantram_thuesuat").val();
  if ($("phantram_thuesuat").length) {
    var vat = 0;
  }
  if (vat == "Null") {
    var vat = $(ob).parents("tr").find(".hidden_GTGT").val();
  }
  if (
    !vat ||
    vat == "" ||
    vat == "Null" ||
    vat == "KTT" ||
    vat == "KKKNT" ||
    vat == "KCT" ||
    vat == "KhĂ´ng kĂª khai, tĂ­nh ná»™p thuáº¿ GTGT" ||
    vat == "KhĂ´ng thay Ä‘á»•i thuáº¿ xuáº¥t" ||
    vat == "KhĂ´ng chá»‹u thuáº¿"
  ) {
    var vat = 0;
  }

  if (
    window.location.href.includes("flag=repair") == true ||
    window.location.href.includes("op=newinvoice&act=replace&mod=add") ==
    true ||
    window.location.href.includes("op=newinvoice&act=new&mod=add") == true ||
    window.location.href.includes("op=newinvoice&act=new&mod=edit") == true
  ) {
    var arrayThueGTGT = formatThanhTien(String(GTGT));
    var thueGTGTShow = arrayThueGTGT[0];
    var thueGTGTHidden = arrayThueGTGT[1];
    $(ob).parents("tr").find(".thueGTGT").attr("value", thueGTGTShow);
    $(ob).parents("tr").find(".thueGTGT").val(thueGTGTShow);
    $(ob).parents("tr").find(".hidden_thueGTGT").attr("value", thueGTGTHidden);

    $(ob).parents("tr").find(".thueGTGT").attr("value", thueGTGTShow);
    $(ob).parents("tr").find(".thueGTGT").val(thueGTGTShow);
    $(ob).parents("tr").find(".hidden_thueGTGT").attr("value", thueGTGTHidden);

    var thanhtiendongianhansoluong = $(ob)
      .parents("tr")
      .find(".hidden_dongianhansoluong")
      .val();
    var hidden_dongiavat = $(ob)
      .parents("tr")
      .find(".hidden_dongiavat")
      .val();
    var priceMaxGtgtConfig = $("#priceMaxGtgtConfig").val();
    var priceMinGtgtConfig = $("#priceMinGtgtConfig").val();

    if (!soluong) {
      var soluong = 1;
    }
    if (currency == "USD") {
      var thueGTGTPrice = (soluong * priceHidden * vat) / 100;
    } else {
      var thueGTGTPrice = Math.round((soluong * priceHidden * vat) / 100);
    }

    var maxPriceGTGT = Number(thueGTGTPrice) + Number(priceMaxGtgtConfig);
    var minPriceGTGT = Number(thueGTGTPrice) - Number(priceMinGtgtConfig);
    if (Number(thueGTGTHidden) > Number(maxPriceGTGT)) {
      calcuThueGTGT(ob);
    } else if (Number(thueGTGTHidden) < Number(minPriceGTGT)) {
      calcuThueGTGT(ob);
    } else {
      var amountGTGTShow =
        Number(thanhtiendongianhansoluong) + Number(thueGTGTHidden);
      var arrayAmountGTGT = formatThanhTien(String(amountGTGTShow), 2);
      var amountGTGTShow = arrayAmountGTGT[0];
      var amountGTGTHidden = arrayAmountGTGT[1];
      $(ob).parents("tr").find(".thanhtienGTGT").val(amountGTGTShow);
      $(ob)
        .parents("tr")
        .find(".hidden_thanhtienGTGT")
        .attr("value", amountGTGTHidden);
    }

    calcuTotalAmountVatOutPut();
    writeMoneyVAT();
  } else {
    var arrayThueGTGT = formatThanhTien(String($(ob).val()), 2);
    var thueGTGTShow = arrayThueGTGT[0];
    var thueGTGTHidden = arrayThueGTGT[1];
    $(ob).parents("tr").find(".thueGTGT").attr("value", thueGTGTShow);
    $(ob).parents("tr").find(".thueGTGT").val(thueGTGTShow);
    $(ob).parents("tr").find(".hidden_thueGTGT").attr("value", thueGTGTHidden);

  }
}
function clickChangeIntoMoneyOutPut(ob) {
  var tenform = $("#tenform").val();
  var obNameValue = $(ob).attr("class");
  var intomoney = $(ob).val();
  var ob1 = $(ob).parents()[0];
  results = checkNumber(intomoney);

  var ab = $(".glyphicon-user").parents()[0];
  var abHTML = $(ab).html();

  var loai_dieuchinhValue = $("#loai_dieuchinh").val();
  if (
    loai_dieuchinhValue ||
    window.location.href.includes("op=newinvoice&act=new&mod=add")
  ) {
    results[1] = "positive";
  }

  if (results[0] == false || results[1] == "negative") {
    $(ob1).find(".error_message").removeClass("d-none");
    $(ob1).find(".error_text").text("S\u1ed1 kh\u00f4ng h\u1ee3p l\u1ec7!");
  } else {
    $(ob1).find(".error_message").addClass("d-none");
    $(ob1).find(".error_text").text("");

    var arrayIntoMoney = formatThanhTien(intomoney);
    var intoMoneyShow = arrayIntoMoney[0] === 0 ? "" : arrayIntoMoney[0];
    var intoMoneyHidden = arrayIntoMoney[1] === 0 ? "" : arrayIntoMoney[1];

    var resulCheckClass = obNameValue.includes("thanhtienGTGT");
    if (resulCheckClass) {
      $(ob).parents("tr").find(".thanhtienGTGT").val(intoMoneyShow);
      $(ob)
        .parents("tr")
        .find(".hidden_thanhtienGTGT")
        .attr("value", intoMoneyHidden);
    } else {
      $(ob).parents("tr").find(".thanhtien").val(intoMoneyShow);
      $(ob)
        .parents("tr")
        .find(".hidden_thanhtien")
        .attr("value", intoMoneyHidden);
    }

    calcuTotalAmountOutPut();
    calcuTotalVat();
    calcuTotalPayment();
    writeMoney3();

    calcuTotalAmountVatOutPut();
    writeMoneyVAT();
    // add invoice new
    clickChangeServiceCharge();
  }
}
function clickdvt(cg) {

  var op = "changedvt";
  $.ajax({
    type: "POST",
    url: "/ajax.php",
    data: {
      op: op
    },
    success: function (data) {
      $(cg).parent().find(".load-dvt").show();
      $(cg).parent().find(".load-dvt").html(data);

    }
  });
}
function dateCalculation1() {
  var ngayduocno = $("#debit_term").val();
  var flag = true;

  if (ngayduocno == "" || isNaN(parseInt(ngayduocno)) == true) {
    ngayduocno = 0;
    $("#show_hanthanhtoan").val("");
    $("#show_hanthanhtoan").attr("value", "");
    $("#hidden_hanthanhtoan").attr("value", "");
    return flag;
  }

  if (parseInt(ngayduocno) < 0) {
    ngayduocno = 0;
    $(".edateaddinventory").addClass("bf");
    $(".edateaddinventory").text("Số ngày được nợ phải lớn hơn hoặc bằng 0.");
    flag = false;
  } else {
    $(".edateaddinventory").removeClass("bf");
    $(".edateaddinventory").text("");

    // Tráº£ dá»¯ liá»‡u cho háº¡n thanh toĂ¡n
    var ngayhoadon = $("#show_ngayhoadon").val();
    var date = Date.parse(formatNgay(ngayhoadon)[0]);
    date = addDays(date, parseInt(ngayduocno));
    // console.log(ngayhoadon,ngayduocno,date);

    var day = date.getDate();
    var month = date.getMonth() + 1;
    var year = date.getFullYear();

    var lengthday = day.toLocaleString().length;
    var lengthmonth = month.toLocaleString().length;
    if (lengthday == 1) {
      day = "0" + day;
    }
    if (lengthmonth == 1) {
      month = "0" + month;
    }

    var ngaythanhtoan = day + "-" + month + "-" + year;
    var ngaythanhtoan = formatNgay(ngaythanhtoan)[1];
    $("#payment_term").val(ngaythanhtoan);
    $("#payment_term").attr("value", ngaythanhtoan);
    flag = true;
  }

  return flag;
}
function dateCalculation2() {
  var payment_term = $("#payment_term").val();
  payment_term = formatNgay(payment_term)[1];

  var ob = $("#payment_term");

  var ob1 = $(ob).parents()[1];
  if (payment_term != -1) {
    $(ob).val(payment_term);
    $(ob).attr("value", payment_term);
    $(ob1).next().find(".edatenew").removeClass("bf");
    $(ob1).next().find(".edatenew").text("");

    $("#payment_term").val(payment_term);
    $("#payment_term").attr("value", payment_term);
    // console.log(parseInt(payment_term));
    var payment_term = payment_term.replace(/-/g, "/"); // Format ngĂ y hĂ³a Ä‘Æ¡n 01/10/1997
    var payment_term = parseDate(payment_term, formatDate);

    var ngayhoadon = $("#show_ngayhoadon").val();
    var ngayhoadon = ngayhoadon.replace(/-/g, "/"); // Format ngĂ y hĂ³a Ä‘Æ¡n 01/10/1997
    var ngayhoadon = parseDate(ngayhoadon, formatDate);

    console.log(payment_term.getTime(), ngayhoadon.getTime());

    var flag = true;
    if (payment_term.getTime() < ngayhoadon.getTime()) {
      $(".edateaddinventory").addClass("bf");
      $(".edateaddinventory").text("Ngày thanh toán phải lớn hơn ngày hóa đơn");
      flag = false;
    } else {
      $(".edateaddinventory").removeClass("bf");
      $(".edateaddinventory").text("");
      var debit_term = (payment_term - ngayhoadon) / (1000 * 3600 * 24);
      $("#debit_term").val(debit_term);
      $("#debit_term").attr("value", debit_term);
    }
    return flag;
  } else {
    $(ob1).next().find(".edatenew").addClass("bf");
    $(ob1).next().find(".edatenew").text("NgĂ y chÆ°a há»£p lá»‡!");
  }
}
/**
 * InvoSync Project — formxuatban.js / invoice.js
 * Phiên bản tối ưu hóa cấu trúc & Sửa lỗi vận hành Production
 */

// =========================================================================
// 1. KHỞI TẠO HỆ THỐNG & ĐỒNG BỘ SỰ KIỆN GIAO DIỆN (Initialization & UI)
// =========================================================================
var counter = 1;
var counterht = 1;
var counterpro = 1;
var sttTBSS = 1;
var hasClickedSendRecord = false;
var imagebase64 = "";
var searchTimeout;

$(document).ready(function () {
  var formatDate = ($("#formatdate").val() == "/") ? "dd/mm/yy" : "dd-mm-yy";
  var currentYear = new Date().getFullYear();

  // Khởi tạo hiển thị tùy chọn cấu hình cột
  $(".option-view-details, .option-view-q-details, .option-view-g-details, .option-view-items-details, .option-view-info-contract-details, .option-view-info-contract-buy-details").hide();

  $("#view-option, #view-option-q, #view-option-g, #view-option-items, #view-option-info-contract, #view-option-info-contract-buy").click(function () {
    $(this).next().slideToggle();
  });

  // Khởi tạo các Datepicker hệ thống ẩn/hiện an toàn
  var datepickerConfigs = {
    dateFormat: formatDate,
    changeMonth: true,
    changeYear: true,
    yearRange: "2019:" + currentYear
  };

  $("#show_ngayhoadon, #show_hansudung1, #show_hanthanhtoan, #show_ngayGiaoNhanHang, #payment_term, #date_request, #date_delivery, .date_contract, .date_all, #date1, #date_expire, #ngaydieudong, #deliv_ngayHopDong, #hopdongkinhtengay").datepicker(datepickerConfigs);
  $("#show_ngaythucnhap, .hsd1, .datesearch").datepicker({ dateFormat: "dd-mm-yy", changeMonth: true, changeYear: true });

  // Trình chọn tháng tự động ẩn lịch ngày
  $(".month_all").datepicker({
    dateFormat: formatDate.slice(3, 8),
    changeMonth: true,
    changeYear: true,
    showButtonPanel: true,
    onClose: function (dateText, inst) {
      $(this).datepicker('setDate', new Date(inst.selectedYear, inst.selectedMonth, 1));
    }
  }).focus(function () {
    $(".ui-datepicker-calendar").hide();
  });

  if ($("#inp_warning").val() == 1) { $("#addpopupWarning").modal(); }

  // Sự kiện Click Body đóng các Box tìm kiếm nhanh
  $("body").click(function () {
    $(".prosku-searching-box, #cus-searching-box, #rec-searching-box, .load-vat, .load-dvt, .suggesstion-sp, .suggesstion-box").hide();
  });

  // Tooltip động cho ghi chú dòng hàng hóa
  $(document).on('input', '.item-note', function () { $(this).attr('title', $(this).val()); });
  $('.item-note').each(function () { $(this).attr('title', $(this).val()); });

  // Auto-Run đồng bộ phiên làm việc của hóa đơn dựa trên lịch cấu hình
  if (typeof limitInvoiceDate === 'function') { limitInvoiceDate(); }

  // Đồng bộ thời gian thực cho convert phiếu
  const today = new Date();
  const hour = String(today.getHours()).padStart(2, '0');
  const minute = String(today.getMinutes()).padStart(2, '0');
  $("#time_convert").val(`${hour}:${minute}`);
});

// =========================================================================
// 2. KHỐI ĐỊNH DẠNG SỐ VÀ TIỀN TỆ (Formatters — Đã sửa lỗi sập vì ép kiểu số âm)
// =========================================================================
function formatThanhTien(value = "", check = 1) {
  var lethanhtien = $("#lethanhtien").val() || 0;
  var storeId = $("#storeId").val();
  var currency = $("#hidden_currency").val() || "VND";
  var results = [0, 0];
  var isNegative = false;

  if (value !== "" && value !== null && value !== undefined) {
    var strVal = String(value).trim();
    isNegative = strVal.includes("-");
    value = strVal.replace("-", "");
  }

  if (value != "") {
    if (check == 1) {
      value = (currency == "VND") ? String(value).replace(/[.]/g, "") : String(value).replace(/[,]/g, "");
    }
    var inputComma = (currency == "VND") ? value.includes(",") : value.includes(".");

    if (inputComma) {
      let splitChar = (currency == "VND") ? "," : ".";
      let cleanChar = (currency == "VND") ? "." : ",";
      var decimalValue = value.substring(value.lastIndexOf(splitChar) + 1).replace(new RegExp('\\' + cleanChar, 'g'), "");
      var integerValue = value.slice(0, value.lastIndexOf(splitChar));
      var fm_intergerValue = parseInt(integerValue.replace(new RegExp('\\' + splitChar, 'g'), ""));
      value = fm_intergerValue + "." + decimalValue;
    }

    var fm_ValueHidden = (lethanhtien == 0 || lethanhtien == "") ? Math.round(Number(value)).toString() : parseFloat(Number(value)).toFixed(lethanhtien);
    var decimalValue = fm_ValueHidden.includes(".") ? fm_ValueHidden.substring(fm_ValueHidden.lastIndexOf(".") + 1) : 0;
    var integerValue = fm_ValueHidden.includes(".") ? fm_ValueHidden.slice(0, fm_ValueHidden.lastIndexOf(".")) : fm_ValueHidden;

    var regexChar = (currency == "VND") ? "." : ",";
    var fm_intergerValue = integerValue.toString().replace(/\B(?=(\d{3})+(?!\d))/g, regexChar);
    var fm_ValueShow = (currency == "VND") ? fm_intergerValue : fm_intergerValue + "." + decimalValue;

    if (storeId != 258 && parseFloat(decimalValue) == 0) { fm_ValueShow = fm_intergerValue; }

    var res_ShowValue = fm_ValueShow;
    var res_HiddenValue = fm_ValueHidden;
    if (isNegative && parseFloat(res_HiddenValue) !== 0) {
      res_ShowValue = "-" + res_ShowValue;
      res_HiddenValue = "-" + res_HiddenValue;
    }
    results = [res_ShowValue, res_HiddenValue];
  }
  return results;
}

function formatDonGia(value = '', check = 1) {
  var ledongia = $('#dongiachopheple').val() || $('#inven_ledongia').val() || 0;
  var currency = $('#hidden_currency').val() || "VND";
  var results = [0, 0];

  if (value !== "" && value !== null && value !== undefined) {
    value = String(value);
    if (check == 1) {
      value = (currency == "VND") ? value.replace(/[.]/g, '') : value.replace(/[,]/g, '');
    }
    var inputComma = (currency == "VND") ? value.includes(",") : value.includes(".");

    if (inputComma) {
      let splitChar = (currency == "VND") ? "," : ".";
      let cleanChar = (currency == "VND") ? "." : ",";
      var decimalValue = value.substring(value.lastIndexOf(splitChar) + 1).replace(new RegExp('\\' + cleanChar, 'g'), '');
      var integerValue = value.slice(0, value.lastIndexOf(splitChar));
      var fm_intergerValue = integerValue.replace(new RegExp('\\' + splitChar, 'g'), '');
      value = fm_intergerValue + '.' + decimalValue;
    }

    var fm_ValueHidden = (ledongia == 0) ? Math.round(Number(value)).toString() : parseFloat(Number(value)).toFixed(ledongia);
    var decimalValue = fm_ValueHidden.includes(".") ? fm_ValueHidden.substring(fm_ValueHidden.lastIndexOf(".") + 1) : 0;
    var integerValue = fm_ValueHidden.includes(".") ? fm_ValueHidden.slice(0, fm_ValueHidden.lastIndexOf(".")) : fm_ValueHidden;

    let repChar = (currency == "VND") ? "." : ",";
    var fm_intergerValue = integerValue.toString().replace(/\B(?=(\d{3})+(?!\d))/g, repChar);
    var fm_ValueShow = (ledongia == 0) ? fm_intergerValue : fm_intergerValue + (currency == "VND" ? ',' : '.') + decimalValue;

    results = [fm_ValueShow, fm_ValueHidden];
  }
  return results;
}

function formatSoLuong(value = '', check = 1) {
  var lesoluong = $("#soluongchopheple").val() || $("#inven_lesoluong").val() || 0;
  var currency = $("#hidden_currency").val() || "VND";
  var results = [0, 0];

  if (value !== "" && value !== null && value !== undefined) {
    value = String(value);
    if (check == 1) {
      value = (currency == "VND") ? value.replace(/[.]/g, "") : value.replace(/[,]/g, "");
    }
    var inputComma = (currency == "VND") ? value.includes(",") : value.includes(".");

    if (inputComma) {
      let splitChar = (currency == "VND") ? "," : ".";
      let cleanChar = (currency == "VND") ? "." : ",";
      var decimalValue = value.substring(value.lastIndexOf(splitChar) + 1).replace(new RegExp('\\' + cleanChar, 'g'), "");
      var integerValue = value.slice(0, value.lastIndexOf(splitChar));
      var fm_intergerValue = integerValue.replace(new RegExp('\\' + splitChar, 'g'), "");
      value = fm_intergerValue + "." + decimalValue;
    }

    var fm_ValueHidden = (lesoluong == 0) ? Math.round(Number(value)).toString() : parseFloat(Number(value)).toFixed(lesoluong);
    var decimalValue = fm_ValueHidden.includes(".") ? fm_ValueHidden.substring(fm_ValueHidden.lastIndexOf(".") + 1) : 0;
    var integerValue = fm_ValueHidden.includes(".") ? fm_ValueHidden.slice(0, fm_ValueHidden.lastIndexOf(".")) : fm_ValueHidden;

    let repChar = (currency == "VND") ? "." : ",";
    var fm_intergerValue = integerValue.toString().replace(/\B(?=(\d{3})+(?!\d))/g, repChar);
    var fm_ValueShow = (lesoluong == 0) ? fm_intergerValue : fm_intergerValue + (currency == "VND" ? ',' : '.') + decimalValue;

    results = [fm_ValueShow, fm_ValueHidden];
  }
  return results;
}

function checkNumber(Num = "") {
  Num = formatDonGia(Num)[1];
  if (Num = Number(Num) || Num === 0) {
    Num = Number(Num);
    var typeNum = (Num < 0) ? "negative" : "positive";
    return [Num % 1 !== 0 ? "float" : "integer", typeNum];
  } else {
    return [false, "string"];
  }
}

// =========================================================================
// 3. QUẢN LÝ GRID DÒNG SẢN PHẨM (Row Actions — Tinh gọn, xóa trùng lặp)
// =========================================================================
function addonerowsOutput() {
  counter += 1;
  var packingdv = $("#packing");
  var clonedv = packingdv.clone();

  clonedv.attr("id", "packing_" + counter);
  clonedv.find("input").val("");
  clonedv.find("input[type='checkbox']").prop("checked", false).removeAttr("checked");
  clonedv.find(".chietkhau2, .khuyenmai2, .ghichupro2, .featuredProductStatus").val(1);
  clonedv.find(".hasDatepicker").removeClass("hasDatepicker").removeAttr("id");
  clonedv.find(".input-quantity-display, .input-detail-display").prop("disabled", true);
  clonedv.show();
  clonedv.appendTo("#dshanghoa");
  clonedv.find("td.stt").text(counter);

  let ck = document.getElementsByClassName("chietkhau");
  let km = document.getElementsByClassName("khuyenmai");
  let gc = document.getElementsByClassName("ghichupro");
  let fp = document.getElementsByClassName("featuredProduct");

  for (let i = 0; i < ck.length; i++) {
    $(ck[i]).attr("onclick", "checkchietkhau(this, " + i + ")");
    $(km[i]).attr("onclick", "checkkhuyenmai(this, " + i + ")");
    $(gc[i]).attr("onclick", "checkghichupro(this, " + i + ")");
    $(fp[i]).attr("onclick", "handleProductSelection(this, " + i + ")");

    let items = [ck[i], km[i], gc[i], fp[i]];
    $(items).each(function () {
      $(this).removeClass(function (index, className) {
        return (className.match(/(^|\s)input\S+/g) || []).join(' ');
      }).addClass("input" + i);
    });
  }

  let hsdInput = clonedv.find(".expiry, .hsd");
  if (hsdInput.length > 0) {
    hsdInput.addClass("hsd_row_" + counter).datepicker({
      beforeShow: typeof customRange === 'function' ? customRange : null,
      dateFormat: "dd/mm/yy",
      changeMonth: true,
      changeYear: true
    });
  }

  let focussl1 = clonedv.find(".masku");
  focussl1.on("focus", function () { if (typeof $(this).putCursorAtEnd === 'function') $(this).putCursorAtEnd(); });
}

function adddbrowsOutput() {
  var addmorerow = parseInt($("#addmorenumber").val());
  var i;
  if (addmorerow > 0) {
    for (i = 0; i < addmorerow; i++) {
      addonerowsOutput();
    }
  } else {
    addonerowsOutput();
  }
}

function deleterowsOutput(el, type = "") {
  var tenform = $("#tenform").val();
  var sum = $("#dshanghoa tr").length;
  if (sum <= 1 && type != "auto") {
    showGlobalDialog("Không thể xóa", "error");
    return;
  }
  if (sum > 1) {
    $(el).parents("tr").remove();
    counter -= 1;
  }
  refreshstt();
  calcuTotalAmountOutPut();
  calcuTotalVat();
  calcuTotalPayment();
  writeMoney3();

  calcuTotalAmountVatOutPut();
  writeMoneyVAT();
}

function duplicaterowOutput(el) {
  var tenform = $("#tenform").val();
  counter += 1;
  var $el = $(el);
  var idWare = $el.parents("tr").find(".makho").val();
  var idGroup = $el.parents("tr").find(".nhh").val();
  var idProType = $el.parents("tr").find(".lhh").val();
  var packingtr = $el.parents("tr");
  var clonetr = packingtr.clone();

  clonetr.insertAfter(packingtr).attr("id", "packing_" + counter);
  clonetr.find("input.chietkhau").each(function () { $(this).val($(this).prop("checked") ? 2 : 1); });
  clonetr.find("input.khuyenmai").each(function () { $(this).val($(this).prop("checked") ? 2 : 1); });

  let chiecKhauClass = document.getElementsByClassName("chietkhau");
  let khuyenMaiClass = document.getElementsByClassName("khuyenmai");
  let ghiChuProClass = document.getElementsByClassName("ghichupro");
  let featuredProductClass = document.getElementsByClassName("featuredProduct");

  for (let i = 1; i < chiecKhauClass.length; i++) {
    $(chiecKhauClass[i]).attr("onclick", "checkchietkhau(this, " + i + ")").removeClass("input" + (i - 1)).addClass("input" + i);
    $(khuyenMaiClass[i]).attr("onclick", "checkkhuyenmai(this, " + i + ")").removeClass("input" + (i - 1)).addClass("input" + i);
    $(ghiChuProClass[i]).attr("onclick", "checkghichupro(this, " + i + ")").removeClass("input" + (i - 1)).addClass("input" + i);
    $(featuredProductClass[i]).attr("onclick", "handleProductSelection(this, " + i + ")").removeClass("input" + (i - 1)).addClass("input" + i);
  }

  clonetr.find(".makho").val(idWare);
  clonetr.find("input.hsd1").removeClass("hasDatepicker").removeAttr("id");
  clonetr.find("input.hsd").removeClass("hsd1").addClass("hsd" + counter);
  clonetr.find(".nhh").val(idGroup).end().find(".lhh").val(idProType);

  clonetr.find(".masku").on("focus", function () { if (typeof $(this).putCursorAtEnd === 'function') $(this).putCursorAtEnd(); });
  $(".hsd" + counter).datepicker({ dateFormat: "dd-mm-yy", changeMonth: true, changeYear: true });

  refreshstt();
  calcuTotalAmountOutPut();
  calcuTotalVat();
  calcuTotalPayment();
  writeMoney3();
  calcuTotalAmountVatOutPut();
  writeMoneyVAT();
  if (typeof clickChangeServiceCharge === 'function') clickChangeServiceCharge();
}

function refreshstt() {
  var newstt = 1;
  $("#dshanghoa tr").each(function () {
    if (newstt <= counter) {
      $(this).find("td.stt").text(newstt);
      $(this).attr("id", newstt === 1 ? "packing" : "packing_" + newstt);
      newstt += 1;
    }
  });
}

// =========================================================================
// 4. KIỂM TRÁ DỮ LIỆU & TRA CỨU MST (Đã sửa triệt để lỗi logic gọi biến Ajax)
// =========================================================================
function callTaxCodeAPI() {
  const taxCodeInput = document.getElementById("masothue");
  const isCheckTax = taxCodeInput ? taxCodeInput.value.trim() : '';
  if (!isCheckTax) {
    showGlobalDialog("Vui lòng nhập MST để tra cứu", "info");
    if (taxCodeInput) taxCodeInput.focus();
    return;
  }
  $.ajax({
    type: "POST",
    url: "/ajax.php",
    dataType: "json",
    data: { op: 'getinfotax', taxCode: isCheckTax },
    success: function (response) {
      if (response.success == true) {
        const dataCompany = response.data;
        $('input#tendonvi').val(dataCompany['ten_cong_ty']).attr('value', dataCompany['ten_cong_ty']);
        $('input#diachi').val(dataCompany['dia_chi']).attr('value', dataCompany['dia_chi']);
        $('input#masothue1').val(dataCompany['mst']).attr('value', dataCompany['mst']);
      } else {
        // Đã sửa lỗi gọi nhầm data.message -> response.message chuẩn xác
        let errorMessage = response.message || "Đã xảy ra lỗi khi tra cứu";
        showGlobalDialog(errorMessage, "error");
      }
    },
    error: function (jQxhr, textStatus, errorThrown) {
      showGlobalDialog("Đã xảy ra lỗi khi tra cứu mã số thuế. Vui lòng thử lại sau.", "error");
    }
  });
}

// =========================================================================
// 5. KHỐI VALIDATE HOOKS PHIẾU GIAO NHẬN (Đã sửa lỗi Null Pointer crash trang)
// =========================================================================
var ktraDieuDong = function () {
  var form_dieudong = $.trim($('#dieudong').val());
  var ktraDieudongIV = true;
  let symbol_abbreviation = document.querySelector('#symbol_abbreviation');

  // Bọc kiểm tra an toàn chống sập trang
  if (symbol_abbreviation && symbol_abbreviation.value == "N") {
    if (form_dieudong == "") {
      $('.edieudong').addClass("bf").text("Thông tin lệnh điều động không được để trống");
      ktraDieudongIV = false;
    } else if (form_dieudong.length > 255) {
      $('.edieudong').addClass("bf").text("Thông tin lệnh điều động không được dài hơn 255 ký tự");
      ktraDieudongIV = false;
    } else {
      $('.edieudong').removeClass("bf").text("");
    }
  }
  return ktraDieudongIV;
}

var ktraHopDongKTSoVaNgay = function () {
  var inputKTeSo = $.trim($('#hopdongso').val());
  var inputKTeNgay = $.trim($('#deliv_ngayHopDong').val());
  var ktraInput = true;
  let symbol_abbreviation = document.querySelector('#symbol_abbreviation');

  if (symbol_abbreviation && symbol_abbreviation.value == "B") {
    if (inputKTeSo == "") { $('.eHopDongKTSo').addClass("bf").text("Hợp đồng số không được để trống!"); ktraInput = false; }
    if (inputKTeNgay == "") { $('.eHopDongKTNgay').addClass("bf").text("Vui lòng chọn ngày hợp đồng!"); ktraInput = false; }
    if (inputKTeSo.length > 255) { $('.eHopDongKTSo').addClass("bf").text("Hợp đồng số không được dài hơn 255 ký tự!"); ktraInput = false; }
    if (inputKTeSo != "" && inputKTeNgay != "") {
      $('.eHopDongKTSo').removeClass("bf").text("");
      $('.eHopDongKTNgay').removeClass("bf").text("");
    }
  }
  return ktraInput;
}

var ktraTenNguoiVanChuyen = function () {
  var tenNguoiVanChuyen = $.trim($('#vanchuyen').val());
  var ktraTen = true;
  let symbol_abbreviation = document.querySelector('#symbol_abbreviation');

  if (symbol_abbreviation && symbol_abbreviation.value == "B") {
    if (tenNguoiVanChuyen == "") {
      $('.etennguoivanchuyen').addClass("bf").text("Thông tin tên người vận chuyển không được bỏ trống");
      ktraTen = false;
    } else if (tenNguoiVanChuyen.length > 100) {
      $('.etennguoivanchuyen').addClass("bf").text("Thông tin tên người vận chuyển không được dài hơn 100 ký tự");
      ktraTen = false;
    } else {
      $('.etennguoivanchuyen').removeClass("bf").text("");
    }
  }
  return ktraTen;
}

// =========================================================================
// 6. KHỐI TÍNH TOÁN CORE LOGIC (Tiền hàng, Thuế suất & Tổng thanh toán)
// =========================================================================
function calcuTotalAmountOutPut() {
  var lethanhtien = $("#lethanhtien").val() || 0;
  var hiddenTotalAmount = 0;
  var hiddenTotalAmount_output = 0;
  var formInvoice = $("#tenform").val();

  $(".hidden_thanhtien").each(function () {
    var checkck = $(this).parents("tr").find(".chietkhau").prop("checked");
    var checkkm = $(this).parents("tr").find(".khuyenmai").prop("checked");
    var checkgcpro = $(this).parents("tr").find(".ghichupro").prop("checked");
    var hidden_thanhtienGTGT = $(this).parents("tr").find(".hidden_thanhtienGTGT").val();

    let hidden_item_val = (formInvoice == 1) ? Number(hidden_thanhtienGTGT) : Number($(this).val());

    if (checkgcpro == false) {
      if (checkck == true && checkkm == true) {
        hiddenTotalAmount_output += 0;
      } else if (checkck == true && checkkm == false) {
        hiddenTotalAmount_output -= Number($(this).val());
        hiddenTotalAmount -= Number($(this).val());
      } else {
        hiddenTotalAmount_output += hidden_item_val;
        hiddenTotalAmount += Number($(this).val());
      }
    }
  });

  var results = (lethanhtien == 0) ? Math.round(hiddenTotalAmount).toString() : hiddenTotalAmount.toString();
  var arrayIntoMoney = formatThanhTien(results, 2);

  $("#show_tongthanhtien").val(arrayIntoMoney[0]).attr("value", arrayIntoMoney[0]);
  $("#hidden_tongthanhtien").attr("value", arrayIntoMoney[1]).val(arrayIntoMoney[1]);

  return arrayIntoMoney[1];
}

function calcuTotalVat() {
  var totalMoney = $("#hidden_tongthanhtien").val() || 0;
  var vat = $("#phantram_thuesuat").val();
  if (!vat || ["Null", "KTT", "KKKNT", "KCT", "Không chịu thuế"].includes(vat)) vat = 0;

  var results = (totalMoney > 0) ? parseFloat((totalMoney * vat) / 100) : 0;
  var arrayTotalVat = formatThanhTien(results, 2);

  $("#show_tienthuegtgt").val(arrayTotalVat[0]);
  $("#hidden_tongtienthue").attr("value", arrayTotalVat[1]);
}

function calcuTotalPayment() {
  var currency = $("#hidden_currency").val() || "VND";
  var totalMoney = $("#hidden_tongthanhtien").val() || 0;
  var totalVat = $("#hidden_tongtienthue").val() || 0;

  var results = (currency == "USD") ? Number(totalMoney) + Number(totalVat) : parseFloat(totalMoney) + parseFloat(totalVat);
  var arrayTotalPayment = formatThanhTien(String(results), 2);

  $("#show_tongtienthanhtoan").val(arrayTotalPayment[0]).attr("value", arrayTotalPayment[0]);
  $("#hidden_tongtienthanhtoan").attr("value", arrayTotalPayment[1]).val(arrayTotalPayment[1]);
  $("#hidden_tongcongprice").attr("value", arrayTotalPayment[1]).val(arrayTotalPayment[1]);

  if (typeof checkTotalHTandPayment === 'function') checkTotalHTandPayment();
  return arrayTotalPayment[1];
}

// =========================================================================
// 7. KHỐI ĐỌC SỐ THÀNH CHỮ CHUẨN ĐÔNG Á (VND & USD Cents Quốc tế)
// =========================================================================
var ChuSo = [" không", " một", " hai", " ba", " bốn", " năm", " sáu", " bảy", " tám", " chín"];
var Tien = ["", " nghìn", " triệu", " tỷ", " nghìn tỷ", " triệu tỷ"];

function DocSo3ChuSo(baso, parent = 1) {
  var tram = parseInt(baso / 100);
  var chuc = parseInt((baso % 100) / 10);
  var donvi = baso % 10;
  var KetQua = "";
  if (tram == 0 && chuc == 0 && donvi == 0) return "";

  if (parent == 0 && tram != 0) {
    KetQua += ChuSo[tram] + " trăm";
    if (chuc == 0 && donvi != 0) KetQua += " linh";
  } else if (tram != 0 || parent != 0) {
    KetQua += ChuSo[tram] + " trăm";
    if (chuc == 0 && donvi != 0) KetQua += " linh";
  }

  if (chuc != 0 && chuc != 1) {
    KetQua += ChuSo[chuc] + " mươi";
  } else if (chuc == 1) {
    KetQua += " mười";
  }

  switch (donvi) {
    case 1: KetQua += (chuc != 0 && chuc != 1) ? " mốt" : ChuSo[donvi]; break;
    case 5: KetQua += (chuc == 0) ? ChuSo[donvi] : " lăm"; break;
    default: if (donvi != 0) KetQua += ChuSo[donvi]; break;
  }
  return KetQua;
}

function writeMoneyInvoice(TotalPayment) {
  var currency = $("#hidden_currency").val() || "VND";
  var bangchu = (currency == "USD") ? DocTienBangChuInvoiceUSD(TotalPayment) : DocTienBangChuInvoice(TotalPayment);

  $("#bangchu_vnd").val(bangchu).attr("value", bangchu);
  $("#hidden_bangchu_vnd").val(bangchu).attr("value", bangchu);
  return bangchu;
}

function DocTienBangChuInvoice(SoTien) {
  var strSoTien = parseFloat(SoTien).toFixed(2).toString();
  var mangPhan = strSoTien.split(".");
  var phanNguyen = Math.abs(parseFloat(mangPhan[0]));
  var phanLe = mangPhan.length > 1 ? mangPhan[1] : "";
  var flag = $("#flag").val();
  let loaiTien = $("#hidden_read_en").val() || "đồng";
  let donViLe = ["euro", "usd"].includes(loaiTien.toLowerCase()) ? " cents" : " xu";
  var KetQua = "";
  var ViTri = [];

  if (SoTien == 0) return "Không " + loaiTien + ".";
  if (Math.abs(SoTien) > 8999999999999999) return "Số quá lớn!";

  var so = phanNguyen;
  ViTri[5] = Math.floor(so / 1000000000000000); so -= parseFloat(ViTri[5].toString()) * 1000000000000000;
  ViTri[4] = Math.floor(so / 1000000000000); so -= parseFloat(ViTri[4].toString()) * 1000000000000;
  ViTri[3] = Math.floor(so / 1000000000); so -= parseFloat(ViTri[3].toString()) * 1000000000;
  ViTri[2] = parseInt(so / 1000000);
  ViTri[1] = parseInt((so % 1000000) / 1000);
  ViTri[0] = parseInt(so % 1000);

  var lan = (ViTri[5] > 0) ? 5 : (ViTri[4] > 0) ? 4 : (ViTri[3] > 0) ? 3 : (ViTri[2] > 0) ? 2 : (ViTri[1] > 0) ? 1 : 0;

  for (var i = lan; i >= 0; i--) {
    KetQua += DocSo3ChuSo(ViTri[i], i == lan ? 0 : 1);
    if (ViTri[i] > 0) KetQua += Tien[i];
  }

  var KetQuaLe = "";
  if (phanLe !== "" && parseInt(phanLe) > 0) {
    var chuLe = DocSo3ChuSo(parseInt(phanLe), 1).replace("không trăm", "").trim();
    KetQuaLe = " và " + chuLe + donViLe;
  }

  KetQua = KetQua.trim();
  if (SoTien < 0) {
    KetQua = (flag == "repair" ? "Điều chỉnh giảm " : "Âm ") + KetQua.toLowerCase();
  } else if (flag == "repair") {
    KetQua = "Điều chỉnh tăng " + KetQua.substring(0, 1).toLowerCase() + KetQua.substring(1);
  }

  var chuoiCuoi = (KetQua + " " + loaiTien + KetQuaLe).trim();
  return chuoiCuoi.substring(0, 1).toUpperCase() + chuoiCuoi.substring(1) + ".";
}

function DocTienBangChuInvoiceUSD(SoTien, LoaiTien = 'đô la Mỹ') {
  var flag = $("#flag").val();
  var checkThapPhan = Math.abs(Number(SoTien) % 1);
  var docsothapphan = "";

  if (checkThapPhan > 0) {
    var sothapphan = $('#lethanhtien').val() || 2;
    let thapphan = parseFloat(checkThapPhan).toFixed(sothapphan).replace("0.", "");
    docsothapphan = DocTienSoThapPhan(thapphan, "cent");
  }

  var lan = 0, so = Math.abs(SoTien), KetQua = "", ViTri = [];
  if (SoTien == 0) return "Không đô.";
  if (so > 8999999999999999) return "Số quá lớn!";

  ViTri[5] = Math.floor(so / 1000000000000000); so -= parseFloat(ViTri[5].toString()) * 1000000000000000;
  ViTri[4] = Math.floor(so / 1000000000000); so -= parseFloat(ViTri[4].toString()) * 1000000000000;
  ViTri[3] = Math.floor(so / 1000000000); so -= parseFloat(ViTri[3].toString()) * 1000000000;
  ViTri[2] = Math.floor(so / 1000000);
  ViTri[1] = Math.floor((so % 1000000) / 1000);
  ViTri[0] = Math.floor(so % 1000);

  lan = (ViTri[5] > 0) ? 5 : (ViTri[4] > 0) ? 4 : (ViTri[3] > 0) ? 3 : (ViTri[2] > 0) ? 2 : (ViTri[1] > 0) ? 1 : 0;

  for (var i = lan; i >= 0; i--) {
    KetQua += DocSo3ChuSo(ViTri[i], i == lan ? 0 : 1);
    if (ViTri[i] > 0) KetQua += Tien[i];
  }

  if (KetQua.trim() == "") KetQua = "Không";
  KetQua = KetQua.trim();

  if (SoTien < 0) {
    KetQua = (flag == 'repair' ? "Điều chỉnh giảm " : "Âm ") + KetQua.toLowerCase();
  } else if (flag == 'repair') {
    KetQua = "Điều chỉnh tăng " + KetQua.charAt(0).toUpperCase() + KetQua.slice(1);
  } else {
    KetQua = KetQua.charAt(0).toUpperCase() + KetQua.slice(1);
  }

  return (checkThapPhan > 0) ? KetQua + " " + LoaiTien + " và " + docsothapphan : KetQua + " " + LoaiTien + ".";
}

function DocTienSoThapPhan(SoTien, LoaiTien) {
  var lan = 0, so = Math.abs(SoTien), KetQua = "", ViTri = [];
  if (SoTien < 0) return "Số tiền âm !";
  if (SoTien == 0) return "Không đồng !";

  ViTri[5] = Math.floor(so / 1000000000000000); so -= parseFloat(ViTri[5].toString()) * 1000000000000000;
  ViTri[4] = Math.floor(so / 1000000000000); so -= parseFloat(ViTri[4].toString()) * 1000000000000;
  ViTri[3] = Math.floor(so / 1000000000); so -= parseFloat(ViTri[3].toString()) * 1000000000;
  ViTri[2] = parseInt(so / 1000000);
  ViTri[1] = parseInt((so % 1000000) / 1000);
  ViTri[0] = parseInt(so % 1000);

  lan = (ViTri[5] > 0) ? 5 : (ViTri[4] > 0) ? 4 : (ViTri[3] > 0) ? 3 : (ViTri[2] > 0) ? 2 : (ViTri[1] > 0) ? 1 : 0;

  for (var i = lan; i >= 0; i--) {
    KetQua += DocSo3ChuSo(ViTri[i], i == lan ? 0 : 1);
    if (ViTri[i] > 0) KetQua += Tien[i];
  }
  return KetQua.trim() + " " + LoaiTien + ".";
}

// =========================================================================
// 8. ĐỒNG BỘ HIỂN THỊ KHU VỰC GIẢM TRỪ HỘ KINH DOANH (Đã sửa lỗi dính cú pháp)
// =========================================================================
function toggleDeductionArea() {
  var checkBox = document.getElementById("phantram_thuesuatHKD");
  var area = document.getElementById("deductionArea");
  var taxinfocard = document.getElementById("taxinfocard");

  if (area && checkBox) {
    if (checkBox.checked == true) {
      area.style.display = "flex";
      if (taxinfocard) taxinfocard.style.display = "flex";
    } else {
      area.style.display = "none";
      if (taxinfocard) taxinfocard.style.display = "none";
    }
  }
}

// =========================================================================
// 9. CÁC HÀM TÍNH TOÁN DÒNG SẢN PHẨM (Copied from source files)
// =========================================================================

function calcuPriceVat(ob) {
  var vat;
  if ($("#phantram_thuesuat").length && $("#phantram_thuesuat").val() !== "Null") {
    vat = $("#phantram_thuesuat").val();
  } else {
    vat = $(ob).parents("tr").find(".hidden_GTGT").val();
  }

  if (
    !vat ||
    vat == "" ||
    vat == "Null" ||
    vat == "KTT" ||
    vat == "KKKNT" ||
    vat == "KCT" ||
    vat == "Không kê khai, tính nộp thuế GTGT" ||
    vat == "Không thay đổi thuế xuất" ||
    vat == "Không chịu thuế"
  ) {
    vat = 0;
  }

  var priceHidden = $(ob).parents("tr").find(".hidden_dongia").val();
  var ThanhtienHidden = $(ob).parents("tr").find(".hidden_thanhtien").val();
  var hidden_tongthanhtien = $("#hidden_tongthanhtien").val();
  var hidden_tienthuegtgt = $("#hidden_tienthuegtgt").val();
  var hidden_tongtienthanhtoan = $("#hidden_tongtienthanhtoan").val();

  var storeId = $("#storeId").val();
  var priceVatShow = Number(priceHidden) + (priceHidden * vat) / 100;
  var arrayPriceVat = formatDonGia(String(priceVatShow), 2);

  var priceVatShow = arrayPriceVat[0];
  var priceVatHidden = arrayPriceVat[1];
  if (storeId == 258) {
    var arrayPrice = formatDonGia(String(priceHidden), 2);
    var arrayThanhtien = formatDonGia(String(ThanhtienHidden), 2);
    var arrayTongThanhtien = formatDonGia(String(hidden_tongthanhtien), 2);
    var moneyShow = arrayThanhtien[0];
    var moneyHidden = arrayThanhtien[1];

    $(ob).parents("tr").find(".thanhtien").val(moneyShow);
    $(ob).parents("tr").find(".thanhtien").attr("value", moneyShow);

    $(ob).parents("tr").find(".hidden_thanhtien").val(moneyHidden);
    $(ob).parents("tr").find(".hidden_thanhtien").attr("value", moneyHidden);

    $(ob).parents("tr").find(".dongia").val(arrayPrice[0]);
    $(ob).parents("tr").find(".hidden_dongia").attr("value", arrayPrice[1]);

    $("#show_tongthanhtien").val(arrayTongThanhtien[0]);
    $("#hidden_tongthanhtien").attr("value", arrayTongThanhtien[1]);
  }

  $(ob).parents("tr").find(".dongiavat").val(priceVatShow);
  $(ob).parents("tr").find(".hidden_dongiavat").attr("value", priceVatHidden);
}

function calcuThueGTGT(ob) {
  var currency = $("#hidden_currency").val() ?? "VND";
  var thueGTGTShow = 0;
  var thueGTGTHidden = 0;

  var vat = $(ob).parents("tr").find(".hidden_GTGT").val();

  if (
    !vat ||
    vat == "" ||
    vat == "Null" ||
    vat == "KTT" ||
    vat == "KKKNT" ||
    vat == "KCT" ||
    vat == "Không kê khai, tính nộp thuế GTGT" ||
    vat == "Không thay đổi thuế xuất" ||
    vat == "Không chịu thuế"
  ) {
    var vat = 0;
  }

  var priceHidden = $(ob).parents("tr").find(".hidden_dongia").val();
  var soluong = $(ob).parents("tr").find(".hidden_soluong").val();
  if (!soluong) {
    var soluong = 1;
  }
  if (currency == "USD") {
    var thueGTGTShow = (soluong * priceHidden * vat) / 100;
  } else {
    var thueGTGTShow = Math.round((soluong * priceHidden * vat) / 100);
  }
  var arrayThueGTGT = formatThanhTien(String(thueGTGTShow), 2);
  var thueGTGTShow = arrayThueGTGT[0];
  var thueGTGTHidden = arrayThueGTGT[1];
  $(ob).parents("tr").find(".thueGTGT").val(thueGTGTShow);
  $(ob).parents("tr").find(".hidden_thueGTGT").attr("value", thueGTGTHidden);
}

function calcuIntoMoney(ob) {
  var lethanhtien = $("#lethanhtien").val();
  var quantity = $(ob).parents("#dshanghoa tr").find(".hidden_soluong").val();
  if (quantity == "") {
    quantity = "1";
  }
  var price = $(ob).parents("#dshanghoa tr").find(".hidden_dongia").val();
  if (price == "") {
    price = "0";
  }

  var intoMoney = parseFloat(quantity) * parseFloat(price);
  if (lethanhtien == 0) {
    var results = Math.round(intoMoney);
    var results = results.toString();
  } else {
    var results = intoMoney.toString();
  }

  var arrayIntoMoney = formatThanhTien(results, 2);
  var moneyShow = arrayIntoMoney[0];
  var moneyHidden = arrayIntoMoney[1];
  $(ob).parents("#dshanghoa tr").find(".thanhtien").val(moneyShow);
  $(ob).parents("#dshanghoa tr").find(".thanhtien").attr("value", moneyShow);
  $(ob).parents("#dshanghoa tr").find(".hidden_thanhtien").attr("value", moneyHidden);
}

function calcuIntoMoneyGTGT(ob) {
  var currency = $("#hidden_currency").val()
    ? $("#hidden_currency").val()
    : "VND";
  var amountGTGTShow = 0;
  var amountGTGTHidden = 0;
  var storeid = $("#storeId").val();

  var vat;
  if ($("#phantram_thuesuat").length && $("#phantram_thuesuat").val() !== "Null") {
    vat = $("#phantram_thuesuat").val();
  } else {
    vat = $(ob).parents("tr").find(".hidden_GTGT").val();
  }

  if (
    !vat ||
    vat == "" ||
    vat == "Null" ||
    vat == "KTT" ||
    vat == "KKKNT" ||
    vat == "KCT" ||
    vat == "Không kê khai, tính nộp thuế GTGT" ||
    vat == "Không thay đổi thuế xuất" ||
    vat == "Không chịu thuế"
  ) {
    vat = 0;
  }

  var priceHidden = $(ob).parents("tr").find(".hidden_dongia").val();
  var soluong = $(ob).parents("tr").find(".hidden_soluong").val();
  if (!soluong) {
    var soluong = 1;
  }
  if (currency == "USD") {
    var amountGTGTShow =
      soluong * (Number(priceHidden) + (priceHidden * vat) / 100);
  } else {
    if (storeid == 151344) {
      var amountGTGTShow =
        soluong * (Number(priceHidden) + (priceHidden * vat) / 100);
      var amountGTGTShowHidden = amountGTGTShow;
    } else {
      var amountGTGTShow = Math.round(
        soluong * (Number(priceHidden) + (priceHidden * vat) / 100)
      );
    }
  }
  var arrayAmountGTGT = formatThanhTien(String(amountGTGTShow), 2);
  var amountGTGTShow = arrayAmountGTGT[0];
  var amountGTGTHidden = arrayAmountGTGT[1];
  if (storeid == 151344) {
    var amountGTGTHidden = arrayAmountGTGT[1];
  }
  $(ob).parents("tr").find(".thanhtienGTGT").val(amountGTGTShow);
  $(ob).parents("tr").find(".hidden_thanhtienGTGT").attr("value", amountGTGTHidden);
}

// Tính ngược đơn giá từ đơn giá có GTGT
function calcuPrice(ob) {
  var showPrice = 0;
  var hiddenPrice = 0;
  var hiddenPriceVat = $(ob).parents("tr").find(".hidden_dongiavat").val();
  var vat = $("#phantram_thuesuat").val();

  if (vat == "Null") {
    var vat = $(ob).parents("tr").find(".hidden_GTGT").val();
  }

  if (
    !vat ||
    vat == "" ||
    vat == "Null" ||
    vat == "KTT" ||
    vat == "KKKNT" ||
    vat == "KCT" ||
    vat == "Không kê khai, tính nộp thuế GTGT" ||
    vat == "Không thay đổi thuế xuất" ||
    vat == "Không chịu thuế"
  ) {
    var vat = 0;
  }

  var price = Number(hiddenPriceVat) / (1 + Number(vat) / 100);
  var arrayPrice = formatDonGia(String(price), 2);
  showPrice = arrayPrice[0];
  hiddenPrice = arrayPrice[1];
  $(ob).parents("tr").find(".dongia").val(showPrice);
  $(ob).parents("tr").find(".hidden_dongia").val(hiddenPrice);
}

function calcuTotalAmountVatOutPut() {
  var currency = $("#hidden_currency").val();
  var lethanhtien = $("#lethanhtien").val();
  var storeId = $("#storeId").val();

  if (!lethanhtien) {
    var lethanhtien = 0;
  }
  var hiddenTotalAmountVAT = 0;

  $(".hidden_thanhtienGTGT").each(function () {
    var checkck = $(this).parents("tr").find(".chietkhau").prop("checked");
    var checkkm = $(this).parents("tr").find(".khuyenmai").prop("checked");
    var checkghichu = $(this).parents("tr").find(".ghichupro").prop("checked");

    if (checkkm == true || checkghichu == true) {
      hidden_thanhtienGTGT = 0;
    } else if (checkck == true && checkkm == false && checkghichu == false) {
      hidden_thanhtienGTGT = 0 - Number($(this).val());
    } else {
      hidden_thanhtienGTGT = Number($(this).val());
    }
    hiddenTotalAmountVAT += hidden_thanhtienGTGT;
  });
  if (currency == "USD") {
    var results = hiddenTotalAmountVAT.toString();
  } else {

    var results = Math.round(hiddenTotalAmountVAT);
    var results = results.toString();
  }

  var arrayIntoMoney = formatThanhTien(results, 2);
  var moneyShow = arrayIntoMoney[0];
  var moneyHidden = arrayIntoMoney[1];

  $("#show_tongcongpriceGTGT").val(moneyShow);
  $("#hidden_tongcongpriceGTGT").attr("value", moneyHidden);
  return moneyHidden;
}

// =========================================================================
// 10. ĐỌC SỐ THÀNH CHỮ & HIỂN THỊ (writeMoney3, writeMoneyVAT, writeMoneyInvoiceUSD)
// =========================================================================

function writeMoney3() {
  var currency = $("#currency").val();
  var TotalPayment = isNaN(calcuTotalPayment()) ? 0 : calcuTotalPayment();

  switch (currency) {
    case "1":
      var bangchu = writeMoneyInvoiceUSD(TotalPayment);
      break;
    case "4":
      break;
    case "15":
      break;
    default:
      var bangchu = writeMoneyInvoice(TotalPayment);
      break;
  }
}

function writeMoneyVAT() {
  var currency = $("#currency").val();
  var TotalAmountVAT = calcuTotalAmountVatOutPut();
  switch (currency) {
    case "1":
      var bangchuGTGT = writeMoneyInvoiceUSD(TotalAmountVAT);
      break;
    case "4":
      break;
    case "15":
      break;
    default:
      var bangchuGTGT = writeMoneyInvoice(TotalAmountVAT);
      break;
  }
  $("#bangchuGTGT").val(bangchuGTGT);
  $("#bangchuGTGT").attr("value", bangchuGTGT);
  $("#hidden_bangchuGTGT").val(bangchuGTGT);
  $("#hidden_bangchuGTGT").attr("value", bangchuGTGT);
}

function writeMoneyInvoiceUSD(TotalPayment, currency) {
  var bangchu = DocTienBangChuInvoiceUSD(TotalPayment);
  $("#bangchu_vnd").val(bangchu);
  $("#bangchu_vnd").attr("value", bangchu);
  $("#hidden_bangchu_vnd").val(bangchu);
  $("#hidden_bangchu_vnd").attr("value", bangchu);
  return bangchu;
}

// =========================================================================
// 11. PHÍ PHỤC VỤ & THUẾ TTĐB (Service Charge & Special Tax Chain)
// =========================================================================

function clickChangeServiceCharge() {
  moneytotal = parseInt($('#hidden_tongthanhtien').val());
  if (isNaN(moneytotal)) {
    moneytotal = 0;
  }
  rate_charge = parseInt($('#phantram_phiphucvu').val());
  if (isNaN(rate_charge)) {
    rate_charge = 0;
  }
  results = Math.round((moneytotal * rate_charge) / 100);
  var arrayMoneyCharge = formatThanhTien(String(results));
  var showMoneyCharge = arrayMoneyCharge[0];
  var hiddenMoneyCharge = arrayMoneyCharge[1];
  $('#show_phiphucvu').val(showMoneyCharge);
  $('#hidden_phiphucvu').val(hiddenMoneyCharge);

  clickChangeTaxTTDB();
}

function clickChangeTaxTTDB() {
  moneytotal = parseInt($('#hidden_tongthanhtien').val());
  if (isNaN(moneytotal)) {
    moneytotal = 0;
  }
  moneycharge = parseInt($('#hidden_phiphucvu').val());
  if (isNaN(moneycharge)) {
    moneycharge = 0;
  }
  rate_taxttdb = parseInt($('#phantram_thuettdb').val());
  if (isNaN(rate_taxttdb)) {
    rate_taxttdb = 0;
  }
  results = Math.round((moneytotal + moneycharge) * (rate_taxttdb / 100));
  var arrayTaxttdb = formatThanhTien(String(results));
  var showTaxttdb = arrayTaxttdb[0];
  var hiddenTaxttdb = arrayTaxttdb[1];
  $('#show_thuettdb').val(showTaxttdb);
  $('#hidden_thuettdb').val(hiddenTaxttdb);

  clickChangeTax();
}

function clickChangeTax() {
  var currency = $("#hidden_currency").val()
    ? $("#hidden_currency").val()
    : "VND";
  var inv_form = $("#tenform").val()
    ? $("#tenform").val()
    : "0";
  $(".dongia").each(function (key, ob) {
    calcuPriceVat(ob);
  });
  if (currency == "USD") {
    moneytotal = $.isNumeric($("#hidden_tongthanhtien").val())
      ? parseFloat($("#hidden_tongthanhtien").val())
      : 0;
    moneycharge = $.isNumeric($("#hidden_phiphucvu").val())
      ? parseFloat($("#hidden_phiphucvu").val())
      : 0;
    moneytaxttdb = $.isNumeric($("#hidden_thuettdb").val())
      ? parseFloat($("#hidden_thuettdb").val())
      : 0;
    rate_tax = $.isNumeric($("#phantram_thuesuat").val())
      ? parseFloat($("#phantram_thuesuat").val())
      : 0;

    if (inv_form == 21 || inv_form == 42) {
      rate_taxHKD = $.isNumeric($("#phantram_thuesuatHKD").val())
        ? parseFloat($("#phantram_thuesuatHKD").val())
        : 0;
      if (moneytotal + moneycharge + moneytaxttdb > 0) {
        tatolAmount = (moneytotal + moneycharge + moneytaxttdb);
        tatolReduced = tatolAmount * (rate_taxHKD / 100);
        results = (tatolReduced * (20 / 100));
      } else {
        results = 0;
      }
    } else {
      if (moneytotal + moneycharge + moneytaxttdb > 0) {
        results = (moneytotal + moneycharge + moneytaxttdb) * (rate_tax / 100);
      } else {
        results = 0;
      }
    }
    var arrayTax = formatThanhTien(results, 2);
  } else {
    moneytotal = $.isNumeric($("#hidden_tongthanhtien").val())
      ? parseFloat($("#hidden_tongthanhtien").val())
      : 0;
    moneycharge = $.isNumeric($("#hidden_phiphucvu").val())
      ? parseFloat($("#hidden_phiphucvu").val())
      : 0;
    moneytaxttdb = $.isNumeric($("#hidden_thuettdb").val())
      ? parseFloat($("#hidden_thuettdb").val())
      : 0;
    rate_tax = $.isNumeric($("#phantram_thuesuat").val())
      ? parseFloat($("#phantram_thuesuat").val())
      : 0;

    if (inv_form == 21 || inv_form == 42) {
      rate_taxHKD = $.isNumeric($("#phantram_thuesuatHKD").val())
        ? parseFloat($("#phantram_thuesuatHKD").val())
        : 0;
      tatolAmount = (moneytotal + moneycharge + moneytaxttdb);
      tatolReduced = tatolAmount * (rate_taxHKD / 100);
      results = (tatolReduced * (20 / 100));
    } else {
      results = (moneytotal + moneycharge + moneytaxttdb) * (rate_tax / 100);
    }
    var arrayTax = formatThanhTien(results, 2);
  }
  var showTax = arrayTax[0];
  var hiddenTax = arrayTax[1];
  if (inv_form == 21 || inv_form == 42) {
    $("#hidden_showdeductionAmount").val(hiddenTax);
    $("#showdeductionAmount").val(showTax);
    $("#text_deductionAmount").text(showTax);
  } else {
    $("#show_tienthuegtgt").val(showTax);
    $("#hidden_tienthuegtgt").val(hiddenTax);
    $("#hidden_tongtienthue").val(hiddenTax);
  }
  changeSumMoneyTotalPayment();
}

function changeSumMoneyTotalPayment() {
  var currency = $("#hidden_currency").val()
    ? $("#hidden_currency").val()
    : "VND";
  var tenform = $("#tenform").val();
  if (currency == "USD") {
    moneytotal = parseFloat($("#hidden_tongthanhtien").val());
    if (isNaN(moneytotal)) { moneytotal = 0; }
    moneycharge = parseFloat($("#hidden_phiphucvu").val());
    if (isNaN(moneycharge)) { moneycharge = 0; }
    moneytaxttdb = parseFloat($("#hidden_thuettdb").val());
    if (isNaN(moneytaxttdb)) { moneytaxttdb = 0; }
    moneytax = parseFloat($("#hidden_tienthuegtgt").val());
    if (isNaN(moneytax)) { moneytax = 0; }

    if (tenform == 21 || tenform == 42) {
      moneyDeduction = parseFloat($("#hidden_showdeductionAmount").val());
      if (isNaN(moneyDeduction)) { moneyDeduction = 0; }
      results = moneytotal + moneycharge - moneyDeduction;
    } else {
      results = moneytotal + moneycharge + moneytaxttdb + moneytax;
    }

    var arrayTotalPayment = formatThanhTien(results, 2);
    var showTotalPayment = arrayTotalPayment[0];
    var hiddenTotalPayment = arrayTotalPayment[1];
    $("#show_tongtienthanhtoan").val(showTotalPayment);
    $("#hidden_tongtienthanhtoan").val(hiddenTotalPayment);
    $("#hidden_tongcongprice").val(hiddenTotalPayment);

    results = $("#hidden_tongcongpriceGTGT").val();
    writeMoneyInvoice(results);
  } else {
    moneytotal = parseFloat($("#hidden_tongthanhtien").val());
    if (isNaN(moneytotal)) { moneytotal = 0; }
    moneycharge = parseFloat($("#hidden_phiphucvu").val());
    if (isNaN(moneycharge)) { moneycharge = 0; }
    moneytaxttdb = parseFloat($("#hidden_thuettdb").val());
    if (isNaN(moneytaxttdb)) { moneytaxttdb = 0; }
    moneytax = parseFloat($("#hidden_tienthuegtgt").val());
    if (isNaN(moneytax)) { moneytax = 0; }

    if (tenform == 21 || tenform == 42) {
      moneyDeduction = parseFloat($("#hidden_showdeductionAmount").val());
      if (isNaN(moneyDeduction)) { moneyDeduction = 0; }
      results = parseFloat(moneytotal + moneycharge - moneyDeduction);
    } else {
      results = parseFloat(moneytotal + moneycharge + moneytaxttdb + moneytax);
    }

    var arrayTotalPayment = formatThanhTien(results, 2);
    var showTotalPayment = arrayTotalPayment[0];
    var hiddenTotalPayment = arrayTotalPayment[1];
    $("#show_tongtienthanhtoan").val(showTotalPayment);
    $("#hidden_tongtienthanhtoan").val(hiddenTotalPayment);
    $("#hidden_tongcongprice").val(hiddenTotalPayment);

    results = $("#hidden_tongcongpriceGTGT").val();
    writeMoneyInvoice(results);
  }

  changeSumMoneyTotalPaymentToCurrency();
}

function changeSumMoneyTotalPaymentToCurrency() {
  var currency = $('#hidden_currency').val();
  if (currency == 'USD') {
    moneytotalpayment = parseFloat($('#hidden_tongtienthanhtoan').val());
  } else {
    moneytotalpayment = parseInt($('#hidden_tongtienthanhtoan').val());
  }

  if (isNaN(moneytotalpayment)) {
    moneytotalpayment = 0;
  }

  read_en = $('#hidden_read_en').val();
  if (read_en == '') {
    read_en = 'đồng';
  }
  if (currency == 'USD') {
    var arrayTotalPayment = formatThanhTien(String(moneytotalpayment), 2);
  } else {
    var arrayTotalPayment = formatThanhTien(String(moneytotalpayment), 2);
  }
  rate_exchange = parseInt($('#hidden_rate').val());
  if (isNaN(rate_exchange)) {
    rate_exchange = 1;
  }

  var fm_money = arrayTotalPayment[0];
  var fm_money_hidden = arrayTotalPayment[1];

  if (!isNaN(parseInt($('#hidden_rate').val()))) {
    $('#show_tongtienthanhtoanusd').val(fm_money);
    $('#hidden_tongtienthanhtoanusd').val(fm_money_hidden);
  } else {
    $('#show_tongtienthanhtoanusd').val(0);
    $('#hidden_tongtienthanhtoanusd').val(0);
  }
}

// =========================================================================
// 12. TIỆN ÍCH NGÀY THÁNG (Date Utilities)
// =========================================================================

function formatNgay(value = '') {
  var error = 0;
  var checkFormat = $('#formatdate').val();
  var value = value.replace(/[/]/g, '').replace(/[-]/g, '');
  var dateNow = new Date();
  var mm = ("0" + (dateNow.getMonth() + 1)).slice(-2);
  var yyyy = dateNow.getFullYear();
  switch (value.length) {
    case 2:
      var year = yyyy;
      var month = mm;
      var date = value.substring(0, 2);
      break;
    case 4:
      var year = yyyy;
      var month = value.substring(2, 4);
      var date = value.substring(0, 2);
      break;
    case 6:
      var year = '20' + value.substring(4, 6);
      var month = value.substring(2, 4);
      var date = value.substring(0, 2);
      break;
    case 8:
      var year = value.substring(4, 8);
      var month = value.substring(2, 4);
      var date = value.substring(0, 2);
      break;
    default:
      var error = -1;
  }
  if (error == 0) {
    var datedate = new Date(year, month - 1, date);
    if (checkFormat == '/') {
      var dateValue = ((datedate.getDate() > 9) ? datedate.getDate() : ('0' + datedate.getDate())) + '/' + ((datedate.getMonth() > 8) ? (datedate.getMonth() + 1) : ('0' + (datedate.getMonth() + 1))) + '/' + datedate.getFullYear();
    } else {
      var dateValue = ((datedate.getDate() > 9) ? datedate.getDate() : ('0' + datedate.getDate())) + '-' + ((datedate.getMonth() > 8) ? (datedate.getMonth() + 1) : ('0' + (datedate.getMonth() + 1))) + '-' + datedate.getFullYear();
    }
  } else {
    var datedate = -1;
    var dateValue = -1;
  }
  return [datedate, dateValue];
}

function addDays(date, days) {
  var result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}

function parseDate(dateStr, format) {
  const regex = format.toLocaleLowerCase()
    .replace(/\bd+\b/, '(?<day>\\d+)')
    .replace(/\bm+\b/, '(?<month>\\d+)')
    .replace(/\by+\b/, '(?<year>\\d+)');

  const parts = new RegExp(regex).exec(dateStr) || {};
  const { year, month, day } = parts.groups || {};
  return parts.length === 4 ? new Date(year, month - 1, day) : undefined;
}

// =========================================================================
// 13. VALIDATION & KIỂM TRA BỔ SUNG
// =========================================================================

function checkLengthInput(ob, lengthValue) {
  var value = $(ob).val();
  var ob1 = $(ob).parents()[0];
  if (value.length > lengthValue) {
    $(ob1).find('.error_message').removeClass("d-none");
    $(ob1).find('.error_text').text("Mã hàng quá dài(>50)!");
    return false;
  } else {
    $(ob1).find('.error_message').addClass("d-none");
    $(ob1).find('.error_text').text("");
    return true;
  }
}

function checkTotalHTandPayment() {
  hidden_total_money_ht = $("#hidden_total_money_ht").val();
  hidden_tongcongprice = $("#hidden_tongcongprice").val();
  if (Number(hidden_total_money_ht) - Number(hidden_tongcongprice) != 0) {
    $("#total_money_ht").addClass("err_cell");
  } else {
    $("#total_money_ht").removeClass("err_cell");
  }
}

function limitInvoiceDate() {
  const currentInvoiceDate = $('#show_ngayhoadon');
  if (currentInvoiceDate.length === 0 || !currentInvoiceDate.data('datepicker')) return;

  // 1. Đồng bộ Menu theo hóa đơn
  const invoiceData = (typeof updateDateWithInvoice === 'function') ? updateDateWithInvoice() : null;

  // 2. Lấy dữ liệu Tháng/Năm hiện tại từ Menu
  const dateInfo = (typeof getCurrentDateTime === 'function') ? getCurrentDateTime() : { month: new Date().getMonth() + 1, year: new Date().getFullYear() };
  const selectMonth = dateInfo.month;
  const selectedYear = dateInfo.year;
  const firstDay = new Date(selectedYear, selectMonth - 1, 1);
  const lastDay = new Date(selectedYear, selectMonth, 0);

  // 3. Khóa lịch datepicker
  currentInvoiceDate.datepicker('option', {
    minDate: firstDay,
    maxDate: lastDay
  });

  // 4. XỬ LÝ ĐỒNG BỘ CSDL NGẦM (CHỈ KHI LOAD TRANG)
  const isManual = sessionStorage.getItem('manual_change');
  if (isManual !== 'true' && invoiceData) {
    if (typeof updatemonth === 'function') updatemonth(invoiceData.month, true);
    if (typeof updateyear === 'function') updateyear(invoiceData.year, true);
  }

  // 5. KIỂM TRA VÀ ÉP NGÀY HỢP LỆ THEO MENU
  const currentVal = currentInvoiceDate.val();
  if (currentVal === "") {
    currentInvoiceDate.datepicker('setDate', firstDay);
  } else {
    const parts = currentVal.split('/');
    if (parts.length === 3) {
      const inputMonth = parseInt(parts[1]);
      const inputYear = parseInt(parts[2]);
      if (inputMonth !== selectMonth || inputYear !== selectedYear) {
        currentInvoiceDate.datepicker('setDate', firstDay);
      }
    }
  }

  // 6. XÓA FLAG CUỐI CÙNG
  sessionStorage.removeItem('manual_change');
}

// ── Lưu cấu hình cột/setting qua AJAX ──
function clickConfigOptionProduct(ob) {
  debugger;
  var array_col = [];
  var array_notcol = [];

  // Tìm tất cả các checkbox có class setting-cb
  $(".service-info__checkout").find(".setting-cb").each(function () {
    // Chuyển đổi data-target (vd: "col-oto") thành "col_oto" để khớp DB
    var value = $(this).data("target").replace(/-/g, "_");

    if (this.checked) {
      array_col.push(value);
    } else {
      array_notcol.push(value);
    }
  });

  var op = "optionproduct";

  var action = $(ob).attr('data-action');

  $.ajax({
    type: "POST",
    url: "/ajax.php",
    dataType: "text",
    data: {
      op: op,
      inputAction: action,
      array_col: array_col,
      array_notcol: array_notcol
    },
    success: function (data) {
      if (data.trim() === "success") {
        showGlobalDialog("Cập nhật cấu hình thành công!", "success");
        setTimeout(function () {
          location.reload();
        }, 1200);
      } else {
        showGlobalDialog("Không thể lưu cấu hình. Dữ liệu trả về: " + data, "error");
      }
    },
    error: function (xhr, status, error) {
      console.error("AJAX Error: ", status, error);
      showGlobalDialog("Đã có lỗi xảy ra khi cập nhật cấu hình. Vui lòng thử lại.", "error");
    }
  });
}