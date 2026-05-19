/**
 * ══════════════════════════════════════
 *  LOGIN PAGE - JavaScript
 *  Xử lý: Toggle mật khẩu, Loading submit
 * ══════════════════════════════════════
 */

document.addEventListener('DOMContentLoaded', function () {

	// ── Ẩn/Hiện mật khẩu ──
	var toggleBtn = document.getElementById('toggle-pw-btn');
	var pwInput = document.getElementById('login-password');

	if (toggleBtn && pwInput) {
		toggleBtn.addEventListener('click', function () {
			var isShowing = pwInput.type === 'text';
			pwInput.type = isShowing ? 'password' : 'text';
			this.classList.toggle('ri-eye-off-line', isShowing);
			this.classList.toggle('ri-eye-line', !isShowing);
		});
	}

	// ── Hiệu ứng Loading khi bấm nút Đăng nhập ──
	var form = document.querySelector('[data-form="login"]');
	var submitBtn = document.getElementById('login-submit-btn');

	if (form && submitBtn) {
		form.addEventListener('submit', function () {
			submitBtn.innerHTML = '<i class="ri-loader-4-line spinner"></i><span>Đang xác thực...</span>';
			submitBtn.style.pointerEvents = 'none';
			submitBtn.style.opacity = '0.85';
		});
	}

	// ── Dialog: Hỗ trợ kỹ thuật ──
	var openBtn = document.getElementById('open-support-dialog');
	var closeBtn = document.getElementById('close-support-dialog');
	var overlay = document.getElementById('support-overlay');
	var dialog = document.getElementById('support-dialog');

	function openSupportDialog() {
		if (overlay && dialog) {
			overlay.classList.add('is-active');
			dialog.classList.add('is-active');
		}
	}

	function closeSupportDialog() {
		if (overlay && dialog) {
			overlay.classList.remove('is-active');
			dialog.classList.remove('is-active');
		}
	}

	if (openBtn) openBtn.addEventListener('click', openSupportDialog);
	if (closeBtn) closeBtn.addEventListener('click', closeSupportDialog);
	if (overlay) overlay.addEventListener('click', closeSupportDialog);

	// Đóng khi nhấn ESC
	document.addEventListener('keydown', function (e) {
		if (e.key === 'Escape' && dialog && dialog.classList.contains('is-active')) {
			closeSupportDialog();
		}
	});

});
