<?php
if($_POST) {
  $fetchCall = $_POST['getIncludes'];
}
else {
  $fetchCall = false;
}
  if($fetchCall != 'true') {
    include_once('/includes/head.php');
    include_once('/includes/nav.php');
    include_once('/includes/container-start.php');
  }
?>
  <h3>Some projects I've worked on</h3>
  <p>content to come....</p>
  <p>For the time being please download this <a href="/assets/short-port.pdf" target="_blank" title="ryan williamson-cardneaus short portfolio">resume &amp; short portfolio</a> illustrating my process on a recently launched project.</p>
  <p>I also continue to work with the wonderful people over at <a href="http://brandingentourage.com" target="_blank" title="my night job with Branding Entourage">Branding Entourage</a></p>
<?php
  if($fetchCall != 'true') {
    include_once('/includes/container-end.php');
    include_once('/includes/contact.php');
    include_once('/includes/foot.php');
  }
?>
