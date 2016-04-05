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
  <p>For the time being please download my printable <a href="/assets/short-port.pdf" download="Ryan-Williamson-Cardneau-portfolio.pdf" title="ryan williamson-cardneaus short portfolio">portfolio</a> illustrating my process or if you just want my <a href="/assets/Ryan-Williamson-Cardneau-resume.pdf" download="Ryan-Williamson-Cardneau-resume.pdf" title="Ryan Williamson-Cardneau's resume">resumé</a></p>
  <p>I also continue to freelance with the wonderful people over at <a href="http://brandingentourage.com" target="_blank" rel="noopener" title="my night job with Branding Entourage">Branding Entourage</a></p>
  <p>Most of the work in my portfolio comes from my day job at <a href="http://regroup.us" title="regroup integrated marketing" rel="noopener" target="_blank">re:group</a>, though I worked before that at Stone Interactive Group.</p>
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
    <li>Mango Languages</li>
  </ul>
<?php
  if($fetchCall != 'true') {
    include 'includes/container-end.php';
    include 'includes/contact.php';
    include 'includes/foot.php';
  }
?>
