Приложение разделено на 4 компонента:
- основной компонент App, в него вложены следующие компоненты:
1. Auth - компонент, отвечающий за авторизацию пользователей (заглушка: demo12, 12345aA); Частично валидация данных на условие не использование кириллицы происходит с помощью резулярных выражений сохраненных в отдельной папке: /src/other, частично на условие количества вводимых символов в теле компонента. При успешной авторизации редирект на компонент Companies.
При этом записываем токен в store redux.
2. Companies - компонент, содержащий в себе список компаний из файла company.json (импортируем файл company.json). Выводим порционно по 20 штук, прокручивая скроллом. 
В него вложент компонент Company, содержащий в себе детальные данные из company.json

Для сетевого запроса используется axios вместо fetch;<br/>
Стили проработаны не до конца, используется Bootstrap.
