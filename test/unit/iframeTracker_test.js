(function($) {
	/**
	 * Returns a dummy spy iframeTracker handler
	 */
	var stepHandlerFactory = function(assert) {
		return {
			blurCallback: function() {
				assert.step("blur " + this.iframeId);
			},
			overCallback: function(element) {
				this.iframeId = $(element).attr("id");
				assert.step("over " + this.iframeId);
			},
			outCallback: function(element) {
				this.iframeId = null;
				assert.step("out " + $(element).attr("id"));
			}
		};
	};

	QUnit.testDone(function(details) {
		$.iframeTracker.handlersList = [];
		$.iframeTracker.focusRetrieved = false;
		document.activeElement.blur();
		$(window).focus();
	});

	QUnit.test("init", function(assert) {
		assert.ok($.iframeTracker.focusRetriever.is("input"), "Focus retriever element looks good");
		assert.ok($.iframeTracker.focusRetrieved === false, "Focus was not yet retrieved");
		assert.ok($.iframeTracker.handlersList instanceof Array, "handlersList is an array");
		assert.ok($.iframeTracker.handlersList.length === 0, "handlersList is empty");
		assert.ok(document.activeElement === document.querySelector("body"), "<body> has focus");
	});

	QUnit.test("Focus retriever", function(assert) {
		assert.ok(document.activeElement === document.querySelector("body"), "<body> has focus");
		$(document).trigger("mousemove");
		assert.ok(document.activeElement === document.querySelector("body"), "<body> still has focus");
		$("#qunit-fixture #red_iframe").focus();
		assert.ok(document.activeElement === document.querySelector("#qunit-fixture #red_iframe"), "Focus on an iframe");
		$(document).trigger("mousemove");
		assert.ok(document.activeElement === $.iframeTracker.focusRetriever[0], "Focus retrieved (element)");
		assert.ok($.iframeTracker.focusRetrieved === true, "Focus retrieved (flag)");
	});

	QUnit.test("track", function(assert) {
		assert.ok($.iframeTracker.handlersList.length === 0, "handlersList is empty");
		var iframe = document.querySelector("#qunit-fixture #red_iframe");
		var handler = function() {};
		$.iframeTracker.track(iframe, handler);
		assert.ok($.iframeTracker.handlersList.length === 1, "handlersList length OK");
		assert.ok($.iframeTracker.handlersList[0] === handler, "handler registred");
		var eventBindCheck = function(element, event, handler) {
			var bound = false;
			$.each($._data(element, "events")[event], function(key, val) {
				if (val.handler === handler) {
					bound = true;
				}
			});
			return bound;
		};
		assert.ok(eventBindCheck(iframe, "mouseover", $.iframeTracker.mouseoverListener), "mouseover handler is bound");
		assert.ok(eventBindCheck(iframe, "mouseout", $.iframeTracker.mouseoutListener), "mouseout handler is bound");
	});

	QUnit.test("untrack", function(assert) {
		var iframe = [document.querySelector("#qunit-fixture #red_iframe")];
		$.iframeTracker.track(iframe, {});
		assert.ok($.iframeTracker.handlersList.length === 1, "ready");
		$.iframeTracker.untrack(iframe);
		assert.ok($.iframeTracker.handlersList.length === 0, "handlersList is empty");
	});

	QUnit.test("fn invalid argument", function(assert) {
		assert.throws(
			function() {
				$("#qunit-fixture #red_iframe").iframeTracker("Bad motherfucker");
			},
			/Wrong handler type/,
			"Argument check success"
		);
	});

	QUnit.test("Workflow : over, blur", function(assert) {
		$("#qunit-fixture iframe").iframeTracker(stepHandlerFactory(assert));
		$("#qunit-fixture #red_iframe").trigger("mouseover");
		$(window).trigger("blur");
		assert.verifySteps(["over red_iframe", "blur red_iframe"]);
	});

	QUnit.test("Workflow : over, out, blur", function(assert) {
		$("#qunit-fixture iframe").iframeTracker(stepHandlerFactory(assert));
		$("#qunit-fixture #red_iframe").trigger("mouseover");
		$("#qunit-fixture #red_iframe").trigger("mouseout");
		$(window).trigger("blur");
		assert.verifySteps(["over red_iframe", "out red_iframe"]);
	});

	QUnit.test("Workflow : over, blur, untrack & again", function(assert) {
		$("#qunit-fixture iframe").iframeTracker(stepHandlerFactory(assert));

		$("#qunit-fixture #blue_iframe").trigger("mouseover");
		$(window).trigger("blur");
		$("#qunit-fixture #blue_iframe").trigger("mouseout");
		$(document).trigger("mousemove");

		$("#qunit-fixture #red_iframe").trigger("mouseover");
		$(window).trigger("blur");
		$("#qunit-fixture #red_iframe").trigger("mouseout");
		$(document).trigger("mousemove");

		$("#qunit-fixture #red_iframe").iframeTracker(false);
		$(window).trigger("blur");

		assert.verifySteps([
			"over blue_iframe",
			"blur blue_iframe",
			"out blue_iframe",
			"over red_iframe",
			"blur red_iframe",
			"out red_iframe"
		]);
	});
})(jQuery);
