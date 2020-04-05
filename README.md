# 縮網址網站 (使用MongoDB製作))

## 專案說明 (Project Title)：
一個以Node.js與Express為基礎建立的縮網址網站，以清單方式呈現縮網址，配合mongoose與mongoDB資料庫互動。
![image](https://i.imgur.com/RCHaAnM.png)

## 環境建置與需求 (prerequisites)：
* body-parser 1.19.0
* connect-flash 0.1.1
* dotenv 8.2.0
* Express (framework) 4.17.1
* Express-handlebars 3.1.0
* express-session 1.17.0
* mongoose 5.9.2
* Node Version Manager (nvm) v 1.1.7
* Nodemon 2.0.2

## 安裝與執行步驟 (installation and execution)：
1. 下載Github頁面上內容
```console
git clone https://github.com/coooo77/url-shortener
```
2. 啟動Node.js cmd以指令cd移動至url-shortener資料夾底下
```console
cd 下載位置/url-shortener
```
3. 根據環境建置與需求安裝軟體與套件
```console
npm install
```
4. 輸入種子資料
```console
cd 下載位置/url-shortener/models
node urlShortenerSeeder.js
```
5. 啟動專案
```console
cd 下載位置/url-shortener
npm run dev
```
6. 開啟瀏覽器，輸入網址
> [localhost:3000/](https://localhost:3000/)

## 功能描述 (features)：
### 清單功能
* 使用者能輸入網址，產生縮網址。
* 使用者可以瀏覽所有的縮網址 。
* 使用者可以點擊按鈕複製縮網址。