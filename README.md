jquery-stickypage
=================

jQuery plugin to display a page with chronological sticky tags.

[Demo](http://soichih.github.io/jquery-stickypage/)

## Features

* Sticky tag can be positioned anywhere you want them to be (x,y,rotation). x, y are percentage within the canvas area (not pixel)
* Responsive
* User can use scrollbar to reveal sticky tags that are buried beneath the others.

## Installation

Just add both jquery-stickpage.css and jquery-stickpage.js, and create a ol/li elements like following.

```
<ol id="sticky" class="sticky-page">

<li data-pos="10,10,-3deg">
Happy New Year!
<time>1/4/2014</time>
</li>

<li data-pos="20,25,2deg">
Just published <a href="/whiteboard">whiteboard</a> app running on my node server on OpenShift. Check it out!
<time>1/3/2014</time>
</li>

<li data-pos="60,25,2deg">
I've created a jQuery plugin called <a href="https://github.com/soichih/jquery-stickypage" target="_blank">stickypage</a> for this page
<time>1/4/2014</time>
</li>

</ol>
```

Then initialize the ol element with stickypage().

```
</script>
(function($) {
    $("#sticky").stickypage({width: "100%", height: "400px"});
})(jQuery);
</script>
```

Enjoy!


