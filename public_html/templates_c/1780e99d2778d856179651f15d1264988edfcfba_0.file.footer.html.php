<?php
/* Smarty version 4.5.5, created on 2026-05-19 08:16:35
  from 'D:\invosync\public_html\templates\invosync\component\footer.html' */

/* @var Smarty_Internal_Template $_smarty_tpl */
if ($_smarty_tpl->_decodeProperties($_smarty_tpl, array (
  'version' => '4.5.5',
  'unifunc' => 'content_6a0c1c637322f2_51960250',
  'has_nocache_code' => false,
  'file_dependency' => 
  array (
    '1780e99d2778d856179651f15d1264988edfcfba' => 
    array (
      0 => 'D:\\invosync\\public_html\\templates\\invosync\\component\\footer.html',
      1 => 1779178566,
      2 => 'file',
    ),
  ),
  'includes' => 
  array (
  ),
),false)) {
function content_6a0c1c637322f2_51960250 (Smarty_Internal_Template $_smarty_tpl) {
?><!-- ── Premium Redesigned Footer ── -->
<footer class="premium-footer">
    <div class="footer-grid">
        <!-- Brand Block -->
        <div class="footer-col-brand">
            <a href="/<?php echo $_smarty_tpl->tpl_vars['aScript']->value;?>
?op=dashboard" class="footer-logo">
                <i class="ri-file-shield-2-line" style="color: #818cf8;"></i>
                <span>Invo<span>Sync</span></span>
            </a>
            <p class="footer-desc">
                Giải pháp quản lý và đồng bộ hóa hóa đơn, công nợ thông minh hàng đầu dành cho doanh nghiệp vừa và
                nhỏ tại Việt Nam.
            </p>
            <div class="footer-socials">
                <a href="javascript:void(0)" class="footer-social-icon"><i class="ri-facebook-fill"></i></a>
                <a href="javascript:void(0)" class="footer-social-icon"><i class="ri-twitter-x-fill"></i></a>
                <a href="javascript:void(0)" class="footer-social-icon"><i class="ri-linkedin-fill"></i></a>
                <a href="javascript:void(0)" class="footer-social-icon"><i class="ri-youtube-fill"></i></a>
            </div>
        </div>

        <!-- Quick Links -->
        <div class="footer-col-links">
            <h3>Chức năng</h3>
            <ul class="footer-links-list">
                <li><a href="/<?php echo $_smarty_tpl->tpl_vars['aScript']->value;?>
?op=dashboard" class="footer-link"><i class="ri-arrow-right-s-line"></i>
                        Bảng điều khiển</a></li>
                <li><a href="/<?php echo $_smarty_tpl->tpl_vars['aScript']->value;?>
?op=manage&act=product" class="footer-link"><i
                            class="ri-arrow-right-s-line"></i> Xuất hóa đơn</a></li>
                <li><a href="/<?php echo $_smarty_tpl->tpl_vars['aScript']->value;?>
?op=manage&act=static" class="footer-link"><i
                            class="ri-arrow-right-s-line"></i> Phiếu thu công nợ</a></li>
                <li><a href="/<?php echo $_smarty_tpl->tpl_vars['aScript']->value;?>
?op=manage&act=menu" class="footer-link"><i
                            class="ri-arrow-right-s-line"></i> Danh sách công nợ</a></li>
            </ul>
        </div>

        <!-- Contact Block -->
        <div class="footer-col-links">
            <h3>Liên hệ</h3>
            <ul class="footer-links-list">
                <li class="footer-contact-item">
                    <i class="ri-map-pin-line"></i>
                    <span>Tòa nhà Derasoft, Số 24 Đường số 6, KDC Him Lam, Phường Tân Hưng, Quận 7, TP. Hồ Chí
                        Minh</span>
                </li>
                <li class="footer-contact-item">
                    <i class="ri-phone-line"></i>
                    <span>Hotline: 1900 636 229</span>
                </li>
                <li class="footer-contact-item">
                    <i class="ri-mail-line"></i>
                    <span>Email: support@derasoft.com</span>
                </li>
            </ul>
        </div>

        <!-- Support Block -->
        <div class="footer-col-links">
            <h3>Hỗ trợ</h3>
            <ul class="footer-links-list">
                <li><a href="javascript:void(0)" class="footer-link"><i class="ri-arrow-right-s-line"></i> Hướng dẫn
                        sử dụng</a></li>
                <li><a href="javascript:void(0)" class="footer-link"><i class="ri-arrow-right-s-line"></i> Câu hỏi
                        thường gặp</a></li>
                <li><a href="javascript:void(0)" class="footer-link"><i class="ri-arrow-right-s-line"></i> Chính
                        sách bảo mật</a></li>
                <li><a href="javascript:void(0)" class="footer-link"><i class="ri-arrow-right-s-line"></i> Điều
                        khoản dịch vụ</a></li>
            </ul>
        </div>
    </div>

    <div class="footer-bottom">
        <span>© 2026 InvoSync. Tất cả bản quyền được bảo lưu.</span>
        <span>Phát triển và vận hành bởi <a href="http://derasoft.com" target="_blank"
                style="color: #818cf8; text-decoration: none; font-weight: 600;">Derasoft Co., Ltd</a></span>
    </div>
</footer>

<?php echo '<script'; ?>
 defer src="https://code.jquery.com/jquery-3.6.0.min.js"><?php echo '</script'; ?>
>
<?php echo '<script'; ?>
 defer src="https://code.jquery.com/ui/1.13.2/jquery-ui.min.js"><?php echo '</script'; ?>
>
<?php echo '<script'; ?>
 defer src="/<?php echo $_smarty_tpl->tpl_vars['templatePath']->value;?>
/<?php echo $_smarty_tpl->tpl_vars['userTemplate']->value;?>
/js/frontend.js"><?php echo '</script'; ?>
>
</body>
</html><?php }
}
