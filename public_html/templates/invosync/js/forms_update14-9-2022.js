 _END_ trong tổng số _TOTAL_ mục",
    }
});

var counter = 1;
var ChuSo = new Array(" không", " một", " hai", " ba", " bốn", " năm", " sáu ", " bảy", " tám", " chín");
var Tien = new Array("", " nghìn", " triệu", " tỷ", " nghìn tỷ", " triệu tỷ");

function formatThanhTienInvoice(value = '', check = 1) {
    debugger;
    var lethanhtien = $('#lethanhtien').val();
    console.log(lethanhtien);
    var checkFormat = $('#formatnumber_pxk').val();

    // checkFormat = 1: Format kind of VietNam (Ex: 1.000.000,123)
    // checkFormat = 2: Format kind of National (Ex: 1,000,000.123)
    // check = 1: convert format
    // check = 2: format

    var results = [0, 0];
    var isNegative = false;
    if (value != '') {
        isNegative = value.includes("-");
        value = value.replace("-", ""); // Loại bỏ dấu trừ chỉ để định dạng phần số
    }

    if (value != '') {
        if (check == 1) {
            if (checkFormat == 1) {
                value = value.replace(/[.]/g, '');
                var inputComma = value.includes(","); // Check input has ',' in string- True: Y - False: N
            } else {
                value = value.replace(/[,]/g, '');
                var inputComma = value.includes("."); // Check input has ',' in string- True: Y - False: N
            }
        }

        if (inputComma == true) { // input: 120.600,789

            if (checkFormat == 1) {
                var decimalValue = value.substring(value.lastIndexOf(",") + 1); // 789 (string)
                var decimalValue = decimalValue.replace(/[.]/g, ''); // if input 789.123 -> 789123
                var integerValue = value.slice(0, value.lastIndexOf(","));      // 120.600 (string)
                var fm_intergerValue = parseInt(integerValue.replace(/[,]/g, '')); // 120600 (int)
                var fm_Value = fm_intergerValue + '.' + decimalValue;
            } else {
                var decimalValue = value.substring(value.lastIndexOf(".") + 1); // 789 (string)
                var decimalValue = decimalValue.replace(/[,]/g, ''); // if input 789.123 -> 789123
                var integerValue = value.slice(0, value.lastIndexOf("."));      // 120.600 (string)
                var fm_intergerValue = parseInt(integerValue.replace(/[.]/g, '')); // 120600 (int)
                var fm_Value = fm_intergerValue + '.' + decimalValue;
            }

        } else { // input: 120600.789
            var fm_Value = value;
        }

        if (lethanhtien == 0 || lethanhtien == '') {
            var fm_ValueHidden = Math.round(Number(fm_Value)).toString(); // 120601 (int)
            var decimalValue = 0;
            var integerValue = fm_ValueHidden;
        } else {
            var fm_ValueHidden = parseFloat(Number(fm_Value)).toFixed(lethanhtien); // 120600.79 (float)
            var decimalValue = fm_ValueHidden.substring(fm_ValueHidden.lastIndexOf(".") + 1); // 789 (string)
            var integerValue = fm_ValueHidden.slice(0, fm_ValueHidden.lastIndexOf("."));      // 120600 (string)
        }

        if (checkFormat == 1) {
            var fm_intergerValue = integerValue.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
            var fm_ValueShow = fm_intergerValue + ',' + decimalValue; // 120.000,79
        } else {
            var fm_intergerValue = integerValue.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            var fm_ValueShow = fm_intergerValue + '.' + decimalValue; // 120,000.79
        }

        // if (parseFloat(decimalValue) == 0) { // 120.600,00 => 120.600
        //     var fm_ValueShow = fm_intergerValue;
        // }

        if (isNaN(fm_ValueHidden)) {
            var res_ShowValue = 0;
            var res_HiddenValue = 0;
            var res_results = false;
        } else {
            var res_ShowValue = fm_ValueShow;
            var res_HiddenValue = fm_ValueHidden;
            // Nếu ban đầu là âm VÀ giá trị sau khi định dạng không phải là 0, gán lại dấu trừ
            if (isNegative && parseFloat(res_HiddenValue) !== 0) {
                res_ShowValue = "-" + res_ShowValue;
                res_HiddenValue = "-" + res_HiddenValue;
            }
            var res_results = true;
        }

        results = [res_ShowValue, res_HiddenValue, res_results];

    }
    return results;
}

function formatSoLuongInvoice(value = '', check = 1) {
    var lesoluong = $('#lesoluong').val();
    var checkFormat = $('#formatnumber_pxk').val();
    console.log(checkFormat);
    // checkFormat = 1: Format kind of VietNam (Ex: 1.000.000,123)
    // checkFormat = 2: Format kind of National (Ex: 1,000,000.123)
    // check = 1: convert format
    // check = 2: format

    var results = [0, 0];

    if (value != '') {
        if (check == 1) {
            if (checkFormat == 1) {
                value = value.replace(/[.]/g, '');
                var inputComma = value.includes(","); // Check input has ',' in string- True: Y - False: N
            } else {
                value = value.replace(/[,]/g, '');
                var inputComma = value.includes("."); // Check input has ',' in string- True: Y - False: N
            }
        }

        if (inputComma == true) { // input: 120.600,789

            if (checkFormat == 1) {
                var decimalValue = value.substring(value.lastIndexOf(",") + 1); // 789 (string)
                var decimalValue = decimalValue.replace(/[.]/g, ''); // if input 789.123 -> 789123
                var integerValue = value.slice(0, value.lastIndexOf(","));      // 120.600 (string)
                var fm_intergerValue = parseInt(integerValue.replace(/[,]/g, '')); // 120600 (int)
                var fm_Value = fm_intergerValue + '.' + decimalValue;
            } else {
                var decimalValue = value.substring(value.lastIndexOf(".") + 1); // 789 (string)
                var decimalValue = decimalValue.replace(/[,]/g, ''); // if input 789.123 -> 789123
                var integerValue = value.slice(0, value.lastIndexOf("."));      // 120.600 (string)
                var fm_intergerValue = parseInt(integerValue.replace(/[.]/g, '')); // 120600 (int)
                var fm_Value = fm_intergerValue + '.' + decimalValue;
            }

        } else { // input: 120600.789
            var fm_Value = value;
        }

        if (lesoluong == 0) {
            var fm_ValueHidden = Math.round(Number(fm_Value)).toString(); // 120601 (int)
            var decimalValue = 0;
            var integerValue = fm_ValueHidden;
        } else {
            var fm_ValueHidden = parseFloat(Number(fm_Value)).toFixed(lesoluong); // 120600.79 (float)
            var decimalValue = fm_ValueHidden.substring(fm_ValueHidden.lastIndexOf(".") + 1); // 789 (string)
            var integerValue = fm_ValueHidden.slice(0, fm_ValueHidden.lastIndexOf("."));      // 120600 (string)
        }



        if (checkFormat == 1) {
            var fm_intergerValue = integerValue.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
            var fm_ValueShow = fm_intergerValue + ',' + decimalValue; // 120.000,79
            console.log(fm_ValueShow);
        } else {
            var fm_intergerValue = integerValue.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            var fm_ValueShow = fm_intergerValue + '.' + decimalValue; // 120,000.79
            console.log(fm_ValueShow);
        }

        // if(parseFloat(decimalValue) == 0){ // 120.600,00 => 120.600
        //     var fm_ValueShow =  fm_intergerValue;
        //   }

        if (isNaN(fm_ValueHidden)) {
            var res_ShowValue = 0;
            var res_HiddenValue = 0;
            var res_results = false;
        } else {
            var res_ShowValue = fm_ValueShow;
            var res_HiddenValue = fm_ValueHidden;
            var res_results = true;
        }

        results = [res_ShowValue, res_HiddenValue, res_results];
    }

    return results;
}

function formatDonGiaInvoice(value = '', check = 1) {
    var formhd = $('#formhd').val();
    if (formhd == 4 || formhd == 8 || formhd == 11 || formhd == 13 || formhd == 14) {
        var ledongia = $('#ledongia').val();
    } else {
        var ledongia = $('#ledongia').val();
    }

    var checkFormat = $('#formatnumber_pxk').val();

    // checkFormat = 1: Format kind of VietNam (Ex: 1.000.000,123)
    // checkFormat = 2: Format kind of National (Ex: 1,000,000.123)
    // check = 1: convert format
    // check = 2: format

    var results = [0, 0];

    if (value != '') {
        if (check == 1) {
            if (checkFormat == 1) {
                value = value.replace(/[.]/g, '');
                var inputComma = value.includes(","); // Check input has ',' in string- True: Y - False: N
            } else {
                value = value.replace(/[,]/g, '');
                var inputComma = value.includes("."); // Check input has ',' in string- True: Y - False: N
            }
        }

        if (inputComma == true) { // input: 120.600,789

            if (checkFormat == 1) {
                var decimalValue = value.substring(value.lastIndexOf(",") + 1); // 789 (string)
                var decimalValue = decimalValue.replace(/[.]/g, ''); // if input 789.123 -> 789123
                var integerValue = value.slice(0, value.lastIndexOf(","));      // 120.600 (string)
                var fm_intergerValue = parseInt(integerValue.replace(/[,]/g, '')); // 120600 (int)
                var fm_Value = fm_intergerValue + '.' + decimalValue;
            } else {
                var decimalValue = value.substring(value.lastIndexOf(".") + 1); // 789 (string)
                var decimalValue = decimalValue.replace(/[,]/g, ''); // if input 789.123 -> 789123
                var integerValue = value.slice(0, value.lastIndexOf("."));      // 120.600 (string)
                var fm_intergerValue = parseInt(integerValue.replace(/[.]/g, '')); // 120600 (int)
                var fm_Value = fm_intergerValue + '.' + decimalValue;
            }

        } else { // input: 120600.789
            var fm_Value = value;
        }


        if (ledongia == 0) {
            var fm_ValueHidden = Math.round(Number(fm_Value)).toString(); // 120601 (int)
            var decimalValue = 0;
            var integerValue = fm_ValueHidden;
        } else {
            var fm_ValueHidden = parseFloat(Number(fm_Value)).toFixed(ledongia); // 120600.79 (float)
            var decimalValue = fm_ValueHidden.substring(fm_ValueHidden.lastIndexOf(".") + 1); // 789 (string)
            var integerValue = fm_ValueHidden.slice(0, fm_ValueHidden.lastIndexOf("."));      // 120600 (string)
        }

        if (checkFormat == 1) {
            var fm_intergerValue = integerValue.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
            var fm_ValueShow = fm_intergerValue + ',' + decimalValue; // 120.000,79
            // console.log(fm_ValueShow);
        } else {
            var fm_intergerValue = integerValue.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            var fm_ValueShow = fm_intergerValue + '.' + decimalValue; // 120,000.79
            // console.log(fm_ValueShow);
        }

        // if(parseFloat(decimalValue) == 0){ // 120.600,00 => 120.600
        //     var fm_ValueShow =  fm_intergerValue;
        //   }

        if (isNaN(fm_ValueHidden)) {
            var res_ShowValue = 0;
            var res_HiddenValue = 0;
            var res_results = false;
        } else {
            var res_ShowValue = fm_ValueShow;
            var res_HiddenValue = fm_ValueHidden;
            var res_results = true;
        }
        // console.log('aaaaaaaaa',fm_ValueShow,fm_ValueHidden,res_ShowValue,res_HiddenValue,res_results);

        results = [res_ShowValue, res_HiddenValue, res_results];

    }

    return results;
}

function addproductplus() {
    // console.log('addproductplus');
    counter += 1;
    var packingdv = $('#packing');
    var clonedv = packingdv.clone();
    var VatDefault = $('#VatDefault').val();
    clonedv.appendTo('#dshanghoa');
    clonedv.attr('id', 'packing_' + counter);
    clonedv.find('input').each(function () {
        $(this).val('');
    });
    clonedv.find('input.checkck2').each(function () {
        $(this).val(1);
    });
    clonedv.find('input.checkck').each(function () {
        $(this).prop('checked', false);
    });
    clonedv.find('input.checkkm2').each(function () {
        $(this).val(1);
    });
    clonedv.find('input.checkkm').each(function () {
        $(this).prop('checked', false);
    });
    clonedv.find('input.sl1').each(function () {
        $(this).val(formatSoLuongInvoice('1')[0]);
    });
    clonedv.find('input.sl2').each(function () {
        $(this).val(formatSoLuongInvoice('1')[1]);
    });
    if (VatDefault) {
        console.log(VatDefault);
        clonedv.find('select.vat1').each(function () {
            // $(this).removeAttr('value');
            // console.log(VatDefault);
            $(this).val(VatDefault);
        });
        clonedv.find('input.vat2').each(function () {
            // $(this).removeAttr('value');
            // console.log(VatDefault);
            $(this).val(VatDefault);
            $(this).attr('value', VatDefault);
        });
    }


    var focussl1 = clonedv.find('.maskuformiv');

    focussl1
        .putCursorAtEnd() // should be chainable
        .on("focus", function () { // could be on any event
            focussl1.putCursorAtEnd()
        });

    clonedv.find('td.re_stt').text(counter);
    var price = calcuPriceVatInvoice(this);
    rePlacePosition();
}

function sumdv(parent = 0, totalAmount) {
    var ob = $('.sumdv');
    var valuedvinput = $(ob).val();
    var sothapphan = $('#sothapphan').val();


    if (isNaN(valuedvinput)) {
        $('.eror_dichvu').addClass("bf");
        $(".eror_dichvu").text("Phải nhập bằng số");
    } else {
        $('.eror_dichvu').removeClass("bf");
        $(".eror_dichvu").text("");
    }


    var formhd = $('#formhd').val();
    if (!totalAmount) {
        var totalAmount = $('#tongtienhoadonhid').val();
        if (!totalAmount) {
            var totalAmount = calcuTotalAmountInvoice(1);
        }
    }
    var moneyDVShow = 0;
    var moneyDVHidden = 0;
    if (!totalAmount) {
        totalAmount = 0;
    }
    var percentDV = $(ob).val();
    if (!percentDV) {
        percentDV = 0;
    }
    percentDV = formatThanhTienInvoice(String(percentDV))[1];
    var moneyDV = Number(totalAmount) * Number(percentDV) / 100;
    var arrayMoneyDV = formatThanhTienInvoice(String(moneyDV), 2);
    var moneyDVShow = arrayMoneyDV[0];
    var moneyDVHidden = arrayMoneyDV[1];
    $('#tienphidv').val(moneyDVShow);
    $('#tienphidv').attr('value', moneyDVShow);
    $('#tienphidv2').val(moneyDVHidden);
    $('#tienphidv2').attr('value', moneyDVHidden);
    $('.sumdv').val(percentDV);
    $('.sumdv').attr('value', percentDV);
    if (parent == 0) {
        var totalVat = calcuTotalVatInvoice();
        var TotalPayment = calcuTotalPaymentInvoice();
        writeMoneyInvoiceOLD(TotalPayment);
    }

    // console.log('aaaaaaaa',moneyDV,totalAmount,percentDV,arrayMoneyDV);
    return moneyDVHidden;
}

function deleterow(el) {
    var el = $(el);
    var sum = 0;
    $("#dshanghoa tr").each(function () {
        sum += 1;
    });
    if (sum <= 1) {
        alert("Không thể xóa");
    } else {
        $(el).parents('tr').remove();
        counter -= 1;
    }
    var totalAmount = calcuTotalAmountInvoice();
    var totalVat = calcuTotalVatInvoice();
    var TotalPayment = calcuTotalPaymentInvoice();
    writeMoneyInvoiceOLD(TotalPayment);
    rePlacePosition();
    // console.log(totalAmount,totalVat,TotalPayment);
    rePlacePosition();
}

function checkkm(km) {
    var km = km;
    if (km.checked) {
        $(km).parent().parent().find("input.checkkm2").val(2);
    } else {
        $(km).parent().parent().find("input.checkkm2").val(1);
    }
}

function checkck(ob) {
    if (ob.checked) {
        $(ob).parents('tr').find("input.thanhtien1").removeClass("chietkhau1");
        $(ob).parents('tr').find("input.thanhtien1").addClass("chietkhau2");
        $(ob).parents('tr').find("input.checkck2").val(2);
    } else {
        $(ob).parents('tr').find("input.thanhtien1").removeClass("chietkhau2");
        $(ob).parents('tr').find("input.thanhtien1").addClass("chietkhau1");
        $(ob).parents('tr').find("input.checkck2").val(1);
    }

    if (formhd != 1) {
        var totalAmount = calcuTotalAmountInvoice();
        var totalVal = calcuTotalVatInvoice();
    }
    var TotalPayment = calcuTotalPaymentInvoice();
    writeMoneyInvoiceOLD(TotalPayment);
    // console.log(priceInto,priceVat,totalAmount,totalVal,TotalPayment);
}

// tính ngược đơn giá với đơn giá có giá trị gia tăng
function calcuPriceInvoice(ob) {
    var showPrice = 0;
    var hiddenPrice = 0;
    var hiddenPriceVat = $(ob).parents('tr').find('.giavat4').val();
    var vat = $('#tong_thuevat').val();
    if (vat == "Không chịu thuế" || vat == "\\") {
        var vat = 0;
    }

    var price = Number(hiddenPriceVat) / (100 + Number(vat)) * 100;
    var arrayPrice = formatDonGiaInvoice(String(price), 2);
    showPrice = arrayPrice[0];
    hiddenPrice = arrayPrice[1];
    $(ob).parents('tr').find('.price1').val(showPrice);
    $(ob).parents('tr').find('.price2').val(hiddenPrice);
    return hiddenPrice;
}

function calcuPriceFromIntoMoneyInvoice(ob) {
    var formhd = $('#formhd').val();
    var showPrice = 0;
    var hiddenPrice = 0;
    var soluong = formatSoLuongInvoice($(ob).parents('tr').find('.sl1').val())[1];
    var intomoney = $(ob).parents('tr').find('.thanhtien2').val();
    if (Number(soluong) === 0 || Number(soluong) == null) {
        var price = 0;
    } else {
        if (formhd == 1) {
            var vat = $(ob).parents('tr').find('.vat1').val();
            if (vat == "Không chịu thuế" || vat == "\\" || vat == "" || vat == "/") {
                var vat = 0;
            }
            var price = Number(intomoney) / Number(soluong) / (Number(vat) + 100) * 100;
        } else {
            var vat = $('#tong_thuevat').val();
            if (vat == "Không chịu thuế" || vat == "\\" || vat == "" || vat == "/") {
                var vat = 0;
            }
            var price = Number(intomoney) / Number(soluong);
        }
    }
    // console.log(price,intomoney,soluong,vat);
    var valuePrice = $(ob).parents('tr').find('.price1').val();
    if (valuePrice == "" || valuePrice == 0) {
        var arrayPrice = formatDonGiaInvoice(String(price), 2);
        showPrice = arrayPrice[0] ? arrayPrice[0] : '';
        hiddenPrice = arrayPrice[1] ? arrayPrice[1] : '';
        $(ob).parents('tr').find('.price1').val(showPrice);
        $(ob).parents('tr').find('.price2').val(hiddenPrice);
        if (formhd == 1) {
            var pricevat = calcuThueGTGTInvoice(ob);
        }
    }
    return hiddenPrice;

}

function calcuPriceVatInvoice(ob) {
    var vat = $("#tong_thuevat").val();
    if (vat == "Không chịu thuế" || vat == "\\") {
        var vat = 0;
    }
    var priceHidden = Number($(ob).parents('tr').find('.price2 ').val());

    // console.log('aaaaaaaaaaaa',priceHidden,vat);
    var priceVatShow = Number(priceHidden) + Number(priceHidden) * Number(vat) / 100;
    var arrayPriceVat = formatDonGiaInvoice(String(priceVatShow), 2);
    var priceVatShow = arrayPriceVat[0] ? arrayPriceVat[0] : '';
    var priceVatHidden = arrayPriceVat[1] ? arrayPriceVat[1] : '';

    $(ob).parents('tr').find(".giavat3").val(priceVatShow);
    $(ob).parents('tr').find(".giavat3").attr('value', priceVatShow);
    $(ob).parents('tr').find(".giavat4").val(priceVatHidden);
    $(ob).parents('tr').find(".giavat4").attr('value', priceVatHidden);

    return priceVatHidden;
}

function calcuThueGTGTInvoice(ob) {
    var thueGTGTShow = 0;
    var thueGTGTHidden = 0;
    var vat = $(ob).parents('tr').find(".vat1").val();
    if (vat == "Không chịu thuế" || vat == "\\" || vat == "") {
        var vat = 0;
    }
    var priceHidden = $(ob).parents('tr').find('.price2').val();
    var soluong = formatSoLuongInvoice($(ob).parents('tr').find('.sl1').val())[1];
    if (!soluong) {
        var soluong = 1;
    }
    // console.log('aaaaaaaaaaaa',priceHidden,vat);
    var thueGTGTShow = Math.round(Number(soluong) * Number(priceHidden) * Number(vat) / 100);

    var arrayThueGTGT = formatDonGiaInvoice(String(thueGTGTShow), 2);
    var thueGTGTShow = arrayThueGTGT[0];
    var thueGTGTHidden = arrayThueGTGT[1];
    $(ob).parents('tr').find(".thueGTGT").val(thueGTGTShow);
    $(ob).parents('tr').find(".thueGTGT2").attr('value', thueGTGTHidden);
    // console.log('aaa',vat,priceHidden,soluong,thueGTGTShow,thueGTGTShow,thueGTGTHidden);

    return thueGTGTHidden;
}

function calcuIntoMoneyInvoice(ob) {
    var formhd = $('#formhd').val(); // 26
    var amountGTGTShow = 0;
    var amountGTGTHidden = 0;

    /* Commented by Mai Minh 2022/05/31 10:10PM - Dao nguoc dieu kien lai
        if (formhd == 0 || formhd == 2 || formhd == 12 || formhd == 10 || formhd == 9 || formhd == 3 || formhd == 4 || formhd == 11 || formhd == 13 || formhd == 14 || formhd == 8 || formhd == 5 || formhd == 6 || formhd == 7 || formhd == 15 || formhd == 22) {
            var quantity = formatSoLuongInvoice($(ob).parents('#dshanghoa tr').find(".sl1").val())[1];
            if (quantity == '') {
                quantity = "1";
            }
            var price = $(ob).parents('#dshanghoa tr').find(".price2").val();
            if (price == '') {
                price = "0";
            }
            var intoMoney = Math.round(Number(quantity) * Number(price));
        } else {
            if (formhd == 1) {
                var vat = $(ob).parents('tr').find('.vat1').val();
                if (vat == "Không chịu thuế" || vat == "\\" || vat == "" || isNaN(vat) == true || vat == "/") {
                    var vat = 0;
                }
                var priceHidden = $(ob).parents('tr').find('.price2').val();
                var soluong = formatSoLuongInvoice($(ob).parents('tr').find('.sl1').val())[1];
                if (!soluong) {
                    var soluong = 1;
                }
                var intoMoney = Math.round(Number(soluong) * Number(priceHidden) + Math.round(Number(soluong) * (Number(priceHidden) * Number(vat) / 100)));
            }
        }
    End Mai Minh's comment */

    // Code mới, đảo ngược điều kiện lại để mốt có form hóa đơn mới thì vẫn tính tiền
    if (formhd == 1 || formhd == 19 || formhd == 23 || formhd == 16 || formhd == 32 || formhd == 36) {
        var vat = $(ob).parents('tr').find('.vat1').val();
        if (vat == "Không chịu thuế" || vat == "\\" || vat == "" || isNaN(vat) == true || vat == "/") {
            var vat = 0;
        }
        var priceHidden = $(ob).parents('tr').find('.price2').val();
        var soluong = formatSoLuongInvoice($(ob).parents('tr').find('.sl1').val())[1];
        if (!soluong) {
            var soluong = 1;
        }
        var intoMoney = Math.round(Number(soluong) * Number(priceHidden) + Math.round(Number(soluong) * (Number(priceHidden) * Number(vat) / 100)));
    } else {
        var quantity = formatSoLuongInvoice($(ob).parents('#dshanghoa tr').find(".sl1").val())[1];
        if (quantity == '') {
            quantity = "1";
        }
        var price = $(ob).parents('#dshanghoa tr').find(".price2").val();
        if (price == '') {
            price = "0";
        }
        var intoMoney = Math.round(Number(quantity) * Number(price));
    }
    // End code mới     

    var arrayIntoMoney = formatThanhTienInvoice(String(intoMoney), 2);
    var moneyShow = arrayIntoMoney[0];
    var moneyHidden = arrayIntoMoney[1];
    $(ob).parents('#dshanghoa tr').find(".thanhtien1").val(moneyShow);
    $(ob).parents('#dshanghoa tr').find(".thanhtien1").attr('value', moneyShow);
    $(ob).parents('#dshanghoa tr').find(".thanhtien2").val(moneyHidden);
    $(ob).parents('#dshanghoa tr').find(".thanhtien2").attr('value', moneyHidden);
    console.log(moneyHidden);
    return moneyHidden;
}

function calcuTotalAmountInvoice(parent = 0) {
    var formhd = $('#formhd').val();
    var lethanhtien = $('#lethanhtien').val();
    var hiddenTotalAmount = 0;
    var showTotalAmount = 0;

    var key = 0;
    $('.thanhtien2').each(function () {
        key = key + 1;
    });
    console.log(key);

    $('.thanhtien2').each(function () {
        if (formhd == 4 || formhd == 8 || formhd == 11 || formhd == 13 || formhd == 14) {
            var checkck = false;
            var checkkm = false;
        }
        var checkck = $(this).parents('tr').find('.checkck').prop("checked");
        var checkkm = $(this).parents('tr').find('.checkkm').prop("checked");


        if (checkck == true && checkkm == true) {
            hidden_thanhtien = 0;
        } else if (checkck == true && checkkm == false) {
            if (key == 1) {
                console.log('12312312312');
                hidden_thanhtien = Number($(this).val());
            } else {
                console.log('7897978989');
                hidden_thanhtien = 0 - Number($(this).val());
            }
        } else if (checkck == false && checkkm == true) {
            hidden_thanhtien = Number($(this).val());
        } else {
            hidden_thanhtien = Number($(this).val());
        }
        hiddenTotalAmount += hidden_thanhtien;

    });

    if (lethanhtien == 0) {
        var results = Math.round(hiddenTotalAmount);
        var results = results.toString();

    } else {
        var results = hiddenTotalAmount.toString();
        console.log(results);
    }

    var arrayTotalAmount = formatThanhTienInvoice(results, 2);
    var showTotalAmount = arrayTotalAmount[0] ? arrayTotalAmount[0] : '';
    var hiddenTotalAmount = arrayTotalAmount[1] ? arrayTotalAmount[1] : '';

    if (parent == 0) {
        $("#tongtienhoadon").val(showTotalAmount);
        $("#tongtienhoadonhid").attr('value', hiddenTotalAmount);
        if (formhd != 4 && formhd != 8 && formhd != 11 && formhd != 13) {
            var moneyDV = sumdv(1, hiddenTotalAmount);
        }
    }
    // console.log('calcuTotalAmountInvoice',arrayTotalAmount)

    return hiddenTotalAmount;
}

function calcuTotalVatInvoice() {
    var hiddenTotalVat = 0;
    var showTotalVat = 0;

    var moneyDV = $("#tienphidv2").val();
    if (!moneyDV || isNaN(moneyDV) == true) {
        moneyDV = 0;
    }

    var totalMoney = $("#tongtienhoadonhid").val();
    var vat = $("#tong_thuevat").val();
    if (vat == "Không chịu thuế" || vat == "\\" || vat == "/") {
        var vat = 0;
    }
    results = Math.round((Number(totalMoney) + Number(moneyDV)) * Number(vat) / 100);
    var arrayTotalVat = formatThanhTienInvoice(String(results), 2);
    var showTotalVat = arrayTotalVat[0] ? arrayTotalVat[0] : '';
    var hiddenTotalVat = arrayTotalVat[1] ? arrayTotalVat[1] : '';

    $("#tongtienthue").val(showTotalVat);
    $("#tongtienthuehid").attr('value', hiddenTotalVat);
    return hiddenTotalVat;
}

function calcuTotalPaymentInvoice() {
    var hiddenTotalPayment = 0;
    var showTotalPayment = 0;

    var moneyDV = $("#tienphidv2").val();
    if (!moneyDV || isNaN(moneyDV) == true) {
        moneyDV = 0;
    }

    var totalMoney = $("#tongtienhoadonhid").val();
    if (!totalMoney || isNaN(totalMoney) == true) {
        totalMoney = calcuTotalAmountInvoice();
        console.log(totalMoney);
        if (!totalMoney || isNaN(totalMoney) == true) {
            totalMoney = 0;
        }
    }
    var totalVat = $("#tongtienthuehid").val();
    if (!totalVat || isNaN(totalMoney) == true) {
        totalVat = 0;
    }

    results = Number(totalMoney) + Number(totalVat) + Number(moneyDV);
    console.log(results)
    var arrayTotalPayment = formatThanhTienInvoice(String(results), 2);
    var showTotalPayment = arrayTotalPayment[0] ? arrayTotalPayment[0] : '';
    var hiddenTotalPayment = arrayTotalPayment[1] ? arrayTotalPayment[1] : '';

    $("#tongcongprice").val(showTotalPayment);
    $("#tongcongprice1").attr('value', hiddenTotalPayment);
    console.log(hiddenTotalPayment);
    // console.log(results,totalMoney,totalVat,moneyDV,arrayTotalPayment);
    return hiddenTotalPayment;
}

function writeMoneyInvoiceOLD(TotalPayment) {
    var bangchu = DocTienBangChuInvoice(TotalPayment);
    $('#bangchu').val(bangchu);
    $('#bangchu').attr('value', bangchu);
    $('#bangchu2').val(bangchu);
    $('#bangchu2').attr('value', bangchu);
    // console.log(TotalPayment,bangchu);
}


// edit form change quantity
function changesl(ob) {
    var formhd = $('#formhd').val();
    var sothapphan = $('#sothapphan').val();
    var lesoluong = $('#lesoluong').val();

    var valueinput = $(ob).val();
    var arrayQuantity = formatSoLuongInvoice(valueinput);
    if (arrayQuantity[2] == false) {
        $(ob).parent().find(".showerr").css("display", "flex");
        $(ob).parent().find("p.minss").text("Phải nhập bằng số");
        $(ob).val("");
    } else {
        $(ob).parent().find(".showerr").css("display", "none");
    }

    var quantityShow = arrayQuantity[0];
    var quantityHidden = arrayQuantity[1];
    $(ob).parents('tr').find(".sl1").val(quantityShow);
    $(ob).parents('tr').find(".sl1").attr('value', quantityShow);

    $(ob).parents('tr').find(".sl2").val(quantityHidden);
    $(ob).parents('tr').find(".sl2").attr('value', quantityHidden);

    if (formhd == 1) {
        var pricevat = calcuThueGTGTInvoice(ob);
    }
    var intoMoney = calcuIntoMoneyInvoice(ob);
    var totalAmount = calcuTotalAmountInvoice();
    var totalVat = calcuTotalVatInvoice();
    var TotalPayment = calcuTotalPaymentInvoice();
    writeMoneyInvoiceOLD(TotalPayment);
    // console.log(intoMoney,totalAmount,totalVat,TotalPayment);
}

function onchangPrice(ob) {
    var formhd = $('#formhd').val();
    var valueinput = $(ob).val();
    var arrayPrice = formatDonGiaInvoice(valueinput);
    if (arrayPrice[2] == false) {
        $(ob).parent().find(".showerr").css("display", "flex");
        $(ob).parent().find("p.minss").text("Phải nhập bằng số");
        $(ob).val("");
    } else {
        $(ob).parent().find(".showerr").css("display", "none");
    }
    var priceShow = arrayPrice[0];
    var priceHidden = arrayPrice[1];
    $(ob).parents('tr').find(".price1").val(priceShow);
    $(ob).parents('tr').find(".price1").attr('value', priceShow);
    $(ob).parents('tr').find(".price2").val(priceHidden);
    $(ob).parents('tr').find(".price2").attr('value', priceHidden);

    var intoMoney = calcuIntoMoneyInvoice(ob);
    if (formhd == 1) {
        var pricevat = calcuThueGTGTInvoice(ob);
    } else {
        if (formhd != 3) {
            var priceVat = calcuPriceVatInvoice(ob);
            var totalAmount = calcuTotalAmountInvoice();
            var totalVat = calcuTotalVatInvoice();
        }
    }
    var TotalPayment = calcuTotalPaymentInvoice();
    writeMoneyInvoiceOLD(TotalPayment);

}

//Khi thay đổi thành tiền thì chỉ cộng các số thành tiền lại với nhau
function onchangeSumThanhTien(ob) {
    debugger;
    var formhd = $('#formhd').val();
    // var valueinput = $(ob).val().replace("-", "");
    var valueinput = $(ob).val();

    console.log(valueinput);
    var arrayIntoMoney = formatThanhTienInvoice(valueinput);
    if (arrayIntoMoney[2] == false) {
        $(ob).parent().find(".showerr").css("display", "flex");
        $(ob).parent().find("p.minss").text("Phải nhập bằng số");
        $(ob).val("");
    } else {
        $(ob).parent().find(".showerr").css("display", "none");
    }

    var intoMoneyShow = arrayIntoMoney[0] ? arrayIntoMoney[0] : '';
    var intoMoneyHidden = arrayIntoMoney[1] ? arrayIntoMoney[1] : '';

    $(ob).parents('tr').find(".thanhtien1").val(intoMoneyShow);
    $(ob).parents('tr').find(".thanhtien2").attr('value', intoMoneyHidden);

    if (formhd == 1) {
        // var priceInto = calcuPriceFromIntoMoneyInvoice(ob);
    } else {
        var price = calcuPriceFromIntoMoneyInvoice(ob);
        var totalAmount = calcuTotalAmountInvoice();
        var priceVat = calcuPriceVatInvoice(ob);
        var totalVal = calcuTotalVatInvoice();
    }
    var TotalPayment = calcuTotalPaymentInvoice();
    writeMoneyInvoiceOLD(TotalPayment);
    // console.log(priceInto,priceVat,totalAmount,totalVal,TotalPayment);
}

function onchangVAT(ob) {
    var gtgt1 = $(ob).val();
    if (gtgt1 == -1) {
        var gtgt = '\\';
    } else {
        var gtgt = gtgt1;
    }
    $(ob).parents("tr").find(".vat1").val(gtgt);
    $(ob).parents("tr").find(".vat1").attr("value", gtgt);
    $(ob).parents("tr").find(".vat2").val(gtgt);
    $(ob).parents("tr").find(".vat2").attr("value", gtgt1);

    var thueGTGT = calcuThueGTGTInvoice(ob);
    var intoMoney = calcuIntoMoneyInvoice(ob);
    var TotalPayment = calcuTotalPaymentInvoice();
    writeMoneyInvoiceOLD(TotalPayment);
}

function onchangVATForm2(tr) {
    $('.thanhtien1').each(function () {
        var priceVat = calcuPriceVatInvoice(this);
    });
    var totalVat = calcuTotalVatInvoice();
    var TotalPayment = calcuTotalPaymentInvoice();
    writeMoneyInvoiceOLD(TotalPayment);

    // console.log("3893");
    // var valueselect = $(tr).val();
    // var sothapphan = $('#sothapphan').val();
    // if (isNaN(valueselect)) {
    //     var valueselect = 0;
    // }

    // var tiendv = $("#tienphidv2").val();
    // if (tiendv == '') {
    //     tiendv = 0;
    // }

    // var giatri_chietkhau = 0;
    // $('.checkck2').each(function() {
    //     var chietkhau = $(this).val();
    //     if (chietkhau == 2) {
    //         giatri_chietkhau += Number($(this).parents('tr').find('.thanhtien2').val());
    //     }
    // });

    // var tongtienhoadon = $("#tongtienhoadonhid").val();
    // var tongtienhoadon_cantinhthue = Number(tongtienhoadon) + Number(tiendv) - Number(giatri_chietkhau);

    // var tongtienthue = Math.round((Number(tongtienhoadon_cantinhthue) * Number(valueselect)) / 100);
    // var tongtienthanhtoan = Number(tongtienhoadon_cantinhthue) + Number(tongtienthue);


    // $("input#tongtienthue").val(tongtienthue.toString().replace(/\B(?=(\d{3})+(?!\d))/g, "."));
    // $("input#tongtienthuehid").val(tongtienthue);

    // tinh_TongCongTienThanhToan();  
    // changeVATPercent();

}

function onchangeVAT(ob) {
    var valueTotalVat = formatThanhTienInvoice($(ob).val())[1];
    var hiddenTotalVat = 0;
    var showTotalVat = 0;

    var totalVat = calcuTotalVatInvoice();
    // console.log(valueTotalVat,totalVat);
    if (Math.abs(valueTotalVat - totalVat) > 1) {
        $('.ebiendovat').addClass("bf");
        $('.ebiendovat').text("Biên độ tiền thuế VAT không chênh lệch quá 1");
    } else {
        $('.ebiendovat').removeClass("bf");
        $('.ebiendovat').text("");
        var arrayTotalVat = formatThanhTienInvoice(String(valueTotalVat), 2);
        var showTotalVat = arrayTotalVat[0];
        var hiddenTotalVat = arrayTotalVat[1];
        $("#tongtienthue").val(showTotalVat);
        $("#tongtienthue").attr('value', showTotalVat);
        $("#tongtienthuehid").val(hiddenTotalVat);
        $("#tongtienthuehid").attr('value', hiddenTotalVat);
        var TotalPayment = calcuTotalPaymentInvoice();
        writeMoneyInvoiceOLD(TotalPayment);
    }



    // var valueinput = $(ob).val();

    // var tongtiensanpham = $("#tongtienhoadonhid").val(); //2545456
    // var tienthuebandau = $("#tongtienthuehid").val(); //254546
    // var tongtienthanhtoan = $("#tongcongprice1").val(); //2800002


    // $(ob).change(function() {

    //     var giatrinhapvao = $(ob).val(); //254.545

    //     $(ob).parent().css("position", "relative");

    //     var chuoiss = giatrinhapvao.replace(/[.]/g, ''); //254545

    //     var biendolech = Number(tienthuebandau) - Number(chuoiss);
    //     if (biendolech == 1 || biendolech == 0 || biendolech == -1) {
    //         tongtienthanhtoan = Number(tongtiensanpham) + Number(chuoiss);
    //         var tienthuesaukhisua = Number(chuoiss);
    //         console.log(tienthuesaukhisua);
    //         var docsotien = DocTienBangChu(tongtienthanhtoan);
    //         $('input#tongcongprice1').attr("value", tongtienthanhtoan);
    //         $("input#tongcongprice").val(tongtienthanhtoan.toString().replace(/\B(?=(\d{3})+(?!\d))/g, "."));
    //         $("input#tongtienthuehid").val(tienthuesaukhisua);
    //         $('input[name="bangchu2"]').attr("value", docsotien);
    //         $('input[name="bangchu"]').val(docsotien);

    //     } else {
    //         $('.ebiendovat').addClass("bf");
    //         $('.ebiendovat').text("Biên độ tiền thuế VAT không chênh lệch quá 1");
    //     }

    // })

}

function clickproduct(nv) {
    var lesoluong = $('#lesoluong').val();
    var formhd = $('#formhd').val();
    if (formhd == 4 || formhd == 8 || formhd == 11 || formhd == 13 || formhd == 14) {
        var ledongia = $('#ledongia').val();
    } else {
        var ledongia = $('#sothapphan').val();
    }

    var formhd = $('#formhd').val();
    var nv = nv;
    var parentsp = $(nv).parents('tr');
    var id_sp = $(nv).data('id');
    var idform = $('#formhd').val();


    var op = "inforproduct";
    $(parentsp).find('.sanpham').val($(nv).data('name'));
    $(parentsp).find('.sanpham').attr('value', $(nv).data('name'));
    $('.suggesstion-sp').hide();
    $(".customliststyle").remove();
    $.ajax({
        type: "POST",
        url: "/ajax.php",
        dataType: "json",
        data: {
            op: op,
            id_sp: id_sp,
            idform: idform
        },
        success: function (data) {
            if (data['success'] == 0) {
                $(parentsp).find('.donvt1').val(data['dvt']);
                $(parentsp).find('.donvt1').attr('value', data['dvt']);
                $(parentsp).find('.sl1').val(formatSoLuongInvoice('1', lesoluong)[0]);
                $(parentsp).find('.sl1').attr('value', formatSoLuongInvoice('1', 2)[0]);
                $(parentsp).find('.sl2').val(formatSoLuongInvoice('1', lesoluong)[1]);
                $(parentsp).find('.sl2').attr('value', formatSoLuongInvoice('1', 2)[1]);
                $(parentsp).find('.price1').val(formatDonGiaInvoice(String(data['dongia1']), ledongia)[0]);
                $(parentsp).find('.price1').attr('value', formatDonGiaInvoice(String(data['dongia1']), ledongia)[0]);
                $(parentsp).find('.vat1').val(data['vat']);
                $(parentsp).find('.vat1').attr('value', data['vat']);
                $(parentsp).find('.vat2').val(data['vat']);
                $(parentsp).find('.vat2').attr('value', data['vat']);
                $(parentsp).find('.msp').val(data['masp']);
                $(parentsp).find('.msp').attr('value', data['masp']);
                $(parentsp).find('.msp1').val(data['masp']);
                $(parentsp).find('.msp1').attr('value', data['masp']);
                if (idform == 1) {
                    $(parentsp).find('.thanhtien1').val(data['thanhtien']);
                    $(parentsp).find('.thanhtien1').attr('value', data['thanhtien']);
                    $(parentsp).find('.thanhtien2').val(data['tongtien']);
                    $(parentsp).find('.thanhtien2').attr('value', data['tongtien']);
                } else {
                    $(parentsp).find('.thanhtien1').val(data['dongia']);
                    $(parentsp).find('.thanhtien1').attr('value', data['dongia']);
                    $(parentsp).find('.thanhtien2').val(data['dongia1']);
                    $(parentsp).find('.thanhtien2').attr('value', data['dongia1']);
                }

                $(parentsp).find('.price2').val(data['dongia1']);
                $(parentsp).find('.price2').attr('value', data['dongia1']);
                $(parentsp).find('.id_sp').val(data['idsp']);
                $(parentsp).find('.id_sp').attr('value', data['idsp']);
                $(parentsp).find('.giavat1').val(data['thanhtien']);
                $(parentsp).find('.giavat1').attr('value', data['thanhtien']);
                $(parentsp).find('.giavat2').val(data['tongtien']);
                $(parentsp).find('.giavat2').attr('value', data['tongtien']);
                $(parentsp).find('.thueGTGT').val(data['tienvat2']);
                $(parentsp).find('.thueGTGT2').attr('value', data['tienvat1']);

                ob = $(parentsp).find('.sl1');
                var intoMoney = calcuIntoMoneyInvoice(ob);
                if (formhd == 1) {
                    var pricevat = calcuThueGTGTInvoice(ob);
                } else {
                    var priceVat = calcuPriceVatInvoice(ob);
                    var totalAmount = calcuTotalAmountInvoice();
                    var totalVat = calcuTotalVatInvoice();
                }
                var TotalPayment = calcuTotalPaymentInvoice();
                writeMoneyInvoiceOLD(TotalPayment);
                // console.log(ob,priceVat,intoMoney,totalAmount,totalVat,TotalPayment);

                (function () {

                    var focussl = $(parentsp).find('.sl1');

                    focussl
                        .putCursorAtEnd() // should be chainable
                        .on("focus", function () { // could be on any event
                            focussl.putCursorAtEnd()
                        });
                })();
            }
        }
    });
}

function onchangSumVAT(ob) {
    var formhd = $('#formhd').val();
    var valueinput = $(ob).val();
    var arrayPriceVat = formatDonGiaInvoice(valueinput);

    if (arrayPriceVat[2] == false) {
        $(ob).parent().find(".showerr").css("display", "flex");
        $(ob).parent().find("p.minss").text("Phải nhập bằng số");
        $(ob).val("");
    } else {
        $(ob).parent().find(".showerr").css("display", "none");
    }

    var priceVatShow = arrayPriceVat[0];
    var priceVatHidden = arrayPriceVat[1];

    $(ob).parents('tr').find(".giavat3").val(priceVatShow);
    $(ob).parents('tr').find(".giavat3").attr('value', priceVatShow);

    $(ob).parents('tr').find(".giavat4").val(priceVatHidden);
    $(ob).parents('tr').find(".giavat4").attr('value', priceVatHidden);


    var price = calcuPriceInvoice(ob);
    var intoMoney = calcuIntoMoneyInvoice(ob);
    var totalAmount = calcuTotalAmountInvoice();
    var totalVal = calcuTotalVatInvoice();

    var TotalPayment = calcuTotalPaymentInvoice();
    writeMoneyInvoiceOLD(TotalPayment);
}

$("#submit_to_invoice").click(function () {
    $("#content_invoice_pdf").val($(".formwrapper").html());
    $("#content_invoicemau_pdf").val($(".formwrappermau").html());
});






var ktraBill = function () {
    var form_bill = $.trim($('#bilss').val());
    var ktraBillIV = true;

    if (form_bill == "") {
        $('.emauso').addClass("bf");
        $('.emauso').text("Chưa chọn mẫu số hóa đơn có hiệu lực");
        ktraBillIV = false;
    } else {
        $('.emauso').removeClass("bf");
        $('.emauso').text("");
    }

    return ktraBillIV;
}

var ktraCoutIv = function () {
    var form_slkh = $.trim($('.sl_kihieu').val());
    var form_coutslsd = $.trim($('.cout_slsd').val());

    var ktraCoutIVoi = true;
    if (Number(form_coutslsd) >= Number(form_slkh)) {
        $('.ecoutiv').addClass("bf");
        $('.ecoutiv').text("Đã sử dụng hết hóa đơn của kí hiệu hóa đơn này . Vui lòng thêm mới kí hiệu hóa đơn để tiếp tục sử dụng.");
        ktraCoutIVoi = false;
    } else {
        $('.ecoutiv').removeClass("bf");
        $('.ecoutiv').text("");
    }

    return ktraCoutIVoi;
}

var ktraDateXuat = function () {
    var dateString = $('#date1').val().replace(/-/g, '/');
    var dateParts = dateString.split("/");
    var dateObject = new Date(+dateParts[2], dateParts[1] - 1, +dateParts[0]);
    var form_date = Date.parse(dateObject);
    var dateString2 = $('#daterang').val().replace(/-/g, '/');
    var dateParts2 = dateString2.split("/");
    var dateObject2 = new Date(+dateParts2[2], dateParts2[1] - 1, +dateParts2[0]);
    var form_datesosanh = Date.parse(dateObject2);
    var ktraDateXuatIV = true;
    if (form_date < form_datesosanh) {
        $('.edatexuat').addClass("bf");
        $('.edatexuat').text("Chọn ngày lớn hơn hoặc bằng ngày " + $('#daterang').val());
        ktraDateXuatIV = false;
    } else {
        $('.edatexuat').removeClass("bf");
        $('.edatexuat').text("");
    }
    // }


    return ktraDateXuatIV;
}

var ktraDateXuatEdit = function () {
    var dateStringEdit = $('#date1').val().replace(/-/g, '/'); // Ngày vừa chọn
    var datePartsEdit = dateStringEdit.split("/");
    var dateObjectEdit = new Date(+datePartsEdit[2], datePartsEdit[1] - 1, +datePartsEdit[0]);
    var form_dateEdit = Date.parse(dateObjectEdit);

    var dateStringEdit2 = $('#daterang').val().replace(/-/g, '/'); // Ngày của hóa đơn cuối
    var datePartsEdit2 = dateStringEdit2.split("/");
    var dateObjectEdit2 = new Date(+datePartsEdit2[2], datePartsEdit2[1] - 1, +datePartsEdit2[0]);
    var form_datesosanhEdit = Date.parse(dateObjectEdit2);

    var dateStringEdit3 = $('#datebillss').val().replace(/-/g, '/'); // Ngày của hóa đơn đầu
    var datePartsEdit3 = dateStringEdit3.split("/");
    var dateObjectEdit3 = new Date(+datePartsEdit3[2], datePartsEdit3[1] - 1, +datePartsEdit3[0]);
    var form_datebillsosanhEdit = Date.parse(dateObjectEdit3);

    var dateStringNextLast = $('#datenextlast').val().replace(/-/g, '/'); // Ngày của hóa đơn trước hóa đơn chọn edit
    var datePartsNextLast = dateStringNextLast.split("/");
    var dateObjectNextLast = new Date(+datePartsNextLast[2], datePartsNextLast[1] - 1, +datePartsNextLast[0]);
    var form_dateNextLast = Date.parse(dateObjectNextLast);

    var dateStringAfterLast = $('#dateafterlast').val().replace(/-/g, '/'); // Ngày của hóa đơn sau hóa đơn chọn edit
    var datePartsAfterLast = dateStringAfterLast.split("/");
    var dateObjectAfterLast = new Date(+datePartsAfterLast[2], datePartsAfterLast[1] - 1, +datePartsAfterLast[0]);
    var form_dateAfterLast = Date.parse(dateObjectAfterLast);

    var serialcheck = $('#serialcheck').val();
    var serialmax = $('#invoicuoi').val();
    var ktraDateXuatIVEdit = true;

    console.log(dateStringEdit);
    console.log(dateStringEdit3);
    console.log(dateStringEdit2);
    if (dateStringNextLast == '') { // Hóa đơn đầu tiên
        if (dateStringAfterLast == '') { // Nếu sau đó chưa xuất hóa đơn
            if (form_dateEdit < form_datebillsosanhEdit) { //So sánh với ngày bắt đầu sử dụng hóa đơn
                $('.edatexuatedit').addClass("bf");
                $('.edatexuatedit').text("Chọn ngày lớn hơn hoặc bằng ngày " + $('#datebillss').val());
                ktraDateXuatIVEdit = false;
            } else {
                $('.edatexuatedit').removeClass("bf");
                $('.edatexuatedit').text("");
            }
        } else {
            if (form_dateEdit > form_dateAfterLast) { //So sánh với ngày của hóa đơn sau đó
                $('.edatexuatedit').addClass("bf");
                $('.edatexuatedit').text("Chọn ngày nằm trong khoảng từ ngày " + $('#datebillss').val() + " đến ngày " + $('#dateafterlast').val());
                ktraDateXuatIVEdit = false;
            } else {
                $('.edatexuatedit').removeClass("bf");
                $('.edatexuatedit').text("");
            }
        }
    } else { // Hóa đơn ở giữa hoặc cuối cùng
        if (serialcheck < serialmax) { // Hóa đơn ở giữa
            if (form_dateEdit > form_dateAfterLast || form_dateEdit < form_dateNextLast) {
                $('.edatexuatedit').addClass("bf");
                $('.edatexuatedit').text("Chọn ngày nằm trong khoảng từ ngày " + $('#datenextlast').val() + " đến ngày " + $('#dateafterlast').val());
                ktraDateXuatIVEdit = false;
            } else {
                $('.edatexuatedit').removeClass("bf");
                $('.edatexuatedit').text("");
            }
        } else { // Hóa đơn ở cuối
            if (form_dateEdit < form_dateNextLast) {
                //console.log('aaaa');
                $('.edatexuatedit').addClass("bf");
                $('.edatexuatedit').text("Chọn ngày lớn hơn hoặc bằng ngày " + $('#datenextlast').val());
                ktraDateXuatIVEdit = false;
            } else {
                $('.edatexuatedit').removeClass("bf");
                $('.edatexuatedit').text("");
            }
        }
    }

    // if(form_dateEdit < form_datebillsosanhEdit && serialcheck < serialmax || form_dateEdit > form_datesosanhEdit && serialcheck < serialmax) {
    //   $('.edatexuatedit').addClass("bf");
    //   $('.edatexuatedit').text("Chọn ngày nằm trong khoảng từ ngày "+ $('#datebillss').val()+" đến ngày "+ $('#daterang').val());
    //   ktraDateXuatIVEdit = false;
    // }else if(form_dateEdit < form_datebillsosanhEdit && serialcheck == serialmax){
    //   // console.log('aaaa');
    //   $('.edatexuatedit').addClass("bf");
    //   $('.edatexuatedit').text("Chọn ngày lớn hơn hoặc bằng ngày "+ $('#datebillss').val());
    //   ktraDateXuatIVEdit = false;
    // }
    // else if(form_dateEdit < form_datesosanhEdit && serialcheck >= serialmax || form_dateEdit < form_dateNextLast){
    //   // console.log('aaaa');
    //   $('.edatexuatedit').addClass("bf");
    //   $('.edatexuatedit').text("Chọn ngày lớn hơn hoặc bằng ngày "+ $('#datenextlast').val());
    //   ktraDateXuatIVEdit = false;
    // }else if(form_dateEdit > form_dateAfterLast){
    //   //console.log('aaaa');
    //   $('.edatexuatedit').addClass("bf");
    //   $('.edatexuatedit').text("Chọn ngày nhỏ hơn hoặc bằng ngày "+ $('#dateafterlast').val());
    //   ktraDateXuatIVEdit = false;
    // }
    // else {
    //   $('.edatexuatedit').removeClass("bf");
    //   $('.edatexuatedit').text("");
    // }

    return ktraDateXuatIVEdit;
}

var ktraSymbol = function () {
    var form_sym = $.trim($('#id_kihieu').val());
    var ktraSymbolIV = true;

    if (form_sym == "") {
        $('.ekihieu').addClass("bf");
        $('.ekihieu').text("Chưa chọn kí hiệu hóa đơn có hiệu lực");
        ktraSymbolIV = false;
    } else {
        $('.ekihieu').removeClass("bf");
        $('.ekihieu').text("");
    }

    return ktraSymbolIV;
}

var ktraDieuDong = function () {
    var form_dieudong = $.trim($('#dieudong').val());
    let checkFormTest = document.querySelector('#checkFormTest')
    var ktraDieudongIV = true;
    let symbol_abbreviation = document.querySelector('#symbol_abbreviation');
    if (symbol_abbreviation.value == "N") {
        if (form_dieudong == "") {
            $('.edieudong').addClass("bf");
            $('.edieudong').text("Thông tin lệnh điều động không được để trống");
            ktraDieudongIV = false;
        } else if (form_dieudong.length > 255) {
            $('.edieudong').addClass("bf");
            $('.edieudong').text("Thông tin lệnh điều động không được dài hơn 255 ký tự");
            ktraDieudongIV = false;
        } else {
            $('.edieudong').removeClass("bf");
            $('.edieudong').text("");
        }
    }

    return ktraDieudongIV;
}

var ktraHopDongKTSoVaNgay = function () {
    var inputKTeSo = $.trim($('#hopdongso').val());
    var inputKTeNgay = $.trim($('#deliv_ngayHopDong').val());
    var ktraInput = true;
    let symbol_abbreviation = document.querySelector('#symbol_abbreviation');

    if (symbol_abbreviation.value == "B") {
        if (inputKTeSo == "") {
            $('.eHopDongKTSo').addClass("bf");
            $('.eHopDongKTSo').text("Hợp đồng số không được để trống!");
            ktraInput = false;
        }
        if (inputKTeNgay == "") {
            $('.eHopDongKTNgay').addClass("bf");
            $('.eHopDongKTNgay').text("Vui lòng chọn ngày hợp đồng!");
            ktraInput = false;
        }
        if (inputKTeSo.length > 255) {
            $('.eHopDongKTSo').addClass("bf");
            $('.eHopDongKTSo').text("Hợp đồng số không được dài hơn 255 ký tự!");
            ktraInput = false;
        }
        if (inputKTeSo != "" && inputKTeNgay != "") {
            $('.eHopDongKTSo').removeClass("bf");
            $('.eHopDongKTSo').text("");
            $('.eHopDongKTNgay').removeClass("bf");
            $('.eHopDongKTNgay').text("");
        }
    }
    return ktraInput;
}

var ktraPayment = function () {
    var form_payment = $.trim($('#hinhthuc option:selected').val());
    var ktraPaymentIV = true;

    if (form_payment == 0) {
        $('.ehtpayment').addClass("bf");
        $('.ehtpayment').text("Chưa chọn hình thức thanh toán");
        ktraPaymentIV = false;
    } else {
        $('.ehtpayment').removeClass("bf");
        $('.ehtpayment').text("");
    }

    return ktraPaymentIV;
}

var ktraKhoXuathang = function () {
    var form_khoxuathang = $.trim($('#khoxuathang option:selected').val());
    var ktraKhoxuathang = true;

    if (form_khoxuathang == 0) {
        $('.ekhoxuat').addClass("bf");
        $('.ekhoxuat').text("Chưa chọn kho xuất hàng");
        ktraKhoxuathang = false;
    } else {
        $('.ekhoxuat').removeClass("bf");
        $('.ekhoxuat').text("");
    }

    return ktraKhoxuathang;
}

var ktraKhoXuatAddr = function () {
    var form_khoxuataddr = $.trim($('#diachikhoxuat').val());
    var ktraKhoxuataddr = true;

    if (form_khoxuataddr == 0) {
        $('.ediachikhoxuat').addClass("bf");
        $('.ediachikhoxuat').text("Địa chỉ kho xuất hàng không được bỏ trống");
        ktraKhoxuataddr = false;
    } else if (form_khoxuataddr.length > 400) {
        $('.ediachikhoxuat').addClass("bf");
        $('.ediachikhoxuat').text("Địa chỉ kho xuất hàng không được dài hơn 400 ký tự");
        ktraKhoxuataddr = false;
    }
    else {
        $('.ediachikhoxuat').removeClass("bf");
        $('.ediachikhoxuat').text("");
    }

    return ktraKhoxuataddr;
}

//<--Dat--
var ktraPTVanChuyen = function () {
    var form_ptvanchuyen = $.trim($('#ptvanchuyen').val());
    var ktraPTvanchuyen = true;

    if (form_ptvanchuyen == 0) {
        $('.eptvanchuyen').addClass("bf");
        $('.eptvanchuyen').text("Phương tiện vận chuyển không được bỏ trống");
        ktraPTvanchuyen = false;
    } else if (form_ptvanchuyen.length > 50) {
        $('.eptvanchuyen').addClass("bf");
        $('.eptvanchuyen').text("Phương tiện vận chuyển không được dài hơn 50 ký tự");
        ktraPTvanchuyen = false;
    }
    else {
        $('.eptvanchuyen').removeClass("bf");
        $('.eptvanchuyen').text("");
    }

    return ktraPTvanchuyen;
}

var ktraKhoNhanhang = function () {

    /* Sử dụng cho chọn option, rào lại do có thay đổi
    var form_khonhanhang = $.trim($('#khonhanhang option:selected').val());
    var ktraKhonhanhang = true;

    if (form_khonhanhang == 0) {
        $('.ekhonhan').addClass("bf");
        $('.ekhonhan').text("Chưa chọn kho nhận hàng");
        ktraKhonhanhang = false;
    } else {
        $('.ekhonhan').removeClass("bf");
        $('.ekhonhan').text("");
    }*/

    let khonhanhang = $('#khonhanhang').val();
    let ktraKhonhanhang = true;

    if (khonhanhang == "") {
        ktraKhonhanhang = false;
        $('.ekhonhan').addClass('bf');
        $('.ekhonhan').text("Kho nhận hàng không bỏ trống");
    }
    else {
        $('.ekhonhan').removeClass("bf");
        $('.ekhonhan').text("");
    }
    return ktraKhonhanhang;
}

var ktraKhoNhanAddr = function () {
    var form_khonhanaddr = $.trim($('#diachikhonhan').val());
    var ktraKhonhanaddr = true;

    if (form_khonhanaddr == 0) {
        $('.ediachikhonhan').addClass("bf");
        $('.ediachikhonhan').text("Địa chỉ kho nhận hàng không được bỏ trống");
        ktraKhonhanaddr = false;
    } else if (form_khonhanaddr.length > 400) {
        $('.ediachikhonhan').addClass("bf");
        $('.ediachikhonhan').text("Địa chỉ kho nhận hàng không được dài hơn 400 ký tự");
        ktraKhonhanaddr = false;
    } else {
        $('.ediachikhonhan').removeClass("bf");
        $('.ediachikhonhan').text("");
    }

    return ktraKhonhanaddr;
}

//--Dat-->

var ktraNguoimua = function () {
    var form_ngmua = $.trim($('#tennguoimua').val());
    var ktraNguoimuaIV = true;
    var checkinv = $("#notinvoice:checked").length;

    if (form_ngmua == "" && checkinv < 1) {
        $('.engmuahang').addClass("bf");
        $('.engmuahang').text("Tên người mua không được để trống");
        ktraNguoimuaIV = false;
    } else if (form_ngmua == "" && checkinv >= 1) {
        $('.engmuahang').removeClass("bf");
        $('.engmuahang').text("");
        ktraNguoimuaIV = true;
    } else {
        $('.engmuahang').removeClass("bf");
        $('.engmuahang').text("");
    }
    return ktraNguoimuaIV;
}

var ktraMST = function () {
    var form_mst = $.trim($('#masothue').val());
    var form_ngmua = $.trim($('#tennguoimua').val());
    var checkinv = $("#notinvoice:checked").length;
    var ktraMSTIV = true;

    if (form_mst == "" && form_ngmua != "" && checkinv < 1) {
        $('.emast').removeClass("bf");
        $('.emast').text("");
        ktraMSTIV = true;

    } else if (form_mst == "" && checkinv >= 1) {
        $('.emast').removeClass("bf");
        $('.emast').text("");
        ktraMSTIV = true;

    }
    // else if (form_mst == "" && checkinv < 1){
    //   $('.emast').addClass("bf");
    //   $('.emast').text("Mã số thuế không được để trống");
    //   ktraMSTIV = false;
    // }
    else {
        $('.emast').removeClass("bf");
        $('.emast').text("");

    }

    return ktraMSTIV;
}

var ktraDV = function () {
    var form_donvi = $.trim($('#tendonvi').val());
    var form_ngmua = $.trim($('#tennguoimua').val());
    var ktraDVIV = true;
    var checkinv = $("#notinvoice:checked").length;

    if (form_donvi == "" && form_ngmua != "" && checkinv < 1) {
        $('.edonvi').removeClass("bf");
        $('.edonvi').text("");
        ktraDVIV = true;
    } else if (form_donvi == "" && checkinv >= 1) {
        $('.edonvi').removeClass("bf");
        $('.edonvi').text("");
        ktraDVIV = true;
    } else if (form_donvi == "" && checkinv < 1) {
        $('.edonvi').addClass("bf");
        $('.edonvi').text("Tên đơn vị không được để trống");
        ktraDVIV = false;
    } else {
        $('.edonvi').removeClass("bf");

        $('.edonvi').text("");
    }

    return ktraDVIV;
}

var ktraEmail = function () {
    var form_emailiv = $.trim($('#email').val());
    var form_ngmua = $.trim($('#tennguoimua').val());
    var aCong = form_emailiv.indexOf("@");
    var dauCham = form_emailiv.lastIndexOf(".");
    var ketquaKtEmailIV = true;
    var checkinv = $("#notinvoice:checked").length;

    if (form_emailiv == "" && form_ngmua != "" && checkinv < 1) {

        $('.eemail').removeClass("bf");
        $('.eemail').text("");
        ketquaKtEmailIV = true;
    } else if ((aCong < 1) && checkinv < 1 || (dauCham < aCong + 2) && checkinv < 1 || (dauCham + 2 > form_emailiv.length) && checkinv < 1) {
        $('.eemail').addClass("bf");

        $('.eemail').text("Email chưa hợp lệ");
        ketquaKtEmailIV = false;
    } else if (form_emailiv == "" && checkinv >= 1) {
        $('.eemail').removeClass("bf");
        $('.eemail').text("");
        ketquaKtEmailIV = true;
    } else if (form_emailiv == "" && checkinv < 1) {
        $('.eemail').addClass("bf");
        $('.eemail').text("Email không được để trống");
        ketquaKtEmailIV = false;

    } else {
        $('.eemail').removeClass("bf");
        $('.eemail').text("");
    }

    return ketquaKtEmailIV;
}

var ktraAddress = function () {
    var form_addres = $.trim($('#diachi').val());
    var form_ngmua = $.trim($('#tennguoimua').val());
    var ktraAddressIV = true;
    var checkinv = $("#notinvoice:checked").length;

    if (form_addres == "" && form_ngmua != "" && checkinv < 1) {
        $('.ediachi').removeClass("bf");
        $('.ediachi').text("");
        ktraAddressIV = true;
    } else if (form_addres == "" && checkinv >= 1) {
        $('.ediachi').removeClass("bf");
        $('.ediachi').text("");
        ktraAddressIV = true;
    } else if (form_addres == "" & checkinv < 1) {
        $('.ediachi').addClass("bf");
        $('.ediachi').text("Địa chỉ không được để trống");
        ktraAddressIV = false;
    } else {
        $('.ediachi').removeClass("bf");
        $('.ediachi').text("");
    }
    return ktraAddressIV;
}

var ktraTrungKho = function () {
    var ktraTrungKhoIV = true;

    let diaChiKhoNhan = $.trim($('#diachikhonhan').val());
    let diaChiKhoXuat = $.trim($('#diachikhoxuat').val());
    console.log(diaChiKhoNhan == diaChiKhoXuat);
    if (diaChiKhoNhan == diaChiKhoXuat) {
        $('.etrungdiachikho').addClass("bf");
        $('.etrungdiachikho').text("Địa chỉ kho xuất và kho nhận không được trùng nhau");
        ktraTrungKhoIV = false;
    }
    else {
        $('.etrungdiachikho').removeClass("bf");
        $('.etrungdiachikho').text("");
    }

    return ktraTrungKhoIV;
}

var ktraMSTKhoNhan = function () {
    var form_mstkhonhan = $.trim($('#masothuekhonhan').val());
    var ktraMSTKhoNhanIV = true;

    if (form_mstkhonhan == "") {
        $('.emastkhonhan').addClass("bf");
        $('.emastkhonhan').text("Mã số thuế kho nhận hàng không được để trống.");
        ktraMSTKhoNhanIV = false;

    } else {
        $('.emastkhonhan').removeClass("bf");
        $('.emastkhonhan').text("");

    }

    return ktraMSTKhoNhanIV;
}

var ktraDonViNhanHang = function () {// Đơn vị nhận hàng là tên người nhận hàng trên xml
    var input = $.trim($('#tennguoimua').val());
    var inputTaxcode = $.trim($('#masothuekhonhan').val());
    var ktraInput = true;

    if (inputTaxcode != "") {
        if (input == "") {
            $('.eDonViNhanHang').addClass("bf");
            $('.eDonViNhanHang').text("Đơn vị nhận hàng không được bỏ trống khi có mã số thuế kho nhận.");
            ktraInput = false;
        } else {
            $('.eDonViNhanHang').removeClass("bf");
            $('.eDonViNhanHang').text("");

        }
    }
    return ktraInput;
}

var ktraTenNguoiVanChuyen = function () {
    var tenNguoiVanChuyen = $.trim($('#vanchuyen').val());
    var ktraTen = true;

    let symbol_abbreviation = document.querySelector('#symbol_abbreviation');
    if (symbol_abbreviation.value == "B") {
        if (tenNguoiVanChuyen == "") {
            $('.etennguoivanchuyen').addClass("bf");
            $('.etennguoivanchuyen').text("Thông tin tên người vận chuyển không được bỏ trống");
            ktraTen = false;
        } else if (tenNguoiVanChuyen.length > 100) {
            $('.etennguoivanchuyen').addClass("bf");
            $('.etennguoivanchuyen').text("Thông tin tên người vận chuyển không được dài hơn 100 ký tự");
            ktraTen = false;
        } else {
            $('.etennguoivanchuyen').removeClass("bf");
            $('.etennguoivanchuyen').text("");
        }
    }
    return ktraTen;
}

function checkCurrenciesAndRate_Delivery() {
    let checkFormTest = document.querySelector('#checkFormTest')// Sau này chuyển sang form mới rồi thì bỏ if ở dưới
    if (checkFormTest) {
        let currencies = document.getElementById('donvitiente');
        let text = currencies.options[currencies.selectedIndex].text
        let value = currencies.value
        let rate = document.querySelector('#tygia')

        if (value != 0 || rate.value) {
            if ((text != "VND" && !rate.value)) {
                $('.eTyGia').addClass("bf");
                $('.eTyGia').text("Tỷ giá không được bỏ trống!");
                return false
            }
            else if (rate.value && value == 0) {
                $('.eTyGia').addClass("bf");
                $('.eTyGia').text("Vui lòng chọn tiền tệ!");
                return false
            }
            else {
                $('.eTyGia').removeClass("bf");
                $('.eTyGia').text("");
            }
        }

        return true
    }
}

var ktraSTK = function () {
    var form_stk = $.trim($('#sotaikhoan').val());
    var form_ngmua = $.trim($('#tennguoimua').val());
    var kTraDT = isNaN(form_stk);
    var checkinv = $("#notinvoice:checked").length;

    var ketquaKtSDTIV = true;

    if (form_stk == "" && form_ngmua != "" && checkinv < 1) {
        $('.esotaikhoan').removeClass("bf");
        $('.esotaikhoan').text("");
        ketquaKtSDTIV = true;
    } else if (kTraDT == true && checkinv < 1) {
        $('.esotaikhoan').addClass("bf");
        $('.esotaikhoan').text("Số tài khoản phải nhập bằng số");
        ketquaKtSDTIV = false;
    } else if (form_stk == "" && checkinv >= 1) {
        $('.esotaikhoan').removeClass("bf");
        $('.esotaikhoan').text("");
        ketquaKtSDTIV = true;
    } else if (form_stk == "" && checkinv < 1) {
        $('.esotaikhoan').addClass("bf");
        $('.esotaikhoan').text("Số tài khoản không được để trống");
        ketquaKtSDTIV = false;
    } else {
        $('.esotaikhoan').removeClass("bf");

        $('.esotaikhoan').text("");
    }

    return ketquaKtSDTIV;
}

// function checkAllInputLength(){
//     let validateLength = document.querySelectorAll('.validateLength')
//     validateLength.forEach(e => {
//        let dataLength = e.getAttribute("data-length-validate")
//        if(dataLength < e.value.length){

//        }     
//     })
// } 

function checkNameCodeProNull() {
    var checknull = 0;
    $('.sanpham').each(function () {
        var codepro = $.trim($(this).val());
        var namepro = $.trim($(this).parents('tr').find('input.msp').val());
        var thanhtien = $.trim($(this).parents('tr').find('.thanhtien2').val());
        if (namepro == '' || thanhtien == '') {
            checknull += 1;
        }
    });
    return checknull;
}
var ktraDSHangHoaNotEmpty = function () {
    var form_hh = $("#addproduct tbody").children("tr").length;
    var ten_hh = $(".sanpham").val();
    var ten_hh2 = $(".msp").val();
    var ktraDSHangHoaNotEmptyIV = true;

    if ($("#addproduct tbody").children("tr").length == 1 && !ten_hh2 || ten_hh2 == "") {
        // $('.productnotempty').addClass("bf");
        // $('.productnotempty').text("Nhập hàng hóa, dịch vụ.");
        ktraDSHangHoaNotEmptyIV = false;
    } else {
        $('.productnotempty').removeClass("bf");
        $('.productnotempty').text("");
    }

    return ktraDSHangHoaNotEmptyIV;
}

// var ktraDSHangHoaKhuyenMai = function() {
//   var tongtienaa = 0;
//   console.log(tongtienaa);
//   var checkkm2 = 0;

//   $("#addproduct .checkkm2").each(function(){
//     var checkkm2 = $(this).val();
//     var tongtienaa = $(".thanhtien2").val();
//     console.log(checkkm2);
//     console.log(tongtienaa);
//   })

//   var ktraDSHangHoaKhuyenMaiIV = true;

//   if(checkkm2 == 1) {
//     $('.productkhuyenmai').addClass("bf");
//     $('.productkhuyenmai').text("test.");
//     ktraDSHangHoaKhuyenMaiIV = false;
//   }
//   else {
//     $('.productkhuyenmai').removeClass("bf");
//     $('.productkhuyenmai').text("");
//   }

//   return ktraDSHangHoaKhuyenMaiIV;
// }

var ktraNameProNullDelivery = function () {
    var checknull = 0;
    $('.sanpham').each(function () {
        var codepro = $.trim($(this).val());
        var namepro = $.trim($(this).parents('tr').find('input.msp').val());
        if (namepro == '') {
            checknull += 1;
        }
    });
    return checknull;
}


var ktrattrung = function () {
    var ktrattrungvar;
    var i;
    var mang = [];
    var mang2 = [];
    $("#addproduct .msp").each(function () {
        if ($(this).val().length > 0) {
            mang.push($.trim($(this).val()));
        }
    })
    $("#addproduct .sanpham").each(function () {
        if ($(this).val().length > 0) {
            mang2.push($.trim($(this).val()));
        }
    })
    var checkdup = find_duplicate_in_array(mang);
    var checkdup2 = find_duplicate_in_array(mang2);

    if (checkdup.length > 0 || checkdup2.length > 0) {
        ktrattrungvar = false;
    } else {
        ktrattrungvar = true;
    }
    return ktrattrungvar;

}

function find_duplicate_in_array(arra1) {
    const object = {};
    const result = [];

    arra1.forEach(item => {
        if (!object[item])
            object[item] = 0;
        object[item] += 1;
    })

    for (const prop in object) {
        if (object[prop] >= 2) {
            result.push(prop);
        }
    }

    return result;

}



var continueReg1 = function () {
    var btnSubmit = $('#submitinvoice');
    btnSubmit.on('click', function (e) {
        e.preventDefault();
        // var ktraBill2 = ktraBill();
        var ktraSymbol2 = ktraSymbol();
        var ktraMST2 = ktraMST();
        var ktraDV2 = ktraDV();
        var ktraAddress2 = ktraAddress();
        var ktraDateXuat2 = ktraDateXuat();
        var ktraCoutIV2 = ktraCoutIv();
        var ktrungft = ktrattrung();
        var ktpayment2 = ktraPayment();
        var checknamenull = checkNameCodeProNull();
        var tongtienaa = $("#tongcongprice").val().replace(/[,.]/g, '');
        var checktb = ($("#addproduct tbody").children("tr").length < 2);

        if (checknamenull == 0 && ktrungft == true && tongtienaa > 0 && ktraDateXuat2 == true && ktraCoutIV2 == true && ktraSymbol2 == true && ktraDV2 == true && ktraMST2 == true && ktraAddress2 == true && ktpayment2 == true) {
            $('.form-validate').submit();
            // ktraMST2==true  && 
            // $("#clickadd").css("pointer-events", "unset");
        } else {
            if (tongtienaa <= 0) {
                $('.erroe.sanphamer').addClass("bf");
                $('.erroe.sanphamer').text("Tổng tiền phải lớn hơn không.");
            } else if (ktrungft == false) {
                $('.erroe.strung').addClass("bf");
                $('.erroe.strung').text("Trùng tên hàng hóa/dịch vụ.");
            } else if (checknamenull > 0) {
                $('.erroe.sanphamer').addClass("bf");
                $('.erroe.sanphamer').text("Tên hàng không được rỗng.");
            } else {
                $('.erroe.strung').text("");
                $('.erroe.strung').removeClass("bf");
                $('.erroe.sanphamer').text("");
                $('.erroe.sanphamer').removeClass("bf");
            }
        }
    });
}

var continueReg1_import = function () {
    var btnSubmit = $('#submitinvoice_import');
    btnSubmit.on('click', function (e) {
        e.preventDefault();
        // var ktraBill2 = ktraBill();
        var ktraSymbol2 = ktraSymbol();
        var ktraMST2 = ktraMST();
        var ktraDV2 = ktraDV();
        var ktraAddress2 = ktraAddress();
        var ktraDateXuat2 = ktraDateXuat();
        var ktraCoutIV2 = ktraCoutIv();
        var ktrungft = ktrattrung();
        var ktpayment2 = ktraPayment();
        var checknamenull = checkNameCodeProNull();
        var checktb = ($("#addproduct tbody").children("tr").length < 2);
        console.log(checknamenull);
        // ktrungft == true && 

        if (ktrungft == true && ktraDateXuat2 == true && ktraCoutIV2 == true && ktraSymbol2 == true && ktraDV2 == true && ktraMST2 == true && ktraAddress2 == true && ktpayment2 == true) {
            $('.form-validate').submit();
            // ktraMST2==true  && 
            // $("#clickadd").css("pointer-events", "unset");
        } else {
            if (tongtienaa <= 0) {
                $('.erroe.sanphamer').addClass("bf");
                $('.erroe.sanphamer').text("Tổng tiền phải lớn hơn không.");
            } else if (ktrungft == false) {
                $('.erroe.strung').addClass("bf");
                $('.erroe.strung').text("Trùng tên hàng hóa/dịch vụ.");
            } else if (checknamenull > 0) {
                $('.erroe.sanphamer').addClass("bf");
                $('.erroe.sanphamer').text("Tên hàng không được rỗng.");
            } else {
                $('.erroe.strung').text("");
                $('.erroe.strung').removeClass("bf");
                $('.erroe.sanphamer').text("");
                $('.erroe.sanphamer').removeClass("bf");
            }
        }
    });
}

var continueReg2_import = function () {
    var btnSubmit = $('#submitinvoice_import');
    btnSubmit.on('click', function (e) {
        e.preventDefault();
        // var ktraBill2 = ktraBill();
        var ktraSymbol2 = ktraSymbol();
        var ktraMST2 = ktraMST();
        var ktraDV2 = ktraDV();
        var ktraAddress2 = ktraAddress();
        var ktraDateXuat2 = ktraDateXuat();
        var ktraCoutIV2 = ktraCoutIv();
        var ktrungft = ktrattrung();
        var ktpayment2 = ktraPayment();
        var checknamenull = checkNameCodeProNull();
        var checktb = ($("#addproduct tbody").children("tr").length < 2);
        console.log(checknamenull);
        // ktrungft == true && 

        if (ktrungft == true && ktraDateXuat2 == true && ktraCoutIV2 == true && ktraSymbol2 == true && ktraDV2 == true && ktraMST2 == true && ktraAddress2 == true && ktpayment2 == true) {
            $('.form-validate').submit();
            // ktraMST2==true  && 
            // $("#clickadd").css("pointer-events", "unset");
        } else {
            if (tongtienaa <= 0) {
                $('.erroe.sanphamer').addClass("bf");
                $('.erroe.sanphamer').text("Tổng tiền phải lớn hơn không.");
            } else if (ktrungft == false) {
                $('.erroe.strung').addClass("bf");
                $('.erroe.strung').text("Trùng tên hàng hóa/dịch vụ.");
            } else if (checknamenull > 0) {
                $('.erroe.sanphamer').addClass("bf");
                $('.erroe.sanphamer').text("Tên hàng không được rỗng.");
            } else {
                $('.erroe.strung').text("");
                $('.erroe.strung').removeClass("bf");
                $('.erroe.sanphamer').text("");
                $('.erroe.sanphamer').removeClass("bf");
            }
        }
    });
}

var onChangeReg1 = function () {
    // $('#bilss').change(function() {
    //   ktraBill();
    // })
    $('#id_kihieu').change(function () {
        ktraSymbol();
    })
    $('#date1').change(function () {
        ktraDateXuat();
    })
    $('#masothue').change(function () {
        ktraMST();
    })
    $('#tendonvi').change(function () {
        ktraDV();
    })
    $('#email').change(function () {
        ktraEmail();
    })
    $('#diachi').change(function () {
        ktraAddress();
    })
}

var continueReg5 = function () {
    var btnSubmit5 = $('#submitinvoicedelivery');
    btnSubmit5.on('click', function (e) {
        e.preventDefault();
        var ktraSymbol2 = ktraSymbol();
        var ktraMST2 = ktraMSTKhoNhan();

        // if(ktraMST2 == true){
        //    ktraDvnhanhang =  ktraDonViNhanHang()
        // }


        // var ktraNguoimua2 = ktraNguoimua();
        var ktraTrungKho2 = ktraTrungKho();
        var ktraKhoNhanhang2 = ktraKhoNhanhang();
        // var ktraDateXuat2 = ktraDateXuat();
        var ktraCoutIV2 = ktraCoutIv();
        var ktrungft = ktrattrung();
        var ktraDieuDong2 = ktraDieuDong();

        var ktraKhoXuathang2 = ktraKhoXuathang();

        var validatekhoxuataddress = ktraKhoXuatAddr();
        var validateptvanchuyen = ktraPTVanChuyen();
        var validatekhonhanaddress = ktraKhoNhanAddr();
        var checknamenull = ktraNameProNullDelivery();
        var tongtienaa = $("#tongcongprice1").val();

        //check form to test 
        let checkFormTest = document.querySelector('#checkFormTest')// Sau này chuyển sang form mới rồi thì bỏ if ở dưới
        let checkCurrenciesAndRate = "";
        let ktraHopDongKTSo_KTNgay = "";
        let ktraDvnhanhang = ""
        let kTraTenNguoiVanChuyen = ""
        if (checkFormTest) {
            checkCurrenciesAndRate = checkCurrenciesAndRate_Delivery();
            ktraHopDongKTSo_KTNgay = ktraHopDongKTSoVaNgay();
            kTraTenNguoiVanChuyen = ktraTenNguoiVanChuyen();
            ktraDvnhanhang = ktraDonViNhanHang();
        }
        else {
            checkCurrenciesAndRate = true;
            ktraHopDongKTSo_KTNgay = true;
            ktraDvnhanhang = true;
        }

        // var checktb = ($("#addproduct tbody").children("tr").length < 2);
        var ktraDSHangHoaNotEmpty2 = ktraDSHangHoaNotEmpty();
        //điều kiện - && ktraKhoNhanhang2 == true  && ktraMST2 == true
        let boolSubmit = true;
        if (window.location.href.includes("op=newdelivery&act=repair&mod=add") != true && !$('input[name="lydo_dieuchinh"]')) {
            boolSubmit = false;
        }

        //Bổ sung nếu là pxk điều chỉnh thì cho phép tổng tiền âm

        if (boolSubmit == true) {// Nếu không phải là pxk điều chỉnh
            console.log(ktraDvnhanhang);
            if (checknamenull == 0 && validatekhonhanaddress == true && validateptvanchuyen == true && validatekhoxuataddress == true
                && ktraSymbol2 == true && ktraKhoXuathang2 == true && ktraTrungKho2 == true
                && ktraKhoNhanhang2 == true && ktraDieuDong2 == true && ktraCoutIV2 == true && ktraHopDongKTSo_KTNgay == true
                && ktraDSHangHoaNotEmpty2 == true && checkCurrenciesAndRate == true && ktraDvnhanhang == true && kTraTenNguoiVanChuyen == true) {
                $('.form-validate').submit();
                // $("#clickadd").css("pointer-events", "unset");
            }
            else {
                if (tongtienaa < 0) {
                    $('.erroe.sanphamer').addClass("bf");
                    $('.erroe.sanphamer').text("Tổng tiền phải lớn hơn hoặc bằng không.");
                } else if (checknamenull > 0) {
                    $('.erroe.sanphamer').addClass("bf");
                    $('.erroe.sanphamer').text("Tên hàng không được rỗng.");
                } else {
                    $('.erroe.strung').text("");
                    $('.erroe.strung').removeClass("bf");
                    $('.erroe.sanphamer').text("");
                    $('.erroe.sanphamer').removeClass("bf");
                }
            }
        }
        else {

            if (checknamenull == 0 && tongtienaa >= 0 && validatekhonhanaddress == true && validateptvanchuyen == true && validatekhoxuataddress == true && ktraSymbol2 == true && ktraKhoXuathang2 == true && ktraTrungKho2 == true && ktraKhoNhanhang2 == true
                && ktraDieuDong2 == true && ktraCoutIV2 == true && ktraDSHangHoaNotEmpty2 == true && ktraHopDongKTSo_KTNgay == true
                && ktraDvnhanhang == true && ktraTenNguoiVanChuyen == true) {
                $('.form-validate').submit();
                // $("#clickadd").css("pointer-events", "unset");
            }
            else {
                if (tongtienaa < 0) {
                    $('.erroe.sanphamer').addClass("bf");
                    $('.erroe.sanphamer').text("Tổng tiền phải lớn hơn hoặc bằng không.");
                } else if (checknamenull > 0) {
                    $('.erroe.sanphamer').addClass("bf");
                    $('.erroe.sanphamer').text("Tên hàng không được rỗng.");
                } else {
                    $('.erroe.strung').text("");
                    $('.erroe.strung').removeClass("bf");
                    $('.erroe.sanphamer').text("");
                    $('.erroe.sanphamer').removeClass("bf");
                }
            }
        }

    });
    // $('#name_khoout').val($('#khonhanhang').val());
}

var onChangeReg5 = function () {
    $('#id_kihieu').change(function () {
        ktraSymbol();
    })
    $('#date1').change(function () {
        ktraDateXuat();
    })
    $('#dieudong').change(function () {
        ktraDieuDong();
    })
    $('#masothuekhonhan').change(function () {
        ktraMSTKhoNhan();
    })
    $('#khoxuathang').change(function () {
        ktraKhoXuathang();
    })
    $('#ptvanchuyen').keyup(function () {
        ktraPTVanChuyen();
    })
    $('#diachikhoxuat').keyup(function () {
        ktraKhoXuatAddr();
    })
    $('#khonhanhang').change(function () {
        ktraKhoNhanhang();
    })
    $('#diachikhonhan').keyup(function () {
        ktraKhoNhanAddr();
    })
    $('.msp').change(function () {
        ktraDSHangHoaNotEmpty();
    })

}




var continueReg6 = function () {
    var btnSubmit2 = $('#submitinvoicedelivery2');
    btnSubmit2.on('click', function (e) {
        e.preventDefault();
        var ktraSymbol2 = ktraSymbol();
        //var ktraMST2 = ktraMSTKhoNhan();
        // var ktraNguoimua2 = ktraNguoimua();
        var ktraTrungKho2 = ktraTrungKho();
        //var ktraKhoNhanhang2 = ktraKhoNhanhang();
        var ktraDateXuat3 = ktraDateXuatEdit();
        var ktrungft = ktrattrung();
        var ktraDieuDong2 = ktraDieuDong();
        var ktraKhoXuathang2 = ktraKhoXuathang();
        var checknamenull = checkNameCodeProNull();
        var tongtienaa = $("#tongcongprice").val().replace(/[,.]/g, '');
        // var checktb = ($("#addproduct tbody").children("tr").length < 2);
        var ktraDSHangHoaNotEmpty2 = ktraDSHangHoaNotEmpty();


        if (checknamenull == 0 && tongtienaa >= 0 && ktrungft == true && ktraKhoXuathang2 == true && ktraDieuDong2 == true && ktraTrungKho2 == true && ktraDateXuat3 == true && ktraDSHangHoaNotEmpty2 == true) {
            $('.form-validate').submit();
            // console.log('tongtienaa');
            // $("#clickadd").css("pointer-events", "unset");
        } else {
            if (tongtienaa < 0) {
                $('.erroe.sanphamer').addClass("bf");
                $('.erroe.sanphamer').text("Tổng tiền phải lớn hơn hoặc bằng không.");
            } else if (checknamenull > 0) {
                $('.erroe.sanphamer').addClass("bf");
                $('.erroe.sanphamer').text("Tên hàng không được rỗng.");
            } else if (ktrungft == false) {
                $('.erroe.strung').addClass("bf");
                $('.erroe.strung').text("Trùng tên hàng hóa/dịch vụ.");
            } else {
                $('.erroe.strung').text("");
                $('.erroe.strung').removeClass("bf");
                $('.erroe.sanphamer').text("");
                $('.erroe.sanphamer').removeClass("bf");
            }
        }
    });
}

var onChangeReg6 = function () {
    $('#id_kihieu').change(function () {
        ktraSymbol();
    })
    $('#date1').change(function () {
        ktraDateXuat();
    })
    $('#dieudong').change(function () {
        ktraDieuDong();
    })

    $('#masothuekhonhan').change(function () {
        ktraMSTKhoNhan();
    })
    $('#khoxuathang').change(function () {
        ktraKhoXuathang();
    })
    $('#khonhanhang').change(function () {
        ktraKhoNhanhang();
    })
    $('.msp').change(function () {
        ktraDSHangHoaNotEmpty();
    })

}



var continueReg4 = function () {
    var btnSubmit2 = $('#submitinvoice2');
    btnSubmit2.on('click', function (e) {
        e.preventDefault();
        // var ktraBill2 = ktraBill();
        var ktraSymbol2 = ktraSymbol();
        var ktraMST2 = ktraMST();
        var ktraDV2 = ktraDV();
        var ktraAddress2 = ktraAddress();
        var ktraDateXuat3 = ktraDateXuatEdit();
        var ktrungft = ktrattrung();
        var ktpayment2 = ktraPayment();
        var checknamenull = checkNameCodeProNull();
        var tongtienaa = $("#tongcongprice").val().replace(/[,.]/g, '');
        var statusre = ($("#statusrepair").val() == 1);
        var checktb = ($("#addproduct tbody").children("tr").length < 2);
        if (statusre == true) {
            if (checknamenull == 0 && tongtienaa >= 0 && ktrungft == true && ktraSymbol2 == true && ktraMST2 == true && ktraDV2 == true && ktraAddress2 == true && ktraDateXuat3 == true && ktpayment2 == true) {
                $('.form-validate').submit();
                // $("#clickadd").css("pointer-events", "unset");
            } else {
                if (tongtienaa < 0) {
                    $('.erroe.sanphamer').addClass("bf");
                    $('.erroe.sanphamer').text("Tổng tiền phải lớn hơn hoặc bằng không.");
                } else if (checknamenull > 0) {
                    $('.erroe.sanphamer').addClass("bf");
                    $('.erroe.sanphamer').text("Tên hàng không được rỗng.");
                } else if (ktrungft == false) {
                    $('.erroe.strung').addClass("bf");
                    $('.erroe.strung').text("Trùng tên hàng hóa/dịch vụ.");
                } else {
                    $('.erroe.strung').text("");
                    $('.erroe.strung').removeClass("bf");
                    $('.erroe.sanphamer').text("");
                    $('.erroe.sanphamer').removeClass("bf");
                }


            }
        } else {
            if (checknamenull == 0 && tongtienaa > 0 && ktrungft == true && ktraSymbol2 == true && ktraMST2 == true && ktraDV2 == true && ktraAddress2 == true && ktraDateXuat3 == true && ktpayment2 == true) {
                $('.form-validate').submit();
                // $("#clickadd").css("pointer-events", "unset");
            } else {
                if (checknamenull > 0) {
                    $('.erroe.sanphamer').addClass("bf");
                    $('.erroe.sanphamer').text("Tên hàng không được rỗng.");
                } else if (tongtienaa <= 0) {
                    $('.erroe.sanphamer').addClass("bf");
                    $('.erroe.sanphamer').text("Tổng tiền phải lớn hơn không.");
                } else if (ktrungft == false) {
                    $('.erroe.strung').addClass("bf");
                    $('.erroe.strung').text("Trùng tên hàng hóa/dịch vụ.");
                } else {
                    $('.erroe.strung').text("");
                    $('.erroe.strung').removeClass("bf");
                    $('.erroe.sanphamer').text("");
                    $('.erroe.sanphamer').removeClass("bf");
                }
            }
        }
    });
}


var onChangeReg4 = function () {
    // $('#bilss').change(function() {
    //   ktraBill();
    // })
    $('#id_kihieu').change(function () {
        ktraSymbol();
    })
    $('#date1').change(function () {
        ktraDateXuatEdit();
    })
    $('#masothue').change(function () {
        ktraMST();
    })
    $('#tendonvi').change(function () {
        ktraDV();
    })
    $('#email').change(function () {
        ktraEmail();
    })
    $('#diachi').change(function () {
        ktraAddress();
    })
}




// var continueReg2 = function() {
//   var btnSubmit = $('#clickadd');
//   btnSubmit.on('click', function( e ) {
//     e.preventDefault();
//   var ktraBill2 = ktraBill();
//   var ktraSymbol2 = ktraSymbol();
//   var ktraMST2 = ktraMST();
//   var ktraDV2 = ktraDV();
//   var ktraNguoimua2 = ktraNguoimua();
//   var ktraEmail2 = ktraEmail();
//   var ktraAddress2 = ktraAddress();
//   var ktraSTK2 = ktraSTK();
//   var tongtienaa = $("#tongcongprice").val().replace(/[,.]/g, '');
//     if(tongtienaa > 0 && ktraBill2==true && ktraSymbol2==true && ktraMST2==true  && ktraDV2==true && ktraNguoimua2==true && ktraEmail2==true && ktraAddress2==true && ktraSTK2==true) {
//       $('.form-validate').submit();
//       // $("#clickadd").css("pointer-events", "unset");
//     }

//     else {
//       // $("#clickadd").css("pointer-events", "none");
//     }
//   });
// }



//validate điều chỉnh
var ktraLidodieuchinh = function () {
    var form_lydo = $.trim($('#lydodieuchinh').val());
    var ktraLDDCIV = true;

    if (form_lydo == "") {
        $('.elydo').addClass("bf");
        $('.elydo').text("Chưa nhập lý do điều chỉnh");
        ktraLDDCIV = false;
    } else {
        $('.elydo').removeClass("bf");
        $('.elydo').text("");
    }
    return ktraLDDCIV;
}

var ktraNoidungdieuchinh = function () {
    var form_nddc = $.trim($('#notesaudieuchinh').val());
    var ktraNDDCIV = true;

    if (form_nddc == "") {
        $('.enoidungdc').addClass("bf");
        $('.enoidungdc').text("Chưa nhập nội dung sau khi điều chỉnh");
        ktraNDDCIV = false;
    } else {
        $('.enoidungdc').removeClass("bf");
        $('.enoidungdc').text("");
    }

    return ktraNDDCIV;
}

var ktraLoaidieuchinh = function () {
    var form_loaidc = $.trim($('#loaidieuchinh').val());
    var ktraLoaiDC = true;

    if (form_loaidc == "") {
        $('.eldieuchinh').addClass("bf");
        $('.eldieuchinh').text("Chưa chọn kiểu điều chỉnh");
        ktraLoaiDC = false;
    } else {
        $('.eldieuchinh').removeClass("bf");
        $('.eldieuchinh').text("");
    }

    return ktraLoaiDC;
}

var continueReg2 = function () {
    var btnSubmit2 = $('#luudieuchinh');
    btnSubmit2.on('click', function (e) {
        e.preventDefault();
        var ktraLidodieuchinh2 = ktraLidodieuchinh();
        var ktraNoidungdieuchinh2 = ktraNoidungdieuchinh();
        var ktraLoaidieuchinh2 = ktraLoaidieuchinh();
        var ktraCoutIV3 = ktraCoutIv();
        var ktraMST2 = ktraMST();
        var ktraDV2 = ktraDV();
        var ktraAddress2 = ktraAddress();
        var ktraDateXuat2 = ktraDateXuat();
        var ktrungft = ktrattrung();
        var checknamenull = checkNameCodeProNull();
        var checktb = ($("#addproduct tbody").children("tr").length < 2);
        var tongtienaa = $("#tongcongprice").val().replace(/[,.]/g, '');


        if (checknamenull == 0 && tongtienaa >= 0 && ktrungft == true && ktraMST2 == true && ktraDV2 == true && ktraAddress2 == true && ktraLidodieuchinh2 == true && ktraDateXuat2 == true && ktraLoaidieuchinh2 == true && ktraCoutIV3 == true) {
            $('.form-validate').submit();
            // $("#clickadd").css("pointer-events", "unset");
        } else {
            console.log(tongtienaa);
            if (tongtienaa <= 0) {
                $('.erroe.sanphamer').addClass("bf");
                $('.erroe.sanphamer').text("Tổng tiền phải lớn hơn không.");
            } else if (ktrungft == false) {
                $('.erroe.strung').addClass("bf");
                $('.erroe.strung').text("Trùng tên hàng hóa/dịch vụ.");
            } else if (checknamenull > 0) {
                $('.erroe.sanphamer').addClass("bf");
                $('.erroe.sanphamer').text("Tên hàng/Thành tiền không được rỗng.");
            } else {
                $('.erroe.strung').text("");
                $('.erroe.strung').removeClass("bf");
                $('.erroe.sanphamer').text("");
                $('.erroe.sanphamer').removeClass("bf");
            }
        }
    });
}

var onChangeReg2 = function () {
    $('#lydodieuchinh').change(function () {
        ktraLidodieuchinh();
    })
    $('#loaidieuchinh').change(function () {
        ktraLoaidieuchinh();
    })
    $('#masothue').change(function () {
        ktraMST();
    })
    $('#date1').change(function () {
        ktraDateXuat();
    })
    $('#tendonvi').change(function () {
        ktraDV();
    })
    $('#diachi').change(function () {
        ktraAddress();
    })

}




//validate thay thế

var ktraLidothaythe = function () {
    var form_ldtt = $.trim($('#lydothaythe').val());
    var ktraLDTTIV = true;

    if (form_ldtt == "") {
        $('.elidothaythe').addClass("bf");
        $('.elidothaythe').text("Chưa nhập lý do thay thế");
        ktraLDTTIV = false;
    } else {
        $('.elidothaythe').removeClass("bf");
        $('.elidothaythe').text("");
    }

    return ktraLDTTIV;
}

var ktraNoidungthaythe = function () {
    var form_nddc = $.trim($('#notesauthaythe').val());
    var ktraNDTTIV = true;

    if (form_nddc == "") {
        $('.enoidungthaythe').addClass("bf");
        $('.enoidungthaythe').text("Chưa nhập nội dung sau khi thay thế");
        ktraNDTTIV = false;
    } else {
        $('.enoidungthaythe').removeClass("bf");
        $('.enoidungthaythe').text("");
    }

    return ktraNDTTIV;
}

var continueReg3 = function () {
    var btnSubmit3 = $('#luuthaythe');
    btnSubmit3.on('click', function (e) {
        e.preventDefault();
        var ktraLidothaythe2 = ktraLidothaythe();
        var ktraNoidungthaythe2 = ktraNoidungthaythe();
        var ktraCoutIV4 = ktraCoutIv();
        var ktraMST2 = ktraMST();
        var ktraDV2 = ktraDV();
        var ktraAddress2 = ktraAddress();
        var ktraDateXuat2 = ktraDateXuat();
        var ktrungft = ktrattrung();
        var checknamenull = checkNameCodeProNull();
        var tongtienaa = $("#tongcongprice").val().replace(/[,.]/g, '');
        var checktb = ($("#addproduct tbody").children("tr").length < 2);

        if (checknamenull == 0 && tongtienaa > 0 && ktrungft == true && ktraMST2 == true && ktraDV2 == true && ktraAddress2 == true && ktraDateXuat2 == true && ktraLidothaythe2 == true && ktraCoutIV4 == true) {
            $('.form-validate').submit();
            // $("#clickadd").css("pointer-events", "unset");
        } else {
            console.log(tongtienaa);
            if (tongtienaa <= 0) {
                $('.erroe.sanphamer').addClass("bf");
                $('.erroe.sanphamer').text("Tổng tiền phải lớn hơn không.");
            } else if (ktrungft == false) {
                $('.erroe.strung').addClass("bf");
                $('.erroe.strung').text("Trùng tên hàng hóa/dịch vụ.");
            } else if (checknamenull > 0) {
                $('.erroe.sanphamer').addClass("bf");
                $('.erroe.sanphamer').text("Tên hàng/Thành tiền không được rỗng.");
            } else {
                $('.erroe.strung').text("");
                $('.erroe.strung').removeClass("bf");
                $('.erroe.sanphamer').text("");
                $('.erroe.sanphamer').removeClass("bf");
            }
        }
    });
}

var onChangeReg3 = function () {
    $('#lydothaythe').change(function () {
        ktraLidothaythe();
    })
    $('#notesauthaythe').change(function () {
        ktraNoidungthaythe();
    })
    $('#date1').change(function () {
        ktraDateXuat();
    })
    $('#masothue').change(function () {
        ktraMST();
    })
    $('#tendonvi').change(function () {
        ktraDV();
    })
    $('#diachi').change(function () {
        ktraAddress();
    })

}




function clickbill(z) {
    var data = $(z).find('option:selected');
    var id_bill = $(z).val();
    // console.log(id_bill);
    $.ajax({
        type: "POST",
        url: "/ajax.php",
        data: {
            op: "bill",
            id_bill: id_bill
        },
        success: function (data) {
            $("#result-symbol").show();
            $("#result-symbol").html(data);
        }
    })
}

function clickivcategory(c) {
    var data = $(c).find('option:selected');
    var id_iv = $(c).val();
    $.ajax({
        type: "POST",
        url: "/ajax.php",
        dataType: "json",
        data: {
            op: "ivcategory",
            id_iv: id_iv
        },
        success: function (data) {
            $('input#result-ivcategory').val(data['serial']);
            $('input#result-ivcategory').attr('value', data['serial']);
            $('input#namehdcate').val(data['nameivcate']);
            $('input#namehdcate').attr('value', data['nameivcate']);
        }
    })
}

$("#tax_code_mst").click(function () {
    console.log('asdfasfasfsdsfas');
    var op = "infor_customer";
    var id_user = $("#tax_code").val();
    $.ajax({
        type: "POST",
        url: "/ajax.php",
        dataType: "json",
        data: {
            op: op,
            id_user: id_user
        },
        success: function (data) {
            if (data['success'] == 1) {
                $('input#tenkhang').val(data['masothue']);
                $('input#tenkhang').attr('value', data['masothue']);
                $('input#tendv').val(data['tenct']);
                $('input#tendv').attr('value', data['tenct']);
                $('input#diachi').val(data['diachi']);
                $('input#diachi').attr('value', data['diachi']);
            } else {
                alert('sss');
            }
            // $('input#fullname').val(data['ChuSoHuu']);
            // $('input#fullname').attr('value',data['ChuSoHuu']);

        }
    });
})

function checktaxCodeMST(ob) {
    var op = "infor_customer";
    var id_user = $("#tax_code").val();
    console.log(op, id_user);
    $.ajax({
        type: "POST",
        url: "/ajax.php",
        dataType: "json",
        data: {
            op: op,
            id_user: id_user
        },
        success: function (data) {
            if (data['success'] == 1) {
                $('input#fullname').val(data['masothue']);
                $('input#fullname').attr('value', data['masothue']);
                $('input#company_name').val(data['tenct']);
                $('input#company_name').attr('value', data['tenct']);
                $('input#address').val(data['diachi']);
                $('input#address').attr('value', data['diachi']);
            } else {
                alert('sss');
            }
            // $('input#fullname').val(data['ChuSoHuu']);
            // $('input#fullname').attr('value',data['ChuSoHuu']);

        }
    });
}


// $("#mst_invoice").click(function () {
//     var op = "invoice_getinfocus";
//     // var op = "infor_customer";
//     var id_user = $("#masothue").val();
//     $.ajax({
//         type: "POST",
//         url: "/ajax.php",
//         dataType: "json",
//         data: {
//             op: op,
//             id_user: id_user
//         },
//         success: function (data) {
//             if (data['success'] == 1) {
//                 $('input#tennguoimua').val(data['masothue']);
//                 $('input#tennguoimua').attr('value', data['masothue']);
//                 $('input#tendonvi').val(data['tenct']);
//                 $('input#tendonvi').attr('value', data['tenct']);
//                 $('input#diachi').val(data['diachi']);
//                 $('input#diachi').attr('value', data['diachi']);
//                 $('input#masothue1').val(id_user);
//                 $('input#masothue1').attr('value', id_user);
//             } else {
//                 alert('No result!');
//             }

//         }
//     });
// })

$("#searchnhanh").keyup(function () {
    var op = "customer";
    var id_op = $(this).val();
    if (id_op.length >= 3) {
        $.ajax({
            type: "POST",
            url: "/ajax.php",
            data: {
                op: op,
                id_op: id_op
            },
            success: function (data) {
                $("#suggesstion-box").show();
                $("#suggesstion-box").html(data);
            }
        });
    } else {
        $("#suggesstion-box").hide();
    }
});


$("#searsp").keyup(function () {
    var op = "product";
    var id_op = $(this).val();
    if (id_op.length >= 3) {
        $.ajax({
            type: "POST",
            url: "/ajax.php",
            data: {
                op: op,
                id_op: id_op
            },
            success: function (data) {
                $("#suggesstion-sp").show();
                $("#suggesstion-sp").html(data);
            }
        });
    } else {
        $("#suggesstion-sp").hide();
    }
});

$("#serifirst").change(function () {
    var seri_first = $(this).val();
    var format_serifirst = Math.round(seri_first);
    $(this).parent().find('#serifirst').val(format_serifirst);

    if (isNaN($(this).val())) {
        $("#errseri").addClass("bf");
        $("#errserifirt").text("Vui lòng nhập số.");
        document.getElementById("but_sub").disabled = true;
        return false;

    } else if ($(this).val() == "") {
        $("#quantitydd").val(0);
        $("#errserifirt").addClass("bf");
        $("#errserifirt").text("Số hóa đơn đầu không được để trống.");
        document.getElementById("but_sub").disabled = true;
        return false;

    } else if ($("#serilast").val() == "") {
        $("#quantitydd").val(0);
        document.getElementById("but_sub").disabled = true;
        return false;

    } else if (Number($(this).val()) >= Number($("#serilast").val())) {
        $("#errserifirt").removeClass("bf");
        $("#errserifirt").text("");
        $("#errseri").addClass("bf");
        $("#errseri").text("Vui lòng nhập số hóa đơn đầu có giá trị nhỏ hơn số hóa đơn cuối.");
        $("#quantitydd").val(0);
        document.getElementById("but_sub").disabled = true;
        return false;
    } else {
        $("#errseri").text("");
        $("#errserifirt").text("");
        $("#errserifirt").removeClass("bf");
        $("#errseri").removeClass("bf");

        var firtsts = $(this).val();
        var lasts = $("#serilast").val();
        var sls = (lasts - firtsts) + 1;

        $("#quantityddss").val(sl);

        $("#quantityddss").attr("value", sl);

        $("#quantitydd").val(sl);

        $("#quantitydd").attr("value", sl);
        document.getElementById("but_sub").disabled = false;
    }
})




$("#serilast").change(function () {
    var seri_last = $(this).val();
    var format_serilast = Math.round(seri_last);
    $(this).parent().find('#serilast').val(format_serilast);


    if (isNaN($(this).val())) {
        $("#errseri").addClass("bf");
        $("#errseri").text("Vui lòng nhập số.");
        document.getElementById("but_sub").disabled = true;
        return false;
    } else if ($(this).val() == "") {
        $("#quantitydd").val(0);
        $("#errserilsast").addClass("bf");
        $("#errserilsast").text("Số hóa đơn cuối không được để trống.");
        document.getElementById("but_sub").disabled = true;
        return false;

    } else if (Number($(this).val()) <= Number($("#serifirst").val())) {
        $("#errserilsast").removeClass("bf");
        $("#errserilsast").text("");
        $("#errseri").addClass("bf");
        $("#errseri").text("Vui lòng nhập số hóa đơn cuối có giá trị lớn hơn số hóa đơn đầu.");
        $("#quantitydd").val(0);
        document.getElementById("but_sub").disabled = true;
        return false;

    } else if ($("#serifirst").val() == "") {
        $("#quantitydd").val(0);
        document.getElementById("but_sub").disabled = true;
        return false;
    } else {
        $("#errseri").removeClass("bf");
        $("#errserilsast").removeClass("bf");
        $("#errserilsast").text("");
        $("#errseri").text("");
        var firtst = $("#serifirst").val();
        var last = $(this).val();
        var sl = (last - firtst) + 1;

        $("#quantityddss").val(sl);

        $("#quantityddss").attr("value", sl);

        $("#quantitydd").val(sl);

        $("#quantitydd").attr("value", sl);
        document.getElementById("but_sub").disabled = false;
    }

});


$(".yesdongia").click(function () {
    var n = $(".yesdongia:checked").length;
    if (n = 2) {
        $(".addclasshide").removeClass("hideload");
    }
})

$(".nodongia").click(function () {
    var n2 = $(".nodongia:checked").length;
    if (n2 = 1) {
        $(".addclasshide").addClass("hideload");
        $("#biendo").val(0);
        $("#biendo").attr("value", 0);

    }
})

$(".yesvat").click(function () {
    var n = $(".yesvat:checked").length;
    if (n = 2) {
        $(".addclasshide1").removeClass("hideload");
    }
})

$(".novat").click(function () {
    var n2 = $(".novat:checked").length;
    if (n2 = 1) {
        $(".addclasshide1").addClass("hideload");
        $("#biendovat").val(0);
        $("#biendovat").attr("value", 0);

    }
})

$(".yesdatesign").click(function () {
    var n = $(".yesdatesign:checked").length;
    if (n = 2) {
        $(".addoptionsign").removeClass("hideload");
    }
})

$(".nodatesign").click(function () {
    var n2 = $(".nodatesign:checked").length;
    if (n2 = 1) {
        $(".addoptionsign").addClass("hideload");
        $(".optiondatesign").removeAttr('checked');
    }
})

$(".smtpmail").click(function () {
    var nsmtp = $(".smtpmail:checked").length;

    if (nsmtp = 2) {
        $(".addclasshidesmtp").removeClass("hideload");
        $(".btnsendtestemail").removeClass("hideload");
    }
})


$(".phpmail").click(function () {
    var nmailphp = $(".phpmail:checked").length;

    if (nmailphp = 1) {
        $(".addclasshidesmtp").addClass("hideload");
        $(".btnsendtestemail").addClass("hideload");
        // $("#smtphost").val("");
        // $("#smtphost").attr("value", "");
        // $("#smtpuser").val("");
        // $("#smtpuser").attr("value", "");
        // $("#smtppassword").val("");
        // $("#smtppassword").attr("value", "");
    }
})

// $(".tokencode").click(function(){
//   var tokencd = $(".tokencode:checked").val();
//   if(tokencd = 2) {

//      // if(errusb != "" && debuger = ""){
//      //  $(".subjecttoken").addClass("hideload");
//      //  $(".notetoken").addClass("hideload");
//      //  $(".noteusbtoken").removeClass("hideload");
//      //  $(".notedebutoken").addClass("hideload");
//      // }else if (errusb = "" && debuger != ""){
//      //  $(".subjecttoken").addClass("hideload");
//      //  $(".notetoken").addClass("hideload");
//      //  $(".noteusbtoken").addClass("hideload");
//      //  $(".notedebutoken").removeClass("hideload");
//      // }else if (errusb != "" && debuger != ""){
//      //  $(".subjecttoken").addClass("hideload");
//      //  $(".notetoken").addClass("hideload");
//      //  $(".noteusbtoken").addClass("hideload");
//      //  $(".notedebutoken").removeClass("hideload");
//      // }
//      // else{
//      //  $(".subjecttoken").addClass("hideload");
//      //  $(".notetoken").removeClass("hideload");
//      //  $(".notedebutoken").addClass("hideload");
//      //  $(".noteusbtoken").addClass("hideload");
//      // }


//   }
//    var errusb = $("#errusb").val();
//    var debuger = $("#debuger").val();
//     console.log(errusb);
//     console.log(debuger);
// })

// $(".tokenusb").click(function() {
//     var tokenus = $(".tokenusb:checked").val();
//     console.log(tokenus);
//     if (tokenus == 1) {
//         $(".subjecttoken").removeClass("hideload");
//         $(".notetoken").addClass("hideload");
//         $(".noteusbtoken").addClass("hideload");
//         $(".notedebutoken").addClass("hideload");
//         $(".filecert").addClass("hideload");
//     }else if (tokenus == 3) {
//         $(".filecert").removeClass("hideload");
//         $(".notetoken").addClass("hideload");
//         $(".noteusbtoken").addClass("hideload");
//         $(".notedebutoken").addClass("hideload");
//         $(".subjecttoken").addClass("hideload");
//     }

// })


var ChuSo = new Array(" không", " một", " hai", " ba", " bốn", " năm", " sáu", " bảy", " tám", " chín");
var Tien = new Array("", " nghìn", " triệu", " tỷ", " nghìn tỷ", " triệu tỷ");

//1. Hàm đọc số có ba chữ số;
function DocSo3ChuSo(baso, parent = 1) {
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
            if ((chuc == 0) && (donvi != 0)) KetQua += " linh";
        }
    } else {
        KetQua += ChuSo[tram] + " trăm";
        if ((chuc == 0) && (donvi != 0)) KetQua += " linh";
    }

    if ((chuc != 0) && (chuc != 1)) {
        KetQua += ChuSo[chuc] + " mươi";
        if ((chuc == 0) && (donvi != 0)) KetQua = KetQua + " linh";
    }
    if (chuc == 1) KetQua += " mười";
    switch (donvi) {
        case 1:
            if ((chuc != 0) && (chuc != 1)) {
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

// function DocTienBangChu(SoTien) {
//     var lan = 0;
//     var i = 0;
//     var so = 0;
//     var KetQua = "";
//     var tmp = "";
//     var ViTri = new Array();
//     if (SoTien < 0) return "Số tiền âm !";
//     if (SoTien == 0) return "Không đồng !";
//     if (SoTien > 0) {
//         so = SoTien;
//     } else {
//         so = -SoTien;
//     }
//     if (SoTien > 8999999999999999) {
//         return "Số quá lớn!";
//     }
//     ViTri[5] = Math.floor(so / 1000000000000000);
//     if (isNaN(ViTri[5]))
//         ViTri[5] = "0";
//     so = so - parseFloat(ViTri[5].toString()) * 1000000000000000;
//     ViTri[4] = Math.floor(so / 1000000000000);
//     if (isNaN(ViTri[4]))
//         ViTri[4] = "0";
//     so = so - parseFloat(ViTri[4].toString()) * 1000000000000;
//     ViTri[3] = Math.floor(so / 1000000000);
//     if (isNaN(ViTri[3]))
//         ViTri[3] = "0";
//     so = so - parseFloat(ViTri[3].toString()) * 1000000000;
//     ViTri[2] = parseInt(so / 1000000);
//     if (isNaN(ViTri[2]))
//         ViTri[2] = "0";
//     ViTri[1] = parseInt((so % 1000000) / 1000);
//     if (isNaN(ViTri[1]))
//         ViTri[1] = "0";
//     ViTri[0] = parseInt(so % 1000);
//     if (isNaN(ViTri[0]))
//         ViTri[0] = "0";
//     if (ViTri[5] > 0) {
//         lan = 5;
//     } else if (ViTri[4] > 0) {
//         lan = 4;
//     } else if (ViTri[3] > 0) {
//         lan = 3;
//     } else if (ViTri[2] > 0) {
//         lan = 2;
//     } else if (ViTri[1] > 0) {
//         lan = 1;
//     } else {
//         lan = 0;
//     }
//     for (i = lan; i >= 0; i--) {
//         tmp = DocSo3ChuSo(ViTri[i]);
//         KetQua += tmp;
//         if (ViTri[i] > 0) KetQua += Tien[i];
//         if ((i > 0) && (tmp.length > 0)) KetQua += ','; //&& (!string.IsNullOrEmpty(tmp))
//     }
//     if (KetQua.substring(KetQua.length - 1) == ',') {
//         KetQua = KetQua.substring(0, KetQua.length - 1);
//     }
//     KetQua = KetQua.substring(1, 2).toUpperCase() + KetQua.substring(2);
//     return KetQua + " đồng"; //.substring(0, 1);//.toUpperCase();// + KetQua.substring(1);
// }

function LamTronSoXX(price) {
    // position = 0 lam tron den hang nghin
    // position = 1 lam tron den hang tram
    // position = 2 lam tron den hang chuc
    // position = 3 ko lam tron 
    var positionInput = document.getElementById("sothapphanlt");
    if (positionInput) {
        var valuePositionInput = positionInput.value;
    } else {
        var valuePositionInput = 1;
    }
    var price1 = parseInt(price);
    var result = ((price1 / valuePositionInput).toFixed(0)) * valuePositionInput;
    return result;
}



function clickgtgt(cg) {

    var op = "changegtgt";
    $.ajax({
        type: "POST",
        url: "/ajax.php",
        data: {
            op: op
        },
        success: function (data) {
            $(cg).parent().find(".load-vat").show();
            $(cg).parent().find(".load-vat").html(data);

        }
    });
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

function onchangSumtotal(q) {
    var valueinput = $(q).val();

    if (isNaN(valueinput)) {
        $(q).parent().find(".showerr").css("display", "flex");
        $(q).parent().find("p.minss").text("Phải nhập bằng số");
        $(q).val("");
    } else {
        $(q).parent().find(".showerr").css("display", "none");
    }

    $(q).change(function () {


        var giatrinhapvao = $(q).val();
        $(q).parent().css("position", "relative");

        var chuoiss = giatrinhapvao.replace(/[,.]/g, '');
        var priceinput = $(q).parent().find("input.price2").val();
        var priceinput2 = $(q).parent().find("input.price2").val(chuoiss);

        var biendolechvalue = Number($("#biendolech").val());
        if (biendolechvalue > 0 && priceinput != "") {
            var newbiendolech = Number(priceinput / 100 * biendolechvalue);
            var min = Number(priceinput) - Number(newbiendolech);
            var max = Number(priceinput) + Number(newbiendolech);
            if (chuoiss > max) {
                var maxs = max.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

            }
            if (chuoiss < min) {
                var mins = min.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
            }

            if (chuoiss < min || chuoiss > max) {
                var mins = min.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
                var maxs = max.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

                $(q).parent().find(".showerr").css("display", "flex");
                $(q).parent().find("p.minss").text("Min: " + mins);
                $(q).parent().find("p.maxss").text("Max: " + maxs);
                return false;
            } else {
                $(q).val(chuoiss.toString().replace(/\B(?=(\d{3})+(?!\d))/g, "."));
                $(".showerr").hide();
            }

        }



        var that = $(q).val();
        var chuoi = that.replace(/[,.]/g, '');

        if (chuoi > 0) {
            var formhd = $('#formhd').val();

            var soluong3 = formatSoLuongInvoice($(q).parent().parent().find(".sl1").val())[1];
            if (soluong3 == 0) {
                var soluong3 = 1;
            }
            var soluong2 = soluong3.replace(/[,]/g, '.');
            var valuevat3 = $(q).parents('tr').find(".vat1").val();


            if (formhd == 1) {
                if (isNaN(valuevat3)) {
                    var dongianoVAT = Math.round(Number(chuoi) / Number(soluong2));
                    var dongiaVAT = Math.round(Number(chuoi) / Number(1));
                    var thueGG = 0;
                } else {
                    var vattt = Number(100) - Number(valuevat3);
                    var dongianoVAT = Math.round((Number(chuoi) * Number(vattt)) / 100);
                    var dongiaVAT = Math.round(Number(chuoi) / Number(1));
                    var thueGG = Math.round((Number(chuoi) * Number(valuevat3)) / 100);

                }
                $(q).parents('tr').find(".price1").val(dongianoVAT.toString().replace(/\B(?=(\d{3})+(?!\d))/g, "."));
                $(q).parents('tr').find(".price2").attr("value", dongianoVAT);
                $(q).parents('tr').find(".thueGTGT").val(thueGG.toString().replace(/\B(?=(\d{3})+(?!\d))/g, "."));
                $(q).parents('tr').find(".thueGTGT2").attr("value", thueGG);
                $(q).parents('tr').find(".giavat1").val(dongiaVAT.toString().replace(/\B(?=(\d{3})+(?!\d))/g, "."));
                $(q).parents('tr').find(".giavat2").attr("value", dongiaVAT);

            }

            if (formhd == 2 || formhd == 12 || formhd == 10 || formhd == 5 || formhd == 6 || formhd == 15) {

                var dongianoVAT = Math.round(Number(chuoi) / Number(soluong2));
                var dongiaVAT = Math.round(Number(chuoi) / Number(1));

                $(q).parents('tr').find(".price1").val(dongianoVAT.toString().replace(/\B(?=(\d{3})+(?!\d))/g, "."));
                $(q).parents('tr').find(".giavat1").val(dongiaVAT.toString().replace(/\B(?=(\d{3})+(?!\d))/g, "."));
                $(q).parents('tr').find(".price2").attr("value", dongianoVAT);
                $(q).parents('tr').find(".giavat2").attr("value", dongiaVAT);
            }


            var tongck = 0;
            var tongck1 = 0;
            $('#addproduct .chietkhau2').each(function () {
                tongck2 = $(this).val().replace(/[,.]/g, '');
                tongck += Number(tongck2);
            });
            $('#addproduct .chietkhau1').each(function () {
                tongck11 = $(this).val().replace(/[,.]/g, '');
                tongck1 += Number(tongck11);
            });
            var sothapphan = $('#sothapphan').val();
            var sumthanhtien = tongck1 - tongck;
            var sumthanhtien2 = Math.round(sumthanhtien);

            var thuevat = $('#tong_thuevat').val();
            if (isNaN(thuevat)) {
                var thuevat = 0;
            }

            var phantramdv = $('.sumdv').val();
            if (phantramdv == "") {
                var thuedv = 0;
            } else {
                var thuedv = Math.round((Number(sumthanhtien2) * Number(phantramdv)) / 100);

            }
            var thuedv2 = Math.round(thuedv);
            var tongthuedv = Math.round((Number(thuedv) * Number(thuevat)) / 100);
            var tongcongtt = Math.round((Number(sumthanhtien2) * Number(thuevat)) / 100);

            var tongcongthuevadv = Number(tongthuedv) + Number(tongcongtt);
            var tongcongthuevadv2 = Math.round(tongcongthuevadv);


            var sumtt = (Number(sumthanhtien2) + Number(tongcongthuevadv2)) + Number(thuedv);
            var sumtt2 = sumtt;
            var formhd = $('#formhd').val();

            if (formhd == 1) {

                $("input#tongcongprice").val(sumthanhtien2.toString().replace(/\B(?=(\d{3})+(?!\d))/g, "."));
                $("input#tongcongprice1").val(sumthanhtien2);

                var giatriinput = $("#tongcongprice1").val();
                var docsotien = DocTienBangChu(giatriinput);
                $('input[name="bangchu"]').val(docsotien);
                $('input[name="bangchu2"]').val(docsotien);
                $('input[name="bangchu2"]').attr("value", docsotien);
            }

            if (formhd == 2 || formhd == 12 || formhd == 10 || formhd == 9 || formhd == 5 || formhd == 6 || formhd == 15) {

                $("input#tongtienthue").val(tongcongthuevadv2.toString().replace(/\B(?=(\d{3})+(?!\d))/g, "."));
                $("input#tongtienthuehid").val(tongcongthuevadv2);

                $("input#tienphidv").val(thuedv2.toString().replace(/\B(?=(\d{3})+(?!\d))/g, "."));
                $("input#tienphidv2").val(thuedv2);


                $("input#tongcongprice").val(sumtt2.toString().replace(/\B(?=(\d{3})+(?!\d))/g, "."));
                $("input#tongcongprice1").val(sumtt2);

                $("input#tongtienhoadon").val(sumthanhtien2.toString().replace(/\B(?=(\d{3})+(?!\d))/g, "."));
                $("input#tongtienhoadonhid").val(sumthanhtien2);

                tinh_TongCongTienThanhToan();

                var giatriinput = $("#tongcongprice1").val();
                var docsotien = DocTienBangChu(giatriinput);
                $('input[name="bangchu"]').val(docsotien);
                $('input[name="bangchu2"]').val(docsotien);
                $('input[name="bangchu2"]').attr("value", docsotien);

            }
        }
    })
}

function checkSumVat() {
    var sumcheckvat = 0;
    var priceVat = 0;
    var arrayPriceVat = [];
    $('.giavat3').each(function () {
        priceVat = $(this).val();
        var priceVatFix = priceVat.replace(/[,.]/g, '');
        arrayPriceVat.push(priceVatFix);
    })
    return arrayPriceVat;
}

function listPriceChangeVat() {
    var priceNoVat = 0;
    var arrayPriceNoVat = [];
    $('.price1').each(function () {
        priceNoVat = $(this).val();
        var priceVatFix = priceNoVat.replace(/[,.]/g, '');
        arrayPriceNoVat.push(priceVatFix);
    })
    return arrayPriceNoVat;
}

function listSoLuong() {
    var priceNoVat = 1;
    var arraySoLuong = [];
    $('.sl1').each(function () {
        priceNoVat = formatSoLuongInvoice($(this).val())[1];
        arraySoLuong.push(priceNoVat);
    })
    return arraySoLuong;
}




function changeVATPercent() {

    var sothapphan = $('#sothapphan').val();
    var tong_thuevat = parseInt($('#tong_thuevat').val());
    if (tong_thuevat > 0) {
        var newtongthue = 100 + tong_thuevat;
        var valuethue = tong_thuevat;
    } else {
        var newtongthue = 100;
        var valuethue = 0;
    }

    var tong_tienchuavat = 0;
    var tong_tiencovat = 0;
    var tong_thue = 0;
    //tính theo đơn giá có GTGT
    // $('.giavat3').each(function(){
    //          priceVat = $(this).val();
    //          var priceVatFix = parseInt(priceVat.replace(/[,.]/g, ''));
    //          var priceNoVat = (priceVatFix/newtongthue)*100;

    //          var priceFix = parseFloat(priceNoVat).toFixed(sothapphan).split(".");
    //          var priceFixHidden = parseFloat(priceNoVat).toFixed(sothapphan);
    //          $(this).parents('tr').find('.price1').val(priceFix.toString().replace(/\B(?=(\d{3})+(?!\d))/g, "."));
    //          $(this).parents('tr').find('.price2').attr("value", priceFixHidden);

    //         var soluong = parseFloat($(this).parents('tr').find('.sl1').val());
    //          var thanhTienTungSanPham = soluong*priceFixHidden;//0.2235
    //          var thanhTienTungSanPhamFix = parseFloat(thanhTienTungSanPham).toFixed(0).split(".");
    //          $(this).parents('tr').find('.thanhtien1').val(thanhTienTungSanPhamFix.toString().replace(/\B(?=(\d{3})+(?!\d))/g, "."));
    //          $(this).parents('tr').find('.thanhtien2').attr("value", thanhTienTungSanPhamFix);

    //         tong_tienchuavat = Number(tong_tienchuavat) + Number(thanhTienTungSanPhamFix);

    //          tong_tiencovat = Number(tong_tiencovat) + Number(thanhTienTungSanPhamFix);

    //      })
    //Tính theo đơn giá
    $('.price2').each(function () {
        priceNoVat = $(this).val();
        var priceNoVatFix = parseInt(priceNoVat.replace(/[,.]/g, ''));
        var priceVat = (priceNoVat / 100) * newtongthue;
        console.log(priceNoVat);

        var priceFixHidden = Math.round(priceVat);
        $(this).parents('tr').find('.giavat3').val(priceFixHidden.toString().replace(/\B(?=(\d{3})+(?!\d))/g, "."));
        $(this).parents('tr').find('.giavat4').attr("value", priceFixHidden);
    })

    var giatri_chietkhau = 0;
    $('.checkck2').each(function () {
        var chietkhau = $(this).val();
        if (chietkhau == 2) {
            giatri_chietkhau += Number($(this).parents('tr').find('.thanhtien2').val());
        }
    });

    $('.thanhtien2').each(function () {
        var thanhtientungsanpham = $(this).val();
        var chietkhau = $(this).parents('tr').find('.checkck2').val();
        if (chietkhau == 1) {
            tong_tienchuavat += Number(thanhtientungsanpham);
        } else {
            tong_tienchuavat -= Number(thanhtientungsanpham);
        }


    })


    var tiendv = $("#tienphidv2").val();
    if (tiendv == '') {
        tiendv = 0;
    }
    tong_tienchuavat += Math.round(Number(tiendv));


    var tong_tienhoadondichvu = $("#tongtienhoadonhid").val();
    var tong_tiencantinhthue = Number(tong_tienhoadondichvu) + Math.round(Number(tiendv));

    tong_thue = Math.round(tong_tiencantinhthue) * valuethue / 100;

    var tong_thueFix = Math.round(tong_thue);
    console.log(tong_thueFix);
    $("#tongtienthue").val(tong_thueFix.toString().replace(/\B(?=(\d{3})+(?!\d))/g, "."));
    $("#tongtienthuehid").attr("value", tong_thueFix);

    tong_tiencovat = Number(tong_tienhoadondichvu) + Number(tong_thueFix) + Math.round(Number(tiendv));
    var tong_tiencovatFix = Math.round(tong_tiencovat);
    $("#tongcongprice").val(tong_tiencovatFix.toString().replace(/\B(?=(\d{3})+(?!\d))/g, "."));
    $("#tongcongprice1").attr("value", tong_tiencovatFix);

    tinh_TongCongTienThanhToan();

    //----------------------------------------------------
    var giatriinput = $("#tongcongprice1").val();
    var docsotien = DocTienBangChu(giatriinput);
    $('input[name="bangchu"]').val(docsotien);
    $('input[name="bangchu2"]').val(docsotien);
    $('input[name="bangchu2"]').attr("value", docsotien);
}


function formatPriceUpdate(value = '') {

    if (value != '') {
        var check_isset = value.includes(",");
        if (check_isset == true) {
            var last = value.substring(value.lastIndexOf(",") + 1);
            var first = value.slice(0, value.lastIndexOf(","));
            var format_first = parseInt(first.replace(/[.]/g, '')); //77777

            var ledongia = $('#sothapphan').val(); //tại vì trong template truyền cho sothapphan là đơn giá lẻ
            var formhd = $('#formhd').val();
            if (formhd == 4 || formhd == 8 || formhd == 11 || formhd == 13 || formhd == 14) {
                var ledongia = $('#ledongia').val();
            }
            var finalPriceHidden = format_first + '.' + last;

            var finalPriceShow = 0;
            if (ledongia == 0) {
                var new_first = parseFloat(Number(finalPriceHidden)).toFixed(0);
                var finalPriceShowFirst = new_first.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
                finalPriceShow = finalPriceShowFirst;
                finalPriceHidden = new_first;
            } else {
                var roundFinalPrice = parseFloat(Number(finalPriceHidden)).toFixed(ledongia); //hidden
                var new_first = roundFinalPrice.toString().slice(0, roundFinalPrice.toString().lastIndexOf("."));
                var new_last = roundFinalPrice.toString().substring(roundFinalPrice.toString().lastIndexOf(".") + 1);

                var finalPriceShowFirst = new_first.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
                finalPriceShow = finalPriceShowFirst + ',' + new_last;
                finalPriceHidden = roundFinalPrice;
            }

            var results = [finalPriceShow, finalPriceHidden];
            return results;
        } else { //nếu nhập không có dấu , => vd nhập 1000000.789
            var ledongia = $('#sothapphan').val();
            var formhd = $('#formhd').val();
            if (formhd == 4 || formhd == 8 || formhd == 11 || formhd == 13 || formhd == 14) {
                var ledongia = $('#ledongia').val();
            }
            if (ledongia == 0) {
                var new_first = Math.round(value); // làm tròn số nhập vào //1000001
                var format_first = new_first.toString().replace(/\B(?=(\d{3})+(?!\d))/g, "."); // 1.000.001
                finalPriceShow = format_first;
                finalPriceHidden = new_first;
            } else {
                var new_first = parseFloat(value).toFixed(ledongia).split("."); // 1000000 và 79 (2 số tp)
                var first = new_first[0]; //1000000
                var last = new_first[1]; //79
                var format_first = first.toString().replace(/\B(?=(\d{3})+(?!\d))/g, "."); //1.000.000
                finalPriceShow = format_first + ',' + last; // 1.000.000,79
                finalPriceHidden = first + '.' + last; //1000000.79
            }
            results = [finalPriceShow, finalPriceHidden];
            console.log(results);
            return results;
        }
    } else {
        var results = [0, 0];
        return results;
    }
}



function changerpricenumber() {
    $(".price1").change(function (e) {

        var giatrinhapvao = $(this).val();

        $(this).parent().css("position", "relative");

        var chuoiss = giatrinhapvao.replace(/[,.]/g, '');
        var priceinput = $(this).parent().find("input.price2").val();
        var biendolechvalue = Number($("#biendolech").val());
        if (biendolechvalue > 0 && priceinput != "") {
            var newbiendolech = Number(priceinput / 100 * biendolechvalue);
            var min = Number(priceinput) - Number(newbiendolech);
            var max = Number(priceinput) + Number(newbiendolech);
            if (chuoiss < min || chuoiss > max) {
                var mins = min.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
                var maxs = max.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

                $(this).parent().find(".showerr").css("display", "flex");
                $(this).parent().find("p.minss").text("Min: " + mins);
                $(this).parent().find("p.maxss").text("Max: " + maxs);
                return false;

                if (chuoiss > max) {
                    $(this).val(max);

                }

            } else {
                // console.log('bbb');
                $(".showerr").hide();
            }

        }
    })
}

function formatCurrencyws(number) {
    var n = number.split('').reverse().join("");
    var n2 = n.replace(/\d\d\d(?!$)/g, "$&,");
    return n2.split('').reverse().join('');
}

function search_sp_ajax(ob) {


    var ob = ob;
    var that = $(ob).parent().find(".suggesstion-sp");

    // console.log(idform);
    var length = 1;
    // alert('aaa');
    $(ob).bind("keyup click", function () {
        var fruits = [];
        var op = "product";
        var id_op = $(this).val();
        if (id_op == "'") {
            id_op = '';
            $(this).val(id_op);
        }
        if (id_op.length >= 3) {
            if ($('.id_sp').length !== 0) {
                $('.id_sp').each(function () {
                    fruits.push($(this).val());

                });
            }
            $.ajax({
                type: "POST",
                url: "/ajax.php",
                data: {
                    op: op,
                    id_op: id_op,
                    fruits: fruits
                },
                success: function (data) {
                    $(that).show();
                    $(that).html(data);
                }
            });
        } else {
            $(that).hide();
        }
    });
}

function clickDonViTinh(ob) {
    var product_name = $(ob).data('name');
    $(ob).parents('tr').find('.donvt1').val(product_name);
    $('.load-dvt').hide();
}



jQuery.fn.putCursorAtEnd = function () {

    return this.each(function () {

        // Cache references
        var $el = $(this),
            el = this;

        // Only focus if input isn't already
        if (!$el.is(":focus")) {
            $el.focus();
        }

        // If this function exists... (IE 9+)
        if (el.setSelectionRange) {

            // Double the length because Opera is inconsistent about whether a carriage return is one character or two.
            var len = $el.val().length * 2;

            // Timeout seems to be required for Blink
            setTimeout(function () {
                el.setSelectionRange(len, len);
            }, 1);

        } else {

            // As a fallback, replace the contents with itself
            // Doesn't work in Chrome, but Chrome supports setSelectionRange
            $el.val($el.val());

        }

        // Scroll to the bottom, in case we're in a tall textarea
        // (Necessary for Firefox and Chrome)
        this.scrollTop = 999999;

    });

};

(function () {

    var searchInput = $("#search");

    searchInput
        .putCursorAtEnd() // should be chainable
        .on("focus", function () { // could be on any event
            searchInput.putCursorAtEnd()
        });

})();



function scrollLoadUser() {
    $('.loadusertask12').scroll(function () {
        if ($('.loadusertask12').scrollTop() > 0) {
            var sumnumchat = $('input#numloaduser').val();
            var newsumchat = Number(sumnumchat) + 10;
            $('input#numloaduser').val(newsumchat);
            $('input#numloaduser').attr('value', newsumchat);
        }
    });
}

function goBackPage() {
    window.history.back();
}

function changeColor(color, color_opa) {
    $('#changeColor').empty().append(":root{" +
        "--primary-color:" + color + ";--primary-color-opacity:" + color_opa + ";}")
}
// function fromday(val){
//    $('#to').val(val);
// }



function clicknhavien1(ob) {
    var parent_tag = $(ob).parents('.new-popup-chat');
    var content = $(ob).html();
    var id_user = $(ob).data('id');
    var html = '<div class="childselected sid--time">' +
        '<div><input type="hidden" name="usertochat[]" class="chatuser" value="' + id_user + '" />' +
        content + '</div><span class="close-sid" onClick="close_sid1(this)">x</span></div>';
    $(parent_tag).find('#list-user-selected').append(html);
    $(parent_tag).find('#load-user-select').css('display', 'none');
    $(parent_tag).find('#search-user').val('');
}

function clickthanhvien1(ob) {
    var parent_tag = $(ob).parents('#listUserGrou');
    var content = $(ob).html();
    var id_user = $(ob).data('id');
    var html = '<div class="chlselected sid--time">' +
        '<div><input type="hidden" name="usertoadd[]" class="addgroupuser" value="' + id_user + '" />' +
        content + '</div><span class="close-sid" onClick="close_sidw1(this)">x</span></div>';
    $(parent_tag).find('#listthanhvienselected').append(html);
    $(parent_tag).find('#loadthanhvienselect').css('display', 'none');
    $(parent_tag).find('#searchtoadd').val('');
}

function close_sid(that) {
    $(that).parents('.sid').remove();
    $('#search-nvul').removeAttr("disabled");
    $('.checkin-edit').removeAttr("disabled");
}

function close_taskselecs(that) {
    $(that).parents('.taskselecs').remove();
}

function close_sid1(that) {
    $(that).parents('.childselected').remove();
}

function close_sidw1(that) {
    $(that).parents('.chlselected').remove();
}

function selectEvent(val) {
    $("#search-box").val(val);
    $("#suggesstion-box").hide();
}

function clickaddnpp(ob) {
    var parent_tag = $(ob).parents('.parent_ajax');
    var id = $(parent_tag).find('[id*="search-npp-"]').attr('id');
    var content = $(ob).html();
    var id_user = $(ob).data('id');
    var html = '<div class="sid"><input type="hidden" name="user_' + id + '[]" value="' + id_user + '" /> ' + content + '<span class="close-sid" onClick="close_sid(this)">x</span></div>';
    $(parent_tag).find('#result-user').append(html);
    $(parent_tag).find('#suggesstion-box').css('display', 'none');
    $(parent_tag).find('#search-npp').val('');
}

function clicknhavien(ob) {
    var parent_tag = $(ob).parents('.shareform');

    var content = $(ob).html();
    var id_user = $(ob).data('id');
    var html = '<div class="sid sid--time">' +
        '<div><input type="hidden" name="user[]" class="shareuser" value="' + id_user + '" />' +
        content + '</div><span class="close-sid" onClick="close_sid(this)">x</span></div>';
    $(parent_tag).find('#result-user').append(html);
    $(parent_tag).find('#suggesstion-box').css('display', 'none');
    $(parent_tag).find('#search-npp').val('');
    $('button.sharebtn').removeClass('hidden-pop');

}

function clickcustomer(nv) {
    var id_user = $(nv).data('id');
    var op = "inforcustomer";
    $('#searchnhanh').val($(nv).data('name'));
    $('#searchnhanh').attr('value', $(nv).data('name'));
    $('#result-user').hide();
    $.ajax({
        type: "POST",
        url: "/ajax.php",
        dataType: "json",
        data: {
            op: op,
            id_user: id_user
        },
        success: function (data) {
            if (data['success'] == 0) {
                $('input#masothue').val(data['masothue']);
                $('input#masothue').attr('value', data['masothue']);
                $('input#tendonvi').val(data['donvi']);
                $('input#tendonvi').attr('value', data['donvi']);
                $('input#tennguoimua').val(data['name']);
                $('input#tennguoimua').attr('value', data['name']);
                $('input#email').val(data['email']);
                $('input#email').attr('value', data['email']);
                $('input#diachi').val(data['address']);
                $('input#diachi').attr('value', data['address']);
                $('input#sotaikhoan').val(data['stk']);
                $('input#sotaikhoan').attr('value', data['stk']);
                $('input#id_customer').val(data['id_customer']);
                $('input#id_customer').attr('value', data['id_customer']);

            }

        }
    });

}


function clickkhonhanhang(kho) {

    var id_kho = $(kho).val();
    // console.log(id_kho);
    var op = "inforkho";
    $.ajax({
        type: "POST",
        url: "/ajax.php",
        dataType: "json",
        data: {
            op: op,
            id_kho: id_kho
        },
        success: function (data) {
            if (data['success'] == 0) {
                $('input#masothuekhonhan').val(data['masothue']);
                $('input#masothuekhonhan').attr('value', data['masothue']);
                $('input#diachikhonhan').val(data['diachikho']);
                $('input#diachikhonhan').attr('value', data['diachikho']);
                $('input#name_khoout').val(data['namekho']);
                $('input#name_khoout').attr('value', data['namekho']);
            }
        }
    });

}

function clickkhoxuathang(kho) {

    var id_kho = $(kho).val();
    var op = "inforkho";
    $.ajax({
        type: "POST",
        url: "/ajax.php",
        dataType: "json",
        data: {
            op: op,
            id_kho: id_kho
        },
        success: function (data) {
            if (data['success'] == 0) {
                $('input#diachikhoxuat').val(data['diachikho']);
                $('input#diachikhoxuat').attr('value', data['diachikho']);
                $('input#name_khoinv').val(data['namekho']);
                $('input#name_khoinv').attr('value', data['namekho']);
            }
        }
    });

}


$("#lidokm").on('click', function () {
    //console.log('aaa');
    if ($("#lidokm").is(':checked')) {
        $("input.checklidokm2").val(2);
        $(".addoptionlidokm").removeClass("hideload");
    } else {
        $("input.checklidokm2").val(1);
        $(".addoptionlidokm").addClass("hideload");
    }
});

function clicknhavientask(ob) {
    var parent_tag = $(ob).parents('#memberadd');


    var content = $(ob).html();
    var id_user = $(ob).data('id');
    var html = '<div class="taskselecs sid--timet">' +
        '<div><input type="hidden" name="usertask[]"  value="' + id_user + '" />' +
        content + '</div><span class="close-sid" onClick="close_taskselecs(this)">x</span></div>';
    $(parent_tag).find('#result-usertask').append(html);
    $(parent_tag).find('#suggesstion-boxtask').css('display', 'none');
    $(parent_tag).find('#memberaddtask').val('');

}

function MM_sortField(targ, osk, sk, sd) {
    var url = document.location.href;
    url = url.replace('&sk=' + osk, '');
    url = url.replace('&sk=' + sk, '');
    url = url.replace('&sd=ASC', '');
    url = url.replace('&sd=DESC', '');
    url = url.replace('&ecode=', '&code=');
    url = url.replace('&rcode=', '&code=');
    eval(targ + ".location='" + url + "&sk=" + sk + "&sd=" + sd + "'");
}

function xoaoption(ob) {

    var name = $(ob).val();
    var op = "size";
    var pid = $(ob).data('id');
    $.ajax({
        type: 'get',
        url: '/ajax.php',
        data: {
            name: name,
            op: op,
            pid: pid
        },
        success: function (data11) { }
    })

}

function MM_jumpMenu(targ, selObj, restore) { //v3.0
    eval(targ + ".location='" + document.location.href + '&ipp=' + selObj.options[selObj.selectedIndex].value + "'");
    if (restore) selObj.selectedIndex = 0;

    let selected_html = document.querySelector('#pagenumber')

    updateEstoreIPP(selObj.options[selObj.selectedIndex].value, selected_html.getAttribute('data-action'));
}

function MM_jump(targ, selObj, url) {
    document.getElementById(targ).src = url + selObj.options[selObj.selectedIndex].value;
}
function showFieldValueControl(selObj, id) {
    if (selObj.options[selObj.selectedIndex].value == 4 || selObj.options[selObj.selectedIndex].value == 5 || selObj.options[selObj.selectedIndex].value == 6 || selObj.options[selObj.selectedIndex].value == 7) {
        document.getElementById(id).className = "";
    } else document.getElementById(id).className = "hidden";
}
// function showFieldValueControl(selObj, id) {
//     if (selObj.options[selObj.selectedIndex].value > 3) {
//         document.getElementById(id).className = "";
//     } else document.getElementById(id).className = "hidden";
// }

function showFieldValueControl2(selObj) {
    if (selObj.options[selObj.selectedIndex].value > 3) {
        document.getElementById('value_p').className = "";
        document.getElementById('value_wysiwyg_p').className = "hidden";
        document.getElementById('value_textarea_p').className = "hidden";
        document.getElementById('value_textbox_p').className = "hidden";
    } else if (selObj.options[selObj.selectedIndex].value == 3) {
        document.getElementById('value_p').className = "hidden";
        document.getElementById('value_wysiwyg_p').className = "";
        document.getElementById('value_textarea_p').className = "hidden";
        document.getElementById('value_textbox_p').className = "hidden";
    } else if (selObj.options[selObj.selectedIndex].value == 2) {
        document.getElementById('value_p').className = "hidden";
        document.getElementById('value_wysiwyg_p').className = "hidden";
        document.getElementById('value_textarea_p').className = "";
        document.getElementById('value_textbox_p').className = "hidden";
    } else {
        document.getElementById('value_p').className = "hidden";
        document.getElementById('value_wysiwyg_p').className = "hidden";
        document.getElementById('value_textarea_p').className = "hidden";
        document.getElementById('value_textbox_p').className = "";
    }
}

function showControl(id) {
    document.getElementById(id).className = "";
}

// JavaScript Document
function checkSelect(ojSelect, text) {
    var k;
    for (k = ojSelect.options.length - 1; k >= 0; k--) {
        if (ojSelect.options(k).value == text) {
            ojSelect.options(k).selected = true;
            return true;
        }
    }
    return false;
}


function checkValue(ojSelect, value) {
    var k;
    for (k = ojSelect.options.length - 1; k >= 0; k--) {
        if (ojSelect.options(k).value == value) {
            ojSelect.options(k).selected = true;
            return true;
        }
    }
    return false;
}

function checkRadio(ojSelect, value) {
    var k;
    for (k = ojSelect.length - 1; k >= 0; k--) {
        if (ojSelect(k).value == value) {
            ojSelect(k).checked = true;
            return true;
        }
    }
    return false;
}

function checkCheck(ojSelect, value) {
    var k;
    if (ojSelect.value == value) {
        ojSelect.checked = true;
        return true;
    }
    return false;
}
/* cach su dung 
<script language="javascript" >
  var oj = document['tenForm']['tenSelect'];
  checkSelect(oj,'{TinhTrang}');
</script>
*/

$('#tinhThanh1').change(function () {
    var id_tinh = $(this).val();
    var op = "tinhthanh";
    $.ajax({
        type: 'post',
        url: '/ajax.php',
        data: {
            op: op,
            id_tinh: id_tinh
        },
        success: function (data) {
            $('#load_huyen').html(data);
            console.log(data);
        }
    })
})


function toggleAllChecks(formName, prefix) {
    n = "all";

    if (prefix) {
        n = prefix + n;
    }
    i = 0;
    e = document.getElementById(n);
    s = e.checked;
    f = document.getElementById(formName);

    while (e = f.elements[i]) {
        if (e.type == "checkbox" && e.id != n) {
            if (!prefix || e.id.indexOf(prefix) != -1) {
                e.checked = s;
            }
        }

        i++;
    }
}

function toggleAllChecksPrefix(formName, prefix) {
    n = "all";

    if (prefix) {
        n = prefix + '_' + n;
    }
    i = 0;
    e = document.getElementById(n);
    s = e.checked;
    f = document.getElementById(formName);

    while (e = f.elements[i]) {
        if (e.type == "checkbox" && e.id != n) {
            if (e.id.indexOf(prefix) != -1) {
                e.checked = s;
            }
        }
        i++;
    }
}

function formSubmit(form, vmod, vdo, vid) {
    //alert('hi');
    f = document.getElementById(form);
    f.mod.value = vmod;
    f.doo.value = vdo;
    f.id.value = vid;
    f.submit();
}

function formSubmitCancel(form, vmod, vdo, vid) {
    //alert('hi');
    let lydo = prompt('Nhập lý do hủy:');
    if (lydo != null) {
        f = document.getElementById(form);
        f.mod.value = vmod;
        f.doo.value = vdo;
        f.id.value = vid;
        f.lydo.value = lydo;
        f.submit();
    }
}

function activeSubmit(form) {
    f = document.forms(form);
    f.plus.value = "active";
    f.submit();
}


function formSubmitDelNotSign(form, vmod, vdo, vid, vnameform) {
    //alert('hi');
    f = document.getElementById(form);
    f.mod.value = vmod;
    f.doo.value = vdo;
    f.id.value = vid;
    f.tenform.value = vnameform;
    f.submit();
}


function formatCurrency(id) {
    var variable = document.getElementById(id);
    num = variable.value.toString().replace(/\$|\,/g, "");
    if (isNaN(num)) num = "0";
    sign = (num == (num = Math.abs(num)));
    num = Math.floor(num * 100 + 0.50000000001);
    cents = num % 100;
    num = Math.floor(num / 100).toString();
    if (cents < 10) cents = "0" + cents;
    var maxi = Math.floor((num.length - 1) / 3);
    for (var i = 0; i < maxi; i++)
        num = num.substring(0, num.length - 4 * i - 3) + ',' + num.substring(num.length - 4 * i - 3);
    variable.value = (sign ? '' : '-') + num + '.' + cents;
}

function showProgressBar(elementToHide) {
    button = document.getElementById(elementToHide);
    button.style.display = "none";
    bar = document.getElementById("status_bar");
    bar.style.display = "block";
}

/**
 * resets the user picture/avatar in the profile page
 */
function resetAvatarPicture() {
    window.document.updateConfig.avatarId.value = 0;
    // and reload the image path
    window.document.updateConfig.avatarPicture.src = '/images/nophoto.gif';
}

function avatarPictureSelectWindow() {
    width = 500;
    height = 450;

    x = parseInt(screen.width / 2.0) - (width / 2.0);
    y = parseInt(screen.height / 2.0) - (height / 2.0);

    UserPicture = window.open('?op=manage&act=compactListResource&objectId=Avatar', 'AvatarPictureSelect', 'top=' + y + ',left=' + x + ',scrollbars=yes,resizable=yes,toolbar=no,height=' + height + ',width=' + width);
}

function returnAvatarResourceInformation(resId, url) {
    // set the picture id
    parent.opener.document.updateConfig.avatarId.value = resId;
    // and reload the image path
    parent.opener.document.updateConfig.avatarPicture.src = url;
}

/**
 * resets the map picture in the profile page
 */
function resetMapPicture() {
    window.document.updateMap.mapId.value = 0;
    // and reload the image path
    window.document.updateMap.mapPicture.src = '/images/nophoto.gif';
}

function mapPictureSelectWindow() {
    width = 500;
    height = 450;

    x = parseInt(screen.width / 2.0) - (width / 2.0);
    y = parseInt(screen.height / 2.0) - (height / 2.0);

    UserPicture = window.open('?op=manage&act=compactListResource&objectId=Map', 'MapPictureSelect', 'top=' + y + ',left=' + x + ',scrollbars=yes,resizable=yes,toolbar=no,height=' + height + ',width=' + width);
}

function returnMapResourceInformation(resId, url) {
    // set the picture id
    parent.opener.document.updateMap.mapId.value = resId;
    // and reload the image path
    parent.opener.document.updateMap.mapPicture.src = url;
}

function actionSubmit(form, action) {
    f = document.getElementById(form);
    f.plus.value = action;
}

function changePosition(form, id) {
    f = document.getElementById(form);
    control = document.getElementById('position_' + id);
    f.plus.value = 'changePosition';
    f.cId.value = id;
    f.position.value = control.value;
    f.submit();
}



function getYear() {
    debugger;
    var $valthang = $("#quythang").val();
    var $valnam = $("#year").val();
    var $masanpham = $("#masanpham").val();
    var $tensanpham = $("#tensanpham").val();
    var $searchnhanh = $("#searchnhanh").val();
    var $exportGhiChu = $("#exportGhiChu").is(":checked") ? 1 : 0;
    var $startDate = $("#startDate").val();
    var $endDate = $("#endDate").val();
    var masothue = $("#masothue").val();
    var namedv = $("#namedv").val();
    var name_cus = $("#name_cus").val();
    var keySearch = "";
    if (masothue) {
        keySearch += '&masothue=' + encodeURIComponent(masothue) + '';
    }
    if (namedv) {
        keySearch += '&namedv=' + encodeURIComponent(namedv.trim()) + '';
    } if (name_cus) {
        keySearch += '&name_cus=' + encodeURIComponent(name_cus.trim()) + '';
    }
    if (!$searchnhanh) {
        $searchnhanh = "";
    }
    if (!$masanpham) {
        $masanpham = "";
    }
    if (!$tensanpham) {
        $masanpham = "";
    }
    var test = 'admin.php?op=manage&act=invoicelist&mod=reporttotal&cate=viewexcel&month=' + $valthang + '&year=' + $valnam + keySearch;
    console.log(test);
    if (($valnam == "" || $valthang == "") && ($startDate == "" || $endDate == "")) {
        $("#controlview").hide();
    }
    else {
        $("#controlview").show();
        $("#viewexcelimport").attr("href", '/admin.php?op=manage&act=invoicelist&mod=notify&cate=viewexcelimport&month=' + $valthang + '&year=' + $valnam + '');
        $("#viewexcelnotify").attr("href", '/admin.php?op=manage&act=invoicelist&mod=notify&cate=viewexcelnotify&month=' + $valthang + '&year=' + $valnam + '');
        $("#viewexcel").attr("href", '/admin.php?op=manage&act=invoicelist&mod=report&cate=viewexcel&month=' + $valthang + '&year=' + $valnam + '');
        $("#viewpdf").attr("href", '/admin.php?op=manage&act=invoicelist&mod=report&cate=viewpdf&month=' + $valthang + '&year=' + $valnam + '');
        $("#viewexceltotal").attr("href", '/admin.php?op=manage&act=invoicelist&mod=reporttotal&cate=viewexcel&month=' + $valthang + '&year=' + $valnam + keySearch + '');
        $("#viewpdftotal").attr("href", '/admin.php?op=manage&act=invoicelist&mod=reporttotal&cate=viewpdf&month=' + $valthang + '&year=' + $valnam + keySearch + '');
        $("#viewexcelreporttotalvat").attr("href", '/admin.php?op=manage&act=invoicelist&mod=reporttotalvat&cate=viewexcel&month=' + $valthang + '&year=' + $valnam + '');
        $("#viewexcelreporttotalvattest").attr("href", '/admin.php?op=manage&act=invoicelist&mod=reporttotalvattest&cate=viewexcel&month=' + $valthang + '&year=' + $valnam + '');
        $("#viewpdfreporttotalvat").attr("href", '/admin.php?op=manage&act=invoicelist&mod=reporttotalvat&cate=viewpdf&month=' + $valthang + '&year=' + $valnam + '');
        $("#viewpdfnotify").attr("href", '/admin.php?op=manage&act=invoicelist&mod=notify&cate=viewpdfnotify&month=' + $valthang + '&year=' + $valnam + '');
        $("#viewpdfcustomer").attr("href", '/admin.php?op=manage&act=invoicelist&mod=customer&cate=viewpdfnotify&month=' + $valthang + '&year=' + $valnam + '&khachhang=' + $searchnhanh + '&masanpham=' + $masanpham + '&tensanpham=' + $tensanpham + '');
        $("#viewxmlnotify").attr("href", '/admin.php?op=manage&act=invoicelist&mod=notify&cate=viewxmlnotify&month=' + $valthang + '&year=' + $valnam + '');
        $("#viewxmlcustomer").attr("href", '/admin.php?op=manage&act=invoicelist&mod=customer&cate=viewxml&month=' + $valthang + '&year=' + $valnam + '');
        $("#viewpdfsku").attr("href", '/admin.php?op=manage&act=invoicelist&mod=sku&cate=viewpdfsku&month=' + $valthang + '&year=' + $valnam + '');
        $("#viewexcelsku").attr("href", '/admin.php?op=manage&act=invoicelist&mod=sku&cate=viewexcelsku&month=' + $valthang + '&year=' + $valnam + '');
        $("#exportDelivery").attr("href", '/admin.php?op=newdelivery&act=new&mod=export&cate=viewexcel&month=' + $valthang + '&year=' + $valnam + '');
        // $("#viewexcel_samevat").attr("href", '/admin.php?op=manage&act=invoicelist&mod=report_samevat&cate=viewexcel&month=' + $valthang + '&year=' + $valnam + '');
        $("#dowloadmunti").attr("href", '/admin.php?op=manage&act=invoice&mod=dowloadmunti&doo=submit&month=' + $valthang + '&year=' + $valnam + '');
        $("#viewexcel_samevat").attr("href", '/admin.php?op=manage&act=invoicelist&mod=report_samevat&cate=viewexcel&month=' + $valthang + '&year=' + $valnam + '&startDate=' + $startDate + '&endDate=' + $endDate + '&exportGhiChu=' + $exportGhiChu + '');


    }

}
// custom
$("body").click(function () {
    $(".load-vat").hide()
});


function OpenModalNoti() {
    $('#maintenancenoti').modal('toggle');
}

function OpenModalNotiUpdateVersion() {
    $('#maintenance_update_version').modal('toggle');
}

function SelectVault1(ob) {
    // $("#masothuekhonhan").val('');
    // $("#diachikhonhan").val('');
    // $("#name_khoout").val('');
    // $('#load_vault').html('');
    var id_vault = $(ob).val();
    var op = "vault";

    $.ajax({
        type: 'post',
        url: '/ajax.php',
        dataType: "json",
        data: {
            op: op,
            id_vault: id_vault
        },
        success: function (data) {
            if (data['success'] == 1) {
                $('input#diachikhoxuat').val(data['diachikho']);
                $('input#diachikhoxuat').attr('value', data['diachikho']);
                $('input#name_khoinv').val(data['namekho']);
                $('input#name_khoinv').attr('value', data['namekho']);
                ktraKhoXuatAddr();
                // var html = '';
                // $('ul.listNotiul').html('');
                // html += "<select class='form-control' name='khonhanhang' id='khonhanhang' onchange='clickkhonhanhang(this)'>";
                // html += "<option value='0' selected>Chọn kho nhận hàng</option>";
                // $.each(data['listkhonhan'], function (key, data1) {
                //     html += "<option value='" + data1['id'] + "'>" + data1['name'] + "</option>";
                // });
                // html += "</select>";
                // $('#load_vault').append(html);
            } else {
                // var html = '';
                // $('ul.listNotiul').html('');
                // html += "<select class='form-control' name='khonhanhang' id='khonhanhang' onchange='clickkhonhanhang(this)'>";
                // html += "<option value='0' selected>Chọn kho nhận hàng</option>";
                // html += "</select>";
                // $('#load_vault').append(html);
            }
        }
    })

}

function SelectVault2(ob) {
    var id_vault = $(ob).val();
    var op = "vault";

    $.ajax({
        type: 'post',
        url: '/ajax.php',
        dataType: "json",
        data: {
            op: op,
            id_vault: id_vault
        },
        success: function (data) {
            if (data['success'] == 1) {
                $('input#diachikhonhan').val(data['diachikho']);
                $('input#diachikhonhan').attr('value', data['diachikho']);

                $('input#name_khoout').val(data['namekho']);
                $('input#name_khoout').attr('value', data['namekho']);

                $('input#idNameOut').val(data['id']);
                $('input#idNameOut').attr('value', data['id']);
                // ktraKhoXuatAddr();
            } else {
            }
        }
    })
}

function autoShowAddressOfWarehouseCat() {
    let checkFormTest = document.querySelector('#checkFormTest')// Sau này chuyển sang form mới rồi thì bỏ if ở dưới
    if (checkFormTest) {
        //Hàm này thực hiện lấy địa chỉ kho nhận hàng với id select của kho nhận hàng tự động
        var id_vault = $('#khonhanhang').val();
        var op = "vault";

        $.ajax({
            type: 'post',
            url: '/ajax.php',
            dataType: "json",
            data: {
                op: op,
                id_vault: id_vault
            },
            success: function (data) {
                if (data['success'] == 1) {
                    // $('input#diachikhonhan').val(data['diachikho']);
                }
                else {
                }
            }
        })

        //Hàm này thực hiện lấy địa chỉ kho xuất hàng với id select của kho xuất hàng tự động
        var id_vault = $('#khoxuathang').val();
        var op = "vault";

        $.ajax({
            type: 'post',
            url: '/ajax.php',
            dataType: "json",
            data: {
                op: op,
                id_vault: id_vault
            },
            success: function (data) {
                if (data['success'] == 1) {
                    // $('input#diachikhoxuat').val(data['diachikho']);
                }
                else {
                }
            }
        })
    }
}
autoShowAddressOfWarehouseCat()

function autoShowWarehouseCategory(ob, status_different) {
    let checkFormTest = document.querySelector('#checkFormTest')// Sau này chuyển sang form mới rồi thì bỏ if ở dưới
    let inputAction = "autoShowWarehouseCategory";
    let op = "inventory_warehouse";

    if (checkFormTest) {
        $.ajax({
            type: "POST",
            url: "/ajax.php",
            data: {
                op: op,
                inputAction: inputAction,
                value: { data_action: status_different }
            },
            success: function (data) {
                let parseData = JSON.parse(data);
                let div_khoxuathang = document.querySelector('#khoxuathang')
                let div_khonhanhang = document.querySelector('#khonhanhang')


                if (status_different == "status_inv") {
                    div_khoxuathang.innerHTML = ""
                    div_khoxuathang.insertAdjacentHTML('beforeend', parseData['html']);
                }
                else if (status_different == "status_out") {
                    div_khonhanhang.innerHTML = ""
                    div_khonhanhang.insertAdjacentHTML('beforeend', parseData['html']);
                }
                // $("#khoxuathang").html(parseData['html']);
            }
        });
    }

}
// autoShowWarehouseCategory()

function checkArrayMail(email) {
    var form_email_reg1 = email;
    var aCong = form_email_reg1.indexOf("@");
    var dauCham = form_email_reg1.lastIndexOf(".");
    var ketquaKtEmailReg1 = true;
    if (form_email_reg1 == "") {
        $("#eemail").addClass("bf");
        $('#eemail').attr('placeholder', "Vui lòng nhập Email");
        ketquaKtEmailReg1 = false;
    } else if ((aCong < 1) || (dauCham < aCong + 2) || (dauCham + 2 > form_email_reg1.length)) {
        $("#eemail").addClass("bf");
        $('#eemail').val('');
        $('#eemail').attr('placeholder', "Email chưa hợp lệ");
        ketquaKtEmailReg1 = false;
    } else {
        $('#eemail').attr('placeholder', "");
        $("#eemail").removeClass("errorform");
    }
    return ketquaKtEmailReg1;
}


function checkSendMail(ob) {
    var value = $(ob).val();
    console.log(ob);
    var arrayEmail = value.split(';');
    if (arrayEmail != '') {
        var result = 0;
        for (var i = 0; i < arrayEmail.length; i++) {
            if (checkArrayMail(arrayEmail[i]) == false) {
                $('.eemail').addClass("bf");
                $('.eemail').text("Email chưa hợp lệ");
                result = 1;
            } else {
                $('.eemail').removeClass("bf");
                $('.eemail').text("");
            }
        }
    }

}

function tinh_TongCongTienThanhToan() {
    var tien_hoadondichvu = $('#tongtienhoadonhid').val();
    var tien_thue = $('#tongtienthuehid').val();
    var tong_congtienthanhtoan = Number(tien_hoadondichvu) + Number(tien_thue);

    // var tien_phidv = $('#tienphidv2').val();
    //  if(tien_phidv != ''){
    //   tong_congtienthanhtoan += Number(tien_phidv);
    //  }
    // console.log(tien_phidv);

    $("input#tongcongprice").val(tong_congtienthanhtoan.toString().replace(/\B(?=(\d{3})+(?!\d))/g, "."));
    $("input#tongcongprice1").val(tong_congtienthanhtoan);
}

function updateEstoreIPP(ipp, action) {
    var op = "estoreipp";
    $.ajax({
        type: "POST",
        url: "/ajax.php",
        dataType: "json",
        data: {
            op: op,
            ipp: ipp,
            action: action
        },
        success: function (data) {
            if (data['success'] == 0) { }
        }
    });
}


function rePlacePosition() {
    var newstt = 1;
    $("#dshanghoa tr").each(function () {
        if (newstt) {
            $(this).find('td.re_stt').text(newstt);
            if (newstt == 1) {
                $(this).attr('id', 'packing');
            } else {
                $(this).attr('id', 'packing_' + newstt);
            }
            newstt += 1;
        }
    })
}


function clickSendMailRelease() {
    debugger;
    var op = 'invoice_senmailrelease';
    var id_invoice = [];
    $("input[name='id_sends']:checked").each(function (i) {
        id_invoice[i] = $(this).val();
    });
        $('#loading-overlay').show();
        $('#btnUpdateDate').attr('disabled', true).addClass('disabled');

    if (id_invoice.length > 0) {
        $.ajax({
            type: "POST",
            url: "/ajax.php",
            dataType: "json",
            data: {
                op: op,
                id_iv: id_invoice
            },
            success: function (data) {
                $('#loading-overlay').hide();
                $('#btnUpdateDate').attr('disabled', false).removeClass('disabled');

                console.log(data);
                window.location.href = '/admin.php?op=invoice&act=new&mod=list&rcode=33';
            }
        })
    } else {
        alert('Vui lòng chọn hóa đơn cần gửi!');
    }
    console.log(id_invoice);
}
function clickUpdateCurrentDate() {
    var op = 'updatecurrentdate';
    var id_invoice = [];

    $("input[name='ids']:checked").each(function () {
        id_invoice.push($(this).val());
    });

    if (id_invoice.length > 0) {
        if (!confirm("Hệ thống sẽ cập nhật ngày và tạo lại PDF cho " + id_invoice.length + " hóa đơn. Quá trình này có thể mất vài phút. Bạn có muốn tiếp tục?")) {
            return;
        }
        $('#loading-overlay').show();

        $('#btnUpdateDate').attr('disabled', true).addClass('disabled');

        $.ajax({
            type: "POST",
            url: "/ajax.php",
            dataType: "json",
            data: {
                op: op,
                id_iv: id_invoice
            },
            timeout: 300000,
            success: function (res) {
                $('#loading-overlay').hide();
                $('#btnUpdateDate').attr('disabled', false).removeClass('disabled');
console.log(res);
                if (res && res.error == 0) {
                    alert(res.message);
                    window.location.reload();
                } else {
                    alert("Lỗi: " + (res ? res.message : "Dữ liệu trả về không hợp lệ"));
                }
            },
            error: function (xhr, status, error) {
                $('#loading-overlay').hide();
                $('#btnUpdateDate').attr('disabled', false).removeClass('disabled');

                if (status === "timeout") {
                    alert("Thời gian xử lý quá lâu, nhưng server có thể vẫn đang chạy ngầm. Hãy đợi vài phút rồi load lại trang.");
                } else {
                    alert("Lỗi kết nối máy chủ: " + error);
                }
            }
        });
    } else {
        alert('Vui lòng chọn hóa đơn cần cập nhật ngày!');
    }
}


function toggleAllChecksSendMail(ob) {
    var value = $(ob).val();
    console.log(value);
    if (value == 1) {
        $(".id_sends").attr("checked", "checked");
        $("#all_sendmail").attr("value", 2);
    } else {
        $(".id_sends").removeAttr("checked");
        $("#all_sendmail").attr("value", 1);
    }
}


function toggleAllChecksSigning(ob) {
    var value = $(ob).val();
    console.log(value);
    if (value == 1) {
        $(".ids").attr("checked", "checked");
        $("#all").attr("value", 2);
    } else {
        $(".ids").removeAttr("checked");
        $("#all").attr("value", 1);
    }
}


function clickNotePXK(ob) {
    var value = $(ob).val();
    console.log(value);
    if (value == 1) {
        $(ob).parents('tr').find(".hidden_ghichupxk").val(2);
        $(ob).parents('tr').find(".hidden_ghichupxk").attr("value", 2);
        $(ob).val(2);
    } else {
        $(ob).parents('tr').find(".hidden_ghichupxk").val(1);
        $(ob).parents('tr').find(".hidden_ghichupxk").attr("value", 1);
        $(ob).val(1);
    }

    //Nếu bằng 2 thì sẽ là ghi chú
}



function getTimeDownload() {
    var valthang = $("#quythang").val();
    var valnam = $("#year").val();
    console.log(valthang);
    if (valnam == "" || valthang == "") {
        $("#controlview").hide();
        $("#controlview").hide();
    }
    else {
        $("#controlview").show();
    }

}


// Bắt đầu chỉnh sửa ngày 28/12/2020
// viết html trên file template
// viết addproductplus
// function deleterow
// .sl1 => function changesl
// .sumdv => function sumdv
// sắp xếp document ready function
// thêm function formatthanhtienInvoice
// thêm function formatdongiaInvoice
// thêm function formatSoLuongInvoice
// thêm function calcuThueGTGTInvoice
// thêm function calcuPriceVatInvoice
// thêm function calcuTotalAmountInvoice
// thêm function calcuTotalVatInvoice
// thêm function calcuTotalPaymentInvoice
// thêm function DocTienBangChuInvoice
// thêm function writeMoneyInvoiceOLD
// chỉnh function onchangPrice
// chỉnh function changesl
// chỉnh function sumdv
// chỉnh function checkkm
// forrm hóa đơn 1 không tính ngược đơn giá từ thành tiền
// mất function onchangSumVAT viết lại

// Kết thúc chỉnh sửa ngày 28/12/2020

function clickUnsetSigned() {
    var op = 'invoice_unsetsigned';
    var id = $('input[name="idinvoice"]').val();
    console.log(id);
    $.ajax({
        type: "POST",
        url: "/ajax.php",
        dataType: "json",
        data: {
            op: op,
            id: id
        },
        success: function (data) {
            // window.location.href = '/admin.php?op=invoice&act=new&mod=view&id='+id+'&rcode=36';
            location.reload();
        }
    })
}

function clickSetSigned() {
    var op = 'invoice_setsigned';
    var id = $('input[name="idinvoice"]').val();
    console.log(id);
    $.ajax({
        type: "POST",
        url: "/ajax.php",
        dataType: "json",
        data: {
            op: op,
            id: id
        },
        success: function (data) {
            // window.location.href = '/admin.php?op=invoice&act=new&mod=view&id='+id+'&rcode=37';
            location.reload();
        }
    })
}

function clickFormatnumber(ob) {
    var value = $(ob).val();
    if (value == 1) {
        $(".ledongia1").removeClass('d-none');
        $(".ledongia2").addClass('d-none');
        $(".lesoluong1").removeClass('d-none');
        $(".lesoluong2").addClass('d-none');
    } else {
        $(".ledongia2").removeClass('d-none');
        $(".ledongia1").addClass('d-none');
        $(".lesoluong2").removeClass('d-none');
        $(".lesoluong1").addClass('d-none');
    }
}


function submitCustomerAdd() {
    $('#f_CustomerAdd').submit();
}

function submitCustomerEdit() {
    $('#f_CustomerEdit').submit();
}

function submitPOAdd() {
    $('#f_POAdd').submit();
}

function submitCURRENCYAdd() {
    $('#f_CURRENCYAdd').submit();
}

function submitMINUTESTYPESAdd() {
    $('#f_MINUTESTYPESAdd').submit();
}

function submitPOEdit() {
    $('#f_POEdit').submit();
}

function nofNoToken() {
    alert('Chưa có thông tin chữ ký số trên hệ thống, vui lòng kiểm tra lại!');
}
function deleteConfigEstoreProperty(property) {
    var op = 'delete_estoreproperty';
    $.ajax({
        type: "POST",
        url: "/ajax.php",
        data: {
            op: op,
            property: property
        },
        success: function (data) {
            location.reload();
        }
    });
}


function addCerToken() {
    debugger;
    var tokenus = $(".tokenusb:checked").val();
    if (tokenus == 1) {
        $(".subjecttoken").removeClass("hideload");
        $(".notetoken").addClass("hideload");
        $(".noteusbtoken").addClass("hideload");
        $(".notedebutoken").addClass("hideload");
        $(".filecert").addClass("hideload");
        $(".uploadpfx").addClass("hideload");
        $(".uploadp12").addClass("hideload");
    } else if (tokenus == 3) {
        $(".filecert").removeClass("hideload");
        $(".notetoken").addClass("hideload");
        $(".noteusbtoken").addClass("hideload");
        $(".notedebutoken").addClass("hideload");
        $(".subjecttoken").addClass("hideload");
        $(".uploadpfx").addClass("hideload");
        $(".uploadp12").addClass("hideload");
    } else if (tokenus == 4) {
        $(".uploadpfx").removeClass("hideload");
        $(".subjecttoken").addClass("hideload");
        $(".notetoken").addClass("hideload");
        $(".noteusbtoken").addClass("hideload");
        $(".notedebutoken").addClass("hideload");
        $(".filecert").addClass("hideload");
        $(".uploadp12").addClass("hideload");
    } else if (tokenus == 5) {
        $(".uploadp12").removeClass("hideload");
        $(".subjecttoken").addClass("hideload");
        $(".notetoken").addClass("hideload");
        $(".noteusbtoken").addClass("hideload");
        $(".notedebutoken").addClass("hideload");
        $(".filecert").addClass("hideload");
        $(".uploadpfx").addClass("hideload");
    } else {
        $(".subjecttoken").addClass("hideload");
        $(".filecert").addClass("hideload");
        $(".notetoken").removeClass("hideload");

        // Clear log
        document.getElementById('log').innerHTML = '';
        // Timestamp

        // Select hash
        var hashtype = $("input[name=hash]").val();
        // Set backend if asked
        var backend = $("input[name=backend]").val()
        // get language
        var lang = $("input[name=lang]").val();
        if (!window.hwcrypto.use(backend)) {

        }

        var hash = $("#hashvalue").val();
        // debug
        window.hwcrypto.debug().then(function (response) {
            console.log(response);
            $("#debuger").val("Debug: " + response);
            if (response == "hwcrypto.js 0.0.11 with Chrome native messaging extension 1.0.2/1.0.0.0") {
                $(".notedebutoken").addClass("hideload");
            } else {
                $(".notetoken").addClass("hideload");
                $(".notedebutoken").removeClass("hideload");
            }
        }, function (err) {
            $("#debuger").val("debug() failed: " + err);
            return;
        });

        // Sign
        window.hwcrypto.getCertificate({
            lang: lang
        }).then(function (response) {
            var cert = response;
            log_text(hexToPem(response.hex));
            window.hwcrypto.sign(cert, {
                type: hashtype, hex: hash
            }, {
                lang: lang
            }).then(function (response) {
                $("#signhash").val(response.hex);
            },
                function (err) {

                });
            $(".tokenresult").removeClass("hideload");
        },
            function (err) {
                $("#errusb").val("getCertificate() failed: " + err);
                $(".notetoken").addClass("hideload");
                $(".noteusbtoken").removeClass("hideload");
            });
    }
}

function convertxml() {

    // $.get('https://0000000000.acconline.vn//upload/newinvoice/48/11653/minutes_1165360c6bd36d5dd3.xml', function (data) {
    //     console.log(data.length());
    // });


    // read text from URL location
    var request = new XMLHttpRequest();
    var url = $('#contentxml').attr('src');
    request.open('GET', url, true);
    request.send(null);
    request.onreadystatechange = function () {
        if (request.readyState === 4 && request.status === 200) {
            var type = request.getResponseHeader('Content-Type');
            if (type.indexOf("text") !== 1) {
                var data = request.responseText.replace(/<ds:/g, '\n<ds:');
                var data = data.replace(/><[/]/g, '>\n</');
                data = data.split('\n');

                // var value1 = '<div class="folder" id="folder'+value+'">';
                // var value1 = '<span>'+value+'</span><div class="line"><span class="folder-button fold"></span><span class="html-tag">'+value+'</span></div><div class="opened">'+value+'</div>';
                // var value2 = '<span>'+value+'</span><div class="line"><span class="html-tag">'+value+'</span></div>';
                // var value3 = '<div class="opened">';
                // var value3 = '<span>'+value+'</span><div class="line"><span class="html-tag">'+value+'</span><span>'+value+'</span><span class="html-tag">'+value+'</span></div>';
                // var value4 = '<span>'+value+'</span><span class="folded">...</span>';
                // var count = (value.match(/>/g) || []).length;

                var key = 0;
                var htmlXML = '<div class="pretty-print">';
                data.forEach(function (entry) {
                    if (key == 0) {
                        htmlXML += '<div xmlns="http://www.w3.org/1999/xhtml" class="header"><span>This XML file does not appear to have any style information associated with it. The document tree is shown below.</span><br /></div>';
                    } else {
                        if ((entry.match(/>/g) || []).length == 1 && (entry.match(/<[/]/g) || []).length == 0 && (entry.match(/[/]>/g) || []).length == 0) {
                            var value = parseXML(0, entry);
                            var content = '<span></span><div class="folder" id="folder' + key + '">';
                            content += '<span>' + value[0] + '</span><div class="line"><span class="folder-button fold" onclick="clickbutton(this)"></span><span class="html-tag">' + value[1] + '</span></div><div class="opened">';
                            htmlXML += content;
                        }
                        if ((entry.match(/>/g) || []).length == 2 && (entry.match(/<[/]/g) || []).length == 1) {
                            var value = parseXML(1, entry);
                            var content = '<span>' + value[0] + '</span><div class="line"><span class="html-tag">' + value[1] + '</span><span>' + value[2] + '</span><span class="html-tag">' + value[3] + '</span></div>';
                            htmlXML += content;
                        }
                        if ((entry.match(/</g) || []).length == 1 && (entry.match(/[/]>/g) || []).length == 1) {
                            var value = parseXML(0, entry);
                            var content = '<span>' + value[0] + '</span><div class="line"><span class="html-tag">' + value[1] + '</span></div>';
                            htmlXML += content;
                        }
                        if ((entry.match(/>/g) || []).length == 1 && (entry.match(/<[/]/g) || []).length == 1) {
                            var value = parseXML(0, entry);
                            var content = '</div><span>' + value[0] + '</span><span class="d-none">...</span><span>' + value[0] + '</span><div class="line"><span class="html-tag">' + value[1] + '</span></div></div>';
                            htmlXML += content;
                        }
                    }
                    key += 1;
                });
                htmlXML += '</div>';
                // console.log(htmlXML);
                $('#contentxml').html(htmlXML);
            }
        }
    };
    addStyleXML();
}

function convertxmlV2(id) {
    var request = new XMLHttpRequest();
    var url = $(id).attr('src');
    request.open('GET', url, true);
    request.send(null);
    request.onreadystatechange = function () {
        if (request.readyState === 4 && request.status === 200) {
            var type = request.getResponseHeader('Content-Type');
            if (type.indexOf("text") !== 1) {
                var data = request.responseText.replace(/<ds:/g, '\n<ds:');
                // var data = data.replace(/><[/]/g,'>\n</');
                // var data = data.replace(/[↵]/g,'>');
                data = data.split('><');
                console.log(data);
                var key = 0;
                var htmlXML = '<div class="pretty-print">';

                data.forEach(function (entry) {
                    if (key != data.length - 1) {
                        entry = '<' + entry + '>';
                    } else {
                        entry = '<' + entry;
                    }

                    if (key == 0) {
                        htmlXML += '<div xmlns="http://www.w3.org/1999/xhtml" class="header"><span>This XML file does not appear to have any style information associated with it. The document tree is shown below.</span><br /></div>';
                    } else {
                        if ((entry.match(/>/g) || []).length == 1 && (entry.match(/<[/]/g) || []).length == 0 && (entry.match(/[/]>/g) || []).length == 0) {
                            var value = parseXML(0, entry);
                            var content = '<span></span><div class="folder" id="folder' + key + '">';
                            content += '<span>' + value[0] + '</span><div class="line"><span class="folder-button fold" onclick="clickbutton(this)"></span><span class="html-tag">' + value[1] + '</span></div><div class="opened">';
                            htmlXML += content;
                        }
                        if ((entry.match(/>/g) || []).length == 2 && (entry.match(/<[/]/g) || []).length == 1) {
                            var value = parseXML(1, entry);
                            var content = '<span>' + value[0] + '</span><div class="line"><span class="html-tag">' + value[1] + '</span><span>' + value[2] + '</span><span class="html-tag">' + value[3] + '</span></div>';
                            htmlXML += content;
                        }
                        if ((entry.match(/</g) || []).length == 1 && (entry.match(/[/]>/g) || []).length == 1) {
                            var value = parseXML(0, entry);
                            var content = '<span>' + value[0] + '</span><div class="line"><span class="html-tag">' + value[1] + '</span></div>';
                            htmlXML += content;
                        }
                        if ((entry.match(/>/g) || []).length == 1 && (entry.match(/<[/]/g) || []).length == 1) {
                            var value = parseXML(0, entry);
                            var content = '</div><span>' + value[0] + '</span><span class="d-none">...</span><span>' + value[0] + '</span><div class="line"><span class="html-tag">' + value[1] + '</span></div></div>';
                            htmlXML += content;
                        }
                    }
                    key += 1;
                });
                htmlXML += '</div>';
                $(id).html(htmlXML);
            }
        }
    };
    addStyleXML();
}

function parseXML(type = 0, data) {
    data = data.replace(/\</g, '&lt;');
    data = data.replace(/\>/g, '&gt;');
    var results = [];
    results[0] = data.slice(0, data.indexOf('&lt;'));
    results[1] = data.slice(data.indexOf('&lt;'), data.indexOf('&gt;') + 4);
    if ((results[1].match(/\s/g) || []).length >= 1) {
        var data1 = results[1].split(' ');
        results1 = "";
        data1.forEach(function (entry) {
            if ((entry.match(/["]/g) || []).length == 0) {
                results1 += entry;
            } else if ((entry.match(/["]/g) || []).length >= 1) {
                value1 = entry.slice(0, entry.indexOf('"') - 1);
                value2 = entry.slice(entry.indexOf('"') + 1, entry.indexOf('"', entry.indexOf('"') + 1))
                results1 += '<span class="html-attribute"> <span class="html-attribute-name">' + value1 + '</span>="<span class="html-attribute-value">' + value2 + '</span>"</span>';
            }
        });

        if ((results[1].match(/[/]&gt/g) || []).length >= 1) {
            results1 += '/></span>';
        } else {
            results1 += '></span>';
        }
        results[1] = results1;
    }

    if (type == 1) {
        results[2] = data.slice(data.indexOf('&gt;') + 4, data.indexOf('&lt;/'));
        results[3] = data.slice(data.indexOf('&lt;/'), data.indexOf('&gt;', data.indexOf('&lt;/')) + 4);
    }
    return results;
}

function addStyleXML() {
    $('head').append('<style>div.header {border-bottom: 2px solid black;padding-bottom: 5px;margin: 10px;}div.folder &gt; div.hidden {display:none;}div.folder &gt; span.hidden {display:none;}.pretty-print {margin-top: 1em;margin-left: 20px;font-family: monospace;font-size: 13px;}#webkit-xml-viewer-source-xml {display: none;}.opened {margin-left: 1em;}.comment {white-space: pre;}.folder-button {-webkit-user-select: none;cursor: pointer;display: inline-block;margin-left: -10px;width: 10px;background-repeat: no-repeat;background-position: left top;}.fold {border-width: 7px 5px 0px;border-style: solid;border-color: #8e8e8e transparent transparent;margin-right: 2px}.fold1 {border-width: 5px 7px 5px;border-style: solid;border-color: transparent transparent transparent #8e8e8e;}.html-tag {color: rgb(136, 18, 128);}.html-attribute-name {color: rgb(153, 69, 0);}.html-attribute-value {color: rgb(26, 26, 166);}</style>');
}

function clickbutton(ob) {
    var className = $(ob).attr('class');
    if (className.indexOf('fold1') == -1) {
        $(ob).removeClass('fold');
        $(ob).addClass('fold1');
        var ab = $(ob).parents()[0];
        var bb = $(ab).nextAll().filter('.d-none');
        $(ab).next().addClass('d-none');
        $(bb).removeClass('d-none');
        $(bb).addClass('d-all');
    } else {
        $(ob).removeClass('fold1');
        $(ob).addClass('fold');
        var ab = $(ob).parents()[0];
        var bb = $(ab).nextAll().filter('.d-all');
        $(ab).next().removeClass('d-none');
        $(bb).removeClass('d-all');
        $(bb).addClass('d-none');
    }
}

/*Thong bao Hoa Don Sai Sot 2022*/
var sttTBSS = 1;
var ckboxMauSo = $('input[name="ckboxMauSo"]');
var mauSoChecked = true;

function clickCkboxMauSo(ob) {
    if ($(ob).prop('checked') == true) {
        ckboxMauSo.attr('style', '');
        mauSoChecked = true;
        $('#mauSoHeader').removeClass('d-none');
        $('.mauSo').each(function () {
            $(this).removeClass('d-none');
        })
    } else {
        $('#mauSoHeader').addClass('d-none');
        $('.mauSo').each(function () {
            $(this).addClass('d-none');
        })
    }
}

function clickAddRowPopupTBSS(ob) {
    console.log('clickAddRowPopupTBSS');
    sttTBSS += 1;
    var packingdv = $('#packingTBSS');
    var clonedv = packingdv.clone();
    clonedv.appendTo('#dshanghoaTBSS');
    clonedv.attr('id', 'packingTBSS_' + sttTBSS);
    clonedv.find('input').each(function () {
        $(this).val('');
    });
    var focussl1 = clonedv.find('input[name="numTBSS"]');

    focussl1
        .putCursorAtEnd() // should be chainable
        .on("focus", function () { // could be on any event
            focussl1.putCursorAtEnd()
        });
    clonedv.find('td.sttTBSS').text(sttTBSS);
}

function clickDeleteRowPopupTBSS(ob) {
    var sum = 0;
    $("#dshanghoaTBSS tr .sttTBSS").each(function () {
        sum += 1;
    });
    if (sum <= 1) {
        alert("Không thể xóa");
    } else {
        $(ob).parents('tr').remove();
        sttTBSS -= 1;
        $("#dshanghoaTBSS tr .sttTBSS").each(function (key, ab) {
            var sttkey = key + 1;
            $(ab).text(sttkey);
            if (sttkey == 1) {
                $(ab).parents('tr').attr('id', 'packingTBSS');
            } else {
                $(ab).parents('tr').attr('id', 'packingTBSS_' + sttkey);
            }
        });
    }
}

function searchInvoiceTBSS(ob, lengthValue = 50) {
    var value = $(ob).val();
    var row = $('#inv_search_line').val(); //get so dong nhap vao
    var op = "search_invoicetbss";
    var type = 'invoice';

    if (value.length >= 2 && value.length <= lengthValue) {
        $.ajax({
            type: "POST",
            url: "/ajax.php",
            data: {
                op: op,
                value: value,
                type: type,
                row: row //get so dong nhap vao
            },
            success: function (data) {
                // console.log('searchInfoProductInvoice', data);
                $(ob).parents('tr').find(".prosku-searching-box").show();
                $(ob).parents('tr').find(".prosku-searching-box").html(data);
            }
        });
    } else {
        $(".prosku-searching-box").hide();
    }
    checkLengthInput(ob, lengthValue);
}

function searchDeliveryTBSS(ob, lengthValue = 50) {
    var value = $(ob).val();
    var row = $('#inv_search_line').val(); //get so dong nhap vao
    var op = "search_invoicetbss";
    var type = 'delivery';

    if (value.length >= 2 && value.length <= lengthValue) {
        $.ajax({
            type: "POST",
            url: "/ajax.php",
            data: {
                op: op,
                value: value,
                type: type,
                row: row //get so dong nhap vao
            },
            success: function (data) {
                // console.log('searchInfoProductInvoice', data);
                $(ob).parents('tr').find(".prosku-searching-box").show();
                $(ob).parents('tr').find(".prosku-searching-box").html(data);
            }
        });
    } else {
        $(".prosku-searching-box").hide();
    }
    checkLengthInput(ob, lengthValue);
}

function clickInvoiceSearch(ob) {
    var billTBSS = $(ob).find('input[name="billTBSS"]').val();
    var numTBSS = $(ob).find('input[name="numTBSS"]').val();
    var dateTBSS = $(ob).find('input[name="dateTBSS"]').val();
    var MCCQTTBSS = $(ob).find('input[name="MCCQTTBSS"]').val();
    var idsTBSS = $(ob).find('input[name="idsTBSS"]').val();
    var xml_nameTBSS = $(ob).find('input[name="xml_nameTBSS"]').val();

    var ab = $(ob).parents('tr');
    $(ab).find('input[name="billTBSS"]').val(billTBSS);
    $(ab).find('input[name="numTBSS"]').val(numTBSS);
    $(ab).find('input[name="dateTBSS"]').val(dateTBSS);
    $(ab).find('input[name="MCCQTTBSS"]').val(MCCQTTBSS);
    $(ab).find('input[name="idsTBSS"]').val(idsTBSS);
    $(ab).find('input[name="xml_nameTBSS"]').val(xml_nameTBSS);


    $(ab).find('input[name="billTBSS"]').attr('value', billTBSS);
    $(ab).find('input[name="numTBSS"]').attr('value', numTBSS);
    $(ab).find('input[name="dateTBSS"]').attr('value', dateTBSS);
    $(ab).find('input[name="MCCQTTBSS"]').attr('value', MCCQTTBSS);
    $(ab).find('input[name="idsTBSS"]').attr('value', idsTBSS);
    $(ab).find('input[name="xml_nameTBSS"]').attr('value', xml_nameTBSS);

    ab.find('.error_message').each(function () {
        var cb = $(this).prev();
        validateEmpty(cb);
    });

    ab.find(".prosku-searching-box").hide();
}

function clickTBSS() {

    var op = "get_invoicetbss";
    var row = $('#packingTBSS');
    if (row.find('input[name="numTBSS"]').val() == '') {
        row.find('input[name="numTBSS"]').focus();
        row.find('input[name="numTBSS"]').select();
    }
    var sum = 0;
    $("#dshanghoaTBSS tr").each(function () {
        sum += 1;
    });
    // console.log(sum);
    for (let i = sum; 0 < i; i--) {
        var rowN = $('#packingTBSS_' + i);
        rowN.remove();
        if (sttTBSS > 1) {
            sttTBSS -= 1;
        }
        if (i == 1) {
            row.find('input[name="billTBSS"]').val(null);
            row.find('input[name="numTBSS"]').val(null);
            row.find('input[name="dateTBSS"]').val(null);
            row.find('input[name="MCCQTTBSS"]').val(null);
            row.find('input[name="xml_nameTBSS"]').val(null);
            row.find('input[name="idsTBSS"]').val(null);
            row.find('input[name="reasonTBSS"]').val(null);
            row.find('#TCTBaoTBSS').val('').change();

            row.find('input[name="billTBSS"]').attr('value', null);
            row.find('input[name="numTBSS"]').attr('value', null);
            row.find('input[name="dateTBSS"]').attr('value', null);
            row.find('input[name="MCCQTTBSS"]').attr('value', null);
            row.find('input[name="xml_nameTBSS"]').attr('value', null);
            row.find('input[name="idsTBSS"]').attr('value', null);
            row.find('input[name="reasonTBSS"]').attr('value', null);

            row.find('td.sttTBSS').text(sttTBSS);
        }
    }

    var id_invoice = [];
    $("input[type='checkbox']:checked").each(function () {
        id_invoice.push($(this).val());
    });
    if (id_invoice.length > 0) {
        $.ajax({
            type: "POST",
            url: "/ajax.php",
            data: {
                op: op,
                ids: id_invoice,
            },
            success: function (data) {
                invoiceArray = $.parseJSON(data);
                console.log(invoiceArray);
                for (let i = 0; i < invoiceArray.length; i++) {
                    if (i == 0) {
                        var row = $('#packingTBSS');
                    } else {
                        clickAddRowPopupTBSS();
                        var row = $('#packingTBSS_' + (i + 1));
                    }
                    row.find('input[name="billTBSS"]').val(invoiceArray[i]['symbolName']);
                    row.find('input[name="numTBSS"]').val(invoiceArray[i]['serial']);
                    row.find('input[name="dateTBSS"]').val(invoiceArray[i]['date_set']);
                    row.find('input[name="MCCQTTBSS"]').val(invoiceArray[i]['MCCQT']);
                    row.find('input[name="xml_nameTBSS"]').val(invoiceArray[i]['xml_nameTBSS']);
                    row.find('input[name="idsTBSS"]').val(invoiceArray[i]['id']);


                    row.find('input[name="billTBSS"]').attr('value', invoiceArray[i]['symbolName']);
                    row.find('input[name="numTBSS"]').attr('value', invoiceArray[i]['serial']);
                    row.find('input[name="dateTBSS"]').attr('value', invoiceArray[i]['date_set']);
                    row.find('input[name="MCCQTTBSS"]').attr('value', invoiceArray[i]['MQCCT']);
                    row.find('input[name="xml_nameTBSS"]').attr('value', invoiceArray[i]['xml_nameTBSS']);
                    row.find('input[name="idsTBSS"]').attr('value', invoiceArray[i]['id']);
                }
            }
        });
        $("#TBHDSS1").modal("show");
    } else {
        var row = $('#packingTBSS');
        row.find('input[name="billTBSS"]').val(null);
        row.find('input[name="numTBSS"]').val(null);
        row.find('input[name="dateTBSS"]').val(null);
        row.find('input[name="MCCQTTBSS"]').val(null);
        row.find('#TCTBaoTBSS').val('').change();

        row.find('input[name="billTBSS"]').attr('value', null);
        row.find('input[name="numTBSS"]').attr('value', null);
        row.find('input[name="dateTBSS"]').attr('value', null);
        row.find('input[name="MCCQTTBSS"]').attr('value', null);


        row.find('td.sttTBSS').text(sttTBSS);
        $("#TBHDSS1").modal("show");
        setTimeout(() => {
            var obFocus = row.find('input[name="numTBSS"]');
            obFocus.focus();
        }, 300);
    }
    console.log(id_invoice);
}
function clickTBSSPXK() {
    var op = "get_pxktbss";
    var row = $('#packingTBSS');
    if (row.find('input[name="numTBSS"]').val() == '') {
        row.find('input[name="numTBSS"]').focus();
        row.find('input[name="numTBSS"]').select();
    }
    var sum = 0;
    $("#dshanghoaTBSS tr").each(function () {
        sum += 1;
    });
    // console.log(sum);
    for (let i = sum; 0 < i; i--) {
        var rowN = $('#packingTBSS_' + i);
        rowN.remove();
        if (sttTBSS > 1) {
            sttTBSS -= 1;
        }
        if (i == 1) {
            row.find('input[name="billTBSS"]').val(null);
            row.find('input[name="numTBSS"]').val(null);
            row.find('input[name="dateTBSS"]').val(null);
            row.find('input[name="MCCQTTBSS"]').val(null);
            row.find('input[name="xml_nameTBSS"]').val(null);
            row.find('input[name="idsTBSS"]').val(null);
            row.find('input[name="reasonTBSS"]').val(null);
            row.find('#TCTBaoTBSS').val('').change();

            row.find('input[name="billTBSS"]').attr('value', null);
            row.find('input[name="numTBSS"]').attr('value', null);
            row.find('input[name="dateTBSS"]').attr('value', null);
            row.find('input[name="MCCQTTBSS"]').attr('value', null);
            row.find('input[name="xml_nameTBSS"]').attr('value', null);
            row.find('input[name="idsTBSS"]').attr('value', null);
            row.find('input[name="reasonTBSS"]').attr('value', null);

            row.find('td.sttTBSS').text(sttTBSS);
        }
    }

    var id_invoice = [];
    $("input[type='checkbox']:checked").each(function () {
        id_invoice.push($(this).val());
    });
    if (id_invoice.length > 0) {
        $.ajax({
            type: "POST",
            url: "/ajax.php",
            data: {
                op: op,
                ids: id_invoice,
            },
            success: function (data) {
                invoiceArray = $.parseJSON(data);
                // console.log(invoiceArray);
                for (let i = 0; i < invoiceArray.length; i++) {
                    if (i == 0) {
                        var row = $('#packingTBSS');
                    } else {
                        clickAddRowPopupTBSS();
                        var row = $('#packingTBSS_' + (i + 1));
                    }
                    row.find('input[name="billTBSS"]').val(invoiceArray[i]['symbolName']);
                    row.find('input[name="numTBSS"]').val(invoiceArray[i]['serial']);
                    row.find('input[name="dateTBSS"]').val(invoiceArray[i]['date_set']);
                    row.find('input[name="MCCQTTBSS"]').val(invoiceArray[i]['MCCQT']);
                    row.find('input[name="xml_nameTBSS"]').val(invoiceArray[i]['xml_nameTBSS']);
                    row.find('input[name="idsTBSS"]').val(invoiceArray[i]['id']);


                    row.find('input[name="billTBSS"]').attr('value', invoiceArray[i]['symbolName']);
                    row.find('input[name="numTBSS"]').attr('value', invoiceArray[i]['serial']);
                    row.find('input[name="dateTBSS"]').attr('value', invoiceArray[i]['date_set']);
                    row.find('input[name="MCCQTTBSS"]').attr('value', invoiceArray[i]['MQCCT']);
                    row.find('input[name="xml_nameTBSS"]').attr('value', invoiceArray[i]['xml_nameTBSS']);
                    row.find('input[name="idsTBSS"]').attr('value', invoiceArray[i]['id']);
                }
            }
        });
        $("#TBHDSS1").modal("show");
    } else {
        var row = $('#packingTBSS');
        row.find('input[name="billTBSS"]').val(null);
        row.find('input[name="numTBSS"]').val(null);
        row.find('input[name="dateTBSS"]').val(null);
        row.find('input[name="MCCQTTBSS"]').val(null);
        row.find('#TCTBaoTBSS').val('').change();

        row.find('input[name="billTBSS"]').attr('value', null);
        row.find('input[name="numTBSS"]').attr('value', null);
        row.find('input[name="dateTBSS"]').attr('value', null);
        row.find('input[name="MCCQTTBSS"]').attr('value', null);


        row.find('td.sttTBSS').text(sttTBSS);
        $("#TBHDSS1").modal("show");
        setTimeout(() => {
            var obFocus = row.find('input[name="numTBSS"]');
            obFocus.focus();
        }, 300);
    }
    console.log(id_invoice);
}
function clickTBSSTKTThue() {
    debugger;
    var op = "get_personaltaxtbss";
    var row = $('#packingTBSS');
    if (row.find('input[name="numTBSS"]').val() == '') {
        row.find('input[name="numTBSS"]').focus();
        row.find('input[name="numTBSS"]').select();
    }
    var sum = 0;
    $("#dshanghoaTBSS tr").each(function () {
        sum += 1;
    });
    // console.log(sum);
    for (let i = sum; 0 < i; i--) {
        var rowN = $('#packingTBSS_' + i);
        rowN.remove();
        if (sttTBSS > 1) {
            sttTBSS -= 1;
        }
        if (i == 1) {
            row.find('input[name="personalTaxDocPattern"]').val(null);
            row.find('input[name="personalTaxDocSymbol"]').val(null);
            row.find('input[name="personalTaxDocNumber"]').val(null);
            row.find('input[name="personalTaxDocDate"]').val(null);
            row.find('input[name="personalTaxDocType"]').val(null);
            row.find('input[name="tbssReason"]').val(null);
            row.find('#TCTBaoTBSS').val('').change();

            row.find('input[name="personalTaxDocPattern"]').attr('value', null);
            row.find('input[name="personalTaxDocSymbol"]').attr('value', null);
            row.find('input[name="personalTaxDocNumber"]').attr('value', null);
            row.find('input[name="personalTaxDocDate"]').attr('value', null);
            row.find('input[name="personalTaxDocType"]').attr('value', null);
            row.find('input[name="tbssReason"]').attr('value', null);
            row.find('td.sttTBSS').text(sttTBSS);
        }
    }

    var id_personalTax = [];
    $("input[type='checkbox']:checked").each(function () {
        id_personalTax.push($(this).val());
    });
    if (id_personalTax.length > 0) {
        $.ajax({
            type: "POST",
            url: "/ajax.php",
            data: {
                op: op,
                ids: id_personalTax,
            },
            success: function (data) {
                console.log(data);

                personaltaxArray = $.parseJSON(data);
                for (let i = 0; i < personaltaxArray.length; i++) {
                    if (i == 0) {
                        var row = $('#packingTBSS');
                    } else {
                        clickAddRowPopupTBSS();
                        var row = $('#packingTBSS_' + (i + 1));
                    }
                    $('#ckboxMauSo').val(personaltaxArray[i]['mst']);
                    $('#nameCompany').val(personaltaxArray[i]['nameCompany']);

                    row.find('input[name="personalTaxDocPattern"]').val(personaltaxArray[i]['KHMCTu']);
                    row.find('input[name="personalTaxDocSymbol"]').val(personaltaxArray[i]['KHCTu']);
                    row.find('input[name="personalTaxDocNumber"]').val(personaltaxArray[i]['SCTu']);
                    row.find('input[name="personalTaxDocDate"]').val(personaltaxArray[i]['date_set']);
                    row.find('input[name="personalTaxDocXmlNames"]').val(personaltaxArray[i]['xml_nameTBSS']);
                    row.find('input[name="personalTaxDocIds"]').val(personaltaxArray[i]['id']);


                    row.find('input[name="personalTaxDocPattern"]').attr('value', personaltaxArray[i]['KHMCTu']);
                    row.find('input[name="personalTaxDocSymbol"]').attr('value', personaltaxArray[i]['KHCTu']);
                    row.find('input[name="personalTaxDocNumber"]').attr('value', personaltaxArray[i]['SCTu']);
                    row.find('input[name="personalTaxDocDate"]').attr('value', personaltaxArray[i]['date_set']);
                    row.find('input[name="personalTaxDocXmlNames"]').attr('value', personaltaxArray[i]['xml_nameTBSS']);
                    row.find('input[name="personalTaxDocIds"]').attr('value', personaltaxArray[i]['id']);
                }
            }
        });
        $("#TBHDSS1").modal("show");
    } else {
        var row = $('#packingTBSS');
        row.find('input[name="personalTaxDocPattern"]').val(null);
        row.find('input[name="personalTaxDocSymbol"]').val(null);
        row.find('input[name="personalTaxDocNumber"]').val(null);
        row.find('input[name="personalTaxDocDate"]').val(null);
        row.find('input[name="personalTaxDocType"]').val(null);
        row.find('input[name="tbssCorrectionType"]').val(null);
        row.find('input[name="tbssReason"]').val(null);
        row.find('#TCTBaoTBSS').val('').change();

        row.find('input[name="personalTaxDocPattern"]').attr('value', null);
        row.find('input[name="personalTaxDocSymbol"]').attr('value', null);
        row.find('input[name="personalTaxDocNumber"]').attr('value', null);
        row.find('input[name="personalTaxDocDate"]').attr('value', null);
        row.find('input[name="personalTaxDocType"]').attr('value', null);
        row.find('input[name="tbssCorrectionType"]').attr('value', null);
        row.find('input[name="tbssReason"]').attr('value', null);
        row.find('td.sttTBSS').text(sttTBSS);



        $("#TBHDSS1").modal("show");
        setTimeout(() => {
            var obFocus = row.find('input[name="numTBSS"]');
            obFocus.focus();
        }, 300);
    }
    console.log(id_personalTax);
}
function searchReceiveWarehouse() {
    var op = "delivery_search";
    var value = $("#khonhanhang").val();
    let inputAction = $('#khonhanhang');


    if (value.length >= 3) {
        $.ajax({
            type: "POST",
            url: "/ajax.php",
            data: {
                op: op,
                value: value,
                inputAction: inputAction.attr('data-inputAction')
            },
            success: function (data) {
                let parseData = JSON.parse(data);
                $("#cus-searching-box").show();
                $("#cus-searching-box").html(parseData.html);

            }
        });
    }
    else {
        $("#cus-searching-box").hide();
    }
    $('#name_khoout').val($('#khonhanhang').val());
}

function clickSearchReceiveWarehouse(nv) {
    var idWH = $(nv).data('id');
    var nameWH = $(nv).data('name');
    // var companynameCus = $(nv).data('companyname');
    // $('#khonhanhang').val('');
    // $('#khonhanhang').attr('value','');
    $("#cus-searching-box").hide();
    $('#khonhanhang').val(nameWH);
    $('#idNameOut').val(idWH);
    $('#name_khoout').val($('#khonhanhang').val());
    var op = "delivery_search";
    let inputAction = "clickSearch";
    $.ajax({
        type: "POST",
        url: "/ajax.php",
        dataType: "json",
        data: {
            op: op,
            idWH: idWH,
            inputAction: inputAction
        },
        success: function (data) {
            // console.log(data['masothue']);
            if (data != "") {
                $('#masothuekhonhan').val(data['masothue']);
                $('#diachikhonhan').val(data['address']);
            }
        }
    });
}

function clickSaveTBSS() {
    debugger;
    var stt = 0;
    var tbssArray = [];
    var typeTBSS = 1;
    var storeId = $('.storeId').val();
    var ngayrasoat = $('input[name="datepickerTBSS"]').val();
    var fullname = $('#fullname').val();
    var tbss_nht = $('#tbss_nht').val();

    // Thong bao cua NNT
    var type1ofTBSS = $("#popup-notify-error__line__option--1");
    if (type1ofTBSS.checked) {
        typeTBSS = 1;
    }
    // Thong bao ra soat cua CQT
    var type2ofTBSS = $("#popup-notify-error__line__option--2");
    var reviewTBSSNumber = $('input[name="reviewTBSSNumber"]').val();
    var dateTBSS = document.getElementById("datepicker");
    if (type2ofTBSS.checked) {
        if (reviewTBSSNumber.length > 30 || reviewTBSSNumber.length == 0) {
            $('#errReviewTBSSNumber').addClass('show');
            success = 1;
        } else {
            $('#errReviewTBSSNumber').removeClass('show');
            typeTBSS = 2;
        }
    }

    // Danh sach hoa don
    $("#dshanghoaTBSS .tbssDetail").each(function (key, ob) {
        var error = 0;
        var row = $(ob);
        var mauSoTBSS = row.find("input[name='mauSoTBSS']").val();  // Mau so 
        var billTBSS = row.find("input[name='billTBSS']").val();   // Ky hieu HD
        var numTBSS = row.find("input[name='numTBSS']").val();     // So HD
        var dateTBSS = row.find("input[name='dateTBSS']").val();   // Ngay HD
        var MCCQTTBSS = row.find("input[name='MCCQTTBSS']").val(); // Ma CQT
        var typeDecreeTBSS = row.find("select[name='typeDecreeTBSS']").val();   // Loai HDDT
        var natureTBHDSS = row.find("#TCTBaoTBSS").val();          // null - -1/ huy - 1/ dieu chinh - 2/ thay the - 3/ giai trinh - 4
        var reasonTBSS = row.find("input[name='reasonTBSS']").val(); // Ly do
        var typeInvoiceSampleSymbol = row.find("select[name='typeInvoiceSampleSymbol']").val();   // Loai HDDT TT78



        if (typeDecreeTBSS == 3 && !mauSoTBSS.trim()) {
            row.find('#errTextMauSoTBSS').text('Mẫu số không được bỏ trống');
            row.find('#errMauSoTBSS').addClass('show');
            error = 1;
        } else {
            row.find('#errMauSoTBSS').removeClass('show');
        }

        if (typeDecreeTBSS == 3 && ckboxMauSo.prop('checked') == false) {
            mauSoChecked = false;
        }

        if (!billTBSS.trim()) {
            row.find('#errTextBillTBSS').text('Ký hiệu hóa đơn không được bỏ trống');
            row.find('#errBillTBSS').addClass('show');
            error = 1;
        } else {
            row.find('#errBillTBSS').removeClass('show');
        }


        if (!numTBSS.trim()) {
            row.find('#errTextNumTBSS').text('Số hóa đơn không được bỏ trống');
            row.find('#errNumTBSS').addClass('show');
            error = 1;
        } else {
            row.find('#errNumTBSS').removeClass('show');
        }

        if (!dateTBSS.trim()) {
            row.find('#errTextDateTBSS').text('Ngày hóa đơn không được bỏ trống');
            row.find('#errDateTBSS').addClass('show');
            error = 1;
        } else {
            row.find('#errDateTBSS').removeClass('show');
        }

        if (natureTBHDSS == "") {
            row.find('#errTextNatureTBSS').text('TC thông báo không được bỏ trống');
            row.find('#errNatureTBSS').addClass('show');
            error = 1;
        } else {
            row.find('#errNatureTBSS').removeClass('show');
        }
        if (reasonTBSS.length > 255) {

            // row.find('#errTextReasonTBSS').text('Lý do vượt quá ký tự');
            //  row.find('#errReasonTBSS').addClass('show');
            error = 1;
        }
        if (!reasonTBSS.trim()) {
            row.find('#errTextReasonTBSS').text('Lý do không được bỏ trống');
            row.find('#errReasonTBSS').addClass('show');
            error = 1;
        } else {
            row.find('#errReasonTBSS').removeClass('show');
        }

        if (error == 0) {
            var lang = "en";
            storeId = $("input[name='storeId_si']").val();
            var userName = $("input[name='user_name']").val();
            var tbssDetail = {
                storeId: storeId,
                invoiceId: row.find("input[name='idsTBSS']").val(),
                xmlName: row.find("input[name='xml_nameTBSS']").val(),
                xmlType: $("input[name='xml_typeTBSS']").val(),
                userName: userName,
                mauSoTBSS: mauSoTBSS,
                billTBSS: billTBSS,
                numTBSS: numTBSS,
                typeInvoiceSampleSymbol: typeInvoiceSampleSymbol,
                dateTBSS: dateTBSS,
                MCCQTTBSS: MCCQTTBSS,
                typeDecreeTBSS: typeDecreeTBSS,
                natureTBHDSS: natureTBHDSS,
                lydoTBHDSS: reasonTBSS
            };
            tbssArray.push(tbssDetail);
        } else {
            console.log(false);
        }
        stt += 1;
    });
    console.log(tbssArray);
    console.log(tbssArray.length);

    if (mauSoChecked == false) {
        ckboxMauSo.css({ 'outline': 'red solid 2px' });
    } else {
        ckboxMauSo.attr('style', '');
    }

    if (tbssArray.length > 0 && tbssArray.length == stt) {
        $.ajax({
            url: '/ajax.php',
            type: 'post',
            dataType: 'text',
            contentType: 'application/x-www-form-urlencoded',
            data: {
                op: 'createxmltbss',
                storeId: storeId,
                arrData: tbssArray,
                typeTBHDSS: typeTBSS,
                username: fullname,
                numTBHDSS: reviewTBSSNumber,
                NTBCCQT: ngayrasoat,
                newFormTBSS: 1
            },
            success: function (data) {
                console.log(data);
                if (tbss_nht == 1) {
                    alert("Tạo xml thành công");
                    location.reload();
                } else {
                    data = JSON.parse(data);

                    if (data['success'] == 'success') {
                        alert("Tạo xml thành công");
                        location.reload();
                    } else {
                        alert(data['message']);
                    }
                }

            },
            error: function (data) {
                console.log('998');
                alert("kết nối kỹ thuật không thành công");
                // data = JSON.parse(data);
                console.log('error', data, data.xmlSigned);
            }
        });
    }
}

function clickSaveTBSS_new() {
    debugger;
    var stt = 0;
    var tbssArray = [];
    var typeTBSS = 1;
    var storeId = $('.storeId').val();
    var ngayrasoat = $('input[name="datepickerTBSS"]').val();
    var fullname = $('#fullname').val();
    var tbss_nht = $('#tbss_nht').val();

    // Thong bao cua NNT
    var type1ofTBSS = $("#popup-notify-error__line__option--1");
    if (type1ofTBSS.checked) {
        typeTBSS = 1;
    }
    // Thong bao ra soat cua CQT
    var type2ofTBSS = $("#popup-notify-error__line__option--2");
    var reviewTBSSNumber = $('input[name="reviewTBSSNumber"]').val();
    var dateTBSS = document.getElementById("datepicker");
    if (type2ofTBSS.checked) {
        if (reviewTBSSNumber.length > 30 || reviewTBSSNumber.length == 0) {
            $('#errReviewTBSSNumber').addClass('show');
            success = 1;
        } else {
            $('#errReviewTBSSNumber').removeClass('show');
            typeTBSS = 2;
        }
    }

    // Danh sach hoa don
    $("#dshanghoaTBSS .tbssDetail").each(function (key, ob) {
        var error = 0;
        var row = $(ob);
        var mauSoTBSS = row.find("input[name='mauSoTBSS']").val();  // Mau so 
        var billTBSS = row.find("input[name='billTBSS']").val();   // Ky hieu HD
        var numTBSS = row.find("input[name='numTBSS']").val();     // So HD
        var dateTBSS = row.find("input[name='dateTBSS']").val();   // Ngay HD
        var MCCQTTBSS = row.find("input[name='MCCQTTBSS']").val(); // Ma CQT
        var typeDecreeTBSS = row.find("select[name='typeDecreeTBSS']").val();   // Loai HDDT
        var natureTBHDSS = row.find("#TCTBaoTBSS").val();          // null - -1/ huy - 1/ dieu chinh - 2/ thay the - 3/ giai trinh - 4
        var reasonTBSS = row.find("input[name='reasonTBSS']").val(); // Ly do
        var typeInvoiceSampleSymbol = row.find("select[name='typeInvoiceSampleSymbol']").val();   // Loai HDDT TT78



        if (typeDecreeTBSS == 3 && !mauSoTBSS.trim()) {
            row.find('#errTextMauSoTBSS').text('Mẫu số không được bỏ trống');
            row.find('#errMauSoTBSS').addClass('show');
            error = 1;
        } else {
            row.find('#errMauSoTBSS').removeClass('show');
        }

        if (typeDecreeTBSS == 3 && ckboxMauSo.prop('checked') == false) {
            mauSoChecked = false;
        }

        if (!billTBSS.trim()) {
            row.find('#errTextBillTBSS').text('Ký hiệu hóa đơn không được bỏ trống');
            row.find('#errBillTBSS').addClass('show');
            error = 1;
        } else {
            row.find('#errBillTBSS').removeClass('show');
        }


        if (!numTBSS.trim()) {
            row.find('#errTextNumTBSS').text('Số hóa đơn không được bỏ trống');
            row.find('#errNumTBSS').addClass('show');
            error = 1;
        } else {
            row.find('#errNumTBSS').removeClass('show');
        }

        if (!dateTBSS.trim()) {
            row.find('#errTextDateTBSS').text('Ngày hóa đơn không được bỏ trống');
            row.find('#errDateTBSS').addClass('show');
            error = 1;
        } else {
            row.find('#errDateTBSS').removeClass('show');
        }

        if (natureTBHDSS == "") {
            row.find('#errTextNatureTBSS').text('TC thông báo không được bỏ trống');
            row.find('#errNatureTBSS').addClass('show');
            error = 1;
        } else {
            row.find('#errNatureTBSS').removeClass('show');
        }
        if (reasonTBSS.length > 255) {

            // row.find('#errTextReasonTBSS').text('Lý do vượt quá ký tự');
            //  row.find('#errReasonTBSS').addClass('show');
            error = 1;
        }
        if (!reasonTBSS.trim()) {
            row.find('#errTextReasonTBSS').text('Lý do không được bỏ trống');
            row.find('#errReasonTBSS').addClass('show');
            error = 1;
        } else {
            row.find('#errReasonTBSS').removeClass('show');
        }

        if (error == 0) {
            var lang = "en";
            storeId = $("input[name='storeId_si']").val();
            var userName = $("input[name='user_name']").val();
            var tbssDetail = {
                storeId: storeId,
                invoiceId: row.find("input[name='idsTBSS']").val(),
                xmlName: row.find("input[name='xml_nameTBSS']").val(),
                xmlType: $("input[name='xml_typeTBSS']").val(),
                userName: userName,
                mauSoTBSS: mauSoTBSS,
                billTBSS: billTBSS,
                numTBSS: numTBSS,
                typeInvoiceSampleSymbol: typeInvoiceSampleSymbol,
                dateTBSS: dateTBSS,
                MCCQTTBSS: MCCQTTBSS,
                typeDecreeTBSS: typeDecreeTBSS,
                natureTBHDSS: natureTBHDSS,
                lydoTBHDSS: reasonTBSS
            };
            tbssArray.push(tbssDetail);
        } else {
            console.log(false);
        }
        stt += 1;
    });
    console.log(tbssArray);
    console.log(tbssArray.length);

    if (mauSoChecked == false) {
        ckboxMauSo.css({ 'outline': 'red solid 2px' });
    } else {
        ckboxMauSo.attr('style', '');
    }

    if (tbssArray.length > 0 && tbssArray.length == stt) {
        $.ajax({
            url: '/ajax.php',
            type: 'post',
            dataType: 'text',
            contentType: 'application/x-www-form-urlencoded',
            data: {
                op: 'createxmltbss',
                storeId: storeId,
                arrData: tbssArray,
                typeTBHDSS: typeTBSS,
                username: fullname,
                numTBHDSS: reviewTBSSNumber,
                NTBCCQT: ngayrasoat,
                newFormTBSS: 1
            },
            success: function (data) {
                console.log(data);
                if (tbss_nht == 1) {
                    alert("Tạo xml thành công");
                    location.reload();
                } else {
                    data = JSON.parse(data);

                    if (data['success'] == 'success') {
                        alert("Tạo xml thành công");
                        location.reload();
                    } else {
                        alert(data['message']);
                    }
                }

            },
            error: function (data) {
                console.log('998');
                alert("kết nối kỹ thuật không thành công");
                // data = JSON.parse(data);
                console.log('error', data, data.xmlSigned);
            }
        });
    }
}

function saveTBSS_PXK() {
    var stt = 0;
    var tbssArray = [];
    var typeTBSS = 1;
    var storeId = $('.storeId').val();
    var fullname = $('#fullname').val();

    $("#dshanghoaTBSS .tbssDetail").each(function (key, ob) {
        var error = 0;
        var row = $(ob);
        var billTBSS = row.find("input[name='billTBSS']").val();   // Ky hieu PXK
        var numTBSS = row.find("input[name='numTBSS']").val();     // So PXK
        var dateTBSS = row.find("input[name='dateTBSS']").val();   // Ngay PXK
        var MCCQTTBSS = row.find("input[name='MCCQTTBSS']").val(); // Ma CQT
        var typeDecreeTBSS = 1;   // Loai HDDT
        var natureTBHDSS = row.find("#TCTBaoTBSS").val();   // Tính chất thông báo sai sót        
        var reasonTBSS = row.find("input[name='reasonTBSS']").val(); // Ly do

        if (!billTBSS.trim()) {
            row.find('#errTextBillTBSS').text('Ký hiệu pxk không được bỏ trống');
            row.find('#errBillTBSS').addClass('show');
            error = 1;
        } else {
            row.find('#errBillTBSS').removeClass('show');
        }

        if (!numTBSS.trim()) {
            row.find('#errTextNumTBSS').text('Số pxk không được bỏ trống');
            row.find('#errNumTBSS').addClass('show');
            error = 1;
        } else {
            row.find('#errNumTBSS').removeClass('show');
        }

        if (!dateTBSS.trim()) {
            row.find('#errTextDateTBSS').text('Ngày pxk không được bỏ trống');
            row.find('#errDateTBSS').addClass('show');
            error = 1;
        } else {
            row.find('#errDateTBSS').removeClass('show');
        }

        if (natureTBHDSS == "") {
            row.find('#errTextNatureTBSS').text('TC thông báo không được bỏ trống');
            row.find('#errNatureTBSS').addClass('show');
            error = 1;
        } else {
            row.find('#errNatureTBSS').removeClass('show');
        }

        if (!reasonTBSS.trim()) {
            row.find('#errTextReasonTBSS').text('Lý do không được bỏ trống');
            row.find('#errReasonTBSS').addClass('show');
            error = 1;
        } else {
            row.find('#errReasonTBSS').removeClass('show');
        }

        if (error == 0) {

            storeId = $("input[name='storeId_si']").val();
            var userName = $("input[name='user_name']").val();
            var tbssDetail = {
                storeId: storeId,
                invoiceId: row.find("input[name='idsTBSS']").val(),
                xmlName: row.find("input[name='xml_nameTBSS']").val(),
                xmlType: $("input[name='xml_typeTBSS']").val(),
                userName: userName,

                billTBSS: billTBSS,
                numTBSS: numTBSS,
                dateTBSS: dateTBSS,
                MCCQTTBSS: MCCQTTBSS,
                typeDecreeTBSS: typeDecreeTBSS,
                natureTBHDSS: natureTBHDSS,
                lydoTBHDSS: reasonTBSS
            };
            tbssArray.push(tbssDetail);
        }
        stt += 1;
    });

    if (tbssArray.length > 0 && tbssArray.length == stt) {
        $.ajax({
            url: '/ajax.php',
            type: 'post',

            data: {
                op: 'createxmltbss',
                storeId: storeId,
                arrData: tbssArray,
                typeTBHDSS: typeTBSS,
                username: fullname,


                newFormTBSS: 1
            },
            success: function (data) {


                data = JSON.parse(data);

                if (data['success'] == 'success') {
                    alert("Tạo xml thành công");
                    location.reload();
                } else {
                    alert(data['message']);
                }


            },
            error: function (data) {

                alert("kết nối kỹ thuật không thành công");

            }
        });
    }
}
function clickSaveTBSS_TKThue() {
    debugger;
    var stt = 0;
    var tbssArray = [];
    var typeTBSS = 1;
    var ngayrasoat = $('input[name="datepickerTBSS"]').val();
    var fullname = $('#fullname').val();
    var tbss_nht = $('#tbss_nht').val();

    // Thong bao cua NNT
    var type1ofTBSS = $("#popup-notify-error__line__option--1");
    if (type1ofTBSS.checked) {
        typeTBSS = 1;
    }
    // Thong bao ra soat cua CQT
    var type2ofTBSS = $("#popup-notify-error__line__option--2");
    var reviewTBSSNumber = $('input[name="reviewTBSSNumber"]').val();
    var dateTBSS = document.getElementById("datepicker");
    if (type2ofTBSS.checked) {
        if (reviewTBSSNumber.length > 30 || reviewTBSSNumber.length == 0) {
            $('#errReviewTBSSNumber').addClass('show');
            success = 1;
        } else {
            $('#errReviewTBSSNumber').removeClass('show');
            typeTBSS = 2;
        }
    }

    // Danh sach hoa don    
    $("#dshanghoaTBSS .tbssDetail").each(function (key, ob) {
        var error = 0;
        var row = $(ob);
        var personalTaxDocPattern = row.find("input[name='personalTaxDocPattern']").val();  // Ký hiệu mẫu chứng từ
        var personalTaxDocSymbol = row.find("input[name='personalTaxDocSymbol']").val();   // Ký hiệu chứng từ	
        var personalTaxDocNumber = row.find("input[name='personalTaxDocNumber']").val();     // Số chứng từ
        var personalTaxDocDate = row.find("input[name='personalTaxDocDate']").val();   // Ngày lập chứng từ
        var tbssCorrectionType = row.find("input[name='tbssCorrectionType']").val(); // loại CT
        var natureTBHDSS = row.find("#TCTBaoTBSS").val();          // null - -1/ huy - 1/ dieu chinh - 2/ thay the - 3/ giai trinh - 4
        var reasonTBSS = row.find("input[name='tbssReason']").val(); // Ly do



        if (!personalTaxDocPattern.trim()) {
            row.find('#errTextMauSoTBSS').text('Ký hiệu mẫu chứng từ không được bỏ trống');
            row.find('#errMauSoTBSS').addClass('show');
            error = 1;
        } else {
            row.find('#errMauSoTBSS').removeClass('show');
        }


        if (!personalTaxDocSymbol.trim()) {
            row.find('#errTextBillTBSS').text('Ký hiệu chứng từ không được bỏ trống');
            row.find('#errBillTBSS').addClass('show');
            error = 1;
        } else {
            row.find('#errBillTBSS').removeClass('show');
        }

        if (!personalTaxDocNumber.trim()) {
            row.find('#errTextNumTBSS').text('Số chứng từ không được bỏ trống');
            row.find('#errNumTBSS').addClass('show');
            error = 1;
        } else {
            row.find('#errNumTBSS').removeClass('show');
        }


        if (!personalTaxDocDate.trim()) {
            row.find('#errTextDateTBSS').text('Ngày lập chứng từ không được bỏ trống');
            row.find('#errDateTBSS').addClass('show');
            error = 1;
        } else {
            row.find('#errDateTBSS').removeClass('show');
        }

        if (!tbssCorrectionType.trim()) {
            row.find('#errTextMCQTTBSS').text('Loại chứng từ không được bỏ trống');
            row.find('#errMCQTTBSS').addClass('show');
            error = 1;
        } else {
            row.find('#errMCQTTBSS').removeClass('show');
        }

        if (natureTBHDSS == "") {
            row.find('#errTextNatureTBSS').text('TC thông báo không được bỏ trống');
            row.find('#errNatureTBSS').addClass('show');
            error = 1;
        } else {
            row.find('#errNatureTBSS').removeClass('show');
        }
        if (reasonTBSS.length > 255) {

            row.find('#errTextReasonTBSS').text('Lý do vượt quá ký tự');
            row.find('#errReasonTBSS').addClass('show');
            error = 1;
        }
        if (!reasonTBSS.trim()) {
            row.find('#errTextReasonTBSS').text('Lý do không được bỏ trống');
            row.find('#errReasonTBSS').addClass('show');
            error = 1;
        } else {
            row.find('#errReasonTBSS').removeClass('show');
        }

        if (error == 0) {
            var lang = "en";
            storeId = $("input[name='storeId_si']").val();
            var userName = $("input[name='user_name']").val();
            var tbssDetail = {
                storeId: storeId,
                invoiceId: row.find("input[name='personalTaxDocIds']").val(), // <-- Sửa ở đây
                xmlName: row.find("input[name='personalTaxDocXmlNames']").val(), // <-- Sửa ở đây
                xmlType: row.find("input[name='personalTaxDocXmlTypes']").val(),
                userName: userName,
                personalTaxDocPattern: personalTaxDocPattern,
                personalTaxDocSymbol: personalTaxDocSymbol,
                personalTaxDocNumber: personalTaxDocNumber,
                personalTaxDocDate: personalTaxDocDate,
                tbssCorrectionType: tbssCorrectionType,
                natureTBHDSS: natureTBHDSS,
                lydoTBHDSS: reasonTBSS
            };
            tbssArray.push(tbssDetail);
        } else {
            console.log(false);
        }
        stt += 1;
    });

    console.log(tbssArray);
    console.log(tbssArray.length);

    if (mauSoChecked == false) {
        ckboxMauSo.css({ 'outline': 'red solid 2px' });
    } else {
        ckboxMauSo.attr('style', '');
    }

    if (tbssArray.length > 0 && tbssArray.length == stt) {
        $.ajax({
            url: '/ajax.php',
            type: 'post',
            dataType: 'text',
            contentType: 'application/x-www-form-urlencoded',
            data: {
                op: 'createxmltbss',
                storeId: storeId,
                arrData: tbssArray,
                typeTBHDSS: typeTBSS,
                username: fullname,
                numTBHDSS: reviewTBSSNumber,
                NTBCCQT: ngayrasoat,
                newFormTBSS: 1
            },
            success: function (data) {
                console.log(data);
                if (tbss_nht == 1) {
                    alert("Tạo xml thành công");
                    location.reload();
                } else {
                    data = JSON.parse(data);

                    if (data['success'] == 'success') {
                        alert("Tạo xml thành công");
                        location.reload();
                    } else {
                        alert(data['message']);
                    }
                }

            },
            error: function (data) {
                console.log('998');
                alert("kết nối kỹ thuật không thành công");
                // data = JSON.parse(data);
                console.log('error', data, data.xmlSigned);
            }
        });
    }
}
function validateEmpty(ob) {
    if ($(ob).val() != "") {
        $(ob).next().removeClass('show');
    }
}

//================= INPUT STOREPASS HIDE/SHOW PASSWORD EFFECT ================
const iconPassword = document.querySelector(".password-container > span")
const inputPassword = document.querySelector(".password_input")
var xPas = 1;
if (inputPassword) {
    iconPassword.addEventListener("click", function () {
        if (xPas === 1) {
            iconPassword.className = "fa fa-eye-slash";
            inputPassword.setAttribute("type", "text");
            xPas = 2;
        } else {
            iconPassword.className = "fa fa-eye";
            inputPassword.setAttribute("type", "password");
            xPas = 1;
        }
    })
}

//==============================================================================

//========================== ADD/EDIT DELIVERY FUNCTION (formhd value = 26 ; 27; 29)===========================

/* If the add/edit doesn not calculate money:
    - just add the formhd value inside if statement of moneyCalculateDelivery function*/

// Onchange Quantity
function onchangeQuantityDeliveryOn(ob) {


    var lesoluong = $('#lesoluong').val();

    var valueinput = $(ob).val();
    var arrayQuantity = formatSoLuongInvoice(valueinput);
    if (arrayQuantity[2] == false) {
        $(ob).parent().find(".showerr").css("display", "flex");
        $(ob).parent().find("p.minss").text("Phải nhập bằng số");
        $(ob).val("");
    } else {
        $(ob).parent().find(".showerr").css("display", "none");
    }


    var quantityShow = arrayQuantity[0];
    var quantityHidden = arrayQuantity[1];


    $(ob).parents('tr').find(".sl3").val(quantityShow);
    $(ob).parents('tr').find(".sl3").attr('value', quantityShow);

    $(ob).parents('tr').find(".slThucNhapHidden").val(quantityHidden);
    $(ob).parents('tr').find(".slThucNhapHidden").attr('value', quantityHidden);
}
function onchangeQuantityDelivery(ob) {
    var formhd = $('#formhd').val();
    var sothapphan = $('#sothapphan').val();
    var lesoluong = $('#lesoluong').val();

    // var valueinput = $(ob).val().replace("-", "");
    var valueinput = $(ob).val();
    var arrayQuantity = formatSoLuongInvoice(valueinput);
    if (arrayQuantity[2] == false) {
        $(ob).parent().find(".showerr").css("display", "flex");
        $(ob).parent().find("p.minss").text("Phải nhập bằng số");
        $(ob).val("");
    } else {
        $(ob).parent().find(".showerr").css("display", "none");
    }

    var quantityShow = arrayQuantity[0] ? arrayQuantity[0] : '';
    var quantityHidden = arrayQuantity[1] ? arrayQuantity[1] : '';
    $(ob).parents('tr').find(".sl1").val(quantityShow);
    $(ob).parents('tr').find(".sl1").attr('value', quantityShow);



    $(ob).parents('tr').find(".sl2").val(quantityHidden);
    $(ob).parents('tr').find(".sl2").attr('value', quantityHidden);


    if (formhd == 1) {
        var pricevat = calcuThueGTGTInvoice(ob);
    }
    var intoMoney = moneyCalculateDelivery(ob);
    var totalAmount = calcuTotalAmountInvoice();
    var totalVat = calcuTotalVatInvoice();
    var TotalPayment = calcuTotalPaymentInvoice();
    // writeMoneyIntoWordDelivery(TotalPayment);
    console.log(intoMoney, totalAmount, totalVat, TotalPayment);
}

// Onchange Price
function onchangePriceDelivery(ob) {
    var formhd = $('#formhd').val();
    var valueinput = $(ob).val().replace("-", "");
    var arrayPrice = formatDonGiaInvoice(valueinput);
    if (arrayPrice[2] == false) {
        $(ob).parent().find(".showerr").css("display", "flex");
        $(ob).parent().find("p.minss").text("Phải nhập bằng số");
        $(ob).val("");
    } else {
        $(ob).parent().find(".showerr").css("display", "none");
    }
    var priceShow = arrayPrice[0] ? arrayPrice[0] : '';
    var priceHidden = arrayPrice[1] ? arrayPrice[1] : '';
    $(ob).parents('tr').find(".price1").val(priceShow);
    $(ob).parents('tr').find(".price1").attr('value', priceShow);
    $(ob).parents('tr').find(".price2").val(priceHidden);
    $(ob).parents('tr').find(".price2").attr('value', priceHidden);

    var intoMoney = moneyCalculateDelivery(ob);
    if (formhd == 1) {
        var pricevat = calcuThueGTGTInvoice(ob);
    } else {
        if (formhd != 3) {
            var priceVat = calcuPriceVatInvoice(ob);
            var totalAmount = calcuTotalAmountInvoice();
            var totalVat = calcuTotalVatInvoice();
        }
    }
    var TotalPayment = calcuTotalPaymentInvoice();
    // writeMoneyIntoWordDelivery(TotalPayment);

}

// Calculate Money of delivery
function moneyCalculateDelivery(ob) {
    var formhd = $('#formhd').val(); // 26
    var amountGTGTShow = 0;
    var amountGTGTHidden = 0;

    if (formhd == 26 || formhd == 27 || formhd == 29 || formhd == 33 || formhd == 34) {
        var quantity = formatSoLuongInvoice($(ob).parents('#dshanghoa tr').find(".sl1").val())[1];
        if (quantity == '') {
            quantity = "1";
        }
        var price = $(ob).parents('#dshanghoa tr').find(".price2").val();
        if (price == '') {
            price = "0";
        }
        var intoMoney = Number(quantity) * Number(price);
    } else {
        if (formhd == 1) {
            var vat = $(ob).parents('tr').find('.vat1').val();
            if (vat == "Không chịu thuế" || vat == "\\" || vat == "" || isNaN(vat) == true || vat == "/") {
                var vat = 0;
            }
            var priceHidden = $(ob).parents('tr').find('.price2').val();
            var soluong = formatSoLuongInvoice($(ob).parents('tr').find('.sl1').val())[1];
            if (!soluong) {
                var soluong = 1;
            }
            var intoMoney = Math.round(Number(soluong) * Number(priceHidden) + Math.round(Number(soluong) * (Number(priceHidden) * Number(vat) / 100)));
        }
    }
    var arrayIntoMoney = formatThanhTienInvoice(String(intoMoney), 2);
    var moneyShow = arrayIntoMoney[0] ? arrayIntoMoney[0] : '';
    var moneyHidden = arrayIntoMoney[1] ? arrayIntoMoney[1] : '';
    $(ob).parents('#dshanghoa tr').find(".thanhtien1").val(moneyShow);
    $(ob).parents('#dshanghoa tr').find(".thanhtien1").attr('value', moneyShow);
    $(ob).parents('#dshanghoa tr').find(".thanhtien2").val(moneyHidden);
    $(ob).parents('#dshanghoa tr').find(".thanhtien2").attr('value', moneyHidden);

    return moneyHidden;
}

// Write money into word
function writeMoneyIntoWordDelivery(TotalPayment) {
    var bangchu = DocTienBangChuInvoice(TotalPayment);
    $('#bangchu').val(bangchu);
    $('#bangchu').attr('value', bangchu);
    $('#bangchu2').val(bangchu);
    $('#bangchu2').attr('value', bangchu);
    // console.log(TotalPayment,bangchu);
}


function checkghichuDelivery(ob, key) {
    if ($(ob)[0].checked == true) {
        $(ob).parents('tr').find(".ghichupro2").val(2);
        $(ob).parents('tr').find(".donvt1 ").val('');
        $(ob).parents('tr').find(".sl1").val('');
        $(ob).parents('tr').find(".sl2").val('');
        $(ob).parents('tr').find(".price1").val('');
        $(ob).parents('tr').find(".price2").val('');
        $(ob).parents('tr').find(".thanhtien1").val('');
        $(ob).parents('tr').find(".thanhtien2").val('');
    } else {
        $(ob).parents('tr').find(".ghichupro2").val(1);
    }
}
//======================================================================================
