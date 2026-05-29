<?php
/*************************************************************************
Invosync Custom Field List module
----------------------------------------------------------------
**************************************************************************/
# Check permission
if (!isset($_SESSION['userId']) || $_SESSION['userId'] == 0) {
    header("Location: /" . ADMIN_SCRIPT . "?op=login");
    exit;
}

$templateFile = 'managecustomfieldlist.tpl.html';
# Set active menu if needed


// Handle save
if (isset($_POST['save'])) {
    $customfields = $_POST['customfields'];

    if (is_array($customfields)) {
        foreach ($customfields as $type => $fields) {
            foreach ($fields as $id => $field) {
                $value = trim($field['value']);
                $sql = "UPDATE " . DB_PREFIX . "customfields SET value = '$value' WHERE type = '$type' AND id = $id";
                $db->query($sql);
            }
        }
    }

    // Redirect back to list
    header("Location: /" . ADMIN_SCRIPT . "?op=manage&act=customfield&mod=list");
    exit;

}

?>
