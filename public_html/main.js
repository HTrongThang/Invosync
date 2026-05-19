if (
    (document.querySelectorAll("img") &&
        document.querySelectorAll("img").forEach((e) => {
            e.setAttribute("width", e.naturalWidth),
                e.setAttribute("height", e.naturalHeight);
        }),
        // $("#snowfall").length &&
        // $("#snowfall").snowfall({ image: "/templates/oto/img/hoa.png", minSize: 10, maxSize: 25, flakeCount: 20 }),
        // document.querySelector(".deer-run") &&
        // document.addEventListener("DOMContentLoaded", function () {
        //   let e = document.querySelector(".deer-run");
        //   function t(t) {
        //     "left" == t ? (e.style.backgroundPositionX = "0px") : "right" == t && (e.style.backgroundPositionX = "620px");
        //   }
        //   var a = 0,
        //     s = !0;
        //   let o;
        //   (o = 0),
        //     (e.style.backgroundPositionY = "0px"),
        //     setInterval(() => {
        //       o++, (e.style.backgroundPositionY = -(100 * o) + "px");
        //     }, 200),
        //     (function o() {
        //       (e.style.left = a + "%"),
        //         s ? (a += 0.1) : (a -= 0.1),
        //         (e.style.left = a + "%"),
        //         a > 100 ? ((s = !1), t("right")) : a < -50 && ((s = !0), t("left")),
        //         requestAnimationFrame(o);
        //     })();
        // }),
        document.addEventListener("DOMContentLoaded", function () {
            if (window.innerWidth < 992) {
                if (navigator.share) {
                    let e = document.querySelector(".news__share__btn");
                    if (e) {
                        let t = window.location.href,
                            a = document.title;
                        e.addEventListener("click", async () => {
                            try {
                                await navigator.share({
                                    title: a,
                                    text: a,
                                    url: t,
                                });
                            } catch (e) {
                                console.error("Lỗi khi chia sẻ", e);
                            }
                        });
                    }
                } else
                    console.log(
                        "Tr\xecnh duyệt kh\xf4ng hỗ trợ chức năng chia sẻ n\xe0y"
                    );
            } else if ($(".news__share__btn").length) {
                let s = encodeURIComponent(window.location.href),
                    o = encodeURIComponent(document.title);
                function n(e) {
                    window.open(
                        e,
                        "_blank",
                        "width=600,height=400,scrollbars=yes,resizable=yes"
                    );
                }
                $(".news__share__btn").click(function (e) {
                    e.preventDefault(),
                        $(".news__share__drop").toggleClass("active");
                }),
                    $(".news__share__close").click(function (e) {
                        e.preventDefault(),
                            $(".news__share__drop").removeClass("active");
                    }),
                    document
                        .getElementById("share-facebook")
                        .addEventListener("click", function (e) {
                            e.preventDefault(),
                                n(
                                    `https://www.facebook.com/sharer/sharer.php?u=${s}`
                                );
                        }),
                    document
                        .getElementById("share-messenger")
                        .addEventListener("click", function (e) {
                            e.preventDefault(),
                                n(
                                    `https://www.facebook.com/dialog/send?link=${s}&app_id=1081198556312834&redirect_uri=${s}`
                                );
                        }),
                    document
                        .getElementById("share-twitter")
                        .addEventListener("click", function (e) {
                            e.preventDefault(),
                                n(
                                    `https://twitter.com/intent/tweet?url=${s}&text=${o}`
                                );
                        }),
                    document
                        .getElementById("share-skype")
                        .addEventListener("click", function (e) {
                            e.preventDefault(),
                                n(`https://web.skype.com/share?url=${s}&text=${o}`);
                        }),
                    document
                        .getElementById("share-telegram")
                        .addEventListener("click", function (e) {
                            e.preventDefault(),
                                n(`https://t.me/share/url?url=${s}&text=${o}`);
                        }),
                    document.getElementById("copy-link") &&
                    document
                        .getElementById("copy-link")
                        .addEventListener("click", function () {
                            let e = document.createElement("input");
                            (e.value = window.location.href),
                                document.body.appendChild(e),
                                e.select(),
                                document.execCommand("copy"),
                                document.body.removeChild(e),
                                alert("Link đ\xe3 được sao ch\xe9p!");
                        });
            }
        }),
        $(".product-by-car__tabs").length &&
        $(".product-by-car__tabs__link").each(function (e, t) {
            $(t).click(function (a) {
                a.preventDefault(),
                    $(".product-by-car__tabs__link.active").removeClass(
                        "active"
                    ),
                    $(".product-by-car__tabs__item.active").removeClass(
                        "active"
                    ),
                    $(t).addClass("active"),
                    $(".product-by-car__tabs__item").eq(e).addClass("active");
            });
        }),
        $(".product-by-car__action").length &&
        $(".product-by-car__action").click(function (e) {
            $(".product-by-car__tabs__link.active").removeClass("active"),
                $(".product-by-car__tabs__item.active").removeClass("active"),
                $(".product-by-car__tabs__link").eq(1).addClass("active"),
                $(".product-by-car__tabs__item").eq(1).addClass("active");
        }),
        document.querySelector(".custom-select"))
) {
    var e, t, a, s, o, n, r, i, l;
    for (
        t = 0,
        s = (e = document.getElementsByClassName("custom-select")).length;
        t < s;
        t++
    ) {
        for (
            o = (n = e[t].getElementsByTagName("select")[0]).length,
            (r = document.createElement("DIV")).setAttribute(
                "class",
                "select-selected"
            ),
            r.innerHTML = n.options[n.selectedIndex].innerHTML,
            e[t].appendChild(r),
            (i = document.createElement("DIV")).setAttribute(
                "class",
                "select-items select-hide"
            ),
            a = 1;
            a < o;
            a++
        )
            ((l = document.createElement("DIV")).innerHTML =
                n.options[a].innerHTML),
                l.addEventListener("click", function (e) {
                    var t, a, s, o, n, r, i;
                    for (
                        a = 0,
                        r = (o =
                            this.parentNode.parentNode.getElementsByTagName(
                                "select"
                            )[0]).length,
                        n = this.parentNode.previousSibling;
                        a < r;
                        a++
                    )
                        if (o.options[a].innerHTML == this.innerHTML) {
                            for (
                                o.selectedIndex = a,
                                $(o).change(),
                                n.innerHTML = this.innerHTML,
                                i = (t =
                                    this.parentNode.getElementsByClassName(
                                        "same-as-selected"
                                    )).length,
                                s = 0;
                                s < i;
                                s++
                            )
                                t[s].removeAttribute("class");
                            this.setAttribute("class", "same-as-selected");
                            break;
                        }
                    n.click();
                }),
                i.appendChild(l);
        e[t].appendChild(i),
            r.addEventListener("click", function (e) {
                e.stopPropagation(),
                    c(this),
                    this.nextSibling.classList.toggle("select-hide"),
                    this.classList.toggle("select-arrow-active");
            });
    }
    function c(e) {
        var t,
            a,
            s,
            o,
            n,
            r = [];
        for (
            s = 0,
            t = document.getElementsByClassName("select-items"),
            a = document.getElementsByClassName("select-selected"),
            o = t.length,
            n = a.length;
            s < n;
            s++
        )
            e == a[s]
                ? r.push(s)
                : a[s].classList.remove("select-arrow-active");
        for (s = 0; s < o; s++)
            r.indexOf(s) && t[s].classList.add("select-hide");
    }
    document.addEventListener("click", c);
}
function resetSelect(e) {
    var t, a, s, o, n;
    for (
        t = 1,
        n = (s = e).closest(".custom-select"),
        a = s.length,
        n.querySelector(".select-selected").innerHTML =
        s.options[s.selectedIndex]?.innerHTML != undefined
            ? s.options[s.selectedIndex].innerHTML
            : "Chọn",
        n.querySelector(".select-items").innerHTML = "";
        t < a;
        t++
    )
        ((o = document.createElement("DIV")).innerHTML =
            s.options[t].innerHTML),
            o.addEventListener("click", function (e) {
                var t, a, s, o, n, r, i;
                for (
                    a = 0,
                    r = (o =
                        this.parentNode.parentNode.getElementsByTagName(
                            "select"
                        )[0]).length,
                    n = this.parentNode.previousSibling;
                    a < r;
                    a++
                )
                    if (o.options[a].innerHTML == this.innerHTML) {
                        for (
                            o.selectedIndex = a,
                            $(o).change(),
                            n.innerHTML = this.innerHTML,
                            i = (t =
                                this.parentNode.getElementsByClassName(
                                    "same-as-selected"
                                )).length,
                            s = 0;
                            s < i;
                            s++
                        )
                            t[s].removeAttribute("class");
                        this.setAttribute("class", "same-as-selected");
                        break;
                    }
                n.click();
            }),
            n.querySelector(".select-items").appendChild(o);
}
const allProductOnPage = document.querySelectorAll(".product");
allProductOnPage.length &&
    allProductOnPage.forEach(function (e) {
        let t = e.querySelector(".product__skeleton");
        window.addEventListener("load", function () {
            t && (t.style.display = "none");
        });
    });

if (
    ($(".reviews").length &&
        ($(".reviews__open-comment").click(function (e) {
            e.preventDefault(),
                $("body").addClass("prevent-scroll"),
                $(".reviews__modal").addClass("active"),
                $(".reviews__form").addClass("active");
        }),
            $(".reviews__form__close").click(function (e) {
                e.preventDefault(),
                    $("body").removeClass("prevent-scroll"),
                    $(".reviews__modal").removeClass("active"),
                    $(".reviews__form").removeClass("active");
            }),
            $(".reviews__modal").click(function (e) {
                e.preventDefault(),
                    $(".reviews__form").addClass("effect"),
                    setTimeout(() => {
                        $(".reviews__form").removeClass("effect");
                    }, 300);
            })),
        $(".product-detail__images").length &&
        ($(".product-detail__images__for").slick({
            slidesToShow: 1,
            slidesToScroll: 1,
            arrows: !1,
            draggable: !1,
            adaptiveHeight: !0,
            infinite: !1,
            asNavFor: ".product-detail__images__nav",
        }),
            $(".product-detail__images__nav").slick({
                slidesToShow: 3,
                slidesToScroll: 1,
                focusOnSelect: !0,
                infinite: !1,
                asNavFor: ".product-detail__images__for",
                nextArrow:
                    '<button class="slick-next" aria-label="Next slide"><i class="fa-solid fa-chevron-right"></i></button>',
                prevArrow:
                    '<button class="slick-prev" aria-label="Prev slide"><i class="fa-solid fa-chevron-left"></i></button>',
            })),
        $("#quantity").length)
) {
    $("#quantity-form").submit(function (e) {
        e.preventDefault();
    });
    let p = $("#quantity").val();
    $(".product-detail__form__minus").click(function (e) {
        e.preventDefault(), --p < 1 && (p = 1), $("#quantity").val(p);
    }),
        $(".product-detail__form__plus").click(function (e) {
            e.preventDefault(), p++, $("#quantity").val(p);
        }),
        $(".product-detail__form__submit").click(function (e) {
            e.preventDefault(), $("#quantity-form")[0].submit();
        });
}
$(".header__bars").length &&
    ($(".header__bars").click(function (e) {
        e.preventDefault(),
            $(".header__bot").toggleClass("active"),
            $(".header__bars").toggleClass("active"),
            $(".header__modal-mobile").toggleClass("active"),
            $("body").toggleClass("open-menu-mb");
    }),
        $(".header__modal-mobile").click(function (e) {
            e.preventDefault(),
                $(".header__bot").removeClass("active"),
                $(".header__bars").removeClass("active"),
                $(".header__modal-mobile").removeClass("active"),
                $("body").removeClass("open-menu-mb");
        })),
    $(".table-heading__top").length &&
    $(".table-heading__top").click(function (e) {
        e.preventDefault(),
            $(".table-heading__body").slideToggle({ duration: 50 });
    }),
    $(".searchIcon").length &&
    ($(".searchIcon").click(function (e) {
        e.preventDefault(),
            $(".search").addClass("active"),
            $(".modalSearch").addClass("active"),
            $("body").addClass("prevent-scroll");
    }),
        $(".modalSearch").click(function (e) {
            e.preventDefault(),
                $(".search").removeClass("active"),
                $(".modalSearch").removeClass("active"),
                $("body").removeClass("prevent-scroll");
        }),
        $(".search__close").click(function (e) {
            e.preventDefault(),
                $(".search").removeClass("active"),
                $(".modalSearch").removeClass("active"),
                $("body").removeClass("prevent-scroll");
        })),
    window.innerWidth < 1025 &&
    ($(".js_move_up").length && $(".js_place_move").after($(".js_move_up")),
        $(".menu").length &&
        ($(".menu__dropdown").each(function (e, t) {
            $(t).click(function (e) {
                e.stopPropagation();
            }),
                $(t)
                    .parents(".menu__item")
                    .click(function (e) {
                        e.preventDefault(),
                            e.stopPropagation(),
                            $(t).slideToggle({ duration: 200 });
                    });
        }),
            $(".menu__dropdown-2").each(function (e, t) {
                $(t).click(function (e) {
                    e.stopPropagation();
                }),
                    $(t)
                        .parents(".menu__dropdown-1__item")
                        .click(function (e) {
                            e.stopPropagation(),
                                e.preventDefault(),
                                $(t).slideToggle({ duration: 50 });
                        });
            }))),
    window.innerWidth < 768 &&
    $(".reviews__open-comment").length &&
    $(".reviews__filter").after($(".reviews__open-comment")),
    $("[data-fancybox]").length &&
    $("[data-fancybox]").fancybox({ afterClose: function (e, t) { } });
// const allHeading = $(".content-body").find("h2, h3, h4, h5");
// if (allHeading.length) {
//   let u = $(".table-heading__body");
//   function h() {
//     $("[data-scroll]").click(function () {
//       var e = $(this).data("scroll");
//       return $("html,body").animate({ scrollTop: $(e).offset().top - $(".header").height() }, 300), !1;
//     });
//   }
//   allHeading.each(function (e) {
//     $(this).attr("id", `h${e}`);
//     var t = $(this).prop("nodeName"),
//       a = `<${t}><a data-scroll="#h${e}"> ${$(this).text()}</a></${t}>`;
//     u.append(a);
//   }),
//     h();
// } else $(".table-heading").css("display", "none");
// js phần mới

// function toSlug(text) {
//   return text
//     .toLowerCase()
//     .normalize("NFD")
//     .replace(/[\u0300-\u036f]/g, "")
//     .replace(/[^a-z0-9\s]/g, "")
//     .trim()
//     .replace(/\s+/g, "-");
// }

// function handleScrollClick() {
//   $("[data-scroll]").click(function () {
//     const target = $(this).data("scroll");
//     $("html,body").animate(
//       {
//         scrollTop: $(target).offset().top - $(".header").height(),
//       },
//       300
//     );
//     return false;
//   });
// }

// const content = $(".content-body");
// const tocContainer = $(".table-heading__body");
// const allHeadings = content.find("h1, h2, h3, h4, h5, h6");
// let hasAny = false;

// if (allHeadings.length === 0) {
//   console.warn("Không có bất kỳ heading nào từ H1 đến H6 trong .content-body");
//   $(".table-heading").hide();
// } else {
//   allHeadings.each(function () {
//     const tag = this.tagName.toLowerCase();
//     const text = $(this).text();
//     const cleanedText = text.replace(/^\d+\.\s*/, ''); // Loại bỏ "1. "
//     const id = toSlug(cleanedText);

//     if (!$(this).attr("id")) {
//       $(this).attr("id", id);
//     }

//     // Không thêm H1 vào mục lục
//     if (tag !== "h1") {
//       const anchor = `<${tag}><a data-scroll="#${id}">${text}</a></${tag}>`;
//       tocContainer.append(anchor);
//       hasAny = true;
//     }
//   });

//   if (hasAny) {
//     handleScrollClick();
//   } else {
//     $(".table-heading").hide();
//     console.warn("Không có heading h2~h6 để hiển thị mục lục.");
//   }
// }
function toSlug(text) {
    return text
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/[^a-z0-9-\s]/g, "")
        .trim()
        .replace(/\s+/g, "-");
}

function handleScrollClick() {
    $("[data-scroll]").click(function () {
        const target = $(this).data("scroll");
        $("html,body").animate(
            {
                scrollTop: $(target).offset().top - $(".header").height(),
            },
            300
        );
        return false;
    });
}

const content = $(".content-body");
const tocContainer = $(".table-heading__body");
const allHeadings = content.find("h1, h2, h3, h4, h5, h6");
let hasAny = false;

if (allHeadings.length === 0) {
    // console.warn(
    //     "Không có bất kỳ heading nào từ H1 đến H6 trong .content-body"
    // );
    $(".table-heading").hide();
} else {
    let tocList = $("<ul></ul>");

    allHeadings.each(function () {
        const tag = this.tagName.toLowerCase();
        const text = $(this).text();
        // const cleanedText = text.replace(/^\d+\.\s*/, ""); // Loại bỏ số thứ tự đầu dòng
        const cleanedText = text.replace(/[đĐ]/g, 'd').replace(/^\d+\.\s*/, ""); // Loại bỏ số thứ tự đầu dòng
        const id = toSlug(cleanedText);

        if (!$(this).attr("id")) {
            $(this).attr("id", id);
        }

        // Bỏ qua H1 nếu cần
        if (tag !== "h1") {
            const listItem = $(`
        <li class="toc-${tag}">
          <a href="#${id}" data-scroll="#${id}">${text}</a>
        </li>
      `);
            tocList.append(listItem);
            hasAny = true;
        }
    });

    if (hasAny) {
        tocContainer.append(tocList);
        handleScrollClick();
    } else {
        $(".table-heading").hide();
        console.warn("Không có heading h2~h6 để hiển thị mục lục.");
    }
}

const allHeadingTwo = content.find("h2");
if (allHeadingTwo.length > 0) {
    let breadcrumbLinks = [];
    allHeadingTwo.each(function () {
        const text = $(this).text();
        const cleanedText = text.trim().replace(/^\d+\.\s*/, ""); // Loại bỏ số thứ tự đầu dòng
        const id = toSlug(cleanedText);
        const url = window.location.origin + window.location.pathname + "#" + id;
        if (cleanedText && url) {
            breadcrumbLinks.push({
                "@type": "Question",
                "name": cleanedText,
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "<a href='" + url + "'>Xem danh sách đầy đủ</a>"
                }
            });
        }
    });
    // Chỉ chạy tiếp nếu breadcrumbLinks có phần tử
    if (breadcrumbLinks.length > 0) {
        let breadcrumbJSON = {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": breadcrumbLinks
        };
        let scriptTag = document.createElement("script");
        scriptTag.type = "application/ld+json";
        scriptTag.textContent = JSON.stringify(breadcrumbJSON, null, 2);
        document.head.appendChild(scriptTag);
        console.log("Breadcrumb JSON:", breadcrumbJSON);
    } else {
        console.log("Không có breadcrumb để tạo JSON-LD.");
    }
}

// const allHeadingTwo = content.find("h2");
// if (allHeadingTwo.length > 0) {
//     let breadcrumbLinks = [];
//     allHeadingTwo.each(function () {
//         const text = $(this).text();
//         const cleanedText = text.trim().replace(/^\d+\.\s*/, ""); // Loại bỏ số thứ tự đầu dòng
//         const id = toSlug(cleanedText);
//         const url =
//             window.location.origin + window.location.pathname + "#" + id;

//         const paragraph = $(this).nextAll("p").first().text().trim();

//         if (cleanedText && url) {
//             breadcrumbLinks.push({
//                 "@type": "Question",
//                 name: cleanedText,
//                 acceptedAnswer: {
//                     "@type": "Answer",
//                     text:
//                         paragraph ||
//                         `Bạn có thể xem chi tiết cho câu hỏi "${cleanedText}" tại <a href="${url}">đây</a>.`,
//                 },
//             });
//         }
//     });

//     if (breadcrumbLinks.length > 0) {
//         let breadcrumbJSON = {
//             "@context": "https://schema.org",
//             "@type": "FAQPage",
//             mainEntity: breadcrumbLinks,
//         };
//         if (!document.querySelector('script[type="application/ld+json"]')) {
//             let scriptTag = document.createElement("script");
//             scriptTag.type = "application/ld+json";
//             scriptTag.textContent = JSON.stringify(breadcrumbJSON);
//             document.head.appendChild(scriptTag);
//             console.log("Breadcrumb JSON:", breadcrumbJSON);
//         }
//     } else {
//         console.log("Không có breadcrumb để tạo JSON-LD.");
//     }
// }

// kết thúc js mới này
window.innerWidth <= 1024 &&
    $(".user").length &&
    ($(".user").click(function (e) {
        e.preventDefault(), $(".user__list").toggleClass("active");
    }),
        $(document).click(function (e) {
            $(".user")[0].contains(e.target) ||
                $(".user__list").removeClass("active");
        }));
var codeRes = "";
function zoomForm() {
    $("#login-page").addClass("zoom"),
        $("#register-page").addClass("zoom"),
        $("#forget-pass-page").addClass("zoom"),
        $("#send-code-page").addClass("zoom"),
        $("#change-pass-page").addClass("zoom"),
        setTimeout(() => {
            $("#login-page").removeClass("zoom"),
                $("#register-page").removeClass("zoom"),
                $("#forget-pass-page").removeClass("zoom"),
                $("#send-code-page").removeClass("zoom"),
                $("#change-pass-page").removeClass("zoom");
        }, 300);
}
function notification(e, t) {
    console.log(e, t),
        "success" == e
            ? ($(".popup-notification").addClass("success"),
                $(".popup-notification__icon").html(
                    '<i class="fa-solid fa-circle-check"></i>'
                ),
                $(".popup-notification__content").text(t),
                setTimeout(() => {
                    $(".popup-notification").removeClass("success");
                }, 2e3))
            : "error" == e &&
            ($(".popup-notification").addClass("error"),
                $(".popup-notification__icon").html(
                    '<i class="fa-solid fa-circle-exclamation"></i>'
                ),
                $(".popup-notification__content").text(t),
                setTimeout(() => {
                    $(".popup-notification").removeClass("error");
                }, 2e3));
}
function sendCode(e) {
    $("#forget-pass-page").removeClass("active"),
        $("#send-code-page").addClass("active"),
        (codeRes = e),
        $(".login-popup__code input").each(function (e, t) {
            $(t)[0].disabled = !1;
        });
}
function errorMail(e) {
    $("#emailForgetPassError").text(e);
}
function successEntryCode() {
    notification(
        "success",
        "Bạn đ\xe3 x\xe1c thực m\xe3 code th\xe0nh c\xf4ng!!"
    ),
        $("#send-code-page").removeClass("active"),
        $("#change-pass-page").addClass("active");
}
function failEntryCode() {
    $("#codeError").text("M\xe3 x\xe1c nhận kh\xf4ng ch\xednh x\xe1c"),
        zoomForm();
}
function successChangePass() {
    $("#change-pass-page").removeClass("active"),
        $("#success-page").addClass("active");
}
$(".js_logout_btn").length &&
    $(".js_logout_btn").click(function (e) {
        e.preventDefault(), localStorage.clear(), location.reload();
    }),
    $(".contact__form").length &&
    $(".contact__form").submit(function (e) {
        var t = !0;
        "" === $("#fullname").val().trim()
            ? ($("#fullnameError").text(
                "Họ v\xe0 t\xean kh\xf4ng được để trống"
            ),
                (t = !1))
            : $("#fullnameError").text("");
        var a = $("#mail").val();
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(a)
            ? $("#mailError").text("")
            : ($("#mailError").text("Email kh\xf4ng hợp lệ"), (t = !1)),
            "" === $("#message").val().trim()
                ? ($("#messageError").text(
                    "Tin nhắn kh\xf4ng được để trống"
                ),
                    (t = !1))
                : $("#messageError").text(""),
            t || e.preventDefault();
    }),
    $(document).on("click", ".js_login_btn", function (e) {
        e.preventDefault();
        e.stopPropagation();

        $(".modal-popup").addClass("active");
        $("#login-page").addClass("active");
        $("body").addClass("prevent-scroll");
    });
$(".js_register_btn").length &&
    $(".js_register_btn").click(function (e) {
        e.preventDefault(),
            $(".modal-popup").addClass("active"),
            $("#register-page").addClass("active"),
            $("body").addClass("prevent-scroll");
    }),
    $(".js_login_mobile").length &&
    $(".js_login_mobile").click(function (e) {
        e.preventDefault(),
            $(".modal-popup").addClass("active"),
            $("#login-page").addClass("active"),
            $("body").addClass("prevent-scroll"),
            $(".header-mobile__menu").removeClass("active");
    }),
    $(".js_register_mobile").length &&
    $(".js_register_mobile").click(function (e) {
        e.preventDefault(),
            $(".modal-popup").addClass("active"),
            $("#register-page").addClass("active"),
            $("body").addClass("prevent-scroll"),
            $(".header-mobile__menu").removeClass("active");
    }),
    $("#register-page .login-popup__close").length &&
    $("#register-page .login-popup__close").click(function (e) {
        e.preventDefault(),
            $(".modal-popup").removeClass("active"),
            $("#register-page").removeClass("active"),
            $("body").removeClass("prevent-scroll");
    }),
    $("#login-page .login-popup__close").length &&
    $("#login-page .login-popup__close").click(function (e) {
        e.preventDefault(),
            $(".modal-popup").removeClass("active"),
            $("#login-page").removeClass("active"),
            $("body").removeClass("prevent-scroll");
    }),
    $("#forget-pass-page .login-popup__close").length &&
    $("#forget-pass-page .login-popup__close").click(function (e) {
        e.preventDefault(),
            $(".modal-popup").removeClass("active"),
            $("#forget-pass-page").removeClass("active"),
            $("body").removeClass("prevent-scroll");
    }),
    $("#send-code-page .login-popup__close").length &&
    $("#send-code-page .login-popup__close").click(function (e) {
        e.preventDefault(),
            $(".modal-popup").removeClass("active"),
            $("#send-code-page").removeClass("active"),
            $("body").removeClass("prevent-scroll");
    }),
    $("#change-pass-page .login-popup__close").length &&
    $("#change-pass-page .login-popup__close").click(function (e) {
        e.preventDefault(),
            $(".modal-popup").removeClass("active"),
            $("#change-pass-page").removeClass("active"),
            $("body").removeClass("prevent-scroll");
    }),
    $("#success-page .login-popup__close").length &&
    $("#success-page .login-popup__close").click(function (e) {
        e.preventDefault(),
            $(".modal-popup").removeClass("active"),
            $("#success-page").removeClass("active"),
            $("body").removeClass("prevent-scroll");
    }),
    $("#success-page .login-popup__submit").length &&
    $("#success-page .login-popup__submit").click(function (e) {
        e.preventDefault(),
            $("#success-page").removeClass("active"),
            $("#login-page").addClass("active");
    }),
    $(".modal-popup").length &&
    $(".modal-popup").click(function (e) {
        e.preventDefault(), zoomForm();
    }),
    $(".js_change_register").length &&
    $(".js_change_register").click(function (e) {
        e.preventDefault(),
            $("#login-page").removeClass("active"),
            $("#register-page").addClass("active");
    }),
    $(".js_change_login").length &&
    $(".js_change_login").click(function (e) {
        e.preventDefault(),
            $("#login-page").addClass("active"),
            $("#register-page").removeClass("active");
    }),
    $(".js_forget_pass").length &&
    $(".js_forget_pass").click(function (e) {
        e.preventDefault(),
            $("#login-page").removeClass("active"),
            $("#forget-pass-page").addClass("active");
    }),
    $("#loginForm").length &&
    $("#loginForm").submit(function (e) {
        var t = !0;
        "" === $("#account").val().trim()
            ? ($("#accountError").text(
                "T\xe0i khoản kh\xf4ng được để trống"
            ),
                (t = !1))
            : $("#accountError").text(""),
            "" === $("#password").val().trim()
                ? ($("#passwordError").text(
                    "Mật khẩu kh\xf4ng được để trống"
                ),
                    (t = !1))
                : $("#passwordError").text(""),
            t ? e.preventDefault() : (e.preventDefault(), zoomForm());
    }),
    $("#registrationForm").length &&
    $("#registrationForm").submit(function (e) {
        var t = !0;
        "" === $("#fullname").val().trim()
            ? ($("#fullnameError").text(
                "Họ v\xe0 t\xean kh\xf4ng được để trống"
            ),
                (t = !1))
            : $("#fullnameError").text(""),
            "" === $("#phone").val().trim()
                ? ($("#phoneError").text(
                    "Số điện thoại kh\xf4ng được để trống"
                ),
                    (t = !1))
                : $("#phoneError").text("");
        var a = $("#email").val();
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(a)
            ? $("#emailError").text("")
            : ($("#emailError").text("Email kh\xf4ng hợp lệ"), (t = !1)),
            "" === $("#password-register").val().trim()
                ? ($("#passwordRegisterError").text(
                    "Mật khẩu kh\xf4ng được để trống"
                ),
                    (t = !1))
                : $("#passwordRegisterError").text(""),
            t ? e.preventDefault() : (e.preventDefault(), zoomForm());
    }),
    $("#sendCodeForm").length &&
    ($(".login-popup__code input").focus(function () {
        $(this).val("");
    }),
        $(".login-popup__code input").keyup(function () {
            var e = $(this).index(),
                t = $(".login-popup__code input").eq(e + 1);
            1 === $(this).val().length && t.length && ((t.val = ""), t.focus());
        }),
        $("#sendCodeForm").submit(function (e) {
            e.preventDefault();
            var t = "";
            if (
                ($(".login-popup__code input").each(function () {
                    t += $(this).val();
                }),
                    6 !== t.length)
            ) {
                $("#codeError").text("Vui l\xf2ng nhập đủ 6 số"), zoomForm();
                return;
            }
            codeRes == t ? successEntryCode() : failEntryCode();
        })),
    $("#forgetPassForm").length &&
    $("#forgetPassForm").submit(function (e) {
        e.preventDefault();
        var t = !0,
            a = $("#email-forget-pass").val();
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(a)
            ? $("#emailForgetPassError").text("")
            : ($("#emailForgetPassError").text("Email kh\xf4ng hợp lệ"),
                (t = !1)),
            t || zoomForm();
    }),
    $("#changePassForm").length &&
    ($(".password-toggle").click(function () {
        var e = $(this).prev("input"),
            t = "password" === e.attr("type") ? "text" : "password";
        e.attr("type", t),
            $(this).find("i").toggleClass("fa-eye fa-eye-slash");
    }),
        $("#changePassForm").submit(function (e) {
            e.preventDefault();
            var t = $("#password-change").val(),
                a = $("#retype-password-change").val();
            if (($(".login-popup__error").text(""), "" === t.trim())) {
                $("#passwordChangeError").text(
                    "Mật khẩu kh\xf4ng được để trống"
                );
                return;
            }
            if ("" === a.trim()) {
                $("#retypePasswordChangeError").text(
                    "Nhập lại mật khẩu kh\xf4ng được để trống"
                );
                return;
            }
            if (t !== a) {
                $("#retypePasswordChangeError").text("Mật khẩu kh\xf4ng khớp");
                return;
            }
            successChangePass();
        })),
    $(".address__radio__group label").length &&
    $(".address__radio__group label").each(function (e, t) {
        $(t).click(function (e) {
            $(".address__radio__group.active").removeClass("active"),
                $(t).parents(".address__radio__group").addClass("active");
        });
    }),
    $(".js-add-address").length &&
    $(".js-add-address").click(function (e) {
        e.preventDefault(),
            $(".address__modal").addClass("active"),
            $(".address__form").addClass("active");
    }),
    $(".js-close-address").length &&
    $(".js-close-address").click(function (e) {
        e.preventDefault(),
            $(".address__modal").removeClass("active"),
            $(".address__form").removeClass("active");
    }),
    $(".address__modal").length &&
    $(".address__modal").click(function (e) {
        e.preventDefault(),
            $(".address__modal").removeClass("active"),
            $(".address__form").removeClass("active");
    }),
    $(".address__form").submit(function (e) {
        var t = !0;
        $(".address__form__input").each(function () {
            "" === $.trim($(this).val())
                ? ((t = !1),
                    $(this)
                        .next(".address__form__error")
                        .text($(this).data("invalid"))
                        .show())
                : $(this).next(".address__form__error").hide();
        }),
            $(".address__form__select").each(function () {
                "" === $(this).val()
                    ? ((t = !1),
                        $(this)
                            .next(".address__form__error")
                            .text($(this).data("invalid"))
                            .show())
                    : $(this).next(".address__form__error").hide();
            }),
            $('input[name="type"]').is(":checked")
                ? $(".address__radio__error").hide()
                : ((t = !1),
                    $(".address__radio__error")
                        .text("Vui l\xf2ng chọn loại địa chỉ!")
                        .show()),
            t || e.preventDefault();
    }),
    $(".cart__popup__list").length &&
    $(".cart__popup__list").css(
        "height",
        `calc(100vh - ${$(".cart__popup__bottom").height() +
        $(".cart__popup__heading").height() +
        60
        }px)`
    ),
    $(".cart__popup").length &&
    ($(".cart__icon").click(function (e) {
        e.preventDefault(),
            $(".cart__modal").addClass("active"),
            $(".cart__popup").addClass("active"),
            $("body").addClass("prevent-scroll");
    }),
        $(".cart__modal").click(function (e) {
            e.preventDefault(),
                $(".cart__modal").removeClass("active"),
                $(".cart__popup").removeClass("active"),
                $("body").removeClass("prevent-scroll");
        }));
let demoListSearch = { listCategory: [], listProduct: [], listProductAcc: [] };
if ($(".search").length) {
    var m = null;
    $(".search").on("input", function (e) {
        m && clearTimeout(m),
            (m = setTimeout(() => {
                console.log(e.target.value),
                    e.target.value.length >= 3
                        ? ($(".search__dropdown").addClass("active"),
                            $(".search__loading").addClass("active"),
                            setTimeout(() => {
                                $(".search__loading").removeClass("active");
                                var e = "";
                                demoListSearch.listCategory &&
                                    ((e += `<div class="search__title">Danh mục</div>`),
                                        (e += '<div class="search__list">'),
                                        $(demoListSearch.listCategory).each(function (
                                            t,
                                            a
                                        ) {
                                            e += `
                <a href="${a.link}" title="${a.name}" target="_blank" class="search__item">
                  <div class="search__item__name">${a.name}</div>
                </a>
                `;
                                        }),
                                        (e += "</div>")),
                                    demoListSearch.listProduct &&
                                    ((e += `<div class="search__title">Sản phẩm</div>`),
                                        (e += '<div class="search__list">'),
                                        $(demoListSearch.listProduct).each(
                                            function (t, a) {
                                                e += `
                <a href="${a.link}" title="${a.name}" target="_blank" class="search__item">
                  <img class="search__item__image" src="${a.image}" alt="${a.name}" />
                  <div class="search__item__body">
                    <div class="search__item__name">${a.name}</div>
                    <div class="search__item__price">${a.price}</div>
                  </div>
                </a>
                `;
                                            }
                                        ),
                                        (e += "</div>")),
                                    demoListSearch.listProductAcc &&
                                    ((e += '<div class="search__list">'),
                                        $(demoListSearch.listProductAcc).each(
                                            function (t, a) {
                                                e += `
                <a href="${a.link}" title="${a.name}" target="_blank" class="search__item">
                  <img class="search__item__image" src="${a.image}" alt="${a.name}" />
                  <div class="search__item__body">
                    <div class="search__item__name">${a.name}</div>
                    <div class="search__item__price">${a.price}</div>
                  </div>
                </a>
                `;
                                            }
                                        ),
                                        (e += "</div>")),
                                    $(".search__body").html(e);
                            }, 1e3))
                        : ($(".search__dropdown").removeClass("active"),
                            $(".search__loading").removeClass("active"),
                            $(".search__body").html(""));
            }, 500));
    }),
        $(document).click(function (e) {
            document.querySelector(".search").contains(e.target) ||
                ($(".search__dropdown").removeClass("active"),
                    $(".search__loading").removeClass("active"),
                    $(".search__body").html(""));
        });
}
if (
    ($(".rescue__images").length &&
        $(".rescue__images").slick({
            autoplay: !0,
            slidesToShow: 4,
            slidesToScroll: 4,
            autoplaySpeed: 3e3,
            nextArrow:
                '<button class="slick-next"><i class="fa-solid fa-chevron-right"></i></button>',
            prevArrow:
                '<button class="slick-prev"><i class="fa-solid fa-chevron-left"></i></button>',
            responsive: [
                {
                    breakpoint: 991,
                    settings: { slidesToShow: 2, slidesToScroll: 2 },
                },
                {
                    breakpoint: 767,
                    settings: { slidesToShow: 1, slidesToScroll: 1 },
                },
            ],
        }),
        $(".rescue__feedback").length &&
        $(".rescue__feedback").slick({
            autoplay: !0,
            slidesToShow: 4,
            slidesToScroll: 4,
            arrows: !1,
            dots: !0,
            responsive: [
                {
                    breakpoint: 991,
                    settings: { slidesToShow: 2, slidesToScroll: 2 },
                },
                {
                    breakpoint: 767,
                    settings: { slidesToShow: 1, slidesToScroll: 1 },
                },
            ],
        }),
        $(".rescue__item__body").length)
) {
    var g = 0;
    $(".rescue__item__body").each(function (e, t) {
        g < $(t).height() && (g = $(t).height());
    }),
        setTimeout(() => {
            $(".rescue__item__body").each(function (e, t) {
                $(t).height(g);
            });
        }, 300);
}
if (
    ($(".ldp-care__slider").length &&
        $(".ldp-care__slider").slick({
            autoplay: !0,
            slidesToShow: 1,
            slidesToScroll: 1,
            infinite: !1,
            arrows: !1,
            dots: !0,
            draggable: !1,
            swipe: !1,
        }),
        $(".ldp-care__library").length &&
        $(".ldp-care__library").slick({
            autoplay: !0,
            slidesToShow: 6,
            slidesToScroll: 1,
            autoplay: !0,
            autoplaySpeed: 1e3,
            pauseOnFocus: !1,
            pauseOnHover: !1,
            arrows: !1,
            rows: 2,
            responsive: [
                {
                    breakpoint: 991,
                    settings: { slidesToShow: 4, slidesToScroll: 2 },
                },
                {
                    breakpoint: 767,
                    settings: { slidesToShow: 2, slidesToScroll: 1 },
                },
            ],
        }),
        $(".ceramic__slider").length &&
        $(".ceramic__slider").slick({
            centerMode: !0,
            centerPadding: "20% 0 20%",
            slidesToShow: 1,
            arrows: !1,
            dots: !0,
        }),
        $(".benefit__item").length &&
        $(".benefit__item").each(function (e, t) {
            $(t)
                .find(".benefit__top")
                .click(function (e) {
                    e.preventDefault(),
                        $(t).hasClass("active")
                            ? ($(t).find(".benefit__body").slideUp(),
                                $(t).removeClass("active"))
                            : ($(".benefit__item.active").length &&
                                ($(".benefit__item.active")
                                    .find(".benefit__body")
                                    .slideUp(),
                                    $(".benefit__item.active").removeClass(
                                        "active"
                                    )),
                                $(t).find(".benefit__body").slideDown(),
                                $(t).addClass("active"));
                });
        }),
        $(".ppf").length &&
        $(".ppf__top__item").each(function (e, t) {
            $(t).click(function (a) {
                a.preventDefault(),
                    $(".ppf__top__item.active").removeClass("active"),
                    $(".ppf__body__item.active").removeClass("active"),
                    $(t).addClass("active"),
                    $(".ppf__body__item").eq(e).addClass("active");
            });
        }),
        (window.onload = function () {
            if (document.querySelectorAll(".comparison")) {
                var e = document.querySelectorAll(".comparison");
                window.innerWidth > 1024
                    ? e.forEach(function (e) {
                        var t = e.querySelector(".comparison__after"),
                            a = e.querySelector(".comparison__slider"),
                            s = !1;
                        e.addEventListener("mousedown", function (e) {
                            (s = !0), e.preventDefault();
                        }),
                            e.addEventListener("mouseup", function () {
                                s = !1;
                            }),
                            e.addEventListener("mousemove", function (o) {
                                if (s) {
                                    var n,
                                        r = e.offsetWidth;
                                    (n = (o.offsetX / r) * 100),
                                        (t.style.width = 100 - n + "%"),
                                        (a.style.left = n + "%");
                                }
                            });
                    })
                    : e.forEach(function (e) {
                        var t = e.querySelector(".comparison__after"),
                            a = e.querySelector(".comparison__slider"),
                            s = !1;
                        function o(t) {
                            (s = !0),
                                t.preventDefault(),
                                "mousedown" === t.type
                                    ? (a = t.clientX)
                                    : "touchstart" === t.type &&
                                    (a = t.touches[0].clientX);
                            var a,
                                o = e.getBoundingClientRect();
                            i(((a - o.left) / o.width) * 100);
                        }
                        function n() {
                            s = !1;
                        }
                        function r(t) {
                            if (s) {
                                t.preventDefault(),
                                    "mousemove" === t.type
                                        ? (a = t.clientX)
                                        : "touchmove" === t.type &&
                                        (a = t.touches[0].clientX);
                                var a,
                                    o = e.getBoundingClientRect();
                                i(((a - o.left) / o.width) * 100);
                            }
                        }
                        function i(e) {
                            (t.style.width = 100 - e + "%"),
                                (a.style.left = e + "%");
                        }
                        e.addEventListener("mousedown", o),
                            e.addEventListener("touchstart", o),
                            e.addEventListener("mouseup", n),
                            e.addEventListener("touchend", n),
                            e.addEventListener("mousemove", r),
                            e.addEventListener("touchmove", r);
                    });
            }
        }),
        $(".slider-partner").length)
) {
    function f() {
        var e = $(".slider-partner__list .slick-current")
            .find(".slider-partner__content h3")
            .text(),
            t = $(".slider-partner__list .slick-current")
                .find(".slider-partner__content p")
                .text();
        $(".slider-partner__number strong").text(
            $(".slider-partner__list").slick("slickCurrentSlide") + 1
        ),
            $(".slider-partner__name").text(e),
            $(".slider-partner__desc").text(t);
    }
    $(".slider-partner__number span").text(
        `/${$(".slider-partner__list .slider-partner__item").length}`
    ),
        $(".slider-partner__list").slick({
            slidesToShow: 2,
            slidesToScroll: 1,
            autoplay: !0,
            autoplaySpeed: 1e3,
            arrows: !1,
            variableWidth: !0,
            touchMove: !1,
            swipe: !1,
            draggable: !1,
            responsive: [
                {
                    breakpoint: 991,
                    settings: {
                        variableWidth: !1,
                        slidesToShow: 1,
                        slidesToScroll: 1,
                    },
                },
            ],
        }),
        f(),
        $(".slider-partner__prev").click(function (e) {
            e.preventDefault(), $(".slider-partner__list").slick("slickPrev");
        }),
        $(".slider-partner__next").click(function (e) {
            e.preventDefault(), $(".slider-partner__list").slick("slickNext");
        }),
        $(".slider-partner__list").on("afterChange", function (e, t, a, s) {
            f();
        });
}
function search() {
    return redirect(ids), !1;
}
function redirect() {
    return (
        "1" == ids
            ? (window.location.href = "/tim-kiem/q=" + $("#q").val())
            : (window.location.href = "/tim-kiem/q=" + $("#q1").val()),
        !1
    );
}
$("#sitemap").attr("content", window.location.href);
// var selectElement = document.getElementById("rim_car");
// if (selectElement) {
//   var v,
//     y = selectElement.value,
//     x = document.querySelector('input[name="slug"]').value.replace("lop-xe-", ""),
//     b = y,
//     k = "loadsize";
//   $.ajax({
//     type: "POST",
//     url: "/ajax.php",
//     dataType: "json",
//     data: { op: k, valtest: b },
//     success: function (e) {
//       $("#loadSize").html("");
//       var t = "";
//       if (((t += '<option value="0">Size lốp</option>'), e.arrayData))
//         for (item of e.arrayData)
//           console.log(x),
//             x == item.slug
//               ? (t +=
//                 "<option value='" + item.id + "' id='" + item.id + "' selected='selected'>" + item.name + "</option>")
//               : (t += "<option value=" + item.id + " id=" + item.id + ">" + item.name + "</option>"),
//             $("#loadSize").html(t);
//       resetSelect($("#loadSize")[0]);
//     },
//   });
// }
$("#rim_car").change(function (e) {
    var t = e.target.value;
    document.querySelector('input[name="slug"]').value.replace("lop-xe-", ""),
        $.ajax({
            type: "POST",
            url: "/ajax.php",
            dataType: "json",
            data: { op: "loadsize", valtest: t },
            success: function (e) {
                $("#loadSize").html("");
                var t = "";
                if (((t += '<option value="0">Size lốp</option>'), e.arrayData))
                    for (item of e.arrayData)
                        item.slug,
                            (t +=
                                "<option value=" +
                                item.id +
                                " id=" +
                                item.id +
                                ">" +
                                item.name +
                                "</option>"),
                            $("#loadSize").html(t);
                resetSelect($("#loadSize")[0]);
            },
        });
}),
    $("#loadSize").change(function (e) { });
// var selectElement = document.getElementById("brandcarfilter");
// if (selectElement) {
//   var y = selectElement.value,
//     b = y,
//     k = "loadcar";
//   $.ajax({
//     type: "POST",
//     url: "/ajax.php",
//     dataType: "json",
//     data: { op: k, valtest: b },
//     success: function (e) {
//       $("#loadcar").html("");
//       var t = "";
//       if (((t += '<option value="0">Xe</option>'), e.arrayData))
//         for (item of e.arrayData)
//           (t += "<option value=" + item.id + " id=" + item.id + ">" + item.name + "</option>"), $("#loadcar").html(t);
//       resetSelect($("#loadcar")[0]);
//     },
//   });
// }
function goToLinkCar() {
    var e = document.getElementById("loadcar");
    let t = document.getElementById("checkCatId").value;
    var a = e.options[e.selectedIndex].text.toLowerCase().replace(/ /g, "-");
    42 == t
        ? (window.location.href = "binh-ac-quy-xe-" + a)
        : 52 == t
            ? (window.location.href = "lop-xe-" + a)
            : (61 == t || 96 == t || 97 == t)
                ? (window.location.href = "camera-hanh-trinh-xe-" + a)
                : 60 == t
                    ? (window.location.href = "cam-bien-ap-suat-lop-xe-" + a)
                    : 88 == t
                        ? (window.location.href = "dan-phim-cach-nhiet-xe-" + a)
                        : 95 == t
                            ? (window.location.href = "dan-ppf-xe-" + a)
                            : 'phu-tung-phu-kien-xe' == t
                                ? (window.location.href = "phu-tung-phu-kien-" + a)
                                : null;
}
function goToLinkTrademarkAcc() {
    var e = document.getElementById("trademark"),
        t = document.querySelector('input[name="slug"]').value,
        a = e.options[e.selectedIndex].text;
    window.location.href = t + "-phu-kien-" + a;
}
function goToLinkDungLuong() {
    var e = document.getElementById("capacitycar"),
        t = document.querySelector('input[name="slug"]').value,
        a = e.options[e.selectedIndex].text;
    window.location.href = t + "-dung-luong-" + a;
}
function goToLinkTrademark() {
    var e = document.getElementById("trademark"),
        t = e.options[e.selectedIndex].text.toLowerCase().replace(/ /g, "-");
    window.location.href = "lop-" + t;
}
function goToLinkPice() {
    var e = document.getElementById("pricecar"),
        t = document.querySelector('input[name="slug"]').value,
        a = e.options[e.selectedIndex].value;
    window.location.href = t + "-search=filter&pricecar=" + a;
}
function goToLinkSize() {
    var e = document.getElementById("loadSize"),
        t = document.querySelector('input[name="slug"]').value,
        a = e.options[e.selectedIndex].text,
        s = a.toLowerCase().replace(/[\/.]/g, "-");
    if ("lop-o-to" == t) window.location.href = "kich-thuoc-lop-xe-" + s;
    else {
        var o = document.getElementById("trademark"),
            n = o.selectedIndex,
            a = o.options[n].text.toLowerCase();
        console.log(a),
            "thương hiệu lốp" != a
                ? (window.location.href = "lop-" + a + "-kich-thuoc-" + s)
                : (window.location.href = "kich-thuoc-lop-xe-" + s);
    }
}
function Register() {
    var e = $("#fullname").val(),
        t = $("#phone").val(),
        a = $("#email").val(),
        s = $("#password-register").val();
    $.ajax({
        type: "POST",
        url: "/ajax.php",
        dataType: "json",
        data: {
            op: "register",
            fullname: e,
            phone: t,
            email: a,
            passwordregister: s,
        },
        success: function (e) {
            if ((console.log(e), null != e.messageR)) {
                var t =
                    '<span style="color:red;font-size: 14px;" >' +
                    e.messageR +
                    "</span>";
                $("#msgRegister").html(t);
            }
        },
    });
}
function Login() {
    var e = $("#account").val(),
        t = $("#password").val();
    $.ajax({
        type: "POST",
        url: "/ajax.php",
        dataType: "json",
        data: { op: "login", account: e, password: t },
        success: function (e) {
            console.log(e),
                "1" == e.erron
                    ? notification("error", e.message)
                    : (notification(
                        "success",
                        "Bạn đ\xe3 đăng nhập th\xe0nh c\xf4ng"
                    ),
                        location.reload());
        },
    });
}
function Logout() {
    var e = $("#account").val(),
        t = $("#password").val();
    $.ajax({
        type: "POST",
        url: "/ajax.php",
        dataType: "json",
        data: { op: "logout", account: e, password: t },
        success: function (e) {
            location.reload();
        },
    });
}
function Forgetpass() {
    var e = $("#email-forget-pass").val();
    $.ajax({
        type: "POST",
        url: "/ajax.php",
        dataType: "json",
        data: { op: "forgetpass", emailforgetpass: e },
        success: function (e) {
            console.log(e),
                0 == e.erron
                    ? (sendCode(e.random_number),
                        $("#email_changePassForm").val(e.mail),
                        notification(
                            "success",
                            "Email x\xe1c thực th\xe0nh c\xf4ng"
                        ))
                    : (errorMail(e.message), notification("error", e.message));
        },
    });
}
function Resetpass() {
    var e = $("#password-change").val(),
        t = $("#retype-password-change").val(),
        email = $("#email_changePassForm").val();
    $.ajax({
        type: "POST",
        url: "/ajax.php",
        dataType: "json",
        data: {
            op: "resetpass",
            passwordchange: e,
            retypepasswordchange: t,
            email: email,
        },
        success: function (e) {
            0 == e.erron
                ? (sendCode(e.random_number),
                    notification("success", "Đổi mật khẩu th\xe0nh c\xf4ng"))
                : (errorMail(e.message), notification("error", e.message));
        },
    });
}
$("#brandcarfilter").change(function (e) {
    var t = e.target.value;
    $.ajax({
        type: "POST",
        url: "/ajax.php",
        dataType: "json",
        data: { op: "loadcar", valtest: t },
        success: function (e) {
            $("#loadcar").html("");
            var t = "";
            if (((t += '<option value="0">Xe</option>'), e.arrayData))
                for (item of e.arrayData)
                    (t +=
                        "<option value=" +
                        item.id +
                        " id=" +
                        item.id +
                        ">" +
                        item.name +
                        "</option>"),
                        $("#loadcar").html(t);
            resetSelect($("#loadcar")[0]);
        },
    });
}),
    $("#loadcar").change(function (e) { });
const inputElement = document.getElementById("q");
var inputTimeOut = null;
function Order(e, t, a) {
    var e = e;
    $.ajax({
        type: "POST",
        url: "/ajax.php",
        dataType: "json",
        data: { op: "order", idProduct: t, idUser: a, cate: e },
        success: function (e) {
            "1" != e.erron
                ? (notification("success", e.message), location.reload())
                : notification("error", e.message);
        },
    });
}
function Remove(e, t) {
    $.ajax({
        type: "POST",
        url: "/ajax.php",
        dataType: "json",
        data: { op: "remove", idProduct: e, idUser: t },
        success: function (e) {
            "1" != e.erron &&
                (notification("success", "X\xf3a th\xe0nh c\xf4ng"),
                    location.reload());
        },
    });
}
function count(e) {
    $.ajax({
        type: "POST",
        url: "/ajax.php",
        dataType: "json",
        data: { op: "count", type: e },
        success: function (e) {
            console.log(e);
        },
    });
}

if (
    inputElement &&
    (inputElement.addEventListener("input", function (e) {
        inputTimeOut && clearTimeout(inputTimeOut),
            (inputTimeOut = setTimeout(() => {
                let t = e.target.value;
                $.ajax({
                    type: "POST",
                    url: "/ajax.php",
                    dataType: "json",
                    data: { op: "searchkw", valkw: t },
                    success: function (e) {
                        console.log(e), console.log(123);
                        let t = [],
                            a = [],
                            s = [];
                        e.listPro &&
                            (t = e.listPro.map((e) => ({
                                image: e.avatar,
                                link: "/" + e.slug,
                                name: e.name,
                                price: "Li\xean hệ",
                            }))),
                            e.accessorys &&
                            (a = e.accessorys.map((e) => ({
                                image: e.avatar,
                                link: "/" + e.slug,
                                name: e.name,
                                price: "Li\xean hệ",
                            }))),
                            e.listCate &&
                            (s = e.listCate.map((e) => ({
                                link: e.slug,
                                name: e.name,
                            }))),
                            (demoListSearch = {
                                ...demoListSearch,
                                listProductAcc: a.length > 0 ? a : [],
                                listProduct: t.length > 0 ? t : [],
                                listCategory: s.length > 0 ? s : [],
                            });
                    },
                });
            }, 300));
    }),
        document.querySelector(".recruitment__form"))
) {
    function C() {
        for (
            var e = "",
            t = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz",
            a = 0;
            a < 5;
            a++
        ) {
            var s = Math.floor(Math.random() * t.length);
            e += t.charAt(s);
        }
        return e;
    }
    $(".capcha__code").text(C()),
        $(".capcha__change").click(function (e) {
            e.preventDefault(), $(".capcha__code").text(C());
        }),
        document
            .querySelector(".recruitment__form")
            .addEventListener("submit", function (e) {
                let t = !0,
                    a = document.getElementById("firstName"),
                    s = document.getElementById("firstNameError");
                a.value.trim()
                    ? (s.textContent = "")
                    : ((s.textContent = "Vui l\xf2ng nhập t\xean."), (t = !1));
                let o = document.getElementById("lastName"),
                    n = document.getElementById("lastNameError");
                o.value.trim()
                    ? (n.textContent = "")
                    : ((n.textContent = "Vui l\xf2ng nhập họ."), (t = !1));
                let r = document.getElementById("mail"),
                    i = document.getElementById("mailError");
                r.value.trim()
                    ? /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(r.value)
                        ? (i.textContent = "")
                        : ((i.textContent = "Vui l\xf2ng nhập email hợp lệ."),
                            (t = !1))
                    : ((i.textContent = "Vui l\xf2ng nhập email."), (t = !1));
                let l = document.getElementById("phone2"),
                    c = document.getElementById("phoneError2");
                l.value.trim()
                    ? /^[0-9]{10}$/.test(l.value)
                        ? (c.textContent = "")
                        : ((c.textContent =
                            "Vui l\xf2ng nhập số điện thoại hợp lệ (10 chữ số)."),
                            (t = !1))
                    : ((c.textContent = "Vui l\xf2ng nhập số điện thoại."),
                        (t = !1));
                let d = document.getElementById("file"),
                    p = document.getElementById("fileError");
                if (d.files.length > 0) {
                    let u = d.files[0].size / 1024 / 1024,
                        h = d.files[0].type;
                    u > 20
                        ? ((p.textContent =
                            "File vượt qu\xe1 dung lượng cho ph\xe9p (20MB)."),
                            (t = !1))
                        : [
                            "application/pdf",
                            "application/msword",
                            "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
                        ].includes(h)
                            ? (p.textContent = "")
                            : ((p.textContent =
                                "File kh\xf4ng đ\xfang định dạng cho ph\xe9p (chỉ chấp nhận .doc, .docx, .pdf)."),
                                (t = !1));
                } else (p.textContent = "Vui l\xf2ng chọn file."), (t = !1);
                let m = document.getElementById("code"),
                    g = m.value.trim();
                "" === g
                    ? ((t = !1),
                        (m
                            .closest(".recruitment__group")
                            .querySelector("#codeError").textContent =
                            "Bạn cần nhập m\xe3 code!"))
                    : g != $(".capcha__code").text()
                        ? ((t = !1),
                            (m
                                .closest(".recruitment__group")
                                .querySelector("#codeError").textContent =
                                "Bạn cần nhập đ\xfang m\xe3 code!"))
                        : (m
                            .closest(".recruitment__group")
                            .querySelector("#codeError").textContent = ""),
                    t || e.preventDefault();
            });
}

$(document).ready(function () {
    const heightHeader = $(".header").height();

    if (
        ($(".header").length &&
            ($(".header__space").height(heightHeader),
                $(".header").addClass("sticky"),
                $(".header").addClass("slide")),
            $(".to-top").length &&
            $(window).scroll(function () {
                $(this).scrollTop() > 3 * window.innerHeight
                    ? $(".to-top").addClass("active")
                    : $(".to-top").removeClass("active");
            }),
            $(".home-banner__list").length &&
            $(".home-banner__item").length > 1 &&
            $(".home-banner__list").slick({
                dots: !0,
                arrows: !1,
                autoplaySpeed: 3e3,
            }),
            $(".feedback__slider").length &&
            $(".feedback__slider").slick({
                autoplay: !0,
                autoplaySpeed: 3e3,
                nextArrow:
                    '<button class="slick-next"><i class="fa-solid fa-chevron-right"></i></button>',
                prevArrow:
                    '<button class="slick-prev"><i class="fa-solid fa-chevron-left"></i></button>',
            }),
            $(".product-slider").length &&
            $(".product-slider").slick({
                dots: !0,
                arrows: !1,
                autoplaySpeed: 3e3,
                slidesToShow: 5,
                slidesToScroll: 5,
                infinite: !1,
                responsive: [
                    {
                        breakpoint: 991,
                        settings: { slidesToShow: 3, slidesToScroll: 3 },
                    },
                    {
                        breakpoint: 767,
                        settings: { slidesToShow: 2, slidesToScroll: 2 },
                    },
                ],
            }) &&
            setTimeout($(".product-slider").css("overflow", "unset"), 1000),
            $(".news__slider").length &&
            $(".news__slider").slick({
                arrows: !1,
                autoplay: !0,
                autoplaySpeed: 6e3,
                slidesToShow: 3,
                slidesToScroll: 3,
                infinite: !0,
                responsive: [
                    {
                        breakpoint: 991,
                        settings: {
                            slidesToShow: 2,
                            slidesToScroll: 2,
                            dots: !0,
                        },
                    },
                    {
                        breakpoint: 767,
                        settings: {
                            slidesToShow: 1,
                            slidesToScroll: 1,
                            dots: !0,
                        },
                    },
                ],
            }),
            $(".maintenance__top").length &&
            $(".maintenance__top").slick({
                slidesToShow: 6,
                slidesToScroll: 6,
                nextArrow:
                    '<button class="slick-next"><i class="fa-solid fa-chevron-right"></i></button>',
                prevArrow:
                    '<button class="slick-prev"><i class="fa-solid fa-chevron-left"></i></button>',
                responsive: [
                    {
                        breakpoint: 991,
                        settings: { slidesToShow: 2, slidesToScroll: 2 },
                    },
                    {
                        breakpoint: 767,
                        settings: { slidesToShow: 1, slidesToScroll: 1 },
                    },
                ],
            }),
            $(".maintenance__slider").length &&
            $(".maintenance__slider").slick({
                slidesToShow: 4,
                slidesToScroll: 4,
                nextArrow:
                    '<button class="slick-next"><i class="fa-solid fa-chevron-right"></i></button>',
                prevArrow:
                    '<button class="slick-prev"><i class="fa-solid fa-chevron-left"></i></button>',
                responsive: [
                    {
                        breakpoint: 991,
                        settings: { slidesToShow: 2, slidesToScroll: 2 },
                    },
                    {
                        breakpoint: 767,
                        settings: { slidesToShow: 1, slidesToScroll: 1 },
                    },
                ],
            }),
            $(".reviews__form__stars").length)
    ) {
        let d = 0;
        $(".reviews__form__stars span").each(function (e, t) {
            $(t).hover(
                function () {
                    $(".reviews__form__stars span").each(function (t, a) {
                        t <= e
                            ? $(a).addClass("checked")
                            : $(a).removeClass("checked");
                    });
                },
                function () {
                    console.log(d),
                        0 != d
                            ? $(".reviews__form__stars span").each(function (
                                e,
                                t
                            ) {
                                e + 1 <= d
                                    ? $(t).addClass("checked")
                                    : $(t).removeClass("checked");
                            })
                            : $(".reviews__form__stars span").each(function (
                                e,
                                t
                            ) {
                                $(t).removeClass("checked");
                            });
                }
            ),
                $(t).click(function (e) {
                    e.preventDefault(),
                        (d = $(this).data("num")),
                        $("#score-reviews").val(d),
                        $(".reviews__form__stars span").each(function (e, t) {
                            e + 1 <= d
                                ? $(t).addClass("checked")
                                : $(t).removeClass("checked");
                        });
                });
        });
    }
});

// js phần popup
document.addEventListener("DOMContentLoaded", function () {
    const popupOverlay = document.getElementById("popupOverlay");
    const closePopup = document.getElementById("closePopup");

    popupOverlay?.classList.add("show");

    closePopup?.addEventListener("click", () => {
        popupOverlay?.classList.remove("show");
    });

    popupOverlay?.addEventListener("click", (e) => {
        if (e.target === popupOverlay) {
            popupOverlay?.classList.remove("show");
        }
    });

    setTimeout(() => {
        popupOverlay?.classList.remove("show");
    }, 10000);
});

if ($(".expert__body").length) {
    $(".expert__body").on("click", function (e) {
        // Nếu click vào thẻ a thì cho link chạy bình thường
        if ($(e.target).closest("a").length) {
            return;
        }

        $(".expert__body").toggleClass("active");
    });
}
//check comment
document.addEventListener("DOMContentLoaded", function () {
    document
        .querySelector(".reviews__form")
        .addEventListener("submit", function (e) {
            let content = document.querySelector("#content").value.trim();
            let recaptchaResponse = grecaptcha.getResponse();

            // Kiểm tra nội dung đánh giá
            if (content === "") {
                alert("Vui lòng nhập nội dung đánh giá!");
                e.preventDefault(); // Ngăn form gửi đi
                return;
            }

            // Kiểm tra reCAPTCHA
            if (recaptchaResponse === "") {
                alert("Vui lòng xác thực reCAPTCHA!");
                e.preventDefault();
                return;
            }
        });
});

// tạo danh mục từ cách thẻ H trong trang
document.addEventListener("DOMContentLoaded", function () {
    const tocWrapper = document.getElementById("toc-wrapper");
    const tocList = document.getElementById("toc-list");
    const toggleBtn = document.getElementById("toggle-btn");

    // Hàm kiểm tra nếu có ít nhất một thẻ heading
    function hasHeadings() {
        return document.querySelector("h1, h2, h3, h4, h5, h6") !== null;
    }

    // Hàm chuyển đổi chữ có dấu thành không dấu
    function removeAccents(str) {
        const accents = {
            a: /[àáảãạăằắẳẵặâầấẩẫậ]/g,
            e: /[èéẻẽẹêềếểễệ]/g,
            i: /[ìíỉĩị]/g,
            o: /[òóỏõọôồốổỗộơờớở̃ợ]/g,
            u: /[ùúủũụưừứửữự]/g,
            y: /[ỳýỷỹỵ]/g,
            d: /[đ]/g,
        };

        for (let letter in accents) {
            str = str.replace(accents[letter], letter);
        }
        return str;
    }

    // Hàm tạo id cho các thẻ heading
    function generateToc() {
        const headings = document.querySelectorAll("h2, h3, h4, h5, h6");
        headings.forEach((heading, index) => {
            // Kiểm tra nếu thẻ heading không nằm trong <header>, <footer> và không có class 'ldp-care__combo__name'
            if (
                !heading.closest("header") &&
                !heading.closest("footer") &&
                !heading.classList.contains("ldp-care__combo__name")
            ) {
                // const text = removeAccents(
                //     heading.textContent
                //         .trim()
                //         .toLowerCase()
                //         .replace(/\s+/g, "-")
                //         .replace(/^[0-9]+\.\s*/, "")
                //         .replace(/[^\p{L}\p{N}\s-]/gu, "")
                //         .replace(/^-+|-+$/g, "")
                // );
                // const id = `${text}`;
                const cleanedText = heading.textContent.replace(/[đĐ]/g, 'd').replace(/^\d+\.\s*/, "");
                const id = toSlug(cleanedText);

                // Gắn ID cho thẻ heading
                heading.id = id;

                // Tạo danh mục và thêm vào <ul>
                const listItem = document.createElement("li");
                const link = document.createElement("a");
                link.href = `#${id}`;
                link.textContent = heading.textContent;

                listItem.appendChild(link);
                tocList?.appendChild(listItem);
            }
        });
    }

    // Hàm cuộn đến vị trí thẻ khi nhấn vào danh mục
    if (tocList) {
        tocList.addEventListener("click", function (e) {
            if (e.target.tagName === "A") {
                const targetId = e.target.getAttribute("href").substring(1);
                const targetElement = document.getElementById(targetId);
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 2000,
                        behavior: "smooth",
                    });
                }
            }
        });
    }

    // Hiển thị/ẩn danh mục khi bấm nút
    if (toggleBtn) {
        toggleBtn.addEventListener("click", function () {
            tocList.classList.toggle("hidden");
            toggleBtn.textContent = tocList.classList.contains("hidden")
                ? "▼"
                : "▲";
        });
    }

    // Kiểm tra nếu có ít nhất một thẻ heading, rồi mới gọi generateToc
    if (hasHeadings()) {
        generateToc();
    }
});

//js cho phần bản giá
document.addEventListener("DOMContentLoaded", function () {
    const toggles = document.querySelectorAll(".toggle-service__btn");

    toggles.forEach((btn) => {
        btn.addEventListener("click", function () {
            const currentWrapper = btn.closest(".service__wrapper");
            const currentListWrapper = currentWrapper.querySelector(
                ".service-list__wrapper"
            );

            const isOpen = currentListWrapper.classList.contains("expanded");

            // Ẩn tất cả cái khác
            document
                .querySelectorAll(".service-list__wrapper")
                .forEach((wrapper) => {
                    wrapper.classList.remove("expanded");
                    const btnSibling = wrapper
                        .closest(".service__wrapper")
                        .querySelector(".toggle-service__btn");
                    if (btnSibling) btnSibling.textContent = "▼";
                });

            // Mở lại nếu đang đóng
            if (!isOpen) {
                currentListWrapper.classList.add("expanded");
                btn.textContent = "▲";
            }
        });
    });
});

$(document).ready(function () {
    const $for = $(".slider-for");
    const $nav = $(".slider-nav");

    if (!$for.length || !$nav.length) return;

    // ✅ Hàm cập nhật caption
    function updateCaption(index = 0) {
        const $currentSlide = $for.find(
            '.slick-slide[data-slick-index="' + index + '"]'
        );
        if (!$currentSlide.length) return;

        const $img = $currentSlide.find("img");
        const caption = $img.data("caption");
        const $captionEl = $currentSlide.find(".caption-text");

        if ($captionEl.length) {
            $captionEl.text(caption || "");
        }
    }

    // Caption ban đầu
    const $firstSlide = $for.find("> div").eq(0);
    if ($firstSlide.length) {
        const caption = $firstSlide.find("img").data("caption");
        const $captionEl = $firstSlide.find(".caption-text");
        if ($captionEl.length && caption) {
            $captionEl.text(caption);
        }
    }

    // ✅ Khởi tạo slider chính và nav
    $for.slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        fade: true,
        asNavFor: ".slider-nav",
    });

    $nav.slick({
        slidesToShow: 3,
        slidesToScroll: 1,
        asNavFor: ".slider-for",
        dots: false,
        arrows: true,
        centerMode: true,
        focusOnSelect: true,
        autoplay: true,
        prevArrow: $(".prev-btn"),
        nextArrow: $(".next-btn"),
        responsive: [
            {
                breakpoint: 426,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                },
            },
        ],
    });

    $for.on("afterChange", function (event, slick, currentSlide) {
        updateCaption(currentSlide);
    });
});

// js cho phần popup
document.addEventListener("DOMContentLoaded", function () {
    const popupGallery = document.getElementById("popup-gallery");
    const popupSlider = $(".popup-content__item");
    const closeBtn = document.querySelector(".popup-close");
    const overlay = document.querySelector(".popup-overlay");
    const popupContent = document.querySelector(".popup-content");
    const sliderItems = document.querySelectorAll(".slider-for > div");
    let slickInitialized = false;

    if (
        !popupGallery ||
        !popupSlider.length ||
        !closeBtn ||
        !overlay ||
        !popupContent ||
        !sliderItems.length
    ) {
        return;
    }

    function updatePopupCaption(index) {
        const currentSlide = popupSlider.find(
            ".slick-slide[data-slick-index='" + index + "']"
        );
        if (!currentSlide.length) return;

        const img = currentSlide.find("img");
        const caption = img.data("caption");
        const captionP = currentSlide.find(".caption-text");

        if (captionP.length) {
            captionP.text(caption || "");
        }
    }

    function openPopup(index) {
        popupGallery.style.display = "flex";

        if (!slickInitialized) {
            popupSlider.one("init", function () {
                popupSlider.slick("slickGoTo", index, true);
                popupSlider.slick("setPosition");
                updatePopupCaption(index);
            });

            popupSlider.slick({
                infinite: true,
                slidesToShow: 1,
                slidesToScroll: 1,
                speed: 500,
                dots: false,
                autoplay: false,
                arrows: true,
                touchMove: false,
                nextArrow: $(".next-btn__popup"),
                prevArrow: $(".prev-btn__popup"),
            });

            slickInitialized = true;
        } else {
            popupSlider.slick("slickGoTo", index, true);
            popupSlider.slick("setPosition");
            updatePopupCaption(index);
        }
    }

    function closePopup() {
        popupGallery.style.display = "none";
    }

    function bindEvents() {
        sliderItems.forEach((item, index) => {
            const img = item.querySelector("img");
            if (!img) return;

            img.addEventListener("click", () => {
                // Lấy caption từ ảnh vừa click
                const caption = img.dataset.caption || "";
                const captionEl = document.querySelector(
                    ".popup-gallery .caption-text"
                );
                if (captionEl) captionEl.textContent = caption;

                openPopup(index); // Mở popup như cũ
            });
        });

        popupSlider.on("afterChange", function (event, slick, currentSlide) {
            updatePopupCaption(currentSlide);
        });

        closeBtn.addEventListener("click", closePopup);
        overlay.addEventListener("click", closePopup);

        // ⬇️ Click ra ngoài popup-content thì đóng popup
        popupGallery.addEventListener("click", function (e) {
            if (!popupContent.contains(e.target)) {
                closePopup();
            }
        });

        document.addEventListener("keydown", function (e) {
            if (e.key === "Escape") {
                closePopup();
            }
        });

        let resizeTimer;
        window.addEventListener("resize", function () {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(() => {
                if (slickInitialized && popupSlider.length) {
                    popupSlider.slick("setPosition");
                }
            }, 200);
        });
    }

    bindEvents();
});

// js banner thanh an ở trang chủ

$(document).ready(function () {
    const $banner = $(".homepage__banner");

    if ($banner.length === 0) {
        return;
    }

    $banner.slick({
        infinite: true,
        speed: 500,
        dots: false,
        autoplay: true,
        arrows: false,
        touchMove: false,
    });
});



// js cho phần header 
document.addEventListener("DOMContentLoaded", function () {
    const promo = document.querySelector('.promotion-container');
    if (!promo) return;

    let lastScrollTop = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.scrollY;

        if (currentScroll > 300 && currentScroll > lastScrollTop) {
            promo.classList.add('hide');
        }
        else if (currentScroll < lastScrollTop) {
            promo.classList.remove('hide');
        }

        lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;
    });
});


//js cho phần promotion
document.addEventListener("DOMContentLoaded", () => {
    const filter = document.querySelector(".promotion-product__filter");
    if (!filter) return;

    let isDragging = false;
    let startX = 0;
    let scrollStart = 0;
    let moved = false;

    filter.addEventListener("pointerdown", (e) => {
        isDragging = true;
        moved = false;
        startX = e.clientX;
        scrollStart = filter.scrollLeft;
        filter.style.cursor = "grabbing";
    });

    filter.addEventListener("pointermove", (e) => {
        if (!isDragging) return;
        e.preventDefault();
        const dx = e.clientX - startX;
        if (Math.abs(dx) > 5) moved = true; // ngăn click khi drag thật
        filter.scrollLeft = scrollStart - dx;
    });

    const stopDrag = () => {
        isDragging = false;
        filter.style.cursor = "grab";
    };

    filter.addEventListener("pointerup", (e) => {
        stopDrag();
        // Nếu không drag mà chỉ click → cho click hoạt động bình thường
        if (!moved) {
            const item = e.target.closest(".promotion-product__item");
            if (item) {
                document
                    .querySelectorAll(".promotion-product__item.active")
                    .forEach((el) => el.classList.remove("active"));
                item.classList.add("active");
            }
        }
    });
});

// js banner promotion
document.addEventListener("DOMContentLoaded", function () {
    function initBannerSlider(wrapperSelector, linkSelector, imageSelector) {
        const bannerWrapper = document.querySelector(wrapperSelector);
        if (!bannerWrapper) return;

        const bannerImages = bannerWrapper.querySelectorAll(linkSelector);

        // Clone thêm nếu ít hơn 3
        if (bannerImages.length > 0 && bannerImages.length < 3) {
            const fragment = document.createDocumentFragment();
            const clonesNeeded = 3 - bannerImages.length;

            for (let i = 0; i < clonesNeeded; i++) {
                const clone = bannerImages[i % bannerImages.length].cloneNode(true);
                fragment.appendChild(clone);
            }

            bannerWrapper.appendChild(fragment);
        }

        // Slick cho banner
        const allImages = bannerWrapper.querySelectorAll(imageSelector);
        if (typeof $ !== "undefined" && $.fn.slick && allImages.length > 1) {
            $(bannerWrapper).slick({
                slidesToShow: 1,
                slidesToScroll: 1,
                infinite: true,
                arrows: false,
                dots: false,
                autoplay: true,
                autoplaySpeed: 3000,
                adaptiveHeight: true,
            });
        }
    }

    // Gọi cho từng loại banner
    initBannerSlider(".product-promotion__banner", ".promotion-banner__link", ".promotion-banner__image");
    initBannerSlider(".product-promotion__banner-MB", ".promotion-banner__link-MB", ".promotion-banner__image-MB");
});

// css cho phần banner trang chủ 
document.addEventListener('DOMContentLoaded', function () {

    // Hàm tái sử dụng logic hiển thị popup ảnh
    function initBannerPopup(config) {
        const bannerItems = document.querySelectorAll(config.items);
        const bannerBg = document.querySelector(config.bg);
        const bannerView = document.querySelector(config.view);
        const bannerClose = document.querySelector(config.close);
        const bannerViewImg = bannerView ? bannerView.querySelector(config.img) : null;

        if (!bannerItems.length || !bannerBg || !bannerView || !bannerViewImg || !bannerClose) {
            return; // không đủ phần tử thì bỏ qua
        }

        bannerItems.forEach(item => {
            item.addEventListener('click', () => {
                const img = item.querySelector('img');
                const src = img ? img.getAttribute('src') : '';

                if (src) bannerViewImg.setAttribute('src', src);
                bannerBg.classList.add('active');
                bannerView.classList.add('active');
            });
        });

        // đóng popup
        const closePopup = () => {
            bannerBg.classList.remove('active');
            bannerView.classList.remove('active');
        };

        bannerClose.addEventListener('click', closePopup);
        bannerBg.addEventListener('click', closePopup);
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') closePopup();
        });
    }

    // ⚡ Dùng lại cho banner ở trang chủ (cấu hình cũ)
    initBannerPopup({
        items: '.home-banner__item',
        bg: '.banner-img__backround',
        view: '.banner-img__view',
        close: '.banner-img__closebtn',
        img: '.banner-img__main'
    });

    // ⚡ Dùng lại cho banner trong phần bạn vừa gửi (chỉ cần đổi selector)
    initBannerPopup({
        items: '.product-promotion__banner img, .product-promotion__banner-MB img',
        bg: '.banner-img__backround',
        view: '.banner-img__view',
        close: '.banner-img__closebtn',
        img: '.banner-img__main'
    });

});


document.addEventListener("DOMContentLoaded", function () {
    const buttons = document.querySelectorAll(".promotion-product__item");
    const products = document.querySelectorAll("#product-promotion");
    const services = document.querySelectorAll("#service-promotion");
    const seeMoreLinks = document.querySelectorAll(".promotion-seemore__btn");
    const seeMoreWrapper = document.querySelectorAll(".promotion-seemore"); // vùng chứa nút
    const bannerImg = document.querySelector(".promotion-banner img");
    const bannerMobileImg = document.querySelector(".promotion-banner__mobile img");

    buttons.forEach(btn => {
        btn.addEventListener("click", function (e) {
            e.preventDefault();
            const cateId = this.dataset.cateId;
            const cateSlug = this.dataset.slug;
            const imgUrl = this.dataset.img || "";
            const type = this.dataset.type || "";

            // Active trạng thái nút
            buttons.forEach(b => b.classList.remove("active"));
            this.classList.add("active");

            // Hiển thị sản phẩm có cateId tương ứng
            products.forEach(prod => {
                const cateIds = prod.dataset.cateIds ? prod.dataset.cateIds.split(",") : [];
                prod.style.display = cateIds.includes(cateId) ? "block" : "none";
            });

            // Hiển thị dịch vụ có cateId tương ứng
            services.forEach(svc => {
                const cateIds = svc.dataset.cateIds ? svc.dataset.cateIds.split(",") : [];
                svc.style.display = cateIds.includes(cateId) ? "block" : "none";
            });

            // Cập nhật href cho link "Xem thêm"
            seeMoreLinks.forEach(link => {
                link.href = cateSlug;
            });

            // 🔄 Đổi banner theo loại (category / parent)
            if (imgUrl) {
                bannerImg.src = imgUrl;
                bannerMobileImg.src = imgUrl;
            }

            // 👇 Ẩn hoặc hiện nút "Xem thêm" nếu là dịch vụ
            if (type === "parent") {
                seeMoreWrapper.forEach(w => w.style.display = "none");
            } else {
                seeMoreWrapper.forEach(w => w.style.display = "flex");
            }
        });
    });

    // Mặc định chọn danh mục đầu tiên
    if (buttons.length > 0) {
        buttons[0].click();
    }
});

// new js all slick use in layout 
function createUniversalSlider({
    selector,
    rows = 1,
    desktop = 4,
    tablet = 3,
    mobile = 2,
    minSlides = 0,
    prevBtn = null, // Selector của nút Back (VD: '.prev-btn')
    nextBtn = null, // Selector của nút Next (VD: '.next-btn')
    options = {}
}) {
    const $sliders = $(selector);
    if (!$sliders.length) return;

    // Helper: Nhân bản slide
    const ensureMinSlides = ($el, minCount) => {
        const $items = $el.children();
        let count = $items.length;
        if (count === 0 || count >= minCount) return;
        let i = 0;
        while (count < minCount) {
            $el.append($items.eq(i % $items.length).clone());
            count++;
            i++;
        }
    };

    $sliders.each(function () {
        const $this = $(this);
        if ($this.hasClass("slick-initialized")) return;
        if (minSlides > 0) ensureMinSlides($this, minSlides);
        $this.slick({
            infinite: false,
            arrows: false,
            dots: true,
            rows: rows,
            ...(rows > 1
                ? { slidesPerRow: desktop }
                : { slidesToShow: desktop, slidesToScroll: desktop }
            ),
            responsive: [
                {
                    breakpoint: 769,
                    settings: (rows > 1 ? { slidesPerRow: tablet } : { slidesToShow: tablet, slidesToScroll: tablet })
                },
                {
                    breakpoint: 550,
                    settings: (rows > 1 ? { slidesPerRow: mobile } : { slidesToShow: mobile, slidesToScroll: mobile })
                },
            ],
            ...options
        });
        if (prevBtn) {
            $(prevBtn).on("click", function () {
                $this.slick("slickPrev");
            });
        }
        if (nextBtn) {
            $(nextBtn).on("click", function () {
                $this.slick("slickNext");
            });
        }
    });
}

function initcategorySlider() {
    const slider = document.querySelector('.home-category__product');
    if (!slider) return;

    const customPrevArrow = '.home-category__prev';
    const customNextArrow = '.home-category__next';

    $(slider).slick({
        infinite: false,
        arrows: true,
        prevArrow: $(customPrevArrow),
        nextArrow: $(customNextArrow),
        dots: false,
        rows: 2,
        slidesPerRow: 10,
        responsive: [
            {
                breakpoint: 1150,
                settings: { slidesPerRow: 8, },
            },
            {
                breakpoint: 1025,
                settings: { slidesPerRow: 6, },
            },
            {
                breakpoint: 680,
                settings: { slidesPerRow: 4, },
            },
        ],
    });
}

function initAccessoryCategorySliders() {
    const sliders = document.querySelectorAll('.accessory-category__product');
    if (!sliders.length) return;

    sliders.forEach((slider) => {
        if ($(slider).hasClass('slick-initialized')) {
            $(slider).slick('unslick');
        }

        const block = slider.closest('.accessory-category__block');
        const $prevBtn = block ? $(block).find('.accessory-category__prev') : $();
        const $nextBtn = block ? $(block).find('.accessory-category__next') : $();

        $(slider).slick({
            infinite: false,
            arrows: true,
            prevArrow: $prevBtn.length ? $prevBtn : undefined,
            nextArrow: $nextBtn.length ? $nextBtn : undefined,
            dots: false,
            slidesToShow: 10,
            slidesToScroll: 1,
            responsive: [
                { breakpoint: 1150, settings: { slidesToShow: 8 } },
                { breakpoint: 1025, settings: { slidesToShow: 6 } },
                { breakpoint: 680, settings: { slidesToShow: 4 } }
            ]
        });
    });
}


function initBannerSlider() {
    const container = $('.home-banner__container');
    const slider = container[0];

    if (!slider) {
        return;
    }

    const items = Array.from(slider.children);
    const minItems = 3;
    let itemCount = items.length;

    if (itemCount > 0 && itemCount < minItems) {
        const itemsToClone = minItems - itemCount;
        const originalItems = items.slice(0, itemCount);
        let clonedCount = 0;

        for (let i = 0; i < itemsToClone; i++) {
            const itemToCopy = originalItems[i % itemCount];
            const clonedItem = itemToCopy.cloneNode(true);

            $(clonedItem).addClass('cloned-banner-item');
            slider.appendChild(clonedItem);
            clonedCount++;
        }

    }

    // Khởi tạo Slick
    if (slider.children.length >= 1) {
        $(slider).slick({
            infinite: true,
            slidesToShow: 1,
            slidesToScroll: 1,
            arrows: false,
            dots: false,
            autoplay: true,
            autoplaySpeed: 3000,
            pauseOnHover: true,
        });
    } else {
        console.warn("[Banner] Không tìm thấy item nào để khởi tạo Slick Carousel.");
    }
}

function initServiceSlider() {
    const container = $('.home-service__container');
    if (!container.length) {
        return;
    }

    const mobileBreakpoint = 769; // Điều kiện màn hình nhỏ hơn 769px

    function checkSlick() {
        if (window.innerWidth < mobileBreakpoint) {
            if (!container.hasClass('slick-initialized')) {
                container.find('.home-service__item').css({
                    'width': 'auto',
                    'border-right': 'none'
                });

                container.slick({
                    infinite: true,
                    autoplay: true,
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    arrows: false,
                    dots: false,
                    centerMode: false,
                    variableWidth: false,
                    autoplaySpeed: 6000,
                    cssEase: 'linear'
                });

                container.find('.slick-slide .home-service__item .flex').css('justify-content', 'center');
            }
        } else {
            if (container.hasClass('slick-initialized')) {
                container.slick('unslick');

                container.find('.home-service__item').css({
                    'width': '', // Xóa thuộc tính width inline
                    'border-right': '1px solid #e5e7eb'
                });
                container.find('.home-service__item .flex').css('justify-content', '');
                container.find('.home-service__item:last-child').css('border-right', 'none');
            }
        }
    }

    checkSlick();
    let resizeTimer;
    $(window).on('resize', function () {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(checkSlick, 250);
    });
}

function initProductPopup() {
    const openBtns = document.querySelectorAll('.product-seemore__btn');
    const closeBtn = document.querySelector('.product-popup__close');
    const popupBg = document.querySelector('.product-popup__background');
    const popupContainer = document.querySelector('.product-popup__container');
    const popupContent = document.querySelector('.product-popup__content');

    if (!openBtns.length || !closeBtn || !popupBg || !popupContainer || !popupContent) return;

    // Hàm đo chiều cao product đầu tiên
    const adjustPopupContentHeight = () => {
        const firstProduct = popupContent.querySelector('.product');
        if (!firstProduct) return;

        let totalHeight = firstProduct.offsetHeight;

        // Thêm padding nếu cần
        const style = getComputedStyle(popupContent);
        const paddingTop = parseInt(style.paddingTop) || 0;
        const paddingBottom = parseInt(style.paddingBottom) || 0;
        totalHeight += paddingTop + paddingBottom;

        // Giới hạn max-height 80% viewport
        const maxHeight = window.innerHeight * 0.8;

        // Gán class cho popupContent
        popupContent.classList.add('product-popup__content--maxheight');

        // Thêm CSS dynamic nếu chưa có
        const styleId = 'popup-content-maxheight-style';
        if (!document.getElementById(styleId)) {
            const styleEl = document.createElement('style');
            styleEl.id = styleId;
            styleEl.innerHTML = `
                .product-popup__content--maxheight {
                    max-height: ${Math.min(totalHeight, maxHeight)}px;
                    overflow-y: auto;
                }
            `;
            document.head.appendChild(styleEl);
        } else {
            // Nếu style đã tồn tại, cập nhật max-height
            document.getElementById(styleId).innerHTML = `
                .product-popup__content--maxheight {
                    max-height: ${Math.min(totalHeight, maxHeight)}px;
                    overflow-y: auto;
                }
            `;
        }
    };

    const openPopup = (e) => {
        const title = $(e.currentTarget).data("title");
        const type = $(e.currentTarget).data("type");
        const idCar = $(e.currentTarget).data("idcar");
        if (type == 1) {
            const url = $(e.currentTarget).data("url");
            window.location.href = url;
        } else {
            $.ajax({
                url: "/ajax.php",
                type: "POST",
                dataType: "json",
                data: {
                    op: "load_product",
                    type: type,
                    idcar: idCar,
                },
                success: function (response) {
                    $("#content-popup-product").html(response.html);
                }
            });
            $(".title-popup").text(title);
            popupBg.classList.add('active');
            popupContainer.classList.add('active');
            document.body.style.overflow = 'hidden';
            document.body.style.pointerEvents = 'none';
            popupBg.style.pointerEvents = 'auto';
            popupContainer.style.pointerEvents = 'auto';
            adjustPopupContentHeight();
        }
    };

    const closePopup = () => {
        popupBg.classList.remove('active');
        popupContainer.classList.remove('active');
        document.body.style.overflow = '';
        document.body.style.pointerEvents = '';
        popupContent.classList.remove('product-popup__content--maxheight');
    };

    openBtns.forEach(btn => btn.addEventListener('click', openPopup));
    closeBtn.addEventListener('click', closePopup);
    popupBg.addEventListener('click', closePopup);
    document.addEventListener('keydown', e => {
        if (e.key === 'Escape') closePopup();
    });

    window.addEventListener('resize', () => {
        if (popupContainer.classList.contains('active')) {
            adjustPopupContentHeight();
        }
    });
}

// js toggle active cho class lựa chọn 
function initToggleSystem(configs = []) {
    if (!window._toggleSystemState) {
        window._toggleSystemState = { docKeys: new Set(), keyKeys: new Set() };
    }
    const state = window._toggleSystemState;

    configs.forEach((cfg, cfgIndex) => {
        if (!cfg || !cfg.trigger) return;

        const activeClass = cfg.activeClass || "active";
        const behavior = cfg.behavior || "toggle";
        const closeOnOutside = !!cfg.closeOnOutside;
        const closeOnEsc = !!cfg.closeOnEsc;
        const overlayCloses = !!cfg.overlayCloses;
        const innerSelector = cfg.innerSelector || null;
        const closeBtnSelector = cfg.closeBtn || null;
        const groupSelector = cfg.groupSelector || null;

        const triggers = Array.from(document.querySelectorAll(cfg.trigger));
        if (!triggers.length) return;

        const targets = cfg.target ? Array.from(document.querySelectorAll(cfg.target)) : [];

        const closeAll = () => {
            targets.forEach(t => t.classList.remove(activeClass));
            triggers.forEach(t => t.classList.remove(activeClass));
        };

        // bind sự kiện click cho từng trigger (chỉ bind 1 lần)
        triggers.forEach((trigger, idx) => {
            if (trigger.dataset._toggleBound === "true") return;
            trigger.dataset._toggleBound = "true";

            trigger.addEventListener("click", (e) => {
                e.stopPropagation();

                // Tìm target element ứng với trigger (nếu có)
                let targetEl = null;
                if (cfg.target) {
                    if (trigger.dataset && trigger.dataset.target) {
                        targetEl = document.querySelector(trigger.dataset.target);
                    } else {
                        targetEl = targets[idx] || targets[0] || null;
                    }
                }

                // ---- behavior activate (tab-like) ----
                if (behavior === "activate") {
                    if (groupSelector) {
                        document.querySelectorAll(groupSelector).forEach(el => el.classList.remove(activeClass));
                    } else {
                        triggers.forEach(t => t.classList.remove(activeClass));
                    }
                    trigger.classList.add(activeClass);

                    if (targets.length > 0 && targetEl) {
                        targets.forEach(t => t.classList.remove(activeClass));
                        targetEl.classList.add(activeClass);
                    }
                }

                // ---- toggle mode ----
                else {
                    if (targetEl) targetEl.classList.toggle(activeClass);
                    else trigger.classList.toggle(activeClass);
                }

                // callback onToggle (nếu có)
                if (typeof cfg.onToggle === "function") {
                    try { cfg.onToggle(trigger, idx); } catch (err) { /* ignore */ }
                }

                // -> GỌI onActiveChange bất kể có target hay không
                if (typeof cfg.onActiveChange === "function") {
                    const isActive = targetEl ? targetEl.classList.contains(activeClass) : trigger.classList.contains(activeClass);
                    try { cfg.onActiveChange(isActive, trigger, targetEl, idx); } catch (err) { /* ignore */ }
                }
            });
        });

        // bind nút đóng (nhiều selector)
        if (closeBtnSelector) {
            Array.from(document.querySelectorAll(closeBtnSelector)).forEach(btn => {
                if (btn.dataset._toggleCloseBound === "true") return;
                btn.dataset._toggleCloseBound = "true";
                btn.addEventListener("click", (e) => {
                    e.stopPropagation();
                    closeAll();
                });
            });
        }

        // click outside để đóng
        if (closeOnOutside) {
            const docKey = `doc_${cfg.trigger}|${cfg.target || ""}|${cfgIndex}`;
            if (!state.docKeys.has(docKey)) {
                state.docKeys.add(docKey);
                document.addEventListener("click", (e) => {
                    const currTriggers = Array.from(document.querySelectorAll(cfg.trigger));
                    const currTargets = cfg.target ? Array.from(document.querySelectorAll(cfg.target)) : [];

                    const clickedOnTrigger = currTriggers.some(t => t.contains(e.target));
                    const clickedOnOverlay = overlayCloses && currTargets.some(t => e.target === t);

                    const clickedInsideTarget = currTargets.some(t => {
                        const inner = innerSelector ? t.querySelector(innerSelector) : t;
                        return inner && inner.contains(e.target);
                    });

                    if (clickedOnOverlay) {
                        currTargets.forEach(t => t.classList.remove(activeClass));
                        currTriggers.forEach(t => t.classList.remove(activeClass));
                        return;
                    }

                    if (!clickedInsideTarget && !clickedOnTrigger) {
                        currTargets.forEach(t => t.classList.remove(activeClass));
                        currTriggers.forEach(t => t.classList.remove(activeClass));
                    }
                });
            }
        }

        // ESC để đóng
        if (closeOnEsc) {
            const escKey = `esc_${cfg.trigger}|${cfg.target || ""}|${cfgIndex}`;
            if (!state.keyKeys.has(escKey)) {
                state.keyKeys.add(escKey);
                document.addEventListener("keydown", (e) => {
                    if (e.key === "Escape") {
                        const currTargets = cfg.target ? Array.from(document.querySelectorAll(cfg.target)) : [];
                        const currTriggers = Array.from(document.querySelectorAll(cfg.trigger));
                        currTargets.forEach(t => t.classList.remove(activeClass));
                        currTriggers.forEach(t => t.classList.remove(activeClass));
                    }
                });
            }
        }

        // === gọi onActiveChange cho trạng thái ban đầu (nếu có active sẵn trong DOM) ===
        if (typeof cfg.onActiveChange === "function") {
            // delay một tick để đảm bảo các class có sẵn đã gán xong (nếu include động)
            setTimeout(() => {
                Array.from(document.querySelectorAll(cfg.trigger)).forEach((tr, i) => {
                    const targetEl = cfg.target ? (document.querySelectorAll(cfg.target)[i] || document.querySelectorAll(cfg.target)[0]) : null;
                    const isActive = targetEl ? targetEl.classList.contains(activeClass) : tr.classList.contains(activeClass);
                    if (isActive) {
                        try { cfg.onActiveChange(true, tr, targetEl, i); } catch (err) { }
                    }
                });
            }, 0);
        }
    });
}

// js số trang tăng giảm
function initPaginationSystem() {
    document.addEventListener('click', function (e) {
        const btn = e.target.closest('.product-toolbar__nav-btn');
        if (!btn) return;

        const paginationBox = btn.closest('.product-toolbar__pagination');
        if (!paginationBox) return;

        const infoSpan = paginationBox.querySelector('.product-toolbar__page-info');
        if (!infoSpan) return;

        let [currentPage, totalPage] = infoSpan.textContent.split('/').map(num => parseInt(num.trim()));

        const btnText = btn.textContent.trim();
        const isNext = btnText.includes('>') || btnText.includes('❯');
        const isPrev = btnText.includes('<') || btnText.includes('❮');

        if (isNext && currentPage < totalPage) {
            currentPage++;
        } else if (isPrev && currentPage > 1) {
            currentPage--;
        }
        infoSpan.textContent = `${currentPage}/${totalPage}`;
    });
}

// Gọi hàm
$(document).ready(function () {
    initBannerSlider();
    initcategorySlider();
    initServiceSlider();
    initProductPopup();
    initPaginationSystem();
    initAccessoryCategorySliders();
    createUniversalSlider({
        selector: '.product-page__container',
        rows: 1,
        desktop: 4,
        tablet: 3,
        mobile: 2
    });
    createUniversalSlider({
        selector: '.home-popular__product',
        rows: 2,
        desktop: 4,
        tablet: 3,
        mobile: 2
    });
    createUniversalSlider({
        selector: '.logo-brand__content',
        rows: 2,
        desktop: 6,
        tablet: 3,
        mobile: 2,
        minSlides: 24,
        options: {
            dots: false,
            infinite: true,
            autoplay: true,
            speed: 500,
            arrows: true,
        }
    });

    initToggleSystem([
        {
            trigger: ".product-toolbar__btn",
            behavior: "activate",
            activeClass: "active"
        },
        {
            trigger: ".category-sidebar__group",
            target: ".category-sidebar__list",
            behavior: "activate",
            activeClass: "active"
        },
        {
            trigger: ".btn-toggle-content", 
            target: ".content-body", 
            activeClass: "is-expanded",     
            onActiveChange: (isActive, triggerEl) => {
                const textNode = triggerEl.querySelector('span') || triggerEl;
                if (isActive) {
                    textNode.textContent = "Thu gọn ▴";
                } else {
                    textNode.textContent = "Xem thêm ▾";
                }
            }
        }
    ]);
});

// load more sugges section
document.addEventListener('DOMContentLoaded', function () {
    const products = document.querySelectorAll('#sugges-section .productSlider .product');
    const btnMore = document.getElementById('sugges-loadmore');
    const btnCollapse = document.getElementById('sugges-collapse');

    const showEach = 8;
    let current = showEach;

    products.forEach((p, i) => {
        if (i >= showEach) p.classList.add('hidden');
    });

    btnMore.addEventListener('click', function (e) {
        e.preventDefault();
        let next = current + showEach;
        for (let i = current; i < next && i < products.length; i++) {
            products[i].classList.remove('hidden');
        }
        current = next;

        if (current > showEach) btnCollapse.style.display = 'inline-block';
        if (current >= products.length) btnMore.style.display = 'none';
    });

    btnCollapse.addEventListener('click', function (e) {
        e.preventDefault();
        products.forEach((p, i) => {
            if (i >= showEach) p.classList.add('hidden');
        });
        current = showEach;
        btnMore.style.display = 'inline-block';
        btnCollapse.style.display = 'none';
    });
});

// load more topsale section
document.addEventListener('DOMContentLoaded', function () {
    const topProducts = document.querySelectorAll('#topsale-section .productSlider .product');
    const btnMoreTop = document.getElementById('topsale-loadmore');
    const btnCollapseTop = document.getElementById('topsale-collapse');

    const showEachTop = 8;
    let currentTop = showEachTop;

    topProducts.forEach((p, i) => {
        if (i >= showEachTop) p.classList.add('hidden');
    });

    btnMoreTop.addEventListener('click', function (e) {
        e.preventDefault();
        let next = currentTop + showEachTop;
        for (let i = currentTop; i < next && i < topProducts.length; i++) {
            topProducts[i].classList.remove('hidden');
        }
        currentTop = next;

        if (currentTop > showEachTop) btnCollapseTop.style.display = 'inline-block';
        if (currentTop >= topProducts.length) btnMoreTop.style.display = 'none';
    });

    btnCollapseTop.addEventListener('click', function (e) {
        e.preventDefault();
        topProducts.forEach((p, i) => {
            if (i >= showEachTop) p.classList.add('hidden');
        });
        currentTop = showEachTop;
        btnMoreTop.style.display = 'inline-block';
        btnCollapseTop.style.display = 'none';
    });
});

// js tăng giảm số lượng sản phẩm trong giỏ hàng

function increaseValue(btn) {
    const parent = btn.closest('.pay__product__quantity');
    const type = btn.getAttribute('data-type');
    const id = btn.getAttribute('data-id');
    const input = parent.querySelector('input');
    let currentValue = parseInt(input.value) || 0;
    $.ajax({
        type: "POST",
        url: "/ajax.php",
        dataType: "json",
        data: { op: "order", idProduct: id, idUser: 0, cate: type, qty: currentValue + 1 },
        success: function (e) {
            $('.cart__num').text(e.totalItem);
        },
    });
    input.value = currentValue + 1;
}

function decreaseValue(btn) {
    const parent = btn.closest('.pay__product__quantity');
    const input = parent.querySelector('input');
    const type = btn.getAttribute('data-type');
    const id = btn.getAttribute('data-id');
    let currentValue = parseInt(input.value) || 0;
    if (currentValue > 1) {
        input.value = currentValue - 1;
        $.ajax({
            type: "POST",
            url: "/ajax.php",
            dataType: "json",
            data: { op: "order", idProduct: id, idUser: 0, cate: type, qty: input.value },
            success: function (e) {
                $('.cart__num').text(e.totalItem);
            },
        });
    }
}

// Ngăn nhập số < 1 khi người dùng tự sửa
document.querySelectorAll('.pay__product__quantity input').forEach(input => {
    input.addEventListener('change', () => {
        const type = input.getAttribute('data-type');
        const id = input.getAttribute('data-id');
        if (input.value < 1) {
            input.value = 1;
        }
        $.ajax({
            type: "POST",
            url: "/ajax.php",
            dataType: "json",
            data: { op: "order", idProduct: id, idUser: 0, cate: type, qty: input.value },
            success: function (e) {
                $('.cart__num').text(e.totalItem);
            },
        });
    });
});

// document.addEventListener('DOMContentLoaded', function () {
//     const buttonPlus  = $(".qty-btn-plus");
//     const buttonMinus = $(".qty-btn-minus");
//     if (!buttonPlus.length || !buttonMinus.length) return;
//     const incrementPlus = buttonPlus.click(function() {
//     const $n = $(this)
//     .parent(".qty-container")
//     .find(".input-qty");
//     $n.val(Number($n.val())+1 );
//     });

//     const incrementMinus = buttonMinus.click(function() {
//     const $n = $(this)
//     .parent(".qty-container")
//     .find(".input-qty");
//     const amount = Number($n.val());
//     if (amount > 0) {
//         $n.val(amount-1);
//     }
//     });
// });