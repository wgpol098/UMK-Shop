# Sklep internetowy UMK
### Definicja problemu
Obecnie produkty Uniwersytetu Mikołaja Kopernika (dalej UMK) dostępne są jedynie w sklepie stacjonarnym przy rektoracie.<br />
W dobie pandemii COVID-19 dostęp do nich był bardzo ograniczony, a przez pewien czas - niemożliwy, szczególnie dla osób mieszkających poza obrębem Torunia.<br />
Mimo sytuacji pandemicznej obecnej w kraju, zainteresowanie wspomnianymi wyżej produktami nie zmalało.<br /> Pojawiło się więc zapotrzebowanie na uruchomienie innego kanału sprzedaży.

---

### Cel projektu
Głównym celem  jest rozwiązanie problemu dostępności produktów sygnowanych logiem UMK.<br />
Takim rozwiązaniem jest sklep internetowy, dostępny dla wszystkich. Aby stworzyć wyżej wspomniany sklep  internetowy,<br />
potrzebne jest zaprojektowanie odpowiedniego serwisu API oraz utworzenie frontend'u strony internetowej na bazie `node.js` .

#### API
Celem API jest obsługa i zarządzanie użytkownikami, produktami, adresami, zamówieniami, koszykiem, oraz<br /> metodami płatności i dostaw. Ono ma w łatwy, a również biezpieczny sposób pośredniczyć między bazą danych `mongodb` a frontend'em strony internetowej.

#### Frontend
Celem frontend'u jest udostępnianie użytkownikowi funkcjonalności strony internetowej, w tym:
- przęgląd dostępnych produktów;
- składanie zamówienia;
- infromacja kontaktowa.

W przypadku admina (ewentualnie - menedżera sprzedaż sklepu) dostęp do:
- dodawania/edycji produktów;
- zarządzania kontami użytkowników;
- obsługa zamówień.

---

### Autoryzacja
Metody API dostępne są różnym poziomie. Do zasobów prywatnych jest wymagana
autoryzacja. Model autoryzacji jest oparty na [JSON Web
Token](https://en.wikipedia.org/wiki/JSON_Web_Token), [RFC5719](https://tools.ietf.org/html/rfc7519)<br />
W backend'zie projektu ten model został utworzony za pomocą pakietu [`jsonwebtoken`](https://yarnpkg.com/package/jsonwebtoken).

---

### Testowanie
Każda metoda API została przetestowana pod kątem zależnym od zastosowania.
- ...

---

### Instrukcja uruchomienia

#### Projekt został podzielony na 2 części: backend (API) - folder `/api`, oraz frontend - folder `/front`.<br /> Więc de facto skłąda się z dwoch podrzędnych projektów, którzy mają swoje pakiety i narzędzia:
- backend - 'czysty' `node.js`; 
- frontend - [`next.js`](https://nextjs.org/).

#### Do tego również została użyta baza danych [`mongodb`](https://www.mongodb.com/). Przed uruchomianiem powyższych projektów musimy skonfigurować<br /> bazę danych:
- zainstalować mongodb - [link](https://docs.mongodb.com/manual/tutorial/install-mongodb-on-windows/);
- wpisać do zmiennej środowiskowej (`.env`) link do uruchomionej bazy danych `DB_LINK`<br />
(przykład: `DB_LINK=mongodb://localhost:27017/umkshop`).

#### Najpierw musimy uruchomić backend:
- wejść do folderu `/api`;
- uzupełnić zmienną środowiskową (`.env`) zmiennymi `ACCESS_TOKEN_SECRET`, `REFRESH_TOKEN_SECRET`, `ADMIN_ROLE`, `FRONT_ENTRYPOINT`, `IMAGES_PATH` <br />
przykładowy plik `.env` dla backendu: 
```
ACCESS_TOKEN_SECRET=2094cd170c06aee264d4df09c1199a1c7fcb92c171db145b7fc4cba0cfe27f28549ce1664a06188dfddb1c207273eb94492658da0dc909a982ba96d9b93d4ac8 
REFRESH_TOKEN_SECRET=464a6c87a3317036256c9de2837733c246d04a90e94162e48599a21783e9c3ef14cb331387b504208f49eed5c49f92ae4a08191a04e8a3b9eedff8f2bca4cd8c
ADMIN_ROLE=admin
FRONT_ENTRYPOINT=http://localhost:3015
IMAGES_PATH=../front/public/img/
DB_LINK=mongodb://localhost:27017/umkshop
```
- wykonać polecenie `yarn install` żeby zainstalować wymagane pakiety;
- uruchomić: `yarn start`, API zostanie uruchomione na `localhost:3010`.

#### Po tym możemy uruchomić frontend:
- wejść do folderu `/front`;
- uzupełnić zmienną środowiskową (`.env`) zmiennymi `NEXT_PUBLIC_API_ENTRYPOINT` oraz `NEXT_PUBLIC_ADMIN_ROLE` przykładowy plik `.env` dla frontendu: 
```
NEXT_PUBLIC_API_ENTRYPOINT=http://localhost:3010
NEXT_PUBLIC_ADMIN_ROLE=admin
```
- wykonać polecenie `yarn install` żeby zainstalować wymagane pakiety;
- skompilować wersję producyjną: `yarn build`;
- uruchomić: `yarn start`, front zostanie uruchomiony na `localhost:3015`;
- ewentualnie: `yarn dev` - nie potrzebuje poprzedniej kompilacji, i zwykle jest używane do debugging'u i rozwoju.

---

### Użyte pakiety

#### API
    "bcrypt-nodejs": "^0.0.3",
    "chai": "^4.3.4",
    "chai-http": "^4.3.0",
    "cookie-parser": "^1.4.5",
    "cors": "^2.8.5",
    "dotenv": "^10.0.0",
    "express": "^4.17.1",
    "express-fileupload": "^1.2.1",
    "express-session": "^1.17.2",
    "jsonwebtoken": "^8.5.1",
    "mocha": "^9.0.0",
    "mongoose": "^5.12.13",
    "morgan": "^1.10.0"

#### Frontend
    "bootstrap": "4.6.0",
    "cookie": "^0.4.1",
    "cookies": "^0.8.0",
    "jwt-decode": "^3.1.2",
    "next": "^10.0.0",
    "rc-pagination": "^3.1.6",
    "react": "17.0.1",
    "react-bootstrap": "^1.6.0",
    "react-bootstrap-icons": "^1.5.0",
    "react-cookie": "^4.0.3",
    "react-dom": "17.0.1"

---

### Dokumentacja API
[Link do dokumentacji metod API](https://github.com/BKotja/MP-2021-NODEJS-API/blob/master/api/README.md)


