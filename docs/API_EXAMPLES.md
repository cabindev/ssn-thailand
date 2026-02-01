# SSN Thailand API Documentation

## Base URL
```
https://ssn.sdnthailand.com/api
```

---

## 1. Dashboard API

### GET /dashboard
ดึงข้อมูลสรุปสำหรับหน้าแรก

**Request:**
```
GET https://ssn.sdnthailand.com/api/dashboard
```

**Response:**
```json
{
  "stats": {
    "creative_activities_count": 308,
    "traditions_count": 125,
    "ethnic_groups_count": 6,
    "public_policies_count": 174,
    "total_count": 613
  },
  "charts": {
    "creative_activities_by_region": [
      { "type": "อีสานบน", "value": 120 },
      { "type": "กลาง", "value": 85 },
      { "type": "เหนือบน", "value": 50 },
      { "type": "ใต้บน", "value": 30 }
    ],
    "traditions_by_region": [
      { "type": "อีสานบน", "value": 45 },
      { "type": "กลาง", "value": 35 },
      { "type": "เหนือบน", "value": 25 }
    ],
    "ethnic_groups_by_region": [
      { "type": "เหนือบน", "value": 3 },
      { "type": "อีสานบน", "value": 2 }
    ],
    "public_policies_by_level": [
      { "type": "PROVINCIAL", "value": 60 },
      { "type": "DISTRICT", "value": 50 },
      { "type": "SUB_DISTRICT", "value": 40 },
      { "type": "NATIONAL", "value": 15 },
      { "type": "VILLAGE", "value": 9 }
    ]
  },
  "recent": {
    "creative_activities": [
      {
        "id": 1,
        "name": "โครงการ Local Creator - เพราะทุกพื้นที่มีคอนเทนต์",
        "description": "กิจกรรมส่งเสริมการสร้างคอนเทนต์ในท้องถิ่น",
        "province": "เชียงใหม่",
        "region": "เหนือบน",
        "images": ["https://example.com/image.jpg"],
        "createdAt": "2025-09-08T23:30:00Z"
      }
    ],
    "traditions": [],
    "ethnic_groups": [],
    "public_policies": [
      {
        "id": 1,
        "name": "บันทึกข้อตกลงความร่วมมือ (MOU) นโยบายสาธารณะ",
        "description": "นโยบายสาธารณะระดับอำเภอ",
        "level": "DISTRICT",
        "province": "อำนาจเจริญ",
        "region": "อีสานล่าง",
        "signingDate": "2025-09-05",
        "createdAt": "2025-09-05T00:00:00Z"
      }
    ]
  }
}
```

---

## 2. Creative Activities API

### GET /creative-activities
ดึงรายการกิจกรรมสร้างสรรค์

**Request:**
```
GET https://ssn.sdnthailand.com/api/creative-activities?page=1&per_page=12&region=เหนือบน&search=สงกรานต์
```

**Query Parameters:**
| Parameter | Type | Description |
|-----------|------|-------------|
| page | number | หน้าที่ต้องการ (default: 1) |
| per_page | number | จำนวนต่อหน้า (default: 12) |
| search | string | คำค้นหา |
| region | string | ภูมิภาค (ดูตาราง Region Values) |
| province | string | จังหวัด |

**Response:**
```json
{
  "data": [
    {
      "id": 1,
      "name": "ประกวด สงกรานต์ Cover Dance Battle 2025",
      "description": "ส่งเสริมกิจกรรมเด็กและเยาวชน",
      "province": "ขอนแก่น",
      "amphoe": "เมืองขอนแก่น",
      "district": "ในเมือง",
      "region": "อีสานบน",
      "type": "กิจกรรมเยาวชน",
      "images": ["https://example.com/image.jpg"],
      "createdAt": "2025-09-08T23:20:00Z",
      "updatedAt": "2025-09-08T23:20:00Z"
    }
  ],
  "meta": {
    "current_page": 1,
    "last_page": 26,
    "per_page": 12,
    "total": 308
  }
}
```

### GET /creative-activities/{id}
ดึงรายละเอียดกิจกรรมสร้างสรรค์

**Request:**
```
GET https://ssn.sdnthailand.com/api/creative-activities/1
```

**Response:**
```json
{
  "data": {
    "id": 1,
    "name": "ประกวด สงกรานต์ Cover Dance Battle 2025",
    "description": "ส่งเสริมกิจกรรมเด็กและเยาวชนขอนแก่น",
    "province": "ขอนแก่น",
    "amphoe": "เมืองขอนแก่น",
    "district": "ในเมือง",
    "region": "อีสานบน",
    "type": "กิจกรรมเยาวชน",
    "images": ["https://example.com/image1.jpg", "https://example.com/image2.jpg"],
    "createdAt": "2025-09-08T23:20:00Z",
    "updatedAt": "2025-09-08T23:20:00Z"
  }
}
```

---

## 3. Traditions API

### GET /traditions
ดึงรายการประเพณี

**Request:**
```
GET https://ssn.sdnthailand.com/api/traditions?page=1&per_page=12
```

**Response:**
```json
{
  "data": [
    {
      "id": 1,
      "name": "งานบุญประเพณีปลอดเหล้า",
      "description": "งานบุญประเพณีที่ส่งเสริมการไม่ดื่มแอลกอฮอล์",
      "province": "อุบลราชธานี",
      "amphoe": "น้ำยืน",
      "district": "โซง",
      "region": "อีสานล่าง",
      "images": ["https://example.com/image.jpg"],
      "createdAt": "2025-08-25T00:00:00Z"
    }
  ],
  "meta": {
    "current_page": 1,
    "last_page": 11,
    "per_page": 12,
    "total": 125
  }
}
```

### GET /traditions/{id}
**Request:**
```
GET https://ssn.sdnthailand.com/api/traditions/1
```

---

## 4. Ethnic Groups API

### GET /ethnic-groups
ดึงรายการกลุ่มชาติพันธุ์

**Request:**
```
GET https://ssn.sdnthailand.com/api/ethnic-groups?page=1&per_page=12
```

**Response:**
```json
{
  "data": [
    {
      "id": 1,
      "name": "กลุ่มชาติพันธุ์กะเหรี่ยง",
      "description": "ชนเผ่าที่มีวิถีชีวิตเรียบง่าย",
      "province": "ตาก",
      "region": "เหนือบน",
      "images": ["https://example.com/image.jpg"],
      "createdAt": "2024-01-01T00:00:00Z"
    }
  ],
  "meta": {
    "current_page": 1,
    "last_page": 1,
    "per_page": 12,
    "total": 6
  }
}
```

### GET /ethnic-groups/{id}
**Request:**
```
GET https://ssn.sdnthailand.com/api/ethnic-groups/1
```

---

## 5. Public Policies API

### GET /public-policies
ดึงรายการนโยบายสาธารณะ

**Request:**
```
GET https://ssn.sdnthailand.com/api/public-policies?page=1&per_page=12&level=PROVINCIAL
```

**Query Parameters:**
| Parameter | Type | Description |
|-----------|------|-------------|
| page | number | หน้าที่ต้องการ |
| per_page | number | จำนวนต่อหน้า |
| search | string | คำค้นหา |
| level | string | ระดับนโยบาย (ดูตาราง Policy Level Values) |
| region | string | ภูมิภาค |
| province | string | จังหวัด |

**Response:**
```json
{
  "data": [
    {
      "id": 1,
      "name": "MOU ทุกอำเภอ ขยายผล 1 อำเภอ 1 งานปลอดภัย",
      "description": "สืบสานงานบุญประเพณีปลอดเหล้า-บุหรี่-ยาเสพติด",
      "level": "PROVINCIAL",
      "province": "นครศรีธรรมราช",
      "region": "ใต้บน",
      "signingDate": "2025-08-24",
      "images": ["https://example.com/image.jpg"],
      "createdAt": "2025-08-24T00:00:00Z"
    }
  ],
  "meta": {
    "current_page": 1,
    "last_page": 15,
    "per_page": 12,
    "total": 174
  }
}
```

### GET /public-policies/{id}
**Request:**
```
GET https://ssn.sdnthailand.com/api/public-policies/1
```

---

## 6. Search API

### GET /search
ค้นหาข้อมูลทั้งหมด

**Request:**
```
GET https://ssn.sdnthailand.com/api/search?q=สงกรานต์
```

**Query Parameters:**
| Parameter | Type | Description |
|-----------|------|-------------|
| q | string | คำค้นหา |

**Response:**
```json
{
  "creative_activities": [
    { "id": 1, "name": "ประกวด สงกรานต์ Cover Dance", "type": "creative_activity" }
  ],
  "traditions": [
    { "id": 1, "name": "งานสงกรานต์ปลอดภัย", "type": "tradition" }
  ],
  "ethnic_groups": [],
  "public_policies": []
}
```

---

## Region Values (10 ภูมิภาค)

| Value | Label |
|-------|-------|
| กรุงเทพมหานคร | กรุงเทพมหานคร |
| กลาง | ภาคกลาง |
| ตะวันตก | ภาคตะวันตก |
| ตะวันออก | ภาคตะวันออก |
| อีสานบน | ภาคอีสานบน |
| อีสานล่าง | ภาคอีสานล่าง |
| เหนือบน | ภาคเหนือบน |
| เหนือล่าง | ภาคเหนือล่าง |
| ใต้บน | ภาคใต้บน |
| ใต้ล่าง | ภาคใต้ล่าง |

## Policy Level Values

| Value | Label |
|-------|-------|
| NATIONAL | ระดับประเทศ |
| HEALTH_REGION | ระดับเขตสุขภาพ |
| PROVINCIAL | ระดับจังหวัด |
| DISTRICT | ระดับอำเภอ |
| SUB_DISTRICT | ระดับตำบล |
| VILLAGE | ระดับหมู่บ้าน |

---

## Frontend URLs

| Page | URL |
|------|-----|
| หน้าแรก | / |
| กิจกรรมสร้างสรรค์ | /creative-activities |
| รายละเอียดกิจกรรม | /creative-activities/{id} |
| ประเพณี | /traditions |
| รายละเอียดประเพณี | /traditions/{id} |
| กลุ่มชาติพันธุ์ | /ethnic-groups |
| รายละเอียดกลุ่มชาติพันธุ์ | /ethnic-groups/{id} |
| นโยบายสาธารณะ | /public-policies |
| รายละเอียดนโยบาย | /public-policies/{id} |

---

## Tech Stack

- **Framework:** Next.js 14
- **UI Library:** Ant Design, DaisyUI 4.12.11
- **Styling:** Tailwind CSS
- **Icons:** Lucide React
- **Language:** TypeScript

---

## Deployment

### Plesk Panel

1. Upload files to server
2. Install dependencies: `npm install`
3. Build: `npm run build`
4. Start: `npm start` (uses custom server.js)

### Environment Variables
```
PORT=3000
NODE_ENV=production
```

---

## Postman Collection

Import endpoints ใน Postman:
1. สร้าง Collection ใหม่ชื่อ "SSN Thailand API"
2. เพิ่ม Environment Variable: `base_url` = `https://ssn.sdnthailand.com/api`
3. สร้าง Request สำหรับแต่ละ endpoint

### Headers:
```
Content-Type: application/json
Accept: application/json
```
