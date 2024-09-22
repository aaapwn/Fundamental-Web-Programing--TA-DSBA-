## ให้น้อง ๆ ทำระบบ Login และ Register โดยมีเงื่อนไขดังนี้

### ระบบ Login
- หากชื่อและรหัสผ่านไม่มีใน Database ให้แสดงข้อความ "Password or Username not match"
- หาก Login สำเร็จ ให้แสดงข้อความ Welcome ตามด้วยชื่อจริงของ Customer

### ระบบ Register
- หาก Password และ Comfirm-Password ไม่ตรงกันให้แสดงข้อความ "Password not match"
- หาก Username มีใน Database อยู่แล้วให้แสดงข้อความ "Username already exist"
- หาก Register สำเร็จให้แสดงข้อความ "Register success"

### สร้างตารางด้วยตัวเอง โดยมีข้อมูลดังนี้
| Field      | Datatype     | Key                         |
|------------|--------------|-----------------------------|
| id         | INT          | primary key, auto increment |
| username   | VARCHAR(50)  | unique, not null            |
| password   | VARCHAR(255) | not null                    |
| first_name | VARCHAR(50)  | not null                    |
| last_name  | VARCHAR(50)  | not null                    |
| email      | VARCHAR(100) | not null                    |
