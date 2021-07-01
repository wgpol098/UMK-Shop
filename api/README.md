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

---
## /user
### POST - Metoda odpowiedzialna za dodawanie nowego usera do bazy danych.

Wymagane uprawnienia:
- Metoda nie wymaga żadnych uprawnień, za wyjątkiem ustawienia roli użytkonika - jest potrzebne uprawienie administartora.

|  Parametr  |  Wymagane  |  Opis  |
|---|---|---|
| email | wymagany | Email nowego usera |
| first_name | wymagany | Imię nowego usera |
| last_name | wymagany | Nazwisko nowego usera |
| birthdane | wymagany | Data urodzenia nowego usera |
| phone_number | wymagany | Numer telefonu nowego usera |
| shipping_address_id | opcjonalny | Domyślny adres dostawy nowego usera |
| invoice_address_id | opcjonalny | Domyślny adres do faktury nowego usera |
| role | opcjonalny (tylko dla administratora) | Rola użytkownika, domyślnie "user", dla ustawienia tego parametra potrzebne są uprawienia administartora |

Zwracane wartości:
- Metoda nie zwraca żadnych wartości.

### PUT /edit - Metoda odpowiedzialna za modyfikowanie danych o userze.

Wymagane uprawnienia:
- Authorization Token bądź rola administratora

|  Parametr  |  Wymagane  |  Opis  |
|---|---|---|
| edit | opcjonalny (tylko dla administratora) | Domyślnie metoda pozwala na edycję zalogowanego użytkownika, parameter `?edit=T` pozwala administatorowi na edycję innych użytkoników |
| email | opcjonalny | Email nowego usera |
| first_name | opcjonalny | Imię nowego usera |
| last_name | opcjonalny | Nazwisko nowego usera |
| birthdane | opcjonalny | Data urodzenia nowego usera |
| phone_number | opcjonalny | Numer telefonu nowego usera |
| shipping_address_id | opcjonalny | Domyślny adres dostawy nowego usera |
| invoice_address_id | opcjonalny | Domyślny adres do faktury nowego usera |
| role | opcjonalny (tylko dla administratora) | Rola użytkownika, dla ustawienia tego parametra potrzebne są uprawienia administartora |

Zwracane wartości:
- Metoda nie zwraca żadnych wartości.

### GET - Metoda odpowiedzialna za pobieranie danych o userze.

Wymagane uprawnienia:
- Authorization Token, bądź rola administratora

|  Parametr  |  Wymagane  |  Opis  |
|---|---|---|
| all | opcjonalny (tylko dla administratora) | Przyjmuje wartości T/F. T - true jeśli ma zwrócić tablicę wszystkich użytkowników |
| id | opcjonalny (tylko dla administratora) | Id użytkownika dla którego powinny zostać zwrócone dane |

Zwracane wartości:
- email - email użytkownika
- first_name - imię użytkownika
- last_name - nazwisko użytkownika
- birthdate - data urodzenia użytkownika
- phone_number - numer telefonu użytkownika
- shipping_address_id - domyślny adres dostawy użytkownika
- invoice_address_id - domyślny adres do faktury użytkownika

### POST /login - Metoda odpowiedzialna za logowanie usera.

Wymagane uprawnienia:
- Brak wymagań

|  Parametr  |  Wymagane  |  Opis  |
|---|---|---|
| email | wymagany | Email użytkownika |
| password | wymagany | Hasło użytkownika |

Zwracane wartości:
accessToken - JWT token użytkownika (120 minut)

### DELETE - Metoda usuwająca usera z bazy danych.

Wymagane uprawnienia:
- Authorization Token
- User musi mieć rolę administratora

|  Parametr  |  Wymagane  |  Opis  |
|---|---|---|
|  id  | wymagany  |  Id usera |

Zwracane wartości:
- Metoda nie zwraca żadnych wartości

## /cart
### Dane o koszyku nie są przechowywane w bazie danych. Koszyk jest stworzony na sesję. <br/>Wymagane jest przekazywanie ciasteczek na serwer w celu identyfikacji danej sesji i danego koszyka.

### POST /addtocart - Metoda odpowiedzialna za dodawanie produktów do koszyka.

Wymagane uprawnienia:
- Metoda nie wymaga żadnych uprawnień.

|  Parametr  |  Wymagane  |  Opis  |
|---|---|---|
| id | wymagany | Id produktu dodawanego do koszyka |

Zwracane wartości:
- Metoda nie zwraca żadnych wartości.

### GET - Metoda odpowiedzialna za pobieranie koszyka dla danej sesji.

Wymagane uprawnienia:
- Metoda nie wymaga żadnych uprawnień

### POST /removefromcart - Metoda odpowiedzialna za usuwanie danego przedmiotu z koszyka.

Wymagane uprawnienia:
- Metoda nie wymaga żadnych uprawnień

|  Parametr  |  Wymagane  |  Opis  |
|---|---|---|
| id | wymagany | Id produktu usuwanego z koszyka |

Zwracane wartości:
- Metoda nie zwraca żadnych wartości.

### POST /removeonefromcart - Metoda odpowiedzialna za usuwanie jednej sztuki przedmiotu z koszyka.

Wymagane uprawnienia:
- Metoda nie wymaga żadnych uprawnień

|  Parametr  |  Wymagane  |  Opis  |
|---|---|---|
| id | wymagany | Id produktu usuwanego z koszyka |

Zwracane wartości:
- Metoda nie zwraca żadnych wartości.

### POST /removeallfromcart - Metoda odpowiedzialna za wszytskich przedmiotów z koszyka.

Wymagane uprawnienia:
- Metoda nie wymaga żadnych uprawnień

Zwracane wartości:
- Metoda nie zwraca żadnych wartości.

## /order
### GET - Metoda odpowiedzialna za pobieranie informacji o zamówieniach.

Wymagane uprawnienia:
- Authorization Token bądź uprawnienia administratora

|  Parametr  |  Wymagane  |  Opis  |
|---|---|---|
| id | wymagany | Id zamówienia |

|  Parametr  |  Wymagane  |  Opis  |
|---|---|---|
| all | opcjonalny (tylko dla administratora) | Przyjmuje wartości T/F. T - true jeśli ma zwrócić tablicę wszystkich zamówień, F lub brak - zwraca zamówienia tylko dla zalogowanego użytkownika |

Zwracane wartości:
- date - data składania zamówienia
- user - id użytkownika
- cart - obiekt z zawartością koszyka
- address - id adresu
- paymentId - id metody płatności
- status - status zamówienia
- deliveryID - id metody dostawy

### POST - metoda odpowiedzialna za dodawanie zamówienia do bazy danych.

Wymagane uprawnienia:
- Authorization Token

|  Parametr  |  Wymagane  |  Opis  |
|---|---|---|
| userID | wymagany | Id użytkownika |
| status | wymagany | Status zamówienia |
| payment_id | wymagany | Id metody płatności |
| delivery_id | wymagany | Id metody dostawy |
| zip | wymagany | Kod pocztowy dla dostawy |
| country | wymagany | Państwo dla dostawy |
| street | wymagany | Ulica dla dostawy |
| city | wymagany | Miasto dla dostawy |

Zwracane wartości:
- Metoda nie zwraca żadnych wartości.

### PUT - metoda odpowiedzialna za edycję zamówienia w bazie danych.

Wymagane uprawnienia:
- Authorization Token

|  Parametr  |  Wymagane  |  Opis  |
|---|---|---|
| id | wymagany | Id użytkownika |
| status | opcjonalny | Status zamówienia |
| payment_id | opcjonalny | Id metody płatności |
| delivery_id | opcjonalny | Id metody dostawy |
| zip | opcjonalny | Kod pocztowy dla dostawy |
| country | opcjonalny | Państwo dla dostawy |
| street | opcjonalny | Ulica dla dostawy |
| city | opcjonalny | Miasto dla dostawy |

Zwracane wartości:
- Metoda nie zwraca żadnych wartości.

### DELETE - Metoda odpowiedzialna za usuwanie zamówienia z bazy danych.

Wymagane uprawnienia:
- Authorization Token
- User musi mieć rolę administratora

|  Parametr  |  Wymagane  |  Opis  |
|---|---|---|
| id | wymagany | Id usuwanego zamówienia |

Zwracane wartości:
- Metoda nie zwraca żadnych wartości

## /address

### PUT - Metoda odpowiedzialna za update adresów.

Wymagane uprawnienia:
- Metoda nie wymaga żadnych uprawnień

|  Parametr  |  Wymagane  |  Opis  |
|---|---|---|
| id | wymagany | Id edytowanego adresu |
| city | opcjonalny | Miasto |
| zip | opcjonalny | Kod podcztowy miasta |
| street | opcjonalny | Ulica i numer domu/mieszkania |
| country | opcjonalny | Kraj |

Zwracane wartości:
- city - Miasto
- street - Ulica i numer domu/mieszkania
- zip - Kod pocztowy miasta
- country - Kraj

---
### DELETE - Metoda odpowiedzialna za usuwanie adresu z bazy danych.

Wymagane uprawnienia:
- Authorization Token
- User musi mieć rolę administratora

|  Parametr  |  Wymagane  |  Opis  |
|---|---|---|
| id | wymagany | Id usuwanego adresu |

Zwracane wartości:
- Metoda nie zwraca żadnych wartości

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
- city - Miasto
- street - Ulica i numer domu/mieszkania
- zip - Kod pocztowy miasta
- country - Kraj

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

## /payment
### GET - Metoda zwracająca dane o dostępnych płatnościach.

Wymagane uprawnienia:
- Metoda nie wymaga żadnych uprawnień.

Zwracane wartości:
- description - Opis sposobu płatności

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

---
### PUT - Metoda odpowiedzialna za aktualizację danych o metodzie płatności.

Wymagane uprawnienia:
- Authorization Token
- User musi mieć rolę administratora

|  Parametr  |  Wymagane  |  Opis  |
|---|---|---|
| id | wymagany | Id sposobu płatności |
| description | opcjonalny | Opis sposobu płatności |

Zwracane wartości:
- Metoda nie zwraca żadnych wartości

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

## /delivery

### GET - Metoda odpowiedzialna za pobieranie wszystkich możliwych opcji dostaw w sklepie.

Wymagane uprawnienia:
- Metoda nie wymaga żadnych uprawnień

Zwracane wartości:
- nazwa - nazwa sposobu dostawy
- description - opis sposobu dostawy
- price - cena dostawy

### POST - Metoda odpowiedzialna za dodawanie nowych opcji dostaw.

Wymagane uprawnienia:
- Authorization Token
- User musi mieć rolę administratora

|  Parametr  |  Wymagane  |  Opis  |
|---|---|---|
| name | wymagany | Nazwa dostawy |
| description | wymagany | Opis sposobu dostawy |
| price | wymagany | Cena dostawy |

Zwracane wartości:
- Metoda nie zwraca żadnych wartości

### PUT - Metoda odpowiedzialna za edycję opcji dostaw.

Wymagane uprawnienia:
- Authorization Token
- User musi mieć rolę administratora

|  Parametr  |  Wymagane  |  Opis  |
|---|---|---|
| id | wymagany | Id opcji dostawy |
| name | opcjonalny | Nazwa dostawy |
| description | opcjonalny | Opis sposobu dostawy |
| price | opcjonalny | Cena dostawy |

Zwracane wartości:
- Metoda nie zwraca żadnych wartości

### DELETE - Metoda odpowiedzialna za usuwanie opcji dostaw.

Wymagane uprawnienia:
- Authorization Token
- User musi mieć rolę administratora

|  Parametr  |  Wymagane  |  Opis  |
|---|---|---|
| id | wymagany | Id opcji dostawy |

Zwracane wartości:
- Metoda nie zwraca żadnych wartości

## /image

### POST - Metoda odpowiedzialna za zdjęcia (pliku zdjęcia) do repozytorium.
#### Wymaga definicji zmiennej środowiskowej `IMAGES_PATH`, która określa ścieżkę do repozytorium plików.

Wymagane uprawnienia:
- Metoda nie wymaga żadnych uprawnień

|  Parametr  |  Wymagane  |  Opis  |
|---|---|---|
| image | wymagany | Plik zdjęcia |

Zwracane wartości:
- filePath - ścieżka do dodanego zdjęcia (pliku) w repozytorium
