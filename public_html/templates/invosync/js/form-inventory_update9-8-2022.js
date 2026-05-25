$(document).ready(function () {
  if ($("#formatdate").val() == "/") {
    var formatDate = "dd/mm/yy";
  } else {
    var formatDate = "dd-mm-yy";
  }

  $(".option-view-details").hide();
  $("#view-option").click(function () {
    $(".option-view-details").slideToggle();
  });

  var allow_year = $("#allow_year").val();
  var date = new Date().getFullYear();

  $("#show_ngayhoadon").datepicker({
    dateFormat: formatDate,
    changeMonth: true,
    changeYear: true,
    yearRange: "2019:" + date,
  });
  $("#show_ngaythucnhap").datepicker({
    dateFormat: "dd-mm-yy",
    changeMonth: true,
    changeYear: true,
    yearRange: "2019:" + date,
  });

  $("#show_hansudung1").datepicker({
    dateFormat: formatDate,
    changeMonth: true,
    changeYear: true,
    yearRange: "2019:" + date,
  });

  $(".hsd1").datepicker({
    dateFormat: formatDate,
    changeMonth: true,
    changeYear: true,
  });

  $("#show_hanthanhtoan").datepicker({
    dateFormat: formatDate,
    changeMonth: true,
    changeYear: true,
    yearRange: "2019:" + date,
  });

  
  $("#show_ngayGiaoNhanHang").datepicker({
    dateFormat: formatDate,
    changeMonth: true,
    changeYear: true,
    yearRange: "2019:" + date,
  });

  $("#payment_term").datepicker({
    dateFormat: formatDate,
    changeMonth: true,
    changeYear: true,
    yearRange: "2019:" + date,
  });
  

  var inp_warning = $("#inp_warning").val();
  if (inp_warning == 1) {
    openpopupWarning();
  }

  // CLICK BODY HIDE CLASS
  $("body").click(function () {
    $(".prosku-searching-box").hide();
    $("#cus-searching-box").hide();
  });
  limitInvoiceDate();
  
  const updateNoteTooltip = function() {
      $(this).attr('title', $(this).val());
  };
  $(document).on('input', '.item-note', updateNoteTooltip);
  $('.item-note').each(updateNoteTooltip);

});
function toggleGuide() {
    const guide = document.getElementById('guide-text');
    if (guide.style.display === "none") {
        guide.style.display = "block";
    } else {
        guide.style.display = "none";
    }
}


function checkAllConfigColum() {
  var valueConfigInv = document.getElementById("valueConfigColum").checked;
  if (valueConfigInv == true) {
    $(".option-view-details .config_col").attr("checked", "checked");
  } else {
    $(".option-view-details .config_col").removeAttr("checked");
  }
}
function cancelConfigColum() {
  $(".option-view-details").slideToggle();
}

function allowShowAdd() {
  var n = $("#hanghoa_thongtinthem_yes").val();
  if (n == 1) {
    $("#input_kho_no").removeAttr("checked");
    $("#input_solo_no").removeAttr("checked");
    $("#input_hsd_no").removeAttr("checked");
    $("#input_nhomhh_no").removeAttr("checked");
    $("#input_loaihh_no").removeAttr("checked");
    $("#input_ghichu_no").removeAttr("checked");

    $("#input_kho_yes").attr("checked", "checked");
    $("#input_solo_yes").attr("checked", "checked");
    $("#input_hsd_yes").attr("checked", "checked");
    $("#input_nhomhh_yes").attr("checked", "checked");
    $("#input_loaihh_yes").attr("checked", "checked");
    $("#input_ghichu_yes").attr("checked", "checked");
  }
}

function notallowShowAdd() {
  var n = $("#hanghoa_thongtinthem_no").val();
  if (n == 2) {
    $("#input_kho_yes").removeAttr("checked");
    $("#input_solo_yes").removeAttr("checked");
    $("#input_hsd_yes").removeAttr("checked");
    $("#input_nhomhh_yes").removeAttr("checked");
    $("#input_loaihh_yes").removeAttr("checked");
    $("#input_ghichu_yes").removeAttr("checked");

    $("#input_kho_no").attr("checked", "checked");
    $("#input_solo_no").attr("checked", "checked");
    $("#input_hsd_no").attr("checked", "checked");
    $("#input_nhomhh_no").attr("checked", "checked");
    $("#input_loaihh_no").attr("checked", "checked");
    $("#input_ghichu_no").attr("checked", "checked");
  }
}

function submitInvenProInput() {
  var inp_warning = $("#inp_warning").val();
  console.log("inp_warning :>> ", inp_warning);
  if (inp_warning != "") {
    openpopupWarning();
  } else {
    $("#f_InvenProIn").submit();
  }
}

function submitInvenLockCycle() {
  var check = $("#check").val();
  console.log(check);
  if (check != "false") {
    $("#f_lockcycle").submit();
  } else {
    alert("Lựa chọn của bạn không phù hợp!");
  }
}

function submitInvenUnLockCycle() {
  $("#f_unlockcycle").submit();
}

function submitFormCus(ob) {
  var action = $(ob).val();
  console.log(action);
  $("#action").val(action);
  $("#action").attr("value", action);

  $("#f_InvenCusAdd").submit();
}
function submitFormfor(ob) {
  var action = $(ob).val();
  console.log(action);
  $("#actionfor").val(action);
  $("#actionfor").attr("value", action);
  $("#f_InvenforAdd").submit();
}
function submitFormWare(ob) {
  var action = $(ob).val();
  console.log(action);
  $("#actionWare").val(action);
  $("#actionWare").attr("value", action);

  $("#f_InvenWareAdd").submit();
}

function submitFormProGroup(ob) {
  var action = $(ob).val();
  console.log(action);
  $("#actionProGroup").val(action);
  $("#actionProGroup").attr("value", action);

  $("#f_InvenGroupAdd").submit();
}

function submitFormParcel(ob) {
  var action = $(ob).val();
  console.log(action);
  $("#actionParcel").val(action);
  $("#actionParcel").attr("value", action);

  $("#f_InvenParcelAdd").submit();
}

function submitInvenProSearch() {
  //console.log('88');
  var op = $("#op").val();
  var act = $("#act").val();
  var mod = $("#mod").val();
  var doo = $("#doo").val();
  var voucher = $("#voucher").val();
  var parcel = $("#parcel").val();
  var taxcode = $("#taxcode").val();
  var date = $("#date").val();
  var expiry = $(".expiry").val();
  var company = $("#company").val();
  var product = $("#product").val();
  var group = $("#group").val();
  var warehouse = $("#warehouse").val();
  var money = $("#money").val();
  //console.log(op,act,mod,doo,voucher,parcel,taxcode,date,expiry,company,product,group,warehouse,money);
  //href = '/admin.php?op='+op+'&act='+act+'&mod='+mod+'$doo='+doo+'&voucher='+voucher+'&parcel='+parcel+'&taxcode='+taxcode+'&date='+date+'&expiry='+expiry+'&company='+company+'&product='+product+'&group='+group+'&warehouse='+warehouse+'&money='+money;
  //console.log(href);
  window.location.href =
    "/admin.php?op=" +
    op +
    "&act=" +
    act +
    "&mod=" +
    mod +
    "&doo=" +
    doo +
    "&voucher=" +
    voucher +
    "&parcel=" +
    parcel +
    "&taxcode=" +
    taxcode +
    "&date=" +
    date +
    "&expiry=" +
    expiry +
    "&company=" +
    company +
    "&product=" +
    product +
    "&group=" +
    group +
    "&warehouse=" +
    warehouse +
    "&money=" +
    money;
}
//Check date add invoice - old - Kiểm tra như các hóa đơn bình thường
function checkDateAddInvoice() {
  var ngayhoadon = $("#show_ngayhoadon").val();
  var ngayphathanh = $("#hidden_ngayphathanh").val();
  var ngayhoadoncuoi = $("#hidden_ngayhoadoncuoi").val();
  var hoadoncuoi = $("#hidden_hoadoncuoi").val();

  var stringNgayHD = ngayhoadon.replace(/-/g, "/"); // Ngày của hóa đơn cuối
  var partsNgayHD = stringNgayHD.split("/");
  var objectNgayHD = new Date(
    +partsNgayHD[2],
    partsNgayHD[1] - 1,
    +partsNgayHD[0]
  );
  var form_NgayHD = Date.parse(objectNgayHD);

  var stringNgayPH = ngayphathanh.replace(/-/g, "/"); // Ngày của hóa đơn cuối
  var partsNgayPH = stringNgayPH.split("/");
  var objectNgayPH = new Date(
    +partsNgayPH[2],
    partsNgayPH[1] - 1,
    +partsNgayPH[0]
  );
  var form_NgayPH = Date.parse(objectNgayPH);

  var stringNgayCuoi = ngayhoadoncuoi.replace(/-/g, "/"); // Ngày của hóa đơn cuối
  var partsNgayCuoi = stringNgayCuoi.split("/");
  var objectNgayCuoi = new Date(
    +partsNgayCuoi[2],
    partsNgayCuoi[1] - 1,
    +partsNgayCuoi[0]
  );
  var form_NgayCuoi = Date.parse(objectNgayCuoi);

  console.log(form_NgayHD);
  console.log(form_NgayPH);
  console.log(form_NgayCuoi);

  var flag = true;
  if (ngayhoadoncuoi == "") {
    // Hóa đơn đầu tiên: chỉ so sánh với ngày thông báo phát hành
    if (form_NgayHD < form_NgayPH) {
      $(".edateaddinventory").addClass("bf");
      $(".edateaddinventory").text(
        "Ngày hóa đơn lớn hơn hoặc bằng ngày " + ngayphathanh
      );
      $(".ngayhoadon").addClass("err_border");
      flag = false;
    } else {
      $(".edateaddinventory").removeClass("bf");
      $(".edateaddinventory").text("");
    }
  } else {
    //Đã có hóa đơn trước đó: so sánh với hóa đơn cuối và ngày phát hành
    if (form_NgayHD < form_NgayPH) {
      $(".edateaddinventory").addClass("bf");
      $(".edateaddinventory").text(
        "Ngày hóa đơn lớn hơn hoặc bằng ngày " + ngayphathanh
      );
      $(".ngayhoadon").addClass("err_border");
      flag = false;
    } else if (form_NgayHD < form_NgayCuoi) {
      $(".edateaddinventory").addClass("bf");
      $(".edateaddinventory").text(
        "Ngày hóa đơn lớn hơn hoặc bằng ngày " + ngayhoadoncuoi
      );
      $(".ngayhoadon").addClass("err_border");
      flag = false;
    } else {
      $(".edateaddinventory").removeClass("bf");
      $(".edateaddinventory").text("");
      $(".ngayhoadon").removeClass("err_border");
    }
  }

  return flag;
}

//Check date add inventory - new - Chỉ kiểm tra với năm hiện hành chọn trong cấu hình
function checkDateAddInventory() {
  var ngayhoadon = $("#show_ngayhoadon").val();
  var ngaydaunamhienhanh = $("#hidden_daunamhienhanh").val();
  var ngaycuoinamhienhanh = $("#hidden_cuoinamhienhanh").val();

  var stringNgayHD = ngayhoadon.replace(/-/g, "/"); // Ngày của hóa đơn cuối
  var partsNgayHD = stringNgayHD.split("/");
  var objectNgayHD = new Date(
    +partsNgayHD[2],
    partsNgayHD[1] - 1,
    +partsNgayHD[0]
  );
  var form_NgayHD = Date.parse(objectNgayHD);

  var stringNgayHH = ngaydaunamhienhanh.replace(/-/g, "/"); // Ngày của năm hiện hành
  var partsNgayHH = stringNgayHH.split("/");
  var objectNgayHH = new Date(
    +partsNgayHH[2],
    partsNgayHH[1] - 1,
    +partsNgayHH[0]
  );
  var form_NgayHH = Date.parse(objectNgayHH);

  var stringNgayCuoiHH = ngaycuoinamhienhanh.replace(/-/g, "/"); // Ngày của năm hiện hành
  var partsNgayCuoiHH = stringNgayCuoiHH.split("/");
  var objectNgayCuoiHH = new Date(
    +partsNgayCuoiHH[2],
    partsNgayCuoiHH[1] - 1,
    +partsNgayCuoiHH[0]
  );
  var form_NgayCuoiHH = Date.parse(objectNgayCuoiHH);

  console.log(form_NgayHD);
  console.log(form_NgayHH);
  console.log(form_NgayCuoiHH);

  var flag = true;

  if (form_NgayHD < form_NgayHH) {
    $(".edateaddinventory").addClass("bf");
    $(".edateaddinventory").text(
      "Ngày hóa đơn lớn hơn hoặc bằng ngày " + ngaydaunamhienhanh
    );
    $(".ngayhoadon").addClass("err_border");
    flag = false;
  } else if (form_NgayHD > form_NgayCuoiHH) {
    $(".edateaddinventory").addClass("bf");
    $(".edateaddinventory").text(
      "Ngày hóa đơn nhỏ hơn hoặc bằng ngày " + ngaycuoinamhienhanh
    );
    $(".ngayhoadon").addClass("err_border");
    flag = false;
  } else {
    $(".edateaddinventory").removeClass("bf");
    $(".edateaddinventory").text("");
    $(".ngayhoadon").removeClass("err_border");

    checkDateDebt();
    // Update for show_ngaythucnhap
    getDateInvoiceDateSet();
  }

  return flag;
}

function changeDateInput() {
  var ngaythucnhap = $("#show_ngaythucnhap").val();
  var d = ngaythucnhap.slice(0, 2);
  var m = parseInt(ngaythucnhap.slice(3, 5));
  var yyyy = ngaythucnhap.slice(6, 10);
  var inven_month = parseInt($("#inven_month").val());
  if (m != inven_month) {
    var r = confirm(
      "Bạn đang nhập ngày không thuộc phiên làm việc. Bạn có chấp nhận thay đổi phiên làm việc?"
    );
    if (r == true) {
      updatemonth(m);
    } else {
      location.reload();
    }
  }
}

function getDateInvoiceDateSet() {
  var dateInvoice = $("#show_ngayhoadon").val();
  $("#show_ngaythucnhap").val(dateInvoice);
  $("#show_ngaythucnhap").attr("value", dateInvoice);
}

function searchInfoCus(exist_productline) {
  var op = "inventory_searchcus";
  var row = exist_productline;
  var value = $("#info_timnhanh").val();
  console.log(value.length);
  if (value.length >= 3) {
    $.ajax({
      type: "POST",
      url: "/ajax.php",
      data: {
        op: op,
        value: value,
        row: row,
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
//nhận hàng
function searchInforeceiver(exist_productline) {
  var op = "inventory_receiver";
  var value = $(".show_nhanvien").val();
  console.log(value.length);
  var row = exist_productline;
  if (value.length >= 1) {
    $.ajax({
      type: "POST",
      url: "/ajax.php",
      data: {
        op: op,
        value: value,
        row: row,
      },
      success: function (data) {
        $("#rec-searching-box").show();
        $("#rec-searching-box").html(data);
      },
    });
  } else {
    $("#rec-searching-box").hide();
  }
}

function searchInfoProduct(valueinput, row) {
  var op = "inventory_searchpro";
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

function clickUnit(obj) {
  var op = "inventory_getunit";
  $.ajax({
    type: "POST",
    url: "/ajax.php",
    dataType: "json",
    data: {
      op: op,
    },
    success: function (data) {
      console.log(data);
      $(obj).parents("tr").find(".load-unit").show();
      $(obj).parents("tr").find(".load-unit").html(data);
      // $(obj).parent().find(".load-dvt").show();
      // $(obj).parent().find(".load-dvt").html(data);
    },
  });
}

function clickReturnUnit(ob) {
  console.log(ob);
  var product_name = $(ob).data("name");
  $(ob).parents("tr").find(".donvi").val(product_name);
  $(".load-unit").hide();
}

function clickSearchCus(nv) {
  var idCus = $(nv).data("id");
  var nameCus = $(nv).data("name");
  var companynameCus = $(nv).data("companyname");

  // $('#info_timnhanh').val($(nv).data('name'));
  // $('#info_timnhanh').attr('value',$(nv).data('name'));
  $("#info_timnhanh").val("");
  $("#info_timnhanh").attr("value", "");
  $("#cus-searching-box").hide();

  var op = "inventory_getinfocus";
  $.ajax({
    type: "POST",
    url: "/ajax.php",
    dataType: "json",
    data: {
      op: op,
      idCus: idCus,
    },
    success: function (data) {
      if (data["success"] == 0) {
        console.log(data["masothue"]);
        // hidden
        $("#show_masothue").val(data["masothue"]);
        $("#show_masothue").attr("value", data["masothue"]);

        $("#show_donviban").val(data["donvi"]);
        $("#show_donviban").attr("value", data["donvi"]);

        $("#show_madonvi").val(data["madonvi_tenviettat"]);
        $("#show_madonvi").attr("value", data["madonvi_tenviettat"]);

        $("#id_cus").val(data["id_customer"]);
        $("#id_cus").attr("value", data["id_customer"]);

        // show
        $("#show_masothue_dis").val(data["masothue"]);
        $("#show_masothue_dis").attr("value", data["masothue"]);

        $("#show_donviban_dis").val(data["donvi"]);
        $("#show_donviban_dis").attr("value", data["donvi"]);

        $("#show_madonvi_dis").val(data["madonvi_tenviettat"]);
        $("#show_madonvi_dis").attr("value", data["madonvi_tenviettat"]);

        // $('#show_nguoinhanhang').val(data['name']);
        // $('#show_nguoinhanhang').attr('value',data['name']);

        // $('input#email').val(data['email']);
        // $('input#email').attr('value',data['email']);
        // $('input#diachi').val(data['address']);
        // $('input#diachi').attr('value',data['address']);
        // $('input#sotaikhoan').val(data['stk']);
        // $('input#sotaikhoan').attr('value',data['stk']);
      }
    },
  });
}

function clickSearchreceiver(nv) {
  var idCus = $(nv).data("id");
  var nameCus = $(nv).data("name");
  $(".show_nhanvien").val(nameCus);
  $(".show_nhanvien").attr("value", nameCus);

  $(".hidden_nhanvien").val(idCus);

  $("#rec-searching-box").hide();
}
function clickSearchPro(nv) {
  var idPro = $(nv).data("id");
  var idWarehouse = $("#makho").val();
  $(".prosku-searching-box").hide();

  var op = "inventory_getinfopro";
  $.ajax({
    type: "POST",
    url: "/ajax.php",
    dataType: "json",
    data: {
      op: op,
      idWarehouse: idWarehouse,
      idPro: idPro,
    },
    success: function (data) {
      console.log(data["id_pro"]);
      if (data["success"] == 0) {
        $(nv).parents("tr").find(".masku").val(data["proSkuCode"]);
        $(nv).parents("tr").find(".masku").attr("value", data["proSkuCode"]);

        $(nv).parents("tr").find(".mahang").val(data["proCode"]);
        $(nv).parents("tr").find(".mahang").attr("value", data["proCode"]);

        $(nv).parents("tr").find(".tenhang").val(data["proName"]);
        $(nv).parents("tr").find(".tenhang").attr("value", data["proName"]);

        $(nv).parents("tr").find(".donvi").val(data["proUnit"]);
        $(nv).parents("tr").find(".donvi").attr("value", data["proUnit"]);

        $(nv).parents("tr").find(".soluong").val(data["proQuantity"]);
        $(nv).parents("tr").find(".soluong").attr("value", data["proQuantity"]);

        $(nv).parents("tr").find(".dongia").val(data["proPrice"]);
        $(nv).parents("tr").find(".dongia").attr("value", data["proPrice"]);

        $(nv).parents("tr").find(".thanhtien").val(data["proIntoMoney"]);
        $(nv)
          .parents("tr")
          .find(".thanhtien")
          .attr("value", data["proIntoMoney"]);

        clickChangeQuantity(nv);
        clickChangePrice(nv);
        calcuIntoMoney(nv);

        $(nv).parents("tr").find(".makho").val(data["proIdWarehouse"]);
        $(nv)
          .parents("tr")
          .find(".makho")
          .attr("value", data["proIdWarehouse"]);

        $(nv).parents("tr").find(".solo").val(data["proIdParcel"]);
        $(nv).parents("tr").find(".solo").attr("value", data["proIdParcel"]);

        $(nv).parents("tr").find(".hsd").val(data["proDateExpiry"]);
        $(nv).parents("tr").find(".hsd").attr("value", data["proDateExpiry"]);

        $(nv).parents("tr").find(".nhh").val(data["proIdGroup"]);
        $(nv).parents("tr").find(".nhh").attr("value", data["proIdGroup"]);

        $(nv).parents("tr").find(".ghichu").val(data["proNote"]);
        $(nv).parents("tr").find(".ghichu").attr("value", data["proNote"]);
      }
    },
  });
}

function calcuTotalAmount(ob) {
  var lethanhtien = $("#lethanhtien").val();
  var hiddenTotalAmount = 0;
  var showTotalAmount = 0;

  $("#dshanghoa .hidden_thanhtien").each(function () {
    hidden_thanhtien = Number($(this).val());
    hiddenTotalAmount += hidden_thanhtien;
  });

  if (lethanhtien == 0) {
    var results = Math.round(hiddenTotalAmount);
    var results = results.toString();
  } else {
    var results = hiddenTotalAmount.toString();
  }

  var arrayIntoMoney = formatThanhTien(results, 2);
  var moneyShow = arrayIntoMoney[0];
  var moneyHidden = arrayIntoMoney[1];
  $("#show_tongthanhtien").val(moneyShow);
  $("#hidden_tongthanhtien").attr("value", moneyHidden);
}

function calcuIntoMoney(ob) {
  debugger;
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
  $(ob)
    .parents("#dshanghoa tr")
    .find(".hidden_thanhtien")
    .attr("value", moneyHidden);
}

function calcuIntoMoney_inventory(ob) {
  var lethanhtien = $("#inven_lethanhtien").val();
  var quantity = $(ob).parents("#dshanghoa tr").find(".hidden_soluong").val();
    var checkFormat = $("#exist_formatnumber").val();

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

  var arrayIntoMoney = formatThanhTien_inventory(results, checkFormat, 2);
  var moneyShow = arrayIntoMoney[0];
  var moneyHidden = arrayIntoMoney[1];
  // $(ob).parents("#dshanghoa tr").find(".dongianhansoluong ").val(moneyShow);
  // $(ob).parents("#dshanghoa tr").find(".hidden_dongianhansoluong ").attr("value", moneyShow);
  $(ob).parents("#dshanghoa tr").find(".thanhtien").val(moneyShow);
  $(ob).parents("#dshanghoa tr").find(".hidden_thanhtien ").attr("value", moneyHidden);

  $(ob)
    .parents("#dshanghoa tr")
    .find(".hidden_dongianhansoluong")
    .attr("value", moneyHidden);
}

function calcuIntoMoney_inventoryForeignCurrency(ob) {
  var lethanhtien = $("#inven_lethanhtien").val();
  var quantity = $(ob).parents("#dshanghoa tr").find(".hidden_soluong").val();
    var checkFormat = $("#exist_formatnumber").val();

  if (quantity == "") {
    quantity = "1";
  }
  var price = $(ob).parents("#dshanghoa tr").find(".hidden_dongiangoaite").val();
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

  var arrayIntoMoney = formatThanhTien_inventory(results,2,2);
  var moneyShow = arrayIntoMoney[0];
  var moneyHidden = arrayIntoMoney[1];
  $(ob).parents("#dshanghoa tr").find(".thanhtienngoaite").val(moneyShow);
  $(ob).parents("#dshanghoa tr").find(".hidden_thanhtienngoaite").attr("value", moneyHidden);

  $(ob)
    .parents("#dshanghoa tr")
    .find(".thanhtienngoaite")
    .attr("value", moneyHidden);
}



function clickChangeIntoMoney(ob) {
  var value = $(ob).val();
  var arrayIntoMoney = formatThanhTien(value);
  var intoMoneyShow = arrayIntoMoney[0];
  var intoMoneyHidden = arrayIntoMoney[1];

  $(ob).val(intoMoneyShow);
  $(ob).parents("td").find(".hidden_thanhtien").attr("value", intoMoneyHidden);
  console.log(intoMoneyShow, intoMoneyHidden);
  calcuTotalAmount(ob);

  //----------- Update price ----------
  var ledongia = $("#dongiachopheple").val();
  var quantity = $(ob).parents("tr").find(".hidden_soluong").val();
  var priceaf = $(ob).parents("tr").find(".dongia").val();
  console.log(priceaf);
  if (priceaf == "") {
    var price = Number(intoMoneyHidden) / Number(quantity);
    if (ledongia == 0) {
      var results = Math.round(price);
      var results = results.toString();
    } else {
      var results = price.toString();
    }
    var arrayPrice = formatDonGia(results, 2);
    var moneyShow = arrayPrice[0];
    var moneyHidden = arrayPrice[1];
    $(ob).parents("#dshanghoa tr").find(".dongia").val(moneyShow);
    $(ob)
      .parents("#dshanghoa tr")
      .find(".hidden_dongia")
      .attr("value", moneyHidden);
  } else {
    console.log("rỗng");
  }
  // nếu có nhập đơn giá thì không cập nhật lại
  // if (isNaN(priceaf)) {

  // } else {
  //   console.log("Có nhập đơn giá");
  // }

  // var intomoney = $(ob).parents('#dshanghoa tr').find(".thanhtien").val();
  // var arrayIntoMoney = formatThanhTien(intomoney);
  // var intoMoneyShow = arrayIntoMoney[0];
  // var intoMoneyHidden = arrayIntoMoney[1];

  // $(ob).parents('tr').find("#dshanghoa .thanhtien").val(intoMoneyShow);
  // $(ob).parents('tr').find("#dshanghoa .hidden_thanhtien").attr('value', intoMoneyHidden);
  // console.log(intoMoneyShow, intoMoneyHidden);
  // calcuTotalAmount(ob);
}

function formatThanhTien_pld(value = "", check = 1) {
  var lethanhtien = $("#lethanhtien").val();
  var checkFormat = $("#formatnumber").val();
  var storeId = $("#storeId").val();
  var currency = $("#hidden_currency").val()
    ? $("#hidden_currency").val()
    : "VND";
  // checkFormat = 1: Format kind of VietNam (Ex: 1.000.000,123)
  // checkFormat = 2: Format kind of National (Ex: 1,000,000.123)
  // check = 1: convert format
  // check = 2: format

  var results = [0, 0];
  var temp = null;
  if (value != "") {
    if (check == 1) {
      temp = String(value);
      if (currency == "VND") {
        value = temp.replace(/[.]/g, "");
        var inputComma = value.includes(","); // Check input has ',' in string- True: Y - False: N
      } else {
        value = temp.replace(/[,]/g, "");
        var inputComma = value.includes("."); // Check input has ',' in string- True: Y - False: N
      }
    }

    if (inputComma == true) {
      // input: 120.600,789

      if (currency == "VND") {
        var decimalValue = value.substring(value.lastIndexOf(",") + 1); // 789 (string)
        var decimalValue = decimalValue.replace(/[.]/g, ""); // if input 789.123 -> 789123
        var integerValue = value.slice(0, value.lastIndexOf(",")); // 120.600 (string)
        var fm_intergerValue = parseInt(integerValue.replace(/[,]/g, "")); // 120600 (int)
        var fm_Value = fm_intergerValue + "." + decimalValue;
      } else {
        var decimalValue = value.substring(value.lastIndexOf(".") + 1); // 789 (string)
        var decimalValue = decimalValue.replace(/[,]/g, ""); // if input 789.123 -> 789123
        var integerValue = value.slice(0, value.lastIndexOf(".")); // 120.600 (string)
        var fm_intergerValue = parseInt(integerValue.replace(/[.]/g, "")); // 120600 (int)
        var fm_Value = fm_intergerValue + "." + decimalValue;
      }
    } else {
      // input: 120600.789
      var fm_Value = value;
    }

    if (lethanhtien == 0 || lethanhtien == "") {
      var fm_ValueHidden = Math.round(Number(fm_Value)).toString(); // 120601 (int)
      var decimalValue = 0;
      var integerValue = fm_ValueHidden;
    } else {
      // var fm_ValueHidden =
      //   currency == "VND"
      //     ? parseInt(Number(fm_Value)).toFixed(lethanhtien)
      //     : parseFloat(Number(fm_Value)).toFixed(lethanhtien); // 120600.79 (float)
       var fm_ValueHidden =
        currency == "VND"
          ? parseFloat(Number(fm_Value)).toFixed(lethanhtien)
          : parseFloat(Number(fm_Value)).toFixed(lethanhtien); // 120600.79 (float)
      console.log("vo dayyyyyyyyyyyyyyy", fm_ValueHidden);
      var decimalValue = fm_ValueHidden.substring(
        fm_ValueHidden.lastIndexOf(".") + 1
      ); // 789 (string)
      var integerValue = fm_ValueHidden.slice(
        0,
        fm_ValueHidden.lastIndexOf(".")
      ); // 120600 (string)
    }

    if (currency == "VND") {
      var fm_intergerValue = integerValue
        .toString()
        .replace(/\B(?=(\d{3})+(?!\d))/g, ".");
      var fm_ValueShow =
        currency == "VND"
          ? fm_intergerValue
          : fm_intergerValue + "," + decimalValue; // 120.000,79
    } else {
      var fm_intergerValue = integerValue
        .toString()
        .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      var fm_ValueShow = fm_intergerValue + "." + decimalValue; // 120,000.79
    }
    if (storeId == 258) {
      if (lethanhtien == 0) {
        // 120.600,00 => 120.600
        var fm_ValueShow = fm_intergerValue;
      }
    } else {
      if (parseFloat(decimalValue) == 0) {
        // 120.600,00 => 120.600
        var fm_ValueShow = fm_intergerValue;
      }
    }

    var res_ShowValue = fm_ValueShow;
    var res_HiddenValue = fm_ValueHidden;
    results = [res_ShowValue, res_HiddenValue];
  }

  return results;
}
function formatThanhTien(value = "", check = 1) {
  var lethanhtien = $("#lethanhtien").val();
  var checkFormat = $("#formatnumber").val();
  var storeId = $("#storeId").val();
  var currency = $("#hidden_currency").val()
    ? $("#hidden_currency").val()
    : "VND";
  // checkFormat = 1: Format kind of VietNam (Ex: 1.000.000,123)
  // checkFormat = 2: Format kind of National (Ex: 1,000,000.123)
  // check = 1: convert format
  // check = 2: format

var results = [0, 0];
var isNegative = false;
if (value != "") {
    // Thêm 3 dòng này:
    var strVal = String(value).trim();
    isNegative = strVal.startsWith("-");
    value = strVal.replace("-", ""); // Biến -0.16 thành 0.16 để logic cũ chạy đúng
}

  var temp = null;
  if (value != "") {
    if (check == 1) {
      temp = String(value);
      if (currency == "VND") {
        value = temp.replace(/[.]/g, "");
        var inputComma = value.includes(","); // Check input has ',' in string- True: Y - False: N
      } else {
        value = temp.replace(/[,]/g, "");
        var inputComma = value.includes("."); // Check input has ',' in string- True: Y - False: N
      }
    }

    if (inputComma == true) {
      // input: 120.600,789

      if (currency == "VND") {
        var decimalValue = value.substring(value.lastIndexOf(",") + 1); // 789 (string)
        var decimalValue = decimalValue.replace(/[.]/g, ""); // if input 789.123 -> 789123
        var integerValue = value.slice(0, value.lastIndexOf(",")); // 120.600 (string)
        var fm_intergerValue = parseInt(integerValue.replace(/[,]/g, "")); // 120600 (int)
        var fm_Value = fm_intergerValue + "." + decimalValue;
      } else {
        var decimalValue = value.substring(value.lastIndexOf(".") + 1); // 789 (string)
        var decimalValue = decimalValue.replace(/[,]/g, ""); // if input 789.123 -> 789123
        var integerValue = value.slice(0, value.lastIndexOf(".")); // 120.600 (string)
        var fm_intergerValue = parseInt(integerValue.replace(/[.]/g, "")); // 120600 (int)
        var fm_Value = fm_intergerValue + "." + decimalValue;
      }
    } else {
      // input: 120600.789
      var fm_Value = value;
    }

    if (lethanhtien == 0 || lethanhtien == "") {
      var fm_ValueHidden = Math.round(Number(fm_Value)).toString(); // 120601 (int)
      var decimalValue = 0;
      var integerValue = fm_ValueHidden;
    } else {
      // var fm_ValueHidden =
      //   currency == "VND"
      //     ? parseInt(Number(fm_Value)).toFixed(lethanhtien)
      //     : parseFloat(Number(fm_Value)).toFixed(lethanhtien); // 120600.79 (float)
       var fm_ValueHidden =
        currency == "VND"
          ? parseFloat(Number(fm_Value)).toFixed(lethanhtien)
          : parseFloat(Number(fm_Value)).toFixed(lethanhtien); // 120600.79 (float)
      console.log("vo dayyyyyyyyyyyyyyy", fm_ValueHidden);
      var decimalValue = fm_ValueHidden.substring(
        fm_ValueHidden.lastIndexOf(".") + 1
      ); // 789 (string)
      var integerValue = fm_ValueHidden.slice(
        0,
        fm_ValueHidden.lastIndexOf(".")
      ); // 120600 (string)
    }

    if (currency == "VND") {
      var fm_intergerValue = integerValue
        .toString()
        .replace(/\B(?=(\d{3})+(?!\d))/g, ".");
      var fm_ValueShow =
        currency == "VND"
          ? fm_intergerValue
          : fm_intergerValue + "," + decimalValue; // 120.000,79
    } else {
      var fm_intergerValue = integerValue
        .toString()
        .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      var fm_ValueShow = fm_intergerValue + "." + decimalValue; // 120,000.79
    }
    if (storeId == 258) {
      if (lethanhtien == 0) {
        // 120.600,00 => 120.600
        var fm_ValueShow = fm_intergerValue;
      }
    } else {
      if (parseFloat(decimalValue) == 0) {
        // 120.600,00 => 120.600
        var fm_ValueShow = fm_intergerValue;
      }
    }
debugger;
    var res_ShowValue = fm_ValueShow;
    var res_HiddenValue = fm_ValueHidden;
    // Gắn lại dấu âm trước khi trả về
        if (isNegative && parseFloat(res_HiddenValue) !== 0) {
            res_ShowValue = "-" + res_ShowValue;
            res_HiddenValue = "-" + res_HiddenValue;
        }
    results = [res_ShowValue, res_HiddenValue];
  }

  return results;
}

function formatThanhTien_inventory(value = "", check = 1) {
  console.log("aaa");
  var lethanhtien = $("#inven_lethanhtien").val();
  var checkFormat = $("#exist_formatnumber").val();
  var storeId = $("#storeId").val();
  var currency = $("#hidden_currency").val()
    ? $("#hidden_currency").val()
    : "VND";
  // checkFormat = 1: Format kind of VietNam (Ex: 1.000.000,123)
  // checkFormat = 2: Format kind of National (Ex: 1,000,000.123)
  // check = 1: convert format
  // check = 2: format

  var results = [0, 0];
  var temp = null;
  if (value != "") {
    if (check == 1) {
      temp = String(value);
      if (currency == "VND") {
        value = temp.replace(/[.]/g, "");
        var inputComma = value.includes(","); // Check input has ',' in string- True: Y - False: N
      } else {
        value = temp.replace(/[,]/g, "");
        var inputComma = value.includes("."); // Check input has ',' in string- True: Y - False: N
      }
    }

    if (inputComma == true) {
      // input: 120.600,789

      if (currency == "VND") {
        var decimalValue = value.substring(value.lastIndexOf(",") + 1); // 789 (string)
        var decimalValue = decimalValue.replace(/[.]/g, ""); // if input 789.123 -> 789123
        var integerValue = value.slice(0, value.lastIndexOf(",")); // 120.600 (string)
        var fm_intergerValue = parseInt(integerValue.replace(/[,]/g, "")); // 120600 (int)
        var fm_Value = fm_intergerValue + "." + decimalValue;
      } else {
        var decimalValue = value.substring(value.lastIndexOf(".") + 1); // 789 (string)
        var decimalValue = decimalValue.replace(/[,]/g, ""); // if input 789.123 -> 789123
        var integerValue = value.slice(0, value.lastIndexOf(".")); // 120.600 (string)
        var fm_intergerValue = parseInt(integerValue.replace(/[.]/g, "")); // 120600 (int)
        var fm_Value = fm_intergerValue + "." + decimalValue;
      }
    } else {
      // input: 120600.789
      var fm_Value = value;
    }

    if (lethanhtien == 0 || lethanhtien == "") {
      var fm_ValueHidden = Math.round(Number(fm_Value)).toString(); // 120601 (int)
      var decimalValue = 0;
      var integerValue = fm_ValueHidden;
    } else {
      var fm_ValueHidden =
        currency == "VND"
          ? parseInt(Number(fm_Value)).toFixed(lethanhtien)
          : parseFloat(Number(fm_Value)).toFixed(lethanhtien); // 120600.79 (float)
      console.log("vo dayyyyyyyyyyyyyyy", fm_ValueHidden);
      var decimalValue = fm_ValueHidden.substring(
        fm_ValueHidden.lastIndexOf(".") + 1
      ); // 789 (string)
      var integerValue = fm_ValueHidden.slice(
        0,
        fm_ValueHidden.lastIndexOf(".")
      ); // 120600 (string)
    }

    if (currency == "VND") {
      var fm_intergerValue = integerValue
        .toString()
        .replace(/\B(?=(\d{3})+(?!\d))/g, ".");
      var fm_ValueShow =
        currency == "VND"
          ? fm_intergerValue
          : fm_intergerValue + "," + decimalValue; // 120.000,79
    } else {
      var fm_intergerValue = integerValue
        .toString()
        .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      var fm_ValueShow = fm_intergerValue + "." + decimalValue; // 120,000.79
    }
    if (storeId == 258) {
      if (lethanhtien == 0) {
        // 120.600,00 => 120.600
        var fm_ValueShow = fm_intergerValue;
      }
    } else {
      if (parseFloat(decimalValue) == 0) {
        // 120.600,00 => 120.600
        var fm_ValueShow = fm_intergerValue;
      }
    }

    var res_ShowValue = fm_ValueShow;
    var res_HiddenValue = fm_ValueHidden;
    results = [res_ShowValue, res_HiddenValue];
  }

  return results;
}

function formatNgay(value = "") {
  var error = 0;
  var checkFormat = $("#formatdate").val();
  var value = value.replace(/[/]/g, "").replace(/[-]/g, "");
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
      var year = "20" + value.substring(4, 6);
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
    if (checkFormat == "/") {
      var dateValue = date + "/" + month + "/" + year;
    } else {
      var dateValue = date + "-" + month + "-" + year;
    }
  } else {
    var datedate = -1;
    var dateValue = -1;
  }
  // console.log(checkFormat,value.length,datedate,dateValue,year,month,date,dateNow,mm,yyyy);
  return [datedate, dateValue];
}

function checkAlphabetInString(value = "") {
  var letters = /[A-Za-z]/;
  return letters.test(value);
}

function checkNumber(Num = "") {
  Num = formatDonGia(Num)[1];
  if ((Num = Number(Num) || Number(Num) == 0)) {
    Num = Number(Num);
    if (Num < 0) {
      var typeNum = "negative";
    } else {
      var typeNum = "positive";
    }
    if (Number(Num) === Num && Num % 1 !== 0) {
      return ["float", typeNum];
    }
    if (Number(Num) === Num && Num % 1 === 0) {
      return ["integer", typeNum];
    }
  } else {
    var typeNum = "string";
    return [false, typeNum];
  }
}

function checkPeopleNum(ob) {
  var Num = $(ob).val();
  Num = Number(Num);
  var ob1 = $(ob).parents()[1];
  if (Number.isInteger(Num) == false) {
    $(ob1).next().find(".epeoplenumnew").addClass("bf");
    $(ob1).next().find(".epeoplenumnew").text("Số người không hợp lệ!");
  } else if (Num < 1) {
    $(ob1).next().find(".epeoplenumnew").addClass("bf");
    $(ob1).next().find(".epeoplenumnew").text("Số người không hợp lệ!");
  } else {
    $(ob1).next().find(".epeoplenumnew").removeClass("bf");
    $(ob1).next().find(".epeoplenumnew").text("");
  }
}

function checkPhoneNumber(ob) {
  var phoneNum = $(ob).val();
  var ob1 = $(ob).parents()[1];
  results = checkAlphabetInString(phoneNum);
  console.log(phoneNum, results);
  if (results == true) {
    $(ob1).next().find(".eemailnew").addClass("bf");
    $(ob1).next().find(".eemailnew").text("Số điện thoại không hợp lệ!");
  } else {
    $(ob1).next().find(".eemailnew").removeClass("bf");
    $(ob1).next().find(".eemailnew").text("");
  }
}

function checkBankAccNum(ob) {
  var Num = $(ob).val();
  Num = Number(Num);
  var ob1 = $(ob).parents()[1];
  if (Number.isInteger(Num) == false) {
    $(ob1).next().find(".eerrotnew").addClass("bf");
    $(ob1).next().find(".eerrotnew").text("Số tài khoản không hợp lệ!");
  } else if (Num < 1) {
    $(ob1).next().find(".eerrotnew").addClass("bf");
    $(ob1).next().find(".eerrotnew").text("Số tài khoản không hợp lệ!");
  } else {
    $(ob1).next().find(".eerrotnew").removeClass("bf");
    $(ob1).next().find(".eerrotnew").text("");
  }
}

function clickChangeQuantity(ob) {
  var quantity = $(ob).parents("#dshanghoa tr").find(".soluong").val();
  var arrayQuantity = formatSoLuong(quantity);
  var quantityShow = arrayQuantity[0];
  var quantityHidden = arrayQuantity[1];

  $(ob).parents("#dshanghoa tr").find(".soluong").val(quantityShow);
  $(ob)
    .parents("#dshanghoa tr")
    .find(".hidden_soluong")
    .attr("value", quantityHidden);
  console.log(quantityShow, quantityHidden);
  calcuIntoMoney(ob);
  calcuTotalAmount(ob);
}

function formatSoLuong(value = "", check = 1) {
  var lesoluong = $("#soluongchopheple").val() || $("#inven_lesoluong").val();
  var checkFormat = $("#formatnumber").val();
  var currency = $("#hidden_currency").val()
    ? $("#hidden_currency").val()
    : "VND";
  console.log(currency);
  // checkFormat = 1: Format kind of VietNam (Ex: 1.000.000,123)
  // checkFormat = 2: Format kind of National (Ex: 1,000,000.123)
  // check = 1: convert format
  // check = 2: format

  var results = [0, 0];
  console.log("vo day 1" + value);

  if (value != "") {
    if (check == 1) {
      if (currency == "VND") {
        value = value.replace(/[.]/g, "");
        var inputComma = value.includes(","); // Check input has ',' in string- True: Y - False: N
      } else {
        value = value.replace(/[,]/g, "");
        var inputComma = value.includes("."); // Check input has ',' in string- True: Y - False: N
      }
    }
    console.log("vo day 2" + value);

    if (inputComma == true) {
      // input: 120.600,789

      if (currency == "VND") {
        var decimalValue = value.substring(value.lastIndexOf(",") + 1); // 789 (string)
        var decimalValue = decimalValue.replace(/[.]/g, ""); // if input 789.123 -> 789123
        var integerValue = value.slice(0, value.lastIndexOf(",")); // 120.600 (string)
        var fm_intergerValue = integerValue.replace(/[,]/g, ""); // 120600 (int)
        var fm_Value = fm_intergerValue + "." + decimalValue;
      } else {
        var decimalValue = value.substring(value.lastIndexOf(".") + 1); // 789 (string)
        var decimalValue = decimalValue.replace(/[,]/g, ""); // if input 789.123 -> 789123
        var integerValue = value.slice(0, value.lastIndexOf(".")); // 120.600 (string)
        var fm_intergerValue = integerValue.replace(/[.]/g, ""); // 120600 (int)

        var fm_Value = fm_intergerValue + "." + decimalValue;
      }
    } else {
      // input: 120600.789
      var fm_Value = value;
    }
    if (lesoluong == 0 || lesoluong == "") {
      var fm_ValueHidden = Math.round(Number(fm_Value)).toString(); // 120601 (int)

      var decimalValue = 0;
      var integerValue = fm_ValueHidden;
    } else {
      var fm_ValueHidden = parseFloat(Number(fm_Value)).toFixed(lesoluong); // 120600.79 (float)
      var decimalValue = fm_ValueHidden.substring(
        fm_ValueHidden.lastIndexOf(".") + 1
      ); // 789 (string)
      var integerValue = fm_ValueHidden.slice(
        0,
        fm_ValueHidden.lastIndexOf(".")
      ); // 120600 (string)
    }

    if (currency == "VND") {
      var fm_intergerValue = integerValue
        .toString()
        .replace(/\B(?=(\d{3})+(?!\d))/g, ".");
      if (lesoluong == 0 || lesoluong == "") {
        var fm_ValueShow = fm_intergerValue; // 120.000
      } else {
        var fm_ValueShow = fm_intergerValue + "," + decimalValue; // 120.000,79
      }
    } else {
      var fm_intergerValue = integerValue
        .toString()
        .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      if (lesoluong == 0 || lesoluong == "") {
        var fm_ValueShow = fm_intergerValue; // 120,000
      } else {
        var fm_ValueShow = fm_intergerValue + "." + decimalValue; // 120,000.79
      }
    }
    // if(parseFloat(decimalValue) == 0){ // 120.600,00 => 120.600
    //     var fm_ValueShow =  fm_intergerValue;
    //   }

    var res_ShowValue = fm_ValueShow;
    var res_HiddenValue = fm_ValueHidden;
    results = [res_ShowValue, res_HiddenValue];
  }

  return results;
}

function clickChangePrice(ob) {
  var price = $(ob).parents("#dshanghoa tr").find(".dongia").val();
  var arrayPrice = formatDonGia(price);
  var priceShow = arrayPrice[0];
  var priceHidden = arrayPrice[1];

  $(ob).parents("#dshanghoa tr").find(".dongia").val(priceShow);
  $(ob)
    .parents("#dshanghoa tr")
    .find(".hidden_dongia")
    .attr("value", priceHidden);
  console.log(priceShow, priceHidden);
  calcuIntoMoney(ob);
  calcuTotalAmount(ob);
}

function checkDateDebt() {
  var flag = true;
  var ngayduocno = $("#show_songayduocno").val();
  console.log(ngayduocno);
  if (ngayduocno == "") {
    ngayduocno = 0;
    // $("#show_songayduocno").val(0);
    // $("#show_songayduocno").attr('value',0);
    $("#show_hanthanhtoan").val("");
    $("#show_hanthanhtoan").attr("value", "");
    $("#hidden_hanthanhtoan").attr("value", "");
    return flag;
  }

  if (parseInt(ngayduocno) < 0) {
    $(".edateaddinventory").addClass("bf");
    $(".edateaddinventory").text("Số ngày được nợ phải lớn hơn 0.");
    flag = false;
  } else {
    $(".edateaddinventory").removeClass("bf");
    $(".edateaddinventory").text("");

    // Trả dữ liệu cho hạn thanh toán
    var ngayhoadon = $("#show_ngayhoadon").val();
    var stringNgayHD = ngayhoadon.replace(/-/g, "/"); // Format ngày hóa đơn 01/10/1997
    var date = parseDate(stringNgayHD, formatDate);
    date.setDate(date.getDate() + parseInt(ngayduocno));

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

    var ngaythanhtoan = formatNgay(day + "-" + month + "-" + year)[1];
    $("#show_hanthanhtoan").val(ngaythanhtoan);
    $("#show_hanthanhtoan").attr("value", ngaythanhtoan);
    $("#hidden_hanthanhtoan").attr("value", ngaythanhtoan);
  }
  return flag;
}

function parseDate(dateStr, format) {
  const regex = format
    .toLocaleLowerCase()
    .replace(/\bd+\b/, "(?<day>\\d+)")
    .replace(/\bm+\b/, "(?<month>\\d+)")
    .replace(/\by+\b/, "(?<year>\\d+)");

  const parts = new RegExp(regex).exec(dateStr) || {};
  const { year, month, day } = parts.groups || {};
  return parts.length === 4 ? new Date(year, month - 1, day) : undefined;
}

function checkMaturity() {
  var ngaythanhtoan = $("#show_hanthanhtoan").val();
  console.log(ngaythanhtoan);
  var flag = true;

  $("#show_hanthanhtoan").attr("value", ngaythanhtoan);

  var ngayhoadon = $("#show_hanthanhtoan").val(); // Ngày hạn thanh toán vừa chọn
  var ngaythanhtoanhidden = $("#hidden_hanthanhtoan").val(); // Ngày đã được cộng Số ngày đc nợ
  if (ngaythanhtoanhidden != "") {
    var stringNgayHD = ngayhoadon.replace(/-/g, "/");
    var partsNgayHD = stringNgayHD.split("/");
    var objectNgayHD = new Date(
      +partsNgayHD[2],
      partsNgayHD[1] - 1,
      +partsNgayHD[0]
    );
    var form_NgayHD = Date.parse(objectNgayHD);

    var stringNgayTT = ngaythanhtoanhidden.replace(/-/g, "/");
    var partsNgayTT = stringNgayTT.split("/");
    var objectNgayTT = new Date(
      +partsNgayTT[2],
      partsNgayTT[1] - 1,
      +partsNgayTT[0]
    );
    var form_NgayTT = Date.parse(objectNgayTT);

    if (form_NgayHD != form_NgayTT) {
      // Nếu khác nhau thì hiện cảnh báo
      $(".edateaddinventory").addClass("bf");
      $(".edateaddinventory").text(
        "Hạn thanh toán và số ngày được nợ không khớp."
      );
      $(".ngaythanhtoan").addClass("err_border");
      flag = false;
    } else {
      $(".edateaddinventory").removeClass("bf");
      $(".edateaddinventory").text("");
      $(".ngaythanhtoan").removeClass("err_border");
    }
  }

  return flag;
}

function clickChangeDictrict(ob) {
  console.log(ob);
}

$("#ware_tinhthanh").change(function () {
  console.log("dâsdsas");
  var id_tinh = $(this).val();
  var op = "inventory_tinhthanh";
  $.ajax({
    type: "post",
    url: "/ajax.php",
    data: { op: op, id_tinh: id_tinh },
    success: function (data) {
      $("#load_huyen").html(data);
    },
  });
});

// ADD ROW FOR INPUT / OUTPUT INVENTORY---------------------------------------------------

var counter = 1;
function addonerows() {
  counter += 1;
  // var fruits = [];
  // $('.product_name_load3').each(function(){
  //     fruits.push($(this).val());
  // });
  var packingdv = $("#packing");
  // var originalSelectdv = packingdv.find('select');
  // originalSelectdv.children().each(function(){
  //     if($.inArray($(this).val(),fruits) != -1 ){
  //     }
  // })
  var clonedv = packingdv.clone();
  clonedv.appendTo("#dshanghoa");
  clonedv.attr("id", "packing_" + counter);
  clonedv.find("input").each(function () {
    $(this).val("");
  });
  clonedv.find("input.soluong").each(function () {
    $(this).val(1);
  });
  clonedv.find("td.stt").text(counter);

  clonedv.find("input.hsd1").removeClass("hasDatepicker").removeAttr("id");
  clonedv.find("input.hsd").removeClass("hsd1");
  clonedv.find("input.hsd").addClass("hsd" + counter);
  // clonedv.find('span').each(function(){
  //     $(this).text('');
  // });
  // clonedv.find('.bootstrap-select').replaceWith(function() { return $('select', this); });
  // MAjaxListProductQuotes($('.selectlistsp').last());
  // SumPriceWhenChange();
  // refreshstt();

  var focussl1 = clonedv.find(".masku");

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
}

function adddbrows() {
  console.log("eeee");

  var addmorerow = parseInt($("#addmorenumber").val());
  var i;
  if (addmorerow > 0) {
    for (i = 0; i < addmorerow; i++) {
      addonerows();
    }
  } else {
    addonerows();
  }
}

function deleterows(el) {
  var el = $(el);
  var sum = 0;
  $("#dshanghoa tr").each(function () {
    sum += 1;
  });
  if (sum <= 1) {
    alert("Không thể xóa");
  } else {
    $(el).parents("tr").remove();
    counter -= 1;
  }
  // if(counter < 1) {
  //     counter = 1;
  // }
  refreshstt();
  clickChangePrice();
  clickChangeQuantity();
}

function refreshstt() {
  var allstt = counter;
  var newstt = 1;
  $("#dshanghoa tr").each(function () {
    if (newstt <= allstt) {
      $(this).find("td.stt").text(newstt);
      if (newstt == 1) {
        $(this).attr("id", "packing");
      } else {
        $(this).attr("id", "packing_" + newstt);
      }
      newstt += 1;
    }
  });
}
function duplicaterow(el) {
  counter += 1;
  var el = $(el);
  var packingtr = $(el).parents("tr");
  var clonetr = packingtr.clone();
  clonetr.insertAfter(packingtr);
  clonetr.attr("id", "packing_" + counter);
  refreshstt();
  clickChangePrice();
  clickChangeQuantity();
}

$("#searchnhanh").keyup(function () {
  var op = "customer";
  var id_op = $(this).val();
  if (id_op.length >= 3) {
    $.ajax({
      type: "POST",
      url: "/ajax.php",
      data: { op: op, id_op: id_op },
      success: function (data) {
        $("#suggesstion-box").show();
        $("#suggesstion-box").html(data);
      },
    });
  } else {
    $("#suggesstion-box").hide();
  }
});

function copyInfoPro(ob) {
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
        addonerows();
      }
      var j = i + 1;
      var idpacking = "#packing_" + j;
    }
    var tenhang = $("#dshanghoa " + idpacking)
      .find(".tenhang")
      .val();
    if (tenhang == "") {
      copyContent(ob, idpacking);
      break;
    }
  }
  calcuTotalAmount();
}

function copyContent(ob, idpacking = "") {
  var mauso = $(ob).parents("tr").find(".mauso").val();
  var kyhieu = $(ob).parents("tr").find(".kyhieu").val();
  var sochungtu = $(ob).parents("tr").find(".sochungtu").val();
  var madonvi = $(ob).parents("tr").find(".madonvi").val();
  var masku = $(ob).parents("tr").find(".ds_masku").val();
  var mahang = $(ob).parents("tr").find(".ds_mahang").val();
  var tenhang = $(ob).parents("tr").find(".ds_tenhang").val();
  var donvi = $(ob).parents("tr").find(".ds_donvi").val();
  var soluong = $(ob).parents("tr").find(".hidden_soluong").val();
  var dongia = $(ob).parents("tr").find(".hidden_dongia").val();
  var thanhtien = $(ob).parents("tr").find(".hidden_thanhtien").val();
  var makho = $(ob).parents("tr").find(".ds_makho").val();
  var hidden_makho = $(ob).parents("tr").find(".hidden_makho").val();
  var solo = $(ob).parents("tr").find(".ds_solo").val();
  var hsd = $(ob).parents("tr").find(".ds_hsd").val();
  var nhh = $(ob).parents("tr").find(".ds_nhh").val();
  var hidden_nhh = $(ob).parents("tr").find(".hidden_nhh").val();
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

function changeNewProduct() {
  clickChangePrice();
}

function showCompanyNameHover(ob) {
  var nameCompany = $(ob).parents("td").find(".ds_tendonvi").val();
  $(ob).parents("td").find(".companyname-show-box").show();
  $(ob).parents("td").find(".companyname-show-box").html(nameCompany);
}

function hideCompanyNameHover(ob) {
  $(ob).parents("td").find(".companyname-show-box").hide();
}

function showProductNameHover(ob) {
  var nameProduct = $(ob).parents("td").find(".ds_tenhang").val();
  var lenNamePro = nameProduct.length;
  if (lenNamePro >= 29) {
    $(ob).parents("td").find(".productname-show-box").show();
    $(ob).parents("td").find(".productname-show-box").html(nameProduct);
  }
}

function hideProductNameHover(ob) {
  $(ob).parents("td").find(".productname-show-box").hide();
}

function deletePro(ob) {
  var r = confirm(
    "Khi xóa hàng hóa tại đây, tất cả hàng hóa của phiếu nhập sẽ bị xóa hết. Bạn có thực sự muốn xóa hàng hóa này?"
  );
  if (r == true) {
    var id = $(ob).attr("value");
    var op = "inventory_deletepro";
    $.ajax({
      type: "POST",
      url: "/ajax.php",
      dataType: "json",
      data: {
        op: op,
        id: id,
      },
      success: function (data) {
        if (data["inOut"] == 1) {
          if (data["success"] == 1) {
            window.location.href =
              "/admin.php?op=inventory&act=product&mod=output&rcode=3";
          } else {
            window.location.href =
              "/admin.php?op=inventory&act=product&mod=output&ecode=29";
          }
        } else {
          if (data["success"] == 1) {
            window.location.href =
              "/admin.php?op=inventory&act=product&mod=input&rcode=3";
          } else {
            window.location.href =
              "/admin.php?op=inventory&act=product&mod=input&ecode=29";
          }
        }
      },
    });
  } else {
    location.reload();
  }
}

function updateyear(ob, isSilent = false) {
    let op = "inventory_loadyear";
    // Nếu ob là object (thẻ HTML) thì lấy .val(), nếu không thì lấy chính nó
    let year = (typeof ob === 'object') ? $(ob).val() : ob;

    if (!isSilent) sessionStorage.setItem('manual_change', 'true');

    $.ajax({
        type: "post",
        url: "/ajax.php",
        data: { year: year, op: op },
        success: function (success) {
            if (!isSilent) window.location.reload();
        }
    });
}

function updatemonth(value, isSilent = false) {
    var op = "inventory_loadmonth";
    var month = value;
    var newMonth = parseInt(month);

    updateMonthUI(newMonth);

    if (!isSilent) {
        sessionStorage.setItem('manual_change', 'true');
    }
    $.ajax({
        type: "post",
        url: "/ajax.php",
        dataType: "json",
        data: {
            month: month,
            op: op,
        },
        success: function (data) {
          if (isSilent) {
              $('#invoice-list-body').load(window.location.href + ' #invoice-list-body > *', function() {
                  $('#invoice-list-body').css('opacity', '1');
              });
              $('.pagination').load(window.location.href + ' .pagination > *');
          } else {
             window.location.reload();
          }
        },
    });
}
function getCurrentDateTime() {
  const currentYear = parseInt($('#optionyear').val());
  const activeMonthElemnt = $('.itemsmonth.active');
  let currencyMonth = activeMonthElemnt.length ? parseInt(activeMonthElemnt.text().trim()) : 1;
  return { month: currencyMonth, year: currentYear };

}
function updateMonthUI(newMonth) {
  $('.itemsmonth').removeClass('active');
  $('.itemsmonth').filter(function () {
    return $(this).text().trim() === String(newMonth);
  }).addClass('active');
}

function updateDateWithInvoice() {
    const currentDate = $('#show_ngayhoadon');
    const dateVal = currentDate.val();
    const isManual = sessionStorage.getItem('manual_change');

    // Nếu không phải đổi thủ công và ô ngày có dữ liệu
    if (isManual !== 'true' && dateVal && dateVal != "") {
        const parts = dateVal.split('/');
        if (parts.length == 3) {
            const month = parseInt(parts[1]);
            const year = parseInt(parts[2]);
            
            updateMonthUI(month);
            $('#optionyear').val(year);
            
            return { month: month, year: year };
        }
    }
    return null;
}
function limitInvoiceDate() {
    const currentInvoiceDate = $('#show_ngayhoadon');
    if (currentInvoiceDate.length === 0 || !currentInvoiceDate.data('datepicker')) return;

    // 1. Đồng bộ Menu theo hóa đơn
    const invoiceData = updateDateWithInvoice();

    // 2. Lấy dữ liệu Tháng/Năm hiện tại từ Menu (Sau khi đã đồng bộ ở bước 1)
    const { month: selectMonth, year: selectedYear } = getCurrentDateTime();
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
        // Chỉ gọi cập nhật ngầm nếu tháng trên hóa đơn khác với kỳ làm việc hiện tại của Server
        // (Để tránh gửi AJAX thừa thãi)
      updatemonth(invoiceData.month, true);
      updateyear(invoiceData.year, true);
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

            // Nếu ngày không khớp Menu (do bấm đổi tháng thủ công)
            if (inputMonth !== selectMonth || inputYear !== selectedYear) {
                currentInvoiceDate.datepicker('setDate', firstDay);
            }
        }
    }

    // 6. XÓA FLAG CUỐI CÙNG
    sessionStorage.removeItem('manual_change');
}


function updateLineList(ob) {
  var op = "inventory_loadline";
  var line = parseInt($(ob).val());
  var maxvalue = parseInt(document.getElementById("linelist").max);

  if (line > maxvalue || line <= 0) {
    $(".elinelistinventory").addClass("bf");
    $(".elinelistinventory").text(
      "Số dòng không hiển thị vượt quá " + maxvalue + " dòng hoặc nhỏ hơn 0."
    );
    $("#linelist").addClass("err_border");
  } else {
    $(".elinelistinventory").removeClass("bf");
    $(".elinelistinventory").text("");
    $.ajax({
      type: "post",
      url: "/ajax.php",
      dataType: "json",
      data: {
        line: line,
        op: op,
      },
      success: function (data) {
        location.reload();
      },
    });
  }
}

function clickChangeConfigCol() {
  var array_col = [];
  var array_notcol = [];
  $(".items-option")
    .find(".config_col")
    .each(function (i) {
      var checkvalue = $(this.checked);
      if (checkvalue[0]) {
        var value = $(this).val();
        array_col.push(value);
      } else {
        var notvalue = $(this).val();
        array_notcol.push(notvalue);
      }
    });
  var op = "inventory_loadcolum";
  $.ajax({
    type: "POST",
    url: "/ajax.php",
    data: {
      op: op,
      array_col: array_col,
      array_notcol: array_notcol,
    },
    success: function (data) {
      location.reload();
    },
  });
  console.log(array_col);
  console.log(array_notcol);
}

function successLockCycle() {
  var lockmonth = $("#lockmonth").val();
  if (lockmonth != "") {
    var op = "inventory_loadmonth";
    var month = lockmonth;
    $.ajax({
      type: "post",
      url: "/ajax.php",
      dataType: "json",
      data: {
        month: month,
        op: op,
      },
      success: function (data) {
        window.location.href =
          "/admin.php?op=inventory&act=list&mod=synthetic&rcode=34";
      },
    });
  }
}

function calcuTotalBegperiod() {
  var lethanhtien = $("#lethanhtien").val();
  var hiddenTotalAmount = 0;
  var showTotalAmount = 0;

  $(".nhapkhotable .hidden_begthanhtien").each(function () {
    hidden_thanhtien = Number($(this).val());
    hiddenTotalAmount += hidden_thanhtien;
  });

  if (lethanhtien == 0 || lethanhtien == "") {
    var results = Math.round(hiddenTotalAmount);
    var results = results.toString();
  } else {
    var results = hiddenTotalAmount.toString();
  }
  console.log(results);

  var arrayIntoMoney = formatThanhTien(results, 2);
  var moneyShow = arrayIntoMoney[0];
  var moneyHidden = arrayIntoMoney[1];
  $(".total_beg").val(moneyShow);
  $(".hidden_total_beg").attr("value", moneyHidden);
}

function calcuTotalDurInput() {
  var lethanhtien = $("#lethanhtien").val();
  var hiddenTotalAmount = 0;
  var showTotalAmount = 0;

  $(".nhapkhotable .hidden_durinput").each(function () {
    hidden_thanhtien = Number($(this).val());
    hiddenTotalAmount += hidden_thanhtien;
  });

  if (lethanhtien == 0 || lethanhtien == "") {
    var results = Math.round(hiddenTotalAmount);
    var results = results.toString();
  } else {
    var results = hiddenTotalAmount.toString();
  }

  var arrayIntoMoney = formatThanhTien(results, 2);
  var moneyShow = arrayIntoMoney[0];
  var moneyHidden = arrayIntoMoney[1];
  $(".total_durinput").val(moneyShow);
  $(".hidden_total_durinput").attr("value", moneyHidden);
}

function calcuTotalDurInput() {
  var lethanhtien = $("#lethanhtien").val();
  var hiddenTotalAmount = 0;
  var showTotalAmount = 0;

  $(".nhapkhotable .hidden_durinput").each(function () {
    hidden_thanhtien = Number($(this).val());
    hiddenTotalAmount += hidden_thanhtien;
  });

  if (lethanhtien == 0 || lethanhtien == "") {
    var results = Math.round(hiddenTotalAmount);
    var results = results.toString();
  } else {
    var results = hiddenTotalAmount.toString();
  }

  var arrayIntoMoney = formatThanhTien(results, 2);
  var moneyShow = arrayIntoMoney[0];
  var moneyHidden = arrayIntoMoney[1];
  $(".total_durinput").val(moneyShow);
  $(".hidden_total_durinput").attr("value", moneyHidden);
}

function calcuTotalDurOutput() {
  var lethanhtien = $("#lethanhtien").val();
  var hiddenTotalAmount = 0;
  var showTotalAmount = 0;

  $(".nhapkhotable .hidden_duroutput").each(function () {
    hidden_thanhtien = Number($(this).val());
    hiddenTotalAmount += hidden_thanhtien;
  });

  if (lethanhtien == 0 || lethanhtien == "") {
    var results = Math.round(hiddenTotalAmount);
    var results = results.toString();
  } else {
    var results = hiddenTotalAmount.toString();
  }

  var arrayIntoMoney = formatThanhTien(results, 2);
  var moneyShow = arrayIntoMoney[0];
  var moneyHidden = arrayIntoMoney[1];
  $(".total_duroutput").val(moneyShow);
  $(".hidden_total_duroutput").attr("value", moneyHidden);
}

function calcuTotalEndperiod() {
  var lethanhtien = $("#lethanhtien").val();
  var hiddenTotalAmount = 0;
  var showTotalAmount = 0;

  $(".nhapkhotable .hidden_endthanhtien").each(function () {
    hidden_thanhtien = Number($(this).val());
    hiddenTotalAmount += hidden_thanhtien;
  });

  if (lethanhtien == 0 || lethanhtien == "") {
    var results = Math.round(hiddenTotalAmount);
    var results = results.toString();
  } else {
    var results = hiddenTotalAmount.toString();
  }

  var arrayIntoMoney = formatThanhTien(results, 2);
  var moneyShow = arrayIntoMoney[0];
  var moneyHidden = arrayIntoMoney[1];
  $(".total_end").val(moneyShow);
  $(".hidden_total_end").attr("value", moneyHidden);
}

function openpopupWarning() {
  $("#addpopupWarning").modal();
}

function clickShowListSynthetic() {
  $(".content-list-show").addClass("content-hidden");
  var warehousetype = $("#val-warehousetype").val();
  var warehouse = $("#val-warehouse").val();
  var group = $("#val-group").val();
  console.log("group :>> ", group);
  var op = "inventory_showlistsynthetic";
  $.ajax({
    type: "post",
    url: "/ajax.php",
    data: {
      op: op,
      group: group,
      warehouse: warehouse,
      warehousetype: warehousetype,
    },
    success: function (data) {
      $("#content-list-33").show();
      $("#content-list-33").html(data);
      console.log("data :>> ", data);
    },
  });
}

function submitExportSynthetic(ob) {
  $("#case").val(ob);
  $("#f_synthetic_cate").submit();
}

//Check month active lock
function checkYearActiveLock(ob) {
  var year = parseInt($(ob).val());
  var month = parseInt($("#lockmonth").val());
  var sel = document.getElementById("optionyear");
  $("#optionyear").val(year);
  var flag = checkMonthYear(month, year);
  $("#check").val(flag);
}

function checkMonthActiveLock(ob) {
  var month = parseInt($(ob).val());
  var year = parseInt($("#optionyear").val());
  var flag = checkMonthYear(month, year);
  $("#check").val(flag);
}

function checkMonthYear(month, year) {
  var month_active = parseInt($("#pakage_inventory_month").val());
  var year_active = parseInt($("#pakage_inventory_year").val());
  var flag = true;
  if (year < year_active) {
    $(".eemail").addClass("bf");
    $(".eemail").text("Năm được chọn chưa được kích hoạt.");
    $(".year-choose").addClass("err_border");
    $(".month-choose").removeClass("err_border");
    flag = false;
  } else if (month < month_active) {
    $(".eemail").addClass("bf");
    $(".eemail").text("Tháng được chọn chưa được kích hoạt hoặc đã được chốt.");
    $(".month-choose").addClass("err_border");
    flag = false;
  } else {
    $(".eemail").removeClass("bf");
    $(".eemail").text("");
    $(".month-choose").removeClass("err_border");
    $(".year-choose").removeClass("err_border");
  }

  return flag;
}

function showLockmonth(ob) {
  var year = $(ob).val();
  console.log(year);
  var op = "inventory_showlockmonth";
  $.ajax({
    type: "post",
    url: "/ajax.php",
    data: {
      op: op,
      year: year,
    },
    success: function (data) {
      $(".grthang").show();
      $(".grthang").html(data);
      console.log("data :>> ", data);
    },
  });
}

function clickExist_formatnumber(ob) {
  var value = $(ob).val();
  if (value == 1) {
    $(".inven_ledongia1").removeClass("d-none");
    $(".inven_ledongia2").addClass("d-none");
    $(".inven_lesoluong1").removeClass("d-none");
    $(".inven_lesoluong2").addClass("d-none");
  } else {
    $(".inven_ledongia2").removeClass("d-none");
    $(".inven_ledongia1").addClass("d-none");
    $(".inven_lesoluong2").removeClass("d-none");
    $(".inven_lesoluong1").addClass("d-none");
  }
}

// OPEN POPUP
function openpopup() {
  $("#addpopup").modal();
}

function openpopupCus() {
  var mauso = $('input[name="show_mauso"]').val();
  var kyhieu = $('input[name="show_kyhieu"]').val();
  var sohoadon = $('input[name="show_sohoadon"]').val();
  var ngayhoadon = $('input[name="show_ngayhoadon"]').val();
  var ngaythucnhap = $('input[name="show_ngaythucnhap"]').val();
  var nguoigiaohang = $('input[name="show_nguoigiaohang"]').val();
  var nguoinhanhang = $('input[name="show_nguoinhanhang"]').val();
  $('input[name="mauso"]').val(mauso);
  $('input[name="kyhieu"]').val(kyhieu);
  $('input[name="sohoadon"]').val(sohoadon);
  $('input[name="ngayhoadon"]').val(ngayhoadon);
  $('input[name="ngaythucnhap"]').val(ngaythucnhap);
  $('input[name="nguoigiaohang"]').val(nguoigiaohang);
  $('input[name="nguoinhanhang"]').val(nguoinhanhang);
  $("#addpopupCus").modal();
}

function openpopupWareCode() {
  $("#addpopupWareCode").modal();
}

function openpopupProGroup() {
  $("#addpopupProGroup").modal();
}

function openpopupSoLo() {
  $("#addpopupSoLo").modal();
}

// Set time convert
$(document).ready(function () {
  const today = new Date();
  const date = today.getDate();
  const hour =
    today.getHours().toString().length === 2
      ? `${today.getHours()}`
      : `0${today.getHours()}`;
  const minute =
    today.getMinutes().toString().length === 2
      ? `${today.getMinutes()}`
      : `0${today.getMinutes()}`;

  const x = `${hour}:${minute}`;
  console.log(x);
  $("#time_convert").val(x);
});



function getListImportAttached(element) {
  var button = $(element);
  const itemId = button.data('item-id');
  const modal = $('#fileAttached');
  const listContainer = modal.find('#attachedFilesList');
    $.ajax({
      type: "POST",
      url: "/ajax.php",
      dataType: "json",
      data: {
        op: "searchlistinvoice",
        itemId: itemId,
      },
      success: function (response) {
        if(response.success ==1)
        {
           const files = response.listAttached || []; 
           listContainer.empty();
            files.forEach(file => {
                const fileItem = `
                    <li class="list-group-item file-download-item d-flex justify-content-between align-items-center py-2 px-3">
                        <span class="file-info text-truncate mr-auto">
                            <span class="file-name text-dark font-weight-medium">${file.name}</span> 
                        </span>
                        <a href="${file.path}" target="_blank" class="btn btn-sm btn-outline-primary download-btn ml-3" title="Tải xuống tệp tin">
                            <i class="fa fa-download mr-1"></i> Tải xuống
                        </a>
                    </li>
                `;
                listContainer.append(fileItem);
            });
        }
      },
    });
  
}
