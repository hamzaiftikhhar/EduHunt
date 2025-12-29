# 📚 Course Aggregator API Documentation

## Base URL
```
http://localhost:3000/api
```

## Authentication
Currently, no authentication is required (open API for educational purposes).

---

## Endpoints

### 1. Get All Courses

**GET** `/courses`

Retrieve courses with filtering, searching, and pagination.

#### Query Parameters

| Parameter | Type | Description | Default |
|-----------|------|-------------|---------|
| `page` | integer | Page number | 1 |
| `limit` | integer | Items per page | 20 |
| `provider` | string | Filter by provider (Udemy, Coursera, etc.) | - |
| `category` | string | Filter by category | - |
| `level` | string | Filter by level (Beginner, Intermediate, Advanced) | - |
| `price` | string | Filter by price (Free, Paid, Freemium) | - |
| `search` | string | Search in title and description | - |
| `sortBy` | string | Sort field (rating, enrollments, title) | rating |
| `order` | string | Sort order (asc, desc) | desc |

#### Example Request
```bash
GET /api/courses?provider=Khan Academy&price=Free&page=1&limit=10
```

#### Example Response
```json
{
  "success": true,
  "data": [
    {
      "_id": "507f1f77bcf86cd799439011",
      "title": "Khan Academy - Math",
      "description": "Comprehensive Math courses from Khan Academy...",
      "provider": "Khan Academy",
      "instructor": "Khan Academy",
      "category": "Math",
      "level": "All Levels",
      "price": "Free",
      "rating": 4.8,
      "enrollments": 1000000,
      "duration": "Self-paced",
      "language": "English",
      "url": "https://www.khanacademy.org/math",
      "skills": ["Math", "Self-learning"],
      "certificate": false,
      "createdAt": "2024-01-15T10:30:00.000Z",
      "updatedAt": "2024-01-15T10:30:00.000Z"
    }
  ],
  "totalPages": 5,
  "currentPage": 1,
  "totalCourses": 50
}
```

---

### 2. Get Single Course

**GET** `/courses/:id`

Retrieve detailed information about a specific course.

#### Example Request
```bash
GET /api/courses/507f1f77bcf86cd799439011
```

#### Example Response
```json
{
  "success": true,
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    "title": "Khan Academy - Math",
    "description": "Comprehensive Math courses...",
    // ... full course details
  }
}
```

---

### 3. Get Statistics

**GET** `/courses/stats/summary`

Get overall statistics about the course database.

#### Example Response
```json
{
  "success": true,
  "data": {
    "totalCourses": 150,
    "freeCourses": 120,
    "paidCourses": 30,
    "providers": [
      { "_id": "Khan Academy", "count": 6 },
      { "_id": "freeCodeCamp", "count": 10 },
      { "_id": "Coursera", "count": 6 }
    ],
    "categories": [
      { "_id": "Programming", "count": 45 },
      { "_id": "Web Development", "count": 30 },
      { "_id": "Data Science", "count": 25 }
    ]
  }
}
```

---

### 4. Get Filter Options

**GET** `/courses/filters/options`

Get available filter options for dropdowns.

#### Example Response
```json
{
  "success": true,
  "data": {
    "providers": ["Coursera", "Khan Academy", "freeCodeCamp", "Udemy"],
    "categories": ["Data Science", "Machine Learning", "Programming", "Web Development"],
    "levels": ["All Levels", "Beginner", "Intermediate", "Advanced"],
    "prices": ["Free", "Freemium", "Paid"]
  }
}
```

---

## Error Responses

### 404 Not Found
```json
{
  "success": false,
  "message": "Course not found"
}
```

### 500 Server Error
```json
{
  "success": false,
  "message": "Error fetching courses",
  "error": "Detailed error message"
}
```

### 429 Rate Limit
```json
{
  "message": "Too many requests from this IP, please try again later."
}
```

---

## Rate Limiting

- **Window**: 15 minutes
- **Max Requests**: 100 per window per IP

---

## Frontend Integration Example

### React/Next.js Example

```javascript
// Fetch courses with filters
const fetchCourses = async (filters) => {
  const queryParams = new URLSearchParams({
    page: filters.page || 1,
    limit: filters.limit || 20,
    ...(filters.provider && { provider: filters.provider }),
    ...(filters.category && { category: filters.category }),
    ...(filters.price && { price: filters.price }),
    ...(filters.search && { search: filters.search })
  });

  const response = await fetch(
    `http://localhost:3000/api/courses?${queryParams}`
  );
  
  const data = await response.json();
  return data;
};

// Usage
const courses = await fetchCourses({
  provider: 'Khan Academy',
  price: 'Free',
  page: 1
});
```

### Vanilla JavaScript Example

```javascript
fetch('http://localhost:3000/api/courses?price=Free&limit=10')
  .then(response => response.json())
  .then(data => {
    console.log('Courses:', data.data);
    // Display courses in your UI
  })
  .catch(error => console.error('Error:', error));
```

---

## CORS

CORS is enabled for all origins in development. Configure `CORS_ORIGIN` in `.env` for production.

---

## Best Practices

1. **Caching**: Implement client-side caching to reduce API calls
2. **Pagination**: Always use pagination for better performance
3. **Error Handling**: Handle all error responses appropriately
4. **Rate Limiting**: Respect rate limits to avoid being blocked
5. **Attribution**: Always link back to the original course provider

---

## Support

For issues or questions, please open an issue on GitHub or contact the development team.
