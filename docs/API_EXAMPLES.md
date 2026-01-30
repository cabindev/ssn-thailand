# SSN Thailand API Examples for Postman

## Base URL
```
https://ssnthailand.com/api
```

---

## 1. Dashboard API

### GET /dashboard
ดึงข้อมูลสรุปสำหรับหน้าแรก

**Request:**
```
GET https://ssnthailand.com/api/dashboard
```

**Response:**
```json
{
  "stats": {
    "creative_activities_count": 156,
    "traditions_count": 89,
    "ethnic_groups_count": 42,
    "public_policies_count": 73
  },
  "charts": {
    "creative_activities_by_region": [
      { "type": "ภาคเหนือ", "value": 35 },
      { "type": "ภาคกลาง", "value": 45 },
      { "type": "ภาคตะวันออกเฉียงเหนือ", "value": 38 },
      { "type": "ภาคใต้", "value": 28 },
      { "type": "ภาคตะวันออก", "value": 10 }
    ],
    "traditions_by_region": [
      { "type": "ภาคเหนือ", "value": 25 },
      { "type": "ภาคกลาง", "value": 20 },
      { "type": "ภาคตะวันออกเฉียงเหนือ", "value": 22 },
      { "type": "ภาคใต้", "value": 15 },
      { "type": "ภาคตะวันออก", "value": 7 }
    ],
    "ethnic_groups_by_region": [
      { "type": "ภาคเหนือ", "value": 18 },
      { "type": "ภาคกลาง", "value": 5 },
      { "type": "ภาคตะวันออกเฉียงเหนือ", "value": 8 },
      { "type": "ภาคใต้", "value": 6 },
      { "type": "ภาคตะวันตก", "value": 5 }
    ],
    "public_policies_by_level": [
      { "type": "ระดับชาติ", "value": 12 },
      { "type": "ระดับจังหวัด", "value": 25 },
      { "type": "ระดับอำเภอ", "value": 18 },
      { "type": "ระดับตำบล", "value": 10 },
      { "type": "ระดับชุมชน", "value": 8 }
    ]
  },
  "recent": {
    "creative_activities": [
      {
        "id": 1,
        "name": "งานวิ่งมาราธอนเพื่อสุขภาพ",
        "description": "กิจกรรมวิ่งเพื่อสุขภาพ ส่งเสริมการออกกำลังกาย",
        "province": "กรุงเทพมหานคร",
        "region": "central",
        "cover_image": "https://example.com/images/marathon.jpg"
      }
    ],
    "traditions": [
      {
        "id": 1,
        "name": "ประเพณีสงกรานต์",
        "description": "ประเพณีสงกรานต์แบบดั้งเดิม",
        "province": "เชียงใหม่",
        "region": "north",
        "cover_image": "https://example.com/images/songkran.jpg"
      }
    ],
    "ethnic_groups": [
      {
        "id": 1,
        "name": "กลุ่มชาติพันธุ์กะเหรี่ยง",
        "description": "ชนเผ่าที่มีวิถีชีวิตเรียบง่าย",
        "province": "ตาก",
        "region": "north",
        "cover_image": "https://example.com/images/karen.jpg"
      }
    ],
    "public_policies": [
      {
        "id": 1,
        "name": "นโยบายส่งเสริมสุขภาพชุมชน",
        "description": "นโยบายระดับชาติที่ส่งเสริมสุขภาพ",
        "level": "national",
        "province": "ทั่วประเทศ",
        "cover_image": "https://example.com/images/policy.jpg"
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
GET https://ssnthailand.com/api/creative-activities?page=1&per_page=12&region=north&search=วิ่ง
```

**Query Parameters:**
| Parameter | Type | Description |
|-----------|------|-------------|
| page | number | หน้าที่ต้องการ (default: 1) |
| per_page | number | จำนวนต่อหน้า (default: 12) |
| search | string | คำค้นหา |
| region | string | ภูมิภาค (north, northeast, central, east, west, south) |
| province | string | จังหวัด |
| category | string | หมวดหมู่ |

**Response:**
```json
{
  "data": [
    {
      "id": 1,
      "name": "งานวิ่งมาราธอนเพื่อสุขภาพ",
      "description": "กิจกรรมวิ่งเพื่อสุขภาพ ส่งเสริมการออกกำลังกายในชุมชน",
      "location": "สวนลุมพินี",
      "province": "กรุงเทพมหานคร",
      "region": "central",
      "category": "กีฬา",
      "images": [
        "https://example.com/images/marathon1.jpg",
        "https://example.com/images/marathon2.jpg"
      ],
      "cover_image": "https://example.com/images/marathon1.jpg",
      "created_at": "2024-01-15T10:30:00Z",
      "updated_at": "2024-01-15T10:30:00Z"
    },
    {
      "id": 2,
      "name": "คอนเสิร์ตดนตรีในสวน",
      "description": "การแสดงดนตรีสดในบรรยากาศธรรมชาติ",
      "location": "สวนสาธารณะ",
      "province": "เชียงใหม่",
      "region": "north",
      "category": "ดนตรี",
      "images": [
        "https://example.com/images/concert1.jpg"
      ],
      "cover_image": "https://example.com/images/concert1.jpg",
      "created_at": "2024-01-10T08:00:00Z",
      "updated_at": "2024-01-10T08:00:00Z"
    }
  ],
  "meta": {
    "current_page": 1,
    "last_page": 5,
    "per_page": 12,
    "total": 56
  }
}
```

### GET /creative-activities/{id}
ดึงรายละเอียดกิจกรรมสร้างสรรค์

**Request:**
```
GET https://ssnthailand.com/api/creative-activities/1
```

**Response:**
```json
{
  "data": {
    "id": 1,
    "name": "งานวิ่งมาราธอนเพื่อสุขภาพ",
    "description": "กิจกรรมวิ่งเพื่อสุขภาพ ส่งเสริมการออกกำลังกายในชุมชน จัดขึ้นเป็นประจำทุกปี",
    "location": "สวนลุมพินี",
    "province": "กรุงเทพมหานคร",
    "region": "central",
    "category": "กีฬา",
    "images": [
      "https://example.com/images/marathon1.jpg",
      "https://example.com/images/marathon2.jpg",
      "https://example.com/images/marathon3.jpg"
    ],
    "cover_image": "https://example.com/images/marathon1.jpg",
    "created_at": "2024-01-15T10:30:00Z",
    "updated_at": "2024-01-15T10:30:00Z"
  }
}
```

---

## 3. Traditions API

### GET /traditions
ดึงรายการประเพณี

**Request:**
```
GET https://ssnthailand.com/api/traditions?page=1&per_page=12
```

**Response:**
```json
{
  "data": [
    {
      "id": 1,
      "name": "ประเพณีสงกรานต์",
      "description": "ประเพณีปีใหม่ไทย",
      "history": "สงกรานต์เป็นประเพณีที่สืบทอดมาแต่โบราณ...",
      "alcohol_free_approach": "จัดกิจกรรมรดน้ำดำหัวผู้ใหญ่แบบดั้งเดิม",
      "location": "ทั่วประเทศ",
      "province": "เชียงใหม่",
      "region": "north",
      "category": "เทศกาล",
      "images": [
        "https://example.com/images/songkran1.jpg"
      ],
      "cover_image": "https://example.com/images/songkran1.jpg",
      "has_policy": true,
      "policy_details": "มีประกาศจังหวัดสนับสนุนงานสงกรานต์ปลอดภัย",
      "created_at": "2024-01-01T00:00:00Z",
      "updated_at": "2024-01-01T00:00:00Z"
    }
  ],
  "meta": {
    "current_page": 1,
    "last_page": 3,
    "per_page": 12,
    "total": 35
  }
}
```

### GET /traditions/{id}
**Request:**
```
GET https://ssnthailand.com/api/traditions/1
```

**Response:**
```json
{
  "data": {
    "id": 1,
    "name": "ประเพณีสงกรานต์",
    "description": "ประเพณีปีใหม่ไทย จัดขึ้นในช่วงเดือนเมษายนของทุกปี",
    "history": "สงกรานต์เป็นประเพณีที่สืบทอดมาแต่โบราณกว่า 700 ปี เป็นการเฉลิมฉลองปีใหม่ไทย",
    "alcohol_free_approach": "จัดกิจกรรมรดน้ำดำหัวผู้ใหญ่แบบดั้งเดิม สรงน้ำพระ ทำบุญตักบาตร",
    "location": "ทั่วประเทศ",
    "province": "เชียงใหม่",
    "region": "north",
    "category": "เทศกาล",
    "images": [
      "https://example.com/images/songkran1.jpg",
      "https://example.com/images/songkran2.jpg"
    ],
    "cover_image": "https://example.com/images/songkran1.jpg",
    "has_policy": true,
    "policy_details": "มีประกาศจังหวัดสนับสนุนงานสงกรานต์ปลอดภัย",
    "created_at": "2024-01-01T00:00:00Z",
    "updated_at": "2024-01-01T00:00:00Z"
  }
}
```

---

## 4. Ethnic Groups API

### GET /ethnic-groups
ดึงรายการกลุ่มชาติพันธุ์

**Request:**
```
GET https://ssnthailand.com/api/ethnic-groups?page=1&per_page=12
```

**Response:**
```json
{
  "data": [
    {
      "id": 1,
      "name": "กลุ่มชาติพันธุ์กะเหรี่ยง",
      "description": "ชนเผ่าที่มีวิถีชีวิตเรียบง่าย ใกล้ชิดธรรมชาติ",
      "history": "กะเหรี่ยงเป็นกลุ่มชาติพันธุ์ที่อาศัยอยู่ในประเทศไทยมานานกว่า 200 ปี",
      "population": 500000,
      "location": "บริเวณชายแดนไทย-เมียนมา",
      "province": "ตาก",
      "region": "north",
      "activities": "ทอผ้า เกษตรกรรม งานหัตถกรรม",
      "images": [
        "https://example.com/images/karen1.jpg"
      ],
      "cover_image": "https://example.com/images/karen1.jpg",
      "created_at": "2024-01-01T00:00:00Z",
      "updated_at": "2024-01-01T00:00:00Z"
    }
  ],
  "meta": {
    "current_page": 1,
    "last_page": 2,
    "per_page": 12,
    "total": 20
  }
}
```

### GET /ethnic-groups/{id}
**Request:**
```
GET https://ssnthailand.com/api/ethnic-groups/1
```

**Response:**
```json
{
  "data": {
    "id": 1,
    "name": "กลุ่มชาติพันธุ์กะเหรี่ยง",
    "description": "ชนเผ่าที่มีวิถีชีวิตเรียบง่าย ใกล้ชิดธรรมชาติ",
    "history": "กะเหรี่ยงเป็นกลุ่มชาติพันธุ์ที่อาศัยอยู่ในประเทศไทยมานานกว่า 200 ปี มีวัฒนธรรมและประเพณีเป็นเอกลักษณ์",
    "population": 500000,
    "location": "บริเวณชายแดนไทย-เมียนมา จังหวัดตาก แม่ฮ่องสอน กาญจนบุรี",
    "province": "ตาก",
    "region": "north",
    "activities": "การทอผ้า เกษตรกรรมแบบยั่งยืน งานหัตถกรรมพื้นบ้าน การรักษาป่า",
    "images": [
      "https://example.com/images/karen1.jpg",
      "https://example.com/images/karen2.jpg"
    ],
    "cover_image": "https://example.com/images/karen1.jpg",
    "created_at": "2024-01-01T00:00:00Z",
    "updated_at": "2024-01-01T00:00:00Z"
  }
}
```

---

## 5. Public Policies API

### GET /public-policies
ดึงรายการนโยบายสาธารณะ

**Request:**
```
GET https://ssnthailand.com/api/public-policies?page=1&per_page=12&level=national
```

**Query Parameters:**
| Parameter | Type | Description |
|-----------|------|-------------|
| page | number | หน้าที่ต้องการ |
| per_page | number | จำนวนต่อหน้า |
| search | string | คำค้นหา |
| level | string | ระดับนโยบาย (national, provincial, district, subdistrict, community) |
| region | string | ภูมิภาค |
| province | string | จังหวัด |

**Response:**
```json
{
  "data": [
    {
      "id": 1,
      "name": "นโยบายส่งเสริมสุขภาพชุมชน",
      "description": "นโยบายระดับชาติที่ส่งเสริมสุขภาพในชุมชน",
      "level": "national",
      "organization": "กระทรวงสาธารณสุข",
      "province": "ทั่วประเทศ",
      "region": null,
      "implementation_date": "2023-01-01",
      "images": [
        "https://example.com/images/policy1.jpg"
      ],
      "cover_image": "https://example.com/images/policy1.jpg",
      "document_url": "https://example.com/docs/policy1.pdf",
      "created_at": "2024-01-01T00:00:00Z",
      "updated_at": "2024-01-01T00:00:00Z"
    }
  ],
  "meta": {
    "current_page": 1,
    "last_page": 3,
    "per_page": 12,
    "total": 30
  }
}
```

### GET /public-policies/{id}
**Request:**
```
GET https://ssnthailand.com/api/public-policies/1
```

**Response:**
```json
{
  "data": {
    "id": 1,
    "name": "นโยบายส่งเสริมสุขภาพชุมชน",
    "description": "นโยบายระดับชาติที่ส่งเสริมสุขภาพในชุมชน มุ่งเน้นการป้องกันโรคและส่งเสริมสุขภาพ",
    "level": "national",
    "organization": "กระทรวงสาธารณสุข",
    "province": "ทั่วประเทศ",
    "region": null,
    "implementation_date": "2023-01-01",
    "images": [
      "https://example.com/images/policy1.jpg",
      "https://example.com/images/policy2.jpg"
    ],
    "cover_image": "https://example.com/images/policy1.jpg",
    "document_url": "https://example.com/docs/policy1.pdf",
    "created_at": "2024-01-01T00:00:00Z",
    "updated_at": "2024-01-01T00:00:00Z"
  }
}
```

---

## 6. Categories API

### GET /categories
ดึงรายการหมวดหมู่

**Request:**
```
GET https://ssnthailand.com/api/categories?type=creative_activity
```

**Query Parameters:**
| Parameter | Type | Description |
|-----------|------|-------------|
| type | string | ประเภท (creative_activity, tradition, ethnic_group) |

**Response:**
```json
{
  "data": [
    {
      "id": 1,
      "name": "กีฬา",
      "slug": "sports",
      "type": "creative_activity"
    },
    {
      "id": 2,
      "name": "ดนตรี",
      "slug": "music",
      "type": "creative_activity"
    },
    {
      "id": 3,
      "name": "ศิลปะ",
      "slug": "art",
      "type": "creative_activity"
    }
  ]
}
```

---

## Region Values
| Value | Label |
|-------|-------|
| north | ภาคเหนือ |
| northeast | ภาคตะวันออกเฉียงเหนือ |
| central | ภาคกลาง |
| east | ภาคตะวันออก |
| west | ภาคตะวันตก |
| south | ภาคใต้ |

## Policy Level Values
| Value | Label |
|-------|-------|
| national | ระดับชาติ |
| provincial | ระดับจังหวัด |
| district | ระดับอำเภอ |
| subdistrict | ระดับตำบล |
| community | ระดับชุมชน |

---

## Postman Collection Import

คุณสามารถ import endpoints เหล่านี้ใน Postman โดย:
1. สร้าง Collection ใหม่ชื่อ "SSN Thailand API"
2. เพิ่ม Environment Variable: `base_url` = `https://ssnthailand.com/api`
3. สร้าง Request สำหรับแต่ละ endpoint

### Headers ที่ต้องใช้:
```
Content-Type: application/json
Accept: application/json
```
