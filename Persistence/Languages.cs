using System.Collections.Generic;
using Domain;

namespace Persistence
{
    public static class Languages
    {
        public static List<Language> GetLanguagesList()
        {
            var languages = new List<Language>
            {
                new Language
                {
                    Id = 1,
                    Name = "Afrikaans",
                    ISOCode = "afr"
                },
                new Language
                {
                    Id = 2,
                    Name = "Albanian",
                    ISOCode = "sqi",
                },
                new Language
                {
                    Id = 3,
                    Name = "Amharic",
                    ISOCode = "amh",
                },
                new Language
                {
                    Id = 4,
                    Name = "Arabic",
                    ISOCode = "ara",
                },
                new Language
                {
                    Id = 5,
                    Name = "Armenian",
                    ISOCode = "hye",
                },
                new Language
                {
                    Id = 6,
                    Name = "Azerbaijani",
                    ISOCode = "aze",
                },
                new Language
                {
                    Id = 7,
                    Name = "Basque",
                    ISOCode = "eus",
                },
                new Language
                {
                    Id = 8,
                    Name = "Belarusian",
                    ISOCode = "bel",
                },
                new Language
                {
                    Id = 9,
                    Name = "Bengali",
                    ISOCode = "ben",
                },
                new Language
                {
                    Id = 10,
                    Name = "Bosnian",
                    ISOCode = "bos",
                },
                new Language
                {
                    Id = 11,
                    Name = "Bulgarian",
                    ISOCode = "bul",
                },
                new Language
                {
                    Id = 12,
                    Name = "Catalan",
                    ISOCode = "cat",
                },
                new Language
                {
                    Id = 13,
                    Name = "Cebuano",
                    ISOCode = "ceb",
                },
                new Language
                {
                    Id = 14,
                    Name = "Chichewa",
                    ISOCode = "nya",
                },
                new Language
                {
                    Id = 15,
                    Name = "Chinese",
                    ISOCode = "zho",
                },
                new Language
                {
                    Id = 16,
                    Name = "Corsican",
                    ISOCode = "cos",
                },
                new Language
                {
                    Id = 17,
                    Name = "Croatian",
                    ISOCode = "hrv",
                },
                new Language
                {
                    Id = 18,
                    Name = "Czech",
                    ISOCode = "ces",
                },
                new Language
                {
                    Id = 19,
                    Name = "Danish",
                    ISOCode = "dan",
                },
                new Language
                {
                    Id = 20,
                    Name = "Dutch",
                    ISOCode = "nld",
                },
                new Language
                {
                    Id = 21,
                    Name = "English",
                    ISOCode = "eng",
                },
                new Language
                {
                    Id = 22,
                    Name = "Esperanto",
                    ISOCode = "epo",
                },
                new Language
                {
                    Id = 23,
                    Name = "Estonian",
                    ISOCode = "est",
                },
                new Language
                {
                    Id = 24,
                    Name = "Filipino",
                    ISOCode = "fil",
                },
                new Language
                {
                    Id = 25,
                    Name = "Finnish",
                    ISOCode = "fin",
                },
                new Language
                {
                    Id = 26,
                    Name = "French",
                    ISOCode = "fra",
                },
                new Language
                {
                    Id = 27,
                    Name = "Frisian",
                    ISOCode = "frr",
                },
                new Language
                {
                    Id = 28,
                    Name = "Galician",
                    ISOCode = "glg",
                },
                new Language
                {
                    Id = 29,
                    Name = "Georgian",
                    ISOCode = "kat",
                },
                new Language
                {
                    Id = 30,
                    Name = "German",
                    ISOCode = "deu",
                },
                new Language
                {
                    Id = 31,
                    Name = "Greek",
                    ISOCode = "ell",
                },
                new Language
                {
                    Id = 32,
                    Name = "Gujarati",
                    ISOCode = "guj",
                },
                new Language
                {
                    Id = 33,
                    Name = "Haitian Creole",
                    ISOCode = "hat",
                },
                new Language
                {
                    Id = 34,
                    Name = "Hausa",
                    ISOCode = "hau",
                },
                new Language
                {
                    Id = 35,
                    Name = "Hawaiian",
                    ISOCode = "haw",
                },
                new Language
                {
                    Id = 36,
                    Name = "Hebrew",
                    ISOCode = "heb",
                },
                new Language
                {
                    Id = 37,
                    Name = "Hindi",
                    ISOCode = "hin",
                },
                new Language
                {
                    Id = 38,
                    Name = "Hmong",
                    ISOCode = "hmn",
                },
                new Language
                {
                    Id = 39,
                    Name = "Hungarian",
                    ISOCode = "hun",
                },
                new Language
                {
                    Id = 40,
                    Name = "Icelandic",
                    ISOCode = "isl",
                },
                new Language
                {
                    Id = 41,
                    Name = "Igbo",
                    ISOCode = "ibo",
                },
                new Language
                {
                    Id = 42,
                    Name = "Indonesian",
                    ISOCode = "ind",
                },
                new Language
                {
                    Id = 43,
                    Name = "Irish",
                    ISOCode = "gle",
                },
                new Language
                {
                    Id = 44,
                    Name = "Italian",
                    ISOCode = "ita",
                },
                new Language
                {
                    Id = 45,
                    Name = "Japanese",
                    ISOCode = "jpn",
                },
                new Language
                {
                    Id = 46,
                    Name = "Javanese",
                    ISOCode = "jav",
                },
                new Language
                {
                    Id = 47,
                    Name = "Kannada",
                    ISOCode = "kan",
                },
                new Language
                {
                    Id = 48,
                    Name = "Kazakh",
                    ISOCode = "kaz",
                },
                new Language
                {
                    Id = 49,
                    Name = "Khmer",
                    ISOCode = "khm",
                },
                new Language
                {
                    Id = 50,
                    Name = "Kinyarwanda",
                    ISOCode = "kin",
                },
                new Language
                {
                    Id = 51,
                    Name = "Korean",
                    ISOCode = "kor",
                },
                new Language
                {
                    Id = 52,
                    Name = "Kurdish",
                    ISOCode = "kur",
                },
                new Language
                {
                    Id = 53,
                    Name = "Kyrgyz",
                    ISOCode = "kir",
                },
                new Language
                {
                    Id = 54,
                    Name = "Lao",
                    ISOCode = "lao",
                },
                new Language
                {
                    Id = 55,
                    Name = "Latin",
                    ISOCode = "lat",
                },
                new Language
                {
                    Id = 56,
                    Name = "Latvian",
                    ISOCode = "lav",
                },
                new Language
                {
                    Id = 57,
                    Name = "Lithuanian",
                    ISOCode = "lit",
                },
                new Language
                {
                    Id = 58,
                    Name = "Luxembourgish",
                    ISOCode = "ltz",
                },
                new Language
                {
                    Id = 59,
                    Name = "Macedonian",
                    ISOCode = "mkd",
                },
                new Language
                {
                    Id = 60,
                    Name = "Malagasy",
                    ISOCode = "mlg",
                },
                new Language
                {
                    Id = 61,
                    Name = "Malay",
                    ISOCode = "msa",
                },
                new Language
                {
                    Id = 62,
                    Name = "Malayalam",
                    ISOCode = "mal",
                },
                new Language
                {
                    Id = 63,
                    Name = "Maltese",
                    ISOCode = "mlt",
                },
                new Language
                {
                    Id = 64,
                    Name = "Maori",
                    ISOCode = "mri",
                },
                new Language
                {
                    Id = 65,
                    Name = "Marathi",
                    ISOCode = "mar",
                },
                new Language
                {
                    Id = 66,
                    Name = "Mongolian",
                    ISOCode = "mon",
                },
                new Language
                {
                    Id = 67,
                    Name = "Myanmar",
                    ISOCode = "mya",
                },
                new Language
                {
                    Id = 68,
                    Name = "Nepali",
                    ISOCode = "nep",
                },
                new Language
                {
                    Id = 69,
                    Name = "Norwegian",
                    ISOCode = "nor",
                },
                new Language
                {
                    Id = 70,
                    Name = "Odia",
                    ISOCode = "ori",
                },
                new Language
                {
                    Id = 71,
                    Name = "Pashto",
                    ISOCode = "pus",
                },
                new Language
                {
                    Id = 72,
                    Name = "Persian",
                    ISOCode = "fas",
                },
                new Language
                {
                    Id = 73,
                    Name = "Polish",
                    ISOCode = "pol",
                },
                new Language
                {
                    Id = 74,
                    Name = "Portuguese",
                    ISOCode = "por",
                },
                new Language
                {
                    Id = 75,
                    Name = "Punjabi",
                    ISOCode = "pan",
                },
                new Language
                {
                    Id = 76,
                    Name = "Romanian",
                    ISOCode = "ron",
                },
                new Language
                {
                    Id = 77,
                    Name = "Russian",
                    ISOCode = "rus",
                },
                new Language
                {
                    Id = 78,
                    Name = "Samoan",
                    ISOCode = "smo",
                },
                new Language
                {
                    Id = 79,
                    Name = "Scots Gaelic",
                    ISOCode = "gla",
                },
                new Language
                {
                    Id = 80,
                    Name = "Serbian",
                    ISOCode = "srp",
                },
                new Language
                {
                    Id = 81,
                    Name = "Sesotho",
                    ISOCode = "sot",
                },
                new Language
                {
                    Id = 82,
                    Name = "Shona",
                    ISOCode = "sna",
                },
                new Language
                {
                    Id = 83,
                    Name = "Sindhi",
                    ISOCode = "snd",
                },
                new Language
                {
                    Id = 84,
                    Name = "Sinhala",
                    ISOCode = "sin",
                },
                new Language
                {
                    Id = 85,
                    Name = "Slovak",
                    ISOCode = "slk",
                },
                new Language
                {
                    Id = 86,
                    Name = "Slovenian",
                    ISOCode = "slv",
                },
                new Language
                {
                    Id = 87,
                    Name = "Somali",
                    ISOCode = "som",
                },
                new Language
                {
                    Id = 88,
                    Name = "Spanish",
                    ISOCode = "spa",
                },
                new Language
                {
                    Id = 89,
                    Name = "Sundanese",
                    ISOCode = "sun",
                },
                new Language
                {
                    Id = 90,
                    Name = "Swahili",
                    ISOCode = "swa",
                },
                new Language
                {
                    Id = 91,
                    Name = "Swedish",
                    ISOCode = "swe",
                },
                new Language
                {
                    Id = 92,
                    Name = "Tajik",
                    ISOCode = "tgk",
                },
                new Language
                {
                    Id = 93,
                    Name = "Tamil",
                    ISOCode = "tam",
                },
                new Language
                {
                    Id = 94,
                    Name = "Tatar",
                    ISOCode = "tat",
                },
                new Language
                {
                    Id = 95,
                    Name = "Telugu",
                    ISOCode = "tel",
                },
                new Language
                {
                    Id = 96,
                    Name = "Thai",
                    ISOCode = "tha",
                },
                new Language
                {
                    Id = 97,
                    Name = "Turkish",
                    ISOCode = "tur",
                },
                new Language
                {
                    Id = 98,
                    Name = "Turkmen",
                    ISOCode = "tuk",
                },
                new Language
                {
                    Id = 99,
                    Name = "Ukrainian",
                    ISOCode = "ukr",
                },
                new Language
                {
                    Id = 100,
                    Name = "Urdu",
                    ISOCode = "urd",
                },
                new Language
                {
                    Id = 101,
                    Name = "Uyghur",
                    ISOCode = "uig",
                },
                new Language
                {
                    Id = 102,
                    Name = "Uzbek",
                    ISOCode = "uzb",
                },
                new Language
                {
                    Id = 103,
                    Name = "Viet Namese",
                    ISOCode = "vie",
                },
                new Language
                {
                    Id = 104,
                    Name = "Welsh",
                    ISOCode = "cym",
                },
                new Language
                {
                    Id = 105,
                    Name = "Xhosa",
                    ISOCode = "xho",
                },
                new Language
                {
                    Id = 106,
                    Name = "Yiddish",
                    ISOCode = "yid",
                },
                new Language
                {
                    Id = 107,
                    Name = "Yoruba",
                    ISOCode = "yor",
                },
                new Language
                {
                    Id = 108,
                    Name = "Zulu",
                    ISOCode = "zul",
                },
            };
            return languages;
        }
    }
}