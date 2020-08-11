let userLang = navigator.language || navigator.userLanguage;

if (userLang.includes("ru")) {
	userLang = "ru";
} else if (userLang.includes("uk")) {
	userLang = "ua";
} else {
	userLang = "en";
}

fetch("landing/about-localization.json")
	.then((response) => response.json())
	.then((json) => initLocalization(json, userLang));

let assets;

const initLocalization = (data, lang) => {
	assets = data;
	localize(lang);
	document.querySelector("body").style.visibility = "visible";
};

const localize = (lang) => {
	document.title = assets[lang]["page-title"];

	document.getElementById("nav-about").innerHTML = assets[lang].header.about;
	document.getElementById("title").innerHTML = assets[lang].title;
	document.getElementById("paragraph-1").innerHTML = assets[lang]["paragraph-1"];
	document.getElementById("paragraph-2").innerHTML = assets[lang]["paragraph-2"];
	document.getElementById("team-title").innerHTML = assets[lang]["team-title"];
	document.getElementById("hryhorii-pazych-name").innerHTML = assets[lang]["hryhorii-pazych"].name;
	document.getElementById("hryhorii-pazych-occupation").innerHTML = assets[lang]["hryhorii-pazych"].occupation;
	document.getElementById("vadym-ohyr-name").innerHTML = assets[lang]["vadym-ohyr"].name;
	document.getElementById("vadym-ohyr-occupation").innerHTML = assets[lang]["vadym-ohyr"].occupation;
	document.getElementById("vladyslav-bozhko-name").innerHTML = assets[lang]["vladyslav-bozhko"].name;
	document.getElementById("vladyslav-bozhko-occupation").innerHTML = assets[lang]["vladyslav-bozhko"].occupation;
};
