<?php
/* Smarty version 4.5.5, created on 2026-05-19 08:16:35
  from 'D:\invosync\public_html\templates\invosync\formxuatban.tpl.html' */

/* @var Smarty_Internal_Template $_smarty_tpl */
if ($_smarty_tpl->_decodeProperties($_smarty_tpl, array (
  'version' => '4.5.5',
  'unifunc' => 'content_6a0c1c6342fc16_89721267',
  'has_nocache_code' => false,
  'file_dependency' => 
  array (
    '2fdd209f5564c0c3066cf120a20f7a17e2c40ca9' => 
    array (
      0 => 'D:\\invosync\\public_html\\templates\\invosync\\formxuatban.tpl.html',
      1 => 1779178543,
      2 => 'file',
    ),
  ),
  'includes' => 
  array (
  ),
),false)) {
function content_6a0c1c6342fc16_89721267 (Smarty_Internal_Template $_smarty_tpl) {
$_smarty_tpl->_subTemplateRender(((string)$_smarty_tpl->tpl_vars['userTemplate']->value)."/component/header.html", $_smarty_tpl->cache_id, $_smarty_tpl->compile_id, 0, $_smarty_tpl->cache_lifetime, array(), 0, true);
?>
<!-- BẮT ĐẦU GIAO DIỆN NỘI DUNG CHÍNH CỦA BẠN TẠI ĐÂY -->
<main class="container-f flex flex-col flex-1 pos-rel">
    <!-- BẮT ĐẦU GIAO DIỆN CỦA BẠN TẠI ĐÂY -->
    <div
        style="padding: 50px 20px; text-align: center; border: 2px dashed var(--primary-color, #70AD47); border-radius: 8px; margin: 20px 0;">
        <h2 style="color: var(--primary-color, #70AD47); margin-bottom: 10px;">KHUNG GIAO DIỆN XUẤT BẢN DÙNG
            CHUNG</h2>
        <p style="color: #666; font-size: 14px;">Bạn có thể bắt đầu ghép/chèn toàn bộ giao diện HTML tùy chỉnh
            của mình vào vị trí này trong tệp <strong>formxuatban.tpl.html</strong>.</p>
    </div>
    <!-- KẾT THÚC GIAO DIỆN CỦA BẠN -->
</main>
<?php $_smarty_tpl->_subTemplateRender(((string)$_smarty_tpl->tpl_vars['userTemplate']->value)."/component/footer.html", $_smarty_tpl->cache_id, $_smarty_tpl->compile_id, 0, $_smarty_tpl->cache_lifetime, array(), 0, true);
}
}
