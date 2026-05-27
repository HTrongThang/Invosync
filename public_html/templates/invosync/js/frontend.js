// ----------- Vùng chức năng -------------
// 🧩 1️⃣ Include HTML Components
async function includeHTML(callback) {
  const elements = document.querySelectorAll("[data-include]");
  if (!elements.length) {
    if (callback) callback();
    return;
  }

  // Thêm chữ await ở đây để bắt nó CHỜ tải xong hết các file HTML
  await Promise.all([...elements].map(async (el) => {
    const file = el.getAttribute("data-include");
    if (!file) return;

    const version = "1.0.4";
    const cacheKey = `comp-${file}-${version}`;
    let html = sessionStorage.getItem(cacheKey);

    if (!html) {
      Object.keys(sessionStorage).forEach(key => { if (key.startsWith(`comp-${file}`)) sessionStorage.removeItem(key); });
      const res = await fetch(file, { cache: "reload" });
      if (res.ok) { // Check thêm xem có lỗi 404 không cho chắc cốp
        html = await res.text();
        sessionStorage.setItem(cacheKey, html);
      }
    }

    if (html) {
      el.innerHTML = html;
      if (typeof initResponsive === "function") initResponsive(el);
    }
  }));

  // Khúc này sẽ chạy SAU KHI toàn bộ HTML đã được chèn vào DOM
  document.dispatchEvent(new Event("includesLoaded"));
  if (callback) callback();
}

// js thêm active
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

// 🖼️ 2️⃣ Lazy Load + Set Dimensions
function applyImageEnhancements(root = document) {
  root.querySelectorAll("img").forEach(img => {
    // Lazy load
    if (!img.hasAttribute("loading")) img.setAttribute("loading", "lazy");

    // Alt text
    if (!img.hasAttribute("alt") || img.alt.trim() === "") {
      const fileName = img.src.split("/").pop().split(".")[0] || "image";
      img.setAttribute("alt", fileName.replace(/[-_]/g, " "));
    }

    // Hàm set kích thước an toàn
    const setDim = () => {
      if (img.naturalWidth > 0 && img.naturalHeight > 0) {
        if (!img.hasAttribute("width")) img.setAttribute("width", img.naturalWidth);
        if (!img.hasAttribute("height")) img.setAttribute("height", img.naturalHeight);
      }
    };

    // Nếu ảnh đã load sẵn (cache hoặc render sớm)
    if (img.complete) setTimeout(setDim, 50);
    else img.addEventListener("load", setDim);

    // Chỉ xử lý khi xuất hiện trong viewport
    const io = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setDim();
          obs.unobserve(entry.target);
        }
      });
    }, { rootMargin: "200px 0px" });
    io.observe(img);
  });
}

// ✨ 3️⃣ Scroll Reveal Effect
function initRevealEffect() {
  const sections = document.querySelectorAll("section, footer");
  if (!sections.length) return;

  sections.forEach(sec => sec.classList.add("hidden-section"));

  let revealIndex = 0;
  let resetTimeout; // Biến dùng để reset bộ đếm

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;

        // Tăng delay lên 100ms (thay vì 20ms) để thấy rõ sự nối đuôi "ảo diệu" hơn
        el.style.transitionDelay = `${revealIndex * 100}ms`;

        el.classList.add("show-up");
        observer.unobserve(el);

        revealIndex++;

        // Bí kíp ở đây: Nếu trong vòng 100ms không có section nào mới xuất hiện
        // thì reset bộ đếm về 0. Tránh việc các section ở cuối trang bị delay mấy giây.
        clearTimeout(resetTimeout);
        resetTimeout = setTimeout(() => {
          revealIndex = 0;
        }, 100);
      }
    });
  }, {
    threshold: 0.1, // Hiện ra 10% là bắt đầu kích hoạt
    rootMargin: "0px 0px -10% 0px" // Kích hoạt sớm hơn 1 xíu để khách không thấy khoảng trắng
  });

  sections.forEach(sec => observer.observe(sec));
}

function extractHeadingData(contentSelector, headingTags = "h1, h2, h3, h4, h5, h6") {
  const content = contentSelector === "all" ? document : document.querySelector(contentSelector);

  if (!content) {
    console.warn(`Không tìm thấy vùng quét: ${contentSelector}`);
    return [];
  }

  const headings = content.querySelectorAll(headingTags);
  if (!headings.length) return [];

  const toSlug = str => str
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/đ/g, "d").replace(/Đ/g, "D")
    .replace(/\s+/g, "-")
    .replace(/[^\w\-]/g, "")
    .toLowerCase();

  const data = [];

  headings.forEach((h, i) => {
    const text = h.textContent.trim();

    let id = h.id || toSlug(text) || `heading-${i}`;

    if (document.getElementById(id) && document.getElementById(id) !== h) {
      let baseId = id;
      let counter = 1;
      while (document.getElementById(`${baseId}-${counter}`) && document.getElementById(`${baseId}-${counter}`) !== h) {
        counter++;
      }
      id = `${baseId}-${counter}`;
    }

    h.id = id;
    data.push({
      id: id,
      text: text,
      tag: h.tagName.toLowerCase()
    });
  });

  return data;
}

// HÀM 2: NHÂN BẢN TEMPLATE VÀ ĐỔ DỮ LIỆU
function renderDynamicList(headingData, targetSelector) {
  if (!headingData || headingData.length === 0) return;

  const targetContainer = document.querySelector(targetSelector);
  if (!targetContainer) {
    console.log('Không tìm thấy menu');
    return;
  }

  const template = targetContainer.firstElementChild;
  if (!template) {
    console.warn(`Vui lòng để lại 1 thẻ con trong ${targetSelector} để làm mẫu!`);
    return;
  }

  targetContainer.innerHTML = "";

  headingData.forEach(item => {
    const clone = template.cloneNode(true);
    const aTag = clone.querySelector("a");

    if (aTag) {
      aTag.href = `#${item.id}`;
      let rawText = item.text;
      let formattedText = rawText.charAt(0).toUpperCase() + rawText.slice(1).toLowerCase();
      aTag.textContent = formattedText;

      aTag.addEventListener("click", e => {
        e.preventDefault();
        const targetSection = document.getElementById(item.id);

        if (targetSection) {
          const headerHeight = 300;
          const elementPosition = targetSection.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.scrollY - headerHeight;

          window.scrollTo({
            top: offsetPosition,
            behavior: "smooth"
          });
        }
      });
    }

    targetContainer.appendChild(clone);
  });
}

// js validate form
function validateField(input) {
  const group = input.closest(".form-group");
  const error = group?.querySelector(".error-msg");
  let message = "";

  const value = input.value.trim();

  if (input.hasAttribute("required") && !value) {
    message = input.dataset.msg || "Vui lòng không để trống";
  }

  if (!message && input.type === "email" && value) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) message = "Email không hợp lệ";
  }

  if (!message && input.hasAttribute("minlength")) {
    const min = +input.getAttribute("minlength");
    if (value.length < min) {
      message = input.dataset.msg || `Tối thiểu ${min} ký tự`;
    }
  }

  if (!message && input.tagName === "SELECT" && input.required) {
    if (!input.value) message = "Vui lòng chọn một giá trị";
  }

  if (!message && input.type === "checkbox" && input.required) {
    if (!input.checked) message = "Vui lòng xác nhận";
  }

  if (!message && input.pattern && input.value) {
    const regex = new RegExp(input.pattern);
    if (!regex.test(input.value)) {
      message = input.dataset.msg || "Giá trị không hợp lệ";
    }
  }

  if (group) group.classList.toggle("error", !!message);
  if (error) error.textContent = message;

  return !message;
}

function validateForm(form) {
  let isValid = true;
  form.querySelectorAll("input, textarea").forEach(input => {
    if (!validateField(input)) isValid = false;
  });
  return isValid;
}

function initFormValidation(root = document) {
  root.querySelectorAll(".js-validate-form").forEach(form => {
    if (form.dataset._validated) return;
    form.dataset._validated = "true";

    form.querySelectorAll("input, textarea").forEach(input => {
      input.addEventListener("input", () => validateField(input));
    });

    form.addEventListener("submit", e => {
      if (!validateForm(form)) e.preventDefault();
    });
  });
}

// js chức năng table
function renderFormSettingsData() {

  const formSections = document.querySelectorAll('.form-invoice');

  formSections.forEach(section => {

    const listContainer = section.querySelector('[id^="popup-list-"]');
    const formBody = section.querySelector('.section-body');

    if (!listContainer || !formBody) return;

    const formGroups = formBody.querySelectorAll('.form-group');
    let htmlString = '';

    formGroups.forEach(group => {
      if (!group.id) return;

      const isActive = group.classList.contains('active');
      const title = group.querySelector('.input-title')?.textContent || 'Chưa đặt tên';
      const isChecked = isActive ? 'checked' : '';

      htmlString += `
                <label class="flex center-ver gap-5 cursor-pointer popup-list__item ">
                    <input type="checkbox" class="setting-cb" value="${group.id}" ${isChecked}> 
                    ${title}
                </label>
            `;
    });

    listContainer.innerHTML = htmlString;
  });
}

function initSmartFormSettings() {
  const formSections = document.querySelectorAll('.form-invoice');
  if (formSections.length === 0) return;

  formSections.forEach(section => {
    const listContainer = section.querySelector('[id^="popup-list-"]');
    const formBody = section.querySelector('.section-body');

    if (!listContainer || !formBody) return;

    const formGroups = formBody.querySelectorAll('.form-group');
    let htmlString = '';
    const defaultActiveFields = [];

    formGroups.forEach(group => {
      if (!group.id) return;
      const isActive = group.classList.contains('active');
      if (isActive) defaultActiveFields.push(group.id);

      const title = group.querySelector('.input-title')?.textContent || 'Chưa đặt tên';
      const isChecked = isActive ? 'checked' : '';

      htmlString += `
                <label class="flex center-ver gap-5 cursor-pointer popup-list__item">
                    <input type="checkbox" class="setting-cb" value="${group.id}" ${isChecked}> 
                    ${title}
                </label>
            `;
    });
    listContainer.innerHTML = htmlString;

    const btnOk = section.querySelector('.btn-submit-ok');
    const btnReset = section.querySelector('.btn-submit-reset');
    const popupTarget = section.querySelector('.form-invoice__slot');
    const triggerBtn = section.querySelector('.section-icon__wrapper');

    if (btnReset) {
      btnReset.addEventListener('click', () => {
        const checkboxes = listContainer.querySelectorAll('.setting-cb');
        checkboxes.forEach(cb => cb.checked = defaultActiveFields.includes(cb.value));
      });
    }

    if (btnOk) {
      btnOk.addEventListener('click', () => {
        const checkboxes = listContainer.querySelectorAll('.setting-cb');
        const checkedCount = Array.from(checkboxes).filter(cb => cb.checked).length;

        if (checkedCount === 0) {
          alert("⚠️ Bạn phải hiển thị ít nhất 1 trường thông tin!");
          return;
        }

        checkboxes.forEach(cb => {
          const targetGroup = document.getElementById(cb.value);
          if (targetGroup) {
            targetGroup.classList.toggle('active', cb.checked);
            targetGroup.classList.toggle('deactive', !cb.checked);
          }
        });

        const allFormRows = formBody.querySelectorAll('.form-row');
        allFormRows.forEach(row => {
          const hasActiveGroup = row.querySelector('.form-group.active') !== null;
          row.classList.toggle('active', hasActiveGroup);
          row.classList.toggle('deactive', !hasActiveGroup);
        });

        popupTarget.classList.remove('active');
        if (triggerBtn) triggerBtn.classList.remove('active');
      });
    }
  });


  initToggleSystem([
    {
      trigger: '.section-icon__wrapper',
      target: '.form-invoice__slot',
      behavior: 'toggle',
      closeOnOutside: true,
      closeOnEsc: true,
      closeBtn: '.btn-close-setting',
      activeClass: 'active'
    }
  ]);
}


// js đổi màu khi check
function toggleColor() {
  const tableBody = document.querySelector('.dynamic-table__content tbody');

  if (!tableBody) return;
  tableBody.addEventListener('change', function (e) {
    if (e.target.matches('.cb-khuyenmai')) {
      const isChecked = e.target.checked;
      const currentRow = e.target.closest('tr');
      if (!currentRow) return;
      const cells = currentRow.querySelectorAll('td');
      const totalCols = cells.length;
      if (totalCols >= 3) {
        for (let i = totalCols - 3; i < totalCols; i++) {
          cells[i].classList.toggle('note-content', isChecked);
        }
      }
    }
  });
}

// js đổi màu theme
function initThemeSwitcher(options = {}) {
  // 1. Cấu hình mặc định (bồ có thể truyền vào để ghi đè)
  const radioSelector = options.selector || 'input[name="themeSelector"]';

  // Bảng màu mặc định
  const palettes = options.palettes || {
    green: { primary: '#70AD47', secondary: '#E2F0D9', third: '#C6E0B4' },
    blue: { primary: '#4472C4', secondary: '#D9E1F2', third: '#B4C6E7' },
    orange: { primary: '#ED7D31', secondary: '#FCE4D6', third: '#F8CBAD' }
  };

  // 2. Tìm tất cả các radio button đổi theme
  const themeRadios = document.querySelectorAll(radioSelector);
  if (!themeRadios.length) return;

  // 3. Gắn sự kiện lắng nghe
  themeRadios.forEach(radio => {
    // Mẹo: Tránh việc bị gắn sự kiện nhiều lần nếu gọi hàm lại
    if (radio.dataset.themeBound === "true") return;
    radio.dataset.themeBound = "true";

    radio.addEventListener('change', function (e) {
      // Lấy bộ màu tương ứng với value của radio
      const selectedTheme = palettes[e.target.value];
      if (!selectedTheme) return; // Nếu value không có trong bảng màu thì bỏ qua

      // Ghi đè CSS Variables
      const root = document.documentElement;
      root.style.setProperty('--primary-color', selectedTheme.primary);
      root.style.setProperty('--secondary-color', selectedTheme.secondary);
      root.style.setProperty('--third-color', selectedTheme.third);
    });
  });
}

// js lấy kich thước cột bỏ vào class 
function syncWidthWithTableCols(targetSelector, tableSelector, startIndex = 0, numberOfCols = 1) {

  const tableElement = document.querySelector(tableSelector);
  const targetElement = document.querySelector(targetSelector);

  if (!targetElement || !tableElement) {
    return;
  }

  const updateWidth = () => {
    const currentTable = document.querySelector(tableSelector);
    const currentTarget = document.querySelector(targetSelector);
    if (!currentTable || !currentTarget) return;
    let columns = currentTable.querySelectorAll('thead tr:first-child th');
    if (columns.length === 0) {
      columns = currentTable.querySelectorAll('tbody tr:first-child td');
    }

    if (columns.length === 0) return;

    let totalWidth = 0;
    let endIdx = Math.min(startIndex + numberOfCols, columns.length);

    for (let i = startIndex; i < endIdx; i++) {
      const colWidth = columns[i].offsetWidth;
      totalWidth += colWidth;

      let colName = columns[i].textContent.trim().replace(/\s+/g, ' ');
      if (!colName) colName = "Cột Checkbox/Icon";
    }
    // =====================================
    if (totalWidth > 0) {
      currentTarget.style.minWidth = `${totalWidth}px`;
    }
  };

  updateWidth();

  const resizeObserver = new ResizeObserver(() => {
    requestAnimationFrame(updateWidth);
  });

  resizeObserver.observe(tableElement);
}

// Gọi hàm khởi tạo khi trang web đã load xong HTM

// Chạy hàm khi trang web tải xong

// ----------- Vùng gọi biến --------------
document.addEventListener("DOMContentLoaded", async () => {

  // 1. Bắt hệ thống phải DỪNG LẠI CHỜ load xong toàn bộ file HTML (Header, Footer, Menu...)
  await includeHTML();

  // 2. Tới dòng này là 100% HTML đã đầy đủ trên trang. Bắt đầu gọi các hàm khởi tạo:

  initToggleSystem([
    {
      trigger: '.section-icon__wrapper-second',
      target: '.service-info__section',
      behavior: 'toggle',
      closeOnOutside: true,
      closeOnEsc: true,
      closeBtn: '.btn-close-setting',
      activeClass: 'active'
    },
    {
      trigger: '.menu-mobile__btn',
      target: '.menu-mobile',
      behavior: 'toggle',
      closeOnOutside: true,
      closeOnEsc: true,
      activeClass: 'active'
    }
  ]);

  toggleColor();

  initThemeSwitcher({
    palettes: {
      green: { primary: '#70AD47', secondary: '#E2F0D9', third: '#C6E0B4' },
      blue: { primary: '#4472C4', secondary: '#D9E1F2', third: '#B4C6E7' },
      orange: { primary: '#ED7D31', secondary: '#FCE4D6', third: '#F8CBAD' },
      pink: { primary: '#FF69B4', secondary: '#FFB6C1', third: '#FFC0CB' }
    }
  });

  renderFormSettingsData();
  initSmartFormSettings();

  // syncWidthWithTableCols('.toolbar-left', '.dynamic-table__content', 0, 4);

  // Kể cả Jquery bồ cũng ném vào đây luôn, không cần $(document).ready() riêng lẻ nữa
  if (typeof $ !== 'undefined') {
    $(".datepicker-custom").datepicker({
      dateFormat: "dd/mm/yy",
      changeMonth: true,
      changeYear: true,
      firstDay: 0
    });
  }

  // Tự động quét và kích hoạt class 'active' cho đúng link menu ở Header dựa trên URL
  try {
    const currentUrl = window.location.href;
    document.querySelectorAll('.nav-menu .nav-item, .nav-dropdown-menu .nav-dropdown-link').forEach(link => {
      const href = link.getAttribute('href');
      if (href && href.length > 2 && currentUrl.includes(href)) {
        link.classList.add('active');
        const parentDropdown = link.closest('.nav-item-dropdown');
        if (parentDropdown) {
          parentDropdown.classList.add('active');
        }
      }
    });
  } catch (err) {
    console.warn("Active link detection skipped:", err);
  }
});
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
  let lydo = prompt('Nhập lý do huỷ:');
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

