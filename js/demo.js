function reset () {
  $("#toggleCSS").attr("href", "");
  logify.reset();
}

// ==============================
// Standard Dialogs
$("#click-to-close").on( "click", function (ev) {

  ev.preventDefault();
  reset();

  logify
    .closeLogOnClick(true)
    .log("Click me to close!");

});

$("#click-to-change").on( "click", function(ev) {

  ev.preventDefault();
  reset();

  logify.log("Click on me!", function(){
    logify.content("I felt that!");
  });
});

$("#disable-click-to-close").on( "click", function (ev) {

  ev.preventDefault();
  reset();

  logify
    .closeLogOnClick(true)
    .log("Click me to close!")
    .closeLogOnClick(false)
    .log("You can't click to close this!");

});

$("#max-log-items").on( "click", function (ev) {

  ev.preventDefault();

  reset();

  logify
    .maxLogItems(1)
    .log("You can only see one message at a time!");

  setTimeout(function() {
    logify.log("This message has forced the last message to close.");
  }, 1000);

});

// ==============================
// Standard Dialogs
$("#notification").on( "click", function (ev) {
    ev.preventDefault();
    reset();
    logify.log("Standard log message");
});

$("#notification-html").on( "click", function (ev) {
    ev.preventDefault();
    reset();
    logify.log("<img src='https://placehold.it/256x128' /><h3>This is HTML</h3><p>It's great, right?</p>");
});

$("#notification-callback").click(function(ev) {

    reset();

    ev.preventDefault();
    logify.log("Standard log message with callback", function(event) {
        event.preventDefault();
        logify.log("You clicked the notification");
    });

});

$("#success").on( "click", function (ev) {

  ev.preventDefault();
  reset();
  logify.success("Success log message");

});

$("#success-callback").click(function() {
    reset();
    logify.success("Standard log message with callback", function() {
        logify.success("You clicked the notification");
    });
});

$("#error").on( "click", function (ev) {
    ev.preventDefault();
    reset();
    logify.error("Error log message");
});

$("#error-callback").click(function(ev) {

    ev.preventDefault();
    reset();

    logify.error("Standard log message with callback", function(event) {
        event.preventDefault();
        logify.error("You clicked the notification");
    });

});

// ==============================
// Custom Properties
$("#delay").on( "click", function (e) {

  reset();
  e.preventDefault();
  logify
    .delay(10000)
    .log("Hiding in 10 seconds");

});

$("#forever").on( "click", function (ev) {

  ev.preventDefault();

  reset();

  logify
    .delay(0)
    .log("Will stay until clicked");

});

$("#default-theme").on("click", function(e){
  e.preventDefault();

  reset();

  //Just to be certain...
  $("#logify-theme").attr("href", "css/logify.css");

  logify.log("This is the Default Theme!");
  logify.success("Here's a success notification!");
  logify.error("And here's an Error message!");

});


$("#bootstrap-theme").on("click", function(e){
  e.preventDefault();

  reset();

  $("#logify-theme").attr("href", "css/logify-bootstrap.css");

  logify.log("This is the Bootstrap Theme!");
  logify.success("Here's a success notification!");
  logify.error("And here's an Error message!");
  
  setTimeout(function() {
    $("#logify-theme").attr("href", "css/logify.css");
  }, 5500);

});

$("#bootstrap3-theme").on("click", function(e){
  e.preventDefault();

  reset();

  $("#logify-theme").attr("href", "css/logify-bootstrap-3.css");

  logify.log("This is the Bootstrap Theme!");
  logify.success("Here's a success notification!");
  logify.error("And here's an Error message!");
  
  setTimeout(function() {
    $("#logify-theme").attr("href", "css/logify.css");
  }, 5500);

});
