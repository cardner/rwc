<?php
if($_POST) {
  $fetchCall = $_POST['getIncludes'];
}
else {
  $fetchCall = false;
}
  if($fetchCall != 'true') {
    include 'includes/head.php';
    include 'includes/nav.php';
    include 'includes/container-start.php';
  }
?>
  <h1>Some projects I've worked on</h1>
  <p>content to come....</p>
  <p>For the time being please download this <a href="/assets/short-port.pdf" target="_blank" title="ryan williamson-cardneaus short portfolio">resume &amp; short portfolio</a> illustrating my process on a recently launched project.</p>
  <p>I also continue to work with the wonderful people over at <a href="http://brandingentourage.com" target="_blank" title="my night job with Branding Entourage">Branding Entourage</a></p>
  <h3>Here are some companies I've worked with:</h3>
  <ul>
    <li>Recycle Ann Arbor</li>
    <li>IHA</li>
    <li>OSRAM Semi Opto Conductors</li>
    <li>Delphi</li>
    <li>IQ2 Debates (NPR Affiliate)</li>
    <li>Millicare</li>
    <li>Goldfish Swim School</li>
    <li>Ferris State University</li>
    <li>University of Michigan</li>
    <li>Waterloo Trails</li>
    <li>DTE</li>
  </ul>
<?php
  if($fetchCall != 'true') {
    include 'includes/container-end.php';
    include 'includes/contact.php';
    include 'includes/foot.php';
  }
?>
