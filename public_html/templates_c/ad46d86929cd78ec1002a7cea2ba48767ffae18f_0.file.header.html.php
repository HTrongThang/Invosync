<?php
/* Smarty version 4.5.5, created on 2026-05-19 08:16:35
  from 'D:\invosync\public_html\templates\invosync\component\header.html' */

/* @var Smarty_Internal_Template $_smarty_tpl */
if ($_smarty_tpl->_decodeProperties($_smarty_tpl, array (
  'version' => '4.5.5',
  'unifunc' => 'content_6a0c1c634f8d56_08342929',
  'has_nocache_code' => false,
  'file_dependency' => 
  array (
    'ad46d86929cd78ec1002a7cea2ba48767ffae18f' => 
    array (
      0 => 'D:\\invosync\\public_html\\templates\\invosync\\component\\header.html',
      1 => 1779178561,
      2 => 'file',
    ),
  ),
  'includes' => 
  array (
  ),
),false)) {
function content_6a0c1c634f8d56_08342929 (Smarty_Internal_Template $_smarty_tpl) {
?><!DOCTYPE html>
<html lang="vi">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title><?php if ((isset($_smarty_tpl->tpl_vars['pageTitle']->value))) {
echo $_smarty_tpl->tpl_vars['pageTitle']->value;
} else { ?>Invoice | Hệ thống hóa đơn<?php }?></title>
    <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap" rel="stylesheet">
    <link href="https://cdn.jsdelivr.net/npm/remixicon@4.2.0/fonts/remixicon.css" rel="stylesheet">
    <link rel="stylesheet" href="https://code.jquery.com/ui/1.13.2/themes/base/jquery-ui.css">
    
    <link rel="stylesheet" href="/<?php echo $_smarty_tpl->tpl_vars['templatePath']->value;?>
/<?php echo $_smarty_tpl->tpl_vars['userTemplate']->value;?>
/css/base.css">
    <link rel="stylesheet" href="/<?php echo $_smarty_tpl->tpl_vars['templatePath']->value;?>
/<?php echo $_smarty_tpl->tpl_vars['userTemplate']->value;?>
/css/custom.css">
    <link rel="stylesheet" href="/<?php echo $_smarty_tpl->tpl_vars['templatePath']->value;?>
/<?php echo $_smarty_tpl->tpl_vars['userTemplate']->value;?>
/css/font.css">
    <link rel="stylesheet" href="/<?php echo $_smarty_tpl->tpl_vars['templatePath']->value;?>
/<?php echo $_smarty_tpl->tpl_vars['userTemplate']->value;?>
/css/responsive.css">
    <link rel="stylesheet" href="/<?php echo $_smarty_tpl->tpl_vars['templatePath']->value;?>
/<?php echo $_smarty_tpl->tpl_vars['userTemplate']->value;?>
/css/utility.css">
    <link rel="stylesheet" href="/<?php echo $_smarty_tpl->tpl_vars['templatePath']->value;?>
/<?php echo $_smarty_tpl->tpl_vars['userTemplate']->value;?>
/css/dashboard.css">
</head>

<body class="flex flex-col gap-10">

<!-- ── Premium Redesigned Navigation Header ── -->
<header class="premium-header">
    <a href="/<?php echo $_smarty_tpl->tpl_vars['aScript']->value;?>
?op=dashboard" class="brand-wrapper">
        <div class="brand-logo-icon">
            <i class="ri-file-shield-2-line"></i>
        </div>
        <span class="brand-name">Invo<span>Sync</span></span>
    </a>

    <nav class="nav-menu">
        <div class="nav-item nav-item-dropdown">
            <i class="ri-file-add-line"></i>
            <span>Xuất hóa đơn</span>
            <i class="ri-arrow-down-s-line" style="font-size: 12px; margin-left: 2px;"></i>
            <div class="nav-dropdown-menu">
                <a href="/<?php echo $_smarty_tpl->tpl_vars['aScript']->value;?>
?op=newinvoice&act=new&mod=list" class="nav-dropdown-link">
                    <i class="ri-receipt-line"></i>
                    <span>Danh sách hóa đơn</span>
                </a>
                <a href="/<?php echo $_smarty_tpl->tpl_vars['aScript']->value;?>
?op=newinvoice&act=new&mod=add" class="nav-dropdown-link">
                    <i class="ri-file-add-line"></i>
                    <span>Thêm mới hóa đơn</span>
                </a>
                <a href="/<?php echo $_smarty_tpl->tpl_vars['aScript']->value;?>
?op=newinvoice&act=list&mod=other" class="nav-dropdown-link">
                    <i class="ri-more-fill"></i>
                    <span>Hóa đơn khác</span>
                </a>
            </div>
        </div>

        <a href="/<?php echo $_smarty_tpl->tpl_vars['aScript']->value;?>
?op=manage&act=rec&mod=list" class="nav-item">
            <i class="ri-bank-card-line"></i>
            <span>Danh sách phiếu thu</span>
        </a>
        <a href="/<?php echo $_smarty_tpl->tpl_vars['aScript']->value;?>
?op=manage&act=rec&mod=add" class="nav-item">
            <i class="ri-add-box-line"></i>
            <span>Lập phiếu thu</span>
        </a>
        <a href="/<?php echo $_smarty_tpl->tpl_vars['aScript']->value;?>
?op=manage&act=menu" class="nav-item">
            <i class="ri-file-list-3-line"></i>
            <span>Danh sách công nợ</span>
        </a>

        <a href="/<?php echo $_smarty_tpl->tpl_vars['aScript']->value;?>
?op=manage&act=menu" class="nav-item">
            <i class="ri-bar-chart-box-line"></i>
            <span>Tổng hợp công nợ</span>
        </a>

        <a href="/<?php echo $_smarty_tpl->tpl_vars['aScript']->value;?>
?op=manage&act=customer" class="nav-item">
            <i class="ri-group-line"></i>
            <span>Khách hàng</span>
        </a>

        <a href="/<?php echo $_smarty_tpl->tpl_vars['aScript']->value;?>
?op=manage&act=customfield" class="nav-item">
            <i class="ri-settings-4-line"></i>
            <span>Cấu hình</span>
        </a>
    </nav>

    <div class="user-widget">
        <div class="user-avatar">
            <?php if ((isset($_smarty_tpl->tpl_vars['authUser']->value))) {?>
            <?php echo mb_strtoupper((string) substr((string) $_smarty_tpl->tpl_vars['authUser']->value->getFullName(), (int) 0, (int) 2) ?? '', 'UTF-8');?>

            <?php } else { ?>
            AD
            <?php }?>
        </div>
        <div class="user-details">
            <span class="user-name"><?php if ((isset($_smarty_tpl->tpl_vars['authUser']->value))) {
echo $_smarty_tpl->tpl_vars['authUser']->value->getFullName();
} else { ?>Guest<?php }?></span>
            <span class="user-role">Quản trị viên</span>
        </div>
        <i class="ri-arrow-down-s-line" style="font-size: 14px; color: #64748b; margin-left: 2px;"></i>

        <div class="user-dropdown-menu">
            <?php if ((isset($_smarty_tpl->tpl_vars['authUser']->value))) {?>
            <a href="/<?php echo $_smarty_tpl->tpl_vars['aScript']->value;?>
?op=manage&act=customer&mod=edit&id=<?php echo $_smarty_tpl->tpl_vars['authUser']->value->getId();?>
" class="user-dropdown-link">
                <i class="ri-user-line"></i>
                <span>Tài khoản</span>
            </a>
            <?php }?>
            <a href="/<?php echo $_smarty_tpl->tpl_vars['aScript']->value;?>
?op=manage&act=customfield" class="user-dropdown-link">
                <i class="ri-settings-line"></i>
                <span>Cài đặt</span>
            </a>
            <hr style="border: 0; border-top: 1px solid #f1f5f9; margin: 4px 0;">
            <a href="/<?php echo $_smarty_tpl->tpl_vars['aScript']->value;?>
?op=logout" class="user-dropdown-link logout-link">
                <i class="ri-logout-box-r-line"></i>
                <span>Đăng xuất</span>
            </a>
        </div>
    </div>
</header><?php }
}
