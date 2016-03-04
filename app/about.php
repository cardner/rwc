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
  <h3>About ME!</h3>
  <p>As a child, I wanted to be a jet plane (not a pilot), or maybe a robotic dinosaur. These days, I’m happy to be a web maker, although I haven’t given up the dream of someday being a robot. I love spending my days transforming the web into a friendlier and less frustrating place through user-focused design. To me, this means basing design decisions on research and data to provide users with what they need, when they need it. Sarah Parmenter, Luke Wroblewski, and Jeffrey Zeldman are some of my UX design idols.</p>

  <p>Recently, I’ve been working with a professor from my alma mater to better integrate web development practices and processes into the design curriculum. I think it’s critical that new design graduates are familiar with web technologies.</p>

  <p>When I’m not making things on the web, I like to make things at home: cooking, dis/re-assembling my bikes, or honing my amateur luthier skills. Once I’m worn out, you’ll often find me lounging with my two dogs (Princess Zelda and Sir Ralph Ralphington III, Esquire) and watching old horror films or re-watching Stargate for the tenth time.</p>
<?php
  if($fetchCall != 'true') {
    include 'includes/container-end.php';
    include 'includes/contact.php';
    include 'includes/foot.php';
  }
?>
