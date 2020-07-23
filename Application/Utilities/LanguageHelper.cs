namespace Application.Utilities
{
    public static class LanguageHelper
    {
        public static string GetHelloByLanguage(string isoCode)
        {
            switch (isoCode)
            {
                case "ukr":
                    return "Привіт";
                case "eng":
                    return "Hello";
                case "rus":
                    return "Привет";
                case "pol":
                    return "Dzień dobry";
                case "spa":
                    return "Hola";
                case "nld":
                    return "Hallo";
                case "fra":
                    return "Bonjour";
                case "ita":
                    return "Ciao";
                case "jpn":
                    return "こんにちは";
                case "ces":
                    return "Ahoj";
                case "kor":
                    return "여보세요";
                case "hun":
                    return "Szia";
                case "ron":
                    return "Salut";
                case "tur":
                    return "Merhaba";
                case "bel":
                    return "Добры дзень";
                case "est":
                    return "Tere";
                case "fin":
                    return "Hei";
                case "lav":
                    return "Sveiki";
                case "bul":
                    return "Здравейте";
                case "zho":
                    return "你好";
                case "slk":
                    return "Ahoj";
                case "slv":
                    return "Zdravo";
                case "kat":
                    return "გამარჯობა";
                case "deu":
                    return "Hallo";
                case "ell":
                    return "Χαίρετε";
                case "srp":
                    return "Здраво";

                case "afr":
                    return "Hallo";
                case "sqi":
                    return "Përshëndetje";
                case "amh":
                    return "ሰላም";
                case "hye":
                    return "Բարեւ Ձեզ";
                case "aze":
                    return "Salam";
                case "eus":
                    return "Kaixo";
                case "ben":
                    return "হ্যালো";
                case "bos":
                    return "Zdravo";
                case "cat":
                    return "Hola";
                case "ceb":
                    return "Kumusta";
                case "nya":
                    return "Moni";
                case "cos":
                    return "Bonghjornu";
                case "hrv":
                    return "Zdravo";
                case "dan":
                    return "Hej";
                case "epo":
                    return "Saluton";
                case "fil":
                    return "Kamusta";
                case "frr":
                    return "Hoi";
                case "glg":
                    return "Ola";
                case "guj":
                    return "નમસ્તે";
                case "hat":
                    return "Bonjou";
                case "hau":
                    return "Sannu";
                case "haw":
                    return "Aloha";
                case "hin":
                    return "हैलो";
                case "hmn":
                    return "Nyob zoo";
                case "isl":
                    return "Halló";
                case "ibo":
                    return "Nnọọ";
                case "ind":
                    return "Halo";
                case "gle":
                    return "Dia dhuit";
                case "jav":
                    return "Halo";
                case "kan":
                    return "ಹಲೋ";
                case "kaz":
                    return "Сәлеметсіз бе";
                case "khm":
                    return "សួស្តី";
                case "kin":
                    return "Mwaramutse";
                case "kur":
                    return "Slav";
                case "kir":
                    return "Салам";
                case "lao":
                    return "ສະບາຍດີ";
                case "lat":
                    return "Salve";
                case "lit":
                    return "Sveiki";
                case "ltz":
                    return "Hallo";
                case "mkd":
                    return "Здраво";
                case "mlg":
                    return "Salama";
                case "msa":
                    return "Helo";
                case "mal":
                    return "ഹലോ";
                case "mlt":
                    return "Bongu";
                case "mri":
                    return "Kia ora";
                case "mar":
                    return "नमस्कार";
                case "mon":
                    return "Сайн уу";
                case "mya":
                    return "ဟယ်လို";
                case "nep":
                    return "नमस्कार";
                case "nor":
                    return "Hallo";
                case "ori":
                    return "ନମସ୍କାର";
                case "por":
                    return "Olá";
                case "pan":
                    return "ਸਤ ਸ੍ਰੀ ਅਕਾਲ";
                case "smo":
                    return "Talofa";
                case "gla":
                    return "Halò";
                case "sot":
                    return "Lumela";
                case "sna":
                    return "Mhoro";
                case "sin":
                    return "හෙලෝ";
                case "som":
                    return "Salaan";
                case "sun":
                    return "Halo";
                case "swa":
                    return "Habari";
                case "swe":
                    return "Hallå";
                case "tgk":
                    return "Салом";
                case "tam":
                    return "வணக்கம்";
                case "tat":
                    return "Сәлам";
                case "tel":
                    return "హలో";
                case "tha":
                    return "สวัสดี";
                case "tuk":
                    return "Salam";
                case "uzb":
                    return "Salom";
                case "vie":
                    return "Xin chào";
                case "cym":
                    return "Helo";
                case "xho":
                    return "Mholo";
                case "yor":
                    return "Pẹlẹ o";
                case "zul":
                    return "Sawubona";

                case "yid":
                    return "העלא"; //rtl
                case "urd":
                    return "ہیلو"; //rtl
                case "uig":
                    return "ياخشىمۇسىز"; //rtl
                case "snd":
                    return "هيلو"; //rtl
                case "pus":
                    return "سلام"; //rtl
                case "fas":
                    return "سلام"; //rtl
                case "heb":
                    return "שלום"; //rtl
                case "ara":
                    return "مرحبا"; //rtl

                default:
                    return "Hello";
            }
        }

        public static string GetHelloDefinitionByLanguage(string isoCode)
        {
            switch (isoCode)
            {
                case "ukr":
                    return "Ласкаво просимо до нашої спільноти!";
                case "eng":
                    return "Welcome to our community!";
                case "rus":
                    return "Добро пожаловать в наше сообщество!";
                case "pol":
                    return "Witamy w naszej społeczności!";
                case "spa":
                    return "¡Bienvenido a nuestra comunidad!";
                case "nld":
                    return "Willkommen in unserer Community!";
                case "fra":
                    return "Bienvenue dans notre communauté!";
                case "ita":
                    return "Benvenuto nella nostra comunità!";
                case "jpn":
                    return "私たちのコミュニティへようこそ！";
                case "ces":
                    return "Vítejte v naší komunitě!";
                case "kor":
                    return "우리 커뮤니티에 오신 것을 환영합니다!";
                case "hun":
                    return "Üdvözöljük a közösségünkben!";
                case "ron":
                    return "Bine ați venit în comunitatea noastră!";
                case "tur":
                    return "Topluluğumuza Hoşgeldiniz!";
                case "bel":
                    return "Сардэчна запрашаем у нашу суполку!";
                case "est":
                    return "Tere tulemast meie kogukonda!";
                case "fin":
                    return "Tervetuloa yhteisöömme!";
                case "lav":
                    return "Laipni lūdzam mūsu kopienā!";
                case "bul":
                    return "Добре дошли в нашата общност!";
                case "zho":
                    return "欢迎来到我们的社区！";
                case "slk":
                    return "Vitajte v našej komunite!";
                case "slv":
                    return "Dobrodošli v naši skupnosti!";
                case "kat":
                    return "კეთილი იყოს თქვენი მობრძანება ჩვენს საზოგადოებაში!";
                case "deu":
                    return "Willkommen in unserer Community!";
                case "ell":
                    return "Καλώς ήλθατε στην κοινότητά μας!";
                case "srp":
                    return "Добродошли у нашу заједницу!";

                case "afr":
                    return "Welkom in ons gemeenskap!";
                case "sqi":
                    return "Mirësevini në komunitetin tonë!";
                case "amh":
                    return "ወደ ማህበረሰባችን እንኳን በደህና መጡ!";
                case "hye":
                    return "Բարի գալուստ մեր համայնք:";
                case "aze":
                    return "Cəmiyyətimizə xoş gəldiniz!";
                case "eus":
                    return "Ongi etorri gure komunitatera!";
                case "ben":
                    return "আমাদের সম্প্রদায়ের স্বাগতম!";
                case "bos":
                    return "Dobrodošli u našu zajednicu!";
                case "cat":
                    return "Benvinguts a la nostra comunitat!";
                case "ceb":
                    return "Pag-abot sa among komunidad!";
                case "nya":
                    return "Takulandilani mdera lathu!";
                case "cos":
                    return "Benvenuti à a nostra cumunità!";
                case "hrv":
                    return "Dobrodošli u našu zajednicu!";
                case "dan":
                    return "Velkommen til vores samfund!";
                case "epo":
                    return "Bonvenon al nia komunumo!";
                case "fil":
                    return "Maligayang pagdating sa aming komunidad!";
                case "frr":
                    return "Wolkom yn ús mienskip!";
                case "glg":
                    return "Benvido á nosa comunidade!";
                case "guj":
                    return "અમારા સમુદાયમાં આપનું સ્વાગત છે!";
                case "hat":
                    return "Byenveni nan kominote nou an!";
                case "hau":
                    return "Maraba da zuwa cikin jama'ar mu!";
                case "haw":
                    return "Aloha kākou e ko mākou kaiāulu!";
                case "hin":
                    return "हमारे समुदाय में आपका स्वागत है!";
                case "hmn":
                    return "Zoo siab txais tos rau peb lub zej zog!";
                case "isl":
                    return "Verið velkomin í samfélagið okkar!";
                case "ibo":
                    return "Nabata n’obodo anyi!";
                case "ind":
                    return "Selamat datang di komunitas kami!";
                case "gle":
                    return "Fáilte go dtí ár bpobal!";
                case "jav":
                    return "Sugeng rawuh ing komunitas kita!";
                case "kan":
                    return "ನಮ್ಮ ಸಮುದಾಯಕ್ಕೆ ಸುಸ್ವಾಗತ!";
                case "kaz":
                    return "Біздің қоғамға қош келдіңіз!";
                case "khm":
                    return "សូមស្វាគមន៍ចំពោះសហគមន៍របស់យើង!";
                case "kin":
                    return "Murakaza neza kubaturage bacu!";
                case "kur":
                    return "Hûn bi xêr hatin civata me!";
                case "kir":
                    return "Биздин коомго кош келиңиз!";
                case "lao":
                    return "ຍິນດີຕ້ອນຮັບສູ່ຊຸມຊົນຂອງພວກເຮົາ!";
                case "lat":
                    return "Receperint nostrae civitatis!";
                case "lit":
                    return "Sveiki atvykę į mūsų bendruomenę!";
                case "ltz":
                    return "Wëllkomm an eiser Gemeng!";
                case "mkd":
                    return "Добредојдовте во нашата заедница!";
                case "mlg":
                    return "Tongasoa eto amin'ny fiaraha-monina misy anay!";
                case "msa":
                    return "Selamat datang ke komuniti kami!";
                case "mal":
                    return "ഞങ്ങളുടെ കമ്മ്യൂണിറ്റിയിലേക്ക് സ്വാഗതം!";
                case "mlt":
                    return "Merħba fil-komunità tagħna!";
                case "mri":
                    return "Tena koutou e te hapori!";
                case "mar":
                    return "आमच्या समुदायात आपले स्वागत आहे!";
                case "mon":
                    return "Манай нийгэмлэгт тавтай морилно уу!";
                case "mya":
                    return "ကျွန်တော်တို့ရဲ့အသိုင်းအဝိုင်းမှကြိုဆိုပါ၏";
                case "nep":
                    return "हाम्रो समुदाय मा स्वागत छ!";
                case "nor":
                    return "Velkommen til samfunnet vårt!";
                case "ori":
                    return "ଆମ ସମ୍ପ୍ରଦାୟକୁ ସ୍ Welcome ାଗତ!";
                case "por":
                    return "Bem vindo à nossa comunidade!";
                case "pan":
                    return "ਸਾਡੀ ਕਮਿ communityਨਿਟੀ ਵਿੱਚ ਜੀ ਆਇਆਂ ਨੂੰ!";
                case "smo":
                    return "Afio mai i lo matou nuu!";
                case "gla":
                    return "Fàilte don choimhearsnachd againn!";
                case "sot":
                    return "Rea u amohela sechabeng sa heso!";
                case "sna":
                    return "Kugamuchirwa munharaunda yedu!";
                case "sin":
                    return "අපගේ ප්‍රජාවට සාදරයෙන් පිළිගනිමු!";
                case "som":
                    return "Ku soo dhowow bulshadayada!";
                case "sun":
                    return "Wilujeng sumping pikeun komunitas kami!";
                case "swa":
                    return "Karibu katika jamii yetu!";
                case "swe":
                    return "Välkommen till vårt samhälle!";
                case "tgk":
                    return "Хуш омадед ба ҷомеаи мо!";
                case "tam":
                    return "எங்கள் சமூகத்திற்கு வருக!";
                case "tat":
                    return "Безнең җәмгыятькә рәхим итегез!";
                case "tel":
                    return "మా సంఘానికి స్వాగతం!";
                case "tha":
                    return "ยินดีต้อนรับสู่ชุมชนของเรา!";
                case "tuk":
                    return "Jemgyýetimize hoş geldiňiz!";
                case "uzb":
                    return "Jamiyatimizga xush kelibsiz!";
                case "vie":
                    return "Chào mừng đến với cộng đồng của chúng tôi!";
                case "cym":
                    return "Croeso i'n cymuned!";
                case "xho":
                    return "Wamkelekile kuluntu lwethu!";
                case "yor":
                    return "Kaabọ si agbegbe wa!";
                case "zul":
                    return "Uyemukelwa emphakathini wethu!";

                case "yid":
                    return "ברוכים הבאים צו אונדזער קהל!"; //rtl
                case "urd":
                    return "ہماری کمیونٹی میں خوش آمدید!"; //rtl
                case "uig":
                    return "مەھەللىمىزگە كەلگىنىڭىزنى قارشى ئالىمىز!"; //rtl
                case "snd":
                    return "اسان جي برادري ۾ ڀليڪار!"; //rtl
                case "pus":
                    return "زموږ ټولنې ته ښه راغلاست!"; //rtl
                case "fas":
                    return "به انجمن ما خوش آمدید!"; //rtl
                case "heb":
                    return "ברוך הבא לקהילה שלנו!"; //rtl
                case "ara":
                    return "أهلا بك في مجتمعنا!"; //rtl

                default:
                    return "Welcome to our community!";
            }
        }
    }
}