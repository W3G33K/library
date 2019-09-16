$(function() {
	let desc = $("#desc"),
		descText = desc.text();
	descText = descText.trim();
	desc.text(descText.concat(" 😁 "));
});
