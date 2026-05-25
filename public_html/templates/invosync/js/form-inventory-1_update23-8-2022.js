if ($("#formatdate").val() == "/") {
  var formatDate = "dd/mm/yy";
} else {
  var formatDate = "dd-mm-yy";
}

$(document).ready(function () {
  $("#payment_term").datepicker({
    dateFormat: formatDate,
    changeMonth: true,
    changeYear: true,
  });

  $(".hsd1").datepicker({
    dateFormat: "dd-mm-yy",
    changeMonth: true,
    changeYear: true,
  });

  $(".datesearch").datepicker({
    dateFormat: "dd-mm-yy",
    changeMonth: true,
    changeYear: true,
  });

  if (location.href.indexOf("?op=inventory&act=product&mod=output") != -1) {
    addonerowsaccoungting(); //thêm mới
    clickCreateInvoice();
    getProList();
  }

  if (location.href.indexOf("?op=inventory&act=product&mod=input") != -1) {
    getProList();
  }
  const $invoiceListContainer = $('#invoiceListInMonth');
  const $showButton = $('#btn-show-invoice-list');
  const $hideButton = $('#btn-hide-invoice-list');
  const STORAGE_KEY = 'invoiceListVisible';
  const isVisibleStored = localStorage.getItem(STORAGE_KEY);

   if (isVisibleStored === 'false') {
        $invoiceListContainer.hide();
        $showButton.show();
        $hideButton.hide();
    } 
    // Mặc định (null hoặc 'true'): Bảng hiện, nút Ẩn hiện, nút Hiển thị ẩn.
    else {
        $invoiceListContainer.show();
        $showButton.hide();
        $hideButton.show();
        localStorage.setItem(STORAGE_KEY, 'true'); 
    }
  // 2. XỬ LÝ SỰ KIỆN ẨN (HIDE)
      $hideButton.on('click', function(event) {
          event.preventDefault(); 
          $invoiceListContainer.slideUp(400); 
          $showButton.show();
          $hideButton.hide(); 
          
          localStorage.setItem(STORAGE_KEY, 'false'); // LƯU trạng thái ẩn
      });
      
      // 3. XỬ LÝ SỰ KIỆN HIỂN THỊ (SHOW)
      $showButton.on('click', function(event) {
          event.preventDefault(); 
          $invoiceListContainer.slideDown(400); // HIỆN bảng
          $showButton.hide(); // ẨN nút Hiển thị
          $hideButton.show(); // HIỆN nút Ẩn
          
          localStorage.setItem(STORAGE_KEY, 'true'); // LƯU trạng thái hiện
      });
});

//chỉnh từ đây

// ADD ROW FOR INPUT / OUTPUT INVENTORY---------------------------------------------------

// function addonerowsOutput() {
//   counter += 1;
//   var packingdv = $("#packing");
//   var clonedv = packingdv.clone();
//   clonedv.appendTo("#dshanghoa");
//   clonedv.attr("id", "packing_" + counter);
//   clonedv.find("input").each(function () {
//     $(this).val("");
//   });
//   var expiryInput = clonedv.find(".expiry");
//   // XÓA TRẠNG THÁI CŨ

//   expiryInput.removeClass("hasDatepicker"); // Xóa class đánh dấu

//   expiryInput.removeAttr("id");             // Xóa ID cũ (rất quan trọng)

//   expiryInput.val("");                      // Xóa ngày tháng cũ của dòng trước

//   clonedv.find("input.soluong").each(function () {
//     $(this).val();
//   });
//   clonedv.find("input.hidden_soluong").each(function () {
//     $(this).val();
//   });

//   // default disable
//   clonedv.find("input.input-quantity-display").prop("disabled", true);
//   clonedv.find("input.input-detail-display").prop("disabled", true);

//   clonedv.find("input.chietkhau").each(function () {
//     clonedv.find("input.chietkhau").prop("checked", false);
//     clonedv.find("input.chietkhau2").val(1);
//   });
//   clonedv.find("input.khuyenmai").each(function () {
//     clonedv.find("input.khuyenmai").prop("checked", false);
//     clonedv.find("input.khuyenmai2").val(1);
//   });
//   clonedv.find("input.ghichupro").each(function () {
//     clonedv.find("input.ghichupro").prop("checked", false);
//     clonedv.find("input.ghichupro2").val(1);
//   });

//   // default !checked
//   clonedv.find("input.featuredProduct").each(function () {
//     clonedv.find("input.featuredProduct").prop("checked", false);
//     clonedv.find("input.featuredProductStatus").val(1);
//   });

//   clonedv.find("td.stt").text(counter);
//   //clonedv.find('input.hsd1').datepicker("destroy");
//   clonedv.find("input.hsd1").removeClass("hasDatepicker").removeAttr("id");
//   clonedv.find("input.hsd").removeClass("hsd1");
//   clonedv.find("input.hsd").addClass("hsd" + counter);
//   let chiecKhauClass = document.getElementsByClassName("chietkhau");
//   let khuyenMaiClass = document.getElementsByClassName("khuyenmai");
//   let ghiChuProClass = document.getElementsByClassName("ghichupro");
//   let featuredProductClass = document.getElementsByClassName("featuredProduct");
//   for (let i = 1; i < chiecKhauClass.length; i++) {
//     $(chiecKhauClass[i]).attr("onclick", "checkchietkhau(this, " + i + ")");
//     $(chiecKhauClass[i]).removeClass("input0");
//     $(chiecKhauClass[i]).addClass("input" + i);
//     $(khuyenMaiClass[i]).attr("onclick", "checkkhuyenmai(this, " + i + ")");
//     $(khuyenMaiClass[i]).removeClass("input0");
//     $(khuyenMaiClass[i]).addClass("input" + i);
//     $(ghiChuProClass[i]).attr("onclick", "checkghichupro(this, " + i + ")");
//     $(ghiChuProClass[i]).removeClass("input0");
//     $(ghiChuProClass[i]).addClass("input" + i);
//     $(featuredProductClass[i]).attr(
//       "onclick",
//       "handleProductSelection(this, " + i + ")"
//     );
//     $(featuredProductClass[i]).removeClass("input" + (i - 1));
//     $(featuredProductClass[i]).addClass("input" + i);
//   }

//   var focussl1 = clonedv.find(".masku");

//   focussl1
//     .putCursorAtEnd() // should be chainable
//     .on("focus", function () {
//       // could be on any event
//       focussl1.putCursorAtEnd();
//     });

//   $(".hsd" + counter).datepicker({
//     dateFormat: "dd-mm-yy",
//     changeMonth: true,
//     changeYear: true,
//   });
//   // Tìm đúng class bạn đang dùng (expiry hoặc hsd)
//   let hsdInput = clonedv.find("input.expiry");
//   if (hsdInput.length == 0) hsdInput = clonedv.find("input.hsd"); // Backup nếu bạn dùng class hsd
//   hsdInput.addClass("hsd_row_" + counter);
//   if (expiryInput.length > 0) {
//     expiryInput.datepicker({
//       beforeShow: customRange,
//       dateFormat: "dd/mm/yy",
//       changeMonth: true,
//       changeYear: true
//     });
//   }
//   // console.log(counter);
// }

function addonerowsOutput() {
    counter += 1;
    var packingdv = $("#packing");
    var clonedv = packingdv.clone();

    // --- ĐOẠN 1: DỌN DẸP TỔNG THỂ ---
    clonedv.attr("id", "packing_" + counter);
    clonedv.find("input").val(""); // Xóa tất cả giá trị input cùng lúc
    
    // Reset toàn bộ checkbox và giá trị hidden status về 1
    clonedv.find("input[type='checkbox']").prop("checked", false).removeAttr("checked");
    clonedv.find(".chietkhau2, .khuyenmai2, .ghichupro2, .featuredProductStatus").val(1);
    
    // Dọn dẹp Datepicker (Chỉ làm 1 lần ở đây)
    clonedv.find(".hasDatepicker").removeClass("hasDatepicker").removeAttr("id");

    // Default disable cho hiển thị số lượng
    clonedv.find(".input-quantity-display, .input-detail-display").prop("disabled", true);

    clonedv.appendTo("#dshanghoa");
    clonedv.find("td.stt").text(counter);

    // --- ĐOẠN 2: CẬP NHẬT INDEX (DÙNG LOGIC CHẠY NGON CỦA BẠN) ---
    let ck = document.getElementsByClassName("chietkhau");
    let km = document.getElementsByClassName("khuyenmai");
    let gc = document.getElementsByClassName("ghichupro");
    let fp = document.getElementsByClassName("featuredProduct");

    for (let i = 0; i < ck.length; i++) {
        // Cập nhật onclick
        $(ck[i]).attr("onclick", "checkchietkhau(this, " + i + ")");
        $(km[i]).attr("onclick", "checkkhuyenmai(this, " + i + ")");
        $(gc[i]).attr("onclick", "checkghichupro(this, " + i + ")");
        $(fp[i]).attr("onclick", "handleProductSelection(this, " + i + ")");

        // Dọn sạch class input cũ để tránh lỗi không tích được checkbox
        let items = [ck[i], km[i], gc[i], fp[i]];
        $(items).each(function() {
            $(this).removeClass(function(index, className) {
                return (className.match(/(^|\s)input\S+/g) || []).join(' ');
            }).addClass("input" + i);
        });
    }

    // --- ĐOẠN 3: XỬ LÝ DATEPICKER DUY NHẤT ---
    let hsdInput = clonedv.find(".expiry, .hsd");
    if (hsdInput.length > 0) {
        hsdInput.addClass("hsd_row_" + counter);
        hsdInput.datepicker({
            beforeShow: typeof customRange === 'function' ? customRange : null,
            dateFormat: "dd/mm/yy", // Thống nhất 1 định dạng duy nhất
            changeMonth: true,
            changeYear: true
        });
    }

    // --- ĐOẠN 4: XỬ LÝ FOCUS ---
    let focussl1 = clonedv.find(".masku");
    focussl1.on("focus", function () {
        if (typeof $(this).putCursorAtEnd === 'function') {
            $(this).putCursorAtEnd();
        }
    });
}


// ADD ROW ACCOUTING IN INVOICE INVENTORY

var counterht = 1;
function addonerowsaccoungting() {
  counterht += 1;
  // var fruits = [];
  // $('.product_name_load3').each(function(){
  //     fruits.push($(this).val());
  // });
  var packingdv = $("#hachtoanpacking");
  // var originalSelectdv = packingdv.find('select');
  // originalSelectdv.children().each(function(){
  //     if($.inArray($(this).val(),fruits) != -1 ){
  //     }
  // })
  var clonedv = packingdv.clone();
  clonedv.appendTo("#dshachtoan");
  clonedv.attr("id", "hachtoanpacking_" + counterht);
  clonedv.find("input").each(function () {
    $(this).val("");
  });

  clonedv.find("td.stt").text(counterht);

  // clonedv.find('span').each(function(){
  //     $(this).text('');
  // });
  // clonedv.find('.bootstrap-select').replaceWith(function() { return $('select', this); });
  // MAjaxListProductQuotes($('.selectlistsp').last());
  // SumPriceWhenChange();
  // refreshstt();
}

function deleterowsaccounting(el) {
  var el = $(el);
  var sum = 0;
  $("#dshachtoan tr").each(function () {
    sum += 1;
  });
  if (sum <= 1) {
    alert("Không thể xóa");
  } else {
    $(el).parents("tr").remove();
    counterht -= 1;
  }
  // if(counter < 1) {
  //     counter = 1;
  // }
  refreshsttaccounting();
  calcuTotalAmountAccounting();
}

function refreshsttaccounting() {
  var allstt = counterht;
  var newstt = 1;
  $("#dshachtoan tr").each(function () {
    if (newstt <= allstt) {
      $(this).find("td.stt").text(newstt);
      if (newstt == 1) {
        $(this).attr("id", "hachtoanpacking");
      } else {
        $(this).attr("id", "hachtoanpacking_" + newstt);
      }
      newstt += 1;
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

function deleterowsOutput(el, type = "") {
  var tenform = $("#tenform").val();
  var el = $(el);
  var sum = 0;
  $("#dshanghoa tr").each(function () {
    sum += 1;
  });
  if (sum <= 1 && type != "auto") {
    alert("Không thể xóa");
  }
  if (sum > 1) {
    $(el).parents("tr").remove();
    counter -= 1;
  }
  // if(counter < 1) {
  //     counter = 1;
  // }
  refreshstt();
  calcuTotalAmountOutPut();

  calcuTotalVat();
  calcuTotalPayment();
  writeMoney3();

  if (
    tenform == 19 ||
    tenform == 1 ||
    tenform == 16 ||
    tenform == 23 ||
    tenform == 41 ||
    tenform == 32 ||
    tenform == 36 ||
    tenform == 38
  ) {
    calcuTotalAmountVatOutPut();
    writeMoneyVAT();
  }
}

function copyInfoProOutput(ob) {
  var count_tr = 0;
  var dempacking = 0;
  $("#dshanghoa tr").each(function () {
    count_tr++;
  });
  for (i = 0; i <= count_tr; i++) {
    if (i == 0) {
      var idpacking = "#packing";
    } else {
      if ((i = count_tr)) {
        addonerowsOutput();
      }
      var j = i + 1;
      var idpacking = "#packing_" + j;
    }
    var tenhang = $("#dshanghoa " + idpacking)
      .find(".tenhang")
      .val();
    if (tenhang == "") {
      copyContentOutput(ob, idpacking);
      break;
    }
  }
  var ab = $("#dshanghoa " + idpacking).find(".tenhang");
  calcuPriceVat(ab);
  calcuThueGTGT(ab);
  calcuIntoMoney(ab);
  calcuIntoMoneyGTGT(ab);
  calcuTotalAmountOutPut();
  calcuTotalAmountVatOutPut();
  calcuTotalVat();
  calcuTotalPayment();
  writeMoney();
  writeMoneyVAT();
}

function copyContentOutput(ob, idpacking = "") {
  var mauso = $(ob).parents("tr").find(".mauso").val();
  var kyhieu = $(ob).parents("tr").find(".kyhieu").val();
  var sochungtu = $(ob).parents("tr").find(".sochungtu").val();
  var madonvi = $(ob).parents("tr").find(".madonvi").val();
  var masku = $(ob).parents("tr").find(".ds_masku").val();
  var mahang = $(ob).parents("tr").find(".ds_mahang").val();
  var tenhang = $(ob).parents("tr").find(".ds_tenhang").val();
  var donvi = $(ob).parents("tr").find(".ds_donvi").val();
  var soluong = $(ob).parents("tr").find(".hidden_dssoluong").val();
  var dongia = $(ob).parents("tr").find(".hidden_dsdongia").val();
  var thanhtien = $(ob).parents("tr").find(".hidden_dsthanhtien").val();
  var makho = $(ob).parents("tr").find(".ds_makho").val();
  var hidden_makho = $(ob).parents("tr").find(".hidden_dsmakho").val();
  var solo = $(ob).parents("tr").find(".ds_solo").val();
  var hsd = $(ob).parents("tr").find(".ds_hsd").val();
  var nhh = $(ob).parents("tr").find(".ds_nhh").val();
  var hidden_nhh = $(ob).parents("tr").find(".hidden_dsnhh").val();
  var ghichu = $(ob).parents("tr").find(".ds_ghichu").val();

  $(ob)
    .parents(".sectionxnt")
    .find("#dshanghoa " + idpacking + " .masku")
    .val(masku);
  $(ob)
    .parents(".sectionxnt")
    .find("#dshanghoa " + idpacking + " .mahang")
    .val(mahang);
  $(ob)
    .parents(".sectionxnt")
    .find("#dshanghoa " + idpacking + " .tenhang")
    .val(tenhang);
  $(ob)
    .parents(".sectionxnt")
    .find("#dshanghoa " + idpacking + " .donvi")
    .val(donvi);

  $(ob)
    .parents(".sectionxnt")
    .find("#dshanghoa " + idpacking + " .makho")
    .val(hidden_makho);
  $(ob)
    .parents(".sectionxnt")
    .find("#dshanghoa " + idpacking + " .solo")
    .val(solo);
  $(ob)
    .parents(".sectionxnt")
    .find("#dshanghoa " + idpacking + " .hsd")
    .val(hsd);
  $(ob)
    .parents(".sectionxnt")
    .find("#dshanghoa " + idpacking + " .nhh")
    .val(hidden_nhh);
  $(ob)
    .parents(".sectionxnt")
    .find("#dshanghoa " + idpacking + " .ghichu")
    .val(ghichu);

  var arrayPrice = formatDonGia(dongia);
  var priceShow = arrayPrice[0];
  var priceHidden = arrayPrice[1];

  var arrayQuantity = formatSoLuong(soluong);
  var quantityShow = arrayQuantity[0];
  var quantityHidden = arrayQuantity[1];

  var arrayIntoMoney = formatThanhTien(thanhtien);
  var moneyShow = arrayIntoMoney[0];
  var moneyHidden = arrayIntoMoney[1];

  $(ob)
    .parents(".sectionxnt")
    .find("#dshanghoa " + idpacking + " .soluong")
    .val(quantityShow);
  $(ob)
    .parents(".sectionxnt")
    .find("#dshanghoa " + idpacking + " .dongia")
    .val(priceShow);
  $(ob)
    .parents(".sectionxnt")
    .find("#dshanghoa " + idpacking + " .thanhtien")
    .val(moneyShow);

  $(ob)
    .parents(".sectionxnt")
    .find("#dshanghoa " + idpacking + " .hidden_soluong")
    .val(quantityHidden);
  $(ob)
    .parents(".sectionxnt")
    .find("#dshanghoa " + idpacking + " .hidden_dongia")
    .val(priceHidden);
  $(ob)
    .parents(".sectionxnt")
    .find("#dshanghoa " + idpacking + " .hidden_thanhtien")
    .val(moneyHidden);
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
  if (
    tenform == 19 ||
    tenform == 1 ||
    tenform == 16 ||
    tenform == 23 ||
    tenform == 41 ||
    tenform == 32 ||
    tenform == 36 ||
    tenform == 38
  ) {
    calcuTotalAmountVatOutPut();
    writeMoneyVAT();
  }

  // add invoice new
  clickChangeServiceCharge();
}

// bắt đầu từ đây

function clickGTGT(cg) {
  var op = "changegtgt";
  $.ajax({
    type: "POST",
    url: "/ajax.php",
    data: {
      op: op,
    },
    success: function (data) {
      var data = data.replace(/onchangVAT/g, "clickChangeGTGTOutPut");
      data = data.replace(/-1/g, "Không chịu thuế");
      $(cg).parent().find(".load-vat").show();
      $(cg).parent().find(".load-vat").html(data);
    },
  });
}

function searchInfoCusOutput() {
  var op = "inventory_searchcus_output";
  var value = $("#info_timnhanh").val();
  console.log(value.length);
  if (value.length >= 3) {
    $.ajax({
      type: "POST",
      url: "/ajax.php",
      data: {
        op: op,
        value: value,
      },
      success: function (data) {
        $("#cus-searching-box").show();
        $("#cus-searching-box").html(data);
      },
    });
  } else {
    $("#cus-searching-box").hide();
  }
}

function searchAccounting(position) {
  var op = "inventory_searchaccounting";
  var value = $("#" + position + "_accounting").val();
  if (value.length >= 2) {
    console.log(value);
    $.ajax({
      type: "POST",
      url: "/ajax.php",
      data: {
        op: op,
        value: value,
        position: position,
      },
      success: function (data) {
        $("#" + position + "_acounting-searching-box").show();
        $("#" + position + "_acounting-searching-box").html(data);
      },
    });
  } else {
    $("#" + position + "_acounting-searching-box").hide();
  }
}

function searchContract() {
  var op = "inventory_searchcontract";
  var value = $("#contract").val();
  if (value.length >= 2) {
    console.log(value);
    $.ajax({
      type: "POST",
      url: "/ajax.php",
      data: {
        op: op,
        value: value,
      },
      success: function (data) {
        $("#contract-searching-box").show();
        $("#contract-searching-box").html(data);
      },
    });
  } else {
    $("#contract-searching-box").hide();
  }
}

function searchAgency() {
  var op = "inventory_searchagency";
  var value = $("#agency").val();
  if (value.length >= 2) {
    console.log(value);
    $.ajax({
      type: "POST",
      url: "/ajax.php",
      data: {
        op: op,
        value: value,
      },
      success: function (data) {
        $("#agency-searching-box").show();
        $("#agency-searching-box").html(data);
      },
    });
  } else {
    $("#agency-searching-box").hide();
  }
}

function clickSearchAccounting(nv) {
  var idAccounting = $(nv).data("id");
  var nameAccounting = $(nv).data("name");
  var codeAccounting = $(nv).data("code");
  var positionAccounting = $(nv).data("position");

  $("#" + positionAccounting + "_accounting").val(codeAccounting);
  $("#" + positionAccounting + "_accounting").attr("value", codeAccounting);

  $(nv)
    .parents("tr")
    .find(".hidden_" + positionAccounting + "_accounting")
    .val(idAccounting);
  $(nv)
    .parents("tr")
    .find(".hidden_" + positionAccounting + "_accounting")
    .attr("value", idAccounting);

  $("#" + positionAccounting + "_acounting-searching-box").hide();
}

function clickSearchAgency(nv) {
  var idAgency = $(nv).data("id");
  var nameAgency = $(nv).data("name");
  var codeAgency = $(nv).data("code");

  $("#agency").val(nameAgency);
  $("#agency").attr("value", nameAgency);

  $(".hidden_id_agency").val(idAgency);
  $(".hidden_id_agency").attr("value", idAgency);

  $("#agency-searching-box").hide();
}

function clickSearchCusOutput(nv) {
  var idCus = $(nv).data("id");
  var nameCus = $(nv).data("name");
  var companynameCus = $(nv).data("companyname");

  $("#info_timnhanh").val("");
  $("#info_timnhanh").attr("value", "");
  $("#cus-searching-box").hide();

  var op = "inventory_getinfocus_output";
  $.ajax({
    type: "POST",
    url: "/ajax.php",
    dataType: "json",
    data: {
      op: op,
      idCus: idCus,
    },
    success: function (data) {
      // console.log(data['masothue']);
      if (data["success"] == 0) {
        var masothueObj = $("#masothue");
        $(masothueObj).val(data["masothue"]);
        $(masothueObj).attr("value", data["masothue"]);
        validTaxCode($(masothueObj));

        $("#tax_code").val(data["masothue"]);
        $("#tax_code").attr("value", data["masothue"]);

        $("#tendonvi").val(data["donvi"]);
        $("#tendonvi").attr("value", data["donvi"]);

        $("#company_name").val(data["donvi"]);
        $("#company_name").attr("value", data["donvi"]);

        $("#madonvi").val(data["madonvi"]);
        $("#madonvi").attr("value", data["madonvi"]);

        $("#company_code").val(data["madonvi"]);
        $("#company_code").attr("value", data["madonvi"]);

        $("#email").val(data["email"]);
        $("#email").attr("value", data["email"]);

        $("#diachi").val(data["address"]);
        $("#diachi").attr("value", data["address"]);

        $("#sotaikhoan").val(data["stk"]);
        $("#sotaikhoan").attr("value", data["stk"]);
        //
        $("#tennguoimua").val(data["name"]);
        $("#tennguoimua").attr("value", data["name"]);

        $("#id_customer").val(data["id_customer"]);
        $("#id_customer").attr("value", data["id_customer"]);
      }
    },
  });
}

function clickSearchContract(nv) {
  var idContract = $(nv).data("id");
  var nameContract = $(nv).data("name");
  var codeContract = $(nv).data("code");

  $("#contract").val(nameContract);
  $("#contract").attr("value", nameContract);

  $(".hidden_id_contract").val(idContract);
  $(".hidden_id_contract").attr("value", idContract);

  $("#contract-searching-box").hide();
}

$("#mst_invoice").click(function () {
  var op = "infor_customer";
  var id_user = $("#masothue").val();
  $.ajax({
    type: "POST",
    url: "/ajax.php",
    dataType: "json",
    data: {
      op: op,
      id_user: id_user,
    },
    success: function (data) {
      if (data["success"] == 1) {
        $("input#tennguoimua").val(data["masothue"]);
        $("input#tennguoimua").attr("value", data["masothue"]);
        $("input#tendonvi").val(data["tenct"]);
        $("input#tendonvi").attr("value", data["tenct"]);
        $("input#diachi").val(data["diachi"]);
        $("input#diachi").attr("value", data["diachi"]);
        $("input#masothue1").val(id_user);
        $("input#masothue1").attr("value", id_user);
      } else {
        alert("Không tìm thấy thông tin");
      }
      // $('input#fullname').val(data['ChuSoHuu']);
      // $('input#fullname').attr('value',data['ChuSoHuu']);
    },
  });
});

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

    // Trả dữ liệu cho hạn thanh toán
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
    var payment_term = payment_term.replace(/-/g, "/"); // Format ngày hóa đơn 01/10/1997
    var payment_term = parseDate(payment_term, formatDate);

    var ngayhoadon = $("#show_ngayhoadon").val();
    var ngayhoadon = ngayhoadon.replace(/-/g, "/"); // Format ngày hóa đơn 01/10/1997
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
    $(ob1).next().find(".edatenew").text("Ngày chưa hợp lệ!");
  }
}

function clickCreateInvoice() {
  var formiv = $("input[name=tenform]").val();
  
  // Các đối tượng cần xử lý chung
  var $fields = $("#show_mauso, #show_kyhieu, #show_sohoadon, #show_ngayhoadon");
  var isHasData = $("#dataEdit").val(); // Trả về "1" nếu là trang Edit
  if ($("#createinvoice").prop("checked") == true) {
    // $(".addInvoice").removeClass("d-none");
    
    // Điều chỉnh colspan
    $("#positionamount").attr("colspan", (formiv == 1 ? 11 : 10));

    // 1. Xử lý Mẫu số
    var mauso = $("#hidden_mauso_storage").val();
    $("#show_mauso").val(mauso).attr("readonly", "readonly").addClass("is-disabled").removeAttr("disabled");
    $("#hidden_mauso").val(mauso);

    // 2. Xử lý Ký hiệu
    var kyhieu = $("#hidden_kyhieu_storage").val();
    $("#show_kyhieu").val(kyhieu).attr("readonly", "readonly").addClass("is-disabled").removeAttr("disabled");
    $("#hidden_kyhieu").val(kyhieu);

    // 3. Xử lý Số hóa đơn
    var sohoadon = $("#hidden_sohoadon_storage").val();
    $("#show_sohoadon").val(sohoadon).attr("readonly", "readonly").addClass("is-disabled").removeAttr("disabled");
    $("#hidden_sohoadon").val(sohoadon);

    // 4. Ngày xuất
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); // Tháng 0-11 nên phải +1
    var yyyy = today.getFullYear();
    var currentDate = dd + '/' + mm + '/' + yyyy;

    // 2. Tìm selector và thay đổi giá trị
    var $inputNgay = $("#show_ngayhoadon");

    $inputNgay.val(currentDate) // Gán ngày mới
        .attr("readonly", "readonly") // Khóa không cho gõ tay
        .addClass("is-disabled") // Thêm class màu xám (nếu CSS có hỗ trợ)
        .removeAttr("disabled"); // Đảm bảo vẫn gửi được data khi lưu form

    // 3. Nếu bạn muốn tooltip (title) cũng cập nhật theo:
    $inputNgay.attr("title", "Hóa đơn xuất ngày " + currentDate);

    // Mở khóa đơn giá, thành tiền
    $(".dongia, .thanhtien").removeAttr("readonly").removeAttr("disabled").removeClass("is-disabled");

    $(".tfoot-thanhtien").addClass("d-none");
    $("#createinvoice").val(1);

  } else {
    // $(".addInvoice").addClass("d-none");
    $("#positionamount").attr("colspan", 7);
    if(isHasData ==1){
         $("#show_mauso").val(storage_mauso);
            $("#show_kyhieu").val(storage_kyhieu);
            $("#show_sohoadon").val(storage_sohoadon);
            $("#show_ngayhoadon").val(storage_ngayhoadon); // DÙNG NGÀY GỐC, KHÔNG DÙNG currentDate

            $("#hidden_mauso").val(storage_mauso);
            $("#hidden_kyhieu").val(storage_kyhieu);
            $("#hidden_sohoadon").val(storage_sohoadon);
            $fields.attr("readonly", "readonly").addClass("is-disabled");

    }else{

            $fields.val("").removeAttr("readonly").removeAttr("disabled").removeClass("is-disabled");
            $("#hidden_mauso, #hidden_kyhieu, #hidden_sohoadon").val("");
    }

    

    // Khóa lại đơn giá, thành tiền nếu không tạo hóa đơn
    $(".dongia, .thanhtien").attr("disabled", "disabled").addClass("is-disabled");

    $(".tfoot-thanhtien").removeClass("d-none");
    $("#createinvoice").removeAttr("value");
  }
}

function clickAddAccounting() {
  if ($("#addAccounting").prop("checked") == true) {
    $(".addAccounting").removeClass("d-none");
  } else {
    $(".addAccounting").addClass("d-none");
  }
}

function changeMauSo() {
  $("#hidden_mauso").attr("value", $("#show_mauso").val());
}
function changeKyHieu() {
  $("#hidden_kyhieu").attr("value", $("#show_kyhieu").val());
}
function changeSoHoaDon() {
  $("#hidden_sohoadon").attr("value", $("#show_sohoadon").val());
}

function clickChangeQuantityOutPut(ob) {
  var tenform = $("#tenform").val();
  var quantity = $(ob).parents("tr").find(".soluong").val();
  var ob1 = $(ob).parents()[0];
  results = checkNumber(quantity);
  var ab = $(".glyphicon-user").parents()[0];
  var abHTML = $(ab).html();
  var loai_dieuchinhValue = $("#loai_dieuchinh").val();

  //Cho phép nhập số âm đơn giá, số lượng, thành tiền đối với hóa đơn điều chỉnh, thêm mới hóa đơn
  if (
    loai_dieuchinhValue ||
    window.location.href.includes("op=newinvoice&act=new&mod=add") == true ||
    window.location.href.includes("op=newinvoice&act=new&mod=edit")
  ) {
    results[1] = "positive";
  }

  if (results[0] == false || results[1] == "negative") {
    $(ob1).find(".error_message").removeClass("d-none");
    $(ob1).find(".error_text").text("Số không hợp lệ!");
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

    if (
      tenform == 19 ||
      tenform == 23 ||
      tenform == 41 ||
      tenform == 16 ||
      tenform == 32 ||
      tenform == 36 ||
      tenform == 38
    ) {
      calcuIntoMoneyGTGT(ob);
      calcuTotalAmountVatOutPut();
      writeMoneyVAT();
    }

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
    $(ob1).find(".error_text").text("Số không hợp lệ!");
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
    if (
      tenform == 16 ||
      tenform == 19 ||
      tenform == 23 ||
      tenform == 41 ||
      tenform == 32 ||
      tenform == 36 ||
      tenform == 38
    ) {
      calcuIntoMoneyGTGT(ob);
      calcuTotalAmountVatOutPut();
      writeMoneyVAT();
    }

    // add invoice new
    clickChangeServiceCharge();
  }
}

function clickChangePriceVat(ob) {

  var tenform = $("#tenform").val();
  var priceVat = $(ob).parents("tr").find(".dongiavat").val();

  var ob1 = $(ob).parents()[0];
  results = checkNumber(priceVat);
  if (results[0] == false || results[1] == "negative") {
    $(ob1).find(".error_message").removeClass("d-none");
    $(ob1).find(".error_text").text("Số không hợp lệ!");
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
    if (
      tenform == 16 ||
      tenform == 19 ||
      tenform == 23 ||
      tenform == 41 ||
      tenform == 32 ||
      tenform == 36 ||
      tenform == 38
    ) {
      calcuTotalAmountVatOutPut();
      writeMoneyVAT();
    }
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
    $(ob1).find(".error_text").text("Số không hợp lệ!");
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

    if (
      tenform == 19 ||
      tenform == 23 ||
      tenform == 41 ||
      tenform == 16 ||
      tenform == 32 ||
      tenform == 36 ||
      tenform == 38
    ) {
      calcuTotalAmountVatOutPut();
      writeMoneyVAT();
    }
    // add invoice new
    clickChangeServiceCharge();
  }
}

function writeMoney() {
  var currency = $("#currency").val();
  var TotalPayment = calcuTotalAmountOutPut();
  console.log(TotalPayment);

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
  console.log("bangchu", bangchu);
}
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
  console.log("bangchu", bangchu);
}
function writeMoney2() {
  console.log("Money22");
  var currency = $("#currency").val();
  var TotalPayment = calcuTotalAmountOutPut2();
  console.log(TotalPayment);

  switch (currency) {
    case "1":
      var bangchu = calcuTotalPayment(TotalPayment);
      break;
    case "4":
      break;
    case "15":
      break;
    default:
      var bangchu = writeMoneyInvoice(TotalPayment);
      break;
  }
  console.log("bangchu", bangchu);
}

function writeMoneyVAT() {
  var currency = $("#currency").val();
  var TotalAmountVAT = calcuTotalAmountVatOutPut();
  console.log(TotalAmountVAT);
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
  console.log(bangchuGTGT);
  $("#bangchuGTGT").val(bangchuGTGT);
  $("#bangchuGTGT").attr("value", bangchuGTGT);
  $("#hidden_bangchuGTGT").val(bangchuGTGT);
  $("#hidden_bangchuGTGT").attr("value", bangchuGTGT);
}

function clickChangeGTGTOutPut(ob) {
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

    // var tenform = $('#tenform').val();
    // var currency = $("#hidden_currency").val() ? $("#hidden_currency").val() : "VND";
    // var GTGT = $(ob).val();
    // // console.log(ob);
    // // $(ob).parents('tr').find(".GTGT").val(GTGT);
    // // $(ob).parents('tr').find(".hidden_GTGT").attr('value', GTGT);
    //   if(window.location.href.includes("flag=repair") == true || window.location.href.includes("op=newinvoice&act=replace&mod=add") == true || window.location.href.includes("op=newinvoice&act=new&mod=add") == true || window.location.href.includes("op=newinvoice&act=new&mod=edit") == true){
    //       var arrayThueGTGT = formatThanhTien(String(GTGT));
    //       var thueGTGTShow = arrayThueGTGT[0];
    //       var thueGTGTHidden = arrayThueGTGT[1];
    //       // console.log('asdasdasdasdadasdasdadadsd', thueGTGTShow);
    //       $(ob).parents('tr').find(".thueGTGT").attr('value', thueGTGTShow);
    //       $(ob).parents('tr').find(".thueGTGT").val(thueGTGTShow);
    //       // $(ob).parents('tr').find(".hidden_thueGTGT").val(thueGTGTShow);
    //       $(ob).parents('tr').find(".hidden_thueGTGT").attr('value', thueGTGTHidden);

    //       if(tenform == 19 || tenform == 23 || tenform == 16 || tenform == 32 || tenform == 36){
    //         console.log('voasdansdnajkdnajksdnjkasdnjkn', $(ob).val());
    //         var priceHidden = $(ob).parents('tr').find('.hidden_dongia').val();
    //         var soluong = $(ob).parents('tr').find('.hidden_soluong').val();
    //         var thueGTGT = $(ob).parents('tr').find('.hidden_thueGTGT').val();
    //         // var hidden_t = $(ob).parents('tr').find('.hidden_thanhtienGTGT').val();
    //         if(currency == 'USD'){
    //           var amountGTGTShow = soluong * Number(priceHidden) + thueGTGTHidden;
    //         }else{
    //           var amountGTGTShow = parseFloat(soluong * priceHidden) + Number(thueGTGT)
    //           console.log('amoutGTGTShowwwwww', amountGTGTShow);
    //         }
    //         var arrayAmountGTGT = formatDonGia(String(amountGTGTShow),2);
    //         var arrayAmountGTGT = formatThanhTien(String(amountGTGTShow),2);
    //         var amountGTGTShow = arrayAmountGTGT[0];
    //         var amountGTGTHidden = arrayAmountGTGT[1];
    //         $(ob).parents('tr').find(".thanhtienGTGT").val(amountGTGTShow);
    //         $(ob).parents('tr').find(".hidden_thanhtienGTGT").attr('value', amountGTGTHidden);
    //         calcuTotalAmountVatOutPut();
    //         writeMoneyVAT();
    //       }
    //   }
    //   else{
    //     var arrayThueGTGT = formatThanhTien(String($(ob).val()),2);
    //     var thueGTGTShow = arrayThueGTGT[0];
    //     var thueGTGTHidden = arrayThueGTGT[1];
    //     // console.log('asdasdasdasdadasdasdadadsd', thueGTGTShow);
    //     $(ob).parents('tr').find(".thueGTGT").attr('value', thueGTGTShow);
    //     $(ob).parents('tr').find(".thueGTGT").val(thueGTGTShow);
    //     // $(ob).parents('tr').find(".hidden_thueGTGT").val(thueGTGTShow);
    //     $(ob).parents('tr').find(".hidden_thueGTGT").attr('value', thueGTGTHidden);
    //       // if(tenform == 19 || tenform == 23 || tenform == 16 || tenform == 32 || tenform == 36){
    //       //   console.log('voasdansdnajkdnajksdnjkasdnjkn', $(ob).val());
    //       //   var priceHidden = $(ob).parents('tr').find('.hidden_dongia').val();
    //       //   var soluong = $(ob).parents('tr').find('.hidden_soluong').val();
    //       //   var thueGTGT = $(ob).parents('tr').find('.hidden_thueGTGT').val();
    //       //   // var hidden_t = $(ob).parents('tr').find('.hidden_thanhtienGTGT').val();
    //       //   if(currency == 'USD'){
    //       //     var amountGTGTShow = soluong * Number(priceHidden) + thueGTGTHidden;
    //       //   }else{
    //       //     var amountGTGTShow = parseFloat(soluong * priceHidden) + Number(thueGTGT)
    //       //     console.log('amoutGTGTShowwwwww', amountGTGTShow);
    //       //   }
    //       //   var arrayAmountGTGT = formatDonGia(String(amountGTGTShow),2);
    //       //   var arrayAmountGTGT = formatThanhTien(String(amountGTGTShow),2);
    //       //   var amountGTGTShow = arrayAmountGTGT[0];
    //       //   var amountGTGTHidden = arrayAmountGTGT[1];
    //       //   $(ob).parents('tr').find(".thanhtienGTGT").val(amountGTGTShow);
    //       //   $(ob).parents('tr').find(".hidden_thanhtienGTGT").attr('value', amountGTGTHidden);
    //       //   calcuTotalAmountVatOutPut();
    //       //   writeMoneyVAT();
    //       // }

    //   }
  }
}

function clickChangeGTGTOutPutEditPriceGTGT(ob) {
  // var GTGT = $(ob).val();
  // // console.log(ob);
  // $(ob).parents('tr').find(".GTGT").val(GTGT);
  // $(ob).parents('tr').find(".hidden_GTGT").attr('value', GTGT);
  // calcuPriceVat(ob);
  // calcuThueGTGT(ob);
  // calcuIntoMoneyGTGT(ob);
  // calcuTotalPayment();
  // calcuTotalAmountOutPut();
  // calcuTotalAmountVatOutPut();
  // writeMoneyVAT();

  var tenform = $("#tenform").val();
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
    vat == "Không kê khai, tính nộp thuế GTGT" ||
    vat == "Không thay đổi thuế xuất" ||
    vat == "Không chịu thuế"
  ) {
    var vat = 0;
  }

  // console.log(ob);
  // $(ob).parents('tr').find(".GTGT").val(GTGT);
  // $(ob).parents('tr').find(".hidden_GTGT").attr('value', GTGT);
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
    // console.log('asdasdasdasdadasdasdadadsd', thueGTGTShow);
    $(ob).parents("tr").find(".thueGTGT").attr("value", thueGTGTShow);
    $(ob).parents("tr").find(".thueGTGT").val(thueGTGTShow);
    // $(ob).parents('tr').find(".hidden_thueGTGT").val(thueGTGTShow);
    $(ob).parents("tr").find(".hidden_thueGTGT").attr("value", thueGTGTHidden);

    $(ob).parents("tr").find(".thueGTGT").attr("value", thueGTGTShow);
    $(ob).parents("tr").find(".thueGTGT").val(thueGTGTShow);
    // $(ob).parents('tr').find(".hidden_thueGTGT").val(thueGTGTShow);
    $(ob).parents("tr").find(".hidden_thueGTGT").attr("value", thueGTGTHidden);

    if (
      tenform == 19 ||
      tenform == 23 ||
      tenform == 41 ||
      tenform == 16 ||
      tenform == 32 ||
      tenform == 36 ||
      tenform == 38
    ) {
      console.log("voasdansdnajkdnajksdnjkasdnjkn", $(ob).val());
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
      console.log("thueGTGTPrice", thueGTGTPrice);
      console.log("thueGTGTHidden", thueGTGTHidden);
      console.log("maxPriceGTGT", maxPriceGTGT);
      console.log("minPriceGTGT", minPriceGTGT);
      if (Number(thueGTGTHidden) > Number(maxPriceGTGT)) {
        calcuThueGTGT(ob);
      } else if (Number(thueGTGTHidden) < Number(minPriceGTGT)) {
        calcuThueGTGT(ob);
      } else {
        var amountGTGTShow =
          Number(thanhtiendongianhansoluong) + Number(thueGTGTHidden);
        var arrayAmountGTGT = formatDonGia(String(amountGTGTShow), 2);
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
    }
  } else {
    var arrayThueGTGT = formatThanhTien(String($(ob).val()), 2);
    var thueGTGTShow = arrayThueGTGT[0];
    var thueGTGTHidden = arrayThueGTGT[1];
    // console.log('asdasdasdasdadasdasdadadsd', thueGTGTShow);
    $(ob).parents("tr").find(".thueGTGT").attr("value", thueGTGTShow);
    $(ob).parents("tr").find(".thueGTGT").val(thueGTGTShow);
    // $(ob).parents('tr').find(".hidden_thueGTGT").val(thueGTGTShow);
    $(ob).parents("tr").find(".hidden_thueGTGT").attr("value", thueGTGTHidden);
    // if(tenform == 19 || tenform == 23 || tenform == 16 || tenform == 32 || tenform == 36){
    //   console.log('voasdansdnajkdnajksdnjkasdnjkn', $(ob).val());
    //   var priceHidden = $(ob).parents('tr').find('.hidden_dongia').val();
    //   var soluong = $(ob).parents('tr').find('.hidden_soluong').val();
    //   var thueGTGT = $(ob).parents('tr').find('.hidden_thueGTGT').val();
    //   // var hidden_t = $(ob).parents('tr').find('.hidden_thanhtienGTGT').val();
    //   if(currency == 'USD'){
    //     var amountGTGTShow = soluong * Number(priceHidden) + thueGTGTHidden;
    //   }else{
    //     var amountGTGTShow = parseFloat(soluong * priceHidden) + Number(thueGTGT)
    //     console.log('amoutGTGTShowwwwww', amountGTGTShow);
    //   }
    //   var arrayAmountGTGT = formatDonGia(String(amountGTGTShow),2);
    //   var arrayAmountGTGT = formatThanhTien(String(amountGTGTShow),2);
    //   var amountGTGTShow = arrayAmountGTGT[0];
    //   var amountGTGTHidden = arrayAmountGTGT[1];
    //   $(ob).parents('tr').find(".thanhtienGTGT").val(amountGTGTShow);
    //   $(ob).parents('tr').find(".hidden_thanhtienGTGT").attr('value', amountGTGTHidden);
    //   calcuTotalAmountVatOutPut();
    //   writeMoneyVAT();
    // }
  }
}
function clickChangeTotalPriceVat(ob) {
  var totalPriceVat = $(ob).val();
  var arrayTotalPriceVat = formatThanhTien(totalPriceVat);
  var totalPriceVatShow = arrayTotalPriceVat[0];
  var totalPriceVatHidden = arrayTotalPriceVat[1];
  $("#show_tongtienthue").val(totalPriceVatShow);
  $("#hidden_tongtienthue").val(totalPriceVatHidden);
  $("#hidden_tongtienthue").attr("value", totalPriceVatHidden);
  writeMoney();

  calcuTotalAmountVatOutPut();
  writeMoneyVAT();
}

function calcuTotalPayment() {
  var currency = $("#hidden_currency").val()
    ? $("#hidden_currency").val()
    : "VND";
  var hiddenTotalPayment = 0;
  var showTotalPayment = 0;

  var totalMoney = $("#hidden_tongthanhtien").val();
  var totalVat = $("#hidden_tongtienthue").val();
  if (currency == "USD") {
    results = Number(totalMoney) + Number(totalVat);
  } else {
    results = parseFloat(totalMoney) + parseFloat(totalVat);
  }

  var arrayTotalPayment = formatThanhTien(String(results), 2);
  var showTotalPayment = arrayTotalPayment[0];
  var hiddenTotalPayment = arrayTotalPayment[1];

  $("#show_tongtienthanhtoan").val(showTotalPayment);
  $("#show_tongtienthanhtoan").attr("value", showTotalPayment);

  $("#hidden_tongtienthanhtoan").attr("value", hiddenTotalPayment);
  $("#hidden_tongtienthanhtoan").val(hiddenTotalPayment);

  $("#hidden_tongcongprice").attr("value", hiddenTotalPayment);
  $("#hidden_tongcongprice").val(hiddenTotalPayment);

  checkTotalHTandPayment();
  console.log("hidden_tongtienthanhtoan", hiddenTotalPayment);
  return hiddenTotalPayment;
}

function writeMoneyInvoice(TotalPayment) {
  var currency = $("#hidden_currency").val()
    ? $("#hidden_currency").val()
    : "VND";
  if (currency == "USD") {
    var bangchu = DocTienBangChuInvoiceUSD(TotalPayment);
  } else {
    var bangchu = DocTienBangChuInvoice(TotalPayment);
  }
  console.log(bangchu);
  $("#bangchu_vnd").val(bangchu);
  $("#bangchu_vnd").attr("value", bangchu);
  $("#hidden_bangchu_vnd").val(bangchu);
  $("#hidden_bangchu_vnd").attr("value", bangchu);

  return bangchu;
}

function writeMoneyInvoiceUSD(TotalPayment, currency) {
  console.log(TotalPayment); //đang lam tron
  var bangchu = DocTienBangChuInvoiceUSD(TotalPayment);
  $("#bangchu_vnd").val(bangchu);
  $("#bangchu_vnd").attr("value", bangchu);
  $("#hidden_bangchu_vnd").val(bangchu);
  $("#hidden_bangchu_vnd").attr("value", bangchu);
  console.log(bangchu);
  return bangchu;
  // $('#bangchu_usd').val(bangchu);
  // $('#bangchu_usd').attr(bangchu);
  // $('#hidden_bangchu_usd').val(bangchu);
  // $('#hidden_bangchu_usd').attr(bangchu);
}
function calcuTotalAmountOutPut() {
  var currency = $("#hidden_currency").val()
    ? $("#hidden_currency").val()
    : "VND";
  var lethanhtien = $("#lethanhtien").val();
  var hiddenTotalAmount = 0;
  var showTotalAmount = 0;

  var hiddenTotalAmount_output = 0; //Tính thành tiền xuất tồn
  var showTotalAmount_output = 0;
  // debugger;
  var formInvoice = $("#tenform").val();
  $(".hidden_thanhtien").each(function () {
    var checkck = $(this).parents("tr").find(".chietkhau").prop("checked");
    console.log(checkck);
    var checkkm = $(this).parents("tr").find(".khuyenmai").prop("checked");
    console.log(checkkm);
    var checkgcpro = $(this).parents("tr").find(".ghichupro").prop("checked");
    console.log(checkgcpro);
    var hidden_thanhtienGTGT = $(this)
      .parents("tr")
      .find(".hidden_thanhtienGTGT")
      .val();
      console.log("test", hidden_thanhtienGTGT);
    if (formInvoice == 1) {
      hidden_thanhtien_output = Number(hidden_thanhtienGTGT);
    } else {
      
      hidden_thanhtien_output = Number($(this).val());
      
    }

    if (checkgcpro == false) {
      if (checkck == true && checkkm == true) {
        hiddenTotalAmount_output += 0;
      } else if (checkck == true && checkkm == false) {
        hiddenTotalAmount_output =
          hiddenTotalAmount_output - Number($(this).val());
      } else if (checkck == false && checkkm == true) {
        hiddenTotalAmount_output += Number($(this).val());
      } else {
        hiddenTotalAmount_output += Number($(this).val());
      }
      console.log("hiddenTotalAmounttttttt", hiddenTotalAmount_output);
    }

    if (checkgcpro == false) {
      if (checkck == true && checkkm == true) {
        hidden_thanhtien = 0;
      } else if (checkck == true && checkkm == false) {
        hidden_thanhtien = 0 - Number($(this).val());
      } else if (checkck == false && checkkm == true) {
        hidden_thanhtien = Number($(this).val());
      } else {
        hidden_thanhtien = Number($(this).val());
      }
      hiddenTotalAmount += hidden_thanhtien;
    }
    // console.log('hiddenTotalAmounttttttt',hiddenTotalAmount);
  });
  // hiddenTotalAmount += totalVat;
  console.log("hiddenTotalAmount_output", hiddenTotalAmount_output);
  // if(currency == 'USD'){
  //   hiddenTotalAmount = $('#hidden_tongtienthanhtoan').val();
  // }
  if (lethanhtien == 0) {
    var results = Math.round(hiddenTotalAmount);
    var results_output = Math.round(hiddenTotalAmount_output);
    var results = results.toString();
    var results_output = results_output.toString();
  } else {
    var results = hiddenTotalAmount.toString();
    var results_output = hiddenTotalAmount_output.toString();
  }

  var arrayIntoMoney = formatThanhTien(results, 2);
  var moneyShow = arrayIntoMoney[0];
  var moneyHidden = arrayIntoMoney[1];

  var arrayIntoMoney_output = formatThanhTien(results_output, 2);
  var moneyShow_output = arrayIntoMoney_output[0];
  var moneyHidden_output = arrayIntoMoney_output[1];
  console.log(moneyHidden);
  $("#show_tongthanhtien").val(moneyShow);
  $("#show_tongthanhtien").attr("value", moneyShow);
  $("#hidden_tongthanhtien").attr("value", moneyHidden);
  $("#hidden_tongthanhtien").val(moneyHidden);

  $("#show_tongthanhtien_output").val(moneyShow_output);
  $("#show_tongthanhtien_output").attr("value", moneyShow_output);

  $("#hidden_tongthanhtien_output").attr("value", moneyHidden_output);
  $("#hidden_tongthanhtien_output").val(moneyHidden_output);

  var currency = $("#currency").val();
  if (currency != "0" && currency != "") {
    clickChangeServiceCharge();
  }

  return moneyHidden;
}
function calcuTotalAmountOutPut2() {
  var moneyHidden = $("#hidden_tongtienthanhtoan").val();

  return moneyHidden;
}

function calcuTotalVat() {
  var hiddenTotalVat = 0;
  var showTotalVat = 0;

  var totalMoney = $("#hidden_tongthanhtien").val();
  console.log(totalMoney);
  var vat = $("#phantram_thuesuat").val();

  // if($("#phantram_thuesuat").length){
  //   var vat = 0;
  // }
  var testtoan = $("#phantram_thuesuat").length;
  console.log(testtoan);
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
  if (totalMoney > 0) {
    results = parseFloat((totalMoney * vat) / 100);
  } else {
    results = 0;
  }

  var arrayTotalVat = formatThanhTien(results, 2);
  var showTotalVat = arrayTotalVat[0];
  var hiddenTotalVat = arrayTotalVat[1];
  console.log(hiddenTotalVat);
  $("#show_tienthuegtgt").val(showTotalVat);
  $("#hidden_tongtienthue").attr("value", hiddenTotalVat);

  console.log("tien thue GTGT", hiddenTotalVat);

  $("#hidden_tienthuegtgt").attr("value", hiddenTotalVat);
  $("#hidden_tienthuegtgt").val(hiddenTotalVat);
}
function clickChangeTotalMoneyNoVat(ob) {
  var tenform = $("#tenform").val();
  if (
    tenform == 16 ||
    tenform == 19 ||
    tenform == 23 ||
    tenform == 41 ||
    tenform == 32 ||
    tenform == 36
  ) {
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
      vat == "Không kê khai, tính nộp thuế GTGT" ||
      vat == "Không thay đổi thuế xuất" ||
      vat == "Không chịu thuế"
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
}

function calcuPriceVat(ob) {
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
    vat == "Không kê khai, tính nộp thuế GTGT" ||
    vat == "Không thay đổi thuế xuất" ||
    vat == "Không chịu thuế"
  ) {
    var vat = 0;
  }

  var priceHidden = $(ob).parents("tr").find(".hidden_dongia").val();
  var ThanhtienHidden = $(ob).parents("tr").find(".hidden_thanhtien").val();
  var hidden_tongthanhtien = $("#hidden_tongthanhtien").val();
  var hidden_tienthuegtgt = $("#hidden_tienthuegtgt").val();
  var hidden_tongtienthanhtoan = $("#hidden_tongtienthanhtoan").val();

  console.log("hidden_tongthanhtien", arrayTongThanhtien);

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
  var currency = $("#hidden_currency").val();
  var thueGTGTShow = 0;
  var thueGTGTHidden = 0;
  var vat = $("#phantram_thuesuat").val();
  var storeid = $("#storeId").val();

  console.log("vat", vat, $("phantram_thuesuat").length);
  if (vat == "Null") {
    var vat = $(ob).parents("tr").find(".hidden_GTGT").val();
  }
  console.log("vat", vat);
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

  console.log("vat123", vat);
  var priceHidden = $(ob).parents("tr").find(".hidden_dongia").val();
  var soluong = $(ob).parents("tr").find(".hidden_soluong").val();
  if (!soluong) {
    var soluong = 1;
  }
  if(storeid ==151344)
  {
      var thueGTGT_Raw = (soluong * priceHidden * vat) / 100; // Số gốc để tính toán
      // 1. Xử lý hiển thị (Show)
      var thueToDisplay = (currency == "USD") ? thueGTGT_Raw : Math.round(thueGTGT_Raw);

      var arrayThueGTGT = formatThanhTien(String(thueToDisplay), 2);
      var thueGTGTShow = arrayThueGTGT[0]; 

      $(ob).parents("tr").find(".thueGTGT").val(thueGTGTShow);

      $(ob).parents("tr").find(".hidden_thueGTGT").val(thueGTGT_Raw).attr("value", thueGTGT_Raw);
  }else{
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

}

function calcuIntoMoneyGTGT(ob) {
  debugger;
  console.log("aaaaaa", $(ob).val());
  var currency = $("#hidden_currency").val()
    ? $("#hidden_currency").val()
    : "VND";
  var amountGTGTShow = 0;
  var amountGTGTHidden = 0;
  var vat = $("#phantram_thuesuat").val();
  var storeid = $("#storeId").val();

  // if($('phantram_thuesuat').length){
  //   var vat = 0;
  // }
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

  var priceHidden = $(ob).parents("tr").find(".hidden_dongia").val();
  var soluong = $(ob).parents("tr").find(".hidden_soluong").val();
  if (!soluong) {
    var soluong = 1;
  }
  // console.log('aaaaaaaaaaaa',priceHidden,vat);
  if (currency == "USD") {
    var amountGTGTShow =
      soluong * (Number(priceHidden) + (priceHidden * vat) / 100);
  } else {
    if(storeid == 151344)
    {
    var amountGTGTShow = 
          soluong * (Number(priceHidden) + (priceHidden * vat) / 100)
       ;
       var amountGTGTShowHidden = amountGTGTShow;
    }else{
    var amountGTGTShow = Math.round(
          soluong * (Number(priceHidden) + (priceHidden * vat) / 100)
        );
    }
   
    console.log("amoutGTGTShowwwwww", amountGTGTShow);
  }
  var arrayAmountGTGT = formatDonGia(String(amountGTGTShow), 2);
  var arrayAmountGTGT = formatThanhTien(String(amountGTGTShow), 2);
  console.log(arrayAmountGTGT);
  var amountGTGTShow = arrayAmountGTGT[0];
  var amountGTGTHidden = arrayAmountGTGT[1];
    if(storeid == 151344)
    {
       var amountGTGTHidden = arrayAmountGTGT[1];
    }
  console.log(amountGTGTHidden);
  $(ob).parents("tr").find(".thanhtienGTGT").val(amountGTGTShow);
  $(ob)
    .parents("tr")
    .find(".hidden_thanhtienGTGT")
    .attr("value", amountGTGTHidden);
}

// tính ngược đơn giá với đơn giá có giá trị gia tăng
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
  if (
    tenform == 19 ||
    tenform == 1 ||
    tenform == 16 ||
    tenform == 23 ||
    tenform == 41 ||
    tenform == 32 ||
    tenform == 36 ||
    tenform == 38
  ) {
    calcuTotalAmountVatOutPut();
    writeMoneyVAT();
  }
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
  // calcuTotalAmountOutPut();
  // calcuTotalVat();
  // calcuTotalPayment();
  // // writeMoney();
  // writeMoney3();
  // if(tenform == 19 || tenform == 1 || tenform == 16 || tenform == 23 || tenform == 32){
  //   calcuTotalAmountVatOutPut();
  //   writeMoneyVAT();
  // }
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
  if (
    tenform == 19 ||
    tenform == 1 ||
    tenform == 16 ||
    tenform == 23 ||
    tenform == 41 ||
    tenform == 32 ||
    tenform == 36 ||
    tenform == 38
  ) {
    calcuTotalAmountVatOutPut();
    writeMoneyVAT();
  }
}
// hàng hóa đặc trưng
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




function searchInfoProductOutPut(valueinput, row) {
  var op = "inventory_searchprooutput";
  var row = row; //get so dong nhap vao
  var value = $(valueinput).val();
  console.log(value);
  if (value.length >= 2) {
    $.ajax({
      type: "POST",
      url: "/ajax.php",
      data: {
        op: op,
        value: value,
        row: row, //get so dong nhap vao
      },
      success: function (data) {
        $(valueinput).parents("tr").find(".prosku-searching-box").show();
        $(valueinput).parents("tr").find(".prosku-searching-box").html(data);
      },
    });
  } else {
    $(".prosku-searching-box").hide();
  }
}

function calcuTotalAmountVatOutPut() {
  var currency = $("#hidden_currency").val();
  var lethanhtien = $("#lethanhtien").val();
  var storeId = $("#storeId").val();


  if (!lethanhtien) {
    var lethanhtien = 0;
  }
  var hiddenTotalAmountVAT = 0;
  var showTotalAmountVAT = 0;
  console.log(lethanhtien);

  $(".hidden_thanhtienGTGT").each(function () {
    var checkck = $(this).parents("tr").find(".chietkhau").prop("checked");
    var checkkm = $(this).parents("tr").find(".khuyenmai").prop("checked");
    // thieu ghi chu hazz
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
    if(storeId == 151344 ){
    var results = (hiddenTotalAmountVAT);
    }else{
    var results = Math.round(hiddenTotalAmountVAT);
    }
    var results = results.toString();
  }

  var arrayIntoMoney = formatThanhTien(results, 2);
  var moneyShow = arrayIntoMoney[0];
  var moneyHidden = arrayIntoMoney[1];

  $("#show_tongcongpriceGTGT").val(moneyShow);
  $("#hidden_tongcongpriceGTGT").attr("value", moneyHidden);
  return moneyHidden;
}

function clickSearchProOutPut(nv) {
  var idPro = $(nv).data("id");
  var idWarehouse = $("#warehouse").val();
  console.log(idWarehouse);
  $(".prosku-searching-box").hide();

  var check_createinv = $("#createinvoice").val();
  if (check_createinv != "1") {
    check_createinv = 2;
  } else {
    check_createinv = 1;
  }

  var op = "inventory_getinfoprooutput";
  $.ajax({
    type: "POST",
    url: "/ajax.php",
    dataType: "json",
    data: {
      op: op,
      idPro: idPro,
      idWarehouse: idWarehouse,
      check_createinv: check_createinv,
    },
    success: function (data) {
      // console.log(data['id_pro']);
      if (data["success"] == 0) {
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

        $(nv).parents("tr").find(".soluong").val(1);
        $(nv).parents("tr").find(".hidden_soluong").attr("value", 1);

        var arrayDonGia = formatDonGia(String(data["proPrice"]), 2);
        $(nv).parents("tr").find(".dongia").val(arrayDonGia[0]);
        $(nv)
          .parents("tr")
          .find(".hidden_dongia")
          .attr("value", arrayDonGia[1]);

        var arrayThanhTien = formatThanhTien(String(data["proPrice"]), 2);
        $(nv).parents("tr").find(".thanhtien").val(arrayThanhTien[0]);
        $(nv)
          .parents("tr")
          .find(".hidden_thanhtien")
          .attr("value", arrayDonGia[1]);

        calcuPriceVat(nv);
        calcuThueGTGT(nv);
        calcuIntoMoneyGTGT(nv);
        calcuTotalAmountOutPut();
        calcuTotalAmountVatOutPut();
        calcuTotalVat();
        writeMoney();
        writeMoneyVAT();

        if (data["proIdWarehouse"]) {
          $(nv).parents("tr").find(".makho").val(data["proIdWarehouse"]);
          $(nv)
            .parents("tr")
            .find(".makho")
            .attr("value", data["proIdWarehouse"]);
        }

        if (data["proIdParcel"]) {
          $(nv).parents("tr").find(".solo").val(data["proIdParcel"]);
          $(nv).parents("tr").find(".solo").attr("value", data["proIdParcel"]);
        }

        if (data["proDateExpiry"]) {
          $(nv).parents("tr").find(".hsd").val(data["proDateExpiry"]);
          $(nv).parents("tr").find(".hsd").attr("value", data["proDateExpiry"]);
        }

        if (data["proIdGroup"]) {
          $(nv).parents("tr").find(".nhh").val(data["proIdGroup"]);
          $(nv).parents("tr").find(".nhh").attr("value", data["proIdGroup"]);
        }

        if (data["proIdProductType"]) {
          $(nv).parents("tr").find(".lhh").val(data["proIdProductType"]);
          $(nv)
            .parents("tr")
            .find(".lhh")
            .attr("value", data["proIdProductType"]);
        }

        if (data["proNote"]) {
          $(nv).parents("tr").find(".ghichu").val(data["proNote"]);
          $(nv).parents("tr").find(".ghichu").attr("value", data["proNote"]);
        }
      }
    },
  });
}

function changeVat(ob) {
  var vat = $(ob).val();
  if (isNaN(vat)) {
    var vat = 0;
  }
  $(".hidden_dongia").each(function () {
    $(this).parents("tr").find(".GTGT").val(vat);
    $(this).parents("tr").find(".hidden_GTGT").val(vat);

    var hiddenPrice = $(this).parents("tr").find(".hidden_dongia").val();
    var priceVat =
      Number(hiddenPrice) + Math.round((Number(hiddenPrice) * vat) / 100);
    var arrayPriceVat = formatDonGia(String(priceVat), 2);
    var showPriceVat = arrayPriceVat[0];
    var hiddenPriceVat = arrayPriceVat[1];
    $(this).parents("tr").find(".dongiavat").val(showPriceVat);
    $(this).parents("tr").find(".hidden_dongiavat").val(hiddenPriceVat);

    calcuThueGTGT(this);
    // console.log(priceVat);
    console.log("aaaa", hiddenPrice, showPriceVat, hiddenPriceVat);
  });
  calcuTotalVat();
  calcuTotalPayment();
  writeMoney();

  calcuTotalAmountVatOutPut();
  writeMoneyVAT();
}

function clickChangeTax_old() {
  var currency = $("#hidden_currency").val()
    ? $("#hidden_currency").val()
    : "VND";
  console.log(currency);
  $(".dongia").each(function (key, ob) {
    calcuPriceVat(ob);
  });
  // console.log(currency);
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
    // Results
    if (moneytotal + moneycharge + moneytaxttdb > 0) {
      results = (moneytotal + moneycharge + moneytaxttdb) * (rate_tax / 100);
    } else {
      results = 0;
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
    // Results
    results = (moneytotal + moneycharge + moneytaxttdb) * (rate_tax / 100);
    var arrayTax = formatThanhTien(results, 2);
  }
  var showTax = arrayTax[0];
  var hiddenTax = arrayTax[1];
  $("#show_tienthuegtgt").val(showTax);
  $("#hidden_tienthuegtgt").val(hiddenTax);
  $("#hidden_tongtienthue").val(hiddenTax);
  // getRate();
  changeSumMoneyTotalPayment();
}


function clickChangeTax() {
  var currency = $("#hidden_currency").val()
    ? $("#hidden_currency").val()
    : "VND";
  var inv_form = $("#tenform").val()
    ? $("#tenform").val()
    : "0";
  console.log(currency);
  $(".dongia").each(function (key, ob) {
    calcuPriceVat(ob);
  });
  // console.log(currency);
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

    if (inv_form == 21 || inv_form==42) {
      rate_taxHKD = $.isNumeric($("#phantram_thuesuatHKD").val())
        ? parseFloat($("#phantram_thuesuatHKD").val())
        : 0;
    // rate_taxHKD = $("#phantram_thuesuatHKD").is(":checked") ? 2 : 0;
      // Results
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

    if (inv_form == 21 || inv_form==42) {
    //  rate_taxHKD = $("#phantram_thuesuatHKD").is(":checked") ? 2 : 0;
     rate_taxHKD = $.isNumeric($("#phantram_thuesuatHKD").val())
        ? parseFloat($("#phantram_thuesuatHKD").val())
        : 0;
      tatolAmount = (moneytotal + moneycharge + moneytaxttdb);
      tatolReduced = tatolAmount * (rate_taxHKD / 100);
      results = (tatolReduced * (20 / 100));

    } else {
      results = (moneytotal + moneycharge + moneytaxttdb) * (rate_tax / 100);
    }

    // Results
    var arrayTax = formatThanhTien(results, 2);
  }
  var showTax = arrayTax[0];
  var hiddenTax = arrayTax[1];
  if (inv_form == 21 || inv_form==42) {
    // show form giảm trừ
    $("#hidden_showdeductionAmount").val(hiddenTax);
    $("#showdeductionAmount").val(showTax);
    $("#text_deductionAmount").text(showTax);
  } else {
    $("#show_tienthuegtgt").val(showTax);
    $("#hidden_tienthuegtgt").val(hiddenTax);
    $("#hidden_tongtienthue").val(hiddenTax);
  }
  // getRate();
  changeSumMoneyTotalPayment();
}




function changeTax(ob) {
  var value_tax = String($(ob).val());
  // Results

  var arrayMoneyCharge = formatThanhTien(value_tax);
  var showMoneyCharge = arrayMoneyCharge[0];
  var hiddenMoneyCharge = arrayMoneyCharge[1];
  console.log(hiddenMoneyCharge);
  $("#show_tienthuegtgt").val(showMoneyCharge);
  $("#hidden_tienthuegtgt").val(hiddenMoneyCharge);
  $("#hidden_tongtienthue").val(hiddenMoneyCharge);

  changeSumMoneyTotalPayment();
}

function DocSo3ChuSo(baso) {
  var tram;
  var chuc;
  var donvi;
  var KetQua = "";
  tram = parseInt(baso / 100);
  chuc = parseInt((baso % 100) / 10);
  donvi = baso % 10;
  if (tram == 0 && chuc == 0 && donvi == 0) return "";
  if (parent == 0) {
    if (tram != 0) {
      KetQua += ChuSo[tram] + " trăm";
      if (chuc == 0 && donvi != 0) KetQua += " linh";
    }
  } else {
    KetQua += ChuSo[tram] + " trăm";
    if (chuc == 0 && donvi != 0) KetQua += " linh";
  }

  if (chuc != 0 && chuc != 1) {
    KetQua += ChuSo[chuc] + " mươi";
    if (chuc == 0 && donvi != 0) KetQua = KetQua + " linh";
  }
  if (chuc == 1) KetQua += " mười";
  switch (donvi) {
    case 1:
      if (chuc != 0 && chuc != 1) {
        KetQua += " mốt";
      } else {
        KetQua += ChuSo[donvi];
      }
      break;
    case 5:
      if (chuc == 0) {
        KetQua += ChuSo[donvi];
      } else {
        KetQua += " lăm";
      }
      break;
    default:
      if (donvi != 0) {
        KetQua += ChuSo[donvi];
      }
      break;
  }
  return KetQua;
}

function DocTienBangChu(SoTien) {
  var ChuSo = new Array(
    " không",
    " một",
    " hai",
    " ba",
    " bốn",
    " năm",
    " sáu ",
    " bảy",
    " tám",
    " chín"
  );
  var Tien = new Array("", " nghìn", " triệu", " tỷ", " nghìn tỷ", " triệu tỷ");
  var lan = 0;
  var i = 0;
  var so = 0;
  var KetQua = "";
  var tmp = "";
  var ViTri = new Array();
  if (SoTien < 0) return "Số tiền âm !";
  if (SoTien == 0) return "Không đồng !";
  if (SoTien > 0) {
    so = SoTien;
  } else {
    so = -SoTien;
  }
  if (SoTien > 9999999999999999) {
    //SoTien = 0;
    return "Số quá lớn!";
  }
  ViTri[5] = Math.floor(so / 1000000000000000);
  if (isNaN(ViTri[5])) ViTri[5] = "0";
  so = so - parseFloat(ViTri[5].toString()) * 1000000000000000;
  ViTri[4] = Math.floor(so / 1000000000000);
  if (isNaN(ViTri[4])) ViTri[4] = "0";
  so = so - parseFloat(ViTri[4].toString()) * 1000000000000;
  ViTri[3] = Math.floor(so / 1000000000);
  if (isNaN(ViTri[3])) ViTri[3] = "0";
  so = so - parseFloat(ViTri[3].toString()) * 1000000000;
  ViTri[2] = parseInt(so / 1000000);
  if (isNaN(ViTri[2])) ViTri[2] = "0";
  ViTri[1] = parseInt((so % 1000000) / 1000);
  if (isNaN(ViTri[1])) ViTri[1] = "0";
  ViTri[0] = parseInt(so % 1000);
  if (isNaN(ViTri[0])) ViTri[0] = "0";
  if (ViTri[5] > 0) {
    lan = 5;
  } else if (ViTri[4] > 0) {
    lan = 4;
  } else if (ViTri[3] > 0) {
    lan = 3;
  } else if (ViTri[2] > 0) {
    lan = 2;
  } else if (ViTri[1] > 0) {
    lan = 1;
  } else {
    lan = 0;
  }
  for (i = lan; i >= 0; i--) {
    if (i == lan) {
      var parent = 0;
    } else {
      var parent = 1;
    }
    tmp = DocSo3ChuSo(ViTri[i], parent);
    KetQua += tmp;
    if (ViTri[i] > 0) KetQua += Tien[i];
    // if ((i > 0) && (tmp.length > 0)) KetQua += ',';//&& (!string.IsNullOrEmpty(tmp))
  }
  if (KetQua.substring(KetQua.length - 1) == ",") {
    KetQua = KetQua.substring(0, KetQua.length - 1);
  }
  KetQua = KetQua.substring(1, 2).toUpperCase() + KetQua.substring(2);
  console.log(KetQua);
  return KetQua + " đồng."; //.substring(0, 1);//.toUpperCase();// + KetQua.substring(1);
}

function changeSumMoneyTotalPayment() {
  var currency = $("#hidden_currency").val()
    ? $("#hidden_currency").val()
    : "VND";
  var tenform = $("#tenform").val();
  console.log(tenform);
  if (currency == "USD") {
    moneytotal = parseFloat($("#hidden_tongthanhtien").val());
    if (isNaN(moneytotal)) {
      // String
      moneytotal = 0;
    }
    moneycharge = parseFloat($("#hidden_phiphucvu").val());
    if (isNaN(moneycharge)) {
      // String
      moneycharge = 0;
    }
    moneytaxttdb = parseFloat($("#hidden_thuettdb").val());
    if (isNaN(moneytaxttdb)) {
      // String
      moneytaxttdb = 0;
    }
    moneytax = parseFloat($("#hidden_tienthuegtgt").val());
    if (isNaN(moneytax)) {
      // String
      moneytax = 0;
    }
    console.log(moneytax);
    // Results
    // console.log(hiddenTotalPayment);
    if(tenform ==21 || tenform==42)
    {
        moneyDeduction= parseFloat($("#hidden_showdeductionAmount").val());
        if (isNaN(moneyDeduction)) {
          moneyDeduction = 0;
        }
        results = moneytotal + moneycharge  - moneyDeduction;

    }else{
        results = moneytotal + moneycharge + moneytaxttdb + moneytax;

    }


    var arrayTotalPayment = formatThanhTien(results, 2);
    var showTotalPayment = arrayTotalPayment[0];
    var hiddenTotalPayment = arrayTotalPayment[1];
    $("#show_tongtienthanhtoan").val(showTotalPayment);
    $("#hidden_tongtienthanhtoan").val(hiddenTotalPayment);
    $("#hidden_tongcongprice").val(hiddenTotalPayment);

    //update cho mẫu khác thuê, khi copy hoa don doc la ko do
    //coder: Phuc Toan 31/05/2022
    if (
      tenform == 19 ||
      tenform == 1 ||
      tenform == 16 ||
      tenform == 41 ||
      tenform == 23 ||
      tenform == 32 ||
      tenform == 36 ||
      tenform == 38
    ) {
      results = $("#hidden_tongcongpriceGTGT").val();
      writeMoneyInvoice(results);
    } else {
      writeMoneyInvoice(hiddenTotalPayment);
    }
  } else {
    moneytotal = parseFloat($("#hidden_tongthanhtien").val());
    if (isNaN(moneytotal)) {
      // String
      moneytotal = 0;
    }
    moneycharge = parseFloat($("#hidden_phiphucvu").val());
    if (isNaN(moneycharge)) {
      // String
      moneycharge = 0;
    }
    moneytaxttdb = parseFloat($("#hidden_thuettdb").val());
    if (isNaN(moneytaxttdb)) {
      // String
      moneytaxttdb = 0;
    }
    moneytax = parseFloat($("#hidden_tienthuegtgt").val());
    if (isNaN(moneytax)) {
      // String
      moneytax = 0;
    }
    // console.log(hiddenTotalPayment);
    if(tenform ==21 || tenform==42)
    {
        moneyDeduction= parseFloat($("#hidden_showdeductionAmount").val());
        if (isNaN(moneyDeduction)) {
          // String
          moneyDeduction = 0;
        }
       results = parseFloat(moneytotal + moneycharge  - moneyDeduction);
    }else{
       results = parseFloat(moneytotal + moneycharge + moneytaxttdb + moneytax);
    }


    var arrayTotalPayment = formatThanhTien(results, 2);
    // console.log(arrayTotalPayment);
    var showTotalPayment = arrayTotalPayment[0];
    var hiddenTotalPayment = arrayTotalPayment[1];
    $("#show_tongtienthanhtoan").val(showTotalPayment);
    $("#hidden_tongtienthanhtoan").val(hiddenTotalPayment);
    $("#hidden_tongcongprice").val(hiddenTotalPayment);
    // console.log(hiddenTotalPayment);
    //update cho mẫu khác thuê, khi copy hoa don doc la ko dong
    //coder: Phuc Toan 31/05/2022

    if (
      tenform == 19 ||
      tenform == 1 ||
      tenform == 16 ||
      tenform == 23 ||
      tenform == 41 ||
      tenform == 32 ||
      tenform == 36 ||
      tenform == 38
    ) {
      results = $("#hidden_tongcongpriceGTGT").val();
      writeMoneyInvoice(results);
    } else {
      writeMoneyInvoice(hiddenTotalPayment);
    }
  }

  changeSumMoneyTotalPaymentToCurrency();
}

function clickChangePriceAccounting(ob) {
  var money = $(ob).parents("tr").find(".dgtt").val();
  var arrayMoney = formatDonGia(money);
  var moneyShow = arrayMoney[0];
  var moneyHidden = arrayMoney[1];
  $(ob).parents("tr").find(".dgtt").val(moneyShow);
  $(ob).parents("tr").find(".hidden_dgtt").attr("value", moneyHidden);
  totalAmountAccounting = calcuTotalAmountAccounting();
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

function calcuTotalAmountAccounting() {
  var lethanhtien = $("#lethanhtien").val();
  var hiddenTotalAmount = 0;
  $(".hidden_dgtt").each(function () {
    hiddenTotalAmount += Number($(this).val());
  });
  if (lethanhtien == 0) {
    var results = Math.round(hiddenTotalAmount);
    var results = results.toString();
  } else {
    var results = hiddenTotalAmount.toString();
  }
  var arrayTotalAmount = formatThanhTien(results, 2);
  var moneyShow = arrayTotalAmount[0];
  var moneyHidden = arrayTotalAmount[1];
  $("#total_money_ht").val(moneyShow);
  $("#hidden_total_money_ht").attr("value", moneyHidden);
  checkTotalHTandPayment();
  return moneyHidden;
}

function addDays(date, days) {
  var result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}

function changeDateAddInventoryOutput() {
  var ngayhoadon = $("#show_ngayhoadon").val();
  var ob = $("#show_ngayhoadon");
  ngayhoadon = formatNgay(ngayhoadon)[1];

  var ob1 = $(ob).parents()[1];
  if (ngayhoadon != -1) {
    $(ob).val(ngayhoadon);
    $(ob).attr("value", ngayhoadon);
    $(ob1).next().find(".edatenew").removeClass("bf");
    $(ob1).next().find(".edatenew").text("");

    $("#show_ngayhoadon").val(ngayhoadon);
    $("#show_ngayhoadon").attr("value", ngayhoadon);
    var ngayhoadoncuoi = $("#hidden_ngayhoadoncuoi").val();

    var objectNgayHD = formatNgay(ngayhoadon)[0];
    var form_NgayHD = Date.parse(objectNgayHD);

    var objectNgayHDC = formatNgay(ngayhoadoncuoi)[0];
    var form_NgayHDC = Date.parse(objectNgayHDC);

    // kiểm tra so ngay duoc xuat trong cau hinh
    var songayduocxuat = parseInt($("#inv_songayduocxuat").val());
    var datenow = Date.now();
    var plus = addDays(datenow, songayduocxuat);
    var dateplus = Date.parse(plus);

    var flag = true;

    // console.log(objectNgayHD,ngayhoadon,form_NgayHD,objectNgayHDC,form_NgayHDC,datenow,plus,dateplus);
    if (form_NgayHD < form_NgayHDC) {
      $(".edateaddinventory").addClass("bf");
      $(".edateaddinventory").text(
        "Ngày hóa đơn lớn hơn hoặc bằng ngày " + ngayhoadoncuoi
      );
      $(".ngayhoadon").addClass("err_border");
      $(".ngayhoadon_invoicenew").addClass("err_border");
      flag = false;
    } else if (form_NgayHD > dateplus) {
      $(".edateinvoicenew").addClass("bf");
      $(".edateinvoicenew").text("Ngày xuất vượt quá giới hạn cho phép! ");
      $(".ngayhoadon_invoicenew").addClass("err_border");
      flag = false;
    } else {
      $(".edateaddinventory").removeClass("bf");
      $(".edateaddinventory").text("");
      $(".ngayhoadon").removeClass("err_border");
      $(".ngayhoadon_invoicenew ").removeClass("err_border");
      $(".edateinvoicenew").removeClass("bf");
      $(".edateinvoicenew").text("");

      dateCalculation1();
    }
    return flag;
  } else {
    $(ob1).next().find(".edatenew").addClass("bf");
    $(ob1).next().find(".edatenew").text("Ngày chưa hợp lệ!");
  }
}

function checkInvoiceInventory() {
  var checkinv = $("#createinvoice").val();

  var ngayhoadonGoc = $("#show_ngayhoadon").val();
  var ngayhoadon = ngayhoadonGoc.replace(/-/g, "/"); // Ngày của hóa đơn cuối
  var ngayhoadon = ngayhoadon.split("/");
  var ngayhoadon = new Date(+ngayhoadon[2], ngayhoadon[1] - 1, +ngayhoadon[0]);
  var ngayhoadon = Date.parse(ngayhoadon);

  var ngayphathanhGoc = $("#hidden_ngayphathanh").val();
  var ngayphathanh = ngayphathanhGoc.replace(/-/g, "/"); // Ngày của hóa đơn cuối
  var ngayphathanh = ngayphathanh.split("/");
  var ngayphathanh = new Date(
    +ngayphathanh[2],
    ngayphathanh[1] - 1,
    +ngayphathanh[0]
  );
  var ngayphathanh = Date.parse(ngayphathanh);

  var ngayhoadoncuoiGoc = $("#hidden_ngayhoadoncuoi").val();
  var ngayhoadoncuoi = ngayhoadoncuoiGoc.replace(/-/g, "/"); // Ngày của hóa đơn cuối
  var ngayhoadoncuoi = ngayhoadoncuoi.split("/");
  var ngayhoadoncuoi = new Date(
    +ngayhoadoncuoi[2],
    ngayhoadoncuoi[1] - 1,
    +ngayhoadoncuoi[0]
  );
  var ngayhoadoncuoi = Date.parse(ngayhoadoncuoi);

  var songayduocno = $("#debit_term").val();

var hanthanhtoanGoc = $("#payment_term").val();
var hanthanhtoan; 

if (hanthanhtoanGoc && hanthanhtoanGoc.trim() != "") {
    var parts = hanthanhtoanGoc.replace(/-/g, "/").split("/");
    var d = new Date(
        +parts[2],     
        parts[1] - 1,  
        +parts[0]      
    );
    hanthanhtoan = Date.parse(d);
} else {
    var today = new Date();
    today.setHours(0, 0, 0, 0); 
    hanthanhtoan = Date.parse(today); 
}
 

  if ($("#hidden_mauso").val()) {
    var mauso = $("#hidden_mauso").val();
  } else {
    var mauso = 0;
  }
  var kyhieu = $("#hidden_kyhieu").val();
  var sohoadon = $("#hidden_sohoadon").val();
  var hinhthucthanhtoan = $("#payment").val();
  var loaitien = $("#currency").val();
  var makho = $("#warehouse").val();
  var email = $("#email").val();

  var masothue = $("#masothue").val();
  var tendonvi = $("#tendonvi").val();

  var tongthanhtien = $("#hidden_tongthanhtien").val();
  // var vat = $("#vat").val();
  // if (isNaN(vat)) {
  //   var vat = 0;
  // }

   var vat = $("#phantram_thuesuat").val();
  if (isNaN(vat)) {
    var vat = 0;
  }

  var tongtienthue = $("#hidden_tongtienthue").val();
  var tongtienthanhtoan = $("#hidden_tongcongprice").val();
  var tongtienhachtoan = $("#hidden_total_money_ht").val();

  // console.log(mauso,kyhieu,sohoadon,hinhthucthanhtoan,loaitien,makho,masothue,tendonvi,tongthanhtien,tongtienthue,tongtienthanhtoan,tongtienhachtoan,calcuTotalAmountOutPut());

  var message = "";
  var html = '<h4 class="modal-title">Danh sách lỗi</h4>';
  var flag = true;

  var op = "inventory_submitinvoice";
  $.ajax({
    type: "POST",
    url: "/ajax.php",
    dataType: "json",
    data: {
      op: op,
    },
    success: function (data) {
      console.log("Aa", data);
      if (data["success"] == 0) {
        //console.log(mauso);
        if ($("#createinvoice").prop("checked") == true) {
          if (mauso != data["mauSo"] && mauso != 0) {
            message = message + "Mẫu số không trùng " + data["mauSo"] + "\n";
            html += "<p>Mẫu số không trùng " + data["mauSo"] + "</p>";
          }
          if (kyhieu != data["kyHieu"]) {
            message = message + "Ký hiệu không trùng " + data["kyHieu"] + "\n";
            html += "<p>Ký hiệu không trùng " + data["kyHieu"] + "</p>";
          }
          if (Number(sohoadon) - data["soHoaDonCuoi"] != 1) {
            message =
              message +
              "Số hóa đơn không liên tiếp số trước " +
              data["soHoaDonCuoi"] +
              "\n";
            html +=
              "<p>Số hóa đơn không liên tiếp số trước " +
              data["soHoaDonCuoi"] +
              "</p>";
          }
        }

        if (ngayhoadon < data["ngayXuatCuoi"]) {
          message =
            message +
            "Ngày nhỏ hơn ngày hóa đơn trước " +
            data["ngayXuatCuoi"] +
            "\n";
          html +=
            "<p>Ngày nhỏ hơn ngày hóa đơn trước" +
            data["ngayXuatCuoi"] +
            "</p>";
        }
        if (
          data["hinhThucThanhToan"].includes(hinhthucthanhtoan) == false ||
          hinhthucthanhtoan == 0
        ) {
          message = message + "Hình thức thanh toán không tồn tại " + "\n";
          html += "<p>Hình thức thanh toán không tồn tại</p>";
        }
        
        if (data["maKho"].includes(makho) == false || makho == 0) {
          message = message + "Mã kho không tồn tại " + "\n";
          html += "<p>Mã kho không tồn tại</p>";
        }

        if (ngayhoadon < ngayhoadoncuoi && checkinv == "1") {
          message =
            message +
            "Ngày hóa đơn nhỏ hơn ngày hóa đơn trước đó " +
            ngayhoadoncuoiGoc +
            "\n";
          html +=
            "<p>Ngày hóa đơn nhỏ hơn ngày hóa đơn trước đó " +
            ngayhoadoncuoiGoc +
            "</p>";
        }
        if (ngayhoadon < ngayphathanh) {
          message =
            message +
            "Ngày hóa đơn nhỏ hơn ngày phát hành " +
            ngayphathanhGoc +
            "\n";
          html +=
            "<p>Ngày hóa đơn nhỏ hơn ngày phát hành " +
            ngayphathanhGoc +
            "</p>";
        }
        if (hanthanhtoan < ngayhoadon) {
          message =
            message +
            "Hạn thanh toán nhỏ hơn ngày hóa đơn " +
            ngayhoadonGoc +
            "\n";
          html +=
            "<p>Hạn thanh toán nhỏ hơn ngày hóa đơn " + ngayhoadonGoc + "</p>";
        }

        if ($("#novat").prop("checked") == false) {
          if (
            $("#masothue").val() == "" &&
            $("#tennguoimua").val() == "" &&
            $("#tendonvi").val() == ""
          ) {
            message = message + "Không có thông tin người mua" + "\n";
            html += "<p>Không có thông tin người mua</p>";
          }
        }

        var maSKULineError = "";
        var maSKULineSameError = "";
        var maHangLineError = "";
        var maHangLineSameError = "";
        var tenHangLineError = "";
        var tenHangLineSameError = "";
        var maKhoLineError = "";
        var soLoLineError = "";
        var nhomHangLineError = "";
        var loaiHangLineError = "";
        var arrayMaSKU = [];
        var arrayMaHang = [];
        var arrayTenHang = [];
        var key = 0;
        $(".hidden_thanhtien").each(function () {
          key += 1;
          if ($(this).parents("tr").find(".masku").val()) {
            var maSKULine = $(this).parents("tr").find(".masku").val();
            if (arrayMaSKU.includes(maSKULine) == true) {
              maSKULineSameError += key + ",";
            } else {
              arrayMaSKU.push(maSKULine);
            }
          } else {
            var maSKULine = "";
          }
          if ($(this).parents("tr").find(".mahang").val()) {
            var maHangLine = $(this).parents("tr").find(".mahang").val();
            if (arrayMaHang.includes(maHangLine) == true) {
              maHangLineSameError += key + ",";
            } else {
              arrayMaHang.push(maHangLine);
            }
          } else {
            var maHangLine = "";
          }
          if ($(this).parents("tr").find(".tenhang").val()) {
            var tenHangLine = $(this).parents("tr").find(".tenhang").val();
            if (arrayTenHang.includes(tenHangLine) == true) {
              tenHangLineSameError += key + ",";
            } else {
              arrayTenHang.push(tenHangLine);
            }
          } else {
            var tenHangLine = "";
          }
          if ($(this).parents("tr").find(".makho").val()) {
            var maKhoLine = $(this).parents("tr").find(".makho").val();
          } else {
            var maKhoLine = 0;
          }
          if ($(this).parents("tr").find(".solo").val()) {
            var soLoLine = $(this).parents("tr").find(".solo").val();
          } else {
            var soLoLine = 0;
          }
          if ($(this).parents("tr").find(".nhh").val()) {
            var nhomHangLine = $(this).parents("tr").find(".nhh").val();
          } else {
            var nhomHangLine = 0;
          }
          if ($(this).parents("tr").find(".lhh").val()) {
            var loaiHangLine = $(this).parents("tr").find(".lhh").val();
          } else {
            var loaiHangLine = 0;
          }

          if (maSKULine == "") {
            maSKULineError += key + ",";
          }
          if (maHangLine == "") {
            maHangLineError += key + ",";
          }
          if (tenHangLine == "") {
            tenHangLineError += key + ",";
          }
          if (data["maKho"].includes(maKhoLine) == false) {
            maKhoLineError += key + ",";
          }
          if (soLoLine == "") {
            soLoLineError += key + ",";
          }
          if (data["nhomHang"].includes(nhomHangLine) == false) {
            nhomHangLineError += key + ",";
          }
          if (data["loaiHang"].includes(loaiHangLine) == false) {
            loaiHangLineError += key + ",";
          }
        });
        if (maSKULineError != "") {
          message =
            message + "Mã SKU đang để trống tại dòng: " + maSKULineError + "\n";
          html +=
            "<p>Mã SKU đang để trống tại dòng: " + maSKULineError + "</p>";
        }
        if (maSKULineSameError != "") {
          message =
            message + "Mã SKU trùng tại dòng: " + maSKULineSameError + "\n";
          html += "<p>Mã SKU trùng tại dòng: " + maSKULineSameError + "</p>";
        }
        if (maHangLineError != "") {
          message =
            message +
            "Mã hàng đang để trống tại dòng: " +
            maHangLineError +
            "\n";
          html +=
            "<p>Mã hàng đang để trống tại dòng: " + maHangLineError + "</p>";
        }
        if (maHangLineSameError != "") {
          message =
            message + "Mã hàng trùng tại dòng: " + maHangLineSameError + "\n";
          html += "<p>Mã hàng trùng tại dòng: " + maHangLineSameError + "</p>";
        }
        if (tenHangLineError != "") {
          message =
            message +
            "Tên hàng đang để trống tại dòng: " +
            tenHangLineError +
            "\n";
          html +=
            "<p>Tên hàng đang để trống tại dòng: " + tenHangLineError + "</p>";
        }
        if (tenHangLineSameError != "") {
          message =
            message + "Tên hàng trùng tại dòng: " + tenHangLineSameError + "\n";
          html +=
            "<p>Tên hàng trùng tại dòng: " + tenHangLineSameError + "</p>";
        }
        if (data["allow_kho"] == 1) {
          if (maKhoLineError != "") {
            message =
              message +
              "Kho hàng đang để trống tại dòng: " +
              maKhoLineError +
              "\n";
            html +=
              "<p>Kho hàng đang để trống tại dòng: " + maKhoLineError + "</p>";
          }
        }
        // if (data["allow_solo"] == 1) {
        //   if (soLoLineError != "") {
        //     message =
        //       message + "Số lô đang để trống tại dòng: " + soLoLineError + "\n";
        //     html +=
        //       "<p>Số lô đang để trống tại dòng: " + soLoLineError + "</p>";
        //   }
        // }
        // if (data["allow_nhomhh"] == 1) {
        //   if (nhomHangLineError != "") {
        //     message =
        //       message +
        //       "Nhóm hàng đang để trống tại dòng: " +
        //       nhomHangLineError +
        //       "\n";
        //     html +=
        //       "<p>Nhóm hàng đang để trống tại dòng: " +
        //       nhomHangLineError +
        //       "</p>";
        //   }
        // }
        if (data["allow_loaihh"] == 1) {
          if (loaiHangLineError != "") {
            message =
              message +
              "Loại hàng đang để trống tại dòng: " +
              loaiHangLineError +
              "\n";
            html +=
              "<p>Loại hàng đang để trống tại dòng: " +
              loaiHangLineError +
              "</p>";
          }
        }
        // console.log(tenHangLineError,maKhoLineError,nhomHangLineError,loaiHangLineError);
        if ($("#addAccounting").prop("checked") == true) {
          var dienGiaiLineError = "";
          var noLineError = "";
          var coLineError = "";
          var thanhTienLineError = "";
          var key = 0;
          $(".diengiai").each(function () {
            key += 1;
            var dienGiaiLine = $(this).parents("tr").find(".diengiai").val();
            if ($(this).parents("tr").find(".no").val()) {
              var noLine = $(this).parents("tr").find(".no").val();
            } else {
              var noLine = 0;
            }
            if ($(this).parents("tr").find(".co").val()) {
              var coLine = $(this).parents("tr").find(".co").val();
            } else {
              var coLine = 0;
            }
            var thanhTienLine = $(this).parents("tr").find(".dgtt").val();

            if (dienGiaiLine == "") {
              dienGiaiLineError += key + ",";
            }
            if (data["hachToan"].includes(noLine) == false) {
              noLineError += key + ",";
            }
            if (data["hachToan"].includes(coLine) == false) {
              coLineError += key + ",";
            }
            if (thanhTienLine == "") {
              thanhTienLineError += key + ",";
            }
          });
          if (dienGiaiLineError != "") {
            message =
              message +
              "Diễn giải đang để trống tại dòng: " +
              dienGiaiLineError +
              "\n";
            html +=
              "<p>Diễn giải đang để trống tại dòng: " +
              dienGiaiLineError +
              "</p>";
          }
          if (noLineError != "") {
            message =
              message + "Nợ đang để trống tại dòng: " + noLineError + "\n";
            html += "<p>Nợ đang để trống tại dòng: " + noLineError + "</p>";
          }
          if (coLineError != "") {
            message =
              message + "Có hàng đang để trống tại dòng: " + coLineError + "\n";
            html +=
              "<p>Có hàng đang để trống tại dòng: " + coLineError + "</p>";
          }
          if (thanhTienLineError != "") {
            message =
              message +
              "Thành tiền đang để trống tại dòng: " +
              thanhTienLineError +
              "\n";
            html +=
              "<p>Thành tiền đang để trống tại dòng: " +
              thanhTienLineError +
              "</p>";
          }
        }

        // console.log(tenHangLineError,maKhoLineError,nhomHangLineError,loaiHangLineError);

        // if (tongthanhtien - calcuTotalAmountOutPut() != 0) {
        //   message =
        //     message +
        //     "Tổng thành tiền đang lệch " +
        //     (tongthanhtien - calcuTotalAmountOutPut()) +
        //     " đồng\n";
        //   html +=
        //     "<p>Tổng thành tiền đang lệch " +
        //     (tongthanhtien - calcuTotalAmountOutPut()) +
        //     " đồng" +
        //     "</p>";
        // }

        // if (vat != "Null") {
        //   if (
        //     tongtienthue - Math.round((calcuTotalAmountOutPut() * vat) / 100) != 0 ) {
        //       const check = Math.round((calcuTotalAmountOutPut() * vat) / 100); 
        //       const result = tongtienthue- check;
        //       console.log("Ban đầu:",check);
        //       console.log("Ban sau:",tongtienthue);
        //       console.log("KQ:",result);

        //     message =
        //       message +
        //       "Tổng tiền thuế đang lệch " +
        //       (tongtienthue - Math.round((calcuTotalAmountOutPut() * vat) / 100)) + " đồng\n";
        //     html +=
        //       "<p>Tổng tiền thuế đang lệch " + (tongtienthue - Math.round((calcuTotalAmountOutPut() * vat) / 100)) +" đồng" + "</p>";
        //   }
        // }

        // if (tongtienthanhtoan - tongtienthue - calcuTotalAmountOutPut() != 0) {
        //   message =
        //     message +
        //     "Tổng thanh toán đang lệch " +
        //     (tongtienthanhtoan - tongtienthue - tongthanhtien) +
        //     " đồng\n";
        //   html +=
        //     "<p>Tổng thanh toán đang lệch " +
        //     (tongtienthanhtoan - tongtienthue - tongthanhtien) +
        //     " đồng" +
        //     "</p>";
        // }

        if ($("#addAccounting").prop("checked") == true) {
          if (tongtienhachtoan - calcuTotalAmountAccounting() != 0) {
            message =
              message +
              "Tổng tiền hạch toán đang lệch " +
              (tongtienhachtoan - calcuTotalAmountAccounting()) +
              " đồng\n";
            html +=
              "<p>Tổng tiền hạch toán đang lệch " +
              (tongtienhachtoan - calcuTotalAmountAccounting()) +
              " đồng" +
              "</p>";
          }
          if (tongtienhachtoan - tongtienthanhtoan != 0) {
            message =
              message +
              "Tổng tiền hạch toán đang lệch(so với TTTT) " +
              (tongtienhachtoan - tongtienthanhtoan) +
              " đồng\n";
            html +=
              "<p>Tổng tiền hạch toán đang lệch(so với TTTT) " +
              (tongtienhachtoan - tongtienthanhtoan) +
              " đồng" +
              "</p>";
          }
        }

        if (message == "") {
          $("#f_InvenProOutput").submit();
        } else {
          $("#error-data").html("");
          $("#error-data").html(html);
          $("#popup_notify").click();
        }
      }
    },
  });
}

function clickSubmitIvoiceInventory() {
  $("#f_InvenProOutput").submit();
}

function shownumline() {
  $("#showsddshd").slideDown();
}
function hiddennumline() {
  $("#showsddshd").slideUp();
}

function IV_sortField(targ, osk, sk, sd) {
  var url = document.location.href;
  url = url.replace("&sk=" + osk, "");
  url = url.replace("&sk=" + sk, "");
  url = url.replace("&sd=ASC", "");
  url = url.replace("&sd=DESC", "");
  url = url.replace("&ecode=", "&code=");
  url = url.replace("&rcode=", "&code=");
  eval(targ + ".location='" + url + "&sk=" + sk + "&sd=" + sd + "'");
}

function changeWarehouse(ob) {
  var idWare = $(ob).val();
  $(".hidden_dongia").each(function () {
    $(this).parents("tr").find(".makho").val(idWare);
  });

  var op = "inventory_returntowwarehouse";
  $.ajax({
    type: "POST",
    url: "/ajax.php",
    data: {
      op: op,
      idWare: idWare,
    },
    success: function (data) {
      $("#chuyendenkho").show();
      $("#chuyendenkho").html(data);
    },
  });
}

function getProList() {
  var mod = $("#mod").val();
  var lineList = $("#linelist").val();
  var allow_month = $("#allow_month").val();
  var allow_year = $("#allow_year").val();
  var numInv = $("#numInv").val();
  var namePro = $("#namePro").val();

  var dateStart = $("#dateStart").val();
  if (dateStart) {
    var dateStart = dateStart.replace(/-/g, "/");
    var dateStart = dateStart.split("/");
    var dateStart = dateStart[2] + "-" + dateStart[1] + "-" + dateStart[0];
  }

  var dateEnd = $("#dateEnd").val();
  if (dateEnd) {
    var dateEnd = dateEnd.replace(/-/g, "/");
    var dateEnd = dateEnd.split("/");
    var dateEnd = dateEnd[2] + "-" + dateEnd[1] + "-" + dateEnd[0];
  }

  var comCode = $("#comCode").val();
  var wareCode = $("#wareCode").val();
  var sk = $("#sk").val();
  var sd = $("#sd").val();

  // console.log(mod,lineList,allow_month,allow_year,numInv,namePro,dateStart,dateEnd,comCode,wareCode);

  var op = "inventory_getprolist";
  $.ajax({
    type: "POST",
    url: "/ajax.php",
    data: {
      op: op,
      mod: mod,
      lineList: lineList,
      allow_month: allow_month,
      allow_year: allow_year,
      numInv: numInv,
      namePro: namePro,
      dateStart: dateStart,
      dateEnd: dateEnd,
      comCode: comCode,
      wareCode: wareCode,
      sk: sk,
      sd: sd,
    },
    success: function (data) {
      $("#show-data-prolist").show();
      $("#show-data-prolist").html(data);
      $("#dshanghoa1 td").hover(
        function () {
          $(this).parents("tr").addClass("hovertr");
        },
        function () {
          $(this).parents("tr").removeClass("hovertr");
        }
      );
    },
  });
}

function changesortsearch(sk) {
  var sd = $("#sd").val();
  if (sd == "desc") {
    $("#sd").val("asc");
  } else {
    $("#sd").val("desc");
  }
  $("#sk").val(sk);
  getProList();
}

function clickShowInforDelivery() {
  var check = $("#createdelivery").prop("checked");
  if (check == true) {
    $(".show_more_pxk").addClass("active");

    $("#createdelivery").attr("value", 1);
    $("#createdelivery").val(1);
  } else {
    $(".show_more_pxk").removeClass("active");

    $("#createdelivery").removeAttr("value");
  }
  var check = $("#createdelivery").val();
  console.log(check);
  // if($('#addAccounting').prop('checked') == true){
  //  $('.addAccounting').removeClass('d-none');
  // }else{
  //  $('.addAccounting').addClass('d-none');
  // }
}

function openpopupAddContract() {
  $("#addpopupAddContract").modal();
}
function openpopupAddAgency() {
  $("#addpopupAddAgency").modal();
}
function openpopupAddProject() {
  $("#addpopupAddProject").modal();
}
function clickChooseFileContract() {
  $("#attach-file-contract").trigger("click");
}

function clickLydoXuat(ob) {
  var value = $(ob).val();
  console.log(value);

  if (value == 4) {
    $("#ldkhacopen").slideDown();
    $("#chuyenkhoopen").slideUp();
    $("#chuyenkhoopen_edit").slideUp();
    $(".box-cre-export").removeClass("active");
    $(".projectAllocation").slideUp();
  } else if (value == 5) {
    $("#chuyenkhoopen").slideDown();
    $("#ldkhacopen").slideUp();
    $("#ldkhacopen_edit").slideUp();
    $(".projectAllocation").slideUp();
  } else if (value == 2) {
    $(".box-cre-export").addClass("active");
    $("#chuyenkhoopen").slideUp();
    $("#chuyenkhoopen_edit").slideUp();
    $("#ldkhacopen").slideUp();
    $("#ldkhacopen_edit").slideUp();
    $(".projectAllocation").slideUp();
  } else if (value == 9) {
    $(".projectAllocation").slideDown();
    $("#ldkhacopen").slideUp();
    $(".box-cre-export").removeClass("active");
    $("#ldkhacopen").slideUp();
  } else {
    $("#ldkhacopen").slideUp();
    $("#chuyenkhoopen").slideUp();
    $("#ldkhacopen_edit").slideUp();
    $("#chuyenkhoopen_edit").slideUp();
    $(".box-cre-export").removeClass("active");
    $(".projectAllocation").slideUp();
  }

  idWare = $("#warehouse").val();
  var op = "inventory_returntowwarehouse";
  // $.ajax({
  //     type: "POST",
  //     url: "/ajax.php",
  //     data:{
  //       op:op,
  //       idWare:idWare,
  //     },
  //     success: function(data){
  //         console.log(data);
  //         $("#chuyendenkho").show();
  //         $("#chuyendenkho").html(data);
  //     }
  //   });
}

function changeCofigTotalAmount(ob) {
  var value = $(ob).prop("checked");
  if (value == true) {
    $(".thanhtien").each(function (key, ab) {
      $(ab).attr("disabled", false);
    });
    $(".thanhtienGTGT").each(function (key, ab) {
      $(ab).attr("disabled", false);
    });
  } else {
    $(".thanhtien").each(function (key, ab) {
      $(ab).attr("disabled", true);
    });
    $(".thanhtienGTGT").each(function (key, ab) {
      $(ab).attr("disabled", false);
    });
  }
}

// function DocTienBangChuInvoice(SoTien) {
//   //Đọc tiền cho hđ điều chỉnh
//   // Last update: 6/11/2022
//   // Last coder: Phuc Toan
//   var flag = $("#flag").val();
//   let loaiTien = $("#hidden_read_en").val()
//     ? $("#hidden_read_en").val()
//     : "đồng";
//   var ChuSo = new Array(
//     " không",
//     " một",
//     " hai",
//     " ba",
//     " bốn",
//     " năm",
//     " sáu",
//     " bảy",
//     " tám",
//     " chín"
//   );
//   var Tien = new Array("", " nghìn", " triệu", " tỷ", " nghìn tỷ", " triệu tỷ");
//   var lan = 0;
//   var i = 0;
//   var so = 0;
//   var KetQua = "";
//   var tmp = "";
//   var ViTri = new Array();
//   // if(SoTien<0) return "Số tiền âm !";
//   if (SoTien == 0) return "Không " + loaiTien + ".";
//   if (SoTien > 0) {
//     so = SoTien;
//   } else {
//     so = -SoTien;
//   }
//   if (SoTien > 8999999999999999) {
//     //SoTien = 0;
//     return "Số quá lớn!";
//   }
//   ViTri[5] = Math.floor(so / 1000000000000000);
//   if (isNaN(ViTri[5])) ViTri[5] = "0";
//   so = so - parseFloat(ViTri[5].toString()) * 1000000000000000;
//   ViTri[4] = Math.floor(so / 1000000000000);
//   if (isNaN(ViTri[4])) ViTri[4] = "0";
//   so = so - parseFloat(ViTri[4].toString()) * 1000000000000;
//   ViTri[3] = Math.floor(so / 1000000000);
//   if (isNaN(ViTri[3])) ViTri[3] = "0";
//   so = so - parseFloat(ViTri[3].toString()) * 1000000000;
//   ViTri[2] = parseInt(so / 1000000);
//   if (isNaN(ViTri[2])) ViTri[2] = "0";
//   ViTri[1] = parseInt((so % 1000000) / 1000);
//   if (isNaN(ViTri[1])) ViTri[1] = "0";
//   ViTri[0] = parseInt(so % 1000);
//   if (isNaN(ViTri[0])) ViTri[0] = "0";
//   if (ViTri[5] > 0) {
//     lan = 5;
//   } else if (ViTri[4] > 0) {
//     lan = 4;
//   } else if (ViTri[3] > 0) {
//     lan = 3;
//   } else if (ViTri[2] > 0) {
//     lan = 2;
//   } else if (ViTri[1] > 0) {
//     lan = 1;
//   } else {
//     lan = 0;
//   }
//   for (i = lan; i >= 0; i--) {
//     if (i == lan) {
//       var parent = 0;
//     } else {
//       var parent = 1;
//     }
//     tmp = DocSo3ChuSo(ViTri[i], parent);
//     KetQua += tmp;
//     if (ViTri[i] > 0) KetQua += Tien[i];
//     // if ((i > 0) && (tmp.length > 0)) KetQua += ',';//&& (!string.IsNullOrEmpty(tmp))
//   }
//   if (KetQua.substring(KetQua.length - 1) == ",") {
//     KetQua = KetQua.substring(0, KetQua.length - 1);
//   }
//   if (SoTien < 0) {
//     if (flag == "repair") {
//       KetQua = "Điều chỉnh giảm " + KetQua.toLowerCase();
//     } else {
//       KetQua = "Âm" + KetQua.toLowerCase();
//     }
//   } else {
//     if (flag == "repair") {
//       KetQua =
//         "Điều chỉnh tăng " +
//         KetQua.substring(1, 2).toUpperCase() +
//         KetQua.substring(2);
//     } else {
//       KetQua = KetQua.substring(1, 2).toUpperCase() + KetQua.substring(2);
//     }
//   }
//   console.log(KetQua);
//   return KetQua + " " + loaiTien + "."; //.substring(0, 1);//.toUpperCase();// + KetQua.substring(1);
// }
function DocTienBangChuInvoice(SoTien) {
    // 1. Tách phần nguyên và lẻ chuẩn xác (định dạng 2 số thập phân)
    var strSoTien = parseFloat(SoTien).toFixed(2).toString(); 
    var mangPhan = strSoTien.split(".");
    
    var phanNguyen = Math.abs(parseFloat(mangPhan[0]));
    var phanLe = mangPhan.length > 1 ? mangPhan[1] : "";

    var flag = $("#flag").val();
    let loaiTien = $("#hidden_read_en").val() ? $("#hidden_read_en").val() : "đồng";

    // --- [NOTE]: Tự động xác định đơn vị tiền tệ nhỏ dựa trên loại tiền chính ---
    let donViLe = (loaiTien.toLowerCase() === "euro" || loaiTien.toLowerCase() === "usd") ? " cents" : " xu";

    var Tien = new Array("", " nghìn", " triệu", " tỷ", " nghìn tỷ", " triệu tỷ");
    var KetQua = "";
    var ViTri = new Array();

    if (SoTien == 0) return "Không " + loaiTien + ".";
    if (Math.abs(SoTien) > 8999999999999999) return "Số quá lớn!";

    // 2. Tính toán các nhóm 3 chữ số cho PHẦN NGUYÊN
    var so = phanNguyen; // Sử dụng số nguyên dương đã tách
    ViTri[5] = Math.floor(so / 1000000000000000);
    so = so - parseFloat(ViTri[5].toString()) * 1000000000000000;
    ViTri[4] = Math.floor(so / 1000000000000);
    so = so - parseFloat(ViTri[4].toString()) * 1000000000000;
    ViTri[3] = Math.floor(so / 1000000000);
    so = so - parseFloat(ViTri[3].toString()) * 1000000000;
    ViTri[2] = parseInt(so / 1000000);
    ViTri[1] = parseInt((so % 1000000) / 1000);
    ViTri[0] = parseInt(so % 1000);

    var lan = 0;
    if (ViTri[5] > 0) lan = 5;
    else if (ViTri[4] > 0) lan = 4;
    else if (ViTri[3] > 0) lan = 3;
    else if (ViTri[2] > 0) lan = 2;
    else if (ViTri[1] > 0) lan = 1;

    for (var i = lan; i >= 0; i--) {
        var tmp = DocSo3ChuSo(ViTri[i], i == lan ? 0 : 1);
        KetQua += tmp;
        if (ViTri[i] > 0) KetQua += Tien[i];
    }

    // 3. Đọc phần lẻ
    var KetQuaLe = "";
    if (phanLe !== "" && parseInt(phanLe) > 0) {
        // Loại bỏ chữ "không trăm" (thường xuất hiện khi đọc số có 2 chữ số lẻ)
        var chuLe = DocSo3ChuSo(parseInt(phanLe), 1).replace("không trăm", "").trim();
        // Cấu trúc mới: " và [số chữ] [đơn vị lẻ]" (VD: và năm mươi cents)
        KetQuaLe = " và " + chuLe + donViLe;
    }

    // 4. Xử lý Trạng thái (Âm/Dương/Điều chỉnh) - Gộp chung để viết hoa sau
    KetQua = KetQua.trim();
      if (SoTien < 0) {
          // Gắn tiền tố cho trường hợp số âm hoặc điều chỉnh giảm
          KetQua = (flag == "repair" ? "Điều chỉnh giảm " : "Âm ") + KetQua.toLowerCase();
      } else if (flag == "repair") {
          // Đảm bảo chữ cái đầu của phần số nguyên viết thường để nối sau chữ "tăng"
          KetQua = "Điều chỉnh tăng " + KetQua.substring(0, 1).toLowerCase() + KetQua.substring(1);
      }

  // --- [NOTE]: Ghép chuỗi cuối cùng: [Phần nguyên] + [Loại tiền] + [Phần lẻ] ---
    // Ví dụ kết quả: "Năm nghìn Euro và năm mươi cents."
    var chuoiCuoi = (KetQua + " " + loaiTien + KetQuaLe).trim();
    
    // Viết hoa chữ cái đầu tiên của toàn bộ chuỗi để đảm bảo tính trang trọng
    chuoiCuoi = chuoiCuoi.substring(0, 1).toUpperCase() + chuoiCuoi.substring(1) + ".";
    
    console.log(chuoiCuoi);
    return chuoiCuoi;
}
function checkInvoiceNew(ob = "") {
  var tenform = $("#tenform").val();
  var resultMaHang = true;
  $(".mahang").each(function (key, ob) {
    var result = checkLengthInput(ob, 50);
    if (result == false) {
      resultMaHang = false;
    }
  });

  var resultDonViTinh = true;
  $(".donvt1").each(function (key, ob) {
    var result = checkLengthInput(ob, 50);
    if (result == false) {
      resultDonViTinh = false;
    }
  });

  var resultEnd = true;

  var loai_dieuchinhValue = $("#loai_dieuchinh").val();
  console.log(loai_dieuchinhValue);
  if (
    loai_dieuchinhValue ||
    window.location.href.includes("op=newinvoice&act=new&mod=add") == true ||
    window.location.href.includes("op=newinvoice&act=new&mod=edit") == true
  ) {
    var arrKey = [];
  } else {
    var arrKey = [".soluong", ".dongia", ".dongiavat", ".thanhtien"];
  }

  $.each(arrKey, function (key, value) {
    $(value).each(function (key, ob) {
      var result = checkNumberFormatInput(ob);
      console.log(result);
      if (!result) {
        resultEnd = false;
      }
    });
  });

  // console.log('result',resultMaHang,resultEnd);
  // if (!resultMaHang || !resultEnd) {
  //     $(ob).css('pointer-events', '');
  //     $(ob).html('Hoàn tất');
  //     return false;
  // }

  checkProNull();
  var checkinv = $("#createinvoice").val();

  var ngayhoadonGoc = $("#show_ngayhoadon").val();
  var ngayhoadon = ngayhoadonGoc.replace(/-/g, "/"); // Ngày của hóa đơn cuối
  var ngayhoadon = ngayhoadon.split("/");
  var ngayhoadon = new Date(+ngayhoadon[2], ngayhoadon[1] - 1, +ngayhoadon[0]);
  var ngayhoadon = Date.parse(ngayhoadon);

  var ngayphathanhGoc = $("#hidden_ngayphathanh").val();
  var ngayphathanh = ngayphathanhGoc.replace(/-/g, "/"); // Ngày của hóa đơn cuối
  var ngayphathanh = ngayphathanh.split("/");
  var ngayphathanh = new Date(
    +ngayphathanh[2],
    ngayphathanh[1] - 1,
    +ngayphathanh[0]
  );
  var ngayphathanh = Date.parse(ngayphathanh);

  var ngayhoadoncuoiGoc = $("#hidden_ngayhoadoncuoi").val();
  if (ngayhoadoncuoiGoc) {
    var ngayhoadoncuoi = ngayhoadoncuoiGoc.replace(/-/g, "/"); // Ngày của hóa đơn cuối
    var ngayhoadoncuoi = ngayhoadoncuoi.split("/");
    var ngayhoadoncuoi = new Date(
      +ngayhoadoncuoi[2],
      ngayhoadoncuoi[1] - 1,
      +ngayhoadoncuoi[0]
    );
    var ngayhoadoncuoi = Date.parse(ngayhoadoncuoi);
  }
  var ngaylientruoc = $("#datenextlast").val();
  var ngayliensau = $("#dateafterlast").val();
  if (ngaylientruoc) {
    var dateParts2 = ngaylientruoc.split("/");
    var dateObject2 = new Date(
      +dateParts2[2],
      dateParts2[1] - 1,
      +dateParts2[0]
    );
    var ngaylientruoc_invoice = Date.parse(dateObject2);
  }
  if (ngayliensau) {
    var dateParts3 = ngayliensau.split("/");
    var dateObject3 = new Date(
      +dateParts3[2],
      dateParts3[1] - 1,
      +dateParts3[0]
    );
    var ngayliensau_invoice = Date.parse(dateObject3);
  }

  var songayduocno = $("#debit_term").val();

  var hanthanhtoanGoc = $("#payment_term").val();
  if (typeof hanthanhtoanGoc !== "undefined") {
    var hanthanhtoan = hanthanhtoanGoc.replace(/-/g, "/"); // Ngày của hóa đơn cuối
    var hanthanhtoan = hanthanhtoan.split("/");
    var hanthanhtoan = new Date(
      +hanthanhtoan[2],
      hanthanhtoan[1] - 1,
      +hanthanhtoan[0]
    );
    var hanthanhtoan = Date.parse(hanthanhtoan);
  }

  if ($("#hidden_mauso").val()) {
    var mauso = $("#hidden_mauso").val();
  } else {
    var mauso = 0;
  }
  var kyhieu = $("#hidden_kyhieu").val();
  var sohoadon = $("#hidden_sohoadon").val();
  var hinhthucthanhtoan = $("#payment").val();
  var loaitien = $("#currency").val();
  var makho = $("#warehouse").val();
  var email = $("#email").val();

  var currency = $("#hidden_currency").val() ? $("#hidden_currency").val(): "VND";
  var rate = $("#rate").val();

  var masothue = $("#masothue").val();
  var tendonvi = $("#tendonvi").val();

  var tongthanhtien = $("#hidden_tongthanhtien").val();
  var vat = $("#vat").val();
  if (isNaN(vat)) {
    var vat = 0;
  }
  var tongtienthue = $("#hidden_tongtienthue").val();
  var tongtienthanhtoan = $("#hidden_tongcongprice").val();
  var tongtienhachtoan = $("#hidden_total_money_ht").val();

  var message = "";
  var html = '<h4 class="modal-title">Danh sách lỗi</h4>';
  var flag = true;

  var op = "inventory_submitinvoice";

  let checkTotal =
    tenform == 19 ||
      tenform == 1 ||
      tenform == 16 ||
      tenform == 23 ||
      tenform == 41 ||
      tenform == 32 ||
      tenform == 36 ||
      tenform == 38
      ? checkTotalInvoiceMultipleVat()
      : checkTotalInvoice();

  $(ob).css("pointer-events", "none");
  $(ob).html('Loading <i class="fa fa-spinner fa-spin"></i>');
  $.ajax({
    type: "POST",
    url: "/ajax.php",
    dataType: "json",
    data: {
      op: op,
    },
    success: function (data) {
      if (data["success"] == 0) {
        console.log(data);

        //console.log(mauso);
        if ($("#createinvoice").prop("checked") == true) {
          if (mauso != data["mauSo"] && mauso != 0) {
            message = message + "Mẫu số không trùng " + data["mauSo"] + "\n";
            html += "<p>Mẫu số không trùng " + data["mauSo"] + "</p>";
          }
          if (kyhieu != data["kyHieu"]) {
            message = message + "Ký hiệu không trùng " + data["kyHieu"] + "\n";
            html += "<p>Ký hiệu không trùng " + data["kyHieu"] + "</p>";
          }
          if (Number(sohoadon) - data["soHoaDonCuoi"] != 1) {
            message =
              message +
              "Số hóa đơn không liên tiếp số trước " +
              data["soHoaDonCuoi"] +
              "\n";
            html +=
              "<p>Số hóa đơn không liên tiếp số trước " +
              data["soHoaDonCuoi"] +
              "</p>";
          }
        }
        if (currency != "VND" && (rate == "" || parseFloat(rate) <=0)) {
          message = message + "Tỷ giá ko được bỏ trống" + "\n";
          html += "<p>Tỷ giá ko được bỏ trống" + "</p>";
        }

        if (ngayhoadon < data["ngayXuatCuoi"]) {
          message =
            message +
            "Ngày nhỏ hơn ngày hóa đơn trước " +
            data["ngayXuatCuoi"] +
            "\n";
          html +=
            "<p>Ngày nhỏ hơn ngày hóa đơn trước" +
            data["ngayXuatCuoi"] +
            "</p>";
        }
        if (
          data["hinhThucThanhToan"].includes(hinhthucthanhtoan) == false ||
          hinhthucthanhtoan == 0
        ) {
          message = message + "Hình thức thanh toán không tồn tại " + "\n";
          html += "<p>Hình thức thanh toán không tồn tại</p>";
        }

        // if (email != '' && validateEmail(email) == false) {
        //   message = message + "Email không hợp lệ! " + "\n";
        //   html += "<p>Email không hợp lệ!</p>";
        // }
        // if(data['loaiTien'].includes(loaitien) == false || loaitien == 0){
        //  message = message + "Loại tiền không tồn tại " +"\n";
        //     html +="<p>Loại tiền không tồn tại</p>";
        // }

        // if(data['maKho'].includes(makho) == false  || makho == 0){
        //  message = message + "Mã kho không tồn tại " +"\n";
        //   html +="<p>Mã kho không tồn tại</p>";
        // }
        if (ngayliensau == "" && ngayhoadon < ngaylientruoc_invoice) {
          message =
            message +
            "Chọn ngày hóa đơn lớn hơn hoặc bằng ngày " +
            ngaylientruoc +
            "\n";
          html +=
            "<p>Chọn ngày hóa đơn lớn hơn hoặc bằng ngày " +
            ngaylientruoc +
            "</p>";
        } else if (
          ngayhoadon > ngayliensau_invoice ||
          ngayhoadon < ngaylientruoc_invoice
        ) {
          $("#date").css("border", "1px solid red");
          message =
            message +
            "Chọn ngày hóa đơn từ ngày " +
            ngaylientruoc +
            " đến ngày " +
            ngayliensau +
            "\n";
          html +=
            "<p>Chọn ngày hóa đơn từ ngày " +
            ngaylientruoc +
            " đến ngày " +
            ngayliensau +
            "</p>";
        }

        if (ngayhoadon < ngayhoadoncuoi) {
          message =
            message +
            "Ngày hóa đơn không được nhỏ hơn ngày hóa đơn trước đó " +
            ngayhoadoncuoiGoc +
            "\n";
          html +=
            "<p>Ngày hóa đơn không được nhỏ hơn ngày hóa đơn trước đó " +
            ngayhoadoncuoiGoc +
            "</p>";
        }
        if (ngayhoadon < ngayphathanh) {
          message =
            message +
            "Ngày hóa đơn không được nhỏ hơn ngày phát hành " +
            ngayphathanhGoc +
            "\n";
          html +=
            "<p>Ngày hóa đơn không được nhỏ hơn ngày phát hành " +
            ngayphathanhGoc +
            "</p>";
        }
        if (hanthanhtoan < ngayhoadon) {
          message =
            message +
            "Hạn thanh toán không được nhỏ hơn ngày hóa đơn " +
            ngayhoadonGoc +
            "\n";
          html +=
            "<p>Hạn thanh toán không được nhỏ hơn ngày hóa đơn " +
            ngayhoadonGoc +
            "</p>";
        }

        if ($("#nguoimuakhonglayhoadon").prop("checked") == false
      && $("#nguoiMuaKhongCungCapThongTin").prop("checked") == false
      ) {
          if (
            $("#masothue").val() == "" &&
            $("#tennguoimua").val() == "" &&
            $("#tendonvi").val() == ""
          ) {
            message = message + "Không có thông tin người mua" + "\n";
            html += "<p>Không có thông tin người mua</p>";
          } else {
            var masothueValue = $("#masothue").val();
            console.log("masothueValue.lengthaa", masothueValue.length);
            if (
              masothueValue.length != 10 &&
              masothueValue.length != 12 &&
              masothueValue.length != 14 &&
              masothueValue.length != ""
            ) {
              console.log("masothueValue.lengthaa", masothueValue.length);

              message =
                message + "Mã số thuế người mua không đúng định dạng" + "\n";
              html += "<p>Mã số thuế người mua không đúng định dạng</p>";
            }
          }
        }
        if (resultMaHang != true) {
          message = message + "Mã sản phẩm không quá 50 ký tự" + "\n";
          html += "<p>Mã sản phẩm không quá 50 ký tự</p>";
        }
        if (resultDonViTinh != true) {
          message = message + "Đơn vị tính không quá 50 ký tự" + "\n";
          html += "<p>Đơn vị tính không quá 50 ký tự</p>";
        }

        var maSKULineError = "";
        var maSKULineSameError = "";
        var maHangLineError = "";
        var maHangLineSameError = "";
        var tenHangLineError = "";
        var tenHangLineError1 = "";
        var tenHangLineSameError = "";
        var maKhoLineError = "";
        var donviTinhLineError = "";
        var soLoLineError = "";
        var nhomHangLineError = "";
        var loaiHangLineError = "";
        var arrayMaSKU = [];
        var arrayMaHang = [];
        var arrayTenHang = [];
        var key = 0;
        $(".hidden_thanhtien").each(function () {
          key += 1;
          if ($(this).parents("tr").find(".masku").val()) {
            var maSKULine = $(this).parents("tr").find(".masku").val();
            if (arrayMaSKU.includes(maSKULine) == true) {
              maSKULineSameError += key + ",";
            } else {
              arrayMaSKU.push(maSKULine);
            }
          } else {
            var maSKULine = "";
          }
          if ($(this).parents("tr").find(".mahang").val()) {
            var maHangLine = $(this).parents("tr").find(".mahang").val();
            if (arrayMaHang.includes(maHangLine) == true) {
              maHangLineSameError += key + ",";
            } else {
              arrayMaHang.push(maHangLine);
            }
          } else {
            var maHangLine = "";
          }
          if ($(this).parents("tr").find(".tenhang").val()) {
            var tenHangLine = $(this).parents("tr").find(".tenhang").val();
            if (arrayTenHang.includes(tenHangLine) == true) {
              tenHangLineSameError += key + ",";
            } else {
              arrayTenHang.push(tenHangLine);
            }
          } else {
            var tenHangLine = "";
          }
          if ($(this).parents("tr").find(".makho").val()) {
            var maKhoLine = $(this).parents("tr").find(".makho").val();
          } else {
            var maKhoLine = 0;
          }
          if ($(this).parents("tr").find(".solo").val()) {
            var soLoLine = $(this).parents("tr").find(".solo").val();
          } else {
            var soLoLine = 0;
          }
          if ($(this).parents("tr").find(".nhh").val()) {
            var nhomHangLine = $(this).parents("tr").find(".nhh").val();
          } else {
            var nhomHangLine = 0;
          }
          if ($(this).parents("tr").find(".lhh").val()) {
            var loaiHangLine = $(this).parents("tr").find(".lhh").val();
          } else {
            var loaiHangLine = 0;
          }

          if (maSKULine == "") {
            maSKULineError += key + ",";
          }
          if (maHangLine == "") {
            maHangLineError += key + ",";
          }
          if (tenHangLine == "") {
            tenHangLineError += key + ",";
          }
          // console.log(tenHangLine.length);
          if (tenHangLine.length > 500) {
            tenHangLineError1 += key + ",";
          }
          if (data["maKho"].includes(maKhoLine) == false) {
            maKhoLineError += key + ",";
          }
          if (soLoLine == "") {
            soLoLineError += key + ",";
          }
          if (data["nhomHang"].includes(nhomHangLine) == false) {
            nhomHangLineError += key + ",";
          }
          if (data["loaiHang"].includes(loaiHangLine) == false) {
            loaiHangLineError += key + ",";
          }
        });

        // if(maSKULineError != ""){
        //  message = message + "Mã SKU đang để trống tại dòng: " + maSKULineError + "\n"
        //   html +="<p>Mã SKU đang để trống tại dòng: " + maSKULineError +"</p>";
        // }
        if (maSKULineSameError != "") {
          message =
            message + "Mã SKU trùng tại dòng: " + maSKULineSameError + "\n";
          html += "<p>Mã SKU trùng tại dòng: " + maSKULineSameError + "</p>";
        }
        // if(maHangLineError != ""){
        //  message = message + "Mã hàng đang để trống tại dòng: " + maHangLineError + "\n"
        //   html +="<p>Mã hàng đang để trống tại dòng: " + maHangLineError +"</p>";
        // }
        // if(maHangLineSameError != ""){
        //  message = message + "Mã hàng trùng tại dòng: " + maHangLineSameError + "\n"
        //   html +="<p>Mã hàng trùng tại dòng: " + maHangLineSameError +"</p>";
        // }
        if (tenHangLineError != "") {
          message =
            message +
            "Tên hàng đang để trống tại dòng: " +
            tenHangLineError +
            "\n";
          html +=
            "<p>Tên hàng đang để trống tại dòng: " + tenHangLineError + "</p>";
        }
        if (tenHangLineError1 != "") {
          message =
            message +
            "Tên hàng vượt quá 500 ký tự tại dòng: " +
            tenHangLineError1 +
            "\n";
          html +=
            "<p>Tên hàng vượt quá 500 ký tự tại dòng: " +
            tenHangLineError1 +
            "</p>";
        }
        if (
          tenHangLineSameError != "" &&
          $("#valid_productname_value").val() == 2
        ) {
          message =
            message + "Tên hàng trùng tại dòng: " + tenHangLineSameError + "\n";
          html +=
            "<p>Tên hàng trùng tại dòng: " + tenHangLineSameError + "</p>";
        }

        // if(data['allow_kho'] == 1){
        //   if(maKhoLineError != ""){
        //   message = message + "Kho hàng đang để trống tại dòng: " + maKhoLineError + "\n"
        //   html +="<p>Kho hàng đang để trống tại dòng: " + maKhoLineError +"</p>";
        //   }
        // }
        // if(data['allow_solo'] == 1){
        //   if(soLoLineError != ""){
        //   message = message + "Số lô đang để trống tại dòng: " + soLoLineError + "\n"
        //   html +="<p>Số lô đang để trống tại dòng: " + soLoLineError +"</p>";
        //   }
        // }
        // if(data['allow_nhomhh'] == 1){
        //  if(nhomHangLineError != ""){
        //      message = message + "Nhóm hàng đang để trống tại dòng: " + nhomHangLineError + "\n"
        //    html +="<p>Nhóm hàng đang để trống tại dòng: " + nhomHangLineError +"</p>";
        //   }
        // }
        // if(data['allow_loaihh'] == 1){
        //  if(loaiHangLineError != ""){
        //      message = message + "Loại hàng đang để trống tại dòng: " + loaiHangLineError + "\n"
        //    html +="<p>Loại hàng đang để trống tại dòng: " + loaiHangLineError +"</p>";
        //   }
        // }

        if ($("#addAccounting").prop("checked") == true) {
          var dienGiaiLineError = "";
          var noLineError = "";
          var coLineError = "";
          var thanhTienLineError = "";
          var key = 0;
          $(".diengiai").each(function () {
            key += 1;
            var dienGiaiLine = $(this).parents("tr").find(".diengiai").val();
            if ($(this).parents("tr").find(".no").val()) {
              var noLine = $(this).parents("tr").find(".no").val();
            } else {
              var noLine = 0;
            }
            if ($(this).parents("tr").find(".co").val()) {
              var coLine = $(this).parents("tr").find(".co").val();
            } else {
              var coLine = 0;
            }
            var thanhTienLine = $(this).parents("tr").find(".dgtt").val();

            if (dienGiaiLine == "") {
              dienGiaiLineError += key + ",";
            }
            if (data["hachToan"].includes(noLine) == false) {
              noLineError += key + ",";
            }
            if (data["hachToan"].includes(coLine) == false) {
              coLineError += key + ",";
            }
            if (thanhTienLine == "") {
              thanhTienLineError += key + ",";
            }
          });
          if (dienGiaiLineError != "") {
            message =
              message +
              "Diễn giải đang để trống tại dòng: " +
              dienGiaiLineError +
              "\n";
            html +=
              "<p>Diễn giải đang để trống tại dòng: " +
              dienGiaiLineError +
              "</p>";
          }
          if (noLineError != "") {
            message =
              message + "Nợ đang để trống tại dòng: " + noLineError + "\n";
            html += "<p>Nợ đang để trống tại dòng: " + noLineError + "</p>";
          }
          if (coLineError != "") {
            message =
              message + "Có hàng đang để trống tại dòng: " + coLineError + "\n";
            html +=
              "<p>Có hàng đang để trống tại dòng: " + coLineError + "</p>";
          }
          if (thanhTienLineError != "") {
            message =
              message +
              "Thành tiền đang để trống tại dòng: " +
              thanhTienLineError +
              "\n";
            html +=
              "<p>Thành tiền đang để trống tại dòng: " +
              thanhTienLineError +
              "</p>";
          }
        }

        // if(tongthanhtien - calcuTotalAmountOutPut() != 0){
        //   message = message + "Tổng thành tiền đang lệch " + (tongthanhtien - calcuTotalAmountOutPut()) +" đồng\n";
        //   html +="<p>Tổng thành tiền đang lệch " + (tongthanhtien - calcuTotalAmountOutPut()) + " đồng" +"</p>";
        // }

        // if(vat != "Null"){
        //  if(tongtienthue - Math.round(parseInt(calcuTotalAmountOutPut())*vat/100) != 0){
        //    message = message + "Tổng tiền thuế đang lệch " + (tongtienthue - Math.round(calcuTotalAmountOutPut()*vat/100)) +" đồng\n";
        //    html +="<p>Tổng tiền thuế đang lệch " + (tongtienthue - Math.round(calcuTotalAmountOutPut()*vat/100)) + " đồng" +"</p>";
        //   }
        // }

        // if((tongtienthanhtoan - tongtienthue - calcuTotalAmountOutPut()) != 0){
        //   message = message + "Tổng thanh toán đang lệch " + (tongtienthanhtoan - tongtienthue - tongthanhtien) +" đồng\n";
        //   html +="<p>Tổng thanh toán đang lệch " + (tongtienthanhtoan - tongtienthue - tongthanhtien) + " đồng" + "</p>";
        // }

        if ($("#addAccounting").prop("checked") == true) {
          if (tongtienhachtoan - calcuTotalAmountAccounting() != 0) {
            message =
              message +
              "Tổng tiền hạch toán đang lệch " +
              (tongtienhachtoan - calcuTotalAmountAccounting()) +
              " đồng\n";
            html +=
              "<p>Tổng tiền hạch toán đang lệch " +
              (tongtienhachtoan - calcuTotalAmountAccounting()) +
              " đồng" +
              "</p>";
          }
          if (tongtienhachtoan - tongtienthanhtoan != 0) {
            message =
              message +
              "Tổng tiền hạch toán đang lệch(so với TTTT) " +
              (tongtienhachtoan - tongtienthanhtoan) +
              " đồng\n";
            html +=
              "<p>Tổng tiền hạch toán đang lệch(so với TTTT) " +
              (tongtienhachtoan - tongtienthanhtoan) +
              " đồng" +
              "</p>";
          }
        }

        if (message == "") {
          $("input").each(function (key, ob) {
            $(ob).prop("disabled", false);
          });
          if (checkTotal == false) {
            if (
              confirm("Tổng tiền không đúng, bạn có chắc muốn tiếp tục lưu?") ==
              true
            ) {
              $("#f_InvenProOutput").submit();
            } else {
              $(ob).css("pointer-events", "");
              $(ob).html("Hoàn tất");
            }
          } else {
            $("#f_InvenProOutput").submit();
          }
          // $('#f_InvenProOutput').submit();
        } else {
          $(ob).css("pointer-events", "");
          $(ob).html("Hoàn tất");
          $("#error-data").html("");
          $("#error-data").html(html);
          $("#popup_notify").click();
        }
      }
    },
  });
}

/*Added 25/02/2023*/
function checkTotalInvoice() {
  let input_hiddenThanhTien = document.querySelectorAll(
    'input[name="hidden_thanhtien[]"]'
  );
  let input_hiddenTongThanhTien = document.querySelector(
    'input[name="hidden_tongthanhtien"]'
  );
  let input_hiddenTienThueGTGT = document.querySelector("#hidden_tienthuegtgt");

  let tongTienThucTe = 0;
  input_hiddenThanhTien.forEach((e) => {
    tongTienThucTe += e.value ? parseFloat(e.value) : 0;
    console.log("tong tien ", e.value);
  });
  console.log("tong tien thuc te", tongTienThucTe);
  console.log("tong tien phan mem", input_hiddenTongThanhTien.value);
  if (tongTienThucTe == parseFloat(input_hiddenTongThanhTien.value)) {
    return true;
  } else {
    return false;
  }
}

function checkTotalInvoiceMultipleVat() {
  let input_hiddenThanhTien = document.querySelectorAll(
    'input[name="hidden_thanhtienGTGT[]"]'
  );
  let input_hiddenTongThanhTien = document.querySelector(
    'input[name="hidden_tongcongpriceGTGT"]'
  );
  let input_hiddenTienThueGTGT = document.querySelector("#hidden_tienthuegtgt");
  let tongTienThucTe = 0;
  input_hiddenThanhTien.forEach((e) => {
    if (!$(e).parent().parent().find(".chietkhau").is(":checked")) {
      tongTienThucTe += Number(e.value);
    } else {
      tongTienThucTe -= Number(e.value);
    }
  });
  console.log(tongTienThucTe);
  console.log(parseFloat(input_hiddenTongThanhTien.value));
  if (tongTienThucTe == parseFloat(input_hiddenTongThanhTien.value)) {
    return true;
  } else {
    return false;
  }
}

function saveFormWareHouseAdd(ob) {
  let button_save = document.querySelector("#saveFormWareHouseAdd");
  let id_warehouseName = document.querySelector("#name_warehouse");
  let errorArray = [];
  let div_error_warehouseAdd = document.querySelector(".error_warehouseAdd");
  div_error_warehouseAdd.innerHTML = "";
  let formWarehouseAdd = document.querySelector("#formWareHouseAdd");

  if (id_warehouseName.value == "") {
    errorArray.push("Vui lòng nhập tên kho hàng");
  }

  if (errorArray.length == 0) {
    let op = "inventory_warehouse";
    let dataJson = {
      name: document.querySelector("#name_warehouse").value,
      taxcode_warehouse: document.querySelector("#taxcode_warehouse").value,
      street_warehouse: document.querySelector("#street_warehouse").value,
      province: document.querySelector("#tinhThanh1").value
        ? document.querySelector("#tinhThanh1").value
        : "",
      district: document.querySelector("#quanHuyen").value
        ? document.querySelector("#quanHuyen").value
        : "",
      note: document.querySelector("#note").value,
      status: document.querySelector("#status").value,
      status_different: document.getElementById("status_different").value,
    };

    $.ajax({
      type: "POST",
      url: "/ajax.php",
      data: {
        op: op,
        contentType: false,
        processData: false,
        inputAction: "addWarehouse",
        value: { valueForm: dataJson },
      },
    }).done(function (success) {
      let res = JSON.parse(success);
      if (res.error) {
        div_error_warehouseAdd.insertAdjacentHTML(
          "beforeend",
          `<p style="color:red;padding:5px 0">${res.error}</p>`
        );
      } else {
        div_error_warehouseAdd.insertAdjacentHTML(
          "beforeend",
          `<p style="color:green;padding:5px 0">Đã thêm kho hàng</p>`
        );
        autoShowWarehouseCategory(
          ob,
          document.getElementById("status_different").value
        );
      }
    });
  } else {
    errorArray.forEach((e) => {
      div_error_warehouseAdd.insertAdjacentHTML(
        "beforeend",
        `<p style="color:red;padding:5px 0">${e}</p>`
      );
    });
  }
}
// // inventory
// function handleInvoiceRadioChange(radio){
//     const $radio = $(radio); 
    
//     const $row = $radio.closest('tr');
//     const maHoaDon = $row.find('td:eq(1)').text().trim();
//     const soHoaDon = $row.find('td:eq(2)').text().trim();
//     const inventoryId = $row.data('id'); 
    
//     if (!inventoryId) {
//         alert("Lỗi: Không tìm thấy ID phiếu nhập. Vui lòng kiểm tra lại cấu trúc bảng.");
//         $radio.prop('checked', false); 
//         return;
//     } 
//     const message = `Bạn có muốn chọn Phiếu nhập có mã hóa đơn: <strong>${maHoaDon}</strong> và số hóa đơn: <strong>${soHoaDon}</strong> không?`;
//     const redirectUrl = `/admin.php?op=inventory&act=product&mod=edit&id=${inventoryId}&lang=vn`;
//     $('#btn-confirm-select').attr('href', redirectUrl);
//     $('#modal-confirmation-message').html(message);
//     $('#confirmationModal').modal('show');
// }


// inventory
function handleInvoiceRadioChange(radio, actionMod) {
    const $radio = $(radio); 
    const $row = $radio.closest('tr');
    
    const maHoaDon = $row.find('td:eq(1)').text().trim();
    const soHoaDon = $row.find('td:eq(2)').text().trim();
    const inventoryId = $row.data('id'); 
    
    if (!inventoryId) {
        alert("Lỗi: Không tìm thấy ID phiếu. Vui lòng kiểm tra lại cấu trúc bảng.");
        $radio.prop('checked', false); 
        return;
    } 
    switch (actionMod) {
      case "input":
        actionLabel="Phiếu Nhập";
        actionMod="inputedit";
        break;
      case "output":
        actionLabel="Phiếu xuất";
        actionMod="outputedit";
        break;
      default:
        break;
    }
    const message = `Bạn có muốn chọn <strong>${actionLabel}</strong> có mã hóa đơn: <strong>${maHoaDon}</strong> và số hóa đơn: <strong>${soHoaDon}</strong> không?`;
    const redirectUrl = `/admin.php?op=inventory&act=product&mod=${actionMod}&id=${inventoryId}&lang=vn`;
    $('#btn-confirm-select').attr('href', redirectUrl);
    $('#modal-confirmation-message').html(message);
    $('#confirmationModal').modal('show');
}
function toggleDeductionArea() {
    var checkBox = document.getElementById("phantram_thuesuatHKD");
    var area = document.getElementById("deductionArea");
    var taxinfocard = document.getElementById("taxinfocard");

    
    if (area) { // Kiểm tra nếu tồn tại (do nằm trong if của template)
        if (checkBox.checked == true) {
            area.style.display = "flex"; // Hiện ra (dùng flex để giữ căn lề)
            taxinfocard.style.display = "flex"; // Hiện ra (dùng flex để giữ căn lề)

            
        } else {
            area.style.display = "none"; // Ẩn đi
            taxinfocard.style.display = "none"; // Hiện ra (dùng flex để giữ căn lề)

        }
    }
}