ให้ใช้ database จาก [todos.db](./todos.db) โดยกำหนดให้คำสั่งสร้างตารางมีดังนี้
```SQL
CREATE TABLE todos (
    id INTEGER PRIMARY KEY,
    title TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    completed BOOLEAN
);
```
***
ให้น้อง ๆ สร้าง Rest API และทำการทดสอบด้วย `REST Client` โดยมีรายละเอียดดังนี้
1. GET Method `/todos` ให้ดึงข้อมูลจากตาราง todos ทั้งหมด <br> ตัวอย่างผลลัพธ์ที่ต้องการ
```JSON
[
  {
    "id": 1,
    "title": "Grocery Shopping",
    "created_at": "2024-09-22 07:53:23",
    "completed": 1
  },
  {
    "id": 2,
    "title": "Morning Workout",
    "created_at": "2024-09-22 07:53:23",
    "completed": 0
  },

  ...
]
```

2. POST Method `/todos` ให้สร้างข้อมูลใหม่ในตาราง โดยแนบข้อมูลที่ต้องการสร้างไว้ใน Body

3. PUT Method `/todo/:id` ให้อัพเดทข้อมูลในตาราง todos โดยจะทำการอัพเดทเฉพาะข้อมูลที่มี id ตรงกับ id ที่ผู้ใช้ส่งมาใน URL และจะใช้ข้อมูลจาก Body ในการอัพเดทข้อมูลนั้น

4. DELETE Method `/todo/:id` ใช้สำหรับลบข้อมูลในตาราง todos โดยจะทำการลบเฉพาะรายการที่มี id ตรงกับ id ที่ผู้ใช้ส่งมาใน URL
