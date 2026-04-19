WEEK 1 SQL基礎白話筆記

    🏷️SQL 結構化查詢語言，同時為關聯式資料庫的標準程式語言

    🏷️SQL的用途與方法：

        1)允許建立關聯式資料的數據庫
        2)允許用戶定義資料庫中數據
        3)可對資料庫中的表單進行CRUD
        4)設定TABLE,procedure(存储过程), views(视图)...的權限


    🏷️SQL語法分類

        1)DDL(Data Definition Language) - 資料定義語言-主要用來定義或修改資料庫結構的語言
        📝 注意事項
        定義、修改、刪除資料庫物件本身
        操作層級：schema level / object level
        EX：CREATE, ALTER, DROP,TRUNCATE

        2)DML(Data Manipulation Language) - 資料操縱語言-用於對於資料的操縱 (Manipulation 有操作的意思) 
        📝 注意事項
        操作資料表裡面的資料列
        操作層級：data level / row level
        EX：SELECT, INSERT, UPDATE, DELETE

        3)DQL（Data Query Language） - 資料查詢語言 - 專用於從資料表中檢索數據，且專注於「讀取」資料，不會對資料庫中的實際內容進行修改。
        📝 注意事項
        查詢理解順序：1. FROM 2. JOIN 3. WHERE 4. GROUP BY 5. HAVING 6. SELECT 7. ORDER BY
        EX：SELECT,FROM,JOIN,WHERE,GROUP BY,HAVING,ORDER BY


        4)DCL(Data Control Language) - 資料控製語言 - 主要用於控制不同用戶對資料庫對象的訪問權限（如資料表、檢視表(VIEW)）
        EX：GRANT, REVOKE


        5)TCL(Transaction Control Language) - 交易控制語言 - 主要用於控制和管理交易，交易 Transaction 可以是一個或多個 SQL 語句所組成的
        交易(Transaction)也有很重要的特性就是 (ACID, 原子性 隔離性 一致性 持久性)；
        可能會涉及樂觀渲染（Optimistic Rendering 後端資料庫必須要有一套樂觀並行控制（Optimistic Locking）機制。
        當前端將修改後的資料傳回後端時，後端需要檢查資料在更新期間是否被他人修改過（例如檢查版本號或時間戳）以避免數據丟失。
        如若後端資料庫更新失敗（例如網路故障、資料庫衝突），前端需要回滾至操作前的狀態，顯示錯誤訊息。
        EX：COMMIT,ROLLBACK,SAVEPOINT,SET TRANSACTION

        6)DDL 管結構，DML 管異動，DQL 管查詢，DCL 管權限，TCL 管交易。


    🏷️SQL架構
    ├─ 1. 結構層：資料庫長什麼樣
    │  ├─ DDL
    │  │  ├─ CREATE   → 建立物件
    │  │  ├─ ALTER    → 修改結構
    │  │  ├─ DROP     → 刪除物件
    │  │  └─ TRUNCATE → 清空整表資料
    │  └─ 操作對象
    │     ├─ TABLE
    │     ├─ COLUMN
    │     ├─ CONSTRAINT
    │     ├─ INDEX
    │     └─ VIEW
    │
    ├─ 2. 資料層：資料怎麼進出與變動
    │  ├─ DML
    │  │  ├─ INSERT → 新增資料
    │  │  ├─ UPDATE → 修改資料
    │  │  └─ DELETE → 刪除資料
    │  └─ 操作對象
    │     └─ ROW / RECORD
    │
    ├─ 3. 查詢層：我要怎麼把資料撈出來
    │  ├─ DQL
    │  │  └─ SELECT
    │  ├─ 查詢骨架
    │  │  ├─ FROM      → 從哪裡查
    │  │  ├─ JOIN      → 跟誰接
    │  │  ├─ WHERE     → 先篩列
    │  │  ├─ GROUP BY  → 再分組
    │  │  ├─ HAVING    → 篩組
    │  │  ├─ SELECT    → 顯示哪些欄位
    │  │  └─ ORDER BY  → 最後排序
    │  └─ 常用能力
    │     ├─ DISTINCT
    │     ├─ TOP
    │     ├─ COUNT / SUM / AVG / MAX / MIN
    │     ├─ 子查詢 Subquery
    │     └─ CTE
    │
    ├─ 4. 控制層：誰能做、做錯怎麼辦
    │  ├─ DCL
    │  │  ├─ GRANT
    │  │  └─ REVOKE
    │  └─ TCL
    │     ├─ BEGIN TRANSACTION
    │     ├─ COMMIT
    │     ├─ ROLLBACK
    │     └─ SAVEPOINT
    │
    └─ 5. 系統開發實務層：SQL 對應什麼工作
    ├─ 資料表設計          → DDL
    ├─ CRUD 功能           → DML / DQL
    ├─ 查詢清單 / 報表      → DQL
    ├─ 權限控管            → DCL
    └─ 一致性 / 批次流程    → TCL



    🏷️SQL思維下的系統分析與資料思維

        ⚠️ 注意：
        SQL 負責落地操作資料，資料模型負責定義資料邏輯，系統規格負責定義系統行為，測試思維負責驗證行為是否正確。

        | 層級      | 核心問題               | 主要產物                                                     | 常見工具 / 表達方式  |
        | -------   | ------------------    | --------------------------------------------------------     | ------------ |
        | SQL 操作層 | 資料怎麼查、怎麼改                  | 查詢語法、異動語法、交易控制                      | SQL、SSMS     |
        | 資料模型層   | 資料應該怎麼被切分與關聯           | ER 模型、資料表、主鍵外鍵、主檔/明細/紀錄設計      | ERD、資料字典     |
        | 系統規格層   | 功能、欄位、流程、規則如何被明確定義 | 欄位規格、狀態表、權限矩陣、規則表、流程圖        | 規格書、流程圖、矩陣表  |
        | 測試思維層   | 系統是否真的符合需求與邊界條件       | 測試案例、情境矩陣、驗收條件、例外流程測試        | 測試案例表、UAT 清單 |




    🏷️SQL任務對照表

        | 你要做的事     | 建議先查哪裡                                    | 常用語法                           |
        | -------       | --------------------------------------------   | -------------------------------- |
        | 看有哪些資料庫 | `sys.databases`                                | `SELECT name FROM sys.databases` |
        | 看有哪些表     | `sys.tables`                                   | `SELECT name FROM sys.tables`    |
        | 看欄位         | `sys.columns` / `INFORMATION_SCHEMA.COLUMNS`   | 結構查詢                           |
        | 找主鍵         | `sys.key_constraints`                          | PK 查詢                            |
        | 找外鍵         | `sys.foreign_keys`                             | FK 查詢                            |
        | 找欄位名       | `sys.columns`                                  | `WHERE c.name LIKE ...`          |
        | 查資料         | 目標表                                          | `SELECT TOP 10 *`                |
        | 查統計         | 目標表                                          | `COUNT / GROUP BY / HAVING`      |
        | 多表關聯       | 相關表                                          | `JOIN`                           |
        | 新增資料       | 目標表                                          | `INSERT`                         |
        | 修改資料       | 目標表                                          | `UPDATE ... WHERE`               |
        | 刪資料         | 目標表                                          | `DELETE ... WHERE`               |
        | 建表或改欄位    | 目標表                                          | `CREATE / ALTER`                 |
