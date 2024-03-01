let userLang = navigator.language || navigator.userLanguage;

if (userLang.includes("uk")) {
	userLang = "ua";
} else {
	userLang = "en";
}

fetch("landing/landing-localization.json")
	.then((response) => response.json())
	.then((json) => initLocalization(json, userLang));

let assets;

const initLocalization = (data, lang) => {
	assets = data;
	localize(lang);
	document.getElementById("lang-en").addEventListener("click", () => localize("en"));
	document.getElementById("lang-ua").addEventListener("click", () => localize("ua"));
	document.querySelector("body").style.visibility = "visible";
};

const localize = (lang) => {
	/* Section 1 */
	document.getElementById("nav-about").innerHTML = assets[lang]["section-1"].header.about;
	document.getElementById("section-1-title").innerHTML = assets[lang]["section-1"].title;
	document.getElementById("section-1-subtitle").innerHTML = assets[lang]["section-1"].subtitle;
	document.getElementById("login-btn").innerHTML = assets[lang]["section-1"].login;
	document.getElementById("register-btn").innerHTML = assets[lang]["section-1"].register;

	/* Section 2 */
	document.getElementById("section-2-title").innerHTML = assets[lang]["section-2"].title;
	document.getElementById("section-2-paragraph-1").innerHTML = assets[lang]["section-2"]["paragraph-1"];
	document.getElementById("section-2-paragraph-2").innerHTML = assets[lang]["section-2"]["paragraph-2"];
	document.getElementById("section-2-paragraph-3").innerHTML = assets[lang]["section-2"]["paragraph-3"];

	/* Section 3 */
	document.getElementById("section-3-title").innerHTML = assets[lang]["section-3"].title;
	document.getElementById("section-3-subtitle").innerHTML = assets[lang]["section-3"].subtitle;
	document.getElementById("section-3-step-1").innerHTML = assets[lang]["section-3"]["step-1"];
	document.getElementById("section-3-step-2").innerHTML = assets[lang]["section-3"]["step-2"];
	document.getElementById("section-3-step-3").innerHTML = assets[lang]["section-3"]["step-3"];
	document.getElementById("section-3-step-4").innerHTML = assets[lang]["section-3"]["step-4"];
	document.getElementById("section-3-step-5").innerHTML = assets[lang]["section-3"]["step-5"];

	/* Section 4 */
	document.getElementById("section-4-title").innerHTML = assets[lang]["section-4"].title;
	document.getElementById("section-4-advantage-1").innerHTML = assets[lang]["section-4"]["advantage-1"];
	document.getElementById("section-4-advantage-2").innerHTML = assets[lang]["section-4"]["advantage-2"];
	document.getElementById("section-4-advantage-3").innerHTML = assets[lang]["section-4"]["advantage-3"];

	/* Section 5 */
	document.getElementById("section-5-title").innerHTML = assets[lang]["section-5"].title;
	document.getElementById("section-5-feature-1-title").innerHTML = assets[lang]["section-5"]["feature-1"].title;
	document.getElementById("section-5-feature-1-text").innerHTML = assets[lang]["section-5"]["feature-1"].text;
	document.getElementById("section-5-feature-2-title").innerHTML = assets[lang]["section-5"]["feature-2"].title;
	document.getElementById("section-5-feature-2-text").innerHTML = assets[lang]["section-5"]["feature-2"].text;
	document.getElementById("section-5-feature-3-title").innerHTML = assets[lang]["section-5"]["feature-3"].title;
	document.getElementById("section-5-feature-3-text").innerHTML = assets[lang]["section-5"]["feature-3"].text;
	document.getElementById("section-5-feature-4-title").innerHTML = assets[lang]["section-5"]["feature-4"].title;
	document.getElementById("section-5-feature-4-text").innerHTML = assets[lang]["section-5"]["feature-4"].text;
	document.getElementById("section-5-feature-5-title").innerHTML = assets[lang]["section-5"]["feature-5"].title;
	document.getElementById("section-5-feature-5-text").innerHTML = assets[lang]["section-5"]["feature-5"].text;
	document.getElementById("section-5-feature-6-title").innerHTML = assets[lang]["section-5"]["feature-6"].title;
	document.getElementById("section-5-feature-6-text").innerHTML = assets[lang]["section-5"]["feature-6"].text;
};

const slider = Peppermint(document.getElementById("carousel"), {
	speed: 500,
	dots: true,
	dotsContainer: document.getElementById("carousel-dots"),
});
