// ==UserScript==
// @name           TweetDeck Clear Buttons
// @description    Adds "Clear" button to each column.
// @include        https://tweetdeck.twitter.com/*
// @version        1.0
// @source         https://github.com/gregorb/TweetDeckClearButtons
// ==/UserScript==

// Chrome installation instructions: open settings/extensions page, drag&drop this file into it.

const debug = false;

const timer = window.setInterval( function() {
	// keep checking for new/updated columns every few seconds

	if (debug) console.log("GB's TweetDeck Helper: Checking.");

	// list all columns that don't have our "Clear" button yet
	const columnsToUpdate = document.querySelectorAll("header > a.column-settings-link:not(.gb)");
	if (columnsToUpdate && columnsToUpdate.length) {

		if (debug) console.log("GB's TweetDeck Helper: " + JSON.stringify(columnsToUpdate) );

		columnsToUpdate.forEach(function(value) {
			// value = options button
				
			value.className += " gb";

			const a = document.createElement("a");
			a.className += "js-action-header-button column-header-link";
			a.href = "#";
			a.innerHTML = '<i class="icon icon-clear-timeline"></i>';
			a.setAttribute("data-action", "clear");
			a.style.left = "200px";
			value.parentNode.insertBefore(a, value);

			a.addEventListener("click", function(){ 
				value.click();   // open settings panel
				window.setTimeout(function(){
	
					const clrButton = value.parentNode.parentNode.querySelector("button[data-action='clear']");

					if (debug) console.log("GB's TweetDeck Helper: " + JSON.stringify( clrButton ));

					clrButton.click();   // click on original "clear" button 						
					value.click();  // close settings panel

				}, 1000);
				
			});

		});

	}

}, 3000 );


