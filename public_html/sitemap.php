<?php
# Create Google Sitemap for Viviann Shop
# Created by Mai Minh minh@maingo.com
# Date: 28/11/2006
# Update By PhanTom 19/12/2013
#---------------------------------
# Autodetect current root folder
if (!defined("ROOT_PATH")) {
	define("ROOT_PATH", dirname(__FILE__) . "/");
}

include_once(ROOT_PATH . "includes/functions.inc.php");
include_once(ROOT_PATH . "includes/config.inc.php");
include_once(ROOT_PATH . "includes/constant.inc.php");



$sitemap_file = "sitemap.xml";

# Priotity settings
$week_prio = 0.5;
$item_prio = 0.3;
$cat_prio = 0.8;

# Update frequency
$weekly = 'weekly';
$item_update = 'weekly';
$cat_update = 'daily';
$content = "";

# Print XML header
$content .= xml_head($url);



# Print XML footer
$content .= xml_foot();
write_local_file($sitemap_file, $content);
echo "Success!";
function xml_head($url)
{
	$freq = 'daily';
	$priority = '1.0';
	$mod = date("Y-m-d") . "T" . date("H:i:s") . "+00:00";
	$str = "<?xml version='1.0' encoding='UTF-8'?>
<urlset xmlns=\"http://www.google.com/schemas/sitemap/0.84\"
xmlns:xsi=\"http://www.w3.org/2001/XMLSchema-instance\"
xsi:schemaLocation=\"http://www.google.com/schemas/sitemap/0.84 http://www.google.com/schemas/sitemap/0.84/sitemap.xsd\">
<url>
<loc>https://digitrust.vn/sitemap_products.xml</loc>
</url>
<url>
<loc>https://digitrust.vn/sitemap_article.xml</loc>
</url>
<url>
<loc>https://digitrust.vn/sitemap_pages.xml</loc>
</url>";
	return $str;
}
#-----------------------------------------------
# xml_foot
#-----------------------------------------------
function xml_foot()
{
	$str = "
</urlset>";
	return $str;
}
#-----------------------------------------------
# print_xml
#-----------------------------------------------
function print_xml($url, $priority, $lastmod, $changefreq)
{
	$str = "
<url>
  <loc>$url</loc>
  <priority>$priority</priority>
  <lastmod>$lastmod</lastmod>
  <changefreq>$changefreq</changefreq>
</url>";
	return $str;
}
