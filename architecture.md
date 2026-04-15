# SA Learning Hub 架構示意

```mermaid
flowchart TD
    A[展示層 / GitHub Pages] --> B[成果層 / Markdown SQL JSON]
    B --> C[知識層 / 方法論庫 Cases Specs]
    C --> D[擴充層 / GitHub Projects Notion Asana DB API]

    A1[index.html 儀表板] --> A
    A2[weekly.html 每週進度] --> A
    A3[mindmap.html 心智圖] --> A

    B1[weekly-progress.json] --> B
    B2[每週 SQL 練習] --> B
    B3[每週回顧與筆記] --> B

    C1[methods/] --> C
    C2[cases/] --> C
    C3[specs/] --> C

    D1[GitHub Projects] --> D
    D2[Notion / Asana] --> D
    D3[資料庫 / API / 自動化] --> D
```

## 核心原則
- 心智圖決定知識分類
- HTML 決定介面與操作方式
- GitHub 負責保存、版本控管、發佈

## 分層說明
### 1. 展示層
用來看首頁、週進度、心智圖、成果入口。

### 2. 成果層
保存 SQL、Markdown、JSON、圖片、規格草稿。

### 3. 知識層
把案例萃取成方法，把方法再沉澱成可重用資產。

### 4. 擴充層
未來可串接 GitHub Projects、Notion、Asana、外部資料源與資料庫。
