# 🖼️ 9/100 ImageSlider Component

Кастомный компонент слайдера изображений на React + TypeScript, поддерживающий навигацию по клику и наведению (`click` / `hover`), с анимацией зума и переходов. Включает навигационные стрелки и доты. Реализовано в рамках челленджа **"100 проектов"**.

## 🚀 Features

-   Центрированный активный слайд
-   Навигация с помощью стрелок или клика по "dot"
-   Анимированный зум изображений (`hover` или `click`)
-   Стилизация через SCSS
-   Поддержка заголовков поверх изображений

---

## 📦 Установка

```bash
# 1. Клонируй репозиторий
git clone https://github.com/dmitrychervochkin/9-image-slider.git

# 2. Перейди в папку проекта
cd 9-image-slider

# 3. Установи зависимости
npm install

# 4. Запусти в dev-режиме
npm run dev
```

---

## 🧩 Использование

```bash
import { ImageSlider } from "./components/ImageSlider";

const images = [
  { src: "1.jpg", alt: "Картинка 1", title: "Заголовок 1" },
  { src: "2.jpg", alt: "Картинка 2", title: "Заголовок 2" },
  { src: "3.jpg", alt: "Картинка 3", title: "Заголовок 3" },
  ...
];

<ImageSlider images={images} trigger="click" arrows={true} dots={false} />
```

![Превью](./public/preview.mov)
