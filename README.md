# REST API
### Cel projektu
Zbudowanie REST API na potrzeby społeczności akademickiej UMK. Metody API mają
być tak dobrane, aby umożliwiały dostęp do danych publicznych oraz
prywatnych. API składa się z implementacji serwera wraz z bazą danych
[MongoDB](https://mongodb.github.io/node-mongodb-native/) i [testów
jednostkowych](https://en.wikipedia.org/wiki/List_of_unit_testing_frameworks#JavaScript)
np. Mocha, Jasmine, Jest itp. Do tych testów należy dołączyć testy żądań HTTP
np. za pomocą pakietu _supertest_.

REST API ma być oparte o protokół HTTP, czyli podczas projektowania API kierujemy się
następującymi zasadami: 
1. Metody API są oparte o podstawowe [żądania
HTTP](https://en.wikipedia.org/wiki/Hypertext_Transfer_Protocol#Request_methods):
GET, PUT/PATCH, POST i DELETE. 
2. Żądania HTTP to czasowniki i określają czynności, jakie wykonujemy na zasobach 
3. Adresy URL naszych zasobów składają się z rzeczowników w l.m., które stanowią klasę
pewnych obiektów. W każdej takiej klasie możemy zdefiniować adres URL, do tych
obiektów poprzez identyfikator id. Dzięki temu można łatwo zorientować się, do
czego służą te metody. API ma być przyjazne użytkownikowi. 
	- GET /resources 
    - GET /users
	- GET /resources/:id
    - GET /users/:id


4. Do określenia stanu działania metody API wykorzystujemy [kody
odpowiedzi HTTP](https://en.wikipedia.org/wiki/List_of_HTTP_status_codes).  

5. W [nagłówkach HTTP](https://en.wikipedia.org/wiki/List_of_HTTP_header_fields)
   przesyłamy informacje o autoryzacji, typie zawartości (JSON) itp. Korzystamy
   ze [standardowych nagłówków](https://www.iana.org/assignments/message-headers/message-headers.xml)


6. Filtracja i sortowanie do wybranych metod za pomocą parametrów w URL - [query
   string
   params](https://nodejs.org/en/knowledge/HTTP/clients/how-to-access-query-string-parameters/)

7. Pozostałe zalecenia znajdziecie tutaj: https://www.restapitutorial.com/lessons/restquicktips.html


### Autoryzacja
Metody API mają być na różnym poziomie dostępu. Do zasobów prywatnych jest wymagana
autoryzacja. Model autoryzacji jest oparty na [JSON Web
Token](https://en.wikipedia.org/wiki/JSON_Web_Token), [RFC5719](https://tools.ietf.org/html/rfc7519)


### Testowanie
Każda metoda API ma być przetestowana pod kątem zależnym od zastosowania.

### Dokumentacja
Wraz z implementacją API dostarczacie dokumentacje np. podobną do tej: [developer.twitter](https://developer.twitter.com/en/docs/accounts-and-users/create-manage-lists/api-reference)


### Szablon
Pliki z kodem, które mają pomóc zacząć budowanie aplikacji, są dostępne w
repozytorium.

### Rezultat projektu i ocenianie
API ma być gotowym produktem. To znaczy, że zaspokaja jakąś konkretną potrzebę
społeczności akademickiej UMK, jest niezawodne oraz przyjazne w obsłudze. To
jest projekt na ocenę, na którą składa się:
1. Definicja problemu: trafne zdefiniowanie użytkownika końcowego i jego potrzeb.
2. Rozwiązanie problemu: trafne rozwiązanie techniczne (pomysł na API, REST-owy styl
   wykonania i niezawodność).
3. Oryginalne rozwiązanie techniczne, w tym napisanie aplikacji w czystym
   Node.js. Im mniej zewnętrznych bibliotek tym lepiej. 
4. Systematyczność w pracy i terminowość. 


