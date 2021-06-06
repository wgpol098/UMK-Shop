# Dokumentacja API
## /products
### DELETE - Metoda usuwająca produkt z bazy danych.

Wymagane uprawnienia:
- Authorization Token
- User musi mieć rolę administratora

|  Parametr  |  Wymagane  |  Opis  |
|---|---|---|
|  id  | wymagany  |  Id produktu |

Zwracane wartości:
- Metoda nie zwraca żadnych wartości

Kody błędów:
- 201 - Działanie zakończone sukcesem.
- 401 - Brak `authorization` w sekcji Header żądania.
- 403 - Nieprawidłowy, bądż przedawniony token lub brak uprawnień administratora.
- 500 - Błąd wewnętrzny serwera.

---
### PUT - Metoda odpowiedzialna za modyfikowanie danych o produkcie.

Wymagane uprawnienia:
- Authorization Token
- User musi mieć rolę administratora

|  Parametr  |  Wymagane  |  Opis  |
|---|---|---|
|  id  | wymagany  |  Id produktu |
| title | opcjonalny | Tytuł produktu |
| description | opcjonalny | Opis produktu |
| price | opcjonalny | Cena produktu |
| count | opcjonalny | Ilość dostępnych produktów |

Zwracane wartości:
- Metoda nie zwraca żadnych wartości.

Kody błędów:
- 201 - Działanie zakończone sukcesem.
- 401 - Brak `authorization` w sekcji Header żądania.
- 403 - Nieprawidłowy, bądż przedawniony token lub brak uprawnień administratora.
- 500 - Wewnętrzny błąd serwera.

---
### POST - Metoda odpowiedzialna za dodawanie nowego produktu.

Wymagane uprawnienia:
- Authorization Token
- User musi mieć rolę administratora

|  Parametr  |  Wymagane  |  Opis  |
|---|---|---|
| title | wymagany | Tytuł produktu |
| description | wymagany | Opis produktu |
| price | wymagany | Cena produktu |
| count | wymagany | Ilość dostępnych produktów |

Zwracane wartości:
- Metoda nie zwraca żadnych wartości.

Kody błędów:
- 201 - Działanie zakończone sukcesem.
- 401 - Brak `authorization` w sekcji Header żądania.
- 403 - Nieprawidłowy, bądż przedawniony token lub brak uprawnień administratora.
- 500 - Wewnętrzny błąd serwera.

---
### GET - Metoda odpowiedzialna za pobieranie informacji o produktach.

Wymagane uprawnienia:
- Metoda nie wymaga żadnych uprawnień.

|  Parametr  |  Wymagane  |  Opis  |
|---|---|---|
| id | opcjonalny | Id produktu dla którego powinny zostać zwrócone dane |
| filter | opcjonalny | Filtr po którym będą filtrowane dane |
| page | opcjonalny | Odpowiada za zwracanie odpowiedniej strony z produktami. Domyślna wartość: 0 |
| limit | opcjonalny | Ilość produktów zwracanych na daną stronę. Domyślna wartość: 10 |

Zwracane wartości:
- imagePath - adres obraz przedmiotu
- title - tytuł przedmiotu
- description - opis przedmiotu
- price - cena przedmiotu
- count - ilość sztuk na magazynie

Kody błędów:
- 200 - Działanie zakończone sukcesem.
- 500 - Wewnętrzny błąd serwera.

---
## /user
### POST - Metoda odpowiedzialna za dodawanie nowego usera do bazy danych.

Wymagane uprawnienia:
- Metoda nie wymaga żadnych uprawnień

|  Parametr  |  Wymagane  |  Opis  |
|---|---|---|
| email | wymagany | Email nowego usera |
| first_name | wymagany | Imię nowego usera |
| last_name | wymagany | Nazwisko nowego usera |
| birthdane | wymagany | Data urodzenia nowego usera |
| phone_number | wymagany | Numer telefonu nowego usera |
| shipping_address_id | opcjonalny | Domyślny adres dostawy nowego usera |
| invoice_address_id | opcjonalny | Domyślny adres do faktury nowego usera |

Zwracane wartości:
- Metoda nie zwraca żadnych wartości.

Kody błędów:
- 201 - Działanie zakończone sukcesem.
- 500 - Wewnętrzny błąd serwera.

### PUT - Metoda odpowiedzialna za modyfikowanie danych o userze.

Wymagane uprawnienia:
- Authorization Token bądź rola administratora

|  Parametr  |  Wymagane  |  Opis  |
|---|---|---|
| email | opcjonalny | Email nowego usera |
| first_name | opcjonalny | Imię nowego usera |
| last_name | opcjonalny | Nazwisko nowego usera |
| birthdane | opcjonalny | Data urodzenia nowego usera |
| phone_number | opcjonalny | Numer telefonu nowego usera |
| shipping_address_id | opcjonalny | Domyślny adres dostawy nowego usera |
| invoice_address_id | opcjonalny | Domyślny adres do faktury nowego usera |

Zwracane wartości:
- Metoda nie zwraca żadnych wartości.

Kody błędów:
- 201 - Działanie zakończone sukcesem.
- 500 - Wewnętrzny błąd serwera.

### GET - Metoda odpowiedzialna za pobieranie danych o userze.

Wymagane uprawnienia:
- Authorization Token, bądź rola administratora

|  Parametr  |  Wymagane  |  Opis  |
|---|---|---|
| all | opcjonalny (tylko dla administratora) | Przyjmuje wartości T/F. T - true jeśli ma zwrócić tablicę wszystkich użytkowników |

Zwracane wartości:
email - email użytkownika
first_name - imię użytkownika
last_name - nazwisko użytkownika
birthdate - data urodzenia użytkownika
phone_number - numer telefonu użytkownika
shipping_address_id - domyślny adres dostawy użytkownika
invoice_address_id - domyślny adres do faktury użytkownika

Kody błędów:
- 200 - Działanie zakończone sukcesem.
- 401 - Brak `authorization` w sekcji Header żądania.
- 403 - Nieprawidłowy, bądż przedawniony token lub brak uprawnień administratora.
- 500 - Wewnętrzny błąd serwera.

## /cart - Dane o koszyku nie są przechowywane w bazie danych. Koszyk jest stworzony na sesję. Wymagane jest przekazywanie ciasteczek na serwer w celu identyfikacji danej sesji i danego koszyka.

### POST/addtocart - Metoda odpowiedzialna za dodawanie produktów do koszyka.

Wymagane uprawnienia:
- Metoda nie wymaga żadnych uprawnień.

|  Parametr  |  Wymagane  |  Opis  |
|---|---|---|
| id | wymagany | Id produktu dodawanego do koszyka |

Zwracane wartości:
- Metoda nie zwraca żadnych wartości.

Kody błędów:
- 201 - Działanie zakończone sukcesem.
- 500 - Wewnętrzny błąd serwera.

### GET - Metoda odpowiedzialna za pobieranie koszyka dla danej sesji.

Wymagane uprawnienia:
- Metoda nie wymaga żadnych uprawnień

## Trzeba wywołać i przetestować
Zwracane wartości:
- 

Kody błędów:
- 200 - Działanie zakończone sukcesem.
- 500 - Wewnętrzny błąd serwera.

### POST/removefromcart - Metoda odpowiedzialna za usuwanie danego przedmiotu z koszyka.

Wymagane uprawnienia:
- Metoda nie wymaga żadnych uprawnień

|  Parametr  |  Wymagane  |  Opis  |
|---|---|---|
| id | wymagany | Id produktu usuwanego z koszyka |

Zwracane wartości:
- Metoda nie zwraca żadnych wartości.

Kody błędów:
- 201 - Działanie zakończone sukcesem.
- 500 - Wewnętrzny błąd serwera.

### POST/removeonefromcart - Metoda odpowiedzialna za usuwanie jednej sztuki przedmiotu z koszyka.

Wymagane uprawnienia:
- Metoda nie wymaga żadnych uprawnień

|  Parametr  |  Wymagane  |  Opis  |
|---|---|---|
| id | wymagany | Id produktu usuwanego z koszyka |

Zwracane wartości:
- Metoda nie zwraca żadnych wartości.

Kody błędów:
- 201 - Działanie zakończone sukcesem.
- 500 - Wewnętrzny błąd serwera.

--ZROBIONE

## /order
### GET - Metoda odpowiedzialna za pobieranie informacji o zamówieniach.

Wymagane uprawnienia:
- Authorization Token bądź uprawnienia administratora

|  Parametr  |  Wymagane  |  Opis  |
|---|---|---|
| id | opcjonalny | Id zamówienia. Jeśli argument nie zostanie podany to zostanie zwrócona lista wszystkich zamówień |

|  Parametr  |  Wymagane  |  Opis  |
|---|---|---|
| userID | wymagany | Id usera z bazy danych dla którego zostanie dodane zamówienie |
| status | wymagany | Id statusu zamówienia |

- PUT
### POST - metoda odpowiedzialna za dodawanie zamówienia do bazy danych.

Wymagane uprawnienia:
- Authorization Token

|  Parametr  |  Wymagane  |  Opis  |
|---|---|---|
| status | wymagany | Status zamówienia |

Zwracane wartości:
- Metoda nie zwraca żadnych wartości.

Kody błędów:
- 201 - Działanie zakończone sukcesem.
- 401 - Brak `authorization` w sekcji Header żądania.
- 403 - Nieprawidłowy, bądż przedawniony token lub brak uprawnień administratora.
- 500 - Wewnętrzny błąd serwera.

## /address

#### PUT - Metoda odpowiedzialna za update adresów.

Wymagane uprawnienia:
- Metoda nie wymaga żadnych uprawnień

|  Parametr  |  Wymagane  |  Opis  |
|---|---|---|
| id | wymagany | Id edytowanego adresu |

Zwracane wartości:
- Metoda nie zwraca żadnych wartości

Kody błędów:
- 201 - Działanie zakończone sukcesem.
- 500 - Wewnętrzny błąd serwera.

---
#### DELETE - Metoda odpowiedzialna za usuwanie adresu z bazy danych.

Wymagane uprawnienia:
- Authorization Token
- User musi mieć rolę administratora

|  Parametr  |  Wymagane  |  Opis  |
|---|---|---|
| id | wymagany | Id usuwanego adresu |

Zwracane wartości:
- Metoda nie zwraca żadnych wartości

Kody błędów:
- 201 - Działanie zakończone sukcesem.
- 401 - Brak `authorization` w sekcji Header żądania.
- 403 - Nieprawidłowy, bądż przedawniony token lub brak uprawnień administratora.
- 500 - Wewnętrzny błąd serwera.

---
### POST - Metoda odpowiedzialna za dodawanie adresu do bazy danych. 

Wymagane uprawnienia:
- Metoda nie wymaga żadnych uprawnień.

|  Parametr  |  Wymagane  |  Opis  |
|---|---|---|
| city | wymagany | Miasto |
| zip | wymagany | Kod podcztowy miasta |
| street | wymagany | Ulica i numer domu/mieszkania |
| country | wymagany | Kraj |

Zwracane wartości:
- Metoda nie zwraca żadnych wartości

Kody błędów:
- 201 - Działanie zakończone sukcesem.
- 500 - Wewnętrzny błąd serwera.

### GET - Metoda odpowiedzialna za pobieranie adresów.

Wymagane uprawnienia:
- Metoda nie wymaga żadnych uprawnień.

|  Parametr  |  Wymagane  |  Opis  |
|---|---|---|
| id | opcjonalny | Id adresu - gdy argument nie zostanie podany to zostaną zwrócone wszystkie adresy z bazy danych|

Zwracane wartości:
- city - Miasto
- street - Ulica i numer domu/mieszkania
- zip - Kod pocztowy miasta
- country - Kraj

Kody błędów:
- 200 - Działanie zakończone sukcesem
- 500 - Wewnętrzny błąd serwera

## /payment
### GET - Metoda zwracająca dane o dostępnych płatnościach.

Wymagane uprawnienia:
- Metoda nie wymaga żadnych uprawnień.

Zwracane wartości:
- description - Opis sposobu płatności

Kody błędów:
- 200 - Działanie zakończone sukcesem
- 500 - Wewnętrzny błąd serwera

---
### POST - Metoda dodająca nowe płatności do bazy danych.

Wymagane uprawnienia:
- Authorization Token
- User musi mieć rolę administratora

|  Parametr  |  Wymagane  |  Opis  |
|---|---|---|
| description | wymagany | Opis sposobu płatności |

Zwracane wartości:
- Metoda nie zwraca żadnych wartości

Kody błędów:
- 201 - Działanie zakończone sukcesem
- 401 - Brak `authorization` w sekcji Header żądania.
- 403 - Nieprawidłowy, bądż przedawniony token lub brak uprawnień administratora.
- 500 - Wewnętrzny błąd serwera

---
### PUT - Metoda odpowiedzialna za aktualizację danych o metodzie płatności.

Wymagane uprawnienia:
- Authorization Token
- User musi mieć rolę administratora

|  Parametr  |  Wymagane  |  Opis  |
|---|---|---|
| id | wymagany | Id sposobu płatności |
| description | wymagany | Opis sposobu płatności |

Zwracane wartości:
- Metoda nie zwraca żadnych wartości

Kody błędów:
- 201 - Działanie zakończone sukcesem
- 401 - Brak `authorization` w sekcji Header żądania.
- 403 - Nieprawidłowy, bądż przedawniony token lub brak uprawnień administratora.
- 500 - Wewnętrzny błąd serwera

---
### DELETE - Metoda służąca do usuwania metody płatności.

Wymagane uprawnienia:
- Authorization Token
- User musi mieć rolę administratora

|  Parametr  |  Wymagane  |  Opis  |
|---|---|---|
| id | wymagany | Id sposobu płatności |

Zwracane wartości:
- Metoda nie zwraca żadnych wartości

Kody błędów:
- 201 - Działanie zakończone sukcesem
- 401 - Brak `authorization` w sekcji Header żądania.
- 403 - Nieprawidłowy, bądż przedawniony token lub brak uprawnień administratora.
- 500 - Wewnętrzny błąd serwera

## /delivery
### GET - Metoda odpowiedzialna za pobieranie wszystkich możliwych opcji dostaw w sklepie.

Wymagane uprawnienia:
- Metoda nie wymaga żadnych uprawnień

Zwracane wartości:
- nazwa - nazwa sposobu dostawy
- description - opis sposobu dostawy
- price - cena dostawy

Kody błędów:
- 200 - Działanie zakończone sukcesem
- 500 - Wewnętrzny błąd serwera

### POST - Metoda odpowiedzialna za dodawanie nowych opcji dostaw.

## A POWINNA
Wymagane uprawnienia:
- Metoda nie wymaga żadnych uprawnień

|  Parametr  |  Wymagane  |  Opis  |
|---|---|---|
| name | wymagany | Nazwa dostawy |
| description | wymagany | Opis sposobu dostawy |
| price | wymagany | Cena dostawy |

Zwracane wartości:
- Metoda nie zwraca żadnych wartości

Kody błędów:
- 201 - Działanie zakończone sukcesem
- 500 - Wewnętrzny błąd serwera
