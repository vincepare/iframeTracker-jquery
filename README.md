iframeTracker jQuery Plugin
===========================
iframeTracker is a jQuery plugin that allow to track clicks on iframes.

This is very useful for :
 - track clicks on Google Adsense (google uses iframes to display ads)
 - track clicks on Facebook Like buttons
 - track clicks on Youtube embed video player
 - ... and any other iframe !

How it works ?
--------------
Since it's impossible to read iframe content (DOM) from the parent page, the tracking is based on the blur event associated to a page/iframe boundary monitoring which tells over which iframe is the mouse cursor at any time

How to use ?
------------
Match iframe elements that you want to track with a jQuery selector and call `iframeTracker` with a callback function that will be called when an click on the iframe is detected :

    jQuery(document).ready(function($){
    	$('.iframe_wrap iframe').iframeTracker({
			blurCallback: function(){
				// Do something when iframe is clicked (like firing an XHR request)
			}
		});
	});

### Advanced tracking

	jQuery(document).ready(function($){
		$('.iframe_wrap iframe').iframeTracker({
			blurCallback: function(){
				// Do something when iframe is clicked (like firing an XHR request)
				// You can know which iframe element is clicked via this._overId
			},
			overCallback: function(element){
				this._overId = $(element).parents('.iframe_wrap').attr('id'); // Saving the iframe wrapper id
			},
			outCallback: function(element){
				this._overId = null; // Reset hover iframe wrapper id
			},
			_overId: null
		});
	});

See the demo page on github.
Full tutorial available here : http://www.finalclap.com/tuto/track-iframe-click-jquery-87/ (it's in French)