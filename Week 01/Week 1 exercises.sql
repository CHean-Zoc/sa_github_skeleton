Week 1 SQL exercises

        | 你要做的事     | 建議先查哪裡                                    | 常用語法                           
        | -------       | --------------------------------------------   | --------------------------------  | 
        | 看有哪些資料庫 | `sys.databases`                                | `SELECT name FROM sys.databases`  |     
        | 看有哪些表     | `sys.tables`                                   | `SELECT name FROM sys.tables`     |
        | 看欄位         | `sys.columns` / `INFORMATION_SCHEMA.COLUMNS`   | 結構查詢                           |
        | 找主鍵         | `sys.key_constraints`                          | PK 查詢                            |
        | 找外鍵         | `sys.foreign_keys`                             | FK 查詢                            |
        | 找欄位名       | `sys.columns`                                  | `WHERE c.name LIKE ...`            |
        | 查資料         | 目標表                                          | `SELECT TOP 10 *`                 |
        | 查統計         | 目標表                                          | `COUNT / GROUP BY / HAVING`       |
        | 多表關聯       | 相關表                                          | `JOIN`                            |
        | 新增資料       | 目標表                                          | `INSERT`                          |
        | 修改資料       | 目標表                                          | `UPDATE ... WHERE`                |
        | 刪資料         | 目標表                                          | `DELETE ... WHERE`                |
        | 建表或改欄位    | 目標表                                          | `CREATE / ALTER`                  |

        
        
        1.我的查詢邏輯：看資料庫內有哪些表 → 看表有哪些欄位 → 看表前幾筆資料
        2.可以把schema 想成，在同一個資料庫裡，用來分類與管理資料表、檢視、預存程序等物件的一層資料夾 / 命名空間。
        3.資料庫（Database）是一個大櫃子,Schema 是櫃子裡的抽屜或分類夾,Table / View 是抽屜裡的文件
          EX：master = 大櫃子,dbo = 抽屜,spt_monitor = 文件


        1)看有哪些資料庫：
        SELECT name FROM sys.databases

        2)看有哪些表(想從"master"資料庫中，把 schema 跟 master資料表一起查出來)
        SELECT
        s.name AS schema_name,
        t.name AS table_name
        FROM master.sys.tables t
        JOIN master.sys.schemas s
        ON t.schema_id = s.schema_id
        ORDER BY s.name, t.name;

        因此就該案例，其schema(結構描述 / 命名空間)就為 master.dbo.spt_monitor  資料庫.結構.物件(表/視圖)
        2-1)延伸學習：怎麼查一個資料庫裡有哪些 schema？
        SELECT name
        FROM master.sys.schemas
        ORDER BY name;
        -----------針對master 裡所有 schema 名稱

        SELECT name
        FROM sys.schemas
        ORDER BY name;
        -----------目前資料庫