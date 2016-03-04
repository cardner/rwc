    <aside class="closed" id="contact-form">
      <h4>how to reach me <button class="l-right fa fa-times-circle-o" type="button" id="closeForm"></button></h4>
      <p>you can leave your name, your email, and a brief reason why you're contacting me.</p>
      <form action="/" method="post" formtarget="_self" class="l-grid">
        <input type="text" class="l-d-col-6 l-m-col-6" name="name" placeholder="the name you were given" class="l-m-col-6" />
        <input type="email" class="l-d-col-6 l-m-col-6" name="email" placeholder="email address you actually check"  class="l-m-col-6">
        <input type="text" class="l-d-col-6 l-m-col-6" name="reason" list="reason" placeholder="your reason for contacting" autocomplete="off" >
        <datalist id="reason">
          <option value="work">
          <option value="just becuase">
          <option value="you know me?">
          <option value="long lost lover">
          <option value="intergalactic bounty hunter">
          <option value="future self coming back to warn me of terrible life decisions">
        </datalist>
        <input type="text" name="honeypot" class="honeyPot visuallyhidden" value="">
        <input type="hidden" name="securityCode" value="">
        <button type="submit" class="l-d-col-3 l-m-col-6" name="submit" id="submit" formmethod="post" formaction="/">contact</button>
        <button type="reset" class="l-d-col-3 l-m-col-6" name="reset">reset</button>
      </form>
    </aside>
