iframeTracker jQuery Plugin
===========================
iframeTracker is a jQuery plugin that allow to track clicks on iframes.

This is very useful to :

 - track clicks on Google Adsense (google uses iframes to display ads)
 - track clicks on Facebook Like buttons
 - track clicks on Youtube embed video player
 - ... and any other iframe !

Try it now : [demo](http://cdn.rawgit.com/vincepare/iframeTracker-jquery/master/demo/index.html).

How does it work ?
------------------
Since it's impossible to read iframe content (DOM) from the parent page due to the [same origin policy](http://en.wikipedia.org/wiki/Same-origin_policy), tracking is based on the blur event associated to a **page/iframe boundary monitoring system** telling over which iframe is the mouse cursor at any time.

How to use ?
------------
Match the iframe elements you want to track with a jQuery selector and call `iframeTracker` with a callback function that will be called when a click on the iframe is detected :

```javascript
jQuery(document).ready(function($){
	$('.iframe_wrap iframe').iframeTracker({
		blurCallback: function(event) {
			// Do something when the iframe is clicked (like firing an XHR request)
		}
	});
});
```

You can also just pass a function, that will be then registered as the `blurCallback` :

```javascript
jQuery(document).ready(function($){
	$('.iframe_wrap iframe').iframeTracker(function(event) {
		// Do something when the iframe is clicked (like firing an XHR request)
	});
});
```

### Advanced tracking

```javascript
jQuery(document).ready(function($){
	$('.iframe_wrap iframe').iframeTracker({
		blurCallback: function(event) {
			// Do something when iframe is clicked (like firing an XHR request)
			// You can know which iframe element is clicked via this._overId
		},
		overCallback: function(element, event) {
			this._overId = $(element).parents('.iframe_wrap').attr('id'); // Saving the iframe wrapper id
		},
		outCallback: function(element, event) {
			this._overId = null; // Reset hover iframe wrapper id
		},
		_overId: null
	});
});
```

#### Cancel tracking
You can remove a tracker attached to an iframe by calling `.iframeTracker()` with either `false` or `null` :
```javascript
$('#iframe_red_1 iframe').iframeTracker(false);
$('#iframe_red_2 iframe').iframeTracker(null);
```

Full tutorial available [here](http://www.finalclap.com/tuto/track-iframe-click-jquery-87/) (it's in French).

Tested on jQuery `1.4.4` to `1.11.0`, `2.1.4`  & `3.2.1`.

----------

### Install
With npm :
```bash
npm install jquery.iframetracker
```

With bower :
```bash
bower install jquery.iframetracker
```

### About mobile devices
This plugin doesn't work on mobile devices such as smartphones and tablets, because this hardware uses a touchscreen instead of a mouse as click input. This design makes the boundary monitoring trick ineffective.

### Donate
Donations are welcome :) via [PayPal](https://www.paypal.com/cgi-bin/webscr?cmd=_donations&business=YXDJFGF8GCGLA&item_name=Vincent%20Par%e9%20-%20www.finalclap.com&item_number=iframeTracker%2dgithub&currency_code=EUR&bn=PP%2dDonationsBF%3abtn_donateCC_LG%2egif%3aNonHosted), [Flattr](https://flattr.com/submit/auto?user_id=finalclap&url=https://github.com/vincepare/iframeTracker-jquery&title=iframeTracker%20jQuery%20Plugin&language=&tags=github&category=software) or Bitcoin at this address : `3G5uTti2JPAT738uDeQXjrN7tUj2NZjt6M` or by flashing this lovely QR code :

![qrcode for bitcoin address 3G5uTti2JPAT738uDeQXjrN7tUj2NZjt6M](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAM0AAADNAQMAAAAhcmYqAAAABlBMVEX///8AAABVwtN+AAACC0lEQVRYhe2YzY2DMBCFB3HwkRLoBBpDwhKNhU5Sgo8cokzeezabTQoYLrG0aOXPh9HMm7+Y/c7/M7v7MQ0P89uwuT/5H849GE34Ozp/jMeMT3raYodZH44Gvx9dMV4sQEM2PNouQRN8ZDDT0g4fXYa6surCEbSLkOJVescjxMv56COUMaipd7u/P1/CDkH1IF4JPnJK+CujgxBuj4mewUfxgoCKHBWJOs8jjEMuC1G96WbhyGzlRc0fR3HBedoajqATFRJc9A719rQwHKmozZTrzExilUXQsgUjyXVCbXUvCzpN0fOWy5GI6oVJ8NZjrBLeL0CwCxLeKBdVkzzidrFgZLWUIUo7amuicFXeghGnkCS70HMcL5HL7uGIncb3Wux5WwxDSatskchlEsxk34V6V6eALBxtKmXoNGVp6r1JNKEI/d6rXJnBGFMRqrMTBSI2vINm6hnTGI6ycNQhlxM9Q/cwjeGylsuRSLV198xp2UZEDpw6Dka0EBmcqZiV6l0uQdO5syRWNsgmjxwEohFLSqKjTEl0fiwYUb3aGLTCIHJaLnM00tEooiZT/zvnwzik3YGYm+2oYo8at0YjbVKztmxEicVFI1o4qotkcw/qCuq8prMLUBuZ9ftHrol1BeKQWFsudwf7m4gCkelXD1YT2NXaTZ0BIlFTLxTD9g/FYBTZP4Qdgn7nfV5ibpKOC9m+PgAAAABJRU5ErkJggg==)
