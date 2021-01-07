## Aplikacja "To-do list"

Aplikacja typu "to-do list", rozbudowana o kilka dodatkowych elementów, np. wyświetlanie bieżącej daty, zapis w `localStorage`.

## Krótki opis sposobu działania aplikacji 

1. Wprowadzamy tekst do `<input>` na dole ekranu. Kliknięcie przycisku "+" lub wciśnięcie ENTER powoduje utworzenie nowego elementu `<li>` i dodanie go do kontenera `<ul>`. 

1. Wszystkie "taski" przechowywane są w tablicy `taskCollection` jako obiekty posiadające właściwości: `name`, `id`, `progress`, `done`, `delete`. 

1. Każdy dodany element `<li>` zawiera w sobie 3 ikony: "w toku", "zrobione" i kosz. Klikając w poszczególne ikony można wykonać różne akcje (oznaczenie jako "w toku" lub "wykonane", usunięcie z listy). Klikanie w ikony powoduje zmianę wartości odpowiednich właściwości w obiekcie przypisanym do "taska" (np. zmiana właściwości `progress` z `false` na `true` i odwrotnie). "Skojarzenie" klikanego elementu z danym obiektem w tablicy następuje na podstawie `id`. 

1. Zawartość tablicy `taskCollection` jest zapisywana i na bieżąco aktualizowana w `localStorage` jako string JSON.

1. Przy odświeżeniu przeglądarki, zawartość tablicy `taskCollection` jest pobierana z `localStorage`, a lista "tasków" jest "renderowana" na podstawie pobranych danych. 

1. Klikając w ikonę "odśwież" w prawym górnym rogu można usunąć dane zapisane przez aplikację w `localStorage` i wyczyścić całą listę.