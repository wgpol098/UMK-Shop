# Dokumentacja API
### /products
#### - DELETE - Metoda usuwająca produkt z bazy danych.

|  Parametr  |  Wymagane  |  Opis  |
|---|---|---|
|  id  | wymagany  |  Id produktu |

Zwracane wartości:
- Metoda nie zwraca żadnych wartości

Kody błędów:
- 200 - Działanie zakończone sukcesem.
- 500 - Błąd wewnętrzny serwera
#### - PUT - Metoda odpowiedzialna za modyfikowanie danych o produkcie.

|  Parametr  |  Wymagane  |  Opis  |
|---|---|---|
|  id  | wymagany  |  Id produktu |
| title | opcjonalny | Tytuł produktu |
| description | opcjonalny | Opis produktu |
| price | opcjonalny | Cena produktu |
| count | opcjonalny | Ilość dostępnych produktów |
- POST - Metoda odpowiedzialna za dodawanie nowego produktu.

|  Parametr  |  Wymagane  |  Opis  |
|---|---|---|
| title | wymagany | Tytuł produktu |
| description | wymagany | Opis produktu |
| price | wymagany | Cena produktu |
| count | wymagany | Ilość dostępnych produktów |
- GET - Metoda odpowiedzialna za pobieranie informacji o produktach.

|  Parametr  |  Wymagane  |  Opis  |
|---|---|---|
| filter | opcjonalny | Filtr po którym będą filtrowane dane |
| page | opcjonalny | Odpowiada za zwracanie odpowiedniej strony z produktami. Domyślna wartość: 0 |
| limit | opcjonalny | Ilość produktów zwracanych na daną stronę. Domyślna wartość: 10 |
### /user
- POST
- GET
### /cart - Dane o koszyku nie są przechowywane w bazie danych. Koszyk jest stworzony na sesję. Wymagane jest przekazywanie ciasteczek na serwer w celu identyfikacji danej sesji i danego koszyka.
- POST
- GET - Metoda odpowiedzialna za pobieranie koszyka dla danej sesji.
### /order
- GET - Metoda odpowiedzialna za pobieranie informacji o zamówieniach.

|  Parametr  |  Wymagane  |  Opis  |
|---|---|---|
| id | opcjonalny | Id zamówienia. Jeśli argument nie zostanie podany to zostanie zwrócona lista wszystkich zamówień |
| userID | opcjonalny | Id usera. Jeśli argument zostanie użyty to zostaną zwrócone zamówienia danego użytkownika |
- PUT
- POST - metoda odpowiedzialna za dodawanie zamówienia do bazy danych.

|  Parametr  |  Wymagane  |  Opis  |
|---|---|---|
| userID | wymagany | Id usera z bazy danych dla którego zostanie dodane zamówienie |
| status | wymagany | Id statusu zamówienia |
### /address
- POST - Metoda odpowiedzialna za dodawanie adresu do bazy danych. 

|  Parametr  |  Wymagane  |  Opis  |
|---|---|---|
| city | wymagany | Miasto |
| zip | wymagany | Kod podcztowy miasta |
| street | wymagany | Ulica i numr domu/mieszkania |
| country | wymagany | Kraj |
- GET - Metoda odpowiedzialna za pobieranie adresów.

|  Parametr  |  Wymagane  |  Opis  |
|---|---|---|
| id | opcjonalny | Id adresu - gdy argument nie zostanie podany to zostaną zwrócone wszystkie adresy z bazy danych|
### /payment
- GET - Metoda zwracająca dane o dostępnych płatnościach.
- POST - Metoda dodająca nowe płatności do bazy danych.

|  Parametr  |  Wymagane  |  Opis  |
|---|---|---|
| description | wymagany | Opis sposobu płatności |
### /delivery
- GET - Metoda odpowiedzialna za pobieranie wszystkich możliwych opcji dostaw w sklepie.
- POST - Metoda odpowiedzialna za dodawanie nowych opcji dostaw.

|  Parametr  |  Wymagane  |  Opis  |
|---|---|---|
| name | wymagany | Nazwa dostawy |
| description | wymagany | Opis sposobu dostawy |
| price | wymagany | Cena dostawy |
